/* ShowRunner — landing page */

const { useState, useEffect, useMemo, useRef } = React;

// ---- TWEAK DEFAULTS (host-rewritable) ----
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "paper-oxblood",
  "displayFont": "newsreader",
  "uiFont": "inter-tight",
  "density": "default",
  "billing": "monthly",
  "showSeoAddon": true
}/*EDITMODE-END*/;

const FONT_STACKS = {
  display: {
    "newsreader": '"Newsreader", "Spectral", Georgia, serif',
    "fraunces": '"Fraunces", "Spectral", Georgia, serif',
    "spectral": '"Spectral", Georgia, serif',
    "playfair": '"Playfair Display", Georgia, serif',
    "ibm-plex-serif": '"IBM Plex Serif", Georgia, serif'
  },
  ui: {
    "inter-tight": '"Inter Tight", Inter, system-ui, sans-serif',
    "inter": 'Inter, system-ui, sans-serif',
    "ibm-plex-sans": '"IBM Plex Sans", system-ui, sans-serif',
    "geist": '"Geist", system-ui, sans-serif',
    "space-grotesk": '"Space Grotesk", system-ui, sans-serif'
  }
};

// ---------- helpers ----------
function fmtPrice(n) { return "$" + n.toLocaleString("en-US"); }

// ---------- SECTIONS ----------

function Nav({ onPlans, onContact }) {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#top">
          <span>ShowRunner</span>
          <span className="dot" />
        </a>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <a href="#plans">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#cta">Contact</a>
        </div>
        <div className="nav-cta">
          <a href="#plans" className="btn btn-link" style={{fontSize: 13}}>See pricing</a>
          <a href="#cta" className="btn btn-primary" style={{padding: "10px 16px", fontSize: 13}}>
            Start free trial <span className="arr">→</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow"><span className="num">01</span><span>Full-service podcast production</span></div>
            <h1 className="h-display" style={{marginTop: 28}}>
              Your podcast,<br/>
              <span className="italic-accent">produced.</span>
            </h1>
            <p className="lede hero-sub">
              Hand us the raw recording. We return a finished episode, three vertical clips,
              show notes that rank, and a publish-ready feed — every week, on schedule, without you opening a timeline.
            </p>
            <div className="hero-ctas">
              <a href="#cta" className="btn btn-primary">Start free trial <span className="arr">→</span></a>
              <a href="#plans" className="btn btn-ghost">See pricing</a>
            </div>
          </div>
          <div className="hero-meta">
            <div>
              <div className="label">For founders, operators<br/>& busy hosts</div>
            </div>
            <div>
              <strong>5-day turnaround</strong> from raw file to published episode, captioned clips, and SEO-tuned notes.
            </div>
            <div>
              No long contract. <strong>Cancel any month</strong> with 14 days notice.
            </div>
          </div>
        </div>

        <div className="filmstrip">
          <span>Edit · Mix · Master</span>
          <span className="dotsep">●</span>
          <span>Captioned vertical clips</span>
          <span className="dotsep">●</span>
          <span>SEO show notes</span>
          <span className="dotsep">●</span>
          <span>Publish to all platforms</span>
          <span className="dotsep">●</span>
          <span style={{color: "var(--accent)"}}>Est. 2024</span>
        </div>
      </div>
    </section>
  );
}

