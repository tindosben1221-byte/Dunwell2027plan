import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  CheckCircle2,
  FileCheck2,
  FileSpreadsheet,
  Lock,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { useClinicDemo } from '../context/ClinicDemoContext';
import { NavSection, StaffPayslip } from '../types/dunwell';

interface AutomationHubViewProps {
  onNavigate: (section: NavSection) => void;
}

type AutomationTab = 'payslips' | 'sick-notes' | 'safe-ai';
type SafeAiMode = 'sick-note-redaction' | 'incident-triage' | 'youth-router';

interface SafeAiResponseData {
  draftOutput: string;
  patientGuidance: string;
  suggestedServiceOrAction: string;
  urgencyFlag: string;
  privacyGuardrailsApplied: string[];
  requiresClinicianSignOff: boolean;
  modelUsed: string;
}

const SAFE_AI_PRESETS: Record<SafeAiMode, { label: string; context: string; sample: string }> = {
  'sick-note-redaction': {
    label: 'Safe Sick-Note Privacy Redactor',
    context: 'Patient: Kagiso Molefe (BuildRight Construction · Sandton Ext 4) · 3 Days Off Heavy Rigging',
    sample:
      '4cm right palm laceration from rebar; 4 nylon sutures placed under local anesthesia + tetanus toxoid booster + ibuprofen 400mg TDS. Keep wound dry and avoid heavy grip for 72 hours.',
  },
  'incident-triage': {
    label: 'Safe Incident Triage Prep',
    context: 'Reported by BuildRight HSE Lead · Sandton Ext 4 Site',
    sample:
      'Worker slipped on wet scaffolding plank (~1.5m drop). Complaining of swollen right ankle, unable to bear full weight, alert and oriented, no head impact or active bleeding.',
  },
  'youth-router': {
    label: 'Safe Youth WhatsApp Router',
    context: 'Incoming WhatsApp message from Age 20-24 UJ student',
    sample:
      'Hi, I have been feeling overwhelmed and barely sleeping before university finals and want to speak to someone privately without sitting in a crowded waiting room.',
  },
};

