import { useState, useEffect, useRef } from "react";
import JOB_DATA from './jobData.json';

// 1. Get Gemini key: aistudio.google.com → Get API Key 
//if hackthon faculty is reviewing this code then i am sorry but i had to remove my api and client id due to secuirty reasons ,also i was running out of time on 28th april so tht time i let them but now removing I accept that i was not able to put them in safe file and then giving link of that file here to process the code.
const GEMINI_KEY = "-";
const GOOGLE_CLIENT_ID = ".apps.gocontent.com";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`;
const G = { blue:"#4285F4", red:"#EA4335", yellow:"#FBBC05", green:"#34A853" };
const C = {
  bg:"#F8F9FA", surface:"#FFFFFF", surface2:"#F1F3F4", border:"#DADCE0",
  blue:"#4285F4", red:"#EA4335", yellow:"#FBBC05", green:"#34A853",
  text:"#202124", muted:"#5F6368", mutedLight:"#80868B",
  shadow:"0 1px 3px rgba(60,64,67,.15),0 2px 6px rgba(60,64,67,.10)",
  shadowMd:"0 4px 12px rgba(60,64,67,.2)", shadowLg:"0 8px 28px rgba(60,64,67,.25)"
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:${C.bg};font-family:'Roboto',sans-serif;color:${C.text};min-height:100vh;}
.fi{animation:fi .35s ease;}
@keyframes fi{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;}}
@keyframes spin{from{transform:rotate(0);}to{transform:rotate(360deg);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
@keyframes slideRight{from{opacity:0;transform:translateX(24px);}to{opacity:1;transform:none;}}
@keyframes waveBar{0%,100%{transform:scaleY(.3);}50%{transform:scaleY(1);}}
@keyframes ripple{0%{transform:scale(1);opacity:.6;}100%{transform:scale(2.2);opacity:0;}}
@keyframes spin{from{transform:rotate(0);}to{transform:rotate(360deg);}}
.spin{animation:spin 1.2s linear infinite;}
.pulse{animation:pulse 1.8s ease-in-out infinite;}
.slide-right{animation:slideRight .28s ease;}
input,textarea,select{background:${C.surface};border:1.5px solid ${C.border};color:${C.text};border-radius:8px;padding:12px 14px;font-family:'Roboto',sans-serif;font-size:14px;outline:none;transition:border-color .2s,box-shadow .2s;width:100%;}
input:focus,textarea:focus,select:focus{border-color:${C.blue};box-shadow:0 0 0 3px ${C.blue}20;}
input[type=checkbox]{width:16px;height:16px;accent-color:${C.blue};cursor:pointer;}
::-webkit-scrollbar{width:6px;}
::-webkit-scrollbar-track{background:${C.bg};}
::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px;}
.mentor-panel{position:fixed;right:0;top:60px;bottom:0;width:360px;background:${C.surface};border-left:1px solid ${C.border};display:flex;flex-direction:column;z-index:150;box-shadow:-2px 0 8px rgba(60,64,67,.12);}
.mentor-panel.open{transform:translateX(0);transition:transform .3s cubic-bezier(.4,0,.2,1);}
.mentor-panel.closed{transform:translateX(100%);transition:transform .3s cubic-bezier(.4,0,.2,1);}
.main-content{transition:padding-right .3s cubic-bezier(.4,0,.2,1);}
.card-hover:hover{box-shadow:${C.shadowMd};transform:translateY(-1px);}
.wave-bar{width:3px;border-radius:3px;display:inline-block;margin:0 1.5px;background:${C.blue};}
`;

// ─── CSE-FOCUSED DOMAIN METADATA ─────────────────────────────────────────────
const DOMAIN_META = {
  "Software Development": {
    emoji:"💻", futureScope:"High Demand", fresherAvg:5.54,
    description:"India's #1 CSE job category — 6,605 real openings. Java, Python, Full Stack roles across all major IT companies and startups.",
    coreSkills:["Data Structures & Algorithms","Java / Python / C++","System Design","REST APIs","Git & Version Control","SQL & Databases","OOP Concepts","OS & Networking"],
    roadmapHighlights:["DSA mastery (arrays, trees, graphs, DP)","Pick Java or Python — go deep","Build 2 full-stack GitHub projects","150+ LeetCode problems before interviews","System design concepts for senior roles"]
  },
  "Data Science & ML": {
    emoji:"🧠", futureScope:"High Demand", fresherAvg:9.18,
    description:"Highest-paying CSE domain — avg ₹9.18 LPA for freshers. Python, ML and Deep Learning in extreme shortage across India's tech sector.",
    coreSkills:["Python (NumPy, Pandas, Matplotlib)","Statistics & Probability","Machine Learning Algorithms","Deep Learning (PyTorch/TensorFlow)","SQL for data querying","Feature Engineering","Model Deployment (Flask/FastAPI)","Data Visualization"],
    roadmapHighlights:["Math first — linear algebra, stats, probability","Python data stack — NumPy, Pandas, Sklearn","End-to-end Kaggle ML project","One deep learning framework (PyTorch)","Deploy a model with Flask or FastAPI"]
  },
  "Cloud & DevOps": {
    emoji:"☁️", futureScope:"High Demand", fresherAvg:7.42,
    description:"Critical CSE shortage — 1,048 openings. AWS, Kubernetes, Terraform expertise commands ₹7–20 LPA. Remote-friendly roles across India.",
    coreSkills:["Linux & Bash Scripting","Docker & Containers","Kubernetes","AWS / Azure / GCP","CI/CD (Jenkins, GitHub Actions)","Terraform (IaC)","Monitoring (Prometheus, Grafana)","Python/Go for automation"],
    roadmapHighlights:["Linux fundamentals and networking TCP/IP","AWS Cloud Practitioner certification","Dockerize a real application from scratch","Set up full CI/CD pipeline with GitHub Actions","Kubernetes via KillerKoda free labs"]
  },
  "Web Development": {
    emoji:"🌐", futureScope:"Growing", fresherAvg:5.52,
    description:"822 CSE openings with many remote-friendly roles. React.js and Node.js full-stack developers in high demand across Indian startups and MNCs.",
    coreSkills:["HTML5, CSS3, JavaScript (ES6+)","React.js & Hooks","Node.js & Express","REST APIs & JSON","MongoDB / PostgreSQL","Git & GitHub","TypeScript","Responsive Design & Tailwind"],
    roadmapHighlights:["Solid JavaScript fundamentals before frameworks","React with real projects — not just tutorials","Full MERN stack app deployed on Vercel/Railway","Browser performance and web vitals","Open source contribution on GitHub"]
  },
  "Cybersecurity": {
    emoji:"🔐", futureScope:"High Demand", fresherAvg:7.20,
    description:"India needs 1M+ cybersecurity pros by 2025. 455 CSE openings with critical shortage — SOC analyst, penetration testing, cloud security.",
    coreSkills:["Networking (TCP/IP, OSI, DNS)","Linux Command Line","Python for scripting","OWASP Top 10","Kali Linux & hacking tools","SIEM (Splunk, QRadar)","Cryptography basics","Cloud Security (AWS/Azure)"],
    roadmapHighlights:["Networking mastery — TCP/IP, subnetting, DNS","TryHackMe and HackTheBox labs (free tier)","Kali Linux — Nmap, Metasploit, Burp Suite","CEH or CompTIA Security+ certification","Weekly CTF (Capture the Flag) challenges"]
  },
  "Data Engineering": {
    emoji:"🔧", futureScope:"High Demand", fresherAvg:6.8,
    description:"1,436 CSE openings — the hidden gem of data roles. Building pipelines, warehouses, and real-time streaming systems at scale.",
    coreSkills:["Advanced SQL (window functions, CTEs)","Python (PySpark, Pandas)","Apache Spark & Hadoop","ETL Pipeline Design","Apache Kafka","Airflow (orchestration)","AWS/GCP Data Services","Data Warehousing (dbt, Snowflake)"],
    roadmapHighlights:["Advanced SQL — window functions, query optimization","PySpark for large-scale data processing","Build end-to-end ETL pipeline project","Data warehouse design — Star Schema, Kimball","AWS Data Engineer Associate certification"]
  },
  "Product & Tech Mgmt": {
    emoji:"🎯", futureScope:"Growing", fresherAvg:8.5,
    description:"873 CSE openings — bridging engineering and business. Technical PMs with CSE background earn 40% more than non-tech PMs in India.",
    coreSkills:["Product Thinking & Strategy","SQL & Data Analysis","Wireframing (Figma)","Agile & Scrum","User Research & A/B Testing","PRDs & User Stories","Stakeholder Communication","OKRs & Metrics"],
    roadmapHighlights:["1+ year of coding — CSE background is your edge","Google PM Certificate (affordable)","Build a product from scratch — ship it","PM case studies from PMExercises.com","APM programs: Flipkart, Amazon, Razorpay hire freshers"]
  },
  "UI/UX & Design": {
    emoji:"🎨", futureScope:"Growing", fresherAvg:5.2,
    description:"225 CSE openings with high design-tech overlap. Designers who understand code (HTML/CSS) are paid 35% more than pure designers.",
    coreSkills:["Figma (components, auto-layout, prototyping)","Visual Design (color, typography, grid)","User Research & Usability Testing","Wireframing & Information Architecture","HTML/CSS for design handoff","Design Systems","Accessibility (WCAG 2.1)","Adobe XD / Illustrator"],
    roadmapHighlights:["Visual design fundamentals before any tool","Figma mastery through real project practice","Google UX Design Certificate (free audit)","3 UX case studies with full research process","Dribbble portfolio and community feedback"]
  },
};

