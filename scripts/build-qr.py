"""Build the QR code shown on the mobile business card.

Run from the repo root: python3 scripts/build-qr.py  (needs `pip install qrcode`)
The output is committed, so the site build doesn't depend on Python.
"""
from pathlib import Path

import qrcode
import qrcode.image.svg

ROOT = Path(__file__).resolve().parent.parent
CARD_URL = "https://chiragdshah.com"  # the card is the homepage on a phone

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=2)
qr.add_data(CARD_URL)
qr.make(fit=True)
qr.make_image(image_factory=qrcode.image.svg.SvgPathImage).save(ROOT / "public/qr.svg")
print("built public/qr.svg ->", CARD_URL)
