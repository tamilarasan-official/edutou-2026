import Image from "next/image";
import type { ReactNode } from "react";
import CountUp from "./CountUp";
import VerifyForm from "./VerifyForm";

const EMAIL = "sujan@welocalhost.com";
const CONTACT = `mailto:${EMAIL}`;
/** Registration landing page; every "apply" call to action goes here. */
const APPLY_URL = "https://learn.edutou.in";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#programs", label: "All Courses" },
  { href: "#verify", label: "Verify Certification" },
  { href: "#contact", label: "Contact" },
];

const avatars = ["photo-09", "photo-07", "photo-10", "photo-06", "photo-08"];

const values = ["Adaptability", "Practicality", "Community", "Future-Readiness"];

/* stroke icons, 24px grid */
const icons: Record<string, ReactNode> = {
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12l7-7" /></>,
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6M20 16v-2" />,
  flow: <><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></>,
  adapt: <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />,
  box: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9" />,
  user: <><circle cx="12" cy="9" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  users: <><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3 19a6 6 0 0 1 12 0M15 19a4.5 4.5 0 0 1 6.5-3.5" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.5 3.5 8.5s-1 6-3.5 8.5C9.5 18 8.5 15 8.5 12s1-6 3.5-8.5z" /></>,
  bars: <path d="M7 18v-6M12 18V6M17 18v-9" />,
  spark: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7l8 6 8-6" /></>,
};

