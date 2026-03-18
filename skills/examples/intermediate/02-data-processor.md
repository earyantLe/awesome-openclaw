# Intermediate Example 2: Data Processor 📊

> **Difficulty**: ⭐⭐⭐☆☆ (Intermediate)  
> **Time to Complete**: 40 minutes  
> **Prerequisites**: Python basics, CSV/JSON knowledge, basic SQL

---

## Overview

This example shows how to create a skill for data processing including CSV/JSON conversion, data filtering, aggregation, and export to multiple formats.

**本示例展示如何创建数据处理技能，包括 CSV/JSON 转换、数据过滤、聚合和导出为多种格式。**

---

## Skill Structure

```
data-processor/
├── SKILL.md
├── scripts/
│   ├── convert_format.py
│   ├── filter_data.py
│   └── aggregate_data.py
├── references/
│   └── data-formats.md
└── examples/
    ├── sample.csv
    └── sample.json
```

---

## Step 1: Create SKILL.md

```yaml
---
name: data-processor
description: |
  Data processing operations: format conversion (CSV/JSON/Excel), filtering, 
  aggregation, and export. Supports data validation and transformation.
  数据处理：格式转换 (CSV/JSON/Excel)、过滤、聚合和导出。支持数据验证和转换。
  
  **When to use**: User needs to convert data formats, filter datasets, aggregate data,
  or prepare data for analysis.
  **触发词**: "数据转换", "convert CSV", "filter data", "aggregate", "数据过滤", "export data"
---

# Data Processor Skill

## When to Use

✅ **USE this skill when:**
- Convert CSV to JSON (or vice versa)
- Filter data by conditions
- Aggregate data (sum, average, count)
- Export to Excel/CSV/JSON
- Validate data quality

❌ **DON'T use when:**
- Real-time data processing (use streaming tools)
- Big data (>1GB, use Spark/Dask)
- Database operations (use SQL)

## Operations

### 1. Format Conversion

```bash
# CSV to JSON
python scripts/convert_format.py \
  --input data.csv \
  --output data.json \
  --from csv \
  --to json

# JSON to CSV
python scripts/convert_format.py \
  --input data.json \
  --output data.csv \
  --from json \
  --to csv

# CSV to Excel
python scripts/convert_format.py \
  --input data.csv \
  --output data.xlsx \
  --from csv \
  --to xlsx
```

### 2. Data Filtering

```bash
# Filter by column value
python scripts/filter_data.py \
  --input data.csv \
  --output filtered.csv \
  --where "status=active" \
  --where "age>25"

# Filter with multiple conditions
python scripts/filter_data.py \
  --input data.json \
  --output filtered.json \
  --where "department=Engineering" \
  --where "salary>=50000" \
  --operator AND
```

### 3. Data Aggregation

```bash
# Group by and aggregate
python scripts/aggregate_data.py \
  --input sales.csv \
  --output summary.csv \
  --group-by region \
  --aggregate "sum(revenue)" \
  --aggregate "count(order_id)" \
  --aggregate "avg(price)"
```

## Supported Formats

| Format | Extension | Read | Write | Notes |
|--------|-----------|------|-------|-------|
| CSV | .csv | ✅ | ✅ | Comma-separated |
| JSON | .json | ✅ | ✅ | Nested support |
| Excel | .xlsx | ✅ | ✅ | Multiple sheets |
| TSV | .tsv | ✅ | ✅ | Tab-separated |
| Parquet | .parquet | ✅ | ✅ | Columnar format |

## Filter Operators

| Operator | Example | Description |
|----------|---------|-------------|
| `=` | `status=active` | Equals |
| `!=` | `type!=premium` | Not equals |
| `>` | `age>25` | Greater than |
| `>=` | `price>=100` | Greater or equal |
| `<` | `score<60` | Less than |
| `<=` | `quantity<=10` | Less or equal |
| `in` | `city in Beijing,Shanghai` | In list |
| `contains` | `name contains John` | Contains text |

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| File not found | Wrong path | Check file path |
| Invalid JSON | Syntax error | Validate JSON format |
| Column not found | Typo in column name | Check column names |
| Type mismatch | Comparing different types | Cast to same type |
```

---

## Step 2: Create Format Conversion Script

Create `scripts/convert_format.py`:

