import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export const CAT = {
  'DAO Boosting':          { bg: '#f0faf4', accent: '#16a34a', dot: '#3dd068' },
  'Mast Cell Stabilizing': { bg: '#eff6ff', accent: '#1d4ed8', dot: '#3b82f6' },
  'Migraine Prevention':   { bg: '#fdf2f8', accent: '#be185d', dot: '#ec4899' },
  'Gut Healing':           { bg: '#fffbeb', accent: '#b45309', dot: '#f59e0b' },
  'Anti-Inflammatory':     { bg: '#f5f3ff', accent: '#6d28d9', dot: '#8b5cf6' },
};

export const MEAL_ICONS = {
  Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙',
  Snack: '🫙', Condiment: '🧴', Drink: '🥤',
};

export function RecipeSchema({ recipe }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.metaDescription || recipe.description,
    keywords: recipe.schema?.keywords || recipe.tags.join(', '),
    recipeCategory: recipe.schema?.recipeCategory || 'Main Course',
    recipeCuisine: recipe.schema?.recipeCuisine || 'Functional Medicine',
    recipeYield: `${recipe.serves} servings`,
    prepTime: `PT${recipe.totalTimeMinutes || 20}M`,
    totalTime: `PT${recipe.totalTimeMinutes || 20}M`,
    suitableForDiet: (recipe.schema?.suitableForDiet || []).map(d => `https://schema.org/${d}`),
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.method.map((step, i) => ({
      '@type': 'HowToStep', position: i + 1, text: step,
    })),
    author: { '@type': 'Organization', name: 'Better Kitchen', url: 'https://betterkitchen.ai' },
    publisher: { '@type': 'Organization', name: 'Better Kinds', url: 'https://betterkinds.com' },
  };
  return (
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}

