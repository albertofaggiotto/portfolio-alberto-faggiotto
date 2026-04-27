import { notFound } from 'next/navigation'
import { getProjectBySlug, getCaseStudySlugs } from '@/data/projects'
import CaseStudyView from '@/components/CaseStudyView'

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  // Metadata is rendered server-side and can't react to the client locale,
  // so we use the default (English) text. This only affects the document
  // <title> and <meta description>; visible page content adapts to locale
  // on the client.
  return {
    title: `${project.title.en} — Alberto Faggiotto`,
    description: project.cardDescription.en,
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project || !project.hasCaseStudy || !project.caseStudy) {
    notFound()
  }

  return <CaseStudyView slug={slug} />
}
