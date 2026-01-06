import Hero from '@/components/Hero'
import ProfilePicture from '@/components/ProfilePicture'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Metrics from '@/components/Metrics'
import Workflow from '@/components/Workflow'
import Research from '@/components/Research'
import Achievements from '@/components/Achievements'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import BackToTop from '@/components/BackToTop'
import ShareButtons from '@/components/ShareButtons'
import SectionJumpMenu from '@/components/SectionJumpMenu'
import SecurityResources from '@/components/SecurityResources'
import PerformanceMetrics from '@/components/PerformanceMetrics'
import RecentActivity from '@/components/RecentActivity'
import SocialProof from '@/components/SocialProof'
import SecurityAdvisories from '@/components/SecurityAdvisories'
import ScrollProgress from '@/components/ScrollProgress'

export default function Home() {
  return (
    <>
      <Hero />
      <ProfilePicture />
      <About />
      <Metrics />
      <Experience />
      <Skills />
      <Projects />
      <Workflow />
      <Research />
      <Achievements />
      <SecurityAdvisories />
      <Education />
      <Certifications />
      <SecurityResources />
      <RecentActivity />
      <SocialProof />
      <Contact />
      <PerformanceMetrics />
      <BackToTop />
      <ShareButtons />
      <SectionJumpMenu />
      <ScrollProgress />
    </>
  )
}
