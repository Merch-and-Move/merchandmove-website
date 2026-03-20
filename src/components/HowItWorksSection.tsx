import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Book Shifts',
    headline: 'Choose Your Stores, Dates & Products',
    description:
      'Log into our platform, select the stores you want to activate, pick your dates, and assign the products you want promoted. Book as many or as few shifts as you need — scale up for launches, scale down for maintenance.',
    features: ['Select stores from our national footprint', 'Assign specific products & promotions', 'Flexible scheduling — daily, weekly, or campaign-based'],
    accent: 'yellow' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Execute',
    headline: 'Our Promoters Actively Sell In-Store',
    description:
      'Our nationally deployed, trained promoters arrive at your selected stores and actively engage shoppers. They don\'t just stand around — they recommend, demonstrate, and close sales of your products.',
    features: ['Trained brand ambassadors, not passive merchandisers', 'Active selling with real shopper engagement', 'GPS-verified attendance & timestamped check-ins'],
    accent: 'sky' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Track Results',
    headline: 'Real-Time Sales Dashboard',
    description:
      'Access your dedicated portal to see exactly what sold, where, and when. Our platform uploads store-level sales data daily — so you know the impact of every shift within 24 hours.',
    features: ['Live dashboards by store, promoter & product', 'Daily sales data uploads with shift-level detail', 'ROI tracking — see your return on every rand spent'],
    accent: 'sky' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Pay for Results',
    headline: 'You Only Pay for What We Sell',
    description:
      'Our model is built around performance. You pay a commission on the products our promoters actually sell — aligning our incentives directly with yours. The more we sell, the more we both earn.',
    features: ['Commission-based: pay only on confirmed sales', 'Nominal per-shift booking fee (volume discounts available)', 'Monthly platform subscription for portal access'],
    accent: 'yellow' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-20 -left-20 opacity-15" />
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
                    {/* Step number + icon */}
                    <div className="flex items-center gap-5 lg:flex-col lg:items-start lg:gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isYellow
                          ? 'bg-yellow/10 text-yellow border border-yellow/20'
                          : 'bg-sky/10 text-sky border border-sky/20'
                      }`}>
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-white/20 block">{step.number}</span>
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

                {/* Connector line between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex justify-center py-1">
                    <div className={`w-px h-6 ${
                      isYellow ? 'bg-yellow/15' : 'bg-sky/15'
                    }`} />
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