// Merge real JSON data with CSE metadata
const RAW = JOB_DATA;
const DS = {
  totalListings: RAW.totalListings,
  totalFresher: RAW.totalFresher,
  domains: Object.fromEntries(
    Object.entries(RAW.domains).map(([name, d]) => {
      const meta = DOMAIN_META[name] || { emoji:"💻", futureScope:"Growing", description:"", fresherAvg:5, coreSkills:[], roadmapHighlights:[] };
      return [name, {
        ...d,
        emoji: meta.emoji,
        futureScope: meta.futureScope,
        description: meta.description,
        fresherAvg: meta.fresherAvg,
        coreSkills: meta.coreSkills,
        roadmapHighlights: meta.roadmapHighlights,
        titles: d.topTitles || [],
        companies: d.topCompanies || [],
        locations: d.topLocations || [],
        skills: d.topSkills || [],
        salaryMin: d.salaryMin || 3,
        salaryMax: d.salaryMax || 15,
      }];
    })
  ),
};

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const DB = {
  getAll: () => JSON.parse(localStorage.getItem("mmc_v4") || "{}"),
  saveAll: u => localStorage.setItem("mmc_v4", JSON.stringify(u)),
  getByUsername: u => Object.values(DB.getAll()).find(x => x.username?.toLowerCase() === u?.toLowerCase()) || null,
  getByEmail: e => DB.getAll()[e?.toLowerCase()] || null,
  save: (email, data) => { const a = DB.getAll(); a[email.toLowerCase()] = data; DB.saveAll(a); },
  getCurrent: () => localStorage.getItem("mmc_current_v4") || null,
  setCurrent: e => localStorage.setItem("mmc_current_v4", e.toLowerCase()),
  clearCurrent: () => localStorage.removeItem("mmc_current_v4"),
  enrollRoadmap: (email, entry) => { const u = DB.getByEmail(email); if (!u) return; if (!u.roadmaps.find(r => r.roleTitle === entry.roleTitle)) u.roadmaps.push(entry); DB.save(email, u); },
  updateProgress: (email, title, cs) => { const u = DB.getByEmail(email); if (!u) return; const r = u.roadmaps.find(r => r.roleTitle === title); if (r) r.checkedSkills = cs; DB.save(email, u); },
  updateWeekProgress: (email, title, wp) => { const u = DB.getByEmail(email); if (!u) return; const r = u.roadmaps.find(r => r.roleTitle === title); if (r) r.weekProgress = wp; DB.save(email, u); },
  updateWeeklyPlan: (email, title, plan) => { const u = DB.getByEmail(email); if (!u) return; const r = u.roadmaps.find(r => r.roleTitle === title); if (r) r.weeklyPlan = plan; DB.save(email, u); },
};

// ─── AI ───────────────────────────────────────────────────────────────────────
async function aiJson(prompt) {
  const r = await fetch(GEMINI_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ contents:[{role:"user",parts:[{text:prompt}]}], generationConfig:{temperature:0.7,maxOutputTokens:1500} }) });
  const d = await r.json(); if (!d.candidates?.[0]) throw new Error("No response");
  let raw = d.candidates[0].content.parts[0].text.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
  return JSON.parse(raw);
}
async function aiText(sys, msg) {
  const r = await fetch(GEMINI_URL, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ contents:[{role:"user",parts:[{text:`${sys}\n\nUser: ${msg}`}]}], generationConfig:{temperature:0.8,maxOutputTokens:400} }) });
  const d = await r.json(); if (!d.candidates?.[0]) throw new Error("No response");
  return d.candidates[0].content.parts[0].text;
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
function Btn({ onClick, children, variant="primary", disabled, full, sm, style={} }) {
  const base = { padding:sm?"8px 16px":"11px 22px", borderRadius:24, border:"none", cursor:disabled?"not-allowed":"pointer", fontFamily:"'Google Sans',sans-serif", fontWeight:500, fontSize:sm?12:14, transition:"all .2s", opacity:disabled?.5:1, width:full?"100%":"auto", ...style };
  const v = { primary:{background:C.blue,color:"#fff"}, ghost:{background:"transparent",color:C.blue,border:`1px solid ${C.border}`}, green:{background:C.green,color:"#fff"}, neutral:{background:C.surface2,color:C.muted,border:`1px solid ${C.border}`}, red:{background:C.red+"18",color:C.red,border:`1px solid ${C.red}40`} };
  return <button onClick={disabled?undefined:onClick} style={{...base,...(v[variant]||v.primary)}}>{children}</button>;
}
function Card({ children, style={}, onClick }) {
  return <div onClick={onClick} className={onClick?"card-hover":""} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 20px", cursor:onClick?"pointer":"default", boxShadow:C.shadow, transition:"box-shadow .2s,transform .15s", ...style }}>{children}</div>;
}
function Chip({ children, color, bg, onClick, active }) {
  return <span onClick={onClick} style={{ background:active?color:bg||color+"15", color, padding:"4px 12px", borderRadius:16, fontSize:11, fontWeight:500, display:"inline-block", cursor:onClick?"pointer":"default", border:active?`1px solid ${color}40`:"none", transition:"all .15s" }}>{children}</span>;
}
function ProgressBar({ value, color=C.blue, height=6 }) {
  return <div style={{ background:C.border, borderRadius:height, height, overflow:"hidden" }}><div style={{ background:color, borderRadius:height, height, width:`${Math.max(0,Math.min(100,value))}%`, transition:"width .6s ease" }} /></div>;
}
function Avatar({ name, size=36 }) {
  const initials = (name||"?").split(" ").map(w=>w[0]).join("").toUpperCase().slice(0,2);
  return <div style={{ width:size, height:size, borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:size*.38, color:"#fff", flexShrink:0 }}>{initials}</div>;
}
function Back({ onClick, label="Back" }) {
  return <button onClick={onClick} style={{ background:"none", border:"none", color:C.blue, cursor:"pointer", fontSize:13, marginBottom:20, display:"flex", alignItems:"center", gap:6 }}>← {label}</button>;
}
function DotLogo({ size=10, gap=4 }) {
  return <div style={{ display:"flex", gap }}>{[C.blue,C.red,C.yellow,C.green].map((c,i)=><div key={i} style={{ width:size, height:size, borderRadius:"50%", background:c }} />)}</div>;
}
function SectionTitle({ children }) {
  return <h3 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:12, fontWeight:600, color:C.muted, textTransform:"uppercase", letterSpacing:1.2, marginBottom:12 }}>{children}</h3>;
}

