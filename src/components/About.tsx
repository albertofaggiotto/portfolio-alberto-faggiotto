'use client'
import Image from 'next/image'
import FadeIn from './FadeIn'
import { useLocale } from '@/lib/LocaleContext'
import { L, t, ui } from '@/lib/i18n'

const ABOUT_PARAGRAPH = L(
  "Hi! I'm Alberto, I’m currently enrolled in a postgraduate Master’s in Digital Marketing and Communication at Bologna Business School, which I started after completing my Master’s degree in Semiotics at Alma Mater Studiorum - University of Bologna. My background combines digital communication, editorial writing and semiotics. I've worked across film journalism and festival coverage to brand analysis and content strategy, but the thing I find most compelling is understanding how cultural meanings can take shape in clearer, more accessible forms of communication, especially when they are meant to reach a specific audience. Over time I've developed practical skills across editorial planning and content production, copywriting in different registers and formats, social media management, video editing, and press office work.",
  'Ciao! Sono Alberto, attualmente frequento un master post-laurea in Digital Marketing and Communication alla Bologna Business School, iniziato dopo aver completato la mia laurea magistrale in Semiotica all’Alma Mater Studiorum - Università di Bologna. Il mio background unisce comunicazione digitale, scrittura editoriale e semiotica. Ho lavorato dal giornalismo cinematografico e dalla copertura di festival fino all’analisi di brand e alla content strategy, ma ciò che trovo più stimolante è capire come i significati culturali possano prendere forma in modi di comunicare più chiari e accessibili, soprattutto quando sono pensati per raggiungere un pubblico specifico. Nel tempo ho sviluppato competenze pratiche su pianificazione editoriale e produzione di contenuti, copywriting in registri e formati diversi, gestione dei social media, video editing e ufficio stampa.',
)

const QUOTE = L(
  'Try and be nice to people, avoid eating fat, read a good book every now and then, get some walking in, and try and live together in peace and harmony with people of all creeds and nations.',
  'Provate a essere gentili con il prossimo, evitate di mangiare grassi, leggete ogni tanto un buon libro, fate due passi, e provate a vivere in pace e armonia con persone di ogni credo e nazione.',
)

const ATTRIBUTION = L(
  '— Monty Python, The Meaning of Life',
  '— Monty Python, Il senso della vita',
)

export default function About() {
  const { locale } = useLocale()

  return (
    <section id="about" className="pt-12 md:pt-16 pb-10 md:pb-14">
      <div className="max-w-screen-lg mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <FadeIn>
            <div>
              <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-8">
                {t(ui.aboutLabel, locale)}
              </span>
              <blockquote className="border-l border-portfolio-border pl-5 md:pl-6 max-w-prose mb-8">
                <p className="font-display italic text-base md:text-lg text-portfolio-fg leading-relaxed mb-3">
                  ‘{t(QUOTE, locale)}’
                </p>
                <footer className="font-body text-xs text-portfolio-muted">
                  {t(ATTRIBUTION, locale)}
                </footer>
              </blockquote>
              <p className="font-body text-base md:text-lg text-portfolio-fg leading-relaxed max-w-prose">
                {t(ABOUT_PARAGRAPH, locale)}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="relative w-full max-w-xs md:max-w-sm mx-auto md:mx-0 aspect-[3/4]">
              <Image
                src="/headshot.jpg"
                alt="Alberto Faggiotto"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
