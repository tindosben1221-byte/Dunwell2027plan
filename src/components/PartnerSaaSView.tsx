import React, { useState } from 'react';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FlaskConical,
  Lock,
  Pill,
  Plus,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/initialData';
import { useClinicDemo } from '../context/ClinicDemoContext';
import { ClinicSector, NavSection, SubscriptionTier } from '../types/dunwell';
import { ClinicImage } from './ClinicImage';

interface PartnerSaaSViewProps {
  onNavigate: (section: NavSection) => void;
}

const SAAS_TIERS: {
  tier: SubscriptionTier;
  audience: string;
  priceZar: string;
  limits: string;
  features: string[];
}[] = [
  {
    tier: 'Starter',
    audience: 'Small private clinic or NGO',
    priceZar: 'R1,500–R3,000 / mo',
    limits: 'Up to 10 staff seats · 1 facility',
    features: [
      'Core HMS (Reception, Nurse & Pharmacy Stock)',
      'Expense Reporting & Digital Booking Queue',
      'Bi-Directional Lab & Specialist Referral to Dunwell',
    ],
  },
  {
    tier: 'Growth',
    audience: 'Growing clinic scaling operations',
    priceZar: 'R4,000–R7,500 / mo',
    limits: 'Up to 25 staff seats · Unlimited PDFs',
    features: [
      'Everything in Starter + HR & Auto-Payslips',
      'POPIA-Redacted QR Sick Notes & Safe AI Drafting',
      'Patient CRM, Automated Reminders & Analytics',
    ],
  },
  {
    tier: 'Professional',
    audience: 'Multi-service or occupational clinic',
    priceZar: 'R8,000–R15,000 / mo',
    limits: 'Up to 50 staff seats · Multi-site B2B',
    features: [
      'Everything in Growth + Corporate Medicals CRM',
      'Workplace Incident Nurse Dispatch & SLA Tracking',
      'Lab Integration & Executive BI Dashboard',
    ],
  },
  {
    tier: 'Enterprise / Public',
    audience: 'Hospital group or public health programme',
    priceZar: 'Custom quotation',
    limits: 'Unlimited seats · Custom tender SLA',
    features: [
      'Multi-branch federation & POPIA tenant isolation',
      'SSO/MFA, custom integrations & audit exports',
      'Dedicated onboarding, training & support SLA',
    ],
  },
];

const INNOVATIVE_IDEAS = [
  {
    title: '01. Employer-Sponsored Youth Apprenticeship Pass',
    summary:
      'Construction & logistics clients on our Corporate CRM sponsor preventive wellness & mental health checkups for young apprentices—turning B2B contracts into youth clinic growth.',
    icon: Users,
  },
  {
    title: '02. Bi-Directional Diagnostic & Lab Marketplace',
    summary:
      'Smaller public & private clinics without lab or imaging capacity subscribe to Dunwell’s portal to book diagnostics and receive digital results straight into their HMS.',
    icon: FlaskConical,
  },
  {
    title: '03. Pharmacy Auto-Refill & Express Pickup Subscriptions',
    summary:
      'Youth & chronic patients receive automated WhatsApp refill reminders, 1-tap mobile payment, and discreet QR pharmacy pickup codes without queuing.',
    icon: Pill,
  },
  {
    title: '04. Cross-District Emergency Nurse Dispatch Network',
    summary:
      'Partner private clinics join Dunwell’s SLA network so a construction company operating across Gauteng & neighboring provinces gets rapid nurse dispatch from the nearest subscribed partner clinic.',
    icon: Share2,
  },
];

