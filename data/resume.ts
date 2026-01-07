export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  tools: string[];
  bullets: string[];
}

export interface Project {
  name: string;
  period: string;
  tech: string[];
  description: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  status?: string;
  completionDate?: string;
  verificationLink?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa?: string;
  note?: string;
  coursework?: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
  description?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  linkedin?: string;
  avatar?: string;
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    summary: string[];
  };
  testimonials?: Testimonial[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
  skills: SkillCategory[];
  achievements: {
    publications: string[];
    vulnerabilities: Array<string | {
      title: string;
      description: string;
      impact: string[];
    }>;
    competitions: string[];
  };
  metrics: {
    servicesAssessed: number;
    vulnerabilitiesFound: number;
    highSeverity: number;
    webAppsTested: number;
    mobileAppsTested: number;
    criticalVulns: number;
  };
}

export const resumeData: ResumeData = {
  personal: {
    name: "Muni Nitish Kumar Yaddala",
    title: "Security Engineer | Offensive Application Security | Penetration Testing | Cloud Security",
    email: "nitish.yaddala@gmail.com",
    phone: "+1-404-451-4193",
    location: "Seattle, WA",
    linkedin: "https://linkedin.com/in/nitish-yaddala",
    github: "https://github.com/nitish-yaddala",
    summary: [
      "Security Engineer specializing in offensive application and cloud security assessments. Identifies and validates exploitable vulnerabilities across complex, distributed architectures.",
      "Experienced in web, API, and identity security testing with focus on authorization failures, trust-boundary violations, and architectural design flaws.",
      "Combines manual exploitation, protocol analysis, and custom automation to validate real-world attack impact beyond automated scanning capabilities.",
      "Works with engineering teams to translate security findings into prioritized, actionable remediation roadmaps."
    ]
  },
  experience: [
    {
      company: "Bureau Veritas | Amazon AWS Security Assessments",
      role: "Security Engineer / Security Consultant",
      location: "Seattle, WA",
      period: "Mar 2024 – Present",
      tools: ["Burp Suite Pro", "Nmap", "ScoutSuite", "Semgrep", "testssl.sh", "OpenSSL", "Python", "AWS CLI"],
      bullets: [
        "Led offensive security assessments across 35+ AWS services, identifying 100+ vulnerabilities (20+ high severity) affecting web interfaces, APIs, service-to-service communication, and cloud control planes.",
        "Designed and executed authorization attack path analysis across IAM roles, policies, trust relationships, and cross-account access patterns. Discovered privilege escalation and lateral movement vectors.",
        "Conducted comprehensive API security assessments including schema abuse, mass assignment, BOLA, pagination/token manipulation, and undocumented endpoint enumeration.",
        "Validated threat models and security assumptions by simulating realistic attacker workflows. Identified failures in identity, trust boundary, and request provenance assumptions.",
        "Discovered logic flaws and state-manipulation vulnerabilities through multi-step workflow testing, async operation abuse, and edge-case analysis beyond standard test coverage.",
        "Architected and developed Python-based security tooling for endpoint discovery, request replay, and TLS posture analysis. Integrated Nmap, OpenSSL, and testssl.sh for scalable assessment workflows.",
        "Evaluated cryptographic implementations and transport security including TLS configuration, certificate trust chains, protocol downgrade resistance, and misuse of signing/encryption primitives.",
        "Authored technical security reports mapping findings to CWE, CVSS, OWASP Top 10, and attack scenarios. Enabled engineering teams to prioritize based on exploitability and business impact.",
        "Collaborated with service owners to validate remediation effectiveness, re-test fixed implementations, and ensure security controls maintain effectiveness under adversarial conditions."
      ]
    },
    {
      company: "HP Inc.",
      role: "Cybersecurity Engineer",
      location: "Bangalore, India",
      period: "Feb 2022 – Jul 2022",
      tools: ["Kali Linux", "Burp Suite", "Python", "OpenSSL", "Veracode SAST", "SSL Labs"],
      bullets: [
        "Conducted manual penetration testing of production web applications, identifying critical vulnerabilities including authentication bypasses, SQL injection, XSS, XXE, insecure deserialization, and race conditions.",
        "Analyzed session management and token handling architectures, discovering weaknesses in cookie scope, token lifecycle management, and replay protection mechanisms.",
        "Correlated automated SAST findings with manual exploitation techniques to identify true positives and exploitable attack paths, reducing false positive noise during vulnerability triage.",
        "Evaluated input validation and data flow paths across application layers to identify injection vectors and unsafe trust boundary transitions.",
        "Developed automated TLS and certificate validation tooling using Python and OpenSSL, standardizing security review processes and improving assessment consistency.",
        "Delivered technical security findings with proof-of-concept exploits to development teams, improving remediation accuracy and reducing time-to-fix."
      ]
    },
    {
      company: "Indian Space Research Organization (ISRO)",
      role: "Network Engineer Intern",
      location: "Sriharikota, India",
      period: "Nov 2019 – Dec 2019",
      tools: ["Wireshark", "Custom tool"],
      bullets: [
        "Reduced attack surface on the subnetwork by closing 30 unused ports on 20 devices, including FTP and TELNET.",
        "Monitored 30 network assets with the custom tool to maintain performance and prevent downtime.",
        "Enhanced network performance by analyzing traffic, using Wireshark, to identify choke points."
      ]
    }
  ],
  projects: [
    {
      name: "Kernel-Level System Call Telemetry & Behavioral Anomaly Detection Framework",
      period: "Oct 2023",
      tech: ["Python", "Linux Kernel"],
      description: [
        "Architected and implemented kernel-level instrumentation framework for system call monitoring and telemetry collection across production environments.",
        "Designed behavioral analysis pipeline using statistical modeling and machine learning techniques to detect anomalous process execution patterns. Evaluated detection accuracy, false positive rates, and operational overhead for production deployment considerations."
      ]
    },
    {
      name: "Automated Binary Exploitation & Vulnerability Research Framework",
      period: "Sep 2023",
      tech: ["Ghidra", "Python"],
      description: [
        "Developed comprehensive reverse engineering methodology and tooling to systematically identify memory corruption vulnerabilities, control flow hijacking vectors, and unsafe memory usage patterns in compiled binaries.",
        "Architected automated exploit generation and validation framework with multi-architecture support. Assessed exploit reliability, real-world impact, and mitigation effectiveness across different target environments."
      ]
    },
    {
      name: "Distributed Honeypot Infrastructure & Threat Intelligence Platform",
      period: "Aug 2023 - Dec 2023",
      tech: ["Python", "Snort"],
      description: [
        "Designed and implemented scalable, distributed honeypot infrastructure emulating production network services for comprehensive threat intelligence collection and attacker behavior analysis.",
        "Integrated real-time detection capabilities with centralized logging and analysis infrastructure. Conducted analysis of attacker TTPs, tooling, and attack patterns to inform defensive strategies and security control improvements."
      ]
    },
    {
      name: "Enterprise Web Application Security Assessment & Reconnaissance Tooling",
      period: "May 2023",
      tech: ["Python"],
      description: [
        "Architected and developed production-grade CLI tooling suite for web application reconnaissance, security posture assessment, and vulnerability discovery workflows.",
        "Implemented protocol-agnostic architecture supporting HTTP/HTTPS with extensible plugin system and configurable output formats. Designed for integration into enterprise security assessment workflows and CI/CD pipelines."
      ]
    },
    {
      name: "Web Application Security Assessment & Privilege Escalation Research",
      period: "Aug 2023",
      tech: ["Nmap", "Metasploit", "Kali Linux", "GTFObins", "LINPEAS"],
      description: [
        "Conducted comprehensive security assessment of web application stack including network reconnaissance, service enumeration, and vulnerability discovery across multiple attack vectors.",
        "Performed in-depth analysis of application security controls, identified privilege escalation vectors through SUID binary analysis, and developed methodology for maintaining persistent access in restricted environments. Research contributed to understanding of common misconfigurations in production deployments."
      ]
    },
    {
      name: "Anti-Virus Evasion Research & Polymorphic Encryption Analysis",
      period: "Jul 2021",
      tech: ["Windows", "PolyCrypt", "VirusTotal"],
      description: [
        "Conducted security research on anti-virus evasion techniques and polymorphic encryption methodologies. Evaluated effectiveness of signature-based detection systems against advanced evasion techniques.",
        "Developed research framework to analyze detection rates across multiple anti-virus engines. Research findings contributed to understanding of evasion technique effectiveness and informed defensive security improvements. Achieved 50% evasion rate improvement through polymorphic encryption implementation."
      ]
    },
    {
      name: "Network Resilience Testing & DoS Mitigation Analysis",
      period: "Sep 2021 - Oct 2021",
      tech: ["Wireshark", "Metasploit Framework", "Kali Linux"],
      description: [
        "Designed and executed network resilience testing methodology to evaluate system performance and availability under various denial-of-service attack scenarios.",
        "Conducted comprehensive analysis of TCP/UDP flooding attacks and SYN flood vulnerabilities. Measured performance degradation metrics (75% reduction under packet flooding, 50% under SYN flood) to inform capacity planning and DoS mitigation strategy development."
      ]
    },
    {
      name: "Enterprise Network Architecture & Security Design",
      period: "Aug 2020 – Sep 2020",
      tech: ["Packet Tracer"],
      description: [
        "Architected enterprise network design with optimized IP address allocation and efficient subnetting strategies to minimize address space wastage while maintaining scalability requirements.",
        "Designed and implemented network security architecture including access control policies, network segmentation, and traffic filtering rules. Developed security controls to restrict unauthorized access and enforce department-level network isolation policies."
      ]
    }
  ],
  certifications: [
    {
      name: "PNPT (Practical Network Penetration Tester)",
      issuer: "TCM Security"
    },
    {
      name: "OSCP (Offensive Security Certified Professional)",
      issuer: "Offsec",
      status: "In Progress"
    },
    {
      name: "CEH (Certified Ethical Hacker)",
      issuer: "EC-Council"
    },
    {
      name: "Certified Network Defender (CND)",
      issuer: "EC-Council"
    },
    {
      name: "Certified in Cybersecurity (CC)",
      issuer: "(ISC)²"
    }
  ],
  education: [
    {
      institution: "Georgia Institute of Technology",
      degree: "Master of Science in Cybersecurity - Information Security",
      location: "Atlanta, USA",
      period: "Aug 2022 – Dec 2023",
      gpa: "3.46/4.0",
      note: "Received $48,000 USD grant from Andhra Pradesh state government, India, for academic achievement and admission to a top 100 QS world ranking university.",
      coursework: [
        "Introduction to Information Security",
        "Network Security",
        "Secure Computer Systems",
        "Computer Networks",
        "Applied Cryptography",
        "Secure Internet Infrastructure"
      ]
    },
    {
      institution: "SRM Institute of Science and Technology",
      degree: "Bachelor of Technology in Computer Science Engineering",
      location: "Chennai, India",
      period: "Jul 2018 – May 2022",
      gpa: "3.8/4.0",
      coursework: [
        "Computer Networks",
        "Network Security",
        "Advanced Programming in Python"
      ]
    }
  ],
  skills: [
    {
      name: "Offensive Application Security & Penetration Testing",
      items: [
        "Web application penetration testing", "API penetration testing", "Black-box testing", "Gray-box testing", 
        "White-box code-assisted testing", "Authenticated testing", "Unauthenticated testing", "Adversary simulation",
        "Exploitability validation", "Manual vulnerability discovery", "Proof-of-concept exploitation", "Attack-path analysis",
        "Post-auth exploitation", "Chaining vulnerabilities", "Real-world attack simulation"
      ],
      description: "Offensive security testing methodologies across application layers."
    },
    {
      name: "Authentication & Authorization Testing",
      items: [
        "Authentication testing", "Authorization testing", "Broken authentication", "Broken authorization",
        "Access control bypass", "Privilege escalation", "Insecure direct object references (IDOR)",
        "Broken object level authorization (BOLA)", "Broken function level authorization (BFLA)",
        "Account takeover (ATO)", "Session fixation", "Session hijacking", "Token replay",
        "JWT attacks", "OAuth misconfigurations", "SSO abuse", "Insecure session management"
      ],
      description: "Identity and access control security testing."
    },
    {
      name: "Business Logic & Workflow Vulnerabilities",
      items: [
        "Business logic vulnerabilities", "Workflow abuse", "State machine bypass", "Multi-step attack flows",
        "Race conditions", "TOCTOU flaws", "Rate-limit bypass", "Replay attacks",
        "Pagination abuse", "Parameter pollution", "Request smuggling (application-layer)",
        "Mass assignment", "Over-posting", "Under-validated inputs"
      ],
      description: "Logic flaw identification and exploitation techniques."
    },
    {
      name: "Injection & Code Execution Vulnerabilities",
      items: [
        "SQL injection (error-based, union-based, blind)", "NoSQL injection", "Command injection",
        "OS injection", "XSS (stored, reflected, DOM-based)", "Template injection (SSTI)",
        "XML external entity (XXE)", "Insecure deserialization", "Type confusion", "Object injection"
      ],
      description: "Injection attack vector testing."
    },
    {
      name: "API & Protocol Security",
      items: [
        "REST API security", "API schema analysis", "OpenAPI / Swagger review", "Undocumented endpoint discovery",
        "API enumeration", "Versioning abuse", "Parameter tampering", "Object ownership validation",
        "Insecure pagination", "Cursor abuse", "Token-based authentication analysis", "API gateway security testing",
        "Protocol-level reasoning", "HTTP/HTTPS behavior analysis", "Header manipulation", "Cookie security flags",
        "Caching behavior analysis", "Request/response normalization issues", "Content-type confusion", "MIME-type abuse"
      ],
      description: "API and protocol security testing."
    },
    {
      name: "Cloud & Identity Security (AWS-Focused)",
      items: [
        "AWS security assessments", "Cloud penetration testing", "Cloud workload security",
        "Shared responsibility model validation", "Service-to-service trust analysis",
        "Identity and access management (IAM) security", "IAM policy analysis", "Permission boundary validation",
        "Trust relationship abuse", "Cross-account access testing", "Role assumption abuse",
        "AWS service exposure analysis", "Network boundary validation", "VPC-level attack surface mapping",
        "Public vs private endpoint analysis", "Misconfiguration discovery", "Cloud service authorization flaws",
        "Control plane vs data plane testing", "Cloud threat modeling", "Abuse-case driven testing",
        "Attacker perspective validation of cloud security controls"
      ],
      description: "AWS and cloud security testing."
    },
    {
      name: "Cryptography & Transport Security",
      items: [
        "TLS/SSL security assessment", "HTTPS configuration analysis", "Certificate chain validation",
        "Trust store analysis", "Protocol downgrade resistance", "Weak cipher detection",
        "Key size validation", "Certificate expiry and mis-issuance detection",
        "Cryptographic misuse analysis", "Improper encryption usage", "Insecure hashing",
        "Weak randomness", "Improper signing/verification logic", "Token signing flaws", "HMAC misuse"
      ],
      description: "Cryptographic and transport layer security testing."
    },
    {
      name: "Secure Engineering & Secure SDLC",
      items: [
        "Threat modeling", "Abuse-case development", "Architecture security review",
        "Trust boundary mapping", "Security control validation", "Design-level security assessment",
        "Pre-release security testing", "Security requirements verification",
        "Vulnerability triage", "Exploitability analysis", "Risk-based prioritization",
        "CVSS scoring", "CWE mapping", "OWASP Top 10 mapping", "Remediation guidance",
        "Fix verification", "Regression testing", "Secure-by-design feedback",
        "Developer collaboration", "Engineering-facing reporting", "Security review documentation",
        "Security sign-off processes"
      ],
      description: "Secure development lifecycle and engineering practices."
    },
    {
      name: "Tooling & Techniques",
      items: [
        "Burp Suite Pro (Proxy, Repeater, Intruder, Extensions)", "Nmap", "ScoutSuite", "Semgrep",
        "testssl.sh", "OpenSSL", "Intercepting proxies", "Fuzzing techniques", "Custom fuzzers",
        "Request replay tooling", "Custom Python security tooling", "Automation for endpoint discovery",
        "Automation for security testing", "Scripting for repetitive test cases", "Log analysis",
        "Data correlation", "Linux-based security testing (Kali Linux, Ubuntu, Parrot OS)",
        "Command-line tooling", "Networking fundamentals for security testing"
      ],
      description: "Security tooling and automation."
    },
    {
      name: "Security Standards & Frameworks",
      items: [
        "OWASP Top 10 (Web)", "OWASP API Security Top 10", "CWE", "CVSS v3.x",
        "MITRE ATT&CK", "Secure coding principles", "Least privilege", "Defense in depth",
        "Zero trust (conceptual alignment)"
      ],
      description: "Industry-standard security frameworks and methodologies."
    },
    {
      name: "Programming & Scripting Languages",
      items: [
        "Python (security automation, tooling, scripting)", "JavaScript (web application behavior analysis)",
        "Bash (automation and tooling)", "C, C++ (binary analysis exposure)",
        "Scripting for security testing workflows"
      ],
      description: "Programming languages for security tooling and automation."
    }
  ],
  achievements: {
    publications: [
      "Published research on \"Comprehensive Survey of Web Security Threats in 2024\" in the International Journal of Scientific Research in Engineering and Management (IJSREM) (SJIF Rating: 8.448). Analyzed quantum-resistant encryption methodologies, AI-enhanced threat vectors, and emerging cybersecurity risk patterns in modern web architectures."
    ],
    vulnerabilities: [
      {
        title: "IDOR Vulnerability in State Government Scholarship Portal",
        description: "Identified and responsibly disclosed an Insecure Direct Object Reference (IDOR) vulnerability in a state government scholarship application portal during security assessment.",
        impact: [
          "Identified unauthorized access vector exposing sensitive PII including passport documents, visa information, financial account details, residential addresses, and contact information",
          "Affected production user portal handling scholarship application management, document upload workflows, and application status tracking",
          "Demonstrated horizontal privilege escalation through API endpoint parameter manipulation, bypassing authorization controls"
        ]
      }
    ],
    competitions: [
      "Flipkart Grid 3.0 - Information Security Challenge: Led team of 3 to semi-finalist ranking among 3000+ teams, demonstrating systematic vulnerability identification and exploit development capabilities.",
      "NahamCon CTF 2023: Led team to top third percentile ranking, applying advanced exploitation techniques and security architecture analysis methodologies.",
      "Red Team Hacker Academy Capture the Flag: Achieved 5th place among 50+ teams with 65% challenge completion rate, demonstrating proficiency in penetration testing and vulnerability exploitation techniques.",
      "Infysec and Zybeak Technologies Security Assessment Competition: Applied penetration testing and vulnerability assessment methodologies in competitive security research environment.",
      "BSidesPhilly 2023 Conference: Engaged in security research discussions, threat intelligence sharing, and professional development within the cybersecurity community."
    ]
  },
  metrics: {
    servicesAssessed: 45,
    vulnerabilitiesFound: 120,
    highSeverity: 23,
    webAppsTested: 43,
    mobileAppsTested: 2,
    criticalVulns: 20
  },
  testimonials: [
    {
      name: "Colleague/Manager",
      role: "Senior Security Engineer",
      company: "Previous Company",
      text: "Nitish demonstrates exceptional technical depth in application security and penetration testing. His systematic approach to vulnerability discovery and responsible disclosure practices set a high standard for security research.",
      linkedin: "#"
    },
    {
      name: "Team Lead",
      role: "Security Team Lead",
      company: "Organization",
      text: "Working with Nitish has been a great experience. His ability to identify complex security vulnerabilities and communicate findings clearly to both technical and non-technical stakeholders is outstanding.",
      linkedin: "#"
    }
  ]
};
