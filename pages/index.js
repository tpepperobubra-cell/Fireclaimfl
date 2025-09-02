import React, { useState, useEffect, useMemo } from "react";
import { Phone, Home, Users2, Building2, ShieldCheck, Star, MapPin, CheckCircle2, FileText, BookOpen, HelpCircle, MessageCircle } from "lucide-react";
import './styles.css';

// ====== Business Constants ======
const BRAND = "FireClaimsFL";
const PHONE_DISPLAY = "(407) 555-0199";
const PHONE_TEL = "+14075550199";
const EMAIL = "rmack@placlaim.com";
const ADDRESS = "123 Market St, Orlando, FL 32801";
const LICENSE = "FL Public Adjuster License # A161638";

const NAV = [
  { label: "How We Help", href: "#how-we-help" },
  { label: "Homeowners", href: "#homeowners" },
  { label: "Renters", href: "#renters" },
  { label: "Landlords", href: "#landlords" },
  { label: "Resources", href: "#resources" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

// ====== Header ======
const Header = ({ open, onToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{ boxShadow: scrolled ? "0 2px 6px rgba(0,0,0,0.1)" : "none" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <a href="#home" className="logo"><ShieldCheck /> {BRAND}</a>
        <nav className="desktop-nav" style={{ display: "flex", gap: "1rem" }}>
          {NAV.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="desktop-actions" style={{ display: "flex", gap: "0.5rem" }}>
          <a href={`tel:${PHONE_TEL}`} className="button-ghost"><Phone /> {PHONE_DISPLAY}</a>
          <a href="#contact" className="button-primary">Free Claim Review</a>
        </div>
      </div>
    </header>
  );
};

// ====== Hero ======
const Hero = () => (
  <section className="hero">
    <h1>Your Fire Claim, Fought & Paid — Fast.</h1>
    <p>Insurance will try to underpay. We make sure you recover every dollar.</p>
    <a href="#contact" className="button-primary">Get Help Now</a>
  </section>
);

// ====== Step Card ======
const Step = ({ num, title, text }) => (
  <div className="card">
    <div style={{ fontWeight: "bold", fontSize: "1rem", marginBottom: "0.5rem" }}>{num}. {title}</div>
    <p>{text}</p>
  </div>
);

const Process = () => (
  <section className="section" id="how-we-help">
    <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>We Simplify the Claim Process</h2>
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Step num="1" title="Free Claim Review" text="We listen, gather facts, and outline next steps within minutes."/>
      <Step num="2" title="Document & Inspect" text="Full scope: structural, smoke, soot, odor, and ALE protections."/>
      <Step num="3" title="Negotiate Carrier" text="We handle adjusters and vendors so you don't have to."/>
      <Step num="4" title="You Get Paid" text="Settlement you deserve — hotel, contents, and repairs covered."/>
    </div>
  </section>
);

// ====== Audience Sections ======
const Audience = ({ id, icon: Icon, title, bullets }) => (
  <section className="section" id={id}>
    <div className="card">
      <h3>{title}</h3>
      <ul style={{ marginTop: "1rem", paddingLeft: "1rem" }}>
        {bullets.map((b,i) => <li key={i}>{b}</li>)}
      </ul>
      <div style={{ marginTop: "1rem" }}>
        <a href="#contact" className="button-primary" style={{ marginRight: "0.5rem" }}>Talk to Robert – Free</a>
        <a href={`tel:${PHONE_TEL}`} className="button-ghost"><Phone /> Call Now</a>
      </div>
    </div>
  </section>
);

// ====== Why Us / Testimonials ======
const TestimonialCard = ({ name, role, quote }) => (
  <div className="card">
    <div style={{ color: "#fbbf24" }}>{[...Array(5)].map((_,i) => <Star key={i} />)}</div>
    <p>"{quote}"</p>
    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>— {name}, {role}</div>
  </div>
);

const WhyUs = () => (
  <section className="section" id="why-us">
    <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>Florida Fire Claim Specialist</h2>
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ flex: "1 1 400px" }}>
        <p>I've built over <strong>1,900 homes</strong>. I know fire losses inside and out — construction, codes, and how carriers operate. As a licensed Florida Public Adjuster, my job is simple: make sure you get fully paid.</p>
        <div style={{ marginTop: "1rem" }}>
          <div><CheckCircle2 /> {LICENSE}</div>
          <div><CheckCircle2 /> Member: FAPIA & NAPIA</div>
          <div><CheckCircle2 /> 24/7 Response</div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <a href="#contact" className="button-primary" style={{ marginRight: "0.5rem" }}>Talk to Us Today</a>
          <a href={`mailto:${EMAIL}`} className="button-ghost">Email {EMAIL}</a>
        </div>
      </div>
      <div style={{ flex: "1 1 400px", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <TestimonialCard name="J. Martinez" role="Homeowner, Kissimmee" quote="They found damage our carrier ignored and got us hotel coverage fast."/>
        <TestimonialCard name="A. Chen" role="Renter, Orlando" quote="I didn't know my policy covered clothes and food. They handled it all."/>
        <TestimonialCard name="P. Singh" role="Landlord, Sanford" quote="Units restored quickly and rental income recovered. Smooth process."/>
        <TestimonialCard name="R. Davis" role="Homeowner, Clermont" quote="Professional and relentless with the carrier. We felt protected."/>
      </div>
    </div>
  </section>
);

// ====== Resources / Blog / FAQ / Guide ======
const BlogCard = ({ title, blurb }) => (
  <div className="card">
    <h4>{title}</h4>
    <p>{blurb}</p>
    <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>AI-generated content updated daily.</p>
  </div>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="card">
      <button onClick={() => setOpen(!open)} style={{ width: "100%", textAlign: "left", padding: "0.75rem", fontWeight: "bold" }}>
        {q} {open ? "–" : "+"}
      </button>
      {open && <div style={{ padding: "0.5rem 0 0.5rem 0.75rem" }}>{a}</div>}
    </div>
  );
};

const Resources = () => (
  <section className="section" id="resources">
    <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>Resources</h2>
    <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <BlogCard title="What To Do in the First 24 Hours After a Fire" blurb="A practical checklist to protect health, housing, and your claim." />
      <BlogCard title="Does Insurance Pay for Hotels After a Fire?" blurb="How Additional Living Expense (ALE) works and how to activate it." />
      <BlogCard title="Fire Claim Denied – What Now?" blurb="Common denial reasons and how to challenge them effectively." />
    </div>
    <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <div style={{ flex: "1 1 300px" }} className="card">
        <div><BookOpen /> Free PDF Guide</div>
        <h3>Fire Claim Survival Checklist</h3>
        <p>Downloadable PDF with action steps, documentation tips, and deadlines.</p>
        <a href="#contact" className="button-primary">Get the Guide</a>
      </div>
      <div style={{ flex: "1 1 300px" }} className="card">
        <div><HelpCircle /> FAQ</div>
        <FAQItem q="Do I pay upfront?" a="No. We work on a contingency basis — if you don't recover, you don't pay."/>
        <FAQItem q="What if I already filed?" a="We can step in at any stage and take over negotiations and documentation."/>
        <FAQItem q="Do I need a lawyer?" a="Most claims are resolved without one. If legal action is needed, we coordinate with trusted counsel."/>
      </div>
    </div>
  </section>
);

// ====== Contact ======
const Contact = () => (
  <section className="section" id="contact">
    <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>Get Paid for Your Fire Loss</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", maxWidth: "1000px", margin: "0 auto" }}>
      
      <div style={{ flex: "1 1 400px", padding: "1rem", border: "1px solid #ddd", borderRadius: "1rem" }}>
        <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! We will reach out shortly."); }}>
          <input type="text" placeholder="Full Name" required className="input-field" />
          <input type="email" placeholder="Email" required className="input-field" />
          <input type="tel" placeholder="Phone" required className="input-field" />
          <input type="text" placeholder="Address" className="input-field" />
          <textarea placeholder="Short description of the loss" rows="4" className="input-field" />
          <button type="submit" className="button-primary" style={{ width: "100%" }}>Get Free Claim Help Now</button>
        </form>
      </div>

      <div style={{ flex: "1 1 400px", padding: "1rem", border: "1px solid #ddd", borderRadius: "1rem" }}>
        <div>
          <div><Phone /> <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></div>
          <div><MessageCircle /> Live Chat / Text: Coming Soon</div>
          <div><MapPin /> {ADDRESS}</div>
          <div><Star /> 24/7 — Urgent Response</div>
          <div style={{ marginTop: "1rem", height: "200px", backgroundColor: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center" }}>Central FL Coverage Map</div>
        </div>
      </div>
      
    </div>
  </section>
);

// ====== Footer ======
const Footer = () => (
  <footer style={{ borderTop: "1px solid #ddd", padding: "2rem", backgroundColor: "#fff" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "2rem" }}>
      <div style={{ flex: "1 1 200px" }}>
        <div><ShieldCheck /> {BRAND}</div>
        <div>{LICENSE}</div>
        <div>© {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
      </div>
      <div style={{ flex: "1 1 200px" }}>
        <h4>Company</h4>
        <ul>
          {NAV.map(n => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
        </ul>
      </div>
      <div style={{ flex: "1 1 200px" }}>
        <h4>Contact</h4>
        <ul>
          <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li>{ADDRESS}</li>
        </ul>
      </div>
      <div style={{ flex: "1 1 200px" }}>
        <h4>Legal</h4>
        <ul>
          <li>No Recovery, No Fee</li>
          <li>Serving Florida</li>
          <li>Licensed & Insured</li>
        </ul>
      </div>
    </div>
  </footer>
);

// ====== Sticky Mobile CTA ======
const StickyCTA = () => (
  <div style={{
    position: "fixed",
    bottom: "1rem",
    left: "0",
    right: "0",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000
  }}>
    <a href={`tel:${PHONE_TEL}`} style={{
      backgroundColor: "#dc2626",
      color: "#fff",
      padding: "0.75rem 1.5rem",
      borderRadius: "1rem",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
    }}>
      <Phone /> Call Now – Free Help
    </a>
  </div>
);

// ====== Main App ======
export default function FireClaimsFL() {
  const [menuOpen, setMenuOpen] = useState(false);

  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "FireClaimsFL.com — Public Loss Adjusters",
    url: "https://FireClaimsFL.com",
    areaServed: "Florida",
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    address: { "@type": "PostalAddress", streetAddress: ADDRESS },
    sameAs: ["https://placlaim.com"],
    description: "Florida fire insurance claim help: hotel money, contents, rebuild—no recovery, no fee."
  }), []);

  return (
    <div style={{ fontFamily: "sans-serif", color: "#111", backgroundColor: "#f9f9f9" }}>
      <Header open={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
      <Hero />
      <Process />
      <Audience
        id="homeowners"
        icon={Home}
        title="Homeowners — Rebuild Right, Get Fully Paid"
        bullets={[
          "Scope the full structural + smoke + soot + odor damage (not just what's obvious).",
          "Protect Additional Living Expense (hotel, meals, essentials) from day one.",
          "Negotiate a complete rebuild budget with proper trades & code upgrades.",
        ]}
      />
      <Audience
        id="renters"
        icon={Users2}
        title="Renters — Hotel Money, Clothing & Contents Replaced"
        bullets={[
          "ALE for hotel & meals while the unit is unlivable.",
          "Replace clothing, furniture, and electronics fairly.",
          "Document smoke/soot damage fast to avoid denials.",
        ]}
      />
      <Audience
        id="landlords"
        icon={Building2}
        title="Landlords / Property Owners — Restore Units & Rental Income"
        bullets={[
          "Coordinate building coverage with tenant liability claims.",
          "Speed restoration with proper scope & vendor control.",
          "Protect rental income, avoid churn, stabilize operations.",
        ]}
      />
      <WhyUs />
      <Resources />
      <Contact />
      <Footer />
      <StickyCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
