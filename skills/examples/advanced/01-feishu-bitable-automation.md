# Advanced Example 1: Feishu Bitable Automation 🤖

> **Difficulty**: ⭐⭐⭐⭐☆ (Advanced)  
> **Time to Complete**: 60 minutes  
> **Prerequisites**: Python, REST APIs, Feishu Open Platform, OAuth 2.0

---

## Overview

This advanced example demonstrates creating a comprehensive skill for automating Feishu Bitable (多维表格) operations including CRUD operations, batch processing, advanced filtering, and webhook integration.

**本高级示例演示创建综合技能，自动化飞书多维表格操作，包括 CRUD 操作、批量处理、高级过滤和 Webhook 集成。**

---

## Skill Structure

```
feishu-bitable-automation/
├── SKILL.md
├── scripts/
│   ├── bitable_client.py          # API client
│   ├── batch_import.py            # Batch operations
│   ├── advanced_filter.py         # Complex filtering
│   └── webhook_handler.py         # Webhook integration
├── references/
│   ├── api-reference.md           # API documentation
│   ├── field-types.md             # Field type reference
│   └── error-codes.md             # Error code reference
├── examples/
│   ├── crm-import.json            # CRM import example
│   └── project-tracker.json       # Project tracker example
└── tests/
    └── test_bitable.py            # Unit tests
```

---

## Step 1: Create SKILL.md

```yaml
---
name: feishu-bitable-automation
description: |
  Advanced Feishu Bitable automation with batch CRUD, complex filtering, 
  webhook triggers, and data synchronization. Supports all 27 field types.
  高级飞书多维表格自动化，支持批量 CRUD、复杂过滤、Webhook 触发和数据同步。
  支持全部 27 种字段类型。
  
  **When to use**: User needs to automate Bitable operations, sync data from external sources,
  process large datasets, or integrate with other systems.
  **触发词**: "多维表格自动化", "bitable automation", "批量导入", "batch import", "数据同步", "webhook"
---

# Feishu Bitable Automation

## When to Use

✅ **USE this skill when:**
- Batch import/export thousands of records
- Sync data from external APIs/databases
- Complex filtering and aggregation
- Automated workflows with webhooks
- Data transformation and validation

❌ **DON'T use when:**
- Simple manual edits (use Feishu UI)
- Real-time sync (<1 second latency)
- Unstructured data (use docs instead)

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│ External    │      │ Bitable      │      │ Feishu      │
│ Data Source │─────>│ Automation   │─────>│ Bitable API │
│ (API/DB)    │      │ Scripts      │      │             │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            v
                     ┌──────────────┐
                     │ Webhook      │
                     │ Triggers     │
                     └──────────────┘
```

## Core Operations

### 1. Batch Import

```bash
python scripts/batch_import.py \
  --app-token S404bxxxxxxxxxx \
  --table-id tblxxxxxxxxxx \
  --input data.json \
  --batch-size 500 \
  --validate
```

### 2. Advanced Filtering

```bash
python scripts/advanced_filter.py \
  --app-token S404bxxxxxxxxxx \
  --table-id tblxxxxxxxxxx \
  --filter '{
    "conjunction": "and",
    "conditions": [
      {"field_name": "Status", "operator": "is", "value": ["Active"]},
      {"field_name": "Amount", "operator": "isGreater", "value": ["10000"]},
      {"field_name": "Date", "operator": "isGreater", "value": ["Today"]}
    ]
  }' \
  --output filtered.json
```

### 3. Webhook Integration

```bash
python scripts/webhook_handler.py \
  --app-token S404bxxxxxxxxxx \
  --table-id tblxxxxxxxxxx \
  --webhook-url https://your-server.com/webhook \
  --events record.created,record.updated
```

## Field Type Reference

| Type | ID | Value Format | Example |
|------|----|--------------|---------|
| Text | 1 | String | `"Hello"` |
| Number | 2 | Number | `123.45` |
| Single Select | 3 | String | `"Option A"` |
| Multi Select | 4 | String[] | `["A", "B"]` |
| Date | 5 | Timestamp (ms) | `1674206443000` |
| Checkbox | 7 | Boolean | `true` |
| User | 11 | Object[] | `[{id: "ou_xxx"}]` |
| Phone | 13 | String | `"+8613800138000"` |
| URL | 15 | Object | `{text: "Link", link: "https://"}` |
| Attachment | 17 | Object[] | `[{file_token: "xxx"}]` |
| Link Record | 20 | Object[] | `[{record_id: "recxxx"}]` |

## Common Errors

