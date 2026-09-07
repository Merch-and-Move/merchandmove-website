# Start Your Business Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hidden, single-scroll landing page at `/start-your-business` that excites independent sellers about building a business or side hustle, shows off the in-app wallet, and sends them to a sign-up form in the Merch & Move app.

**Architecture:** One new Astro page composed of eight React section components under `src/components/business/`, plus five animated mockup components under `src/components/business/mockups/`, all reusing the existing layout, nav, footer and global styles. Every call to action reads one `START_URL` constant. No server-side work.

**Tech Stack:** Astro 6, React 19, Tailwind 4, framer-motion.

**Spec:** `docs/superpowers/specs/2026-09-07-start-your-business-page-design.md`

## Global Constraints

- URL is exactly `/start-your-business`. File is `src/pages/start-your-business.astro`.
- The page is never linked from the homepage, nav, mobile menu or footer.
- The page's `<head>` must contain `<meta name="robots" content="noindex">`; the homepage's must not.
- The only CTA label on the page is **Start Your Business**. Every such button and the nav pill read `START_URL` from `src/components/business/startUrl.ts`.
- Every piece of copy that depends on the undecided earning model is wrapped in square brackets and begins with `[EARNING MODEL`.
- Nothing under `supabase/` and nothing in `ContactForm.tsx`, `index.astro` or `MobileMenu.tsx` changes.
- Copy voice: direct, confident, short lines, energetic. "Side hustle" appears in the hero, benefits and FAQ. The wallet is named in the hero chips, benefits, wallet section and FAQ.
- Mockups follow the homepage mockup pattern: a `#0a0a0f/90` window with three chrome dots and a title, `useInView` once with `-40px` margin, framer-motion staggered reveals, text sizes 6px to 18px.
- No new npm dependencies.

## Verification tools available

- `npm run build` produces static HTML in `dist/`. Checks grep `dist/start-your-business/index.html` and `dist/index.html`.
- `scripts/check-business-page.sh` is a build assertion script that grows task by task. Run it after every build.
- There is no JS unit test runner for the site. Components are verified by build output and by loading the page in the dev server (`npm run dev`, `http://localhost:4321`).

## File structure

| File | Responsibility |
|---|---|
| `src/layouts/Layout.astro` | Modify: add optional `noindex` prop |
| `src/components/Nav.astro` | Modify: `minimal`, `ctaLabel`, `ctaHref` props |
| `src/components/business/startUrl.ts` | The single `START_URL` constant |
| `src/components/business/BusinessHero.tsx` | Hero with headline, side-hustle sub-copy, floating stat chips, primary CTA |
| `src/components/business/BusinessBenefits.tsx` | Six benefit cards with icons |
| `src/components/business/mockups/StepApplyMockup.tsx` | Application form sending |
| `src/components/business/mockups/StepSetupMockup.tsx` | Onboarding checklist ticking |
| `src/components/business/mockups/StepSellMockup.tsx` | Sale notifications landing |
| `src/components/business/mockups/StepGrowMockup.tsx` | Earnings bars climbing |
| `src/components/business/BusinessSteps.tsx` | Four step cards with mockups, `id="how-it-works"` |
| `src/components/business/mockups/WalletMockup.tsx` | Wallet balance, feed, payout button |
| `src/components/business/BusinessWallet.tsx` | Two-column wallet section |
| `src/components/business/BusinessQualities.tsx` | Four "what it takes" cards |
| `src/components/business/BusinessWhyUs.tsx` | Credibility block |
| `src/components/business/BusinessFAQ.tsx` | Accordion FAQ and income disclaimer |
| `src/components/business/BusinessCTA.tsx` | Closing CTA section |
| `src/pages/start-your-business.astro` | Composes the sections |
| `scripts/check-business-page.sh` | Build assertions |

---

### Task 1: Layout `noindex` prop

**Files:**
- Modify: `src/layouts/Layout.astro:1-12` (props block) and `:19-22` (head metas)
- Create: `scripts/check-business-page.sh`

**Interfaces:**
- Produces: `Layout` accepts `noindex?: boolean`. When true, head contains `<meta name="robots" content="noindex">`.

- [ ] **Step 1: Create the build assertion script**

`scripts/check-business-page.sh`:

```bash
#!/usr/bin/env bash
# Build assertions for the Start Your Business page. Run after `npm run build`.
set -euo pipefail

if grep -q 'name="robots" content="noindex"' dist/index.html; then
  echo "FAIL: homepage carries noindex"; exit 1
fi
echo "OK: homepage has no noindex"
```

Run:
```bash
chmod +x scripts/check-business-page.sh && npm run build && ./scripts/check-business-page.sh
```
Expected: `OK: homepage has no noindex`.

- [ ] **Step 2: Add the prop to Layout**

In `src/layouts/Layout.astro`, change the props block to:

```astro
---
import '../styles/global.css'

interface Props {
  title?: string
  description?: string
  noindex?: boolean
}

const {
  title = 'Merch & Move — Sales That Move',
  description = 'Your All-In-One Partner for Merchandising, Active Selling, and Live Software Tracking. We don\'t just fill shelves — we move product.',
  noindex = false,
} = Astro.props
---
```

Directly after the `<meta name="theme-color" ...>` line, add:

```astro
    {noindex && <meta name="robots" content="noindex" />}
```

- [ ] **Step 3: Verify**

```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: `OK: homepage has no noindex`

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro scripts/check-business-page.sh
git commit -m "Add optional noindex prop to Layout"
```

---

### Task 2: Minimal nav mode

