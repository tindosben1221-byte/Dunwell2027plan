import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Pill,
  Receipt,
  RotateCcw,
  ShieldAlert,
  Stethoscope,
  UserCheck,
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/initialData';
import { useClinicDemo } from '../context/ClinicDemoContext';
import { DispatchMode, NavSection, WorkplaceIncident } from '../types/dunwell';
import { ClinicImage } from './ClinicImage';

interface ClinicDispatchDemoProps {
  onNavigate: (section: NavSection) => void;
}

export const ClinicDispatchDemo: React.FC<ClinicDispatchDemoProps> = ({ onNavigate }) => {
  const {
    incidents,
    nurses,
    youthBookings,
    hmsFeed,
    acceptAndAssignIncident,
    advanceIncidentStatus,
    advanceYouthBooking,
    resetDemoState,
  } = useClinicDemo();

  const [assigningId, setAssigningId] = useState<string | null>(null);
  const [selectedNurseId, setSelectedNurseId] = useState<string>(nurses[0].id);
  const [dispatchMode, setDispatchMode] = useState<DispatchMode>('On-Site Mobile Nurse Dispatch');
  const [etaMinutes, setEtaMinutes] = useState<number>(15);
  const [clinicalNotes, setClinicalNotes] = useState<string>('');

  const pendingIncidents = incidents.filter((i) => i.status === 'Pending Acceptance');
  const activeIncidents = incidents.filter((i) => i.status !== 'Pending Acceptance');

  const openAssignmentModal = (inc: WorkplaceIncident) => {
    setAssigningId(inc.id);
    const available = nurses.find((n) => n.shiftStatus === 'Available') || nurses[0];
    setSelectedNurseId(available.id);
    setDispatchMode(
      inc.severity === 'Urgent Trauma'
        ? 'Clinic Ambulance Pickup'
        : 'On-Site Mobile Nurse Dispatch'
    );
    setEtaMinutes(inc.severity === 'Urgent Trauma' ? 12 : 18);
    setClinicalNotes('');
  };

  const handleConfirmAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningId) return;
    acceptAndAssignIncident(
      assigningId,
      selectedNurseId,
      dispatchMode,
      etaMinutes,
      clinicalNotes.trim() || undefined
    );
    setAssigningId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Dunwell Clinic HMS Console</span>
              <span aria-hidden="true">·</span>
              <span>Incident Triage & Nurse Assignment</span>
              <span aria-hidden="true">·</span>
              <span>Synced with Reception, Nurse, Pharmacy & Expense Billing</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Clinic Incident Dispatch & HMS Queue
            </h1>
            <p className="text-sm text-slate-600">
              Accept incoming corporate workplace incidents, assign an available Dunwell nurse, and
              verify automatic HMS module synchronization.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={resetDemoState}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>

            <button
              type="button"
              onClick={() => onNavigate('corporate-crm')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
            >
              Back to Corporate Portal
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 relative min-h-[180px]">
          <ClinicImage
            src={CLINIC_IMAGES.clinicHero}
            alt="Dunwell Clinic Reception and digital triage lounge"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left & Center: Incident Acceptance + Nurse Roster + Youth Queue */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pending Acceptance Queue */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h2 className="font-display text-base font-bold text-slate-900">
                  Incoming Corporate Incidents Pending Acceptance ({pendingIncidents.length})
                </h2>
              </div>
              <span className="text-xs text-slate-500">Step 2 · Dunwell Acceptance</span>
            </div>

            {pendingIncidents.length === 0 ? (
              <div className="py-6 text-center space-y-2">
                <p className="text-sm font-medium text-slate-800">
                  All reported corporate incidents have been accepted and assigned.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('corporate-crm')}
                  className="text-xs font-semibold text-cyan-800 underline"
                >
                  Log another sample incident in the Corporate CRM Portal →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingIncidents.map((inc) => (
                  <div
                    key={inc.id}
                    className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-600">
                          <span>{inc.referenceCode}</span>
                          <span aria-hidden="true">·</span>
                          <span>{inc.companyName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-semibold">{inc.severity}</span>
                        </div>
                        <h3 className="font-display text-base font-bold text-slate-900 mt-1">
                          {inc.incidentType} — {inc.workerName} ({inc.workerCode})
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => openAssignmentModal(inc)}
                        className="px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        Accept & Assign Nurse
                      </button>
                    </div>

                    <p className="text-sm text-slate-700">{inc.description}</p>
                    <div className="text-xs text-slate-500">
                      Site: {inc.siteLocation} · Logged by {inc.reportedBy} at {inc.reportedAt}
                    </div>

                    {/* Inline Nurse Assignment Panel when clicked */}
                    {assigningId === inc.id && (
                      <form
                        onSubmit={handleConfirmAssignment}
                        className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 mt-2"
                      >
                        <div className="text-xs font-semibold text-slate-900">
                          Assign Dunwell Nurse & Dispatch Protocol for {inc.referenceCode}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              Assign Nurse
                            </label>
                            <select
                              value={selectedNurseId}
                              onChange={(e) => setSelectedNurseId(e.target.value)}
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                            >
                              {nurses.map((n) => (
                                <option key={n.id} value={n.id}>
                                  {n.name} ({n.shiftStatus})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              Response Mode
                            </label>
                            <select
                              value={dispatchMode}
                              onChange={(e) => setDispatchMode(e.target.value as DispatchMode)}
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                            >
                              <option value="On-Site Mobile Nurse Dispatch">
                                On-Site Mobile Nurse Dispatch
                              </option>
                              <option value="Clinic Ambulance Pickup">
                                Clinic Ambulance Pickup
                              </option>
                              <option value="Priority In-Clinic Fast-Track">
                                Priority In-Clinic Fast-Track
                              </option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs text-slate-600 mb-1">
                              Estimated ETA (mins)
                            </label>
                            <input
                              type="number"
                              min={5}
                              max={90}
                              value={etaMinutes}
                              onChange={(e) => setEtaMinutes(Number(e.target.value))}
                              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono tabular-nums"
                            />
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Clinical triage & pharmacy kit note (optional)"
                          value={clinicalNotes}
                          onChange={(e) => setClinicalNotes(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-slate-50"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setAssigningId(null)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg"
                          >
                            Confirm Acceptance & Sync to HMS
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Active & Assigned Incidents */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-800" />
                <h2 className="font-display text-base font-bold text-slate-900">
                  Accepted Incidents & Nurse Assignments ({activeIncidents.length})
                </h2>
              </div>
              <span className="text-xs text-slate-500">Live HMS Sync</span>
            </div>

            <div className="space-y-3">
              {activeIncidents.map((inc) => (
                <div
                  key={inc.id}
                  className="border border-slate-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                        <span>{inc.referenceCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{inc.companyName}</span>
                        <span aria-hidden="true">·</span>
                        <span>Accepted {inc.acceptedAt}</span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-slate-900 mt-1">
                        {inc.workerName} — {inc.incidentType}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold ${
                          inc.status === 'Treated & Cleared'
                            ? 'text-emerald-700'
                            : 'text-cyan-800'
                        }`}
                      >
                        {inc.status}
                      </span>

                      {inc.status === 'Accepted · Nurse Assigned' && (
                        <button
                          type="button"
                          onClick={() => advanceIncidentStatus(inc.id, 'En Route / In Triage')}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md"
                        >
                          Mark In Triage
                        </button>
                      )}
                      {inc.status === 'En Route / In Triage' && (
                        <button
                          type="button"
                          onClick={() => advanceIncidentStatus(inc.id, 'Treated & Cleared')}
                          className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md"
                        >
                          Complete & Clear
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-slate-700">
                    Assigned: <span className="font-semibold">{inc.assignedNurseName}</span> ·{' '}
                    {inc.dispatchMode} (ETA {inc.etaMinutes}m)
                  </div>

                  {/* HMS Integration Confirmation Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Reception Queued</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Nurse Chart Open</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Pill className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Pharmacy Kit Ready</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Receipt className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Billing Logged</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Youth Funnel Bookings Synced into Reception */}
          <section className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900">
                Youth Virtual & In-Clinic Bookings Synced to HMS Reception ({youthBookings.length})
              </h2>
              <button
                type="button"
                onClick={() => onNavigate('youth-access')}
                className="text-xs font-semibold text-cyan-800 hover:underline"
              >
                Open Youth Funnel Demo →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                    <th className="py-2.5 pr-4">Ref / Patient</th>
                    <th className="py-2.5 pr-4">Channel</th>
                    <th className="py-2.5 pr-4">Service & Slot</th>
                    <th className="py-2.5 text-right">HMS Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {youthBookings.map((yb) => (
                    <tr key={yb.id}>
                      <td className="py-3 pr-4">
                        <div className="font-semibold text-slate-900">{yb.patientAlias}</div>
                        <div className="text-xs font-mono text-slate-500">
                          {yb.bookingRef} · Age {yb.ageGroup}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-700">
                        <div>{yb.channel}</div>
                        <div className="text-slate-500">{yb.visitType}</div>
                      </td>
                      <td className="py-3 pr-4 text-xs text-slate-700">
                        <div>{yb.serviceCategory}</div>
                        <div className="text-slate-500">{yb.scheduledSlot}</div>
                      </td>
                      <td className="py-3 text-right">
                        {yb.status !== 'Completed' ? (
                          <button
                            type="button"
                            onClick={() => advanceYouthBooking(yb.id)}
                            className="px-2.5 py-1 text-xs font-semibold text-cyan-800 bg-cyan-50 hover:bg-cyan-100 rounded-md whitespace-nowrap"
                          >
                            {yb.status} → Advance
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-emerald-700">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Sidebar: Nurse Shift Roster & Live HMS Cross-Module Feed */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <h2 className="font-display text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Dunwell Nursing Roster
            </h2>
            <div className="divide-y divide-slate-100">
              {nurses.map((n) => (
                <div key={n.id} className="py-3 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{n.name}</div>
                    <div className="text-xs text-slate-500">{n.specialty}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className={`text-xs font-semibold ${
                        n.shiftStatus === 'Available' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {n.shiftStatus}
                    </div>
                    <div className="text-xs text-slate-400 font-mono tabular-nums">
                      {n.assignedCases} active
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <h2 className="font-display text-base font-bold text-slate-900">
                HMS Cross-Module Sync Log
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Live updates written to Reception, Nurse, Pharmacy & Expense Billing.
              </p>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {hmsFeed.map((ev) => (
                <div key={ev.id} className="text-xs space-y-0.5 pb-3 border-b border-slate-100 last:border-0">
                  <div className="flex items-center justify-between text-slate-500 font-mono">
                    <span className="font-semibold text-cyan-800">{ev.module}</span>
                    <span>{ev.timestamp}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{ev.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
