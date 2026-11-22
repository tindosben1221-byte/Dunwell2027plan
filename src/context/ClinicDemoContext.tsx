import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_HMS_FEED,
  INITIAL_INCIDENTS,
  INITIAL_NURSES,
  INITIAL_OUTREACH_SCREENINGS,
  INITIAL_PARTNER_CLINICS,
  INITIAL_PAYSLIPS,
  INITIAL_SICK_NOTES,
  INITIAL_WORKERS,
  INITIAL_YOUTH_BOOKINGS,
  PARTNER_COMPANIES,
} from '../data/initialData';
import {
  ClinicNurse,
  ClinicSector,
  DigitalSickNote,
  DispatchMode,
  FitnessStatus,
  HmsFeedEvent,
  IncidentSeverity,
  IncidentStatus,
  OutreachScreening,
  PartnerClinicSubscription,
  PartnerCompany,
  StaffPayslip,
  SubscriptionTier,
  WorkerMedicalRecord,
  WorkplaceIncident,
  YouthBooking,
} from '../types/dunwell';

interface LogIncidentInput {
  companyId: string;
  workerName: string;
  workerCode: string;
  incidentType: string;
  severity: IncidentSeverity;
  siteLocation: string;
  description: string;
  reportedBy: string;
}

interface AddWorkerInput {
  fullName: string;
  employeeCode: string;
  companyId: string;
  role: string;
  siteName: string;
  clearanceType: string;
  status: FitnessStatus;
  vitalSummary: string;
}

interface AddYouthBookingInput {
  patientAlias: string;
  ageGroup: '15-19' | '20-24' | '25-29';
  channel: 'WhatsApp Bot' | 'Web-Lite Link' | 'Campus QR' | 'Existing App';
  visitType: 'Virtual Tele-Consult' | 'In-Clinic Priority';
  serviceCategory: string;
  scheduledSlot: string;
}

interface CreateSickNoteInput {
  patientName: string;
  employerName: string;
  clinicianName: string;
  daysOff: number;
  internalClinicalNote: string;
  employerSafeSummary: string;
  privacyRedacted: boolean;
  deliveryTarget: 'Patient WhatsApp + Company HR Portal' | 'Patient WhatsApp Only';
}

interface AddOutreachScreeningInput {
  participantName: string;
  ageGroup: '15-19' | '20-24' | '25-29';
  campLocation: string;
  ambassadorCode: string;
  vitalsSummary: string;
  followUpNeeded: boolean;
  offlineMode: boolean;
}

interface AddPartnerClinicInput {
  clinicName: string;
  sector: ClinicSector;
  regionLocation: string;
  tier: SubscriptionTier;
  activeStaffSeats: number;
}

interface ClinicDemoContextValue {
  companies: PartnerCompany[];
  workers: WorkerMedicalRecord[];
  nurses: ClinicNurse[];
  incidents: WorkplaceIncident[];
  youthBookings: YouthBooking[];
  payslips: StaffPayslip[];
  sickNotes: DigitalSickNote[];
  outreachScreenings: OutreachScreening[];
  partnerClinics: PartnerClinicSubscription[];
  hmsFeed: HmsFeedEvent[];
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  logWorkplaceIncident: (input: LogIncidentInput) => WorkplaceIncident;
  acceptAndAssignIncident: (
    incidentId: string,
    nurseId: string,
    dispatchMode: DispatchMode,
    etaMinutes: number,
    clinicalNotes?: string
  ) => void;
  advanceIncidentStatus: (incidentId: string, nextStatus: IncidentStatus) => void;
  addWorkerMedicalRecord: (input: AddWorkerInput) => WorkerMedicalRecord;
  addYouthBooking: (input: AddYouthBookingInput) => YouthBooking;
  advanceYouthBooking: (bookingId: string) => void;
  sendStaffPayslip: (payslipId: string) => void;
  sendAllScheduledPayslips: () => number;
  createSickNote: (input: CreateSickNoteInput) => DigitalSickNote;
  signAndSendSickNote: (noteId: string) => void;
  addOutreachScreening: (input: AddOutreachScreeningInput) => OutreachScreening;
  syncAllOfflineScreenings: () => number;
  triggerRecallCampaign: (campaignName: string, audienceCount: number) => void;
  addPartnerClinic: (input: AddPartnerClinicInput) => PartnerClinicSubscription;
  togglePartnerModule: (
    clinicId: string,
    moduleKey: keyof PartnerClinicSubscription['modules']
  ) => void;
  resetDemoState: () => void;
}

