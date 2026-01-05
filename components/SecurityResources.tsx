'use client'

import { ExternalLink, Shield, Book, Calculator, Wrench } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation'

const resources = [
  {
    category: 'Standards & Frameworks',
    icon: Shield,
    items: [
      { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
      { name: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/' },
      { name: 'CWE Top 25', url: 'https://cwe.mitre.org/top25/' },
      { name: 'NIST Cybersecurity Framework', url: 'https://www.nist.gov/cyberframework' },
      { name: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
    ]
  },
  {
    category: 'Tools & Calculators',
    icon: Calculator,
    items: [
      { name: 'CVSS Calculator', url: 'https://www.first.org/cvss/calculator/3.1' },
      { name: 'SSL Labs SSL Test', url: 'https://www.ssllabs.com/ssltest/' },
      { name: 'CVE Database', url: 'https://cve.mitre.org/' },
      { name: 'Exploit Database', url: 'https://www.exploit-db.com/' },
      { name: 'OWASP ZAP', url: 'https://www.zaproxy.org/' },
    ]
  },
  {
    category: 'Learning Resources',
    icon: Book,
    items: [
      { name: 'OWASP Web Security Testing Guide', url: 'https://owasp.org/www-project-web-security-testing-guide/' },
      { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' },
      { name: 'HackerOne Hacktivity', url: 'https://hackerone.com/hacktivity' },
      { name: 'PentesterLab', url: 'https://pentesterlab.com/' },
      { name: 'OWASP Cheat Sheets', url: 'https://cheatsheetseries.owasp.org/' },
    ]
  },
  {
    category: 'Tool Recommendations',
    icon: Wrench,
    items: [
      { name: 'Burp Suite', url: 'https://portswigger.net/burp' },
      { name: 'Nmap', url: 'https://nmap.org/' },
      { name: 'Metasploit', url: 'https://www.metasploit.com/' },
      { name: 'Ghidra', url: 'https://ghidra-sre.org/' },
      { name: 'Wireshark', url: 'https://www.wireshark.org/' },
    ]
  }
]

export default function SecurityResources() {
  return (
    <section id="security-resources" className="py-24 px-4 sm:px-6 lg:px-8 bg-terminal-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl font-mono mb-6">
            <span className="text-hacker-green">{'>'}</span>{' '}
            <span className="text-white">Security Resources</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-hacker-green/60 to-transparent mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Curated security resources, tools, and learning materials
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((category, idx) => {
            const Icon = category.icon
            return (
              <ScrollAnimation key={idx} delay={idx * 100}>
                <div className="terminal-window rounded-lg p-8 card-hover group h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-hacker-green/10 rounded-lg group-hover:bg-hacker-green/20 transition-colors">
                      <Icon className="text-hacker-green" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white font-mono group-hover:text-hacker-green transition-colors">
                      {category.category}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3 flex-1">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 bg-terminal-bg/50 rounded-lg hover:bg-hacker-green/10 border border-transparent hover:border-hacker-green/30 transition-all group/link"
                        >
                          <span className="text-gray-300 group-hover/link:text-hacker-green transition-colors font-mono text-sm">
                            {item.name}
                          </span>
                          <ExternalLink size={16} className="text-gray-500 group-hover/link:text-hacker-green transition-colors flex-shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}
