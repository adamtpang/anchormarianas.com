#!/usr/bin/env bash
# mint.sh — create a Stripe payment link for any offer, in one command.
# Usage:  bash scripts/mint.sh "Product name" 75000 ["Optional description"]
#         (amount is in cents: 75000 = $750.00)
# Reads STRIPE_SECRET_KEY from the .env next to this repo root. Prints the
# payment link URL. The secret never leaves this machine and is never echoed.
set -euo pipefail

NAME="${1:?usage: mint.sh \"Product name\" <amount_cents> [description]}"
AMOUNT="${2:?usage: mint.sh \"Product name\" <amount_cents> [description]}"
DESC="${3:-}"

DIR="$(cd "$(dirname "$0")/.." && pwd)"
KEY="$(grep -E '^STRIPE_SECRET_KEY=' "$DIR/.env" | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d '\r')"
[ -n "$KEY" ] || { echo "STRIPE_SECRET_KEY not found in $DIR/.env"; exit 1; }
case "$KEY" in sk_live_*) echo "mode: LIVE";; sk_test_*) echo "mode: TEST";; *) echo "warning: key does not look like sk_live/sk_test";; esac

json_field() { # json_field <field> — first "field": "value" from stdin
  grep -o "\"$1\": *\"[^\"]*\"" | head -1 | sed "s/.*: *\"//;s/\"$//"
}

PRODUCT_ID=$(curl -s https://api.stripe.com/v1/products -u "$KEY:" \
  --data-urlencode "name=$NAME" \
  ${DESC:+--data-urlencode "description=$DESC"} | json_field id)
[ -n "$PRODUCT_ID" ] || { echo "product creation failed"; exit 1; }
echo "product: $PRODUCT_ID"

PRICE_ID=$(curl -s https://api.stripe.com/v1/prices -u "$KEY:" \
  -d unit_amount="$AMOUNT" -d currency=usd -d product="$PRODUCT_ID" | json_field id)
[ -n "$PRICE_ID" ] || { echo "price creation failed"; exit 1; }
echo "price: $PRICE_ID ($AMOUNT cents)"

LINK_URL=$(curl -s https://api.stripe.com/v1/payment_links -u "$KEY:" \
  -d "line_items[0][price]=$PRICE_ID" -d "line_items[0][quantity]=1" | json_field url)
[ -n "$LINK_URL" ] || { echo "payment link creation failed"; exit 1; }

echo ""
echo "PAYMENT LINK: $LINK_URL"
