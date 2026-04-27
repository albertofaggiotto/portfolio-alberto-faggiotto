'use client'
import FadeIn from './FadeIn'
import { useLocale } from '@/lib/LocaleContext'
import { t, ui } from '@/lib/i18n'

const EMAIL = 'faggiotto.alberto98@gmail.com'

const PROFILE_LINKS: { label: string; href: string }[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alberto-faggiotto-b6b78a267/' },
  { label: 'Letterboxd', href: 'https://letterboxd.com/albertofaggiott/' },
  { label: 'Goodreads', href: 'https://www.goodreads.com/user/show/154146508-nonno-albert' },
  { label: 'Rate Your Music', href: 'https://rateyourmusic.com/~Alberto_Faggiotto' },
]

export default function Contact() {
  const { locale } = useLocale()

  return (
    <section id="contact" className="pt-6 md:pt-8 pb-32 md:pb-40">
      <div className="max-w-screen-lg mx-auto px-6 md:px-10">
        <FadeIn>
          <div className="border-t border-portfolio-border pt-8">
            <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-10">
              {t(ui.contactLabel, locale)}
            </span>

            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-6">
              <a
                href={`mailto:${EMAIL}`}
                className="font-body text-base md:text-lg text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200 pb-0.5 w-fit"
              >
                {EMAIL}
              </a>
              {PROFILE_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs md:text-sm tracking-widest uppercase text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200 pb-0.5 w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
