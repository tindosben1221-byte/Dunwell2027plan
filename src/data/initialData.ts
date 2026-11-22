import {
  ClinicNurse,
  DigitalSickNote,
  HmsFeedEvent,
  OutreachScreening,
  PartnerClinicSubscription,
  PartnerCompany,
  StaffPayslip,
  WorkerMedicalRecord,
  WorkplaceIncident,
  YouthBooking,
} from '../types/dunwell';

export const CLINIC_IMAGES = {
  clinicHero: '/src/assets/images/dunwell_clinic_modern_1795120414403.jpg',
  constructionMedical: '/src/assets/images/construction_occupational_health_1795120414806.jpg',
  youthOutreach: '/src/assets/images/youth_outreach_camp_1795120415604.jpg',
  partnerNetwork: '/src/assets/images/partner_clinic_network_1795120415612.jpg',
  youthTelehealth: '/src/assets/images/youth_telehealth_session_1795120983729.jpg',
  pharmacySmart: '/src/assets/images/pharmacy_smart_dispensing_1795120983208.jpg',
};

export const STRATEGY_PDF_PATH =
  '/assets/aistudio/Dunwell_IT_Systems_and_Digital_Growth_Strategy_2027-2029_fe2a8cb9.pdf';

export const PARTNER_COMPANIES: PartnerCompany[] = [
  {
    id: 'comp-buildright',
    name: 'BuildRight Civil & Construction (Pty) Ltd',
    sector: 'Commercial Construction',
    siteLocation: 'Sandton Ext 4 Site · Johannesburg',
    safetyOfficer: 'Thabo Mokoena (HSE Lead)',
    contractTier: 'Annual Occupational Health Agreement',
    activeWorkers: 148,
    contactPhone: '+27 11 440 8912',
  },
  {
    id: 'comp-metrosteel',
    name: 'Metro Steel & Rigging Works',
    sector: 'Structural Fabrication',
    siteLocation: 'Germiston Industrial Yard C',
    safetyOfficer: 'Nomsa Dlamini',
    contractTier: 'Periodic Medical & Incident Cover',
    activeWorkers: 92,
    contactPhone: '+27 11 908 3145',
  },
  {
    id: 'comp-riftlogistics',
    name: 'Gauteng Haulage & Fleet Logistics',
    sector: 'Heavy Transport & Warehousing',
    siteLocation: 'Midrand Freight Hub 12',
    safetyOfficer: 'Pieter van der Merwe',
    contractTier: 'PrDP Driver & Site Retainer',
    activeWorkers: 115,
    contactPhone: '+27 11 517 2090',
  },
];

export const INITIAL_WORKERS: WorkerMedicalRecord[] = [
  {
    id: 'wrk-101',
    employeeCode: 'BRC-0412',
    fullName: 'Sipho Ndlovu',
    companyId: 'comp-buildright',
    role: 'Tower Crane Operator',
    siteName: 'Sandton Ext 4',
    clearanceType: 'Working at Heights & Vision',
    lastExamDate: '2026-08-14',
    expiryDate: '2027-08-14',
    status: 'Fit for Duty',
    certificateNo: 'DW-OH-2026-8841',
    vitalSummary: 'BP 118/76 · Vision 6/6 · Audiometry Normal · Vertigo Screen Clear',
  },
  {
    id: 'wrk-102',
    employeeCode: 'BRC-0489',
    fullName: 'Kagiso Molefe',
    companyId: 'comp-buildright',
    role: 'Scaffolding Rigger',
    siteName: 'Sandton Ext 4',
    clearanceType: 'Working at Heights',
    lastExamDate: '2025-12-02',
    expiryDate: '2026-12-02',
    status: 'Expiring Soon',
    certificateNo: 'DW-OH-2025-7104',
    vitalSummary: 'BP 124/80 · Musculoskeletal Clear · Renewal Due in 13 Days',
  },
  {
    id: 'wrk-103',
    employeeCode: 'BRC-0504',
    fullName: 'Lerato Khumalo',
    companyId: 'comp-buildright',
    role: 'Site Concrete Mason',
    siteName: 'Rosebank Annex Site',
    clearanceType: 'General Construction & Spirometry',
    lastExamDate: '2026-09-21',
    expiryDate: '2027-09-21',
    status: 'Conditional',
    certificateNo: 'DW-OH-2026-9012',
    vitalSummary: 'Mild dust sensitivity · Mandatory FFP2/N95 respirator required',
    restrictions: 'Cleared for ground-level masonry only with FFP2 particulate mask.',
  },
  {
    id: 'wrk-104',
    employeeCode: 'BRC-0538',
    fullName: 'Bongani Zulu',
    companyId: 'comp-buildright',
    role: 'Excavator Operator',
    siteName: 'Sandton Ext 4',
    clearanceType: 'Heavy Machinery & Drug Screen',
    lastExamDate: '2026-11-10',
    expiryDate: '2027-11-10',
    status: 'Unfit / Hold',
    certificateNo: 'DW-OH-2026-9450',
    vitalSummary: 'Elevated BP 162/98 · Pending 7-day follow-up review by Dunwell Clinician',
    restrictions: 'Temporarily suspended from heavy plant operation pending BP stabilization.',
  },
  {
    id: 'wrk-201',
    employeeCode: 'MSW-0118',
    fullName: 'Tshepo Mahlangu',
    companyId: 'comp-metrosteel',
    role: 'Arc Welder',
    siteName: 'Germiston Bay 2',
    clearanceType: 'Welding Fume & Ophthalmic Check',
    lastExamDate: '2026-07-08',
    expiryDate: '2027-07-08',
    status: 'Fit for Duty',
    certificateNo: 'DW-OH-2026-8309',
    vitalSummary: 'Spirometry FEV1 96% · Retinal Exam Clear · Heavy Metals Negative',
  },
  {
    id: 'wrk-202',
    employeeCode: 'MSW-0144',
    fullName: 'Zanele Mbatha',
    companyId: 'comp-metrosteel',
    role: 'Overhead Gantry Technician',
    siteName: 'Germiston Bay 1',
    clearanceType: 'Working at Heights & Hearing',
    lastExamDate: '2025-11-28',
    expiryDate: '2026-11-28',
    status: 'Expiring Soon',
    certificateNo: 'DW-OH-2025-6988',
    vitalSummary: 'BP 114/72 · Audiometry Normal · Annual Renewal Scheduled',
  },
  {
    id: 'wrk-301',
    employeeCode: 'GHL-0882',
    fullName: 'Johan Pretorius',
    companyId: 'comp-riftlogistics',
    role: 'Long-Haul Prime Mover Driver',
    siteName: 'Midrand Freight Hub 12',
    clearanceType: 'PrDP / Heavy Commercial Driver Medical',
    lastExamDate: '2026-10-03',
    expiryDate: '2027-10-03',
    status: 'Fit for Duty',
    certificateNo: 'DW-OH-2026-9187',
    vitalSummary: 'Vision 6/6 · Glucose Fasting 4.9 mmol/L · Sleep Apnea Risk Low',
  },
];

