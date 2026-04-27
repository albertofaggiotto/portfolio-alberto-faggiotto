'use client'
import { Category, Project } from '@/data/projects'
import ProjectCard from './ProjectCard'
import FadeIn from './FadeIn'
import { useLocale } from '@/lib/LocaleContext'
import { t } from '@/lib/i18n'

interface CategorySectionProps {
  category: Category
  projects: Project[]
}

export default function CategorySection({ category, projects }: CategorySectionProps) {
  const { locale } = useLocale()

  return (
    <div className="mb-16 md:mb-20 last:mb-0">
      <FadeIn>
        <div className="border-t border-portfolio-border pt-8 mb-1">
          <h2 className="font-display font-semibold text-4xl md:text-5xl text-portfolio-fg mb-2">
            {t(category.label, locale)}
          </h2>
          <p className="font-body text-xs text-portfolio-muted">
            {t(category.descriptor, locale)}
          </p>
        </div>
      </FadeIn>

      <div>
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={t(project.title, locale)}
            type={t(project.type, locale)}
            year={t(project.year, locale)}
            cardDescription={t(project.cardDescription, locale)}
            hasCaseStudy={project.hasCaseStudy}
            logo={project.logo}
          />
        ))}
      </div>
    </div>
  )
}
