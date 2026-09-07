import { motion } from 'framer-motion'
import WalletMockup from './mockups/WalletMockup'

const features = [
  {
    title: 'Every Sale Lands in Your Wallet',
    description: 'The moment a sale is confirmed, your earnings are credited to your wallet in the app. No spreadsheets, no chasing, no waiting for month-end.',
  },
  {
    title: 'Request a Payout Whenever You Want',
    description: 'Need it now? Tap Request Payout and it\'s on its way to your bank, usually within a business day or two. No minimum balance. No fees. No waiting for payday.',
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
