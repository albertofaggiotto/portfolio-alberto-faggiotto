'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import LanguageSwitch from './LanguageSwitch'
import { useLocale } from '@/lib/LocaleContext'
import { ui, t } from '@/lib/i18n'

const NAV_ITEMS = [
  { id: 'about', label: ui.navAbout },
  { id: 'work', label: ui.navWork },
  { id: 'contact', label: ui.navContact },
] as const

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { locale } = useLocale()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-portfolio-bg/95 backdrop-blur-sm border-b border-portfolio-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-screen-lg mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          onClick={close}
          className="font-display text-sm tracking-wide text-portfolio-fg hover:opacity-50 transition-opacity"
        >
          Alberto Faggiotto
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted hover:text-portfolio-fg transition-colors"
              >
                {t(item.label, locale)}
              </a>
            </li>
          ))}
        </ul>

        {/* Right cluster: language switch + (mobile) hamburger */}
        <div className="flex items-center gap-5 md:gap-6">
          <LanguageSwitch />

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-5 bg-portfolio-fg origin-center transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-portfolio-fg transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-px w-5 bg-portfolio-fg origin-center transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
        } bg-portfolio-bg border-b border-portfolio-border`}
      >
        <ul className="flex flex-col px-6 py-8 gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={close}
                className="font-body text-[10px] tracking-widest uppercase text-portfolio-fg"
              >
                {t(item.label, locale)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
