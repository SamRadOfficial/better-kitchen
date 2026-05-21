import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const pillars = [
  {
    icon: '⚗️',
    title: 'DAO Enzyme Support',
    body: 'Diamine Oxidase (DAO) is the primary enzyme responsible for breaking down ingested histamine. Many MCAS patients have low DAO activity. Every recipe in Better Kitchen is designed to either boost DAO production or reduce the histamine load placed on it.',
  },
  {
    icon: '🔬',
    title: 'Mast Cell Stabilisation',
    body: 'Mast cells are the central mediators of MCAS. Certain food compounds — quercetin, luteolin, rosmarinic acid, and EGCG — directly inhibit mast cell degranulation without pharmaceutical side effects. We build these into every meal.',
  },
  {
    icon: '🧬',
    title: 'NRF2 & Inflammatory Pathways',
    body: 'Sulforaphane (broccoli), curcumin (turmeric), and oleocanthal (olive oil) activate the NRF2 pathway — the body\'s master antioxidant switch — while inhibiting NF-κB, the primary driver of inflammatory cytokine production.',
  },
  {
    icon: '🧠',
    title: 'Migraine & Nervous System',
    body: 'Magnesium deficiency is present in over 50% of migraine patients. Histamine is a potent vasodilator and mast cell-derived prostaglandins sensitise trigeminovascular pain pathways. Better Kitchen targets both with every recipe.',
  },
  {
    icon: '🌱',
    title: 'Gut Microbiome',
    body: 'The gut houses over 70% of the body\'s mast cells. Dysbiosis — particularly overgrowth of histamine-producing bacteria like Lactobacillus casei — drives systemic histamine elevation. We favour prebiotics that support healthy strains without feeding problematic ones.',
  },
  {
    icon: '📉',
    title: 'Hereditary Alpha Tryptasemia (HAT)',
    body: 'HAT is caused by extra copies of the TPSAB1 gene, leading to elevated baseline tryptase and amplified mast cell reactivity. Patients with HAT are often more sensitive to triggers. Better Kitchen applies conservative, strictly low-histamine standards with HAT in mind.',
  },
];

