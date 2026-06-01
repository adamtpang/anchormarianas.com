/* Footer.jsx: single hairline footer with brand + nav + socials. */
const FooterIcons = {
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753c-.002-.249 1.51-2.772 1.818-4.013Z" />
    </svg>
  ),
  Github: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
};

function Footer({ site, onNavigate }) {
  return (
    <footer className="am-footer" data-screen-label="footer">
      <div className="container">
        <div className="wrap">
          <div className="col-brand">
            <b>Anchor Marianas</b>
            <p>5-day AI builds for founders, creators, and operators whose work we respect.</p>
            <p className="note">
              Operated by{" "}
              <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>Adam Pang</a>
              . A nod to{" "}
              <a href="https://optimism.fun" target="_blank" rel="noopener noreferrer">optimism.fun</a>.
            </p>
            <p className="coord" style={{ marginTop: "0.5rem" }}>{site.origin}</p>
          </div>
          <div className="links">
            <a href="#work" onClick={(e) => { e.preventDefault(); onNavigate("work"); }}>Work</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate("about"); }}>About</a>
            <a href={site.socials.x} target="_blank" rel="noopener noreferrer"><FooterIcons.Twitter /> X</a>
            <a href={site.socials.github} target="_blank" rel="noopener noreferrer"><FooterIcons.Github /> GitHub</a>
            <a href={`mailto:${site.email}`}><FooterIcons.Mail /> {site.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
