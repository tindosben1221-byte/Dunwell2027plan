import React, { useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Megaphone,
  MessageSquare,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Tablet,
  Video,
  WifiOff,
} from 'lucide-react';
import { CLINIC_IMAGES } from '../data/initialData';
import { useClinicDemo } from '../context/ClinicDemoContext';
import { NavSection } from '../types/dunwell';
import { ClinicImage } from './ClinicImage';

interface YouthAccessDemoProps {
  onNavigate: (section: NavSection) => void;
}

const SERVICE_OPTIONS = [
  'Confidential Youth Counseling & Mental Wellness',
  'Sports Injury & Rapid Physiotherapy Screen',
  'Youth Sexual & Reproductive Health (Private)',
  'General GP Virtual Tele-Consult',
  'College / Internship Fitness Medical',
];

const OUTREACH_CAMPAIGNS = [
  {
    name: 'University Exam-Week Virtual Counseling',
    audienceCount: 420,
    channel: 'WhatsApp + Campus QR',
    messagePreview:
      'Need a private 15-min video check-in with a Dunwell youth clinician this week? Book with zero app install:',
  },
  {
    name: 'Construction Apprentice Wellness Checkup',
    audienceCount: 135,
    channel: 'SMS + Site Safety Poster',
    messagePreview:
      'Sponsored by your site employer: claim your free Dunwell Youth wellness & vision screen this Friday.',
  },
  {
    name: '6-Month Preventive & Immunization Recall',
    audienceCount: 280,
    channel: 'WhatsApp Automated Recall',
    messagePreview:
      'Hi! It has been 6 months since your last Dunwell visit. Tap below to reserve a 10-min express slot.',
  },
];

