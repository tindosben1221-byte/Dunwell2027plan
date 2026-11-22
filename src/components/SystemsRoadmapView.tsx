import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ClipboardCheck, Layers, Network, TrendingUp } from 'lucide-react';
import {
  FIRST_90_DAYS_CHECKLIST,
  INTERNAL_SYSTEM_MODULES,
  ROADMAP_24_MONTH,
} from '../data/initialData';
import { NavSection } from '../types/dunwell';

interface SystemsRoadmapViewProps {
  onNavigate: (section: NavSection) => void;
}

interface ArchNode {
  id: string;
  layer: 'Existing Core' | 'New Growth Layer';
  title: string;
  summary: string;
  inputs: string;
  outputs: string;
  demoSection?: NavSection;
  demoLabel?: string;
}

const ARCH_NODES: ArchNode[] = [
  {
    id: 'hms-core',
    layer: 'Existing Core',
    title: 'Dunwell HMS Core (Reception, Nurse, Pharmacy, Expense)',
    summary:
      'Already built and running inside the Johannesburg clinic. Remains the single clinical and financial source of truth.',
    inputs: 'Walk-ins, Corporate Incident alerts, Youth Web-Lite bookings',
    outputs: 'Nurse triage charts, Pharmacy kit allocations, Corporate billing & expense margins',
    demoSection: 'clinic-dispatch',
    demoLabel: 'Inspect HMS Dispatch Desk',
  },
  {
    id: 'booking-app',
    layer: 'Existing Core',
    title: 'Existing Virtual & In-Clinic Booking App',
    summary:
      'Functional booking backend currently under-utilized because patients hesitate to install a standalone app.',
    inputs: 'WhatsApp Bot slots, Campus QR links, 15-sec Web-Lite scheduler',
    outputs: 'Confirmed virtual tele-consult links and in-clinic Reception queue tickets',
    demoSection: 'youth-access',
    demoLabel: 'See App Activation Funnel',
  },
  {
    id: 'b2b-crm',
    layer: 'New Growth Layer',
    title: 'B2B Occupational Health CRM & Medical Fitness Portal',
    summary:
      'Self-service portal for construction, security, and logistics HR/Safety teams to verify worker fitness without exposing private histories.',
    inputs: 'Pre-placement & periodic occupational exams from Dunwell Nurse & Lab',
    outputs: 'QR-verified Fitness Certificates, 30/14/7-day expiry alerts, bulk batch bookings',
    demoSection: 'corporate-crm',
    demoLabel: 'Open Corporate CRM Demo',
  },
  {
    id: 'incident-portal',
    layer: 'New Growth Layer',
    title: 'Workplace Incident Reporting & Nurse Dispatch',
    summary:
      'Emergency & injury workflow allowing companies to log site incidents that Dunwell accepts and assigns to a Nurse.',
    inputs: 'Site injury reports (worker ID, severity, location, immediate notes)',
    outputs: 'Real-time Dunwell acceptance, Nurse assignment, ETA updates, Pharmacy trauma kit prep',
    demoSection: 'clinic-dispatch',
    demoLabel: 'Test Incident Dispatch',
  },
  {
    id: 'youth-funnel',
    layer: 'New Growth Layer',
    title: 'Youth Zero-Friction Access & Outreach Engine',
    summary:
      'WhatsApp Business Bot, QR posters for Johannesburg universities/sports clubs, and outreach tablet sync feeding the existing App.',
    inputs: 'Social media links, campus QR scans, outreach camp registrations',
    outputs: 'High-volume virtual & in-clinic bookings, discreet Pharmacy pickup tokens, recall loops',
    demoSection: 'youth-access',
    demoLabel: 'Launch Youth Funnel Demo',
  },
  {
    id: 'automation-ai',
    layer: 'New Growth Layer',
    title: 'Document Automation & Supervised Safe AI Engine',
    summary:
      'Auto-generates and delivers Staff Payslips, POPIA-redacted QR Sick Notes, Invoices, and human-approved Safe AI drafts.',
    inputs: 'HMS nurse shifts, clinical visit notes, incident logs, youth WhatsApp queries',
    outputs: 'WhatsApp/Email PDFs, diagnosis-redacted HR sick notes, Safe AI triage prep drafts',
    demoSection: 'automation',
    demoLabel: 'Open Automation & Safe AI Studio',
  },
];