export const INITIAL_NURSES: ClinicNurse[] = [
  {
    id: 'nurse-thandi',
    name: 'Sr. Thandiwe Nkosi',
    specialty: 'Trauma & Occupational Health',
    shiftStatus: 'Available',
    assignedCases: 1,
  },
  {
    id: 'nurse-david',
    name: 'Sr. David Botha',
    specialty: 'Emergency Triage & Mobile Dispatch',
    shiftStatus: 'Available',
    assignedCases: 0,
  },
  {
    id: 'nurse-amina',
    name: 'Sr. Ayanda Mthembu',
    specialty: 'Youth Priority & Tele-Triage',
    shiftStatus: 'In Clinic Triage',
    assignedCases: 2,
  },
  {
    id: 'nurse-samuel',
    name: 'Sr. Kabelo Sithole',
    specialty: 'Industrial Spirometry & Wound Care',
    shiftStatus: 'Available',
    assignedCases: 0,
  },
];

export const INITIAL_INCIDENTS: WorkplaceIncident[] = [
  {
    id: 'inc-1001',
    referenceCode: 'INC-2026-084',
    companyId: 'comp-buildright',
    companyName: 'BuildRight Civil & Construction (Pty) Ltd',
    siteLocation: 'Sandton Ext 4 — Pier 7',
    workerName: 'Kagiso Molefe',
    workerCode: 'BRC-0489',
    incidentType: 'Minor Hand Laceration (Rebar Handling)',
    severity: 'Moderate Injury',
    description:
      'Worker sustained a 4cm clean laceration on right palm while securing rebar mesh. Bleeding controlled with site first-aid dressing; requires tetanus toxoid and sterile suturing assessment.',
    reportedBy: 'Thabo Mokoena (HSE Lead)',
    reportedAt: '10:42 AM Today',
    status: 'Pending Acceptance',
    hmsSyncStatus: {
      receptionQueued: true,
      nurseChartOpened: false,
      pharmacyKitAllocated: false,
      billingEntryCreated: false,
    },
  },
  {
    id: 'inc-1002',
    referenceCode: 'INC-2026-083',
    companyId: 'comp-metrosteel',
    companyName: 'Metro Steel & Rigging Works',
    siteLocation: 'Germiston Industrial Yard C — Bay 2',
    workerName: 'Tshepo Mahlangu',
    workerCode: 'MSW-0118',
    incidentType: 'Arc Flash Eye Irritation',
    severity: 'First Aid / Assessment',
    description:
      'Brief UV arc exposure during adjacent welding inspection. Experiencing mild photophobia and tearing.',
    reportedBy: 'Nomsa Dlamini',
    reportedAt: '09:15 AM Today',
    status: 'Accepted · Nurse Assigned',
    acceptedAt: '09:19 AM',
    assignedNurseId: 'nurse-thandi',
    assignedNurseName: 'Sr. Thandiwe Nkosi',
    dispatchMode: 'Priority In-Clinic Fast-Track',
    etaMinutes: 12,
    clinicalNotes: 'Fast-tracked to Triage Bay 1. Ophthalmic irrigation & fluorescein check prepped.',
    hmsSyncStatus: {
      receptionQueued: true,
      nurseChartOpened: true,
      pharmacyKitAllocated: true,
      billingEntryCreated: true,
    },
  },
];

