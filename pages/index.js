import React, { useMemo, useState, useEffect } from "react";
import {
  Phone, Menu, X, Home, Users2, Building2, ShieldCheck,
  CheckCircle2, ChevronRight, MessageCircle, Star, MapPin, Clock,
  FileText, BookOpen, HelpCircle
} from "lucide-react";

// ====== Business Constants ======
const BRAND = "FireClaimsFL";
const PHONE_DISPLAY = "(407) 555-0199";
const PHONE_TEL = "+14075550199";
const EMAIL = "rmack@placlaim.com";
const ADDRESS = "123 Market St, Orlando, FL 32801";
const LICENSE = "FL Public Adjuster License # A161638";

// ====== Components ======
const Container = ({ className = "", children }) => (
  <div className={`container ${className}`}>{children}</div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={`section ${className}`}>
    <Container>{children}</Container>
  </section>
);

const PrimaryButton = ({ href, onClick, children, className = "" }) => {
  return href ? (
    <a
      href={href}
      onClick={onClick}
      className={`primary-button ${className}`}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={`primary-button ${className}`}
    >
      {children}
    </button>
  );
};

const GhostButton = ({ href, children, className = "" }) => (
  <a
    href={href}
    className={`ghost-button ${className}`}
  >
    {children}
  </a>
);