// ─── GOOGLE OAUTH HELPERS ────────────────────────────────────────────────────
function parseGoogleJwt(token) {
  try { return JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/'))); } catch { return null; }
}
function loadGSI(cb) {
  if (window.google?.accounts?.id) { cb(); return; }
  const s = document.createElement('script');
  s.src = 'https://accounts.google.com/gsi/client';
  s.async = true; s.defer = true; s.onload = cb;
  document.head.appendChild(s);
}

// ─── GOOGLE BUTTON COMPONENT ─────────────────────────────────────────────────
function GoogleSignInBtn({ onCredential, label="Continue with Google" }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com") return;
    loadGSI(() => {
      setLoaded(true);
      window.google.accounts.id.initialize({ client_id:GOOGLE_CLIENT_ID, callback:(res) => { const p = parseGoogleJwt(res.credential); if (p) onCredential(p); }, ux_mode:"popup" });
    });
  }, []);

  useEffect(() => {
    if (loaded && ref.current && window.google?.accounts) {
      ref.current.innerHTML = "";
      window.google.accounts.id.renderButton(ref.current, { theme:"outline", size:"large", width:340, text:"continue_with", shape:"rectangular", logo_alignment:"left" });
    }
  }, [loaded]);

  function handleFallback() {
    if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com") {
      setError("Google Sign-In needs setup: Add your Google Client ID in App.jsx (GOOGLE_CLIENT_ID constant). Get it from console.cloud.google.com → Credentials.");
      return;
    }
    if (window.google?.accounts?.id) window.google.accounts.id.prompt();
  }

  return (
    <div>
      {loaded ? (
        <div ref={ref} style={{ display:"flex", justifyContent:"center" }} />
      ) : (
        <button onClick={handleFallback} style={{ width:"100%", padding:"11px 16px", background:C.surface, color:C.text, border:`1px solid ${C.border}`, borderRadius:8, fontSize:14, fontWeight:500, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:C.shadow, fontFamily:"'Roboto',sans-serif" }}>
          <GoogleIcon /> {label}
        </button>
      )}
      {error && <p style={{ color:C.red, fontSize:11, marginTop:6, lineHeight:1.5 }}>{error}</p>}
    </div>
  );
}
function GoogleIcon() {
  return <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>;
}

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
function AuthModal({ open, onClose, onLogin, reason }) {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); const [name, setName] = useState("");
  const [emailPass, setEmailPass] = useState(""); // email password for verification
  const [username, setUsername] = useState(""); const [sitePass, setSitePass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [siUsername, setSiUsername] = useState(""); const [siPass, setSiPass] = useState("");
  const [showPass, setShowPass] = useState(false); const [error, setError] = useState("");
  const [needUsername, setNeedUsername] = useState(false); // for Google new users
  const [googleProfile, setGoogleProfile] = useState(null);

  useEffect(() => { if (open) { setStep(1); setEmail(""); setName(""); setEmailPass(""); setUsername(""); setSitePass(""); setConfirmPass(""); setSiUsername(""); setSiPass(""); setError(""); setMode("signin"); setShowPass(false); setNeedUsername(false); setGoogleProfile(null); } }, [open]);

  function handleGoogleCredential(profile) {
    const googleEmail = profile.email.toLowerCase();
    const existing = DB.getByEmail(googleEmail);
    if (existing) { DB.setCurrent(googleEmail); onLogin(existing); return; }
    setGoogleProfile(profile);
    setEmail(googleEmail);
    setName(profile.name || googleEmail.split("@")[0]);
    setNeedUsername(true);
  }

  function finishGoogleSignup() {
    setError("");
    const u = username.trim().toLowerCase().replace(/\s+/g,"_");
    if (u.length < 3) { setError("Username must be at least 3 characters"); return; }
    if (!/^[a-z0-9_]+$/.test(u)) { setError("Only letters, numbers, underscores allowed"); return; }
    if (DB.getByUsername(u)) { setError("Username taken — try another"); return; }
    if (sitePass.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (sitePass !== confirmPass) { setError("Passwords don't match"); return; }
    const newUser = { email: email.toLowerCase(), name: googleProfile.name||name, username: u, sitePassword: sitePass, roadmaps:[], joinedAt: new Date().toISOString(), googleSignIn: true };
    DB.save(email, newUser); DB.setCurrent(email); onLogin(newUser);
  }

  function signIn() {
    setError("");
    if (!siUsername.trim() || !siPass.trim()) { setError("Please fill both fields"); return; }
    const user = DB.getByUsername(siUsername.trim());
    if (!user) { setError("Username not found. Sign up first."); return; }
    if (user.sitePassword !== siPass) { setError("Incorrect password. Try again."); return; }
    DB.setCurrent(user.email); onLogin(user);
  }

  function signupStep1() {
    setError("");
    const e = email.trim().toLowerCase();
    if (!e || !e.includes("@") || !e.includes(".")) { setError("Please enter a valid email address"); return; }
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!emailPass.trim() || emailPass.length < 6) { setError("Please enter your email account password (min. 6 characters)"); return; }
    setStep(2);
  }

  function signupStep2() {
    setError("");
    const u = username.trim().toLowerCase().replace(/\s+/g,"_");
    if (u.length < 3) { setError("Username must be at least 3 characters"); return; }
    if (!/^[a-z0-9_]+$/.test(u)) { setError("Only letters, numbers, underscores allowed"); return; }
    if (DB.getByUsername(u)) { setError("Username taken"); return; }
    if (DB.getByEmail(email)) { setError("Account with this email already exists"); return; }
    if (sitePass.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (sitePass !== confirmPass) { setError("Passwords don't match"); return; }
    const newUser = { email:email.toLowerCase(), name:name.trim(), username:u, emailPassword:emailPass, sitePassword:sitePass, roadmaps:[], joinedAt:new Date().toISOString() };
    DB.save(email, newUser); DB.setCurrent(email); onLogin(newUser);
  }

  if (!open) return null;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.55)", zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ background:C.surface, borderRadius:16, width:"100%", maxWidth:420, padding:"36px 32px", boxShadow:C.shadowLg, position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:16, background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:20 }}>✕</button>

        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:10 }}><DotLogo size={13} gap={5} /></div>
          <h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:22, fontWeight:600, marginBottom:4 }}>Make My Career</h2>
          <p style={{ color:C.muted, fontSize:13 }}>{needUsername ? "Set your username & password" : mode==="signin" ? "Sign in to your account" : step===1 ? "Create your account (Step 1/2)" : "Choose username & password (Step 2/2)"}</p>
          {reason && <div style={{ background:C.blue+"12", border:`1px solid ${C.blue}30`, borderRadius:8, padding:"8px 12px", marginTop:10, fontSize:12, color:C.blue }}>{reason}</div>}
        </div>

        {/* Google new user: pick username + set password */}
        {needUsername && (
          <div className="slide-right">
            <p style={{ fontSize:13, color:C.muted, marginBottom:14 }}>Welcome, <strong>{googleProfile?.name}</strong>! Set a username and password for this site.</p>
            <div style={{ marginBottom:13 }}>
              <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Choose a username</label>
              <input value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. rahul_sharma" autoFocus />
            </div>
            <div style={{ marginBottom:13 }}>
              <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Set a site password</label>
              <input value={sitePass} onChange={e=>setSitePass(e.target.value)} type="password" placeholder="Min. 6 characters" />
            </div>
            <div style={{ marginBottom:13 }}>
              <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Confirm password</label>
              <input value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Re-enter password" onKeyDown={e=>e.key==="Enter"&&finishGoogleSignup()} />
            </div>
            {error && <p style={{ color:C.red, fontSize:12, marginBottom:10 }}>{error}</p>}
            <Btn onClick={finishGoogleSignup} full variant="green" style={{ borderRadius:8, padding:12 }}>Complete Sign-Up ✓</Btn>
          </div>
        )}

        {!needUsername && (
          <>
            {/* Mode toggle */}
            <div style={{ display:"flex", gap:0, borderRadius:8, overflow:"hidden", border:`1px solid ${C.border}`, marginBottom:18 }}>
              {[["signin","Sign In"],["signup","Sign Up"]].map(([m,label])=>(
                <button key={m} onClick={()=>{setMode(m);setStep(1);setError("");}} style={{ flex:1, padding:10, border:"none", cursor:"pointer", fontFamily:"'Google Sans',sans-serif", fontWeight:500, fontSize:13, background:mode===m?C.blue:"transparent", color:mode===m?"#fff":C.muted, transition:"all .2s" }}>{label}</button>
              ))}
            </div>

            {/* Google button — BOTH modes */}
            <GoogleSignInBtn onCredential={handleGoogleCredential} label={mode==="signin"?"Continue with Google":"Sign up with Google"} />
            <div style={{ display:"flex", alignItems:"center", gap:10, margin:"14px 0" }}>
              <div style={{ flex:1, height:1, background:C.border }} />
              <span style={{ color:C.muted, fontSize:12 }}>or use email</span>
              <div style={{ flex:1, height:1, background:C.border }} />
            </div>

            {/* SIGN IN */}
            {mode==="signin" && (
              <div className="slide-right">
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Your Make My Career username</label>
                  <input value={siUsername} onChange={e=>setSiUsername(e.target.value)} placeholder="e.g. rahul_sharma" onKeyDown={e=>e.key==="Enter"&&signIn()} autoFocus />
                </div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Your Make My Career password</label>
                  <div style={{ position:"relative" }}>
                    <input value={siPass} onChange={e=>setSiPass(e.target.value)} type={showPass?"text":"password"} placeholder="••••••••" onKeyDown={e=>e.key==="Enter"&&signIn()} />
                    <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:12 }}>{showPass?"Hide":"Show"}</button>
                  </div>
                </div>
                {error && <p style={{ color:C.red, fontSize:12, marginBottom:10 }}>{error}</p>}
                <Btn onClick={signIn} full style={{ borderRadius:8, padding:12 }}>Sign In →</Btn>
              </div>
            )}

            {/* SIGN UP step 1 */}
            {mode==="signup" && step===1 && (
              <div className="slide-right">
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Full name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Rahul Sharma" autoFocus />
                </div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Email address</label>
                  <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@gmail.com" />
                </div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Your email account password</label>
                  <div style={{ position:"relative" }}>
                    <input value={emailPass} onChange={e=>setEmailPass(e.target.value)} type={showPass?"text":"password"} placeholder="Password of your email account" onKeyDown={e=>e.key==="Enter"&&signupStep1()} />
                    <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:12 }}>{showPass?"Hide":"Show"}</button>
                  </div>
                  <p style={{ fontSize:11, color:C.muted, marginTop:4 }}>Used to verify your identity. Stored securely in your browser only.</p>
                </div>
                {error && <p style={{ color:C.red, fontSize:12, marginBottom:10 }}>{error}</p>}
                <Btn onClick={signupStep1} full style={{ borderRadius:8, padding:12 }}>Next →</Btn>
              </div>
            )}

            {/* SIGN UP step 2 */}
            {mode==="signup" && step===2 && (
              <div className="slide-right">
                <p style={{ fontSize:13, color:C.muted, marginBottom:12 }}>Account for <strong style={{ color:C.text }}>{email}</strong></p>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Choose a username for this site</label>
                  <input value={username} onChange={e=>setUsername(e.target.value.toLowerCase().replace(/\s/g,"_"))} placeholder="e.g. rahul_sharma" autoFocus />
                  <p style={{ fontSize:11, color:C.muted, marginTop:4 }}>Use this username to sign in next time</p>
                </div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Set a password for this site</label>
                  <div style={{ position:"relative" }}>
                    <input value={sitePass} onChange={e=>setSitePass(e.target.value)} type={showPass?"text":"password"} placeholder="Min. 6 characters" />
                    <button onClick={()=>setShowPass(p=>!p)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:12 }}>{showPass?"Hide":"Show"}</button>
                  </div>
                </div>
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, color:C.muted, display:"block", marginBottom:6, fontWeight:500 }}>Confirm password</label>
                  <input value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Re-enter password" onKeyDown={e=>e.key==="Enter"&&signupStep2()} />
                </div>
                {error && <p style={{ color:C.red, fontSize:12, marginBottom:10 }}>{error}</p>}
                <div style={{ display:"flex", gap:10 }}>
                  <Btn onClick={()=>{setStep(1);setError("");}} variant="neutral" sm>← Back</Btn>
                  <Btn onClick={signupStep2} full variant="green" style={{ borderRadius:8, padding:12 }}>Create Account ✓</Btn>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ───MIC BUTTON─────────────────────────────────────────
