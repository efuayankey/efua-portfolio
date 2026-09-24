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
  hook?: string;
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
  { id: 'projects',   label: 'Projects',   color: '#a8d8a8', r: 44, tooltipDesc: '5 projects · AI · Distributed Systems' },
  { id: 'experience', label: 'Experience', color: '#f0c674', r: 40, tooltipDesc: '4 roles · Industry + research + teaching' },
  { id: 'skills',     label: 'Skills',     color: '#c4a8d8', r: 38, tooltipDesc: 'Languages · AI/ML · Infra' },
  { id: 'leadership', label: 'Leadership', color: '#6ecfbf', r: 38, tooltipDesc: 'Campus roles · Orgs · Fellowships' },
  { id: 'contact',    label: 'Contact',    color: '#e8552a', r: 34, tooltipDesc: 'Backend · Infra · Distributed Systems · AI' },
  { id: 'ask',        label: 'Ask',        color: '#e8552a', r: 30, tooltipDesc: 'Chat with AI Efua' },
  { id: 'resume',     label: 'Resume',     color: '#e8552a', r: 26, tooltipDesc: 'Request access to full resume →' },
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
  :internedAt :PrePass ;
  :researchesAt :SWATLab ;
  :advisedBy :ProfHeflin ;
  :status "Open to 2027 internships" .`,
    sections: [
      {
        label: 'Who I am',
        text: 'I\'m Efua, a CS + Engineering student at Lehigh. I\'ve spent the last few years building across different parts of software — products for students, backend systems, AI research — but lately I\'ve found myself especially drawn to backend engineering, infrastructure, and distributed systems.\n\nA lot of what I build starts pretty simply: I run into something I wish existed, or get curious enough about how something works that I want to build my own version of it. NSMQ MasterQuiz started that way — I originally built it to help myself practice for the National Science & Maths Quiz, and students at my former high school are still using it years later. That same curiosity has since taken me into everything from distributed task processing to AI-powered tools.',
      },
      {
        label: 'Right now',
        text: 'I\'m doing neurosymbolic AI research at Lehigh, exploring how neural models can produce explanations that are actually easy for people to understand. I also just wrapped up a software engineering internship at PrePass, where I worked on the backend of a real-time safety-alert system — the kind of project that made me even more interested in the systems behind a product: how they communicate, scale, recover when things fail, and stay reliable when people actually depend on them.\n\nI\'m still exploring AI alongside all of that, especially where it overlaps with systems and infrastructure. Outside of CS, I\'m usually listening to music, taking photos, or watching basketball — probably more basketball than I should :)',
      },
    ],
    links: [
      { label: 'Email Me', href: 'mailto:efuayankey123@gmail.com', primary: true },
      { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/efuayankey' },
      { label: 'GitHub ↗', href: 'https://github.com/efuayankey' },
      { label: 'Resume ↗', href: 'https://docs.google.com/document/d/1-layYoHlzmarjr5rbgDIHdXKIbuEdIeDaFOY0hx88iM/edit?usp=sharing' },
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
    subtitle: 'AI agents · Distributed systems · Full-stack platforms',
    rdf: `:Efua :builds "from curiosity,
               competitions, and
               real problems" .`,
    items: [
      {
        name: 'Dispatch',
        meta: 'Distributed Task Processing Platform',
        hook: 'Built around a simple problem: keeping an app responsive even when the work happening behind it gets heavy.',
        desc: 'Dispatch moves long-running work out of the request path and onto distributed background workers, cutting API response time from 4.8s to 180ms. Queue-based autoscaling handles 1,200+ tasks/min through 10× traffic bursts, while retries, idempotency, dead-letter queues, and PostgreSQL-backed state keep jobs recoverable when things fail.',
        tags: ['Python', 'Go', 'FastAPI', 'PostgreSQL', 'Redis', 'Azure Service Bus', 'Docker', 'Terraform'],
        link: 'https://github.com/efuayankey/dispatch',
      },
      {
        name: 'NextToIntern',
        meta: 'Internship Prep & Matching Platform',
        hook: 'Getting a mock interview shouldn\'t depend on knowing the right people.',
        desc: 'Used by 150+ Lehigh students, this internship-prep platform helps them find mock-interview and recruiting partners based on what they\'re actually preparing for. A hybrid matching system combines rule-based filtering with LLM ranking across role, availability, and interview goals — with gamified matching and leaderboards built in to make consistent practice easier to stick with.',
        tags: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'OpenAI API', 'Docker'],
        link: 'https://github.com/efuayankey',
      },
      {
        name: 'HawkSearch',
        meta: 'AI Research-Matching Agent',
        hook: 'Finding the right professor shouldn\'t mean digging through dozens of faculty pages.',
        desc: 'Scans all 5 Lehigh colleges\' faculty pages live — no pre-loaded data, fetching and reasoning in real time. Claude API ranks student-professor fit on a 0–100 scale with reasoning, strengths, and gaps, then drafts a personalized email through Google OAuth and the Gmail API, ready to send in one click. Won Best Value, 1st Place at Lehigh\'s 2026 Agentathon.',
        tags: ['Claude API', 'Next.js', 'Gmail API', 'AI Agents', 'Web Scraping', 'TypeScript'],
        link: 'https://github.com/efuayankey',
      },
      {
        name: 'NSMQ MasterQuiz',
        meta: 'Gamified STEM Competition Prep Platform',
        hook: 'Started as a way to keep practicing for the National Science & Maths Quiz outside team sessions — four years later, students at my former high school are still using it.',
        desc: 'Timed rounds, live scoring, leaderboards, and progress tracking recreate the pace and pressure of real NSMQ competition rounds. Now in its 4th year of use, it\'s been iterated on repeatedly — question delivery, practice flows, and usability — based on direct feedback from multiple student cohorts.',
        tags: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'OpenAI API'],
        link: 'https://github.com/efuayankey/nsmq-recruitment-app',
      },
      {
        name: 'PulseGrid',
        meta: 'Distributed Infrastructure Monitoring Platform',
        hook: 'How do you tell a dead agent from one that\'s just slow to report in?',
        desc: 'Built with a small team. Python agents stream CPU, memory, and logs every 5 sec into a FastAPI monitoring backend. Redis TTL heartbeats mark agents offline within 30 sec and serve cached live metrics, while PostgreSQL stores longer-term history with threshold alerts and cooldown deduplication. A Next.js dashboard surfaces all of it — healthy, delayed, or offline — at a glance.',
        tags: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'Docker'],
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
  :taughtAt :CSE216 .
