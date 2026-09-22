"""Convert selected generated illustrations to mobile-sized WebP game assets."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
sources = json.loads((root / "art-sources.local.json").read_text(encoding="utf-8"))
output = root / "public" / "assets"
output.mkdir(parents=True, exist_ok=True)

for name, source in sources.items():
    with Image.open(source) as original:
        image = original.convert("RGBA")
        maximum = 1080 if name.endswith("-bg") else 800 if name.startswith("hero-") else 384
        image.thumbnail((maximum, maximum * 2), Image.Resampling.LANCZOS)
        destination = output / f"{name}.webp"
        image.save(destination, "WEBP", quality=86, method=6)
        print(f"{name}: {image.width}x{image.height}, {destination.stat().st_size // 1024} KiB")
