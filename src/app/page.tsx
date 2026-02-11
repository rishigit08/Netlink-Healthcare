"use client";

import { useState } from "react";

/* ==========================================================================
   DATA — Editable arrays/objects for every section
   ========================================================================== */

const TRUST_STATS = [
  { label: "Years", value: "28" },
  { label: "Certifications", value: "200+" },
  { label: "Awards", value: "50+" },
];

/* ---------- Section 2 — Domains & Value Chains ---------- */

interface ProductSolution {
  name: string;
  chainStep: number; // index into the value chain this chip relates to
}

interface Domain {
  id: string;
  title: string;
  tagline: string;
  chain: string[];
  products: ProductSolution[];
}

const DOMAINS: Domain[] = [
  {
    id: "hospitals",
    title: "Hospitals",
    tagline: "Efficient, Connected Care Operations",
    chain: [
      "Patient Registration",
      "Diagnosis",
      "Treatment",
      "Billing",
      "Discharge",
      "Follow-up",
    ],
    products: [
      { name: "Unified Case Tracking", chainStep: 0 },
      { name: "Clinical Insights Dashboard", chainStep: 1 },
      { name: "Treatment Protocol Engine", chainStep: 2 },
      { name: "Revenue Cycle Optimizer", chainStep: 3 },
      { name: "Discharge Planning Suite", chainStep: 4 },
      { name: "Patient Engagement Hub", chainStep: 5 },
      { name: "Bed Management System", chainStep: 0 },
      { name: "Interoperability Layer", chainStep: 2 },
    ],
  },
  {
    id: "pharma",
    title: "Pharmaceuticals",
    tagline: "Innovation → Manufacturing → Market",
    chain: [
      "Pre-clinical Research",
      "Clinical Trials",
      "Drug Approval",
      "Manufacturing",
      "Supply Chain & Sales",
      "Post-Market",
    ],
    products: [
      { name: "Trial Data Intelligence", chainStep: 1 },
      { name: "Regulatory Submission Tracker", chainStep: 2 },
      { name: "Batch Quality Monitor", chainStep: 3 },
      { name: "Supply Chain Orchestrator", chainStep: 4 },
      { name: "Adverse Event Tracker", chainStep: 5 },
      { name: "Research Collaboration Hub", chainStep: 0 },
      { name: "Compliance Reporting", chainStep: 2 },
      { name: "Demand Forecasting Engine", chainStep: 4 },
    ],
  },
  {
    id: "devices",
    title: "Medical Devices",
    tagline: "Certified Design-to-Deployment",
    chain: [
      "Need Identification",
      "Medical Device Design",
      "Validation & Approval",
      "Device Manufacturing",
      "Supply Chain & Sales",
      "Installation",
      "After Sales",
    ],
    products: [
      { name: "Requirements Traceability", chainStep: 0 },
      { name: "Design Control Platform", chainStep: 1 },
      { name: "FDA/CE Submission Manager", chainStep: 2 },
      { name: "Manufacturing Execution", chainStep: 3 },
      { name: "Logistics & Distribution", chainStep: 4 },
      { name: "Field Service Management", chainStep: 6 },
      { name: "Device Telemetry Hub", chainStep: 5 },
      { name: "Quality Management System", chainStep: 2 },
    ],
  },
  {
    id: "insurance",
    title: "Health Insurance",
    tagline: "Risk → Coverage → Claims",
    chain: [
      "Policy Design",
      "Customer Onboarding",
      "Policy Administration",
      "Claims Processing",
      "Fraud Control",
      "Renewal",
    ],
    products: [
      { name: "Risk Scoring Engine", chainStep: 0 },
      { name: "Digital Onboarding Portal", chainStep: 1 },
      { name: "Claims Workflow Automation", chainStep: 3 },
      { name: "Fraud Detection AI", chainStep: 4 },
      { name: "Member Self-Service Portal", chainStep: 2 },
      { name: "Renewal Intelligence", chainStep: 5 },
      { name: "Provider Network Analytics", chainStep: 0 },
      { name: "Compliance Reporting", chainStep: 2 },
    ],
  },
  {
    id: "diagnostics",
    title: "Diagnostics",
    tagline: "Accurate Results, Faster Turnaround",
    chain: [
      "Care Network Tie-ups",
      "Test Order Intake",
      "Sample Collection",
      "Billing",
      "Testing",
      "Report Delivery",
    ],
    products: [
      { name: "Network Partnership Portal", chainStep: 0 },
      { name: "Order Management System", chainStep: 1 },
      { name: "Sample Tracking & LIMS", chainStep: 2 },
      { name: "Revenue Cycle Manager", chainStep: 3 },
      { name: "Lab Automation Suite", chainStep: 4 },
      { name: "Report Delivery Engine", chainStep: 5 },
      { name: "Capacity & Demand Forecasting", chainStep: 4 },
      { name: "Interoperability Layer", chainStep: 0 },
    ],
  },
];

