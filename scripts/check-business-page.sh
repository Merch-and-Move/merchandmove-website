#!/usr/bin/env bash
# Build assertions for the Start Your Business page. Run after `npm run build`.
set -euo pipefail

if grep -q 'name="robots" content="noindex"' dist/index.html; then
  echo "FAIL: homepage carries noindex"; exit 1
fi
echo "OK: homepage has no noindex"

# Homepage nav is unchanged: still has its four section links and Contact Us.
for a in how-it-works active-selling platform pricing; do
  grep -q "href=\"#$a\"" dist/index.html || { echo "FAIL: homepage nav link #$a missing"; exit 1; }
done
grep -q 'Contact Us' dist/index.html || { echo "FAIL: homepage Contact Us pill missing"; exit 1; }
echo "OK: homepage nav intact"