| Error Code | Message | Solution |
|------------|---------|----------|
| 1254064 | DatetimeFieldConvFail | Use milliseconds timestamp |
| 1254066 | UserFieldConvFail | Format: `[{id: "ou_xxx"}]` |
| 1254068 | URLFieldConvFail | Format: `{text, link}` object |
| 1254104 | RecordAddOnceExceedLimit | Batch size ≤ 500 |
| 1254291 | Write conflict | Serialize writes with delay |
```

---

## Step 2: Create API Client

Create `scripts/bitable_client.py`:

```python
#!/usr/bin/env python3
"""
Feishu Bitable API Client
Usage: from bitable_client import BitableClient
"""

import requests
import time
import json
from typing import List, Dict, Any, Optional
from datetime import datetime

class BitableClient:
    """Feishu Bitable API Client with retry logic and rate limiting"""
    
    BASE_URL = "https://open.feishu.cn/open-apis/bitable/v1"
    
    def __init__(self, app_token: str, access_token: str):
        self.app_token = app_token
        self.access_token = access_token
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        })
    
    def _request(self, method: str, endpoint: str, data: Optional[Dict] = None, 
                 retry: int = 3) -> Dict:
        """Make API request with retry logic"""
        url = f"{self.BASE_URL}/{self.app_token}/{endpoint}"
        
        for attempt in range(retry):
            try:
                response = self.session.request(
                    method, 
                    url, 
                    json=data,
                    timeout=30
                )
                response.raise_for_status()
                result = response.json()
                
                if result.get('code') != 0:
                    raise Exception(f"API Error: {result}")
                
                return result.get('data', {})
                
            except requests.exceptions.RequestException as e:
                if attempt == retry - 1:
                    raise
                # Exponential backoff
                wait_time = (2 ** attempt) * 0.5
                time.sleep(wait_time)
    
    def list_tables(self) -> List[Dict]:
        """List all tables in app"""
        return self._request('get', 'tables')
    
    def list_fields(self, table_id: str) -> List[Dict]:
        """List all fields in table"""
        return self._request('get', f'apps/{self.app_token}/tables/{table_id}/fields')
    
    def list_records(self, table_id: str, page_size: int = 500, 
                     filter: Optional[Dict] = None) -> List[Dict]:
        """List records with optional filtering"""
        params = {'page_size': page_size}
        if filter:
            params['filter'] = json.dumps(filter)
        
        response = self._request('get', f'apps/{self.app_token}/tables/{table_id}/records', 
                                data=params)
        return response.get('items', [])
    
    def create_records(self, table_id: str, records: List[Dict]) -> List[Dict]:
        """Batch create records (max 500)"""
        if len(records) > 500:
            raise ValueError("Max 500 records per batch")
        
        response = self._request('post', 
                                f'apps/{self.app_token}/tables/{table_id}/records',
                                data={'records': records})
        return response.get('items', [])
    
    def update_records(self, table_id: str, records: List[Dict]) -> List[Dict]:
        """Batch update records (max 500)"""
        if len(records) > 500:
            raise ValueError("Max 500 records per batch")
        
        response = self._request('put',
                                f'apps/{self.app_token}/tables/{table_id}/records',
                                data={'records': records})
        return response.get('items', [])
    
    def delete_records(self, table_id: str, record_ids: List[str]) -> bool:
        """Batch delete records (max 500)"""
        if len(record_ids) > 500:
            raise ValueError("Max 500 records per batch")
        
        self._request('delete',
                     f'apps/{self.app_token}/tables/{table_id}/records',
                     data={'record_ids': record_ids})
        return True
    
    def batch_import(self, table_id: str, records: List[Dict], 
                    batch_size: int = 500, delay: float = 1.0) -> Dict:
        """Batch import with automatic chunking and rate limiting"""
        total = len(records)
        success = 0
        failed = 0
        
        for i in range(0, total, batch_size):
            batch = records[i:i + batch_size]
            try:
                result = self.create_records(table_id, batch)
                success += len(result)
                print(f"✓ Imported {success}/{total} records")
            except Exception as e:
                failed += len(batch)
                print(f"❌ Failed batch: {e}")
            
            # Rate limiting
            if i + batch_size < total:
                time.sleep(delay)
        
        return {'success': success, 'failed': failed}
```

---

## Step 3: Create Batch Import Script

Create `scripts/batch_import.py`:

```python
#!/usr/bin/env python3
"""
Batch Import to Feishu Bitable
Usage: python batch_import.py --app-token S404b... --table-id tbl... --input data.json
"""

import argparse
import json
from pathlib import Path
from bitable_client import BitableClient
import os
import sys

