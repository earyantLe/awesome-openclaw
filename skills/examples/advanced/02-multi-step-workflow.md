# Advanced Example 2: Multi-Step Workflow Automation ⚡

> **Difficulty**: ⭐⭐⭐⭐⭐ (Expert)  
> **Time to Complete**: 90 minutes  
> **Prerequisites**: Python, API integration, async programming, error handling

---

## Overview

This expert-level example demonstrates creating a complex multi-step workflow that integrates multiple skills: web search, document creation, data processing, and notification - all orchestrated in a single automated pipeline.

**本专家级示例演示创建复杂的多步骤工作流，整合多个技能：网页搜索、文档创建、数据处理和通知 - 全部编排在一个自动化管道中。**

---

## Workflow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Market Research Workflow                      │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         v                    v                    v
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ 1. Web Search   │  │ 2. Data         │  │ 3. Competitor   │
│ - Search news   │  │    Processing   │  │    Analysis     │
│ - Fetch articles│  │ - Extract data  │  │ - Compare       │
│ - Summarize     │  │ - Clean data    │  │ - Identify      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              v
                    ┌─────────────────┐
                    │ 4. Report       │
                    │    Generation   │
                    │ - Create doc    │
                    │ - Add charts    │
                    │ - Format        │
                    └─────────────────┘
                              │
                              v
                    ┌─────────────────┐
                    │ 5. Distribution │
                    │ - Send to team  │
                    │ - Post to chat  │
                    │ - Archive       │
                    └─────────────────┘
```

---

## Step 1: Create Workflow Orchestrator

Create `scripts/market_research_workflow.py`:

```python
#!/usr/bin/env python3
"""
Market Research Workflow Automation
Orchestrates: Web Search → Data Processing → Analysis → Report → Distribution

Usage: python market_research_workflow.py --topic "AI Trends 2026" --output-dir ./reports/
"""

import argparse
import asyncio
import json
from datetime import datetime
from pathlib import Path
import subprocess
import sys
from typing import Dict, List, Any

