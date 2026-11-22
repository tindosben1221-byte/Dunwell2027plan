import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Building2,
  CalendarCheck,
  ChevronRight,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Lock,
  Maximize2,
  Minimize2,
  Network,
  Presentation,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Tablet,
  TrendingUp,
} from 'lucide-react';
import {
  CLINIC_IMAGES,
  GROWTH_2027_IDEAS,
  INITIAL_KPIS,
  PRESENTATION_SLIDES,
  SEVEN_OUTCOMES,
  STRATEGY_PDF_PATH,
} from '../data/initialData';
import { useClinicDemo } from '../context/ClinicDemoContext';
import { NavSection } from '../types/dunwell';
import { ClinicImage } from './ClinicImage';

interface ExecutivePlanViewProps {
  onNavigate: (section: NavSection) => void;
}

const CLICKABLE_MOCKUPS: {
  id: string;
  index: string;
  title: string;
  description: string;
  target: NavSection;
  ctaLabel: string;
  imageUrl: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: 'mk-crm',
    index: '01',
    title: 'Corporate CRM Portal',
    description:
      'Construction & logistics HR portal for worker fitness checks, QR certificates, and renewal alerts.',
    target: 'corporate-crm',
    ctaLabel: 'Open Corporate CRM Portal',
    imageUrl: CLINIC_IMAGES.constructionMedical,
    imageAlt: 'Occupational health nurse checking construction worker medical fitness',
    icon: Building2,
  },
  {
    id: 'mk-dispatch',
    index: '02',
    title: 'Clinic Incident Dispatch Portal',
    description:
      'Company logs site injury -> Dunwell accepts -> assigns Nurse -> syncs Reception, Pharmacy & Billing.',
    target: 'clinic-dispatch',
    ctaLabel: 'Open Clinic Dispatch Portal',
    imageUrl: CLINIC_IMAGES.clinicHero,
    imageAlt: 'Dunwell Clinic reception and triage dispatch desk',
    icon: ShieldAlert,
  },
  {
    id: 'mk-outreach',
    index: '03',
    title: 'Outreach & Youth Booking Portal',
    description:
      'Offline outreach camp tablet, campus QR posters, WhatsApp recall campaigns, and 15-sec bookings.',
    target: 'youth-access',
    ctaLabel: 'Open Outreach & Youth Portal',
    imageUrl: CLINIC_IMAGES.youthOutreach,
    imageAlt: 'Clinic nurse demonstrating campus outreach QR check-in to students',
    icon: Tablet,
  },
  {
    id: 'mk-payslips',
    index: '04',
    title: 'Auto-Payslips & Sick Notes Portal',
    description:
      'Auto-generates and sends staff payslips from HMS shifts plus privacy-redacted QR sick notes.',
    target: 'automation',
    ctaLabel: 'Open Automation Portal',
    imageUrl: CLINIC_IMAGES.pharmacySmart,
    imageAlt: 'Pharmacist scanning QR pickup code at Dunwell Pharmacy counter',
    icon: FileSpreadsheet,
  },
  {
    id: 'mk-safeai',
    index: '05',
    title: 'Safe AI & Virtual Triage Portal',
    description:
      'Human-approved Gemini AI drafting for HR privacy redaction, nurse triage prep, and youth telehealth.',
    target: 'automation',
    ctaLabel: 'Open Safe AI Studio Portal',
    imageUrl: CLINIC_IMAGES.youthTelehealth,
    imageAlt: 'Young adult on confidential telehealth video consultation with clinic nurse',
    icon: Bot,
  },
  {
    id: 'mk-partners',
    index: '06',
    title: 'Partner Clinic SaaS Portal',
    description:
      'License Dunwell HMS, CRM & Automation to public & private clinics on monthly SaaS subscriptions.',
    target: 'partners',
    ctaLabel: 'Open Partner SaaS Portal',
    imageUrl: CLINIC_IMAGES.partnerNetwork,
    imageAlt: 'Regional clinic administrators reviewing shared referral network subscriptions',
    icon: Network,
  },
];

