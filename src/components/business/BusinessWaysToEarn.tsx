import { motion } from 'framer-motion'

const ways = [
  {
    title: 'Sell Your Own Stock',
    body: 'Buy from our in-house brands at incredible discounts, set your own mark-up and keep the difference. Your stock, your price, your profit.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    title: 'Your Unique Coupon',
    body: 'Get a coupon code that\'s yours alone. Share it anywhere. Every sale on our website that uses it is credited to you, and we deliver straight to your customer. You never touch a box.',
    accent: 'sky' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    title: 'Shifts in Retail Stores',
    body: 'Want more? Book shifts in the retail stores we work with and sell on the floor. Real customers, real volume, on the days that suit you.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
]

export default function BusinessWaysToEarn() {
  return (
    <section id="ways-to-earn" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[600px] h-[600px] -top-40 -left-40 opacity-20" />
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] bottom-0 right-0 translate-x-1/4 opacity-20" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
          >
            Ways to Earn
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.0]"
          >
            So Many Ways{' '}
            <span className="italic text-gradient-sky">To Earn</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            One business, three income streams. Use one, use them all. Every rand lands in the same wallet.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {ways.map((w, i) => {
            const isYellow = w.accent === 'yellow'
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isYellow
                      ? 'bg-yellow/10 text-yellow border border-yellow/20 group-hover:shadow-[0_0_24px_rgba(249,215,2,0.2)]'
                      : 'bg-sky/10 text-sky border border-sky/20 group-hover:shadow-[0_0_24px_rgba(62,181,225,0.2)]'
                  }`}>
                    {w.icon}
                  </div>
                  <span className={`text-[11px] font-mono font-bold ${isYellow ? 'text-yellow/50' : 'text-sky/50'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-white mb-3 leading-[1.15]">{w.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8] group-hover:text-white/65 transition-colors duration-500">{w.body}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Winners Event banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 pricing-highlight rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <div className="w-14 h-14 rounded-2xl bg-yellow/15 border border-yellow/30 text-yellow flex items-center justify-center flex-shrink-0 glow-yellow">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold tracking-[0.25em] text-yellow uppercase mb-2">The Winners Event</div>
            <h3 className="font-display text-2xl sm:text-3xl text-white mb-2 leading-[1.1]">Sell Your Way Onto the Stage</h3>
            <p className="text-sm text-white/50 leading-[1.8]">
              Our top sellers earn their place at the Winners Event, where we celebrate the people who moved the most
              and reward them for it. Everyone starts at zero. Where you finish is up to you.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