export default function RecipeDetail({ recipe, backHref = '/' }) {
  const [activeTab, setActiveTab] = useState('recipe');
  const col = CAT[recipe.category] || CAT['Anti-Inflammatory'];

  return (
    <>
      <Head>
        <title>{recipe.title} — Better Kitchen</title>
        <meta name="description" content={recipe.metaDescription || recipe.description} />
        <meta property="og:title" content={`${recipe.title} — Better Kitchen`} />
        <meta property="og:description" content={recipe.metaDescription || recipe.description} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        {recipe.schema?.keywords && <meta name="keywords" content={recipe.schema.keywords} />}
        <link rel="canonical" href={`https://betterkitchen.ai/recipe/${recipe.slug}`} />
        <RecipeSchema recipe={recipe} />
      </Head>

      <style jsx>{`
        .back-btn {
          display: inline-flex; align-items: center; gap: 8px;
          margin: 28px 0 20px; background: none; border: none;
          color: #6b7280; font-size: 14px; padding: 0;
          cursor: pointer; text-decoration: none; font-family: inherit;
          transition: color 0.15s;
        }
        .back-btn:hover { color: #1a1a1a; }

        .recipe-hdr { border-radius: 16px; padding: 36px 32px 28px; margin-bottom: 20px; border-bottom: 3px solid; }
        .recipe-emoji { font-size: 48px; margin-bottom: 16px; }
        .recipe-eyebrow { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; font-weight: 600; }
        .recipe-title { font-size: clamp(22px, 4vw, 34px); font-weight: 800; margin-bottom: 16px; line-height: 1.15; color: #1a1a1a; }
        .recipe-desc { font-size: 14px; color: #4b5563; line-height: 1.8; margin-bottom: 18px; max-width: 580px; }
        .recipe-meta { display: flex; gap: 20px; flex-wrap: wrap; font-size: 13px; color: #6b7280; margin-bottom: 16px; }
        .safe { color: #16a34a; font-weight: 600; }
        .pill-row { display: flex; gap: 6px; flex-wrap: wrap; }
        .pill { font-size: 10px; letter-spacing: 0.5px; padding: 3px 10px; border-radius: 8px; border: 1px solid; text-transform: uppercase; font-weight: 500; }

        .tabs { display: flex; gap: 4px; margin-bottom: 20px; background: #eeebe4; border-radius: 12px; padding: 4px; }
        .tab-btn { flex: 1; padding: 10px 12px; border-radius: 8px; border: none; font-size: 13px; cursor: pointer; transition: all 0.15s; font-family: inherit; }
        .tab-btn.on  { background: #fff; color: #1a1a1a; font-weight: 500; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
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

        .avoid-card { background: #fffbf5; border-radius: 0 14px 14px 0; padding: 24px 28px; border: 1px solid #fde68a; border-left: 4px solid #f59e0b; }
        .avoid-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #d97706; margin-bottom: 12px; font-weight: 600; }
        .avoid-text { font-size: 14px; color: #374151; line-height: 1.8; }

        .seo-box { background: #f8fafc; border-radius: 14px; padding: 22px 26px; border: 1px solid #e2e8f0; }
        .seo-box-title { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #94a3b8; margin-bottom: 16px; font-weight: 600; }
        .seo-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; align-items: flex-start; }
        .seo-row-label { font-size: 11px; color: #64748b; font-weight: 600; min-width: 100px; padding-top: 3px; }
        .seo-tag { font-size: 11px; padding: 3px 10px; border-radius: 6px; background: #e2e8f0; color: #475569; }
        .seo-tag.primary { background: #dcfce7; color: #166534; font-weight: 600; }
        .seo-tag.longtail { background: #ede9fe; color: #5b21b6; font-style: italic; }

        @media (max-width: 600px) {
          .recipe-hdr { padding: 24px 20px; }
          .panel { padding: 18px; }
          .tabs { flex-direction: column; }
        }
      `}</style>

      <Link href={backHref} className="back-btn">← All recipes</Link>

      <div className="recipe-hdr" style={{ background: col.bg, borderColor: col.dot }}>
        <div className="recipe-emoji">{recipe.emoji}</div>
        <div className="recipe-eyebrow" style={{ color: col.accent }}>{recipe.category}</div>
        <h1 className="recipe-title">{recipe.title}</h1>
        <p className="recipe-desc">{recipe.description}</p>
        <div className="recipe-meta">
          <span>{MEAL_ICONS[recipe.mealType] || '🍽'} {recipe.mealType}</span>
          <span>⏱ {recipe.prepTime}</span>
          {recipe.cookTime && <span>🔥 {recipe.cookTime}</span>}
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
        {['recipe', 'markers', 'avoid', 'seo'].map(tab => (
          <button key={tab}
            className={`tab-btn ${activeTab === tab ? 'on' : 'off'}`}
            onClick={() => setActiveTab(tab)}>
            {tab === 'recipe' ? '🍽 Recipe' : tab === 'markers' ? '🔬 Markers' : tab === 'avoid' ? '⚠️ Avoid' : '🔍 SEO'}
          </button>
        ))}
      </div>

      {activeTab === 'recipe' && (
        <div className="two-col">
          <div className="panel">
            <div className="panel-label">Ingredients</div>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="ing-row"><span className="ing-dot">◆</span>{ing}</div>
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

      {activeTab === 'seo' && recipe.seo && (
        <div className="seo-box">
          <div className="seo-box-title">SEO & Search Data</div>
          <div className="seo-row">
            <span className="seo-row-label">Primary KW</span>
            <span className="seo-tag primary">{recipe.seo.primaryKeyword}</span>
          </div>
          <div className="seo-row">
            <span className="seo-row-label">Secondary</span>
            {(recipe.seo.secondaryKeywords || []).map(k => <span key={k} className="seo-tag">{k}</span>)}
          </div>
          <div className="seo-row">
            <span className="seo-row-label">Long-tail</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {(recipe.seo.longTailKeywords || []).map(k => <span key={k} className="seo-tag longtail">{k}</span>)}
            </div>
          </div>
          <div className="seo-row">
            <span className="seo-row-label">Conditions</span>
            {(recipe.seo.conditionKeywords || []).map(k => <span key={k} className="seo-tag">{k}</span>)}
          </div>
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#f1f5f9', borderRadius: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Meta description</div>
            <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>{recipe.metaDescription}</div>
            <div style={{ fontSize: 11, color: (recipe.metaDescription?.length || 0) > 160 ? '#ef4444' : '#22c55e', marginTop: 6 }}>
              {recipe.metaDescription?.length || 0} / 160 chars
            </div>
          </div>
          {recipe.schema && (
            <div style={{ marginTop: 12, padding: '12px 16px', background: '#f1f5f9', borderRadius: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Schema.org</div>
              <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.8 }}>
                <strong>Category:</strong> {recipe.schema.recipeCategory} &nbsp;·&nbsp;
                <strong>Cuisine:</strong> {recipe.schema.recipeCuisine}<br />
                <strong>Diet:</strong> {(recipe.schema.suitableForDiet || []).join(', ')}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
