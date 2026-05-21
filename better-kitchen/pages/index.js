import { useState } from 'react';
import Head from 'next/head';
import path from 'path';
import fs from 'fs';
import Layout from '../components/Layout';

const CAT = {
  'DAO Boosting':          { bg: '#f0faf4', accent: '#16a34a', dot: '#3dd068' },
  'Mast Cell Stabilizing': { bg: '#eff6ff', accent: '#1d4ed8', dot: '#3b82f6' },
  'Migraine Prevention':   { bg: '#fdf2f8', accent: '#be185d', dot: '#ec4899' },
  'Gut Healing':           { bg: '#fffbeb', accent: '#b45309', dot: '#f59e0b' },
  'Anti-Inflammatory':     { bg: '#f5f3ff', accent: '#6d28d9', dot: '#8b5cf6' },
};

const TAGS = [
  'All','DAO Boosting','Mast Cell Stabilizing','Anti-Inflammatory',
  'Migraine Prevention','Gut Healing','Low Histamine','NRF2 Activation','Nervous System Support',
];

export default function Home({ recipes }) {
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [activeTag, setActiveTag]       = useState('All');
  const [activeTab, setActiveTab]       = useState('recipe');

  const filtered = activeTag === 'All' ? recipes : recipes.filter(r => r.tags.includes(activeTag));
  const recipe   = recipes.find(r => r.id === activeRecipe);
  const col      = recipe ? (CAT[recipe.category] || CAT['Anti-Inflammatory']) : null;

  return (
    <Layout>
      <Head>
        <title>Better Kitchen — Food as Medicine</title>
        <meta name="description" content="Recipes for MCAS, Histamine Intolerance & Systemic Inflammation — every dish annotated with functional medicine markers. A Better Kinds product." />
        <meta property="og:title" content="Better Kitchen — Food as Medicine" />
        <meta property="og:description" content="Recipes for MCAS, Histamine Intolerance & Systemic Inflammation." />
        <meta property="og:site_name" content="Better Kitchen" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <style jsx>{`
        .hero {
          background: #1e3320;
          padding: 56px 24px 48px;
          text-align: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(61,208,104,0.12); border: 1px solid rgba(61,208,104,0.25);
          border-radius: 20px; padding: 5px 16px;
          font-size: 11px; letter-spacing: 3px; color: #3dd068;
          text-transform: uppercase; margin-bottom: 22px; font-weight: 500;
        }
        .hero-title {
          font-size: clamp(36px, 7vw, 60px); font-weight: 800;
          color: #f0ede8; margin-bottom: 12px; letter-spacing: -1px; line-height: 1.05;
        }
        .hero-title span { color: #3dd068; }
        .hero-sub {
          font-size: 15px; color: #7aab7a; max-width: 480px;
          margin: 0 auto 30px; line-height: 1.75; font-weight: 300;
        }
        .tag-bar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tag-btn {
          padding: 6px 16px; border-radius: 20px; border: 1px solid;
          font-size: 11px; letter-spacing: 0.8px; cursor: pointer;
          text-transform: uppercase; transition: all 0.15s; background: transparent;
        }
        .tag-btn.on  { border-color: #3dd068; background: rgba(61,208,104,0.15); color: #3dd068; }
        .tag-btn.off { border-color: rgba(61,208,104,0.2); color: #547a54; }
        .tag-btn.off:hover { border-color: rgba(61,208,104,0.4); color: #7aab7a; }

        .main { max-width: 1020px; margin: 0 auto; padding: 0 24px 100px; }
        .grid-label { padding: 32px 0 16px; font-size: 11px; letter-spacing: 3px; color: #9ca3af; text-transform: uppercase; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }
        .card {
          background: #fff; border-radius: 16px; overflow: hidden;
          cursor: pointer; border: 1px solid #e8e6e0;
          transition: transform 0.2s, border-color 0.2s;
        }
        .card:hover { transform: translateY(-3px); border-color: #d0cdc6; }
        .card-top { padding: 24px 22px 18px; border-bottom: 2px solid; }
        .card-emoji { font-size: 34px; margin-bottom: 12px; }
        .card-cat { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; }
        .card-title { font-size: 18px; font-weight: 700; line-height: 1.25; color: #1a1a1a; }
        .card-body { padding: 14px 22px 18px; }
        .card-desc { font-size: 13px; color: #6b7280; line-height: 1.65; margin-bottom: 12px; }
        .pill-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .pill { font-size: 10px; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 8px; border: 1px solid; text-transform: uppercase; font-weight: 500; }
        .meta-row { font-size: 11px; color: #9ca3af; display: flex; gap: 14px; }
        .date-badge { font-size: 11px; color: #d1d5db; margin-top: 8px; }

        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          margin: 28px 0 20px; background: none; border: none;
          color: #6b7280; font-size: 14px; padding: 0; transition: color 0.15s;
        }
        .back-btn:hover { color: #1a1a1a; }

        .recipe-hdr { border-radius: 16px; padding: 36px 32px 28px; margin-bottom: 20px; border-bottom: 3px solid; }
        .recipe-emoji { font-size: 48px; margin-bottom: 16px; }
        .recipe-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600; }
        .recipe-title { font-size: clamp(22px, 4vw, 34px); font-weight: 800; margin-bottom: 16px; line-height: 1.15; color: #1a1a1a; }
        .recipe-desc { font-size: 14px; color: #4b5563; line-height: 1.8; margin-bottom: 18px; max-width: 580px; }
        .recipe-meta { display: flex; gap: 20px; flex-wrap: wrap; font-size: 13px; color: #6b7280; margin-bottom: 16px; }
        .safe { color: #16a34a; font-weight: 600; }

        .tabs { display: flex; gap: 4px; margin-bottom: 20px; background: #eeebe4; border-radius: 12px; padding: 4px; }
        .tab-btn { flex: 1; padding: 10px 12px; border-radius: 8px; border: none; font-size: 13px; cursor: pointer; transition: all 0.15s; }
        .tab-btn.on  { background: #fff; color: #1a1a1a; box-shadow: 0 1px 4px rgba(0,0,0,0.08); font-weight: 500; }
        .tab-btn.off { background: transparent; color: #9ca3af; }

        .two-col { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
        .panel { background: #fff; border-radius: 14px; padding: 24px 26px; border: 1px solid #e8e6e0; }
        .panel-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #9ca3af; margin-bottom: 18px; font-weight: 500; }
        .ing-row { display: flex; gap: 10px; align-items: flex-start; padding: 9px 0; border-bottom: 1px solid #f9fafb; font-size: 13px; color: #374151; line-height: 1.5; }
        .ing-row:last-child { border-bottom: none; }
        .ing-dot { flex-shrink: 0; margin-top: 4px; font-size: 7px; color: #3dd068; }
        .step-row { display: flex; gap: 12px; align-items: flex-start; padding: 10px 0; border-bottom: 1px solid #f9fafb; font-size: 13px; color: #374151; line-height: 1.55; }
        .step-row:last-child { border-bottom: none; }
        .step-num { min-width: 24px; height: 24px; border-radius: 50%; background: #f0faf4; color: #16a34a; border: 1px solid #bbf7d0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }

        .markers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
        .marker-card { background: #fff; border-radius: 14px; padding: 22px; border: 1px solid #e8e6e0; border-top: 3px solid; }
        .marker-icon { font-size: 22px; margin-bottom: 10px; }
        .marker-label { font-size: 13px; font-weight: 600; margin-bottom: 8px; }
        .marker-detail { font-size: 12px; color: #4b5563; line-height: 1.7; }

        .avoid-card { background: #fffbf5; border-radius: 14px; padding: 24px 28px; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; border-top-left-radius: 0; border-bottom-left-radius: 0; }
        .avoid-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #d97706; margin-bottom: 12px; font-weight: 600; }
        .avoid-text { font-size: 14px; color: #374151; line-height: 1.8; }

        .disclaimer { margin-top: 52px; padding: 20px 24px; background: #fff; border-radius: 14px; border-left: 4px solid #3dd068; border-top-left-radius: 0; border-bottom-left-radius: 0; border: 1px solid #e8e6e0; border-left: 4px solid #3dd068; }
        .disclaimer-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #3dd068; margin-bottom: 10px; font-weight: 600; }
        .disclaimer-text { font-size: 13px; color: #6b7280; line-height: 1.75; }

        @media (max-width: 600px) {
          .recipe-hdr { padding: 24px 20px; }
          .panel { padding: 18px; }
          .tabs { flex-direction: column; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">Food as Medicine</div>
        <h1 className="hero-title">Better <span>Kitchen</span></h1>
        <p className="hero-sub">
          Recipes for MCAS, Histamine Intolerance &amp; Systemic Inflammation —
          every dish annotated with functional medicine markers.
        </p>
        <div className="tag-bar">
          {TAGS.map(t => (
            <button key={t} className={`tag-btn ${activeTag === t ? 'on' : 'off'}`}
              onClick={() => { setActiveTag(t); setActiveRecipe(null); }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <main className="main">

        {/* GRID */}
        {!activeRecipe && (
          <>
            <div className="grid-label">{filtered.length} recipe{filtered.length !== 1 ? 's' : ''}</div>
            <div className="grid">
              {filtered.map(r => {
                const c = CAT[r.category] || CAT['Anti-Inflammatory'];
                return (
                  <div key={r.id} className="card"
                    onClick={() => { setActiveRecipe(r.id); setActiveTab('recipe'); }}>
                    <div className="card-top" style={{ background: c.bg, borderColor: c.dot }}>
                      <div className="card-emoji">{r.emoji}</div>
                      <div className="card-cat" style={{ color: c.accent }}>{r.category}</div>
                      <div className="card-title">{r.title}</div>
                    </div>
                    <div className="card-body">
                      <p className="card-desc">{r.description.slice(0, 110)}…</p>
                      <div className="pill-row">
                        {r.tags.slice(0, 2).map(t => (
                          <span key={t} className="pill"
                            style={{ background: c.bg, color: c.accent, borderColor: c.dot + '50' }}>{t}</span>
                        ))}
                      </div>
                      <div className="meta-row">
                        <span>⏱ {r.prepTime}</span>
                        <span>👤 Serves {r.serves}</span>
                      </div>
                      {r.dateAdded && <div className="date-badge">Added {r.dateAdded}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="disclaimer">
              <div className="disclaimer-label">Clinical Note</div>
              <p className="disclaimer-text">
                Better Kitchen is a functional nutrition companion, not a replacement for medical care.
                MCAS and HAT are highly individual — always introduce new foods slowly and track reactions.
                Work with your allergist or immunologist for your personal mast cell stabiliser protocol.
              </p>
            </div>
          </>
        )}

        {/* RECIPE DETAIL */}
        {activeRecipe && recipe && (
          <>
            <button className="back-btn" onClick={() => setActiveRecipe(null)}>← All recipes</button>

            <div className="recipe-hdr" style={{ background: col.bg, borderColor: col.dot }}>
              <div className="recipe-emoji">{recipe.emoji}</div>
              <div className="recipe-eyebrow" style={{ color: col.accent }}>{recipe.category}</div>
              <h1 className="recipe-title">{recipe.title}</h1>
              <p className="recipe-desc">{recipe.description}</p>
              <div className="recipe-meta">
                <span>⏱ {recipe.prepTime}</span>
                <span>👤 Serves {recipe.serves}</span>
                <span className="safe">✓ {recipe.safetyLevel}</span>
              </div>
              <div className="pill-row">
                {recipe.tags.map(t => (
                  <span key={t} className="pill"
                    style={{ background: '#fff', color: col.accent, borderColor: col.dot + '60' }}>{t}</span>
                ))}
              </div>
            </div>

            <div className="tabs">
              {['recipe','markers','avoid'].map(tab => (
                <button key={tab} className={`tab-btn ${activeTab === tab ? 'on' : 'off'}`}
                  onClick={() => setActiveTab(tab)}>
                  {tab === 'recipe' ? '🍽 Recipe' : tab === 'markers' ? '🔬 Functional Markers' : '⚠️ Avoid'}
                </button>
              ))}
            </div>

            {activeTab === 'recipe' && (
              <div className="two-col">
                <div className="panel">
                  <div className="panel-label">Ingredients</div>
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} className="ing-row">
                      <span className="ing-dot">◆</span>{ing}
                    </div>
                  ))}
                </div>
                <div className="panel">
                  <div className="panel-label">Method</div>
                  {recipe.method.map((step, i) => (
                    <div key={i} className="step-row">
                      <span className="step-num">{i + 1}</span>{step}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'markers' && (
              <div className="markers-grid">
                {recipe.functionalMarkers.map((m, i) => (
                  <div key={i} className="marker-card" style={{ borderTopColor: col.dot }}>
                    <div className="marker-icon">{m.icon}</div>
                    <div className="marker-label" style={{ color: col.accent }}>{m.label}</div>
                    <p className="marker-detail">{m.detail}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'avoid' && (
              <div className="avoid-card">
                <div className="avoid-label">⚠️ Clinical Caution</div>
                <p className="avoid-text">{recipe.avoidNote}</p>
              </div>
            )}
          </>
        )}
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
  const recipes  = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  return { props: { recipes } };
}