function MicButton({ listening, onStart, onStop }) {
  return (
    <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
      {listening && (
        <>
          <div style={{ position:"absolute", width:52, height:52, borderRadius:"50%", background:C.red+"20", animation:"ripple 1.2s ease-out infinite" }} />
          <div style={{ position:"absolute", width:52, height:52, borderRadius:"50%", background:C.red+"15", animation:"ripple 1.2s ease-out infinite .4s" }} />
        </>
      )}
      <button onClick={listening ? onStop : onStart}
        style={{ width:40, height:40, borderRadius:"50%", background:listening?C.red:C.surface2, border:`2px solid ${listening?C.red:C.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", position:"relative", zIndex:1, boxShadow:listening?`0 0 0 0 ${C.red}40`:C.shadow }}>
        {listening ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.muted}>
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke={C.muted} strokeWidth="2" fill="none" strokeLinecap="round"/>
            <line x1="12" y1="19" x2="12" y2="23" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/>
            <line x1="8" y1="23" x2="16" y2="23" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </div>
  );
}

function VoiceWave({ active }) {
  if (!active) return null;
  const bars = 20;
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, height:28, padding:"6px 10px", background:C.red+"10", borderRadius:8, border:`1px solid ${C.red}30`, marginBottom:8 }}>
      {Array.from({length:bars},(_,i)=>(
        <div key={i} className="wave-bar" style={{ height:`${Math.random()*14+4}px`, animationName:"waveBar", animationDuration:`${0.4+Math.random()*0.4}s`, animationTimingFunction:"ease-in-out", animationIterationCount:"infinite", animationDelay:`${i*0.06}s`, background:C.red }} />
      ))}
      <span style={{ fontSize:11, color:C.red, marginLeft:6, whiteSpace:"nowrap" }}>Listening...</span>
    </div>
  );
}

// ─── LANDING ──────────────────────────────────────────────────────────────────
function Landing({ onStart, onSearch }) {
  const [query, setQuery] = useState("");
  function go(e) { e.preventDefault(); if (query.trim()) onSearch(query.trim()); else onStart(); }
  return (
    <div className="fi" style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"40px 24px", textAlign:"center" }}>
      {/* Logo */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:20 }}>
        <div style={{ position:"relative", width:72, height:72, marginBottom:12 }}>
          <div style={{ position:"absolute", inset:0, borderRadius:"50%", background:"linear-gradient(135deg,#4285F4,#34A853)", opacity:.12 }} />
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <DotLogo size={12} gap={4} />
          </div>
        </div>
        <h1 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:400, color:C.text, marginBottom:4 }}>
          Make <span style={{ color:C.blue }}>My</span> <span style={{ color:C.red }}>Car</span><span style={{ color:C.yellow }}>ee</span><span style={{ color:C.green }}>r</span>
        </h1>
        <p style={{ color:C.muted, fontSize:13, fontStyle:"italic" }}>AI-powered CSE career intelligence · Built on real job data</p>
        <div style={{ background:C.blue+"10", border:`1px solid ${C.blue}20`, borderRadius:20, padding:"5px 14px", marginTop:8, display:"inline-block" }}>
          <span style={{ fontSize:12, color:C.blue, fontWeight:500 }}>🎓 Computer Science & Engineering careers only</span>
        </div>
      </div>

      <p style={{ color:C.muted, fontSize:15, maxWidth:500, lineHeight:1.8, marginBottom:24 }}>
        Find your CSE career path from <strong>{DS.totalListings.toLocaleString()}</strong> real Indian tech job listings — free, open, and unbiased AI guidance.
      </p>

      {/* Search bar */}
      <form onSubmit={go} style={{ width:"100%", maxWidth:560, marginBottom:20 }}>
        <div style={{ display:"flex", background:C.surface, border:`1px solid ${C.border}`, borderRadius:28, padding:"10px 20px", boxShadow:C.shadow, alignItems:"center", gap:10 }}>
          <span style={{ fontSize:18, color:C.muted }}>🔍</span>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search role, skill, company, or city..." style={{ flex:1, border:"none", boxShadow:"none", padding:0, fontSize:15, background:"transparent" }} />
          <button type="submit" style={{ background:C.blue, color:"#fff", border:"none", borderRadius:20, padding:"8px 20px", cursor:"pointer", fontFamily:"'Google Sans',sans-serif", fontWeight:500, fontSize:13 }}>Search</button>
        </div>
        <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginTop:12 }}>
          {["Cybersecurity","Data Science & ML","Software Development","Cloud & DevOps","Web Development","Data Engineering"].map(s=>(
            <button key={s} type="button" onClick={()=>onSearch(s)} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, padding:"5px 14px", cursor:"pointer", fontSize:12, color:C.muted }}>
              {s}
            </button>
          ))}
        </div>
      </form>

      <div style={{ display:"flex", gap:12 }}>
        <Btn onClick={onStart} style={{ padding:"12px 32px", fontSize:15, borderRadius:8 }}>Explore CSE Careers</Btn>
      </div>
      <p style={{ color:C.muted, fontSize:12, marginTop:12 }}>Sign in to save roadmaps & progress</p>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14, marginTop:44, maxWidth:640, width:"100%" }}>
        {[{icon:"💼",label:"CSE Job Listings",value:DS.totalListings.toLocaleString(),c:C.blue},{icon:"🎓",label:"Fresher Records",value:DS.totalFresher,c:C.red},{icon:"🏢",label:"Companies",c:C.green,value:"800+"},{icon:"💻",label:"CSE Domains",c:C.yellow,value:"8"}].map(s=>(
          <Card key={s.label} style={{ textAlign:"center", padding:16 }}>
            <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:20, fontWeight:700, color:s.c, marginBottom:4 }}>{s.value}</div>
            <div style={{ color:C.muted, fontSize:11 }}>{s.label}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── DOMAIN BROWSER ───────────────────────────────────────────────────────────
function DomainBrowser({ searchQuery, onSelectDomain, onBack }) {
  const [search, setSearch] = useState(searchQuery||"");
  const allDomains = Object.entries(DS.domains);
  const filtered = search.trim() ? allDomains.filter(([name,d]) => name.toLowerCase().includes(search.toLowerCase()) || d.skills.some(s=>s.toLowerCase().includes(search.toLowerCase())) || d.companies.some(c=>c.toLowerCase().includes(search.toLowerCase())) || d.locations.some(l=>l.toLowerCase().includes(search.toLowerCase())) || d.titles.some(t=>t.toLowerCase().includes(search.toLowerCase()))) : allDomains;
  const scopeC = { "High Demand":{bg:C.green+"15",c:C.green}, "Growing":{bg:C.blue+"12",c:C.blue}, "Stable":{bg:C.yellow+"18",c:"#9a7800"} };
  return (
    <div className="fi" style={{ maxWidth:800, margin:"0 auto", padding:"40px 24px" }}>
      <Back onClick={onBack} label="Home" />
      <h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:26, fontWeight:400, marginBottom:6 }}>Explore Career Domains</h2>
      <p style={{ color:C.muted, fontSize:14, marginBottom:20 }}>Based on <strong>{DS.totalListings.toLocaleString()}</strong> real Indian job listings — {allDomains.length} career domains</p>
      <div style={{ display:"flex", background:C.surface, border:`1px solid ${C.border}`, borderRadius:24, padding:"8px 18px", boxShadow:C.shadow, alignItems:"center", gap:10, marginBottom:24 }}>
        <span style={{ fontSize:16, color:C.muted }}>🔍</span>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by career, skill, company, city..." style={{ flex:1, border:"none", boxShadow:"none", padding:0, fontSize:14, background:"transparent" }} autoFocus />
        {search && <button onClick={()=>setSearch("")} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:16 }}>✕</button>}
      </div>
      {filtered.length===0 && <Card style={{ textAlign:"center", padding:"36px 24px" }}><p style={{ color:C.muted }}>No domains match "<strong>{search}</strong>". Try a skill or company name.</p></Card>}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:14 }}>
        {filtered.map(([name,d]) => { const sc=scopeC[d.futureScope]||scopeC["Growing"]; return (
          <Card key={name} onClick={()=>onSelectDomain(name,d)} style={{ cursor:"pointer" }}>
            <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
              <div style={{ fontSize:28, flexShrink:0 }}>{d.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:5 }}>
                  <span style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:15 }}>{name}</span>
                  <Chip color={sc.c} bg={sc.bg}>{d.futureScope}</Chip>
                </div>
                <p style={{ color:C.muted, fontSize:12, lineHeight:1.6, marginBottom:8 }}>{d.description}</p>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6 }}>{d.skills.slice(0,4).map(s=><Chip key={s} color={C.blue} bg={C.blue+"10"}>{s}</Chip>)}</div>
                <p style={{ fontSize:11, color:C.green, fontWeight:500 }}>{d.count.toLocaleString()} openings · ₹{d.salaryMin}–{d.salaryMax} LPA</p>
              </div>
              <span style={{ color:C.blue, fontSize:18 }}>›</span>
            </div>
          </Card>
        );})}
      </div>
    </div>
  );
}

// ─── JOB LISTINGS ────────────────────────────────────────────────────────────
const LEVELS = ["Entry Level","Mid Level","Senior Level"];
function JobListings({ domainName, domain, onSelectJob, onBack }) {
  const [selLevels,setSelLevels]=useState([]); const [selCompanies,setSelCompanies]=useState([]); const [selLocations,setSelLocations]=useState([]); const [showFilters,setShowFilters]=useState(false); const [search,setSearch]=useState(""); const [showExplain,setShowExplain]=useState(null);
  function toggle(arr,setArr,val){setArr(p=>p.includes(val)?p.filter(x=>x!==val):[...p,val]);}
  // Use REAL jobs from dataset, deduplicated by title+company combo
  const seen = new Set();
  const ALL_JOBS = (domain.jobs || []).filter(j => {
    const key = `${j.title}|${j.company}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((j, i) => ({ ...j, id: i }));
  const filtered=ALL_JOBS.filter(j=>{
    if(selLevels.length>0&&!selLevels.includes(j.level))return false;
    if(selCompanies.length>0&&!selCompanies.some(c=>j.company?.toLowerCase().includes(c.toLowerCase())))return false;
    if(selLocations.length>0&&!selLocations.some(l=>j.location?.toLowerCase().includes(l.toLowerCase())))return false;
    if(search&&!j.title.toLowerCase().includes(search.toLowerCase())&&!j.skills?.some(s=>s.toLowerCase().includes(search.toLowerCase()))&&!j.company?.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  });
  const lvlC={"Entry Level":{bg:C.green+"15",c:C.green},"Mid Level":{bg:C.blue+"12",c:C.blue},"Senior Level":{bg:C.yellow+"18",c:"#9a7800"}};
  const active=selLevels.length+selCompanies.length+selLocations.length;
  return (
    <div className="fi" style={{ maxWidth:760, margin:"0 auto", padding:"40px 24px" }}>
      <Back onClick={onBack} label="All Domains" />
      <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:6 }}><span style={{ fontSize:32 }}>{domain.emoji}</span><div><h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:22, fontWeight:400 }}>{domainName}</h2><p style={{ fontSize:12, color:C.green }}>{domain.count.toLocaleString()} real openings in India · ₹{domain.salaryMin}–{domain.salaryMax} LPA</p></div></div>
      <div style={{ background:C.blue+"08", border:`1px solid ${C.blue}20`, borderRadius:10, padding:"10px 16px", marginBottom:20, display:"flex", gap:16, flexWrap:"wrap", alignItems:"center" }}>
        {[["📊","Salary",`₹${domain.salaryMin||"—"}–${domain.salaryMax||"—"} LPA`],["🏢","Top Hirers",(domain.companies||[]).slice(0,2).join(", ")||"Various companies"],["🏙️","Hotspot",(domain.locations||[])[0]||"Pan India"]].map(([ic,lb,val])=>(
          <div key={lb} style={{ display:"flex", alignItems:"center", gap:6 }}><span>{ic}</span><span style={{ fontSize:11, color:C.muted }}>{lb}:</span><span style={{ fontSize:12, fontWeight:500, color:C.text }}>{val}</span></div>
        ))}
      </div>
      <div style={{ display:"flex", gap:10, marginBottom:14, alignItems:"center" }}>
        <div style={{ flex:1, display:"flex", background:C.surface, border:`1px solid ${C.border}`, borderRadius:20, padding:"7px 14px", alignItems:"center", gap:8 }}>
          <span style={{ color:C.muted, fontSize:14 }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search roles or skills..." style={{ border:"none", boxShadow:"none", padding:0, fontSize:13, background:"transparent" }} />
          {search&&<button onClick={()=>setSearch("")} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer" }}>✕</button>}
        </div>
        <Btn onClick={()=>setShowFilters(!showFilters)} variant="ghost" sm>🔧 Filters {active>0?`(${active})`:""}</Btn>
        {active>0&&<Btn onClick={()=>{setSelLevels([]);setSelCompanies([]);setSelLocations([]);}} variant="neutral" sm>Clear</Btn>}
      </div>
      {showFilters&&(
        <Card style={{ marginBottom:16, animation:"fi .3s ease" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:18 }}>
            <div><SectionTitle>Experience Level</SectionTitle>{LEVELS.map(l=>{const lc=lvlC[l];return(<label key={l} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, cursor:"pointer" }}><input type="checkbox" checked={selLevels.includes(l)} onChange={()=>toggle(selLevels,setSelLevels,l)} /><Chip color={lc.c} bg={lc.bg} active={selLevels.includes(l)}>{l}</Chip></label>);})}</div>
            <div><SectionTitle>Company</SectionTitle><div style={{ maxHeight:150, overflowY:"auto" }}>{domain.companies.slice(0,10).map(c=>(<label key={c} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, cursor:"pointer" }}><input type="checkbox" checked={selCompanies.includes(c)} onChange={()=>toggle(selCompanies,setSelCompanies,c)} /><span style={{ fontSize:12, color:selCompanies.includes(c)?C.blue:C.muted }}>{c}</span></label>))}</div></div>
            <div><SectionTitle>Location</SectionTitle>{domain.locations.map(l=>(<label key={l} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7, cursor:"pointer" }}><input type="checkbox" checked={selLocations.includes(l)} onChange={()=>toggle(selLocations,setSelLocations,l)} /><span style={{ fontSize:12, color:selLocations.includes(l)?C.blue:C.muted }}>{l}</span></label>))}</div>
          </div>
        </Card>
      )}
      <p style={{ color:C.muted, fontSize:12, marginBottom:14 }}>Showing {filtered.length} of {ALL_JOBS.length} roles</p>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.length===0&&<Card style={{ textAlign:"center", padding:"28px" }}><p style={{ color:C.muted }}>No roles match your filters.</p></Card>}
        {filtered.map((job, idx)=>{
          const lc=lvlC[job.level]||lvlC["Entry Level"];
          const safeSkills = Array.isArray(job.skills) ? job.skills.filter(s=>s && s !== "nan") : [];
          return(
          <Card key={`${job.id}-${idx}`}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                <span style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:15 }}>{job.title}</span>
                <Chip color={lc.c} bg={lc.bg}>{job.level}</Chip>
              </div>
              <span style={{ color:C.green, fontWeight:600, fontSize:13, whiteSpace:"nowrap" }}>{job.salary||""}</span>
            </div>
            {safeSkills.length>0 && (
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:8 }}>
                {safeSkills.slice(0,6).map((s,si)=><Chip key={`${s}-${si}`} color={C.muted} bg={C.surface2}>{s}</Chip>)}
              </div>
            )}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {job.company && job.company!=="nan" && <span style={{ fontSize:11, color:C.muted }}>🏢 {job.company}</span>}
                {job.location && job.location!=="nan" && <span style={{ fontSize:11, color:C.muted }}>📍 {job.location}</span>}
                {job.experience && job.experience!=="nan" && <span style={{ fontSize:11, color:C.muted }}>⏱ {job.experience}</span>}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>setShowExplain(showExplain===job.id?null:job.id)} style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:6, padding:"4px 10px", cursor:"pointer", fontSize:11, color:C.muted }}>Why? 🔍</button>
                <Btn onClick={()=>onSelectJob(job,domainName,domain)} sm>Get Roadmap →</Btn>
              </div>
            </div>
            {showExplain===job.id && (
              <div style={{ marginTop:12, padding:12, background:C.blue+"08", borderRadius:8, animation:"fi .25s ease" }}>
                <p style={{ fontSize:12, color:C.blue, fontWeight:500, marginBottom:4 }}>🔍 Why AI recommended this:</p>
                <p style={{ fontSize:12, color:C.muted, lineHeight:1.6 }}>Real job from your dataset — one of {(domain.count||0).toLocaleString()} actual listings in {domainName}. Salary ₹{domain.salaryMin||"—"}–{domain.salaryMax||"—"} LPA from real market data. Recommendation is purely skill and demand-based — not your college or background.</p>
              </div>
            )}
          </Card>
        );})}
      </div>
    </div>
  );
}

