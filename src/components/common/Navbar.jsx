import React from 'react';
import { Leaf, PlusCircle, Inbox, Search } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';

export const Navbar = ({ 
  currentView, 
  setCurrentView, 
  activeRole, 
  setActiveRole, 
  userPoints = 150,
  onOpenWalletModal 
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
          {activeRole === 'FARMER' ? 'My Claims' : 'Claims Inbox'}
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
        {/* GitHub Repository Link */}
        <a
          href="https://github.com/sky-ruler/navya-dispute-protocol"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-medium)',
            background: '#ffffff',
            color: 'var(--navya-forest-800)',
            fontSize: '12.5px',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.15s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          title="View Source Code, Architecture & Docs on GitHub"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </a>

        {/* Reinforcement Learning Rewards & Wallet Pill */}
        <button
          type="button"
          className="reward-points-badge"
          onClick={() => onOpenWalletModal && onOpenWalletModal()}
          title="View Mandi Credits Wallet & Rewards Balance"
        >
          <span className="points-coin">🪙</span>
          <span className="points-val">{userPoints} pts</span>
          <span className="points-credit">(₹{Math.floor(userPoints / 2)})</span>
        </button>

        {/* Multi-lingual Language Selector */}
        <LanguageSelector />

        {/* Functional Bilateral Role Toggle */}
        <div className="role-switcher" title="Toggle active role to test bilateral farmer-dealer dispute resolution">
          <button
            className={`role-btn ${activeRole === 'FARMER' ? 'active' : ''}`}
            onClick={() => setActiveRole('FARMER')}
            title="Farmer Mode: File claims, check telemetry baselines & accept settlement offers"
          >
            👨‍🌾 Farmer
          </button>
          <button
            className={`role-btn ${activeRole === 'DEALER' ? 'active' : ''}`}
            onClick={() => setActiveRole('DEALER')}
            title="Dealer Mode: Audit incoming crates, verify spoilage & propose replacement/discounts"
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
