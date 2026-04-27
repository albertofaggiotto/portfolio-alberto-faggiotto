/**
 * Bilingual (EN / IT) primitives for the site.
 *
 * Every visible string in `projects.ts` and the components is wrapped in
 * a `Localized<T>` value. Components read the active locale from
 * `LocaleContext` and pick the right side via `t()` (or `pick()`).
 *
 * UI microcopy that is not project-specific (nav labels, section headings,
 * "Read more", scroll hint, etc.) lives in `ui` so translations stay in one
 * place.
 */

export type Locale = 'en' | 'it'

export const LOCALES: readonly Locale[] = ['en', 'it'] as const
export const DEFAULT_LOCALE: Locale = 'en'

export type Localized<T> = { en: T; it: T }

/** Construct a Localized value. Shorthand for `{ en, it }`. */
export function L<T>(en: T, it: T): Localized<T> {
  return { en, it }
}

/** Pick the active language from a Localized value. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale]
}

/** Alias for `t` — reads better when used inline with object access. */
export const pick = t

/** Type guard helper used by the LocaleContext. */
export function isLocale(value: unknown): value is Locale {
  return value === 'en' || value === 'it'
}

/**
 * UI microcopy shared across pages.
 * Keep the keys descriptive so call sites read self-explanatory.
 */
export const ui = {
  // Top-level nav labels (anchor link text)
  navAbout: L('About', 'Chi sono'),
  navWork: L('Work', 'Lavori'),
  navContact: L('Contact', 'Contatti'),

  // Hero / scroll hint
  scroll: L('Scroll', 'Scorri'),

  // Section headings on the homepage
  aboutLabel: L('About', 'Chi sono'),
  workLabel: L('Work', 'Lavori'),
  contactLabel: L('Contact', 'Contatti'),

  // Project card
  readMore: L('Read more →', 'Leggi di più →'),

  // Detail page navigation
  backToWorkShort: L('← Work', '← Lavori'),
  backToWork: L('← Back to Work', '← Torna ai lavori'),

  // Detail page section labels
  context: L('Context', 'Contesto'),
  whatIDid: L('What I Did', 'Cosa ho fatto'),
  approach: L('Approach', 'Approccio'),
  skills: L('Skills', 'Competenze'),
  tools: L('Tools', 'Strumenti'),
  document: L('Document', 'Documento'),

  // Language switch (the labels themselves are language-neutral, but
  // we still expose them via this dictionary for consistency)
  langEn: L('EN', 'EN'),
  langIt: L('IT', 'IT'),
} as const
