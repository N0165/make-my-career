import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap');`;

const C = {
  bg: "#080E1A", surface: "#0F1928", surface2: "#172035", border: "#1C2C44",
  amber: "#F59E0B", amberLight: "#FCD34D", teal: "#2DD4BF", tealDim: "#0D9488",
  text: "#EEF2FF", muted: "#64748B", mutedLight: "#94A3B8",
  success: "#22C55E", danger: "#F87171", purple: "#A78BFA"
};

const css = `
${FONTS}
*{box-sizing:border-box;margin:0;padding:0;}
html,body{background:${C.bg};font-family:'Plus Jakarta Sans',sans-serif;color:${C.text};min-height:100vh;}
.fi{animation:fi .4s ease;}
@keyframes fi{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}
@keyframes spin{from{transform:rotate(0);}to{transform:rotate(360deg);}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
.spin{animation:spin 1.4s linear infinite;}
.pulse{animation:pulse 1.8s ease-in-out infinite;}
input,textarea,select{background:${C.surface2};border:1px solid ${C.border};color:${C.text};border-radius:8px;padding:10px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;outline:none;transition:border-color .2s;width:100%;}
input:focus,textarea:focus,select:focus{border-color:${C.amber};}
input[type=checkbox]{width:16px;height:16px;accent-color:${C.amber};cursor:pointer;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:${C.surface};}
::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px;}
`;

async function ai(system, user) {
  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyB-OHuTVsma01a32nvLHFawSVgqEnKj4aU",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${system}\n\n${user}` }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
      })
    }
  );
  const d = await r.json();
  let raw = d.candidates[0].content.parts[0].text;
  raw = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(raw);
}

function Btn({ onClick, children, variant = "primary", disabled, full, style = {} }) {
  const s = {
    padding: "10px 20px", borderRadius: 8, border: "none",
    cursor: disabled ? "not-allowed" : "pointer", fontFamily: "'Sora',sans-serif",
    fontWeight: 600, fontSize: 14, transition: "all .2s", opacity: disabled ? .5 : 1,
    width: full ? "100%" : "auto", ...style,
    ...(variant === "primary" ? { background: C.amber, color: "#080E1A" } : {}),
    ...(variant === "ghost" ? { background: "transparent", color: C.amber, border: `1px solid ${C.amber}30`, backdropFilter: "blur(4px)" } : {}),
    ...(variant === "teal" ? { background: C.tealDim + "33", color: C.teal, border: `1px solid ${C.tealDim}` } : {})
  };
  return <button onClick={disabled ? undefined : onClick} style={s}>{children}</button>;
}

function Card({ children, style = {}, onClick, glow }) {
  return (
    <div onClick={onClick} style={{
      background: C.surface, border: `1px solid ${glow ? C.amber + "60" : C.border}`,
      borderRadius: 14, padding: "16px 20px",
      cursor: onClick ? "pointer" : "default",
      transition: "border-color .2s, transform .2s",
      boxShadow: glow ? `0 0 24px ${C.amber}15` : "none",
      ...style
    }}>
      {children}
    </div>
  );
}

function Tag({ children, color = C.amber + "22", text = C.amber }) {
  return (
    <span style={{ background: color, color: text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, display: "inline-block" }}>
      {children}
    </span>
  );
}

function Back({ onClick, label = "Back" }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", color: C.mutedLight, cursor: "pointer", fontSize: 13, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
      ← {label}
    </button>
  );
}

function Spinner() {
  return <span className="spin" style={{ display: "inline-block", fontSize: 18 }}>⟳</span>;
}

