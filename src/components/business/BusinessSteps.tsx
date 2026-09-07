import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { START_URL } from './startUrl'
import StepApplyMockup from './mockups/StepApplyMockup'
import StepSetupMockup from './mockups/StepSetupMockup'
import StepSellMockup from './mockups/StepSellMockup'
import StepGrowMockup from './mockups/StepGrowMockup'

const steps = [
  {
    number: '01',
    title: 'Start Your Business',
    headline: 'Two Minutes. One Form. You\'re In.',
    description:
      'Hit the button, fill in a short form in the Merch & Move app, and tell us a little about yourself. No CV, no interview panel, no waiting weeks for an answer.',
    features: ['Apply from your phone in minutes', 'No sales experience required', 'We\'ll be in touch with your Welcome Event details'],
    accent: 'yellow' as const,
    mockup: <StepApplyMockup />,
  },
  {
    number: '02',
    title: 'Get Set Up',
    headline: 'Trained, Equipped and Ready to Sell',
    description:
      'Come to your Welcome Event, where we train you on the products and the app. Your starter kit arrives, your login goes live and your wallet is switched on. You\'ll finish knowing exactly how you get paid.',
    features: ['A Welcome Event that gets you selling with confidence', 'Your starter kit, delivered to you', 'Your own app login and wallet, activated and ready'],
    accent: 'sky' as const,
    mockup: <StepSetupMockup />,
  },
  {
    number: '03',
    title: 'Start Selling',
    headline: 'Every Sale Lands in Your Wallet',
    description:
      'Share products with the people around you, at work, at gym, at church, on WhatsApp. Every sale is confirmed in the app and credited to your wallet, so you always know exactly where you stand.',
    features: ['Sell in your own community, your own way', 'Sales confirmed and tracked in real time', 'Watch your wallet grow with every sale'],
    accent: 'sky' as const,
    mockup: <StepSellMockup />,
  },
  {
    number: '04',
    title: 'Grow',
    headline: 'Side Hustle Today. Bigger Tomorrow.',
    description:
      'Start with a few hours a week and a handful of customers. Add more hours, more products and your own stock line as you go. The more you sell, the more the business becomes yours.',
    features: ['Scale from a few hours a week to full-time', 'Buy stock at a discount and earn the mark-up too', 'Earn your place at the Winners Event'],
    accent: 'yellow' as const,
    mockup: <StepGrowMockup />,
  },
]

export default function BusinessSteps() {
  const stepsRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ['start 70%', 'end 40%'] })

  const node0 = useTransform(scrollYProgress, [0, 0.08], [0.12, 0.7])
  const node1 = useTransform(scrollYProgress, [0.25, 0.35], [0.12, 0.7])
  const node2 = useTransform(scrollYProgress, [0.55, 0.65], [0.12, 0.7])
  const node3 = useTransform(scrollYProgress, [0.82, 0.92], [0.12, 0.7])
  const nodeOpacities = [node0, node1, node2, node3]
  const dot0 = useTransform(node0, [0.12, 0.7], [0.4, 1])
  const dot1 = useTransform(node1, [0.12, 0.7], [0.4, 1])
  const dot2 = useTransform(node2, [0.12, 0.7], [0.4, 1])
  const dot3 = useTransform(node3, [0.12, 0.7], [0.4, 1])
  const dotOpacities = [dot0, dot1, dot2, dot3]

  return (
    <section id="how-it-works" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-20 -left-20 opacity-15" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="italic text-gradient-yellow">Your First Sale</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            From "I'm curious" to money in your wallet, without the hard part.
          </motion.p>
        </div>

        <div ref={stepsRef} className="relative">
          <div className="hidden lg:block absolute left-5 top-8 bottom-8 w-px">
            <div className="absolute inset-0 bg-white/[0.06]" />
            <motion.div className="absolute top-0 left-0 right-0 bg-yellow/50 origin-top" style={{ scaleY: scrollYProgress, height: '100%' }} />
            <motion.div className="absolute top-0 -left-[2px] w-[5px] bg-yellow/20 origin-top blur-[3px]" style={{ scaleY: scrollYProgress, height: '100%' }} />
          </div>

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
                  <div className="hidden lg:flex absolute -left-[36px] top-10 -translate-x-1/2 w-4 h-4 items-center justify-center">
                    <motion.div className={`absolute inset-0 rounded-full blur-[4px] ${isYellow ? 'bg-yellow' : 'bg-sky'}`} style={{ opacity: nodeOpacities[i] }} />
                    <motion.div
                      className={`relative w-2.5 h-2.5 rounded-full border-2 ${isYellow ? 'border-yellow/30 bg-yellow/20' : 'border-sky/30 bg-sky/20'}`}
                      style={{ opacity: dotOpacities[i] }}
                    />
                  </div>

                  <div className="card rounded-2xl p-6 sm:p-8 group hover:bg-white/[0.055] transition-all duration-500">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold ${
                        isYellow ? 'bg-yellow/10 text-yellow border border-yellow/20' : 'bg-sky/10 text-sky border border-sky/20'
                      }`}>
                        {step.number}
                      </div>
                      <span className={`text-xs font-bold tracking-[0.15em] uppercase ${isYellow ? 'text-yellow' : 'text-sky'}`}>
                        {step.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
                      <div className="w-full max-w-[260px] mx-auto lg:mx-0">{step.mockup}</div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">{step.headline}</h3>
                        <p className="text-sm text-white/50 leading-[1.8] mb-5">{step.description}</p>
                        <div className="space-y-3">
                          {step.features.map(feature => (
                            <div key={feature} className="flex items-start gap-2.5">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${isYellow ? 'bg-yellow/60' : 'bg-sky/60'}`} />
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

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <a
            href={START_URL}
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Start Your Business
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
