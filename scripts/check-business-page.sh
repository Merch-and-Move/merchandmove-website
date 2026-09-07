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
if grep -q 'name="robots" content="noindex"' "$P"; then echo "FAIL: new page still carries noindex"; exit 1; fi
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
if grep -q 'Quick Links' "$P"; then echo "FAIL: new page renders the full footer"; exit 1; fi
grep -q 'Quick Links' dist/index.html || { echo "FAIL: homepage footer changed"; exit 1; }
grep -q 'info@merchandmove.co.za' "$P" || { echo "FAIL: minimal footer missing contact email"; exit 1; }
echo "OK: start-your-business page is built, indexable, minimal nav and footer, unlinked"

grep -q 'id="how-it-works"' "$P" || { echo "FAIL: steps section missing"; exit 1; }
grep -q 'Application' "$P" || { echo "FAIL: apply mockup missing"; exit 1; }
echo "OK: steps section with mockups present"

grep -q 'Request Payout\|REQUEST PAYOUT' "$P" || { echo "FAIL: wallet mockup missing"; exit 1; }
grep -q 'id="wallet"' "$P" || { echo "FAIL: wallet section missing"; exit 1; }
echo "OK: wallet section present"

grep -q 'What It Takes' "$P" || { echo "FAIL: qualities section missing"; exit 1; }
grep -q 'Why Merch' "$P" || { echo "FAIL: why-us section missing"; exit 1; }
echo "OK: qualities and why-us sections present"

grep -q '<details' "$P" || { echo "FAIL: FAQ accordion missing"; exit 1; }
grep -q 'side hustle' "$P" || { echo "FAIL: side hustle language missing"; exit 1; }
grep -q 'Individual results vary' "$P" || { echo "FAIL: income disclaimer missing"; exit 1; }
echo "OK: FAQ and disclaimer present"

n=$(grep -o 'Start Your Business' "$P" | wc -l | tr -d ' ')
[ "$n" -ge 4 ] || { echo "FAIL: expected at least 4 Start Your Business CTAs, found $n"; exit 1; }
grep -q 'Your Move' "$P" || { echo "FAIL: closing CTA missing"; exit 1; }
echo "OK: closing CTA present, $n Start Your Business CTAs"