export const INITIAL_YOUTH_BOOKINGS: YouthBooking[] = [
  {
    id: 'yb-501',
    bookingRef: 'DWY-9041',
    patientAlias: 'Naledi M. (UJ Campus Verified)',
    ageGroup: '20-24',
    channel: 'WhatsApp Bot',
    visitType: 'Virtual Tele-Consult',
    serviceCategory: 'Confidential Youth Counseling & Wellness',
    scheduledSlot: 'Today, 2:30 PM',
    status: 'Synced to Reception',
    createdAt: '11:05 AM',
  },
  {
    id: 'yb-502',
    bookingRef: 'DWY-9042',
    patientAlias: 'Karabo T.',
    ageGroup: '15-19',
    channel: 'Campus QR',
    visitType: 'In-Clinic Priority',
    serviceCategory: 'Sports Injury & Rapid Physiotherapy Screen',
    scheduledSlot: 'Today, 3:15 PM',
    status: 'Nurse Pre-Screened',
    createdAt: '10:20 AM',
  },
];

export const INITIAL_PAYSLIPS: StaffPayslip[] = [
  {
    id: 'pay-1',
    payslipNo: 'DW-PAY-2026-11-01',
    staffName: 'Sr. Thandiwe Nkosi',
    role: 'Senior Occupational & Trauma Nurse',
    department: 'Nursing & Corporate Dispatch',
    periodLabel: 'November 2026',
    baseSalaryZar: 28500,
    dispatchAllowancesZar: 3200,
    overtimeShiftsZar: 1850,
    payeTaxZar: 4920,
    uifMedicalZar: 1450,
    netPayZar: 27180,
    deliveryChannel: 'WhatsApp + Email PDF',
    status: 'Generated & Auto-Sent',
    sentAt: '11:00 AM Today',
  },
  {
    id: 'pay-2',
    payslipNo: 'DW-PAY-2026-11-02',
    staffName: 'Sr. David Botha',
    role: 'Emergency Triage & Mobile Nurse',
    department: 'Nursing & Corporate Dispatch',
    periodLabel: 'November 2026',
    baseSalaryZar: 26000,
    dispatchAllowancesZar: 2400,
    overtimeShiftsZar: 1400,
    payeTaxZar: 4180,
    uifMedicalZar: 1320,
    netPayZar: 24300,
    deliveryChannel: 'WhatsApp + Email PDF',
    status: 'Scheduled',
  },
  {
    id: 'pay-3',
    payslipNo: 'DW-PAY-2026-11-03',
    staffName: 'Precious Molebatsi',
    role: 'Clinical Pharmacist',
    department: 'HMS Pharmacy',
    periodLabel: 'November 2026',
    baseSalaryZar: 34000,
    dispatchAllowancesZar: 1200,
    overtimeShiftsZar: 1100,
    payeTaxZar: 5900,
    uifMedicalZar: 1650,
    netPayZar: 28750,
    deliveryChannel: 'WhatsApp + Email PDF',
    status: 'Scheduled',
  },
  {
    id: 'pay-4',
    payslipNo: 'DW-PAY-2026-11-04',
    staffName: 'Lindiwe Sibanda',
    role: 'Reception & Triage Coordinator',
    department: 'HMS Reception',
    periodLabel: 'November 2026',
    baseSalaryZar: 16500,
    dispatchAllowancesZar: 900,
    overtimeShiftsZar: 750,
    payeTaxZar: 1890,
    uifMedicalZar: 920,
    netPayZar: 15340,
    deliveryChannel: 'Email PDF Only',
    status: 'Scheduled',
  },
];

export const INITIAL_SICK_NOTES: DigitalSickNote[] = [
  {
    id: 'sn-101',
    noteCode: 'DW-SN-2026-441',
    patientName: 'Tshepo Mahlangu (MSW-0118)',
    employerName: 'Metro Steel & Rigging Works',
    clinicianName: 'Sr. Thandiwe Nkosi / Dr. M. Patel',
    daysOff: 2,
    startDate: '2026-11-19',
    resumeDate: '2026-11-21',
    internalClinicalNote:
      'Mild photokeratitis from UV arc exposure. Prescribed lubricating eye drops & dark protective eyewear for 48 hours.',
    employerSafeSummary:
      'Employee assessed at Dunwell Clinic. Temporarily unfit for welding/glare tasks; cleared for full duty on 2026-11-21 (POPIA diagnostic privacy maintained).',
    privacyRedacted: true,
    deliveryTarget: 'Patient WhatsApp + Company HR Portal',
    status: 'Signed & Auto-Sent',
    sentAt: '09:45 AM Today',
  },
  {
    id: 'sn-102',
    noteCode: 'DW-SN-2026-442',
    patientName: 'Kagiso Molefe (BRC-0489)',
    employerName: 'BuildRight Civil & Construction (Pty) Ltd',
    clinicianName: 'Pending Clinician Sign-Off',
    daysOff: 3,
    startDate: '2026-11-19',
    resumeDate: '2026-11-22',
    internalClinicalNote:
      '4cm right palm laceration from rebar; 4 nylon sutures + tetanus booster + oral analgesia. Keep dry 72 hours.',
    employerSafeSummary:
      'Assessed at Dunwell Clinic for workplace injury. Recommended 3 days off heavy rigging/manual grip work; review scheduled 2026-11-22.',
    privacyRedacted: true,
    deliveryTarget: 'Patient WhatsApp + Company HR Portal',
    status: 'Draft Awaiting Sign-Off',
  },
];

