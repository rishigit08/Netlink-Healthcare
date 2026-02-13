"use client";

import { useState, useEffect, useRef } from "react";

/* ==========================================================================
   DATA — Editable arrays/objects for every section
   ========================================================================== */

const TRUST_STATS = [
  { label: "Years", value: "28" },
  { label: "Certifications", value: "200+" },
  { label: "Awards", value: "50+" },
];

/* Healthcare filled icon SVG paths (viewBox 0 0 48 48) */
const HEALTH_ICONS: { label: string; viewBox: string; path: string }[] = [
  {
    label: "Health Alt",
    viewBox: "0 0 48 48",
    path: "M6 9C6 7.34315 7.34315 6 9 6L39 6C40.6569 6 42 7.34315 42 9V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39L6 9ZM21.9998 22V14L25.9998 14V22H33.9998L33.9998 26H25.9998V34H21.9998V26H13.9998L13.9998 22H21.9998Z",
  },
  {
    label: "Blood Drop",
    viewBox: "0 0 48 48",
    path: "M24 4L23.3098 4.66021L23.3061 4.6638L23.2973 4.67227L23.2648 4.70366C23.2367 4.73095 23.1956 4.7709 23.1426 4.82303C23.0366 4.92728 22.8826 5.08029 22.6874 5.27827C22.297 5.67417 21.7417 6.25029 21.0763 6.97632C19.7465 8.42723 17.9719 10.4826 16.1951 12.8995C12.6815 17.6788 9 24.0809 9 30.0801C9 37.845 15.796 44 24 44C32.204 44 39 37.845 39 30.0801C39 24.0809 35.3185 17.6788 31.8049 12.8995C30.0281 10.4826 28.2535 8.42723 26.9237 6.97632C26.2583 6.25029 25.703 5.67417 25.3126 5.27827C25.1174 5.08029 24.9634 4.92728 24.8574 4.82303C24.8044 4.7709 24.7634 4.73095 24.7352 4.70366L24.7027 4.67227L24.6939 4.6638L24.6902 4.66021L24 4ZM15.4649 31.3985C15.2943 30.8716 14.7301 30.5833 14.2049 30.7545C13.6796 30.9257 13.3922 31.4915 13.5628 32.0183C14.3133 34.3349 15.7757 36.3536 17.7404 37.7853C19.7052 39.217 22.0714 39.9882 24.5 39.9882C25.0523 39.9882 25.5 39.5391 25.5 38.9852C25.5 38.4313 25.0523 37.9822 24.5 37.9822C22.4938 37.9822 20.5391 37.3452 18.916 36.1625C17.293 34.9798 16.0849 33.3121 15.4649 31.3985Z",
  },
  {
    label: "Heart Cardiogram",
    viewBox: "0 0 48 48",
    path: "M9 19.0345C9 13.3091 12.8117 8 18.0312 8C21.6533 8 24.341 10.382 26 13.7611C27.6589 10.3822 30.3466 8 33.9688 8C39.1889 8 43 13.31 43 19.0345C43 31.2888 26 40 26 40C26 40 14.5487 34.4872 10.4431 25.4444H20.5848L22.1968 22.5788L24.0797 29.1692L28.4891 23.5H34V21.5H27.5109L24.9203 24.8308L22.8032 17.4212L19.4152 23.4444H9.67984C9.24643 22.0453 9 20.5731 9 19.0345Z",
  },
  {
    label: "Medicine Bottle",
    viewBox: "0 0 48 48",
    path: "M9 7C9 5.34315 10.3431 4 12 4H36C37.6569 4 39 5.34315 39 7V15C39 16.6569 37.6569 18 36 18V41C36 42.6569 34.6569 44 33 44H15C13.3431 44 12 42.6569 12 41L12 18C10.3431 18 9 16.6569 9 15V7ZM16 16L16 6H12C11.4477 6 11 6.44772 11 7V15C11 15.5523 11.4477 16 12 16H16ZM18 16H23L23 6H18V16ZM25 16H30V6H25V16ZM32 16H36C36.5523 16 37 15.5523 37 15V7C37 6.44772 36.5523 6 36 6H32V16ZM23 30V35H25V30H30V28H25V23H23V28H18V30H23Z",
  },
  {
    label: "Body",
    viewBox: "0 0 48 48",
    path: "M24 13C26.4853 13 28.5 10.9853 28.5 8.5C28.5 6.01472 26.4853 4 24 4C21.5147 4 19.5 6.01472 19.5 8.5C19.5 10.9853 21.5147 13 24 13ZM37.9201 15.4404C38.2292 16.5008 37.6201 17.6111 36.5596 17.9201C34.1842 18.6124 32.0379 19.1337 30 19.4812V30.9944L30 31V42C30 43.0693 29.1589 43.9495 28.0906 43.998C27.0224 44.0464 26.105 43.246 26.0082 42.1811L25.0082 31.1811C25.0027 31.1206 25 31.0602 25 31H23C23 31.0602 22.9973 31.1206 22.9918 31.1811L21.9918 42.1811C21.895 43.246 20.9776 44.0464 19.9094 43.998C18.8412 43.9495 18 43.0693 18 42L18 19.4443C15.9674 19.0938 13.8288 18.583 11.4653 17.9272C10.4009 17.6319 9.7775 16.5296 10.0728 15.4653C10.3682 14.4009 11.4704 13.7775 12.5348 14.0728C17.1431 15.3515 20.6058 15.9845 24.0087 15.9997C27.4047 16.0149 30.8587 15.4152 35.4404 14.0799C36.5009 13.7708 37.6111 14.3799 37.9201 15.4404Z",
  },
  {
    label: "Healthcare IT",
    viewBox: "0 0 48 48",
    path: "M8.9999 10C7.89533 10 6.9999 10.8954 6.9999 12V31C6.9999 32.1046 7.89533 33 8.9999 33H38.9999C40.1045 33 40.9999 32.1046 40.9999 31V12C40.9999 10.8954 40.1045 10 38.9999 10H8.9999ZM22.4999 17V20.5H18.9999V22.5H22.4999V26H24.4999V22.5H27.9999V20.5H24.4999V17H22.4999ZM10.9999 29V14H36.9999V29H10.9999ZM8.9999 13C8.9999 12.4477 9.44761 12 9.9999 12H37.9999C38.5522 12 38.9999 12.4477 38.9999 13V30C38.9999 30.5523 38.5522 31 37.9999 31H9.9999C9.44761 31 8.9999 30.5523 8.9999 30V13ZM7.05991 31.4719C7.24242 31.1784 7.5635 31 7.90908 31H39.8822C40.2197 31 40.5345 31.1703 40.7192 31.4528L43.9883 36.4528C44.4231 37.1179 43.946 38 43.1513 38H4.79944C4.015 38 3.53599 37.138 3.95028 36.4719L7.05991 31.4719Z",
  },
];

