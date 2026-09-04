import React from 'react';
import { Leaf, PlusCircle, Inbox, Search, RefreshCw, UserCheck, ShieldCheck } from 'lucide-react';

export const Navbar = ({ currentView, setCurrentView, activeRole, setActiveRole }) => {
  return (
    <header className="navya-navbar">
      {/* Brand Identity */}
      <div className="nav-brand-group">
        <div className="nav-brand-logo" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
          <Leaf size={22} strokeWidth={2.4} />
        </div>
        <div className="brand-text-block" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-title">
            NAVYA <span style={{ color: 'var(--navya-bronze)', fontSize: '15px' }}>•</span>
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--navya-forest-600)' }}>Redressal</span>
          </div>
          <span className="brand-tagline">Post-Harvest Quality Claims & Feedback</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links-row">
        <button
          className={`nav-link-item ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          Overview
        </button>
        <button
          className={`nav-link-item ${currentView === 'file-complaint' ? 'active' : ''}`}
          onClick={() => setCurrentView('file-complaint')}
        >
          <PlusCircle size={15} />
          File Claim
        </button>
        <button
          className={`nav-link-item ${currentView === 'inbox' || currentView === 'dispute-detail' ? 'active' : ''}`}
          onClick={() => setCurrentView('inbox')}
        >
          <Inbox size={15} />
          Claims Inbox
        </button>
        <button
          className={`nav-link-item ${currentView === 'batches' ? 'active' : ''}`}
          onClick={() => setCurrentView('batches')}
        >
          <Search size={15} />
          Batch Telemetry
        </button>
      </nav>

      {/* Actions & Role Switcher */}
      <div className="nav-actions-group">
        {/* Role Toggle */}
        <div className="role-switcher" title="Switch active actor view to test bilateral farmer-dealer feedback">
          <button
            className={`role-btn ${activeRole === 'FARMER' ? 'active' : ''}`}
            onClick={() => setActiveRole('FARMER')}
          >
            👨‍🌾 Farmer
          </button>
          <button
            className={`role-btn ${activeRole === 'DEALER' ? 'active' : ''}`}
            onClick={() => setActiveRole('DEALER')}
          >
            🏢 Dealer / Aggregator
          </button>
        </div>

        {/* Primary CTA */}
        <button
          className="btn-primary"
          onClick={() => setCurrentView('file-complaint')}
        >
          <PlusCircle size={16} />
          <span>New Claim</span>
        </button>
      </div>
    </header>
  );
};
