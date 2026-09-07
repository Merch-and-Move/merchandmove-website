# Start Your Business page — design

**Date:** 2026-09-07
**Status:** Draft for review
**URL:** `https://merchandmove.co.za/start-your-business`

## Purpose

A single marketing page that recruits independent, self-employed sellers to
build a business selling on Merch & Move's behalf. This audience is distinct
from the homepage audience (businesses buying the platform) and from the
promoters employed through the app. The page is the first step of a larger
future feature; for now it only markets the opportunity and captures interest.

The page is intentionally unlinked from the homepage and nav. It is reachable
by URL only until the programme is ready to launch.

## Out of scope

- Any lead capture on this site. The "Start Your Business" buttons link to a
  contact form inside the Merch & Move application, which is being built
  separately. Until that URL exists the buttons point at a placeholder.
- Any change to the `notify-lead` Edge Function or the shared Supabase
  project.
- Homepage or nav links to the new page.

## Programme decisions (2026-09-07)

- **Earning.** Commission on every sale made through the app, plus the option
  to buy from Merch & Move's in-house brands at a discount and sell at their
  own mark-up. No commission rate is published; the FAQ uses a clearly
  labelled illustrative example whose numbers live in one constant in
  `BusinessFAQ.tsx`.
- **Starter kit.** Required. Contents and price are undecided, so copy says
  one exists and that it is explained before anyone commits.
- **Onboarding.** A "Welcome Event" (product and app training), starter kit
  delivery, app login and wallet activation. Use the name "Welcome Event",
  not "training".
- **Wallet payouts.** Request any time, no minimum, no fee, usually in the
  bank within a business day or two.
- **Commission.** A minimum of 15% on every sale made through the app. This
  figure is published on the page.
- **Ways to earn.** Four streams: selling from the app, buying in-house stock
  at a discount and selling at own mark-up, a unique coupon code whose
  website sales are credited to the owner, and booking shifts in retail
  stores. They get their own section, "So Many Ways To Earn".
- **Winners Event.** A recognition event for top sellers. Mentioned in the
  community benefit card, step 4, a banner under the ways-to-earn section,
  and an FAQ item. No dates, prizes or qualifying rules are published.
- **Perfect fits.** The "What it takes" section lists example candidates:
  doctors' rooms receptionists, personal trainers, stay-at-home mothers,
  community leaders, students, hairdressers and beauty therapists, and
  salespeople wanting a side income.
- **Growth.** No tiers or team earnings. Growth copy is about hours,
  products, adding a stock line and earning a Winners Event invitation.
- **Income disclosure statement.** None exists. The disclaimer is a plain
  sentence with no link.

## Positioning

The page speaks to individuals, not businesses. It should feel exciting and
attainable: an invitation to build something of your own, whether that is a
side hustle alongside a job or a full-time business. "Side hustle" language
appears in the hero, the benefits and the FAQ so the low-commitment entry
point is obvious. The single call to action everywhere on the page is
**Start Your Business**.

The page is visually rich in the same way the homepage is: animated app
mockups, inline icons, counters and reveal animations. It must not read as
a plain text page next to the homepage.

## The wallet

Every business owner gets a wallet inside the Merch & Move app. Earnings land
in it, and the owner can request a payout whenever they want. This is the
page's standout feature and gets its own section with an animated wallet
mockup: balance counting up, a live earnings feed, and a "Request Payout"
button that resolves to "Payout sent". Copy states the payout rules above.

## Page structure

One scrolling page, modelled on Forever Living's "Your Opportunity" and
"What it takes" pages merged into one. Sections in order:

1. **Hero.** Headline about starting your own business on your own schedule,
   sub-copy that names the side-hustle option, primary "Start Your Business"
   button linking to the app, secondary button scrolling to "How it works".
   Three small floating stat chips (own hours, wallet, no experience needed)
   give the hero visual energy.
2. **Benefits grid.** Six cards with an icon each: be your own boss, side
   hustle or full-time, earn on what you sell, your own wallet, tools and
   training, community. Earning copy follows the programme decisions above.
