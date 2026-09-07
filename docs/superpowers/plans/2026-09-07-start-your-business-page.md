# Start Your Business Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hidden, single-scroll landing page at `/start-your-business` that recruits independent sellers and sends them to a sign-up form in the Merch & Move app.

**Architecture:** One new Astro page composed of seven React section components under `src/components/business/`, reusing the existing layout, nav, footer and global styles. Every call to action reads one `START_URL` constant, so wiring the page to the app later is a one-line change. No server-side work.

**Tech Stack:** Astro 6, React 19, Tailwind 4, framer-motion.

**Spec:** `docs/superpowers/specs/2026-09-07-start-your-business-page-design.md`

## Global Constraints

- URL is exactly `/start-your-business`. File is `src/pages/start-your-business.astro`.
- The page is never linked from the homepage, nav, mobile menu or footer.
- The page's `<head>` must contain `<meta name="robots" content="noindex">`; the homepage's must not.
- The only CTA label on the page is **Start Your Business**. Every such button and the nav pill read `START_URL` from `src/components/business/startUrl.ts`.
- Every piece of copy that depends on the undecided earning model is wrapped in square brackets and begins with `[EARNING MODEL`.
- Nothing under `supabase/` and nothing in `ContactForm.tsx` or `index.astro` changes.
- Copy voice: direct, confident, short lines. Match the homepage. "Side hustle" appears in the hero, benefits and FAQ.
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
| `src/components/business/BusinessHero.tsx` | Hero with headline, side-hustle sub-copy, primary CTA |
| `src/components/business/BusinessBenefits.tsx` | Six benefit cards |
| `src/components/business/BusinessSteps.tsx` | Four numbered steps, `id="how-it-works"` |
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
Expected: `OK: homepage has no noindex` (passes already; it guards against regressions in the next step).

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

- [ ] **Step 3: Verify the homepage is unchanged**

Run:
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
- Produces: `<Nav minimal ctaLabel="Start Your Business" ctaHref={START_URL} />` renders only the logo and one pill. Without `minimal`, output matches what the homepage renders today (`ctaLabel` defaults to `Contact Us`, `ctaHref` to `#contact`).

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

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: `OK: homepage nav intact` (passes now; it guards the homepage while Nav is edited). The minimal mode itself is asserted in Task 3 once the page exists.

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

Leave the existing `<script>` block unchanged. `MobileMenu.tsx` is not modified.

- [ ] **Step 3: Verify**

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: both `OK:` lines.

With the dev server running, open `http://localhost:4321/` and confirm the nav looks exactly as before: four links, yellow Contact Us pill, hamburger on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.astro scripts/check-business-page.sh
git commit -m "Add minimal mode to Nav for single-purpose pages"
```

---

### Task 3: Start link, Hero, Benefits, and the page

**Files:**
- Create: `src/components/business/startUrl.ts`
- Create: `src/components/business/BusinessHero.tsx`
- Create: `src/components/business/BusinessBenefits.tsx`
- Create: `src/pages/start-your-business.astro` (minimal, grows in later tasks)

**Interfaces:**
- Produces: `export const START_URL: string` from `startUrl.ts`. Default-export React components with no props. Page at `/start-your-business` renders `Layout` with `noindex`, `Nav` in minimal mode, the two sections, and `Footer`.

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
echo "OK: start-your-business page is built, noindex, minimal nav, unlinked"
```

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: `FAIL: dist/start-your-business/index.html not built`

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

