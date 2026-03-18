# Intermediate Example 1: Image Processor 🖼️

> **Difficulty**: ⭐⭐⭐☆☆ (Intermediate)  
> **Time to Complete**: 30 minutes  
> **Prerequisites**: Python basics, image processing concepts

---

## Overview

This example demonstrates creating a skill for batch image processing including rotation, resizing, format conversion, and watermarking. Uses PIL/Pillow library.

**本示例演示创建批量图像处理技能，包括旋转、调整大小、格式转换和水印添加。使用 PIL/Pillow 库。**

---

## Skill Structure

```
image-processor/
├── SKILL.md
├── scripts/
│   ├── process_image.py
│   ├── batch_resize.py
│   └── add_watermark.py
├── references/
│   └── supported-formats.md
└── assets/
    └── watermark.png
```

---

## Step 1: Create SKILL.md

```yaml
---
name: image-processor
description: |
  Batch image processing operations: resize, rotate, convert formats, add watermarks.
  Supports PNG, JPG, WebP, GIF, BMP.
  批量图像处理：调整大小、旋转、格式转换、添加水印。
  支持 PNG、JPG、WebP、GIF、BMP 格式。
  
  **When to use**: User needs to process multiple images, convert formats, add watermarks,
  or prepare images for web/social media.
  **触发词**: "处理图片", "batch images", "resize", "convert format", "watermark", "压缩图片"
---

# Image Processor Skill

## When to Use

✅ **USE this skill when:**
- Resize multiple images for web
- Convert PNG to JPG (or vice versa)
- Add watermarks to images
- Rotate/flip images
- Compress images for email

❌ **DON'T use when:**
- Advanced photo editing (use Photoshop)
- Vector graphics (use Illustrator)
- RAW photo processing (use Lightroom)

## Operations

### 1. Resize Images

```bash
python scripts/batch_resize.py \
  --input ./photos/ \
  --output ./resized/ \
  --width 1920 \
  --height 1080 \
  --quality 85
```

### 2. Convert Format

```bash
python scripts/process_image.py \
  --input image.png \
  --output image.jpg \
  --format jpg \
  --quality 90
```

### 3. Add Watermark

```bash
python scripts/add_watermark.py \
  --input ./photos/ \
  --output ./watermarked/ \
  --watermark ./assets/watermark.png \
  --position bottom-right \
  --opacity 0.5
```

### 4. Rotate Images

```bash
python scripts/process_image.py \
  --input photo.jpg \
  --output rotated.jpg \
  --rotate 90
```

## Supported Formats

| Format | Extension | Read | Write | Notes |
|--------|-----------|------|-------|-------|
| JPEG | .jpg, .jpeg | ✅ | ✅ | Lossy compression |
| PNG | .png | ✅ | ✅ | Lossless, transparency |
| WebP | .webp | ✅ | ✅ | Modern format |
| GIF | .gif | ✅ | ✅ | Animation support |
| BMP | .bmp | ✅ | ✅ | Uncompressed |
| TIFF | .tiff | ✅ | ✅ | High quality |

## Parameters

### Resize Parameters

- `--width`: Target width in pixels
- `--height`: Target height in pixels
- `--maintain-aspect`: Keep aspect ratio (default: true)
- `--quality`: JPEG/WebP quality 1-100 (default: 85)

### Watermark Parameters

- `--position`: top-left, top-right, bottom-left, bottom-right, center
- `--opacity`: 0.0 to 1.0 (default: 0.5)
- `--scale`: Watermark scale relative to image (default: 0.2)

### Rotation Parameters

- `--rotate`: Degrees clockwise (90, 180, 270)
- `--flip`: horizontal or vertical

## Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| PIL not found | Missing dependency | `pip install Pillow` |
| Unsupported format | Unknown extension | Check supported formats |
| Out of memory | Image too large | Process in batches |
| Permission denied | Read/write error | Check file permissions |
```

---

## Step 2: Create Main Script

Create `scripts/process_image.py`:

```python
#!/usr/bin/env python3
"""
Image Processor - Single image operations
Usage: python process_image.py --input in.jpg --output out.jpg [options]
"""

import argparse
from PIL import Image, ImageEnhance
from pathlib import Path
import sys

def process_image(input_path, output_path, 
                  resize=None, rotate=None, flip=None,
                  format=None, quality=85):
    """Process a single image"""
    
    # Open image
    try:
        img = Image.open(input_path)
    except FileNotFoundError:
        print(f"❌ Error: File not found: {input_path}")
        return False
    except Exception as e:
        print(f"❌ Error opening image: {e}")
        return False
    
    # Convert to RGB if necessary (for JPEG)
    if img.mode in ('RGBA', 'P') and format == 'jpg':
        img = img.convert('RGB')
    
    # Resize
    if resize:
        width, height = resize
        img = img.resize((width, height), Image.Resampling.LANCZOS)
        print(f"✓ Resized to {width}x{height}")
    
    # Rotate
    if rotate:
        img = img.rotate(-rotate, expand=True)  # Negative for clockwise
        print(f"✓ Rotated {rotate}°")
    
    # Flip
    if flip == 'horizontal':
        img = img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    elif flip == 'vertical':
        img = img.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
    
    # Determine output format
    if format:
        output_format = format.upper()
    else:
        output_format = Path(output_path).suffix[1:].upper()
    
    # Save image
    try:
        # Ensure output directory exists
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        
        # Save with appropriate options
        if output_format in ['JPEG', 'JPG']:
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
        elif output_format == 'PNG':
            img.save(output_path, 'PNG', optimize=True)
        elif output_format == 'WEBP':
            img.save(output_path, 'WEBP', quality=quality)
        else:
            img.save(output_path, output_format)
        
        print(f"✅ Saved: {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error saving image: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description='Process images')
    parser.add_argument('--input', '-i', required=True, help='Input image path')
    parser.add_argument('--output', '-o', required=True, help='Output image path')
    parser.add_argument('--width', type=int, help='Target width')
    parser.add_argument('--height', type=int, help='Target height')
    parser.add_argument('--rotate', type=int, choices=[90, 180, 270], help='Rotate degrees')
    parser.add_argument('--flip', choices=['horizontal', 'vertical'], help='Flip direction')
    parser.add_argument('--format', choices=['jpg', 'png', 'webp', 'gif'], help='Output format')
    parser.add_argument('--quality', type=int, default=85, help='Quality 1-100 (default: 85)')
    
    args = parser.parse_args()
    
    # Prepare resize tuple
    resize = None
    if args.width or args.height:
        with Image.open(args.input) as img:
            width = args.width or img.width
            height = args.height or img.height
            resize = (width, height)
    
    # Process image
    success = process_image(
        args.input,
        args.output,
        resize=resize,
        rotate=args.rotate,
        flip=args.flip,
        format=args.format,
        quality=args.quality
    )
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
```

---

## Step 3: Create Batch Resize Script

Create `scripts/batch_resize.py`:

