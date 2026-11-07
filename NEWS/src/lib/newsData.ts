export interface PerspectiveData {
  sources: string[];
  headline: string;
  framing: string;
  highlightedFacts: string[];
  omittedFacts: string[];
}

export interface NewsArticle {
  id: string;
  category: string;
  region: string;
  timestamp: string;
  publishedDate: string;
  readTime: string;
  headline: string;
  excerpt: string;
  sourceCount: number;
  featured?: boolean;
  aiOverview: {
    summary: string;
    consensusFacts: string[];
    confidenceScore: number;
    modelInfo: {
      model: string;
      quantization: string;
      latencyMs: number;
    };
  };
  leftPerspective: PerspectiveData;
  rightPerspective: PerspectiveData;
}

export const GLOBAL_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "clean-energy-accord",
    category: "CLIMATE & MACROECONOMICS",
    region: "GENEVA / BRUSSELS",
    timestamp: "14m ago",
    publishedDate: "November 7, 2026",
    readTime: "3 min read",
    featured: true,
    headline: "Multilateral Pact Authorizes $420B Transition Grid with Binding Mineral Targets",
    excerpt: "Twelve industrialized nations finalize the Clean Energy Transformation Accord, coupling sovereign debt guarantees with domestic battery supply-chain mandates.",
    sourceCount: 24,
    aiOverview: {
      summary: "A coalition of 12 industrialized nations ratified a binding multilateral treaty committing $420 billion over eight years toward continental transmission corridors and critical mineral processing. Both ideological spheres confirm the funding structure, parliamentary vote totals, and border carbon adjustments, while diverging sharply on fiscal sustainability and industrial disruption.",
      consensusFacts: [
        "The pact commits $420 billion in pooled public guarantees and subsidies distributed across 12 signatory nations over an eight-year timeline.",
        "Signatories are legally mandated to source at least 35% of all refined rare-earth elements domestically or from allied treaty members by 2030.",
        "A border carbon adjustment mechanism will impose import tariffs on non-compliant industrial steel, aluminum, and cement starting Q1 2027.",
        "The treaty was approved by a 68% parliamentary majority following seven months of closed-door trilateral negotiations.",
        "Independent fiscal monitors project that regional transmission upgrade fees will raise short-term corporate grid access costs by approximately 3.8%."
      ],
      confidenceScore: 99.1,
      modelInfo: {
        model: "TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)",
        quantization: "4-bit NF4",
        latencyMs: 184,
      },
    },
    leftPerspective: {
      sources: ["The Guardian", "Le Monde", "MSNBC", "El País"],
      headline: "Historic Climate Pact Marshals $420B to Secure Union Green Jobs and Enforce Corporate Emissions Penalties",
      framing: "Celebrates the accord as an unprecedented environmental and societal breakthrough. Highlights protections for displaced fossil workers, strict caps on corporate polluters, and mandatory clean-energy rebates for low-income households.",
      highlightedFacts: [
        "Projected to create 680,000 direct unionized engineering, technical, and manufacturing jobs across member territories.",
        "Imposes legally enforceable financial penalties on industrial emitters that exceed strict methane and particulate release thresholds.",
        "Mandates direct energy subsidy dividends returning up to $450 annually to median-income households from tariff revenues."
      ],
      omittedFacts: [
        "Understates sovereign debt liabilities and projected borrowing interest charges calculated by independent fiscal councils.",
        "Omits energy grid operator warnings regarding severe winter peak reserve vulnerabilities during the transitional decommissioning phase.",
        "Conceals special exemption waivers carved out for major pipeline networks in key legislative battleground districts."
      ]
    },
    rightPerspective: {
      sources: ["The Wall Street Journal", "Financial Times", "National Review", "Handelsblatt"],
      headline: "Sweeping $420B Energy Treaty Pressures National Deficits and Threatens Industrial Manufacturing Competitiveness",
      framing: "Focuses on fiscal risks, inflationary pressures, and regulatory overreach. Argues that heavy raw-material tariffs and sudden fossil fuel phase-outs will severely weaken domestic manufacturers against foreign competitors.",
      highlightedFacts: [
        "Estimated by national budget offices to add $132 billion in cumulative sovereign borrowing requirements over the initial three-year phase.",
        "Regional power grid operators explicitly submitted formal caveats detailing reserve capacity shortfalls during extreme winter demand spikes.",
        "Includes targeted regulatory exemptions for select industrial legacy projects located in strategic parliamentary districts."
      ],
      omittedFacts: [
        "Downplays third-party econometric projections showing 680,000 new domestic jobs and subsequent tax base expansion.",
        "Ignores peer-reviewed environmental assessments calculating $310B in long-term avoided climate disaster repair expenditures.",
        "Omits the consumer energy rebate mechanisms designed to offset initial transmission grid surcharge adjustments."
      ]
    }
  },
  {
    id: "frontier-ai-treaty",
    category: "TECHNOLOGY & DEFENSE",
    region: "LONDON / WASHINGTON",
    timestamp: "42m ago",
    publishedDate: "November 7, 2026",
    readTime: "4 min read",
    featured: true,
    headline: "Global Compute Registry Imposes Audits on Frontier Clusters Exceeding 50,000 GPUs",
    excerpt: "New international safety accords require compute clusters exceeding frontier thresholds to register datacenter clusters and allow third-party algorithmic verifications.",
    sourceCount: 31,
    aiOverview: {
      summary: "Twenty-four member states concluded the Global Frontier Compute Accord, establishing mandatory third-party safety certifications for training runs exceeding 10^26 FLOPs and datacenter clusters holding over 50,000 synchronized GPUs. All reporting outlets agree on the regulatory threshold and open-source exemptions, but diverge completely on innovation velocity and state surveillance.",
      consensusFacts: [
        "Mandatory safety audits apply exclusively to AI models trained with greater than 10^26 floating point operations (FLOPs).",
        "Datacenters housing over 50,000 synchronized accelerator chips must register geographical compute footprints with an international registry.",
        "Open-weight models below the FLOP threshold and academic research institutions are formally exempt from registry disclosures.",
        "The treaty was unanimously approved by 24 participating national delegations and enters into legal enforcement within 180 days.",
        "Violations carry monetary fines of up to 4% of global corporate revenue or suspension of international datacenter interconnect licenses."
      ],
      confidenceScore: 98.7,
      modelInfo: {
        model: "TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)",
        quantization: "4-bit NF4",
        latencyMs: 162,
      },
    },
    leftPerspective: {
      sources: ["The Atlantic", "The Washington Post", "BBC News", "Wired"],
      headline: "Crucial Frontier AI Accord Restrains Big Tech Megacorporations to Safeguard Democracy and Prevent Autonomous Harm",
      framing: "Depicts the treaty as an indispensable safeguard against unchecked Silicon Valley oligopolies. Stresses civil liberty protections, ethical red-teaming, prevention of cyberweapons, and curbing automated bias in high-stakes public algorithms.",
      highlightedFacts: [
        "Requires documented red-teaming against automated biochemical synthesis and cyberwarfare exploitation before commercial weights release.",
        "Establishes a public algorithmic whistleblower protection channel with statutory legal immunity.",
        "Guarantees that academic researchers retain royalty-free access to benchmark frontier model internal telemetry."
      ],
      omittedFacts: [
        "Omits administrative licensing bottlenecks that could delay commercial deployment of critical productivity tools.",
        "Conceals national intelligence caveats warning that non-signatory foreign powers will train unmonitored clusters.",
        "Downplays compliance overhead burdens that heavily incentivize smaller AI firms to sell out to dominant tech incumbents."
      ]
    },
    rightPerspective: {
      sources: ["Bloomberg", "The Daily Telegraph", "Reason", "Forbes"],
      headline: "Draconian International Compute Bureaucracy Cedes AI Supremacy to Foreign Rivals and Cripples Startup Agility",
      framing: "Portrays the treaty as an invasive regulatory grab that encumbers domestic AI innovation while foreign adversaries operate without restrictions. Stresses proprietary IP risks, governmental surveillance of datacenters, and capital flight.",
      highlightedFacts: [
        "National security assessments note that rival non-signatory states maintain active unmonitored frontier clusters.",
        "Estimated corporate compliance costs are projected to consume 14% of early-stage venture capital allocations in specialized hardware startups.",
        "Empowers transnational inspectors with administrative audit access into proprietary model architectures and weights."
      ],
      omittedFacts: [
        "Disregards consensus safety warnings signed by the chief scientists of all major commercial frontier AI labs.",
        "Omits the explicit total statutory exemption granted to open-weight models below the 10^26 FLOP threshold.",
        "Downplays the legal enforcement provisions designed to prevent the proliferation of automated bio-pathogen design tools."
      ]
    }
  },
  {
    id: "sovereign-debt-renegotiation",
    category: "GLOBAL FINANCE",
    region: "WASHINGTON / TOKYO",
    timestamp: "1h ago",
    publishedDate: "November 7, 2026",
    readTime: "3 min read",
    headline: "Central Banks Restructure Multilateral Debt Facilities with Climate Resiliency Clauses",
    excerpt: "The IMF and bilateral creditor nations approve an emergency mechanism allowing debt service suspensions during natural disasters, backed by SDR reallocations.",
    sourceCount: 19,
    aiOverview: {
      summary: "Bilateral creditors and central banks codified a comprehensive debt restructuring protocol for 34 developing nations, integrating climate pause clauses and private-creditor comparability rules. Dispatches concur on the $88B facility size and debt deferral triggers, but frame creditor concessions and moral hazard from radically opposing angles.",
      consensusFacts: [
        "The approved protocol covers $88 billion in bilateral debt across 34 developing economies through 2032.",
        "Includes an automatic debt-service standstill clause triggered whenever a certified disaster causes damages exceeding 5% of national GDP.",
        "Private commercial bondholders must accept equivalent restructuring haircuts under the newly codified comparability principle.",
        "Funded via the reallocation of Special Drawing Rights (SDRs) from G7 reserve accounts without new domestic appropriations."
      ],
      confidenceScore: 97.9,
      modelInfo: {
        model: "TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)",
        quantization: "4-bit NF4",
        latencyMs: 195,
      },
    },
    leftPerspective: {
      sources: ["The Guardian", "Al Jazeera", "Democracy Now"],
      headline: "Groundbreaking Debt Relief Breakthrough Lifts Neocolonial Austerity Stranglehold on Vulnerable Nations",
      framing: "Frames the agreement as restorative justice and humanitarian relief for global south nations burdened by foreign currency debt while bearing the brunt of climate emergencies.",
      highlightedFacts: [
        "Frees up an estimated $14.2 billion annually in fiscal space directly targeted toward domestic public healthcare and flood defense.",
        "Forces private hedge funds and institutional bondholders to cease predatory debt collection lawsuits in foreign courts."
      ],
      omittedFacts: [
        "Ignores risk that automatic default halts will degrade credit ratings and freeze commercial private capital access.",
        "Omits institutional transparency warnings regarding governance accountability in several recipient sovereign balance sheets."
      ]
    },
    rightPerspective: {
      sources: ["The Wall Street Journal", "Investor's Business Daily", "Barron's"],
      headline: "Creditor Concessions Fuel Moral Hazard and Risk Sovereign Bond Contract Sanctity in Emerging Markets",
      framing: "Argues that compelling private bondholders to accept mandatory haircuts erodes legal predictability, distorts international capital markets, and encourages fiscal profligacy.",
      highlightedFacts: [
        "Leading sovereign rating agencies warned that mandatory standstill clauses will automatically trigger selective default downgrades.",
        "Commercial underwriting spreads for emerging market debt widened by 85 basis points immediately following the announcement."
      ],
      omittedFacts: [
        "Downplays the economic reality that catastrophic climate events render physical debt servicing mathematically impossible.",
        "Omits the fact that uncontrolled sovereign bankruptcies inflict far larger systematic losses on global institutional portfolios."
      ]
    }
  },
  {
    id: "semiconductor-trade-corridor",
    category: "SUPPLY CHAINS & GEOPOLITICS",
    region: "TAIPEI / SEOUL / BERLIN",
    timestamp: "2h ago",
    publishedDate: "November 7, 2026",
    readTime: "3 min read",
    headline: "Allied Fab Treaty Creates Guaranteed Lithography and Sub-2nm Silicon Sharing Pact",
    excerpt: "Five democracies finalize the Microelectronics Resilience Corridor, mandating reciprocal supply priority during regional maritime blockades.",
    sourceCount: 22,
    aiOverview: {
      summary: "Taiwan, South Korea, Japan, the United States, and the European Union signed a landmark pact creating joint strategic reserves of EUV optics and sub-2nm fabrication capacity. Both left and right reports agree on the supply-sharing triggers and capital subsidies, but split over protectionism versus allied defense.",
      consensusFacts: [
        "Establishes a reciprocal silicon allocation treaty between five sovereign entities in the event of export interruptions or maritime transit embargoes.",
        "Pools $45 billion into a joint critical component stockpile covering specialized chemical photoresists and quartz substrate masks.",
        "Member fabrication facilities receive guaranteed electricity pricing caps and cross-border IP export fast-tracking.",
        "Prohibits member state foundries from building advanced manufacturing lines within nations flagged on designated strategic technology restriction lists."
      ],
      confidenceScore: 99.4,
      modelInfo: {
        model: "TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)",
        quantization: "4-bit NF4",
        latencyMs: 178,
      },
    },
    leftPerspective: {
      sources: ["The New York Times", "Kyodo News", "Le Figaro"],
      headline: "Strategic Allied Silicon Alliance Solidifies Democratic Tech Cohesion and Protects Vital Supply Chains",
      framing: "Emphasizes international stability, democratic solidarity against authoritarian coercion, and shielding consumer hardware from supply disruptions.",
      highlightedFacts: [
        "Guarantees continuous semiconductor allocations for critical healthcare devices and civilian telecom networks during supply shocks.",
        "Includes stringent labor standards and environmental wastewater recycling mandates for all subsidized foundry facilities."
      ],
      omittedFacts: [
        "Downplays consumer price increases resulting from domestic production mandates versus lower-cost Asian fabrication clusters.",
        "Omits friction from regional automotive industries forced to abandon cheaper legacy semiconductor supply lines."
      ]
    },
    rightPerspective: {
      sources: ["Nikkei Asia", "The Wall Street Journal", "The Australian"],
      headline: "Semiconductor Cartel Imposes Heavy Subsidies and Rigid Trade Restrictions on Tech Giants",
      framing: "Focuses on state interventionism, marketplace distortion, and the risk that heavy government subsidies create an artificial, non-competitive domestic silicon cartel.",
      highlightedFacts: [
        "Requires foundries to forfeit export rights to their fastest-growing overseas consumer electronics markets.",
        "Industry analysts estimate packaging costs for sub-2nm nodes will increase by 22% under the alliance's localized logistics mandate."
      ],
      omittedFacts: [
        "Ignores military and geopolitical intelligence confirming severe catastrophic risks from single-point maritime supply disruptions.",
        "Omits the long-term strategic resilience gained by having redundant allied fabrication capacity."
      ]
    }
  },
  {
    id: "biotech-gene-editing-directive",
    category: "HEALTH & BIOETHICS",
    region: "OXFORD / BOSTON",
    timestamp: "4h ago",
    publishedDate: "November 7, 2026",
    readTime: "4 min read",
    headline: "International Bioethics Council Authorizes Human In Vivo CRISPR Therapies for Monogenic Disorders",
    excerpt: "Health regulators approve clinical in vivo base-editing treatments for pediatric metabolic disorders under strict oversight registry.",
    sourceCount: 16,
    aiOverview: {
      summary: "Regulatory bodies across 18 nations endorsed unified clinical guidelines for human in vivo base editing targeting fatal pediatric metabolic diseases. Factual consensus is established on the specific diagnostic scopes, patient registry requirements, and safety trials, while debate divides between equitable public access and ethical commodification.",
      consensusFacts: [
        "Authorizes clinical therapeutic application strictly for four fatal monogenic metabolic conditions lacking alternate therapies.",
        "Germline modifications remain strictly prohibited under criminal penalties in all 18 signatory jurisdictions.",
        "Every patient treated will be monitored under a centralized 25-year biometric follow-up registry to document off-target cellular edits.",
        "Clinical trials showed a 91% disease phenotype remission rate across 140 monitored pediatric trial subjects."
      ],
      confidenceScore: 98.2,
      modelInfo: {
        model: "TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)",
        quantization: "4-bit NF4",
        latencyMs: 169,
      },
    },
    leftPerspective: {
      sources: ["Nature News", "The Guardian", "STAT News"],
      headline: "Monumental Genetic Medicine Breakthrough Offers Cures for Fatal Pediatric Illnesses with Robust Ethical Guards",
      framing: "Highlights humanitarian triumph, medical breakthroughs for suffering children, and emphasizes the strict safeguards against rogue germline tampering.",
      highlightedFacts: [
        "Achieved a 91% clinical remission rate, successfully reversing previously fatal organ failure in trial subjects.",
        "Treaty requires state-funded public health programs to negotiate tiered non-profit pricing for developing nations."
      ],
      omittedFacts: [
        "Understates per-treatment production expenses currently exceeding $1.8 million per pediatric patient.",
        "Omits commercial venture capital reservations regarding capped reimbursement rates."
      ]
    },
    rightPerspective: {
      sources: ["The Times", "National Review", "BioEdge"],
      headline: "Historic Gene-Editing Approval Raises Profound Long-Term Ethical Dilemmas and Enormous Price Pressures",
      framing: "Focuses on the slippery slope of human genetic modification, astronomical healthcare budget impacts, and questions regarding permanent biometric state registries.",
      highlightedFacts: [
        "High cost profile threatens to overwhelm private insurance pools and public healthcare entitlement allocations.",
        "Long-term off-target base-editing effects remain partially unproven beyond the initial 36-month monitoring window."
      ],
      omittedFacts: [
        "Fails to acknowledge the total criminal prohibition preserved against human germline edits.",
        "Omits the immense lifetime intensive care and hospitalization costs eliminated by one-time curative treatment."
      ]
    }
  },
  {
    id: "global-grain-corridor",
    category: "WORLD AFFAIRS & FOOD SECURITY",
    region: "ANKARA / KYIV / ROME",
    timestamp: "6h ago",
    publishedDate: "November 7, 2026",
    readTime: "3 min read",
    headline: "Black Sea Agricultural Maritime Safeguard Renewed for 24 Months with Automated Drone Inspections",
    excerpt: "The UN and trilateral guarantors extend the grain export corridor, replacing manual harbor inspections with satellite and autonomous sensor buoys.",
    sourceCount: 28,
    aiOverview: {
      summary: "A 24-month renewal of the Black Sea agricultural transit corridor was finalized, transitioning inspection verification from contested physical boardings to automated biometric and satellite vessel tracking. All outlets affirm the 32-million-ton export capacity and maritime coordinates, while polarizing on sanctions concessions.",
      consensusFacts: [
        "The renewed corridor guarantees transit for up to 32 million metric tons of agricultural commodities over 24 months.",
        "Physical inspection delays are eliminated by deploying autonomous satellite-linked sensor buoys along designated shipping lanes.",
        "Maritime insurance underwriters immediately lowered war-risk insurance premiums for commercial bulk carriers by 40%.",
        "The agreement was signed under direct mediation from the UN Secretary General and regional maritime authorities."
      ],
      confidenceScore: 99.0,
      modelInfo: {
        model: "TinyLlama-1.1B-Chat-v1.0 (LoRA Fine-Tuned)",
        quantization: "4-bit NF4",
        latencyMs: 172,
      },
    },
    leftPerspective: {
      sources: ["The Guardian", "France 24", "DW News"],
      headline: "Vital Food Corridor Extension Averts Catastrophic Global Famine Across Developing Regions",
      framing: "Focuses on global humanitarian relief, stabilization of staple food prices in the Horn of Africa, and diplomatic triumph of multilateral peacekeeping.",
      highlightedFacts: [
        "Stabilizes wheat and corn prices across 14 famine-vulnerable African and Middle Eastern nations.",
        "Cuts cargo waiting delays at the Bosphorus Strait from an average of 18 days to under 48 hours."
      ],
      omittedFacts: [
        "Omits financial concessions granted on secondary maritime insurance sanctions for fertilizer transactions.",
        "Conceals domestic farmer demonstrations across neighboring European transit nations protesting grain depot price collapse."
      ]
    },
    rightPerspective: {
      sources: ["The Telegraph", "The Wall Street Journal", "Kyiv Independent"],
      headline: "Grain Accord Concessions Erode Sanctions Enforceability While Eastern European Farmers Face Market Glut",
      framing: "Focuses on indirect sanctions easing, strategic compromises made with hostile actors, and economic damage to local agricultural economies flooded with transit grain.",
      highlightedFacts: [
        "Includes side agreements facilitating banking transaction clearing for agricultural chemical conglomerates.",
        "Local agricultural associations in border nations report domestic grain prices plunging by 28%, triggering farmer protests."
      ],
      omittedFacts: [
        "Disregards UN humanitarian data showing that millions were at imminent risk of severe food shortages without the corridor.",
        "Omits the fact that the automated inspection protocol substantially improves non-weapons verification accuracy."
      ]
    }
  }
];

export function getArticleById(id: string): NewsArticle | undefined {
  return GLOBAL_NEWS_ARTICLES.find((a) => a.id === id);
}
