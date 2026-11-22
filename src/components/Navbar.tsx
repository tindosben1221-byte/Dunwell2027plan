import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavSection } from '../types/dunwell';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
}

const NAV_ITEMS: { id: NavSection; label: string }[] = [
  { id: 'plan', label: 'IT Plan' },
  { id: 'corporate-crm', label: 'Corporate CRM' },
  { id: 'clinic-dispatch', label: 'Clinic Dispatch' },
  { id: 'youth-access', label: 'Outreach & Youth' },
  { id: 'automation', label: 'Automation & AI' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (section: NavSection) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, clean, no descriptor tags) */}
        <button
          type="button"
          onClick={() => handleSelect('plan')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-700 rounded-md"
        >
          <img
            src="/assets/aistudio/WhatsApp_Image_2025-09-03_at_09.51.25_12f074ba.jpeg"
            alt="Dunwell Youth Priority Clinic"
            referrerPolicy="no-referrer"
            className="h-9 w-9 object-contain rounded"
          />
          <span className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
            Dunwell IT Strategy
          </span>
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-700 ${
                  isActive
                    ? 'text-cyan-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[19px] h-0.5 bg-cyan-700"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              handleSelect(activeSection === 'partners' ? 'roadmap' : 'partners')
            }
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-cyan-800 hover:bg-cyan-900 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-800"
          >
            {activeSection === 'partners' ? 'Roadmap & ROI' : 'Partner SaaS'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-cyan-700"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {[
            ...NAV_ITEMS,
            { id: 'partners' as NavSection, label: 'Partner SaaS' },
            { id: 'roadmap' as NavSection, label: 'Roadmap & ROI' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-50 text-cyan-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