/* ---------- Section 3 — Outcome Stats ---------- */

const OUTCOME_STATS = [
  {
    value: "20%",
    label: "improvement in case tracking efficiency",
  },
  {
    value: "35%",
    label: "reduction in patient wait times",
  },
  {
    value: "3×",
    label: "faster identification, lowering rehospitalizations",
  },
];

/* ---------- Section 4 — IT Services ---------- */

interface ServiceCard {
  title: string;
  oneLiner: string;
  bullets: string[];
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "AI, Security, Data & Intelligence Enablement",
    oneLiner: "From risk and uncertainty to trusted, informed operations",
    bullets: [
      "AI & Advanced Analytics",
      "Data Analytics & Business Intelligence",
      "Cybersecurity & Compliance Services",
    ],
  },
  {
    title: "Managed IT & Clinical Systems Operations",
    oneLiner: "From operational burden to reliable, always-on systems",
    bullets: [
      "Managed IT Services & Outsourcing",
      "EHR / EMR Implementation & Support",
      "Ongoing System Optimization",
    ],
  },
  {
    title: "Cloud, Platform & Integration Modernization",
    oneLiner: "From rigid infrastructure to scalable, connected platforms",
    bullets: [
      "Cloud Migration & Managed Cloud",
      "Interoperability & Integration Services",
      "Platform & Infrastructure Modernization",
    ],
  },
  {
    title: "Lifecycle Operations & System Governance",
    oneLiner: "From point solutions to systems that endure and improve",
    bullets: [
      "Continuous Operations & Reliability",
      "Lifecycle Ownership & Optimization",
      "Governance, Change & Readiness",
    ],
  },
];

/* ---------- Section 5 — Case Studies ---------- */

interface CaseStudy {
  title: string;
  tags: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title:
      "Reduced behavioral-health recidivism through predictive intelligence",
    tags: ["Healthcare", "Analytics", "AI"],
  },
  {
    title:
      "Enabled real-time nutrition research insights for infants and young children",
    tags: ["Healthcare", "Research", "Data"],
  },
  {
    title:
      "Automated routine patient queries with conversational intelligence",
    tags: ["Healthcare", "Automation", "NLP"],
  },
];

const OTHER_INDUSTRIES = [
  "Government",
  "Automotive",
  "Banking",
  "Insurance",
  "Manufacturing",
  "Supply Chain",
  "Telecom",
  "BPO",
];

/* ---------- Nav links ---------- */

const NAV_LINKS = [
  "Services",
  "Platforms & Products",
  "Partnerships",
  "About",
  "Careers",
];

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

