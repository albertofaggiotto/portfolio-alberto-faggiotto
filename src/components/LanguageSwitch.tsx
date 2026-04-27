'use client'

import { useLocale } from '@/lib/LocaleContext'
import type { Locale } from '@/lib/i18n'

interface LanguageSwitchProps {
  /** Optional extra classes for layout adjustments at the call site. */
  className?: string
}

/**
 * Minimal text-based language selector: `EN | IT`.
 * Active locale is rendered in the foreground colour, inactive in muted.
 */
export default function LanguageSwitch({ className = '' }: LanguageSwitchProps) {
  const { locale, setLocale } = useLocale()

  const renderOption = (value: Locale, label: string) => {
    const active = locale === value
    return (
      <button
        type="button"
        onClick={() => setLocale(value)}
        aria-pressed={active}
        aria-label={
          value === 'en' ? 'Switch language to English' : 'Cambia lingua in italiano'
        }
        className={`font-body text-[10px] tracking-widest uppercase transition-colors duration-200 ${
          active
            ? 'text-portfolio-fg'
            : 'text-portfolio-muted hover:text-portfolio-fg'
        }`}
      >
        {label}
      </button>
    )
  }

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {renderOption('en', 'EN')}
      <span aria-hidden className="text-portfolio-muted text-[10px]">|</span>
      {renderOption('it', 'IT')}
    </div>
  )
}
