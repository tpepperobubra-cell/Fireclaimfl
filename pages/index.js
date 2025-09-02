import React, { useMemo, useState, useEffect } from "react";
import { 
  Phone, Menu, X, Home, Users2, Building2, ShieldCheck, 
  CheckCircle2, ChevronRight, MessageCircle, Star, MapPin, Clock, 
  FileText, BookOpen, HelpCircle 
} from "lucide-react";

// ====== Business Constants ======
const BRAND = "FireClaimsFL";
const PHONE_DISPLAY = "(407) 555-0199"; // replace with real
const PHONE_TEL = "+14075550199"; // replace with real
const EMAIL = "rmack@placlaim.com"; // Updated to your email
const ADDRESS = "123 Market St, Orlando, FL 32801"; // replace with real
const LICENSE = "FL Public Adjuster License # A161638";

// Shared helpers
const cx = (...classes) => classes.filter(Boolean).join(" ");

const Container = ({ className = "", children }) => (
  <div className={cx("mx-auto w-full max-w-7xl px-4 md:px-6", className)}>{children}</div>
);

const Section = ({ id, className = "", children }) => (
  <section id={id} className={cx("py-14 md:py-20", className)}>
    <Container>{children}</Container>
  </section>
);

const PrimaryButton = ({ href, onClick, children, className = "" }) => {
  const base = "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all";
  return href ? (
    <a
      href={href}
      onClick={onClick}
      className={cx(base, "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600", className)}
    >
      {children}
    </a>
  ) : (
    <button
      onClick={onClick}
      className={cx(base, "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600", className)}
    >
      {children}
    </button>
  );
};

const GhostButton = ({ href, children, className = "" }) => (
  <a
    href={href}
    className={cx(
      "inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-base font-semibold border border-neutral-300 hover:border-neutral-400 text-neutral-800",
      className
    )}
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
  // Shadow on scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 w-full backdrop-blur bg-white/70 border-b border-neutral-200",
        scrolled ? "shadow-sm" : ""
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 font-extrabold tracking-tight text-neutral-900">
          <ShieldCheck className="h-6 w-6 text-red-600" />
          <span>{BRAND}</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-neutral-700 hover:text-neutral-900">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <GhostButton href={`tel:${PHONE_TEL}`}>
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </GhostButton>
          <PrimaryButton href="#contact">
            Free Claim Review
          </PrimaryButton>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300"
          onClick={onToggle}
          aria-label="Toggle Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <Container className="py-2">
            <nav className="grid py-2">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={onToggle}
                  className="px-2 py-3 text-base text-neutral-800 hover:bg-neutral-50 rounded-lg"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3 pb-4">
              <PrimaryButton href={`tel:${PHONE_TEL}`} className="flex-1">
                <Phone className="h-4 w-4" /> Call Now
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
  <div className="fixed md:hidden bottom-4 left-0 right-0 z-40">
    <Container>
      <div className="flex gap-3">
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white shadow-lg"
        >
          <Phone className="h-5 w-5" /> Call Now – Free Help
        </a>
      </div>
    </Container>
  </div>
);

// ====== Hero ======
const QuickBox = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/90 px-4 py-3 shadow-sm">
    <Icon className="h-5 w-5 text-red-600" />
    <span className="text-sm font-semibold text-neutral-800">{title}</span>
  </div>
);

const TrustStrip = () => (
  <div className="mt-6 grid grid-cols-1 gap-3 text-sm text-neutral-600 md:grid-cols-3">
    <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-red-600" /> {LICENSE}</div>
    <div className="flex items-center gap-2"><Star className="h-4 w-4 text-amber-500" /> Google Reviews ★★★★★</div>
    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" /> Central Florida Coverage</div>
  </div>
);

const Hero = () => (
  <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-red-900 to-orange-800">
    <div className="absolute inset-0 bg-black/40" />
    <Container>
      <div className="relative z-10 grid min-h-[62vh] place-items-center py-16 text-white md:py-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Your Fire Claim, Fought & Paid — Fast.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-100">
            Insurance will try to underpay. We make sure you recover every dollar.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton href="#contact" className="min-w-[220px]">
              Get Help Now <ChevronRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href={`tel:${PHONE_TEL}`}>
              <Phone className="h-4 w-4" /> Call {PHONE_DISPLAY}
            </GhostButton>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
  <div className="relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="absolute -top-3 left-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">
      {num}
    </div>
    <h3 className="pl-10 text-lg font-bold text-neutral-900">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{text}</p>
  </div>
);