export const PartnerSaaSView: React.FC<PartnerSaaSViewProps> = ({ onNavigate }) => {
  const { partnerClinics, addPartnerClinic, togglePartnerModule } = useClinicDemo();

  const [newClinicName, setNewClinicName] = useState('');
  const [newSector, setNewSector] = useState<ClinicSector>('Private Clinic');
  const [newLocation, setNewLocation] = useState('');
  const [newTier, setNewTier] = useState<SubscriptionTier>('Growth');
  const [newSeats, setNewSeats] = useState(14);

  const totalMrr = partnerClinics.reduce((sum, c) => sum + c.monthlyFeeZar, 0);
  const totalReferrals = partnerClinics.reduce((sum, c) => sum + c.monthlyReferralsSent, 0);

  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClinicName.trim() || !newLocation.trim()) return;
    addPartnerClinic({
      clinicName: newClinicName.trim(),
      sector: newSector,
      regionLocation: newLocation.trim(),
      tier: newTier,
      activeStaffSeats: newSeats,
    });
    setNewClinicName('');
    setNewLocation('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Editorial Partner Network Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-mono text-cyan-800 font-semibold">
              Public & Private Clinic SaaS Partnerships · Johannesburg & Regional Expansion
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight text-balance">
              Licensing Dunwell’s HMS, Corporate CRM & Automation via Clinic Subscriptions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Independent private clinics, NGOs, and public health programmes need reliable
              reception, nursing, stock, and reporting software. Packaging Dunwell’s IT platform as a
              POPIA-isolated multi-tenant SaaS turns internal software into recurring monthly
              revenue.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div>
              <div className="text-xs text-slate-500">Subscribed Clinics</div>
              <div className="font-display text-xl font-bold text-slate-900 tabular-nums mt-0.5">
                {partnerClinics.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Demo SaaS MRR</div>
              <div className="font-display text-xl font-bold text-cyan-800 tabular-nums mt-0.5">
                R{totalMrr.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Referrals to Dunwell</div>
              <div className="font-display text-xl font-bold text-slate-900 tabular-nums mt-0.5">
                {totalReferrals} / mo
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[240px]">
          <ClinicImage
            src={CLINIC_IMAGES.partnerNetwork}
            alt="Partner clinic director and physician reviewing shared clinic referral analytics"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Illustrative 20-Clinic Unit Economics & Private vs Public Routes */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <div className="text-xs font-mono text-amber-300 font-semibold">
              Illustrative Scale Economics (2027–2029)
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              20 Partner Clinics = R1.08M Annualised SaaS Revenue
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Conservative baseline before onboarding fees, training packs, or bi-directional lab
              and specialist referral revenue.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
            <div className="bg-slate-800/60 rounded-lg p-3.5">
              <div className="text-xs text-slate-400">20 Clinics × R4,500 avg</div>
              <div className="font-display text-xl font-bold text-white tabular-nums mt-0.5">
                R90,000 / mo
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-3.5">
              <div className="text-xs text-slate-400">Annualised Base ARR</div>
              <div className="font-display text-xl font-bold text-amber-300 tabular-nums mt-0.5">
                R1,080,000 / yr
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
            <h2 className="font-display text-base font-bold text-slate-900">
              Private vs Public Partnership Routes & POPIA Isolation
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800">
              <Lock className="w-3.5 h-3.5" />
              Strict Tenant Separation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
              <div className="text-xs font-mono text-cyan-800 font-semibold">Route A · Fast Start</div>
              <div className="font-display font-bold text-slate-900">Private Clinics & NGOs</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Start with a 60–90 day structured pilot using pre-configured HMS, Reception, Nurse,
                Pharmacy, and Auto-Payslip templates—fast procurement and rapid MRR conversion.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
              <div className="text-xs font-mono text-cyan-800 font-semibold">
                Route B · Tender & SLA
              </div>
              <div className="font-display font-bold text-slate-900">Public Health Programmes</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide modular queue, chronic care, stock forecasting, and referral coordination
                backed by POPIA compliance pack, SLA uptime guarantees, and role-based audit logs.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-xs text-slate-600 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-900">POPIA Multi-Tenant Safeguard:</strong> Each
              subscribed clinic operates in a logically isolated workspace with separate user
              administration and zero cross-clinic patient visibility unless a consented referral is
              logged.
            </span>
          </div>
        </div>
      </section>

      {/* 4-Tier SaaS Subscription Matrix */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              4-Tier Clinic Subscription Plans (ZAR · Public & Private Facilities)
            </h2>
            <p className="text-sm text-slate-600">
              Priced by facility scale and enabled modules—generating software revenue plus patient
              and diagnostic referrals back to Dunwell.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="text-xs font-semibold text-cyan-800 hover:underline inline-flex items-center gap-1"
          >
            Open 24-Month Roadmap & ROI Calculator
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SAAS_TIERS.map((plan) => (
            <div
              key={plan.tier}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="text-xs text-slate-500">{plan.audience}</div>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900">{plan.tier}</h3>
                  <div className="font-mono text-sm font-bold text-cyan-800 tabular-nums mt-0.5">
                    {plan.priceZar}
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500 pb-3 border-b border-slate-100">
                  {plan.limits}
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setNewTier(plan.tier)}
                className="w-full py-2 px-3 text-xs font-semibold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
              >
                Select {plan.tier}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Multi-Clinic Provisioning & Module Toggles */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Onboard Public/Private Partner Clinic */}
        <form
          onSubmit={handleOnboard}
          className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
        >
          <div className="border-b border-slate-200 pb-3">
            <div className="text-xs font-mono text-cyan-800 font-semibold">
              Multi-Tenant SaaS Provisioning
            </div>
            <h2 className="font-display text-base font-bold text-slate-900 mt-0.5">
              Onboard a Public or Private Partner Clinic
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Partner Clinic / Facility Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Randburg Youth & Family Practice"
              value={newClinicName}
              onChange={(e) => setNewClinicName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Facility Type
              </label>
              <select
                value={newSector}
                onChange={(e) => setNewSector(e.target.value as ClinicSector)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Private Clinic">Private Clinic</option>
                <option value="Public Health Facility">Public Health Facility</option>
                <option value="NGO / Youth Center">NGO / Youth Center</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Staff Seats
              </label>
              <input
                type="number"
                min={5}
                max={120}
                value={newSeats}
                onChange={(e) => setNewSeats(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Municipality / Region Location
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Johannesburg · Randburg"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subscription Tier
            </label>
            <select
              value={newTier}
              onChange={(e) => setNewTier(e.target.value as SubscriptionTier)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
            >
              <option value="Starter">Starter (R1,500–R3,000/mo · Demo R2,500)</option>
              <option value="Growth">Growth (R4,000–R7,500/mo · Demo R5,500)</option>
              <option value="Professional">Professional (R8,000–R15,000/mo · Demo R11,500)</option>
              <option value="Enterprise / Public">
                Enterprise / Public (Custom · Demo R22,000)
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Provision 60-Day Pilot Tenant
          </button>
        </form>

        {/* Right: Active Subscribed Clinics & Live Module Toggles */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                Active Partner Clinics & Subscription Modules
              </h2>
              <p className="text-xs text-slate-500">
                Click module buttons on any clinic row to adjust enabled features and live MRR.
              </p>
            </div>
            <Building2 className="w-5 h-5 text-cyan-800 shrink-0" />
          </div>

          <div className="divide-y divide-slate-200">
            {partnerClinics.map((c) => (
              <div key={c.id} className="p-5 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-cyan-800">{c.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.regionLocation}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{c.activeStaffSeats} seats</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.tier}</span>
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 mt-0.5">
                      {c.clinicName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <div className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                      R{c.monthlyFeeZar.toLocaleString()} / mo
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold">{c.status}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(
                    [
                      ['hmsCore', 'HMS Core'],
                      ['autoPayslipsSickNotes', 'Auto-Payslips & Sick Notes'],
                      ['b2bCorporateCrm', 'B2B Corporate CRM'],
                      ['referralExchange', 'Lab & Youth Referral Exchange'],
                    ] as const
                  ).map(([key, label]) => {
                    const enabled = c.modules[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => togglePartnerModule(c.id, key)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                          enabled
                            ? 'bg-cyan-800 text-white border-cyan-800'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {enabled ? 'Enabled: ' : '+ Add '}
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative IT Ideas to Grow Dunwell */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-800 font-semibold">
          <Sparkles className="w-4 h-4" />
          Innovative IT Growth Concepts
        </div>
        <h2 className="font-display text-xl font-bold text-slate-900">
          Additional High-Impact Digital Initiatives for Dunwell Clinic
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {INNOVATIVE_IDEAS.map((idea) => {
            const Icon = idea.icon;
            return (
              <div
                key={idea.title}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-base font-bold text-slate-900">{idea.title}</h3>
                  <Icon className="w-5 h-5 text-cyan-800 shrink-0" />
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{idea.summary}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