export const SystemsRoadmapView: React.FC<SystemsRoadmapViewProps> = ({ onNavigate }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(ARCH_NODES[2].id);

  // Interactive Growth Estimator State (ZAR)
  const [companyCount, setCompanyCount] = useState(8);
  const [workersPerCompany, setWorkersPerCompany] = useState(110);
  const [monthlyYouthBookings, setMonthlyYouthBookings] = useState(260);
  const [partnerClinicCount, setPartnerClinicCount] = useState(20);

  const totalWorkersCovered = companyCount * workersPerCompany;
  const estAnnualB2BRevenue = totalWorkersCovered * 1800 + companyCount * 12 * 15000;
  const estAnnualYouthRevenue = monthlyYouthBookings * 12 * 450;
  const estAnnualSaasRevenue = partnerClinicCount * 4500 * 12;

  const activeNode = ARCH_NODES.find((n) => n.id === selectedNodeId) || ARCH_NODES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs font-mono text-cyan-800 font-semibold">
            IT Systems Architecture · 24-Month Phased Roadmap (2027–2029)
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Connecting Existing HMS & App to New Revenue & Productivity Engines
          </h1>
          <p className="text-sm text-slate-600 mt-1.5 max-w-2xl">
            Click any module in the architecture map below to inspect how data flows between
            Dunwell’s existing clinical systems and the four 2027–2029 growth platforms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('corporate-crm')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          Test Live Integrated Workflow
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Architecture Explorer */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pb-1">
            <Network className="w-4 h-4 text-cyan-800" />
            System Components (Click to Inspect)
          </div>

          {ARCH_NODES.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNodeId(node.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors ${
                  isSelected
                    ? 'bg-cyan-900 text-white border-cyan-900'
                    : 'bg-white text-slate-900 border-slate-200 hover:border-cyan-600'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-xs font-mono ${
                      isSelected ? 'text-amber-300' : 'text-cyan-800'
                    }`}
                  >
                    {node.layer}
                  </span>
                  <Layers
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-cyan-200' : 'text-slate-400'
                    }`}
                  />
                </div>
                <div className="font-display text-base font-bold mt-1">{node.title}</div>
                <p
                  className={`text-xs mt-1 line-clamp-2 ${
                    isSelected ? 'text-cyan-100' : 'text-slate-600'
                  }`}
                >
                  {node.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Node Inspector */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <div className="text-xs font-mono text-cyan-800 font-semibold">{activeNode.layer}</div>
            <h2 className="font-display text-xl font-bold text-slate-900 mt-1">
              {activeNode.title}
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{activeNode.summary}</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div>
              <div className="text-xs font-semibold text-slate-500">Data Inputs</div>
              <p className="text-sm text-slate-800 mt-1">{activeNode.inputs}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-500">Clinical & Business Outputs</div>
              <p className="text-sm text-slate-800 mt-1">{activeNode.outputs}</p>
            </div>
          </div>

          {activeNode.demoSection && (
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <span className="text-xs text-slate-500">Interactive prototype ready</span>
              <button
                type="button"
                onClick={() => onNavigate(activeNode.demoSection!)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
              >
                {activeNode.demoLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Clinic Growth & Revenue Estimator (ZAR) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-800 font-semibold">
              <TrendingUp className="w-4 h-4" />
              Interactive Expansion Opportunity Estimator (ZAR)
            </div>
            <h2 className="font-display text-xl font-bold text-slate-900 mt-1">
              Projected Clinic Growth Across Corporate CRM, Youth Funnel & Clinic SaaS
            </h2>
          </div>
          <span className="text-xs text-slate-500">Adjust sliders to model Johannesburg targets</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="slider-companies" className="font-medium text-slate-700">
                  Partner Construction / Industrial Companies
                </label>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {companyCount} companies
                </span>
              </div>
              <input
                id="slider-companies"
                type="range"
                min={1}
                max={30}
                value={companyCount}
                onChange={(e) => setCompanyCount(Number(e.target.value))}
                className="w-full accent-cyan-800"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="slider-workers" className="font-medium text-slate-700">
                  Average Workers per Company
                </label>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {workersPerCompany} staff
                </span>
              </div>
              <input
                id="slider-workers"
                type="range"
                min={30}
                max={300}
                step={10}
                value={workersPerCompany}
                onChange={(e) => setWorkersPerCompany(Number(e.target.value))}
                className="w-full accent-cyan-800"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="slider-youth" className="font-medium text-slate-700">
                  Monthly Youth Virtual + In-Clinic Funnel Bookings
                </label>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {monthlyYouthBookings} / month
                </span>
              </div>
              <input
                id="slider-youth"
                type="range"
                min={50}
                max={800}
                step={10}
                value={monthlyYouthBookings}
                onChange={(e) => setMonthlyYouthBookings(Number(e.target.value))}
                className="w-full accent-cyan-800"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label htmlFor="slider-saas" className="font-medium text-slate-700">
                  Subscribed Partner Clinics on SaaS (Avg R4,500/mo)
                </label>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  {partnerClinicCount} clinics
                </span>
              </div>
              <input
                id="slider-saas"
                type="range"
                min={2}
                max={40}
                step={1}
                value={partnerClinicCount}
                onChange={(e) => setPartnerClinicCount(Number(e.target.value))}
                className="w-full accent-cyan-800"
              />
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Active Workers Tracked in CRM</div>
              <div className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                {totalWorkersCovered.toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Annual & onboarding occupational clearances
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Est. Annual B2B Medicals + Retainers</div>
              <div className="font-display text-2xl font-bold text-cyan-800 mt-1 tabular-nums">
                R{(estAnnualB2BRevenue / 1000000).toFixed(2)}M
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Based on R1,800/exam + R15,000/mo incident cover
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Est. Annual Youth Virtual/Clinic Yield</div>
              <div className="font-display text-2xl font-bold text-cyan-800 mt-1 tabular-nums">
                R{(estAnnualYouthRevenue / 1000000).toFixed(2)}M
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {(monthlyYouthBookings * 12).toLocaleString()} annual visits + pharmacy scripts
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">Est. Annual Partner Clinic SaaS ARR</div>
              <div className="font-display text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
                R{estAnnualSaasRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                R{(partnerClinicCount * 4500).toLocaleString()}/mo recurring software revenue
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 24-Month Phased Implementation Roadmap (2027–2029 Strategy PDF) */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-mono text-cyan-800 font-semibold">
            2027–2029 Execution Schedule
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 mt-0.5">
            24-Month Phased Implementation Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROADMAP_24_MONTH.map((p) => (
            <div
              key={p.phase}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="text-xs font-mono text-cyan-800 font-semibold">{p.phase}</div>
                <h3 className="font-display text-base font-bold text-slate-900">{p.title}</h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {p.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-500">Phase Exit Criteria</div>
                <p className="text-xs text-slate-800 mt-1 font-medium">{p.exitCriteria}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9 Internal Productivity Modules */}
      <section className="space-y-4">
        <div>
          <div className="text-xs font-mono text-cyan-800 font-semibold">
            Internal Clinic Productivity Suite
          </div>
          <h2 className="font-display text-xl font-bold text-slate-900 mt-0.5">
            9 Internal IT Systems Expanding Dunwell HMS Operations
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4">Internal System Module</th>
                  <th className="py-3 px-4">Key Function</th>
                  <th className="py-3 px-4">Operational & Financial Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {INTERNAL_SYSTEM_MODULES.map((mod) => (
                  <tr key={mod.system} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {mod.system}
                    </td>
                    <td className="py-3 px-4 text-xs sm:text-sm">{mod.keyFunction}</td>
                    <td className="py-3 px-4 text-xs sm:text-sm text-cyan-900 font-medium">
                      {mod.businessValue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* First 90 Days Practical Action Checklist */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-800 font-semibold">
          <ClipboardCheck className="w-4 h-4" />
          Immediate Mobilisation
        </div>
        <h2 className="font-display text-xl font-bold text-slate-900">
          First 90 Days Practical Action Checklist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {FIRST_90_DAYS_CHECKLIST.map((item, idx) => (
            <div
              key={item}
              className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700"
            >
              <span className="font-mono text-xs font-bold text-cyan-800 shrink-0 mt-0.5">
                0{idx + 1}
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