def validate_record(record: Dict, fields: List[Dict]) -> tuple:
    """Validate record against field schema"""
    errors = []
    
    for field_name, value in record.items():
        # Find field definition
        field_def = next((f for f in fields if f['field_name'] == field_name), None)
        
        if not field_def:
            errors.append(f"Unknown field: {field_name}")
            continue
        
        # Type validation
        field_type = field_def['type']
        
        # Add type-specific validation here
        # Example: User field must be [{id: "ou_xxx"}]
        if field_type == 11:  # User field
            if not isinstance(value, list) or not all('id' in v for v in value):
                errors.append(f"Field {field_name}: User field must be [{id: 'ou_xxx'}]")
        
        # Example: Date field must be milliseconds timestamp
        if field_type == 5:  # Date field
            if not isinstance(value, (int, float)):
                errors.append(f"Field {field_name}: Date must be timestamp (ms)")
    
    return len(errors) == 0, errors

def batch_import(app_token: str, table_id: str, input_file: str, 
                validate: bool, batch_size: int):
    """Main batch import function"""
    
    # Get access token from environment
    access_token = os.getenv('FEISHU_ACCESS_TOKEN')
    if not access_token:
        print("❌ Error: FEISHU_ACCESS_TOKEN not set")
        return False
    
    # Initialize client
    client = BitableClient(app_token, access_token)
    
    # Load data
    print(f"📖 Loading data from: {input_file}")
    with open(input_file, 'r', encoding='utf-8') as f:
        records = json.load(f)
    
    if not isinstance(records, list):
        print("❌ Error: Input must be array of records")
        return False
    
    print(f"✓ Loaded {len(records)} records")
    
    # Get field schema
    if validate:
        print("🔍 Fetching field schema...")
        fields = client.list_fields(table_id)
        print(f"✓ Found {len(fields)} fields")
        
        # Validate all records
        print("🔍 Validating records...")
        valid_records = []
        invalid_count = 0
        
        for record in records:
            is_valid, errors = validate_record(record.get('fields', {}), fields)
            if is_valid:
                valid_records.append(record)
            else:
                invalid_count += 1
                print(f"  ❌ Invalid record: {errors}")
        
        if invalid_count > 0:
            print(f"⚠️  Skipped {invalid_count} invalid records")
        
        records = valid_records
    
    # Batch import
    print(f"🚀 Starting batch import (batch_size={batch_size})...")
    result = client.batch_import(table_id, records, batch_size=batch_size)
    
    print()
    print(f"✅ Import complete:")
    print(f"   Success: {result['success']}")
    print(f"   Failed: {result['failed']}")
    
    return result['failed'] == 0

def main():
    parser = argparse.ArgumentParser(description='Batch import to Feishu Bitable')
    parser.add_argument('--app-token', required=True, help='Bitable app token')
    parser.add_argument('--table-id', required=True, help='Table ID')
    parser.add_argument('--input', '-i', required=True, help='Input JSON file')
    parser.add_argument('--validate', action='store_true', help='Validate records')
    parser.add_argument('--batch-size', type=int, default=500, help='Batch size (max 500)')
    
    args = parser.parse_args()
    
    success = batch_import(
        args.app_token,
        args.table_id,
        args.input,
        args.validate,
        args.batch_size
    )
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
```

---

## Step 4: Test the Skill

### Test 1: Basic Import

```bash
export FEISHU_ACCESS_TOKEN="your_access_token"

python scripts/batch_import.py \
  --app-token S404bxxxxxxxxxx \
  --table-id tblxxxxxxxxxx \
  --input test-data.json \
  --validate
```

### Test 2: Large Dataset

```bash
python scripts/batch_import.py \
  --app-token S404bxxxxxxxxxx \
  --table-id tblxxxxxxxxxx \
  --input crm-contacts.json \
  --batch-size 500 \
  --validate
```

---

## Installation

```bash
# Install dependencies
pip install requests python-dotenv

# Set environment variables
echo "FEISHU_ACCESS_TOKEN=your_token" >> .env
```

---

## Best Practices

1. **Always validate** - Check data before import
2. **Use batches** - Max 500 records per batch
3. **Rate limiting** - Add delays between batches
4. **Error handling** - Log and retry failed batches
5. **Backup first** - Export existing data before bulk operations

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Not handling rate limits | Add 1s delay between batches |
| Ignoring field types | Validate against schema first |
| Too large batches | Keep batches ≤ 500 records |
| No error logging | Log all errors for debugging |

---

## Next Steps

1. ✅ Implement webhook handlers
2. ✅ Add data transformation pipelines
3. ✅ Create sync jobs with external APIs
4. ✅ Build monitoring and alerting

---

**Last Updated**: 2026-03-18  
**Author**: OpenClaw Community 🦞
