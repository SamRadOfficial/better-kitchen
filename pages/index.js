import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import Layout from '../components/Layout';
import { CAT, MEAL_ICONS } from '../components/RecipeDetail';

const TAGS = [
  'All','DAO Boosting','Mast Cell Stabilizing','Anti-Inflammatory',
  'Migraine Prevention','Gut Healing','Low Histamine','NRF2 Activation','Nervous System Support',
];

const PER_PAGE = 12;

export default function Home({ recipes }) {
  const [activeTag,  setActiveTag]  = useState('All');
  const [page,       setPage]       = useState(1);

  const filtered = activeTag === 'All'
    ? recipes
    : recipes.filter(r => r.tags.includes(activeTag));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function handleTag(t) {
    setActiveTag(t);
    setPage(1);
  }

  return (
    <Layout>
      <Head>
        <title>Better Kitchen — MCAS &amp; Low Histamine Recipes</title>
        <meta name="description" content="Low-histamine, MCAS-safe recipes for mast cell activation syndrome, histamine intolerance, migraine, and systemic inflammation. Every dish annotated with functional medicine markers." />
        <meta property="og:title" content="Better Kitchen — MCAS & Low Histamine Recipes" />
        <meta property="og:description" content="AI-powered low-histamine recipes for MCAS, histamine intolerance and systemic inflammation." />
        <meta property="og:site_name" content="Better Kitchen" />
        <meta name="keywords" content="MCAS recipes, low histamine diet, histamine intolerance recipes, mast cell activation syndrome food, DAO boosting foods, anti-inflammatory recipes" />
        <link rel="canonical" href="https://betterkitchen.ai" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Better Kitchen',
          url: 'https://betterkitchen.ai',
          description: 'Low-histamine, MCAS-safe recipes annotated with functional medicine markers.',
          publisher: { '@type': 'Organization', name: 'Better Kinds', url: 'https://betterkinds.com' },
          potentialAction: { '@type': 'SearchAction', target: 'https://betterkitchen.ai/?tag={search_term_string}', 'query-input': 'required name=search_term_string' },
        })}} />
      </Head>

      <style jsx>{`
        .hero { background: #1e3320; padding: 56px 24px 48px; text-align: center; }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(61,208,104,0.12); border: 1px solid rgba(61,208,104,0.25);
          border-radius: 20px; padding: 5px 16px;
          font-size: 11px; letter-spacing: 3px; color: #3dd068;
          text-transform: uppercase; margin-bottom: 22px; font-weight: 500;
        }
        .hero-title { font-size: clamp(36px,7vw,60px); font-weight: 800; color: #f0ede8; margin-bottom: 12px; letter-spacing: -1px; line-height: 1.05; }
        .hero-title span { color: #3dd068; }
        .hero-sub { font-size: 15px; color: #7aab7a; max-width: 480px; margin: 0 auto 30px; line-height: 1.75; font-weight: 300; }
        .tag-bar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .tag-btn { padding: 6px 16px; border-radius: 20px; border: 1px solid; font-size: 11px; letter-spacing: 0.8px; cursor: pointer; text-transform: uppercase; transition: all 0.15s; background: transparent; font-family: inherit; }
        .tag-btn.on  { border-color: #3dd068; background: rgba(61,208,104,0.15); color: #3dd068; }
        .tag-btn.off { border-color: rgba(61,208,104,0.2); color: #547a54; }

        .main { max-width: 1020px; margin: 0 auto; padding: 0 24px 100px; }
        .grid-meta { display: flex; align-items: center; justify-content: space-between; padding: 32px 0 16px; }
        .grid-label { font-size: 11px; letter-spacing: 3px; color: #9ca3af; text-transform: uppercase; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 20px; }

        .card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e6e0; text-decoration: none; display: block; transition: transform 0.2s, border-color 0.2s; }
        .card:hover { transform: translateY(-3px); border-color: #d0cdc6; }
        .card-top { padding: 24px 22px 18px; border-bottom: 2px solid; }
        .card-emoji { font-size: 34px; margin-bottom: 12px; }
        .card-cat { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; font-weight: 600; }
        .card-title { font-size: 17px; font-weight: 700; line-height: 1.25; color: #1a1a1a; }
        .card-body { padding: 14px 22px 18px; }
        .card-desc { font-size: 13px; color: #6b7280; line-height: 1.65; margin-bottom: 12px; }
        .pill-row { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
        .pill { font-size: 10px; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 8px; border: 1px solid; text-transform: uppercase; font-weight: 500; }
        .meta-row { font-size: 11px; color: #9ca3af; display: flex; gap: 14px; }
        .date-badge { font-size: 11px; color: #d1d5db; margin-top: 8px; }

        /* Pagination */
        .pagination { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 52px; }
        .page-btn {
          min-width: 36px; height: 36px; border-radius: 8px; border: 1px solid #e8e6e0;
          background: #fff; color: #374151; font-size: 13px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; font-family: inherit; padding: 0 10px;
        }
        .page-btn:hover:not(:disabled) { border-color: #3dd068; color: #3dd068; }
        .page-btn.active { background: #3dd068; border-color: #3dd068; color: #fff; font-weight: 600; }
        .page-btn:disabled { opacity: 0.35; cursor: default; }
        .page-ellipsis { font-size: 13px; color: #9ca3af; padding: 0 4px; }

        .disclaimer { margin-top: 52px; padding: 20px 24px; background: #fff; border-radius: 0 14px 14px 0; border: 1px solid #e8e6e0; border-left: 4px solid #3dd068; }
        .disclaimer-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #3dd068; margin-bottom: 10px; font-weight: 600; }
        .disclaimer-text { font-size: 13px; color: #6b7280; line-height: 1.75; }

        @media (max-width: 600px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">Food as Medicine</div>
        <h1 className="hero-title">Better <span>Kitchen</span></h1>
        <p className="hero-sub">Recipes for MCAS, Histamine Intolerance &amp; Systemic Inflammation — every dish annotated with functional medicine markers.</p>
        <div className="tag-bar">
          {TAGS.map(t => (
            <button key={t} className={`tag-btn ${activeTag === t ? 'on' : 'off'}`}
              onClick={() => handleTag(t)}>{t}
            </button>
          ))}
        </div>
      </div>

      <main className="main">
        <div className="grid-meta">
          <div className="grid-label">
            {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
            {totalPages > 1 && ` · page ${page} of ${totalPages}`}
          </div>
        </div>

        <div className="grid">
          {paginated.map(r => {
            const c = CAT[r.category] || CAT['Anti-Inflammatory'];
            return (
              <Link key={r.id} href={`/recipe/${r.slug}`} className="card">
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
                    <span>{MEAL_ICONS[r.mealType] || '🍽'} {r.mealType}</span>
                    <span>⏱ {r.prepTime}</span>
                    <span>👤 {r.serves}</span>
                  </div>
                  {r.dateAdded && <div className="date-badge">Added {r.dateAdded}</div>}
                </div>
              </Link>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>← Prev</button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
              const showPage = p === 1 || p === totalPages || Math.abs(p - page) <= 1;
              const showEllipsisBefore = p === page - 2 && page > 3;
              const showEllipsisAfter  = p === page + 2 && page < totalPages - 2;
              if (showEllipsisBefore || showEllipsisAfter) {
                return <span key={p} className="page-ellipsis">…</span>;
              }
              if (!showPage) return null;
              return (
                <button key={p} className={`page-btn ${p === page ? 'active' : ''}`}
                  onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  {p}
                </button>
              );
            })}

            <button className="page-btn" onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={page === totalPages}>Next →</button>
          </div>
        )}

        <div className="disclaimer">
          <div className="disclaimer-label">Clinical Note</div>
          <p className="disclaimer-text">Better Kitchen is a functional nutrition companion, not a replacement for medical care. MCAS and HAT are highly individual — always introduce new foods slowly and track reactions. Work with your allergist or immunologist for your personal mast cell stabiliser protocol.</p>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
  const recipes  = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  // Newest first
  return { props: { recipes: [...recipes].reverse() } };
}