function Icon({ name, size = 20 }: { name: keyof typeof icons; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

const benefits = [
  { icon: "trend", title: "AI-Powered Learning Paths", line: "Personalised study plans adapt to your pace, strengths and goals, so you learn efficiently and effectively." },
  { icon: "target", title: "Skill Optimization", line: "Smart recommendations focus on the skills that matter most for your career growth and real-world success." },
  { icon: "chart", title: "Real-Time Insights", line: "Live analytics show your performance, improvement areas and mastery levels the moment they change." },
  { icon: "flow", title: "Automated Practice Flow", line: "From lessons to projects, Edutou guides you step by step so you stay consistent without feeling overwhelmed." },
  { icon: "adapt", title: "Adaptive Learning Support", line: "Difficulty, content and challenges adjust to your progress to keep you motivated and improving." },
  { icon: "box", title: "Performance Tracking", line: "Clear dashboards and visual reports help you measure growth, build confidence and stay on track." },
] as const;

const metrics = [
  { to: 1200, suffix: "+", label: "Learners trained on campus" },
  { to: 98.7, decimals: 1, suffix: "%", label: "Learner satisfaction rate" },
  { to: 2500, suffix: "", label: "Lessons completed across programs" },
  { to: 120, suffix: "+", label: "Hands-on projects delivered" },
];

const photos = [
  { k: "12", w: 2000, h: 1125, a: "The Edutou team on campus" },
  { k: "04", w: 768, h: 1024, a: "A full computer lab of Edutou students at work" },
  { k: "11", w: 2000, h: 1125, a: "An Edutou mentor guiding a student at their screen" },
  { k: "09", w: 768, h: 1024, a: "An Edutou student sharing their experience" },
  { k: "05", w: 1024, h: 768, a: "A welcome session on stage at an Edutou campus program" },
  { k: "08", w: 768, h: 1024, a: "An Edutou mentor presenting to students" },
  { k: "02", w: 1024, h: 768, a: "Wide view of an Edutou computer lab" },
  { k: "01", w: 768, h: 1024, a: "Students in an Edutou AI training session" },
  { k: "13", w: 2000, h: 1125, a: "An Edutou cohort taking a group selfie" },
  { k: "07", w: 768, h: 1024, a: "An Edutou learner interview" },
  { k: "06", w: 768, h: 1024, a: "An Edutou training session in progress" },
  { k: "10", w: 768, h: 1024, a: "An Edutou learner from the DiffuseAI team" },
];

const faqs = [
  { q: "How is Edutou different?", a: "Edutou isn’t just another learning platform. It uses AI to personalise your learning path, adapt difficulty and recommend projects, so you gain real-world skills faster and more effectively." },
  { q: "Is Edutou beginner-friendly?", a: "Yes. Your path starts from what you already know, so a beginner starts at the beginning and moves up from there, with mentors on hand at every step." },
  { q: "How does Edutou personalise learning?", a: "It reads your skills, pace and goals, then adjusts lessons, practice and projects as your results come in. Weak areas get more practice; what you already know, you skip." },
  { q: "Can I learn at my own pace?", a: "Yes. Your path adapts to your pace, so you spend less time on what you know and more on what matters." },
  { q: "Do courses include real projects?", a: "Yes. Projects run through every path, and more than 120 hands-on projects have been delivered so far." },
];

/* Bento visuals ------------------------------------------------------------ */

// step line that climbs left to right, matching the original card
const STEP = "M0 230 L20 230 L40 212 L58 212 L76 198 L100 198 L116 184 L130 184 L146 200 L176 200 L200 180 L222 180 L240 166 L270 166 L360 92 L540 92 L600 52 L630 52 L648 30 L668 30 L676 40 L700 40 L720 16 L760 16";
function AreaChart() {
  return (
    <svg className="viz-chart" viewBox="0 0 760 250" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.75" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="viz-chart__fill" d={`${STEP} L760 250 L0 250 Z`} fill="url(#area)" />
      <path className="viz-chart__line" d={STEP} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinejoin="round" pathLength={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// 10x4 dot matrix; orange marks the skills a path has covered
const DOTS = "1111000000" + "1101000001" + "1110110100" + "1010110000";
function DotMatrix() {
  return (
    <div className="viz-dots" aria-hidden="true">
      {DOTS.split("").map((d, i) => (
        <span key={i} className={d === "1" ? "on" : ""} style={{ animationDelay: `${(i % 10) * 90 + Math.floor(i / 10) * 140}ms` }} />
      ))}
    </div>
  );
}

function Orbit() {
  const nodes: { icon: keyof typeof icons; x: number; y: number }[] = [
    { icon: "user", x: 14, y: 22 }, { icon: "users", x: 82, y: 12 }, { icon: "bars", x: 61, y: 48 },
    { icon: "globe", x: 36, y: 74 }, { icon: "trend", x: 6, y: 82 }, { icon: "flow", x: 92, y: 86 },
  ];
  return (
    <div className="viz-orbit" aria-hidden="true">
      <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
      <span className="core"><Icon name="spark" size={22} /></span>
      {nodes.map((n, i) => (
        <span key={n.icon} className="node" style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${i * -0.7}s` }}>
          <Icon name={n.icon} size={16} />
        </span>
      ))}
    </div>
  );
}

function Plane() {
  return (
    <svg className="viz-plane" viewBox="0 0 220 200" aria-hidden="true">
      <defs>
        <linearGradient id="wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ffd9c7" />
        </linearGradient>
      </defs>
      <path d="M150 8 L20 196 L150 196 Z" fill="url(#wing)" />
      <path d="M172 40 L136 196 L182 196 Z" fill="var(--accent)" />
    </svg>
  );
}

// isometric field of discs, the original "Smart Learning" visual
function Discs() {
  const rows = 9;
  const cells: { x: number; y: number; on: boolean; d: number }[] = [];
  for (let r = 0; r < rows; r++) {
    const n = r < 5 ? r + 1 : rows - r;
    for (let c = 0; c < n; c++) {
      const x = 50 + (c - (n - 1) / 2) * 20;
      const y = 8 + r * 10.5;
      cells.push({ x, y, on: (r * 3 + c * 5) % 7 > 2, d: (r + c) * 120 });
    }
  }
  return (
    <div className="viz-discs" aria-hidden="true">
      {cells.map((c, i) => (
        <span key={i} className={c.on ? "on" : ""} style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${c.d}ms` }} />
      ))}
    </div>
  );
}

/* Page --------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <div className="frame" aria-hidden="true" />

      <header className="nav">
        <div className="container nav__bar">
          <a className="wordmark" href="#hero" aria-label="Edutou, home"><Image src="/logo.svg" alt="" width={32} height={32} />Edutou</a>
          <nav aria-label="Main" className="nav__links">
            <ul>
              {links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>
          <a className="btn btn--small nav__cta" href={APPLY_URL}>Apply Now</a>
          <details className="nav__menu">
            <summary aria-label="Open menu"><span /><span /></summary>
            <ul>
              {links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
              <li><a className="btn" href={APPLY_URL}>Apply Now</a></li>
            </ul>
          </details>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="hero" className="hero">
          <div className="hero__art" aria-hidden="true">
            <span className="hero__glow" />
            <span className="hero__shape" />
            <span className="hero__beam" />
          </div>
          <div className="container hero__inner">
            <p className="pill reveal">Redefining Education</p>
            <h1 className="reveal">The Future of Learning<br /><span>Powered by AI.</span></h1>
            <p className="hero__lead reveal">
              Education isn’t just about knowledge, it’s about transformation. At Edutou, we combine cutting-edge
              technology, personalised learning and real-world projects to help learners thrive in the digital economy.
            </p>
            <div className="hero__actions reveal">
              <a className="btn" href={APPLY_URL}>Start Your Journey <Icon name="arrow" size={18} /></a>
              <a className="btn btn--ghost" href="#programs">Browse Programs</a>
            </div>
            <div className="trust reveal">
              <div className="trust__faces">
                {avatars.map((a) => (
                  <Image key={a} src={`/images/${a}.jpg`} alt="" width={40} height={40} sizes="40px" />
                ))}
              </div>
              <p>Trusted already by <strong>1.2k+</strong> learners</p>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="clients" aria-label="Institutions">
          <div className="container">
            <p className="eyebrow-label">Institutions we’ve worked with</p>
            <ul className="clients__row">
              <li><span className="dot" />Saveetha University</li>
              <li><span className="dot" />Madras Engineering College</li>
            </ul>
          </div>
        </section>

        {/* Values */}
        <section className="values section" aria-labelledby="values-h">
          <div className="container values__grid">
            <div className="values__art" aria-hidden="true">
              <div className="slider">
                <span className="slider__fill" />
                <span className="slider__knob"><Icon name="spark" size={18} /></span>
                <span className="slider__end"><Icon name="globe" size={18} /></span>
              </div>
            </div>
            <div className="values__text">
              <h2 id="values-h" className="reveal">From Values &amp; Philosophy</h2>
              <ul className="values__list reveal">
                {values.map((v, i) => <li key={v} style={{ animationDelay: `${i * 1.5}s` }}>{v}</li>)}
              </ul>
              <p className="muted reveal">Every program we run is built on these four ideas: learning that bends to the learner, skills that work on day one, a cohort that learns together, and a curriculum that tracks where the industry is going.</p>
            </div>
          </div>
        </section>

        {/* Bento */}
        <section id="about" className="section" aria-labelledby="bento-h">
          <div className="container">
            <h2 id="bento-h" className="center reveal">Learn with Confidence.<br />Backed by Intelligence.</h2>
            <div className="bento">
              <article className="card bento__a reveal">
                <div className="card__text">
                  <h3>AI-Driven Personalization</h3>
                  <p className="card__sub">Learning paths designed around you, not the other way around.</p>
                  <p className="muted">Every learner is different. Edutou uses AI to analyse your skills, pace and goals, then adapts lessons, projects and assessments to match your learning style.</p>
                </div>
                <AreaChart />
              </article>
              <article className="card bento__b reveal">
                <div className="card__text">
                  <h3>Diversified Skill Paths</h3>
                  <p className="muted">Build a portfolio of skills tuned for the roles you want.</p>
                </div>
                <DotMatrix />
              </article>
              <article className="card bento__c reveal">
                <div className="card__text">
                  <h3>Learning Optimized in Real Time</h3>
                  <p className="muted">Content updates continuously with industry trends, technology shifts and learner performance data.</p>
                </div>
                <Orbit />
              </article>
              <article className="card bento__d reveal">
                <div className="card__text">
                  <h3>Maximize Returns, Minimize Effort</h3>
                  <p className="card__sub">Learn smarter, not harder.</p>
                  <p className="muted">Edutou removes unnecessary complexity from learning.</p>
                </div>
                <Plane />
              </article>
            </div>
          </div>
        </section>

        {/* Feature */}
        <section id="feature" className="feature section" aria-labelledby="feature-h">
          <div className="container feature__grid">
            <Discs />
            <div className="feature__text">
              <p className="pill reveal">Smart engine</p>
              <h2 id="feature-h" className="reveal">Smart Learning Intelligence</h2>
              <p className="card__sub reveal">AI analyses your progress and learning patterns to reduce struggle and boost mastery.</p>
              <p className="muted reveal">Edutou continuously tracks your performance, identifies weak areas, and adjusts lessons, practice tasks and projects instantly, so you stay challenged where needed and supported where it matters most.</p>
              <ul className="feature__points reveal">
                <li>Weak spots get more practice</li>
                <li>What you know, you skip</li>
                <li>Projects matched to your level</li>
              </ul>
              <a className="btn btn--ghost reveal" href="#programs">Learn More <Icon name="arrow" size={18} /></a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="programs" className="section" aria-labelledby="benefit-h">
          <div className="container">
            <h2 id="benefit-h" className="center reveal">Smarter Learning.<br />Stronger Outcomes.</h2>
            <ul className="benefits">
              {benefits.map((b) => (
                <li key={b.title} className="benefit reveal">
                  <span className="benefit__icon"><Icon name={b.icon} /></span>
                  <h3>{b.title}</h3>
                  <p>{b.line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Gallery */}
        <section id="classroom" className="section" aria-labelledby="gallery-h">
          <div className="container">
            <div className="head-center">
              <p className="pill reveal">On the ground</p>
              <h2 id="gallery-h" className="reveal">Inside the Edutou classroom</h2>
              <p className="muted reveal">Real students, real campuses. Hands-on AI learning with our teams at Saveetha University, Madras Engineering College and beyond.</p>
            </div>
            <div className="masonry">
              {photos.map((p) => (
                <figure key={p.k} className="reveal">
                  <Image src={`/images/photo-${p.k}.jpg`} alt={p.a} width={p.w} height={p.h} sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw" />
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="section metrics" aria-labelledby="metrics-h">
          <div className="container">
            <h2 id="metrics-h" className="center reveal">Performance You Can Measure</h2>
            <dl className="metrics__row">
              {metrics.map((m) => (
                <div key={m.label} className="metric reveal">
                  <dt>{m.label}</dt>
                  <dd><CountUp to={m.to} decimals={m.decimals} suffix={m.suffix} /></dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Verify */}
        <section id="verify" className="section" aria-labelledby="verify-h">
          <div className="container verify">
            <div className="verify__text">
              <p className="pill reveal">Certification</p>
              <h2 id="verify-h" className="reveal">Verify an Edutou certificate</h2>
              <p className="muted reveal">Employers and colleges can confirm a certificate is genuine. Enter the ID printed on it.</p>
            </div>
            <VerifyForm />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="section" aria-labelledby="faq-h">
          <div className="container faq">
            <h2 id="faq-h" className="center reveal">FAQ</h2>
            <div className="faq__list">
              {faqs.map((f, i) => (
                <details key={f.q} name="faq" open={i === 0} className="reveal">
                  <summary>{f.q}<span className="faq__sign"><Icon name="plus" /></span></summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="section" aria-labelledby="cta-h">
          <div className="container">
            <div className="cta reveal">
              <span className="cta__glow" aria-hidden="true" />
              <h2 id="cta-h">Do it once. Do it right.</h2>
              <p>Harness the power of AI to grow your skills with confidence and clarity. Tell us about your campus or your goals, and the team will reply.</p>
              <div className="hero__actions">
                <a className="btn btn--light" href={APPLY_URL}>Apply Now <Icon name="arrow" size={18} /></a>
                <a className="btn btn--ghost" href={CONTACT}><Icon name="mail" size={18} /> {EMAIL}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="container">
          <div className="foot__top">
            <div>
              <a className="wordmark" href="#hero"><Image src="/logo.svg" alt="" width={32} height={32} />Edutou</a>
              <p className="muted">Edutou Skill Academy. AI-personalised learning, taught on campus.</p>
            </div>
            <ul>
              {[...links, { href: "#faq", label: "FAQ" }].map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </div>
          <p className="foot__mark" aria-hidden="true">Edutou</p>
          <div className="foot__row">
            <p>2026 Copyright © Edutou. All rights reserved.</p>
            <p>Contact: <a href={CONTACT}>{EMAIL}</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
