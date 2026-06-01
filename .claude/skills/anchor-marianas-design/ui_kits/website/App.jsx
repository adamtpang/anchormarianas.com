/* App.jsx: composes the kit. Theme + route state. */

const SITE = {
  studioName: "Anchor Marianas",
  tagline: "we ship.",
  email: "adam@anchormarianas.com",
  origin: "11°22′N 142°35′E · Guam",
  socials: {
    x: "https://x.com/adamtpang",
    github: "https://github.com/adamtpang",
  },
};

const BOOK_URL = "https://cal.com/adampang/discovery";

const TRUST_PARTNERS = [
  { kind: "logo", name: "Hilton Guam Resort & Spa", src: "../../assets/partners/hilton-guam.png" },
  { kind: "word", name: "Network School" },
  { kind: "word", name: "IDI", bold: true },
  { kind: "word", name: "adapt.school" },
];

// Hilton case study: fill in real engagement specifics when the writeup ships.
const CASE_STUDIES = [
  {
    logoSrc: "../../assets/partners/hilton-guam.png",
    clientName: "Hilton Guam Resort & Spa",
    industry: "Hospitality · Guam",
    status: "Live",
    timeline: "5-day build",
    knot: "Placeholder: the recurring loop we found on the untangling call, in plain words.",
    cure: "Placeholder: the smallest version of the AI build that actually quieted the loop.",
    afterRead: "Placeholder: what shipped, what we'd do differently, whether the loop is quieter now.",
    href: "#case-hilton",
  },
];

const CHOVIN_TESTIMONIAL = {
  quote: "was great making stuff with @adampang. master vibe coder before it was even a thing and can crank out a MERN app unassisted when needed.",
  author: "chovin",
  context: "warm intro to Hilton Guam · 2025-06-17",
  source: "@chovin on X",
};

function App() {
  const [theme, setTheme] = React.useState("dark");
  const [route, setRoute] = React.useState("home");

  React.useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [route]);

  const navigate = (next) => setRoute(next);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="shell" key={route}>
      <Header
        active={route}
        onNavigate={navigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        bookUrl={BOOK_URL}
      />
      <main>
        {route === "home" && (
          <React.Fragment>
            <Hero bookUrl={BOOK_URL} onSeeWork={() => navigate("work")} />
            <TrustStrip eyebrow="Already building for" partners={TRUST_PARTNERS} />
            <OfferSection />
            <SprintRun />
            <CaseStudiesSection
              cases={CASE_STUDIES}
              bookUrl={BOOK_URL}
              onSeeWork={() => navigate("work")}
            />
            <Testimonial {...CHOVIN_TESTIMONIAL} />
            <Audience />
            <FinalCTA bookUrl={BOOK_URL} />
          </React.Fragment>
        )}
        {route === "about" && (
          <AboutView site={SITE} onNavigate={navigate} bookUrl={BOOK_URL} />
        )}
        {route === "work" && (
          <WorkView
            onNavigate={navigate}
            bookUrl={BOOK_URL}
            cases={CASE_STUDIES}
          />
        )}
      </main>
      <Footer site={SITE} onNavigate={navigate} />
    </div>
  );
}

/* Tiny inline component: home-page case studies block.
   On Work view we render the full grid; this gives one teaser on home. */
function CaseStudiesSection({ cases, bookUrl, onSeeWork }) {
  return (
    <section className="am-section alt" data-screen-label="case-studies">
      <div className="prose-narrow">
        <p className="eyebrow">Case studies</p>
        {cases.length === 0 ? null : (
          cases.map((c) => <CaseStudyCard key={c.clientName} {...c} onClick={onSeeWork} />)
        )}
        <p className="small" style={{ marginTop: "2rem" }}>
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); onSeeWork(); }}
            style={{ textDecoration: "underline", textUnderlineOffset: "4px", color: "var(--fg)" }}
          >
            See all work →
          </a>
        </p>
      </div>
    </section>
  );
}

window.App = App;
window.CaseStudiesSection = CaseStudiesSection;