export const INITIAL_OUTREACH_SCREENINGS: OutreachScreening[] = [
  {
    id: 'out-1',
    screeningRef: 'OUT-CAMP-311',
    participantName: 'Refilwe Mokoena',
    ageGroup: '20-24',
    campLocation: 'University of Johannesburg Doornfontein Quad',
    ambassadorCode: 'AMB-UJ-04',
    vitalsSummary: 'BP 112/72 · BMI 21.8 · Requested Virtual Counseling Follow-up',
    followUpNeeded: true,
    syncStatus: 'Synced to HMS & Follow-Up Sent',
    recordedAt: '10:12 AM Today',
  },
  {
    id: 'out-2',
    screeningRef: 'OUT-CAMP-312',
    participantName: 'Sibusiso Gumede',
    ageGroup: '15-19',
    campLocation: 'Soweto Youth Football Cup',
    ambassadorCode: 'AMB-SPORT-09',
    vitalsSummary: 'Right knee strain assessment · Cleared for light warm-up + physio booking',
    followUpNeeded: true,
    syncStatus: 'Queued Offline',
    recordedAt: '11:24 AM Today',
  },
];

export const INITIAL_PARTNER_CLINICS: PartnerClinicSubscription[] = [
  {
    id: 'pc-1',
    clinicName: 'Soweto Youth & Family Medical',
    sector: 'Private Clinic',
    regionLocation: 'Johannesburg · Soweto',
    tier: 'Growth',
    monthlyFeeZar: 5500,
    activeStaffSeats: 14,
    modules: {
      hmsCore: true,
      autoPayslipsSickNotes: true,
      b2bCorporateCrm: false,
      referralExchange: true,
    },
    monthlyReferralsSent: 26,
    status: 'Active Subscription',
  },
  {
    id: 'pc-2',
    clinicName: 'Alexandra Sub-District Health Annex',
    sector: 'Public Health Facility',
    regionLocation: 'Johannesburg · Region E',
    tier: 'Starter',
    monthlyFeeZar: 2500,
    activeStaffSeats: 22,
    modules: {
      hmsCore: true,
      autoPayslipsSickNotes: false,
      b2bCorporateCrm: false,
      referralExchange: true,
    },
    monthlyReferralsSent: 41,
    status: '60-Day Pilot',
  },
  {
    id: 'pc-3',
    clinicName: 'Germiston Industrial Wellness Hub',
    sector: 'Private Clinic',
    regionLocation: 'Ekurhuleni · Germiston',
    tier: 'Professional',
    monthlyFeeZar: 11500,
    activeStaffSeats: 18,
    modules: {
      hmsCore: true,
      autoPayslipsSickNotes: true,
      b2bCorporateCrm: true,
      referralExchange: true,
    },
    monthlyReferralsSent: 19,
    status: 'Active Subscription',
  },
];

export const INITIAL_HMS_FEED: HmsFeedEvent[] = [
  {
    id: 'hms-1',
    timestamp: '11:05 AM',
    module: 'Booking App',
    summary: 'WhatsApp Web-Lite booking DWY-9041 pushed directly to HMS Reception Queue',
    reference: 'DWY-9041',
  },
  {
    id: 'hms-2',
    timestamp: '11:00 AM',
    module: 'Automation & Safe AI',
    summary: 'Payslip DW-PAY-2026-11-01 auto-generated from HMS shift logs & sent to Sr. Thandiwe',
    reference: 'DW-PAY-2026-11-01',
  },
  {
    id: 'hms-3',
    timestamp: '10:42 AM',
    module: 'Reception',
    summary: 'Incoming B2B incident INC-2026-084 flagged from BuildRight Construction Portal',
    reference: 'INC-2026-084',
  },
  {
    id: 'hms-4',
    timestamp: '10:15 AM',
    module: 'Outreach Tools',
    summary: 'Campus screening OUT-CAMP-311 synced to HMS & WhatsApp booking link dispatched',
    reference: 'OUT-CAMP-311',
  },
  {
    id: 'hms-5',
    timestamp: '09:45 AM',
    module: 'Automation & Safe AI',
    summary: 'POPIA-redacted Sick Note DW-SN-2026-441 signed & auto-sent to Tshepo + Metro Steel HR',
    reference: 'DW-SN-2026-441',
  },
  {
    id: 'hms-6',
    timestamp: '09:20 AM',
    module: 'Partner SaaS',
    summary: 'Alexandra Health Annex referred 2 specialized lab panels to Dunwell Diagnostics',
    reference: 'REF-PUB-2026',
  },
];

