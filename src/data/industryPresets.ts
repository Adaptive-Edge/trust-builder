export interface TrustPillar {
  id: number;
  name: string;
  description: string;
  focusAreas: string[];
}

export interface Initiative {
  id: number;
  title: string;
  description: string;
  cost: number;
  pillar: number;
  trust: number;
  profit: number;
}

export interface Challenge {
  title: string;
  description: string;
  effect: string;
  pillarEffects: Record<number, number>;
  profitEffect?: number;
  customerEffect?: number;
}

export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FeedbackSet {
  high: string[];
  medium: string[];
  low: string[];
}

export interface IndustryPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  metrics: {
    resourcesLabel: string;
    profitLabel: string;
    customersLabel: string;
  };
  pillars: TrustPillar[];
  initiatives: Initiative[];
  challenges: Challenge[];
  personas: CustomerPersona[];
  feedback: Record<number, FeedbackSet>;
  insights: string[];
  welcomeMessage: string;
  goalDescription: string;
}

export const industryPresets: Record<string, IndustryPreset> = {
  generic: {
    id: "generic",
    name: "Generic Organization",
    description: "A flexible trust framework for any organization",
    icon: "Building2",
    metrics: {
      resourcesLabel: "Resources",
      profitLabel: "Performance",
      customersLabel: "Stakeholders",
    },
    pillars: [
      {
        id: 1,
        name: "Product & Service Excellence",
        description: "Quality, reliability, and value delivery",
        focusAreas: ["Quality Assurance", "Service Delivery", "Innovation"],
      },
      {
        id: 2,
        name: "Ethics & Integrity",
        description: "Transparency, honesty, and fair practices",
        focusAreas: ["Ethical Culture", "Compliance", "Transparent Communication"],
      },
      {
        id: 3,
        name: "Social Responsibility",
        description: "Community impact, sustainability, and wellbeing",
        focusAreas: ["Sustainability", "Community Impact", "Employee Wellbeing"],
      },
      {
        id: 4,
        name: "Stakeholder Engagement",
        description: "Relationships, partnerships, and reputation",
        focusAreas: ["Customer Relations", "Partner Ecosystem", "Public Image"],
      },
    ],
    initiatives: [
      { id: 1, title: "Quality Certification", description: "Achieve and publicize industry-standard quality certifications.", cost: 3, pillar: 1, trust: 12, profit: -8 },
      { id: 2, title: "Service Guarantee", description: "Implement a no-questions-asked service guarantee program.", cost: 2, pillar: 1, trust: 10, profit: -5 },
      { id: 3, title: "Innovation Lab", description: "Create a dedicated innovation team to improve offerings.", cost: 4, pillar: 1, trust: 8, profit: -10 },
      { id: 4, title: "Ethics Training", description: "Mandatory ethics training for all employees with public commitment.", cost: 2, pillar: 2, trust: 10, profit: -4 },
      { id: 5, title: "Transparency Report", description: "Publish annual transparency report on operations and decisions.", cost: 2, pillar: 2, trust: 12, profit: -3 },
      { id: 6, title: "Whistleblower Program", description: "Establish protected channels for reporting concerns.", cost: 1, pillar: 2, trust: 8, profit: -2 },
      { id: 7, title: "Sustainability Initiative", description: "Launch comprehensive environmental sustainability program.", cost: 4, pillar: 3, trust: 15, profit: -12 },
      { id: 8, title: "Community Partnership", description: "Partner with local organizations on community projects.", cost: 2, pillar: 3, trust: 10, profit: -5 },
      { id: 9, title: "Employee Wellness", description: "Implement comprehensive employee wellness program.", cost: 3, pillar: 3, trust: 8, profit: -6 },
      { id: 10, title: "Customer Advisory Board", description: "Create formal customer feedback and advisory structure.", cost: 2, pillar: 4, trust: 10, profit: 0 },
      { id: 11, title: "Partner Summit", description: "Host annual partner and stakeholder engagement event.", cost: 3, pillar: 4, trust: 8, profit: -5 },
      { id: 12, title: "Thought Leadership", description: "Establish thought leadership through publications and speaking.", cost: 2, pillar: 4, trust: 6, profit: 2 },
    ],
    challenges: [
      { title: "Media Scrutiny", description: "Investigative journalists are examining industry practices.", effect: "All trust pillars decrease by 5%.", pillarEffects: { 1: -5, 2: -5, 3: -5, 4: -5 } },
      { title: "Regulatory Review", description: "Regulators announce increased oversight of your sector.", effect: "Ethics & Integrity trust decreases by 10%.", pillarEffects: { 2: -10 } },
      { title: "Service Disruption", description: "A major operational incident affects service delivery.", effect: "Product & Service trust decreases by 15%.", pillarEffects: { 1: -15 } },
      { title: "Competitor Scandal", description: "A competitor's ethical failure casts shadow on the industry.", effect: "All trust pillars decrease by 8%.", pillarEffects: { 1: -8, 2: -8, 3: -8, 4: -8 } },
      { title: "Industry Recognition", description: "Your organization receives positive industry recognition.", effect: "Stakeholder Engagement trust increases by 8%.", pillarEffects: { 4: 8 } },
      { title: "Market Growth", description: "Market expansion brings new stakeholder opportunities.", effect: "Stakeholder base increases by 10%.", pillarEffects: {}, customerEffect: 10 },
      { title: "Economic Pressure", description: "Economic conditions create budget constraints.", effect: "Performance decreases by 10%.", pillarEffects: {}, profitEffect: -10 },
      { title: "Competitor Innovation", description: "A competitor launches a well-received trust initiative.", effect: "Stakeholder Engagement trust decreases by 5%.", pillarEffects: { 4: -5 } },
    ],
    personas: [
      { id: "loyal", name: "Alex", role: "Long-term Stakeholder", avatar: "A" },
      { id: "skeptic", name: "Jordan", role: "Cautious Observer", avatar: "J" },
      { id: "new", name: "Morgan", role: "New Stakeholder", avatar: "M" },
    ],
    feedback: {
      1: {
        high: ["The quality of service has been exceptional. I feel confident in my choice.", "Everything works smoothly and reliably. This is how it should be.", "I can see the investment in quality - it shows in every interaction."],
        medium: ["Service is decent, but there is room for improvement.", "Things work most of the time, which is acceptable.", "Quality is okay, but I have seen better elsewhere."],
        low: ["I am constantly disappointed by the quality.", "Nothing seems to work as promised.", "I do not trust that I will get what I am paying for."],
      },
      2: {
        high: ["I appreciate the transparency - it builds real confidence.", "The ethical commitment here is genuine and visible.", "I trust this organization to do the right thing."],
        medium: ["They seem ethical enough, but I would like more transparency.", "I have no major concerns, but also no strong confidence.", "Their ethics seem standard for the industry."],
        low: ["I do not trust their motives at all.", "There is too much hidden - what are they not telling us?", "Their actions do not match their words."],
      },
      3: {
        high: ["Their commitment to community and sustainability is inspiring.", "I feel good supporting an organization that gives back.", "They truly care about more than just profits."],
        medium: ["They do some good things, but could do more.", "Social responsibility seems like an afterthought.", "Nice initiatives, but are they just for show?"],
        low: ["They only care about themselves.", "All talk, no real action on social issues.", "I see no evidence they care about community impact."],
      },
      4: {
        high: ["They really listen and respond to feedback.", "I feel valued as a stakeholder.", "Great communication and relationship building."],
        medium: ["Communication is adequate but not exceptional.", "They engage when necessary, but not proactively.", "I feel like just another number sometimes."],
        low: ["They never listen to feedback.", "Impossible to get any meaningful engagement.", "I feel completely ignored and undervalued."],
      },
    },
    insights: [
      "Trust is built gradually but can be lost rapidly.",
      "Balancing all four trust pillars is more effective than excelling in just one.",
      "Short-term gains often come at the expense of long-term trust.",
      "Transparency initiatives yield the greatest trust returns.",
      "Consistent actions matter more than grand gestures.",
      "Stakeholder perception shapes reality more than internal metrics.",
      "Crisis response reveals true organizational character.",
      "Trust compounds over time with consistent positive actions.",
    ],
    welcomeMessage: "Build trust with your stakeholders through strategic initiatives and ethical leadership.",
    goalDescription: "Create the most trusted organization while maintaining sustainable performance.",
  },

  finance: {
    id: "finance",
    name: "Financial Services",
    description: "Banks, insurance, and financial institutions",
    icon: "Landmark",
    metrics: {
      resourcesLabel: "Capital",
      profitLabel: "Returns",
      customersLabel: "Clients",
    },
    pillars: [
      {
        id: 1,
        name: "Financial Security",
        description: "Protection of assets and secure transactions",
        focusAreas: ["Asset Protection", "Transaction Security", "Fraud Prevention"],
      },
      {
        id: 2,
        name: "Regulatory Compliance",
        description: "Adherence to financial regulations and ethical standards",
        focusAreas: ["Compliance Framework", "Fair Lending", "Transparent Fees"],
      },
      {
        id: 3,
        name: "Financial Wellbeing",
        description: "Supporting customer financial health and literacy",
        focusAreas: ["Financial Education", "Responsible Lending", "Accessibility"],
      },
      {
        id: 4,
        name: "Client Relationships",
        description: "Building lasting partnerships with clients",
        focusAreas: ["Advisory Services", "Communication", "Community Banking"],
      },
    ],
    initiatives: [
      { id: 1, title: "Enhanced Security", description: "Implement biometric authentication and real-time fraud monitoring.", cost: 4, pillar: 1, trust: 15, profit: -10 },
      { id: 2, title: "Insurance Guarantee", description: "Exceed standard deposit insurance with additional protections.", cost: 3, pillar: 1, trust: 12, profit: -8 },
      { id: 3, title: "Secure Platform Audit", description: "Third-party security certification with public results.", cost: 3, pillar: 1, trust: 10, profit: -6 },
      { id: 4, title: "Fee Transparency", description: "Clear, upfront fee disclosure with no hidden charges.", cost: 1, pillar: 2, trust: 10, profit: -5 },
      { id: 5, title: "Compliance Excellence", description: "Exceed regulatory requirements and publicize compliance record.", cost: 3, pillar: 2, trust: 12, profit: -7 },
      { id: 6, title: "Ethical Lending Pledge", description: "Commit to responsible lending practices and rate caps.", cost: 2, pillar: 2, trust: 10, profit: -8 },
      { id: 7, title: "Financial Literacy Program", description: "Free financial education for customers and community.", cost: 2, pillar: 3, trust: 12, profit: -4 },
      { id: 8, title: "Hardship Support", description: "Proactive support program for customers facing financial difficulty.", cost: 3, pillar: 3, trust: 15, profit: -10 },
      { id: 9, title: "Accessibility Initiative", description: "Ensure services are accessible to underbanked communities.", cost: 3, pillar: 3, trust: 10, profit: -6 },
      { id: 10, title: "Personal Advisory", description: "Assign dedicated advisors to all client accounts.", cost: 3, pillar: 4, trust: 10, profit: -5 },
      { id: 11, title: "Community Investment", description: "Invest in local community development projects.", cost: 2, pillar: 4, trust: 8, profit: -4 },
      { id: 12, title: "Client Portal", description: "Create comprehensive self-service portal with insights.", cost: 2, pillar: 4, trust: 6, profit: 2 },
    ],
    challenges: [
      { title: "Data Breach Report", description: "Industry reports highlight increasing cyber threats to financial data.", effect: "Financial Security trust decreases by 12%.", pillarEffects: { 1: -12 } },
      { title: "Regulatory Investigation", description: "Regulators announce industry-wide review of lending practices.", effect: "Regulatory Compliance trust decreases by 10%.", pillarEffects: { 2: -10 } },
      { title: "Banking Scandal", description: "A major competitor is fined for unethical practices.", effect: "All trust pillars decrease by 6%.", pillarEffects: { 1: -6, 2: -6, 3: -6, 4: -6 } },
      { title: "Economic Recession", description: "Economic downturn increases default rates and anxiety.", effect: "Client Relationships trust decreases by 8%.", pillarEffects: { 4: -8 }, profitEffect: -15 },
      { title: "Fintech Disruption", description: "New fintech competitor offers innovative transparent services.", effect: "Financial Security trust decreases by 5%.", pillarEffects: { 1: -5, 4: -5 } },
      { title: "Positive Audit", description: "Independent audit highlights strong governance practices.", effect: "Regulatory Compliance trust increases by 8%.", pillarEffects: { 2: 8 } },
      { title: "Market Rally", description: "Strong market performance improves client portfolios.", effect: "Client base increases by 8%.", pillarEffects: {}, customerEffect: 8 },
      { title: "Interest Rate Change", description: "Central bank policy changes affect margins.", effect: "Returns decrease by 8%.", pillarEffects: {}, profitEffect: -8 },
    ],
    personas: [
      { id: "wealthy", name: "Patricia", role: "High-Net-Worth Client", avatar: "P" },
      { id: "retail", name: "Marcus", role: "Retail Banking Customer", avatar: "M" },
      { id: "business", name: "Diana", role: "Small Business Owner", avatar: "D" },
    ],
    feedback: {
      1: {
        high: ["My money feels secure here. The security measures are excellent.", "I trust that my investments are protected.", "The fraud prevention caught a suspicious transaction immediately."],
        medium: ["Security seems adequate, but I worry sometimes.", "I hope my data is as safe as they claim.", "Standard security - nothing special but nothing concerning."],
        low: ["I do not feel my money is safe here.", "Too many security incidents in the news.", "How do I know my data is really protected?"],
      },
      2: {
        high: ["Completely transparent about fees - no surprises ever.", "They clearly follow all the rules and then some.", "I trust their lending practices are fair."],
        medium: ["Fees are reasonable but could be clearer.", "They seem compliant, but how would I really know?", "Some terms in the fine print concern me."],
        low: ["Hidden fees keep appearing.", "I suspect they bend the rules when convenient.", "Their practices seem questionable."],
      },
      3: {
        high: ["They genuinely helped me improve my financial situation.", "The education resources transformed my understanding of money.", "They work with me during tough times, not against me."],
        medium: ["Some helpful resources, but limited.", "They offer support, but it feels transactional.", "Financial advice is okay but not personalized."],
        low: ["They only care about extracting fees.", "No support when I needed it most.", "They profit from my financial struggles."],
      },
      4: {
        high: ["My advisor truly understands my needs.", "I feel like a valued client, not just an account number.", "Excellent communication and proactive service."],
        medium: ["Service is acceptable but impersonal.", "Communication could be more proactive.", "I feel like just another customer."],
        low: ["Impossible to reach anyone helpful.", "They do not care about my individual needs.", "I am just a source of fees to them."],
      },
    },
    insights: [
      "Financial trust is built on security and transparency.",
      "Regulatory compliance is the foundation, not the ceiling.",
      "Customer financial wellbeing drives long-term loyalty.",
      "Crisis support builds stronger relationships than good-time marketing.",
      "Transparent fees reduce complaints more than low fees.",
      "Personal relationships differentiate in a digital world.",
      "Community investment creates grassroots trust.",
      "Security breaches elsewhere increase your opportunity to differentiate.",
    ],
    welcomeMessage: "Build a trusted financial institution through security, transparency, and client care.",
    goalDescription: "Create the most trusted financial services brand while maintaining sustainable returns.",
  },

  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    description: "Hospitals, clinics, and health systems",
    icon: "Heart",
    metrics: {
      resourcesLabel: "Budget",
      profitLabel: "Outcomes",
      customersLabel: "Patients",
    },
    pillars: [
      {
        id: 1,
        name: "Clinical Excellence",
        description: "Quality of care and patient outcomes",
        focusAreas: ["Care Quality", "Patient Safety", "Clinical Innovation"],
      },
      {
        id: 2,
        name: "Ethical Practice",
        description: "Medical ethics and patient rights",
        focusAreas: ["Informed Consent", "Privacy Protection", "Equitable Care"],
      },
      {
        id: 3,
        name: "Patient Wellbeing",
        description: "Holistic health and preventive care",
        focusAreas: ["Preventive Care", "Mental Health", "Health Education"],
      },
      {
        id: 4,
        name: "Care Experience",
        description: "Patient journey and communication",
        focusAreas: ["Communication", "Access to Care", "Support Services"],
      },
    ],
    initiatives: [
      { id: 1, title: "Quality Accreditation", description: "Achieve top-tier healthcare quality certification.", cost: 4, pillar: 1, trust: 15, profit: -10 },
      { id: 2, title: "Safety Protocol Enhancement", description: "Implement advanced patient safety monitoring systems.", cost: 3, pillar: 1, trust: 12, profit: -8 },
      { id: 3, title: "Outcomes Transparency", description: "Publish detailed clinical outcomes and success rates.", cost: 2, pillar: 1, trust: 10, profit: -3 },
      { id: 4, title: "Consent Excellence", description: "Enhanced informed consent process with patient advocates.", cost: 2, pillar: 2, trust: 10, profit: -4 },
      { id: 5, title: "Privacy Leadership", description: "Exceed HIPAA requirements with advanced data protection.", cost: 3, pillar: 2, trust: 12, profit: -6 },
      { id: 6, title: "Equity Initiative", description: "Programs to ensure equitable care across all demographics.", cost: 3, pillar: 2, trust: 12, profit: -8 },
      { id: 7, title: "Wellness Programs", description: "Comprehensive preventive care and wellness offerings.", cost: 3, pillar: 3, trust: 10, profit: -5 },
      { id: 8, title: "Mental Health Integration", description: "Integrate mental health services into all care pathways.", cost: 4, pillar: 3, trust: 15, profit: -12 },
      { id: 9, title: "Community Health", description: "Free community health education and screening programs.", cost: 2, pillar: 3, trust: 8, profit: -6 },
      { id: 10, title: "Patient Portal", description: "Comprehensive digital portal for records, scheduling, and communication.", cost: 3, pillar: 4, trust: 8, profit: 2 },
      { id: 11, title: "Care Navigation", description: "Dedicated care navigators to guide patients through treatment.", cost: 3, pillar: 4, trust: 12, profit: -7 },
      { id: 12, title: "Family Support", description: "Programs supporting patient families during care journeys.", cost: 2, pillar: 4, trust: 8, profit: -4 },
    ],
    challenges: [
      { title: "Medical Error Report", description: "Media reports on medical errors in the healthcare industry.", effect: "Clinical Excellence trust decreases by 12%.", pillarEffects: { 1: -12 } },
      { title: "Data Breach", description: "Healthcare data breaches make national news.", effect: "Ethical Practice trust decreases by 15%.", pillarEffects: { 2: -15 } },
      { title: "Staff Shortage", description: "Healthcare worker shortage affects service quality.", effect: "Care Experience trust decreases by 10%.", pillarEffects: { 4: -10 }, profitEffect: -8 },
      { title: "Pandemic Response", description: "Public health crisis tests healthcare system capacity.", effect: "All trust pillars tested - results vary by preparation.", pillarEffects: { 1: -5, 3: -5, 4: -8 } },
      { title: "Research Breakthrough", description: "Your institution contributes to a major medical advancement.", effect: "Clinical Excellence trust increases by 10%.", pillarEffects: { 1: 10 } },
      { title: "Community Recognition", description: "Community health initiatives receive public recognition.", effect: "Patient Wellbeing trust increases by 8%.", pillarEffects: { 3: 8 } },
      { title: "Insurance Changes", description: "Insurance policy changes affect patient costs and access.", effect: "Outcomes decrease by 10%.", pillarEffects: {}, profitEffect: -10 },
      { title: "Competitor Expansion", description: "A competitor opens a new state-of-the-art facility nearby.", effect: "Care Experience trust decreases by 5%.", pillarEffects: { 4: -5 }, customerEffect: -5 },
    ],
    personas: [
      { id: "chronic", name: "Robert", role: "Chronic Care Patient", avatar: "R" },
      { id: "parent", name: "Lisa", role: "Parent of Young Children", avatar: "L" },
      { id: "elderly", name: "Eleanor", role: "Senior Patient", avatar: "E" },
    ],
    feedback: {
      1: {
        high: ["The quality of care here is outstanding. I trust my doctors completely.", "I know I am getting the best possible treatment.", "Their clinical outcomes speak for themselves."],
        medium: ["Care quality seems good, but I have questions sometimes.", "Doctors are competent but rushed.", "Treatment is effective, though not exceptional."],
        low: ["I worry about the quality of care I receive.", "Too many mistakes and near-misses.", "I do not feel confident in my treatment."],
      },
      2: {
        high: ["They explain everything and respect my decisions.", "My privacy is clearly protected here.", "I receive the same great care regardless of my background."],
        medium: ["Consent process is adequate but quick.", "I assume my records are private.", "Care seems fair, though I cannot be sure."],
        low: ["I feel pressured into decisions.", "Who knows where my medical data ends up?", "I have seen unequal treatment here."],
      },
      3: {
        high: ["They care about my whole health, not just my illness.", "The wellness programs have transformed my life.", "Mental health support is genuinely available."],
        medium: ["Some preventive care options, but limited.", "Wellness is mentioned but not prioritized.", "Mental health feels like an afterthought."],
        low: ["They only care about treating illness, not preventing it.", "No real support for overall wellbeing.", "Mental health needs are completely ignored."],
      },
      4: {
        high: ["Everyone is caring and communication is excellent.", "I can easily access care when I need it.", "They make a difficult journey more bearable."],
        medium: ["Staff are okay, but communication could be better.", "Appointment availability is hit or miss.", "The experience is functional but not warm."],
        low: ["I feel like a number, not a person.", "Impossible to get appointments when needed.", "No one communicates what is happening with my care."],
      },
    },
    insights: [
      "Clinical excellence is the foundation of healthcare trust.",
      "Privacy breaches devastate trust faster than any other factor.",
      "Holistic wellbeing approaches build deeper patient loyalty.",
      "Communication quality often matters more than clinical outcomes.",
      "Equitable care builds community trust beyond individual patients.",
      "Family experience shapes patient perception significantly.",
      "Preventive care investments pay long-term trust dividends.",
      "Transparency about outcomes builds credibility even when imperfect.",
    ],
    welcomeMessage: "Build trust in your healthcare organization through clinical excellence and compassionate care.",
    goalDescription: "Create the most trusted healthcare provider while maintaining sustainable outcomes.",
  },

  technology: {
    id: "technology",
    name: "Technology",
    description: "Software, platforms, and tech companies",
    icon: "Laptop",
    metrics: {
      resourcesLabel: "Engineering",
      profitLabel: "Growth",
      customersLabel: "Users",
    },
    pillars: [
      {
        id: 1,
        name: "Product Reliability",
        description: "Performance, uptime, and technical excellence",
        focusAreas: ["System Uptime", "Performance", "Security"],
      },
      {
        id: 2,
        name: "Data Ethics",
        description: "Privacy, transparency, and responsible AI",
        focusAreas: ["Privacy Protection", "Data Transparency", "AI Ethics"],
      },
      {
        id: 3,
        name: "Digital Wellbeing",
        description: "Healthy technology use and accessibility",
        focusAreas: ["Screen Time Tools", "Accessibility", "Mental Health"],
      },
      {
        id: 4,
        name: "User Community",
        description: "Engagement, support, and ecosystem",
        focusAreas: ["User Support", "Developer Relations", "Community Building"],
      },
    ],
    initiatives: [
      { id: 1, title: "99.99% Uptime", description: "Invest in infrastructure for industry-leading reliability.", cost: 4, pillar: 1, trust: 15, profit: -12 },
      { id: 2, title: "Security Certification", description: "Achieve SOC 2 Type II and publicize audit results.", cost: 3, pillar: 1, trust: 12, profit: -8 },
      { id: 3, title: "Performance Dashboard", description: "Real-time public status page with historical data.", cost: 2, pillar: 1, trust: 8, profit: -3 },
      { id: 4, title: "Privacy by Design", description: "Implement and certify privacy-first architecture.", cost: 3, pillar: 2, trust: 12, profit: -6 },
      { id: 5, title: "Data Portability", description: "Easy data export and account deletion tools.", cost: 2, pillar: 2, trust: 10, profit: -4 },
      { id: 6, title: "AI Transparency", description: "Publish AI decision-making processes and allow opt-outs.", cost: 3, pillar: 2, trust: 12, profit: -8 },
      { id: 7, title: "Digital Wellness Tools", description: "Built-in features to promote healthy usage patterns.", cost: 2, pillar: 3, trust: 10, profit: -5 },
      { id: 8, title: "Accessibility Excellence", description: "WCAG AAA compliance and accessibility-first design.", cost: 3, pillar: 3, trust: 10, profit: -6 },
      { id: 9, title: "Youth Protection", description: "Enhanced protections and controls for younger users.", cost: 3, pillar: 3, trust: 12, profit: -8 },
      { id: 10, title: "24/7 Support", description: "Human support available around the clock.", cost: 3, pillar: 4, trust: 10, profit: -8 },
      { id: 11, title: "Developer Program", description: "Comprehensive API access and developer community.", cost: 2, pillar: 4, trust: 6, profit: 5 },
      { id: 12, title: "User Council", description: "Formal user advisory board influencing product decisions.", cost: 2, pillar: 4, trust: 10, profit: -2 },
    ],
    challenges: [
      { title: "Major Outage", description: "A widespread service outage affects millions of users.", effect: "Product Reliability trust decreases by 18%.", pillarEffects: { 1: -18 } },
      { title: "Privacy Scandal", description: "Tech industry privacy practices face public scrutiny.", effect: "Data Ethics trust decreases by 15%.", pillarEffects: { 2: -15 } },
      { title: "Algorithm Controversy", description: "AI decision-making faces ethical criticism.", effect: "Data Ethics trust decreases by 10%.", pillarEffects: { 2: -10, 3: -5 } },
      { title: "Competitor Launch", description: "A competitor launches a privacy-focused alternative.", effect: "User Community trust decreases by 8%.", pillarEffects: { 4: -8 }, customerEffect: -5 },
      { title: "Security Breach", description: "Industry-wide security vulnerabilities are exposed.", effect: "Product Reliability trust decreases by 12%.", pillarEffects: { 1: -12, 2: -8 } },
      { title: "Viral Success", description: "Your product goes viral with positive user stories.", effect: "User Community trust increases by 10%.", pillarEffects: { 4: 10 }, customerEffect: 15 },
      { title: "Regulatory Pressure", description: "New tech regulations are proposed.", effect: "Data Ethics trust decreases by 5%.", pillarEffects: { 2: -5 } },
      { title: "Economic Downturn", description: "Tech sector valuations decline significantly.", effect: "Growth decreases by 15%.", pillarEffects: {}, profitEffect: -15 },
    ],
    personas: [
      { id: "power", name: "Dev", role: "Power User", avatar: "D" },
      { id: "privacy", name: "Sam", role: "Privacy-Conscious User", avatar: "S" },
      { id: "casual", name: "Chris", role: "Casual User", avatar: "C" },
    ],
    feedback: {
      1: {
        high: ["Rock solid reliability - I depend on this every day.", "Performance is incredible, never had an issue.", "I trust my data is secure here."],
        medium: ["Usually works fine, occasional hiccups.", "Performance is acceptable for what I pay.", "Security seems okay, I hope."],
        low: ["Constant crashes and downtime.", "Too slow to be useful.", "I do not trust this with my data."],
      },
      2: {
        high: ["They actually respect my privacy - rare these days.", "Complete transparency about how my data is used.", "AI features are helpful without being creepy."],
        medium: ["Privacy policy is standard, nothing special.", "I am not sure what they do with my data.", "The AI recommendations are hit or miss."],
        low: ["They clearly sell my data everywhere.", "No idea what happens to my information.", "The AI feels invasive and manipulative."],
      },
      3: {
        high: ["Love the tools that help me use this healthily.", "Truly accessible - works great with my needs.", "They care about impact on wellbeing."],
        medium: ["Some wellness features, but limited.", "Accessibility is okay but not great.", "They do not seem to care about overuse."],
        low: ["This app is designed to be addictive.", "Completely inaccessible for my needs.", "They profit from unhealthy usage."],
      },
      4: {
        high: ["Best support I have ever experienced.", "Love being part of this community.", "They actually listen to user feedback."],
        medium: ["Support is adequate when I can reach them.", "Community exists but is not very active.", "They sometimes implement user suggestions."],
        low: ["Support is nonexistent.", "No sense of community at all.", "They never listen to users."],
      },
    },
    insights: [
      "Uptime and reliability are foundational trust requirements.",
      "Privacy scandals spread faster than any other trust issue.",
      "Digital wellbeing features build long-term user loyalty.",
      "Community investment creates advocates who defend you.",
      "Transparency about AI builds trust in an age of suspicion.",
      "Security breaches affect entire industries - prepare accordingly.",
      "Developer ecosystems create sticky, trusting relationships.",
      "User feedback loops demonstrate respect and build trust.",
    ],
    welcomeMessage: "Build trust in your technology platform through reliability, privacy, and user focus.",
    goalDescription: "Create the most trusted tech platform while maintaining sustainable growth.",
  },
};

export const getPreset = (id: string): IndustryPreset => {
  return industryPresets[id] || industryPresets.generic;
};

export const getPresetList = () => {
  return Object.values(industryPresets).map(({ id, name, description, icon }) => ({
    id,
    name,
    description,
    icon,
  }));
};
