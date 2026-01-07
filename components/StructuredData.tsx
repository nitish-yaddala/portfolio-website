import { resumeData } from '@/data/resume'
import { siteConfig } from '@/config/site'
import { caseStudies } from '@/data/caseStudies'

export default function StructuredData() {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": resumeData.personal.name,
    "jobTitle": resumeData.personal.title.split('|')[0].trim(),
    "email": resumeData.personal.email,
    "telephone": resumeData.personal.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": resumeData.personal.location.split(',')[0],
      "addressRegion": resumeData.personal.location.split(',')[1]?.trim() || "",
      "addressCountry": "US"
    },
    "url": siteConfig.url,
    "sameAs": [
      resumeData.personal.linkedin,
      resumeData.personal.github
    ],
    "alumniOf": resumeData.education.map(edu => ({
      "@type": "EducationalOrganization",
      "name": edu.institution,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": edu.location.split(',')[0],
        "addressRegion": edu.location.split(',')[1]?.trim() || ""
      }
    })),
    "hasCredential": resumeData.certifications.map(cert => ({
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": cert.name,
      "recognizedBy": {
        "@type": "Organization",
        "name": cert.issuer
      }
    })),
    "knowsAbout": resumeData.skills.flatMap(skill => skill.items),
    "description": resumeData.personal.summary.join(' ')
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${resumeData.personal.name} - Portfolio`,
    "url": siteConfig.url,
    "author": {
      "@type": "Person",
      "name": resumeData.personal.name
    },
    "description": resumeData.personal.summary.join(' ')
  }

  const caseStudyData = caseStudies.map(study => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": study.title,
    "author": {
      "@type": "Person",
      "name": study.author
    },
    "datePublished": study.reportDate,
    "description": study.summary,
    "articleSection": study.category
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {caseStudyData.map((data, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}
