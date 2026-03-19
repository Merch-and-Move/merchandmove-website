import { motion } from 'framer-motion'

const logos = [
  'Pick n Pay', 'Checkers', 'Shoprite', 'Spar', 'Woolworths',
  'Makro', 'Game', 'Clicks', 'Dis-Chem', 'Boxer',
]

export default function LogoBar() {
  return (
    <section className="relative py-20 bg-base overflow-hidden">
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[11px] font-semibold tracking-[0.25em] uppercase text-white/25 mb-12"
        >
          Trusted by leading South African retailers
        </motion.p>

        {/* Logo marquee */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-base to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-base to-transparent z-10" />

          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {[...logos, ...logos].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 mx-8 sm:mx-12 flex items-center justify-center"
                >
                  <span className="text-sm font-semibold text-white/15 whitespace-nowrap tracking-wide">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