**Files:**
- Modify: `src/components/Nav.astro:1-30`

**Interfaces:**
- Produces: `<Nav minimal ctaLabel="Start Your Business" ctaHref={START_URL} />` renders only the logo and one pill. Without `minimal`, output matches what the homepage renders today.

- [ ] **Step 1: Write the homepage guard**

Append to `scripts/check-business-page.sh`:

```bash
# Homepage nav is unchanged: still has its four section links and Contact Us.
for a in how-it-works active-selling platform pricing; do
  grep -q "href=\"#$a\"" dist/index.html || { echo "FAIL: homepage nav link #$a missing"; exit 1; }
done
grep -q 'Contact Us' dist/index.html || { echo "FAIL: homepage Contact Us pill missing"; exit 1; }
echo "OK: homepage nav intact"
```

Run `npm run build && ./scripts/check-business-page.sh`. Expected: `OK: homepage nav intact`.

- [ ] **Step 2: Add the props to Nav.astro**

Replace the frontmatter and the markup above `<script>` with:

```astro
---
import MobileMenu from './MobileMenu.tsx'

interface Props {
  minimal?: boolean
  ctaLabel?: string
  ctaHref?: string
}

const { minimal = false, ctaLabel = 'Contact Us', ctaHref = '#contact' } = Astro.props

const pillClasses =
  'inline-flex items-center px-5 py-2 text-sm font-medium text-yellow bg-white/10 border border-white/10 rounded-full hover:bg-yellow hover:text-base hover:border-yellow transition-all duration-300'
---

<nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <span class="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Merch<span class="text-yellow group-hover:text-sky transition-colors duration-300">&</span>Move
        </span>
      </a>

      {minimal ? (
        <a href={ctaHref} class={pillClasses}>{ctaLabel}</a>
      ) : (
        <>
          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#how-it-works" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">How It Works</a>
            <a href="#active-selling" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">Active Selling</a>
            <a href="#platform" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">Platform</a>
            <a href="#pricing" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">Pricing</a>
            <a href={ctaHref} class={pillClasses}>{ctaLabel}</a>
          </div>

          <!-- Mobile Menu -->
          <MobileMenu client:load />
        </>
      )}
    </div>
  </div>
</nav>
```

Leave the `<script>` block unchanged.

- [ ] **Step 3: Verify**

`npm run build && ./scripts/check-business-page.sh`. Expected: both `OK:` lines. Open `http://localhost:4321/` and confirm the nav is unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro scripts/check-business-page.sh
git commit -m "Add minimal mode to Nav for single-purpose pages"
```

---

### Task 3: Start link, Hero with floating chips, Benefits with icons, and the page

**Files:**
- Create: `src/components/business/startUrl.ts`
- Create: `src/components/business/BusinessHero.tsx`
- Create: `src/components/business/BusinessBenefits.tsx`
- Create: `src/pages/start-your-business.astro`

**Interfaces:**
- Produces: `export const START_URL: string`. Default-export components with no props. Page renders `Layout` with `noindex`, `Nav` minimal, the two sections, `Footer`.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
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
```

Run `npm run build && ./scripts/check-business-page.sh`. Expected: `FAIL: dist/start-your-business/index.html not built`.

- [ ] **Step 2: Create startUrl.ts**

```ts
// Every "Start Your Business" button on /start-your-business reads this.
// [APP LINK] Replace '#' with the Merch & Move app's sign-up form URL once it exists.
export const START_URL = '#'
```

- [ ] **Step 3: Create BusinessHero.tsx**

```tsx
import { motion } from 'framer-motion'
import { START_URL } from './startUrl'

const chips = [
  {
    label: 'Your hours',
    className: 'left-[2%] top-[18%] sm:left-[4%] sm:top-[24%]',
    delay: 0.9,
    float: 6,
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Your wallet',
    className: 'right-[2%] top-[28%] sm:right-[5%] sm:top-[30%]',
    delay: 1.1,
    float: -7,
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    ),
  },
  {
    label: 'No experience needed',
    className: 'left-[6%] bottom-[14%] sm:left-[10%] sm:bottom-[20%]',
    delay: 1.3,
    float: 5,
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function BusinessHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[800px] h-[800px] -top-60 -left-60" />
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] top-1/4 right-0 translate-x-1/4" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-10 left-1/3" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      {/* Floating chips */}
      <div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none hidden sm:block">
        {chips.map(c => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: [0, c.float, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.6, delay: c.delay },
              scale: { duration: 0.6, delay: c.delay },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: c.delay },
            }}
            className={`absolute ${c.className} flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm text-yellow`}
          >
            {c.icon}
            <span className="text-[11px] font-semibold tracking-wide text-white/80">{c.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase bg-yellow/10 border border-yellow/20 rounded-full text-yellow mb-10"
        >
          Side Hustle or Full-Time. Your Call.
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] text-white leading-[0.92] tracking-[-0.02em] mb-8"
        >
          Start Your Own{' '}
          <span className="italic text-gradient-yellow-animated">Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Sell brands people already love, on your own schedule, from wherever you are. Earnings land in
          your own wallet and you cash out when you want.{' '}
          <span className="text-white font-medium">Start small. Grow it as far as you like.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={START_URL}
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Start Your Business
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center px-8 py-4 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-full transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 4: Create BusinessBenefits.tsx**

```tsx
import { motion } from 'framer-motion'

