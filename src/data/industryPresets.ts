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
    customers?: number;
  };
  category: "investment" | "trade-off" | "necessary" | "tempting";
  tags?: string[];
}

export interface ChallengeOption {
  label: string;
  effects: {
    credibility?: number;
    reliability?: number;
    intimacy?: number;
    selfOrientation?: number;
    profit?: number;
    customers?: number;
  };
}

export interface Challenge {
  title: string;
  description: string;
  dimension: "credibility" | "reliability" | "intimacy" | "selfOrientation";
  effect: number;
  profitEffect?: number;
  customerEffect?: number;
  // New: some challenges offer choices
  options?: ChallengeOption[];
  // New: some challenges are triggered by game state
  trigger?: {
    condition: "low_reliability" | "high_self_orientation" | "low_profit" | "high_trust" | "random";
    threshold?: number;
  };
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
      // === INVESTMENTS: Good but expensive ===
      { id: 1, title: "Expert Certification", description: "Industry certifications and qualifications. Credible but costly.", cost: 4, effects: { credibility: 10, profit: -8 }, category: "investment" },
      { id: 2, title: "Service Guarantee", description: "Iron-clad SLA with penalties. Reliable but risky.", cost: 4, effects: { reliability: 10, profit: -10 }, category: "investment" },
      { id: 3, title: "Dedicated Account Managers", description: "Personal relationships. Intimate but expensive to scale.", cost: 4, effects: { intimacy: 10, profit: -8 }, category: "investment" },
      { id: 4, title: "Customer-First Policy", description: "Formally prioritize customer outcomes. Expensive but reduces self-orientation.", cost: 5, effects: { selfOrientation: -8, profit: -15 }, category: "investment" },
      
      // === TRADE-OFFS: Mixed effects, not obviously good or bad ===
      { id: 10, title: "Standardize Processes", description: "More consistent but less personal. Efficiency vs intimacy.", cost: 2, effects: { reliability: 6, intimacy: -4, profit: 5 }, category: "trade-off" },
      { id: 11, title: "Aggressive Hiring", description: "Scale fast but quality may slip. Growth vs reliability.", cost: 3, effects: { reliability: -5, profit: 8, customers: 10 }, category: "trade-off" },
      { id: 12, title: "Marketing Campaign", description: "Raise profile but seems self-promotional.", cost: 3, effects: { credibility: 4, selfOrientation: 4, profit: 6 }, category: "trade-off" },
      { id: 13, title: "Premium Tier Launch", description: "Better margins but may seem elitist.", cost: 3, effects: { selfOrientation: 3, intimacy: -2, profit: 12 }, category: "trade-off" },
      { id: 14, title: "AI-Powered Support", description: "24/7 availability but less human touch.", cost: 3, effects: { reliability: 5, intimacy: -6, profit: 4 }, category: "trade-off" },
      { id: 15, title: "Transparent Pricing", description: "Builds trust but reveals margins.", cost: 2, effects: { selfOrientation: -5, credibility: 3, profit: -8 }, category: "trade-off" },
      { id: 16, title: "Partner Network", description: "Extended reach but shared responsibility.", cost: 2, effects: { credibility: -3, reliability: -2, profit: 10 }, category: "trade-off" },
      { id: 17, title: "Fast-Track Delivery", description: "Speed vs thoroughness.", cost: 3, effects: { reliability: 4, credibility: -3, profit: 5 }, category: "trade-off" },
      
      // === NECESSARY EVILS: Things you have to do to survive ===
      { id: 20, title: "Annual Price Increase", description: "Match inflation. Stakeholders won't like it but margins need it.", cost: 1, effects: { selfOrientation: 4, intimacy: -3, profit: 15 }, category: "necessary" },
      { id: 21, title: "Cost Cutting Round", description: "Reduce overhead. Service quality may suffer.", cost: 1, effects: { reliability: -4, intimacy: -2, profit: 12 }, category: "necessary" },
      { id: 22, title: "Outsource Support", description: "Cheaper support but less control.", cost: 1, effects: { reliability: -3, intimacy: -5, profit: 10 }, category: "necessary" },
      { id: 23, title: "Reduce Free Tier", description: "Convert freeloaders. Seems grabby but financially necessary.", cost: 1, effects: { selfOrientation: 5, profit: 10 }, category: "necessary" },
      { id: 24, title: "Staff Restructuring", description: "Let people go to maintain viability.", cost: 1, effects: { reliability: -3, intimacy: -4, credibility: -2, profit: 15 }, category: "necessary" },
      { id: 25, title: "Delay Feature Release", description: "Push back promises to focus on stability.", cost: 1, effects: { credibility: -4, reliability: 3, profit: -3 }, category: "necessary" },
      
