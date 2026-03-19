import { motion } from 'framer-motion'

export default function BrandAmbassadors() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: 'rgba(62, 181, 225, 0.18)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-navy/5 rounded-2xl aspect-[4/3] flex items-center justify-center"
          >
            <span className="text-navy/20 text-sm font-medium">Brand Ambassadors Image</span>
          </motion.div>

          {/* Content */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl font-bold text-navy mb-6 leading-tight"
            >
              Your Brand. Our People.{' '}
              <span className="text-sky">Zero Gaps</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-base text-indigo/80 leading-relaxed">
                We train our team on your products, brand protocols, and retail
                sales processes, so they act as true brand ambassadors.
              </p>
              <p className="text-base text-indigo/80 leading-relaxed">
                Whether it's merchandising, promotions, or live selling, our staff
                seamlessly plug into your brand and speak your language with
                confidence.
              </p>
              <p className="text-base text-indigo/80 leading-relaxed">
                With our real-time software, you'll track performance, manage
                shifts, and view results — all without the admin. It's outsourced
                staffing with in-house control.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8"
            >
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-white bg-navy rounded-xl hover:bg-navy/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-navy/20"
              >
                Request a Demo
                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