export const SEVEN_OUTCOMES = [
  {
    outcome: '1. New revenue',
    meaning: 'Corporate medical assessments, wellness contracts and SaaS clinic subscriptions.',
  },
  {
    outcome: '2. More patients',
    meaning: 'Digital outreach, university youth partnerships, referrals and frictionless booking.',
  },
  {
    outcome: '3. Patient retention',
    meaning: 'Patient CRM, automated reminders, feedback surveys and follow-up journeys.',
  },
  {
    outcome: '4. Better operations',
    meaning: 'Auto-payslips, QR sick notes, shared records, workflow controls and less paperwork.',
  },
  {
    outcome: '5. Better decisions',
    meaning: 'Executive BI dashboard with financial visibility, medical aid claims and conversion KPIs.',
  },
  {
    outcome: '6. Partner ecosystem',
    meaning: 'Public & private clinics, employers, universities, laboratories and referral partners.',
  },
  {
    outcome: '7. Trust & resilience',
    meaning: 'POPIA compliance, tenant isolation, MFA, audit logs and clinical sign-off governance.',
  },
];

export const INTERNAL_SYSTEM_MODULES = [
  {
    system: 'HR & Employee Portal',
    keyFunction: 'Leave, shift rosters, attendance, auto-generated payslips & staff records',
    businessValue: 'Less admin overhead; clearer clinical staffing & payroll accuracy',
  },
  {
    system: 'IT Helpdesk & Asset Register',
    keyFunction: 'Support tickets, device inventory, warranty & equipment assignment',
    businessValue: 'Faster support turnaround; full clinic hardware accountability',
  },
  {
    system: 'Procurement & Supplier Control',
    keyFunction: 'Requisitions, quotations, purchase orders & supplier scorecards',
    businessValue: 'Tighter spending control tied into existing Expense Reporting',
  },
  {
    system: 'Maintenance Management',
    keyFunction: 'Facility and medical equipment calibration & repair requests',
    businessValue: 'Zero unexpected diagnostic downtime; traceable maintenance logs',
  },
  {
    system: 'Document Management',
    keyFunction: 'Policies, corporate SLAs, consent forms, version control & approvals',
    businessValue: 'Audit-ready POPIA & corporate compliance retrieval',
  },
  {
    system: 'Incident Management',
    keyFunction: 'IT, operational, and workplace clinical incident logging & nurse escalation',
    businessValue: 'Full risk visibility and closed-loop follow-through',
  },
  {
    system: 'Stock Forecasting',
    keyFunction: 'Usage trends, reorder levels, and expiry monitoring for Pharmacy',
    businessValue: 'Fewer stockouts before large corporate medical batches',
  },
  {
    system: 'Laboratory & Diagnostic Links',
    keyFunction: 'Digital test requests, result receipt, red-flag alerts & partner tracking',
    businessValue: 'Connected patient journey across Dunwell and partner clinics',
  },
  {
    system: 'Executive BI Dashboard',
    keyFunction: 'Daily bookings, revenue, expenses, medical aid claims & outreach conversion',
    businessValue: 'Real-time management visibility across all 4 growth engines',
  },
];

export const ROADMAP_24_MONTH = [
  {
    phase: '0–3 Months · Optimise',
    title: 'App Adoption, CRM Pilot, Executive Dashboard & IT Helpdesk',
    deliverables: [
      'Measure current app drop-off & launch WhatsApp/QR Web-Lite booking funnel',
      'Deploy Executive BI Dashboard + IT Helpdesk & Asset Register',
      'Interview 5–10 corporate clients & 5 private clinics using synthetic demo tenant',
    ],
    exitCriteria: 'Baseline metrics captured; staff trained; first digital adoption report',
  },
  {
    phase: '3–6 Months · Monetise',
    title: 'Corporate Medical Portal MVP & Private-Clinic SaaS Pilot',
    deliverables: [
      'Launch B2B Construction Medicals & Incident Nurse Dispatch Portal',
      'Roll out Auto-Payslips & POPIA-Redacted QR Sick Notes',
      'Run 60–90 day SaaS pilot with 1–2 private clinics under formal SLA',
    ],
    exitCriteria: 'Pilot agreements signed; POPIA tenant isolation verified; cost model approved',
  },
  {
    phase: '6–12 Months · Expand',
    title: 'Corporate Rollout, Partner Clinic Paid Tiers & Youth Outreach',
    deliverables: [
      'Scale to 5–10 paying corporate accounts (construction, security, logistics)',
      'Convert pilot clinics to paid Starter/Growth/Professional subscriptions',
      'Deploy University QR Outreach Tablets & Medical Aid claims reporting',
    ],
    exitCriteria: 'First recurring B2B & SaaS MRR active; outreach conversion tracked',
  },
  {
    phase: '12–24 Months · Scale',
    title: 'Multi-Clinic SaaS Network, Lab Marketplace & Smart Analytics',
    deliverables: [
      'Scale to 20+ subscribed public & private clinics across Gauteng & beyond',
      'Launch Bi-Directional Lab & Specialist Referral Marketplace',
      'Activate predictive Pharmacy stock forecasting & Youth Pass memberships',
    ],
    exitCriteria: 'Renewals, support SLA & unit economics justify regional expansion',
  },
];

