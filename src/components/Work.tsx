'use client'
import { categories, getProjectsByCategory } from '@/data/projects'
import CategorySection from './CategorySection'
import FadeIn from './FadeIn'
import { useLocale } from '@/lib/LocaleContext'
import { t, ui } from '@/lib/i18n'

export default function Work() {
  const { locale } = useLocale()

  return (
    <section id="work" className="pt-8 md:pt-10 pb-4 md:pb-6">
      <div className="max-w-screen-lg mx-auto px-6 md:px-10">
        <FadeIn>
          <span className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted block mb-16">
            {t(ui.workLabel, locale)}
          </span>
        </FadeIn>

        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            projects={getProjectsByCategory(category.id)}
          />
        ))}
      </div>
    </section>
  )
}