/* ---- Navigation ---- */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-400 to-navy-300" />
          <span className="text-white font-bold text-lg tracking-tight">
            Netlink
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg bg-navy-500 hover:bg-navy-400 text-white text-sm font-semibold transition-colors"
          >
            Let&apos;s Talk
          </a>
          <button
            aria-label="Toggle menu"
            className="lg:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/5 bg-navy-950/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1320px] px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-300 hover:text-white transition-colors py-1"
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              className="sm:hidden inline-flex items-center justify-center px-5 py-2 rounded-lg bg-navy-500 hover:bg-navy-400 text-white text-sm font-semibold transition-colors mt-2"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ---- Hero ---- */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-800 overflow-hidden pt-16">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-navy-500/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
        {/* Left — Copy */}
        <div className="max-w-xl">
          <p className="text-navy-300 text-sm font-semibold tracking-widest uppercase mb-5">
            Healthcare &middot; AI &middot; Ecosystem
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-[1.1] tracking-tight">
            Make healthcare work as a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-300 to-blue-400">
              connected ecosystem
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-lg">
            Embedding AI into the framework, so it can sense, learn, and respond
            as one.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#ecosystem"
              className="inline-flex items-center px-7 py-3.5 rounded-lg bg-navy-500 hover:bg-navy-400 text-white font-semibold transition-colors text-sm"
            >
              View use cases
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 rounded-lg border border-white/20 hover:border-white/40 text-white font-semibold transition-colors text-sm"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

        {/* Right — Visual placeholder */}
        <div className="relative flex items-center justify-center" aria-hidden="true">
          <div className="w-full max-w-md aspect-square relative">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-navy-600/40" />
            <div className="absolute inset-6 rounded-full border border-navy-500/30" />
            <div className="absolute inset-12 rounded-full border border-navy-400/20" />
            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-navy-400/40 to-navy-300/20 blur-sm" />
              <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-navy-400 to-blue-500 opacity-60" />
            </div>
            {/* Orbital nodes */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <div
                key={deg}
                className="absolute w-3.5 h-3.5 rounded-full bg-navy-300/70"
                style={{
                  top: `${50 - 42 * Math.cos((deg * Math.PI) / 180)}%`,
                  left: `${50 + 42 * Math.sin((deg * Math.PI) / 180)}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
            {/* Connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1="50"
                  y1="50"
                  x2={50 + 42 * Math.sin((deg * Math.PI) / 180)}
                  y2={50 - 42 * Math.cos((deg * Math.PI) / 180)}
                  stroke="rgba(96,165,250,0.15)"
                  strokeWidth="0.3"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/5 bg-navy-950/60 backdrop-blur-sm">
        <div className="mx-auto max-w-[1320px] px-6 py-5 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {TRUST_STATS.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{s.value}</span>
              <span className="text-sm text-gray-400">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Section 2: Ecosystem Map ---- */

function EcosystemMap() {
  const [activeDomain, setActiveDomain] = useState(0);
  const [hoveredChip, setHoveredChip] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const domain = DOMAINS[activeDomain];

  const activeStepFromChip =
    hoveredChip !== null ? domain.products[hoveredChip]?.chainStep : null;

  const isStepHighlighted = (stepIdx: number) =>
    stepIdx === hoveredStep || stepIdx === activeStepFromChip;

  return (
    <section
      id="ecosystem"
      className="relative bg-gradient-to-b from-navy-900 to-navy-950 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Inside the Healthcare Ecosystem
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            An integrated view of how Netlink touches multiple aspects of the
            care framework.
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* Left — Domain list */}
          <div className="flex flex-col gap-2">
            {DOMAINS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => {
                  setActiveDomain(i);
                  setHoveredChip(null);
                  setHoveredStep(null);
                }}
                className={`text-left px-5 py-4 rounded-xl transition-all border ${
                  activeDomain === i
                    ? "bg-navy-700/60 border-navy-500/50 shadow-lg shadow-navy-500/10"
                    : "bg-transparent border-white/5 hover:bg-navy-800/50 hover:border-white/10"
                }`}
              >
                <span
                  className={`block text-sm font-semibold ${
                    activeDomain === i ? "text-white" : "text-gray-300"
                  }`}
                >
                  {d.title}
                </span>
                <span className="block text-xs text-gray-500 mt-0.5">
                  {d.tagline}
                </span>
              </button>
            ))}
          </div>

          {/* Right — Value chain visualization */}
          <div className="bg-navy-800/40 border border-white/5 rounded-2xl p-6 sm:p-8 min-h-[420px]">
            {/* Tagline */}
            <p className="text-navy-300 text-sm font-medium mb-8">
              {domain.tagline}
            </p>

            {/* Horizontal stepper */}
            <div className="relative mb-10">
              {/* Connecting line */}
              <div className="absolute top-5 left-0 right-0 h-px bg-navy-600/60" />

              <div className="relative flex justify-between overflow-x-auto gap-2 pb-2">
                {domain.chain.map((step, idx) => (
                  <div
                    key={step}
                    className="flex flex-col items-center min-w-[110px] group cursor-default"
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Node */}
                    <div
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                        isStepHighlighted(idx)
                          ? "bg-navy-500 text-white scale-110 shadow-lg shadow-navy-500/30"
                          : "bg-navy-700 text-gray-400 group-hover:bg-navy-600"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    {/* Label */}
                    <span
                      className={`mt-3 text-xs text-center leading-snug transition-colors px-1 ${
                        isStepHighlighted(idx) ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product chips */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-4">
                Productized Solutions
              </p>
              <div className="flex flex-wrap gap-2.5">
                {domain.products.map((p, idx) => (
                  <button
                    key={p.name}
                    onMouseEnter={() => setHoveredChip(idx)}
                    onMouseLeave={() => setHoveredChip(null)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200 cursor-default ${
                      hoveredChip === idx
                        ? "bg-navy-500/30 border-navy-400/60 text-white shadow-md shadow-navy-500/10"
                        : hoveredStep !== null &&
                          p.chainStep === hoveredStep
                        ? "bg-navy-600/30 border-navy-500/40 text-navy-200"
                        : "bg-navy-800/60 border-white/5 text-gray-400 hover:text-gray-300 hover:border-white/10"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Section 3: Outcome Stats ---- */

function OutcomeStats() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          What Changes When Everything Connects
        </h2>
        <p className="mt-3 text-gray-500 text-lg">
          From Intelligent Systems to Outcomes
        </p>

        <div className="mt-16 grid sm:grid-cols-3 gap-10">
          {OUTCOME_STATS.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-extrabold text-navy-500 tracking-tight">
                {stat.value}
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed max-w-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 text-xs text-gray-400">
          *Results vary by engagement.
        </p>
      </div>
    </section>
  );
}

/* ---- Section 4: IT Services ---- */

function ServicesSection() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            The Technology Layer of the Ecosystem
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            See how we ensure healthcare operations remain stable, secure, and
            operational as demands and complexity increase.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="group bg-white border border-gray-200/80 rounded-2xl p-8 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/80 transition-all duration-200"
            >
              {/* Icon placeholder */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy-500 to-navy-400 mb-5 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-bold text-gray-900 leading-snug">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {card.oneLiner}
              </p>
              <ul className="mt-5 space-y-2.5">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-navy-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Section 5: Case Studies + Other Industries ---- */

function CaseStudiesSection() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Part A — Case Studies */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Systems thinking, proven in practice
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Our work across complex, regulated environments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.title}
              className="group bg-surface border border-gray-200/80 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-200"
            >
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-navy-800 to-navy-600 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-navy-100 text-navy-600 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                  {cs.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Part B — Other Industries */}
        <div className="border-t border-gray-200 pt-16">
          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Beyond One Industry
            </h3>
            <p className="mt-3 text-gray-500 text-base leading-relaxed">
              Presence Across Complex Industry Ecosystems
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {OTHER_INDUSTRIES.map((ind) => (
              <div
                key={ind}
                className="flex items-center justify-center py-5 px-4 rounded-xl border border-gray-200/80 bg-surface text-sm font-semibold text-gray-700 hover:border-navy-300/60 hover:text-navy-600 transition-colors"
              >
                {ind}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Section 6: Final CTA ---- */

function FinalCTA() {
  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-navy-900 to-navy-950 py-24 sm:py-32 overflow-hidden"
    >
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-navy-500/[0.06] blur-[100px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6 text-center">
        {/* Company stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-10">
          {TRUST_STATS.map((s) => (
            <div
              key={s.label}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5"
            >
              <span className="font-bold text-white">{s.value}</span>{" "}
              <span className="text-gray-400 text-sm">{s.label}</span>
            </div>
          ))}
        </div>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-4">
          Systems thinking is the strategy. AI is the engine.{" "}
          <span className="text-white font-semibold">
            Netlink is the integrator.
          </span>
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl mx-auto mt-8">
          Ready to make your systems think together?
        </h2>

        <div className="mt-10">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-lg bg-navy-500 hover:bg-navy-400 text-white font-semibold transition-colors text-base"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ---- */

function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/5 py-8">
      <div className="mx-auto max-w-[1320px] px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-navy-400 to-navy-300" />
          <span className="text-white text-sm font-semibold">Netlink</span>
        </div>
        <p className="text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Netlink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ==========================================================================
   PAGE — Assemble all sections
   ========================================================================== */

export default function HealthcarePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <EcosystemMap />
        <OutcomeStats />
        <ServicesSection />
        <CaseStudiesSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
