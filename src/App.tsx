/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { AutomationHubView } from './components/AutomationHubView';
import { ClinicDispatchDemo } from './components/ClinicDispatchDemo';
import { CorporateCrmDemo } from './components/CorporateCrmDemo';
import { ExecutivePlanView } from './components/ExecutivePlanView';
import { Navbar } from './components/Navbar';
import { PartnerSaaSView } from './components/PartnerSaaSView';
import { SystemsRoadmapView } from './components/SystemsRoadmapView';
import { YouthAccessDemo } from './components/YouthAccessDemo';
import { ClinicDemoProvider } from './context/ClinicDemoContext';
import { NavSection } from './types/dunwell';

export function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('plan');

  const handleNavigate = (section: NavSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ClinicDemoProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        <main className="flex-1">
          {activeSection === 'plan' && <ExecutivePlanView onNavigate={handleNavigate} />}
          {activeSection === 'roadmap' && <SystemsRoadmapView onNavigate={handleNavigate} />}
          {activeSection === 'automation' && <AutomationHubView onNavigate={handleNavigate} />}
          {activeSection === 'corporate-crm' && <CorporateCrmDemo onNavigate={handleNavigate} />}
          {activeSection === 'clinic-dispatch' && <ClinicDispatchDemo onNavigate={handleNavigate} />}
          {activeSection === 'youth-access' && <YouthAccessDemo onNavigate={handleNavigate} />}
          {activeSection === 'partners' && <PartnerSaaSView onNavigate={handleNavigate} />}
        </main>

        <footer className="bg-white border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-slate-800">Dunwell Youth Priority Clinic</span>
              <span aria-hidden="true">·</span>
              <span>IT Expansion Plan, Outreach Tools & Partner SaaS Mockups</span>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => handleNavigate('plan')}
                className="hover:text-slate-900 transition-colors"
              >
                IT Plan
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('corporate-crm')}
                className="hover:text-slate-900 transition-colors"
              >
                Corporate CRM
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('clinic-dispatch')}
                className="hover:text-slate-900 transition-colors"
              >
                Clinic Dispatch
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('youth-access')}
                className="hover:text-slate-900 transition-colors"
              >
                Outreach & Youth
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('automation')}
                className="hover:text-slate-900 transition-colors"
              >
                Automation & AI
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('partners')}
                className="hover:text-slate-900 transition-colors"
              >
                Partner SaaS
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('roadmap')}
                className="hover:text-slate-900 transition-colors"
              >
                Roadmap & ROI
              </button>
            </div>
          </div>
        </footer>
      </div>
    </ClinicDemoProvider>
  );
}

export default App;
