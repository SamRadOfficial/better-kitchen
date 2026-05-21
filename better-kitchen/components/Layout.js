import Link from 'next/link';
import { useRouter } from 'next/router';

const BKMark = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="1" y="1" width="14" height="14" rx="4" fill="#3dd068" />
    <rect x="1" y="19" width="14" height="14" rx="4" fill="#3dd068" />
    <path d="M18 2 L33 17 L18 32" stroke="#454a5e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export default function Layout({ children }) {
  const router = useRouter();

  return (
    <>
      {/* ── NAV ── */}
      <nav className="nav">
        <Link href="/" className="nav-logo" aria-label="Better Kitchen home">
          <BKMark size={34} />
          <div className="nav-wordmark">
            <span className="nav-better">better</span>
            <span className="nav-kitchen">kitchen</span>
          </div>
        </Link>
        <div className="nav-links">
          <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>Recipes</Link>
          <Link href="/about" className={`nav-link ${router.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <a href="https://betterkinds.com" target="_blank" rel="noopener noreferrer" className="nav-link">Better Kinds</a>
          <a href="https://betterkitchen.ai" className="nav-cta">betterkitchen.ai</a>
        </div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      {children}

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <BKMark size={28} />
            <div className="footer-brand-name">
              <span className="footer-brand-better">better</span>
              <span className="footer-brand-kitchen">kitchen</span>
            </div>
          </div>
          <div className="footer-tagline">Food as Medicine</div>
          <div className="footer-byline">
            A <a href="https://betterkinds.com" target="_blank" rel="noopener noreferrer">Better Kinds</a> product
          </div>
        </div>

        <div>
          <div className="footer-col-title">Navigate</div>
          <Link href="/" className="footer-col-link">Recipes</Link>
          <Link href="/about" className="footer-col-link">About</Link>
          <a href="https://betterkinds.com" target="_blank" rel="noopener noreferrer" className="footer-col-link">Better Kinds</a>
        </div>

        <div>
          <div className="footer-col-title">Conditions</div>
          <span className="footer-col-link" style={{ cursor: 'default' }}>MCAS</span>
          <span className="footer-col-link" style={{ cursor: 'default' }}>Histamine Intolerance</span>
          <span className="footer-col-link" style={{ cursor: 'default' }}>Hereditary Alpha Tryptasemia</span>
          <span className="footer-col-link" style={{ cursor: 'default' }}>Migraine</span>
          <span className="footer-col-link" style={{ cursor: 'default' }}>Systemic Inflammation</span>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">© {new Date().getFullYear()} Better Kinds. All rights reserved.</div>
          <div className="footer-disclaimer">
            Better Kitchen is a functional nutrition resource, not medical advice. Always work with your physician or allergist for personalised care. Not a substitute for professional medical treatment.
          </div>
        </div>
      </footer>
    </>
  );
}