      // === TEMPTING: High short-term gain, significant trust cost ===
      { id: 30, title: "Aggressive Upselling", description: "Push upgrades hard. Great margins, feels pushy.", cost: 1, effects: { selfOrientation: 8, intimacy: -4, profit: 20 }, category: "tempting" },
      { id: 31, title: "Hidden Renewal Terms", description: "Auto-renew with buried terms. Profitable but shady.", cost: 1, effects: { selfOrientation: 10, credibility: -3, profit: 18 }, category: "tempting" },
      { id: 32, title: "Overstate Capabilities", description: "Promise more than you can deliver. Wins deals, burns trust.", cost: 1, effects: { credibility: -5, selfOrientation: 6, profit: 15 }, category: "tempting" },
      { id: 33, title: "Rush to Market", description: "Ship before ready. First-mover advantage vs quality.", cost: 2, effects: { reliability: -8, profit: 20 }, category: "tempting" },
      { id: 34, title: "Ignore Edge Cases", description: "Focus on mainstream, neglect difficult situations.", cost: 1, effects: { intimacy: -6, selfOrientation: 4, profit: 10 }, category: "tempting" },
      { id: 35, title: "Spin Bad News", description: "Minimize negative disclosures. Protects stock, erodes credibility.", cost: 1, effects: { credibility: -6, selfOrientation: 5, profit: 8 }, category: "tempting" },
    ],
    challenges: [
      // === RANDOM EVENTS ===
      { title: "Competitor Collapse", description: "A competitor fails. Stakeholders seek alternatives.", dimension: "reliability", effect: 3, customerEffect: 15, trigger: { condition: "random" } },
      { title: "Industry Recognition", description: "You win a respected industry award.", dimension: "credibility", effect: 8, trigger: { condition: "random" } },
      { title: "Viral Testimonial", description: "A stakeholder shares a glowing review that goes viral.", dimension: "intimacy", effect: 6, customerEffect: 10, trigger: { condition: "random" } },
      { title: "Market Downturn", description: "Economic conditions worsen. Everyone feels the pressure.", dimension: "selfOrientation", effect: 3, profitEffect: -20, trigger: { condition: "random" } },
      
      // === TRIGGERED BY STATE ===
      { title: "Service Failure Cascade", description: "Your reliability issues cause a visible failure.", dimension: "reliability", effect: -12, customerEffect: -8, trigger: { condition: "low_reliability", threshold: 35 } },
      { title: "Stakeholder Exodus", description: "Word spreads that you only care about yourself.", dimension: "selfOrientation", effect: 5, customerEffect: -15, trigger: { condition: "high_self_orientation", threshold: 55 } },
      { title: "Cash Flow Crisis", description: "Low margins force immediate cost cuts.", dimension: "reliability", effect: -5, profitEffect: -10, trigger: { condition: "low_profit", threshold: 50 } },
      { title: "Referral Surge", description: "High trust leads to organic growth.", dimension: "intimacy", effect: 3, customerEffect: 12, trigger: { condition: "high_trust", threshold: 55 } },
      
      // === FORCING DECISIONS ===
      { title: "Competitor Price War", description: "Competitor undercuts prices by 30%. Match or hold?",
        dimension: "selfOrientation", effect: 0,
        options: [
          { label: "Match prices", effects: { profit: -15, selfOrientation: -3, customers: 5 } },
          { label: "Hold firm", effects: { customers: -10, credibility: 2 } },
          { label: "Add value instead", effects: { profit: -8, reliability: 3, intimacy: 2 } }
        ]
      },
      { title: "Key Person Leaves", description: "Your best person just resigned. How do you respond?",
        dimension: "reliability", effect: -3,
        options: [
          { label: "Emergency hire (expensive)", effects: { profit: -12, reliability: 3 } },
          { label: "Redistribute work", effects: { reliability: -5, intimacy: -3 } },
          { label: "Promote from within", effects: { reliability: -2, intimacy: 4, credibility: -2 } }
        ]
      },
      { title: "Data Request", description: "A stakeholder asks for data that would expose weaknesses.",
        dimension: "credibility", effect: 0,
        options: [
          { label: "Full transparency", effects: { credibility: 5, selfOrientation: -4, profit: -5 } },
          { label: "Partial disclosure", effects: { credibility: -2, selfOrientation: 2 } },
          { label: "Decline politely", effects: { credibility: -5, intimacy: -3, selfOrientation: 4 } }
        ]
      },
      { title: "Big Client Opportunity", description: "A large client wants you, but demands you stretch capacity.",
        dimension: "selfOrientation", effect: 0,
        options: [
          { label: "Take it all", effects: { profit: 25, reliability: -8, selfOrientation: 5 } },
          { label: "Negotiate scope", effects: { profit: 12, reliability: -3 } },
          { label: "Decline respectfully", effects: { credibility: 3, selfOrientation: -4 } }
        ]
      },
      { title: "Regulatory Change", description: "New regulations require expensive compliance.",
        dimension: "credibility", effect: 0,
        options: [
          { label: "Full compliance", effects: { credibility: 5, profit: -15 } },
          { label: "Minimum compliance", effects: { credibility: -2, profit: -5 } },
          { label: "Fight the regulation", effects: { credibility: -4, selfOrientation: 6, profit: -8 } }
        ]
      },
      { title: "Mistake Discovered", description: "You find a significant error that stakeholders don't know about.",
        dimension: "credibility", effect: 0,
        options: [
          { label: "Proactive disclosure", effects: { credibility: 4, intimacy: 5, selfOrientation: -5, profit: -10 } },
          { label: "Fix quietly", effects: { selfOrientation: 4, profit: -3 } },
          { label: "Hope no one notices", effects: { selfOrientation: 6 } }
        ]
      },
    ],
    personas: [
      { id: "analytical", name: "Alex", role: "Analytical Stakeholder", avatar: "A", weights: { credibility: 0.5, reliability: 0.3, intimacy: 0.2 } },
      { id: "relational", name: "Jordan", role: "Relationship-Focused", avatar: "J", weights: { credibility: 0.2, reliability: 0.3, intimacy: 0.5 } },
      { id: "pragmatic", name: "Morgan", role: "Pragmatic Partner", avatar: "M", weights: { credibility: 0.3, reliability: 0.5, intimacy: 0.2 } },
    ],
    feedback: {
      credibility: {
        high: ["Their expertise is genuinely world-class. I trust their judgment completely.", "Everything they claim checks out. No exaggeration, no spin.", "They really know their stuff - I learn something every interaction."],
        medium: ["They seem competent enough, though I sometimes wonder about depth.", "Their credentials look fine, but I haven't seen them truly tested.", "Knowledgeable, but not distinctively so."],
        low: ["I'm not convinced they really know what they're doing.", "Their claims don't match what I've observed.", "I question whether they have the expertise they project."],
      },
      reliability: {
        high: ["Like clockwork. I never have to wonder or follow up.", "They do what they say, every single time. It's remarkable.", "I can plan around their commitments with complete confidence."],
        medium: ["Usually reliable, with occasional hiccups.", "They generally deliver, though sometimes need reminding.", "Reasonably dependable, nothing exceptional."],
        low: ["I've learned to always have a backup plan.", "Promises seem to be more aspirational than actual.", "Following up has become a part-time job."],
      },
      intimacy: {
        high: ["They truly understand our situation. I can be completely candid.", "I feel genuinely cared for, not just processed.", "They remember details I've forgotten myself. It's personal."],
        medium: ["Professional and pleasant, though somewhat transactional.", "They listen, though I'm not sure how deeply.", "Cordial relationship, but I keep some things back."],
        low: ["I feel like a number, not a person.", "Sharing anything sensitive feels risky.", "They go through the motions but there's no real connection."],
      },
      selfOrientation: {
        high: ["Everything feels designed to extract maximum value from me.", "I constantly wonder what's in it for them.", "The relationship feels one-sided - in their favor."],
        medium: ["They balance their interests with mine reasonably.", "Commercial but not exploitative.", "I understand they need to profit, and it feels fair."],
        low: ["They genuinely seem to put my interests first.", "I've seen them sacrifice short-term gain for my benefit.", "Rare to find an organization this genuinely client-focused."],
      },
    },
    insights: [
      "Trust = (Credibility + Reliability + Intimacy) / Self-Orientation",
      "You can excel in all three numerators, but high self-orientation divides it all away.",
      "Real business requires trade-offs - there are no purely good options.",
      "Necessary evils exist. The question is which ones and how often.",
      "Ignoring finances will destroy you as surely as ignoring trust.",
      "Tempting options are tempting for a reason. Know when to resist.",
      "Your state affects what happens - low reliability invites failures.",
      "Different stakeholders weight the dimensions differently.",
    ],
    welcomeMessage: "Build trust through difficult trade-offs. There are no easy answers.",
    goalDescription: "Survive 8 rounds while maximizing trust. You'll face hard choices.",
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
      // === INVESTMENTS ===
      { id: 1, title: "Regulatory Excellence", description: "Exceed all compliance requirements.", cost: 4, effects: { credibility: 10, profit: -10 }, category: "investment" },
      { id: 2, title: "System Redundancy", description: "Bulletproof infrastructure, 99.99% uptime.", cost: 5, effects: { reliability: 12, profit: -15 }, category: "investment" },
      { id: 3, title: "Dedicated Wealth Advisors", description: "Personal advisors for every significant client.", cost: 5, effects: { intimacy: 10, profit: -12 }, category: "investment" },
      { id: 4, title: "Fiduciary Commitment", description: "Legally bind to client-first principles.", cost: 5, effects: { selfOrientation: -10, credibility: 4, profit: -12 }, category: "investment" },
      
      // === TRADE-OFFS ===
      { id: 10, title: "Robo-Advisory", description: "Algorithmic advice. Scalable but impersonal.", cost: 3, effects: { reliability: 5, intimacy: -5, profit: 8 }, category: "trade-off" },
      { id: 11, title: "Branch Closures", description: "Digital-first strategy. Efficient but alienates some.", cost: 2, effects: { intimacy: -6, reliability: 3, profit: 15 }, category: "trade-off" },
      { id: 12, title: "Acquisition", description: "Buy a competitor. Growth but integration challenges.", cost: 4, effects: { reliability: -4, profit: 12, customers: 15 }, category: "trade-off" },
      { id: 13, title: "Fee Simplification", description: "Transparent fees. Trust builds but revenue drops.", cost: 2, effects: { selfOrientation: -6, credibility: 4, profit: -12 }, category: "trade-off" },
      { id: 14, title: "Wealth Threshold", description: "Focus on high-net-worth. Better margins, exclusionary.", cost: 2, effects: { selfOrientation: 5, intimacy: 3, profit: 10 }, category: "trade-off" },
      { id: 15, title: "Financial Education", description: "Free literacy programs. Goodwill but no direct return.", cost: 3, effects: { credibility: 5, selfOrientation: -4, profit: -8 }, category: "trade-off" },
      
      // === NECESSARY EVILS ===
      { id: 20, title: "Fee Increases", description: "Raise management fees. Margin pressure demands it.", cost: 1, effects: { selfOrientation: 5, intimacy: -3, profit: 18 }, category: "necessary" },
      { id: 21, title: "Staff Reductions", description: "Reduce headcount to match market conditions.", cost: 1, effects: { reliability: -4, intimacy: -4, profit: 15 }, category: "necessary" },
      { id: 22, title: "Offshore Operations", description: "Move back-office overseas.", cost: 1, effects: { reliability: -3, profit: 12 }, category: "necessary" },
      { id: 23, title: "Product Rationalization", description: "Discontinue unprofitable products some clients use.", cost: 1, effects: { intimacy: -5, selfOrientation: 4, profit: 10 }, category: "necessary" },
      { id: 24, title: "Risk Limit Tightening", description: "Restrict lending. Safer but frustrates clients.", cost: 1, effects: { credibility: 3, intimacy: -4, profit: -5 }, category: "necessary" },
      
      // === TEMPTING ===
      { id: 30, title: "Complex Products", description: "High-margin structured products clients don't understand.", cost: 1, effects: { selfOrientation: 10, profit: 25 }, category: "tempting" },
      { id: 31, title: "Churning Incentives", description: "Reward advisors for transaction volume.", cost: 1, effects: { selfOrientation: 8, intimacy: -5, profit: 20 }, category: "tempting" },
      { id: 32, title: "Penalty Optimization", description: "Maximize revenue from fees and penalties.", cost: 1, effects: { selfOrientation: 7, profit: 15 }, category: "tempting" },
      { id: 33, title: "Aggressive Cross-Selling", description: "Push products at every touchpoint.", cost: 1, effects: { selfOrientation: 8, intimacy: -4, profit: 18 }, category: "tempting" },
      { id: 34, title: "Risk Disclosure Minimization", description: "Downplay product risks in marketing.", cost: 1, effects: { credibility: -5, selfOrientation: 6, profit: 12 }, category: "tempting" },
    ],
    challenges: [
      // === RANDOM ===
      { title: "Market Rally", description: "Bull market makes everyone look smart.", dimension: "credibility", effect: 5, profitEffect: 15, trigger: { condition: "random" } },
      { title: "Regulatory Praise", description: "Regulators commend your compliance.", dimension: "credibility", effect: 8, trigger: { condition: "random" } },
      { title: "Fintech Disruption", description: "New players steal market share.", dimension: "reliability", effect: -3, customerEffect: -8, trigger: { condition: "random" } },
      
      // === STATE TRIGGERED ===
      { title: "System Outage", description: "Critical systems fail during peak trading.", dimension: "reliability", effect: -15, customerEffect: -10, trigger: { condition: "low_reliability", threshold: 35 } },
      { title: "Mis-selling Scandal", description: "Clients claim they were sold unsuitable products.", dimension: "selfOrientation", effect: 8, customerEffect: -12, profitEffect: -20, trigger: { condition: "high_self_orientation", threshold: 55 } },
      { title: "Margin Call", description: "Low profits force difficult decisions.", dimension: "selfOrientation", effect: 4, profitEffect: -15, trigger: { condition: "low_profit", threshold: 50 } },
      
      // === FORCING ===
      { title: "Market Crash", description: "Markets drop 20%. How do you communicate?",
        dimension: "credibility", effect: 0,
        options: [
          { label: "Honest assessment", effects: { credibility: 6, intimacy: 4, selfOrientation: -3 } },
          { label: "Calm reassurance", effects: { credibility: -2, intimacy: 2 } },
          { label: "Opportunity spin", effects: { credibility: -5, selfOrientation: 6, profit: 5 } }
        ]
      },
      { title: "Competitor Failure", description: "A rival bank collapses. Their clients seek a new home.",
        dimension: "reliability", effect: 0,
        options: [
          { label: "Selective onboarding", effects: { credibility: 2, reliability: 2, customers: 10 } },
          { label: "Take everyone", effects: { reliability: -5, customers: 25, profit: 10 } },
          { label: "Premium terms only", effects: { selfOrientation: 5, profit: 15, customers: 5 } }
        ]
      },
      { title: "Whistleblower Report", description: "Employee reports concerning practices internally.",
        dimension: "credibility", effect: 0,
        options: [
          { label: "Full investigation", effects: { credibility: 5, selfOrientation: -5, profit: -10 } },
          { label: "Quiet resolution", effects: { selfOrientation: 4, profit: -3 } },
          { label: "Discourage complaint", effects: { selfOrientation: 8, credibility: -3 } }
        ]
      },
    ],
    personas: [
      { id: "hnw", name: "Patricia", role: "High-Net-Worth Client", avatar: "P", weights: { credibility: 0.4, reliability: 0.3, intimacy: 0.3 } },
      { id: "retail", name: "Marcus", role: "Retail Client", avatar: "M", weights: { credibility: 0.3, reliability: 0.4, intimacy: 0.3 } },
      { id: "business", name: "Diana", role: "Business Owner", avatar: "D", weights: { credibility: 0.35, reliability: 0.45, intimacy: 0.2 } },
    ],
    feedback: {
      credibility: {
        high: ["Their financial expertise is exceptional. I trust their market insights.", "Every recommendation has been sound and well-researched.", "They understand finance deeply, not just product features."],
        medium: ["They seem to know the products, less sure about broader strategy.", "Competent but I cross-check their advice.", "Adequate expertise for my basic needs."],
        low: ["Their advice has cost me money. I question their competence.", "They push products without understanding my situation.", "I know more than some of their advisors."],
      },
      reliability: {
        high: ["My money is always accessible, systems always work.", "They have never missed a commitment in years.", "I sleep well knowing they handle my finances."],
        medium: ["Usually reliable, occasional delays on complex requests.", "Systems work most of the time.", "Adequate but not exceptional dependability."],
        low: ["Transactions fail, promises are broken.", "I keep backup accounts elsewhere.", "Their systems seem held together with tape."],
      },
      intimacy: {
        high: ["My advisor knows my family, my goals, my fears.", "They proactively reach out when life events happen.", "I'd tell them things I wouldn't tell other providers."],
        medium: ["Professional relationship, appropriate boundaries.", "They know my account, not really me.", "Functional but not personal."],
        low: ["I'm an account number to them.", "Turnover means starting over every time.", "No sense that they care about my actual life."],
      },
      selfOrientation: {
        high: ["Every interaction feels like a sales pitch.", "Fees appear everywhere, always in their favor.", "They optimize for their revenue, not my outcomes."],
        medium: ["Commercial relationship with fair terms.", "They need to profit, I accept that.", "Reasonable balance of interests."],
        low: ["They've talked me out of products that would have made them money.", "Fees are transparent and fair.", "I believe they put my interests first."],
      },
    },
    insights: [
      "In finance, self-orientation destroys trust faster than anywhere else.",
      "Clients remember how you treated them during market downturns.",
      "Complex products often signal self-orientation over client interest.",
      "Reliability in finance means money access when needed, period.",
      "The best clients come from referrals - trust compounds.",
      "Regulatory compliance is baseline, not differentiator.",
    ],
    welcomeMessage: "Build a trusted financial institution. The temptation of high-margin products is real.",
    goalDescription: "Balance profitability with client trust. Short-term grabs have long-term costs.",
  },

  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    description: "Hospitals, clinics, and health systems",
    icon: "Heart",
    metrics: {
      resourcesLabel: "Budget",
      profitLabel: "Margin",
      customersLabel: "Patients",
    },
    initiatives: [
      // === INVESTMENTS ===
      { id: 1, title: "Clinical Excellence Program", description: "Top-tier training and certifications.", cost: 5, effects: { credibility: 12, profit: -12 }, category: "investment" },
      { id: 2, title: "Care Coordination System", description: "Seamless handoffs across all care stages.", cost: 4, effects: { reliability: 10, profit: -10 }, category: "investment" },
      { id: 3, title: "Patient Advocates", description: "Dedicated guides for every patient journey.", cost: 4, effects: { intimacy: 10, profit: -8 }, category: "investment" },
      { id: 4, title: "Unnecessary Care Reduction", description: "Actively reduce tests that don't add value.", cost: 3, effects: { selfOrientation: -8, credibility: 3, profit: -15 }, category: "investment" },
      
      // === TRADE-OFFS ===
      { id: 10, title: "Telemedicine Expansion", description: "Virtual care. Accessible but less personal.", cost: 3, effects: { reliability: 5, intimacy: -4, profit: 6 }, category: "trade-off" },
      { id: 11, title: "Standardized Protocols", description: "Evidence-based but less individualized care.", cost: 2, effects: { credibility: 5, intimacy: -3, reliability: 3, profit: 4 }, category: "trade-off" },
      { id: 12, title: "Specialist Recruitment", description: "Attract top talent. Expensive but credible.", cost: 4, effects: { credibility: 8, profit: -10 }, category: "trade-off" },
      { id: 13, title: "Community Health Investment", description: "Prevention programs. Long-term benefit, short-term cost.", cost: 3, effects: { selfOrientation: -5, intimacy: 4, profit: -10 }, category: "trade-off" },
      { id: 14, title: "Price Transparency", description: "Clear pricing upfront. Trust builds but exposes margins.", cost: 2, effects: { selfOrientation: -6, profit: -8 }, category: "trade-off" },
      
      // === NECESSARY EVILS ===
      { id: 20, title: "Reduce Staff Ratios", description: "Fewer nurses per patient. Financially necessary but risky.", cost: 1, effects: { reliability: -5, intimacy: -4, profit: 15 }, category: "necessary" },
      { id: 21, title: "Close Underperforming Unit", description: "Shutter a money-losing department.", cost: 1, effects: { intimacy: -5, reliability: -3, profit: 12 }, category: "necessary" },
      { id: 22, title: "Tighten Admission Criteria", description: "Focus on cases you can handle well.", cost: 1, effects: { intimacy: -3, credibility: 2, profit: 8 }, category: "necessary" },
      { id: 23, title: "Reduce Charity Care", description: "Scale back free care to preserve margins.", cost: 1, effects: { selfOrientation: 6, intimacy: -4, profit: 12 }, category: "necessary" },
      { id: 24, title: "Expedite Discharges", description: "Faster bed turnover. Efficient but feels rushed.", cost: 1, effects: { reliability: -3, intimacy: -4, profit: 10 }, category: "necessary" },
      
      // === TEMPTING ===
      { id: 30, title: "Facility Fees", description: "Add fees to maximize reimbursement per visit.", cost: 1, effects: { selfOrientation: 8, profit: 20 }, category: "tempting" },
      { id: 31, title: "Defensive Medicine", description: "Extra tests primarily to reduce liability.", cost: 1, effects: { selfOrientation: 5, credibility: -2, profit: 12 }, category: "tempting" },
      { id: 32, title: "High-Margin Specialties", description: "Steer investment toward profitable over needed services.", cost: 2, effects: { selfOrientation: 7, profit: 18 }, category: "tempting" },
      { id: 33, title: "Upcoding Optimization", description: "Aggressive coding for maximum reimbursement.", cost: 1, effects: { selfOrientation: 8, credibility: -3, profit: 15 }, category: "tempting" },
      { id: 34, title: "Volume-Based Incentives", description: "Pay doctors for volume, not outcomes.", cost: 1, effects: { selfOrientation: 7, credibility: -4, profit: 12 }, category: "tempting" },
    ],
    challenges: [
      // === RANDOM ===
      { title: "Clinical Breakthrough", description: "Your team achieves a notable clinical success.", dimension: "credibility", effect: 10, customerEffect: 8, trigger: { condition: "random" } },
      { title: "Staff Shortage", description: "Healthcare worker shortage strains capacity.", dimension: "reliability", effect: -5, profitEffect: -8, trigger: { condition: "random" } },
      { title: "Insurance Renegotiation", description: "Payer cuts reimbursement rates.", dimension: "selfOrientation", effect: 3, profitEffect: -15, trigger: { condition: "random" } },
      
      // === STATE TRIGGERED ===
      { title: "Care Delay Tragedy", description: "A delay in care leads to serious harm.", dimension: "reliability", effect: -15, customerEffect: -10, trigger: { condition: "low_reliability", threshold: 35 } },
      { title: "Billing Investigation", description: "Regulators investigate billing practices.", dimension: "selfOrientation", effect: 8, profitEffect: -20, trigger: { condition: "high_self_orientation", threshold: 55 } },
      { title: "Budget Crisis", description: "Operating losses force immediate action.", dimension: "reliability", effect: -4, profitEffect: -10, trigger: { condition: "low_profit", threshold: 50 } },
      
      // === FORCING ===
      { title: "Medical Error", description: "A serious error occurs. How do you respond?",
        dimension: "credibility", effect: -5,
        options: [
          { label: "Full disclosure & apology", effects: { credibility: 4, intimacy: 6, selfOrientation: -5, profit: -15 } },
          { label: "Standard incident report", effects: { credibility: -2, selfOrientation: 3 } },
          { label: "Minimize exposure", effects: { credibility: -6, selfOrientation: 8, intimacy: -4 } }
        ]
      },
      { title: "Pandemic Surge", description: "Cases spike. You're asked to expand beyond safe capacity.",
        dimension: "reliability", effect: 0,
        options: [
          { label: "Accept all patients", effects: { reliability: -8, intimacy: 4, selfOrientation: -5 } },
          { label: "Maintain safe limits", effects: { credibility: 3, customers: -10 } },
          { label: "Transfer unstable patients", effects: { reliability: 2, intimacy: -5, selfOrientation: 4 } }
        ]
      },
      { title: "End-of-Life Decision", description: "Family wants aggressive treatment; it won't help.",
        dimension: "intimacy", effect: 0,
        options: [
          { label: "Honest conversation", effects: { credibility: 4, intimacy: 5, selfOrientation: -3, profit: -5 } },
          { label: "Follow family wishes", effects: { intimacy: 2, selfOrientation: 3, profit: 5 } },
          { label: "Ethics committee", effects: { credibility: 2, reliability: -2 } }
        ]
      },
    ],
    personas: [
      { id: "chronic", name: "Robert", role: "Chronic Care Patient", avatar: "R", weights: { credibility: 0.35, reliability: 0.35, intimacy: 0.3 } },
      { id: "parent", name: "Lisa", role: "Parent of Young Children", avatar: "L", weights: { credibility: 0.4, reliability: 0.3, intimacy: 0.3 } },
      { id: "elderly", name: "Eleanor", role: "Elderly Patient", avatar: "E", weights: { credibility: 0.3, reliability: 0.3, intimacy: 0.4 } },
    ],
    feedback: {
      credibility: {
        high: ["The clinical expertise here is outstanding. I trust my care completely.", "They stay current with the latest research.", "I have complete confidence in their medical judgment."],
        medium: ["Doctors seem competent, though I sometimes seek second opinions.", "Adequate clinical care, nothing exceptional.", "They follow standard protocols well enough."],
        low: ["I've experienced errors that shook my confidence.", "Their knowledge seems outdated.", "I research everything before accepting their recommendations."],
      },
      reliability: {
        high: ["Appointments run on time, nothing falls through cracks.", "The care coordination is seamless.", "I never worry about something being missed."],
        medium: ["Usually reliable, some waits and occasional mix-ups.", "Have to follow up sometimes.", "Functional but with friction."],
        low: ["Appointments are delayed, tests get lost, chaos is normal.", "I manage my own care coordination.", "The system feels broken."],
      },
      intimacy: {
        high: ["They see me as a person, not a diagnosis.", "The care and compassion are genuine.", "I feel truly heard and understood."],
        medium: ["Professional and polite, somewhat impersonal.", "Efficient but not warm.", "Clinical competence without emotional connection."],
        low: ["I feel processed, not cared for.", "No one seems to know my story.", "The human element is missing."],
      },
      selfOrientation: {
        high: ["Every visit generates more bills than necessary.", "They push treatments I'm not sure I need.", "Profit clearly drives decisions."],
        medium: ["Reasonable balance of business and care.", "I understand financial pressures.", "Not exploitative but not selfless either."],
        low: ["They've recommended less expensive alternatives.", "Patient outcomes clearly come first.", "I never feel like a revenue source."],
      },
    },
    insights: [
      "In healthcare, credibility failures can be life-threatening.",
      "Patients remember how they were treated when vulnerable.",
      "Unnecessary procedures are the biggest self-orientation signal.",
      "Transparency about errors, handled well, can build trust.",
      "Family experience shapes trust as much as direct care.",
    ],
    welcomeMessage: "Build a trusted healthcare organization. The tension between care and margin is real.",
    goalDescription: "Deliver trustworthy care while maintaining financial sustainability.",
  },

  technology: {
    id: "technology",
    name: "Technology",
    description: "Software, platforms, and tech companies",
    icon: "Laptop",
    metrics: {
      resourcesLabel: "Engineering",
      profitLabel: "Revenue",
      customersLabel: "Users",
    },
    initiatives: [
      // === INVESTMENTS ===
      { id: 1, title: "Security Certifications", description: "SOC2, ISO 27001, published audits.", cost: 5, effects: { credibility: 12, profit: -12 }, category: "investment" },
      { id: 2, title: "99.99% SLA", description: "Exceptional uptime with teeth.", cost: 5, effects: { reliability: 12, profit: -15 }, category: "investment" },
      { id: 3, title: "Human Support Team", description: "Real humans, not just chatbots.", cost: 4, effects: { intimacy: 10, profit: -10 }, category: "investment" },
      { id: 4, title: "No Dark Patterns", description: "Eliminate all manipulative UX.", cost: 3, effects: { selfOrientation: -10, intimacy: 3, profit: -12 }, category: "investment" },
      
      // === TRADE-OFFS ===
      { id: 10, title: "API-First Platform", description: "Developer love, but less stickiness.", cost: 3, effects: { credibility: 6, selfOrientation: -3, intimacy: -2, profit: 4 }, category: "trade-off" },
      { id: 11, title: "Open Source Core", description: "Transparency, but competitors benefit too.", cost: 3, effects: { credibility: 8, selfOrientation: -4, profit: -5 }, category: "trade-off" },
      { id: 12, title: "AI Integration", description: "Powerful features, privacy concerns.", cost: 3, effects: { credibility: 4, intimacy: -4, profit: 8 }, category: "trade-off" },
      { id: 13, title: "Freemium Expansion", description: "Growth vs revenue dilution.", cost: 2, effects: { selfOrientation: -3, profit: -8, customers: 15 }, category: "trade-off" },
      { id: 14, title: "Enterprise Focus", description: "Higher margins, less user intimacy.", cost: 2, effects: { intimacy: -4, profit: 12 }, category: "trade-off" },
      { id: 15, title: "Data Portability", description: "Users can leave easily. Trust signal, churn risk.", cost: 2, effects: { selfOrientation: -6, intimacy: 4, profit: -5 }, category: "trade-off" },
      
      // === NECESSARY EVILS ===
      { id: 20, title: "Sunset Legacy Features", description: "EOL features some users depend on.", cost: 1, effects: { reliability: 3, intimacy: -5, profit: 8 }, category: "necessary" },
      { id: 21, title: "Engineering Layoffs", description: "Right-size the team.", cost: 1, effects: { reliability: -4, profit: 15 }, category: "necessary" },
      { id: 22, title: "Price Increase", description: "Raise prices for sustainability.", cost: 1, effects: { selfOrientation: 4, intimacy: -3, profit: 15 }, category: "necessary" },
      { id: 23, title: "Reduce Free Tier", description: "Convert free users or lose them.", cost: 1, effects: { selfOrientation: 5, customers: -5, profit: 12 }, category: "necessary" },
      { id: 24, title: "Technical Debt Payment", description: "Pause features to fix foundations.", cost: 2, effects: { reliability: 5, credibility: -2, profit: -8 }, category: "necessary" },
      
      // === TEMPTING ===
      { id: 30, title: "Data Monetization", description: "Sell anonymized user data.", cost: 1, effects: { selfOrientation: 10, intimacy: -5, profit: 25 }, category: "tempting" },
      { id: 31, title: "Addictive Patterns", description: "Engagement hooks that exploit psychology.", cost: 1, effects: { selfOrientation: 8, profit: 15 }, category: "tempting" },
      { id: 32, title: "Lock-in Features", description: "Make switching painful.", cost: 1, effects: { selfOrientation: 8, reliability: 2, profit: 10 }, category: "tempting" },
      { id: 33, title: "Feature Gating", description: "Split existing features into paid tiers.", cost: 1, effects: { selfOrientation: 7, intimacy: -3, profit: 12 }, category: "tempting" },
      { id: 34, title: "Growth Hacking", description: "Viral mechanics that feel spammy.", cost: 1, effects: { selfOrientation: 6, credibility: -3, customers: 12, profit: 8 }, category: "tempting" },
    ],
    challenges: [
      // === RANDOM ===
      { title: "Viral Success", description: "A feature goes viral organically.", dimension: "credibility", effect: 6, customerEffect: 20, trigger: { condition: "random" } },
      { title: "Tech Press Coverage", description: "Positive coverage in major tech publication.", dimension: "credibility", effect: 8, trigger: { condition: "random" } },
      { title: "Platform Policy Change", description: "App store changes hurt distribution.", dimension: "reliability", effect: -3, customerEffect: -8, trigger: { condition: "random" } },
      
      // === STATE TRIGGERED ===
      { title: "Major Outage", description: "Extended downtime during critical period.", dimension: "reliability", effect: -15, customerEffect: -10, trigger: { condition: "low_reliability", threshold: 35 } },
      { title: "Privacy Backlash", description: "Users revolt against data practices.", dimension: "selfOrientation", effect: 6, customerEffect: -15, trigger: { condition: "high_self_orientation", threshold: 55 } },
      { title: "Runway Crisis", description: "Low revenue forces difficult choices.", dimension: "selfOrientation", effect: 5, profitEffect: -10, trigger: { condition: "low_profit", threshold: 50 } },
      
      // === FORCING ===
      { title: "Data Breach", description: "User data is exposed. How do you respond?",
        dimension: "intimacy", effect: -8,
        options: [
          { label: "Immediate full disclosure", effects: { credibility: 5, intimacy: 4, selfOrientation: -5, profit: -10 } },
          { label: "Investigate first", effects: { credibility: -2, reliability: 2 } },
          { label: "Minimize disclosure", effects: { credibility: -6, selfOrientation: 8, intimacy: -5 } }
        ]
      },
      { title: "Acquisition Offer", description: "Big tech wants to buy you. Users worry about the future.",
        dimension: "selfOrientation", effect: 0,
        options: [
          { label: "Reject offer", effects: { selfOrientation: -5, intimacy: 5, profit: -10 } },
          { label: "Negotiate user protections", effects: { credibility: 3, profit: 15 } },
          { label: "Accept immediately", effects: { selfOrientation: 8, intimacy: -6, profit: 30 } }
        ]
      },
      { title: "Content Moderation Crisis", description: "Harmful content spreads on your platform.",
        dimension: "credibility", effect: -5,
        options: [
          { label: "Aggressive moderation", effects: { credibility: 4, selfOrientation: -3, reliability: -3, profit: -8 } },
          { label: "Community standards", effects: { reliability: 2, intimacy: 2 } },
          { label: "Hands-off approach", effects: { credibility: -5, selfOrientation: 5, profit: 3 } }
        ]
      },
    ],
    personas: [
      { id: "developer", name: "Sam", role: "Developer", avatar: "S", weights: { credibility: 0.45, reliability: 0.35, intimacy: 0.2 } },
      { id: "prosumer", name: "Taylor", role: "Power User", avatar: "T", weights: { credibility: 0.3, reliability: 0.4, intimacy: 0.3 } },
      { id: "casual", name: "Jamie", role: "Casual User", avatar: "J", weights: { credibility: 0.25, reliability: 0.35, intimacy: 0.4 } },
    ],
    feedback: {
      credibility: {
        high: ["Their technical chops are undeniable. The product just works.", "Security practices are best-in-class.", "They clearly know what they're building."],
        medium: ["The product is okay, nothing special technically.", "Some rough edges, but functional.", "Seems like a typical startup."],
        low: ["Constant bugs make me question their competence.", "Security feels like an afterthought.", "I'm not sure they know what they're doing."],
      },
      reliability: {
        high: ["Rock solid. I've never seen it go down.", "Updates are smooth and well-tested.", "I can build my workflow around this."],
        medium: ["Usually works, occasional hiccups.", "Updates sometimes break things.", "Reliable enough, with caveats."],
        low: ["Downtime is too frequent.", "Every update is a gamble.", "I have backup tools just in case."],
      },
      intimacy: {
        high: ["They actually listen to user feedback.", "Support is responsive and human.", "I feel like they genuinely care about users."],
        medium: ["Standard support experience.", "Feedback seems to go into a void.", "Professional but impersonal."],
        low: ["Users are clearly just metrics.", "Support is useless.", "They don't care about us."],
      },
      selfOrientation: {
        high: ["Every feature change seems designed to extract more money.", "They're clearly optimizing for engagement over value.", "I feel manipulated using this product."],
        medium: ["They need to make money, I get it.", "Fair monetization.", "Commercial but not predatory."],
        low: ["They leave money on the table for user benefit.", "Pricing is fair and transparent.", "Rare to see a company this user-aligned."],
      },
    },
    insights: [
      "In tech, users can switch fast. Trust loss is permanent.",
      "Dark patterns work short-term but destroy long-term trust.",
      "Reliability is expected. Downtime is never forgotten.",
      "Data practices are increasingly scrutinized.",
      "Open source and transparency signal low self-orientation.",
    ],
    welcomeMessage: "Build a trusted tech company. Growth pressure will test your principles.",
    goalDescription: "Scale while maintaining user trust. The temptation to exploit is constant.",
  },
};

// Helper functions
export const getPreset = (id: string): IndustryPreset => {
  return industryPresets[id] || industryPresets.generic;
};

export const getPresetList = (): IndustryPreset[] => {
  return Object.values(industryPresets);
};
