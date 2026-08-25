import { motion } from 'framer-motion'

const features = [
  'Commission on confirmed sales only',
  'No sales = no charge, ever',
  'Transparent per-product tracking',
  'Rate tailored to your category',
]

export default function CustomisationSection() {
  return (
    <section id="pricing" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(169deg, rgba(36,51,173,0.15) 0%, rgba(62,181,225,0.08) 100%)' }} />
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-20 -right-40 opacity-15" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] -bottom-20 -left-20 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            Pricing Model
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-[1.05]"
          >
            Simple. Transparent.{' '}
            <span className="italic text-gradient-yellow">Results-Based.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto leading-[1.7]"
          >
            One simple fee &mdash; a commission on the sales we make for you. No sales, no charge.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pricing-highlight rounded-2xl p-8 sm:p-10 max-w-lg mx-auto group cursor-default transition-all duration-500"
        >
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-yellow/10 text-yellow border border-yellow/20">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>

          {/* Label */}
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-yellow">
            Sales Commission
          </span>

          {/* Price label */}
          <h3 className="font-display text-2xl text-white mt-3 mb-4 italic">
            Pay Per Sale
          </h3>

          <p className="text-sm text-white/50 leading-[1.7] mb-8">
            A percentage on the products our promoters actually sell. That&rsquo;s the entire model &mdash; no sales, no charge.
          </p>

          {/* Features */}
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm text-white/45">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-sm text-white/40 mb-6">
            Want a custom quote? Tell us about your stores, products, and goals.
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.3)] transition-all duration-500"
          >
            Get a Custom Quote
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