export const AutomationHubView: React.FC<AutomationHubViewProps> = ({ onNavigate }) => {
  const {
    payslips,
    sickNotes,
    sendStaffPayslip,
    sendAllScheduledPayslips,
    createSickNote,
    signAndSendSickNote,
  } = useClinicDemo();

  const [activeTab, setActiveTab] = useState<AutomationTab>('payslips');
  const [selectedPayslip, setSelectedPayslip] = useState<StaffPayslip>(payslips[0]);
  const [batchMessage, setBatchMessage] = useState<string | null>(null);

  // Sick Note Builder State
  const [snPatient, setSnPatient] = useState('Sipho Ndlovu (BRC-0412)');
  const [snEmployer, setSnEmployer] = useState('BuildRight Civil & Construction (Pty) Ltd');
  const [snClinician, setSnClinician] = useState('Sr. Thandiwe Nkosi');
  const [snDaysOff, setSnDaysOff] = useState(2);
  const [snInternalNote, setSnInternalNote] = useState(
    'Acute viral upper respiratory infection with low-grade fever; prescribed paracetamol & hydration. Rest 48 hours.'
  );
  const [snEmployerSafe, setSnEmployerSafe] = useState(
    'Employee assessed at Dunwell Clinic and advised 2 days medical rest. Cleared for normal crane operation after 48-hour recovery review.'
  );
  const [snRedactDiagnosis, setSnRedactDiagnosis] = useState(true);
  const [snTarget, setSnTarget] = useState<
    'Patient WhatsApp + Company HR Portal' | 'Patient WhatsApp Only'
  >('Patient WhatsApp + Company HR Portal');

  // Safe AI Studio State
  const [aiMode, setAiMode] = useState<SafeAiMode>('sick-note-redaction');
  const [aiInput, setAiInput] = useState(SAFE_AI_PRESETS['sick-note-redaction'].sample);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<SafeAiResponseData | null>(null);
  const [aiApproved, setAiApproved] = useState(false);

  const scheduledCount = payslips.filter((p) => p.status === 'Scheduled').length;
  const currentSelectedPayslip =
    payslips.find((p) => p.id === selectedPayslip.id) || payslips[0];

  const handleBatchPayroll = () => {
    const count = sendAllScheduledPayslips();
    setBatchMessage(
      count > 0
        ? `Auto-generated and sent ${count} staff payslip(s) via WhatsApp & Email PDF.`
        : 'All staff payslips for this cycle have already been auto-sent.'
    );
  };

  const handleCreateSickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!snPatient.trim() || !snEmployerSafe.trim()) return;
    createSickNote({
      patientName: snPatient.trim(),
      employerName: snEmployer.trim(),
      clinicianName: snClinician.trim(),
      daysOff: snDaysOff,
      internalClinicalNote: snInternalNote.trim(),
      employerSafeSummary: snEmployerSafe.trim(),
      privacyRedacted: snRedactDiagnosis,
      deliveryTarget: snTarget,
    });
  };

  const handleSwitchAiMode = (mode: SafeAiMode) => {
    setAiMode(mode);
    setAiInput(SAFE_AI_PRESETS[mode].sample);
    setAiError(null);
    setAiResult(null);
    setAiApproved(false);
  };

  const handleRunSafeAi = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiError(null);
    setAiApproved(false);

    try {
      const response = await fetch('/api/safe-ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: aiMode,
          inputText: aiInput,
          contextLabel: SAFE_AI_PRESETS[aiMode].context,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setAiError(data.error || 'Safe AI request failed.');
        setAiResult(null);
      } else {
        setAiResult(data as SafeAiResponseData);
      }
    } catch {
      setAiError('Network error reaching the Dunwell Safe AI server endpoint.');
      setAiResult(null);
    } finally {
      setAiLoading(false);
    }
  };

  const handleApplyAiToSickNote = () => {
    if (!aiResult) return;
    setSnInternalNote(aiInput);
    setSnEmployerSafe(aiResult.draftOutput);
    setAiApproved(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Dunwell Automation & Safe AI Hub</span>
            <span aria-hidden="true">·</span>
            <span>Auto-Payslips, QR Sick Notes & Supervised Clinical AI</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            Clinic Document Automation & Safe AI Studio
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Click any module below to test how Dunwell auto-generates and auto-sends staff payslips,
            privacy-redacted sick notes, and clinician-approved Safe AI drafts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('clinic-dispatch')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
        >
          Inspect HMS Sync Log
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Module Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('payslips')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'payslips'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-cyan-800" />
            Auto-Payslips ({payslips.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sick-notes')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'sick-notes'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-cyan-800" />
            Auto-Sick Notes & Privacy ({sickNotes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('safe-ai')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'safe-ai'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            Safe AI Automation Studio
          </button>
        </div>

        {activeTab === 'payslips' && (
          <button
            type="button"
            onClick={handleBatchPayroll}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
          >
            <Send className="w-3.5 h-3.5" />
            Generate & Auto-Send All Scheduled ({scheduledCount})
          </button>
        )}
      </div>

      {/* TAB 1: AUTO-PAYSLIPS ENGINE */}
      {activeTab === 'payslips' && (
        <div className="space-y-4">
          {batchMessage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-xs font-semibold text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              {batchMessage}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Staff Payroll Queue */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-base font-bold text-slate-900">
                    HMS Staff Payroll & Dispatch Allowance Queue
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pulls base pay, mobile incident dispatch allowances, and shift overtime from HMS.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                      <th className="py-3 px-4">Staff Member</th>
                      <th className="py-3 px-4">Channel</th>
                      <th className="py-3 px-4 text-right">Net Pay</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {payslips.map((p) => {
                      const isSelected = p.id === currentSelectedPayslip.id;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedPayslip(p)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-cyan-50/70' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-900">{p.staffName}</div>
                            <div className="text-xs text-slate-500">
                              {p.role} · {p.payslipNo}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-700">
                            {p.deliveryChannel}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                            R{p.netPayZar.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {p.status === 'Scheduled' ? (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  sendStaffPayslip(p.id);
                                }}
                                className="px-3 py-1.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg whitespace-nowrap"
                              >
                                Auto-Send Now
                              </button>
                            ) : (
                              <span className="text-xs font-semibold text-emerald-700">
                                Sent · {p.sentAt}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Payslip Document Mockup Preview */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
              <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/aistudio/WhatsApp_Image_2025-09-03_at_09.51.25_12f074ba.jpeg"
                    alt="Dunwell Clinic"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <div className="text-xs font-mono text-cyan-800 font-semibold">
                      Automated Payslip Preview
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900">
                      {currentSelectedPayslip.staffName}
                    </h3>
                    <div className="text-xs text-slate-500">
                      {currentSelectedPayslip.periodLabel} · {currentSelectedPayslip.payslipNo}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold ${
                    currentSelectedPayslip.status === 'Generated & Auto-Sent'
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                  }`}
                >
                  {currentSelectedPayslip.status}
                </span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Base Monthly Salary</span>
                  <span className="font-mono tabular-nums text-slate-900">
                    R{currentSelectedPayslip.baseSalaryZar.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Site Dispatch & On-Call Allowance</span>
                  <span className="font-mono tabular-nums text-slate-900">
                    R{currentSelectedPayslip.dispatchAllowancesZar.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Overtime Shifts (HMS Roster)</span>
                  <span className="font-mono tabular-nums text-slate-900">
                    R{currentSelectedPayslip.overtimeShiftsZar.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-2.5 flex justify-between text-red-700">
                  <span>SARS PAYE Income Tax</span>
                  <span className="font-mono tabular-nums">
                    - R{currentSelectedPayslip.payeTaxZar.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-red-700">
                  <span>UIF & Medical Aid Statutory</span>
                  <span className="font-mono tabular-nums">
                    - R{currentSelectedPayslip.uifMedicalZar.toLocaleString()}
                  </span>
                </div>

                <div className="border-t border-slate-300 pt-3 flex justify-between font-bold text-base text-slate-900">
                  <span>Net Disbursed Pay</span>
                  <span className="font-mono tabular-nums text-cyan-900">
                    R{currentSelectedPayslip.netPayZar.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  Delivery: <span className="font-semibold text-slate-900">{currentSelectedPayslip.deliveryChannel}</span>
                </div>
                {currentSelectedPayslip.status === 'Scheduled' ? (
                  <button
                    type="button"
                    onClick={() => sendStaffPayslip(currentSelectedPayslip.id)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg whitespace-nowrap"
                  >
                    Generate & Send PDF
                  </button>
                ) : (
                  <span className="text-xs font-mono text-emerald-700 font-semibold">
                    Delivered {currentSelectedPayslip.sentAt}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTO-SICK NOTES & PRIVACY REDACTION */}
      {activeTab === 'sick-notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Sick Note Generator */}
          <form
            onSubmit={handleCreateSickNote}
            className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <div className="border-b border-slate-200 pb-3">
              <div className="text-xs font-mono text-cyan-800 font-semibold">
                Clinician-Approved Document Automation
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Generate & Auto-Send Digital Sick Note
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Patient / Worker Name
                </label>
                <input
                  type="text"
                  required
                  value={snPatient}
                  onChange={(e) => setSnPatient(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Employer / School
                </label>
                <input
                  type="text"
                  required
                  value={snEmployer}
                  onChange={(e) => setSnEmployer(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Signing Clinician
                </label>
                <input
                  type="text"
                  required
                  value={snClinician}
                  onChange={(e) => setSnClinician(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Recommended Rest (Days)
                </label>
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={snDaysOff}
                  onChange={(e) => setSnDaysOff(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Private HMS Clinical Note (Patient Copy Only)
              </label>
              <textarea
                rows={2}
                value={snInternalNote}
                onChange={(e) => setSnInternalNote(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  Employer-Safe HR Statement
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={snRedactDiagnosis}
                    onChange={(e) => setSnRedactDiagnosis(e.target.checked)}
                    className="accent-cyan-800"
                  />
                  Redact Clinical Diagnosis
                </label>
              </div>
              <textarea
                rows={3}
                required
                value={snEmployerSafe}
                onChange={(e) => setSnEmployerSafe(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Auto-Delivery Route
              </label>
              <select
                value={snTarget}
                onChange={(e) =>
                  setSnTarget(
                    e.target.value as
                      | 'Patient WhatsApp + Company HR Portal'
                      | 'Patient WhatsApp Only'
                  )
                }
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
              >
                <option value="Patient WhatsApp + Company HR Portal">
                  Patient WhatsApp + Company HR Portal (Redacted)
                </option>
                <option value="Patient WhatsApp Only">Patient WhatsApp Only</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors"
            >
              Sign Off & Auto-Send QR Sick Note
            </button>
          </form>

          {/* Right: Live Issued Sick Notes Queue */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Issued & Pending Digital Sick Notes ({sickNotes.length})
            </h2>

            {sickNotes.map((sn) => (
              <div
                key={sn.id}
                className="bg-white border border-slate-200 rounded-xl p-5 space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-mono text-slate-500">
                      {sn.noteCode} · {sn.startDate} to {sn.resumeDate} ({sn.daysOff} days off)
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 mt-0.5">
                      {sn.patientName} — {sn.employerName}
                    </h3>
                  </div>

                  {sn.status === 'Draft Awaiting Sign-Off' ? (
                    <button
                      type="button"
                      onClick={() => signAndSendSickNote(sn.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg whitespace-nowrap"
                    >
                      Approve & Auto-Send
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700">
                      Signed & Auto-Sent · {sn.sentAt}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-slate-500" />
                      Private HMS Clinical Record (Patient Only)
                    </div>
                    <p className="text-slate-600">{sn.internalClinicalNote}</p>
                  </div>

                  <div className="bg-cyan-50/50 border border-cyan-200 rounded-lg p-3 space-y-1">
                    <div className="font-semibold text-cyan-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-800" />
                      Employer HR Summary ({sn.privacyRedacted ? 'Diagnosis Redacted' : 'Full'})
                    </div>
                    <p className="text-slate-700">{sn.employerSafeSummary}</p>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  Signed by: {sn.clinicianName} · Route: {sn.deliveryTarget}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SAFE AI AUTOMATION STUDIO */}
      {activeTab === 'safe-ai' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Safe AI Prompt & Guardrail Selector */}
          <form
            onSubmit={handleRunSafeAi}
            className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-800 font-semibold">
                <Bot className="w-4 h-4" />
                Supervised Healthcare AI (Human-in-the-Loop)
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                Test Safe AI Clinical & Triage Automation
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Powered by server-side Gemini (`gemini-4-hydrogen`). AI only creates drafts—a
                Dunwell clinician must review and approve before any message or sick note is sent.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Select Safe AI Workflow
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(Object.keys(SAFE_AI_PRESETS) as SafeAiMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSwitchAiMode(m)}
                    className={`p-2.5 text-left text-xs font-semibold rounded-lg border transition-colors ${
                      aiMode === m
                        ? 'bg-cyan-800 text-white border-cyan-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {SAFE_AI_PRESETS[m].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical / Intake Context
              </label>
              <div className="text-xs text-slate-500 mb-2">
                {SAFE_AI_PRESETS[aiMode].context}
              </div>
              <textarea
                rows={4}
                required
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
              />
            </div>

            <button
              type="submit"
              disabled={aiLoading}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 disabled:opacity-60 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              {aiLoading ? 'Generating Safe AI Draft...' : 'Run Safe AI Draft with Privacy Guardrails'}
            </button>
          </form>

          {/* Right: Safe AI Output + Mandatory Clinician Approval Gate */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-slate-900">
                Safe AI Draft & Clinician Sign-Off Gate
              </h2>
              <span className="text-xs font-mono text-slate-500">Zero Auto-Send</span>
            </div>

            {aiError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs text-red-900">
                <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold">Safe AI Endpoint Notice</div>
                  <p>{aiError}</p>
                </div>
              </div>
            )}

            {!aiResult && !aiError && (
              <div className="py-10 text-center space-y-2">
                <ShieldCheck className="w-8 h-8 text-cyan-800 mx-auto" />
                <p className="text-sm font-semibold text-slate-800">
                  Ready to generate a privacy-checked draft
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Select a workflow on the left and run Safe AI to inspect how Dunwell enforces
                  non-diagnostic HR wording, emergency red-flag screening, and clinician sign-off.
                </p>
              </div>
            )}

            {aiResult && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-cyan-800 font-semibold">
                    Recommended Action: {aiResult.suggestedServiceOrAction}
                  </span>
                  <span
                    className={`font-semibold ${
                      aiResult.urgencyFlag === 'Urgent Escalation'
                        ? 'text-red-700'
                        : 'text-amber-700'
                    }`}
                  >
                    Urgency: {aiResult.urgencyFlag}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-900">
                    Safe Draft Output (Awaiting Human Review)
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{aiResult.draftOutput}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5">
                  <div className="text-xs font-semibold text-slate-900">
                    Patient / Intake Guidance
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {aiResult.patientGuidance}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-700">
                    Safety & Privacy Guardrails Enforced
                  </div>
                  <ul className="space-y-1.5">
                    {(aiResult.privacyGuardrailsApplied || []).map((g) => (
                      <li key={g} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Model: <span className="font-mono">{aiResult.modelUsed}</span> · Sign-off required
                  </div>

                  {aiMode === 'sick-note-redaction' ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleApplyAiToSickNote();
                        setActiveTab('sick-notes');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      Approve & Open in Sick Note Sender
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAiApproved(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      {aiApproved ? 'Approved by Clinician' : 'Clinician Approve Draft'}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