:PrePass :builtSystem :SafetyAlertEngine .
:SWATLab :advisor :ProfHeflin .`,
    items: [
      {
        name: 'Software Engineering Intern',
        meta: 'PrePass · June 2026 – September 2026',
        desc: 'Worked on the backend and infrastructure for a real-time safety alert system that ingested Colorado road-hazard data and served it through low-latency APIs. Worked across ingestion, Elasticsearch, reliability, observability, and deployment, with the system designed around a sub-100ms p95 API target.',
        tags: ['.NET', 'C#', 'Elasticsearch', 'Azure', 'OpenTelemetry', 'Datadog'],
      },
      {
        name: 'AI Researcher',
        meta: 'SWAT Lab · Lehigh University · April 2026 – Present',
        desc: 'Researching neurosymbolic AI, with a focus on making neural models produce explanations that are easier to understand as logical rules. Building and testing models that connect learned representations with symbolic reasoning, with the broader goal of making AI systems more interpretable.',
        tags: ['Neurosymbolic AI', 'PyTorch', 'Knowledge Graphs', 'Logic', 'Python'],
      },
      {
        name: 'SWE & ML Researcher',
        meta: 'WiNS Lab · Lehigh University · May 2025 – Feb 2026',
        desc: 'Worked on AIMES, a culturally adaptive AI platform for student support and counselor training. Helped build and evaluate the system, worked on the LLM behavior and application experience, and supported an IRB-approved user study. Later presented the research at ABRCMS 2025.',
        tags: ['Next.js', 'Firebase', 'OpenAI API', 'LLMs', 'Python'],
      },
      {
        name: 'Teaching Assistant',
        meta: 'Lehigh University · CSE 216 · Jan 2026 – May 2026',
        desc: 'Supported 64 students building and deploying The Buzz, a full-stack social media app, helping with debugging, code reviews, labs, and office hours. Worked with students on backend APIs, PostgreSQL, authentication, CI/CD, and deployment issues while also grading and reviewing project work.',
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
    subtitle: 'Let\'s talk.',
    rdf: `:Efua schema:email "efuayankey123@gmail.com" ;
  :interestedIn :BackendSystems ,
                :Infrastructure ,
                :DistributedSystems ,
                :AI ;
  :openTo :Opportunities ,
          :Collaboration ,
          :Conversation .`,
    contactCopy: 'If something here caught your attention — a project, a research idea, or something you\'re building — feel free to reach out. I\'m interested in software engineering opportunities, especially work around backend systems, infrastructure, distributed systems, and AI. I\'m also always open to talking about interesting problems, research, projects, or potential collaborations.',
    links: [
      { label: 'Email Me', href: 'mailto:efuayankey123@gmail.com', primary: true },
      { label: 'LinkedIn ↗', href: 'https://linkedin.com/in/efuayankey' },
      { label: 'GitHub ↗', href: 'https://github.com/efuayankey' },
      { label: 'Instagram ↗', href: 'https://www.instagram.com/efua.yankey/' },
    ],
  },
};
