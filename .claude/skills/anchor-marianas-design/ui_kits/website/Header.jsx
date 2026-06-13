/* Header.jsx: sticky blurred header. wordmark + nav + book CTA + theme toggle. */
function Header({ active, onNavigate, theme, onToggleTheme, bookUrl }) {
  return (
    <header className="am-header">
      <div className="container">
        <div className="bar">
          <a
            href="#home"
            className="brand"
            onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
            aria-label="Anchor Marianas: home"
          >
            <img src="../../assets/logo-anchor.png" alt="" />
            <b>Anchor Marianas</b>
          </a>

          <nav>
            <a
              href="#work"
              className={active === "work" ? "active" : ""}
              onClick={(e) => { e.preventDefault(); onNavigate("work"); }}
            >Work</a>
            <a
              href="#about"
              className={active === "about" ? "active" : ""}
              onClick={(e) => { e.preventDefault(); onNavigate("about"); }}
            >About</a>
            <button
              type="button"
              className="theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={onToggleTheme}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? (
                /* sun */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                /* moon */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              )}
            </button>
            <a className="cta" href={bookUrl} target="_blank" rel="noopener noreferrer">Book the call</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
