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

# The new page exists, is noindex, has a minimal nav, and is not linked from the homepage.
P=dist/start-your-business/index.html
[ -f "$P" ] || { echo "FAIL: $P not built"; exit 1; }
grep -q 'name="robots" content="noindex"' "$P" || { echo "FAIL: new page lacks noindex"; exit 1; }
grep -q 'Start Your Business' "$P" || { echo "FAIL: new page has no Start Your Business CTA"; exit 1; }
for a in how-it-works active-selling platform pricing; do
  if grep -q "href=\"#$a\" class=\"text-sm font-medium text-white/50" "$P"; then
    echo "FAIL: new page nav carries section link #$a"; exit 1
  fi
done
if grep -q 'Toggle menu' "$P"; then echo "FAIL: new page renders the mobile menu"; exit 1; fi
if grep -q 'Contact Us' "$P"; then echo "FAIL: new page shows a Contact Us pill"; exit 1; fi
if grep -q 'start-your-business' dist/index.html; then
  echo "FAIL: homepage links to start-your-business"; exit 1
fi
grep -q 'Side Hustle' "$P" || { echo "FAIL: hero side hustle badge missing"; exit 1; }
echo "OK: start-your-business page is built, noindex, minimal nav, unlinked"

grep -q 'id="how-it-works"' "$P" || { echo "FAIL: steps section missing"; exit 1; }
grep -q 'Application' "$P" || { echo "FAIL: apply mockup missing"; exit 1; }
echo "OK: steps section with mockups present"