// ─── ROADMAP ─────────────────────────────────────────────────────────────────
function RoadmapView({ job, domainName, domain, user, roadmap, setRoadmap, onBack, onStartWeekly, onTrack, isEnrolled, onUserUpdate }) {
  const [loading, setLoading] = useState(!roadmap);
  const [enrolledState, setEnrolledState] = useState(isEnrolled);
  const diffC = { Easy:C.green, Medium:C.yellow, Hard:C.red };
  useEffect(() => { if (!roadmap) generateRoadmap(); }, []);
  useEffect(() => { setEnrolledState(isEnrolled); }, [isEnrolled]);

  function handleEnroll() {
    if (!user) { alert("Please sign in first — click 'Sign In' in the top right corner."); return; }
    if (!roadmap) { alert("Please wait for the roadmap to load first."); return; }
    const entry = { roleTitle:job.title, domainName, domainEmoji:domain.emoji, roadmap, enrolledAt:new Date().toISOString(), checkedSkills:{}, weekProgress:{} };
    DB.enrollRoadmap(user.email, entry);
    setEnrolledState(true);
    if (onUserUpdate) onUserUpdate(DB.getByEmail(user.email));
  }

  async function generateRoadmap() {
    setLoading(true);
    const jobSkills = (job.skills || domain.coreSkills || domain.skills || []).slice(0, 8);
    const highlights = (domain.roadmapHighlights || []).join("; ");
    const dsCtx = `Real dataset: ${domain.count} openings for ${domainName} in India. Salary ₹${domain.salaryMin}–${domain.salaryMax} LPA. Top companies: ${(domain.companies||[]).slice(0,4).join(", ")}`;
    try {
      const data = await aiJson(`You are a senior CSE career mentor in India. Respond ONLY with valid JSON.
${dsCtx}

Create a highly SPECIFIC, SKILL-BASED career roadmap for the role: "${job.title}" in ${domainName}.

The job requires these EXACT skills from the listing: ${jobSkills.join(", ")}
Domain core skills: ${(domain.coreSkills||[]).join(", ")}
Key milestones to hit: ${highlights}

RULES — Make it SPECIFIC not generic:
- Phase 1 must teach the FOUNDATIONAL CS concepts needed specifically for this role (NOT generic "learn basics")
- Each week must name EXACT topics (e.g. "Python list comprehensions, lambda functions, map/filter/reduce" NOT "learn Python")
- Each week must name ONE specific free resource (e.g. "CS50P Week 2 on edX" or "TryHackMe: Pre-Security path" NOT just "YouTube")
- Weeks must build on each other logically
- Certifications must be role-specific and obtainable in India

Return ONLY this JSON (no other text):
{
  "timeline": "X months",
  "difficulty": "Easy|Medium|Hard",
  "demandLevel": "High|Medium|Low",
  "realityCheck": "2 specific sentences about this exact role's competition and hiring reality in India 2025",
  "phases": [
    {
      "title": "Specific phase name",
      "duration": "X weeks",
      "skills": ["Skill1", "Skill2", "Skill3"],
      "weeks": [
        {
          "week": 1,
          "focus": "Specific topic area",
          "topics": [
            "Exact topic 1 — e.g. 'TCP/IP model: how packets travel, subnetting, CIDR notation'",
            "Exact topic 2 — e.g. 'Setting up Kali Linux on VirtualBox step by step'",
            "Exact topic 3 — e.g. 'Nmap scanning: -sS, -sV, -O flags and what they detect'"
          ],
          "hours": "X hrs",
          "resource": "Specific free resource — e.g. 'TryHackMe: Network Fundamentals room (free)'"
        }
      ]
    }
  ],
  "certifications": ["Specific cert 1 for this role", "Specific cert 2", "Specific cert 3"]
}

Return exactly 4 phases. Phase 1 = foundations specific to this role. Phase 2 = core technical skills from the job listing. Phase 3 = real project building. Phase 4 = job preparation and interviews.`);
      const rm = { ...data, role:job.title, domainName, jobSkills };
      setRoadmap(rm);
    } catch(_) {
      // Smart fallback — uses actual domain data
      const sk = jobSkills.length > 0 ? jobSkills : (domain.coreSkills || ["Core Skills"]);
      const rm = {
        role:job.title, domainName, jobSkills:sk,
        timeline: domain.salaryMax > 12 ? "9–12 months" : "6–9 months",
        difficulty: domain.salaryMax > 15 ? "Hard" : domain.salaryMax > 10 ? "Medium" : "Easy",
        demandLevel: ["High Demand","High"].includes(domain.futureScope) ? "High" : "Medium",
        realityCheck:`With ${domain.count} real openings in India, ${domainName} roles at the ${job.level} level are competitive but very much accessible. Companies like ${(domain.companies||[])[0]||"TCS"} and ${(domain.companies||[])[1]||"Infosys"} are actively hiring — your edge is a real project portfolio and strong fundamentals in ${sk.slice(0,2).join(" and ")}.`,
        phases: [
          {
            title:`${domainName} Foundations`,
            duration:"4 weeks",
            skills: sk.slice(0,3),
            weeks:[
              {week:1, focus:`${sk[0]} — Fundamentals`, topics:[`${sk[0]}: core concepts, syntax, and how it's used in ${job.title} roles`,`Setting up your development environment for ${domainName}`,`First hands-on exercise: build something minimal with ${sk[0]}`], hours:"10 hrs", resource:`freeCodeCamp or NPTEL course on ${sk[0]}`},
              {week:2, focus:`${sk[1]||sk[0]} — Core Concepts`, topics:[`${sk[1]||sk[0]}: key patterns used in industry for this role`,`Common mistakes and how to avoid them`,`Build a small real-world example from scratch`], hours:"10 hrs", resource:"GeeksforGeeks / official documentation"},
              {week:3, focus:"Applied Practice", topics:[`Combine ${sk[0]} and ${sk[1]||sk[0]} in a mini project`,`Understanding how ${job.title}s use these day-to-day`,`Study 3 real examples from GitHub repositories`], hours:"12 hrs", resource:"GitHub search + YouTube walkthrough"},
              {week:4, focus:"Foundation Consolidation", topics:[`Revision: build a working demo of your Phase 1 skills`,`Write notes and document what you built`,`Solve 5 practice problems specific to ${domainName}`], hours:"10 hrs", resource:"LeetCode / HackerRank domain problems"},
            ]
          },
          {
            title:"Core Technical Skills",
            duration:"6 weeks",
            skills: sk.slice(1,5),
            weeks:[
              {week:1, focus:`${sk[2]||"Technical Skill"} Deep Dive`, topics:[`${sk[2]||"Technical skill"}: industry-standard usage for ${job.title}`,`Hands-on lab: implement a real feature using this skill`,`Compare different approaches and when to use each`], hours:"12 hrs", resource:"Coursera (audit free) or Udemy"},
              {week:2, focus:`${sk[3]||"Advanced Concepts"}`, topics:[`${sk[3]||"Advanced concept"}: going beyond the basics`,`Real company use cases for ${domainName}`,`Build something production-quality`], hours:"12 hrs", resource:"NPTEL or YouTube expert channels"},
              {week:3, focus:"Integration Practice", topics:[`Combine all skills learned so far in one cohesive project`,`Understand how ${job.title}s at companies use these together`,`Debug real issues and fix them`], hours:"14 hrs", resource:"GitHub open source projects + Stack Overflow"},
              {week:4, focus:"Performance & Best Practices", topics:[`${domainName} industry best practices and coding standards`,`Performance optimization specific to your skill stack`,`Code review: compare your code to industry examples`], hours:"14 hrs", resource:"Medium engineering blogs (Flipkart, Swiggy, Razorpay tech blogs)"},
              {week:5, focus:`${sk[4]||"Specialization"}`, topics:[`${sk[4]||"Specialization"}: the skill that separates mid from senior in this role`,`Real implementation walkthrough`,`Practice exercises from curated resources`], hours:"12 hrs", resource:"Official documentation + YouTube"},
              {week:6, focus:"Skills Assessment", topics:["Build a complete feature using ALL technical skills","Get feedback from peers or mentors on GitHub","Fix weaknesses identified in your work"], hours:"10 hrs", resource:"Discord communities + LinkedIn tech groups"},
            ]
          },
          {
            title:"Real Project Portfolio",
            duration:"5 weeks",
            skills:["GitHub Portfolio","Project Building","Documentation","Open Source"],
            weeks:[
              {week:1, focus:"Project 1 — Plan & Setup", topics:[`Choose a project idea directly relevant to ${job.title} roles`,`Set up repository with proper structure and README`,`Plan features, milestones and tech stack`], hours:"10 hrs", resource:"GitHub + draw.io for planning"},
              {week:2, focus:"Project 1 — Build Core", topics:["Build the main feature of your project","Write clean, commented code","Test every feature you build"], hours:"14 hrs", resource:"Stack Overflow + official docs"},
              {week:3, focus:"Project 2 — Apply Advanced Skills", topics:[`Second project using your most in-demand skills: ${sk.slice(0,2).join(", ")}`,`Make it something a recruiter would understand in 30 seconds`,`Deploy it online (Vercel / Heroku / GitHub Pages)`], hours:"14 hrs", resource:"Vercel / Railway / Netlify (free tier)"},
              {week:4, focus:"Portfolio & GitHub Profile", topics:["Polish both projects — clean up code, add README","Create professional GitHub profile with pinned repos","Write a LinkedIn post about what you built"], hours:"10 hrs", resource:"GitHub profile guide + LinkedIn"},
              {week:5, focus:"Peer Review & Iterate", topics:["Share on Reddit r/cscareerquestions or LinkedIn","Incorporate feedback and fix issues","Add 1 new feature based on user feedback"], hours:"8 hrs", resource:"Reddit + LinkedIn + Showwcase.com"},
            ]
          },
          {
            title:"Job Preparation",
            duration:"3 weeks",
            skills:["Resume","Technical Interviews","Applications","Negotiation"],
            weeks:[
              {week:1, focus:"Resume & LinkedIn Optimization", topics:[`Write a ${job.title}-targeted resume with your project work`,`Optimize LinkedIn with keywords: ${sk.slice(0,3).join(", ")}`,`Connect with 10 ${job.title}s at companies like ${(domain.companies||[])[0]||"TCS"}`], hours:"10 hrs", resource:"Canva resume templates + LinkedIn"},
              {week:2, focus:"Technical Interview Preparation", topics:[`Practice ${domainName} technical questions from Glassdoor and LeetCode`,`Mock interview focusing on your project walkthroughs`,`Study ${(domain.companies||[]).slice(0,2).join(" and ")} interview processes specifically`], hours:"12 hrs", resource:"LeetCode / InterviewBit / Glassdoor"},
              {week:3, focus:"Apply, Apply, Apply", topics:["Apply to 20+ roles — Internshala, LinkedIn, Naukri, company websites","Write tailored cover letter for each application","Follow up professionally after 7 days"], hours:"10 hrs", resource:"Internshala + LinkedIn Jobs + Naukri.com"},
            ]
          }
        ],
        certifications: domain.futureScope === "High Demand"
          ? [`Google Career Certificate in ${domainName}`, `AWS/Azure Fundamentals (free tier practice)`, `NPTEL certification in ${sk[0]||"core subject"} (free, IIT-certified)`]
          : [`NPTEL certification in ${sk[0]||"core subject"} (free)`, `Google Digital Garage Certificate`, `LinkedIn Learning certification in ${domainName}`]
      };
      setRoadmap(rm);
    }
    setLoading(false);
  }

  if (loading) return <div style={{ minHeight:"70vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}><div className="spin" style={{ fontSize:32, display:"inline-block", marginBottom:16, color:C.blue }}>⟳</div><p className="pulse" style={{ color:C.blue }}>Building your personalized roadmap...</p><p style={{ color:C.muted, fontSize:12, marginTop:8 }}>Using real data from {domain.count.toLocaleString()} job listings</p></div>;
  if (!roadmap) return null;

  return (
    <div className="fi" style={{ maxWidth:700, margin:"0 auto", padding:"40px 24px" }}>
      <Back onClick={onBack} label="Job Listings" />
      <h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:24, fontWeight:400, marginBottom:10 }}>Roadmap: {job.title}</h2>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
        <Chip>⏱ {roadmap.timeline}</Chip>
        <Chip color={diffC[roadmap.difficulty]||C.yellow} bg={(diffC[roadmap.difficulty]||C.yellow)+"15"}>{roadmap.difficulty} Difficulty</Chip>
        <Chip color={C.green} bg={C.green+"15"}>📈 {roadmap.demandLevel} Demand</Chip>
        <Chip color={C.green} bg={C.green+"15"}>₹{domain.salaryMin}–{domain.salaryMax} LPA (real data)</Chip>
        {enrolledState && <Chip color={C.green} bg={C.green+"15"}>✅ Enrolled</Chip>}
      </div>

      {/* ── ENROLL BUTTON ── */}
      {!enrolledState ? (
        <div style={{ background:C.blue+"08", border:`1.5px solid ${C.blue}30`, borderRadius:12, padding:"16px 20px", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
          <div>
            <p style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:14, color:C.text, marginBottom:3 }}>Enroll in this roadmap</p>
            <p style={{ fontSize:12, color:C.muted }}>Saves this roadmap to your dashboard so you can track progress anytime</p>
          </div>
          <button onClick={handleEnroll} style={{ background:C.blue, color:"#fff", border:"none", borderRadius:20, padding:"10px 24px", cursor:"pointer", fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:14, whiteSpace:"nowrap", boxShadow:`0 2px 8px ${C.blue}40`, transition:"all .2s" }}>
            + Enroll Now
          </button>
        </div>
      ) : (
        <div style={{ background:C.green+"10", border:`1.5px solid ${C.green}40`, borderRadius:12, padding:"14px 20px", marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
          <span style={{ fontSize:22 }}>✅</span>
          <div>
            <p style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:14, color:C.green }}>You are enrolled in this roadmap!</p>
            <p style={{ fontSize:12, color:C.muted }}>Find it anytime in your Dashboard → My Roadmaps</p>
          </div>
        </div>
      )}

      <Card style={{ marginBottom:20, borderLeft:`4px solid ${C.yellow}`, background:C.yellow+"06" }}>
        <p style={{ fontWeight:600, fontSize:13, color:"#9a7800", marginBottom:8 }}>⚡ Reality Check</p>
        <p style={{ fontSize:13, color:C.muted, lineHeight:1.7 }}>{roadmap.realityCheck}</p>
      </Card>
      <h3 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:16, fontWeight:500, marginBottom:18 }}>Phase-by-Phase Roadmap</h3>
      <div style={{ marginBottom:24 }}>{roadmap.phases?.map((phase,i)=><PhaseCard key={i} phase={phase} index={i} total={roadmap.phases.length} />)}</div>
      {roadmap.certifications&&<Card style={{ marginBottom:24 }}><p style={{ fontWeight:600, fontSize:14, marginBottom:12 }}>🏆 Recommended Certifications</p>{roadmap.certifications.map(c=><div key={c} style={{ fontSize:13, color:C.muted, marginBottom:6 }}><span style={{ color:C.blue }}>◆</span> {c}</div>)}</Card>}
      <div style={{ display:"flex", gap:12 }}>
        <Btn onClick={()=>onStartWeekly(roadmap)} full style={{ padding:14, fontSize:14, borderRadius:8, flex:2 }}>📅 Week-by-Week Plan</Btn>
        <Btn onClick={onTrack} variant="ghost" style={{ padding:14, fontSize:14, borderRadius:8, flex:1 }}>📋 Tracker</Btn>
      </div>
    </div>
  );
}