const Process = () => (
  <Section id="how-we-help">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">We Simplify the Claim Process</h2>
      <p className="mt-3 text-neutral-700">No recovery, no fee. Transparent, aggressive, and fast.</p>
    </div>
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-4">
      <Step num={1} title="Free Claim Review" text="We listen, gather facts, and outline next steps within minutes." />
      <Step num={2} title="Document & Inspect" text="Full scope: structural, smoke, soot, odor, and ALE protections." />
      <Step num={3} title="Negotiate Carrier" text="We handle adjusters and vendors so you don't have to." />
      <Step num={4} title="You Get Paid" text="Settlement you deserve — hotel, contents, and repairs covered." />
    </div>
    <div className="mt-8 flex justify-center">
      <PrimaryButton href="#contact">Start Your Claim Help</PrimaryButton>
    </div>
  </Section>
);

// ====== Audience Sections ======
const Audience = ({ id, icon: Icon, title, bullets }) => (
  <Section id={id} className="pt-0">
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-2xl bg-red-50 p-2"><Icon className="h-6 w-6 text-red-600" /></div>
        <div>
          <h3 className="text-xl font-extrabold text-neutral-900">{title}</h3>
          <ul className="mt-4 grid list-disc gap-2 pl-5 text-neutral-700">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href="#contact">Talk to Robert – Free</PrimaryButton>
            <GhostButton href={`tel:${PHONE_TEL}`}><Phone className="h-4 w-4" /> Call Now</GhostButton>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// ====== Why Us ======
const TestimonialCard = ({ name, role, quote }) => (
  <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-2 text-amber-500">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
    </div>
    <p className="mt-3 text-neutral-800">"{quote}"</p>
    <div className="mt-4 text-sm text-neutral-600">— {name}, {role}</div>
  </div>
);

const WhyUs = () => (
  <Section id="why-us">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-extrabold md:text-3xl">Florida Fire Claim Specialist</h2>
        <p className="mt-4 text-neutral-700">
          I've built over <strong>1,900 homes</strong>. I know fire losses inside and out — construction, codes, and how
          carriers operate. As a licensed Florida Public Adjuster, my job is simple: make sure you get fully paid.
        </p>
        <div className="mt-5 grid gap-3 text-sm text-neutral-700">
          <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /> {LICENSE}</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /> Member: FAPIA & NAPIA</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-600" /> 24/7 Response</div>
        </div>
        <div className="mt-6 flex gap-3">
          <PrimaryButton href="#contact">Talk to Us Today</PrimaryButton>
          <GhostButton href={`mailto:${EMAIL}`}>Email {EMAIL}</GhostButton>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
    <div className="rounded-2xl border border-neutral-200">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-neutral-900">{q}</span>
        <span className="text-sm text-neutral-600">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="px-5 pb-5 text-neutral-700">{a}</div>}
    </div>
  );
};

const BlogCard = ({ title, blurb }) => (
  <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
    <h4 className="text-lg font-bold text-neutral-900">{title}</h4>
    <p className="mt-2 text-sm text-neutral-700">{blurb}</p>
    <div className="mt-4 text-sm text-neutral-500">AI-generated content updated daily.</div>
  </div>
);

