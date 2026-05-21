# Better Kitchen — Full Setup Guide
## n8n + Claude API + GitHub + Vercel
### betterkitchen.ai

---

## What you'll have when done

- A live website at `your-name.vercel.app` (or custom domain)
- A new MCAS-safe recipe auto-published every morning at 7am
- Every recipe annotated with functional medicine markers
- Zero ongoing manual work

**Estimated setup time: 60–90 minutes**
**Ongoing cost: ~$3–5/month** (Anthropic API only — everything else is free tier)

---

## Step 1 — Get the code onto GitHub

1. Go to [github.com](https://github.com) → **New repository**
2. Name it `better-kitchen` → set to **Public** → Create
3. On your computer, open Terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/better-kitchen
```

4. Copy ALL files from the downloaded project folder into the cloned folder
5. Then push:

```bash
cd better-kitchen
git add .
git commit -m "initial: Better Kitchen launch"
git push origin main
```

Your repo should now have:
```
mcas-kitchen/
├── pages/
│   ├── index.js          ← the website
│   └── api/add-recipe.js ← optional direct API
├── data/
│   └── recipes.json      ← your recipe database
├── package.json
└── next.config.js
```

---

## Step 2 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project** → Import your `mcas-kitchen` repo
3. Framework: **Next.js** (auto-detected)
4. Click **Deploy** — takes ~2 minutes

✅ Your site is now live at `mcas-kitchen.vercel.app`

### Add environment variable in Vercel:
- Go to your project → **Settings → Environment Variables**
- Add: `RECIPE_API_SECRET` = any long random string you choose
  (e.g. `mk_s3cr3t_k3y_2026_mcas`)
- This protects your API endpoint

---

## Step 3 — Create a GitHub Personal Access Token

This lets n8n push new recipes directly to your repo (which triggers Vercel auto-deploy).

1. GitHub → **Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens**
2. Click **Generate new token**
3. Set expiry: **No expiration** (or 1 year)
4. Repository access: **Only select repositories → mcas-kitchen**
5. Permissions → **Contents: Read and Write**
6. Click **Generate token** → **COPY IT NOW** (shown once only)

---

## Step 4 — Get your Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up / log in
3. **Settings → API Keys → Create Key**
4. Copy the key (starts with `sk-ant-`)
5. Go to **Plans & Billing → Usage Limits** → set a $10/month hard limit

---

## Step 5 — Set up n8n

### Option A: n8n Cloud (easiest, no setup)
1. Go to [n8n.io](https://n8n.io) → Start free trial
2. You get a hosted n8n instance immediately

### Option B: Self-hosted (free forever)
```bash
# Requires Docker
docker run -it --rm --name n8n -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```
Then open: `http://localhost:5678`

---

## Step 6 — Import the workflow into n8n

1. In n8n, click **Workflows → Import from File**
2. Upload `n8n-workflow.json` from this project
3. The workflow will open with all nodes pre-built

### Add credentials:

**Anthropic API:**
- In n8n: **Credentials → New → Anthropic API**
- Paste your `sk-ant-` key
- Save as "Anthropic API"

**GitHub Token:**
- In n8n: **Credentials → New → HTTP Header Auth**
- Header Name: `Authorization`
- Header Value: `Bearer YOUR_GITHUB_TOKEN_HERE`
- Save as "GitHub Token"

### Add environment variables in n8n:
- Go to **Settings → Variables**
- Add: `GITHUB_OWNER` = your GitHub username
- Add: `GITHUB_REPO` = `better-kitchen`

---

## Step 7 — Test the workflow

1. Open your imported workflow
2. Click **Test workflow** (don't activate yet)
3. Watch each node execute:
   - ✅ Trigger fires
   - ✅ Claude generates a recipe JSON
   - ✅ Parser validates it
   - ✅ GitHub GET fetches current recipes.json
   - ✅ Code node builds updated file
   - ✅ GitHub PUT pushes the commit
4. Check your GitHub repo — you should see a new commit
5. Check Vercel — it will auto-deploy in ~30 seconds
6. Check your live site — new recipe appears!

### Activate for daily runs:
- Click the **Activate** toggle (top right)
- The workflow now runs automatically every morning at 7am

---

## How Vercel auto-deploys work

Every time n8n pushes a commit to GitHub, Vercel detects the change and:
1. Rebuilds the Next.js site (takes ~25 seconds)
2. Deploys the new build
3. Your live URL shows the new recipe

You don't need to do anything. It's fully automatic.

---

## Customising the daily recipe focus

In the n8n workflow, open the **"Claude — Generate Recipe"** node.
In the system prompt you'll see:

```
Today's focus: {{ $json.focus || 'gut healing and DAO support' }}
```

You can change the default focus, or add a node before Claude that
rotates through a list:

```javascript
const focuses = [
  'DAO enzyme support and histamine degradation',
  'mast cell stabilization and quercetin-rich foods',
  'migraine prevention and magnesium-rich meals',
  'gut mucosa healing and prebiotic support',
  'anti-inflammatory and NRF2 activation',
  'nervous system support and serotonin precursors',
  'adrenal support for HAT patients',
];
const today = focuses[new Date().getDay() % focuses.length];
return [{ json: { focus: today } }];
```

---

## Costs

| Service | Plan | Cost |
|---|---|---|
| Vercel | Hobby (free) | $0 |
| GitHub | Free | $0 |
| n8n Cloud | Starter | ~$20/mo |
| n8n Self-hosted | Docker | $0 |
| Claude Sonnet 4 API | Pay-as-you-go | ~$0.05–0.10/recipe |
| **Total (self-hosted n8n)** | | **~$1.50–3/month** |
| **Total (n8n cloud)** | | **~$21–23/month** |

---

## Troubleshooting

**"Claude returned invalid JSON"**
→ Increase `maxTokens` to 3000 in the Claude node. Rare but can happen.

**GitHub push fails (403)**
→ Check your token has Contents: Write permission on the correct repo.

**Vercel not rebuilding**
→ Check Vercel dashboard → Deployments. Ensure the GitHub integration is connected.

**n8n "Overloaded" error from Anthropic**
→ Add a retry node after Claude. Anthropic occasionally has capacity spikes.

---

## Adding the Obsidian layer later

When you're ready, the Obsidian integration adds a human-in-the-loop:
- You write a note in Obsidian with today's focus/context
- Post Webhook plugin sends it to n8n
- n8n uses YOUR note as the Claude prompt context
- Same pipeline runs from there

This is covered in a separate setup guide.

---

*Better Kitchen · betterkitchen.ai · A Better Kinds product*
*Built with Claude Sonnet 4 · Powered by n8n + Vercel + GitHub*
