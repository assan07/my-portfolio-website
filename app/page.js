import { Hero } from '@/components/site/sections/Hero'
import { About } from '@/components/site/sections/About'
import { TechStack } from '@/components/site/sections/TechStack'
import { Experience } from '@/components/site/sections/Experience'
import { Education } from '@/components/site/sections/Education'
import { Certifications } from '@/components/site/sections/Certifications'
import { FeaturedProjects } from '@/components/site/sections/FeaturedProjects'
import { ContactCTA } from '@/components/site/sections/ContactCTA'
import {
  getProfile,
  getTechStack,
  getExperiences,
  getEducation,
  getCertifications,
  getProjects,
} from '@/lib/data'

async function App() {
  const [profile, techStack, experiences, education, certifications, featuredProjects] =
    await Promise.all([
      getProfile(),
      getTechStack(),
      getExperiences(),
      getEducation(),
      getCertifications(),
      getProjects({ featuredOnly: true }),
    ])

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
      <TechStack groups={techStack} />
      <Experience experiences={experiences} />
      <Education education={education} />
      <Certifications certifications={certifications} />
      <FeaturedProjects projects={featuredProjects.slice(0, 3)} />
      <ContactCTA profile={profile} />
    </>
  )
}

export default App
