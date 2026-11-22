import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileBadge2,
  Plus,
  QrCode,
  Search,
  ShieldAlert,
  UserCheck,
  X,
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/initialData';
import { useClinicDemo } from '../context/ClinicDemoContext';
import {
  FitnessStatus,
  IncidentSeverity,
  NavSection,
  WorkerMedicalRecord,
} from '../types/dunwell';
import { ClinicImage } from './ClinicImage';

interface CorporateCrmDemoProps {
  onNavigate: (section: NavSection) => void;
}

function getFitnessStyle(status: FitnessStatus): string {
  switch (status) {
    case 'Fit for Duty':
      return 'text-emerald-700 font-semibold';
    case 'Conditional':
      return 'text-amber-700 font-semibold';
    case 'Expiring Soon':
      return 'text-amber-700 font-semibold';
    case 'Unfit / Hold':
      return 'text-red-700 font-semibold';
  }
}

export const CorporateCrmDemo: React.FC<CorporateCrmDemoProps> = ({ onNavigate }) => {
  const {
    companies,
    workers,
    incidents,
    selectedCompanyId,
    setSelectedCompanyId,
    logWorkplaceIncident,
    addWorkerMedicalRecord,
  } = useClinicDemo();

  const [activeTab, setActiveTab] = useState<'medicals' | 'incidents'>('medicals');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | FitnessStatus>('All');
  const [selectedCertWorker, setSelectedCertWorker] = useState<WorkerMedicalRecord | null>(null);
  const [showAddWorker, setShowAddWorker] = useState(false);

  // Add Worker Form State
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerCode, setNewWorkerCode] = useState('');
  const [newWorkerRole, setNewWorkerRole] = useState('Site Rigger');
  const [newWorkerClearance, setNewWorkerClearance] = useState('Working at Heights');
  const [newWorkerStatus, setNewWorkerStatus] = useState<FitnessStatus>('Fit for Duty');

  // Log Workplace Incident Form State
  const activeCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0];
  const [incWorkerName, setIncWorkerName] = useState('');
  const [incWorkerCode, setIncWorkerCode] = useState('');
  const [incSite, setIncSite] = useState(activeCompany.siteLocation);
  const [incType, setIncType] = useState('Fall / Ankle Trauma on Scaffolding');
  const [incSeverity, setIncSeverity] = useState<IncidentSeverity>('Urgent Trauma');
  const [incDescription, setIncDescription] = useState('');
  const [lastLoggedRef, setLastLoggedRef] = useState<string | null>(null);

  const companyWorkers = workers.filter((w) => w.companyId === activeCompany.id);
  const filteredWorkers = companyWorkers.filter((w) => {
    const matchesSearch =
      w.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const companyIncidents = incidents.filter((i) => i.companyId === activeCompany.id);

  const fitCount = companyWorkers.filter((w) => w.status === 'Fit for Duty').length;
  const attentionCount = companyWorkers.filter((w) => w.status !== 'Fit for Duty').length;
  const openIncidentCount = companyIncidents.filter((i) => i.status !== 'Treated & Cleared').length;

  const handleCompanySwitch = (compId: string) => {
    setSelectedCompanyId(compId);
    const comp = companies.find((c) => c.id === compId);
    if (comp) {
      setIncSite(comp.siteLocation);
    }
    setLastLoggedRef(null);
  };

  const handleLogIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incWorkerName.trim() || !incDescription.trim()) return;
    const created = logWorkplaceIncident({
      companyId: activeCompany.id,
      workerName: incWorkerName.trim(),
      workerCode: incWorkerCode.trim() || 'SITE-TEMP',
      incidentType: incType,
      severity: incSeverity,
      siteLocation: incSite.trim() || activeCompany.siteLocation,
      description: incDescription.trim(),
      reportedBy: activeCompany.safetyOfficer,
    });
    setLastLoggedRef(created.referenceCode);
    setIncWorkerName('');
    setIncWorkerCode('');
    setIncDescription('');
  };

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkerName.trim() || !newWorkerCode.trim()) return;
    addWorkerMedicalRecord({
      fullName: newWorkerName.trim(),
      employeeCode: newWorkerCode.trim().toUpperCase(),
      companyId: activeCompany.id,
      role: newWorkerRole,
      siteName: activeCompany.siteLocation,
      clearanceType: newWorkerClearance,
      status: newWorkerStatus,
      vitalSummary:
        newWorkerStatus === 'Fit for Duty'
          ? 'BP 120/78 · Vision 6/6 · Audiometry Normal · Fit for Site Deployment'
          : 'Reviewed by Dunwell Occupational Clinician · See clearance condition',
    });
    setNewWorkerName('');
    setNewWorkerCode('');
    setShowAddWorker(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Portal Context Header */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Corporate Client Portal Demo</span>
              <span aria-hidden="true">·</span>
              <span>{activeCompany.sector}</span>
              <span aria-hidden="true">·</span>
              <span>Safety Officer: {activeCompany.safetyOfficer}</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {activeCompany.name}
            </h1>
            <p className="text-sm text-slate-600">
              Verify employee medical fitness before site entry and dispatch workplace medical
              incidents directly to Dunwell Clinic.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="company-selector" className="sr-only">
              Switch Partner Company
            </label>
            <select
              id="company-selector"
              value={activeCompany.id}
              onChange={(e) => handleCompanySwitch(e.target.value)}
              className="px-3.5 py-2.5 text-sm font-medium text-slate-800 bg-slate-50 border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => onNavigate('clinic-dispatch')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Switch to Dunwell Dispatch View
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 relative min-h-[180px]">
          <ClinicImage
            src={CLINIC_IMAGES.constructionMedical}
            alt="Dunwell occupational health nurse checking worker medical fitness at construction site"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Quick Company KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Active Contracted Staff</div>
          <div className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {activeCompany.activeWorkers}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Cleared Fit for Duty (Sampled)</div>
          <div className="font-display text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
            {fitCount} / {companyWorkers.length}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Expiring / Restricted / Hold</div>
          <div className="font-display text-2xl font-bold text-amber-700 mt-1 tabular-nums">
            {attentionCount}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500">Active Site Incidents</div>
          <div className="font-display text-2xl font-bold text-slate-900 mt-1 tabular-nums">
            {openIncidentCount}
          </div>
        </div>
      </div>

      {/* Mode Switch Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('medicals')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'medicals'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 text-cyan-800" />
            Employee Medical Fitness Checks
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('incidents')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'incidents'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            Workplace Incident Reporting ({companyIncidents.length})
          </button>
        </div>

        {activeTab === 'medicals' && (
          <button
            type="button"
            onClick={() => setShowAddWorker((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-cyan-800" />
            Record New Worker Clearance
          </button>
        )}
      </div>

      {/* TAB 1: EMPLOYEE MEDICAL FITNESS DIRECTORY */}
      {activeTab === 'medicals' && (
        <div className="space-y-5">
          {showAddWorker && (
            <form
              onSubmit={handleAddWorker}
              className="bg-white border border-slate-200 rounded-xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-slate-900">
                  Issue New Occupational Fitness Assessment (Syncs to CRM & Billing)
                </h2>
                <button
                  type="button"
                  onClick={() => setShowAddWorker(false)}
                  aria-label="Close new worker form"
                  className="text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Worker Full Name"
                  value={newWorkerName}
                  onChange={(e) => setNewWorkerName(e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                />
                <input
                  type="text"
                  required
                  placeholder="Staff ID (e.g. BRC-0610)"
                  value={newWorkerCode}
                  onChange={(e) => setNewWorkerCode(e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50 font-mono"
                />
                <input
                  type="text"
                  placeholder="Role (e.g. Scaffolder)"
                  value={newWorkerRole}
                  onChange={(e) => setNewWorkerRole(e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                />
                <select
                  value={newWorkerClearance}
                  onChange={(e) => setNewWorkerClearance(e.target.value)}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                >
                  <option>Working at Heights</option>
                  <option>Heavy Machinery & Vision</option>
                  <option>General Construction & Spirometry</option>
                  <option>Welding & Ophthalmic Check</option>
                </select>
                <select
                  value={newWorkerStatus}
                  onChange={(e) => setNewWorkerStatus(e.target.value as FitnessStatus)}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg bg-slate-50"
                >
                  <option value="Fit for Duty">Fit for Duty</option>
                  <option value="Conditional">Conditional</option>
                  <option value="Unfit / Hold">Unfit / Hold</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors"
                >
                  Save Fitness Record & Generate Certificate
                </button>
              </div>
            </form>
          )}

          {/* Filter & Search Bar */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search worker name, ID code, or role..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                {(['All', 'Fit for Duty', 'Conditional', 'Expiring Soon', 'Unfit / Hold'] as const).map(
                  (status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                        statusFilter === status
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {status}
                    </button>
                  )
                )}
              </div>
            </div>

            {filteredWorkers.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <p className="text-sm font-semibold text-slate-800">
                  No worker medical records match this filter
                </p>
                <p className="text-xs text-slate-500">
                  Clear the search filter or add a new occupational assessment above.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                      <th className="py-3 px-4">Worker & ID</th>
                      <th className="py-3 px-4">Role & Site</th>
                      <th className="py-3 px-4">Medical Clearance</th>
                      <th className="py-3 px-4">Valid Until</th>
                      <th className="py-3 px-4">Fitness Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm">
                    {filteredWorkers.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-900">{w.fullName}</div>
                          <div className="text-xs font-mono text-slate-500 tabular-nums">
                            {w.employeeCode} · {w.certificateNo}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-800">{w.role}</div>
                          <div className="text-xs text-slate-500">{w.siteName}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-slate-800">{w.clearanceType}</div>
                          <div className="text-xs text-slate-500 max-w-xs truncate">
                            {w.vitalSummary}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-slate-700 tabular-nums whitespace-nowrap">
                          {w.expiryDate}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 text-xs ${getFitnessStyle(w.status)}`}>
                            {w.status === 'Fit for Duty' ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5" />
                            )}
                            {w.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedCertWorker(w)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors"
                          >
                            <QrCode className="w-3.5 h-3.5" />
                            Verify Cert
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: WORKPLACE INCIDENT REPORTING & LIVE TRACKING */}
      {activeTab === 'incidents' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Log New Incident Form */}
          <form
            onSubmit={handleLogIncident}
            className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
          >
            <div className="space-y-1 pb-3 border-b border-slate-200">
              <div className="text-xs font-mono text-amber-700 font-semibold">
                Step 1 · Company Portal Submission
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Log Workplace Incident Requiring Medical Attention
              </h2>
              <p className="text-xs text-slate-600">
                Submitting here alerts Dunwell Clinic Dispatch immediately for nurse assignment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Injured Worker Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Njoroge"
                  value={incWorkerName}
                  onChange={(e) => setIncWorkerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Worker ID / Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. BRC-0512"
                  value={incWorkerCode}
                  onChange={(e) => setIncWorkerCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono focus-visible:outline-2 focus-visible:outline-cyan-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Incident Type & Location
              </label>
              <input
                type="text"
                required
                value={incType}
                onChange={(e) => setIncType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg mb-2 focus-visible:outline-2 focus-visible:outline-cyan-700"
              />
              <input
                type="text"
                required
                placeholder="Exact site zone / gate"
                value={incSite}
                onChange={(e) => setIncSite(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Triage Severity
              </label>
              <select
                value={incSeverity}
                onChange={(e) => setIncSeverity(e.target.value as IncidentSeverity)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
              >
                <option value="Urgent Trauma">Urgent Trauma (Immediate Dispatch / Ambulance)</option>
                <option value="Moderate Injury">Moderate Injury (Suturing / X-Ray / Clinic Care)</option>
                <option value="First Aid / Assessment">First Aid / Assessment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Condition & First Aid Given on Site
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe visible injury, consciousness, bleeding control, or breathing status..."
                value={incDescription}
                onChange={(e) => setIncDescription(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus-visible:outline-2 focus-visible:outline-cyan-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors"
            >
              Submit Incident to Dunwell Clinic
            </button>

            {lastLoggedRef && (
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3.5 space-y-2">
                <div className="text-xs font-semibold text-cyan-900">
                  Incident {lastLoggedRef} transmitted to Dunwell Triage Queue.
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('clinic-dispatch')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-800 hover:text-cyan-950 underline"
                >
                  Open Dunwell Clinic Dispatch Desk to Accept & Assign Nurse
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </form>

          {/* Right: Live Company Incident Status Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-slate-900">
                Live Incident Tracker ({activeCompany.name})
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('clinic-dispatch')}
                className="text-xs font-semibold text-cyan-800 hover:underline inline-flex items-center gap-1"
              >
                Open Dunwell Dispatch Desk
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {companyIncidents.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                <p className="text-sm font-semibold text-slate-800">
                  No workplace incidents logged for this company yet.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Use the form on the left to test logging an incident for Dunwell acceptance.
                </p>
              </div>
            ) : (
              companyIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
                        <span>{inc.referenceCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{inc.reportedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={
                            inc.severity === 'Urgent Trauma'
                              ? 'text-red-700 font-semibold'
                              : 'text-amber-700 font-semibold'
                          }
                        >
                          {inc.severity}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-slate-900 mt-1">
                        {inc.incidentType} — {inc.workerName}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                        inc.status === 'Pending Acceptance'
                          ? 'text-amber-700'
                          : inc.status === 'Treated & Cleared'
                          ? 'text-emerald-700'
                          : 'text-cyan-800'
                      }`}
                    >
                      {inc.status === 'Pending Acceptance' ? (
                        <Clock className="w-3.5 h-3.5" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5" />
                      )}
                      {inc.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">{inc.description}</p>

                  <div className="text-xs text-slate-500">
                    Site: <span className="text-slate-700 font-medium">{inc.siteLocation}</span> ·
                    Reported by {inc.reportedBy}
                  </div>

                  {inc.assignedNurseName ? (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-slate-900">
                          Accepted by Dunwell ({inc.acceptedAt}) · Assigned: {inc.assignedNurseName}
                        </div>
                        <div className="text-xs text-slate-600">
                          Protocol: {inc.dispatchMode} · ETA {inc.etaMinutes} mins
                        </div>
                        {inc.clinicalNotes && (
                          <div className="text-xs text-slate-500 mt-1">{inc.clinicalNotes}</div>
                        )}
                      </div>
                      <div className="text-xs font-mono text-emerald-700 font-semibold shrink-0">
                        HMS Synced
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-medium text-amber-900">
                        Waiting for Dunwell Triage Desk acceptance & nurse assignment.
                      </span>
                      <button
                        type="button"
                        onClick={() => onNavigate('clinic-dispatch')}
                        className="text-xs font-semibold text-cyan-900 underline"
                      >
                        Accept in Clinic Dispatch →
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Digital QR Medical Fitness Certificate Modal */}
      {selectedCertWorker && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Digital Medical Fitness Certificate"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2025-09-03_at_09.51.25_12f074ba.jpeg"
                  alt="Dunwell Clinic Logo"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <div className="text-xs font-mono text-cyan-800 font-semibold">
                    Dunwell Occupational Health Certificate
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {selectedCertWorker.fullName}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertWorker(null)}
                aria-label="Close certificate modal"
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate-500">Certificate No.</div>
                <div className="font-mono font-semibold text-slate-900 tabular-nums">
                  {selectedCertWorker.certificateNo}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Employee ID</div>
                <div className="font-mono font-semibold text-slate-900 tabular-nums">
                  {selectedCertWorker.employeeCode}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Clearance Scope</div>
                <div className="font-medium text-slate-900">
                  {selectedCertWorker.clearanceType}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Fitness Status</div>
                <div className={getFitnessStyle(selectedCertWorker.status)}>
                  {selectedCertWorker.status}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Exam Date</div>
                <div className="font-mono text-slate-800 tabular-nums">
                  {selectedCertWorker.lastExamDate}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Expiry Date</div>
                <div className="font-mono text-slate-800 tabular-nums">
                  {selectedCertWorker.expiryDate}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4">
              {/* Crisp SVG verification QR graphic */}
              <div className="bg-white border border-slate-200 p-2 rounded-lg shrink-0">
                <svg
                  viewBox="0 0 36 36"
                  className="w-16 h-16 text-slate-900"
                  aria-label="Certificate QR Verification Code"
                >
                  <rect x="2" y="2" width="10" height="10" fill="currentColor" />
                  <rect x="4" y="4" width="6" height="6" fill="white" />
                  <rect x="5" y="5" width="4" height="4" fill="currentColor" />
                  <rect x="24" y="2" width="10" height="10" fill="currentColor" />
                  <rect x="26" y="4" width="6" height="6" fill="white" />
                  <rect x="27" y="5" width="4" height="4" fill="currentColor" />
                  <rect x="2" y="24" width="10" height="10" fill="currentColor" />
                  <rect x="4" y="26" width="6" height="6" fill="white" />
                  <rect x="5" y="27" width="4" height="4" fill="currentColor" />
                  <rect x="15" y="4" width="3" height="3" fill="currentColor" />
                  <rect x="19" y="8" width="3" height="3" fill="currentColor" />
                  <rect x="14" y="14" width="8" height="8" fill="currentColor" />
                  <rect x="4" y="15" width="4" height="4" fill="currentColor" />
                  <rect x="26" y="16" width="6" height="4" fill="currentColor" />
                  <rect x="16" y="26" width="6" height="6" fill="currentColor" />
                  <rect x="25" y="25" width="8" height="8" fill="currentColor" />
                </svg>
              </div>
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <FileBadge2 className="w-4 h-4 text-cyan-800" />
                  Site Gatekeeper Verification Summary
                </div>
                <p className="text-slate-600">{selectedCertWorker.vitalSummary}</p>
                {selectedCertWorker.restrictions && (
                  <p className="text-amber-800 font-medium">{selectedCertWorker.restrictions}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCertWorker(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
