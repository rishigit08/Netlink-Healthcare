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
  icon: string;
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
    icon: "M300-120q-8.5 0-14.25-5.75T280-140v-130.46q-57-52-88.5-116.89Q160-452.23 160-520.56q0-133.1 93.33-226.27Q346.67-840 480-840q108.08 0 195.35 65.81t113.19 169.96l41.47 164.17q3.99 15.21-5.7 27.64Q814.62-400 798.46-400H720v135.38q0 26.66-18.98 45.64T655.38-200H560v60q0 8.5-5.75 14.25T540-120H300Zm79.09-280.77q35.71 0 60.37-24.38l135.26-135.26q24.51-24.51 24.51-60.22 0-35.71-24.38-60.37-24.66-24.38-60.37-24.38-35.71 0-60.1 24.38-30.84-11.46-61.46-5.23-30.61 6.23-51.77 27.38-21.15 21.16-27.38 51.77-6.23 30.62 5.23 61.46-24.38 24.66-24.38 60.37 0 35.71 24.38 60.1 24.38 24.38 60.09 24.38Z",
  },
  {
    title: "Managed IT & Clinical Systems Operations",
    oneLiner: "From operational burden to reliable, always-on systems",
    bullets: [
      { name: "Managed IT Services & Outsourcing", description: "Ensure continuity across core healthcare systems by operating, supporting, and optimizing them over time." },
      { name: "EHR / EMR Implementation & Support", description: "Enables consistent care delivery by implementing, integrating, and maintaining clinical record systems." },
      { name: "Ongoing System Optimization", description: "Improves performance and usability as clinical, regulatory, and operational needs evolve." },
    ],
    icon: "M620-181.54V-260h-95.38q-26.85 0-45.74-18.88Q460-297.77 460-324.62V-660H340v78.46q0 17.62-11.96 29.58Q316.08-540 298.46-540H141.54q-17.62 0-29.58-11.96Q100-563.92 100-581.54v-196.92q0-17.62 11.96-29.58Q123.92-820 141.54-820h156.92q17.62 0 29.58 11.96Q340-796.08 340-778.46V-700h280v-78.46q0-17.62 11.96-29.58Q643.92-820 661.54-820h156.92q17.62 0 29.58 11.96Q860-796.08 860-778.46v196.92q0 17.62-11.96 29.58Q836.08-540 818.46-540H661.54q-17.62 0-29.58-11.96Q620-563.92 620-581.54V-660H500v335.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92H620v-78.46q0-17.62 11.96-29.58Q643.92-420 661.54-420h156.92q17.62 0 29.58 11.96Q860-396.08 860-378.46v196.92q0 17.62-11.96 29.58Q836.08-140 818.46-140H661.54q-17.62 0-29.58-11.96Q620-163.92 620-181.54Z",
  },
  {
    title: "Cloud, Platform & Integration Modernization",
    oneLiner: "From rigid infrastructure to scalable, connected platforms",
    bullets: [
      { name: "Cloud Migration & Managed Cloud", description: "Transitions healthcare systems to resilient cloud environments with ongoing operational oversight." },
      { name: "Interoperability & Integration Services", description: "Connects applications and data across systems to reduce silos and manual work." },
      { name: "Platform & Infrastructure Modernization", description: "Updates legacy platforms to support scale, reliability, and future digital initiatives." },
    ],
    icon: "M260-200q-74.85 0-127.42-52.23Q80-304.46 80-379.31q0-68.77 47-122.07 47-53.31 116.85-57.24Q257.31-646 324.23-703q66.92-57 155.77-57 100.08 0 170.04 69.96T720-520v40h24.62q57.46 1.85 96.42 42.19Q880-397.46 880-340q0 58.85-40.58 99.42Q798.85-200 740-200H260Z",
  },
  {
    title: "Lifecycle Operations & System Governance",
    oneLiner: "From point solutions to systems that endure and improve",
    bullets: [
      { name: "Continuous Operations & Reliability", description: "Maintains system stability, performance, and compliance as environments change." },
      { name: "Lifecycle Ownership & Optimization", description: "Manages systems across implementation, scale, upgrades, and long-term evolution." },
      { name: "Governance, Change & Readiness", description: "Establishes controls and operating models that support safe adaptation and sustained outcomes." },
    ],
    icon: "M438.38-120q-13.92 0-24.19-9.15-10.27-9.16-12.73-22.85l-10.54-83.69q-19.15-5.77-41.42-18.16-22.27-12.38-37.88-26.53L235-247.46q-12.69 5.61-25.77 1.23-13.08-4.39-20.15-16.62l-43.16-74.3q-7.07-12.23-4.15-25.54 2.92-13.31 13.92-21.85l66.85-50q-1.77-10.84-2.92-22.34-1.16-11.5-1.16-22.35 0-10.08 1.16-21.19 1.15-11.12 2.92-25.04l-66.85-50q-11-8.54-13.54-22.23-2.53-13.69 4.54-25.93l42.39-72q7.07-11.46 20.15-16.23 13.08-4.77 25.77.85l75.85 32.15q17.92-14.92 38.77-26.92 20.84-12 40.53-18.54L401.46-808q2.46-13.69 12.73-22.85 10.27-9.15 24.19-9.15h83.24q13.92 0 24.19 9.15 10.27 9.16 12.73 22.85l10.54 84.46q23 8.08 40.65 18.54 17.65 10.46 36.35 26.15L725.77-711q12.69-5.62 25.77-.85 13.08 4.77 20.15 16.23l42.39 72.77q7.07 12.23 4.15 25.54-2.92 13.31-13.92 21.85l-69.93 52.31q3.31 12.38 3.7 22.73.38 10.34.38 20.42 0 9.31-.77 19.65-.77 10.35-3.54 25.04l67.62 50.77q11 8.54 14.31 21.85 3.3 13.31-3.77 25.54l-42.62 73.53q-7.07 12.24-20.54 16.62-13.46 4.38-26.15-1.23l-76.92-32.92q-18.7 15.69-37.62 26.92-18.92 11.23-39.38 17.77L558.54-152q-2.46 13.69-12.73 22.85-10.27 9.15-24.19 9.15h-83.24Zm40.54-260q41.85 0 70.93-29.08 29.07-29.07 29.07-70.92t-29.07-70.92Q520.77-580 478.92-580q-42.07 0-71.04 29.08-28.96 29.07-28.96 70.92t28.96 70.92Q436.85-380 478.92-380Z",
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
  { name: "Government", icon: "M181.54-153.85q-17.62 0-29.58-11.96Q140-177.77 140-195.38v-436.93q0-17.61 11.96-29.57 11.96-11.97 29.58-11.97H300v-118.46q0-17.61 11.96-29.57 11.96-11.97 29.58-11.97h276.92q17.62 0 29.58 11.97Q660-809.92 660-792.31v278.46h118.46q17.62 0 29.58 11.97Q820-489.92 820-472.31v276.93q0 17.61-11.96 29.57t-29.58 11.96H540v-160H420v160H181.54Zm-1.54-40h120v-120H180v120Zm0-160h120v-120H180v120Zm0-160h120v-120H180v120Zm160 160h120v-120H340v120Zm0-160h120v-120H340v120Zm0-160h120v-120H340v120Zm160 320h120v-120H500v120Zm0-160h120v-120H500v120Zm0-160h120v-120H500v120Zm160 480h120v-120H660v120Zm0-160h120v-120H660v120Z" },
  { name: "Automotive", icon: "M209.23-240v55.38q0 10.26-7.2 17.44-7.21 7.18-17.51 7.18-10.29 0-17.4-7.18-7.12-7.18-7.12-17.44v-278.3q0-5.46.62-10.93.61-5.46 2.43-10.87l68.26-192.05q6.38-19.21 23.13-31.22Q271.19-720 291.92-720h376.16q20.73 0 37.48 12.01 16.75 12.01 23.13 31.22l68.26 192.05q1.82 5.41 2.43 10.87.62 5.47.62 10.93v278.3q0 10.26-7.21 17.44-7.2 7.18-17.5 7.18-10.29 0-17.41-7.18-7.11-7.18-7.11-17.44V-240H209.23Zm7.39-273.85h526.76l-52.76-150q-3.08-7.69-9.24-11.92-6.15-4.23-14.61-4.23H293.23q-8.46 0-14.61 4.23-6.16 4.23-9.24 11.92l-52.76 150Zm80.48 181.54q18.67 0 31.55-13.06 12.89-13.07 12.89-31.73 0-18.67-13.07-31.55-13.06-12.89-31.73-12.89-18.66 0-31.55 13.07-12.88 13.06-12.88 31.73 0 18.66 13.06 31.55 13.07 12.88 31.73 12.88Zm366.16 0q18.66 0 31.55-13.06 12.88-13.07 12.88-31.73 0-18.67-13.06-31.55-13.07-12.89-31.73-12.89-18.67 0-31.55 13.07-12.89 13.06-12.89 31.73 0 18.66 13.07 31.55 13.06 12.88 31.73 12.88Z" },
  { name: "Banking", icon: "M260-300v-280q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T300-580v280q0 8.5-5.76 14.25T279.97-280q-8.51 0-14.24-5.75T260-300Zm200 0v-280q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T500-580v280q0 8.5-5.76 14.25T479.97-280q-8.51 0-14.24-5.75T460-300ZM161.54-160q-8.5 0-14.25-5.76t-5.75-14.27q0-8.51 5.75-14.24t14.25-5.73h636.92q8.5 0 14.25 5.76t5.75 14.27q0 8.51-5.75 14.24T798.46-160H161.54ZM660-300v-280q0-8.5 5.76-14.25t14.27-5.75q8.51 0 14.24 5.75T700-580v280q0 8.5-5.76 14.25T679.97-280q-8.51 0-14.24-5.75T660-300Zm141.54-380H156.77q-6.35 0-10.79-4.41-4.44-4.42-4.44-10.72v-9.25q0-4.62 2.33-7.93 2.32-3.31 6.13-5.38L452.46-862q12.96-6.46 27.44-6.46t27.64 6.46l301.23 143.31q4.08 2.69 6.88 6.54 2.81 3.84 2.81 8.74v6.68q0 7.58-4.58 12.15-4.57 4.58-12.34 4.58Z" },
  { name: "Insurance", icon: "M593.42-365.81Q640-412.38 640-479.23t-46.58-113.42Q546.85-639.23 480-639.23t-113.42 46.58Q320-546.08 320-479.23t46.58 113.42q46.57 46.58 113.42 46.58t113.42-46.58Zm-98.04-119.88 61.54 61.54q4.46 4.46 4.85 10.53.38 6.08-4.85 11.31-5.23 5.23-10.92 5.23-5.69 0-10.92-5.23l-60.77-60.77q-5.23-5.23-7.46-10.8-2.23-5.58-2.23-12.04v-93.31q0-6.46 4.46-10.92 4.46-4.47 10.92-4.47t10.92 4.47q4.46 4.46 4.46 10.92v93.54Zm-26.84 358.38q-6-1-11.23-3-118.08-45-187.69-152.65Q200-390.62 200-516v-171.31q0-20.38 11.81-36.92 11.81-16.54 30.19-24l215.38-80q11.7-4.23 22.62-4.23 10.92 0 22.62 4.23l215.38 80q18.38 7.46 30.19 24Q760-707.69 760-687.31V-516q0 125.38-69.62 233.04-69.61 107.65-187.69 152.65-5.23 2-11.23 3t-11.46 1q-5.46 0-11.46-1Z" },
  { name: "Manufacturing", icon: "M222.85-181.54q-13.47 0-22.89-9.42t-9.42-22.89q0-13.46 9.42-22.88 9.42-9.42 22.89-9.42h88.61L207.92-584.77q-26.23-12.69-41.8-36.31-15.58-23.61-15.58-54.3 0-41.54 29.23-70.77 29.23-29.23 70.77-29.23 36.69 0 62.96 22.5 26.27 22.5 35.19 57.5h146.46v-60q0-8.54 5.73-14.27 5.74-5.73 14.27-5.73 6.7 0 11.73 4 5.04 4 6.43 10.46v10.77l72.61-67.08q8.23-8.23 18.43-9.96 10.19-1.73 19.88 3.5l151.39 70.46q7.38 3.69 11.11 10.58 3.73 6.88.27 14.03-3.69 7.39-10.58 9.35-6.88 1.96-14.04-1.5l-151.69-70.61-95.54 88v56l95.54 86L782.38-632q7.16-3.46 14.16-1.38 7 2.07 10.46 9.23 3.69 7.38-.15 14.15-3.85 6.77-11.23 10.46l-151.39 70.92q-9.69 5.24-19.88 3.5-10.2-1.73-18.43-9.96l-72.61-65.54v10.77q-1.39 6-6.43 10.23-5.03 4.24-11.73 4.24-8.53 0-14.27-5.74-5.73-5.73-5.73-14.26v-60H348.69q-3 13.38-9.96 26.53-6.96 13.16-15.27 21.93l193.85 360.77h120.92q13.46 0 22.89 9.42 9.42 9.42 9.42 22.88 0 13.47-9.42 22.89-9.43 9.42-22.89 9.42H222.85Zm70.03-451.5q17.66-17.65 17.66-42.34 0-24.7-17.66-42.35-17.65-17.65-42.34-17.65-24.69 0-42.35 17.65-17.65 17.65-17.65 42.35 0 24.69 17.65 42.34 17.66 17.66 42.35 17.66t42.34-17.66Z" },
  { name: "Supply Chain", icon: "M226.15-216.92v29.23q0 8.83-5.97 14.8-5.97 5.97-14.8 5.97h-29.23q-8.82 0-14.79-5.97-5.98-5.97-5.98-14.8v-36.93q0-13.73 9.34-23.01 9.34-9.29 23.14-9.29h584.57q13.8 0 22.99 9.29 9.2 9.28 9.2 23.01v36.93q0 8.83-5.98 14.8-5.97 5.97-14.79 5.97h-29.23q-8.83 0-14.8-5.97-5.97-5.97-5.97-14.8v-29.23H515.38v29.23q0 8.83-5.97 14.8-5.97 5.97-14.79 5.97h-29.24q-8.82 0-14.79-5.97-5.97-5.97-5.97-14.8v-29.23H226.15Zm46.93-120q-13.73 0-23.02-9.29t-9.29-23.02v-415.39q0-13.73 9.29-23.02 9.29-9.28 23.02-9.28h413.84q13.73 0 23.02 9.28 9.29 9.29 9.29 23.02v409.24q0 16.34-10.61 27.4-10.62 11.06-26.31 11.06H273.08ZM580-633.85q8.5 0 14.25-5.75 5.75-5.76 5.75-14.27t-5.75-14.25q-5.75-5.73-14.25-5.73H380q-8.5 0-14.25 5.76T360-653.82q0 8.51 5.75 14.24t14.25 5.73h200Z" },
  { name: "Telecom", icon: "M480-680q-88 0-170.73 28.65-82.73 28.66-151.19 83.43-13.08 10.61-30.12 10.5-17.04-.12-28.88-11.96Q87.46-581 87.85-597.54q.38-16.54 13.46-26.92 80.31-66.16 177.73-100.85Q376.46-760 480-760q104.54 0 201.46 34.69t177.23 100.85q13.08 10.38 13.46 26.92.39 16.54-11.23 28.16-11.84 11.84-28.88 11.96-17.04.11-30.12-10.5-69.23-54.77-151.46-83.43Q568.23-680 480-680Zm0 220.77q-44.08 0-84.88 13.19-40.81 13.19-75.81 38.04-13.54 10.15-30.58 9.92-17.04-.23-28.88-12.07-11.62-11.62-11.5-28.04.11-16.43 13.19-26.58 46.84-36.23 102.84-55.35 56-19.11 115.62-19.11 60.38 0 116.77 19.5 56.38 19.5 103.23 56.5 13.08 10.15 13.58 26.19t-11.89 27.66q-12.61 11.84-29.65 12.07-17.04.23-30.58-9.92-35-25.62-76.19-38.81-41.19-13.19-85.27-13.19Zm-42.65 241.88Q420-234.69 420-260t17.35-42.65Q454.69-320 480-320t42.65 17.35Q540-285.31 540-260t-17.35 42.65Q505.31-200 480-200t-42.65-17.35Z" },
  { name: "BPO", icon: "M717.23-120q-101.15 0-207.38-50.65-106.23-50.66-197.77-142.2-90.77-91.53-141.43-197.38Q120-616.08 120-717.23q0-18 12-30.39Q144-760 162-760h98.92q16.31 0 28.46 10.27 12.16 10.27 16.47 26.35L325.69-628q2.77 16.77-1 29.31t-13.31 20.54l-87.76 81.84q24.61 44.69 54.42 83.04 29.81 38.35 63.58 72.65 34.84 34.85 75 64.81 40.15 29.96 88.15 56.58l85.54-87.08q9.77-10.54 21.96-13.88 12.19-3.35 26.96-1.35l84.15 17.23q16.31 4 26.47 16.43Q760-275.46 760-259.38V-162q0 18-12.38 30-12.39 12-30.39 12ZM500-800q-8.54 0-14.27-5.73T480-820q0-8.54 5.73-14.27T500-840h320q8.54 0 14.27 5.73T840-820q0 8.54-5.73 14.27T820-800H500Zm0 135.38q-8.54 0-14.27-5.73T480-684.62q0-8.53 5.73-14.26 5.73-5.74 14.27-5.74h320q8.54 0 14.27 5.74 5.73 5.73 5.73 14.26 0 8.54-5.73 14.27T820-664.62H500Zm0 135.39q-8.54 0-14.27-5.73T480-549.23q0-8.54 5.73-14.27t14.27-5.73h320q8.54 0 14.27 5.73t5.73 14.27q0 8.54-5.73 14.27T820-529.23H500Z" },
];

