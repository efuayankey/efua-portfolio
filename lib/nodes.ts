export interface NodeDef {
  id: string;
  label: string;
  color: string;
  r: number;
  tooltipDesc: string;
}

export interface TaggedItem {
  name: string;
  meta: string;
  desc: string;
  tags: string[];
  link?: string;
}

export interface PanelData {
  eyebrow: string;
  title: string;
  subtitle: string;
  rdf: string;
  stats?: { value: string; label: string }[];
  sections?: { label: string; text: string }[];
  items?: TaggedItem[];
  skillGroups?: { category: string; skills: string[] }[];
  links?: { label: string; href: string; primary?: boolean }[];
  memberships?: string[];
  contactCopy?: string;
}

export const NODE_DEFS: NodeDef[] = [
  { id: 'center',     label: '',           color: '#e8552a', r: 82, tooltipDesc: 'SWE Intern · AI Researcher · Lehigh · 2028' },
  { id: 'research',   label: 'Research',   color: '#7ab8e8', r: 44, tooltipDesc: 'SWAT Lab · AIMES · Neurosymbolic AI' },
  { id: 'projects',   label: 'Projects',   color: '#a8d8a8', r: 44, tooltipDesc: '6 projects · AI · Full-Stack' },
  { id: 'experience', label: 'Experience', color: '#f0c674', r: 40, tooltipDesc: '5 roles · Industry + research + teaching' },
  { id: 'skills',     label: 'Skills',     color: '#c4a8d8', r: 38, tooltipDesc: 'Languages · AI/ML · Infra' },
  { id: 'leadership', label: 'Leadership', color: '#6ecfbf', r: 38, tooltipDesc: 'Campus roles · Orgs · Fellowships' },
  { id: 'contact',    label: 'Contact',    color: '#e8552a', r: 34, tooltipDesc: 'Open to 2027 internships' },
  { id: 'ask',        label: 'Ask',        color: '#e8552a', r: 30, tooltipDesc: 'Chat with AI Efua' },
  { id: 'resume',     label: 'Resume',     color: '#e8552a', r: 26, tooltipDesc: 'Open full resume PDF →' },
  { id: 'hackathons', label: 'Hacks',      color: '#f4845f', r: 40, tooltipDesc: 'Agentathon · Claude API · one night builds' },
];

export const EDGES: [string, string][] = [
  ['center', 'research'],
  ['center', 'projects'],
  ['center', 'experience'],
  ['center', 'skills'],
  ['center', 'leadership'],
  ['center', 'contact'],
  ['center', 'ask'],
  ['center', 'resume'],
  ['center', 'hackathons'],
  ['hackathons', 'projects'],
  ['research', 'experience'],
  ['projects', 'skills'],
  ['experience', 'leadership'],
];

