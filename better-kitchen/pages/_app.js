import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1e3320" />
      </Head>
      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background: #f7f6f3;
          color: #1a1a1a;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; }
        img { max-width: 100%; }

        /* ── NAV ── */
        .nav {
          background: #fff;
          border-bottom: 1px solid #e8e6e0;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 58px;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
        }
        .nav-wordmark { display: flex; flex-direction: column; line-height: 1.1; }
        .nav-better { font-size: 13px; font-weight: 800; color: #3dd068; letter-spacing: 0.2px; }
        .nav-kitchen { font-size: 13px; font-weight: 800; color: #454a5e; letter-spacing: 0.2px; }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-link {
          font-size: 13px; color: #6b7280; font-weight: 400;
          transition: color 0.15s; text-decoration: none;
        }
        .nav-link:hover { color: #1a1a1a; }
        .nav-link.active { color: #3dd068; font-weight: 500; }
        .nav-cta {
          background: #3dd068; color: #fff;
          font-size: 12px; font-weight: 600;
          padding: 8px 18px; border-radius: 20px;
          letter-spacing: 0.3px; transition: background 0.15s;
        }
        .nav-cta:hover { background: #2ebd5a; }

        /* ── FOOTER ── */
        .site-footer {
          border-top: 1px solid #e8e6e0;
          padding: 40px 32px 32px;
          background: #fff;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
          align-items: start;
        }
        .footer-brand {}
        .footer-logo-row {
          display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
        }
        .footer-brand-name { font-size: 18px; font-weight: 800; }
        .footer-brand-better { color: #3dd068; }
        .footer-brand-kitchen { color: #454a5e; }
        .footer-tagline {
          font-size: 12px; color: #9ca3af; letter-spacing: 1.5px;
          text-transform: uppercase; margin-bottom: 8px;
        }
        .footer-byline { font-size: 12px; color: #d1d5db; }
        .footer-byline a {
          color: #9ca3af; border-bottom: 1px solid #e5e7eb;
          transition: color 0.15s;
        }
        .footer-byline a:hover { color: #454a5e; }

        .footer-col-title {
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #9ca3af; margin-bottom: 14px;
        }
        .footer-col-link {
          display: block; font-size: 13px; color: #6b7280;
          margin-bottom: 10px; transition: color 0.15s;
        }
        .footer-col-link:hover { color: #1a1a1a; }
        .footer-bottom {
          border-top: 1px solid #f3f4f6;
          margin-top: 32px; padding-top: 20px;
          grid-column: 1 / -1;
          display: flex; justify-content: space-between; align-items: center;
        }
        .footer-legal { font-size: 11px; color: #d1d5db; }
        .footer-disclaimer {
          font-size: 11px; color: #d1d5db; max-width: 480px; text-align: right; line-height: 1.6;
        }

        @media (max-width: 680px) {
          .nav { padding: 0 16px; }
          .nav-links .nav-link { display: none; }
          .site-footer { grid-template-columns: 1fr; padding: 28px 20px; }
          .footer-disclaimer { text-align: left; max-width: 100%; }
          .footer-bottom { flex-direction: column; gap: 10px; align-items: flex-start; }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
