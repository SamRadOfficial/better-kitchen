import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Verify secret token so only n8n can post
  const authHeader = req.headers['authorization'];
  const expectedToken = `Bearer ${process.env.RECIPE_API_SECRET}`;
  if (authHeader !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const newRecipe = req.body;

    // Validate required fields
    const required = ['title', 'emoji', 'category', 'tags', 'description', 'ingredients', 'method', 'functionalMarkers'];
    for (const field of required) {
      if (!newRecipe[field]) {
        return res.status(400).json({ error: `Missing required field: ${field}` });
      }
    }

    // Read existing recipes
    const dataPath = path.join(process.cwd(), 'data', 'recipes.json');
    const existing = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Assign id and date
    const recipe = {
      id: existing.length + 1,
      dateAdded: new Date().toISOString().split('T')[0],
      ...newRecipe,
    };

    existing.push(recipe);
    fs.writeFileSync(dataPath, JSON.stringify(existing, null, 2));

    return res.status(200).json({ success: true, recipe });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
