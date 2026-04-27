'use client'

/**
 * Client-side locale state.
 *
 * The site is statically generated. To keep things simple and maintainable
 * we store the active locale in client state and persist it to
 * localStorage, rather than introducing /en /it route segments.
 *
 * Server-rendered HTML is always emitted in the default locale (English).
 * On hydration, if a different locale was previously selected, the UI
 * re-renders into Italian without any layout change.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DEFAULT_LOCALE, isLocale, type Locale } from './i18n'

interface LocaleContextValue {
  locale: Locale
  setLocale: (next: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
})

const STORAGE_KEY = 'af.locale'

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Hydrate from localStorage after mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (isLocale(stored) && stored !== locale) {
        setLocaleState(stored)
      }
    } catch {
      // localStorage unavailable — fall back to default.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep <html lang> in sync with the active locale.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}
