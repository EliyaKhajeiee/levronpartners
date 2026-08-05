#!/usr/bin/env python3
"""
Rebuild /public/brand from the brand deck.

    python3 scripts/brand-photos.py path/to/brand-deck.png

The deck's "real world applications" row is five photographs side by side. This
lifts each one out, upscales it and writes the webps the site uses.

Why this is more than a resize
------------------------------
These crops carry ~250px of real detail and there is no higher-resolution
original — both pitch-deck PDFs were checked and neither contains these
mockups. So the upscale is the whole ballgame.

The good path is **EDSR ×4 super-resolution** (OpenCV's `dnn_superres`), then a
downsample to display size, then a light unsharp. Each step earns its place:

  * EDSR reconstructs edges instead of interpolating them. Plain LANCZOS plus a
    heavy unsharp — what this script used to do — produces visible ringing
    around the wordmarks that reads as grit at display size.
  * Downsampling the ×4 output to ~700px averages away SR artefacts. Ending up
    *below* the model's output resolution is a feature, not waste.
  * The unsharp is deliberately gentle (95%, not 125%) because EDSR has already
    done the structural work. Turning it up brings the halos straight back.

Set up the dependencies with:

    python3 -m venv .venv && .venv/bin/pip install opencv-contrib-python pillow
    curl -L -o EDSR_x4.pb \\
      https://github.com/Saafke/EDSR_Tensorflow/raw/master/models/EDSR_x4.pb

and point EDSR_MODEL at the .pb. Without them the script still runs and falls
back to LANCZOS — noticeably worse, but not broken.

COLUMNS is measured against a 1402px-wide deck export. A different export size
means re-measuring: find the tile edges by looking for columns whose vertical
standard deviation jumps, since the gutters are flat cream and the photos are
not.
"""

import os
import sys

from PIL import Image, ImageFilter

# (left, right) of each photo, and the row's top/bottom, in a 1402×1122 export.
COLUMNS = [(53, 288), (292, 529), (534, 824), (825, 1089), (1095, 1350)]
ROW = (848, 1010)
NAMES = ["business-card", "stationery", "signage", "vehicle", "plaque"]

# The tile bounds land a few pixels into the deck's cream gutters, which shows
# up as a pale rim on every panel — measurably so: the vehicle tile's top edge
# ran 112 against an interior of 42. Shave the frame before anything else.
EDGE_TRIM = 5

# Optional (left, top, right, bottom) as fractions of the trimmed tile, for
# photos whose useful subject is only part of the frame.
#
# The vehicle shot is the one that needs it. Full-frame it carries a slice of
# garage wall, a taillight and a length of chrome trim that reads as a smear at
# panel size — none of which is the point. Cropping to the branded panel gives
# the wordmark the frame instead.
FOCUS = {
    "vehicle": (0.0, 0.0, 0.79, 0.74),
}

EDSR_MODEL = os.environ.get("EDSR_MODEL", "EDSR_x4.pb")
TARGET_WIDTH = 700          # comfortably above any size these are displayed at
UNSHARP = dict(radius=1.2, percent=95, threshold=3)
FALLBACK_UNSHARP = dict(radius=2.2, percent=125, threshold=2)
QUALITY = 92

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "brand")


def load_upscaler():
    """EDSR ×4 if OpenCV and the model are both available, else None."""
    try:
        import cv2
    except ImportError:
        print("opencv not installed — falling back to LANCZOS", file=sys.stderr)
        return None
    if not os.path.exists(EDSR_MODEL):
        print(f"{EDSR_MODEL} not found — falling back to LANCZOS", file=sys.stderr)
        return None

    import numpy as np

    sr = cv2.dnn_superres.DnnSuperResImpl_create()
    sr.readModel(EDSR_MODEL)
    sr.setModel("edsr", 4)

    def upscale(tile: Image.Image) -> Image.Image:
        bgr = cv2.cvtColor(np.array(tile), cv2.COLOR_RGB2BGR)
        return Image.fromarray(cv2.cvtColor(sr.upsample(bgr), cv2.COLOR_BGR2RGB))

    return upscale


def main(deck_path: str) -> None:
    deck = Image.open(deck_path).convert("RGB")
    if deck.width != 1402:
        print(
            f"warning: deck is {deck.width}px wide, COLUMNS was measured against "
            f"1402px — the crops will be off. See the module docstring.",
            file=sys.stderr,
        )

    upscale = load_upscaler()
    os.makedirs(OUT, exist_ok=True)
    top, bottom = ROW

    for (left, right), name in zip(COLUMNS, NAMES):
        tile = deck.crop(
            (
                left + EDGE_TRIM,
                top + EDGE_TRIM,
                right - EDGE_TRIM,
                bottom - EDGE_TRIM,
            )
        )

        if name in FOCUS:
            fl, ft, fr, fb = FOCUS[name]
            w, h = tile.size
            tile = tile.crop(
                (round(fl * w), round(ft * h), round(fr * w), round(fb * h))
            )

        if upscale:
            big = upscale(tile)
            sharpen = UNSHARP
        else:
            big = tile.resize((tile.width * 3, tile.height * 3), Image.LANCZOS)
            sharpen = FALLBACK_UNSHARP

        width = min(TARGET_WIDTH, big.width)
        out = big.resize(
            (width, round(width * big.height / big.width)), Image.LANCZOS
        ).filter(ImageFilter.UnsharpMask(**sharpen))

        path = os.path.join(OUT, f"{name}.webp")
        out.save(path, "WEBP", quality=QUALITY, method=6)
        aspect = round(out.width / out.height, 3)
        print(
            f"{name:<14} {out.width}×{out.height}  aspect {aspect:<6} "
            f"{os.path.getsize(path):,}b"
        )

    print(
        "\nIf any crop changed, copy the aspect values into `aspect` in "
        "src/lib/brand-photos.ts — the panels size themselves from those so "
        "nothing gets cropped a second time in the browser."
    )


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
