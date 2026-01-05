import { resumeData } from '@/data/resume'
import { siteConfig } from '@/config/site'

export default function StructuredData() {
  const structuredData = {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