function Pain() {
  const items = [
    {
      n: "i.",
      title: "Sundays disappear into the timeline.",
      body: "You meant to spend the weekend with your kid. Instead it's 11pm and you're nudging an um three frames left.",
      quiet: "Sound familiar."
    },
    {
      n: "ii.",
      title: "The clips never quite ship.",
      body: "There's a folder somewhere called \"clips_v2_FINAL.\" It has been there since March. The good moments are buried in 90-minute files no one will rewatch.",
      quiet: "We know."
    },
    {
      n: "iii.",
      title: "Search ranks zero.",
      body: "\"Five takeaways from episode 14\" lives in your head. It does not live on Google. The episode is great. The page is empty.",
      quiet: "Been there."
    }
  ];
  return (
    <section className="section" id="pain">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="num">02</span><span>Why hosts hire us</span></div>
          </div>
          <h2 className="h-display">
            You started a show because you had something to say. <span className="italic-accent">Not to learn Adobe Audition.</span>
          </h2>
        </div>

        <div className="pain-grid">
          {items.map((it, i) => (
            <div key={i} className="item">
              <div className="num">{it.n}</div>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
              <div className="quiet">— {it.quiet}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "You record.",
      body: "Riverside, Zoom, your phone in a closet — it's fine. Drop the raw file in your folder. That's the whole ask.",
      chips: ["Any DAW", "Remote-friendly", "Local backup"]
    },
    {
      n: "02",
      title: "We produce.",
      body: "Edit, level, de-noise, music, sound design. A senior editor and a producer touch every episode. Approval round before it ships.",
      chips: ["Senior editor", "Producer review", "1 revision round"]
    },
    {
      n: "03",
      title: "We publish, clip & rank.",
      body: "Out to Spotify, Apple, YouTube. Three captioned vertical clips. Show notes written for search, not for you.",
      chips: ["RSS + YouTube", "3× clips", "Show notes & chapters"]
    }
  ];
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="num">03</span><span>How it works</span></div>
          </div>
          <h2 className="h-display">
            Three steps. <span className="italic-accent">You only do the first one.</span>
          </h2>
        </div>

        <div className="steps">
          {steps.map((s, i) => (
            <div key={i} className="step">
              <div className="step-num">{s.n}<sup>•</sup></div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="deliverables">
                {s.chips.map(c => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Plans({ billing, setBilling, showSeoAddon }) {
  const [pillRect, setPillRect] = useState({ left: 6, width: 96 });
  const billRef = useRef(null);

  useEffect(() => {
    if (!billRef.current) return;
    const active = billRef.current.querySelector("button.active");
    if (!active) return;
    const parent = billRef.current.getBoundingClientRect();
    const r = active.getBoundingClientRect();
    setPillRect({ left: r.left - parent.left, width: r.width });
  }, [billing]);

  const annual = billing === "annual";
  const mult = annual ? 0.9 : 1;

  const plans = [
    {
      name: "Starter",
      tag: "One polished episode a week. The basics, done right.",
      monthly: 1500,
      features: [
        "1 episode per week, fully produced",
        "Edit, mix, master, music & sound design",
        "Captioned video version",
        "1 vertical clip per episode",
        "Show notes & timestamped chapters",
        "Publishing to Spotify, Apple & YouTube",
        "Slack / email support, 1 business day"
      ],
      cta: "Start with Starter"
    },
    {
      name: "Pro",
      tag: "For shows that need throughput, polish, and a producer in the loop.",
      monthly: 2500,
      features: [
        "Up to 4 episodes per month, fully produced",
        "Everything in Starter, plus —",
        "Dedicated producer & senior editor",
        "3 vertical clips per episode + 1 horizontal",
        "Custom intro / outro & sound design pass",
        "Guest research briefs (1 per episode)",
        "Same-week turnaround, priority queue"
      ],
      cta: "Talk about Pro"
    },
    {
      name: "SEO add-on",
      tag: "Bolt onto Starter or Pro. Get found, not just heard.",
      monthly: 500,
      features: [
        "Long-form SEO article per episode (900–1,200 words)",
        "Keyword research & topic mapping",
        "On-page schema & internal linking",
        "Quote graphics for social",
        "Newsletter-ready summary",
        "Monthly ranking & traffic report"
      ],
      cta: "Add SEO",
      addon: true
    }
  ];

  return (
    <section className="section" id="plans">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="num">04</span><span>Plans</span></div>
          </div>
          <div>
            <h2 className="h-display">
              Flat monthly. <span className="italic-accent">No setup fees, no per-minute math.</span>
            </h2>
            <div style={{display: "flex", alignItems: "center", gap: 16, marginTop: 28, flexWrap: "wrap"}}>
              <div className="billing" ref={billRef}>
                <div className="pill" style={{left: pillRect.left, width: pillRect.width}} />
                <button className={billing === "monthly" ? "active" : ""} onClick={() => setBilling("monthly")}>Monthly</button>
                <button className={billing === "annual" ? "active" : ""} onClick={() => setBilling("annual")}>Annual prepay</button>
              </div>
              <span className="savings">Save 10% on annual</span>
            </div>
          </div>
        </div>

        <div className="plans">
          {plans.filter(p => !p.addon || showSeoAddon).map((p, i) => {
            const price = Math.round(p.monthly * mult);
            const struck = annual && !p.addon ? p.monthly : null;
            return (
              <div key={p.name} className="plan">
                <div className="plan-head">
                  <div className="plan-name">{p.name}</div>
                  <div className="plan-tag">{p.tag}</div>
                </div>
                <div className="plan-price">
                  {struck && <span className="strike">{fmtPrice(struck)}</span>}
                  <span className="amount">{fmtPrice(price)}</span>
                  <span className="period">/ month{annual && !p.addon ? ", billed yearly" : ""}</span>
                </div>
                <ul className="plan-features">
                  {p.features.map(f => <li key={f}>{f}</li>)}
                </ul>
                <a href="#cta" className={p.addon ? "btn btn-ghost" : "btn btn-primary"}>
                  {p.cta} <span className="arr">→</span>
                </a>
              </div>
            );
          })}
        </div>

        <div className="addon-note">
          <span>Note —</span> SEO add-on stacks on Starter or Pro. Annual prepay applies to base plans only.
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { num: "4.2", unit: "M", label: "Downloads produced", detail: "Across client shows since 2024." },
    { num: "1,800", unit: "+", label: "Hours edited", detail: "By senior editors, never automated." },
    { num: "98", unit: "%", label: "On-time delivery", detail: "Five-day turnaround, every week." },
    { num: "27", unit: "", label: "Active shows", detail: "Founder podcasts, B2B, narrative." }
  ];
  return (
    <section className="stats" id="proof">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="num">05</span><span>By the numbers</span></div>
          </div>
          <h2 className="h-display">
            Receipts. <span className="italic-accent">Not testimonials.</span>
          </h2>
        </div>
        <p className="lede" style={{maxWidth: "60ch"}}>
          We're particular about who we take on, so the roster stays small. Here's what the work has added up to.
        </p>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <div className="stat-num">{s.num}<span className="unit">{s.unit}</span></div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-detail">{s.detail}</div>
            </div>
          ))}
        </div>

        <div className="placeholder-row">
          <span>As heard on</span>
          {[1,2,3,4,5].map(i => <div key={i} className="logo-slot">LOGO {i}</div>)}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qs = [
    {
      q: "What's the actual turnaround from raw file to published episode?",
      a: "Five business days on Starter, three on Pro. Hand off Monday, ship Friday — clips, notes, the lot. We also do same-day rushes for an extra fee, but it's rare you'll need it once we're in rhythm."
    },
    {
      q: "How many episodes do I get per month?",
      a: "Starter is up to 4 episodes a month (one per week). Pro is up to 4 fully produced episodes a month with priority queue and a dedicated producer. If you publish more frequently, we'll quote a custom plan — most shows don't actually need to."
    },
    {
      q: "What if my audio is bad? Echo, hum, a guest on AirPods, a dog?",
      a: "Honestly, fine. Our editors run a multi-pass cleanup — broadband noise, clipping, room reverb, plosives — and we have a list of co-host habits we silently fix forever (lip smacks, breath gates, that one cough). If audio is genuinely unsalvageable we'll tell you straight, but in two years that's happened twice."
    },
    {
      q: "Is there a contract or minimum term?",
      a: "Month-to-month by default. The annual prepay is opt-in for the 10% discount. We don't do 12-month lockups — if it's not working, you should be able to leave."
    },
    {
      q: "How does cancellation work?",
      a: "14 days written notice. We finish the episodes already in flight, hand back source files and project archives, and that's it. No claw-backs, no surprise off-boarding fees."
    }
  ];
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="num">06</span><span>Questions</span></div>
          </div>
          <h2 className="h-display">
            Things you're <span className="italic-accent">probably wondering.</span>
          </h2>
        </div>

        <div className="faq">
          {qs.map((it, i) => (
            <details key={i} open={i === 0}>
              <summary>
                <span className="q-num">Q.{String(i+1).padStart(2, "0")}</span>
                <span className="q-text">{it.q}</span>
                <span className="q-icon" aria-hidden="true" />
              </summary>
              <div className="answer">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- email/stripe form ----
function EmailStripeForm() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("starter");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      // Send email to Stripe/payment handler
      // Replace with actual Stripe or email service integration
      await new Promise(r => setTimeout(r, 1000)); // simulate request
      setSubmitted(true);
      setTimeout(() => setEmail(""), 2000);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="email-form">
        <div className="form-success">
          <div className="success-icon">✓</div>
          <div className="success-message">
            <strong>Thanks!</strong><br/>
            Check your email for next steps.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="email-form">
      <div className="form-head">
        <div className="title">Get started</div>
        <div className="subtitle">We'll send you a link to set up your account and choose a plan.</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !email}
          className="form-submit"
        >
          {loading ? "Sending..." : "Send setup link"} <span className="arr">→</span>
        </button>
      </form>
      <div className="form-note">
        <span>No credit card required. Start with a 2-week trial.</span>
      </div>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="cta-final" id="cta">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow"><span className="num">07</span><span>Get started</span></div>
          </div>
          <div />
        </div>

        <div className="cta-final-grid">
          <div className="copy">
            <h2 className="h-display">
              Stop editing.<br/>
              <span className="italic-accent">Start shipping.</span>
            </h2>
            <p className="lede" style={{maxWidth: "44ch"}}>
              Get your account set up, choose a plan, and start with a 2-week free trial. First episode lands within a week.
            </p>
            <div className="meta">
              <span>No setup fee</span>
              <span>Cancel anytime</span>
              <span>First episode in 7 days</span>
            </div>
          </div>
          <EmailStripeForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <div>
          <div className="brand" style={{marginBottom: 12}}>
            <span>ShowRunner</span><span className="dot" />
          </div>
          <div>Full-service podcast production.<br/>Brooklyn · Remote.</div>
          <div style={{marginTop: 24, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase"}}>
            © 2026 ShowRunner Studio LLC
          </div>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <span className="head">Studio</span>
            <a href="#how">How it works</a>
            <a href="#plans">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="foot-col">
            <span className="head">Contact</span>
            <a href="#cta">Book a call</a>
            <a href="mailto:hello@showrunner.fm">hello@showrunner.fm</a>
            <a href="#">@showrunner.fm</a>
          </div>
          <div className="foot-col">
            <span className="head">Legal</span>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------- TWEAKS ----------
function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel>
      <TweakSection title="Theme">
        <TweakSelect
          label="Palette"
          value={tweaks.theme}
          onChange={v => setTweak("theme", v)}
          options={[
            { value: "paper-oxblood", label: "Paper · Oxblood (default)" },
            { value: "bone-deepblue", label: "Bone · Deep blue" },
            { value: "cream-forest", label: "Cream · Forest" },
            { value: "charcoal-amber", label: "Charcoal · Amber (dark)" }
          ]}
        />
      </TweakSection>

      <TweakSection title="Typography">
        <TweakSelect
          label="Display serif"
          value={tweaks.displayFont}
          onChange={v => setTweak("displayFont", v)}
          options={[
            { value: "newsreader", label: "Newsreader" },
            { value: "fraunces", label: "Fraunces" },
            { value: "spectral", label: "Spectral" },
            { value: "playfair", label: "Playfair Display" },
            { value: "ibm-plex-serif", label: "IBM Plex Serif" }
          ]}
        />
        <TweakSelect
          label="UI sans"
          value={tweaks.uiFont}
          onChange={v => setTweak("uiFont", v)}
          options={[
            { value: "inter-tight", label: "Inter Tight" },
            { value: "inter", label: "Inter" },
            { value: "ibm-plex-sans", label: "IBM Plex Sans" },
            { value: "geist", label: "Geist" },
            { value: "space-grotesk", label: "Space Grotesk" }
          ]}
        />
      </TweakSection>

      <TweakSection title="Layout">
        <TweakRadio
          label="Density"
          value={tweaks.density}
          onChange={v => setTweak("density", v)}
          options={[
            { value: "default", label: "Default" },
            { value: "cozy", label: "Cozy" },
            { value: "dense", label: "Dense" }
          ]}
        />
      </TweakSection>

      <TweakSection title="Pricing">
        <TweakRadio
          label="Billing"
          value={tweaks.billing}
          onChange={v => setTweak("billing", v)}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual −10%" }
          ]}
        />
        <TweakToggle
          label="Show SEO add-on plan"
          value={tweaks.showSeoAddon}
          onChange={v => setTweak("showSeoAddon", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- APP ----------
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply theme + density to document
  useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme;
    document.documentElement.dataset.density = tweaks.density;
    document.documentElement.style.setProperty("--display", FONT_STACKS.display[tweaks.displayFont]);
    document.documentElement.style.setProperty("--ui", FONT_STACKS.ui[tweaks.uiFont]);
  }, [tweaks.theme, tweaks.density, tweaks.displayFont, tweaks.uiFont]);

  return (
    <>
      <Nav />
      <Hero />
      <Pain />
      <HowItWorks />
      <Plans
        billing={tweaks.billing}
        setBilling={v => setTweak("billing", v)}
        showSeoAddon={tweaks.showSeoAddon}
      />
      <Stats />
      <FAQ />
      <FinalCTA />
      <Footer />
      <Tweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
