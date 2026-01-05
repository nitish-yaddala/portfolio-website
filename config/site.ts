// Site configuration
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nitish-yaddala.github.io/portfolio-website',
  name: 'Nitish Yaddala Portfolio',
  title: 'Muni Nitish Kumar Yaddala | Security Engineer',
  description: 'Security Engineer specializing in Application Security, Penetration Testing, and Cloud Security. Expert in vulnerability assessment, threat modeling, and security architecture validation.',
  ogImage: process.env.NODE_ENV === 'production' ? '/portfolio-website/og-image.png' : '/og-image.png',
}