const benefits = [
  {
    title: 'Be Your Own Boss',
    body: 'Set your own hours and work from anywhere. Scale up when you want more, scale back when life needs room.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: 'Side Hustle or Full-Time',
    body: 'Start with a few hours a week alongside your job. Plenty of sellers begin that way and grow from there.',
    accent: 'sky' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Earn On What You Sell',
    body: '[EARNING MODEL: one line on how sellers earn, e.g. commission on every sale you make.]',
    accent: 'sky' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Your Own Wallet',
    body: 'Every sale lands in your wallet in the app. Request a payout whenever you want. Your money, on your terms.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    ),
  },
  {
    title: 'Tools & Training',
    body: 'The same platform our promoters use, plus training to help you sell with confidence from day one.',
    accent: 'sky' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    title: 'A Community Behind You',
    body: 'Join a network of sellers across South Africa who share what works and celebrate each other\'s wins.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

export default function BusinessBenefits() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            The Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.0]"
          >
            Everything You Need to{' '}
            <span className="italic text-gradient-yellow">Get Going</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            Build something of your own without starting from nothing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => {
            const isYellow = b.accent === 'yellow'
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7 sm:p-8 group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                  isYellow
                    ? 'bg-yellow/10 text-yellow border border-yellow/20 group-hover:bg-yellow/15 group-hover:shadow-[0_0_24px_rgba(249,215,2,0.2)]'
                    : 'bg-sky/10 text-sky border border-sky/20 group-hover:bg-sky/15 group-hover:shadow-[0_0_24px_rgba(62,181,225,0.2)]'
                }`}>
                  {b.icon}
                </div>
                <h3 className="font-display text-2xl text-white mb-3 leading-[1.15]">{b.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8] group-hover:text-white/65 transition-colors duration-500">{b.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 5: Create the page**

`src/pages/start-your-business.astro`:

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
import Footer from '../components/Footer.astro'
import SmoothScroll from '../components/SmoothScroll.tsx'
import { START_URL } from '../components/business/startUrl'
import BusinessHero from '../components/business/BusinessHero.tsx'
import BusinessBenefits from '../components/business/BusinessBenefits.tsx'
---

<Layout
  title="Start Your Own Business — Merch & Move"
  description="Become an independent Merch & Move seller. Side hustle or full-time, work on your own schedule, sell brands that already move, and cash out from your own wallet whenever you want."
  noindex
>
  <SmoothScroll client:load />
  <Nav minimal ctaLabel="Start Your Business" ctaHref={START_URL} />
  <main>
    <BusinessHero client:load />
    <BusinessBenefits client:visible />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 6: Verify**

`npm run build && ./scripts/check-business-page.sh`. Expected: three `OK:` lines. In the browser: minimal nav, hero with three floating chips at desktop width (hidden on mobile), six benefit cards with glowing icons on hover.

- [ ] **Step 7: Commit**

```bash
git add src/components/business scripts/check-business-page.sh src/pages/start-your-business.astro
git commit -m "Add Start Your Business page with hero and benefits"
```

---

### Task 4: Step mockups and the How It Works section

**Files:**
- Create: `src/components/business/mockups/StepApplyMockup.tsx`
- Create: `src/components/business/mockups/StepSetupMockup.tsx`
- Create: `src/components/business/mockups/StepSellMockup.tsx`
- Create: `src/components/business/mockups/StepGrowMockup.tsx`
- Create: `src/components/business/BusinessSteps.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Consumes: `START_URL`.
- Produces: `BusinessSteps` renders `<section id="how-it-works">`. Mockups are default-export components with no props.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
grep -q 'id="how-it-works"' "$P" || { echo "FAIL: steps section missing"; exit 1; }
grep -q 'Application' "$P" || { echo "FAIL: apply mockup missing"; exit 1; }
echo "OK: steps section with mockups present"
```

Run. Expected: `FAIL: steps section missing`.

- [ ] **Step 2: Create StepApplyMockup.tsx**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fields = [
  { label: 'Full name', value: 'Thandi Nkosi' },
  { label: 'Phone', value: '082 123 4567' },
  { label: 'Area', value: 'Durban North' },
]

export default function StepApplyMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-yellow/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Application</span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <div className="space-y-1.5 mb-3">
            {fields.map((f, i) => (
              <motion.div
                key={f.label}
                className="rounded-md bg-white/[0.03] border border-white/[0.05] px-2 py-1.5"
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.25 }}
              >
                <div className="text-[6px] text-white/25 uppercase tracking-wider mb-0.5">{f.label}</div>
                <motion.div
                  className="text-[8px] text-white/70 font-medium overflow-hidden whitespace-nowrap"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : undefined}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.25, ease: 'linear' }}
                >
                  {f.value}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-md py-1.5 text-center text-[7px] font-bold tracking-wider bg-yellow text-base"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            START MY BUSINESS
          </motion.div>

          <motion.div
            className="mt-2 flex items-center justify-center gap-1 py-1 rounded-md bg-emerald-500/[0.06] border border-emerald-500/10"
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 2.0 }}
          >
            <svg className="w-2 h-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[6px] font-semibold text-emerald-400 tracking-wider">APPLICATION SENT</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create StepSetupMockup.tsx**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const items = [
  { label: 'Welcome call booked', delay: 0.4 },
  { label: 'Product training complete', delay: 0.9 },
  { label: 'App access granted', delay: 1.4 },
  { label: 'Wallet activated', delay: 1.9 },
]

export default function StepSetupMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-sky/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Getting Started</span>
          <span className="ml-auto text-[6px] font-bold text-sky tracking-wider">4 / 4</span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <div className="mb-3">
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky/60 to-sky rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : undefined}
                transition={{ duration: 2.0, delay: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            {items.map(item => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.02]"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.3, delay: item.delay }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-sky/20 border border-sky/40 flex items-center justify-center flex-shrink-0"
                  initial={{ scale: 0.6 }}
                  animate={inView ? { scale: 1 } : undefined}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: item.delay + 0.15 }}
                >
                  <svg className="w-2 h-2 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span className="text-[7.5px] text-white/60 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create StepSellMockup.tsx**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const sales = [
  { product: '2× Aloe Gel', where: 'Umhlanga', amount: '+R180', delay: 0.5 },
  { product: '1× Vitamin C Pack', where: 'Durban North', amount: '+R95', delay: 1.1 },
  { product: '3× Energy Drink', where: 'Ballito', amount: '+R120', delay: 1.7 },
]

export default function StepSellMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-sky/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Sales</span>
          <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <motion.div
              className="w-1 h-1 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[6px] font-bold text-emerald-400 tracking-wider">LIVE</span>
          </div>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.2 }}
          >
            <div className="text-[6px] text-white/25 uppercase tracking-wider mb-0.5">Today</div>
            <div className="text-[16px] font-bold text-sky">
              {[0, 180, 275, 395].map((v, i) => (
                <motion.span
                  key={v}
                  className="absolute left-0 right-0"
                  initial={{ opacity: i === 0 ? 1 : 0 }}
                  animate={inView ? { opacity: 0 } : undefined}
                  transition={{ delay: i === 0 ? 0.5 : sales[i - 1].delay + (i < 3 ? 0.6 : 99) }}
                  style={{ position: i === 3 ? 'static' : 'absolute' }}
                >
                  {i === 3 ? (
                    <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ delay: sales[2].delay }}>
                      R{v}
                    </motion.span>
                  ) : (
                    `R${v}`
                  )}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-1.5">
            {sales.map(s => (
              <motion.div
                key={s.product}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{ type: 'spring', stiffness: 300, damping: 22, delay: s.delay }}
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[7.5px] text-white/70 font-medium truncate">{s.product}</div>
                  <div className="text-[6px] text-white/25">{s.where}</div>
                </div>
                <span className="text-[8px] font-bold text-emerald-400">{s.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

Note on the "Today" counter: the layered spans are fiddly. The implementer may replace them with a single `useState` counter that steps through 0, 180, 275, 395 on timers aligned to each sale's `delay`, which is the cleaner approach. Either is acceptable as long as the total visibly climbs as each sale lands.

- [ ] **Step 5: Create StepGrowMockup.tsx**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const months = [
  { label: 'Jan', pct: 22 },
  { label: 'Feb', pct: 35 },
  { label: 'Mar', pct: 30 },
  { label: 'Apr', pct: 52 },
  { label: 'May', pct: 68 },
  { label: 'Jun', pct: 100 },
]

export default function StepGrowMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-yellow/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Earnings</span>
          <motion.span
            className="ml-auto px-1.5 py-0.5 rounded-full bg-yellow/10 border border-yellow/25 text-[6px] font-bold text-yellow tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.8 }}
          >
            +354%
          </motion.span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <div className="flex items-end justify-between gap-1.5 h-[84px] mb-2">
            {months.map((m, i) => (
              <div key={m.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <motion.div
                  className={`w-full rounded-sm ${i === months.length - 1 ? 'bg-gradient-to-t from-yellow/60 to-yellow' : 'bg-gradient-to-t from-sky/30 to-sky/60'}`}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${m.pct}%` } : undefined}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-1.5">
            {months.map(m => (
              <div key={m.label} className="flex-1 text-center text-[6px] text-white/25">{m.label}</div>
            ))}
          </div>

          <motion.div
            className="mt-3 flex items-center justify-between px-2 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <span className="text-[6.5px] text-white/35">Best month yet</span>
            <span className="text-[8px] font-bold text-yellow">June</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 6: Create BusinessSteps.tsx**