export default function BusinessHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[800px] h-[800px] -top-60 -left-60" />
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-1/3 right-0 translate-x-1/4" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-10 left-1/3" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
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
          className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-[0.95] tracking-[-0.02em] mb-8"
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
          Sell on your own schedule, from wherever you are, backed by a brand that already moves product.
          Start it as a side hustle.{' '}
          <span className="text-white font-medium">Grow it as far as you want.</span>
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
  },
  {
    title: 'Side Hustle or Full-Time',
    body: 'Start with a few hours a week alongside your job. Plenty of sellers begin that way and grow from there.',
    accent: 'sky' as const,
  },
  {
    title: 'Earn On What You Sell',
    body: '[EARNING MODEL: one line on how sellers earn, e.g. commission on every sale you make.]',
    accent: 'sky' as const,
  },
  {
    title: 'Tools & Training',
    body: 'The same platform our promoters use, plus training to help you sell with confidence from day one.',
    accent: 'yellow' as const,
  },
  {
    title: 'Products People Want',
    body: 'Sell brands that are already on shelves and already moving. No inventing demand from scratch.',
    accent: 'yellow' as const,
  },
  {
    title: 'A Community Behind You',
    body: 'Join a network of sellers across South Africa who share what works and celebrate each other\'s wins.',
    accent: 'sky' as const,
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
            Why Sellers{' '}
            <span className="italic text-gradient-yellow">Join Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            Everything you need to build something of your own, without starting from nothing.
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
                className="card rounded-2xl p-7 sm:p-8"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold mb-6 ${
                  isYellow ? 'bg-yellow/10 text-yellow border border-yellow/20' : 'bg-sky/10 text-sky border border-sky/20'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl text-white mb-3 leading-[1.15]">{b.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8]">{b.body}</p>
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
  description="Become an independent Merch & Move seller. Side hustle or full-time, work on your own schedule and sell brands that already move."
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

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: three `OK:` lines.

With the dev server running, open `http://localhost:4321/start-your-business`. Expected: nav shows only the logo and a "Start Your Business" pill at every width; hero headline "Start Your Own Business" with the side-hustle badge above it; yellow "Start Your Business" button; six benefit cards below.

- [ ] **Step 7: Commit**

```bash
git add src/components/business/startUrl.ts src/components/business/BusinessHero.tsx src/components/business/BusinessBenefits.tsx src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add Start Your Business page with hero and benefits"
```

---

### Task 4: Steps, Qualities and Why Us sections

**Files:**
- Create: `src/components/business/BusinessSteps.tsx`
- Create: `src/components/business/BusinessQualities.tsx`
- Create: `src/components/business/BusinessWhyUs.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Consumes: `START_URL` from `./startUrl`.
- Produces: `BusinessSteps` renders `<section id="how-it-works">` (the hero's second button targets it). Others have no id.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
grep -q 'id="how-it-works"' "$P" || { echo "FAIL: steps section missing"; exit 1; }
grep -q 'What It Takes' "$P" || { echo "FAIL: qualities section missing"; exit 1; }
grep -q 'Why Merch' "$P" || { echo "FAIL: why-us section missing"; exit 1; }
echo "OK: steps, qualities and why-us sections present"
```

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: `FAIL: steps section missing`

- [ ] **Step 2: Create BusinessSteps.tsx**

```tsx
import { motion } from 'framer-motion'
import { START_URL } from './startUrl'

const steps = [
  {
    number: '01',
    title: 'Start Your Business',
    body: 'Hit the button, fill in a short form in the Merch & Move app, and tell us a little about yourself.',
    accent: 'yellow' as const,
  },
  {
    number: '02',
    title: 'Get Set Up',
    body: '[EARNING MODEL: what onboarding involves, e.g. starter kit, platform access, first training session.]',
    accent: 'sky' as const,
  },
  {
    number: '03',
    title: 'Start Selling',
    body: 'Share products with the people around you. Every sale is tracked on the platform, so you always know where you stand.',
    accent: 'sky' as const,
  },
  {
    number: '04',
    title: 'Grow',
    body: '[EARNING MODEL: how sellers grow, e.g. higher rates at volume, building a team, unlocking rewards.]',
    accent: 'yellow' as const,
  },
]

export default function BusinessSteps() {
  return (
    <section id="how-it-works" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] bottom-20 -left-20 opacity-15" />
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
            <span className="italic text-gradient-sky">Your First Sale</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => {
            const isYellow = s.accent === 'yellow'
            return (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold ${
                    isYellow ? 'bg-yellow/10 text-yellow border border-yellow/20' : 'bg-sky/10 text-sky border border-sky/20'
                  }`}>
                    {s.number}
                  </div>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">{s.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8]">{s.body}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-14"
        >
          <a
            href={START_URL}
            className="inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Start Your Business
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 3: Create BusinessQualities.tsx**

```tsx
import { motion } from 'framer-motion'

const qualities = [
  { title: 'Self-Driven', body: 'Nobody sets your hours. The people who do best here are the ones who show up for themselves.' },
  { title: 'A People Person', body: 'Selling is talking. If you enjoy a conversation and can read a room, you already have the hardest part.' },
  { title: 'Organised', body: 'Keep track of your customers, your stock and your follow-ups. The platform helps, but the habit is yours.' },
  { title: 'Ambitious', body: 'This can stay a side hustle or become a full business. How big it gets is up to you.' },
]

export default function BusinessQualities() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] -bottom-40 -right-40 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
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
              <span className="italic text-gradient-yellow">Just the Right Mindset.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-white/50 leading-relaxed"
            >
              We'll teach you the products and the platform. What we can't teach is the drive to use them.
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
                className="card rounded-2xl p-7"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-yellow/60 mb-5" />
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

- [ ] **Step 4: Create BusinessWhyUs.tsx**

```tsx
import { motion } from 'framer-motion'

const proofPoints = [
  { label: 'Active selling, not shelf-filling', body: 'Our promoters are trained to close sales in-store. You get that same playbook.' },
  { label: 'A platform that tracks everything', body: 'Every sale, every product, every day. You always know exactly what you\'ve earned.' },
  { label: 'Brands that already move', body: 'You sell products with proven demand and national retail presence.' },
]

export default function BusinessWhyUs() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[700px] h-[700px] -top-60 left-1/2 -translate-x-1/2 opacity-40" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
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
          <span className="italic text-gradient-sky">Already Sells</span>
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

- [ ] **Step 5: Add the sections to the page**

In `src/pages/start-your-business.astro`, add the imports:

```astro
import BusinessSteps from '../components/business/BusinessSteps.tsx'
import BusinessQualities from '../components/business/BusinessQualities.tsx'
import BusinessWhyUs from '../components/business/BusinessWhyUs.tsx'
```

and inside `<main>`, after `<BusinessBenefits client:visible />`:

```astro
    <BusinessSteps client:visible />
    <BusinessQualities client:visible />
    <BusinessWhyUs client:visible />
```

- [ ] **Step 6: Verify**

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: four `OK:` lines.

In the browser at `http://localhost:4321/start-your-business`, click "See How It Works" in the hero. Expected: scrolls to the four-step section, which ends with a "Start Your Business" button. Scroll on: qualities grid, then the three-card "why us" block.

- [ ] **Step 7: Commit**

```bash
git add src/components/business/BusinessSteps.tsx src/components/business/BusinessQualities.tsx src/components/business/BusinessWhyUs.tsx src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add steps, qualities and why-us sections to Start Your Business"
```

---

### Task 5: FAQ with income disclaimer

**Files:**
- Create: `src/components/business/BusinessFAQ.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Produces: `BusinessFAQ` renders an accordion (native `<details>` for accessibility and no state) and a disclaimer paragraph.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
grep -q '<details' "$P" || { echo "FAIL: FAQ accordion missing"; exit 1; }
grep -q 'side hustle' "$P" || { echo "FAIL: side hustle language missing"; exit 1; }
grep -q 'Individual results vary' "$P" || { echo "FAIL: income disclaimer missing"; exit 1; }
echo "OK: FAQ and disclaimer present"
```

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: `FAIL: FAQ accordion missing`

- [ ] **Step 2: Create BusinessFAQ.tsx**

```tsx
import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'Can I do this as a side hustle?',
    a: 'Yes. Most sellers start with a few hours a week around a job or studies. There is no minimum, and you can scale up whenever you are ready.',
  },
  {
    q: 'How do I earn money?',
    a: '[EARNING MODEL: plain-language answer on how sellers are paid, and how often.]',
  },
  {
    q: 'Does it cost anything to start?',
    a: '[EARNING MODEL: starter cost, if any, and what it includes.]',
  },
  {
    q: 'Am I employed by Merch & Move?',
    a: 'No. Independent sellers run their own business. You choose your hours, your customers and how much you want to sell.',
  },
  {
    q: 'Do I need sales experience?',
    a: 'No. We provide training on the products and the platform. Enthusiasm and consistency matter more than a CV.',
  },
  {
    q: 'Where in South Africa can I sell?',
    a: 'Anywhere. Sellers work in their own communities, so the programme is open across all nine provinces.',
  },
]

export default function BusinessFAQ() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
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

- [ ] **Step 3: Add to the page**

In `src/pages/start-your-business.astro`, add the import:

```astro
import BusinessFAQ from '../components/business/BusinessFAQ.tsx'
```

and inside `<main>`, after `<BusinessWhyUs client:visible />`:

```astro
    <BusinessFAQ client:visible />
```

- [ ] **Step 4: Verify**

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: five `OK:` lines.

In the browser, click an FAQ question. Expected: it expands and the plus icon rotates to a cross.

- [ ] **Step 5: Commit**

```bash
git add src/components/business/BusinessFAQ.tsx src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add FAQ and income disclaimer to Start Your Business"
```

---

### Task 6: Closing CTA

**Files:**
- Create: `src/components/business/BusinessCTA.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Consumes: `START_URL` from `./startUrl`.
- Produces: `BusinessCTA` renders the final section before the footer.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-business-page.sh`:

```bash
# All Start Your Business buttons share one href (the nav pill, hero, steps, closing CTA).
n=$(grep -o 'Start Your Business' "$P" | wc -l | tr -d ' ')
[ "$n" -ge 4 ] || { echo "FAIL: expected at least 4 Start Your Business CTAs, found $n"; exit 1; }
grep -q 'Your Move' "$P" || { echo "FAIL: closing CTA missing"; exit 1; }
echo "OK: closing CTA present, $n Start Your Business CTAs"
```

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: `FAIL: closing CTA missing`

- [ ] **Step 2: Create BusinessCTA.tsx**

```tsx
import { motion } from 'framer-motion'
import { START_URL } from './startUrl'

export default function BusinessCTA() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
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
          Side hustle today, something bigger tomorrow. It starts with one form.
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

- [ ] **Step 3: Add to the page**

In `src/pages/start-your-business.astro`, add the import:

```astro
import BusinessCTA from '../components/business/BusinessCTA.tsx'
```

and inside `<main>`, after `<BusinessFAQ client:visible />`:

```astro
    <BusinessCTA client:visible />
```

- [ ] **Step 4: Verify**

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: six `OK:` lines.

In the browser, scroll to the bottom. Expected: the "Your Business. Your Move." headline with a large yellow button above the footer.

- [ ] **Step 5: Commit**

```bash
git add src/components/business/BusinessCTA.tsx src/pages/start-your-business.astro scripts/check-business-page.sh
git commit -m "Add closing CTA to Start Your Business"
```

---

### Task 7: Full-page review

**Files:**
- Read-only pass over everything under `src/components/business/` and `src/pages/start-your-business.astro`.

- [ ] **Step 1: Confirm every earning-model placeholder is findable**

Run:
```bash
grep -rn "\[EARNING MODEL" src/components/business
```
Expected: 6 matches (benefits 1, steps 2, FAQ 2, disclaimer 1), all beginning `[EARNING MODEL`. Any bracketed placeholder that does not start with that prefix, other than the `[APP LINK]` comment in `startUrl.ts`, is a bug; fix it.

- [ ] **Step 2: Confirm every CTA reads START_URL**

Run:
```bash
grep -rn "href=" src/components/business src/pages/start-your-business.astro | grep -v "START_URL\|#how-it-works"
```
Expected: no output. Every href in the page is either `START_URL` or the in-page `#how-it-works` scroll.

- [ ] **Step 3: Confirm nothing links to the page and nothing else changed**

Run:
```bash
grep -rn "start-your-business" src | grep -v "src/pages/start-your-business.astro"
git diff e402067 --stat -- supabase src/components/ContactForm.tsx src/pages/index.astro src/components/MobileMenu.tsx
```
Expected: no output from either.

- [ ] **Step 4: Full build and assertion script**

Run:
```bash
npm run build && ./scripts/check-business-page.sh
```
Expected: six `OK:` lines, no build errors. Warnings about content config and `emitFile` are pre-existing and fine.

- [ ] **Step 5: Visual pass**

With the dev server on, load `http://localhost:4321/start-your-business` at desktop width and at a 390px-wide mobile viewport. Check: no horizontal scroll, every section visible, hero text not clipped, the nav shows only the logo and the pill at every width, buttons full width or centred on mobile.

Take one desktop screenshot and one mobile screenshot for the user.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A src scripts
git commit -m "Polish Start Your Business page"
```
(Skip if nothing changed.)

---

## Wiring the app link later

When the app's sign-up form URL exists, change one line in `src/components/business/startUrl.ts`, rebuild, and every button on the page points at it. If the link should open in a new tab, add `target="_blank" rel="noopener"` to the four anchors that read `START_URL` (nav pill, hero, steps, closing CTA).

## Self-review

**Spec coverage.** Purpose and hidden URL: Tasks 3 and 7. Positioning and side-hustle language: hero badge and sub-copy (3), benefit card (3), qualities (4), FAQ (5), closing CTA (6), asserted in Task 5's check. Nine sections: hero and benefits (3), steps, qualities, why-us (4), FAQ and disclaimer (5), closing CTA (6), footer (3). Minimal nav: Task 2, asserted in Task 3. `START_URL`: Task 3, consumed in 4 and 6, audited in 7. `noindex`: Tasks 1 and 3. No server or form work: nothing in the plan touches `supabase/`, verified in Task 7. Every test in the spec's Testing section maps to a step.

**Placeholders.** None outside the deliberate `[EARNING MODEL ...]` copy markers and the `[APP LINK]` comment, both of which the spec requires.

**Type consistency.** `START_URL` is the export name in Task 3 and the import in Tasks 3, 4 and 6 and the page. `minimal`, `ctaLabel` and `ctaHref` are the prop names in Task 2 and the page in Task 3. The steps section id `how-it-works` matches the hero's secondary button.