const STORAGE_KEY = 'dunwell_it_demo_state_v4';

const ClinicDemoContext = createContext<ClinicDemoContextValue | undefined>(undefined);

function getNowLabel(): string {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const TIER_PRICE_MAP: Record<SubscriptionTier, number> = {
  Starter: 2500,
  Growth: 5500,
  Professional: 11500,
  'Enterprise / Public': 22000,
};

export const ClinicDemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(PARTNER_COMPANIES[0].id);

  const loadSaved = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed[key] !== undefined) return parsed[key] as T;
      }
    } catch {
      // ignore storage errors
    }
    return fallback;
  };

  const [workers, setWorkers] = useState<WorkerMedicalRecord[]>(() =>
    loadSaved('workers', INITIAL_WORKERS)
  );
  const [nurses, setNurses] = useState<ClinicNurse[]>(() =>
    loadSaved('nurses', INITIAL_NURSES)
  );
  const [incidents, setIncidents] = useState<WorkplaceIncident[]>(() =>
    loadSaved('incidents', INITIAL_INCIDENTS)
  );
  const [youthBookings, setYouthBookings] = useState<YouthBooking[]>(() =>
    loadSaved('youthBookings', INITIAL_YOUTH_BOOKINGS)
  );
  const [payslips, setPayslips] = useState<StaffPayslip[]>(() =>
    loadSaved('payslips', INITIAL_PAYSLIPS)
  );
  const [sickNotes, setSickNotes] = useState<DigitalSickNote[]>(() =>
    loadSaved('sickNotes', INITIAL_SICK_NOTES)
  );
  const [outreachScreenings, setOutreachScreenings] = useState<OutreachScreening[]>(() =>
    loadSaved('outreachScreenings', INITIAL_OUTREACH_SCREENINGS)
  );
  const [partnerClinics, setPartnerClinics] = useState<PartnerClinicSubscription[]>(() =>
    loadSaved('partnerClinics', INITIAL_PARTNER_CLINICS)
  );
  const [hmsFeed, setHmsFeed] = useState<HmsFeedEvent[]>(() =>
    loadSaved('hmsFeed', INITIAL_HMS_FEED)
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          workers,
          nurses,
          incidents,
          youthBookings,
          payslips,
          sickNotes,
          outreachScreenings,
          partnerClinics,
          hmsFeed,
        })
      );
    } catch {
      // ignore storage quota failures
    }
  }, [
    workers,
    nurses,
    incidents,
    youthBookings,
    payslips,
    sickNotes,
    outreachScreenings,
    partnerClinics,
    hmsFeed,
  ]);

  const pushHmsEvent = (
    module: HmsFeedEvent['module'],
    summary: string,
    reference: string
  ) => {
    setHmsFeed((prev) => [
      {
        id: `hms-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: getNowLabel(),
        module,
        summary,
        reference,
      },
      ...prev.slice(0, 18),
    ]);
  };

  const logWorkplaceIncident = (input: LogIncidentInput): WorkplaceIncident => {
    const company =
      PARTNER_COMPANIES.find((c) => c.id === input.companyId) || PARTNER_COMPANIES[0];
    const refNumber = 85 + incidents.length;
    const referenceCode = `INC-2026-0${refNumber}`;
    const newIncident: WorkplaceIncident = {
      id: `inc-${Date.now()}`,
      referenceCode,
      companyId: company.id,
      companyName: company.name,
      siteLocation: input.siteLocation,
      workerName: input.workerName,
      workerCode: input.workerCode || 'CONTRACTOR',
      incidentType: input.incidentType,
      severity: input.severity,
      description: input.description,
      reportedBy: input.reportedBy,
      reportedAt: `${getNowLabel()} Today`,
      status: 'Pending Acceptance',
      hmsSyncStatus: {
        receptionQueued: true,
        nurseChartOpened: false,
        pharmacyKitAllocated: false,
        billingEntryCreated: false,
      },
    };

    setIncidents((prev) => [newIncident, ...prev]);
    pushHmsEvent(
      'Reception',
      `New B2B Incident ${referenceCode} logged by ${company.name} — awaiting Dunwell triage acceptance`,
      referenceCode
    );
    return newIncident;
  };

  const acceptAndAssignIncident = (
    incidentId: string,
    nurseId: string,
    dispatchMode: DispatchMode,
    etaMinutes: number,
    clinicalNotes?: string
  ) => {
    const nurse = nurses.find((n) => n.id === nurseId) || nurses[0];
    const target = incidents.find((i) => i.id === incidentId);
    const timeLabel = getNowLabel();

    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: 'Accepted · Nurse Assigned',
              acceptedAt: timeLabel,
              assignedNurseId: nurse.id,
              assignedNurseName: nurse.name,
              dispatchMode,
              etaMinutes,
              clinicalNotes:
                clinicalNotes ||
                `${dispatchMode} initiated. Trauma & assessment protocol synced to HMS.`,
              hmsSyncStatus: {
                receptionQueued: true,
                nurseChartOpened: true,
                pharmacyKitAllocated: true,
                billingEntryCreated: true,
              },
            }
          : inc
      )
    );

    setNurses((prev) =>
      prev.map((n) =>
        n.id === nurse.id
          ? {
              ...n,
              shiftStatus:
                dispatchMode === 'On-Site Mobile Nurse Dispatch'
                  ? 'On Dispatch'
                  : 'In Clinic Triage',
              assignedCases: n.assignedCases + 1,
            }
          : n
      )
    );

    if (target) {
      pushHmsEvent(
        'Nurse',
        `${target.referenceCode} accepted. ${nurse.name} assigned (${dispatchMode}, ETA ${etaMinutes}m)`,
        target.referenceCode
      );
      pushHmsEvent(
        'Pharmacy',
        `Emergency kit & consumables pre-allocated for ${target.workerName} (${target.referenceCode})`,
        target.referenceCode
      );
      pushHmsEvent(
        'Expense & Billing',
        `Corporate encounter charge opened for ${target.companyName}`,
        target.referenceCode
      );
    }
  };

  const advanceIncidentStatus = (incidentId: string, nextStatus: IncidentStatus) => {
    const target = incidents.find((i) => i.id === incidentId);
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, status: nextStatus } : inc))
    );
    if (target) {
      pushHmsEvent(
        'Nurse',
        `${target.referenceCode} status updated to "${nextStatus}" and synced to Corporate Portal`,
        target.referenceCode
      );
    }
  };

  const addWorkerMedicalRecord = (input: AddWorkerInput): WorkerMedicalRecord => {
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    const certNum = `DW-OH-2026-${Math.floor(9500 + Math.random() * 499)}`;

    const record: WorkerMedicalRecord = {
      id: `wrk-${Date.now()}`,
      employeeCode: input.employeeCode,
      fullName: input.fullName,
      companyId: input.companyId,
      role: input.role,
      siteName: input.siteName,
      clearanceType: input.clearanceType,
      lastExamDate: today.toISOString().slice(0, 10),
      expiryDate: nextYear.toISOString().slice(0, 10),
      status: input.status,
      certificateNo: certNum,
      vitalSummary: input.vitalSummary,
    };

    setWorkers((prev) => [record, ...prev]);
    pushHmsEvent(
      'Expense & Billing',
      `Occupational Fitness Certificate ${certNum} auto-issued for ${input.fullName} & billed to Corporate CRM`,
      certNum
    );
    return record;
  };

  const addYouthBooking = (input: AddYouthBookingInput): YouthBooking => {
    const ref = `DWY-${Math.floor(9100 + Math.random() * 890)}`;
    const booking: YouthBooking = {
      id: `yb-${Date.now()}`,
      bookingRef: ref,
      patientAlias: input.patientAlias,
      ageGroup: input.ageGroup,
      channel: input.channel,
      visitType: input.visitType,
      serviceCategory: input.serviceCategory,
      scheduledSlot: input.scheduledSlot,
      status: 'Synced to Reception',
      createdAt: getNowLabel(),
    };
    setYouthBookings((prev) => [booking, ...prev]);
    pushHmsEvent(
      'Booking App',
      `${input.channel} booking ${ref} (${input.visitType}) synced into HMS Reception queue`,
      ref
    );
    return booking;
  };

  const advanceYouthBooking = (bookingId: string) => {
    setYouthBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const nextStatus =
          b.status === 'Synced to Reception' ? 'Nurse Pre-Screened' : 'Completed';
        pushHmsEvent(
          'Nurse',
          `Youth Priority booking ${b.bookingRef} moved to "${nextStatus}"`,
          b.bookingRef
        );
        return { ...b, status: nextStatus };
      })
    );
  };

  const sendStaffPayslip = (payslipId: string) => {
    const target = payslips.find((p) => p.id === payslipId);
    const timeLabel = `${getNowLabel()} Today`;
    setPayslips((prev) =>
      prev.map((p) =>
        p.id === payslipId
          ? { ...p, status: 'Generated & Auto-Sent', sentAt: timeLabel }
          : p
      )
    );
    if (target) {
      pushHmsEvent(
        'Automation & Safe AI',
        `Payslip ${target.payslipNo} auto-generated & sent to ${target.staffName} via ${target.deliveryChannel}`,
        target.payslipNo
      );
    }
  };

  const sendAllScheduledPayslips = (): number => {
    const scheduled = payslips.filter((p) => p.status === 'Scheduled');
    if (scheduled.length === 0) return 0;
    const timeLabel = `${getNowLabel()} Today`;
    setPayslips((prev) =>
      prev.map((p) =>
        p.status === 'Scheduled'
          ? { ...p, status: 'Generated & Auto-Sent', sentAt: timeLabel }
          : p
      )
    );
    pushHmsEvent(
      'Automation & Safe AI',
      `Batch payroll run completed: ${scheduled.length} staff payslips auto-generated & dispatched`,
      'PAYROLL-BATCH'
    );
    return scheduled.length;
  };

  const createSickNote = (input: CreateSickNoteInput): DigitalSickNote => {
    const today = new Date();
    const resume = new Date(today);
    resume.setDate(today.getDate() + Math.max(1, input.daysOff));
    const code = `DW-SN-2026-${Math.floor(450 + Math.random() * 400)}`;
    const note: DigitalSickNote = {
      id: `sn-${Date.now()}`,
      noteCode: code,
      patientName: input.patientName,
      employerName: input.employerName,
      clinicianName: input.clinicianName,
      daysOff: input.daysOff,
      startDate: today.toISOString().slice(0, 10),
      resumeDate: resume.toISOString().slice(0, 10),
      internalClinicalNote: input.internalClinicalNote,
      employerSafeSummary: input.employerSafeSummary,
      privacyRedacted: input.privacyRedacted,
      deliveryTarget: input.deliveryTarget,
      status: 'Signed & Auto-Sent',
      sentAt: `${getNowLabel()} Today`,
    };
    setSickNotes((prev) => [note, ...prev]);
    pushHmsEvent(
      'Automation & Safe AI',
      `QR Sick Note ${code} signed by ${input.clinicianName} & auto-sent (${input.deliveryTarget})`,
      code
    );
    return note;
  };

  const signAndSendSickNote = (noteId: string) => {
    const target = sickNotes.find((s) => s.id === noteId);
    const timeLabel = `${getNowLabel()} Today`;
    setSickNotes((prev) =>
      prev.map((s) =>
        s.id === noteId
          ? {
              ...s,
              clinicianName:
                s.clinicianName === 'Pending Clinician Sign-Off'
                  ? 'Sr. Thandiwe Nkosi / Dr. M. Patel'
                  : s.clinicianName,
              status: 'Signed & Auto-Sent',
              sentAt: timeLabel,
            }
          : s
      )
    );
    if (target) {
      pushHmsEvent(
        'Automation & Safe AI',
        `Sick Note ${target.noteCode} signed & auto-sent to ${target.deliveryTarget}`,
        target.noteCode
      );
    }
  };

  const addOutreachScreening = (input: AddOutreachScreeningInput): OutreachScreening => {
    const ref = `OUT-CAMP-${Math.floor(320 + Math.random() * 500)}`;
    const entry: OutreachScreening = {
      id: `out-${Date.now()}`,
      screeningRef: ref,
      participantName: input.participantName,
      ageGroup: input.ageGroup,
      campLocation: input.campLocation,
      ambassadorCode: input.ambassadorCode || 'WALKUP-QR',
      vitalsSummary: input.vitalsSummary,
      followUpNeeded: input.followUpNeeded,
      syncStatus: input.offlineMode ? 'Queued Offline' : 'Synced to HMS & Follow-Up Sent',
      recordedAt: `${getNowLabel()} Today`,
    };
    setOutreachScreenings((prev) => [entry, ...prev]);
    if (!input.offlineMode) {
      pushHmsEvent(
        'Outreach Tools',
        `Outreach screening ${ref} (${input.campLocation}) synced to HMS & WhatsApp follow-up link sent`,
        ref
      );
    }
    return entry;
  };

  const syncAllOfflineScreenings = (): number => {
    const queued = outreachScreenings.filter((o) => o.syncStatus === 'Queued Offline');
    if (queued.length === 0) return 0;
    setOutreachScreenings((prev) =>
      prev.map((o) =>
        o.syncStatus === 'Queued Offline'
          ? { ...o, syncStatus: 'Synced to HMS & Follow-Up Sent' }
          : o
      )
    );
    pushHmsEvent(
      'Outreach Tools',
      `Batch synced ${queued.length} offline outreach screening(s) into HMS Reception & WhatsApp follow-up`,
      'OUTREACH-SYNC'
    );
    return queued.length;
  };

  const triggerRecallCampaign = (campaignName: string, audienceCount: number) => {
    pushHmsEvent(
      'Outreach Tools',
      `Automated WhatsApp/SMS campaign "${campaignName}" dispatched to ${audienceCount} youth contacts with 1-tap Web-Lite booking link`,
      'RECALL-CAMPAIGN'
    );
  };

  const addPartnerClinic = (input: AddPartnerClinicInput): PartnerClinicSubscription => {
    const clinic: PartnerClinicSubscription = {
      id: `pc-${Date.now()}`,
      clinicName: input.clinicName,
      sector: input.sector,
      regionLocation: input.regionLocation,
      tier: input.tier,
      monthlyFeeZar: TIER_PRICE_MAP[input.tier],
      activeStaffSeats: input.activeStaffSeats,
      modules: {
        hmsCore: true,
        autoPayslipsSickNotes: input.tier !== 'Starter',
        b2bCorporateCrm: input.tier === 'Professional' || input.tier === 'Enterprise / Public',
        referralExchange: true,
      },
      monthlyReferralsSent: 0,
      status: '60-Day Pilot',
    };
    setPartnerClinics((prev) => [clinic, ...prev]);
    pushHmsEvent(
      'Partner SaaS',
      `New ${input.sector} "${input.clinicName}" provisioned on ${input.tier} subscription (R${clinic.monthlyFeeZar.toLocaleString()}/mo)`,
      'SAAS-ONBOARD'
    );
    return clinic;
  };

  const togglePartnerModule = (
    clinicId: string,
    moduleKey: keyof PartnerClinicSubscription['modules']
  ) => {
    setPartnerClinics((prev) =>
      prev.map((c) => {
        if (c.id !== clinicId) return c;
        const nextModules = { ...c.modules, [moduleKey]: !c.modules[moduleKey] };
        const enabledCount = Object.values(nextModules).filter(Boolean).length;
        const nextFee = 1500 + enabledCount * 2500;
        return {
          ...c,
          modules: nextModules,
          monthlyFeeZar: nextFee,
          status: 'Active Subscription',
        };
      })
    );
  };

  const resetDemoState = () => {
    setWorkers(INITIAL_WORKERS);
    setNurses(INITIAL_NURSES);
    setIncidents(INITIAL_INCIDENTS);
    setYouthBookings(INITIAL_YOUTH_BOOKINGS);
    setPayslips(INITIAL_PAYSLIPS);
    setSickNotes(INITIAL_SICK_NOTES);
    setOutreachScreenings(INITIAL_OUTREACH_SCREENINGS);
    setPartnerClinics(INITIAL_PARTNER_CLINICS);
    setHmsFeed(INITIAL_HMS_FEED);
    setSelectedCompanyId(PARTNER_COMPANIES[0].id);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <ClinicDemoContext.Provider
      value={{
        companies: PARTNER_COMPANIES,
        workers,
        nurses,
        incidents,
        youthBookings,
        payslips,
        sickNotes,
        outreachScreenings,
        partnerClinics,
        hmsFeed,
        selectedCompanyId,
        setSelectedCompanyId,
        logWorkplaceIncident,
        acceptAndAssignIncident,
        advanceIncidentStatus,
        addWorkerMedicalRecord,
        addYouthBooking,
        advanceYouthBooking,
        sendStaffPayslip,
        sendAllScheduledPayslips,
        createSickNote,
        signAndSendSickNote,
        addOutreachScreening,
        syncAllOfflineScreenings,
        triggerRecallCampaign,
        addPartnerClinic,
        togglePartnerModule,
        resetDemoState,
      }}
    >
      {children}
    </ClinicDemoContext.Provider>
  );
};

export function useClinicDemo(): ClinicDemoContextValue {
  const ctx = useContext(ClinicDemoContext);
  if (!ctx) {
    throw new Error('useClinicDemo must be used inside ClinicDemoProvider');
  }
  return ctx;
}
