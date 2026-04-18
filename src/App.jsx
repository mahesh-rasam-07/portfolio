import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const NAV_LINKS = ["About", "Experience", "Skills", "Education", "Contact"];

const SKILLS = [
  { name: "Laravel", icon: "🔥", category: "Framework" },
  { name: "PHP", icon: "🐘", category: "Language" },
  { name: "CodeIgniter", icon: "⚡", category: "Framework" },
  { name: "PostgreSQL", icon: "🗄️", category: "Database" },
  { name: "RESTful APIs", icon: "🔗", category: "API" },
  { name: "Git / GitHub", icon: "📦", category: "Version Control" },
  { name: "Postman", icon: "🧪", category: "Testing" },
  { name: "PuTTY / SSH", icon: "🖥️", category: "DevOps" },
  { name: "MVC Architecture", icon: "🏗️", category: "Pattern" },
  { name: "Shopify", icon: "🛍️", category: "Platform" },
  { name: "Razorpay / Instamojo", icon: "💳", category: "Payments" },
  { name: "Problem Solving", icon: "🧩", category: "Soft Skill" },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Skycore",
    period: "May 2024 – Nov 2025",
    color: "#6366f1",
    bg: "#eef2ff",
    border: "#c7d2fe",
    points: [
      "Developed and maintained scalable web applications using PHP and Laravel, following MVC architecture for clean, modular code.",
      "Integrated and tested RESTful APIs using Postman for smooth frontend-backend communication.",
      "Worked with PostgreSQL for complex data management, optimising queries and ensuring database performance.",
      "Implemented secure authentication, validation, and session management features across applications.",
      "Managed server interactions via PuTTY, contributing to cloud-based infrastructure handling.",
      "Wrote reusable, testable code and conducted debugging, troubleshooting, and performance tuning.",
    ],
  },
  {
    role: "Software Engineer 1",
    company: "ImpactGuru",
    period: "July 2023 – May 2024",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    border: "#bae6fd",
    points: [
      "Spearheaded API development, ensuring robust and efficient data communication for seamless application functionality.",
      "Demonstrated mastery in both Laravel and CodeIgniter frameworks for diverse project requirements.",
      "Designed, developed, and maintained APIs to facilitate smooth integration between ImpactGuru's systems and external platforms.",
      "Resolved complex issues in Laravel and CodeIgniter, showcasing strong problem-solving skills.",
      "Utilised Git/GitHub to maintain a structured and organised codebase.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "Magical Balloons",
    period: "Aug 2022 – July 2023",
    color: "#10b981",
    bg: "#d1fae5",
    border: "#a7f3d0",
    points: [
      "Enhanced system performance and reduced response time by refactoring legacy code for improved reliability and scalability.",
      "Developed an intuitive Lead Management Portal, aligning authentication surveys with industry data protection standards.",
      "Integrated Razorpay and Instamojo into an e-commerce platform, ensuring secure course enrollment and streamlined payments.",
      "Engineered a comprehensive e-commerce platform from scratch with product catalog management and logistics optimisation.",
      "Designed and implemented a tailored Shopify website for a pharmaceutical company.",
    ],
  },
];

const STATS = [
  { label: "Years Experience", value: "3+" },
  { label: "Role", value: "Software Engineer" },
  { label: "Location", value: "Mumbai" },
];

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */

function useScrollSpy() {
  const [active, setActive] = useState("About");
  useEffect(() => {
    const handler = () => {
      const offsets = NAV_LINKS.map((id) => {
        const el = document.getElementById(id.toLowerCase());
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActive(closest.id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return [active, setActive];
}

function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── SMALL COMPONENTS ──────────────────────────────────────────────────── */

function FadeSection({ children, style }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ title, sub, centered }) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", marginBottom: 40 }}>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "#0f172a",
          margin: "0 0 8px",
          letterSpacing: "-0.8px",
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, color: "#94a3b8", margin: 0 }}>{sub}</p>
    </div>
  );
}

function EduCard({ degree, school, period, grade, icon, color, bg, border }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? bg : "#fff",
        border: `1.5px solid ${hovered ? color : "#e2e8f0"}`,
        borderRadius: 16,
        padding: "28px",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 32px ${color}22` : "none",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>{degree}</h3>
      <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 16px", lineHeight: 1.5 }}>{school}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            background: bg,
            border: `1px solid ${border}`,
            color,
            borderRadius: 20,
            padding: "4px 14px",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {grade}
        </span>
        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{period}</span>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */

export default function App() {
  const [active, setActive] = useScrollSpy();
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1e293b", background: "#f8fafc", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: navScrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: navScrolled ? "1px solid #e2e8f0" : "1px solid transparent",
          transition: "all 0.3s ease",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              MR
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>Mahesh Rasam</span>
          </div>

          <div style={{ display: "flex", gap: 4 }}>
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: active === link ? "#eef2ff" : "transparent",
                  color: active === link ? "#6366f1" : "#64748b",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 14px",
                  fontSize: 14,
                  fontWeight: active === link ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="about" style={{ maxWidth: 1000, margin: "0 auto", padding: "90px 2rem 70px" }}>
        <div style={{ display: "flex", gap: 52, alignItems: "center", flexWrap: "wrap" }}>

          {/* Avatar */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
              color: "#fff",
              flexShrink: 0,
              boxShadow: "0 12px 40px rgba(99,102,241,0.30)",
              letterSpacing: "-1px",
            }}
          >
            MR
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                color: "#16a34a",
                borderRadius: 20,
                padding: "4px 14px",
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 14,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              Available for opportunities
            </div>

            <h1
              style={{
                fontSize: 44,
                fontWeight: 800,
                margin: "0 0 6px",
                letterSpacing: "-1.5px",
                color: "#0f172a",
                lineHeight: 1.1,
              }}
            >
              Mahesh Rasam
            </h1>
            <p style={{ fontSize: 18, color: "#6366f1", fontWeight: 700, margin: "0 0 16px", letterSpacing: "-0.3px" }}>
              Laravel &amp; PHP Software Engineer
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#475569",
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 0 28px",
              }}
            >
              Laravel-focused software engineer with 3+ years of experience building scalable web
              applications, designing RESTful APIs, and managing complex databases. Known for clean,
              efficient code and seamless integrations.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="mailto:rasammahesh.work@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#6366f1",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "11px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                  transition: "all 0.2s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                Get in Touch
              </a>

              <a
                href="/Mahesh_Rasam_Resume.pdf"
                download="Mahesh_Rasam_Resume.pdf"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0f172a",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "11px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </a>

              <a
                href="https://www.linkedin.com/in/mahesh-rasam-10a544191/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  color: "#0a66c2",
                  border: "1.5px solid #0a66c2",
                  borderRadius: 10,
                  padding: "10px 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "all 0.2s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <FadeSection style={{ marginTop: 56 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "22px 16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: "#6366f1", marginBottom: 5, letterSpacing: "-0.5px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ background: "#fff", padding: "70px 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeSection>
            <SectionHeading title="Experience" sub="Where I've worked and what I've built" />
          </FadeSection>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: 23,
                top: 0,
                bottom: 0,
                width: 2,
                background: "linear-gradient(to bottom, #6366f1, #0ea5e9, #10b981)",
                borderRadius: 2,
              }}
            />
            {EXPERIENCE.map((exp, i) => (
              <FadeSection key={i} style={{ display: "flex", gap: 24, marginBottom: 36, position: "relative" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: exp.bg,
                    border: `2.5px solid ${exp.color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    zIndex: 1,
                    boxShadow: `0 0 0 4px #fff`,
                  }}
                >
                  <span style={{ fontSize: 18 }}>💼</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 16,
                    padding: "22px 26px",
                    transition: "box-shadow 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 3px", fontSize: 17, fontWeight: 700, color: "#0f172a" }}>
                        {exp.role}
                      </h3>
                      <span style={{ fontSize: 14, color: exp.color, fontWeight: 700 }}>{exp.company}</span>
                    </div>
                    <span
                      style={{
                        background: exp.bg,
                        border: `1px solid ${exp.border}`,
                        color: exp.color,
                        borderRadius: 20,
                        padding: "4px 14px",
                        fontSize: 12,
                        fontWeight: 700,
                        height: "fit-content",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul
                    style={{
                      margin: "14px 0 0",
                      paddingLeft: 18,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {exp.points.map((p, j) => (
                      <li key={j} style={{ fontSize: 14, color: "#475569", lineHeight: 1.65 }}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding: "70px 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeSection>
            <SectionHeading title="Skills" sub="Technologies and tools I work with" />
          </FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 14,
            }}
          >
            {SKILLS.map((skill, i) => (
              <FadeSection key={i}>
                <SkillCard skill={skill} />
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" style={{ background: "#fff", padding: "70px 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeSection>
            <SectionHeading title="Education" sub="Academic background" />
          </FadeSection>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 20,
            }}
          >
            <FadeSection>
              <EduCard
                degree="Bachelor of Computer Science"
                school="Thakur College of Science & Commerce"
                period="2019 – 2022"
                grade="A+ Grade"
                icon="🎓"
                color="#6366f1"
                bg="#eef2ff"
                border="#c7d2fe"
              />
            </FadeSection>
            <FadeSection>
              <EduCard
                degree="Secondary School (HSC)"
                school="Shri T.P Bhatia College of Science"
                period="2017 – 2019"
                grade="67.38%"
                icon="📚"
                color="#0ea5e9"
                bg="#e0f2fe"
                border="#bae6fd"
              />
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "70px 2rem", background: "#f8fafc" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <FadeSection>
            <SectionHeading title="Let's Connect" sub="Open to new opportunities and collaborations" centered />
            <p
              style={{
                fontSize: 15,
                color: "#64748b",
                lineHeight: 1.75,
                marginBottom: 44,
                maxWidth: 480,
                margin: "0 auto 44px",
              }}
            >
              I'm currently open to new roles and projects. Whether you have a position, a side project, or
              just want to say hello — feel free to reach out.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  label: "Email",
                  value: "rasammahesh.work@gmail.com",
                  href: "mailto:rasammahesh.work@gmail.com",
                  color: "#6366f1",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  label: "Phone",
                  value: "+91 9082831256",
                  href: "tel:+919082831256",
                  color: "#10b981",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                  label: "LinkedIn",
                  value: "mahesh-rasam-10a544191",
                  href: "https://www.linkedin.com/in/mahesh-rasam-10a544191/",
                  color: "#0a66c2",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  label: "Location",
                  value: "Malad, Mumbai 400097",
                  href: null,
                  color: "#f59e0b",
                },
              ].map((item, i) => (
                <ContactCard key={i} item={item} />
              ))}
            </div>

            {/* Big CTA */}
            <div style={{ marginTop: 40 }}>
              <a
                href="mailto:rasammahesh.work@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#6366f1",
                  color: "#fff",
                  borderRadius: 12,
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 700,
                  boxShadow: "0 6px 20px rgba(99,102,241,0.35)",
                  transition: "all 0.2s",
                }}
              >
                Say Hello 👋
              </a>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#0f172a",
          color: "#94a3b8",
          padding: "28px 2rem",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              MR
            </div>
            <span style={{ fontSize: 13 }}>Mahesh Rasam © {new Date().getFullYear()}</span>
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a
              href="mailto:rasammahesh.work@gmail.com"
              style={{ color: "#64748b", fontSize: 13, transition: "color 0.2s" }}
            >
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/mahesh-rasam-10a544191/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, color: "#60a5fa", fontSize: 13 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
            <a
              href="/Mahesh_Rasam_Resume.pdf"
              download="Mahesh_Rasam_Resume.pdf"
              style={{ color: "#64748b", fontSize: 13 }}
            >
              Resume ↓
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}

