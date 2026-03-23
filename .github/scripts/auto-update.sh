#!/bin/bash
# =============================================================================
# Awesome OpenClaw - 自动化更新脚本
# 用途：定期检索 OpenClaw 生态资源并更新 README
# 执行频率：每 2 小时（通过 cron 配置）
# =============================================================================

set -euo pipefail

# -----------------------------------------------------------------------------
# 配置加载
# -----------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
CONFIG_FILE="${SCRIPT_DIR}/../config/update.config"

# 加载配置文件
if [[ -f "$CONFIG_FILE" ]]; then
    source "$CONFIG_FILE"
else
    echo "❌ 配置文件不存在：$CONFIG_FILE"
    exit 1
fi

# -----------------------------------------------------------------------------
# API 限流配置
# -----------------------------------------------------------------------------
# GitHub API 限流：未认证 60 次/小时，认证 5000 次/小时
# 检索 API 限制：根据配置调整请求频率
GITHUB_API_BASE="https://api.github.com"
RATE_LIMIT_DELAY="${RATE_LIMIT_DELAY:-2}"  # 请求间隔秒数
MAX_RETRIES="${MAX_RETRIES:-3}"             # 最大重试次数
RETRY_DELAY="${RETRY_DELAY:-5}"             # 重试延迟秒数

# -----------------------------------------------------------------------------
# 日志配置
# -----------------------------------------------------------------------------
LOG_DIR="${LOG_DIR:-/tmp/awesome-openclaw-logs}"
LOG_FILE="${LOG_DIR}/update-$(date +%Y%m%d-%H%M%S).log"
mkdir -p "$LOG_DIR"

log() {
    local level="$1"
    shift
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$level] $*" | tee -a "$LOG_FILE"
}

log_info()  { log "INFO" "$@"; }
log_warn()  { log "WARN" "$@"; }
log_error() { log "ERROR" "$@"; }

# -----------------------------------------------------------------------------
# GitHub Token 管理
# -----------------------------------------------------------------------------
# 支持多 Token 轮询，避免单 Token 限流
TOKENS=()
CURRENT_TOKEN_INDEX=0