class MarketResearchWorkflow:
    """Multi-step market research automation"""
    
    def __init__(self, topic: str, output_dir: str):
        self.topic = topic
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        self.results = {
            'topic': topic,
            'timestamp': self.timestamp,
            'steps': {}
        }
    
    async def run(self):
        """Execute complete workflow"""
        print(f"🚀 Starting Market Research Workflow")
        print(f"   Topic: {self.topic}")
        print(f"   Output: {self.output_dir}")
        print()
        
        try:
            # Step 1: Web Search
            print("=" * 60)
            print("STEP 1: Web Search & Data Collection")
            print("=" * 60)
            search_results = await self.step1_web_search()
            self.results['steps']['search'] = search_results
            
            # Step 2: Data Processing
            print("\n" + "=" * 60)
            print("STEP 2: Data Processing & Extraction")
            print("=" * 60)
            processed_data = await self.step2_data_processing(search_results)
            self.results['steps']['processed_data'] = processed_data
            
            # Step 3: Competitor Analysis
            print("\n" + "=" * 60)
            print("STEP 3: Competitor Analysis")
            print("=" * 60)
            analysis = await self.step3_competitor_analysis(processed_data)
            self.results['steps']['analysis'] = analysis
            
            # Step 4: Report Generation
            print("\n" + "=" * 60)
            print("STEP 4: Report Generation")
            print("=" * 60)
            report_path = await self.step4_report_generation(analysis)
            self.results['steps']['report_path'] = str(report_path)
            
            # Step 5: Distribution
            print("\n" + "=" * 60)
            print("STEP 5: Distribution & Notification")
            print("=" * 60)
            distribution_result = await self.step5_distribution(report_path)
            self.results['steps']['distribution'] = distribution_result
            
            # Save workflow results
            self.save_results()
            
            print("\n" + "=" * 60)
            print("✅ WORKFLOW COMPLETED SUCCESSFULLY")
            print("=" * 60)
            print(f"   Report: {report_path}")
            print(f"   Results: {self.output_dir / 'workflow_results.json'}")
            
            return True
            
        except Exception as e:
            print(f"\n❌ WORKFLOW FAILED: {e}")
            self.save_results()
            return False
    
    async def step1_web_search(self) -> Dict:
        """Search web for relevant information"""
        print(f"🔍 Searching for: {self.topic}")
        
        # Use miaoda-studio-cli search-summary
        cmd = [
            'miaoda-studio-cli', 'search-summary',
            '--query', self.topic,
            '--output', 'json'
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode != 0:
            raise Exception(f"Search failed: {result.stderr}")
        
        search_data = json.loads(result.stdout)
        
        print(f"✓ Found {len(search_data.get('results', []))} relevant articles")
        
        # Fetch top 3 articles
        articles = []
        for i, item in enumerate(search_data.get('results', [])[:3]):
            url = item.get('url')
            if url:
                print(f"   Fetching: {url}")
                fetch_cmd = [
                    'miaoda-studio-cli', 'web-crawl',
                    '--url', url,
                    '--output', 'json'
                ]
                fetch_result = subprocess.run(fetch_cmd, capture_output=True, text=True)
                if fetch_result.returncode == 0:
                    articles.append(json.loads(fetch_result.stdout))
        
        print(f"✓ Fetched {len(articles)} full articles")
        
        return {
            'search_results': search_data,
            'articles': articles,
            'count': len(articles)
        }
    
    async def step2_data_processing(self, search_results: Dict) -> Dict:
        """Process and extract key information"""
        print("📊 Processing collected data...")
        
        extracted_info = []
        
        for i, article in enumerate(search_results.get('articles', [])):
            # Extract key points
            info = {
                'source': article.get('url', 'Unknown'),
                'title': article.get('title', 'Untitled'),
                'summary': article.get('summary', ''),
                'key_points': self.extract_key_points(article.get('content', '')),
                'sentiment': self.analyze_sentiment(article.get('content', ''))
            }
            extracted_info.append(info)
            print(f"   ✓ Processed article {i+1}")
        
        return {
            'extracted_info': extracted_info,
            'total_articles': len(extracted_info)
        }
    
    async def step3_competitor_analysis(self, processed_data: Dict) -> Dict:
        """Analyze competitors and trends"""
        print("📈 Analyzing competitors and trends...")
        
        # Simple analysis (in production, use AI/ML)
        all_key_points = []
        for info in processed_data.get('extracted_info', []):
            all_key_points.extend(info.get('key_points', []))
        
        # Count keyword frequencies
        keyword_freq = {}
        for point in all_key_points:
            words = point.lower().split()
            for word in words:
                if len(word) > 3:  # Skip short words
                    keyword_freq[word] = keyword_freq.get(word, 0) + 1
        
        # Top trends
        top_trends = sorted(keyword_freq.items(), key=lambda x: x[1], reverse=True)[:10]
        
        analysis = {
            'top_trends': top_trends,
            'total_keywords': len(keyword_freq),
            'sentiment_distribution': self.calculate_sentiment_distribution(processed_data)
        }
        
        print(f"✓ Identified {len(top_trends)} key trends")
        
        return analysis
    
    async def step4_report_generation(self, analysis: Dict) -> Path:
        """Generate comprehensive report"""
        print("📝 Generating report...")
        
        report_path = self.output_dir / f"market_research_{self.timestamp}.md"
        
        # Create markdown report
        report_content = f"""# Market Research Report: {self.topic}

**Generated**: {datetime.now().strftime('%Y-%m-%d %H:%M')}

---

## Executive Summary

This report analyzes the latest trends and developments related to "{self.topic}".

---

## Key Findings

### Top Trends

"""
        
        for i, (trend, count) in enumerate(analysis.get('top_trends', [])[:5], 1):
            report_content += f"{i}. **{trend.title()}** (mentioned {count} times)\n"
        
        report_content += f"""

### Sentiment Analysis

- Positive: {analysis.get('sentiment_distribution', {}).get('positive', 0)}%
- Neutral: {analysis.get('sentiment_distribution', {}).get('neutral', 0)}%
- Negative: {analysis.get('sentiment_distribution', {}).get('negative', 0)}%

---

## Recommendations

Based on the analysis, we recommend:

1. Monitor the top trends identified above
2. Conduct deeper analysis on key competitors
3. Update strategy based on market sentiment

---

## Methodology

- Data sources: Web search, news articles, industry reports
- Analysis period: Current week
- Tools: miaoda-studio-cli, custom Python scripts

---

*Report generated automatically by Market Research Workflow*
"""
        
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(report_content)
        
        print(f"✓ Report saved: {report_path}")
        
        # Optionally create Feishu doc
        # (Integration with feishu-create-doc would go here)
        
        return report_path
    
    async def step5_distribution(self, report_path: Path) -> Dict:
        """Distribute report to stakeholders"""
        print("📤 Distributing report...")
        
        distribution = {
            'report_path': str(report_path),
            'distributed_to': [],
            'notifications_sent': 0
        }
        
        # In production, this would:
        # 1. Upload to Feishu Drive
        # 2. Send to team chat
        # 3. Email stakeholders
        # 4. Create task for follow-up
        
        print("   ✓ Report ready for distribution")
        print("   (Configure distribution channels in production)")
        
        return distribution
    
    def extract_key_points(self, content: str) -> List[str]:
        """Extract key points from content"""
        # Simple extraction (use AI in production)
        sentences = content.split('.')[:5]  # First 5 sentences
        return [s.strip() for s in sentences if len(s.strip()) > 20]
    
    def analyze_sentiment(self, content: str) -> str:
        """Analyze sentiment (simple version)"""
        positive_words = ['good', 'great', 'excellent', 'positive', 'growth']
        negative_words = ['bad', 'poor', 'negative', 'decline', 'problem']
        
        content_lower = content.lower()
        positive_count = sum(1 for word in positive_words if word in content_lower)
        negative_count = sum(1 for word in negative_words if word in content_lower)
        
        if positive_count > negative_count:
            return 'positive'
        elif negative_count > positive_count:
            return 'negative'
        else:
            return 'neutral'
    
    def calculate_sentiment_distribution(self, processed_data: Dict) -> Dict:
        """Calculate overall sentiment distribution"""
        sentiments = [
            info.get('sentiment', 'neutral')
            for info in processed_data.get('extracted_info', [])
        ]
        
        total = len(sentiments) or 1
        return {
            'positive': round(sentiments.count('positive') / total * 100),
            'neutral': round(sentiments.count('neutral') / total * 100),
            'negative': round(sentiments.count('negative') / total * 100)
        }
    
    def save_results(self):
        """Save workflow results to JSON"""
        results_path = self.output_dir / 'workflow_results.json'
        with open(results_path, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        print(f"💾 Results saved: {results_path}")

async def main():
    parser = argparse.ArgumentParser(description='Market Research Workflow')
    parser.add_argument('--topic', '-t', required=True, help='Research topic')
    parser.add_argument('--output-dir', '-o', default='./reports', help='Output directory')
    
    args = parser.parse_args()
    
    workflow = MarketResearchWorkflow(args.topic, args.output_dir)
    success = await workflow.run()
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    asyncio.run(main())
```

---

## Usage Examples

### Example 1: Basic Workflow

```bash
python scripts/market_research_workflow.py \
  --topic "AI Trends 2026" \
  --output-dir ./reports/
```

### Example 2: Competitor Analysis

```bash
python scripts/market_research_workflow.py \
  --topic "Electric Vehicle Market Analysis" \
  --output-dir ./ev-reports/
```

---

## Best Practices

1. **Error handling** - Catch and log all errors
2. **Async execution** - Use asyncio for I/O operations
3. **Progressive disclosure** - Show progress at each step
4. **Result persistence** - Save intermediate results
5. **Idempotency** - Safe to re-run

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| No error handling | Wrap each step in try-except |
| Synchronous I/O | Use async for network calls |
| No progress logging | Log each step's progress |
| Losing intermediate data | Save results at each step |

---

## Next Steps

1. ✅ Add AI-powered analysis
2. ✅ Integrate with Feishu for auto-sharing
3. ✅ Add scheduling (cron jobs)
4. ✅ Implement alerting for key trends

---

**Last Updated**: 2026-03-18  
**Author**: OpenClaw Community 🦞