/* Orbit config */
const ORBIT_RADIUS_PCT = 40; // matches --orbit-radius in CSS (40cqi ≈ 40%)
const HUB_RADIUS_PCT = 8;    // hub visual radius in %
const ICON_RADIUS_PCT = 3.5; // icon container half-size in %

/* Pre-computed orbital node positions (avoids hydration mismatch from inline Math)
   CSS orbit animation starts at 3 o'clock (translateX = right), so we add 90° to
   align SVG spoke endpoints with the actual CSS icon positions. */
const ORBITAL_NODES = [0, 60, 120, 180, 240, 300].map((deg, i) => {
  const svgDeg = deg + 90; // offset: CSS 0° = right, SVG 0° = top
  const rad = (svgDeg * Math.PI) / 180;
  const cx = Math.round((50 + ORBIT_RADIUS_PCT * Math.cos(rad)) * 100) / 100;
  const cy = Math.round((50 + ORBIT_RADIUS_PCT * Math.sin(rad)) * 100) / 100;
  return {
    deg,
    cx,
    cy,
    icon: HEALTH_ICONS[i],
  };
});

/* ---------- Section 2 — Healthcare Domains ---------- */

interface Domain {
  id: string;
  name: string;
  headline: string;
  description: string;
  valueChainSteps: string[];
  solutions: string[];
  imageSrc: string; // TODO: replace with real assets
}

