// ============================================================
//  ALL PORTFOLIO CONTENT LIVES HERE. Edit this file, not the UI.
//  Empty strings ("") for links are simply hidden on the site.
// ============================================================

export const profile = {
  handle: "Akaza",
  name: "Kushagra Singh Tomar",
  location: "Indore, India",
  email: "kushgratomar@gmail.com",
  resume: "/Kushagra_Singh_Tomar_Resume.pdf",
  // Used for the "months coding" counter
  codingSince: "2025-11-01",
  tagline:
    "Java backend dev. Cybersecurity learner. I build things that hold up when systems collapse.",
  roles: [
    "Java Backend Developer",
    "Cybersecurity Learner",
    "Full-Stack Builder",
    "Azure Administrator Associate",
  ],
  about: [
    "My origin story didn't start with a keyboard; it started with a screwdriver. Long before I wrote my first line of code, I was the kid dismantling toys and gadgets just to see what made them tick.",
    "That drive to reverse-engineer the world around me eventually evolved into a passion for software and security. Today, as a B.Tech CSIT student, I’ve traded plastic gears for backend architecture and cybersecurity exploits. I don’t just want to use technology—I want to break it down, understand the core, and build it back stronger.",
    "For me, it’s never been about just consuming cool tech. It’s about dissecting it, mastering it, and discovering what’s possible when relentless curiosity meets code.",
  ],
  facts: [
    ["Base", "Indore, India"],
    ["College", "AITR, Indore (RGPV Bhopal)"],
    ["Degree", "B.Tech CSIT, 2024 to 2028"],
    ["Focus", "Java Backend, Cybersecurity"],
    ["Languages", "Hindi, English"],
    ["Off-duty", "Chess, learning new tech"],
  ],
};

