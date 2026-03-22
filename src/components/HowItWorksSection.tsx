import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import StepBookMockup from './mockups/StepBookMockup'
import StepExecuteMockup from './mockups/StepExecuteMockup'
import StepTrackMockup from './mockups/StepTrackMockup'
import StepPayMockup from './mockups/StepPayMockup'

const steps = [
  {
    number: '01',
    title: 'Book Shifts',
    headline: 'Choose Your Stores, Dates & Products',
    description:
      'Log into our platform, select the stores you want to activate, pick your dates, and assign the products you want promoted. Book as many or as few shifts as you need — scale up for launches, scale down for maintenance.',
    features: ['Select stores from our national footprint', 'Assign specific products & promotions', 'Flexible scheduling — daily, weekly, or campaign-based'],
    accent: 'yellow' as const,
    mockup: <StepBookMockup />,
  },
  {
    number: '02',
    title: 'We Execute',
    headline: 'Our Promoters Actively Sell In-Store',
    description:
      'Our nationally deployed, trained promoters arrive at your selected stores and actively engage shoppers. They don\'t just stand around — they recommend, demonstrate, and close sales of your products.',
    features: ['Trained brand ambassadors, not passive merchandisers', 'Active selling with real shopper engagement', 'GPS-verified attendance & timestamped check-ins'],
    accent: 'sky' as const,
    mockup: <StepExecuteMockup />,
  },
  {
    number: '03',
    title: 'Track Results',
    headline: 'Real-Time Sales Dashboard',
    description:
      'Access your dedicated portal to see exactly what sold, where, and when. Our platform uploads store-level sales data daily — so you know the impact of every shift within 24 hours.',
    features: ['Live dashboards by store, promoter & product', 'Daily sales data uploads with shift-level detail', 'ROI tracking — see your return on every rand spent'],
    accent: 'sky' as const,
    mockup: <StepTrackMockup />,
  },
  {
    number: '04',
    title: 'Pay for Results',
    headline: 'You Only Pay for What We Sell',
    description:
      'Our model is built around performance. You pay a commission on the products our promoters actually sell — aligning our incentives directly with yours. The more we sell, the more we both earn.',
    features: ['Commission-based: pay only on confirmed sales', 'Nominal per-shift booking fee (volume discounts available)', 'Monthly platform subscription for portal access'],
    accent: 'yellow' as const,
    mockup: <StepPayMockup />,
  },
]

export default function HowItWorksSection() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start 70%', 'end 40%'],
  })

  /* Derive node glow opacities — each activates as the line passes it */
  const node0 = useTransform(scrollYProgress, [0, 0.08], [0.12, 0.7])
  const node1 = useTransform(scrollYProgress, [0.25, 0.35], [0.12, 0.7])
  const node2 = useTransform(scrollYProgress, [0.55, 0.65], [0.12, 0.7])
  const node3 = useTransform(scrollYProgress, [0.82, 0.92], [0.12, 0.7])
  const nodeOpacities = [node0, node1, node2, node3]

  return (
    <section id="how-it-works" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-20 -left-20 opacity-15" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            <span className="italic text-gradient-yellow">Moving Product</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            A simple, transparent process from booking to results.
          </motion.p>
        </div>

        {/* Steps with scroll progress line */}
        <div ref={stepsRef} className="relative">
          {/* ── Vertical progress line (desktop only) ── */}
          <div className="hidden lg:block absolute left-5 top-8 bottom-8 w-px">
            {/* Track — dim baseline */}
            <div className="absolute inset-0 bg-white/[0.06]" />

            {/* Fill — scroll-driven yellow neon */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-yellow/50 origin-top"
              style={{ scaleY: scrollYProgress, height: '100%' }}
            />

            {/* Glow — soft bloom behind the fill */}
            <motion.div
              className="absolute top-0 -left-[2px] w-[5px] bg-yellow/20 origin-top blur-[3px]"
              style={{ scaleY: scrollYProgress, height: '100%' }}
            />
          </div>

          {/* ── Step cards ── */}
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
                  {/* Node dot on the progress line */}
                  <div className="hidden lg:flex absolute -left-[46px] top-10 items-center justify-center">
                    {/* Glow ring */}
                    <motion.div
                      className={`absolute w-4 h-4 rounded-full blur-[4px] ${
                        isYellow ? 'bg-yellow' : 'bg-sky'
                      }`}
                      style={{ opacity: nodeOpacities[i] }}
                    />
                    {/* Dot */}
                    <motion.div
                      className={`relative w-2.5 h-2.5 rounded-full border-2 ${
                        isYellow
                          ? 'border-yellow/30 bg-yellow/20'
                          : 'border-sky/30 bg-sky/20'
                      }`}
                      style={{ opacity: useTransform(nodeOpacities[i], [0.12, 0.7], [0.4, 1]) }}
                    />
                  </div>

                  {/* Card */}
                  <div className="card rounded-2xl p-6 sm:p-8 group hover:bg-white/[0.055] transition-all duration-500">
                    {/* Header: number + title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold ${
                        isYellow
                          ? 'bg-yellow/10 text-yellow border border-yellow/20'
                          : 'bg-sky/10 text-sky border border-sky/20'
                      }`}>
                        {step.number}
                      </div>
                      <span className={`text-xs font-bold tracking-[0.15em] uppercase ${
                        isYellow ? 'text-yellow' : 'text-sky'
                      }`}>
                        {step.title}
                      </span>
                    </div>

                    {/* Content grid: illustration | text */}
                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
                      {/* Left: Rich illustration */}
                      <div className="w-full max-w-[260px] mx-auto lg:mx-0">
                        {step.mockup}
                      </div>

                      {/* Right: Headline, description, features */}
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">
                          {step.headline}
                        </h3>
                        <p className="text-sm text-white/50 leading-[1.8] mb-5">
                          {step.description}
                        </p>
                        <div className="space-y-3">
                          {step.features.map((feature) => (
                            <div key={feature} className="flex items-start gap-2.5">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                isYellow ? 'bg-yellow/60' : 'bg-sky/60'
                              }`} />
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
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