const Resources = () => (
  <Section id="resources">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-2xl font-extrabold md:text-3xl">Resources</h2>
      <p className="mt-3 text-neutral-700">Free guides, FAQs, and blog content to help you move fast after a fire.</p>
    </div>
    
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      <BlogCard title="What To Do in the First 24 Hours After a Fire" blurb="A practical checklist to protect health, housing, and your claim." />
      <BlogCard title="Does Insurance Pay for Hotels After a Fire?" blurb="How Additional Living Expense (ALE) works and how to activate it." />
      <BlogCard title="Fire Claim Denied – What Now?" blurb="Common denial reasons and how to challenge them effectively." />
    </div>

    <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-neutral-800"><BookOpen className="h-5 w-5" /> Free PDF Guide</div>
        <h3 className="mt-2 text-xl font-bold">Fire Claim Survival Checklist</h3>
        <p className="mt-2 text-sm text-neutral-700">Downloadable PDF with action steps, documentation tips, and deadlines.</p>
        <div className="mt-4 flex gap-3">
          <PrimaryButton href="#contact">Get the Guide</PrimaryButton>
          <GhostButton href={`mailto:${EMAIL}`}>Request by Email</GhostButton>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-neutral-800"><HelpCircle className="h-5 w-5" /> FAQ</div>
        <div className="mt-3 grid gap-3">
          <FAQItem q="Do I pay upfront?" a="No. We work on a contingency basis — if you don't recover, you don't pay." />
          <FAQItem q="What if I already filed?" a="We can step in at any stage and take over negotiations and documentation." />
          <FAQItem q="Do I need a lawyer?" a="Most claims are resolved without one. If legal action is needed, we coordinate with trusted counsel." />
        </div>
      </div>
    </div>
  </Section>
);

// ====== Contact ======
const Contact = () => (
  <Section id="contact">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h3 className="text-xl font-extrabold text-neutral-900">Get Paid for Your Fire Loss</h3>
        <p className="mt-2 text-neutral-700">Tell us what happened. We'll call in 10 minutes.</p>
        <div
          className="mt-6 grid grid-cols-1 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks! We will reach out shortly.");
          }}
        >
          <input required placeholder="Full Name" className="rounded-2xl border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          <input required type="email" placeholder="Email" className="rounded-2xl border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          <input required type="tel" placeholder="Phone" className="rounded-2xl border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          <input placeholder="Address" className="rounded-2xl border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          <textarea placeholder="Short description of the loss" rows={4} className="rounded-2xl border border-neutral-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
          <PrimaryButton className="justify-center" onClick={() => {}}>
            Get Free Claim Help Now
          </PrimaryButton>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="grid gap-4 text-neutral-800">
          <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-red-600" /> <a href={`tel:${PHONE_TEL}`} className="font-semibold">{PHONE_DISPLAY}</a></div>
          <div className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-green-600" /> Live Chat / Text: Coming Soon</div>
          <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-blue-600" /> {ADDRESS}</div>
          <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-neutral-600" /> 24/7 — Urgent Response</div>
          <div className="mt-4 h-56 w-full rounded-2xl bg-neutral-100 grid place-items-center text-neutral-500">
            Central FL Coverage Map
          </div>
        </div>
      </div>
    </div>
  </Section>
);

// ====== Footer ======
const Footer = () => (
  <footer className="border-t border-neutral-200 bg-white py-10">
    <Container className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-extrabold text-neutral-900">
          <ShieldCheck className="h-6 w-6 text-red-600" /> {BRAND}
        </div>
        <div className="text-sm text-neutral-600">{LICENSE}</div>
        <div className="text-sm text-neutral-600">© {new Date().getFullYear()} {BRAND}. All rights reserved.</div>
      </div>
      <div>
        <div className="mb-3 font-semibold text-neutral-900">Company</div>
        <ul className="grid gap-2 text-sm text-neutral-700">
          {NAV.map((n) => (
            <li key={n.href}><a className="hover:text-neutral-900" href={n.href}>{n.label}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <div className="mb-3 font-semibold text-neutral-900">Contact</div>
        <ul className="grid gap-2 text-sm text-neutral-700">
          <li><a className="hover:text-neutral-900" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></li>
          <li><a className="hover:text-neutral-900" href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li>{ADDRESS}</li>
        </ul>
      </div>
      <div>
        <div className="mb-3 font-semibold text-neutral-900">Legal</div>
        <ul className="grid gap-2 text-sm text-neutral-700">
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

  // JSON-LD schema for SEO
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

  // Close mobile menu when navigating in-page
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
    <div id="home" className="min-h-screen bg-neutral-50 text-neutral-900">
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

      {/* Sticky mobile CTA */}
      <StickyCTA />

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