export const ExecutivePlanView: React.FC<ExecutivePlanViewProps> = ({ onNavigate }) => {
  const { incidents, workers, youthBookings, payslips, partnerClinics } = useClinicDemo();
  const [slideMode, setSlideMode] = useState(false);
  const [slideFullscreen, setSlideFullscreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const pendingIncidents = incidents.filter((i) => i.status === 'Pending Acceptance').length;
  const expiringWorkers = workers.filter((w) => w.status === 'Expiring Soon').length;
  const scheduledPayslips = payslips.filter((p) => p.status === 'Scheduled').length;

  useEffect(() => {
    if (!slideMode) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setSlideIndex((prev) => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        setSlideMode(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [slideMode]);

  const currentSlide = PRESENTATION_SLIDES[slideIndex];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section with Official Brand Logo + Clinic Photography */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2025-09-03_at_09.51.25_12f074ba.jpeg"
                    alt="Dunwell Youth Priority Clinic emblem"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-contain rounded-lg border border-slate-200 p-1 bg-white shrink-0"
                  />
                  <div className="text-xs font-medium text-slate-500">
                    Dunwell Youth Priority Clinic · Johannesburg, South Africa · 2027–2029 IT Strategy
                  </div>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-[1.12] text-balance">
                  Scaling Dunwell with B2B CRM, Outreach Tools, Safe AI & Clinic Subscriptions
                </h1>

                <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                  Built on Dunwell’s existing HMS (Reception, Nurse, Pharmacy, Expense Reporting)
                  and Booking App—adding construction medicals CRM, incident nurse dispatch, field
                  outreach tablets, auto-sent payslips & QR sick notes, Safe AI, and public/private
                  clinic SaaS subscriptions in ZAR under strict POPIA governance.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setSlideMode((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Presentation className="w-4 h-4" />
                  {slideMode ? 'Exit Slide Presentation' : 'Start Slide Presentation'}
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('partners')}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Explore Clinic SaaS Partnerships
                  <ArrowRight className="w-4 h-4 text-cyan-800" />
                </button>

                <a
                  href={STRATEGY_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-cyan-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <FileText className="w-4 h-4 text-cyan-800" />
                  Strategy PDF (16 Pages)
                </a>
              </div>
            </div>

            {/* Right Column: Visual Clinic Showcase + Quick Portal Links */}
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col">
              <div className="relative h-52 sm:h-60 w-full shrink-0">
                <ClinicImage
                  src={CLINIC_IMAGES.clinicHero}
                  alt="Dunwell Youth Priority Clinic bright reception and digital triage lounge"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <div className="text-xs font-mono text-amber-300">
                      Live Interactive System Mockups
                    </div>
                    <div className="font-display text-lg font-bold">
                      Click any portal below during the presentation
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
                <button
                  type="button"
                  onClick={() => onNavigate('corporate-crm')}
                  className="p-3 bg-white border border-slate-200 hover:border-cyan-700 rounded-xl text-left transition-colors group"
                >
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-cyan-800 flex items-center justify-between">
                    Corporate Medicals CRM
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    {workers.length} workers · {expiringWorkers} due
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('clinic-dispatch')}
                  className="p-3 bg-white border border-slate-200 hover:border-cyan-700 rounded-xl text-left transition-colors group"
                >
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-cyan-800 flex items-center justify-between">
                    Incident Nurse Dispatch
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    {pendingIncidents} pending triage
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('youth-access')}
                  className="p-3 bg-white border border-slate-200 hover:border-cyan-700 rounded-xl text-left transition-colors group"
                >
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-cyan-800 flex items-center justify-between">
                    Outreach Tools & Youth App
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    {youthBookings.length} funnel bookings
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('automation')}
                  className="p-3 bg-white border border-slate-200 hover:border-cyan-700 rounded-xl text-left transition-colors group"
                >
                  <div className="text-xs font-semibold text-slate-900 group-hover:text-cyan-800 flex items-center justify-between">
                    Payslips, Sick Notes & AI
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    {scheduledPayslips} payslips · {partnerClinics.length} partner clinics
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* 4-column Summary Strip below Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-slate-200">
            <div>
              <div className="text-xs font-medium text-slate-500">Existing Core Preserved</div>
              <div className="font-display text-xl font-bold text-slate-900 mt-1">
                HMS + Booking App
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Reception, Nurse, Pharmacy & Expense Reporting remain central source of truth.
              </p>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">New B2B Revenue Channel</div>
              <div className="font-display text-xl font-bold text-slate-900 mt-1">
                Medicals & Incident CRM
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Construction fitness clearances & real-time nurse incident dispatch.
              </p>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Automated Operations</div>
              <div className="font-display text-xl font-bold text-slate-900 mt-1">
                Payslips, Sick Notes & AI
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Auto-generated PDFs, privacy-redacted HR notes, and clinician-approved Safe AI.
              </p>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Scale Beyond One Clinic</div>
              <div className="font-display text-xl font-bold text-slate-900 mt-1">
                Outreach & Clinic SaaS
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Field camp tablets + public/private clinic software subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Presentation Slide Deck Mode (with Example Pictures per Slide) */}
      {slideMode && (
        <section
          className={
            slideFullscreen
              ? 'fixed inset-0 z-50 bg-slate-950/95 overflow-y-auto p-4 sm:p-8 flex items-center justify-center'
              : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
          }
        >
          <div className="bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 p-6 sm:p-10 w-full max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono tabular-nums">
                <span>
                  Slide {currentSlide.index} / 0{PRESENTATION_SLIDES.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>Dunwell 2027–2029 Presentation Mode (Use ← / → keys)</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
                  disabled={slideIndex === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex((i) => Math.min(PRESENTATION_SLIDES.length - 1, i + 1))
                  }
                  disabled={slideIndex === PRESENTATION_SLIDES.length - 1}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors"
                >
                  Next
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSlideFullscreen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-cyan-800 hover:bg-cyan-700 text-white transition-colors"
                >
                  {slideFullscreen ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                  {slideFullscreen ? 'Exit Full Screen' : 'Full Screen'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSlideMode(false);
                    setSlideFullscreen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-200 transition-colors"
                >
                  Close Deck
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 items-start">
              <div className="lg:col-span-6 space-y-5">
                <p className="text-sm font-medium text-amber-400">{currentSlide.subtitle}</p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight text-balance">
                  {currentSlide.title}
                </h2>
                <p className="text-base text-slate-300 leading-relaxed">
                  {currentSlide.keyMessage}
                </p>

                <div className="space-y-3 pt-1">
                  {currentSlide.bullets.map((b, idx) => (
                    <div
                      key={b.heading}
                      className="bg-slate-800/50 border border-slate-800 rounded-xl p-4"
                    >
                      <div className="text-sm font-semibold text-white">
                        0{idx + 1}. {b.heading}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {b.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-xl overflow-hidden border border-slate-700 aspect-[16/10] bg-slate-800">
                  <ClinicImage
                    src={currentSlide.imageUrl}
                    alt={currentSlide.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-400">{currentSlide.metricLabel}</div>
                    <div className="font-display text-lg font-bold text-white mt-0.5">
                      {currentSlide.metricValue}
                    </div>
                  </div>

                  {currentSlide.demoTarget && (
                    <button
                      type="button"
                      onClick={() => onNavigate(currentSlide.demoTarget!.section)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      {currentSlide.demoTarget.label}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Slide Stepper Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-800">
              {PRESENTATION_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    idx === slideIndex
                      ? 'bg-cyan-700 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.index}. {s.title.split(':')[0].slice(0, 22)}...
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clickable Interactive System Mockups Gallery with Real Visual Thumbnails */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-xs font-mono text-cyan-800 font-semibold">
              Interactive System Mockups
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
              Click Any Proposed System to Demonstrate Its Working Mockup
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-semibold text-cyan-800 hover:underline inline-flex items-center gap-1 whitespace-nowrap"
          >
            View Architecture & ROI Calculator
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLICKABLE_MOCKUPS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.target)}
                className="text-left bg-white border border-slate-200 hover:border-cyan-700 rounded-xl overflow-hidden flex flex-col justify-between transition-colors group"
              >
                <div>
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <ClinicImage
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-800 font-semibold">
                        System {item.index}
                      </span>
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-800 transition-colors" />
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-cyan-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-cyan-800">
                  <span>{item.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Full Written IT Strategic Plan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section 01 */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono text-cyan-800 font-semibold">Section 01</div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Auditing & Connecting What Dunwell Already Built
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Before adding new software, IT turns our existing HMS and Booking App into a
              connected central platform so clinical teams never enter data twice.
            </p>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3 px-4">Existing System</th>
                    <th className="py-3 px-4">Current Role</th>
                    <th className="py-3 px-4">IT Expansion Integration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">HMS Reception</td>
                    <td className="py-3.5 px-4">Walk-in check-in & queue</td>
                    <td className="py-3.5 px-4">
                      Receives live corporate medical batches, workplace incidents, outreach camp syncs, and WhatsApp youth bookings.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">HMS Nurse Desk</td>
                    <td className="py-3.5 px-4">Vitals & triage notes</td>
                    <td className="py-3.5 px-4">
                      Gains Incident Acceptance & Nurse Assignment workflow, Safe AI triage checklists, and Sick Note drafts.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">HMS Pharmacy</td>
                    <td className="py-3.5 px-4">Dispensing & inventory</td>
                    <td className="py-3.5 px-4">
                      Auto-reserves trauma kits when incidents are accepted; handles discreet youth e-Prescriptions & auto-refills.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Expense Reporting</td>
                    <td className="py-3.5 px-4">Internal clinic spend tracking</td>
                    <td className="py-3.5 px-4">
                      Powers Auto-Payslips (with shift & dispatch allowances) and Corporate Contract Margin & Billing.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Virtual & In-Clinic App</td>
                    <td className="py-3.5 px-4">Working, low public adoption</td>
                    <td className="py-3.5 px-4">
                      Acts as the API engine behind no-install Web-Lite links, WhatsApp Bot bookings, and Campus QR posters.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 02: Corporate CRM & Incident Reporting */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-cyan-800 font-semibold">Section 02</div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              B2B Corporate CRM: Medical Fitness & Incident Dispatch
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Construction companies, logistics fleets, and factories need fast proof that workers are
              medically fit—and immediate medical response when site accidents happen.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('corporate-crm')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
              >
                <Building2 className="w-4 h-4" />
                Open Corporate CRM Mockup
              </button>
              <button
                type="button"
                onClick={() => onNavigate('clinic-dispatch')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Open Dunwell Dispatch Mockup
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-900">
                  A. Construction & Workforce Medical Fitness CRM
                </h3>
                <Stethoscope className="w-5 h-5 text-cyan-800 shrink-0" />
              </div>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <span className="font-semibold text-slate-900">Clearance Categories:</span> Working at
                  Heights, Heavy Machinery, Welding/Spirometry, and PSV Drivers.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Instant Gatekeeper Check:</span> Site
                  supervisors check <span className="font-mono text-xs">Fit for Duty</span>,{' '}
                  <span className="font-mono text-xs">Conditional</span>, or{' '}
                  <span className="font-mono text-xs">Unfit / Hold</span> status in seconds.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">QR Certificates & Renewals:</span> Digital
                  certificates prevent forgery; automated 30-day expiry alerts drive repeat annual bookings.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-900">
                  B. Workplace Incident Portal & Nurse Assignment
                </h3>
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
              </div>
              <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                <li>
                  <span className="font-semibold text-slate-900">Company Logs Incident:</span> Enters
                  worker, site location, injury severity, and immediate condition in the CRM portal.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Dunwell Accepts & Assigns Nurse:</span>{' '}
                  Clinic Dispatch accepts the case, selects an available Nurse, and chooses Mobile Dispatch,
                  Ambulance Pickup, or In-Clinic Fast-Track.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Live Portal & HMS Sync:</span> Company sees
                  assigned nurse and ETA live while HMS opens the Nurse chart, reserves Pharmacy supplies,
                  and logs billing.
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Section 03: Automation & Safe AI */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-cyan-800 font-semibold">Section 03</div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Document Automation & Safe AI Guardrails
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automates payslips, sick notes, fitness certificates, and corporate invoices while
              enforcing strict healthcare-safe AI boundaries.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('automation')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
            >
              <FileCheck2 className="w-4 h-4" />
              Open Automation & Safe AI Mockup
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <h3 className="font-display text-base font-bold text-slate-900">
                Auto-Generated & Auto-Sent Documents
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <span className="font-semibold text-slate-900">Staff Payslips:</span> Pulls shifts &
                  site dispatch allowances from HMS, computes SARS PAYE/UIF & Medical Aid, and auto-sends PDFs via
                  WhatsApp & Email.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">QR Sick Notes:</span> Clinician signs once;
                  patient receives full care instructions while employer HR gets a diagnosis-redacted
                  off-duty certificate.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Certificates, Invoices & Tokens:</span>{' '}
                  Fitness certificates, B2B retainer statements, and Pharmacy pickup codes auto-deliver.
                </li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5">
              <h3 className="font-display text-base font-bold text-slate-900">
                Safe AI Automation Policy
              </h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>
                  <span className="font-semibold text-slate-900">Human Sign-Off Mandatory:</span> AI drafts
                  HR-safe wording and nurse prep checklists, but never sends clinical documents without
                  clinician approval.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Zero Diagnosis Exposure:</span> Automated
                  PHI firewall blocks sensitive clinical details from corporate HR notifications.
                </li>
                <li>
                  <span className="font-semibold text-slate-900">Emergency Red-Flag Escalation:</span> Youth
                  WhatsApp AI routes routine consults and escalates urgent symptoms straight to a nurse.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 04: Field Outreach Tools & Youth Adoption */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-cyan-800 font-semibold">Section 04</div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Field Outreach Tools & Youth App Activation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Equips outreach nurses and youth ambassadors with offline screening tablets, trackable
              campus QR posters, and WhatsApp recall campaigns feeding the existing App.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('youth-access')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              Open Outreach Tools Mockup
            </button>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <div className="text-xs font-mono text-slate-500">Outreach Tool 01</div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Offline Outreach Camp Tablet
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Logs vitals and screenings in low-signal campuses or construction gates, then batch-syncs
                into HMS Reception and sends WhatsApp follow-up links.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <div className="text-xs font-mono text-slate-500">Outreach Tool 02</div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Campus QR & Ambassador Tags
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trackable QR posters at universities and sports clubs convert youth into 15-second
                Web-Lite bookings without downloading an app.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2">
              <div className="text-xs font-mono text-slate-500">Outreach Tool 03</div>
              <h3 className="font-display text-base font-bold text-slate-900">
                Automated Recall Broadcaster
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sends exam-week counseling, apprentice wellness, and 6-month recall campaigns via
                WhatsApp & SMS with 1-tap booking links.
              </p>
            </div>
          </div>
        </section>

        {/* Section 05: Public & Private Clinic SaaS Partnerships */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 border-t border-slate-200">
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-cyan-800 font-semibold">Section 05</div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Public & Private Clinic SaaS Subscriptions & Innovation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Package Dunwell’s HMS, Corporate CRM, and Document Automation as monthly SaaS
              subscriptions for neighboring public and private clinics—creating software revenue and a
              shared referral network.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('partners')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
            >
              <Network className="w-4 h-4" />
              Open Partner SaaS Portal
            </button>
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">
                  1. Multi-Tenant Clinic SaaS Subscriptions
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Public programmes and private practices subscribe from R1,500–R15,000/month (20 clinics
                  at R4,500 avg = R90,000/mo or R1.08M/yr) to run Reception, Nurse, Pharmacy, Auto-Payslips,
                  and B2B CRM.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">
                  2. Bi-Directional Lab & Diagnostic Marketplace
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Partner clinics lacking specialized lab or occupational equipment route diagnostic
                  referrals straight into Dunwell’s HMS.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">
                  3. Employer-Sponsored Youth Apprenticeship Pass
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  B2B construction clients fund preventive youth health passes for young site interns,
                  growing Dunwell’s youth impact alongside corporate contracts.
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-slate-900">
                  4. Pharmacy Refill & Locker Auto-Subscriptions
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Automated WhatsApp refill reminders and express QR pickup tokens keep chronic and
                  preventive pharmacy revenue recurring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: 2027–2029 IT Strategic Growth Horizon */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-mono text-cyan-800 font-semibold">
                Section 06 · 2027–2029 Growth Horizon
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                2027–2029 IT Initiatives to Grow Dunwell Youth Priority Clinic
              </h2>
              <p className="text-sm text-slate-600 max-w-3xl">
                Once Phase 1–2 portals are live, these six 2027–2029 IT expansions unlock recurring
                youth memberships, university/school portals, medical aid claim validation, and
                smart site IoT.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSlideIndex(5);
                setSlideMode(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Presentation className="w-3.5 h-3.5" />
              Jump to 2027–2029 Slides
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GROWTH_2027_IDEAS.map((idea) => (
              <div
                key={idea.code}
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-800 font-semibold">{idea.code}</span>
                    <span className="text-slate-500">{idea.quarter}</span>
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900">{idea.title}</h3>
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Solves:</span>{' '}
                    {idea.problemSolved}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{idea.howItWorks}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="text-xs text-emerald-800 font-medium">{idea.revenueImpact}</div>
                  <button
                    type="button"
                    onClick={() => onNavigate(idea.portalLink)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 hover:underline"
                  >
                    {idea.portalLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 07: 7 Strategic Outcomes & 8 Executive KPIs */}
        <section className="space-y-6 pt-8 border-t border-slate-200">
          <div className="space-y-1.5">
            <div className="text-xs font-mono text-cyan-800 font-semibold">
              Section 07 · Strategy Governance & Success Metrics
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Seven Strategic Outcomes & Initial 2027–2029 KPIs
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl">
              Every IT deliverable is tied to measurable clinic growth—tracking real attended
              bookings, B2B contracts, clinic SaaS conversions, and POPIA security governance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="font-display text-base font-bold text-slate-900 pb-2 border-b border-slate-200">
                7 Core Strategic Outcomes
              </h3>
              <div className="divide-y divide-slate-100">
                {SEVEN_OUTCOMES.map((item) => (
                  <div key={item.outcome} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="text-xs font-bold text-cyan-900">{item.outcome}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.meaning}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-slate-900">
                  8 Initial Performance Indicators (KPIs)
                </h3>
                <span className="text-xs text-slate-500">Baseline vs 6–12 Month Targets</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                      <th className="py-2.5 px-4">KPI Area</th>
                      <th className="py-2.5 px-4">Initial Target</th>
                      <th className="py-2.5 px-4 text-right">Cadence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {INITIAL_KPIS.map((k) => (
                      <tr key={k.area}>
                        <td className="py-2.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                          {k.area}
                        </td>
                        <td className="py-2.5 px-4 text-xs">{k.target}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-xs text-cyan-800 whitespace-nowrap">
                          {k.review}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Two Parallel Starting Pilots & POPIA Non-Negotiables */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch pt-8 border-t border-slate-200">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="text-xs font-mono text-cyan-800 font-semibold">
              Recommended Pilot Approach
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900">
              Start with Two Parallel Commercial Pilots
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
                <div className="text-xs font-mono text-cyan-800 font-semibold">Pilot 01 · B2B</div>
                <div className="font-display text-sm font-bold text-slate-900">
                  1 Corporate Medical Customer
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Onboard one construction or logistics employer in Johannesburg using synthetic test
                  files first, then prove fitness checks and incident nurse dispatch.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
                <div className="text-xs font-mono text-cyan-800 font-semibold">Pilot 02 · SaaS</div>
                <div className="font-display text-sm font-bold text-slate-900">
                  1–2 Private Partner Clinics
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deploy Growth/Starter SaaS templates under a 60–90 day SLA pilot before converting
                  to paid monthly subscriptions and expanding to public programmes.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-900 text-slate-100 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-amber-300 font-semibold">
                POPIA & Clinical Governance Non-Negotiables
              </div>
              <Lock className="w-4 h-4 text-amber-300" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Privacy, Security & Clinical Sign-Off Controls
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Synthetic Demo Rule:</strong> Live portals and
                  sales demos strictly use synthetic records—real patient data is never exposed.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">POPIA Tenant & Employer Isolation:</strong> Partner
                  clinics share zero patient data, and employers see fitness status only (never diagnoses).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Role-Based Access, MFA & Clinician Sign-Off:</strong>{' '}
                  No Safe AI output, sick note, or medical certificate leaves Dunwell without
                  practitioner approval and an immutable audit trail.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom Presentation Action Bar */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-display text-base font-bold text-slate-900">
              Ready to Present & Walk Through Every Portal Live
            </h3>
            <p className="text-xs text-slate-600">
              Launch Full-Screen Slide Presentation Mode with example pictures or open the 24-Month
              Roadmap & ZAR ROI Estimator.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={STRATEGY_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-cyan-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Open 16-Page Strategy PDF
            </a>
            <button
              type="button"
              onClick={() => {
                setSlideMode(true);
                setSlideFullscreen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Full-Screen Presentation
            </button>
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Open 24-Month Roadmap & ROI
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
