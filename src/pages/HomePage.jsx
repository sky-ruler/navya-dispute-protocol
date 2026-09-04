import React from 'react';
import { 
  PlusCircle, 
  Inbox, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Camera, 
  Shield, 
  Leaf,
  Activity,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Globe
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { TOP_LANGUAGES, SUPPORTED_LANGUAGES, languageService } from '../services/languageService';

export const HomePage = ({ 
  setCurrentView, 
  onSelectDispute, 
  disputes,
  onOpenRateModal,
  activeRole = 'DEALER',
  onOpenLanguageModal
}) => {
  const pendingCount = disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION').length;
  const currentLang = languageService.getCurrentLanguage();

  return (
    <div className="home-page-container">
      {/* Editorial Clean Hero Section */}
      <section className="hero-banner">
        <div className="hero-ambient-glow" />
        
        <div className="hero-banner-top">
          <div className="hero-pill">
            <span className="hero-pill-pulse" />
            <Leaf size={14} className="hero-pill-icon" />
            <span>Navya • Post-Harvest Quality & Redressal Prototype</span>
          </div>

          <div className={`hero-role-badge ${activeRole === 'FARMER' ? 'hero-role-badge--farmer' : 'hero-role-badge--dealer'}`}>
            <span className="hero-role-icon">{activeRole === 'FARMER' ? '👨‍🌾' : '🏢'}</span>
            <span className="hero-role-name">
              {activeRole === 'FARMER' ? 'Farmer View' : 'Buyer / Trader View'}
            </span>
            <span className="hero-role-divider">•</span>
            <span className="hero-role-detail">
              {activeRole === 'FARMER' ? 'Grower Mode' : 'Mandi Trader Mode'}
            </span>
          </div>
        </div>

        <h1 className="hero-title">
          {activeRole === 'FARMER'
            ? 'Fair Resolution for Damaged or Spoiled Produce'
            : 'Review Arriving Spoilage & Settle Claims Fast'}
        </h1>
        
        <p className="hero-subtitle">
          {activeRole === 'FARMER'
            ? 'Report transit heat abuse, rotting crates, or crushed fruit with photos. Work directly with your buyer to agree on fresh replacement crates or invoice adjustments without friction.'
            : 'Inspect reported defects and arrival photos against dispatch baselines. Propose fair replacement crates or discount notes to resolve claims quickly and keep trade moving.'}
        </p>

        {/* Big Dual Core Action Cards */}
        <div className="hero-actions-grid">
          <div 
            onClick={() => setCurrentView('file-complaint')}
            className="hero-action-card hero-action-card--primary"
            role="button"
            tabIndex={0}
          >
            <div className="hero-action-text-col">
              <div className="hero-action-title">
                {activeRole === 'FARMER' ? '🌿 Report Produce Issue' : '📦 Log Arriving Damage'}
              </div>
              <div className="hero-action-desc">
                {activeRole === 'FARMER'
                  ? 'Attach defect photos, select batch, and request replacement'
                  : 'Report damaged delivery & propose invoice adjustment'}
              </div>
            </div>
            <div className="hero-action-icon-wrap hero-action-icon-wrap--primary">
              <PlusCircle size={22} />
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('inbox')}
            className="hero-action-card hero-action-card--ghost"
            role="button"
            tabIndex={0}
          >
            <div className="hero-action-text-col">
              <div className="hero-action-title">
                {activeRole === 'FARMER' ? '📋 My Claims' : '📥 Spoilage Inbox'}
              </div>
              <div className="hero-action-desc">
                {activeRole === 'FARMER'
                  ? `${pendingCount} active claim(s) awaiting dealer solution`
                  : `${pendingCount} incoming claim(s) awaiting your settlement offer`}
              </div>
            </div>
            <div className="hero-action-icon-wrap hero-action-icon-wrap--ghost">
              <Inbox size={22} />
              {pendingCount > 0 && <span className="hero-action-badge">{pendingCount}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (In 3 Simple Steps) */}
      <section className="steps-section">
        <div className="steps-header">
          <span className="steps-eyebrow">Transparent Process</span>
          <h2 className="steps-section-title">
            How Redressal Works in 3 Simple Steps
          </h2>
          <p className="steps-section-desc">
            A direct, photo-backed way for growers and buyers to resolve quality issues without arguments
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-item">
            <div className="step-top-row">
              <div className="step-number step-number--1">01</div>
              <div className="step-icon-badge">
                <QrCode size={18} />
              </div>
            </div>
            <h3 className="step-title">Select Lot or Scan QR</h3>
            <p className="step-desc">
              Pick the batch from your consignment list or scan the QR code on the crate.
            </p>
          </div>

          <div className="step-item">
            <div className="step-top-row">
              <div className="step-number step-number--2">02</div>
              <div className="step-icon-badge">
                <Camera size={18} />
              </div>
            </div>
            <h3 className="step-title">Add Photos & Notes</h3>
            <p className="step-desc">
              Upload photos showing the spoiled fruit or defects so the issue is clearly visible.
            </p>
          </div>

          <div className="step-item">
            <div className="step-top-row">
              <div className="step-number step-number--3">03</div>
              <div className="step-icon-badge">
                <Shield size={18} />
              </div>
            </div>
            <h3 className="step-title">Agree on Solution</h3>
            <p className="step-desc">
              Buyer reviews the claim and proposes fresh replacement crates or a price deduction.
            </p>
          </div>
        </div>
      </section>

      {/* Ground-Truth Feedback CTA Banner */}
      <section className="rate-cta-banner">
        <div className="rate-cta-content">
          <div className="rate-cta-icon-box">
            <Award size={26} className="rate-award-icon" />
          </div>
          <div className="rate-cta-text-group">
            <div className="rate-cta-title-row">
              <h3 className="rate-cta-title">
                Provide Produce Shelf-Life Feedback
              </h3>
              <span className="rate-cta-badge">
                🪙 Earn +50 Demo Points
              </span>
            </div>
            <p className="rate-cta-desc">
              Help train the prototype prediction model by rating whether actual arrival freshness matched our initial estimate.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary rate-cta-btn"
          onClick={() => onOpenRateModal && onOpenRateModal()}
        >
          <span>Rate Freshness</span>
          <ArrowRight size={15} />
        </button>
      </section>

      {/* Recent Quality Issues Workbench */}
      <section className="recent-issues-section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Active Discrepancies</div>
            <h2 className="section-title">Recent Quality Claims</h2>
            <p className="section-desc">Click on any ticket to view details and bilateral resolution</p>
          </div>
          <button className="btn-secondary view-all-btn" onClick={() => setCurrentView('inbox')}>
            <span>View All Claims ({disputes.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="disputes-list">
          {disputes.map((d) => (
            <div 
              key={d.id} 
              className="dispute-item-card"
              onClick={() => onSelectDispute(d.id)}
              role="button"
              tabIndex={0}
            >
              <div className="dispute-main-col">
                <div className="crop-badge-avatar">
                  <span className="crop-avatar-emoji">{d.emoji}</span>
                </div>
                
                <div className="dispute-meta-block">
                  <div className="dispute-title-row">
                    <span className="dispute-id-code">{d.id}</span>
                    <span className="dispute-dot-sep">•</span>
                    <span className="dispute-crop-name">{d.crop}</span>
                    <StatusBadge status={d.status} />
                  </div>
                  
                  <h4 className="dispute-defect-title">
                    {d.defectTitle}
                  </h4>
                  
                  <div className="dispute-meta-line">
                    <span className="dispute-meta-crates">📦 {d.affectedCrates} Crates</span>
                    <span className="dispute-meta-sep">•</span>
                    <span className="dispute-meta-batch">Batch: {d.batchId}</span>
                    <span className="dispute-meta-sep">•</span>
                    <span className="dispute-meta-date">📅 {d.filingDate}</span>
                  </div>

                  {/* Grounded Transit Check Pill */}
                  <div className="dispute-sensor-pill">
                    <Activity size={12} className="dispute-sensor-icon" />
                    <span>Transit Check: 21.4°C Peak Temp (Safe: 14°C)</span>
                  </div>
                </div>
              </div>

              <div className="dispute-action-col">
                <button className="btn-secondary dispute-view-btn">
                  <span>View Details</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