3. **How it works.** Four numbered steps in the homepage's step-card layout,
   each with a mini animated mockup: start your business (application form
   sending), get set up (onboarding checklist ticking), start selling (sale
   notifications landing), grow (earnings chart climbing). Step copy is
   generic until the model is decided. Ends with a "Start Your Business"
   button.
4. **So many ways to earn.** Four cards, one per income stream, with icons,
   followed by a Winners Event banner.
5. **Your wallet.** Two-column section, wallet mockup on one side and three
   feature points on the other: earnings land in your wallet, request a
   payout whenever you want, see every sale.
6. **What it takes.** Short grid of qualities: self-driven, people person,
   organised, ambitious, plus a "perfect fits" list of example candidates.
   Sets expectations without being a job spec.
7. **Why Merch & Move.** Credibility block reusing the homepage's proof points
   (active selling expertise, live tracking platform, brands that already
   move).
8. **FAQ.** Eight accordion items, including "Can I do this as a side
   hustle?" and "How do I get paid?" (answered with the wallet). The
   earnings answer is a clearly labelled illustrative example.
9. **Disclaimer.** Short income disclaimer paragraph. South African
   direct-selling pages carry one. No income disclosure link.
10. **Closing CTA.** Large headline and a single "Start Your Business" button,
   in the style of the homepage's closing CTA section.
11. **Footer.** Existing site footer.

Nav is the existing `Nav.astro` in a new minimal mode: logo on the left,
one "Start Your Business" pill on the right linking to the app, and nothing
else. No section links and no mobile menu. The page has a single purpose and
the nav should not offer exits from it.

## The start link

`src/components/business/startUrl.ts` exports one constant, `START_URL`.
Every "Start Your Business" button on the page, including the nav pill,
reads it. Its value is `#` with a comment marking it `[APP LINK]` until the
application's contact form URL is supplied. Changing that one line wires up
the whole page.

## Components

New files, following the homepage's pattern of one React component per
section with `client:visible` hydration and framer-motion reveals, and
mockups as self-contained components with in-view animations:

```
src/pages/start-your-business.astro
src/components/business/startUrl.ts
src/components/business/BusinessHero.tsx
src/components/business/BusinessBenefits.tsx
src/components/business/BusinessSteps.tsx
src/components/business/BusinessWaysToEarn.tsx
src/components/business/BusinessWallet.tsx
src/components/business/BusinessQualities.tsx
src/components/business/BusinessWhyUs.tsx
src/components/business/BusinessFAQ.tsx
src/components/business/BusinessCTA.tsx
src/components/business/mockups/WalletMockup.tsx
src/components/business/mockups/StepApplyMockup.tsx
src/components/business/mockups/StepSetupMockup.tsx
src/components/business/mockups/StepSellMockup.tsx
src/components/business/mockups/StepGrowMockup.tsx
```

Existing `Layout.astro`, `Footer.astro`, `SmoothScroll.tsx` and global
styles are reused unchanged. `Nav.astro` gains a `minimal` prop. When set, it
renders only the logo and a single pill whose label and target come from
`ctaLabel` and `ctaHref` props. The homepage does not pass `minimal` and is
unchanged.

`Layout.astro` gains an optional `noindex` prop that emits
`<meta name="robots" content="noindex">`. The new page sets it so search
engines do not surface an unfinished programme. Remove it at launch.

## Copy

Copy is written in the site's existing voice (direct, confident, short
lines). The only remaining placeholder is the `[APP LINK]` in `startUrl.ts`.

## Testing

- `astro build` passes with no new warnings.
- Page renders at `/start-your-business` in dev with every section visible
  and every mockup animating when scrolled into view.
- Every "Start Your Business" button and the nav pill carry the same href,
  read from `START_URL`.
- The page's `<head>` contains the noindex meta; the homepage's does not.
- The new page's nav shows only the logo and the pill. The homepage nav is
  unchanged.
- Nothing under `supabase/` or in `ContactForm.tsx` changes.