```python
#!/usr/bin/env python3
"""
Batch Image Resizer
Usage: python batch_resize.py --input ./photos/ --output ./resized/ --width 1920
"""

import argparse
from PIL import Image
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import sys

SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif']

def resize_image(input_path, output_path, width, height, maintain_aspect, quality):
    """Resize a single image"""
    try:
        with Image.open(input_path) as img:
            # Calculate dimensions
            if maintain_aspect:
                img.thumbnail((width, height), Image.Resampling.LANCZOS)
            else:
                img = img.resize((width, height), Image.Resampling.LANCZOS)
            
            # Convert if necessary
            if img.mode in ('RGBA', 'P') and output_path.suffix.lower() in ['.jpg', '.jpeg']:
                img = img.convert('RGB')
            
            # Save
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            if output_path.suffix.lower() in ['.jpg', '.jpeg']:
                img.save(output_path, 'JPEG', quality=quality, optimize=True)
            else:
                img.save(output_path, optimize=True)
            
            return True, f"✓ {input_path.name}"
            
    except Exception as e:
        return False, f"❌ {input_path.name}: {e}"

def batch_resize(input_dir, output_dir, width, height, maintain_aspect, quality, max_workers=4):
    """Resize all images in directory"""
    
    input_path = Path(input_dir)
    output_path = Path(output_dir)
    
    # Find all images
    images = []
    for ext in SUPPORTED_FORMATS:
        images.extend(input_path.glob(f'*{ext}'))
        images.extend(input_path.glob(f'*{ext.upper()}'))
    
    if not images:
        print(f"❌ No images found in {input_dir}")
        return False
    
    print(f"📁 Found {len(images)} images")
    print(f"📏 Resizing to {width}x{height} (maintain_aspect={maintain_aspect})")
    print()
    
    # Process images
    success_count = 0
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = []
        for img_path in images:
            out_path = output_path / img_path.name
            future = executor.submit(
                resize_image,
                img_path,
                out_path,
                width,
                height,
                maintain_aspect,
                quality
            )
            futures.append(future)
        
        for future in futures:
            success, message = future.result()
            print(message)
            if success:
                success_count += 1
    
    print()
    print(f"✅ Completed: {success_count}/{len(images)} images")
    return success_count == len(images)

def main():
    parser = argparse.ArgumentParser(description='Batch resize images')
    parser.add_argument('--input', '-i', required=True, help='Input directory')
    parser.add_argument('--output', '-o', required=True, help='Output directory')
    parser.add_argument('--width', '-w', type=int, required=True, help='Target width')
    parser.add_argument('--height', '-H', type=int, help='Target height')
    parser.add_argument('--maintain-aspect', action='store_true', default=True,
                       help='Maintain aspect ratio (default: true)')
    parser.add_argument('--quality', '-q', type=int, default=85, help='Quality 1-100')
    parser.add_argument('--workers', type=int, default=4, help='Parallel workers')
    
    args = parser.parse_args()
    
    success = batch_resize(
        args.input,
        args.output,
        args.width,
        args.height or args.width,
        args.maintain_aspect,
        args.quality,
        args.workers
    )
    
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()
```

---

## Step 4: Test the Skill

### Test 1: Single Image Resize

```bash
python scripts/process_image.py \
  --input photo.jpg \
  --output resized.jpg \
  --width 1920 \
  --height 1080
```

### Test 2: Batch Resize

```bash
python scripts/batch_resize.py \
  --input ./vacation-photos/ \
  --output ./resized/ \
  --width 1920 \
  --quality 85
```

### Test 3: Format Conversion

```bash
python scripts/process_image.py \
  --input image.png \
  --output image.jpg \
  --format jpg \
  --quality 90
```

### Test 4: Rotation

```bash
python scripts/process_image.py \
  --input photo.jpg \
  --output rotated.jpg \
  --rotate 90
```

---

## Installation

```bash
# Install dependencies
pip install Pillow

# Verify installation
python -c "from PIL import Image; print('Pillow installed!')"
```

---

## Usage Examples

### Example 1: Prepare Photos for Web

**User**: "Resize all my photos to 1920x1080 for the website"

**Agent**:
```bash
python scripts/batch_resize.py \
  --input ./raw-photos/ \
  --output ./web-photos/ \
  --width 1920 \
  --height 1080 \
  --quality 85
```

### Example 2: Convert PNG to JPEG

**User**: "Convert these PNG logos to JPEG"

**Agent**:
```bash
for file in logos/*.png; do
  python scripts/process_image.py \
    --input "$file" \
    --output "logos/${file%.png}.jpg" \
    --format jpg \
    --quality 95
done
```

---

## Best Practices

1. **Always backup originals** - Work on copies
2. **Use appropriate quality** - 85 for web, 95+ for print
3. **Maintain aspect ratio** - Unless specific dimensions needed
4. **Process in parallel** - Use multiple workers for batch ops
5. **Check file sizes** - Verify compression is adequate

---

## Common Mistakes

| Mistake | Correct Approach |
|---------|-----------------|
| Not converting RGBA to RGB | Convert before saving as JPEG |
| Using lossless for web | Use JPEG/WebP with quality 85 |
| Processing sequentially | Use ThreadPoolExecutor for batches |
| No error handling | Wrap in try-except blocks |

---

## Next Steps

1. ✅ Try the **Advanced** example (AI Image Generator)
2. ✅ Add watermark functionality
3. ✅ Implement EXIF data preservation
4. ✅ Add image enhancement (brightness, contrast)

---

## Resources

- [Pillow Documentation](https://pillow.readthedocs.io/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [OpenClaw Image Skills](../../miaoda/)

---

**Last Updated**: 2026-03-18  
**Author**: OpenClaw Community 🦞
