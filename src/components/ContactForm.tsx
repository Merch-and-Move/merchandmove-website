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
      // TODO: Wire up to Supabase or API endpoint
      // For now, simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form data:', data)
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-navy relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-sky/70 text-base">
            Ready to move product? Tell us about your needs.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-sky/70 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-white/10 border border-sky/20 rounded-lg text-white placeholder-sky/30 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:border-transparent transition-all text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-sky/70 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-sky/20 rounded-lg text-white placeholder-sky/30 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:border-transparent transition-all text-sm"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-sky/70 mb-1.5">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full px-4 py-3 bg-white/10 border border-sky/20 rounded-lg text-white placeholder-sky/30 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:border-transparent transition-all text-sm"
              placeholder="Your company name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-sky/70 mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3 bg-white/10 border border-sky/20 rounded-lg text-white placeholder-sky/30 focus:outline-none focus:ring-2 focus:ring-sky/50 focus:border-transparent transition-all text-sm resize-none"
              placeholder="Tell us about your merchandising needs..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-4 bg-yellow text-navy font-semibold rounded-lg hover:bg-yellow/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
          >
            {status === 'sending' ? 'Sending...' : 'Request a Demo'}
          </button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-green-400 text-sm font-medium"
            >
              Thanks! We'll be in touch shortly.
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-400 text-sm font-medium"
            >
              Something went wrong. Please try again or email us directly.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
