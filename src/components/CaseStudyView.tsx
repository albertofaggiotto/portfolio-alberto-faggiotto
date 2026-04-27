'use client'

import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import {
  getProjectBySlug,
  TOOL_LOGOS,
  type MediaItem,
} from '@/data/projects'
import { useLocale } from '@/lib/LocaleContext'
import { t, ui } from '@/lib/i18n'

interface CaseStudyViewProps {
  slug: string
}

/**
 * Client-side case study renderer.
 * Reads the active locale from context and picks the right side of every
 * Localized field. The server `page.tsx` shell handles
 * `generateStaticParams` and `generateMetadata`; this component owns the
 * actual content rendering for both languages.
 */
export default function CaseStudyView({ slug }: CaseStudyViewProps) {
  const { locale } = useLocale()
  const project = getProjectBySlug(slug)

  if (!project || !project.hasCaseStudy || !project.caseStudy) {
    // The page-level `notFound()` runs on the server when the slug is bad,
    // so this branch only protects against a desync. Render nothing.
    return null
  }

  const { caseStudy } = project

  const renderMedia = (item: MediaItem) =>
    item.type === 'image' ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.src}
        alt={t(item.alt, locale)}
        className="block w-full h-auto"
        loading="lazy"
      />
    ) : (
      <video
        src={item.src}
        poster={item.poster}
        controls
        preload="metadata"
        playsInline
        className="block w-full h-auto bg-black"
      />
    )

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-portfolio-bg">
        <div className="pt-28 md:pt-36 pb-24 px-6 md:px-10 max-w-screen-lg mx-auto">

          {/* Back */}
          <Link
            href="/#work"
            className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted hover:text-portfolio-fg transition-colors duration-200 inline-block mb-12 md:mb-16"
          >
            {t(ui.backToWorkShort, locale)}
          </Link>

          {/* Meta */}
          <p className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted mb-5">
            {t(project.categoryLabel, locale)}&ensp;·&ensp;{t(project.type, locale)}&ensp;·&ensp;{t(project.year, locale)}
          </p>

          {/* Title */}
          <h1 className="font-display font-light text-4xl md:text-5xl lg:text-6xl text-portfolio-fg leading-tight mb-14 md:mb-16 max-w-3xl">
            {t(project.title, locale)}
          </h1>

          <div className="border-t border-portfolio-border" />

          {/* Body: two-column (text + media rail) when media is present, single column otherwise */}
          <div
            className={
              caseStudy.media && caseStudy.media.length > 0
                ? caseStudy.mediaRail === 'extra-wide'
                  ? 'mt-12 md:mt-16 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:gap-x-16 lg:gap-x-20'
                  : caseStudy.mediaRail === 'wide'
                  ? 'mt-12 md:mt-16 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:gap-x-16 lg:gap-x-20'
                  : 'mt-12 md:mt-16 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] md:gap-x-16 lg:gap-x-20'
                : 'mt-12 md:mt-16'
            }
          >
            <div className="max-w-2xl space-y-12 md:space-y-14">

              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-4">
                  {t(ui.context, locale)}
                </span>
                <p className="font-body text-base md:text-lg text-portfolio-fg leading-relaxed whitespace-pre-line">
                  {t(caseStudy.context, locale)}
                </p>
              </div>

              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-4">
                  {t(ui.whatIDid, locale)}
                </span>
                <p className="font-body text-base md:text-lg text-portfolio-fg leading-relaxed whitespace-pre-line">
                  {t(caseStudy.whatIDid, locale)}
                </p>
              </div>

              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-4">
                  {t(ui.approach, locale)}
                </span>
                <p className="font-body text-base md:text-lg text-portfolio-fg leading-relaxed whitespace-pre-line">
                  {t(caseStudy.approach, locale)}
                </p>
              </div>

              <div>
                <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-4">
                  {t(ui.skills, locale)}
                </span>
                <ul className="font-body text-base md:text-lg text-portfolio-fg leading-relaxed space-y-1.5">
                  {t(caseStudy.skills, locale).map((skill) => (
                    <li key={skill} className="flex gap-3">
                      <span
                        aria-hidden
                        className="text-portfolio-muted shrink-0 select-none"
                      >
                        —
                      </span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {caseStudy.tools && caseStudy.tools.length > 0 && (
                <div>
                  <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-4">
                    {t(ui.tools, locale)}
                  </span>
                  <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
                    {caseStudy.tools.map((tool) => {
                      const logo = TOOL_LOGOS[tool]
                      const scale = logo.scale ?? 1
                      return (
                        <li
                          key={tool}
                          className="relative h-10 md:h-12 w-28 md:w-36 opacity-80"
                          title={tool}
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            fill
                            className="object-contain object-left origin-left"
                            style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}
                            sizes="(max-width: 768px) 7rem, 9rem"
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}

              {caseStudy.artifact?.url && (
                <div>
                  <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-4">
                    {t(ui.document, locale)}
                  </span>
                  <a
                    href={caseStudy.artifact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[10px] tracking-widest uppercase text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200 pb-0.5"
                  >
                    {t(caseStudy.artifact.label, locale)} →
                  </a>
                </div>
              )}
            </div>

            {/* Right-side media rail (stacks below text on mobile) */}
            {caseStudy.media && caseStudy.media.length > 0 && (() => {
              type Plan =
                | { kind: 'single'; item: NonNullable<typeof caseStudy.media>[number]; key: number }
                | {
                    kind: 'pair'
                    items: [
                      NonNullable<typeof caseStudy.media>[number],
                      NonNullable<typeof caseStudy.media>[number],
                    ]
                    key: number
                  }
              const items = caseStudy.media
              const plan: Plan[] = []
              for (let i = 0; i < items.length; i++) {
                const a = items[i]
                const b = items[i + 1]
                if (a.orientation === 'portrait' && b?.orientation === 'portrait') {
                  plan.push({ kind: 'pair', items: [a, b], key: i })
                  i++
                } else {
                  plan.push({ kind: 'single', item: a, key: i })
                }
              }

              return (
                <aside
                  aria-label="Project media"
                  className="mt-16 md:mt-0 space-y-12 md:space-y-14"
                >
                  {plan.map((entry) => {
                    if (entry.kind === 'pair') {
                      const sharedCaption = entry.items[0].pairCaption
                      if (sharedCaption) {
                        const pairEmphasis = entry.items[0].emphasis
                        const pairEmphasisClass =
                          pairEmphasis === 'lg'
                            ? 'md:w-[calc(100%+3rem)] md:-ml-12 lg:w-[calc(100%+4rem)] lg:-ml-16'
                            : pairEmphasis === 'md'
                            ? 'md:w-[calc(100%+2.5rem)] md:-ml-10 lg:w-[calc(100%+3rem)] lg:-ml-12'
                            : ''
                        const stacked = entry.items[0].pairStacked
                        const pairLink = entry.items[0].link
                        const pairLinkLabel = entry.items[0].linkLabel
                        const pairLinkEl = pairLink ? (
                          <a
                            href={pairLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200"
                          >
                            {pairLinkLabel ? t(pairLinkLabel, locale) : 'Link'}
                          </a>
                        ) : null
                        if (stacked) {
                          const linkBelowCaption = entry.items[0].pairLinkAfterCaption
                          return (
                            <figure key={entry.key} className={`w-full ${pairEmphasisClass}`}>
                              <div className="flex flex-col gap-y-5 md:gap-y-6">
                                <div className="w-full">{renderMedia(entry.items[0])}</div>
                                {pairLinkEl && !linkBelowCaption && (
                                  <div className="font-body text-xs text-portfolio-muted leading-snug -mt-2 md:-mt-3">
                                    {pairLinkEl}
                                  </div>
                                )}
                                <div className="w-full">{renderMedia(entry.items[1])}</div>
                              </div>
                              <figcaption className="mt-3 font-body text-xs text-portfolio-muted leading-snug">
                                {t(sharedCaption, locale)}
                                {pairLinkEl && linkBelowCaption && (
                                  <>
                                    <br />
                                    {pairLinkEl}
                                  </>
                                )}
                              </figcaption>
                            </figure>
                          )
                        }
                        return (
                          <figure key={entry.key} className={`w-full ${pairEmphasisClass}`}>
                            <div className="grid grid-cols-2 gap-x-5 md:gap-x-6 items-end">
                              {entry.items.map((it, j) => (
                                <div key={j} className="w-full">
                                  {renderMedia(it)}
                                </div>
                              ))}
                            </div>
                            <figcaption className="mt-3 font-body text-xs text-portfolio-muted leading-snug">
                              {t(sharedCaption, locale)}
                              {pairLinkEl && (
                                <>
                                  <br />
                                  {pairLinkEl}
                                </>
                              )}
                            </figcaption>
                          </figure>
                        )
                      }
                      const rowEmphasis = entry.items[0].emphasis
                      const rowEmphasisClass =
                        rowEmphasis === 'lg'
                          ? 'md:w-[calc(100%+3rem)] md:-ml-12 lg:w-[calc(100%+4rem)] lg:-ml-16'
                          : rowEmphasis === 'md'
                          ? 'md:w-[calc(100%+2.5rem)] md:-ml-10 lg:w-[calc(100%+3rem)] lg:-ml-12'
                          : ''
                      return (
                        <div
                          key={entry.key}
                          className={`grid grid-cols-2 gap-x-5 md:gap-x-6 ${rowEmphasisClass}`}
                        >
                          {entry.items.map((it, j) => (
                            <figure key={j} className="w-full">
                              {renderMedia(it)}
                              <figcaption className="mt-3 font-body text-xs text-portfolio-muted leading-snug">
                                {t(it.caption, locale)}
                                {it.link && (
                                  <>
                                    <br />
                                    <a
                                      href={it.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200"
                                    >
                                      {it.linkLabel ? t(it.linkLabel, locale) : 'Link'}
                                    </a>
                                  </>
                                )}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      )
                    }
                    const isPortrait = entry.item.orientation === 'portrait'
                    const emphasis = entry.item.emphasis
                    const fixedWidth = entry.item.fixedWidth
                    const emphasisClass = fixedWidth
                      ? ''
                      : emphasis === 'lg'
                        ? 'md:w-[calc(100%+3rem)] md:-ml-12 lg:w-[calc(100%+4rem)] lg:-ml-16'
                        : emphasis === 'md'
                        ? 'md:w-[calc(100%+2.5rem)] md:-ml-10 lg:w-[calc(100%+3rem)] lg:-ml-12'
                        : ''
                    const mediaWrapper = isPortrait
                      ? 'max-w-[13rem]'
                      : `w-full ${emphasisClass}`
                    const figureStyle = fixedWidth ? { maxWidth: fixedWidth } : undefined
                    return (
                      <figure key={entry.key} className={mediaWrapper} style={figureStyle}>
                        {renderMedia(entry.item)}
                        <figcaption className="mt-3 font-body text-xs text-portfolio-muted leading-snug">
                          {t(entry.item.caption, locale)}
                          {entry.item.link && (
                            <>
                              <br />
                              <a
                                href={entry.item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-portfolio-fg border-b border-portfolio-border hover:border-portfolio-fg transition-colors duration-200"
                              >
                                {entry.item.linkLabel ? t(entry.item.linkLabel, locale) : 'Link'}
                              </a>
                            </>
                          )}
                        </figcaption>
                      </figure>
                    )
                  })}
                </aside>
              )
            })()}

          </div>

          {/* Footer nav */}
          <div className="mt-20 md:mt-24 pt-8 border-t border-portfolio-border">
            <Link
              href="/#work"
              className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted hover:text-portfolio-fg transition-colors duration-200"
            >
              {t(ui.backToWork, locale)}
            </Link>
          </div>

        </div>
      </main>
    </>
  )
}