export const INITIAL_KPIS = [
  { area: 'Digital bookings', target: '+30% increase from measured baseline within 6 months', review: 'Monthly' },
  { area: 'App registrations', target: '+40% increase from measured baseline within 6 months', review: 'Monthly' },
  { area: 'Corporate customers', target: '5–10 signed B2B accounts in year one', review: 'Monthly' },
  { area: 'Partner clinics (SaaS)', target: '3–5 pilot facilities; convert pilots to paid plans', review: 'Quarterly' },
  { area: 'Missed appointments', target: '-20% reduction via automated reminders within 6 months', review: 'Monthly' },
  { area: 'CRM follow-ups', target: '80% of eligible follow-ups handled via approved workflows', review: 'Monthly' },
  { area: 'IT support SLA', target: '90% of internal & partner tickets resolved within SLA', review: 'Monthly' },
  { area: 'Financial & BI reporting', target: 'Monthly executive dashboard delivered on agreed date', review: 'Monthly' },
];

export const FIRST_90_DAYS_CHECKLIST = [
  'Appoint project sponsors from Dunwell management and clinical leadership.',
  'Measure current app registrations, virtual consultations, bookings and no-shows.',
  'Interview 5–10 patients and 5–10 clinic staff about booking friction and workflow pain points.',
  'Interview at least 5 potential corporate customers and 5 private clinics to validate demand.',
  'Prepare a clickable prototype and synthetic demo tenant (never expose real patient records).',
  'Estimate hosting, security, onboarding and support costs for management budget approval.',
];