const DOMAINS: Domain[] = [
  {
    id: "hospitals",
    name: "Hospitals",
    headline: "Efficient, Connected Care Operations",
    description:
      "Enabling coordinated care and efficient operations by connecting clinical systems, workflows, and data.",
    valueChainSteps: [
      "Patient Registration",
      "Diagnosis",
      "Treatment",
      "Billing",
      "Discharge",
      "Follow-up",
    ],
    solutions: [
      "Advanced EMR Systems",
      "Patient Enquiry Tracking System",
      "OPD & IPD Dashboards",
      "Hospital Operations Dashboard",
      "Care Workflow Automation",
    ],
    imageSrc: "/images/domains/hospitals.png", // TODO: add asset
  },
  {
    id: "pharma",
    name: "Pharmaceuticals",
    headline: "Innovation \u2192 Manufacturing \u2192 Market",
    description:
      "Supporting faster research and compliant operations by unifying data across trials, supply, and regulatory systems.",
    valueChainSteps: [
      "Pre-clinical Research",
      "Clinical Trials",
      "Drug Approval",
      "Manufacturing",
      "Supply Chain & Sales",
      "Post-Market",
    ],
    solutions: [
      "Trial Data Management & Insights",
      "Regulatory Document Automation",
      "Pharma Demand & Logistics Forecasting",
      "Quality & Compliance Automation",
      "Supply Visibility Dashboards",
    ],
    imageSrc: "/images/domains/pharma.png", // TODO: add asset
  },
  {
    id: "devices",
    name: "Medical Devices",
    headline: "Certified Design-to-Deployment",
    description:
      "Improving care delivery by aligning device data, reporting, and analytics.",
    valueChainSteps: [
      "Need Identification",
      "Medical Device Design",
      "Validation & Approval",
      "Device Manufacturing",
      "Supply Chain & Sales",
      "Installation",
      "After Sales",
    ],
    solutions: [
      "Design Lifecycle Automation",
      "Validation & Test Automation",
      "Compliance Documentation Control",
      "Manufacturing & QA Dashboards",
      "Service & Installation Workflow Tools",
    ],
    imageSrc: "/images/domains/devices.png", // TODO: add asset
  },
  {
    id: "insurance",
    name: "Health Insurance",
    headline: "Risk \u2192 Coverage \u2192 Claims",
    description:
      "Driving consistent, efficient decisions by integrating claims, risk, government care initiatives, and member data across operations.",
    valueChainSteps: [
      "Policy Design",
      "Customer Onboarding",
      "Policy Administration",
      "Claims Processing",
      "Fraud Control",
      "Renewal",
    ],
    solutions: [
      "Customer Onboarding & Liability Assessment",
      "Personalized Member Dashboard",
      "Automated Claims & Billing System",
      "Claim Investigation Case Management",
      "Risk & Compliance Analytics",
    ],
    imageSrc: "/images/domains/insurance.png", // TODO: add asset
  },
  {
    id: "diagnostics",
    name: "Diagnostics",
    headline: "Accurate Results, Faster Turnaround",
    description:
      "Reliable test execution, fast turnaround, and system-level integration, connecting laboratory systems with care networks.",
    valueChainSteps: [
      "Care Network Tie-ups",
      "Test Order Intake",
      "Sample Collection",
      "Billing",
      "Testing",
      "Report Delivery",
    ],
    solutions: [
      "Lab Order & Intake Automation",
      "Sample Tracking System",
      "Billing Workflow Automation",
      "Lab Operations Dashboard",
      "Report Delivery & Integration Layer",
    ],
    imageSrc: "/images/domains/diagnostics.png", // TODO: add asset
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

interface ServiceBullet {
  name: string;
  description: string;
}

interface ServiceCard {
  title: string;
  oneLiner: string;
  bullets: ServiceBullet[];
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    title: "AI, Security, Data & Intelligence Enablement",
    oneLiner: "From risk and uncertainty to trusted, informed operations",
    bullets: [
      { name: "AI & Advanced Analytics", description: "Applies intelligence within workflows to support decisions, efficiency, and outcome improvement." },
      { name: "Data Analytics & Business Intelligence", description: "Improves visibility across clinical and operational functions through reliable data insights." },
      { name: "Cybersecurity & Compliance Services", description: "Protects sensitive healthcare data while meeting regulatory and privacy requirements." },
    ],
  },
  {
    title: "Managed IT & Clinical Systems Operations",
    oneLiner: "From operational burden to reliable, always-on systems",
    bullets: [
      { name: "Managed IT Services & Outsourcing", description: "Ensure continuity across core healthcare systems by operating, supporting, and optimizing them over time." },
      { name: "EHR / EMR Implementation & Support", description: "Enables consistent care delivery by implementing, integrating, and maintaining clinical record systems." },
      { name: "Ongoing System Optimization", description: "Improves performance and usability as clinical, regulatory, and operational needs evolve." },
    ],
  },
  {
    title: "Cloud, Platform & Integration Modernization",
    oneLiner: "From rigid infrastructure to scalable, connected platforms",
    bullets: [
      { name: "Cloud Migration & Managed Cloud", description: "Transitions healthcare systems to resilient cloud environments with ongoing operational oversight." },
      { name: "Interoperability & Integration Services", description: "Connects applications and data across systems to reduce silos and manual work." },
      { name: "Platform & Infrastructure Modernization", description: "Updates legacy platforms to support scale, reliability, and future digital initiatives." },
    ],
  },
  {
    title: "Lifecycle Operations & System Governance",
    oneLiner: "From point solutions to systems that endure and improve",
    bullets: [
      { name: "Continuous Operations & Reliability", description: "Maintains system stability, performance, and compliance as environments change." },
      { name: "Lifecycle Ownership & Optimization", description: "Manages systems across implementation, scale, upgrades, and long-term evolution." },
      { name: "Governance, Change & Readiness", description: "Establishes controls and operating models that support safe adaptation and sustained outcomes." },
    ],
  },
];

/* ---------- Section 5 — Case Studies ---------- */

interface CaseStudy {
  title: string;
  tags: string[];
  imageSrc?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    title:
      "Reduced behavioral-health recidivism through predictive intelligence",
    tags: ["Healthcare", "Analytics", "AI"],
    imageSrc: "/images/case-studies/healthcare-visual.png",
  },
  {
    title:
      "Enabled real-time nutrition research insights for infants and young children",
    tags: ["Healthcare", "Research", "Data"],
    imageSrc: "/images/case-studies/vr-healthcare.png",
  },
  {
    title:
      "Automated routine patient queries with conversational intelligence",
    tags: ["Healthcare", "Automation", "NLP"],
    imageSrc: "/images/case-studies/pills-gold.png",
  },
];

