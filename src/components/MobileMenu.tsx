import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-navy"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? (
            <path d="M6 6l12 12M6 18L18 6" />
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100"
          >
            <div className="flex flex-col p-4 gap-3">
              <a href="#merchandising" onClick={() => setOpen(false)} className="text-sm font-medium text-navy/80 hover:text-navy py-2">
                Merchandising
              </a>
              <a href="#sales" onClick={() => setOpen(false)} className="text-sm font-medium text-navy/80 hover:text-navy py-2">
                Sales
              </a>
              <a href="#platform" onClick={() => setOpen(false)} className="text-sm font-medium text-navy/80 hover:text-navy py-2">
                Platform
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-navy rounded-lg hover:bg-navy/90 transition-colors mt-2"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
