import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Work from '@/components/Work'
import Contact from '@/components/Contact'

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <footer className="py-8 border-t border-portfolio-border">
        <div className="max-w-screen-lg mx-auto px-6 md:px-10">
          <p className="font-body text-[10px] tracking-widest uppercase text-portfolio-muted">
            Alberto Faggiotto
          </p>
        </div>
      </footer>
    </>
  )
}