export interface PresentationSlide {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  keyMessage: string;
  imageUrl: string;
  imageAlt: string;
  bullets: { heading: string; detail: string }[];
  metricLabel: string;
  metricValue: string;
  demoTarget?: {
    label: string;
    section:
      | 'corporate-crm'
      | 'clinic-dispatch'
      | 'youth-access'
      | 'roadmap'
      | 'automation'
      | 'partners';
  };
}

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 'slide-1',
    index: '01',
    title: 'One Connected Digital Ecosystem (2027–2029 Vision)',
    subtitle: 'Johannesburg, South Africa · Turning Existing HMS & App into Four Growth Engines',
    keyMessage:
      'Dunwell already owns a working HMS (Reception, Nurse, Pharmacy, Expense Reporting) and Booking App. Instead of rebuilding, we connect four external growth platforms directly into that core.',
    imageUrl: CLINIC_IMAGES.clinicHero,
    imageAlt: 'Modern sunlit Dunwell Youth Priority Clinic reception and digital triage lounge',
    bullets: [
      {
        heading: 'Core Principle: One Trusted Source',
        detail:
          'Patient App, Corporate CRM Portal, Partner Clinic SaaS, and Executive BI connect to Dunwell Core HMS via governed APIs with zero data duplication.',
      },
      {
        heading: 'Four Strategic Growth Engines',
        detail:
          '1) Internal Productivity & Automation, 2) Corporate Health CRM, 3) Public/Private Clinic SaaS Subscriptions, and 4) Digital Youth Outreach & Virtual Care.',
      },
      {
        heading: 'Two Parallel Starting Pilots',
        detail:
          'Validate commercial demand fast with (a) 1 Corporate medical customer pilot and (b) 1–2 Private clinic SaaS pilots using synthetic demo data.',
      },
    ],
    metricLabel: 'Strategic Horizon',
    metricValue: '2027–2029 Phased 24-Month Plan',
    demoTarget: {
      label: 'Open 24-Month Roadmap & BI',
      section: 'roadmap',
    },
  },
  {
    id: 'slide-2',
    index: '02',
    title: 'Corporate Medical Management & Incident Nurse Dispatch Portal',
    subtitle: 'B2B Construction, Security, Logistics & Manufacturing Occupational Health',
    keyMessage:
      'Employers need pre-placement, periodic, and working-at-heights medical clearances plus rapid accident response. Our Corporate Portal gives them fitness status checks without exposing private medical histories.',
    imageUrl: CLINIC_IMAGES.constructionMedical,
    imageAlt: 'Occupational health nurse checking construction worker medical fitness on digital tablet',
    bullets: [
      {
        heading: 'End-to-End Corporate Workflow',
        detail:
          'Company onboarding -> roster upload -> job risk profile -> clinical exam -> practitioner sign-off -> QR fitness certificate & 30-day renewal billing.',
      },
      {
        heading: 'Portal Incident Reporting -> Nurse Assignment',
        detail:
          'Safety officer logs a site injury -> Dunwell accepts in Triage Desk -> assigns an available Nurse -> syncs Pharmacy trauma kit & Corporate billing.',
      },
      {
        heading: 'Strict POPIA Employer Privacy Boundary',
        detail:
          'Employers only see legal fitness status (Fit / Conditional / Unfit)—never full clinical histories or confidential diagnoses.',
      },
    ],
    metricLabel: 'Year-1 Corporate Target',
    metricValue: '5–10 Signed Corporate Clients',
    demoTarget: {
      label: 'Open Corporate CRM Portal',
      section: 'corporate-crm',
    },
  },
  {
    id: 'slide-3',
    index: '03',
    title: 'Clinic SaaS Subscriptions for Public & Private Facilities',
    subtitle: 'Commercialising Dunwell HMS & Automation into Recurring Software Revenue',
    keyMessage:
      'Independent private clinics, NGOs, and public health programmes need reliable reception, nursing, stock, and reporting software. Multi-tenant SaaS turns Dunwell’s internal IT investment into repeatable MRR.',
    imageUrl: CLINIC_IMAGES.partnerNetwork,
    imageAlt: 'Regional clinic director and physician reviewing unified clinic referral dashboards',
    bullets: [
      {
        heading: 'Transparent 4-Tier Packaging (ZAR)',
        detail:
          'Starter (R1,500–R3,000), Growth (R4,000–R7,500), Professional (R8,000–R15,000), and Enterprise / Public (Custom procurement SLA).',
      },
      {
        heading: 'Illustrative Unit Economics',
        detail:
          '20 subscribed clinics averaging R4,500/month generates R90,000/month (R1,080,000 annualised) plus setup, training, and lab referral fees.',
      },
      {
        heading: 'POPIA Multi-Tenant Isolation',
        detail:
          'Every subscriber runs in a logically isolated tenant with separate user admin, audit logs, and zero cross-clinic data visibility.',
      },
    ],
    metricLabel: 'Illustrative SaaS Scale',
    metricValue: '20 Clinics = R90,000 / mo (R1.08M / yr)',
    demoTarget: {
      label: 'Open Partner Clinic SaaS Portal',
      section: 'partners',
    },
  },
  {
    id: 'slide-4',
    index: '04',
    title: 'Youth Access, App Adoption & Field Outreach Tools',
    subtitle: 'Measuring Real Attended Bookings—Not Just App Downloads',
    keyMessage:
      'The existing patient app already works. IT removes adoption barriers through 15-second Web-Lite links, WhatsApp Business support, trackable university QR posters, and offline outreach camp tablets.',
    imageUrl: CLINIC_IMAGES.youthOutreach,
    imageAlt: 'Clinic nurse at university outreach booth scanning QR check-in with students',
    bullets: [
      {
        heading: 'Offline Outreach Camp Tablet & Ambassador QR',
        detail:
          'Registers screenings at colleges and sports events, syncs to HMS Reception, and attributes every booking back to its campaign QR tag.',
      },
      {
        heading: 'WhatsApp Business + Safe Clinical Routing',
        detail:
          'Uses WhatsApp for general enquiries, booking links, and reminders—never transmitting raw sensitive clinical records over ordinary chat.',
      },
      {
        heading: 'Conversion KPIs That Matter',
        detail:
          '+30% digital bookings, +40% app registrations, and -20% missed appointments within 6 months via automated reminders.',
      },
    ],
    metricLabel: '6-Month Growth Target',
    metricValue: '+30% Digital Bookings · -20% No-Shows',
    demoTarget: {
      label: 'Open Outreach & Youth Portal',
      section: 'youth-access',
    },
  },
  {
    id: 'slide-5',
    index: '05',
    title: 'Internal Productivity, Auto-Payslips, Sick Notes & Safe AI',
    subtitle: '9 Internal Modules Reducing Manual Admin & Protecting Revenue',
    keyMessage:
      'Automating staff payslips, POPIA-redacted QR sick notes, stock forecasting, and Executive BI dashboards frees clinical staff to focus on patients while protecting revenue.',
    imageUrl: CLINIC_IMAGES.pharmacySmart,
    imageAlt: 'Pharmacist scanning QR pickup code at modern Dunwell Pharmacy counter',
    bullets: [
      {
        heading: 'Auto-Payslips & POPIA-Redacted QR Sick Notes',
        detail:
          'Generates staff payslips (PAYE/UIF) from HMS shifts and delivers off-duty sick notes with private diagnoses stripped from HR copies.',
      },
      {
        heading: 'Safe AI with Mandatory Clinician Sign-Off',
        detail:
          'AI drafts non-diagnostic HR wording, nurse triage prep, and youth red-flag checks—zero automated clinical outputs without practitioner sign-off.',
      },
      {
        heading: '9 Internal Productivity Modules',
        detail:
          'HR Portal, IT Helpdesk & Assets, Procurement, Maintenance, Document Control, Incident Mgmt, Stock Forecasting, Lab Links & Executive BI.',
      },
    ],
    metricLabel: 'Clinical Governance Rule',
    metricValue: '100% Clinician Sign-Off · POPIA Audited',
    demoTarget: {
      label: 'Open Automation & Safe AI Portal',
      section: 'automation',
    },
  },
  {
    id: 'slide-6',
    index: '06',
    title: '2027–2029 Expansion: Youth Pass, QR Pharmacy & University Portals',
    subtitle: 'Scaling Recurring Youth Care, Medical Aid Claims & Diagnostic Cloud',
    keyMessage:
      'Building on 2027 foundations, Dunwell launches Youth Wellness Passes, 60-second QR Pharmacy pickup, University/Sports Academy portals, and automated Medical Aid claim validation.',
    imageUrl: CLINIC_IMAGES.youthTelehealth,
    imageAlt: 'Young adult on confidential telehealth video session with Dunwell nurse',
    bullets: [
      {
        heading: 'Dunwell Youth Pass & Virtual Care Subscriptions',
        detail:
          'Monthly or campus-sponsored membership covering virtual nurse tele-triage, mental wellness check-ins, and priority clinic visits.',
      },
      {
        heading: 'University, School & Sports Academy Portals',
        detail:
          'Reuses our B2B portal pattern so campus health leads manage student clearances, immunizations, and urgent referrals digitally.',
      },
      {
        heading: 'Medical Aid Claims & Bi-Directional Lab Cloud',
        detail:
          'Validates medical aid claims pre-submission and lets subscribed partner clinics order Dunwell lab panels directly from their HMS.',
      },
    ],
    metricLabel: '2027–2029 Scale Vision',
    metricValue: '25+ Corporate & Campus Portals',
    demoTarget: {
      label: 'Open Clinic Dispatch Portal',
      section: 'clinic-dispatch',
    },
  },
];

