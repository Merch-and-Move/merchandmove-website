import { motion } from 'framer-motion'
import StepBookIllustration from './illustrations/StepBookIllustration'
import StepExecuteIllustration from './illustrations/StepExecuteIllustration'
import StepTrackIllustration from './illustrations/StepTrackIllustration'
import StepPayIllustration from './illustrations/StepPayIllustration'
import AnimatedConnector from './illustrations/AnimatedConnector'

const steps = [
  {
    number: '01',
    title: 'Book Shifts',
    headline: 'Choose Your Stores, Dates & Products',
    description:
      'Log into our platform, select the stores you want to activate, pick your dates, and assign the products you want promoted. Book as many or as few shifts as you need — scale up for launches, scale down for maintenance.',
    features: ['Select stores from our national footprint', 'Assign specific products & promotions', 'Flexible scheduling — daily, weekly, or campaign-based'],
    accent: 'yellow' as const,
    illustration: <StepBookIllustration />,
  },
  {
    number: '02',
    title: 'We Execute',
    headline: 'Our Promoters Actively Sell In-Store',
    description:
      'Our nationally deployed, trained promoters arrive at your selected stores and actively engage shoppers. They don\'t just stand around — they recommend, demonstrate, and close sales of your products.',
    features: ['Trained brand ambassadors, not passive merchandisers', 'Active selling with real shopper engagement', 'GPS-verified attendance & timestamped check-ins'],
    accent: 'sky' as const,
    illustration: <StepExecuteIllustration />,
  },
  {
    number: '03',
    title: 'Track Results',
    headline: 'Real-Time Sales Dashboard',
    description:
      'Access your dedicated portal to see exactly what sold, where, and when. Our platform uploads store-level sales data daily — so you know the impact of every shift within 24 hours.',
    features: ['Live dashboards by store, promoter & product', 'Daily sales data uploads with shift-level detail', 'ROI tracking — see your return on every rand spent'],
    accent: 'sky' as const,
    illustration: <StepTrackIllustration />,
  },
  {
    number: '04',
    title: 'Pay for Results',
    headline: 'You Only Pay for What We Sell',
    description:
      'Our model is built around performance. You pay a commission on the products our promoters actually sell — aligning our incentives directly with yours. The more we sell, the more we both earn.',
    features: ['Commission-based: pay only on confirmed sales', 'Nominal per-shift booking fee (volume discounts available)', 'Monthly platform subscription for portal access'],
    accent: 'yellow' as const,
    illustration: <StepPayIllustration />,
  },
]

export default function HowItWorksSection() {
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

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => {
            const isYellow = step.accent === 'yellow'
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="card rounded-2xl p-8 sm:p-10 group hover:bg-white/[0.055] transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1fr] gap-8 lg:gap-12 items-start">
                    {/* Step number + illustration */}
                    <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isYellow
                          ? 'bg-yellow/10 text-yellow border border-yellow/20'
                          : 'bg-sky/10 text-sky border border-sky/20'
                      }`}>
                        {step.illustration}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="relative w-7 h-7">
                          <svg width={28} height={28} className="-rotate-90">
                            <circle cx={14} cy={14} r={11} fill="none" stroke={isYellow ? 'rgba(249,215,2,0.08)' : 'rgba(62,181,225,0.08)'} strokeWidth={2} />
                            <motion.circle
                              cx={14} cy={14} r={11} fill="none"
                              stroke={isYellow ? 'rgba(249,215,2,0.4)' : 'rgba(62,181,225,0.4)'}
                              strokeWidth={2} strokeLinecap="round"
                              strokeDasharray={69.1}
                              initial={{ strokeDashoffset: 69.1 }}
                              whileInView={{ strokeDashoffset: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: i * 0.15 }}
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-mono text-white/20">{step.number}</span>
                        </div>
                        <span className={`text-xs font-bold tracking-[0.15em] uppercase ${
                          isYellow ? 'text-yellow' : 'text-sky'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    </div>

                    {/* Main content */}
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl text-white mb-4 leading-[1.1]">
                        {step.headline}
                      </h3>
                      <p className="text-sm text-white/50 leading-[1.8]">
                        {step.description}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-4">
                      {step.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            isYellow ? 'bg-yellow/60' : 'bg-sky/60'
                          }`} />
                          <p className="text-sm text-white/55 leading-[1.6]">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated connector line between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center py-1">
                    <AnimatedConnector
                      fromColor={step.accent}
                      toColor={steps[i + 1].accent}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