export const socials = [
  { key: "github", label: "GitHub", href: "https://github.com/kushagra31-coder" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/kushagra-singh-tomar-94ba55277" },
  { key: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/akazakoyuki/" },
  { key: "tryhackme", label: "TryHackMe", href: "https://tryhackme.com/p/kushgratomar" },
  { key: "mail", label: "Email", href: "mailto:kushgratomar@gmail.com" },
];

export const nav = [
  ["about", "About"],
  ["projects", "Missions"],
  ["skills", "Arsenal"],
  ["wins", "Wins"],
  ["certs", "Certs"],
  ["contact", "Contact"],
];

// ---------------- MAIN MISSIONS (order matters) ----------------
export const projects = [
  {
    id: "student-dashboard",
    title: "STUDENT DASHBOARD",
    tagline: "A Java student management system, built the hard way.",
    desc: "Student management system built on the MVC pattern: JSP views with a custom neobrutalist design system, Java Servlet controllers with session validation and input sanitation, and a Java Beans + DAO model layer running secure PreparedStatements against MySQL. Built with Apache Maven, deployed on Apache Tomcat.",
    points: [
      "MVC architecture: JSP views, Servlet controllers, DAO model",
      "Secure authentication with multi-layered email validation",
      "Dashboard with stats tracking across projects and documents",
      "Projects showcase and document/certificate storage",
    ],
    stack: ["Java", "JSP", "Servlets", "JDBC", "DAO", "MySQL", "Apache Tomcat", "Maven"],
    role: "Backend Developer",
    period: "2026",
    status: "Shipped",
    links: [
      { label: "GitHub", href: "https://github.com/kushagra31-coder/student-dashboard" },
    ],
  },
  {
    id: "shield-ai",
    title: "SHIELD-AI",
    tagline: "A safety app for women and every citizen who walks home alone.",
    desc: "Emergency SOS response and personal safety system for women and vulnerable commuters. Delivers instant one-tap emergency alerts with live GPS tracking, trusted contact broadcasts, and an offline queue ensuring distress packets dispatch even through cellular dropouts. Conducted security vulnerability assessments, attack-surface analysis, and edge-case backend debugging for fail-safe telemetry.",
    points: [
      "One-tap SOS alerts with live location telemetry",
      "Emergency broadcast to trusted safety contacts",
      "Offline incident queueing for low-connectivity zones",
      "Security analysis & fail-safe network debugging",
    ],
    stack: ["React Native", "Expo", "TypeScript", "FastAPI", "Supabase", "Python"],
    role: "Security Researcher & Debugger",
    period: "2026",
    status: "Shipped",
    links: [
      { label: "GitHub", href: "https://github.com/kushagra31-coder/SHEild-AI" },
    ],
  },
  {
    id: "network-scanner",
    title: "NETWORK SCANNER",
    tagline: "A packet sniffer built from scratch — see what your network is really saying.",
    desc: "Packet sniffer and network vulnerability detector built from scratch with Scapy by a two-person team (Kushagra & Jatin). Captures raw packets in real time, dissects protocol payloads, flags suspicious network activity, and runs automated diagnostic sweeps.",
    points: [
      "Real-time packet sniffing and protocol dissection with Scapy",
      "Suspicious traffic and vulnerability detection rules",
      "Diagnostic scanner experiments built as a two-person team",
    ],
    stack: ["Python", "Scapy", "Network Security"],
    role: "Co-Creator & Contributor",
    period: "2026",
    status: "In progress",
    links: [
      { label: "GitHub", href: "https://github.com/Jatin-nicon/NetworkScanner" },
    ],
  },
  {
    id: "ultron",
    title: "ULTRON",
    tagline: "A fully offline voice assistant for Windows. No cloud, no subscription.",
    desc: "Offline voice agent: faster-whisper speech-to-text, a local Qwen planner through Ollama, and Kokoro-ONNX text-to-speech. Dynamic Pydantic tool schemas, ChromaDB memory, openWakeWord 'hey jarvis' spotting, floating UI, morning briefings and reminder nudges.",
    points: [
      "100% offline: STT, local LLM planner, local TTS",
      "Dynamic Pydantic tool schemas",
      "ChromaDB conversational memory",
      "openWakeWord hotword spotting",
    ],
    stack: ["Python", "faster-whisper", "Ollama", "Qwen", "Kokoro-ONNX", "ChromaDB"],
    role: "Solo Developer",
    period: "2026",
    status: "Ongoing",
    links: [
      { label: "GitHub", href: "https://github.com/kushagra31-coder/ultron_mamu" },
    ],
  },
  {
    id: "eduduty",
    title: "EDUDUTY",
    tagline: "Duty scheduling and attendance for the MST exam season.",
    desc: "Portal for managing exam-season duties: MST seat-map attendance tracking, a duty auto-scheduler, compulsory VT/follow-up flagging, a real-data dashboard, and an AI assistant chain.",
    points: [
      "MST seat-map attendance tracker",
      "Duty auto-scheduler",
      "VT/follow-up compulsory flagging",
      "AI-driven assistant query chain",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "JWT"
    ],
    role: "Frontend, Authentication & AI",
    period: "Sep–Oct 2026",
    status: "Shipped",
    links: [
      { label: "GitHub", href: "https://github.com/kushagra31-coder/eduduty" },
    ],
  },
];

// ---------------- SKILLS ----------------
export const skills = [
  { title: "LANGUAGES", items: ["Java", "C++", "JavaScript", "TypeScript"] },
  { title: "BACKEND AND WEB", items: ["Spring Boot", "Java EE", "JSP", "Servlets", "JDBC", "REST APIs", "JWT Auth", "HTML", "Tailwind CSS"] },
  { title: "DATABASE", items: ["MySQL", "PostgreSQL", "Supabase", "MongoDB"] },
  { title: "CLOUD AND AI", items: ["AWS", "Microsoft Azure", "Prompt Engineering", "LLM Applications"] },
  { title: "SECURITY", items: ["Nmap", "Wireshark", "Burp Suite", "SQL Injection", "XSS", "Web Exploitation", "Recon", "API Security"] },
  { title: "TOOLS", items: ["Git", "GitHub", "Vercel", "Render", "Kali Linux", "VS Code", "Maven", "Postman"] },
];

export const terminal = [
  { c: "$ whoami", t: "cmd" },
  { c: "akaza // cybersecurity learner", t: "out" },
  { c: "$ ls ./focus", t: "cmd" },
  { c: "recon  web-exploitation  access-control  api-security  llm-attacks", t: "out" },
  { c: "$ cat labs.txt", t: "cmd" },
  { c: "race conditions -> double-spend (Burp Suite + Turbo Intruder)", t: "out" },
  { c: "directory enumeration + source reconnaissance", t: "out" },
  { c: "buffer overflow offset calculation", t: "out" },
  { c: "prompt injection against LLM / RAG agents", t: "out" },
  { c: "$ status --vector", t: "cmd" },
  { c: "VECTOR: Where Systems Collapse ... completed [OK]", t: "ok" },
];

// ---------------- ACHIEVEMENTS (Hall of Hits) ----------------
export const achievements = [
  {
    id: "sih-2026",
    title: "Smart India Hackathon 2026",
    badge: "BOOM!",
    sfx: "BOOM!",
    status: "Ongoing",
    pill: "Ongoing",
    date: "2026 · National result awaited",
    summary:
      "Two problem statements, two working demos. MPLADS cleared three internal rounds and is now on the national portal.",
    text:
      "Two problem statements, two working demos. MPLADS cleared three internal rounds and is now on the national portal.",
    details: {
      paragraphs: [
        "Two problem statements, two working demos. One was oil spill detection and vessel attribution. The other was MPLADS, the scheme that lets MPs fund development work in their constituencies. The oil spill build was the more complex one, and it didn't get selected. MPLADS did.",
        "SIH 2025 ended for me before the national portal. This year it didn't. MPLADS cleared three rounds, department, inter-department and institute, and our idea PPT and demo video are now on the national portal.",
        "Before building anything, I dug into the problem itself: what exactly goes wrong, and has anyone solved it already? We found no existing solution. So we designed one: a scoring system with seven risk factors that flags a contract as likely to stall, fail or turn fraudulent. The national result is expected around November.",
      ],
      role: "Problem research and backend. Team project.",
      highlights: [
        "Two problem statements, two working demos",
        "Missed the national portal in 2025, made it in 2026",
        "Three internal rounds cleared: department, inter-department, institute",
        "Seven-factor risk scoring to flag failing or fraudulent MPLADS contracts",
      ],
      links: [
        { label: "GitHub (Oil Spill)", url: "https://github.com/kushagra31-coder/SIH26143" },
        { label: "GitHub (MPLADS)", url: "https://github.com/bhagyesh-jain/mplads-intelligence" },
      ],
    },
  },
  {
    id: "adobe-2026",
    title: "Adobe Hackathon 2026",
    badge: "ZAP!",
    sfx: "ZAP!",
    status: "Round 2 cleared",
    pill: "Round 2 cleared",
    date: "2026",
    summary:
      "Cleared the coding round and a brand-visibility case study as a team of three. Reached Round 3.",
    text:
      "Cleared the coding round and a brand-visibility case study as a team of three. Reached Round 3.",
    details: {
      paragraphs: [
        "Three of us, me, Bhagyesh and Haripriya, took on the Adobe hackathon as one team. Round 1 was a timed coding test, and we cleared it with all test cases passing.",
        "Round 2 was a brand-visibility case study, and none of us had done one before. So we learned how: how case studies are structured, how brand visibility works, how AI-driven feeds decide what to show people, and why Canva wins attention in a space where Adobe struggles.",
        "Round 3 is where we stopped. I'm still proud of it. A coding round under the clock, then a business problem none of us had touched, and we got through both.",
      ],
      role: "Coding round and case-study research. Team of three.",
      highlights: [
        "Cleared the timed coding round, all test cases passing",
        "Researched brand visibility, AI feed ranking, and Adobe vs Canva",
        "Reached Round 3 as a team of three",
      ],
      links: [],
    },
  },
  {
    id: "besti-2025",
    title: "BESTI 2025",
    badge: "WHAM!",
    sfx: "WHAM!",
    status: "Runner-up",
    pill: "Runner-up",
    date: "Oct 2025",
    summary:
      "Presented an AI-based farmer query and advisory system at an international conference at AITR. Placed as a runner-up.",
    text:
      "Presented an AI-based farmer query and advisory system at an international conference at AITR. Placed as a runner-up.",
    details: {
      paragraphs: [
        "BESTI 2025 was an international conference hosted at our own college. It came right after SIH 2025, where we didn't get through to the national round, so this was the next place to put my work in front of people.",
        "I presented my AI-based Farmer Query Support and Advisory System, and the talk centered on its sustainability: whether a system like this can keep serving farmers over the long run.",
        "I placed as a runner-up.",
      ],
      role: "Presenter and builder",
      highlights: [
        "International conference, hosted at AITR",
        "AI system for farmer queries and advisory",
        "Placed as a runner-up",
      ],
      links: [],
    },
  },
  {
    id: "vector-2026",
    title: "VECTOR Cybersecurity Lab",
    badge: "POW!",
    sfx: "POW!",
    status: "Completed",
    pill: "Completed",
    date: "Jun 2026",
    summary:
      "Week-long TryHackMe labs on real attack paths: XSS, SQL injection, JWT, API and LLM attacks. Certified.",
    text:
      "Week-long TryHackMe labs on real attack paths: XSS, SQL injection, JWT, API and LLM attacks. Certified.",
    details: {
      paragraphs: [
        "VECTOR: Where Systems Collapse was a hands-on security program by Vulnshields and Cyber Secured India, with MKITOS and OPSWAT Academy. Each week brought one TryHackMe lab with three or four tasks, and a week to find every flag.",
        "The labs covered recon, cross-site scripting, SQL injection, access control, JWT authentication, API security and attacks on LLM applications. A lot of it came down to recon first: inspect, enumerate, then exploit.",
        "I completed the full series and earned the certificate on 2 Jun 2026.",
      ],
      role: "Participant",
      highlights: [
        "One lab a week, flags to capture within the week",
        "XSS, SQL injection, access control, JWT, API security, LLM attacks",
        "Certificate of completion, 2 Jun 2026",
      ],
      links: [
        { label: "Cyber Secured India", url: "https://www.linkedin.com/company/cybersecuredindia/home/" },
      ],
    },
  },
  {
    id: "ieee-tems",
    title: "IEEE TEMS Volunteer",
    badge: "KRAKOOM!",
    sfx: "KRAKOOM!",
    status: "Active",
    pill: "Volunteer",
    date: "Since Dec 2025",
    summary:
      "Co-webmaster of the IEEE TEMS student chapter at AITR. I run design and technical communication for its events.",
    text:
      "Co-webmaster of the IEEE TEMS student chapter at AITR. I run design and technical communication for its events.",
    details: {
      paragraphs: [
        "I'm co-webmaster of the IEEE TEMS Student Chapter at AITR, and I joined on 19 Dec 2025.",
        "I handle the chapter's design and technical communication: Canva creatives, presentation decks and technical content for each event, across the three or four events so far.",
      ],
      role: "Co-webmaster",
      highlights: [
        "Creatives and presentation decks for 3 to 4 chapter events",
        "Technical content for chapter events",
        "Joined 19 Dec 2025",
      ],
      links: [],
    },
  },
  {
    id: "ikigai-2026",
    title: "IKIGAI 2026 Volunteer",
    badge: "BULLSEYE!",
    sfx: "BULLSEYE!",
    status: "Completed",
    pill: "Volunteer",
    date: "2026",
    summary:
      "Volunteered at our department's 36-hour hackathon with teams from 23 states, and built its certificate verification system.",
    text:
      "Volunteered at our department's 36-hour hackathon with teams from 23 states, and built its certificate verification system.",
    details: {
      paragraphs: [
        "IKIGAI 2026 was a 36-hour hackathon run by our CSIT department. Teams came from 23 states to our campus in Madhya Pradesh. I had two jobs.",
        "On the ground, I looked after participants for the full 36 hours: team coordination, mentoring, and sorting out whatever teams needed, from project questions to everything in between.",
        "Off the ground, Bhagyesh and I built a certificate verification system. Mentor, winner and participation certificates had to reach everyone, and handing them out one by one wasn't realistic. So anyone can now look up their certificate by name or certificate ID, or scan the QR code on it, and see which certificates are theirs.",
      ],
      role: "Volunteer and co-builder of the verification system",
      highlights: [
        "Participants from 23 states, 36 hours non-stop",
        "Mentoring and team management on the ground",
        "QR, name and certificate ID verification for every certificate type",
      ],
      links: [
        {
          label: "GitHub (Certificate Database)",
          url: "https://github.com/bhagyesh-jain/Hackathon-Certificate-Database-v2",
        },
      ],
    },
  },
  {
    id: "codershigh",
    title: "CodersHigh Member",
    badge: "SHAZAM!",
    sfx: "SHAZAM!",
    status: "Active",
    pill: "Member",
    date: "Ongoing",
    summary:
      "Discussion-first algorithms and tech club led by Dr. S. R. S. Sudarshan Iyengar (IIT Ropar). Zoom sessions, no AI help on the problems.",
    text:
      "Discussion-first algorithms and tech club led by Dr. S. R. S. Sudarshan Iyengar (IIT Ropar). Zoom sessions, no AI help on the problems.",
    details: {
      paragraphs: [
        "CodersHigh is an algorithms club led by Dr. S. R. S. Sudarshan Iyengar of IIT Ropar. It meets on Zoom and it's discussion-first: he names a problem, explains it as a story, and we work out how it could possibly be done.",
        "The rule is no AI and no outside help. Just intuition and maths up to 10th class, and anything beyond that we have to reason out and explain. Some problems take us weeks. We've worked through RSA, Huffman coding, greedy algorithms, compression, and how a platform like YouTube counts views at scale.",
        "Beyond algorithms, the discussions run across new technology, the latest AI developments and philosophy.",
      ],
      role: "Member (Featured in Hall of Fame)",
      highlights: [
        "Discussion-first algorithm sessions on Zoom",
        "No-AI rule: intuition, maths, and explaining it",
        "RSA, Huffman coding, greedy algorithms, compression, view counting",
        "Open discussions on new tech, AI and philosophy",
      ],
      links: [
        {
          label: "Hall of Fame",
          url: "https://sudarshansudarshan.github.io/codershigh/hall-of-fame/",
        },
        {
          label: "LinkedIn",
          url: "https://www.linkedin.com/company/codershigh/posts/",
        },
      ],
    },
  },
];

// ---------------- CERTIFICATES ----------------
// img: file inside /public/certs. Leave "" if you have no image yet.
export const certs = [
  {
    title: "Azure Administrator Associate",
    issuer: "Microsoft",
    date: "Oct 2026",
    detail: "Microsoft Certified. Credential ID and verification link to be added.",
    img: "/certs/azure.jpg",
    href: "",
  },
  {
    title: "VECTOR: Where Systems Collapse",
    issuer: "Vulnshields x Cyber Secured India",
    date: "2 Jun 2026",
    detail: "Recon, web exploitation, access control, API security and LLM attacks. With MKITOS and OPSWAT Academy.",
    img: "/certs/vector.jpg",
    href: "",
  },
  {
    title: "Web Development Internship",
    issuer: "SkillOrbit x Aroha Edge",
    date: "Apr to May 2026",
    detail: "Responsive web apps, REST APIs, authentication and database integration.",
    img: "/certs/skillorbit.jpg",
    href: "",
  },
  {
    title: "Programming in Java (Elite)",
    issuer: "NPTEL, IIT Kharagpur",
    date: "Jan to Apr 2026",
    detail: "12 week course. Consolidated score 69%.",
    img: "/certs/nptel-java.jpg",
    href: "",
  },
  {
    title: "Building LLM Apps With Prompt Engineering",
    issuer: "NVIDIA",
    date: "11 Dec 2025",
    detail: "Certificate of Competency.",
    img: "/certs/nvidia.jpg",
    href: "",
  },
  {
    title: "AWS Academy: Cloud Foundations",
    issuer: "AWS Academy",
    date: "24 Nov 2025",
    detail: "20 hours. Training badge.",
    img: "/certs/aws-cloud.jpg",
    href: "https://www.credly.com/go/941HxIEv",
  },
];