export const YouthAccessDemo: React.FC<YouthAccessDemoProps> = ({ onNavigate }) => {
  const {
    youthBookings,
    outreachScreenings,
    addYouthBooking,
    addOutreachScreening,
    syncAllOfflineScreenings,
    triggerRecallCampaign,
  } = useClinicDemo();

  const [activeToolTab, setActiveToolTab] = useState<'booking' | 'camp-tablet' | 'campaigns'>(
    'camp-tablet'
  );

  // Booking Funnel Simulator State
  const [channel, setChannel] = useState<'WhatsApp Bot' | 'Web-Lite Link' | 'Campus QR'>(
    'WhatsApp Bot'
  );
  const [visitType, setVisitType] = useState<'Virtual Tele-Consult' | 'In-Clinic Priority'>(
    'Virtual Tele-Consult'
  );
  const [patientAlias, setPatientAlias] = useState('');
  const [ageGroup, setAgeGroup] = useState<'15-19' | '20-24' | '25-29'>('20-24');
  const [serviceCategory, setServiceCategory] = useState(SERVICE_OPTIONS[0]);
  const [scheduledSlot, setScheduledSlot] = useState('Today, 4:00 PM');
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  // Outreach Camp Tablet State
  const [campParticipant, setCampParticipant] = useState('');
  const [campAge, setCampAge] = useState<'15-19' | '20-24' | '25-29'>('20-24');
  const [campLocation, setCampLocation] = useState('Technical University Campus Quad');
  const [ambassadorCode, setAmbassadorCode] = useState('AMB-TUK-04');
  const [campVitals, setCampVitals] = useState('BP 116/74 · BMI 22.1 · Requests Virtual GP');
  const [offlineMode, setOfflineMode] = useState(true);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Recall Campaign Feedback
  const [campaignSentMsg, setCampaignSentMsg] = useState<string | null>(null);

  const offlineQueuedCount = outreachScreenings.filter(
    (o) => o.syncStatus === 'Queued Offline'
  ).length;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientAlias.trim()) return;
    const created = addYouthBooking({
      patientAlias: patientAlias.trim(),
      ageGroup,
      channel,
      visitType,
      serviceCategory,
      scheduledSlot,
    });
    setConfirmedRef(created.bookingRef);
    setPatientAlias('');
  };

  const handleRecordCampScreening = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campParticipant.trim()) return;
    addOutreachScreening({
      participantName: campParticipant.trim(),
      ageGroup: campAge,
      campLocation,
      ambassadorCode,
      vitalsSummary: campVitals,
      followUpNeeded: true,
      offlineMode,
    });
    setCampParticipant('');
    setSyncFeedback(
      offlineMode
        ? 'Saved locally to Outreach Tablet offline queue. Click "Sync Batch to HMS" when back on Wi-Fi/4G.'
        : 'Synced immediately to HMS Reception & WhatsApp follow-up dispatched.'
    );
  };

  const handleBatchSync = () => {
    const count = syncAllOfflineScreenings();
    setSyncFeedback(
      count > 0
        ? `Synced ${count} offline outreach screening(s) into HMS Reception & triggered WhatsApp booking links.`
        : 'All field outreach screenings are already synced with HMS.'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Outreach Editorial Hero Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Youth Growth & Field Outreach Toolkit</span>
              <span aria-hidden="true">·</span>
              <span>Feeds Existing Dunwell App & HMS Reception</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
              Field Outreach Tools & Zero-Friction Youth App Activation
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              Demonstrates the exact IT tools Dunwell nurses and youth ambassadors use in the field—
              offline outreach tablets, trackable campus QR posters, automated WhatsApp recall
              campaigns, and 15-second Web-Lite bookings routed into your existing App.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('clinic-dispatch')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
            >
              View Synced HMS Reception Queue
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('partners')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              Explore Clinic SaaS Partnerships
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[220px]">
          <ClinicImage
            src={CLINIC_IMAGES.youthOutreach}
            alt="Dunwell outreach nurse demonstrating QR check-in to university students on campus"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Interactive Outreach & Youth Tool Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveToolTab('camp-tablet')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeToolTab === 'camp-tablet'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tablet className="w-4 h-4 text-cyan-800" />
            Tool 1: Field Outreach Tablet ({outreachScreenings.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveToolTab('booking')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeToolTab === 'booking'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-cyan-800" />
            Tool 2: 15-Sec Youth App Funnel ({youthBookings.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveToolTab('campaigns')}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeToolTab === 'campaigns'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Megaphone className="w-4 h-4 text-amber-600" />
            Tool 3: QR Posters & Recall Campaigns
          </button>
        </div>

        {activeToolTab === 'camp-tablet' && (
          <button
            type="button"
            onClick={handleBatchSync}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sync Offline Batch to HMS ({offlineQueuedCount} queued)
          </button>
        )}
      </div>

      {/* TOOL 1: FIELD OUTREACH CAMP TABLET MOCKUP */}
      {activeToolTab === 'camp-tablet' && (
        <div className="space-y-4">
          {syncFeedback && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl px-4 py-3 text-xs font-semibold text-cyan-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
              {syncFeedback}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <form
              onSubmit={handleRecordCampScreening}
              className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <div className="text-xs font-mono text-cyan-800 font-semibold">
                    Outreach Nurse Tablet Mockup
                  </div>
                  <h2 className="font-display text-lg font-bold text-slate-900">
                    Rapid Field Health Screening Check-In
                  </h2>
                </div>
                <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={offlineMode}
                    onChange={(e) => setOfflineMode(e.target.checked)}
                    className="accent-cyan-800"
                  />
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  Offline Queue Mode
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Youth / Participant Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sharon Mwende"
                    value={campParticipant}
                    onChange={(e) => setCampParticipant(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Age Group
                  </label>
                  <select
                    value={campAge}
                    onChange={(e) => setCampAge(e.target.value as '15-19' | '20-24' | '25-29')}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="15-19">15–19</option>
                    <option value="20-24">20–24</option>
                    <option value="25-29">25–29</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Outreach Location
                  </label>
                  <select
                    value={campLocation}
                    onChange={(e) => setCampLocation(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                  >
                    <option>Technical University Campus Quad</option>
                    <option>Kasarani Youth Football Cup</option>
                    <option>Westlands Construction Apprentice Day</option>
                    <option>Eastlands Community Youth Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Youth Ambassador Code
                  </label>
                  <input
                    type="text"
                    value={ambassadorCode}
                    onChange={(e) => setAmbassadorCode(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Quick Screening Vitals & Follow-Up Trigger
                </label>
                <textarea
                  rows={2}
                  value={campVitals}
                  onChange={(e) => setCampVitals(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors"
              >
                {offlineMode ? 'Save to Offline Tablet Queue' : 'Record & Sync Immediately to HMS'}
              </button>
            </form>

            {/* Right: Field Screening Batch Log */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-slate-900">
                    Outreach Camp Screening Batch ({outreachScreenings.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    When synced, each participant automatically receives a WhatsApp booking link for
                    Dunwell follow-up care.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {outreachScreenings.map((item) => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
                        <span>{item.screeningRef}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.ambassadorCode}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.recordedAt}</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {item.participantName} ({item.ageGroup}) — {item.campLocation}
                      </div>
                      <div className="text-xs text-slate-600">{item.vitalsSummary}</div>
                    </div>

                    <span
                      className={`text-xs font-semibold shrink-0 ${
                        item.syncStatus === 'Queued Offline'
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {item.syncStatus}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: ZERO-FRICTION YOUTH BOOKING FUNNEL */}
      {activeToolTab === 'booking' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <form
            onSubmit={handleBook}
            className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5"
          >
            <div className="border-b border-slate-200 pb-3">
              <div className="text-xs font-mono text-cyan-800 font-semibold">
                15-Second Web-Lite & WhatsApp Booking
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                Simulate a Youth Booking (Syncs to Existing App & HMS)
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Entry Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['WhatsApp Bot', 'Web-Lite Link', 'Campus QR'] as const).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
                      channel === ch
                        ? 'bg-cyan-800 text-white border-cyan-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setVisitType('Virtual Tele-Consult')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border inline-flex items-center justify-center gap-1.5 transition-colors ${
                    visitType === 'Virtual Tele-Consult'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Virtual Tele-Consult
                </button>
                <button
                  type="button"
                  onClick={() => setVisitType('In-Clinic Priority')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border inline-flex items-center justify-center gap-1.5 transition-colors ${
                    visitType === 'In-Clinic Priority'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  In-Clinic Priority Slot
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name or Private Alias
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brian K. or Campus-402"
                  value={patientAlias}
                  onChange={(e) => setPatientAlias(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Age Bracket
                </label>
                <select
                  value={ageGroup}
                  onChange={(e) => setAgeGroup(e.target.value as '15-19' | '20-24' | '25-29')}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option value="15-19">15–19 (Teen / High School)</option>
                  <option value="20-24">20–24 (College / Early Career)</option>
                  <option value="25-29">25–29 (Young Adult)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Youth Priority Service
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Slot
                </label>
                <select
                  value={scheduledSlot}
                  onChange={(e) => setScheduledSlot(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white"
                >
                  <option>Today, 4:00 PM</option>
                  <option>Today, 5:30 PM (After-Class Slot)</option>
                  <option>Tomorrow, 9:00 AM</option>
                  <option>Tomorrow, 1:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors"
            >
              Confirm 15-Second Booking & Push to HMS Reception
            </button>

            {confirmedRef && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Booking {confirmedRef} confirmed via {channel}
                </div>
                <p className="text-xs text-emerald-800">
                  Synced straight into Dunwell’s existing App schedule and HMS Reception Queue.
                </p>
              </div>
            )}
          </form>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-display text-base font-bold text-slate-900">
                Live Youth Funnel Bookings ({youthBookings.length})
              </h3>
              <button
                type="button"
                onClick={() => onNavigate('clinic-dispatch')}
                className="text-xs font-semibold text-cyan-800 hover:underline"
              >
                Manage in HMS Queue →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {youthBookings.map((yb) => (
                <div key={yb.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {yb.patientAlias} · <span className="font-mono text-xs">{yb.bookingRef}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {yb.channel} · {yb.visitType} · {yb.scheduledSlot}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-cyan-800 shrink-0">{yb.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: QR POSTER BUILDER & AUTOMATED RECALL CAMPAIGNS */}
      {activeToolTab === 'campaigns' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Campus QR Poster Generator Preview */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shrink-0">
                <QrCode className="w-20 h-20 text-slate-900" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono text-amber-400">
                  Trackable Ambassador QR Poster
                </div>
                <h3 className="font-display text-lg font-bold leading-snug">
                  “Talk to a Dunwell Clinician in 15 Seconds — No App Install”
                </h3>
                <div className="text-xs font-mono text-slate-300">
                  Tracking Tag: {ambassadorCode} · {campLocation}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                WhatsApp Bot
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                Web-Lite Link
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Alias Privacy
              </span>
            </div>
          </div>

          {/* Automated Recall & Outreach Campaign Broadcaster */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="font-display text-base font-bold text-slate-900">
                Automated WhatsApp & SMS Recall Campaigns
              </h2>
              <p className="text-xs text-slate-500">
                Re-engage past outreach contacts and drive repeat virtual & in-clinic bookings.
              </p>
            </div>

            {campaignSentMsg && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2.5 text-xs font-semibold text-emerald-900">
                {campaignSentMsg}
              </div>
            )}

            <div className="space-y-3">
              {OUTREACH_CAMPAIGNS.map((camp) => (
                <div
                  key={camp.name}
                  className="border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-cyan-800 font-semibold">
                      {camp.channel} · {camp.audienceCount} youth contacts
                    </div>
                    <div className="text-sm font-bold text-slate-900">{camp.name}</div>
                    <p className="text-xs text-slate-600">{camp.messagePreview}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      triggerRecallCampaign(camp.name, camp.audienceCount);
                      setCampaignSentMsg(
                        `Dispatched "${camp.name}" to ${camp.audienceCount} recipients with 1-tap Dunwell booking links.`
                      );
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg whitespace-nowrap shrink-0"
                  >
                    Launch Recall Batch
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