const OTHER_INDUSTRIES: { name: string; icon: string }[] = [
  { name: "Government", icon: "M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" },
  { name: "Automotive", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" },
  { name: "Banking", icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" },
  { name: "Insurance", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
  { name: "Manufacturing", icon: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" },
  { name: "Supply Chain", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m-2.25 0h2.25M6.75 18.75v-6h4.5m0 0v-3.75m0 3.75h4.5V7.5" },
  { name: "Telecom", icon: "M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" },
  { name: "BPO", icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" },
];

/* ---------- Nav links ---------- */

interface NavLink {
  label: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home" },
  { label: "Services", hasDropdown: true },
  { label: "Platform And Products", hasDropdown: true },
  { label: "Partnerships", hasDropdown: true },
  { label: "About Us", hasDropdown: true },
  { label: "Careers", hasDropdown: true },
];

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */

/* ---- Navigation ---- */

function ChevronDown() {
  return (
    <svg className="w-3.5 h-3.5 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/60">
      <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img
            src="/netlink-logo.png"
            alt="Netlink"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href="#"
              className="flex items-center px-3.5 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-md"
            >
              {link.label}
              {link.hasDropdown && <ChevronDown />}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-500 hover:bg-navy-400 text-white text-sm font-semibold transition-colors"
          >
            Let&apos;s Talk
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <button
            aria-label="Toggle menu"
            className="lg:hidden text-gray-600 hover:text-gray-900"
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
        <div className="lg:hidden border-t border-gray-200/60 bg-white">
          <div className="mx-auto max-w-[1320px] px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors py-2.5"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown />}
              </a>
            ))}
            <a
              href="#contact"
              className="sm:hidden inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-navy-500 hover:bg-navy-400 text-white text-sm font-semibold transition-colors mt-3"
            >
              Let&apos;s Talk
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16">
      <div className="relative mx-auto max-w-[1320px] px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20 -mt-10">
        {/* Left — Copy */}
        <div className="max-w-xl">
          <h1 className="text-3xl sm:text-[2.7rem] lg:text-[3.15rem] font-extrabold text-gray-900 leading-[0.95] tracking-tight">
            Make healthcare work as a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-500 to-blue-500">
              connected ecosystem
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
            Embedding AI into the framework, so it can sense, learn, and respond
            as one.
          </p>
          <div className="mt-10 mb-16">
            <a
              href="#ecosystem"
              className="inline-flex items-center px-7 py-3.5 rounded-lg bg-navy-500 hover:bg-navy-400 text-white font-semibold transition-colors text-sm"
            >
              View use cases
            </a>
          </div>
        </div>

        {/* Right — Orbit illustration */}
        <div className="relative flex items-center justify-center" aria-hidden="true">
          {/* Blue gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100/60 via-blue-50/40 to-transparent blur-2xl" />
          <div className="w-full max-w-md aspect-square relative" style={{ containerType: "inline-size" }}>

            {/* Layer 1 — Dashed orbit rings (spin with everything) */}
            <div className="absolute inset-0 animate-spin-slow" style={{ zIndex: 0 }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#93C5FD" strokeWidth="0.4" strokeDasharray="4 6" opacity="0.4" />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#93C5FD" strokeWidth="0.3" strokeDasharray="3 5" opacity="0.25" />
                <circle cx="50" cy="50" r="16" fill="none" stroke="#93C5FD" strokeWidth="0.25" strokeDasharray="2 4" opacity="0.15" />
              </svg>
            </div>

            {/* Layer 2 — Rotating connector spokes (hub mask hides center overlap; lines extend to full orbit radius so icons naturally sit on endpoints) */}
            <div className="absolute inset-0 animate-spin-slow" style={{ zIndex: 1 }}>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <mask id="hub-mask">
                    <rect width="100" height="100" fill="white" />
                    <circle cx="50" cy="50" r="9" fill="black" />
                  </mask>
                </defs>
                <g mask="url(#hub-mask)">
                  {ORBITAL_NODES.map((node) => (
                    <line
                      key={node.deg}
                      x1="50"
                      y1="50"
                      x2={node.cx}
                      y2={node.cy}
                      stroke="#93C5FD"
                      strokeWidth="0.5"
                      opacity="0.4"
                    />
                  ))}
                </g>
              </svg>
            </div>

            {/* Layer 3 — Hub core (sits above connectors) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16" style={{ zIndex: 2 }}>
              <div className="w-full h-full rounded-full bg-gradient-to-br from-navy-400 to-blue-500 shadow-xl shadow-blue-500/25 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Layer 4 — Healthcare icons (always upright, on top) */}
            {ORBITAL_NODES.map((node, i) => (
              <div
                key={node.deg}
                className="animate-orbit-upright w-[62px] h-[62px]"
                style={{ animationDelay: `${-(i * 31) / 6}s`, zIndex: 3 }}
              >
                <div className="w-full h-full rounded-2xl bg-white border border-gray-200/80 flex items-center justify-center shadow-lg shadow-gray-300/40">
                  <svg
                    className="w-7 h-7"
                    viewBox={node.icon.viewBox}
                    fill="#1d4ed8"
                    stroke="none"
                  >
                    <path fillRule="evenodd" clipRule="evenodd" d={node.icon.path} />
                  </svg>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="absolute bottom-0 inset-x-0 border-t border-gray-200/60 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-[1320px] px-6 py-5 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
          {OUTCOME_STATS.map((s) => (
            <div key={s.value} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">{s.value}</span>
              <span className="text-sm text-gray-500 capitalize">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Section 2: Domain Module ---- */

function EcosystemMap() {
  const [activeDomain, setActiveDomain] = useState(0);
  const domain = DOMAINS[activeDomain];

  return (
    <section id="ecosystem" className="relative bg-blue-50/60 pt-10 sm:pt-14 pb-14 sm:pb-20 mt-[30px]">
      <div className="mx-auto max-w-[1320px] px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Inside the Healthcare Ecosystem
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            An integrated view of how Netlink touches multiple aspects of the
            care framework.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_480px] gap-10 items-center">
          {/* ===== Left: Line-separated Accordion List ===== */}
          <div className="flex flex-col">
            {DOMAINS.map((d, i) => {
              const isOpen = activeDomain === i;
              return (
                <div key={d.id}>
                  {/* Top divider — blue when this item is open */}
                  <div
                    className={`h-[2px] transition-colors duration-300 ${
                      isOpen ? "bg-gray-400" : "bg-gray-200"
                    }`}
                  />

                  {/* Accordion header — always on top */}
                  <button
                    onClick={() => setActiveDomain(i)}
                    className="w-full pt-4 pb-2 text-left group"
                  >
                    <span
                      className={`text-base font-semibold transition-colors ${
                        isOpen ? "text-gray-900" : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {d.name}
                    </span>
                  </button>

                  {/* Accordion body — always expands below */}
                  {isOpen && (
                    <div className="pb-8 animate-[fadeIn_300ms_ease-in-out]">
                      {/* Value Chain Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {d.valueChainSteps.map((step) => (
                          <span
                            key={step}
                            className="px-3 py-1 rounded-full bg-gray-200 border border-gray-300 text-xs text-gray-700"
                          >
                            {step}
                          </span>
                        ))}
                      </div>
                      {/* Solutions */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-2">{d.headline}</p>
                      <ul className="flex flex-col gap-1 list-disc list-inside">
                        {d.solutions.map((sol) => (
                          <li
                            key={sol}
                            className="text-sm text-gray-900"
                          >
                            {sol}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            {/* Bottom closing line */}
            <div className="h-[2px] bg-gray-200" />
          </div>

          {/* ===== Right: Visual Module ===== */}
          <div className="relative overflow-hidden bg-gray-100 min-h-[560px] p-8 flex flex-col justify-between">
            {/* Background image */}
            <img
              src={domain.imageSrc}
              alt={domain.name}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />

            {/* Subtle gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

            {/* Spacer */}
            <div className="relative" />

            {/* Description at bottom */}
            <div className="relative bg-gradient-to-r from-blue-700/45 to-blue-500/35 backdrop-blur-xl rounded-xl p-5">
              <p className="text-sm text-white/80 leading-relaxed max-w-md capitalize">
                {domain.description}
              </p>
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
    <section className="relative bg-surface pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden">
      {/* Background glow + semicircle arcs */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Dark blue radial glow from left */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-[10%] w-[80%] h-[120%] opacity-[0.18]"
          style={{
            background: "radial-gradient(ellipse at 0% 50%, rgba(15,29,50,0.5) 0%, rgba(30,58,95,0.35) 30%, rgba(37,99,235,0.2) 55%, transparent 80%)",
          }}
        />
        {/* Subtle secondary dark blue wash */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -left-[5%] w-[60%] h-[90%] opacity-[0.12]"
          style={{
            background: "radial-gradient(ellipse at 10% 50%, rgba(11,22,38,0.6) 0%, rgba(30,58,95,0.25) 40%, transparent 70%)",
          }}
        />
        {/* Semicircle arcs */}
        <svg
          className="absolute top-1/2 left-0 -translate-y-1/2 h-[120%] w-auto sm:h-[140%]"
          viewBox="0 0 400 800"
          fill="none"
          preserveAspectRatio="xMinYMid meet"
        >
          {/* Middle arc */}
          <circle cx="0" cy="400" r="280" stroke="none" fill="none" />
          {/* Inner arc */}
          <circle cx="0" cy="400" r="180" stroke="none" fill="none" />
          {/* Subtle tinted fill for depth */}
          <circle cx="0" cy="400" r="280" fill="rgba(30,58,95,0.015)" />
          <circle cx="0" cy="400" r="180" fill="rgba(15,29,50,0.01)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1320px] px-6" style={{ zIndex: 1 }}>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            The Technology Layer of the Ecosystem
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            See how we ensure healthcare operations remain stable, secure, and
            operational as demands and complexity increase.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-[80%] mx-auto">
          {SERVICE_CARDS.map((card) => (
            <div
              key={card.title}
              className="glass-card group pl-5 pr-7 py-7 flex flex-col cursor-pointer transition-all duration-200 rounded-xl relative overflow-hidden"
            >
              {/* Title + One-liner */}
              <h3 className="relative text-base font-semibold text-blue-600 leading-snug">
                {card.title}
              </h3>
              <p className="relative mt-1.5 text-sm text-gray-500">{card.oneLiner}</p>

              {/* Bullets — single column with dashes */}
              <div className="relative mt-5 flex flex-col gap-1.5">
                {card.bullets.map((b) => (
                  <div key={b.name} className="flex items-center gap-2">
                    <span className="text-gray-400 shrink-0">–</span>
                    <span className="text-sm text-gray-700">{b.name}</span>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="relative mt-5 flex justify-end">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </div>
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
    <section className="bg-white py-12 sm:py-16">
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
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                  src={cs.imageSrc ?? "/images/case-studies/healthcare-visual.png"}
                />
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
                key={ind.name}
                className="flex items-center gap-3 py-4 px-4 rounded-xl border border-gray-200/80 bg-surface text-sm font-semibold text-gray-700 hover:border-navy-300/60 hover:text-navy-600 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-navy-500 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d={ind.icon} />
                  </svg>
                </div>
                {ind.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- CountUp hook ---- */

function useCountUp(end: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [end, duration, trigger]);

  return count;
}

function CountUpStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parse numeric part and suffix (e.g. "200+" -> 200, "+")
  const numMatch = value.match(/^(\d+)(.*)$/);
  const numericEnd = numMatch ? parseInt(numMatch[1], 10) : 0;
  const suffix = numMatch ? numMatch[2] : "";
  const animatedCount = useCountUp(numericEnd, 2000, visible);

  return (
    <div ref={ref} className="px-10 sm:px-16 text-center">
      <span className="block text-4xl sm:text-5xl font-extrabold text-navy-900 tracking-tight">
        {visible ? animatedCount : 0}{suffix}
      </span>
      <span className="block mt-2 text-xs uppercase tracking-[0.15em] text-gray-500 font-medium">
        {label}
      </span>
    </div>
  );
}

/* ---- Philosophy + Trust Stats ---- */

function PhilosophySection() {
  return (
    <section className="bg-white pt-8 sm:pt-12 pb-8 sm:pb-12">
      <div className="mx-auto max-w-[1320px] px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold mb-6">
          Our Philosophy
        </p>
        <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug max-w-3xl mx-auto">
          &ldquo;Systems thinking is the strategy. AI is the engine. Netlink is the integrator.&rdquo;
        </p>

        {/* Trust Stats */}
        <div className="mt-14 flex flex-wrap items-start justify-center divide-x divide-gray-200">
          {TRUST_STATS.map((s) => (
            <CountUpStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Section 6: Final CTA ---- */

function FinalCTA() {
  return (
    <section id="contact" className="bg-white pt-8 sm:pt-12 pb-8 sm:pb-12">
      <div className="mx-auto max-w-[1320px] px-6">
        {/* CTA Card */}
        <div className="relative bg-[#F5F7FA] rounded-3xl px-8 py-11 sm:py-14 text-center overflow-hidden">
          {/* Subtle decorative arcs */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice">
            <circle cx="200" cy="400" r="350" stroke="currentColor" strokeWidth="1" />
            <circle cx="1000" cy="0" r="300" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="relative">
            <h2 className="text-xl sm:text-2xl lg:text-[1.9rem] font-extrabold text-gray-900 leading-tight max-w-2xl mx-auto">
              Ready to make your systems think together?
            </h2>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 rounded-lg bg-navy-500 hover:bg-navy-400 text-white font-semibold transition-colors text-sm"
              >
                Let&apos;s talk
              </a>
              <a
                href="#ecosystem"
                className="inline-flex items-center px-7 py-3.5 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold transition-colors text-sm bg-white"
              >
                Explore services
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ---- */

const FOOTER_LINKS = {
  Company: ["About", "Leadership", "Careers", "Contact"],
  Services: ["Decision Intelligence", "Product Engineering", "ERP & Platforms", "Automation", "Cloud & Infrastructure", "Governance"],
  Industries: ["Healthcare", "Insurance", "Automotive", "Manufacturing", "Supply Chain"],
  Resources: ["Case Studies", "Blog", "Point of View"],
};

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200/60 pt-16 pb-10">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo + Tagline */}
          <div className="col-span-2 md:col-span-1">
            <img src="/netlink-logo.png" alt="Netlink" className="h-10 w-auto mb-4" />
            <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
              Engineering AI-first enterprises. Breaking silos. Connecting systems. Driving tangible outcomes.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-gray-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs" suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Netlink. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms of Service</a>
          </div>
        </div>
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
        <ServicesSection />
        <CaseStudiesSection />
        <PhilosophySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