Uses the homepage step-card layout (number badge, title, mockup left, copy and feature bullets right, scroll-driven progress line).

```tsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { START_URL } from './startUrl'
import StepApplyMockup from './mockups/StepApplyMockup'
import StepSetupMockup from './mockups/StepSetupMockup'
import StepSellMockup from './mockups/StepSellMockup'
import StepGrowMockup from './mockups/StepGrowMockup'

const steps = [
  {
    number: '01',
    title: 'Start Your Business',
    headline: 'Two Minutes. One Form. You\'re In.',
    description:
      'Hit the button, fill in a short form in the Merch & Move app, and tell us a little about yourself. No CV, no interview panel, no waiting weeks for an answer.',
    features: ['Apply from your phone in minutes', 'No sales experience required', 'We\'ll call you to say hello and answer questions'],
    accent: 'yellow' as const,
    mockup: <StepApplyMockup />,
  },
  {
    number: '02',
    title: 'Get Set Up',
    headline: 'Trained, Equipped and Ready to Sell',
    description:
      '[EARNING MODEL: what onboarding involves, e.g. starter kit, platform access, first training session.] You\'ll finish setup knowing the products, the app and exactly how you get paid.',
    features: ['Product training you can do around your day', 'Your own login to the Merch & Move app', 'Your wallet, activated and ready'],
    accent: 'sky' as const,
    mockup: <StepSetupMockup />,
  },
  {
    number: '03',
    title: 'Start Selling',
    headline: 'Every Sale Lands in Your Wallet',
    description:
      'Share products with the people around you, at work, at gym, at church, on WhatsApp. Every sale is confirmed in the app and credited to your wallet, so you always know exactly where you stand.',
    features: ['Sell in your own community, your own way', 'Sales confirmed and tracked in real time', 'Watch your wallet grow with every sale'],
    accent: 'sky' as const,
    mockup: <StepSellMockup />,
  },
  {
    number: '04',
    title: 'Grow',
    headline: 'Side Hustle Today. Bigger Tomorrow.',
    description:
      '[EARNING MODEL: how sellers grow, e.g. higher rates at volume, building a team, unlocking rewards.] The more you sell, the more the business becomes yours.',
    features: ['Scale from a few hours a week to full-time', 'See your growth month by month in the app', '[EARNING MODEL: rewards or tiers for top sellers]'],
    accent: 'yellow' as const,
    mockup: <StepGrowMockup />,
  },
]

export default function BusinessSteps() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 70%', 'end 40%'] })

  const node0 = useTransform(scrollYProgress, [0, 0.08], [0.12, 0.7])
  const node1 = useTransform(scrollYProgress, [0.25, 0.35], [0.12, 0.7])
  const node2 = useTransform(scrollYProgress, [0.55, 0.65], [0.12, 0.7])
  const node3 = useTransform(scrollYProgress, [0.82, 0.92], [0.12, 0.7])
  const nodeOpacities = [node0, node1, node2, node3]
  const dotOpacities = nodeOpacities.map(o => useTransform(o, [0.12, 0.7], [0.4, 1]))

  return (
    <section id="how-it-works" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-20 -left-20 opacity-15" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.0]"
          >
            Four Steps to{' '}
            <span className="italic text-gradient-yellow">Your First Sale</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            From "I'm curious" to money in your wallet, without the hard part.
          </motion.p>
        </div>

        <div ref={stepsRef} className="relative">
          <div className="hidden lg:block absolute left-5 top-8 bottom-8 w-px">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div className="absolute top-0 left-0 right-0 bg-yellow/50 origin-top" style={{ scaleY: scrollYProgress, height: '100%' }} />
            <motion.div className="absolute top-0 -left-[2px] w-[5px] bg-yellow/20 origin-top blur-[3px]" style={{ scaleY: scrollYProgress, height: '100%' }} />
          </div>

          <div className="space-y-6 lg:pl-14">
            {steps.map((step, i) => {
              const isYellow = step.accent === 'yellow'
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="hidden lg:flex absolute -left-[36px] top-10 -translate-x-1/2 w-4 h-4 items-center justify-center">
                    <motion.div className={`absolute inset-0 rounded-full blur-[4px] ${isYellow ? 'bg-yellow' : 'bg-sky'}`} style={{ opacity: nodeOpacities[i] }} />
                    <motion.div
                      className={`relative w-2.5 h-2.5 rounded-full border-2 ${isYellow ? 'border-yellow/30 bg-yellow/20' : 'border-sky/30 bg-sky/20'}`}
                      style={{ opacity: dotOpacities[i] }}
                    />
                  </div>

                  <div className="card rounded-2xl p-6 sm:p-8 group hover:bg-white/[0.055] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold ${
                        isYellow ? 'bg-yellow/10 text-yellow border border-yellow/20' : 'bg-sky/10 text-sky border border-sky/20'
                      }`}>
                        {step.number}
                      </div>
                      <span className={`text-xs font-bold tracking-[0.15em] uppercase ${isYellow ? 'text-yellow' : 'text-sky'}`}>
                        {step.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
                      <div className="w-full max-w-[260px] mx-auto lg:mx-0">{step.mockup}</div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">{step.headline}</h3>
                        <p className="text-sm text-white/50 leading-[1.8] mb-5">{step.description}</p>
                        <div className="space-y-3">
                          {step.features.map(feature => (
                            <div key={feature} className="flex items-start gap-2.5">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${isYellow ? 'bg-yellow/60' : 'bg-sky/60'}`} />
                              <p className="text-sm text-white/50 leading-[1.6]">{feature}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <a
            href={START_URL}
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Start Your Business
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

Note: `dotOpacities` calls a hook inside `map`. The array length is constant, so the hook order is stable, but a cleaner implementation declares four `useTransform` calls explicitly as the homepage does. Either is acceptable.

- [ ] **Step 7: Add to the page and verify**

Import `BusinessSteps` in the page and render `<BusinessSteps client:visible />` after benefits. Run `npm run build && ./scripts/check-business-page.sh`. Expected: four `OK:` lines. In the browser, scroll through the steps: each mockup animates once when it enters view; the progress line fills on desktop.

- [ ] **Step 8: Commit**

```bash
git add src/components/business src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add How It Works steps with animated mockups"
```

---

### Task 5: Wallet mockup and section

**Files:**
- Create: `src/components/business/mockups/WalletMockup.tsx`
- Create: `src/components/business/BusinessWallet.tsx`
- Modify: `src/pages/start-your-business.astro`

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
grep -q 'Request Payout' "$P" || { echo "FAIL: wallet mockup missing"; exit 1; }
grep -q 'id="wallet"' "$P" || { echo "FAIL: wallet section missing"; exit 1; }
echo "OK: wallet section present"
```

Run. Expected: `FAIL: wallet mockup missing`.

- [ ] **Step 2: Create WalletMockup.tsx**

```tsx
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function RandCounter({ target, delay = 0, duration = 1200 }: { target: number; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => {
      let n = 0
      const step = target / (duration / 16)
      const iv = setInterval(() => {
        n += step
        if (n >= target) { setVal(target); clearInterval(iv) }
        else setVal(Math.floor(n))
      }, 16)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [inView, target, delay, duration])

  return <span ref={ref}>R{val.toLocaleString()}</span>
}

const activity = [
  { kind: 'sale', label: 'Sale · 2× Aloe Gel', meta: 'Today, 14:32', amount: '+R180' },
  { kind: 'sale', label: 'Sale · Vitamin C Pack', meta: 'Today, 11:05', amount: '+R95' },
  { kind: 'sale', label: 'Sale · 3× Energy Drink', meta: 'Yesterday', amount: '+R120' },
  { kind: 'payout', label: 'Payout · FNB ····4821', meta: 'Mon', amount: '-R2,000' },
]

export default function WalletMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [payoutState, setPayoutState] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setPayoutState('sending'), 3200)
    const t2 = setTimeout(() => setPayoutState('sent'), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView])

  return (
    <div ref={ref} className="relative max-w-md mx-auto">
      <div className="absolute -inset-6 bg-yellow/[0.06] rounded-3xl blur-2xl" />

      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm glow-yellow">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <span className="ml-2 text-[10px] text-white/25 font-medium tracking-wide">My Wallet</span>
          <span className="ml-auto text-[9px] text-white/30">Thandi N.</span>
        </div>

        <div className="p-5">
          {/* Balance */}
          <motion.div
            className="relative rounded-xl p-5 mb-4 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(249,215,2,0.12) 0%, rgba(249,215,2,0.03) 60%, rgba(62,181,225,0.06) 100%)', border: '1px solid rgba(249,215,2,0.2)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-yellow/10 blur-2xl" />
            <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-2">Available balance</div>
            <div className="text-[34px] leading-none font-bold text-yellow mb-3 tracking-tight">
              <RandCounter target={4860} delay={0.5} duration={1400} />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider">This week</div>
                <div className="text-[12px] font-semibold text-white/80"><RandCounter target={1240} delay={0.9} duration={900} /></div>
              </div>
              <div className="w-px h-6 bg-white/[0.08]" />
              <div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider">Sales</div>
                <div className="text-[12px] font-semibold text-white/80">38</div>
              </div>
              <div className="w-px h-6 bg-white/[0.08]" />
              <div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider">Pending</div>
                <div className="text-[12px] font-semibold text-sky">R320</div>
              </div>
            </div>
          </motion.div>

          {/* Payout button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mb-5"
          >
            <AnimatePresence mode="wait">
              {payoutState === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/[0.1] border border-emerald-500/25"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider">PAYOUT SENT · R2,000</span>
                </motion.div>
              ) : (
                <motion.div
                  key="btn"
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={`relative flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                    payoutState === 'sending' ? 'bg-yellow/70 text-base' : 'bg-yellow text-base'
                  }`}
                >
                  {payoutState === 'sending' ? (
                    <>
                      <motion.div
                        className="w-3 h-3 rounded-full border-2 border-base/30 border-t-base"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      SENDING…
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                      </svg>
                      REQUEST PAYOUT
                    </>
                  )}
                  {/* Cursor tap indicator */}
                  {payoutState === 'idle' && (
                    <motion.div
                      className="absolute right-6 w-5 h-5 rounded-full border-2 border-base/40"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={inView ? { opacity: [0, 0.8, 0], scale: [0.4, 1.4, 1.8] } : undefined}
                      transition={{ duration: 0.9, delay: 2.6 }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Activity */}
          <div className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-2">Recent activity</div>
          <div className="space-y-1.5">
            {activity.map((a, i) => (
              <motion.div
                key={a.label}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.35, delay: 1.0 + i * 0.15 }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  a.kind === 'sale' ? 'bg-emerald-500/15 border border-emerald-500/25' : 'bg-sky/15 border border-sky/25'
                }`}>
                  {a.kind === 'sale' ? (
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white/75 font-medium truncate">{a.label}</div>
                  <div className="text-[8px] text-white/25">{a.meta}</div>
                </div>
                <span className={`text-[11px] font-bold ${a.kind === 'sale' ? 'text-emerald-400' : 'text-white/50'}`}>{a.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create BusinessWallet.tsx**

```tsx
import { motion } from 'framer-motion'
import WalletMockup from './mockups/WalletMockup'

const features = [
  {
    title: 'Every Sale Lands in Your Wallet',
    description: 'The moment a sale is confirmed, your earnings are credited to your wallet in the app. No spreadsheets, no chasing, no waiting for month-end.',
  },
  {
    title: 'Request a Payout Whenever You Want',
    description: 'Need it now? Tap Request Payout and it\'s on its way to your bank. [EARNING MODEL: payout timing, minimums or fees, if any.]',
  },
  {
    title: 'See Exactly Where You Stand',
    description: 'Balance, this week\'s sales, pending amounts and a full history. You always know what you\'ve earned and what\'s coming.',
  },
]

export default function BusinessWallet() {
  return (
    <section id="wallet" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[700px] h-[700px] -top-40 -left-40 opacity-25" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-0 right-20 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
            >
              Your Wallet
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.0]"
            >
              Your Money.{' '}
              <span className="italic text-gradient-yellow">Whenever You Want It.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-white/50 mb-10 leading-[1.7]"
            >
              Every business owner gets a wallet inside the Merch &amp; Move app. Earnings go in as you sell.
              Payouts come out when you say so. It's the part most people don't believe until they see it.
            </motion.p>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex gap-5"
                >
                  <div className="accent-line flex-shrink-0 bg-yellow/20 group-hover:bg-yellow transition-colors" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <WalletMockup />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 4: Add to the page and verify**

Import `BusinessWallet` and render `<BusinessWallet client:visible />` after steps. Build and run the script. Expected: five `OK:` lines. In the browser: balance counts up, activity slides in, a ripple appears on the button, it shows "Sending…", then flips to "Payout sent".

- [ ] **Step 5: Commit**

```bash
git add src/components/business src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add wallet section with animated payout mockup"
```

---

### Task 6: Qualities and Why Us sections

**Files:**
- Create: `src/components/business/BusinessQualities.tsx`
- Create: `src/components/business/BusinessWhyUs.tsx`
- Modify: `src/pages/start-your-business.astro`

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
grep -q 'What It Takes' "$P" || { echo "FAIL: qualities section missing"; exit 1; }
grep -q 'Why Merch' "$P" || { echo "FAIL: why-us section missing"; exit 1; }
echo "OK: qualities and why-us sections present"
```

Run. Expected: `FAIL: qualities section missing`.

- [ ] **Step 2: Create BusinessQualities.tsx**

```tsx
import { motion } from 'framer-motion'

const qualities = [
  {
    title: 'Self-Driven',
    body: 'Nobody sets your hours. The people who do best here are the ones who show up for themselves.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'A People Person',
    body: 'Selling is talking. If you enjoy a conversation and can read a room, you already have the hardest part.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    title: 'Organised',
    body: 'Keep track of your customers, your stock and your follow-ups. The app helps, but the habit is yours.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: 'Ambitious',
    body: 'This can stay a side hustle or become a full business. How big it gets is up to you.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

export default function BusinessQualities() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] -bottom-40 -right-40 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
            >
              What It Takes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-6 leading-[1.0]"
            >
              No Experience Needed.{' '}
              <span className="italic text-gradient-sky">Just the Right Mindset.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-white/50 leading-relaxed"
            >
              We'll teach you the products and the app. What we can't teach is the drive to use them.
              If this sounds like you, you're already most of the way there.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {qualities.map((q, i) => (
              <motion.div
                key={q.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky/10 border border-sky/20 text-sky flex items-center justify-center mb-5 group-hover:shadow-[0_0_24px_rgba(62,181,225,0.2)] transition-all duration-500">
                  {q.icon}
                </div>
                <h3 className="font-display text-xl text-white mb-2 leading-[1.15]">{q.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8]">{q.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 3: Create BusinessWhyUs.tsx**

```tsx
import { motion } from 'framer-motion'

const proofPoints = [
  { label: 'Active selling, not shelf-filling', body: 'Our promoters are trained to close sales in-store. You get that same playbook.' },
  { label: 'An app that tracks everything', body: 'Every sale, every payout, every day. You always know exactly what you\'ve earned.' },
  { label: 'Brands that already move', body: 'You sell products with proven demand and national retail presence.' },
]

export default function BusinessWhyUs() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[700px] h-[700px] -top-60 left-1/2 -translate-x-1/2 opacity-40" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
        >
          Why Merch &amp; Move
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-14 leading-[1.0]"
        >
          Built on a Business That{' '}
          <span className="italic text-gradient-yellow">Already Sells</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {proofPoints.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-elevated rounded-2xl p-7"
            >
              <h3 className="text-sm font-semibold text-white mb-2">{p.label}</h3>
              <p className="text-sm text-white/50 leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 4: Add to the page, verify, commit**

Import both, render after the wallet section. Build and run the script. Expected: six `OK:` lines.

```bash
git add src/components/business src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add qualities and why-us sections to Start Your Business"
```

---

### Task 7: FAQ with income disclaimer

**Files:**
- Create: `src/components/business/BusinessFAQ.tsx`
- Modify: `src/pages/start-your-business.astro`

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
grep -q '<details' "$P" || { echo "FAIL: FAQ accordion missing"; exit 1; }
grep -q 'side hustle' "$P" || { echo "FAIL: side hustle language missing"; exit 1; }
grep -q 'Individual results vary' "$P" || { echo "FAIL: income disclaimer missing"; exit 1; }
echo "OK: FAQ and disclaimer present"
```

Run. Expected: `FAIL: FAQ accordion missing`.

- [ ] **Step 2: Create BusinessFAQ.tsx**

```tsx
import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'Can I do this as a side hustle?',
    a: 'Yes. Most sellers start with a few hours a week around a job or studies. There is no minimum, and you can scale up whenever you are ready.',
  },
  {
    q: 'How do I get paid?',
    a: 'Every confirmed sale is credited to your wallet in the Merch & Move app. When you want your money, tap Request Payout and it goes to your bank account. [EARNING MODEL: payout timing, minimums or fees, if any.]',
  },
  {
    q: 'How much can I earn?',
    a: '[EARNING MODEL: plain-language answer on how earnings work, e.g. commission per sale, and what a typical range looks like.]',
  },
  {
    q: 'Does it cost anything to start?',
    a: '[EARNING MODEL: starter cost, if any, and what it includes.]',
  },
  {
    q: 'Am I employed by Merch & Move?',
    a: 'No. Business owners run their own business. You choose your hours, your customers and how much you want to sell.',
  },
  {
    q: 'Do I need sales experience?',
    a: 'No. We provide training on the products and the app. Enthusiasm and consistency matter more than a CV.',
  },
  {
    q: 'Where in South Africa can I sell?',
    a: 'Anywhere. Business owners work in their own communities, so the programme is open across all nine provinces.',
  },
]

export default function BusinessFAQ() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] top-0 right-0 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl text-white leading-[1.05]"
          >
            Things People{' '}
            <span className="italic text-gradient-yellow">Ask First</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map(f => (
            <details key={f.q} className="card rounded-2xl group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-sm font-medium text-white">
                {f.q}
                <svg className="w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-sm text-white/50 leading-[1.8]">{f.a}</p>
            </details>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-[11px] text-white/30 leading-[1.8] text-center max-w-xl mx-auto"
        >
          Individual results vary. Merch &amp; Move makes no guarantee of income or success. What you earn depends on
          your effort, skill and commitment. [EARNING MODEL: link to an income disclosure statement once published.]
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 3: Add to the page, verify, commit**

Import and render after why-us. Build and run the script. Expected: seven `OK:` lines.

```bash
git add src/components/business/BusinessFAQ.tsx src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add FAQ and income disclaimer to Start Your Business"
```

---

### Task 8: Closing CTA

**Files:**
- Create: `src/components/business/BusinessCTA.tsx`
- Modify: `src/pages/start-your-business.astro`

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
n=$(grep -o 'Start Your Business' "$P" | wc -l | tr -d ' ')
[ "$n" -ge 4 ] || { echo "FAIL: expected at least 4 Start Your Business CTAs, found $n"; exit 1; }
grep -q 'Your Move' "$P" || { echo "FAIL: closing CTA missing"; exit 1; }
echo "OK: closing CTA present, $n Start Your Business CTAs"
```

Run. Expected: `FAIL: closing CTA missing`.

- [ ] **Step 2: Create BusinessCTA.tsx**

```tsx
import { motion } from 'framer-motion'
import { START_URL } from './startUrl'

export default function BusinessCTA() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <motion.div
        animate={{ x: [0, 20, -15, 10, 0], y: [0, -15, 20, -10, 0], scale: [1, 1.05, 0.95, 1.03, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-yellow w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{ animation: 'none' }}
      />
      <motion.div
        animate={{ x: [0, -20, 15, -10, 0], y: [0, 15, -20, 10, 0], scale: [1, 0.97, 1.04, 0.98, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-sky w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{ animation: 'none' }}
      />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-8 leading-[1.0]"
        >
          Your Business.{' '}
          <span className="italic text-gradient-yellow">Your Move.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg text-white/60 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Side hustle today, something bigger tomorrow. It starts with one form and ends with money in your wallet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href={START_URL}
            className="group inline-flex items-center px-10 py-5 text-base font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_50px_rgba(249,215,2,0.4)] transition-all duration-500"
          >
            Start Your Business
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to the page, verify, commit**

Import and render after the FAQ. Build and run the script. Expected: eight `OK:` lines.

```bash
git add src/components/business/BusinessCTA.tsx src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add closing CTA to Start Your Business"
```

---

### Task 9: Full-page review

- [ ] **Step 1: Placeholders**

```bash
grep -rn "\[EARNING MODEL" src/components/business
```
Expected: 9 matches (benefits 1, steps 3, wallet 1, FAQ 3, disclaimer 1), all beginning `[EARNING MODEL`.

- [ ] **Step 2: Every CTA reads START_URL**

```bash
grep -rn "href=" src/components/business src/pages/start-your-business.astro | grep -v "START_URL\|#how-it-works"
```
Expected: no output.

- [ ] **Step 3: Nothing links to the page and nothing else changed**

```bash
grep -rn "start-your-business" src | grep -v "src/pages/start-your-business.astro"
git diff cadaf0c --stat -- supabase src/components/ContactForm.tsx src/pages/index.astro src/components/MobileMenu.tsx
```
Expected: no output from either.

- [ ] **Step 4: Full build and script**

`npm run build && ./scripts/check-business-page.sh`. Expected: eight `OK:` lines.

- [ ] **Step 5: Visual pass**

Load the page at desktop width and at a 390px-wide mobile viewport. Check: no horizontal scroll, every section visible, all five mockups animate on entering view, hero chips hidden on mobile, minimal nav at every width. Take one desktop screenshot and one mobile screenshot for the user.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A src scripts
git commit -m "Polish Start Your Business page"
```

---

## Wiring the app link later

Change one line in `src/components/business/startUrl.ts`, rebuild, and every button points at the app. If the link should open in a new tab, add `target="_blank" rel="noopener"` to the four anchors that read `START_URL` (nav pill, hero, steps, closing CTA).

## Self-review

**Spec coverage.** Positioning and side-hustle language: hero badge, sub-copy and chips (3), benefit card (3), step 4 headline (4), qualities (6), FAQ (7), closing CTA (8). Wallet: hero chip and sub-copy (3), benefit card (3), step 2 and 3 copy and mockups (4), dedicated section and mockup (5), FAQ (7). Ten sections: hero and benefits (3), steps (4), wallet (5), qualities and why-us (6), FAQ and disclaimer (7), closing CTA (8), footer (3). Minimal nav: Task 2, asserted in Task 3. `START_URL`: Task 3, consumed in 4 and 8, audited in 9. `noindex`: Tasks 1 and 3. Mockup pattern: Tasks 4 and 5 copy the homepage's window chrome, `useInView` and stagger conventions.

**Placeholders.** None outside the deliberate `[EARNING MODEL ...]` markers and the `[APP LINK]` comment.

**Type consistency.** `START_URL` export and imports match. `minimal`, `ctaLabel`, `ctaHref` match between Task 2 and Task 3. Mockup component names match their imports in `BusinessSteps` and `BusinessWallet`.
