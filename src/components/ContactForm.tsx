import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

type Status = 'idle' | 'sending' | 'success' | 'error'

type ProductCategory =
  | 'food_and_beverage'
  | 'alcoholic_beverage'
  | 'beauty_and_personal_care'
  | 'health_wellness_supplements'
  | 'other'

type RetailFootprint =
  | 'not_in_stores_yet'
  | 'independent_stores'
  | 'regional_chains'
  | 'national_chains'
  | 'dtc_only'

type SaRegion =
  | 'national'
  | 'gauteng'
  | 'western_cape'
  | 'kwazulu_natal'
  | 'eastern_cape'
  | 'free_state'
  | 'mpumalanga'
  | 'limpopo'
  | 'north_west'
  | 'northern_cape'

type Timeline = 'asap' | 'one_to_three_months' | 'three_to_six_months' | 'exploring'

type LeadPayload = {
  full_name: string
  work_email: string
  company: string
  phone: string
  website: string | null
  product_category: ProductCategory
  retail_footprint: RetailFootprint
  target_regions: SaRegion[]
  timeline: Timeline
  notes: string | null
  hp_website_url: string | null
  user_agent: string | null
  referrer: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

const ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT_URL as string | undefined

const PRODUCT_CATEGORIES: { value: ProductCategory; label: string }[] = [
  { value: 'food_and_beverage', label: 'Food & Beverage' },
  { value: 'alcoholic_beverage', label: 'Alcoholic Beverage' },
  { value: 'beauty_and_personal_care', label: 'Beauty & Personal Care' },
  { value: 'health_wellness_supplements', label: 'Health, Wellness & Supplements' },
  { value: 'other', label: 'Other' },
]

const RETAIL_FOOTPRINTS: { value: RetailFootprint; label: string }[] = [
  { value: 'not_in_stores_yet', label: 'Not in stores yet' },
  { value: 'independent_stores', label: 'Independent stores only' },
  { value: 'regional_chains', label: 'Some regional chains' },
  { value: 'national_chains', label: 'National chains' },
  { value: 'dtc_only', label: 'DTC / online only' },
]

const TIMELINES: { value: Timeline; label: string }[] = [
  { value: 'asap', label: 'ASAP (under 1 month)' },
  { value: 'one_to_three_months', label: '1 – 3 months' },
  { value: 'three_to_six_months', label: '3 – 6 months' },
  { value: 'exploring', label: 'Just exploring' },
]

const REGIONS: { value: SaRegion; label: string }[] = [
  { value: 'national', label: 'National' },
  { value: 'gauteng', label: 'Gauteng' },
  { value: 'western_cape', label: 'Western Cape' },
  { value: 'kwazulu_natal', label: 'KwaZulu-Natal' },
  { value: 'eastern_cape', label: 'Eastern Cape' },
  { value: 'free_state', label: 'Free State' },
  { value: 'mpumalanga', label: 'Mpumalanga' },
  { value: 'limpopo', label: 'Limpopo' },
  { value: 'north_west', label: 'North West' },
  { value: 'northern_cape', label: 'Northern Cape' },
]

// Accepts "yourbrand.com", "www.yourbrand.co.za/shop", or a full URL.
// Returns the URL normalized to an https:// prefix, or null if invalid.
function normalizeWebsite(raw: string): { ok: boolean; value: string | null } {
  if (!raw) return { ok: true, value: null }
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  try {
    const { hostname } = new URL(candidate)
    if (!/^([a-z0-9-]+\.)+[a-z]{2,}$/i.test(hostname)) return { ok: false, value: null }
    return { ok: true, value: candidate }
  } catch {
    return { ok: false, value: null }
  }
}

// Accepts local and international formats ("082 123 4567", "+27 82 123 4567").
// Returns digits (with optional leading +), or null if invalid.
function normalizePhone(raw: string): string | null {
  const stripped = raw.replace(/[\s().\-]/g, '')
  return /^\+?\d{9,15}$/.test(stripped) ? stripped : null
}

function readUtm(): Pick<LeadPayload, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer'> {
  if (typeof window === 'undefined') {
    return { utm_source: null, utm_medium: null, utm_campaign: null, referrer: null }
  }
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    referrer: document.referrer || null,
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [regions, setRegions] = useState<Set<SaRegion>>(new Set())

  function toggleRegion(r: SaRegion) {
    setRegions(prev => {
      const next = new Set(prev)
      if (r === 'national') {
        return next.has('national') ? new Set() : new Set(['national'])
      }
      next.delete('national')
      if (next.has(r)) next.delete(r)
      else next.add(r)
      return next
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (!ENDPOINT) {
      setStatus('error')
      setErrorMessage('Lead endpoint not configured. Set PUBLIC_LEAD_ENDPOINT_URL in .env.')
      return
    }

    if (regions.size === 0) {
      setStatus('error')
      setErrorMessage('Select at least one target region.')
      return
    }

    setStatus('sending')

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value.trim() ?? ''

    const website = normalizeWebsite(get('website'))
    if (!website.ok) {
      setStatus('error')
      setErrorMessage('Enter a valid website, like yourbrand.co.za')
      return
    }

    const phone = normalizePhone(get('phone'))
    if (!phone) {
      setStatus('error')
      setErrorMessage('Enter a valid phone number, like 082 123 4567 or +27 82 123 4567.')
      return
    }

    const payload: LeadPayload = {
      full_name: get('full_name'),
      work_email: get('work_email'),
      company: get('company'),
      phone,
      website: website.value,
      product_category: get('product_category') as ProductCategory,
      retail_footprint: get('retail_footprint') as RetailFootprint,
      target_regions: Array.from(regions),
      timeline: get('timeline') as Timeline,
      notes: get('notes') || null,
      hp_website_url: get('hp_website_url') || null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      ...readUtm(),
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server returned ${res.status}`)
      }
      setStatus('success')
      form.reset()
      setRegions(new Set())
    } catch (err) {
      console.error('Lead submission failed:', err)
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please email us directly.',
      )
    }
  }

  const inputClasses =
    'w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-yellow/50 focus:border-yellow/40 transition-all duration-300 text-sm'

  const selectClasses = `${inputClasses} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22white%22 stroke-opacity=%220.4%22 stroke-width=%221.5%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-no-repeat bg-[right_1rem_center] bg-[length:1rem] pr-10`

  const labelClasses =
    'block text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase mb-2'

  const sectionLabelClasses =
    'text-[10px] font-bold tracking-[0.3em] text-yellow/70 uppercase mb-4 pb-2 border-b border-white/[0.06]'

  return (
    <section id="contact" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-0 left-0 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-0 right-0 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Tell us about your brand. We'll come back with a rate tailored to your category.
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated rounded-2xl p-12 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-yellow/10 border border-yellow/25 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white mb-3">You're in the queue.</h3>
            <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
              We've captured your details and a member of our team will be in touch within one business day
              to discuss coverage and a commission rate for your category.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="card-elevated rounded-2xl p-8 sm:p-10 space-y-8"
          >
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="hp_website_url" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div>
              <div className={sectionLabelClasses}>Your Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="full_name" className={labelClasses}>Full name</label>
                  <input type="text" id="full_name" name="full_name" required maxLength={200} className={inputClasses} placeholder="Jane Smith" />
                </div>
                <div>
                  <label htmlFor="work_email" className={labelClasses}>Work email</label>
                  <input type="email" id="work_email" name="work_email" required className={inputClasses} placeholder="jane@yourbrand.com" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className={labelClasses}>Phone number</label>
                  <input type="tel" id="phone" name="phone" required autoComplete="tel" maxLength={20} className={inputClasses} placeholder="082 123 4567" />
                </div>
              </div>
            </div>

            <div>
              <div className={sectionLabelClasses}>Your Brand</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className={labelClasses}>Company name</label>
                  <input type="text" id="company" name="company" required maxLength={200} className={inputClasses} placeholder="Your brand" />
                </div>
                <div>
                  <label htmlFor="website" className={labelClasses}>Website <span className="text-white/25 normal-case tracking-normal">— optional</span></label>
                  <input type="text" id="website" name="website" inputMode="url" maxLength={300} className={inputClasses} placeholder="yourbrand.com" />
                </div>
              </div>
            </div>

            <div>
              <div className={sectionLabelClasses}>Fit &amp; Coverage</div>
              <div className="space-y-5">
                <div>
                  <label htmlFor="product_category" className={labelClasses}>Product category</label>
                  <select id="product_category" name="product_category" required defaultValue="" className={selectClasses}>
                    <option value="" disabled>Select a category…</option>
                    {PRODUCT_CATEGORIES.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="retail_footprint" className={labelClasses}>Current retail footprint</label>
                  <select id="retail_footprint" name="retail_footprint" required defaultValue="" className={selectClasses}>
                    <option value="" disabled>Where are your products sold today?</option>
                    {RETAIL_FOOTPRINTS.map(r => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Target regions</label>
                  <div className="flex flex-wrap gap-2">
                    {REGIONS.map(r => {
                      const active = regions.has(r.value)
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => toggleRegion(r.value)}
                          className={`px-3.5 py-2 text-xs rounded-full border transition-all duration-200 ${
                            active
                              ? 'bg-yellow/15 border-yellow/40 text-yellow'
                              : 'bg-white/[0.03] border-white/[0.08] text-white/60 hover:border-white/20 hover:text-white/80'
                          }`}
                        >
                          {r.label}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-[11px] text-white/30 mt-2">Pick "National" or specific provinces.</p>
                </div>

                <div>
                  <label htmlFor="timeline" className={labelClasses}>Timeline</label>
                  <select id="timeline" name="timeline" required defaultValue="" className={selectClasses}>
                    <option value="" disabled>When would you want to start?</option>
                    {TIMELINES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className={labelClasses}>
                Anything else? <span className="text-white/25 normal-case tracking-normal">— optional</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                maxLength={2000}
                className={`${inputClasses} resize-none`}
                placeholder="Product SKUs, past retail activations, specific stores you're targeting…"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-yellow text-base font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(249,215,2,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {status === 'sending' ? 'Sending…' : 'Request a Demo'}
            </button>

            {status === 'error' && errorMessage && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-red-400/80 text-xs">
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        )}
      </div>
    </section>
  )
}
