export interface Initiative {
  id: number;
  title: string;
  description: string;
  cost: number;
  effects: {
    credibility?: number;
    reliability?: number;
    intimacy?: number;
    selfOrientation?: number;
    profit?: number;
  };
  tempting?: boolean; // High profit but increases self-orientation
}

export interface Challenge {
  title: string;
  description: string;
  dimension: "credibility" | "reliability" | "intimacy" | "selfOrientation";
  effect: number;
  profitEffect?: number;
  customerEffect?: number;
}

export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  weights: {
    credibility: number;
    reliability: number;
    intimacy: number;
  };
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
  initiatives: Initiative[];
  challenges: Challenge[];
  personas: CustomerPersona[];
  feedback: {
    credibility: FeedbackSet;
    reliability: FeedbackSet;
    intimacy: FeedbackSet;
    selfOrientation: FeedbackSet;
  };
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
    initiatives: [
      // Credibility builders
      { id: 1, title: "Expert Certification", description: "Achieve recognized industry certifications and qualifications.", cost: 3, effects: { credibility: 12, profit: -5 } },
      { id: 2, title: "Thought Leadership", description: "Publish research and speak at industry conferences.", cost: 2, effects: { credibility: 8, profit: -3 } },
      { id: 3, title: "Transparent Reporting", description: "Publish detailed performance metrics and outcomes.", cost: 2, effects: { credibility: 10, selfOrientation: -2, profit: -4 } },
      { id: 4, title: "Third-Party Audits", description: "Commission independent audits and publish results.", cost: 4, effects: { credibility: 15, profit: -8 } },
      
      // Reliability builders
      { id: 5, title: "Service Guarantee", description: "Implement iron-clad service level guarantees with penalties.", cost: 3, effects: { reliability: 12, profit: -6 } },
      { id: 6, title: "Consistent Processes", description: "Document and standardize all customer-facing processes.", cost: 2, effects: { reliability: 8, profit: -2 } },
      { id: 7, title: "Proactive Communication", description: "Always update stakeholders before they need to ask.", cost: 2, effects: { reliability: 10, intimacy: 3, profit: -4 } },
      { id: 8, title: "Crisis Preparedness", description: "Develop and test comprehensive contingency plans.", cost: 3, effects: { reliability: 10, profit: -5 } },
      
      // Intimacy builders
      { id: 9, title: "Deep Listening Program", description: "Structured programs to truly understand stakeholder needs.", cost: 2, effects: { intimacy: 12, profit: -3 } },
      { id: 10, title: "Personalized Service", description: "Tailor interactions to individual stakeholder contexts.", cost: 3, effects: { intimacy: 10, profit: -5 } },
      { id: 11, title: "Vulnerability & Honesty", description: "Admit mistakes openly and share challenges authentically.", cost: 1, effects: { intimacy: 8, credibility: 3, selfOrientation: -3, profit: -2 } },
      { id: 12, title: "Confidentiality Excellence", description: "Go above and beyond in protecting stakeholder information.", cost: 2, effects: { intimacy: 10, profit: -4 } },
      
      // Self-orientation reducers (costly but powerful)
      { id: 13, title: "Customer-First Policy", description: "Formally prioritize customer outcomes over short-term profit.", cost: 3, effects: { selfOrientation: -8, profit: -10 } },
      { id: 14, title: "Fair Pricing Review", description: "Audit and adjust pricing to ensure genuine value.", cost: 2, effects: { selfOrientation: -5, profit: -8 } },
      { id: 15, title: "Long-Term Partnerships", description: "Shift from transactional to relationship-based engagement.", cost: 2, effects: { selfOrientation: -4, intimacy: 5, profit: -5 } },
      
      // Tempting options - high profit but increase self-orientation
      { id: 16, title: "Premium Upselling", description: "Aggressive cross-selling and upselling programs.", cost: 1, effects: { selfOrientation: 6, profit: 15 }, tempting: true },
      { id: 17, title: "Cost Optimization", description: "Cut service costs to improve margins.", cost: 1, effects: { selfOrientation: 4, reliability: -3, profit: 12 }, tempting: true },
      { id: 18, title: "Marketing Spin", description: "Emphasize positives, downplay limitations in messaging.", cost: 1, effects: { selfOrientation: 5, credibility: -2, profit: 8 }, tempting: true },
    ],
    challenges: [
      { title: "Expertise Questioned", description: "Media questions your qualifications and competence.", dimension: "credibility", effect: -12 },
      { title: "Service Failure", description: "A major service outage affects many stakeholders.", dimension: "reliability", effect: -15 },
      { title: "Data Breach", description: "Stakeholder data is compromised in a security incident.", dimension: "intimacy", effect: -18 },
      { title: "Profit Scandal", description: "Leaked documents reveal profit was prioritized over stakeholders.", dimension: "selfOrientation", effect: 10 },
      { title: "Competitor Collapse", description: "A competitor fails, stakeholders seek reliable alternatives.", dimension: "reliability", effect: 5, customerEffect: 10 },
      { title: "Industry Recognition", description: "Your expertise is recognized with a prestigious award.", dimension: "credibility", effect: 8 },
      { title: "Economic Pressure", description: "Market conditions pressure you to cut costs.", dimension: "selfOrientation", effect: 3, profitEffect: -15 },
      { title: "Stakeholder Testimonial", description: "A prominent stakeholder publicly praises your relationship.", dimension: "intimacy", effect: 8, customerEffect: 5 },
    ],
    personas: [
      { id: "analytical", name: "Alex", role: "Analytical Stakeholder", avatar: "A", weights: { credibility: 0.5, reliability: 0.3, intimacy: 0.2 } },
      { id: "relational", name: "Jordan", role: "Relationship-Focused", avatar: "J", weights: { credibility: 0.2, reliability: 0.3, intimacy: 0.5 } },
      { id: "pragmatic", name: "Morgan", role: "Pragmatic Partner", avatar: "M", weights: { credibility: 0.3, reliability: 0.5, intimacy: 0.2 } },
    ],
    feedback: {
      credibility: {
        high: ["Their expertise is genuinely world-class. I trust their judgment completely.", "Everything they claim checks out. No exaggeration, no spin.", "They really know their stuff - I learn something every interaction."],
        medium: ["They seem competent enough, though I sometimes wonder about depth.", "Their credentials look fine, but I have not seen them truly tested.", "Knowledgeable, but not distinctively so."],
        low: ["I am not convinced they really know what they are doing.", "Their claims do not match what I have observed.", "I question whether they have the expertise they project."],
      },
      reliability: {
        high: ["Like clockwork. I never have to wonder or follow up.", "They do what they say, every single time. It is remarkable.", "I can plan around their commitments with complete confidence."],
        medium: ["Usually reliable, with occasional hiccups.", "They generally deliver, though sometimes need reminding.", "Reasonably dependable, nothing exceptional."],
        low: ["I have learned to always have a backup plan.", "Promises seem to be more aspirational than actual.", "Following up has become a part-time job."],
      },
      intimacy: {
        high: ["They truly understand our situation. I can be completely candid.", "I feel genuinely cared for, not just processed.", "They remember details I have forgotten myself. It is personal."],
        medium: ["Professional and pleasant, though somewhat transactional.", "They listen, though I am not sure how deeply.", "Cordial relationship, but I keep some things back."],
        low: ["I feel like a number, not a person.", "Sharing anything sensitive feels risky.", "They go through the motions but there is no real connection."],
      },
      selfOrientation: {
        high: ["Everything feels designed to extract maximum value from me.", "I constantly wonder what is in it for them.", "The relationship feels one-sided - in their favor."],
        medium: ["They balance their interests with mine reasonably.", "Commercial but not exploitative.", "I understand they need to profit, and it feels fair."],
        low: ["They genuinely seem to put my interests first.", "I have seen them sacrifice short-term gain for my benefit.", "Rare to find an organization this genuinely client-focused."],
      },
    },
    insights: [
      "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
      "You can excel in all three numerators, but high self-orientation divides it all away.",
      "Credibility is what you know. Reliability is doing what you say. Intimacy is how safe people feel.",
      "Self-orientation is the silent killer - stakeholders sense it even when you hide it.",
      "Short-term profit grabs often cost more in trust than they gain in revenue.",
      "Recovering from self-orientation perception is harder than building the other three.",
      "Different stakeholders weight the dimensions differently - know your audience.",
      "Consistency in reliability beats occasional excellence.",
    ],
    welcomeMessage: "Build genuine trust using the Trust Equation: (Credibility + Reliability + Intimacy) / Self-Orientation.",
    goalDescription: "Maximize trust by building C, R, and I while keeping self-orientation low.",
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
    initiatives: [
      // Credibility
      { id: 1, title: "Regulatory Excellence", description: "Exceed compliance requirements and publicize your record.", cost: 3, effects: { credibility: 12, profit: -6 } },
      { id: 2, title: "Financial Education", description: "Offer free financial literacy resources to clients.", cost: 2, effects: { credibility: 8, selfOrientation: -3, profit: -4 } },
      { id: 3, title: "Performance Transparency", description: "Publish detailed, honest performance data including losses.", cost: 2, effects: { credibility: 10, profit: -3 } },
      { id: 4, title: "Expert Advisory Team", description: "Hire and showcase credentialed financial experts.", cost: 4, effects: { credibility: 15, profit: -10 } },
      
      // Reliability
      { id: 5, title: "Instant Access Guarantee", description: "Guarantee immediate access to funds with no delays.", cost: 3, effects: { reliability: 12, profit: -8 } },
      { id: 6, title: "Proactive Alerts", description: "Notify clients of issues before they discover them.", cost: 2, effects: { reliability: 10, intimacy: 3, profit: -4 } },
      { id: 7, title: "System Redundancy", description: "Invest in bulletproof infrastructure with 99.99% uptime.", cost: 4, effects: { reliability: 15, profit: -12 } },
      { id: 8, title: "Consistent Experience", description: "Same quality service across all channels and touchpoints.", cost: 2, effects: { reliability: 8, profit: -4 } },
      
      // Intimacy
      { id: 9, title: "Dedicated Advisors", description: "Assign personal advisors who truly know each client.", cost: 3, effects: { intimacy: 12, profit: -6 } },
      { id: 10, title: "Life Stage Support", description: "Proactively help clients through major life transitions.", cost: 2, effects: { intimacy: 10, selfOrientation: -2, profit: -5 } },
      { id: 11, title: "Hardship Programs", description: "Genuine support for clients facing financial difficulty.", cost: 3, effects: { intimacy: 12, selfOrientation: -5, profit: -10 } },
      { id: 12, title: "Privacy Excellence", description: "Industry-leading data protection and discretion.", cost: 2, effects: { intimacy: 8, profit: -4 } },
      
      // Self-orientation reducers
      { id: 13, title: "Fee Simplification", description: "Eliminate hidden fees and simplify pricing radically.", cost: 2, effects: { selfOrientation: -8, profit: -12 } },
      { id: 14, title: "Fiduciary Commitment", description: "Legally commit to putting client interests first.", cost: 3, effects: { selfOrientation: -10, credibility: 5, profit: -8 } },
      { id: 15, title: "Unsuitable Product Refusal", description: "Actively refuse to sell products that do not fit client needs.", cost: 2, effects: { selfOrientation: -6, profit: -10 } },
      
      // Tempting
      { id: 16, title: "Complex Products", description: "Sell high-margin complex products most clients do not understand.", cost: 1, effects: { selfOrientation: 8, profit: 20 }, tempting: true },
      { id: 17, title: "Penalty Optimization", description: "Restructure fees to maximize penalty and late payment revenue.", cost: 1, effects: { selfOrientation: 6, reliability: -2, profit: 15 }, tempting: true },
      { id: 18, title: "Aggressive Sales Targets", description: "Push advisors to meet volume targets over suitability.", cost: 1, effects: { selfOrientation: 7, intimacy: -3, profit: 18 }, tempting: true },
    ],
    challenges: [
      { title: "Market Crash", description: "Market downturn tests your advice and client relationships.", dimension: "credibility", effect: -10, profitEffect: -20 },
      { title: "System Outage", description: "Critical systems go down during high-activity period.", dimension: "reliability", effect: -15 },
      { title: "Data Breach", description: "Client financial data is exposed in a security incident.", dimension: "intimacy", effect: -18 },
      { title: "Fee Scandal", description: "Media exposes industry-wide hidden fee practices.", dimension: "selfOrientation", effect: 8 },
      { title: "Competitor Collapse", description: "A competitor fails, clients seek stability.", dimension: "reliability", effect: 6, customerEffect: 12 },
      { title: "Regulatory Praise", description: "Regulators publicly commend your compliance standards.", dimension: "credibility", effect: 10 },
      { title: "Interest Rate Shock", description: "Sudden rate changes pressure margins.", dimension: "selfOrientation", effect: 4, profitEffect: -15 },
      { title: "Client Success Story", description: "A client publicly credits you with their financial security.", dimension: "intimacy", effect: 10, customerEffect: 5 },
    ],
    personas: [
      { id: "hnw", name: "Patricia", role: "High-Net-Worth Client", avatar: "P", weights: { credibility: 0.4, reliability: 0.3, intimacy: 0.3 } },
      { id: "retail", name: "Marcus", role: "Retail Client", avatar: "M", weights: { credibility: 0.3, reliability: 0.4, intimacy: 0.3 } },
      { id: "business", name: "Diana", role: "Business Owner", avatar: "D", weights: { credibility: 0.35, reliability: 0.45, intimacy: 0.2 } },
    ],
    feedback: {
      credibility: {
        high: ["Their financial expertise is exceptional. I trust their market insights completely.", "Every recommendation has been well-researched and sound.", "They understand finance deeply, not just product features."],
        medium: ["They seem to know the products, less sure about broader strategy.", "Competent but I cross-check their advice.", "Adequate expertise for my basic needs."],
        low: ["Their advice has cost me money. I question their competence.", "They push products without understanding my situation.", "I know more than some of their advisors."],
      },
      reliability: {
        high: ["My money is always accessible, systems always work.", "They have never missed a commitment in years.", "I sleep well knowing they are handling my finances."],
        medium: ["Usually reliable, occasional delays on complex requests.", "Systems work most of the time.", "Adequate but not exceptional dependability."],
        low: ["Transactions fail, promises are broken.", "I have learned to keep backup accounts elsewhere.", "Their systems seem held together with tape."],
      },
      intimacy: {
        high: ["My advisor knows my family situation, my goals, my fears.", "They proactively reach out when life events happen.", "I would tell them things I would not tell other financial providers."],
        medium: ["Professional relationship, appropriate boundaries.", "They know my account, not really me.", "Functional but not personal."],
        low: ["I am an account number to them.", "Turnover means starting over every time.", "No sense that they care about my actual life."],
      },
      selfOrientation: {
        high: ["Every interaction feels like a sales pitch.", "Fees appear everywhere, always in their favor.", "They optimize for their revenue, not my outcomes."],
        medium: ["Commercial relationship with fair terms.", "They need to profit, I accept that.", "Reasonable balance of interests."],
        low: ["They have actually talked me out of products that would have made them money.", "Fees are transparent and fair.", "I genuinely believe they put my interests first."],
      },
    },
    insights: [
      "In finance, self-orientation destroys trust faster than anywhere else.",
      "Clients remember how you treated them during market downturns.",
      "Transparency about losses builds more credibility than hiding them.",
      "Reliability in finance means money access when needed, period.",
      "Complex products often signal self-orientation over client interest.",
      "The best clients come from referrals - trust compounds.",
      "Regulatory compliance is baseline credibility, not differentiator.",
      "Intimacy in finance means understanding life goals, not just risk tolerance.",
    ],
    welcomeMessage: "Build a trusted financial institution using the Trust Equation.",
    goalDescription: "Maximize client trust while resisting the temptation of high-margin but trust-destroying products.",
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
    initiatives: [
      // Credibility
      { id: 1, title: "Clinical Excellence Program", description: "Invest in top-tier clinical training and certifications.", cost: 4, effects: { credibility: 15, profit: -10 } },
      { id: 2, title: "Outcomes Transparency", description: "Publish detailed clinical outcomes including complications.", cost: 2, effects: { credibility: 12, profit: -3 } },
      { id: 3, title: "Research Partnership", description: "Partner with academic institutions on clinical research.", cost: 3, effects: { credibility: 10, profit: -6 } },
      { id: 4, title: "Evidence-Based Protocols", description: "Implement and publicize rigorous evidence-based care protocols.", cost: 2, effects: { credibility: 8, reliability: 3, profit: -4 } },
      
      // Reliability
      { id: 5, title: "Care Coordination", description: "Seamless handoffs and follow-through across all care stages.", cost: 3, effects: { reliability: 12, profit: -6 } },
      { id: 6, title: "Appointment Guarantee", description: "Guaranteed timely appointments with minimal wait times.", cost: 3, effects: { reliability: 10, profit: -8 } },
      { id: 7, title: "24/7 Access", description: "Round-the-clock access to care and clinical advice.", cost: 4, effects: { reliability: 12, intimacy: 3, profit: -10 } },
      { id: 8, title: "Medication Safety System", description: "Implement comprehensive medication error prevention.", cost: 3, effects: { reliability: 10, credibility: 3, profit: -5 } },
      
      // Intimacy
      { id: 9, title: "Patient Advocates", description: "Dedicated advocates to guide patients through care journey.", cost: 3, effects: { intimacy: 12, profit: -6 } },
      { id: 10, title: "Whole-Person Care", description: "Address emotional and social needs, not just clinical.", cost: 2, effects: { intimacy: 10, profit: -4 } },
      { id: 11, title: "Family Inclusion", description: "Meaningfully involve families in care decisions and support.", cost: 2, effects: { intimacy: 10, profit: -3 } },
      { id: 12, title: "Dignity Standards", description: "Rigorous training on maintaining patient dignity always.", cost: 2, effects: { intimacy: 8, profit: -3 } },
      
      // Self-orientation reducers
      { id: 13, title: "Unnecessary Care Reduction", description: "Actively reduce tests and procedures that do not add value.", cost: 2, effects: { selfOrientation: -8, credibility: 3, profit: -15 } },
      { id: 14, title: "Price Transparency", description: "Clear, upfront pricing before any treatment.", cost: 2, effects: { selfOrientation: -6, profit: -8 } },
      { id: 15, title: "Community Benefit Focus", description: "Prioritize community health over facility profits.", cost: 3, effects: { selfOrientation: -8, intimacy: 3, profit: -12 } },
      
      // Tempting
      { id: 16, title: "Facility Fees", description: "Add facility fees to maximize reimbursement per visit.", cost: 1, effects: { selfOrientation: 7, profit: 18 }, tempting: true },
      { id: 17, title: "Defensive Medicine", description: "Order extra tests primarily to reduce liability.", cost: 1, effects: { selfOrientation: 5, credibility: -2, profit: 12 }, tempting: true },
      { id: 18, title: "High-Margin Specialties", description: "Steer investment toward profitable specialties over community needs.", cost: 1, effects: { selfOrientation: 6, profit: 15 }, tempting: true },
    ],
    challenges: [
      { title: "Medical Error", description: "A serious medical error becomes public.", dimension: "credibility", effect: -15 },
      { title: "Care Delays", description: "System bottlenecks cause dangerous care delays.", dimension: "reliability", effect: -12 },
      { title: "Privacy Breach", description: "Patient medical records are exposed.", dimension: "intimacy", effect: -18 },
      { title: "Billing Scandal", description: "Media exposes aggressive billing practices.", dimension: "selfOrientation", effect: 12 },
      { title: "Pandemic Response", description: "Public health crisis tests your entire system.", dimension: "reliability", effect: -8, profitEffect: -20 },
      { title: "Clinical Breakthrough", description: "Your team achieves a notable clinical success.", dimension: "credibility", effect: 12, customerEffect: 8 },
      { title: "Staff Shortages", description: "Healthcare worker shortage strains capacity.", dimension: "reliability", effect: -8, profitEffect: -10 },
      { title: "Patient Testimonial", description: "A patient shares a powerful story of compassionate care.", dimension: "intimacy", effect: 10, customerEffect: 5 },
    ],
    personas: [
      { id: "chronic", name: "Robert", role: "Chronic Care Patient", avatar: "R", weights: { credibility: 0.35, reliability: 0.35, intimacy: 0.3 } },
      { id: "parent", name: "Lisa", role: "Parent of Young Children", avatar: "L", weights: { credibility: 0.4, reliability: 0.3, intimacy: 0.3 } },
      { id: "elderly", name: "Eleanor", role: "Elderly Patient", avatar: "E", weights: { credibility: 0.3, reliability: 0.3, intimacy: 0.4 } },
    ],
    feedback: {
      credibility: {
        high: ["The clinical expertise here is outstanding. I trust my care completely.", "They stay current with the latest research and treatments.", "I have complete confidence in their medical judgment."],
        medium: ["Doctors seem competent, though I sometimes seek second opinions.", "Adequate clinical care, nothing exceptional.", "They follow standard protocols well enough."],
        low: ["I have experienced errors that shook my confidence.", "Their knowledge seems outdated.", "I research everything before accepting their recommendations."],
      },
      reliability: {
        high: ["Appointments run on time, follow-ups happen, nothing falls through cracks.", "The care coordination is seamless.", "I never worry about something being missed."],
        medium: ["Usually reliable, some waits and occasional mix-ups.", "Have to follow up sometimes to ensure things happen.", "Functional but with friction."],
        low: ["Appointments are delayed, tests get lost, chaos is normal.", "I have to manage my own care coordination.", "The system feels broken."],
      },
      intimacy: {
        high: ["They see me as a person, not a diagnosis.", "The care and compassion are genuine.", "I feel truly heard and understood."],
        medium: ["Professional and polite, somewhat impersonal.", "Efficient but not warm.", "Clinical competence without emotional connection."],
        low: ["I feel processed, not cared for.", "No one seems to know my story.", "The human element is completely missing."],
      },
      selfOrientation: {
        high: ["Every visit generates more bills than seems necessary.", "They push treatments I am not sure I need.", "Profit clearly drives decisions more than my health."],
        medium: ["Reasonable balance of business and care.", "I understand they have financial pressures.", "Not exploitative but not selfless either."],
        low: ["They have actually recommended less expensive alternatives.", "Patient outcomes clearly come first.", "I never feel like a revenue source."],
      },
    },
    insights: [
      "In healthcare, credibility failures can be literally life-threatening.",
      "Patients remember how they were treated when vulnerable.",
      "Unnecessary procedures are the biggest self-orientation signal.",
      "Reliability in healthcare means no dropped handoffs, ever.",
      "Intimacy matters more in healthcare than almost any other sector.",
      "Transparency about errors, handled well, can actually build trust.",
      "Family experience shapes patient trust as much as direct care.",
      "Price transparency signals low self-orientation powerfully.",
    ],
    welcomeMessage: "Build a trusted healthcare organization using the Trust Equation.",
    goalDescription: "Maximize patient trust while navigating the tension between outcomes and financial sustainability.",
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
    initiatives: [
      // Credibility
      { id: 1, title: "Security Certifications", description: "Achieve SOC2, ISO 27001, and publicize audit results.", cost: 4, effects: { credibility: 15, profit: -10 } },
      { id: 2, title: "Open Source Core", description: "Open source key components for community verification.", cost: 3, effects: { credibility: 12, selfOrientation: -3, profit: -6 } },
      { id: 3, title: "Technical Transparency", description: "Publish detailed technical architecture and decision rationale.", cost: 2, effects: { credibility: 10, profit: -3 } },
      { id: 4, title: "Bug Bounty Program", description: "Invite security researchers to find and report vulnerabilities.", cost: 2, effects: { credibility: 8, profit: -4 } },
      
      // Reliability
      { id: 5, title: "99.99% SLA", description: "Commit to and deliver exceptional uptime guarantees.", cost: 4, effects: { reliability: 15, profit: -12 } },
      { id: 6, title: "Public Status Page", description: "Real-time, honest system status with incident history.", cost: 2, effects: { reliability: 10, credibility: 3, profit: -2 } },
      { id: 7, title: "Graceful Degradation", description: "Systems that fail gracefully, never catastrophically.", cost: 3, effects: { reliability: 10, profit: -6 } },
      { id: 8, title: "Instant Rollback", description: "Ability to instantly revert any problematic update.", cost: 2, effects: { reliability: 8, profit: -4 } },
      
      // Intimacy
      { id: 9, title: "Human Support", description: "Real humans available, not just chatbots and articles.", cost: 3, effects: { intimacy: 12, profit: -8 } },
      { id: 10, title: "User Research Integration", description: "Deeply involve users in product development.", cost: 2, effects: { intimacy: 10, selfOrientation: -2, profit: -4 } },
      { id: 11, title: "Data Portability", description: "Make it easy for users to export all their data anytime.", cost: 2, effects: { intimacy: 8, selfOrientation: -4, profit: -5 } },
      { id: 12, title: "Privacy-First Design", description: "Minimize data collection, maximize user control.", cost: 3, effects: { intimacy: 12, selfOrientation: -3, profit: -8 } },
      
      // Self-orientation reducers
      { id: 13, title: "No Dark Patterns", description: "Eliminate all manipulative UX designed to trick users.", cost: 2, effects: { selfOrientation: -10, profit: -10 } },
      { id: 14, title: "Transparent Pricing", description: "Simple, honest pricing with no surprise charges.", cost: 1, effects: { selfOrientation: -5, profit: -6 } },
      { id: 15, title: "User-Aligned Metrics", description: "Optimize for user success, not engagement time.", cost: 2, effects: { selfOrientation: -6, intimacy: 3, profit: -8 } },
      
      // Tempting
      { id: 16, title: "Engagement Optimization", description: "Use psychology to maximize addictive usage patterns.", cost: 1, effects: { selfOrientation: 8, profit: 20 }, tempting: true },
      { id: 17, title: "Data Monetization", description: "Sell user data and behavioral insights to third parties.", cost: 1, effects: { selfOrientation: 10, intimacy: -5, profit: 25 }, tempting: true },
      { id: 18, title: "Switching Costs", description: "Design lock-in that makes leaving difficult.", cost: 1, effects: { selfOrientation: 7, reliability: -2, profit: 15 }, tempting: true },
    ],
    challenges: [
      { title: "Security Breach", description: "A significant security vulnerability is exploited.", dimension: "credibility", effect: -15 },
      { title: "Major Outage", description: "Extended downtime affects millions of users.", dimension: "reliability", effect: -18 },
      { title: "Privacy Scandal", description: "Improper data handling practices are exposed.", dimension: "intimacy", effect: -15 },
      { title: "Enshittification", description: "Users notice the product getting worse as you extract more value.", dimension: "selfOrientation", effect: 12 },
      { title: "Competitor Breach", description: "A competitor suffers a major breach, users seek alternatives.", dimension: "credibility", effect: 5, customerEffect: 10 },
      { title: "Viral Success", description: "Genuine user enthusiasm creates organic growth.", dimension: "intimacy", effect: 8, customerEffect: 15 },
      { title: "VC Pressure", description: "Investors pressure for faster monetization.", dimension: "selfOrientation", effect: 5, profitEffect: -10 },
      { title: "Open Source Win", description: "Your open source contribution is widely adopted.", dimension: "credibility", effect: 10, customerEffect: 5 },
    ],
    personas: [
      { id: "developer", name: "Dev", role: "Developer User", avatar: "D", weights: { credibility: 0.45, reliability: 0.35, intimacy: 0.2 } },
      { id: "privacy", name: "Sam", role: "Privacy-Conscious User", avatar: "S", weights: { credibility: 0.3, reliability: 0.25, intimacy: 0.45 } },
      { id: "business", name: "Chris", role: "Business User", avatar: "C", weights: { credibility: 0.3, reliability: 0.5, intimacy: 0.2 } },
    ],
    feedback: {
      credibility: {
        high: ["Their security practices are genuinely best-in-class.", "The technical team clearly knows what they are doing.", "I trust their architecture and engineering decisions."],
        medium: ["Seems secure enough, though I have not verified deeply.", "Standard tech company competence.", "They follow basic best practices."],
        low: ["Their security claims do not match their actions.", "I have seen too many bugs to trust the underlying quality.", "Would not trust them with sensitive data."],
      },
      reliability: {
        high: ["Rock solid. I have never experienced unexpected downtime.", "Their status page is honest and updates are smooth.", "I build critical workflows on this without worry."],
        medium: ["Mostly reliable, occasional hiccups.", "Uptime is acceptable for the price.", "Have had a few frustrating outages."],
        low: ["Downtime is regular and unpredictable.", "I have lost work due to their instability.", "Cannot rely on this for anything important."],
      },
      intimacy: {
        high: ["They clearly respect my privacy and data.", "Support is human and actually helpful.", "I feel like my feedback genuinely matters."],
        medium: ["Standard data practices, nothing concerning.", "Support exists but is impersonal.", "They listen sometimes."],
        low: ["I feel like the product, not the customer.", "My data is clearly being exploited.", "Impossible to talk to a human."],
      },
      selfOrientation: {
        high: ["Every update makes the product worse for me and better for their metrics.", "Dark patterns everywhere.", "They clearly optimize for their growth, not my success."],
        medium: ["Normal commercial product dynamics.", "They need to make money, I get it.", "Fair value exchange."],
        low: ["They actively help me use less when that is best for me.", "No manipulative patterns.", "Genuinely aligned with my interests."],
      },
    },
    insights: [
      "In tech, enshittification is the visible face of rising self-orientation.",
      "Uptime and reliability are table stakes - failures are remembered forever.",
      "Privacy is intimacy in the digital world.",
      "Dark patterns are self-orientation made visible.",
      "Developer trust is earned through transparency and documentation.",
      "Data portability signals low self-orientation powerfully.",
      "Security credibility takes years to build and moments to destroy.",
      "Engagement metrics can mask growing self-orientation.",
    ],
    welcomeMessage: "Build a trusted technology platform using the Trust Equation.",
    goalDescription: "Maximize user trust while resisting the temptation to exploit attention and data.",
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