function PhaseCard({ phase, index, total }) {
  const [open, setOpen] = useState(false);
  const [openWeek, setOpenWeek] = useState(null);
  return (
    <div style={{ display:"flex", gap:16, marginBottom:14 }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div style={{ width:30, height:30, borderRadius:"50%", background:C.blue, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13 }}>{index+1}</div>
        {index<total-1&&<div style={{ width:1, flex:1, background:C.border, margin:"6px 0" }} />}
      </div>
      <Card style={{ flex:1, marginBottom:0, cursor:"pointer" }} onClick={()=>setOpen(!open)}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div><span style={{ fontWeight:600, fontSize:14 }}>{phase.title}</span><Chip color={C.muted} bg={C.surface2} style={{ marginLeft:8 }}>{phase.duration}</Chip></div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:11, color:C.muted }}>{phase.weeks?.length} weeks</span><span style={{ color:C.muted, fontSize:12 }}>{open?"▲":"▼"}</span></div>
        </div>
        {!open&&<div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:8 }}>{phase.skills?.map(s=><Chip key={s} color={C.blue} bg={C.blue+"10"}>{s}</Chip>)}</div>}
        {open&&(
          <div style={{ animation:"fi .25s ease" }}>
            <div style={{ display:"flex", gap:5, flexWrap:"wrap", margin:"12px 0" }}>{phase.skills?.map(s=><Chip key={s} color={C.blue} bg={C.blue+"10"}>{s}</Chip>)}</div>
            <SectionTitle>Week-by-Week Breakdown</SectionTitle>
            {phase.weeks?.map(w=>(
              <div key={w.week} style={{ marginBottom:8 }}>
                <div onClick={e=>{e.stopPropagation();setOpenWeek(openWeek===w.week?null:w.week);}} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 13px", background:openWeek===w.week?C.blue+"08":C.bg, borderRadius:8, cursor:"pointer", border:`1px solid ${openWeek===w.week?C.blue+"30":C.border}` }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:openWeek===w.week?C.blue:C.border, color:openWeek===w.week?"#fff":C.muted, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0 }}>W{w.week}</div>
                    <span style={{ fontSize:13, fontWeight:500, color:C.text }}>{w.focus}</span>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}><span style={{ fontSize:11, color:C.muted }}>{w.hours}</span><span style={{ fontSize:11, color:C.muted }}>{openWeek===w.week?"▲":"▼"}</span></div>
                </div>
                {openWeek===w.week&&(
                  <div style={{ padding:"12px 14px", background:C.bg, borderRadius:"0 0 8px 8px", border:`1px solid ${C.blue}20`, borderTop:"none", animation:"fi .2s ease" }}>
                    <p style={{ fontSize:11, color:C.muted, fontWeight:600, textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Topics this week</p>
                    {w.topics?.map((topic,ti)=><div key={ti} style={{ display:"flex", gap:8, marginBottom:7, fontSize:13, color:C.text }}><span style={{ color:C.blue, flexShrink:0, fontWeight:600 }}>{ti+1}.</span>{topic}</div>)}
                    <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${C.border}`, display:"flex", gap:6, alignItems:"center" }}>
                      <span style={{ fontSize:11, color:C.muted }}>📚 Resource:</span>
                      <Chip color={C.green} bg={C.green+"12"}>{w.resource}</Chip>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── WEEKLY PLANNER ───────────────────────────────────────────────────────────
function WeeklyPlanner({ roadmap, job, user, weekProgress, setWeekProgress, onBack }) {
  const allWeeks = roadmap.phases?.flatMap((phase,pi) => (phase.weeks||[]).map(w=>({...w,phase:phase.title,phaseIndex:pi}))) || [];
  const done = Object.values(weekProgress).filter(Boolean).length;
  function toggleWeek(key) { const u={...weekProgress,[key]:!weekProgress[key]};setWeekProgress(u);if(user)DB.updateWeekProgress(user.email,job.title,u); }
  return (
    <div className="fi" style={{ maxWidth:680, margin:"0 auto", padding:"40px 24px" }}>
      <Back onClick={onBack} label="Roadmap" />
      <h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:24, fontWeight:400, marginBottom:6 }}>📅 Week-by-Week Plan</h2>
      <p style={{ color:C.muted, fontSize:14, marginBottom:20 }}>Complete schedule for <strong style={{ color:C.blue }}>{job.title}</strong></p>
      <Card style={{ marginBottom:22 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}><span style={{ fontWeight:500 }}>Progress</span><span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:18, fontWeight:600, color:C.blue }}>{done}/{allWeeks.length} weeks</span></div>
        <ProgressBar value={allWeeks.length?(done/allWeeks.length)*100:0} />
      </Card>
      {roadmap.phases?.map((phase,pi)=>(
        <div key={pi} style={{ marginBottom:22 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:C.blue, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, flexShrink:0 }}>{pi+1}</div>
            <span style={{ fontWeight:600, fontSize:15 }}>{phase.title}</span><span style={{ fontSize:12, color:C.muted }}>{phase.duration}</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginLeft:18, borderLeft:`2px solid ${C.border}`, paddingLeft:22 }}>
            {(phase.weeks||[]).map(w=>{const key=`${pi}_w${w.week}`;const isDone=weekProgress[key];return(
              <Card key={w.week} style={{ borderColor:isDone?C.green+"40":C.border }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:isDone?C.green+"20":C.surface2, border:`2px solid ${isDone?C.green:C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }} onClick={()=>toggleWeek(key)}>
                    {isDone?<span style={{ color:C.green, fontSize:14 }}>✓</span>:<span style={{ fontWeight:600, fontSize:12, color:C.muted }}>W{w.week}</span>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}><span style={{ fontWeight:600, fontSize:14, color:isDone?C.muted:C.text, textDecoration:isDone?"line-through":"none" }}>Week {w.week}: {w.focus}</span><Chip color={C.muted} bg={C.surface2}>{w.hours}</Chip></div>
                    {w.topics?.map((t,ti)=><div key={ti} style={{ display:"flex", gap:8, marginBottom:6, fontSize:13, color:isDone?C.muted:C.text }}><span style={{ color:C.blue, flexShrink:0, fontSize:12 }}>▸</span>{t}</div>)}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:10 }}>
                      <Chip color={C.green} bg={C.green+"12"}>📚 {w.resource}</Chip>
                      <Btn onClick={()=>toggleWeek(key)} variant={isDone?"neutral":"green"} sm>{isDone?"Mark Incomplete":"✓ Mark Complete"}</Btn>
                    </div>
                  </div>
                </div>
              </Card>
            );})}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TRACKER ─────────────────────────────────────────────────────────────────
function Tracker({ roadmap, job, checkedSkills, setCheckedSkills, user, onBack }) {
  const allItems = roadmap.phases?.flatMap((p,pi)=>(p.skills||[p.title]).map(sk=>`${pi}::${sk}`))||[];
  const done = allItems.filter(k=>checkedSkills[k]).length;
  const pct = allItems.length?Math.round((done/allItems.length)*100):0;
  function toggle(key,val){const u={...checkedSkills,[key]:val};setCheckedSkills(u);if(user)DB.updateProgress(user.email,job.title,u);}
  return (
    <div className="fi" style={{ maxWidth:660, margin:"0 auto", padding:"40px 24px" }}>
      <Back onClick={onBack} label="Roadmap" />
      <h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:26, fontWeight:400, marginBottom:6 }}>Skill Tracker</h2>
      <p style={{ color:C.muted, fontSize:14, marginBottom:24 }}><strong style={{ color:C.blue }}>{job.title}</strong>{!user&&<span style={{ color:C.muted, fontSize:12 }}> · Sign in to save</span>}</p>
      <Card style={{ marginBottom:24 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}><span style={{ fontWeight:500 }}>Skills Mastered</span><span style={{ fontFamily:"'Google Sans',sans-serif", fontSize:22, fontWeight:600, color:C.blue }}>{pct}%</span></div>
        <ProgressBar value={pct} />
        <p style={{ fontSize:12, color:C.muted, marginTop:8 }}>{done} of {allItems.length} {pct===100?"— 🎉 Complete!":"skills covered"}</p>
      </Card>
      {roadmap.phases?.map((phase,pi)=>(
        <Card key={pi} style={{ marginBottom:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}><p style={{ fontWeight:600, fontSize:14 }}>Phase {pi+1}: {phase.title}</p><Chip color={C.muted} bg={C.surface2}>{phase.duration}</Chip></div>
          {(phase.skills||[phase.title]).map(skill=>{const key=`${pi}::${skill}`;return(
            <label key={skill} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, cursor:"pointer" }}>
              <input type="checkbox" checked={!!checkedSkills[key]} onChange={e=>toggle(key,e.target.checked)} />
              <span style={{ fontSize:13, textDecoration:checkedSkills[key]?"line-through":"none", color:checkedSkills[key]?C.muted:C.text, transition:"color .2s" }}>{skill}</span>
              {checkedSkills[key]&&<span style={{ color:C.green, fontSize:12 }}>✓</span>}
            </label>
          );})}
        </Card>
      ))}
    </div>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ user, onStartNew, onResumeRoadmap, onLogout }) {
  const roadmaps = user.roadmaps||[];
  function pct(r){const all=r.roadmap?.phases?.flatMap((p,pi)=>(p.skills||[p.title]).map(sk=>`${pi}::${sk}`))||[];const d=all.filter(k=>r.checkedSkills?.[k]).length;return all.length?Math.round((d/all.length)*100):0;}
  return (
    <div className="fi" style={{ maxWidth:700, margin:"0 auto", padding:"40px 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:28 }}>
        <Avatar name={user.name} size={52} />
        <div><h2 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:22, fontWeight:400 }}>Welcome back, {user.name.split(" ")[0]}!</h2><p style={{ color:C.muted, fontSize:13 }}>@{user.username} · {roadmaps.length} roadmap{roadmaps.length!==1?"s":""} enrolled</p></div>
        <div style={{ marginLeft:"auto", display:"flex", gap:8 }}><Btn onClick={onStartNew} style={{ padding:"9px 18px" }}>+ Explore</Btn><Btn onClick={onLogout} variant="neutral" sm>Sign Out</Btn></div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:24 }}>
        {[{label:"Enrolled",value:roadmaps.length,icon:"🗺️",c:C.blue},{label:"Avg Progress",value:roadmaps.length?Math.round(roadmaps.reduce((a,r)=>a+pct(r),0)/roadmaps.length)+"%":"—",icon:"📈",c:C.green},{label:"Completed",value:roadmaps.filter(r=>pct(r)===100).length,icon:"🏆",c:C.yellow}].map(s=>(
          <Card key={s.label} style={{ textAlign:"center", padding:16 }}><div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div><div style={{ fontFamily:"'Google Sans',sans-serif", fontSize:24, fontWeight:600, color:s.c, marginBottom:4 }}>{s.value}</div><div style={{ color:C.muted, fontSize:11 }}>{s.label}</div></Card>
        ))}
      </div>
      {roadmaps.length===0?(
        <Card style={{ textAlign:"center", padding:"44px 24px" }}><div style={{ fontSize:44, marginBottom:14 }}>🗺️</div><h3 style={{ fontFamily:"'Google Sans',sans-serif", fontSize:18, fontWeight:400, marginBottom:8 }}>No roadmaps yet</h3><p style={{ color:C.muted, fontSize:13, marginBottom:20 }}>Browse {DS.totalListings.toLocaleString()} real job listings</p><Btn onClick={onStartNew}>Start Exploring →</Btn></Card>
      ):(
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {roadmaps.map((r,i)=>{const p=pct(r);return(
            <Card key={i} onClick={()=>onResumeRoadmap(r)} style={{ cursor:"pointer" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ fontSize:28 }}>{r.domainEmoji||"🎯"}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}><span style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:15 }}>{r.roleTitle}</span><span style={{ fontWeight:600, fontSize:15, color:p===100?C.green:C.blue }}>{p}%</span></div>
                  <p style={{ color:C.muted, fontSize:12, marginBottom:8 }}>{r.domainName} · {new Date(r.enrolledAt).toLocaleDateString("en-IN")}</p>
                  <ProgressBar value={p} color={p===100?C.green:C.blue} />
                </div>
                <span style={{ color:C.blue, fontSize:18 }}>›</span>
              </div>
            </Card>
          );})}
        </div>
      )}
    </div>
  );
}