```python
#!/usr/bin/env python3
"""
Data Format Converter
Usage: python convert_format.py --input data.csv --output data.json --from csv --to json
"""

import argparse
import csv
import json
import pandas as pd
from pathlib import Path
import sys

def read_csv(file_path):
    """Read CSV file"""
    return pd.read_csv(file_path)

def read_json(file_path):
    """Read JSON file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # Handle both list and dict formats
    if isinstance(data, list):
        return pd.DataFrame(data)
    else:
        return pd.DataFrame.from_dict(data, orient='index')

def read_excel(file_path):
    """Read Excel file"""
    return pd.read_excel(file_path)

def write_csv(df, file_path):
    """Write to CSV"""
    Path(file_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(file_path, index=False, encoding='utf-8-sig')

def write_json(df, file_path, orient='records'):
    """Write to JSON"""
    Path(file_path).parent.mkdir(parents=True, exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        if orient == 'records':
            json.dump(df.to_dict(orient='records'), f, indent=2, ensure_ascii=False)
        else:
            json.dump(df.to_dict(orient=orient), f, indent=2, ensure_ascii=False)

def write_excel(df, file_path, sheet_name='Data'):
    """Write to Excel"""
    Path(file_path).parent.mkdir(parents=True, exist_ok=True)
    df.to_excel(file_path, index=False, sheet_name=sheet_name)

def convert_format(input_path, output_path, from_format, to_format):
    """Convert data from one format to another"""
    
    # Read input
    print(f"📖 Reading {from_format.upper()} file: {input_path}")
    
    try:
        if from_format == 'csv':
            df = read_csv(input_path)
        elif from_format == 'json':
            df = read_json(input_path)
        elif from_format == 'xlsx' or from_format == 'excel':
            df = read_excel(input_path)
        else:
            print(f"❌ Error: Unsupported input format: {from_format}")
            return False
        
        print(f"✓ Loaded {len(df)} rows, {len(df.columns)} columns")
        
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return False
    
    # Write output
    print(f"📝 Writing {to_format.upper()} file: {output_path}")
    
    try:
        if to_format == 'csv':
            write_csv(df, output_path)
        elif to_format == 'json':
            write_json(df, output_path)
        elif to_format == 'xlsx' or to_format == 'excel':
            write_excel(df, output_path)
        else:
            print(f"❌ Error: Unsupported output format: {to_format}")
            return False
        
        print(f"✅ Conversion complete: {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error writing file: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Convert data formats')
    parser.add_argument('--input', '-i', required=True, help='Input file path')
    parser.add_argument('--output', '-o', required=True, help='Output file path')
    parser.add_argument('--from', dest='from_format', required=True,
                       choices=['csv', 'json', 'xlsx', 'excel'],
                       help='Input format')
    parser.add_argument('--to', dest='to_format', required=True,
                       choices=['csv', 'json', 'xlsx', 'excel'],
                       help='Output format')
    
    args = parser.parse_args()
    
    # Auto-detect format from extension if not specified
    from_format = args.from_format
    to_format = args.to_format
    
    success = convert_format(args.input, args.output, from_format, to_format)
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
```

---

## Step 3: Create Filter Script

Create `scripts/filter_data.py`:

```python
#!/usr/bin/env python3
"""
Data Filter
Usage: python filter_data.py --input data.csv --output filtered.csv --where "age>25"
"""

import argparse
import pandas as pd
from pathlib import Path
import sys
import re

def parse_condition(condition):
    """Parse condition string into column, operator, value"""
    operators = ['>=', '<=', '!=', '=', '>', '<', ' in ', ' contains ']
    
    for op in operators:
        if op in condition:
            parts = condition.split(op, 1)
            if len(parts) == 2:
                column = parts[0].strip()
                value = parts[1].strip()
                return column, op.strip(), value
    
    raise ValueError(f"Invalid condition: {condition}")

def apply_filter(df, conditions, operator='AND'):
    """Apply filter conditions to dataframe"""
    
    if not conditions:
        return df
    
    masks = []
    
    for condition in conditions:
        column, op, value = parse_condition(condition)
        
        # Check column exists
        if column not in df.columns:
            raise ValueError(f"Column not found: {column}")
        
        # Apply condition
        if op == '=':
            mask = df[column] == value
        elif op == '!=':
            mask = df[column] != value
        elif op == '>':
            mask = df[column] > float(value)
        elif op == '>=':
            mask = df[column] >= float(value)
        elif op == '<':
            mask = df[column] < float(value)
        elif op == '<=':
            mask = df[column] <= float(value)
        elif op == 'in':
            values = [v.strip() for v in value.split(',')]
            mask = df[column].isin(values)
        elif op == 'contains':
            mask = df[column].astype(str).str.contains(value, case=False, na=False)
        else:
            raise ValueError(f"Unsupported operator: {op}")
        
        masks.append(mask)
    
    # Combine masks
    if operator == 'AND':
        combined_mask = masks[0]
        for mask in masks[1:]:
            combined_mask &= mask
    elif operator == 'OR':
        combined_mask = masks[0]
        for mask in masks[1:]:
            combined_mask |= mask
    else:
        raise ValueError(f"Invalid operator: {operator}")
    
    return df[combined_mask]

def filter_data(input_path, output_path, conditions, operator):
    """Filter data based on conditions"""
    
    # Detect format from extension
    ext = Path(input_path).suffix.lower()
    if ext == '.csv':
        df = pd.read_csv(input_path)
        write_func = lambda d, p: d.to_csv(p, index=False, encoding='utf-8-sig')
    elif ext == '.json':
        df = pd.read_json(input_path)
        write_func = lambda d, p: d.to_json(p, orient='records', force_ascii=False, indent=2)
    elif ext in ['.xlsx', '.xls']:
        df = pd.read_excel(input_path)
        write_func = lambda d, p: d.to_excel(p, index=False)
    else:
        print(f"❌ Error: Unsupported format: {ext}")
        return False
    
    print(f"📖 Loaded {len(df)} rows")
    
    # Apply filters
    if conditions:
        print(f"🔍 Applying {len(conditions)} conditions ({operator}):")
        for cond in conditions:
            print(f"   - {cond}")
        
        try:
            filtered_df = apply_filter(df, conditions, operator)
        except Exception as e:
            print(f"❌ Error filtering: {e}")
            return False
        
        print(f"✓ Filtered to {len(filtered_df)} rows (removed {len(df) - len(filtered_df)})")
    else:
        filtered_df = df
    
    # Write output
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    write_func(filtered_df, output_path)
    print(f"✅ Saved filtered data: {output_path}")
    
    return True

def main():
    parser = argparse.ArgumentParser(description='Filter data')
    parser.add_argument('--input', '-i', required=True, help='Input file path')
    parser.add_argument('--output', '-o', required=True, help='Output file path')
    parser.add_argument('--where', '-w', action='append', help='Filter condition (can be repeated)')
    parser.add_argument('--operator', choices=['AND', 'OR'], default='AND',
                       help='Logical operator for multiple conditions')
    
    args = parser.parse_args()
    
    success = filter_data(args.input, args.output, args.where, args.operator)
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
```

---

## Step 4: Test the Skill

### Test 1: CSV to JSON

```bash
python scripts/convert_format.py \
  --input users.csv \
  --output users.json \
  --from csv \
  --to json
```

### Test 2: Filter Data

```bash
python scripts/filter_data.py \
  --input employees.csv \
  --output active_employees.json \
  --where "status=active" \
  --where "age>30"
```

### Test 3: Convert to Excel

```bash
python scripts/convert_format.py \
  --input data.json \
  --output report.xlsx \
  --from json \
  --to xlsx
```

---

## Installation

```bash
# Install dependencies
pip install pandas openpyxl

# Verify installation
python -c "import pandas; print('Pandas installed!')"
```

---

## Best Practices

1. **Validate data first** - Check for missing values
2. **Backup original files** - Keep originals safe
3. **Use appropriate types** - Ensure correct data types
4. **Handle encoding** - Use UTF-8 for international data
5. **Test filters** - Verify filter logic before batch processing

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Not handling encoding | Use `encoding='utf-8-sig'` for CSV |
| Comparing strings as numbers | Cast to appropriate type |
| Not checking column names | Validate column existence first |
| Large files in memory | Process in chunks for big files |

---

## Next Steps

1. ✅ Try the **Advanced** example (API Integration)
2. ✅ Add data validation rules
3. ✅ Implement data transformation functions
4. ✅ Support database connections

---

**Last Updated**: 2026-03-18  
**Author**: OpenClaw Community 🦞