const principles = [
  'No fermented, aged, smoked, or canned ingredients',
  'No alcohol or vanilla extract',
  'No leftovers — only freshly prepared food',
  'No tomatoes, spinach, eggplant, or avocado',
  'No dried fruits, canned fish, or processed meats',
  'No nuts except macadamia (low histamine)',
  'No chocolate or cocoa',
  'Prioritise DAO-boosting sprouts and fresh herbs',
  'Include a mast cell stabiliser in every dish',
  'Document every functional marker clearly',
];

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About — Better Kitchen</title>
        <meta name="description" content="Better Kitchen is a functional medicine recipe platform for MCAS, Histamine Intolerance, Hereditary Alpha Tryptasemia, and migraine. Built by Better Kinds." />
      </Head>

      <style jsx>{`
        .hero {
          background: #1e3320;
          padding: 64px 24px 56px;
          text-align: center;
        }
        .hero-eyebrow {
          display: inline-block;
          background: rgba(61,208,104,0.12); border: 1px solid rgba(61,208,104,0.25);
          border-radius: 20px; padding: 5px 16px;
          font-size: 11px; letter-spacing: 3px; color: #3dd068;
          text-transform: uppercase; margin-bottom: 22px; font-weight: 500;
        }
        .hero-title {
          font-size: clamp(32px, 6vw, 52px); font-weight: 800;
          color: #f0ede8; margin-bottom: 16px; letter-spacing: -0.5px; line-height: 1.1;
        }
        .hero-title span { color: #3dd068; }
        .hero-sub {
          font-size: 16px; color: #7aab7a; max-width: 560px;
          margin: 0 auto; line-height: 1.8; font-weight: 300;
        }

        .main { max-width: 800px; margin: 0 auto; padding: 0 24px 100px; }

        .section { margin-top: 64px; }
        .section-label {
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: #3dd068; margin-bottom: 12px; font-weight: 600;
        }
        .section-title {
          font-size: clamp(22px, 4vw, 32px); font-weight: 800;
          color: #1a1a1a; margin-bottom: 16px; line-height: 1.2;
        }
        .section-body {
          font-size: 15px; color: #4b5563; line-height: 1.85;
          margin-bottom: 16px;
        }

        .pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 16px; margin-top: 32px; }
        .pillar {
          background: #fff; border-radius: 16px; padding: 24px 26px;
          border: 1px solid #e8e6e0; border-top: 3px solid #3dd068;
        }
        .pillar-icon { font-size: 24px; margin-bottom: 12px; }
        .pillar-title { font-size: 15px; font-weight: 700; color: #1a1a1a; margin-bottom: 10px; }
        .pillar-body { font-size: 13px; color: #4b5563; line-height: 1.75; }

        .principles {
          background: #fff; border-radius: 16px; padding: 28px 32px;
          border: 1px solid #e8e6e0; margin-top: 32px;
        }
        .principle {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 10px 0; border-bottom: 1px solid #f9fafb;
          font-size: 14px; color: #374151; line-height: 1.5;
        }
        .principle:last-child { border-bottom: none; }
        .principle-dot { color: #3dd068; font-size: 8px; margin-top: 5px; flex-shrink: 0; }

        .bk-card {
          background: #f0faf4; border-radius: 16px; padding: 32px;
          border: 1px solid #bbf7d0; margin-top: 32px;
          display: flex; gap: 24px; align-items: center; flex-wrap: wrap;
        }
        .bk-card-text { flex: 1; min-width: 200px; }
        .bk-card-label {
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: #16a34a; margin-bottom: 8px; font-weight: 600;
        }
        .bk-card-title { font-size: 20px; font-weight: 800; color: #1a1a1a; margin-bottom: 10px; }
        .bk-card-body { font-size: 14px; color: #4b5563; line-height: 1.75; }
        .bk-card-link {
          display: inline-block; margin-top: 16px;
          background: #3dd068; color: #fff; padding: 10px 22px;
          border-radius: 20px; font-size: 13px; font-weight: 600;
          transition: background 0.15s;
        }
        .bk-card-link:hover { background: #2ebd5a; }

        .disclaimer-box {
          margin-top: 64px; padding: 24px 28px;
          background: #fff; border-radius: 14px;
          border: 1px solid #e8e6e0; border-left: 4px solid #f59e0b;
          border-top-left-radius: 0; border-bottom-left-radius: 0;
        }
        .disclaimer-label {
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          color: #d97706; margin-bottom: 10px; font-weight: 600;
        }
        .disclaimer-text { font-size: 13px; color: #6b7280; line-height: 1.8; }

        @media (max-width: 600px) {
          .pillars { grid-template-columns: 1fr; }
          .bk-card { flex-direction: column; }
          .principles { padding: 20px; }
        }
      `}</style>

      {/* HERO */}
      <div className="hero">
        <div className="hero-eyebrow">About</div>
        <h1 className="hero-title">Food as <span>Medicine</span></h1>
        <p className="hero-sub">
          Better Kitchen is a functional medicine recipe platform built for people living with MCAS,
          Histamine Intolerance, Hereditary Alpha Tryptasemia, and migraine.
          Every recipe is annotated with the biochemical markers that matter.
        </p>
      </div>

      <main className="main">

        {/* WHAT IS THIS */}
        <div className="section">
          <div className="section-label">The platform</div>
          <h2 className="section-title">Not just recipes. Clinical context.</h2>
          <p className="section-body">
            Most recipe sites tell you what to cook. Better Kitchen tells you <em>why</em> — down to the molecular level.
            Each dish is designed around specific functional medicine targets: DAO enzyme activity, mast cell
            degranulation pathways, NRF2 activation, inflammatory cytokine suppression, and microbiome support.
          </p>
          <p className="section-body">
            The recipe book grows automatically — one new recipe published daily, generated by AI and grounded
            in functional nutrition science. Every addition follows the same strict MCAS-safe protocol.
          </p>
        </div>

        {/* THE SCIENCE */}
        <div className="section">
          <div className="section-label">The science</div>
          <h2 className="section-title">Six pillars of every recipe</h2>
          <div className="pillars">
            {pillars.map((p, i) => (
              <div key={i} className="pillar">
                <div className="pillar-icon">{p.icon}</div>
                <div className="pillar-title">{p.title}</div>
                <p className="pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRINCIPLES */}
        <div className="section">
          <div className="section-label">Protocol</div>
          <h2 className="section-title">Our non-negotiables</h2>
          <p className="section-body">
            Every single recipe on Better Kitchen is vetted against the same strict MCAS-safe protocol.
            These are the rules that cannot be broken, regardless of taste or convenience.
          </p>
          <div className="principles">
            {principles.map((p, i) => (
              <div key={i} className="principle">
                <span className="principle-dot">◆</span>
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* BETTER KINDS */}
        <div className="section">
          <div className="section-label">The company</div>
          <h2 className="section-title">A Better Kinds product</h2>
          <p className="section-body">
            Better Kitchen is built and maintained by Better Kinds — a company dedicated to building
            products that improve health, clarity, and quality of life. Better Kitchen is our first
            consumer platform in the functional nutrition space.
          </p>
          <div className="bk-card">
            <div className="bk-card-text">
              <div className="bk-card-label">Better Kinds</div>
              <div className="bk-card-title">betterkinds.com</div>
              <p className="bk-card-body">
                Learn more about the company behind Better Kitchen and our broader mission
                to make evidence-based health tools accessible to everyone.
              </p>
              <a href="https://betterkinds.com" target="_blank" rel="noopener noreferrer" className="bk-card-link">
                Visit betterkinds.com →
              </a>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="section" style={{ textAlign: 'center', paddingBottom: '16px' }}>
          <h2 className="section-title">Start cooking</h2>
          <p className="section-body" style={{ maxWidth: 480, margin: '0 auto 24px' }}>
            Browse the full recipe library — filtered by condition, mechanism, or meal type.
            New recipes added every day.
          </p>
          <Link href="/" style={{
            display: 'inline-block', background: '#3dd068', color: '#fff',
            padding: '12px 28px', borderRadius: '24px', fontSize: '14px',
            fontWeight: '600', transition: 'background 0.15s',
          }}>
            Browse all recipes →
          </Link>
        </div>

        {/* DISCLAIMER */}
        <div className="disclaimer-box">
          <div className="disclaimer-label">Medical Disclaimer</div>
          <p className="disclaimer-text">
            Better Kitchen is for informational and educational purposes only. Nothing on this site constitutes
            medical advice, diagnosis, or treatment. Always consult a qualified physician, allergist, or
            registered dietitian before making changes to your diet — especially if you have a diagnosed
            condition such as MCAS, HAT, or histamine intolerance. Individual reactions vary significantly.
          </p>
        </div>

      </main>
    </Layout>
  );
}