// ─── MENTOR SIDEBAR ─────────────────────
function MentorSidebar({ open, selectedJob, domainName }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recRef = useRef(null);
  const endRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!open && wasOpen.current) { setMsgs([]); setInput(""); setThinking(false); setListening(false); setTranscript(""); if (recRef.current) { recRef.current.stop(); recRef.current = null; } }
    wasOpen.current = open;
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, thinking]);

  function startVoice() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setMsgs(m=>[...m,{role:"ai",text:"Voice input is only supported in Google Chrome. Please type your question instead."}]); return; }
    try {
      if (recRef.current) { recRef.current.stop(); recRef.current = null; }
      const recognition = new SR();
      recognition.lang = "en-IN"; recognition.continuous = false; recognition.interimResults = true; recognition.maxAlternatives = 1;
      recognition.onstart = () => { setListening(true); setTranscript(""); };
      recognition.onresult = (e) => {
        let interim = ""; let final = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          if (e.results[i].isFinal) final += e.results[i][0].transcript;
          else interim += e.results[i][0].transcript;
        }
        setTranscript(final || interim);
        if (final) { setInput(final); setListening(false); setTranscript(""); }
      };
      recognition.onerror = (e) => { setListening(false); setTranscript(""); if (e.error==="not-allowed") setMsgs(m=>[...m,{role:"ai",text:"Microphone access denied. Allow microphone access in your browser settings (click the lock icon in address bar)."}]); };
      recognition.onend = () => { setListening(false); };
      recRef.current = recognition;
      recognition.start();
    } catch(e) { setListening(false); }
  }

  function stopVoice() { if (recRef.current) { recRef.current.stop(); recRef.current = null; } setListening(false); setTranscript(""); }

  async function send(override) {
    const q = (override || input).trim(); if (!q || thinking) return;
    setInput(""); setMsgs(m=>[...m,{role:"user",text:q}]); setThinking(true);
    try {
      const ctx = `You are a friendly, practical Indian career mentor. Give honest, India-specific career advice in 3-5 sentences. Be direct and helpful. Context: Job being explored: ${selectedJob?.title||"various careers"}, Domain: ${domainName||"technology"}. You have access to data from ${DS.totalListings.toLocaleString()} real Indian job listings.`;
      const reply = await aiText(ctx, q);
      setMsgs(m=>[...m,{role:"ai",text:reply}]);
    } catch(_) { setMsgs(m=>[...m,{role:"ai",text:"Couldn't connect. Try Again."}]); }
    setThinking(false);
  }

  const QUICK = ["How long to get my first job?","What salary to expect as a fresher?","Best free resources to start?","Which city has most jobs?","Is this career worth it in 2026?"];

  return (
    <div className={`mentor-panel ${open?"open":"closed"}`}>
      <div style={{ padding:"14px 18px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.blue},${C.green})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🤖</div>
          <div><p style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:14 }}>AI Career Mentor</p><p style={{ fontSize:11, color:C.green }}>Powered by {DS.totalListings.toLocaleString()} real listings</p></div>
        </div>
        {selectedJob&&<p style={{ fontSize:11, color:C.muted, marginTop:8, paddingTop:8, borderTop:`1px solid ${C.border}` }}>Discussing: <span style={{ color:C.blue }}>{selectedJob.title}</span></p>}
        <p style={{ fontSize:10, color:C.muted, marginTop:4 }}>Chat clears automatically when closed</p>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"14px 14px 0", display:"flex", flexDirection:"column", gap:10 }}>
        {msgs.length===0&&(
          <div>
            <div style={{ textAlign:"center", padding:"18px 0 14px", color:C.muted, fontSize:13, lineHeight:1.8 }}><div style={{ fontSize:28, marginBottom:6 }}>💬</div>Ask anything about careers in India</div>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>{QUICK.map(q=><button key={q} onClick={()=>send(q)} style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.muted, borderRadius:8, padding:"9px 12px", fontSize:12, cursor:"pointer", textAlign:"left" }}>{q}</button>)}</div>
          </div>
        )}
        {msgs.map((m,i)=>(
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:m.role==="user"?"flex-end":"flex-start", gap:3 }}>
            {m.role==="ai"&&<span style={{ fontSize:10, color:C.muted, paddingLeft:4 }}>AI Mentor</span>}
            <div style={{ maxWidth:"90%", background:m.role==="user"?C.blue:C.bg, color:m.role==="user"?"#fff":C.text, padding:"10px 14px", borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", fontSize:13, lineHeight:1.7, border:m.role==="ai"?`1px solid ${C.border}`:"none" }}>{m.text}</div>
          </div>
        ))}
        {thinking&&<div style={{ display:"flex", gap:5, padding:"4px 0 4px 4px" }}>{[0,1,2].map(i=><div key={i} className="pulse" style={{ width:7, height:7, borderRadius:"50%", background:C.blue, animationDelay:`${i*.2}s` }} />)}</div>}
        <div ref={endRef} style={{ height:8 }} />
      </div>

      <div style={{ padding:"12px 14px", borderTop:`1px solid ${C.border}`, flexShrink:0 }}>
        {/* wave when listening */}
        <VoiceWave active={listening} />
        {/* Interim transcript */}
        {transcript && <div style={{ fontSize:12, color:C.muted, padding:"4px 8px", background:C.surface2, borderRadius:6, marginBottom:8, fontStyle:"italic" }}>"{transcript}"</div>}

        <div style={{ display:"flex", gap:6, alignItems:"flex-end" }}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask your career question..." rows={2} style={{ flex:1, resize:"none", padding:"9px 12px", fontSize:13, borderRadius:8, lineHeight:1.5 }} />
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            <MicButton listening={listening} onStart={startVoice} onStop={stopVoice} />
            <button onClick={()=>send()} disabled={thinking||!input.trim()} style={{ width:40, height:40, borderRadius:"50%", background:C.blue, border:"none", cursor:thinking||!input.trim()?"not-allowed":"pointer", opacity:thinking||!input.trim()?.5:1, fontSize:18, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center" }}>↑</button>
          </div>
        </div>
        <p style={{ fontSize:10, color:C.muted, marginTop:5 }}>Enter to send · Shift+Enter for newline · 🎤 mic (Chrome only)</p>
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ user, mentorOpen, setMentorOpen, onSignIn, onHome }) {
  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", boxShadow:"0 1px 3px rgba(60,64,67,.12)" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={onHome}>
        <DotLogo size={9} gap={4} />
        <span style={{ fontFamily:"'Google Sans',sans-serif", fontWeight:600, fontSize:16, color:C.text }}>Make My Career</span>
        <span style={{ fontSize:10, color:C.muted, background:C.surface2, padding:"2px 8px", borderRadius:10, border:`1px solid ${C.border}` }}>AI-powered</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {user?(
          <button onClick={onHome} style={{ display:"flex", alignItems:"center", gap:8, background:"none", border:`1px solid ${C.border}`, borderRadius:20, padding:"5px 12px 5px 6px", cursor:"pointer" }}>
            <Avatar name={user.name} size={24} />
            <span style={{ fontSize:12, color:C.text, fontWeight:500 }}>{user.name.split(" ")[0]}</span>
          </button>
        ):(
          <Btn onClick={onSignIn} variant="ghost" sm>Sign In</Btn>
        )}
        <button onClick={()=>setMentorOpen(o=>!o)} style={{ display:"flex", alignItems:"center", gap:6, background:mentorOpen?C.blue:C.surface, color:mentorOpen?"#fff":C.blue, border:`1px solid ${mentorOpen?C.blue:C.border}`, borderRadius:20, padding:"7px 16px", cursor:"pointer", fontFamily:"'Roboto',sans-serif", fontWeight:500, fontSize:12, transition:"all .2s" }}>
          🤖 {mentorOpen?"Close":"AI Mentor"}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("landing");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomainName, setSelectedDomainName] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [checkedSkills, setCheckedSkills] = useState({});
  const [weekProgress, setWeekProgress] = useState({});
  const [mentorOpen, setMentorOpen] = useState(false);
  const [authModal, setAuthModal] = useState({ open:false, reason:"" });

  useEffect(() => { const id=DB.getCurrent(); if(id){const u=DB.getByEmail(id);if(u){setUser(u);setScreen("dashboard");}} }, []);

  function handleLogin(u) { setUser(u); setAuthModal({open:false,reason:""}); setScreen("dashboard"); }
  function onLogout() { DB.clearCurrent(); setUser(null); setScreen("landing"); resetAll(); }
  function resetAll() { setSelectedDomainName(null); setSelectedDomain(null); setSelectedJob(null); setRoadmap(null); setCheckedSkills({}); setWeekProgress({}); }

  function onSelectDomain(name, d) { setSelectedDomainName(name); setSelectedDomain(d); setScreen("jobs"); }
  function onSelectJob(job, domainName, domain) { setSelectedJob(job); setSelectedDomainName(domainName); setSelectedDomain(domain); setRoadmap(null); setCheckedSkills({}); setWeekProgress({}); setScreen("roadmap"); }
  function onResumeRoadmap(r) { const dd=DS.domains[r.domainName]; setSelectedDomainName(r.domainName); setSelectedDomain(dd||{emoji:r.domainEmoji||"🎯",count:0,salaryMin:0,salaryMax:0,skills:[],companies:[],locations:[],titles:[]}); setSelectedJob({title:r.roleTitle}); setRoadmap(r.roadmap); setCheckedSkills(r.checkedSkills||{}); setWeekProgress(r.weekProgress||{}); setScreen("roadmap"); }

  const isEnrolled = !!user?.roadmaps?.some(r=>r.roleTitle===selectedJob?.title);

  return (
    <>
      <style>{css}</style>
      <AuthModal open={authModal.open} reason={authModal.reason} onClose={()=>setAuthModal({open:false,reason:""})} onLogin={handleLogin} />
      <Navbar user={user} mentorOpen={mentorOpen} setMentorOpen={setMentorOpen} onSignIn={()=>setAuthModal({open:true,reason:""})} onHome={()=>user?setScreen("dashboard"):setScreen("landing")} />
      <MentorSidebar open={mentorOpen} selectedJob={selectedJob} domainName={selectedDomainName} />
      <div className="main-content" style={{ paddingTop:60, paddingRight:mentorOpen?360:0 }}>
        {screen==="landing"&&<Landing onStart={()=>setScreen("browse")} onSearch={q=>{setSearchQuery(q);setScreen("browse");}} />}
        {screen==="dashboard"&&user&&<Dashboard user={user} onStartNew={()=>setScreen("browse")} onResumeRoadmap={onResumeRoadmap} onLogout={onLogout} />}
        {screen==="browse"&&<DomainBrowser searchQuery={searchQuery} onSelectDomain={onSelectDomain} onBack={()=>setScreen(user?"dashboard":"landing")} />}
        {screen==="jobs"&&selectedDomain&&<JobListings domainName={selectedDomainName} domain={selectedDomain} onSelectJob={onSelectJob} onBack={()=>setScreen("browse")} />}
        {screen==="roadmap"&&selectedJob&&<RoadmapView job={selectedJob} domainName={selectedDomainName} domain={selectedDomain} user={user} roadmap={roadmap} setRoadmap={setRoadmap} onBack={()=>setScreen("jobs")} isEnrolled={isEnrolled} onStartWeekly={rm=>{setRoadmap(rm);setScreen("weekly");}} onTrack={()=>setScreen("tracker")} />}
        {screen==="weekly"&&roadmap&&<WeeklyPlanner roadmap={roadmap} job={selectedJob} user={user} weekProgress={weekProgress} setWeekProgress={setWeekProgress} onBack={()=>setScreen("roadmap")} />}
        {screen==="tracker"&&roadmap&&<Tracker roadmap={roadmap} job={selectedJob} checkedSkills={checkedSkills} setCheckedSkills={setCheckedSkills} user={user} onBack={()=>setScreen("roadmap")} />}
      </div>
    </>
  );
}