// ─── LANDING ────────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div className="fi" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 56 }}>🧭</span>
      </div>
      <h1 style={{ fontFamily: "'Sora',sans-serif", fontSize: "clamp(28px,5vw,46px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16 }}>
        <span style={{ color: C.amber }}>AI Career</span> Navigator
      </h1>
      <p style={{ color: C.mutedLight, fontSize: 15, maxWidth: 460, lineHeight: 1.8, marginBottom: 10 }}>
        India's smartest career intelligence platform. Enter your interests and skills — get a personalized roadmap, real job roles, and skill gap analysis powered by AI.
      </p>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
        {["🇮🇳 India-Focused", "🤖 AI-Powered", "🗺️ Roadmap Generator", "📊 Skill Gap"].map(t => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <Btn onClick={onStart} style={{ padding: "14px 36px", fontSize: 16, borderRadius: 12 }}>
        Start My Career Journey →
      </Btn>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginTop: 52, maxWidth: 580, width: "100%" }}>
        {[
          { icon: "🎯", label: "Career Domains", desc: "AI-matched to your profile" },
          { icon: "💼", label: "Job Role Explorer", desc: "Entry to senior pathways" },
          { icon: "🗺️", label: "Roadmap Generator", desc: "Step-by-step plan" },
          { icon: "⚡", label: "Reality Check", desc: "Honest market insights" }
        ].map(f => (
          <Card key={f.label} style={{ textAlign: "center", padding: 16 }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>{f.icon}</div>
            <p style={{ fontWeight: 600, fontSize: 12, marginBottom: 4 }}>{f.label}</p>
            <p style={{ color: C.muted, fontSize: 11 }}>{f.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILING ──────────────────────────────────────────────────────────────
function Profiling({ profile, setProfile, onAnalyze, loading }) {
  const [intInput, setIntInput] = useState("");
  const [sklInput, setSklInput] = useState("");

  function addToList(field, input, setInput) {
    const v = input.trim();
    if (!v || profile[field].includes(v)) { setInput(""); return; }
    setProfile(p => ({ ...p, [field]: [...p[field], v] }));
    setInput("");
  }

  function removeFrom(field, val) {
    setProfile(p => ({ ...p, [field]: p[field].filter(x => x !== val) }));
  }

  return (
    <div className="fi" style={{ maxWidth: 580, margin: "0 auto", padding: "40px 24px" }}>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, marginBottom: 6 }}>Tell us about yourself</h2>
      <p style={{ color: C.mutedLight, marginBottom: 32, fontSize: 14 }}>This helps AI generate your personalized career map</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div>
          <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Your Name</label>
          <input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Rahul Sharma" />
        </div>

        <div>
          <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Education / Background</label>
          <select value={profile.education} onChange={e => setProfile(p => ({ ...p, education: e.target.value }))}>
            <option value="10th">10th Standard</option>
            <option value="12th_science">12th — Science</option>
            <option value="12th_commerce">12th — Commerce</option>
            <option value="12th_arts">12th — Arts</option>
            <option value="undergraduate">Undergraduate (B.Tech / BCA / BSc / BBA)</option>
            <option value="postgraduate">Postgraduate (M.Tech / MBA / MCA)</option>
            <option value="working">Working Professional (Career Switch)</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Interests <span style={{ color: C.muted, fontWeight: 400, textTransform: "none" }}>(press Enter to add)</span></label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {profile.interests.map(i => (
              <span key={i} onClick={() => removeFrom("interests", i)} style={{ background: C.amber + "22", color: C.amber, padding: "4px 10px", borderRadius: 20, fontSize: 12, cursor: "pointer" }}>
                {i} ×
              </span>
            ))}
          </div>
          <input value={intInput} onChange={e => setIntInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addToList("interests", intInput, setIntInput); }}
            placeholder="e.g. Technology, Finance, Gaming, Design, Healthcare..." />
          <p style={{ fontSize: 11, color: C.muted, marginTop: 5 }}>Tip: Add 2–4 interests for best results</p>
        </div>

        <div>
          <label style={{ fontSize: 12, color: C.muted, display: "block", marginBottom: 7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Skills You Already Have <span style={{ color: C.muted, fontWeight: 400, textTransform: "none" }}>(press Enter)</span></label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
            {profile.skills.map(s => (
              <span key={s} onClick={() => removeFrom("skills", s)} style={{ background: C.tealDim + "33", color: C.teal, padding: "4px 10px", borderRadius: 20, fontSize: 12, cursor: "pointer" }}>
                {s} ×
              </span>
            ))}
          </div>
          <input value={sklInput} onChange={e => setSklInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addToList("skills", sklInput, setSklInput); }}
            placeholder="e.g. Python, Excel, Communication, Photoshop..." />
          <p style={{ fontSize: 11, color: C.muted, marginTop: 5 }}>No skills yet? Leave empty — we'll guide you from scratch</p>
        </div>

        <Btn onClick={onAnalyze} disabled={loading || profile.interests.length === 0}
          full style={{ padding: "14px", fontSize: 15, borderRadius: 12, marginTop: 8 }}>
          {loading ? "Analyzing with AI..." : "🚀 Analyze My Profile"}
        </Btn>
      </div>
    </div>
  );
}

// ─── ANALYZING ──────────────────────────────────────────────────────────────
function Analyzing({ msg }) {
  const steps = [
    "Reading your interests and skills...",
    "Matching Indian career domains...",
    "Calculating skill requirements...",
    "Building your roadmap..."
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % steps.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 32 }}>
      <div className="spin" style={{ fontSize: 48, display: "inline-block", marginBottom: 28 }}>🧠</div>
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 22, marginBottom: 12 }}>AI is analyzing your profile...</h2>
      <p className="pulse" style={{ color: C.amber, fontSize: 14 }}>{steps[idx]}</p>
    </div>
  );
}

// ─── DOMAINS ────────────────────────────────────────────────────────────────
function Domains({ domains, profile, onSelect, onBack }) {
  const scopeColor = { "High Demand": { bg: C.tealDim + "30", text: C.teal }, "Growing": { bg: C.amber + "22", text: C.amber }, "Stable": { bg: "#94A3B830", text: C.mutedLight }, "Competitive": { bg: C.danger + "22", text: C.danger } };

  return (
    <div className="fi" style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>
      <Back onClick={onBack} label="Edit Profile" />
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, marginBottom: 6 }}>
        Your Career Matches{profile.name ? `, ${profile.name}` : ""}
      </h2>
      <p style={{ color: C.mutedLight, fontSize: 14, marginBottom: 32 }}>AI analysed your profile and found these best-fit career domains in India</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {domains.map((d, i) => {
          const sc = scopeColor[d.futureScope] || { bg: C.amber + "22", text: C.amber };
          return (
            <Card key={d.name} onClick={() => onSelect(d)} glow={i === 0} style={{ display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer" }}>
              <div style={{ fontSize: 34, minWidth: 46, textAlign: "center", paddingTop: 2 }}>{d.emoji || "🎯"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 17 }}>{d.name}</span>
                  {i === 0 && <Tag color={C.amber + "33"} text={C.amber}>⭐ Best Match</Tag>}
                  {i === 1 && <Tag color={C.tealDim + "33"} text={C.teal}>Strong Fit</Tag>}
                  <Tag color={sc.bg} text={sc.text}>{d.futureScope}</Tag>
                </div>
                <p style={{ color: C.mutedLight, fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{d.description}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {d.topRoles?.map(r => <Tag key={r} color={C.border} text={C.mutedLight}>{r}</Tag>)}
                </div>
              </div>
              <span style={{ color: C.amber, fontSize: 20, paddingTop: 4 }}>›</span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── ROLES ──────────────────────────────────────────────────────────────────
function Roles({ domain, roles, skillGap, onSelect, onBack }) {
  const lvlColor = { Entry: { bg: C.tealDim + "30", text: C.teal }, Mid: { bg: C.amber + "22", text: C.amber }, Senior: { bg: C.purple + "22", text: C.purple } };

  return (
    <div className="fi" style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <Back onClick={onBack} label="Back to Domains" />
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 34 }}>{domain.emoji}</span>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24 }}>{domain.name}</h2>
      </div>
      <p style={{ color: C.mutedLight, fontSize: 14, marginBottom: 28 }}>Real job roles in India — select one to generate your personalized roadmap</p>

      {skillGap && (
        <Card style={{ marginBottom: 24 }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>📊 Your Skill Gap Analysis</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <p style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>You Already Have ✓</p>
              {skillGap.have?.length > 0 ? skillGap.have.map(s => (
                <div key={s} style={{ fontSize: 13, color: C.teal, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: C.tealDim }}>✓</span> {s}
                </div>
              )) : <p style={{ fontSize: 12, color: C.muted }}>Skills will build from scratch</p>}
            </div>
            <div>
              <p style={{ fontSize: 11, color: C.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Skills to Learn</p>
              {skillGap.missing?.map(s => (
                <div key={s} style={{ fontSize: 13, color: C.amber, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>+</span> {s}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {roles.map(role => {
          const lc = lvlColor[role.level] || lvlColor.Entry;
          return (
            <Card key={role.title} onClick={() => onSelect(role)} style={{ cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15 }}>{role.title}</span>
                  <Tag color={lc.bg} text={lc.text}>{role.level}</Tag>
                </div>
                <span style={{ color: C.amber, fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{role.salary}</span>
              </div>
              <p style={{ color: C.mutedLight, fontSize: 13, marginBottom: 10, lineHeight: 1.6 }}>{role.description}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {role.tools?.slice(0, 5).map(t => <Tag key={t} color={C.border} text={C.mutedLight}>{t}</Tag>)}
              </div>
              <p style={{ fontSize: 11, color: C.muted }}>🏢 {role.companies?.join("  ·  ")}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── ROADMAP ────────────────────────────────────────────────────────────────
function Roadmap({ role, roadmap, onBack, onTrack }) {
  const diffColor = { Easy: C.teal, Medium: C.amber, Hard: C.danger };

  return (
    <div className="fi" style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px" }}>
      <Back onClick={onBack} label="Back to Roles" />
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, marginBottom: 10 }}>Roadmap: {role.title}</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <Tag>⏱ {roadmap.timeline}</Tag>
        <Tag color={diffColor[roadmap.difficulty] + "22"} text={diffColor[roadmap.difficulty]}>
          {roadmap.difficulty} Difficulty
        </Tag>
        <Tag color={C.tealDim + "33"} text={C.teal}>📈 {roadmap.demandLevel} Demand in India</Tag>
      </div>

      <Card style={{ marginBottom: 24, borderColor: C.amber + "40", background: C.amber + "08" }}>
        <p style={{ fontWeight: 700, fontSize: 13, color: C.amber, marginBottom: 8 }}>⚡ Reality Check</p>
        <p style={{ fontSize: 13, color: C.mutedLight, lineHeight: 1.7 }}>{roadmap.realityCheck}</p>
      </Card>

      <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 16, marginBottom: 20 }}>Step-by-Step Roadmap</h3>
      <div style={{ marginBottom: 28 }}>
        {roadmap.steps?.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.amber, color: "#080E1A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 13 }}>{i + 1}</div>
              {i < roadmap.steps.length - 1 && <div style={{ width: 1, flex: 1, background: C.border, margin: "6px 0" }} />}
            </div>
            <Card style={{ flex: 1, marginBottom: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{step.title}</span>
                <Tag color={C.border} text={C.mutedLight}>{step.duration}</Tag>
              </div>
              <p style={{ fontSize: 13, color: C.mutedLight, marginBottom: 10, lineHeight: 1.6 }}>{step.description}</p>
              {step.skills && (
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                  {step.skills.map(s => <Tag key={s} color={C.tealDim + "22"} text={C.teal}>{s}</Tag>)}
                </div>
              )}
              {step.resources && (
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {step.resources.map(r => <Tag key={r} color={C.purple + "18"} text={C.purple}>{r}</Tag>)}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>

      {roadmap.certifications && (
        <Card style={{ marginBottom: 28 }}>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>🏆 Recommended Certifications</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {roadmap.certifications.map(c => (
              <div key={c} style={{ fontSize: 13, color: C.mutedLight, display: "flex", gap: 8 }}>
                <span style={{ color: C.amber }}>◆</span> {c}
              </div>
            ))}
          </div>
        </Card>
      )}

      <Btn onClick={onTrack} full style={{ padding: 14, fontSize: 15, borderRadius: 12 }}>
        📋 Open Progress Tracker
      </Btn>
    </div>
  );
}

// ─── TRACKER ────────────────────────────────────────────────────────────────
function Tracker({ roadmap, role, checkedSkills, setCheckedSkills, onBack }) {
  const allItems = roadmap.steps?.flatMap((s, si) => (s.skills || [s.title]).map(sk => `${si}::${sk}`)) || [];
  const checkedCount = allItems.filter(k => checkedSkills[k]).length;
  const pct = allItems.length ? Math.round((checkedCount / allItems.length) * 100) : 0;

  return (
    <div className="fi" style={{ maxWidth: 660, margin: "0 auto", padding: "40px 24px" }}>
      <Back onClick={onBack} label="Back to Roadmap" />
      <h2 style={{ fontFamily: "'Sora',sans-serif", fontSize: 26, marginBottom: 6 }}>Progress Tracker</h2>
      <p style={{ color: C.mutedLight, fontSize: 14, marginBottom: 28 }}>Your journey to becoming a <strong style={{ color: C.amber }}>{role.title}</strong></p>

      <Card style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontWeight: 600 }}>Overall Progress</span>
          <span style={{ fontFamily: "'Sora',sans-serif", fontSize: 24, fontWeight: 700, color: C.amber }}>{pct}%</span>
        </div>
        <div style={{ background: C.border, borderRadius: 8, height: 10, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(90deg, ${C.amber}, ${C.amberLight})`, borderRadius: 8, height: 10, width: `${pct}%`, transition: "width .6s ease" }} />
        </div>
        <p style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>
          {checkedCount} of {allItems.length} milestones completed
          {pct === 100 ? " 🎉 Roadmap Complete!" : ""}
        </p>
      </Card>

      {roadmap.steps?.map((step, si) => (
        <Card key={si} style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ fontWeight: 600, fontSize: 14 }}>Phase {si + 1}: {step.title}</p>
            <Tag color={C.border} text={C.mutedLight}>{step.duration}</Tag>
          </div>
          {(step.skills || [step.title]).map(skill => {
            const key = `${si}::${skill}`;
            return (
              <label key={skill} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer" }}>
                <input type="checkbox" checked={!!checkedSkills[key]}
                  onChange={e => setCheckedSkills(prev => ({ ...prev, [key]: e.target.checked }))} />
                <span style={{ fontSize: 13, textDecoration: checkedSkills[key] ? "line-through" : "none", color: checkedSkills[key] ? C.muted : C.text, transition: "color .2s" }}>
                  {skill}
                </span>
                {checkedSkills[key] && <span style={{ color: C.teal, fontSize: 12 }}>✓</span>}
              </label>
            );
          })}
        </Card>
      ))}
    </div>
  );
}

// ─── MENTOR CHAT ────────────────────────────────────────────────────────────
function MentorChat({ open, onClose, profile, selectedDomain, selectedRole }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  async function send() {
    if (!input.trim() || thinking) return;
    const q = input.trim();
    setInput("");
    setMsgs(m => [...m, { role: "user", text: q }]);
    setThinking(true);
    try {
      const ctx = `User profile: ${profile.education}, interests: ${profile.interests.join(", ")}, skills: ${profile.skills.join(", ") || "beginner"}. Current domain: ${selectedDomain?.name || "not selected"}. Role: ${selectedRole?.title || "not selected"}.`;
      const d = await ai(
        `You are a friendly Indian career mentor. Give practical, honest, India-specific advice. Keep responses to 3-4 sentences max. Context: ${ctx}`,
        q
      );
      setMsgs(m => [...m, { role: "ai", text: typeof d === "string" ? d : JSON.stringify(d) }]);
    } catch (e) {
      setMsgs(m => [...m, { role: "ai", text: "Unable to connect right now. Please try again in a moment." }]);
    }
    setThinking(false);
  }

  if (!open) return null;
  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, width: 320, height: 420, background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px 14px 0 0", zIndex: 300, display: "flex", flexDirection: "column", boxShadow: `0 -8px 32px #00000060` }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14 }}>🤖 AI Mentor</span>
          <span style={{ fontSize: 10, color: C.teal, marginLeft: 8 }}>India Career Expert</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>✕</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.length === 0 && (
          <div style={{ color: C.muted, fontSize: 12, textAlign: "center", marginTop: 20, lineHeight: 1.8 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💬</div>
            Ask me anything about careers in India!<br />
            <span style={{ color: C.muted + "88", fontSize: 11 }}>"Should I switch to tech?" · "Is MBA worth it?" · "Best certifications for Data Science?"</span>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "82%", background: m.role === "user" ? C.amber : C.surface2, color: m.role === "user" ? "#080E1A" : C.text, padding: "8px 12px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", fontSize: 13, lineHeight: 1.6 }}>
              {m.text}
            </div>
          </div>
        ))}
        {thinking && <div className="pulse" style={{ color: C.amber, fontSize: 12 }}>Mentor is thinking...</div>}
      </div>
      <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(); }}
          placeholder="Ask your mentor..." style={{ flex: 1, padding: "8px 12px", fontSize: 13 }} />
        <Btn onClick={send} style={{ padding: "8px 14px" }}>→</Btn>
      </div>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar({ screen, screenIdx, mentorOpen, setMentorOpen }) {
  if (screen === "landing") return null;
  const steps = ["Profile", "Analyze", "Domains", "Roles", "Roadmap", "Tracker"];
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: C.bg + "F0", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.border}`, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 15, color: C.amber }}>🧭 AI Career Navigator</span>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 4 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: 20, height: 4, borderRadius: 2, background: i < screenIdx ? C.amber : i === screenIdx ? C.amber + "60" : C.border, transition: "background .3s" }} />
          ))}
        </div>
        <button onClick={() => setMentorOpen(o => !o)}
          style={{ background: mentorOpen ? C.amber : "transparent", color: mentorOpen ? "#080E1A" : C.amber, border: `1px solid ${C.amber}50`, borderRadius: 20, padding: "5px 14px", cursor: "pointer", fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 12, marginLeft: 8 }}>
          🤖 Mentor
        </button>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function CareerNavigator() {
  const [screen, setScreen] = useState("landing");
  const [profile, setProfile] = useState({ name: "", interests: [], skills: [], education: "undergraduate" });
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [checkedSkills, setCheckedSkills] = useState({});
  const [loading, setLoading] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);

  const screenOrder = ["landing", "profiling", "analyzing", "domains", "roles", "roadmap", "tracker"];
  const screenIdx = screenOrder.indexOf(screen);

  async function analyzeProfile() {
    setLoading(true);
    setScreen("analyzing");
    try {
      const data = await ai(
        "You are an Indian career counselor AI. Respond ONLY with valid JSON. No markdown, no preamble.",
        `Analyze this student and suggest career paths in India.
Profile:
- Education: ${profile.education}
- Interests: ${profile.interests.join(", ") || "not specified"}
- Skills: ${profile.skills.join(", ") || "none/beginner"}

Return this JSON:
{"domains":[{"name":"Career Domain","emoji":"emoji","description":"2 sentences why this fits + what it is","futureScope":"High Demand|Growing|Stable|Competitive","topRoles":["Role1","Role2","Role3"]}]}

Return exactly 4 domains best-matched to this profile. Make them specific and realistic for India. Include a mix if interests are broad.`
      );
      setDomains(data.domains);
    } catch (_) {
      setDomains([
        { name: "Data Science & Analytics", emoji: "📊", description: "One of India's fastest-growing fields with massive demand across tech, fintech, and startups. Analytical thinkers with problem-solving interest thrive here.", futureScope: "High Demand", topRoles: ["Data Analyst", "Data Scientist", "ML Engineer"] },
        { name: "Software Development", emoji: "💻", description: "The backbone of India's ₹200B+ IT industry. Vast opportunities from product startups to MNCs across every city.", futureScope: "High Demand", topRoles: ["Frontend Developer", "Backend Engineer", "Full Stack Dev"] },
        { name: "Cybersecurity", emoji: "🔐", description: "Critical shortage of 1M+ professionals in India by 2025. High salaries and rapid career growth in a field that touches every sector.", futureScope: "High Demand", topRoles: ["SOC Analyst", "Security Engineer", "Penetration Tester"] },
        { name: "Product Management", emoji: "🎯", description: "The bridge between tech and business — Product Managers are among India's highest-paid professionals. Exceptional growth in startup ecosystem.", futureScope: "Growing", topRoles: ["Associate PM", "Product Manager", "Senior PM"] }
      ]);
    }
    setScreen("domains");
    setLoading(false);
  }

  async function loadRoles(domain) {
    setSelectedDomain(domain);
    setScreen("analyzing");
    try {
      const data = await ai(
        "You are an Indian career counselor AI. Respond ONLY with valid JSON.",
        `Give real job roles for "${domain.name}" in India for: education=${profile.education}, skills=${profile.skills.join(", ") || "beginner"}.

Return JSON:
{"roles":[{"title":"Exact job title","level":"Entry|Mid|Senior","description":"Day-to-day in 1 sentence","salary":"₹X–Y LPA","tools":["Tool1","Tool2","Tool3"],"companies":["Indian/MNC company1","company2","company3"]}],"skillGap":{"have":["relevant existing skills"],"missing":["top 5 missing skills in priority order"]}}

Return 5 roles from Entry to Senior. Companies = real companies hiring in India (e.g. TCS, Flipkart, Paytm, Razorpay, Google India). Salaries = realistic 2025 India market rates.`
      );
      setRoles(data.roles);
      setSkillGap(data.skillGap);
    } catch (_) {
      setRoles([
        { title: `Junior ${domain.name} Analyst`, level: "Entry", description: "Analyze and report on domain-specific data for business decisions.", salary: "₹3.5–6 LPA", tools: ["Excel", "SQL", "Python"], companies: ["TCS", "Infosys", "Wipro"] },
        { title: `${domain.name} Associate`, level: "Entry", description: "Support senior team members and manage day-to-day domain operations.", salary: "₹5–8 LPA", tools: ["Relevant Tool", "MS Office", "Communication"], companies: ["Accenture", "Cognizant", "HCL"] },
        { title: `${domain.name} Engineer`, level: "Mid", description: "Design and build scalable solutions for the domain.", salary: "₹8–16 LPA", tools: ["Python", "Cloud", "Git"], companies: ["Flipkart", "Swiggy", "Razorpay"] },
        { title: `Senior ${domain.name} Lead`, level: "Mid", description: "Lead projects and mentor junior team members.", salary: "₹15–22 LPA", tools: ["Leadership", "Architecture"], companies: ["Amazon", "Microsoft", "Zomato"] },
        { title: `${domain.name} Manager`, level: "Senior", description: "Own strategy and deliver business outcomes for the domain.", salary: "₹22–40 LPA", tools: ["Strategy", "People Mgmt"], companies: ["Google", "Meta", "Goldman Sachs"] }
      ]);
      setSkillGap({ have: profile.skills.slice(0, 3), missing: ["Domain expertise", "SQL/Python", "Communication", "Project Management", "Cloud basics"] });
    }
    setScreen("roles");
  }

  async function loadRoadmap(role) {
    setSelectedRole(role);
    setScreen("analyzing");
    try {
      const data = await ai(
        "You are an Indian career mentor AI. Respond ONLY with valid JSON.",
        `Create a career roadmap for "${role.title}" in India.
Candidate: education=${profile.education}, skills=${profile.skills.join(", ") || "beginner"}.

Return JSON:
{"timeline":"X months","difficulty":"Easy|Medium|Hard","demandLevel":"High|Medium|Low","realityCheck":"2 honest sentences about competition and what it actually takes in India","steps":[{"title":"Phase name","duration":"X weeks/months","description":"What to focus on","skills":["Skill1","Skill2","Skill3"],"resources":["Platform/resource1","resource2"]}],"certifications":["Cert1","Cert2","Cert3"]}

Return 4-5 phases. Resources must be affordable/free options popular in India: NPTEL, Coursera, YouTube, GeeksforGeeks, LeetCode, Internshala, etc.`
      );
      setRoadmap(data);
    } catch (_) {
      setRoadmap({
        timeline: "8–12 months", difficulty: "Medium", demandLevel: "High",
        realityCheck: "This is a competitive field in India — thousands apply for the same roles at top companies. Consistent daily practice, a strong GitHub portfolio, and networking on LinkedIn are what separate candidates who get hired from those who don't.",
        steps: [
          { title: "Foundation Building", duration: "6 weeks", description: "Build core knowledge and set up your learning environment.", skills: ["Core Concepts", "Basic Tools", "Industry Overview"], resources: ["YouTube", "NPTEL Free Courses", "GeeksforGeeks"] },
          { title: "Core Skill Development", duration: "10 weeks", description: "Deep-dive into primary technical skills required for the role.", skills: ["Primary Technical Skill", "Secondary Skill", "Best Practices"], resources: ["Coursera (audit free)", "Official Docs", "Udemy"] },
          { title: "Project Portfolio", duration: "8 weeks", description: "Build 2–3 real projects and push them to GitHub.", skills: ["Project 1", "Project 2", "Version Control"], resources: ["GitHub", "Kaggle", "Internshala Projects"] },
          { title: "Job Market Preparation", duration: "4 weeks", description: "Resume, LinkedIn, mock interviews, and applications.", skills: ["Resume Writing", "DSA/Aptitude", "Communication"], resources: ["LeetCode", "LinkedIn", "Glassdoor Interview Prep"] }
        ],
        certifications: ["Google Career Certificate (relevant domain)", "AWS Cloud Practitioner", "Industry-specific certification via Coursera/NPTEL"]
      });
    }
    setScreen("roadmap");
  }

  return (
    <>
      <style>{css}</style>
      <Navbar screen={screen} screenIdx={Math.max(0, screenIdx - 1)} mentorOpen={mentorOpen} setMentorOpen={setMentorOpen} />
      <MentorChat open={mentorOpen} onClose={() => setMentorOpen(false)} profile={profile} selectedDomain={selectedDomain} selectedRole={selectedRole} />

      <div style={{ paddingTop: screen === "landing" ? 0 : 56 }}>
        {screen === "landing" && <Landing onStart={() => setScreen("profiling")} />}
        {screen === "profiling" && <Profiling profile={profile} setProfile={setProfile} onAnalyze={analyzeProfile} loading={loading} />}
        {screen === "analyzing" && <Analyzing />}
        {screen === "domains" && <Domains domains={domains} profile={profile} onSelect={loadRoles} onBack={() => setScreen("profiling")} />}
        {screen === "roles" && <Roles domain={selectedDomain} roles={roles} skillGap={skillGap} onSelect={loadRoadmap} onBack={() => setScreen("domains")} />}
        {screen === "roadmap" && <Roadmap role={selectedRole} roadmap={roadmap} onBack={() => setScreen("roles")} onTrack={() => setScreen("tracker")} />}
        {screen === "tracker" && <Tracker roadmap={roadmap} role={selectedRole} checkedSkills={checkedSkills} setCheckedSkills={setCheckedSkills} onBack={() => setScreen("roadmap")} />}
      </div>
    </>
  );
}
