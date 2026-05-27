import path from 'path';
import fs from 'fs';

const SITE_URL = 'https://betterkitchen.ai';

function generateSitemap(recipes) {
  const staticPages = [
    { url: '',         priority: '1.0', changefreq: 'daily'   },
    { url: '/about',   priority: '0.8', changefreq: 'monthly' },
  ];

  const recipePages = recipes.map(r => ({
    url:        `/recipe/${r.slug}`,
    priority:   '0.9',
    changefreq: 'weekly',
    lastmod:    r.dateAdded || new Date().toISOString().split('T')[0],
  }));

  const allPages = [...staticPages, ...recipePages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
  const recipes  = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  const sitemap = generateSitemap(recipes);

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return { props: {} };
}
