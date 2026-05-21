import path from 'path';
import fs from 'fs';
import Layout from '../../components/Layout';
import RecipeDetail from '../../components/RecipeDetail';
import Link from 'next/link';
import { CAT, MEAL_ICONS } from '../../components/RecipeDetail';

export default function RecipePage({ recipe, related }) {
  return (
    <Layout>
      <style jsx>{`
        .main { max-width: 860px; margin: 0 auto; padding: 0 24px 100px; }

        .related { margin-top: 64px; }
        .related-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #9ca3af; margin-bottom: 20px; font-weight: 500; }
        .related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .related-card { background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid #e8e6e0; text-decoration: none; transition: transform 0.15s, border-color 0.15s; display: block; }
        .related-card:hover { transform: translateY(-2px); border-color: #d0cdc6; }
        .related-card-top { padding: 18px 18px 14px; border-bottom: 2px solid; }
        .related-card-emoji { font-size: 26px; margin-bottom: 8px; }
        .related-card-cat { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 4px; font-weight: 600; }
        .related-card-title { font-size: 14px; font-weight: 700; line-height: 1.3; color: #1a1a1a; }
        .related-card-body { padding: 10px 18px 14px; font-size: 12px; color: #6b7280; }
        .related-card-meta { font-size: 11px; color: #9ca3af; display: flex; gap: 10px; margin-top: 8px; }

        .disclaimer { margin-top: 52px; padding: 20px 24px; background: #fff; border-radius: 0 14px 14px 0; border: 1px solid #e8e6e0; border-left: 4px solid #3dd068; }
        .disclaimer-label { font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase; color: #3dd068; margin-bottom: 10px; font-weight: 600; }
        .disclaimer-text { font-size: 13px; color: #6b7280; line-height: 1.75; }
      `}</style>

      <main className="main">
        <RecipeDetail recipe={recipe} backHref="/" />

        {related.length > 0 && (
          <div className="related">
            <div className="related-label">Related recipes</div>
            <div className="related-grid">
              {related.map(r => {
                const c = CAT[r.category] || CAT['Anti-Inflammatory'];
                return (
                  <Link key={r.id} href={`/recipe/${r.slug}`} className="related-card">
                    <div className="related-card-top" style={{ background: c.bg, borderColor: c.dot }}>
                      <div className="related-card-emoji">{r.emoji}</div>
                      <div className="related-card-cat" style={{ color: c.accent }}>{r.category}</div>
                      <div className="related-card-title">{r.title}</div>
                    </div>
                    <div className="related-card-body">
                      {r.description.slice(0, 80)}…
                      <div className="related-card-meta">
                        <span>{MEAL_ICONS[r.mealType] || '🍽'} {r.mealType}</span>
                        <span>⏱ {r.prepTime}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="disclaimer">
          <div className="disclaimer-label">Clinical Note</div>
          <p className="disclaimer-text">Better Kitchen is a functional nutrition companion, not a replacement for medical care. MCAS and HAT are highly individual — always introduce new foods slowly and track reactions with your allergist or immunologist.</p>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
  const recipes  = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const paths = recipes
    .filter(r => r.slug)
    .map(r => ({ params: { slug: r.slug } }));

  return {
    paths,
    fallback: 'blocking', // new recipes added daily get their page on first visit
  };
}

export async function getStaticProps({ params }) {
  const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
  const recipes  = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const recipe = recipes.find(r => r.slug === params.slug);

  if (!recipe) {
    return { notFound: true };
  }

  // Related: same category or shared tags, excluding current recipe, max 3
  const related = recipes
    .filter(r => r.id !== recipe.id && r.slug)
    .map(r => ({
      recipe: r,
      score: (r.category === recipe.category ? 3 : 0) +
             r.tags.filter(t => recipe.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ recipe }) => recipe);

  return {
    props: { recipe, related },
    revalidate: 3600, // ISR — revalidate hourly for new recipes
  };
}