export interface Growth2027Idea {
  code: string;
  quarter: string;
  title: string;
  problemSolved: string;
  howItWorks: string;
  revenueImpact: string;
  portalLink: 'corporate-crm' | 'clinic-dispatch' | 'youth-access' | 'automation' | 'partners' | 'roadmap';
  portalLabel: string;
}

export const GROWTH_2027_IDEAS: Growth2027Idea[] = [
  {
    code: '2027-01',
    quarter: 'Q1 2027',
    title: 'Dunwell Youth Pass (Telehealth & Wellness Membership)',
    problemSolved: 'Sporadic walk-in youth visits and hesitation to pay per single consult.',
    howItWorks:
      'Monthly or semester pass (R199/mo or campus-sponsored) bundling virtual nurse tele-triage, confidential counseling, and priority clinic slots.',
    revenueImpact: 'Recurring monthly youth membership base + higher pharmacy retention',
    portalLink: 'youth-access',
    portalLabel: 'Demonstrate Youth Funnel Portal',
  },
  {
    code: '2027-02',
    quarter: 'Q1 2027',
    title: 'QR Pharmacy Express & Discreet Medication Pickup',
    problemSolved: 'Youth and shift workers abandoning prescriptions due to queues or stigma.',
    howItWorks:
      'Virtual consults & clinic visits generate a secure QR pickup token; pharmacist scans once for 60-second express collection.',
    revenueImpact: '+35% prescription fulfillment rate inside Dunwell Pharmacy',
    portalLink: 'automation',
    portalLabel: 'Demonstrate Automation Portal',
  },
  {
    code: '2027-03',
    quarter: 'Q2 2027',
    title: 'University, School & Sports Academy Health Portal',
    problemSolved: 'Paper sports medicals and slow emergency referrals at Johannesburg colleges.',
    howItWorks:
      'Adapts the Corporate CRM Portal for universities & academies to verify student clearances, immunizations, and campus incident dispatch.',
    revenueImpact: 'Bulk seasonal student clearances + year-round youth referrals',
    portalLink: 'corporate-crm',
    portalLabel: 'Demonstrate CRM Portal Pattern',
  },
  {
    code: '2027-04',
    quarter: 'Q2 2027',
    title: 'Automated Medical Aid & Corporate Claims Reconciliation',
    problemSolved: 'Delayed medical aid reimbursements and rejected claims from manual errors.',
    howItWorks:
      'Upgrades HMS Expense & Billing with Safe AI pre-submission claim validation, ICD-10 checks, and automated corporate invoicing.',
    revenueImpact: 'Faster medical aid cash collection & zero unbilled procedures',
    portalLink: 'clinic-dispatch',
    portalLabel: 'Demonstrate HMS Billing Sync',
  },
  {
    code: '2027-05',
    quarter: 'Q3 2027',
    title: 'Construction Site Smart Vitals & Fatigue Kiosk Sync',
    problemSolved: 'Annual medicals miss daily acute risks (BP spikes, heat stress) on site.',
    howItWorks:
      'Bluetooth BP/SpO2 kiosk at construction gates logs pre-shift checks straight into Corporate CRM and alerts Dunwell Nurse Dispatch on red flags.',
    revenueImpact: 'Premium enterprise tier for Tier-1 construction & mining clients',
    portalLink: 'corporate-crm',
    portalLabel: 'Demonstrate Corporate CRM Portal',
  },
  {
    code: '2027-06',
    quarter: 'Q4 2027',
    title: 'Regional Diagnostic Lab Cloud & Multi-Language Intake',
    problemSolved: 'Partner clinics lack digital lab links and language friction slows youth intake.',
    howItWorks:
      'Partner clinics subscribe to Dunwell Lab Cloud for digital test orders, while youth send multilingual WhatsApp intake safely triaged by Nurse sign-off.',
    revenueImpact: 'Multi-clinic SaaS MRR (R1.08M+/yr scenario) + high-margin lab volume',
    portalLink: 'partners',
    portalLabel: 'Demonstrate Partner SaaS Portal',
  },
];
