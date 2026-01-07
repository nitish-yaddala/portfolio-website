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
    executiveSummary: `This case study documents a real-world scam interception where a scammer impersonated a family member via Instagram and WhatsApp, attempting to solicit fraudulent UPI payments. Using forensic methods, I collected evidence including IP address, device metadata, and fraudulent account details, then filed a formal cybercrime complaint.

The investigation used tools and techniques from penetration testing, social engineering defense, and network forensics. The tactics employed (mobile spoofing, WhatsApp impersonation, cross-platform social engineering) represent common attack surfaces in digital fraud. This demonstrates my ability to detect and neutralize threats and engage law enforcement with actionable, evidence-backed reports.`,
    introduction: `This report documents a social engineering scam that utilized cloned digital identities to commit attempted financial fraud. The incident involved abuse of communication platforms (Instagram and WhatsApp) to impersonate a trusted relative and initiate fraudulent UPI-based payment requests.

As a cybersecurity engineer, I engaged with the scammer using safe investigative methods to prevent loss and collect actionable intelligence. This report was prepared as part of a formal complaint submitted to Indian cybercrime authorities.`,
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
    societalImpact: `This scam attempt reflects a larger pattern of abuse within the Indian digital payments ecosystem. Many individuals, especially senior citizens or those unfamiliar with technology, may not recognize these threats early.

Technical vigilance and documentation helps prevent wider victimization, enable cybercrime units to track behavior clusters, and improve public digital literacy.`,
    professionalContribution: `This case demonstrates capabilities in real-time threat analysis, digital forensics and device fingerprinting, incident response documentation, and engaging legal systems with structured evidence.`,
    conclusion: `This was a successfully intercepted threat backed by real-time forensics, counterintelligence, and responsible reporting. The investigation prevented financial loss and collected actionable intelligence for law enforcement.`,
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

The vulnerability was identified during routine security assessment in April 2023. Multiple authenticated API endpoints lacked proper authorization checks, allowing any authenticated user to access other users' data by modifying URL parameters. The exposed information included Aadhaar numbers, passport details, visa information, family income details, bank account information, residential addresses, and uploaded identity documents.`,
    introduction: `The Ambedkar Overseas Vidya Nidhi Portal (https://jnboverseas1.apcfss.in/) is a government-operated web application developed by the Andhra Pradesh Centre for Financial Systems and Services (APCFSS). The portal enables economically disadvantaged students from Andhra Pradesh to apply for and manage overseas education scholarships, specifically targeting students admitted to top 200 world-ranked universities.

The portal serves Andhra Pradesh state residents, with eligibility based on economic background. This case study documents the discovery of a critical authorization vulnerability that exposed sensitive personal information of scholarship applicants, the methodology used to identify and validate the issue, the impact assessment, and the responsible disclosure process.`,
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

1. Passive Observation: While using the portal normally, I noticed that API endpoints used predictable parameters (Aadhaar numbers and sequential applicant IDs) in URL parameters.

2. Network Traffic Analysis: Used browser developer tools to inspect network activity and identify all API endpoints being called during normal portal usage.

3. Request Interception: Used Burp Suite to intercept and modify HTTP requests, testing whether changing the aadhar or applicantId parameters would return unauthorized data.

4. Validation: Confirmed that modifying these parameters in authenticated requests successfully returned sensitive information belonging to other users, confirming the IDOR vulnerability.

5. Scope Assessment: Identified all affected endpoints and documented the full extent of data exposure.

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
    societalImpact: `This vulnerability exposed sensitive personal information of approximately 2,000 students registered in the scholarship portal.

Exposed Data:
- Aadhaar numbers (12-digit unique identifiers)
- Passport numbers and visa details
- Family income information
- Complete education history
- Uploaded identity documents
- Residential addresses and contact information
- Bank account details
- Login credentials
- Applicant photographs

The sequential nature of applicant IDs made it possible for an attacker to systematically enumerate and scrape all registered user data.

Potential Consequences:
- Identity theft and fraud
- Financial fraud using exposed bank account information
- Unauthorized use of legal documents (passport, visa)
- Reputational harm to affected students
- Undermining public trust in government scholarship systems
- Violation of data protection regulations

This vulnerability represents a critical failure in protecting citizen data in government systems, particularly given the sensitive nature of the information and the vulnerable population (economically disadvantaged students) being served.`,
    professionalContribution: `This case study demonstrates capabilities in vulnerability discovery, API security testing, responsible disclosure practices, impact assessment, and technical documentation. Despite the initial dismissal of the report, this demonstrates persistence in responsible security research and commitment to protecting citizen data privacy.`,
    conclusion: `The IDOR vulnerability in the Ambedkar Overseas Vidya Nidhi Portal represents a critical authorization failure that exposed sensitive personal information of approximately 2,000 scholarship applicants. The vulnerability was exploitable through simple parameter manipulation, making it accessible to attackers with minimal technical knowledge.

This case study highlights the importance of proper authorization controls in government systems handling sensitive citizen data. The discovery and responsible disclosure process demonstrates the value of independent security research in protecting public digital infrastructure.`,
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
