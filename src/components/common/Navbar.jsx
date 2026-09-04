import React from 'react';
import { Leaf, PlusCircle, Inbox, Search, Globe, ChevronDown } from 'lucide-react';
import { languageService } from '../../services/languageService';

export const Navbar = ({ 
  currentView, 
  setCurrentView, 
  activeRole, 
  setActiveRole, 
  userPoints = 150,
  onOpenWalletModal,
  onOpenLanguageModal
}) => {
  const currentLangObj = languageService.getCurrentLanguageObj();

  return (
    <header className="navya-navbar">
      <div className="navya-navbar-inner">
        {/* Brand Identity */}
        <div className="nav-brand-group" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>
          <div className="nav-brand-logo">
            <Leaf size={22} strokeWidth={2.4} />
          </div>
          <div className="brand-text-block">
            <div className="brand-title">
              NAVYA <span className="brand-dot">•</span>
              <span className="brand-sub">Redressal</span>
            </div>
            <span className="brand-tagline">Post-Harvest Quality Claims & Feedback</span>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="nav-links-row" aria-label="Desktop Navigation">
          <button
            type="button"
            className={`nav-link-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Overview
          </button>
          <button
            type="button"
            className={`nav-link-item ${currentView === 'file-complaint' ? 'active' : ''}`}
            onClick={() => setCurrentView('file-complaint')}
          >
            <PlusCircle size={15} />
            <span>Report Issue</span>
          </button>
          <button
            type="button"
            className={`nav-link-item ${currentView === 'inbox' || currentView === 'dispute-detail' ? 'active' : ''}`}
            onClick={() => setCurrentView('inbox')}
          >
            <Inbox size={15} />
            <span>{activeRole === 'FARMER' ? 'My Claims' : 'Claims Inbox'}</span>
          </button>
          <button
            type="button"
            className={`nav-link-item ${currentView === 'batches' ? 'active' : ''}`}
            onClick={() => setCurrentView('batches')}
          >
            <Search size={15} />
            <span>Batch Explorer</span>
          </button>
        </nav>

        {/* Actions Group */}
        <div className="nav-actions-group">
          {/* Prominent Language Button */}
          <button
            type="button"
            className="nav-language-trigger notranslate"
            translate="no"
            onClick={onOpenLanguageModal}
            title="Change language / भाषा बदलें / ଭାଷା ବଦଳାନ୍ତୁ"
          >
            <div className="nav-lang-icon-wrap notranslate">
              <Globe size={15} />
            </div>
            <div className="nav-lang-text notranslate">
              <span className="nav-lang-native notranslate">{currentLangObj.native}</span>
              <span className="nav-lang-code notranslate">{currentLangObj.english}</span>
            </div>
            <ChevronDown size={13} className="nav-lang-chevron notranslate" />
          </button>

          {/* Mandi Credits Wallet Pill */}
          <button
            type="button"
            className="reward-points-badge"
            onClick={onOpenWalletModal}
            title="View Mandi Credits Wallet & Rewards Balance"
          >
            <span className="points-coin">🪙</span>
            <span className="points-val">{userPoints} pts</span>
          </button>

          {/* Bilateral Role Switcher */}
          <div className="role-switcher" title="Toggle active role to test bilateral farmer-dealer dispute resolution">
            <button
              type="button"
              className={`role-btn ${activeRole === 'FARMER' ? 'active' : ''}`}
              onClick={() => setActiveRole('FARMER')}
              title="Farmer Mode: File claims, check telemetry baselines & accept settlement offers"
            >
              👨‍🌾 Farmer
            </button>
            <button
              type="button"
              className={`role-btn ${activeRole === 'DEALER' ? 'active' : ''}`}
              onClick={() => setActiveRole('DEALER')}
              title="Dealer Mode: Audit incoming crates, verify spoilage & propose replacement/discounts"
            >
              🏢 Dealer
            </button>
          </div>

          {/* Primary Action CTA (Desktop) */}
          <button
            type="button"
            className="btn-primary nav-cta-btn"
            onClick={() => setCurrentView('file-complaint')}
          >
            <PlusCircle size={16} />
            <span>New Claim</span>
          </button>
        </div>
      </div>
    </header>
  );
};
