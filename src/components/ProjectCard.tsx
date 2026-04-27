'use client'
import Link from 'next/link'
import Image from 'next/image'
import FadeIn from './FadeIn'
import { Logo } from '@/data/projects'
import { useLocale } from '@/lib/LocaleContext'
import { t, ui } from '@/lib/i18n'

interface ProjectCardProps {
  slug: string
  title: string
  type: string
  year: string
  cardDescription: string
  hasCaseStudy: boolean
  logo?: Logo
}

export default function ProjectCard({
  slug,
  title,
  type,
  year,
  cardDescription,
  hasCaseStudy,
  logo,
}: ProjectCardProps) {
  const { locale } = useLocale()

  return (
    <FadeIn>
      <article className="py-8 md:py-10 border-b border-portfolio-border">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-6 md:gap-14 items-start">
          {/* Text column */}
          <div className="min-w-0">
            <div className="flex items-baseline justify-between gap-6 mb-3 md:justify-start md:gap-8">
              <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted">
                {type}
              </span>
              <span className="font-body text-[10px] text-portfolio-muted shrink-0">{year}</span>
            </div>

            <h3 className="font-display font-medium text-2xl md:text-[1.75rem] text-portfolio-fg leading-tight mb-4 max-w-2xl">
              {title}
            </h3>

            <p className="font-body text-sm text-portfolio-muted leading-relaxed max-w-xl mb-6">
              {cardDescription}
            </p>

            {hasCaseStudy && (
              <Link
                href={`/work/${slug}`}
                className="inline-block font-body text-[10px] tracking-widest uppercase text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200 pb-0.5"
              >
                {t(ui.readMore, locale)}
              </Link>
            )}
          </div>

          {/* Logo column */}
          {logo && (() => {
            const centered = logo.align === 'center'
            const scale = logo.scale ?? 1
            const offsetY = logo.offsetY ?? 0
            const offsetX = logo.offsetX ?? 0
            const origin = centered ? 'origin-center' : 'origin-left md:origin-right'
            const objectPos = centered
              ? 'object-center'
              : 'object-left md:object-right'

            const parts: string[] = []
            if (offsetX || offsetY) {
              parts.push(`translate(${offsetX}rem, ${offsetY}rem)`)
            }
            if (scale !== 1) parts.push(`scale(${scale})`)
            const transform = parts.length ? parts.join(' ') : undefined

            return (
              <div className="order-first md:order-none md:self-center md:justify-self-end shrink-0">
                <div
                  className={`relative h-14 md:h-20 w-36 md:w-56 opacity-90 ${origin}`}
                  style={transform ? { transform } : undefined}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className={`object-contain ${objectPos}`}
                    sizes="(max-width: 768px) 9rem, 14rem"
                  />
                </div>
              </div>
            )
          })()}
        </div>
      </article>
    </FadeIn>
  )
}
