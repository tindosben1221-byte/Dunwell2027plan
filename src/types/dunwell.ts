export type NavSection =
  | 'plan'
  | 'roadmap'
  | 'automation'
  | 'corporate-crm'
  | 'clinic-dispatch'
  | 'youth-access'
  | 'partners';

export type FitnessStatus = 'Fit for Duty' | 'Conditional' | 'Expiring Soon' | 'Unfit / Hold';

export type IncidentSeverity = 'Urgent Trauma' | 'Moderate Injury' | 'First Aid / Assessment';

export type IncidentStatus =
  | 'Pending Acceptance'
  | 'Accepted · Nurse Assigned'
  | 'En Route / In Triage'
  | 'Treated & Cleared';

export type DispatchMode =
  | 'On-Site Mobile Nurse Dispatch'
  | 'Clinic Ambulance Pickup'
  | 'Priority In-Clinic Fast-Track';

export interface PartnerCompany {
  id: string;
  name: string;
  sector: string;
  siteLocation: string;
  safetyOfficer: string;
  contractTier: string;
  activeWorkers: number;
  contactPhone: string;
}

export interface WorkerMedicalRecord {
  id: string;
  employeeCode: string;
  fullName: string;
  companyId: string;
  role: string;
  siteName: string;
  clearanceType: string;
  lastExamDate: string;
  expiryDate: string;
  status: FitnessStatus;
  certificateNo: string;
  vitalSummary: string;
  restrictions?: string;
}

export interface ClinicNurse {
  id: string;
  name: string;
  specialty: string;
  shiftStatus: 'Available' | 'On Dispatch' | 'In Clinic Triage';
  assignedCases: number;
}

export interface WorkplaceIncident {
  id: string;
  referenceCode: string;
  companyId: string;
  companyName: string;
  siteLocation: string;
  workerName: string;
  workerCode: string;
  incidentType: string;
  severity: IncidentSeverity;
  description: string;
  reportedBy: string;
  reportedAt: string;
  status: IncidentStatus;
  acceptedAt?: string;
  assignedNurseId?: string;
  assignedNurseName?: string;
  dispatchMode?: DispatchMode;
  etaMinutes?: number;
  clinicalNotes?: string;
  hmsSyncStatus: {
    receptionQueued: boolean;
    nurseChartOpened: boolean;
    pharmacyKitAllocated: boolean;
    billingEntryCreated: boolean;
  };
}

export interface YouthBooking {
  id: string;
  bookingRef: string;
  patientAlias: string;
  ageGroup: '15-19' | '20-24' | '25-29';
  channel: 'WhatsApp Bot' | 'Web-Lite Link' | 'Campus QR' | 'Existing App';
  visitType: 'Virtual Tele-Consult' | 'In-Clinic Priority';
  serviceCategory: string;
  scheduledSlot: string;
  status: 'Synced to Reception' | 'Nurse Pre-Screened' | 'Completed';
  createdAt: string;
}

export interface HmsFeedEvent {
  id: string;
  timestamp: string;
  module:
    | 'Reception'
    | 'Nurse'
    | 'Pharmacy'
    | 'Expense & Billing'
    | 'Booking App'
    | 'Automation & Safe AI'
    | 'Outreach Tools'
    | 'Partner SaaS';
  summary: string;
  reference: string;
}

export interface StaffPayslip {
  id: string;
  payslipNo: string;
  staffName: string;
  role: string;
  department: string;
  periodLabel: string;
  baseSalaryZar: number;
  dispatchAllowancesZar: number;
  overtimeShiftsZar: number;
  payeTaxZar: number;
  uifMedicalZar: number;
  netPayZar: number;
  deliveryChannel: 'WhatsApp + Email PDF' | 'Email PDF Only';
  status: 'Scheduled' | 'Generated & Auto-Sent';
  sentAt?: string;
}

export interface DigitalSickNote {
  id: string;
  noteCode: string;
  patientName: string;
  employerName: string;
  clinicianName: string;
  daysOff: number;
  startDate: string;
  resumeDate: string;
  internalClinicalNote: string;
  employerSafeSummary: string;
  privacyRedacted: boolean;
  deliveryTarget: 'Patient WhatsApp + Company HR Portal' | 'Patient WhatsApp Only';
  status: 'Draft Awaiting Sign-Off' | 'Signed & Auto-Sent';
  sentAt?: string;
}

export interface OutreachScreening {
  id: string;
  screeningRef: string;
  participantName: string;
  ageGroup: '15-19' | '20-24' | '25-29';
  campLocation: string;
  ambassadorCode: string;
  vitalsSummary: string;
  followUpNeeded: boolean;
  syncStatus: 'Queued Offline' | 'Synced to HMS & Follow-Up Sent';
  recordedAt: string;
}

export type ClinicSector = 'Public Health Facility' | 'Private Clinic' | 'NGO / Youth Center';

export type SubscriptionTier =
  | 'Starter'
  | 'Growth'
  | 'Professional'
  | 'Enterprise / Public';

export interface PartnerClinicSubscription {
  id: string;
  clinicName: string;
  sector: ClinicSector;
  regionLocation: string;
  tier: SubscriptionTier;
  monthlyFeeZar: number;
  activeStaffSeats: number;
  modules: {
    hmsCore: boolean;
    autoPayslipsSickNotes: boolean;
    b2bCorporateCrm: boolean;
    referralExchange: boolean;
  };
  monthlyReferralsSent: number;
  status: 'Active Subscription' | '60-Day Pilot';
}