// ====== Header / Nav ======
const NAV = [
  { label: "How We Help", href: "#how-we-help" },
  { label: "Homeowners", href: "#homeowners" },
  { label: "Renters", href: "#renters" },
  { label: "Landlords", href: "#landlords" },
  { label: "Resources", href: "#resources" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const Header = ({ open, onToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <Container className="header-container">
        <a href="#home" className="header-logo">
          <ShieldCheck className="icon" />
          <span>{BRAND}</span>
        </a>

        <nav className="nav">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <GhostButton href={`tel:${PHONE_TEL}`}>
            <Phone className="icon" /> {PHONE_DISPLAY}
          </GhostButton>
          <PrimaryButton href="#contact">
            Free Claim Review
          </PrimaryButton>
        </div>

        <button
          className="menu-toggle"
          onClick={onToggle}
          aria-label="Toggle Menu"
        >
          {open ? <X className="icon" /> : <Menu className="icon" />}
        </button>
      </Container>

      {open && (
        <div className="mobile-menu open">
          <Container className="mobile-menu-nav">
            <nav className="mobile-menu-nav">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={onToggle}
                  className="mobile-menu-nav-link"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-actions">
              <PrimaryButton href={`tel:${PHONE_TEL}`} className="flex-1">
                <Phone className="icon" /> Call Now
              </PrimaryButton>
              <GhostButton href={`mailto:${EMAIL}`} className="flex-1">
                Email Us
              </GhostButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

// Sticky mobile CTA
const StickyCTA = () => (
  <div className="sticky-cta">
    <Container className="sticky-cta-container">
      <div className="flex gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          className="sticky-cta-button"
        >
          <Phone className="icon" /> Call Now – Free Help
        </a>
      </div>
    </Container>
  </div>
);

// ====== Hero ======
const QuickBox = ({ icon: Icon, title }) => (
  <div className="quick-box">
    <Icon className="icon" />
    <span>{title}</span>
  </div>
);

const TrustStrip = () => (
  <div className="trust-strip">
    <div><ShieldCheck className="icon red" /> {LICENSE}</div>
    <div><Star className="icon amber" /> Google Reviews ★★★★★</div>
    <div><MapPin className="icon blue" /> Central Florida Coverage</div>
  </div>
);

const Hero = () => (
  <div className="hero">
    <div className="hero-overlay" />
    <Container>
      <div className="hero-content">
        <div className="hero-textAs">
          <h1 className="hero-title">
            Your Fire Claim, Fought & Paid — Fast.
          </h1>
          <p className="hero-subtitle">
            Insurance will try to underpay. We make sure you recover every dollar.
          </p>
          <div className="hero-actions">
            <PrimaryButton href="#contact" className="min-w-220">
              Get Help Now <ChevronRight className="icon" />
            </PrimaryButton>
            <GhostButton href={`tel:${PHONE_TEL}`}>
              <Phone className="icon" /> Call {PHONE_DISPLAY}
            </GhostButton>
          </div>
          <div className="hero-quick-boxes">
            <QuickBox icon={Home} title="Hotel & Living Money" />
            <QuickBox icon={FileText} title="Contents & Cleaning Paid" />
            <QuickBox icon={Building2} title="Full Repairs Covered" />
          </div>
          <TrustStrip />
        </div>
      </div>
    </Container>
  </div>
);

// ====== Process / How We Help ======
const Step = ({ num, title, text }) => (
  <div className="step">
    <div className="step-number">{num}</div>
    <h3 className="step-title">{title}</h3>
    <p className="step-text">{text}</p>
  </div>
);

const Process = () => (
  <Section id="how-we-help">
    <div className="process-title-container">
      <h2 className="process-title">We Simplify the Claim Process</h2>
      <p className="process-subtitle">No recovery, no fee. Transparent, aggressive, and fast.</p>
    </div>
    <div className="process-steps">
      <Step num={1} title="Free Claim Review" text="We listen, gather facts, and outline next steps within minutes." />
      <Step num={2} title="Document & Inspect" text="Full scope: structural, smoke, soot, odor, and ALE protections." />
      <Step num={3} title="Negotiate Carrier" text="We handle adjusters and vendors so you don't have to." />
      <Step num={4} title="You Get Paid" text="Settlement you deserve — hotel, contents, and repairs covered." />
    </div>
    <div className="process-actions">
      <PrimaryButton href="#contact">Start Your Claim Help</PrimaryButton>
    </div>
  </Section>
);

// ====== Audience Sections ======
const Audience = ({ id, icon: Icon, title, bullets }) => (
  <Section id={id} className="pt-0">
    <div className="audience">
      <div className="audience-content">
        <div className="audience-icon"><Icon className="icon" /></div>
        <div>
          <h3 className="audience-title">{title}</h3>
          <ul className="audience-list">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="audience-actions">
            <PrimaryButton href="#contact">Talk to Robert – Free</PrimaryButton>
            <GhostButton href={`tel:${PHONE_TEL}`}><Phone className="icon" /> Call Now</GhostButton>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// ====== Why Us ======
const TestimonialCard = ({ name, role, quote }) => (
  <div className="testimonial">
    <div className="testimonial-stars">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="icon" />
      ))}
    </div>
    <p className="testimonial-quote">"{quote}"</p>
    <div className="testimonial-author">— {name}, {role}</div>
  </div>
);

const WhyUs = () => (
  <Section id="why-us">
    <div className="why-us">
      <div>
        <h2 className="why-us-title">Florida Fire Claim Specialist</h2>
        <p className="why-us-text">
          I've built over <strong>1,900 homes</strong>. I know fire losses inside and out — construction, codes, and how
          carriers operate. As a licensed Florida Public Adjuster, my job is simple: make sure you get fully paid.
        </p>
        <div className="why-us-checks">
          <div><CheckCircle2 className="icon" /> {LICENSE}</div>
          <div><CheckCircle2 className="icon" /> Member: FAPIA & NAPIA</div>
          <div><CheckCircle2 className="icon" /> 24/7 Response</div>
        </div>
        <div className="why-us-actions">
          <PrimaryButton href="#contact">Talk to Us Today</PrimaryButton>
          <GhostButton href={`mailto:${EMAIL}`}>Email {EMAIL}</GhostButton>
        </div>
      </div>
      <div className="testimonial-grid">
        <TestimonialCard name="J. Martinez" role="Homeowner, Kissimmee" quote="They found damage our carrier ignored and got us hotel coverage fast." />
        <TestimonialCard name="A. Chen" role="Renter, Orlando" quote="I didn't know my policy covered clothes and food. They handled it all." />
        <TestimonialCard name="P. Singh" role="Landlord, Sanford" quote="Units restored quickly and rental income recovered. Smooth process." />
        <TestimonialCard name="R. Davis" role="Homeowner, Clermont" quote="Professional and relentless with the carrier. We felt protected." />
      </div>
    </div>
  </Section>
);

// ====== Resources (Blog + FAQ + Guide) ======
const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen((o) => !o)}
        className="faq-button"
      >
        <span className="faq-question">{q}</span>
        <span className="faq-toggle">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
};

const BlogCard = ({ title, blurb }) => (
  <div className="blog-card">
    <h4 className="blog-title">{title}</h4>
    <p className="blog-blurb">{blurb}</p>
    <div className="blog-meta">AI-generated content updated daily.</div>
  </div>
);

const Resources = () => (
  <Section id="resources">
    <div className="resources-title-container">
      <h2 className="resources-title">Resources</h2>
      <p className="resources-subtitle">Free guides, FAQs, and blog content to help you move fast after a fire.</p>
    </div>
    
    <div className="resources-blogs">
      <BlogCard title="What To Do in the First 24 Hours After a Fire" blurb="A practical checklist to protect health, housing, and your claim." />
      <BlogCard title="Does Insurance Pay for Hotels After a Fire?" blurb="How Additional Living Expense (ALE) works and how to activate it." />
      <BlogCard title="Fire Claim Denied – What Now?" blurb="Common denial reasons and how to challenge them effectively." />
    </div>

    <div className="resources-grid">
      <div className="resource-card">
        <div className="resource-header"><BookOpen className="icon" /> Free PDF Guide</div>
        <h3 className="resource-title">Fire Claim Survival Checklist</h3>
        <p className="resource-text">Downloadable PDF with action steps, documentation tips, and deadlines.</p>
        <div className="resource-actions">
          <PrimaryButton href="#contact">Get the Guide</PrimaryButton>
          <GhostButton href={`mailto:${EMAIL}`}>Request by Email</GhostButton>
        </div>
      </div>

      <div className="resource-card">
        <div className="resource-header"><HelpCircle className="icon" /> FAQ</div>
        <div className="faq-list">
          <FAQItem 
            q="Do I pay upfront?" 
            a="No. We work on a contingency basis — if you don't recover, you don't pay." 
          />
          <FAQItem 
            q="What if I already filed?" 
            a="We can step in at any stage and take over negotiations and documentation." 
          />
          <FAQItem 
            q="Do I need a lawyer?" 
            a="Most claims are resolved without one. If legal action is needed, we coordinate with trusted counsel." 
          />
        </div>
      </div>
    </div>
  </Section>
);

// ====== Contact ======
const Contact = () => (
  <Section id="contact">
    <div className="contact-grid">
      <div className="contact-form">
        <h3 className="contact-title">Get Paid for Your Fire Loss</h3>
        <p className="contact-text">Tell us what happened. We'll call in 10 minutes.</p>
        <div
          className="contact-form-fields"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We will reach out shortly.");
          }}
        >
          <input required placeholder="Full Name" className="contact-input" />
          <input required type="email" placeholder="Email" className="contact-input" />
          <input required type="tel" placeholder="Phone" className="contact-input" />
          <input placeholder="Address" className="contact-input" />
          <textarea placeholder="Short description of the loss" rows={4} className="contact-textarea" />
          <PrimaryButton className="justify-center">
            Get Free Claim Help Now
          </PrimaryButton>
        </div>
      </div>

      <div className="contact-info">
        <div className="contact-info-grid">
          <div className="contact-info-item">
            <Phone className="icon red" /> 
            <a href={`tel:${PHONE_TEL}`} className="contact-info-link">{PHONE_DISPLAY}</a>
          </div>
          <div className="contact-info-item">
            <MessageCircle className="icon green" /> Live Chat / Text: Coming Soon
          </div>
          <div className="contact-info-item">
            <MapPin className="icon blue" /> {ADDRESS}
          </div>
          <div className="contact-info-item">
            <Clock className="icon neutral" /> 24/7 — Urgent Response
          </div>
          <div className="contact-map">
            Central FL Coverage Map
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// ====== Footer ======
const Footer = () => (
  <footer className="footer">
    <Container className="footer-grid">
      <div className="footer-brand-section">
        <div className="footer-brand">
          <ShieldCheck className="icon" /> {BRAND}
        </div>
        <div className="footer-info">
          <div>{LICENSE}</div>
          <div>© {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-section-title">Company</div>
        <ul>
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href}>{n.label}</a></li>
          ))}
        </ul>
      </div>
      <div className="footer-section">
        <div className="footer-section-title">Contact</div>
        <ul>
          <li><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
          <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li>{ADDRESS}</li>
        </ul>
      </div>
      <div className="footer-section">
        <div className="footer-section-title">Legal</div>
        <ul>
          <li>No Recovery, No Fee</li>
          <li>Serving Florida (Central FL focus)</li>
          <li>Licensed & Insured</li>
        </ul>
      </div>
    </Container>
  </footer>
);

