'use client'
import { useEffect, useState } from 'react'
import { useLocale } from '@/lib/LocaleContext'
import { L, t, ui } from '@/lib/i18n'

// The hero subtitle is a list of professional descriptors. The English form
// reads naturally in Italian as well; keeping it identical avoids a clumsy
// localised version.
const HERO_LINE = L(
  'Content Strategist | Copywriter | Creative Strategy | Brand Storytelling | Editorial Planning',
  'Content Strategist | Copywriter | Creative Strategy | Brand Storytelling | Editorial Planning',
)

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const { locale } = useLocale()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center">
      <div className="max-w-screen-lg mx-auto px-6 md:px-10 w-full">
        <div
          className={`transition-all duration-1000 ease-out ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="font-display font-light leading-none tracking-tight text-portfolio-fg mb-6 md:mb-8 text-[13vw] md:text-[8.5vw] lg:text-[7.5vw]">
            Alberto Faggiotto
          </h1>
          <p className="font-display italic text-lg md:text-xl text-portfolio-muted max-w-lg leading-relaxed">
            {t(HERO_LINE, locale)}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-6 md:left-10 transition-all duration-700 delay-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-start gap-2">
          <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted">
            {t(ui.scroll, locale)}
          </span>
          <div className="h-px w-8 bg-portfolio-border" />
        </div>
      </div>
    </section>
  )
}
