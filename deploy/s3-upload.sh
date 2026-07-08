#!/usr/bin/env bash
# Upload dist/ to S3 with correct cache headers for SPA releases.
# Usage: BUCKET=your-bucket-name ./deploy/s3-upload.sh

set -euo pipefail

BUCKET="${BUCKET:?Set BUCKET to your S3 bucket name}"
DIST="${DIST:-dist}"

echo "Syncing hashed assets (long cache)..."
aws s3 sync "$DIST/" "s3://$BUCKET/" \
  --delete \
  --exclude "index.html" \
  --exclude "_headers" \
  --exclude "index.html.cache-control" \
  --cache-control "public, max-age=31536000, immutable"

echo "Uploading index.html (no cache)..."
aws s3 cp "$DIST/index.html" "s3://$BUCKET/index.html" \
  --content-type "text/html; charset=utf-8" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --metadata-directive REPLACE

echo "Done. Attach deploy/cloudfront-response-headers-policy.json to CloudFront behaviors for / and /index.html with MinTTL=0."
