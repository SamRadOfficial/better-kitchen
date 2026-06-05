import Head from 'next/head';
import Link from 'next/link';

export default function BetterKinds() {
  return (
    <>
      <Head>
        <title>Better Kinds — A Better Kind of Company</title>
        <meta
          name="description"
          content="Better Kinds is the parent company behind Better Kitchen. We foster conscious consumption and responsible production — empowering better micro decisions that lead to better macro results."
        />
        <link rel="canonical" href="https://betterkitchen.ai/better-kinds" />
        <meta property="og:title" content="Better Kinds — A Better Kind of Company" />
        <meta property="og:description" content="Conscious consumption. Responsible production. Better micro decisions, better macro results." />
        <meta property="og:type" content="website" />
      </Head>

      <main className="bk-page">
        {/* ── HERO ── */}
        <section className="bk-hero">
          <div className="bk-eyebrow">Better Kinds</div>
          <h1 className="bk-h1">A new kind of company.</h1>
          <div className="bk-taglines">
            <span>Better Products.</span>
            <span>Better Buying Decisions.</span>
            <span>Better You.</span>
          </div>
          <p className="bk-lede">
            Imagine a world with better kinds of everything. Better kinds of products,
            better buying decisions, better working conditions, better environmental
            impacts, better reporting — you name it.
          </p>
        </section>

        {/* ── MISSION ── */}
        <section className="bk-mission">
          <div className="bk-mission-rule" />
          <p className="bk-mission-text">
            We foster everyday practices of conscious consumption and responsible
            production by empowering people to make better micro decisions that lead to
            better macro results.
          </p>
        </section>

        {/* ── THE THREE PILLARS ── */}
        <section className="bk-pillars">
          <div className="bk-pillar">
            <div className="bk-pillar-num">01</div>
            <h3 className="bk-pillar-title">Better Products</h3>
            <p className="bk-pillar-body">
              We build and back products made the right way — with honest ingredients,
              responsible production, and transparency about what goes into them and why.
            </p>
          </div>
          <div className="bk-pillar">
            <div className="bk-pillar-num">02</div>
            <h3 className="bk-pillar-title">Better Buying Decisions</h3>
            <p className="bk-pillar-body">
              Every purchase is a vote. We help people make conscious choices with clear
              information, so the small decisions of daily life add up to something better.
            </p>
          </div>
          <div className="bk-pillar">
            <div className="bk-pillar-num">03</div>
            <h3 className="bk-pillar-title">Better You</h3>
            <p className="bk-pillar-body">
              Better choices compound. Better for your health, your home, and the world
              you buy into — micro decisions that lead to better macro results.
            </p>
          </div>
        </section>

        {/* ── STANDARD FOR BETTER BUSINESS (reworded from BBB to avoid trademark) ── */}
        <section className="bk-standard">
          <h2 className="bk-h2">A standard for better business</h2>
          <p className="bk-standard-body">
            Better Kinds exists to champion businesses doing it right — those that treat
            their people well, tread lightly on the planet, and report honestly on both.
            We bring these businesses together under one roof and hold our own products to
            the same standard we look for in others.
          </p>
          {/* TODO (Sam): replace with your real positioning — is Better Kinds a directory,
              a certification, an investor, a holding co? The line above is a safe
              placeholder until you decide the exact role. */}
        </section>

        {/* ── PORTFOLIO ── */}
        <section className="bk-portfolio">
          <h2 className="bk-h2">Our companies</h2>
          <div className="bk-portfolio-grid">
            <Link href="/" className="bk-card">
              <div className="bk-card-tag">Functional nutrition</div>
              <div className="bk-card-name">Better Kitchen</div>
              <p className="bk-card-desc">
                Food as medicine. A growing library of recipes for MCAS, histamine
                intolerance, and sensitive systems — every one safety-first.
              </p>
              <span className="bk-card-link">Visit Better Kitchen →</span>
            </Link>

            <div className="bk-card bk-card-soon">
              <div className="bk-card-tag">Coming soon</div>
              <div className="bk-card-name">More better kinds</div>
              <p className="bk-card-desc">
                New ventures, built on the same belief: better products, better decisions,
                better outcomes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .bk-page { max-width: 920px; margin: 0 auto; padding: 0 24px 80px; }

        .bk-hero { padding: 64px 0 8px; }
        .bk-eyebrow {
          font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
          color: #16a34a; font-weight: 600; margin-bottom: 18px;
        }
        .bk-h1 {
          font-size: 52px; line-height: 1.05; font-weight: 600;
          color: #1f2430; margin: 0 0 24px; letter-spacing: -1px;
        }
        .bk-taglines {
          display: flex; flex-wrap: wrap; gap: 10px 22px; margin-bottom: 30px;
        }
        .bk-taglines span {
          font-size: 17px; font-weight: 600; color: #3dd068;
        }
        .bk-lede {
          font-size: 20px; line-height: 1.6; color: #4a4f5c; max-width: 720px; margin: 0;
        }

        .bk-mission { padding: 48px 0 8px; display: flex; gap: 24px; align-items: flex-start; }
        .bk-mission-rule {
          width: 4px; align-self: stretch; min-height: 80px;
          background: #3dd068; border-radius: 4px; flex-shrink: 0;
        }
        .bk-mission-text {
          font-size: 24px; line-height: 1.5; color: #2b303b; font-weight: 500; margin: 0;
        }

        .bk-pillars {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
          padding: 56px 0;
        }
        .bk-pillar-num {
          font-size: 13px; font-weight: 700; color: #3dd068; margin-bottom: 12px;
          letter-spacing: 1px;
        }
        .bk-pillar-title {
          font-size: 19px; font-weight: 600; color: #1f2430; margin: 0 0 10px;
        }
        .bk-pillar-body {
          font-size: 15px; line-height: 1.65; color: #5f6470; margin: 0;
        }

        .bk-standard {
          background: #f0faf4; border-radius: 20px; padding: 44px 40px; margin: 16px 0 56px;
        }
        .bk-h2 {
          font-size: 30px; font-weight: 600; color: #1f2430; margin: 0 0 18px;
          letter-spacing: -0.5px;
        }
        .bk-standard-body {
          font-size: 18px; line-height: 1.6; color: #41663f; margin: 0; max-width: 760px;
        }

        .bk-portfolio { padding-top: 8px; }
        .bk-portfolio-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 24px;
        }
        .bk-card {
          display: block; background: #fff; border: 1px solid #e4e1d9;
          border-radius: 18px; padding: 28px 26px; text-decoration: none;
          transition: transform 0.2s, border-color 0.2s; color: inherit;
        }
        .bk-card:hover { transform: translateY(-3px); border-color: #3dd068; }
        .bk-card-soon { background: #faf9f6; }
        .bk-card-soon:hover { transform: none; border-color: #e4e1d9; }
        .bk-card-tag {
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
          color: #16a34a; font-weight: 600; margin-bottom: 12px;
        }
        .bk-card-soon .bk-card-tag { color: #a8a59c; }
        .bk-card-name {
          font-size: 24px; font-weight: 600; color: #1f2430; margin-bottom: 12px;
        }
        .bk-card-desc {
          font-size: 15px; line-height: 1.6; color: #5f6470; margin: 0 0 18px;
        }
        .bk-card-link { font-size: 15px; font-weight: 600; color: #16a34a; }

        @media (max-width: 720px) {
          .bk-h1 { font-size: 38px; }
          .bk-pillars { grid-template-columns: 1fr; gap: 32px; padding: 40px 0; }
          .bk-portfolio-grid { grid-template-columns: 1fr; }
          .bk-mission-text { font-size: 20px; }
          .bk-standard { padding: 32px 24px; }
        }
      `}</style>
    </>
  );
}
