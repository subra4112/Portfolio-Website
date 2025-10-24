import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import WebsitePreloader from './components/WebsitePreloader'
import { useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? (
        <WebsitePreloader onComplete={handlePreloaderComplete} />
      ) : (
        <div className="min-h-screen bg-dark-900 text-white">
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}

export default App
