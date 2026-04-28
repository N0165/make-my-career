const careerData = {
  domains: [
    {
      id: "data_science",
      name: "Data Science & Analytics",
      emoji: "📊",
      keywords: ["data", "analytics", "statistics", "math", "mathematics", "numbers", "research", "analysis"],
      description: "One of India's fastest-growing fields with massive demand across tech, fintech, and startups. Analytical thinkers with problem-solving interest thrive here.",
      futureScope: "High Demand",
      topRoles: ["Data Analyst", "Data Scientist", "ML Engineer"],
      roles: [
        {
          title: "Data Analyst",
          level: "Entry",
          description: "Analyze business data and create reports and dashboards to help companies make decisions.",
          salary: "₹3.5–7 LPA",
          tools: ["Excel", "SQL", "Power BI", "Python", "Tableau"],
          companies: ["TCS", "Infosys", "Accenture", "Flipkart", "Paytm"],
          skills: ["SQL", "Excel", "Data Visualization", "Statistics", "Python basics"]
        },
        {
          title: "Business Intelligence Analyst",
          level: "Entry",
          description: "Build dashboards and reports that translate raw data into business insights.",
          salary: "₹4–8 LPA",
          tools: ["Power BI", "Tableau", "SQL", "Excel", "Google Data Studio"],
          companies: ["Wipro", "HCL", "Capgemini", "Deloitte", "KPMG"],
          skills: ["Power BI", "SQL", "Business Analysis", "Data Modeling", "Storytelling"]
        },
        {
          title: "Data Scientist",
          level: "Mid",
          description: "Build machine learning models and statistical analyses to solve complex business problems.",
          salary: "₹8–18 LPA",
          tools: ["Python", "R", "TensorFlow", "Scikit-learn", "Spark"],
          companies: ["Amazon", "Microsoft", "Razorpay", "Swiggy", "Meesho"],
          skills: ["Machine Learning", "Python", "Statistics", "Feature Engineering", "Model Deployment"]
        },
        {
          title: "ML Engineer",
          level: "Mid",
          description: "Deploy and scale machine learning models into production systems.",
          salary: "₹12–22 LPA",
          tools: ["Python", "TensorFlow", "Docker", "Kubernetes", "AWS SageMaker"],
          companies: ["Google", "Flipkart", "Ola", "CRED", "PhonePe"],
          skills: ["MLOps", "Python", "Cloud Platforms", "Docker", "API Development"]
        },
        {
          title: "Data Science Lead",
          level: "Senior",
          description: "Lead data science teams and define the AI/ML strategy for the organization.",
          salary: "₹22–45 LPA",
          tools: ["Python", "Cloud Architecture", "Spark", "Databricks"],
          companies: ["Google India", "Amazon", "Goldman Sachs", "Walmart Global Tech"],
          skills: ["Team Leadership", "Strategy", "Advanced ML", "Communication", "System Design"]
        }
      ],
      roadmap: {
        timeline: "8–12 months",
        difficulty: "Medium",
        demandLevel: "High",
        realityCheck: "Data Science is highly competitive in India — thousands of graduates apply for the same roles. What separates candidates is a strong portfolio of real projects on Kaggle or GitHub and solid SQL + Python fundamentals. Don't skip the basics.",
        steps: [
          { title: "Python & Math Foundations", duration: "6 weeks", description: "Learn Python programming and essential math — statistics, probability, and linear algebra basics.", skills: ["Python", "NumPy", "Pandas", "Statistics", "Probability"], resources: ["NPTEL Python Course (Free)", "Khan Academy Stats", "W3Schools", "GeeksforGeeks"] },
          { title: "SQL & Data Analysis", duration: "4 weeks", description: "Master SQL for data extraction and Excel/Power BI for visualization.", skills: ["SQL", "Power BI", "Excel", "Data Cleaning", "EDA"], resources: ["Mode SQL Tutorial (Free)", "Microsoft Power BI Learning", "Kaggle SQL Course"] },
          { title: "Machine Learning", duration: "10 weeks", description: "Learn core ML algorithms and apply them on real datasets from Kaggle.", skills: ["Scikit-learn", "Regression", "Classification", "Clustering", "Model Evaluation"], resources: ["Coursera ML by Andrew Ng (Audit Free)", "Kaggle Learn", "Fast.ai"] },
          { title: "Portfolio Projects", duration: "6 weeks", description: "Build 3 end-to-end projects — one each on prediction, classification, and NLP or computer vision.", skills: ["Project Design", "GitHub", "Storytelling", "Jupyter Notebooks"], resources: ["Kaggle Competitions", "GitHub", "Medium blogs"] },
          { title: "Job Preparation", duration: "4 weeks", description: "Prepare resume, LinkedIn, and practice interview questions including statistics and ML theory.", skills: ["Resume Writing", "Interview Prep", "LinkedIn Optimization", "Communication"], resources: ["Glassdoor", "LeetCode", "Internshala", "Analytics Vidhya"] }
        ],
        certifications: ["Google Data Analytics Certificate (Coursera)", "IBM Data Science Professional Certificate", "Microsoft Power BI Data Analyst (PL-300)", "Kaggle Data Science Certificate"]
      }
    },
    {
      id: "software_dev",
      name: "Software Development",
      emoji: "💻",
      keywords: ["coding", "programming", "software", "development", "tech", "technology", "computer", "web", "app", "application", "engineering"],
      description: "The backbone of India's ₹200B+ IT industry. Vast opportunities from product startups to MNCs across every city.",
      futureScope: "High Demand",
      topRoles: ["Frontend Developer", "Backend Engineer", "Full Stack Dev"],
      roles: [
        {
          title: "Junior Frontend Developer",
          level: "Entry",
          description: "Build user interfaces and web pages using HTML, CSS, and JavaScript frameworks.",
          salary: "₹3–6 LPA",
          tools: ["HTML", "CSS", "JavaScript", "React", "Git"],
          companies: ["TCS", "Infosys", "Wipro", "Freshworks", "Zoho"],
          skills: ["HTML/CSS", "JavaScript", "React", "Git", "Responsive Design"]
        },
        {
          title: "Backend Developer",
          level: "Entry",
          description: "Build APIs, databases, and server-side logic that powers applications.",
          salary: "₹4–8 LPA",
          tools: ["Node.js", "Python", "MySQL", "MongoDB", "REST APIs"],
          companies: ["Infosys", "HCL", "Mphasis", "Persistent", "LTIMindtree"],
          skills: ["Node.js or Python", "SQL", "REST API", "Git", "Linux basics"]
        },
        {
          title: "Full Stack Developer",
          level: "Mid",
          description: "Handle both frontend and backend development of complete web applications.",
          salary: "₹7–16 LPA",
          tools: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
          companies: ["Razorpay", "Swiggy", "Meesho", "CRED", "Groww"],
          skills: ["React", "Node.js", "Databases", "Cloud Basics", "System Design"]
        },
        {
          title: "Software Engineer II",
          level: "Mid",
          description: "Design and implement scalable features and systems for large products.",
          salary: "₹12–22 LPA",
          tools: ["Java/Python/Go", "Microservices", "Kubernetes", "AWS", "Redis"],
          companies: ["Amazon", "Microsoft", "Flipkart", "PhonePe", "Ola"],
          skills: ["System Design", "DSA", "Cloud", "Microservices", "Code Reviews"]
        },
        {
          title: "Senior Software Engineer",
          level: "Senior",
          description: "Lead technical design decisions and mentor junior engineers on complex systems.",
          salary: "₹20–45 LPA",
          tools: ["Architecture", "Cloud", "System Design", "Leadership"],
          companies: ["Google", "Microsoft", "Amazon", "Atlassian", "Uber India"],
          skills: ["Architecture", "Technical Leadership", "Mentoring", "System Design", "Strategy"]
        }
      ],
      roadmap: {
        timeline: "6–10 months",
        difficulty: "Medium",
        demandLevel: "High",
        realityCheck: "India produces 1.5 million engineers every year — the job market is competitive but opportunity is massive for those who are genuinely skilled. Consistency beats talent. Build daily, push to GitHub daily, and crack DSA on LeetCode seriously.",
        steps: [
          { title: "Core Programming", duration: "6 weeks", description: "Master one language deeply — Python or JavaScript. Learn logic, loops, functions, and OOP.", skills: ["Python or JS", "OOP", "Problem Solving", "Logic Building"], resources: ["CS50 Harvard (Free)", "freeCodeCamp", "GeeksforGeeks", "NPTEL"] },
          { title: "Web Development Basics", duration: "6 weeks", description: "Learn HTML, CSS, JavaScript, and build your first websites from scratch.", skills: ["HTML", "CSS", "JavaScript", "DOM Manipulation", "Responsive Design"], resources: ["freeCodeCamp (Free)", "The Odin Project (Free)", "MDN Web Docs"] },
          { title: "Frontend or Backend Framework", duration: "8 weeks", description: "Pick React for frontend or Node.js/Django for backend and build real projects.", skills: ["React or Node.js", "APIs", "Git & GitHub", "NPM/Packages"], resources: ["React Official Docs", "Node.js Official Docs", "YouTube (Traversy Media)", "Scrimba"] },
          { title: "DSA & Problem Solving", duration: "8 weeks", description: "Practice Data Structures and Algorithms — essential for every tech interview in India.", skills: ["Arrays", "Linked Lists", "Trees", "Dynamic Programming", "Graphs"], resources: ["LeetCode (Free)", "GeeksforGeeks", "Striver's DSA Sheet", "NeetCode.io"] },
          { title: "Portfolio + Job Applications", duration: "4 weeks", description: "Build 3 projects, publish on GitHub, optimize LinkedIn, and start applying on Internshala and LinkedIn.", skills: ["Portfolio", "Resume", "GitHub Profile", "Interview Prep"], resources: ["Internshala", "LinkedIn Jobs", "AngelList", "Glassdoor"] }
        ],
        certifications: ["Meta Frontend Developer Certificate (Coursera)", "Google IT Support Certificate", "AWS Certified Cloud Practitioner", "MongoDB Developer Certificate"]
      }
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      emoji: "🔐",
      keywords: ["cybersecurity", "security", "hacking", "ethical hacking", "network", "cyber", "forensics", "protection", "privacy"],
      description: "Critical shortage of 1M+ professionals in India by 2025. High salaries and rapid career growth in a field that protects every digital system.",
      futureScope: "High Demand",
      topRoles: ["SOC Analyst", "Security Engineer", "Penetration Tester"],
      roles: [
        {
          title: "SOC Analyst (L1)",
          level: "Entry",
          description: "Monitor security alerts, investigate incidents, and escalate threats in a Security Operations Center.",
          salary: "₹3.5–6.5 LPA",
          tools: ["SIEM (Splunk/QRadar)", "Wireshark", "Linux", "Firewalls", "Ticketing Tools"],
          companies: ["TCS", "Infosys", "HCL", "IBM India", "Secureworks"],
          skills: ["Networking Basics", "Linux", "SIEM Tools", "Incident Response", "Threat Analysis"]
        },
        {
          title: "Penetration Tester (Junior)",
          level: "Entry",
          description: "Ethically hack systems to find vulnerabilities before attackers do.",
          salary: "₹4–8 LPA",
          tools: ["Kali Linux", "Metasploit", "Burp Suite", "Nmap", "OWASP"],
          companies: ["Wipro CyberDefense", "Deloitte", "KPMG", "PwC", "Synack"],
          skills: ["Kali Linux", "Web App Testing", "Network Scanning", "Report Writing", "Python scripting"]
        },
        {
          title: "Security Engineer",
          level: "Mid",
          description: "Design and implement security systems, firewalls, and secure coding practices.",
          salary: "₹8–18 LPA",
          tools: ["AWS Security", "Firewalls", "IAM", "SAST/DAST Tools", "Python"],
          companies: ["Razorpay", "PhonePe", "Paytm", "Amazon India", "Microsoft"],
          skills: ["Cloud Security", "IAM", "Secure Coding", "Vulnerability Management", "DevSecOps"]
        },
        {
          title: "Cloud Security Architect",
          level: "Senior",
          description: "Architect enterprise-wide cloud security strategies and lead security teams.",
          salary: "₹18–35 LPA",
          tools: ["AWS/Azure Security", "Zero Trust", "CSPM Tools", "Terraform"],
          companies: ["Google India", "Walmart Tech", "Goldman Sachs", "JPMorgan India"],
          skills: ["Security Architecture", "Cloud Platforms", "Team Leadership", "Compliance", "Risk Management"]
        },
        {
          title: "CISO / Security Manager",
          level: "Senior",
          description: "Own the entire cybersecurity program of an organization — strategy, compliance, and team.",
          salary: "₹28–55 LPA",
          tools: ["GRC Tools", "Risk Frameworks", "ISO 27001", "NIST"],
          companies: ["HDFC Bank", "ICICI Bank", "Infosys", "TCS", "Large MNCs"],
          skills: ["Risk Management", "Leadership", "Compliance", "Communication", "Security Strategy"]
        }
      ],
      roadmap: {
        timeline: "8–14 months",
        difficulty: "Hard",
        demandLevel: "High",
        realityCheck: "Cybersecurity looks glamorous but requires genuine technical depth — you can't fake it in interviews. India has very few truly skilled professionals which means high pay for those who are serious, but the learning curve is steep and requires hands-on lab practice daily.",
        steps: [
          { title: "Networking & OS Fundamentals", duration: "6 weeks", description: "Master TCP/IP, DNS, HTTP, firewalls, and Linux — the absolute foundation of security.", skills: ["TCP/IP", "DNS", "HTTP/HTTPS", "Linux CLI", "Firewalls"], resources: ["Professor Messer CompTIA (Free YouTube)", "TryHackMe (Free)", "NPTEL Networking", "Linux Journey"] },
          { title: "Security Concepts & Tools", duration: "8 weeks", description: "Learn core security concepts — CIA triad, OWASP Top 10, vulnerability types, and SIEM tools.", skills: ["OWASP Top 10", "Wireshark", "Nmap", "SIEM Basics", "Cryptography"], resources: ["TryHackMe (Free paths)", "Cybrary (Free)", "OWASP Website", "SANS Reading Room"] },
          { title: "Ethical Hacking & Labs", duration: "10 weeks", description: "Practice hacking legally on vulnerable machines — web apps, networks, and Active Directory.", skills: ["Kali Linux", "Metasploit", "Burp Suite", "CTF Challenges", "Report Writing"], resources: ["HackTheBox (Free)", "TryHackMe (Free)", "VulnHub", "PortSwigger Web Academy (Free)"] },
          { title: "Specialization & Certification Prep", duration: "6 weeks", description: "Choose a specialization — SOC, Pentesting, Cloud Security — and prepare for certification.", skills: ["Chosen Specialization", "Exam Preparation", "Practice Tests"], resources: ["CompTIA Study Guides", "EC-Council CEH Prep", "INE (eLearnSecurity)"] },
          { title: "Job Hunt & Community", duration: "4 weeks", description: "Build your LinkedIn, join security communities, apply for jobs and internships in India.", skills: ["Resume Writing", "LinkedIn", "Bug Bounty Basics", "Interview Prep"], resources: ["Bugcrowd", "HackerOne India", "Internshala", "LinkedIn Jobs"] }
        ],
        certifications: ["CompTIA Security+ (Gold Standard Entry Level)", "CEH — Certified Ethical Hacker (EC-Council)", "eJPT — Junior Penetration Tester (Free prep)", "OSCP — Offensive Security (Advanced)"]
      }
    },
    {
      id: "finance",
      name: "Finance & Investment Banking",
      emoji: "📈",
      keywords: ["finance", "banking", "investment", "stock", "market", "money", "economics", "economy", "accounting", "ca", "chartered"],
      description: "High-paying finance roles in banks, NBFCs, and fintech startups across India. Analytical mindset with finance interest is a strong fit.",
      futureScope: "High Demand",
      topRoles: ["Financial Analyst", "Investment Banker", "Risk Analyst"],
      roles: [
        {
          title: "Financial Analyst",
          level: "Entry",
          description: "Analyze financial statements, build models, and support investment and business decisions.",
          salary: "₹4–8 LPA",
          tools: ["Excel", "Bloomberg", "Tally", "Power BI", "Python"],
          companies: ["HDFC Bank", "ICICI Bank", "Kotak", "Deloitte", "EY"],
          skills: ["Financial Modeling", "Excel", "Accounting Basics", "Valuation", "Report Writing"]
        },
        {
          title: "Equity Research Analyst",
          level: "Entry",
          description: "Research and analyze stocks and companies to give buy/sell recommendations.",
          salary: "₹5–9 LPA",
          tools: ["Bloomberg", "Excel", "SEBI Databases", "NSE/BSE Data"],
          companies: ["ICICI Securities", "Motilal Oswal", "HDFC Securities", "Edelweiss", "Axis Capital"],
          skills: ["Equity Valuation", "Financial Statements", "Sector Research", "Excel", "Report Writing"]
        },
        {
          title: "Investment Banker (Associate)",
          level: "Mid",
          description: "Execute M&A deals, IPOs, and fundraising transactions for companies.",
          salary: "₹10–22 LPA",
          tools: ["Excel", "PowerPoint", "Bloomberg", "Pitch Decks", "Valuation Models"],
          companies: ["Goldman Sachs India", "Morgan Stanley", "Kotak Investment Banking", "Axis Capital", "JM Financial"],
          skills: ["M&A Process", "DCF Valuation", "Deal Execution", "Client Management", "Pitching"]
        },
        {
          title: "Risk Manager",
          level: "Mid",
          description: "Identify, assess, and manage financial risks for banks and financial institutions.",
          salary: "₹9–18 LPA",
          tools: ["SAS", "Python", "Risk Models", "Basel Frameworks", "Excel"],
          companies: ["RBI", "SBI", "HDFC Bank", "Citi India", "Standard Chartered India"],
          skills: ["Credit Risk", "Market Risk", "Regulatory Knowledge", "Python/SAS", "Communication"]
        },
        {
          title: "CFO / Finance Director",
          level: "Senior",
          description: "Lead all financial operations, strategy, and investor relations for an organization.",
          salary: "₹30–80 LPA",
          tools: ["ERP Systems", "SAP", "Board Reporting", "Fundraising"],
          companies: ["Startups", "MNCs", "PSUs", "Consulting Firms"],
          skills: ["Financial Strategy", "Leadership", "Fundraising", "Communication", "Compliance"]
        }
      ],
      roadmap: {
        timeline: "10–18 months",
        difficulty: "Hard",
        demandLevel: "High",
        realityCheck: "Finance in India is extremely pedigree-driven — IIM/IIT alumni dominate top investment banking roles. However, with the right certifications (CFA, CA), strong Excel/modeling skills, and persistence, non-premier college students do break into good finance careers especially in fintech and mid-tier firms.",
        steps: [
          { title: "Accounting & Finance Basics", duration: "6 weeks", description: "Understand financial statements — P&L, Balance Sheet, Cash Flow — and core accounting principles.", skills: ["Accounting", "Financial Statements", "Tally Basics", "Excel", "Business Math"], resources: ["NPTEL Finance Courses (Free)", "Investopedia (Free)", "YouTube CA Foundation lectures"] },
          { title: "Financial Modeling in Excel", duration: "8 weeks", description: "Build financial models — DCF, LBO, comparable company analysis — from scratch in Excel.", skills: ["Advanced Excel", "DCF Valuation", "Ratio Analysis", "Scenario Analysis", "Pivot Tables"], resources: ["CFI Free Courses (Corporate Finance Institute)", "Wall Street Prep (Paid)", "YouTube ModelingMasters"] },
          { title: "Markets & Investment Knowledge", duration: "6 weeks", description: "Learn how equity markets, bonds, derivatives, and mutual funds work in Indian context.", skills: ["Equity Markets", "NSE/BSE", "Mutual Funds", "Derivatives Basics", "SEBI Regulations"], resources: ["NISM Study Material (Free)", "Zerodha Varsity (Free — excellent)", "NSE Academy Courses"] },
          { title: "Certification Preparation", duration: "12 weeks", description: "Prepare for CFA Level 1 or NISM certifications depending on career path chosen.", skills: ["CFA Curriculum", "Ethics", "Fixed Income", "Equity Valuation", "Portfolio Management"], resources: ["CFA Institute Materials", "AnalystPrep (Affordable)", "300Hours.com"] },
          { title: "Internships & Applications", duration: "4 weeks", description: "Apply for finance internships, build LinkedIn profile, and network with finance professionals.", skills: ["Networking", "Resume", "Interview Prep", "Case Studies", "Communication"], resources: ["Internshala Finance", "LinkedIn", "IIM Jobs", "CFA Network"] }
        ],
        certifications: ["CFA Level 1 — Chartered Financial Analyst (Global Gold Standard)", "NISM Series VIII — Equity Derivatives (SEBI Mandatory)", "FRM — Financial Risk Manager", "CA — Chartered Accountant (ICAI India)"]
      }
    },
    {
      id: "design",
      name: "UI/UX Design",
      emoji: "🎨",
      keywords: ["design", "ui", "ux", "creative", "art", "visual", "graphic", "product design", "figma", "photoshop", "illustration", "animation"],
      description: "Every app and website needs designers. India's design industry is booming with the startup ecosystem demanding user-first products.",
      futureScope: "Growing",
      topRoles: ["UI Designer", "UX Researcher", "Product Designer"],
      roles: [
        {
          title: "Junior UI Designer",
          level: "Entry",
          description: "Create visual designs for apps and websites following brand guidelines.",
          salary: "₹3–6 LPA",
          tools: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Zeplin"],
          companies: ["Infosys", "Wipro", "StartUps", "Agencies", "Zoho"],
          skills: ["Figma", "Visual Design", "Typography", "Color Theory", "Component Design"]
        },
        {
          title: "UX Researcher",
          level: "Entry",
          description: "Conduct user interviews, usability tests, and translate insights into design decisions.",
          salary: "₹4–8 LPA",
          tools: ["Maze", "Hotjar", "UserTesting", "Miro", "Google Forms"],
          companies: ["Swiggy", "Flipkart", "Urban Company", "Nykaa", "MakeMyTrip"],
          skills: ["User Research", "Usability Testing", "Personas", "Journey Mapping", "Report Writing"]
        },
        {
          title: "Product Designer",
          level: "Mid",
          description: "Own the end-to-end design of product features from research to final handoff.",
          salary: "₹8–18 LPA",
          tools: ["Figma", "Prototyping", "Design Systems", "Analytics Tools"],
          companies: ["Razorpay", "CRED", "Groww", "Zepto", "Dunzo"],
          skills: ["Product Thinking", "Design Systems", "Interaction Design", "Stakeholder Communication", "Data-Informed Design"]
        },
        {
          title: "Senior UX Designer",
          level: "Senior",
          description: "Lead design vision for multiple product areas and mentor junior designers.",
          salary: "₹16–28 LPA",
          tools: ["Figma", "Research Tools", "Workshop Facilitation", "Design Ops"],
          companies: ["Google India", "Microsoft", "Amazon", "Paytm", "PhonePe"],
          skills: ["Design Leadership", "Systems Thinking", "Cross-functional Collaboration", "Mentoring"]
        },
        {
          title: "Design Director",
          level: "Senior",
          description: "Set design strategy across the entire organization and build the design team.",
          salary: "₹25–50 LPA",
          tools: ["Strategy", "Team Building", "OKR Planning", "Executive Communication"],
          companies: ["Unicorn Startups", "MNCs", "Design Studios"],
          skills: ["Leadership", "Vision Setting", "Hiring", "Executive Communication", "Business Acumen"]
        }
      ],
      roadmap: {
        timeline: "6–9 months",
        difficulty: "Easy",
        demandLevel: "Medium",
        realityCheck: "Design in India is growing fast but portfolio quality is everything — a stunning portfolio beats a degree every single time. The challenge is that design roles are fewer than engineering roles, so you must specialize (product design, motion, 3D) to stand out in a crowded market.",
        steps: [
          { title: "Design Fundamentals", duration: "4 weeks", description: "Learn visual design principles — typography, color, spacing, grids, and hierarchy.", skills: ["Typography", "Color Theory", "Grid Systems", "Visual Hierarchy", "Gestalt Principles"], resources: ["Google UX Design Certificate (Coursera — Audit Free)", "Canva Design School (Free)", "YouTube DesignCourse"] },
          { title: "Figma Mastery", duration: "4 weeks", description: "Learn Figma from scratch — components, auto layout, prototyping, and design systems.", skills: ["Figma", "Components", "Auto Layout", "Prototyping", "Variables"], resources: ["Figma Official YouTube (Free)", "Designlab (Free basics)", "UI.dev Figma Course"] },
          { title: "UX Process & Research", duration: "6 weeks", description: "Learn the UX process — user research, personas, wireframes, user flows, and usability testing.", skills: ["User Research", "Wireframing", "User Flows", "Personas", "Usability Testing"], resources: ["NN/g Articles (Free)", "Google UX Design Certificate", "Maze Blog (Free)"] },
          { title: "Portfolio Projects", duration: "8 weeks", description: "Design 3 case study projects end-to-end — include research, process, and final designs.", skills: ["Case Studies", "Presentation", "Storytelling", "Behance Portfolio"], resources: ["Behance (Free)", "Dribbble", "UX Folio (Portfolio Builder)"] },
          { title: "Job Applications", duration: "4 weeks", description: "Apply on LinkedIn, Internshala, and design-specific job boards with your portfolio.", skills: ["Interview Prep", "Portfolio Presentation", "Networking", "Resume"], resources: ["LinkedIn Jobs", "Internshala", "AngelList", "Cutshort"] }
        ],
        certifications: ["Google UX Design Certificate (Coursera)", "Interaction Design Foundation Certificate", "Adobe Certified Professional", "Figma Config Community Badge"]
      }
    },
    {
      id: "product_management",
      name: "Product Management",
      emoji: "🎯",
      keywords: ["product", "management", "strategy", "business", "startup", "entrepreneurship", "leadership", "product manager", "pm"],
      description: "Bridge between tech and business — Product Managers are among India's highest-paid professionals with massive demand in the startup ecosystem.",
      futureScope: "Growing",
      topRoles: ["Associate PM", "Product Manager", "Senior PM"],
      roles: [
        {
          title: "Associate Product Manager",
          level: "Entry",
          description: "Support product teams in defining features, writing PRDs, and coordinating between design and engineering.",
          salary: "₹6–12 LPA",
          tools: ["Jira", "Confluence", "Figma", "Mixpanel", "Google Analytics"],
          companies: ["Razorpay", "PhonePe", "Meesho", "Urban Company", "Postman"],
          skills: ["PRD Writing", "User Stories", "Data Analysis", "Wireframing", "Stakeholder Communication"]
        },
        {
          title: "Product Manager",
          level: "Mid",
          description: "Own a product area — define strategy, prioritize roadmap, and ship features with your team.",
          salary: "₹12–24 LPA",
          tools: ["Jira", "Amplitude", "SQL", "Miro", "Figma"],
          companies: ["Flipkart", "Swiggy", "CRED", "Groww", "BrowserStack"],
          skills: ["Product Strategy", "Roadmapping", "SQL", "A/B Testing", "OKRs"]
        },
        {
          title: "Senior Product Manager",
          level: "Mid",
          description: "Lead multiple product areas and directly impact company revenue and growth metrics.",
          salary: "₹20–35 LPA",
          tools: ["Strategy Tools", "SQL", "Analytics Platforms", "Leadership"],
          companies: ["Amazon", "Microsoft", "Google India", "Zomato", "OYO"],
          skills: ["Strategic Thinking", "Market Analysis", "Team Leadership", "Business Acumen", "Data-Driven Decisions"]
        },
        {
          title: "Director of Product",
          level: "Senior",
          description: "Manage multiple PMs, set product vision, and align product strategy with company goals.",
          salary: "₹30–55 LPA",
          tools: ["Executive Reporting", "OKR Frameworks", "Product Analytics"],
          companies: ["Unicorn Startups", "Google", "Amazon", "Navi", "Zepto"],
          skills: ["Organizational Leadership", "Vision Setting", "Hiring PMs", "Executive Communication"]
        },
        {
          title: "VP of Product",
          level: "Senior",
          description: "Own the entire product portfolio and sit at the leadership table driving company strategy.",
          salary: "₹50–100 LPA",
          tools: ["Company Strategy", "Fundraising Decks", "Board Communication"],
          companies: ["Top Indian Unicorns", "Global MNCs", "Late-stage Startups"],
          skills: ["Executive Leadership", "Business Strategy", "Fundraising Knowledge", "Cross-functional Alignment"]
        }
      ],
      roadmap: {
        timeline: "8–12 months",
        difficulty: "Medium",
        demandLevel: "Medium",
        realityCheck: "Product Management is one of the most aspired roles in India's tech ecosystem but entry is very competitive — most companies prefer engineers or MBAs. The best path in is through APM programs at funded startups or switching from engineering/design to PM internally.",
        steps: [
          { title: "PM Fundamentals", duration: "4 weeks", description: "Learn what PMs do — product lifecycle, PRDs, user stories, and working with engineering teams.", skills: ["PRD Writing", "User Stories", "Agile Basics", "Product Lifecycle", "Stakeholder Maps"], resources: ["Lenny's Newsletter (Free)", "Product School Blog (Free)", "Shreyas Doshi Twitter/Articles"] },
          { title: "Data & Analytics for PMs", duration: "6 weeks", description: "Learn SQL, Google Analytics, and A/B testing to make data-driven decisions.", skills: ["SQL", "Google Analytics", "A/B Testing", "Funnel Analysis", "KPIs & Metrics"], resources: ["Mode SQL Tutorial (Free)", "Google Analytics Academy (Free)", "Kaggle SQL"] },
          { title: "UX & Design Thinking", duration: "4 weeks", description: "Understand UX basics, learn Figma for wireframing, and practice design thinking for product problems.", skills: ["Wireframing", "Figma Basics", "Design Thinking", "User Research", "Prototyping"], resources: ["Figma Official Tutorials (Free)", "IDEO Design Thinking (Free)", "Nielsen Norman Group"] },
          { title: "Case Study Practice", duration: "8 weeks", description: "Practice PM interview case studies — product design, metrics, estimation, and strategy questions.", skills: ["Product Cases", "Estimation", "Root Cause Analysis", "Product Critique", "Communication"], resources: ["Exponent PM Interview Course", "PM Exercises (pmexercises.com)", "YouTube TechLead"] },
          { title: "Network & Apply", duration: "4 weeks", description: "Apply for APM programs, connect with PMs on LinkedIn, and join PM communities in India.", skills: ["Networking", "LinkedIn", "Resume for PM Roles", "Mock Interviews"], resources: ["LinkedIn", "ProductHunt Community", "PM Tribe India Slack", "Cutshort"] }
        ],
        certifications: ["Google Project Management Certificate (Coursera)", "Pragmatic Institute Product Management Certificate", "IIM Bangalore Product Management Program (Executive)", "AIPMM Certified Product Manager"]
      }
    },
    {
      id: "digital_marketing",
      name: "Digital Marketing",
      emoji: "📣",
      keywords: ["marketing", "digital marketing", "social media", "content", "seo", "advertising", "brand", "growth", "sales", "communication"],
      description: "Every business in India needs digital marketers. From D2C brands to MNCs — content, SEO, and paid ads professionals are in constant demand.",
      futureScope: "Growing",
      topRoles: ["SEO Specialist", "Performance Marketer", "Content Strategist"],
      roles: [
        {
          title: "Digital Marketing Executive",
          level: "Entry",
          description: "Manage social media, run basic ad campaigns, and create content for brands.",
          salary: "₹2.5–5 LPA",
          tools: ["Google Ads", "Meta Ads", "Canva", "Hootsuite", "Google Analytics"],
          companies: ["D2C Brands", "Agencies", "E-commerce", "EdTech", "Startups"],
          skills: ["Social Media Management", "Content Writing", "Basic SEO", "Canva", "Email Marketing"]
        },
        {
          title: "SEO Specialist",
          level: "Entry",
          description: "Optimize websites to rank higher on Google through on-page, off-page, and technical SEO.",
          salary: "₹3–6 LPA",
          tools: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "WordPress"],
          companies: ["Agencies", "E-commerce Companies", "Media Companies", "SaaS Startups"],
          skills: ["On-Page SEO", "Keyword Research", "Link Building", "Technical SEO", "Content Strategy"]
        },
        {
          title: "Performance Marketer",
          level: "Mid",
          description: "Run and optimize paid advertising campaigns on Google, Meta, and other platforms to drive ROI.",
          salary: "₹6–14 LPA",
          tools: ["Google Ads", "Meta Ads Manager", "GA4", "Mixpanel", "Excel"],
          companies: ["Nykaa", "Mamaearth", "boAt", "Lenskart", "Urban Company"],
          skills: ["Google Ads", "Meta Ads", "Conversion Optimization", "A/B Testing", "Budget Management"]
        },
        {
          title: "Growth Manager",
          level: "Mid",
          description: "Own user acquisition, retention, and revenue growth metrics across all marketing channels.",
          salary: "₹10–20 LPA",
          tools: ["Analytics", "CRM", "Marketing Automation", "SQL", "Experiments"],
          companies: ["Razorpay", "Groww", "CRED", "Meesho", "Zepto"],
          skills: ["Growth Frameworks", "Data Analysis", "Funnel Optimization", "Cross-channel Marketing", "Product Sense"]
        },
        {
          title: "Chief Marketing Officer",
          level: "Senior",
          description: "Own brand strategy, marketing budget, and all revenue-driving marketing activities.",
          salary: "₹25–60 LPA",
          tools: ["Strategy", "Brand Building", "Team Leadership", "Budget Planning"],
          companies: ["D2C Brands", "Unicorns", "FMCG Companies", "Banks"],
          skills: ["Brand Strategy", "Leadership", "PR", "Data-Driven Decisions", "Communication"]
        }
      ],
      roadmap: {
        timeline: "4–7 months",
        difficulty: "Easy",
        demandLevel: "High",
        realityCheck: "Digital Marketing is easy to enter but hard to master — everyone claims to know it. What employers actually want is someone who can drive real results (leads, sales, traffic) and show proof with numbers. Build campaigns for real businesses even for free and document your results.",
        steps: [
          { title: "Marketing Fundamentals", duration: "3 weeks", description: "Learn core marketing concepts — 4Ps, buyer personas, funnels, and brand building.", skills: ["Marketing Basics", "Consumer Psychology", "Brand Thinking", "Funnel Stages"], resources: ["HubSpot Academy (Free + Certificate)", "Google Digital Garage (Free)", "Seth Godin Blog (Free)"] },
          { title: "SEO & Content Marketing", duration: "5 weeks", description: "Learn how to rank on Google through keyword research, on-page SEO, and content creation.", skills: ["Keyword Research", "On-Page SEO", "Blogging", "Google Search Console", "Link Building"], resources: ["Ahrefs Blog (Free)", "Moz Beginner SEO Guide (Free)", "Neil Patel YouTube (Free)"] },
          { title: "Paid Advertising", duration: "6 weeks", description: "Learn Google Ads and Meta Ads — campaign setup, targeting, bidding, and optimization.", skills: ["Google Ads", "Meta Ads", "Audience Targeting", "Ad Copywriting", "Budget Management"], resources: ["Google Skillshop (Free + Certified)", "Meta Blueprint (Free)", "YouTube Simplilearn"] },
          { title: "Analytics & Reporting", duration: "4 weeks", description: "Learn Google Analytics 4 and how to create marketing dashboards and measure campaign success.", skills: ["GA4", "Conversion Tracking", "Dashboard Building", "Data Storytelling", "Excel/Sheets"], resources: ["Google Analytics Academy (Free)", "Looker Studio (Free)", "HubSpot Reports"] },
          { title: "Real Campaigns + Portfolio", duration: "4 weeks", description: "Run real campaigns — offer to manage digital marketing for a small local business or NGO for free.", skills: ["Campaign Management", "Client Communication", "Case Study Writing", "LinkedIn Profile"], resources: ["Internshala Marketing Internships", "LinkedIn Jobs", "Freelancer.com"] }
        ],
        certifications: ["Google Ads Search Certification (Google Skillshop — Free)", "HubSpot Inbound Marketing Certificate (Free)", "Meta Social Media Marketing Certificate (Coursera)", "SEMrush SEO Fundamentals Certificate"]
      }
    },
    {
      id: "cloud_devops",
      name: "Cloud & DevOps Engineering",
      emoji: "☁️",
      keywords: ["cloud", "devops", "aws", "azure", "gcp", "docker", "kubernetes", "infrastructure", "deployment", "ci/cd", "linux", "server"],
      description: "India's cloud adoption is exploding — every company migrating to AWS/Azure needs DevOps engineers. One of the highest-paying technical roles.",
      futureScope: "High Demand",
      topRoles: ["Cloud Engineer", "DevOps Engineer", "Site Reliability Engineer"],
      roles: [
        {
          title: "Junior Cloud Engineer",
          level: "Entry",
          description: "Deploy and manage cloud infrastructure on AWS, Azure, or GCP for applications.",
          salary: "₹4–7 LPA",
          tools: ["AWS", "Linux", "Git", "Terraform basics", "Networking"],
          companies: ["TCS", "Infosys", "HCL", "Wipro", "Capgemini"],
          skills: ["AWS Fundamentals", "Linux", "Networking", "Git", "Basic Scripting"]
        },
        {
          title: "DevOps Engineer",
          level: "Mid",
          description: "Build and maintain CI/CD pipelines, automate deployments, and manage infrastructure as code.",
          salary: "₹8–18 LPA",
          tools: ["Jenkins", "Docker", "Kubernetes", "Terraform", "Ansible"],
          companies: ["Razorpay", "Swiggy", "CRED", "Freshworks", "BrowserStack"],
          skills: ["CI/CD", "Docker", "Kubernetes", "Terraform", "Monitoring"]
        },
        {
          title: "Cloud Architect",
          level: "Senior",
          description: "Design scalable, secure, and cost-efficient cloud architectures for enterprise systems.",
          salary: "₹20–40 LPA",
          tools: ["AWS/Azure/GCP Architecture", "Security", "Cost Optimization", "Multi-cloud"],
          companies: ["Amazon India", "Microsoft India", "IBM", "Deloitte", "Accenture Cloud"],
          skills: ["Architecture Design", "Security", "Cost Management", "Multi-cloud Strategy", "Leadership"]
        },
        {
          title: "Site Reliability Engineer",
          level: "Mid",
          description: "Ensure high availability, performance, and reliability of production systems at scale.",
          salary: "₹14–28 LPA",
          tools: ["Prometheus", "Grafana", "PagerDuty", "Python", "Kubernetes"],
          companies: ["Google India", "Flipkart", "Ola", "Hotstar", "ShareChat"],
          skills: ["Observability", "Incident Management", "Automation", "SLO/SLA", "On-call Management"]
        },
        {
          title: "VP Engineering / CTO",
          level: "Senior",
          description: "Lead all engineering and infrastructure decisions for the organization.",
          salary: "₹40–90 LPA",
          tools: ["Strategy", "Team Building", "Architecture Review", "Vendor Management"],
          companies: ["Startups", "Scale-ups", "Enterprises"],
          skills: ["Technical Leadership", "Strategy", "Hiring", "Architecture", "Business Alignment"]
        }
      ],
      roadmap: {
        timeline: "8–12 months",
        difficulty: "Medium",
        demandLevel: "High",
        realityCheck: "Cloud and DevOps have a skill shortage in India — certified engineers with hands-on AWS + Docker + Kubernetes experience get hired fast. AWS certification alone can increase your salary by 40–60%. The learning is technical and hands-on, and you must build real projects in cloud, not just watch tutorials.",
        steps: [
          { title: "Linux & Networking", duration: "5 weeks", description: "Master Linux command line, bash scripting, and networking fundamentals — the foundation of everything.", skills: ["Linux CLI", "Bash Scripting", "Networking", "SSH", "File Permissions"], resources: ["Linux Journey (Free)", "OverTheWire (Free)", "NPTEL Networking", "TutorialsPoint Linux"] },
          { title: "AWS Cloud Fundamentals", duration: "8 weeks", description: "Learn core AWS services — EC2, S3, VPC, IAM, RDS, Lambda — and deploy real applications.", skills: ["EC2", "S3", "IAM", "VPC", "RDS", "Lambda"], resources: ["AWS Free Tier (Hands-on Free)", "AWS Skill Builder (Free)", "FreeCodeCamp AWS YouTube"] },
          { title: "Docker & Containers", duration: "5 weeks", description: "Containerize applications using Docker and learn container orchestration with Kubernetes basics.", skills: ["Docker", "Docker Compose", "Kubernetes basics", "Container Registry", "Helm Charts"], resources: ["Docker Official Docs (Free)", "KodeKloud (Free tier)", "TechWorld with Nana YouTube"] },
          { title: "CI/CD & Infrastructure as Code", duration: "6 weeks", description: "Build automated pipelines using Jenkins or GitHub Actions and manage infrastructure with Terraform.", skills: ["Jenkins or GitHub Actions", "Terraform", "Ansible", "Pipeline Design", "GitOps"], resources: ["GitHub Actions Docs (Free)", "Terraform Official Tutorials (Free)", "Udemy DevOps Bootcamp"] },
          { title: "Certification & Job Hunt", duration: "4 weeks", description: "Prepare for AWS certification, build your DevOps portfolio on GitHub, and apply.", skills: ["AWS Exam Prep", "Portfolio Projects", "Resume", "LinkedIn", "Interview Prep"], resources: ["AWS Practice Exams", "ExamPro (Free)", "LinkedIn", "Naukri.com"] }
        ],
        certifications: ["AWS Certified Cloud Practitioner (Entry Level)", "AWS Solutions Architect Associate (Industry Standard)", "Certified Kubernetes Administrator (CKA)", "HashiCorp Terraform Associate"]
      }
    },
    {
      id: "healthcare",
      name: "Healthcare & MedTech",
      emoji: "🏥",
      keywords: ["healthcare", "medical", "doctor", "health", "hospital", "biology", "pharma", "medicine", "biotech", "clinical"],
      description: "India's healthcare sector is growing at 22% annually. From clinical roles to health-tech and pharma — opportunities are massive and impactful.",
      futureScope: "High Demand",
      topRoles: ["Healthcare Analyst", "Clinical Data Manager", "Health Tech PM"],
      roles: [
        { title: "Healthcare Data Analyst", level: "Entry", description: "Analyze patient and operational data to improve healthcare delivery and outcomes.", salary: "₹3.5–7 LPA", tools: ["SQL", "Excel", "Power BI", "Python", "EMR Systems"], companies: ["Apollo Hospitals", "Fortis", "Practo", "Manipal Health", "AIIMS"], skills: ["Healthcare Data", "SQL", "Excel", "Medical Terminology", "HIPAA Basics"] },
        { title: "Clinical Research Associate", level: "Entry", description: "Support clinical trials and ensure data integrity and regulatory compliance.", salary: "₹3–6 LPA", tools: ["EDC Systems", "CTMS", "GCP Guidelines", "Excel", "SAS"], companies: ["Dr Reddy's", "Sun Pharma", "Cipla", "IQVIA", "Parexel India"], skills: ["GCP", "Clinical Trials", "Regulatory Affairs", "Data Collection", "Report Writing"] },
        { title: "Health Tech Product Manager", level: "Mid", description: "Build digital health products — telemedicine, EHR systems, health monitoring apps.", salary: "₹10–20 LPA", tools: ["Jira", "Figma", "Analytics", "HL7/FHIR", "SQL"], companies: ["Practo", "PharmEasy", "1mg", "Niramai", "Nightingale Health India"], skills: ["Healthcare Domain Knowledge", "Product Management", "Regulatory", "Data Privacy", "Stakeholder Mgmt"] },
        { title: "Pharmaceutical Sales Manager", level: "Mid", description: "Drive sales of pharmaceutical products to doctors, hospitals, and healthcare institutions.", salary: "₹7–16 LPA", tools: ["CRM", "Sales Analytics", "Product Knowledge", "Communication"], companies: ["Sun Pharma", "Cipla", "Abbott India", "Pfizer India", "Lupin"], skills: ["Sales", "Medical Knowledge", "Relationship Management", "Negotiation", "Territory Management"] },
        { title: "Chief Medical Officer / Hospital Director", level: "Senior", description: "Lead all clinical operations and medical strategy of a hospital or healthcare organization.", salary: "₹25–70 LPA", tools: ["Hospital Management Systems", "Quality Frameworks", "NABH Standards"], companies: ["Apollo", "Fortis", "Manipal", "Max Healthcare", "Medanta"], skills: ["Clinical Leadership", "Operations", "Quality Management", "Team Building", "Strategy"] }
      ],
      roadmap: {
        timeline: "10–14 months",
        difficulty: "Hard",
        demandLevel: "High",
        realityCheck: "Healthcare in India offers immense job security and social impact — but clinical roles need formal education (MBBS, B.Pharm, Nursing). Health-tech roles on the other hand are accessible to anyone with tech + domain knowledge. Choose your path wisely based on your educational background.",
        steps: [
          { title: "Healthcare Domain Knowledge", duration: "6 weeks", description: "Learn the Indian healthcare ecosystem — public/private hospitals, insurance, pharma, and health-tech.", skills: ["Indian Healthcare System", "Health Insurance (Ayushman Bharat)", "Medical Terminology", "Regulatory Bodies"], resources: ["NPTEL Healthcare Management (Free)", "Coursera Healthcare (Audit Free)", "WHO India Resources"] },
          { title: "Digital Health & HIT", duration: "6 weeks", description: "Learn Health Information Technology — EMRs, HL7/FHIR standards, telemedicine platforms.", skills: ["EMR/EHR Systems", "HL7/FHIR Basics", "Telemedicine", "Data Privacy", "ABDM India"], resources: ["NHA (National Health Authority) India Docs (Free)", "Coursera Health IT", "HL7 International (Free resources)"] },
          { title: "Clinical Research & GCP", duration: "8 weeks", description: "Learn Good Clinical Practice, clinical trial processes, and regulatory affairs in India.", skills: ["GCP Guidelines", "ICH Guidelines", "Clinical Trial Phases", "Regulatory Submissions", "CDSCO India"], resources: ["NIH GCP Training (Free)", "CDSCO India Website (Free)", "TransCelerate Pharma Resources"] },
          { title: "Health Data & Analytics", duration: "6 weeks", description: "Apply data analytics to healthcare — patient outcomes, operational efficiency, and population health.", skills: ["Healthcare Analytics", "SQL", "Python for Healthcare", "Population Health", "NABH Data"], resources: ["Coursera Healthcare Data Analytics", "NPTEL Biomedical Informatics (Free)", "Kaggle Healthcare Datasets"] },
          { title: "Job Hunt & Internships", duration: "4 weeks", description: "Apply on Naukri for healthcare roles, connect with health-tech startups, and consider PGDM in Hospital Management.", skills: ["Resume for Healthcare", "LinkedIn in Healthcare", "Networking", "Interview Prep"], resources: ["Naukri Healthcare Jobs", "LinkedIn", "Practo Careers", "Internshala Healthcare"] }
        ],
        certifications: ["PGDM Hospital & Healthcare Management", "CPHIMS — Certified Professional Health Informatics", "Certified Clinical Research Associate (ACRP)", "Google Data Analytics Certificate (for health data roles)"]
      }
    }
  ],

  matchDomains(interests, skills, education) {
    const query = [...interests, ...skills].join(" ").toLowerCase();
    const scored = this.domains.map(d => {
      let score = 0;
      d.keywords.forEach(kw => {
        if (query.includes(kw)) score += 2;
      });
      if (education === "12th_commerce" && ["finance", "digital_marketing", "product_management"].includes(d.id)) score += 1;
      if (education === "12th_science" && ["data_science", "software_dev", "cybersecurity", "cloud_devops", "healthcare"].includes(d.id)) score += 1;
      if (["undergraduate", "postgraduate", "working"].includes(education)) score += 0.5;
      return { ...d, score };
    });
    const sorted = scored.sort((a, b) => b.score - a.score);
    const top = sorted.slice(0, 4);
    if (top.every(d => d.score === 0)) return this.domains.slice(0, 4);
    return top;
  }
};

export default careerData;