export const PANEL_DATA: Record<string, PanelData> = {
  center: {
    eyebrow: ':center',
    title: 'Efua Yankey',
    subtitle: 'CS + Engineering · Lehigh University · Class of 2028',
    rdf: `:Efua a schema:Person ;
  :studiesAt :LehighUniversity ;
  :major "CS & Engineering" ;
  :classOf "2028" ;
  :internAt :PrePass ;
  :researchesAt :SWATLab ;
  :advisedBy :ProfHeflin ;
  :status "Open to 2027 internships" .`,
    sections: [
      {
        label: 'Who I am',
        text: 'CS + Engineering student at Lehigh building real AI systems — not demos. I work across LLMs, knowledge graphs, and multimodal AI, and I care about shipping things that are useful, not just impressive.',
      },
      {
        label: 'Right now',
        text: 'Software Engineering Intern at PrePass, building safety-alert infrastructure — and doing neurosymbolic AI research at SWAT Lab under Prof. Jeff Heflin, the person who wrote the OWL standard Google and Amazon run on. Before that, built an IRB-approved LLM clinical simulator where 83% of participants preferred my culturally-conditioned model over the baseline. Presented at ABRCMS 2025.',
      },
    ],
    links: [
      { label: 'Email Me', href: 'mailto:efuayankey.0@gmail.com', primary: true },
      { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/efuayankey' },
      { label: 'GitHub ↗', href: 'https://github.com/efuayankey' },
      { label: 'Resume ↗', href: '#' },
    ],
  },

  research: {
    eyebrow: ':research',
    title: 'Research',
    subtitle: 'Neurosymbolic AI · Large Language Models · Graph Neural Networks',
    rdf: `:Efua :researchesAt :SWATLab ;
  :presentedAt :ABRCMS2025 .
:SWATLab :focus :NeurosymbolicAI .
:NeurosymbolicAI :combines :NeuralNetworks ,
                            :SymbolicReasoning .
:ProfHeflin :pioneered :OWLStandard .
:OWLStandard :usedBy :Google , :Amazon .`,
    stats: [
      { value: '83%', label: 'cultural alignment (AIMES)' },
      { value: '30+', label: 'IRB participants' },
      { value: 'OWL', label: 'Google & Amazon standard' },
    ],
    items: [
      {
        name: 'SWAT Lab — Neurosymbolic AI',
        meta: 'April 2026 – Present · Prof. Jeff Heflin',
        desc: 'Neural networks + backward-chaining reasoners + OWL ontologies. Reducing knowledge graph search nodes by an order of magnitude. Under the person who wrote the W3C standard Google and Amazon run on.',
        tags: ['Neurosymbolic AI', 'OWL Ontologies', 'Knowledge Graphs', 'Backward Chaining', 'Python'],
      },
      {
        name: 'AIMES — WiNS Lab',
        meta: 'May 2025 – Feb 2026 · IRB Approved · ABRCMS 2025',
        desc: 'Production LLM simulator for cultural competency training in clinical AI. 12 cultural profiles, GPT-4 fine-tuned with prompt-conditioning middleware. 83% of 30+ IRB participants preferred the culturally-conditioned model. Presented findings at ABRCMS 2025.',
        tags: ['LLMs', 'GPT-4', 'Cultural AI', 'FastAPI', 'AWS', 'IRB Research'],
      },
    ],
  },

  projects: {
    eyebrow: ':projects',
    title: 'Projects',
    subtitle: 'AI agents · Chrome extensions · Computer vision · Full-stack platforms',
    rdf: `:Efua :built :HawkSearch , :UniMetric ,
              :AURA , :FaceFit ,
              :NextToIntern , :PulseGrid .
:HawkSearch :uses :ClaudeAPI ;
  :builtAt :Agentathon2026 ;
  :won "Best Value (1st Place)" .
:UniMetric :covers "10000+ records" .
:AURA :uses :AWSBedrock , :ClaudeAPI .
:PulseGrid :monitors "distributed infrastructure" .`,
    items: [
      {
        name: 'HawkSearch',
        meta: 'Agentathon · Lehigh · April 2026 · Best Value, 1st Place',
        desc: 'AI agent that scrapes all 5 Lehigh colleges\' faculty pages live, reasons over research profiles, scores student-professor compatibility, and drafts cold emails ready to send in one click. Claude API for reasoning and email generation. Won Best Value (1st Place).',
        tags: ['Claude API', 'Next.js', 'AI Agents', 'Web Scraping', 'TypeScript'],
        link: 'https://github.com/efuayankey',
      },
      {
        name: 'PulseGrid',
        meta: 'Distributed Infrastructure Monitoring · Team Project',
        desc: 'Python agents stream CPU, memory, and logs every 5 sec into a FastAPI monitoring backend. Redis TTL heartbeats mark agents offline within 30 sec and serve cached live metrics. Historical metrics stored in PostgreSQL with threshold alerts and cooldown deduplication for incident visibility.',
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'Docker'],
      },
      {
        name: 'UniMetric',
        meta: 'Chrome Extension · 10k+ professor records',
        desc: 'Overlays RateMyProfessor ratings directly on Banner, Workday, and Canvas course registration pages. Jaro-Winkler fuzzy matching resolves name discrepancies across 10,000+ records. Redis-cached for fast overlay. GraphQL backend.',
        tags: ['FastAPI', 'GraphQL', 'Redis', 'PostgreSQL', 'Chrome Ext.', 'Python'],
        link: 'https://github.com/efuayankey/UniMetric',
      },
      {
        name: 'AURA',
        meta: 'AWS Bedrock · Full-Stack · AI Wellness',
        desc: 'AI scheduling assistant tracking a Balance Score (mood + energy + workload). Uses AWS Bedrock with Claude API for intelligent task suggestions. DynamoDB for real-time persistence, SNS for smart wellness notifications. Deployed on AWS Amplify.',
        tags: ['AWS Bedrock', 'Claude API', 'Next.js 15', 'TypeScript', 'DynamoDB', 'Amplify'],
        link: 'https://github.com/efuayankey/aura',
      },
      {
        name: 'FaceFit',
        meta: 'Computer Vision · 90% user satisfaction',
        desc: 'End-to-end CV pipeline for face shape classification and glasses recommendations. MediaPipe extracts 468 facial landmarks per frame. Custom geometric feature engineering feeds a supervised ML classifier. 30% accuracy improvement over baseline, 90% user satisfaction across 15+ testers.',
        tags: ['MediaPipe', 'OpenCV', 'scikit-learn', 'TensorFlow', 'Python'],
        link: 'https://github.com/efuayankey/FaceFit',
      },
      {
        name: 'NextToIntern',
        meta: 'Feb 2025 – Present · 70+ active users · 99% uptime',
        desc: 'Peer-matching platform for internship prep and recruiting at Lehigh. RESTful matching API with FastAPI + PostgreSQL hitting sub-50ms response times. CI/CD pipeline maintaining 99% uptime. Led a 3-person agile team through sprint planning and bi-weekly demos.',
        tags: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Firebase', 'CI/CD'],
        link: 'https://github.com/efuayankey',
      },
    ],
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/efuayankey', primary: true },
    ],
  },

  experience: {
    eyebrow: ':experience',
    title: 'Experience',
    subtitle: 'Research · Engineering · Building in production',
    rdf: `:Efua :workedAt :PrePass , :SWATLab , :WiNSLab ;
  :taughtAt :CSE216 ;
  :leads :NextToIntern .
:PrePass :builtSystem :SafetyAlertEngine .
:NextToIntern :users "70+" ;
  :uptime "99%" ;
  :responseTime "sub-50ms" .
:SWATLab :advisor :ProfHeflin .`,
    items: [
      {
        name: 'Software Engineering Intern',
        meta: 'PrePass · June 2026 – Present',
        desc: 'Built a Safety Alert Engine replacing a CPU-heavy legacy system with decoupled ETL and REST API layers. Ingests Colorado 511 road hazards every 5 min, indexing ~1,000 incidents into Elasticsearch via bulk batching. Shipped a 2-endpoint .NET 10 API serving category and geo-distance driver alerts under 100ms p95, with exponential-backoff retries, circuit breakers, and OpenTelemetry tracing exported to Datadog.',
        tags: ['.NET 10', 'C#', 'Elasticsearch', 'REST APIs', 'OpenTelemetry', 'Datadog'],
      },
      {
        name: 'AI Researcher',
        meta: 'SWAT Lab · Lehigh University · April 2026 – Present',
        desc: 'Neurosymbolic AI — integrating neural networks with backward-chaining reasoners to improve AI query efficiency on knowledge graphs. Implementing learned heuristics with OWL ontologies. Working toward AI that can actually explain itself.',
        tags: ['Neurosymbolic AI', 'OWL', 'Knowledge Graphs', 'Python', 'PyTorch'],
      },
      {
        name: 'SWE & ML Researcher',
        meta: 'AIMES · WiNS Lab · Lehigh · May 2025 – Feb 2026',
        desc: 'Designed and deployed a production LLM-powered clinical training simulator. Engineered prompt-conditioning middleware for culturally-adaptive AI. Reduced model hallucinations 35% via prompt engineering. Integrated IRB compliance guardrails. Presented at ABRCMS 2025.',
        tags: ['LLMs', 'FastAPI', 'AWS', 'GPT-4 API', 'Prompt Engineering', 'Python'],
      },
      {
        name: 'Software Engineer',
        meta: 'NextToIntern · Feb 2025 – Present',
        desc: 'Full-stack platform for student internship prep matching. Architected RESTful API with FastAPI + PostgreSQL achieving sub-50ms response times. CI/CD pipeline with 99% uptime. Led 3-person agile team through sprint planning, PR reviews, and bi-weekly demos.',
        tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Firebase', 'CI/CD', 'Agile'],
      },
      {
        name: 'Teaching Assistant',
        meta: 'Software Engineering, CSE 216 · Lehigh University · Jan 2026 – May 2026',
        desc: 'Supported 64 students building The Buzz, a full-stack social media app, through labs, office hours, PR reviews, and grading. Debugged APIs, PostgreSQL queries, OAuth, CI/CD, and Dokku deployments to help teams unblock technical issues faster.',
        tags: ['Teaching', 'PostgreSQL', 'OAuth', 'CI/CD', 'Dokku'],
      },
    ],
  },

  skills: {
    eyebrow: ':skills',
    title: 'Skills',
    subtitle: 'Languages · AI/ML · Frameworks · Infrastructure',
    rdf: `:Efua :knows :Python , :PyTorch ,
              :ClaudeAPI , :NextJS ,
              :AWS , :TypeScript .`,
    skillGroups: [
      {
        category: 'Languages',
        skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'C#', 'SQL', 'HTML/CSS'],
      },
      {
        category: 'AI / ML',
        skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'MediaPipe', 'GPT-4 API', 'Claude API', 'RAG', 'Prompt Engineering', 'NumPy', 'Pandas', 'PyTorch Geometric'],
      },
      {
        category: 'Frameworks',
        skills: ['Next.js', 'React', 'FastAPI', 'Flask', 'Node.js', '.NET', 'Express', 'Spring Boot', 'Firebase', 'GraphQL', 'Bun'],
      },
      {
        category: 'Infrastructure',
        skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Elasticsearch', 'DynamoDB', 'Kafka', 'CI/CD', 'GitHub Actions', 'Git', 'Linux'],
      },
    ],
  },

  leadership: {
    eyebrow: ':leadership',
    title: 'Leadership',
    subtitle: 'Campus roles · Fellowships · Community',
    rdf: `:Efua :leads :CSAmbassadors ;
  :manages "$8K budget" ;
  :holds :RossinFellowship ,
         :SoarWithUsFellowship .
:CSAmbassadors :connects "100+ students" .
:RossinFellowship :nominatedBy :Faculty , :Dean .`,
    items: [
      {
        name: 'Head of CS Ambassadors',
        meta: 'ChatCSE · Lehigh University',
        desc: 'Leads the peer mentoring program connecting 100+ students with CS faculty. Organizes department events and represents CSE at Lehigh recruiting initiatives.',
        tags: ['Mentorship', 'Community', 'Recruiting'],
      },
      {
        name: 'Treasurer — Women in CS',
        meta: 'WiCS · Lehigh University',
        desc: 'Manages $8K annual budget, coordinates sponsorships, and oversees funding for 40+ member workshops and networking events.',
        tags: ['Finance', 'Sponsorships', 'Events'],
      },
      {
        name: 'Rossin Junior Fellow',
        meta: 'Rossin College of Engineering · Lehigh',
        desc: 'Nominated by the department chair, faculty, and RCEAS Dean. Communications & Marketing Chair. Not applied for — earned.',
        tags: ['Fellowship', 'Engineering', 'Communications'],
      },
      {
        name: 'Soar With Us Fellow',
        meta: 'Spring 2026 · "Who Leads at Lehigh?"',
        desc: 'Gender representation research project. 53 survey respondents. Presented findings at April 2026 showcase.',
        tags: ['Research', 'Gender Equity', 'Lehigh'],
      },
    ],
    memberships: ['ColorStack', 'NSBE', 'RARE Scholar', 'AI-4ALL Ignite', 'WiCS', 'ISAB', 'Rewriting the Code'],
  },

  hackathons: {
    eyebrow: ':hackathons',
    title: 'Hackathons',
    subtitle: 'Fast builds · Real stakes · Ship or go home',
    rdf: `:Efua :competed :Agentathon2026 .
:Agentathon2026 :hostedBy :LehighUniversity ;
  :date "April 2026" ;
  :result :HawkSearch .
:HawkSearch :builtIn "one night" ;
  :uses :ClaudeAPI ;
  :does "faculty matching + cold email drafting" ;
  :won "Best Value (1st Place)" .`,
    stats: [
      { value: '1st', label: 'place · Best Value' },
      { value: '1', label: 'night to ship' },
      { value: '5', label: 'colleges scraped live' },
      { value: '1-click', label: 'cold email to prof' },
    ],
    items: [
      {
        name: 'HawkSearch',
        meta: 'Agentathon · Lehigh University · April 2026 · Best Value, 1st Place',
        desc: 'Built overnight at Lehigh\'s first AI agent hackathon. Scrapes all 5 college faculty pages live, reasons over research profiles using Claude API, scores student-professor fit, and drafts a personalized cold email ready to send in one click. No pre-loaded data — it fetches and reasons in real time. Won Best Value (1st Place).',
        tags: ['Claude API', 'Next.js', 'AI Agents', 'Web Scraping', 'TypeScript'],
        link: 'https://github.com/efuayankey',
      },
    ],
    sections: [
      {
        label: 'The approach',
        text: 'Hackathons aren\'t about polish — they\'re about identifying the sharpest version of a problem and shipping something real before the clock runs out. HawkSearch solved something every Lehigh student actually needs: getting in front of professors for research. One night, one agent, one working demo.',
      },
    ],
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/efuayankey', primary: true },
    ],
  },

  contact: {
    eyebrow: ':contact',
    title: 'Contact',
    subtitle: 'Open to Summer 2027 internships',
    rdf: `:Efua schema:email "efuayankey.0@gmail.com" ;
  :availableFor "Summer 2027 Internships" ;
  :interestedIn :SWE , :MLE , :QuantRoles .`,
    contactCopy: 'Currently recruiting for Summer 2027. Targeting SWE, MLE, and quant-adjacent roles at high-performance tech companies. If you\'re building something real, she wants to hear about it.',
    links: [
      { label: 'Email Me', href: 'mailto:efuayankey.0@gmail.com', primary: true },
      { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/efuayankey' },
      { label: 'GitHub ↗', href: 'https://github.com/efuayankey' },
      { label: 'Resume ↗', href: '#' },
    ],
  },
};
