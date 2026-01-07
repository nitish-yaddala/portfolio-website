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
  }
];