load_tokens() {
    local token_file="${GITHUB_TOKEN_FILE:-}"
    if [[ -n "$token_file" && -f "$token_file" ]]; then
        while IFS= read -r token; do
            [[ -n "$token" ]] && TOKENS+=("$token")
        done < "$token_file"
    elif [[ -n "${GITHUB_TOKEN:-}" ]]; then
        TOKENS+=("$GITHUB_TOKEN")
    fi
    
    if [[ ${#TOKENS[@]} -eq 0 ]]; then
        log_warn "未配置 GitHub Token，使用未认证限流（60 次/小时）"
    else
        log_info "已加载 ${#TOKENS[@]} 个 GitHub Token"
    fi
}

get_next_token() {
    if [[ ${#TOKENS[@]} -eq 0 ]]; then
        echo ""
        return
    fi
    
    local token="${TOKENS[$CURRENT_TOKEN_INDEX]}"
    CURRENT_TOKEN_INDEX=$(( (CURRENT_TOKEN_INDEX + 1) % ${#TOKENS[@]} ))
    echo "$token"
}

# -----------------------------------------------------------------------------
# API 请求（带限流和重试）
# -----------------------------------------------------------------------------
api_request() {
    local endpoint="$1"
    local retries=0
    local response
    
    while [[ $retries -lt $MAX_RETRIES ]]; do
        local token
        token=$(get_next_token)
        
        local headers=(-H "Accept: application/vnd.github.v3+json")
        if [[ -n "$token" ]]; then
            headers+=(-H "Authorization: Bearer $token")
        fi
        
        # 检查当前 Token 限流状态
        if [[ -n "$token" ]]; then
            local rate_info
            rate_info=$(curl -s "${GITHUB_API_BASE}/rate_limit" \
                -H "Authorization: Bearer $token" \
                -H "Accept: application/vnd.github.v3+json")
            local remaining
            remaining=$(echo "$rate_info" | jq -r '.resources.core.remaining // 0')
            if [[ "$remaining" -lt 10 ]]; then
                log_warn "Token 限流剩余不足 ($remaining)，切换下一个 Token"
                continue
            fi
        fi
        
        response=$(curl -s "${GITHUB_API_BASE}${endpoint}" "${headers[@]}")
        local http_code
        http_code=$(curl -s -o /dev/null -w "%{http_code}" "${GITHUB_API_BASE}${endpoint}" "${headers[@]}")
        
        if [[ "$http_code" -eq 200 ]]; then
            echo "$response"
            sleep "$RATE_LIMIT_DELAY"
            return 0
        elif [[ "$http_code" -eq 403 ]]; then
            log_warn "API 限流 (HTTP 403)，重试 $((retries + 1))/$MAX_RETRIES"
            retries=$((retries + 1))
            sleep "$RETRY_DELAY"
        else
            log_error "API 请求失败：HTTP $http_code"
            return 1
        fi
    done
    
    log_error "API 请求达到最大重试次数"
    return 1
}

# -----------------------------------------------------------------------------
# 并发控制
# -----------------------------------------------------------------------------
MAX_CONCURRENT="${MAX_CONCURRENT:-3}"  # 最大并发请求数
SEMAPHORE_FILE="/tmp/awesome-openclaw-semaphore"

acquire_semaphore() {
    local count=0
    while [[ $(find "$SEMAPHORE_FILE"* 2>/dev/null | wc -l) -ge $MAX_CONCURRENT ]]; do
        sleep 1
        count=$((count + 1))
        if [[ $count -gt 60 ]]; then
            log_error "等待并发锁超时"
            return 1
        fi
    done
    touch "${SEMAPHORE_FILE}.$$"
}

release_semaphore() {
    rm -f "${SEMAPHORE_FILE}.$$"
}

# -----------------------------------------------------------------------------
# 监控告警
# -----------------------------------------------------------------------------
send_alert() {
    local title="$1"
    local message="$2"
    local level="${3:-ERROR}"
    
    # Telegram 通知（如果配置）
    if [[ -n "${TELEGRAM_BOT_TOKEN:-}" && -n "${TELEGRAM_CHAT_ID:-}" ]]; then
        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
            -d "chat_id=${TELEGRAM_CHAT_ID}" \
            -d "text=🚨 *${title}*%0A${message}" \
            -d "parse_mode=Markdown" > /dev/null
    fi
    
    # 飞书通知（如果配置）
    if [[ -n "${FEISHU_WEBHOOK:-}" ]]; then
        curl -s -X POST "$FEISHU_WEBHOOK" \
            -H "Content-Type: application/json" \
            -d "{
                \"msg_type\": \"text\",
                \"content\": {
                    \"text\": \"🚨 ${title}\\n${message}\"
                }
            }" > /dev/null
    fi
    
    log_warn "告警发送：$title - $message"
}

# -----------------------------------------------------------------------------
# 主更新逻辑
# -----------------------------------------------------------------------------
update_resources() {
    log_info "开始更新资源..."
    
    # 示例：获取 GitHub 上 OpenClaw 相关项目
    local search_query="openclaw+language:TypeScript+language:Python"
    local repos
    repos=$(api_request "/search/repositories?q=${search_query}&sort=updated&per_page=10")
    
    if [[ -n "$repos" ]]; then
        log_info "成功获取仓库列表"
        echo "$repos" | jq -r '.items[] | "\(.full_name): \(.stargazers_count) ⭐"' >> "${LOG_DIR}/repos-$(date +%Y%m%d).txt"
    else
        send_alert "资源更新失败" "无法获取 GitHub 仓库列表"
        return 1
    fi
    
    # 示例：获取 Issues
    local issues
    issues=$(api_request "/repos/earyantLe/awesome-openclaw/issues?state=open&per_page=5")
    
    if [[ -n "$issues" ]]; then
        log_info "成功获取 Issues 列表"
    fi
    
    log_info "资源更新完成"
    return 0
}

# -----------------------------------------------------------------------------
# 清理旧日志
# -----------------------------------------------------------------------------
cleanup_logs() {
    log_info "清理 7 天前的旧日志..."
    find "$LOG_DIR" -name "*.log" -mtime +7 -delete 2>/dev/null || true
    find "$LOG_DIR" -name "repos-*.txt" -mtime +7 -delete 2>/dev/null || true
}

# -----------------------------------------------------------------------------
# 主函数
# -----------------------------------------------------------------------------
main() {
    log_info "=========================================="
    log_info "Awesome OpenClaw 自动化更新启动"
    log_info "=========================================="
    
    # 加载配置
    load_tokens
    
    # 清理旧日志
    cleanup_logs
    
    # 执行更新
    if update_resources; then
        log_info "✅ 更新成功"
        exit 0
    else
        log_error "❌ 更新失败"
        send_alert "自动化更新失败" "脚本执行失败，请检查日志：$LOG_FILE"
        exit 1
    fi
}

# 捕获异常
trap 'log_error "脚本异常退出"; send_alert "脚本异常" "意外退出，日志：$LOG_FILE"' ERR

main "$@"