/* ─── SKILL CARD ─────────────────────────────────────────────────────────── */

function SkillCard({ skill }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#6366f1" : "#fff",
        border: `1px solid ${hovered ? "#6366f1" : "#e2e8f0"}`,
        borderRadius: 14,
        padding: "18px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 7,
        cursor: "default",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px rgba(99,102,241,0.25)" : "none",
      }}
    >
      <div style={{ fontSize: 22 }}>{skill.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: hovered ? "#fff" : "#1e293b" }}>
        {skill.name}
      </div>
      <div
        style={{
          fontSize: 11,
          color: hovered ? "#c7d2fe" : "#94a3b8",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {skill.category}
      </div>
    </div>
  );
}

/* ─── CONTACT CARD ───────────────────────────────────────────────────────── */

function ContactCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "#fff",
        border: `1px solid ${hovered ? item.color : "#e2e8f0"}`,
        borderRadius: 14,
        padding: "16px 24px",
        width: "100%",
        maxWidth: 460,
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 6px 20px ${item.color}22` : "none",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `${item.color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: item.color,
          flexShrink: 0,
        }}
      >
        {item.icon}
      </div>
      <div style={{ textAlign: "left", minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.07em",
            marginBottom: 3,
          }}
        >
          {item.label}
        </div>
        {item.href ? (
          <a
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            style={{
              fontSize: 14,
              color: item.color,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}
          >
            {item.value}
          </a>
        ) : (
          <span style={{ fontSize: 14, color: "#1e293b", fontWeight: 600 }}>{item.value}</span>
        )}
      </div>
    </div>
  );
}
