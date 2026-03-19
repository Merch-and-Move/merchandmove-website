import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form data:', data)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClasses =
    'w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-yellow/50 focus:border-yellow/40 transition-all duration-300 text-sm'

  return (
    <section id="contact" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-0 left-0 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-0 right-0 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6">
            Get Started
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-[1.05]">
            Get in <span className="italic text-gradient-yellow">Touch</span>
          </h2>
          <p className="text-sm text-white/50">
            Ready to move product? Tell us about your needs.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card-elevated rounded-2xl p-8 sm:p-10 space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase mb-2">
                Name
              </label>
              <input type="text" id="name" name="name" required className={inputClasses} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase mb-2">
                Email
              </label>
              <input type="email" id="email" name="email" required className={inputClasses} placeholder="you@company.com" />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase mb-2">
              Company
            </label>
            <input type="text" id="company" name="company" className={inputClasses} placeholder="Your company name" />
          </div>

          <div>
            <label htmlFor="message" className="block text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase mb-2">
              Message
            </label>
            <textarea id="message" name="message" rows={4} required className={`${inputClasses} resize-none`} placeholder="Tell us about your merchandising needs..." />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-yellow text-base font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(249,215,2,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {status === 'sending' ? 'Sending...' : 'Request a Demo'}
          </button>

          {status === 'success' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-emerald-400/80 text-sm">
              Thanks! We'll be in touch shortly.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-red-400/80 text-sm">
              Something went wrong. Please email us directly.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
