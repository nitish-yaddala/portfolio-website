export interface CaseStudy {
  id: string;
  title: string;
  author: string;
  date: string;
  reportDate: string;
  location: string;
  category: 'Social Engineering' | 'Penetration Testing' | 'Vulnerability Research' | 'Incident Response' | 'Threat Intelligence';
  tags: string[];
  summary: string;
  executiveSummary: string;
  introduction: string;
  timeline: Array<{
    date: string;
    event: string;
  }>;
  attackNarrative: string;
  detectionStrategy: string;
  toolsAndTechniques: string[];
  threatIntelligence: {
    claimedName?: string;
    claimedDOB?: string;
    claimedAddress?: string;
    upiIds?: string[];
    phoneNumbers?: string[];
    deviceMetadata?: {
      ip?: string;
      city?: string;
      localIp?: string;
      os?: string;
      browser?: string;
      gpu?: string;
      resolution?: string;
      language?: string;
      privateMode?: boolean;
      adBlocker?: boolean;
    };
  };
  legalRelevance?: string[];
  societalImpact: string;
  professionalContribution: string;
  conclusion: string;
  appendices?: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'social-engineering-whatsapp-instagram-2025',
    title: 'Detection and Analysis of a Real-World Social Engineering Scam via WhatsApp & Instagram',
    author: 'Muni Nitish Kumar Yaddala',
    date: 'May 1st, 2025',
    reportDate: 'May 2025',
    location: 'Seattle, Washington, USA',
    category: 'Social Engineering',
    tags: ['Social Engineering', 'Digital Forensics', 'Threat Intelligence', 'Incident Response', 'Cybercrime Investigation'],
    summary: 'A real-world scam interception where a scammer impersonated a family member via Instagram and WhatsApp, attempting to solicit fraudulent UPI payments. Using real-time forensic methods, I collected evidence including IP address, device metadata, and fraudulent account details, then filed a formal cybercrime complaint.',
    executiveSummary: `This case study documents a real-world scam interception that I handled as a cybersecurity professional. A scammer impersonated a family member via Instagram and WhatsApp, attempting to solicit fraudulent UPI payments. Using real-time forensic methods, I collected evidence including IP address, device metadata, and fraudulent account details. I then filed a formal cybercrime complaint to help prevent the victimization of others.

Importantly, this report demonstrates how I apply cybersecurity knowledge outside the boundaries of employment, in support of public digital safety. My investigation relied on tools and skills commonly used in penetration testing, social engineering defense, and network forensics, all of which are part of my professional expertise and academic background.

The tools I used, such as metadata loggers, phishing countermeasures, and behavioral threat modeling, are part of a broader strategy used in both private and government sectors to counter fraud and protect national digital infrastructure.

Though the incident occurred within the Indian digital payment ecosystem, the tactics and infrastructure used (mobile spoofing, WhatsApp impersonation, cross-platform social engineering) are the same attack surfaces targeted in U.S. systems. This example demonstrates my ability to detect and neutralize such threats and to engage law enforcement with actionable, evidence-backed reports.`,
    introduction: `This report documents a real-world incident involving a targeted social engineering scam that utilized cloned digital identities to commit attempted financial fraud. The incident showcases the abuse of widely accessible communication platforms (Instagram and WhatsApp) to impersonate a trusted relative and initiate fraudulent UPI-based payment requests.

The case reflects the growing sophistication and frequency of personalized digital fraud in India and underscores the need for broader awareness, real-time detection strategies, and technical intervention, all of which were applied by me in this incident. As a cybersecurity engineer, I engaged with the scammer using safe investigative methods to prevent loss and collect actionable intelligence.

This report was originally prepared as part of a formal complaint submitted to Indian cybercrime authorities. It also serves as a documented example of applied cybersecurity expertise in real-world threat response, included here to demonstrate my ongoing contributions to the field as part of my EB2-NIW petition.`,
    timeline: [
      {
        date: 'May 1, 2025',
        event: 'Received message on Instagram from impersonator using my uncle\'s name/photo'
      },
      {
        date: 'May 1, 2025',
        event: 'Shared my WhatsApp number, assuming it was a genuine contact'
      },
      {
        date: 'May 1, 2025',
        event: 'Scammer initiated WhatsApp chat from +91 91359 39017'
      },
      {
        date: 'May 1–2, 2025',
        event: 'Scammer repeatedly attempted to get me to transfer money via UPI'
      },
      {
        date: 'May 2, 2025',
        event: 'I initiated a counter-intelligence strategy using tracking tools'
      },
      {
        date: 'May 2–3, 2025',
        event: 'Collected device metadata, impersonated identity details, UPI records'
      },
      {
        date: 'May 3, 2025',
        event: 'Filed complaint preparation and forensic documentation'
      }
    ],
    attackNarrative: `The scammer created a cloned Instagram profile using the name and image of my maternal uncle. The account engaged me in casual conversation and asked for my WhatsApp number. Trusting the identity, I shared it. The attacker then contacted me via WhatsApp using the number +91 91359 39017, again pretending to be my uncle. He claimed to have hit his transaction limit and requested that I urgently transfer money on his behalf to a "friend." He shared multiple UPI IDs and attempted to induce trust using emotional familiarity and time pressure. Over time, the scammer switched profile pictures (indicating active impersonation of others), changed communication numbers, and deleted messages mid-conversation, all hallmarks of seasoned scam behavior.`,
    detectionStrategy: `Upon noticing subtle anomalies (tone, urgency, avoidance of direct questions), I became suspicious. Rather than blocking the attacker immediately, I opted to play along to:
- Prevent him from scamming others
- Collect actionable intelligence
- File a proper cybercrime complaint

I used a combination of psychological probing and technical deception to gather personal, behavioral, and network-level data from the scammer, all while maintaining a safe distance from any real transaction or data leakage.`,
    toolsAndTechniques: [
      'Social Engineering Traps: Pretended to cooperate to elicit further responses',
      'IP Logging (Grabify/IPLogger): Sent a disguised link to the scammer, which logged metadata',
      'Metadata Analysis: Logged user agent, GPU, resolution, IP, timezone',
      'UPI ID Verification: Verified UPI handles using Truecaller, PhonePe, and UPI validators',
      'Threat Modeling: Created a timeline and mapped threat actor actions'
    ],
    threatIntelligence: {
      claimedName: 'Pravin Kumar',
      claimedDOB: '04/04/1995',
      claimedAddress: 'Ashok Nagar, Secunderabad & Vishakhapatnam',
      upiIds: [
        '8650783290@pthdfc',
        '8650783290@postbank',
        '1twsltitfluh@idbi',
        '8199829571@ptyes'
      ],
      phoneNumbers: [
        '+91 91359 39017',
        '8650783290',
        '8199829571',
        '9389961949',
        '7352679178',
        '8596830417',
        '+1 (770) 335 9399'
      ],
      deviceMetadata: {
        ip: '223.184.181.40',
        city: 'Mumbai',
        localIp: '100.83.173.82',
        os: 'Android 10',
        browser: 'Chrome Mobile 126',
        gpu: 'Adreno 619',
        resolution: '393x873',
        language: 'en-US',
        privateMode: false,
        adBlocker: false
      }
    },
    legalRelevance: [
      'Section 66C, IT Act, 2000 – Identity Theft',
      'Section 66D, IT Act, 2000 – Cheating by Personation using computer resources',
      'Section 419, IPC – Impersonation',
      'Section 420, IPC – Cheating and Dishonest Inducement'
    ],
    societalImpact: `While this was a single scam attempt, it reflects a larger pattern of abuse within the Indian digital payments ecosystem. Many individuals, especially senior citizens or those unfamiliar with tech, may not recognize these threats early.

This kind of technical vigilance and documentation helps:
- Prevent wider victimization
- Enable cybercrime units to track behavior clusters
- Improve public digital literacy through example-based education`,
    professionalContribution: `This case underscores my strength in:
- Real-time threat analysis
- Digital forensics and device fingerprinting
- Incident response documentation
- Technical writing for non-expert audiences
- Engaging legal systems with structured evidence`,
    conclusion: `This was a prevented scam, but more importantly, a successfully intercepted threat backed by real-time forensics, counterintelligence, and responsible reporting. It reflects my personal ethos of cyber integrity and supports my contributions as a cybersecurity engineer aligned with public interest and national digital protection.`,
    appendices: [
      'Screenshots of WhatsApp & Instagram chats',
      'QR codes / UPI ID screenshots',
      'Metadata/IP logs',
      'Custom error screens used',
      'Screenshot of false profile pic change over time'
    ]
  },
  {
    id: 'idor-ambedkar-overseas-vidya-nidhi-2023',
    title: 'IDOR Vulnerability in Ambedkar Overseas Vidya Nidhi Portal',
    author: 'Muni Nitish Kumar Yaddala',
    date: 'April 2023',
    reportDate: 'April 2023',
    location: 'Andhra Pradesh, India',
    category: 'Vulnerability Research',
    tags: ['IDOR', 'CWE-639', 'API Security', 'Responsible Disclosure', 'Government Portal', 'PII Exposure', 'Authorization Bypass'],
    summary: 'Identified and responsibly disclosed a critical Insecure Direct Object Reference (IDOR) vulnerability in the Andhra Pradesh government scholarship portal that exposed sensitive personal information of approximately 2,000 students, including Aadhaar numbers, passport details, financial information, and uploaded documents.',
    executiveSummary: `This case study documents the discovery and responsible disclosure of a critical Insecure Direct Object Reference (IDOR) vulnerability in the Ambedkar Overseas Vidya Nidhi Portal, a government-operated web application managed by the Andhra Pradesh Centre for Financial Systems and Services (APCFSS). The vulnerability allowed unauthorized access to sensitive personal information of approximately 2,000 scholarship applicants through predictable API parameters.

The vulnerability was identified during routine security assessment in April 2023. Multiple authenticated API endpoints were found to lack proper authorization checks, allowing any authenticated user to access other users' data by simply modifying URL parameters. This represents a fundamental failure in access control mechanisms and demonstrates the critical importance of proper authorization validation in government systems handling sensitive citizen data.

The exposed information included highly sensitive data such as Aadhaar numbers, passport details, visa information, family income details, bank account information, residential addresses, and uploaded identity documents. This case study demonstrates my ability to identify critical security flaws in production government systems and follow responsible disclosure practices, even when initial reporting attempts were not properly escalated.`,
    introduction: `The Ambedkar Overseas Vidya Nidhi Portal (https://jnboverseas1.apcfss.in/) is a government-operated web application developed by the Andhra Pradesh Centre for Financial Systems and Services (APCFSS). The portal enables economically disadvantaged students from Andhra Pradesh to apply for and manage overseas education scholarships, specifically targeting students admitted to top 200 world-ranked universities.

The portal serves a limited user base of Andhra Pradesh state residents, with eligibility typically based on economic background. Given its role in handling sensitive student data and financial information, the portal requires robust security controls to protect applicant privacy and prevent unauthorized data access.

This case study documents the discovery of a critical authorization vulnerability that exposed sensitive personal information of scholarship applicants, the methodology used to identify and validate the issue, the impact assessment, and the responsible disclosure process.`,
    timeline: [
      {
        date: 'April 2023',
        event: 'Initial discovery of IDOR vulnerability during routine interaction with the portal'
      },
      {
        date: 'April 2023',
        event: 'Used browser developer tools and Burp Suite to inspect network activity and validate vulnerability'
      },
      {
        date: 'April 2023',
        event: 'Documented affected endpoints, exploited parameters, and impact assessment'
      },
      {
        date: 'April 2023',
        event: 'Attempted responsible disclosure through official portal email and contacted associated employees'
      },
      {
        date: 'Ongoing',
        event: 'Report dismissed and not escalated; no fix or acknowledgment received at time of writing'
      }
    ],
    attackNarrative: `The vulnerability was discovered through passive exploration of authenticated API endpoints. During normal portal usage, I observed that API requests included predictable parameters such as Aadhaar numbers and applicant IDs. Using browser developer tools and Burp Suite, I intercepted and analyzed these requests.

The vulnerability manifested across multiple API endpoints that lacked proper authorization checks. By simply modifying the aadhar or applicantId parameters in authenticated requests, I was able to access sensitive information belonging to other users. The sequential nature of applicant IDs made it trivial to enumerate and access data for all registered applicants.

No intrusive testing or unauthorized access was performed - only passive exploration of authenticated sessions. The vulnerability was exploitable through standard browser functionality and required no special tools beyond what any security researcher would use for legitimate assessment purposes.`,
    detectionStrategy: `The vulnerability was identified during a routine interaction with the website. The discovery methodology involved:

1. **Passive Observation**: While using the portal normally, I noticed that API endpoints used predictable parameters (Aadhaar numbers and sequential applicant IDs) in URL parameters.

2. **Network Traffic Analysis**: Used browser developer tools to inspect network activity and identify all API endpoints being called during normal portal usage.

3. **Request Interception**: Used Burp Suite to intercept and modify HTTP requests, testing whether changing the aadhar or applicantId parameters would return unauthorized data.

4. **Validation**: Confirmed that modifying these parameters in authenticated requests successfully returned sensitive information belonging to other users, confirming the IDOR vulnerability.

5. **Scope Assessment**: Identified all affected endpoints and documented the full extent of data exposure.

The testing was conducted entirely within authenticated sessions and involved no unauthorized access or intrusive techniques.`,
    toolsAndTechniques: [
      'Browser Developer Tools: Inspected network activity and API calls',
      'Burp Suite: Intercepted and modified HTTP requests to test authorization controls',
      'Passive Security Testing: Analyzed API endpoints without intrusive techniques',
      'Parameter Manipulation: Modified aadhar and applicantId parameters to test access controls',
      'Data Enumeration: Identified sequential patterns in applicant IDs enabling bulk data access',
      'Impact Assessment: Documented all exposed sensitive data types and affected user count',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/registrationformdata/?aadhar=<aadhar_number>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/getStudentDashBoardData/?aadhar=<aadhar_number>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/getApplicantDetails?applicantId=<applicant_id>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/registrationform/getPreviewPersonal?applicantId=<applicant_id>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/registrationform/getPreviewFamily?applicantId=<applicant_id>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/registrationform/getPreviewEducation?applicantId=<applicant_id>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/registrationform/getPreviewForeign?applicantId=<applicant_id>',
      'Affected Endpoints: https://jnboverseas.apcfss.in/jnboverseas/registrationform/getUploadDocuments?applicantId=<applicant_id>',
      'Exploited Parameters: aadhar (12-digit unique identifier), applicantId (numeric)'
    ],
    threatIntelligence: {
      claimedAddress: 'Andhra Pradesh, India',
      deviceMetadata: {
        browser: 'Burp Suite, Browser Developer Tools'
      }
    },
    legalRelevance: [
      'Section 43A, Information Technology Act, 2000 – Data Protection and Privacy',
      'Aadhaar Act, 2016 – Protection of Aadhaar-related information',
      'SPDI Rules (Sensitive Personal Data or Information Rules) – Protection of sensitive personal data',
      'CWE-639: Authorization Bypass Through User-Controlled Key',
      'OWASP Top 10: Broken Access Control'
    ],
    societalImpact: `This vulnerability exposed sensitive personal information of approximately 2,000 students registered in the scholarship portal. The exposed data included:

- Aadhaar numbers (12-digit unique identifiers)
- Passport numbers and visa details
- Family income information
- Complete education history
- Uploaded identity documents
- Residential addresses and contact information
- Bank account details
- Login credentials
- Applicant photographs

The sequential nature of applicant IDs made it possible for an attacker to systematically enumerate and scrape all registered user data. Such exposure can lead to:

- Identity theft and fraud
- Financial fraud using exposed bank account information
- Unauthorized use of legal documents (passport, visa)
- Reputational harm to affected students
- Undermining public trust in government scholarship systems
- Violation of data protection regulations

This vulnerability represents a critical failure in protecting citizen data in government systems, particularly given the sensitive nature of the information and the vulnerable population (economically disadvantaged students) being served.`,
    professionalContribution: `This case study demonstrates my capabilities in:

- **Vulnerability Discovery**: Identifying critical authorization flaws in production government systems through systematic security assessment
- **API Security Testing**: Analyzing API endpoints for authorization bypass vulnerabilities
- **Responsible Disclosure**: Following ethical security research practices and attempting proper disclosure channels
- **Impact Assessment**: Comprehensively documenting the scope and severity of data exposure
- **Technical Documentation**: Creating detailed vulnerability reports with reproduction steps and impact analysis
- **Government System Security**: Understanding security requirements for systems handling sensitive citizen data

Despite the initial dismissal of the report, this case study demonstrates persistence in responsible security research and commitment to protecting citizen data privacy, even when proper channels are not immediately responsive.`,
    conclusion: `The IDOR vulnerability in the Ambedkar Overseas Vidya Nidhi Portal represents a critical authorization failure that exposed sensitive personal information of approximately 2,000 scholarship applicants. The vulnerability was exploitable through simple parameter manipulation and required no advanced techniques, making it accessible to attackers with minimal technical knowledge.

This case study highlights the importance of proper authorization controls in government systems handling sensitive citizen data, particularly those serving vulnerable populations. The discovery and responsible disclosure process, despite not receiving immediate acknowledgment, demonstrates the value of independent security research in protecting public digital infrastructure.

The vulnerability remains a concern for affected users and underscores the need for regular security assessments, proper access control implementation, and responsive vulnerability management processes in government systems.`,
    appendices: [
      'Portal login page screenshot',
      'Account registration form data (obfuscated)',
      'Applicant details including passport and visa information (obfuscated)',
      'Family members details (obfuscated)',
      'Education history leak (obfuscated)',
      'Burp Suite request/response logs',
      'Responsible disclosure email correspondence',
      'List of affected API endpoints',
      'Impact assessment documentation'
    ]
  }
];
