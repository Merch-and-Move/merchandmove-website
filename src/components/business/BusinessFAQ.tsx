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