// ====== Main App ======
export default function FireClaimsFL() {
  const [menuOpen, setMenuOpen] = useState(false);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "FireClaimsFL.com — Public Loss Adjusters",
      url: "https://FireClaimsFL.com",
      areaServed: "Florida",
      telephone: PHONE_DISPLAY,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS,
      },
      sameAs: ["https://placlaim.com"],
      description: "Florida fire insurance claim help: hotel money, contents, rebuild—no recovery, no fee.",
    }),
    []
  );

  useEffect(() => {
    const handler = (e) => {
      if (e.target instanceof HTMLAnchorElement && e.target.getAttribute("href")?.startsWith("#")) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div id="home" className="min-h-screen">
      <style jsx global>{`
        /* Global Reset and Base Styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #f5f5f4; /* neutral-50 */
          color: #1c2526; /* neutral-900 */
          min-height: 100vh;
        }

        /* Container */
        .container {
          width: 100%;
          max-width: 1280px; /* max-w-7xl */
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem; /* px-4 */
          padding-right: 1rem;
        }

        @media (min-width: 768px) {
          .container {
            padding-left: 1.5rem; /* md:px-6 */
            padding-right: 1.5rem;
          }
        }

        /* Section */
        .section {
          padding-top: 3.5rem; /* py-14 */
          padding-bottom: 3.5rem;
        }

        @media (min-width: 768px) {
          .section {
            padding-top: 5rem; /* md:py-20 */
            padding-bottom: 5rem;
          }
        }

        .section.pt-0 {
          padding-top: 0;
        }

        .section.pt-6 {
          padding-top: 1.5rem;
        }

        @media (min-width: 768px) {
          .section.pt-10 {
            padding-top: 2.5rem;
          }
        }

        /* Buttons */
        .primary-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 1rem; /* rounded-2xl */
          background-color: #dc2626; /* red-600 */
          color: #ffffff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          text-decoration: none;
          transition: background-color 0.2s, outline 0.2s;
        }

        .primary-button:hover {
          background-color: #b91c1c; /* red-700 */
        }

        .primary-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #dc2626; /* focus:ring-2 focus:ring-offset-2 focus:ring-red-600 */
        }

        .primary-button.min-w-220 {
          min-width: 220px;
        }

        .primary-button.justify-center {
          justify-content: center;
        }

        .ghost-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 1rem; /* rounded-2xl */
          border: 1px solid #d4d4d8; /* neutral-300 */
          color: #3f3f46; /* neutral-800 */
          text-decoration: none;
          transition: border-color 0.2s;
        }

        .ghost-button:hover {
          border-color: #a1a1aa; /* neutral-400 */
        }

        .ghost-button .icon {
          width: 1rem;
          height: 1rem;
        }

        /* Header */
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.7); /* bg-white/70 */
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #d4d4d8; /* neutral-200 */
        }

        .header.scrolled {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .header-container {
          display: flex;
          height: 4rem; /* h-16 */
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          color: #1c2526; /* neutral-900 */
          text-decoration: none;
        }

        .header-logo .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #dc2626; /* red-600 */
        }

        .nav {
          display: none;
          align-items: center;
          gap: 1.75rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        @media (min-width: 768px) {
          .nav {
            display: flex;
          }
        }

        .nav a {
          color: #6b7280; /* neutral-700 */
          text-decoration: none;
        }

        .nav a:hover {
          color: #1c2526; /* neutral-900 */
        }

        .header-actions {
          display: none;
          align-items: center;
          gap: 0.75rem;
        }

        @media (min-width: 768px) {
          .header-actions {
            display: flex;
          }
        }

        .menu-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.75rem; /* rounded-xl */
          border: 1px solid #d4d4d8; /* neutral-300 */
          background: none;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .menu-toggle {
            display: none;
          }
        }

        .menu-toggle .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .mobile-menu {
          display: none;
          border-top: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
        }

        .mobile-menu.open {
          display: block;
        }

        .mobile-menu-nav {
          display: grid;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .mobile-menu-nav a {
          padding: 0.75rem 0.5rem;
          font-size: 1rem;
          color: #3f3f46; /* neutral-800 */
          text-decoration: none;
          border-radius: 0.5rem;
        }

        .mobile-menu-nav a:hover {
          background-color: #f5f5f5; /* neutral-50 */
        }

        .mobile-menu-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-bottom: 1rem;
        }

        .mobile-menu-actions .primary-button,
        .mobile-menu-actions .ghost-button {
          flex: 1;
        }

        /* Sticky CTA */
        .sticky-cta {
          position: fixed;
          bottom: 1rem;
          left:0;
          right: 0;
          z-index: 40;
          display: block;
        }

        @media (min-width: 768px) {
          .sticky-cta {
            display: none;
          }
        }

        .sticky-cta-container {
          display: flex;
          gap: 0.75rem;
        }

        .sticky-cta-button {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 1rem; /* rounded-2xl */
          background-color: #dc2626; /* red-600 */
          color: #ffffff;
          text-decoration: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
        }

        .sticky-cta-button .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        /* Hero */
        .hero {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem; /* rounded-3xl */
          background: linear-gradient(to bottom right, #7f1d1d, #ea580c); /* from-red-900 to-orange-800 */
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4); /* bg-black/40 */
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: grid;
          place-items: center;
          min-height: 62vh;
          padding-top: 4rem;
          padding-bottom: 4rem;
          color: #ffffff;
        }

        @media (min-width: 768px) {
          .hero-content {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }
        }

        .hero-text {
          max-width: 768px;
          text-align: center;
        }

        .hero-title {
          font-size: 1.875rem;
          font-weight: 800;
          line-height: 1.2;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
        }

        .hero-subtitle {
          margin-top: 1rem;
          font-size: 1.125rem;
          color: #f5f5f5; /* neutral-100 */
        }

        @media (min-width: 768px) {
          .hero-subtitle {
            font-size: 1.25rem;
          }
        }

        .hero-actions {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .hero-actions {
            flex-direction: row;
          }
        }

        .hero-quick-boxes {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 640px) {
          .hero-quick-boxes {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .quick-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-radius: 1rem; /* rounded-2xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: rgba(255, 255, 255, 0.9); /* bg-white/90 */
          padding: 0.75rem 1rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .quick-box .icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #dc2626; /* red-600 */
        }

        .quick-box span {
          font-size: 0.875rem;
          font-weight: 600;
          color: #3f3f46; /* neutral-800 */
        }

        .trust-strip {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-600 */
        }

        @media (min-width: 768px) {
          .trust-strip {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .trust-strip div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trust-strip .icon {
          width: 1rem;
          height: 1rem;
        }

        .trust-strip .icon.red {
          color: #dc2626; /* red-600 */
        }

        .trust-strip .icon.amber {
          color: #f59e0b; /* amber-500 */
        }

        .trust-strip .icon.blue {
          color: #2563eb; /* blue-600 */
        }

        /* Process */
        .process-title {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -0.025em;
          text-align: center;
        }

        @media (min-width: 768px) {
          .process-title {
            font-size: 1.875rem;
          }
        }

        .process-subtitle {
          margin-top: 0.75rem;
          color: #6b7280; /* neutral-700 */
          text-align: center;
        }

        .process-steps {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 768px) {
          .process-steps {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .step {
          position: relative;
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 1.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .step-number {
          position: absolute;
          top: -0.75rem;
          left: 1.5rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          background-color: #dc2626; /* red-600 */
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .step-title {
          padding-left: 2.5rem;
          font-size: 1.125rem;
          font-weight: 700;
          color: #1c2526; /* neutral-900 */
        }

        .step-text {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
          color: #6b7280; /* neutral-700 */
        }

        .process-actions {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }

        /* Audience */
        .audience {
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 2rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .audience-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .audience-icon {
          margin-top: 0.25rem;
          border-radius: 1rem; /* rounded-2xl */
          background-color: #fef2f2; /* red-50 */
          padding: 0.5rem;
        }

        .audience-icon .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #dc2626; /* red-600 */
        }

        .audience-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #1c2526; /* neutral-900 */
        }

        .audience-list {
          margin-top: 1rem;
          display: grid;
          gap: 0.5rem;
          padding-left: 1.25rem;
          list-style: disc;
          color: #6b7280; /* neutral-700 */
        }

        .audience-actions {
          margin-top: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        /* Why Us */
        .why-us {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .why-us {
            grid-template-columns: 1fr 1fr;
          }
        }

        .why-us-title {
          font-size: 1.5rem;
          font-weight: 800;
        }

        @media (min-width: 768px) {
          .why-us-title {
            font-size: 1.875rem;
          }
        }

        .why-us-text {
          margin-top: 1rem;
          color: #6b7280; /* neutral-700 */
        }

        .why-us-text strong {
          font-weight: 700;
        }

        .why-us-checks {
          margin-top: 1.25rem;
          display: grid;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-700 */
        }

        .why-us-checks div {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .why-us-checks .icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #16a34a; /* green-600 */
        }

        .why-us-actions {
          margin-top: 1.5rem;
          display: flex;
          gap: 0.75rem;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .testimonial {
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 1.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .testimonial-stars {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #f59e0b; /* amber-500 */
        }

        .testimonial-stars .icon {
          width: 1rem;
          height: 1rem;
          fill: currentColor;
        }

        .testimonial-quote {
          margin-top: 0.75rem;
          color: #3f3f46; /* neutral-800 */
        }

        .testimonial-author {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-600 */
        }

        /* Resources */
        .resources-title {
          font-size: 1.5rem;
          font-weight: 800;
          text-align: center;
        }

        @media (min-width: 768px) {
          .resources-title {
            font-size: 1.875rem;
          }
        }

        .resources-subtitle {
          margin-top: 0.75rem;
          color: #6b7280; /* neutral-700 */
          text-align: center;
        }

        .resources-blogs {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .resources-blogs {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .blog-card {
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 1.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .blog-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1c2526; /* neutral-900 */
        }

        .blog-blurb {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-700 */
        }

        .blog-meta {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-500 */
        }

        .resources-grid {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .resources-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .resource-card {
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 1.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .resource-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #3f3f46; /* neutral-800 */
        }

        .resource-header .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .resource-title {
          margin-top: 0.5rem;
          font-size: 1.25rem;
          font-weight: 700;
        }

        .resource-text {
          margin-top: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-700 */
        }

        .resource-actions {
          margin-top: 1rem;
          display: flex;
          gap: 0.75rem;
        }

        .faq-item {
          border-radius: 1rem; /* rounded-2xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
        }

        .faq-button {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.25rem;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }

        .faq-question {
          font-weight: 600;
          color: #1c2526; /* neutral-900 */
        }

        .faq-toggle {
          font-size: 0.875rem;
          color: #6b7280; /* neutral-600 */
        }

        .faq-answer {
          padding: 0 1.25rem 1.25rem;
          color: #6b7280; /* neutral-700 */
        }

        /* Contact */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .contact-form {
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 2rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .contact-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #1c2526; /* neutral-900 */
        }

        .contact-text {
          margin-top: 0.5rem;
          color: #6b7280; /* neutral-700 */
        }

        .contact-form-fields {
          margin-top: 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .contact-form-fields input,
        .contact-form-fields textarea {
          border-radius: 1rem; /* rounded-2xl */
          border: 1px solid #d4d4d8; /* neutral-300 */
          padding: 0.75rem 1rem;
          font-size: 1rem;
          width: 100%;
        }

        .contact-form-fields input:focus,
        .contact-form-fields textarea:focus {
          outline: none;
          box-shadow: 0 0 0 2px #dc2626; /* focus:ring-2 focus:ring-red-600 */
        }

        .contact-form-fields textarea {
          resize: vertical;
        }

        .contact-info {
          border-radius: 1.5rem; /* rounded-3xl */
          border: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding: 2rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* shadow-sm */
        }

        .contact-info-grid {
          display: grid;
          gap: 1rem;
          color: #3f3f46; /* neutral-800 */
        }

        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .contact-info-item .icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .contact-info-item .icon.red {
          color: #dc2626; /* red-600 */
        }

        .contact-info-item .icon.green {
          color: #16a34a; /* green-600 */
        }

        .contact-info-item .icon.blue {
          color: #2563eb; /* blue-600 */
        }

        .contact-info-item .icon.neutral {
          color: #6b7280; /* neutral-600 */
        }

        .contact-info-item a {
          font-weight: 600;
          color: #3f3f46; /* neutral-800 */
          text-decoration: none;
        }

        .contact-map {
          margin-top: 1rem;
          height: 14rem; /* h-56 */
          width: 100%;
          border-radius: 1rem; /* rounded-2xl */
          background-color: #f5f5f5; /* neutral-100 */
          display: grid;
          place-items: center;
          color: #6b7280; /* neutral-500 */
        }

        /* Footer */
        .footer {
          border-top: 1px solid #d4d4d8; /* neutral-200 */
          background-color: #ffffff;
          padding-top: 2.5rem;
          padding-bottom: 2.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 800;
          color: #1c2526; /* neutral-900 */
        }

        .footer-brand .icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #dc2626; /* red-600 */
        }

        .footer-info {
          display: grid;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-600 */
        }

        .footer-section {
          display: grid;
          gap: 0.75rem;
        }

        .footer-section-title {
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #1c2526; /* neutral-900 */
        }

        .footer-section ul {
          display: grid;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280; /* neutral-700 */
          list-style: none;
        }

        .footer-section a {
          color: #6b7280; /* neutral-700 */
          text-decoration: none;
        }

        .footer-section a:hover {
          color: #1c2526; /* neutral-900 */
        }
      `}</style>

      <Header open={menuOpen} onToggle={() => setMenuOpen((o) => !o)} />

      <main>
        <Section id="home" className="pt-6 md:pt-10">
          <Hero />
        </Section>

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
      </main>

      <Footer />

      <StickyCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
