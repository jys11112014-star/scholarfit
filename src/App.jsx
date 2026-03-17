import { useState } from "react";

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0f1117;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100vh;
    background: #0f1117;
    background-image:
      radial-gradient(ellipse at 20% 10%, rgba(64, 100, 200, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, rgba(100, 60, 180, 0.08) 0%, transparent 50%);
  }

  .header {
    border-bottom: 1px solid rgba(255,255,255,0.07);
    padding: 24px 40px;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255,255,255,0.02);
    backdrop-filter: blur(10px);
  }

  .header-icon {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, #64748b, #475569);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }

  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: -0.3px;
    background: linear-gradient(135deg, #f8fafc, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header-sub {
    font-size: 12px;
    color: #6b7280;
    margin-left: auto;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.5px;
  }

  .main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 24px;
  }

  .hero {
    text-align: center;
    margin-bottom: 48px;
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 12px;
    background: linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero p {
    color: #6b7280;
    font-size: 15px;
    line-height: 1.6;
  }

  .input-section {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 28px;
    margin-bottom: 40px;
  }

  .input-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #6b7280;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .input-label::before {
    content: '';
    width: 16px; height: 1px;
    background: #64748b;
  }

  textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    line-height: 1.7;
    padding: 16px;
    resize: vertical;
    min-height: 160px;
    transition: border-color 0.2s;
    outline: none;
  }

  textarea:focus {
    border-color: rgba(100, 116, 139, 0.5);
    background: rgba(255,255,255,0.05);
  }

  textarea::placeholder { color: #4b5563; }

  .controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .word-count {
    font-size: 12px;
    color: #4b5563;
    font-family: 'DM Mono', monospace;
  }

  .btn-analyze {
    background: linear-gradient(135deg, #64748b, #475569);
    border: none;
    border-radius: 10px;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: opacity 0.2s, transform 0.1s;
    letter-spacing: 0.2px;
  }

  .btn-analyze:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-analyze:active { transform: translateY(0); }
  .btn-analyze:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .loading {
    text-align: center;
    padding: 80px 20px;
  }

  .loading-spinner {
    width: 48px; height: 48px;
    border: 3px solid rgba(100, 116, 139, 0.2);
    border-top-color: #64748b;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
    margin: 0 auto 20px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading p { color: #6b7280; font-size: 14px; }
  .loading strong { color: #a5b4fc; display: block; margin-bottom: 6px; font-size: 16px; }

  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    flex-wrap: wrap;
    gap: 12px;
  }

  .results-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    color: #e8eaf0;
  }

  .results-meta {
    font-size: 12px;
    color: #4b5563;
    font-family: 'DM Mono', monospace;
  }

  .journal-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    margin-bottom: 20px;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .journal-card:hover { border-color: rgba(100, 116, 139, 0.3); }

  .card-header {
    padding: 20px 24px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    cursor: pointer;
    user-select: none;
  }

  .rank-badge {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    font-weight: 700;
    flex-shrink: 0;
  }

  .rank-1 { background: rgba(255, 195, 0, 0.15); color: #ffc300; border: 1px solid rgba(255,195,0,0.3); }
  .rank-2 { background: rgba(192, 192, 192, 0.1); color: #c0c0c0; border: 1px solid rgba(192,192,192,0.3); }
  .rank-3 { background: rgba(205, 127, 50, 0.1); color: #cd7f32; border: 1px solid rgba(205,127,50,0.3); }
  .rank-other { background: rgba(100, 116, 139, 0.1); color: #64748b; border: 1px solid rgba(100,116,139,0.2); }

  .card-title-area { flex: 1; min-width: 0; }

  .journal-name {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: #e8eaf0;
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .card-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .badge {
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.3px;
  }

  .badge-q1 { background: rgba(100, 116, 139, 0.15); color: #64748b; border: 1px solid rgba(100,116,139,0.3); }
  .badge-q2 { background: rgba(59, 130, 246, 0.15); color: #94a3b8; border: 1px solid rgba(59,130,246,0.3); }
  .badge-q3 { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
  .badge-q4 { background: rgba(239, 68, 68, 0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
  .badge-oa { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168,85,247,0.3); }
  .badge-hybrid { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99,102,241,0.3); }
  .badge-sub { background: rgba(107, 114, 128, 0.15); color: #9ca3af; border: 1px solid rgba(107,114,128,0.3); }
  .badge-index { background: rgba(20, 184, 166, 0.12); color: #2dd4bf; border: 1px solid rgba(20,184,166,0.25); }

  .card-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .if-display {
    text-align: right;
  }

  .if-value {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #a5b4fc;
    line-height: 1;
  }

  .if-label {
    font-size: 10px;
    color: #4b5563;
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.5px;
    margin-top: 3px;
  }

  .expand-btn {
    width: 28px; height: 28px;
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #6b7280;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .expand-btn.open { background: rgba(100,116,139,0.1); border-color: rgba(100,116,139,0.3); color: #64748b; }

  .card-body {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 640px) {
    .card-body { grid-template-columns: 1fr; }
    .card-header { flex-wrap: wrap; }
    .card-right { flex-wrap: wrap; }
    .hero h1 { font-size: 28px; }
  }

  .card-body-full {
    grid-column: 1 / -1;
  }

  .info-block {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 14px 16px;
  }

  .info-block-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #4b5563;
    margin-bottom: 8px;
    font-family: 'DM Mono', monospace;
  }

  .info-block-value {
    font-size: 14px;
    color: #d1d5db;
    line-height: 1.5;
  }

  .info-block-value a {
    color: #94a3b8;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    transition: color 0.15s;
  }

  .info-block-value a:hover { color: #93c5fd; }

  .fit-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .fit-item {
    display: flex;
    gap: 10px;
    font-size: 13px;
    color: #d1d5db;
    line-height: 1.5;
  }

  .fit-bullet {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: linear-gradient(135deg, #64748b22, #47556922);
    border: 1px solid rgba(100,116,139,0.4);
    color: #64748b;
    font-size: 10px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
    font-family: 'DM Mono', monospace;
  }

  .waiver-check {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  .waiver-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 7px;
    color: #e8eaf0;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    padding: 7px 12px;
    outline: none;
    transition: border-color 0.2s;
  }

  .waiver-input:focus { border-color: rgba(100,116,139,0.5); }
  .waiver-input::placeholder { color: #374151; }

  .btn-waiver {
    background: rgba(100,116,139,0.15);
    border: 1px solid rgba(100,116,139,0.3);
    border-radius: 7px;
    color: #64748b;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 7px 12px;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.15s;
  }

  .btn-waiver:hover { background: rgba(100,116,139,0.25); }

  .waiver-result {
    margin-top: 8px;
    padding: 8px 12px;
    border-radius: 7px;
    font-size: 12px;
    line-height: 1.5;
  }

  .waiver-yes { background: rgba(100,116,139,0.1); border: 1px solid rgba(100,116,139,0.3); color: #64748b; }
  .waiver-no { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #f87171; }
  .waiver-check-loading { background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3); color: #fbbf24; }

  .links-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .link-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.15s;
    cursor: pointer;
    border: none;
  }

  .link-btn-primary {
    background: rgba(100,116,139,0.15);
    border: 1px solid rgba(100,116,139,0.3);
    color: #94a3b8;
  }

  .link-btn-primary:hover { background: rgba(100,116,139,0.25); }

  .link-btn-secondary {
    background: rgba(139,92,246,0.15);
    border: 1px solid rgba(139,92,246,0.3);
    color: #c084fc;
  }

  .link-btn-secondary:hover { background: rgba(139,92,246,0.25); }

  .error-box {
    background: rgba(239,68,68,0.08);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 10px;
    padding: 16px 20px;
    color: #fca5a5;
    font-size: 14px;
    text-align: center;
  }

  .disclaimer {
    margin-top: 32px;
    padding: 14px 18px;
    background: rgba(245,158,11,0.06);
    border: 1px solid rgba(245,158,11,0.15);
    border-radius: 10px;
    font-size: 12px;
    color: #92400e;
    color: #d97706;
    line-height: 1.6;
  }

  .disclaimer strong { color: #fbbf24; }
`;

const PENN_LOGO = "data:image/webp;base64,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";

const SYSTEM_PROMPT = `You are an expert academic publishing advisor. Given a research abstract, recommend exactly 6 journals and return ONLY a valid JSON array with no extra text, no markdown, no backticks.

Each journal object must have these exact keys:
{
  "rank": number (1-6),
  "name": string (full journal name),
  "publisher": string,
  "quartile": "Q1" | "Q2" | "Q3" | "Q4",
  "impactFactor3yr": number (3-year average impact factor, realistic value),
  "oaType": one of exactly: "Full OA" | "Hybrid" | "Subscription",
  "oaNote": string with one precise sentence: for Full OA write "Fully open access — all articles freely available. APC required."; for Hybrid write "Subscription journal with Open Access option. Pay APC at submission to make your article freely available; otherwise publishing is free."; for Subscription write "Subscription-only journal. No open access option. No APC — publishing is free.",
  "apcAmount": string or null — APC cost if oaType is Full OA (e.g. "$3,200 USD") or if oaType is Hybrid include both like "OA option: $3,900 USD" — set null if Subscription,
  "reviewType": string (e.g. "Double-blind peer review"),
  "acceptanceRate": string (e.g. "~18%" or "~25-30%"),
  "submissionToDecision": string (e.g. "4-6 weeks" or "8-12 weeks"),
  "wordLimits": string (describe limits by article type),
  "indexing": string (comma-separated, e.g. "Scopus, Web of Science, PubMed"),
  "fitReasons": array of exactly 5 strings (specific reasons why this journal fits the abstract),
  "waiverInfo": string (brief info about APC waiver/discount programs),
  "specialIssue": string or null,
  "homepageUrl": string (realistic journal homepage URL),
  "submissionUrl": string (realistic submission system URL),
  "scope": string (1 sentence about journal scope)
}

Be specific and accurate. Use realistic values based on your knowledge.`;

export default function JournalRecommender() {
  const [apiKey, setApiKey] = useState("");
  const [apiKeyStored, setApiKeyStored] = useState(false);
  const [abstract, setAbstract] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [waiverInputs, setWaiverInputs] = useState({});
  const [waiverResults, setWaiverResults] = useState({});
  const [waiverLoading, setWaiverLoading] = useState({});

  const wordCount = abstract.trim() ? abstract.trim().split(/\s+/).length : 0;

  const toggleExpand = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const analyze = async () => {
    if (!abstract.trim() || !apiKeyStored) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setExpanded({});

    try {
      const resp = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abstract, apiKey })
      });

      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "API error");
      const cleaned = data.text.replace(/```json|```/g, "").trim();
      const journals = JSON.parse(cleaned);
      setResults(journals);
      // Auto-expand first result
      setExpanded({ 0: true });
    } catch (e) {
      setError("Analysis failed. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkWaiver = async (journalIdx, journalName, waiverInfo) => {
    const institution = waiverInputs[journalIdx] || "";
    if (!institution.trim()) return;

    setWaiverLoading(prev => ({ ...prev, [journalIdx]: true }));
    setWaiverResults(prev => ({ ...prev, [journalIdx]: null }));

    try {
      const resp = await fetch("/api/waiver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journalName, institution, waiverInfo, apiKey })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || "API error");
      setWaiverResults(prev => ({ ...prev, [journalIdx]: data.text }));
    } catch {
      setWaiverResults(prev => ({ ...prev, [journalIdx]: "Could not retrieve waiver information." }));
    } finally {
      setWaiverLoading(prev => ({ ...prev, [journalIdx]: false }));
    }
  };

  const getQuartileBadge = (q) => {
    const map = { Q1: "badge-q1", Q2: "badge-q2", Q3: "badge-q3", Q4: "badge-q4" };
    return map[q] || "badge-q4";
  };

  const getOABadge = (oa) => {
    if (oa === "Full OA") return "badge-oa";
    if (oa === "Hybrid") return "badge-hybrid";
    return "badge-sub";
  };
  const getOALabel = (oa) => {
    if (oa === "Full OA") return "🔓 Full OA";
    if (oa === "Hybrid") return "🔀 Hybrid";
    return "🔒 Subscription";
  };

  const getRankClass = (rank) => {
    const map = { 1: "rank-1", 2: "rank-2", 3: "rank-3" };
    return map[rank] || "rank-other";
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">

        <>
        <header className="header">
          <div style={{ background:'white', borderRadius:'6px', padding:'3px 8px', display:'flex', alignItems:'center', height:'44px', flexShrink:0 }}>
            <img src={PENN_LOGO} alt="University of Pennsylvania" style={{ height:'32px', width:'auto', objectFit:'contain' }} />
          </div>
          <div style={{ width:'1px', height:'28px', background:'rgba(255,255,255,0.1)', margin:'0 8px', flexShrink:0 }} />
          <span className="header-title">ScholarFit</span>

        </header>

        <main className="main">
          <div className="hero">
            <h1>Find Your Perfect Journal</h1>
            <p>Paste your abstract below to receive AI-powered journal recommendations<br />with detailed fit analysis and publishing metrics.</p>
          </div>

                    {/* API Key Section */}
          {!apiKeyStored ? (
            <div className="input-section" style={{ marginBottom:'20px' }}>
              <div className="input-label">🔑 Anthropic API Key</div>
              <div style={{ fontSize:'13px', color:'#6b7280', marginBottom:'14px', lineHeight:'1.7' }}>
                Enter your own API key — usage is charged to <strong style={{color:'#94a3b8'}}>your account only</strong>, not shared with anyone.
                Get a free key at{' '}
                <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer"
                  style={{ color:'#94a3b8', textDecoration:'underline' }}>console.anthropic.com</a>
                {' '}(includes $5 free credit — ~500 searches).
              </div>
              <div style={{ display:'flex', gap:'10px' }}>
                <input
                  type="password"
                  placeholder="sk-ant-api03-..."
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && apiKey.trim() && setApiKeyStored(true)}
                  style={{ flex:1, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'8px', color:'#e8eaf0', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', padding:'10px 14px', outline:'none' }}
                />
                <button
                  onClick={() => setApiKeyStored(true)}
                  disabled={!apiKey.startsWith('sk-ant-')}
                  style={{ background:'linear-gradient(135deg,#334155,#475569)', border:'none', borderRadius:'8px', color:'white', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:600, padding:'10px 20px', cursor: apiKey.startsWith('sk-ant-') ? 'pointer' : 'not-allowed', opacity: apiKey.startsWith('sk-ant-') ? 1 : 0.5, whiteSpace:'nowrap' }}
                >
                  Save →
                </button>
              </div>
              <div style={{ marginTop:'10px', fontSize:'11px', color:'#4b5563' }}>
                🔒 Key is stored only in this browser session. Never saved or shared.
              </div>
            </div>
          ) : (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', padding:'10px 16px', background:'rgba(100,116,139,0.08)', border:'1px solid rgba(100,116,139,0.2)', borderRadius:'10px' }}>
              <span style={{ fontSize:'13px', color:'#6b7280' }}>
                🔑 API key active — <span style={{ fontFamily:'monospace', color:'#94a3b8' }}>{apiKey.slice(0,14)}...</span>
              </span>
              <button onClick={() => { setApiKeyStored(false); setApiKey(""); }}
                style={{ fontSize:'11px', color:'#4b5563', background:'none', border:'none', cursor:'pointer', textDecoration:'underline' }}>
                Change
              </button>
            </div>
          )}

          <div className="input-section">
            <div className="input-label">Research Abstract</div>
            <textarea
              placeholder="Paste your abstract here... (recommended: 150–300 words for best results)"
              value={abstract}
              onChange={e => setAbstract(e.target.value)}
            />
            <div className="controls">
              <span className="word-count">{wordCount} words</span>
              <button className="btn-analyze" onClick={analyze} disabled={loading || !abstract.trim() || !apiKeyStored}>
                {loading ? "Analyzing..." : "→ Find Journals"}
              </button>
            </div>
          </div>

          {loading && (
            <div className="loading">
              <div className="loading-spinner" />
              <strong>Analyzing your research...</strong>
              <p>Matching to thousands of journals across all disciplines</p>
            </div>
          )}

          {error && <div className="error-box">⚠ {error}</div>}

          {results && (
            <>
              <div className="results-header">
                <div className="results-title">Recommended Journals</div>
                <div className="results-meta">{results.length} results · ranked by fit</div>
              </div>

              {results.map((j, idx) => (
                <div className="journal-card" key={idx}>
                  <div className="card-header" onClick={() => toggleExpand(idx)}>
                    <div className={`rank-badge ${getRankClass(j.rank)}`}>{j.rank}</div>
                    <div className="card-title-area">
                      <div className="journal-name">{j.name}</div>
                      <div className="card-badges">
                        <span className={`badge ${getQuartileBadge(j.quartile)}`}>{j.quartile}</span>
                        <span className={`badge ${getOABadge(j.oaType)}`}>{getOALabel(j.oaType)}</span>
                        {j.publisher && <span className="badge badge-sub" style={{ fontSize: '10px' }}>{j.publisher}</span>}
                        {j.indexing && j.indexing.split(",").slice(0, 2).map((idx2, i) => (
                          <span key={i} className="badge badge-index">{idx2.trim()}</span>
                        ))}
                      </div>
                    </div>
                    <div className="card-right">
                      <div className="if-display">
                        <div className="if-value">{j.impactFactor3yr}</div>
                        <div className="if-label">3-YR IF</div>
                      </div>
                      <div className={`expand-btn ${expanded[idx] ? 'open' : ''}`}>
                        {expanded[idx] ? '▲' : '▼'}
                      </div>
                    </div>
                  </div>

                  {expanded[idx] && (
                    <div className="card-body">

                      {/* Fit Reasons */}
                      <div className="info-block card-body-full">
                        <div className="info-block-label">✦ Why This Journal Fits Your Research</div>
                        <ul className="fit-list">
                          {j.fitReasons?.map((r, i) => (
                            <li className="fit-item" key={i}>
                              <span className="fit-bullet">{i + 1}</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Scope */}
                      <div className="info-block card-body-full">
                        <div className="info-block-label">Journal Scope</div>
                        <div className="info-block-value">{j.scope}</div>
                      </div>

                      {/* OA + APC block */}
                      <div className="info-block card-body-full" style={{ borderColor: j.oaType === "Full OA" ? "rgba(192,132,252,0.25)" : j.oaType === "Hybrid" ? "rgba(129,140,248,0.25)" : "rgba(107,114,128,0.2)" }}>
                        <div className="info-block-label">🔓 Open Access & Publishing Cost</div>
                        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
                          <div>
                            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                              <span className={`badge ${getOABadge(j.oaType)}`} style={{ fontSize:"12px", padding:"3px 10px" }}>{getOALabel(j.oaType)}</span>
                            </div>
                            <div style={{ fontSize:"13px", color:"#94a3b8", lineHeight:1.55 }}>{j.oaNote}</div>
                          </div>
                          <div style={{ textAlign:"right", flexShrink:0 }}>
                            {j.apcAmount ? (
                              <>
                                <div style={{ fontSize:"11px", color:"#4b5563", fontFamily:"monospace", marginBottom:3 }}>APC</div>
                                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"20px", fontWeight:700, color:"#e8eaf0", lineHeight:1 }}>{j.apcAmount}</div>
                              </>
                            ) : (
                              <div style={{ fontSize:"14px", color:"#64748b", fontWeight:600 }}>No APC</div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submission to Decision */}
                      <div className="info-block">
                        <div className="info-block-label">⏱ Submission → Decision</div>
                        <div className="info-block-value" style={{ fontSize: '16px', fontWeight: 600, color: '#e8eaf0' }}>{j.submissionToDecision}</div>
                      </div>

                      {/* Word Limits */}
                      <div className="info-block">
                        <div className="info-block-label">📝 Word Limits by Article Type</div>
                        <div className="info-block-value">{j.wordLimits}</div>
                      </div>

                      {/* Review & Acceptance */}
                      <div className="info-block">
                        <div className="info-block-label">🔍 Review Type & Acceptance Rate</div>
                        <div className="info-block-value">
                          <div>{j.reviewType}</div>
                          <div style={{ marginTop: '4px', color: '#9ca3af' }}>Acceptance rate: {j.acceptanceRate}</div>
                        </div>
                      </div>

                      {/* Indexing */}
                      <div className="info-block">
                        <div className="info-block-label">🗂 Indexing Databases</div>
                        <div className="info-block-value">{j.indexing}</div>
                      </div>

                      {/* Special Issue */}
                      {j.specialIssue ? (
                        <div className="info-block card-body-full" style={{ background: 'rgba(100,116,139,0.06)', border: '1px solid rgba(100,116,139,0.35)', borderLeft: '4px solid #64748b' }}>
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px', flexWrap:'wrap', gap:'8px' }}>
                            <div className="info-block-label" style={{ color: '#64748b', marginBottom:0 }}>🟢 Special Issue / Call for Papers</div>
                            <span style={{ fontSize:'10px', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.3)', color:'#f59e0b', borderRadius:'99px', padding:'2px 8px', fontFamily:'monospace' }}>⚠ AI-generated · Verify on journal site</span>
                          </div>
                          <div className="info-block-value" style={{ color:'#d1fae5' }}>{j.specialIssue}</div>
                        </div>
                      ) : (
                        <div className="info-block card-body-full" style={{ background: 'rgba(107,114,128,0.04)', borderColor: 'rgba(107,114,128,0.15)' }}>
                          <div className="info-block-label" style={{ color: '#4b5563' }}>⬜ Special Issue / Call for Papers</div>
                          <div className="info-block-value" style={{ color:'#4b5563', fontStyle:'italic' }}>No special issue identified for this journal at this time. Check the journal website for current calls.</div>
                        </div>
                      )}

                      {/* APC Waiver Check */}
                      <div className="info-block card-body-full">
                        <div className="info-block-label">🎓 APC Waiver / Institutional Discount Check</div>
                        <div className="info-block-value" style={{ marginBottom: '10px', color: '#9ca3af' }}>
                          <em>Known policy:</em> {j.waiverInfo}
                        </div>
                        <div className="waiver-check">
                          <input
                            className="waiver-input"
                            placeholder="Enter your institution or country (e.g. Seoul National University, Korea)"
                            value={waiverInputs[idx] || ""}
                            onChange={e => setWaiverInputs(prev => ({ ...prev, [idx]: e.target.value }))}
                            onKeyDown={e => e.key === 'Enter' && checkWaiver(idx, j.name, j.waiverInfo)}
                          />
                          <button
                            className="btn-waiver"
                            onClick={() => checkWaiver(idx, j.name, j.waiverInfo)}
                            disabled={waiverLoading[idx]}
                          >
                            {waiverLoading[idx] ? "Checking..." : "Check Eligibility"}
                          </button>
                        </div>
                        {waiverLoading[idx] && (
                          <div className="waiver-result waiver-check-loading">⏳ Checking waiver eligibility...</div>
                        )}
                        {waiverResults[idx] && (
                          <div className="waiver-result" style={{ background: 'rgba(100,116,139,0.08)', border: '1px solid rgba(100,116,139,0.2)', color: '#cbd5e1', marginTop: '8px', borderRadius: '7px', padding: '10px 14px', fontSize: '13px', lineHeight: '1.6' }}>
                            {waiverResults[idx]}
                          </div>
                        )}
                      </div>

                      {/* Links */}
                      <div className="info-block card-body-full">
                        <div className="info-block-label">🔗 Journal Links</div>
                        <div className="links-row" style={{ marginTop: '4px' }}>
                          <a className="link-btn link-btn-primary" href={j.homepageUrl} target="_blank" rel="noopener noreferrer">
                            🌐 Journal Homepage ↗
                          </a>
                          <a className="link-btn link-btn-secondary" href={j.submissionUrl} target="_blank" rel="noopener noreferrer">
                            📤 Submit Manuscript ↗
                          </a>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}

              <div className="disclaimer">
                <strong>⚠ Disclaimer:</strong> All data (impact factors, APCs, quartile rankings, word limits, acceptance rates, special issues) are AI-generated estimates based on training data and <strong style={{color:'#fbbf24'}}>may not reflect current values</strong>. Special issue deadlines in particular should be independently verified on each journal's official website before submission.
              </div>

            </>
          )}

          {/* Footer — always visible */}
          <div style={{ marginTop:'60px', paddingTop:'28px', borderTop:'1px solid rgba(255,255,255,0.07)', textAlign:'center', paddingBottom:'40px' }}>
            <div style={{ fontSize:'13px', color:'#6b7280', lineHeight:'2', letterSpacing:'0.2px' }}>
              AI Journal Recommender
            </div>
            <div style={{ fontSize:'13px', color:'#6b7280', lineHeight:'2' }}>
              Developer: <span style={{ color:'#9ca3af', fontWeight:600 }}>Jiyoun Song, PhD, APRN, Assistant Professor</span>
            </div>
            <div style={{ fontSize:'13px', color:'#6b7280', lineHeight:'2' }}>
              University of Pennsylvania School of Nursing
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
