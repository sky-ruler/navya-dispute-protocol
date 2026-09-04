import React from 'react';
import { Leaf, PlusCircle, Inbox, Search, Award, Sparkles } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const Navbar = ({ 
  currentView, 
  setCurrentView, 
  activeRole, 
  setActiveRole, 
  userPoints = 150,
  onOpenRateModal 
}) => {
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
          Report Issue
        </button>
        <button
          className={`nav-link-item ${currentView === 'inbox' || currentView === 'dispute-detail' ? 'active' : ''}`}
          onClick={() => setCurrentView('inbox')}
        >
          <Inbox size={15} />
          Complaints Inbox
        </button>
        <button
          className={`nav-link-item ${currentView === 'batches' ? 'active' : ''}`}
          onClick={() => setCurrentView('batches')}
        >
          <Search size={15} />
          Batch Explorer
        </button>
      </nav>

      {/* Actions & Role Switcher */}
      <div className="nav-actions-group">
        {/* Reinforcement Learning Rewards Pill */}
        <button
          type="button"
          className="reward-points-badge"
          onClick={() => onOpenRateModal && onOpenRateModal()}
          title="Verified Navya reward points — redeemable as discounts on the main Navya website"
        >
          <span className="points-coin">🪙</span>
          <span className="points-val">{userPoints} pts</span>
          <span className="points-credit">(₹{Math.floor(userPoints / 2)})</span>
        </button>

        {/* Multi-lingual Language Selector */}
        <LanguageSelector />

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
            🏢 Dealer
          </button>
        </div>

        {/* Primary CTA */}
        <button
          className="btn-primary nav-cta-btn"
          onClick={() => setCurrentView('file-complaint')}
        >
          <PlusCircle size={16} />
          <span>New Claim</span>
        </button>
      </div>
    </header>
  );
};