/* ---------- Nav links ---------- */

interface ServiceDropdownItem {
  title: string;
  description: string;
}

const SERVICES_DROPDOWN: ServiceDropdownItem[] = [
  {
    title: "Infrastructure & Cloud",
    description: "When demand shifts, system is able to absorb AI scale without re-architecture.",
  },
  {
    title: "ERP & Core Platforms",
    description: "Decisions move when intelligence is part of core systems where execution happens.",
  },
  {
    title: "Data & Intelligence",
    description: "Data unified across enterprise systems enables intelligence that is efficient and adaptive.",
  },
  {
    title: "Agentic Applications & Workflows",
    description: "Enabling faster product scale by embedding intelligence into workflows from the start.",
  },
  {
    title: "Automation & Orchestration",
    description: "Netlink builds context-aware automation that adapts to changing conditions.",
  },
  {
    title: "Security & Governance",
    description: "Security-driven governance to keep intelligent systems compliant and protected.",
  },
];

interface NavLink {
  label: string;
  hasDropdown?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Services", hasDropdown: true },
  { label: "Industries", hasDropdown: true },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current);
    setServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setServicesOpen(false), 200);
  };

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
            link.label === "Services" ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={handleServicesEnter}
                onMouseLeave={handleServicesLeave}
              >
                <a
                  href="#"
                  className={`flex items-center px-3.5 py-2 text-sm transition-colors rounded-md ${
                    servicesOpen ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                  <ChevronDown />
                </a>
                {/* Services Dropdown */}
                {servicesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2" style={{ width: "580px" }}>
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xl shadow-gray-200/50 p-5">
                      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                        {SERVICES_DROPDOWN.map((item) => (
                          <a
                            key={item.title}
                            href="#"
                            className="group/item flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-sm font-semibold text-gray-900 group-hover/item:text-navy-600 transition-colors">
                              {item.title}
                            </span>
                            <span className="text-xs text-gray-500 leading-relaxed">
                              {item.description}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.label}
                href="#"
                className="flex items-center px-3.5 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors rounded-md"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown />}
              </a>
            )
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
              <span className="text-3xl font-bold text-blue-600">{s.value}</span>
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
                            className="px-3 py-1 rounded-full bg-gray-200/50 border border-gray-300/50 text-xs text-gray-700"
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
    <section className="relative pt-8 sm:pt-10 pb-10 sm:pb-14 overflow-hidden">
      {/* Background texture with soft blue overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.70]"
          src="/images/backgrounds/services-texture.png"
        />
        <div className="absolute inset-0 bg-blue-100/40" />
      </div>
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
                  className="absolute inset-0 w-full h-full object-cover"
                  src={cs.imageSrc ?? "/images/case-studies/healthcare-visual.png"}
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-blue-600/70 text-white text-xs font-medium"
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
                  <svg className="w-5 h-5" fill="white" viewBox="0 -960 960 960">
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
        <div className="relative bg-gradient-to-br from-blue-50 via-blue-100/60 to-blue-50 rounded-3xl px-8 py-11 sm:py-14 text-center overflow-hidden">
          {/* Subtle decorative arcs */}
          <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="xMidYMid slice">
            <circle cx="200" cy="400" r="350" stroke="currentColor" strokeWidth="1" />
            <circle cx="1000" cy="0" r="300" stroke="currentColor" strokeWidth="1" />
          </svg>

          <div className="relative">
            <h2 className="text-xl sm:text-2xl lg:text-[1.9rem] font-extrabold text-gray-900 leading-tight max-w-2xl mx-auto">
              Ready to Design the Future of Connected Health?
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
  Services: ["Infrastructure & Cloud", "ERP & Core Platforms", "Data & Intelligence", "Agentic Applications & Workflows", "Automation & Orchestration", "Security & Governance"],
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
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
