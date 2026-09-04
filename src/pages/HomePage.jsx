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
      {/* Multilingual Welcome Banner */}
      <section className="multilingual-welcome-ribbon notranslate" translate="no">
        <div className="welcome-ribbon-left notranslate" translate="no">
          <Globe size={18} className="welcome-globe-icon notranslate" />
          <span className="welcome-ribbon-text notranslate" translate="no">
            अपनी भाषा में उपयोग करें • ନିଜ ମାତୃଭାଷାରେ ବ୍ୟବହାର କରନ୍ତୁ • Regional Language:
          </span>
        </div>
        <div className="welcome-ribbon-chips notranslate" translate="no">
          {TOP_LANGUAGES.map((code) => {
            const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
            if (!lang) return null;
            const isSelected = currentLang === code;
            return (
              <button
                key={code}
                type="button"
                className={`welcome-lang-chip notranslate ${isSelected ? 'active' : ''}`}
                translate="no"
                onClick={() => languageService.setLanguage(code)}
              >
                {lang.native} ({lang.english})
              </button>
            );
          })}
          <button
            type="button"
            className="welcome-lang-more notranslate"
            translate="no"
            onClick={onOpenLanguageModal}
          >
            + All 10 Languages ▾
          </button>
        </div>
      </section>

      {/* Editorial Luxury Hero Section */}
      <section className="hero-banner">
        <div className="hero-ambient-glow" />
        
        <div className="hero-banner-top">
          <div className="hero-pill">
            <span className="hero-pill-pulse" />
            <Leaf size={14} className="hero-pill-icon" />
            <span>Navya Agritech • Hardware-Sealed Telemetry Protocol</span>
          </div>

          <div className={`hero-role-badge ${activeRole === 'FARMER' ? 'hero-role-badge--farmer' : 'hero-role-badge--dealer'}`}>
            <span className="hero-role-icon">{activeRole === 'FARMER' ? '👨‍🌾' : '🏢'}</span>
            <span className="hero-role-name">
              {activeRole === 'FARMER' ? 'Farmer Mode' : 'Mandi Dealer Mode'}
            </span>
            <span className="hero-role-divider">•</span>
            <span className="hero-role-detail">
              {activeRole === 'FARMER'
                ? 'Kisan Sambal Sahakari (Nashik)'
                : 'Apex Retail Hub (Vashi APMC)'}
            </span>
          </div>
        </div>

        <h1 className="hero-title">
          {activeRole === 'FARMER'
            ? 'Protect Produce Value with Verifiable Transit Telemetry'
            : 'Mandi Spoilage Audit & Fast Bilateral Redressal'}
        </h1>
        
        <p className="hero-subtitle">
          {activeRole === 'FARMER'
            ? 'Report transit heat abuse, rotting crates, or unfair payment cuts. Backed by Sensirion sensor logs, receive fresh replacement crates or instant credit notes directly from buyers.'
            : 'Audit arriving consignments against farm-gate packing sensor baselines. Propose fair replacement crates or credit note deductions to resolve claims instantly and keep trade moving.'}
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
                {activeRole === 'FARMER' ? '🌿 File Quality Claim' : '📦 Report Arriving Spoilage'}
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
                {activeRole === 'FARMER' ? '📋 My Filed Claims' : '📥 Arriving Spoilage Inbox'}
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

        {/* Institutional Trust Metrics Strip */}
        <div className="hero-metrics-strip">
          <div className="hero-metric-item">
            <span className="hero-metric-val">99.8%</span>
            <span className="hero-metric-lbl">Sensor Verification Accuracy</span>
          </div>
          <div className="hero-metric-divider" />
          <div className="hero-metric-item">
            <span className="hero-metric-val">&lt; 4 Hours</span>
            <span className="hero-metric-lbl">Avg Mandi Settlement SLA</span>
          </div>
          <div className="hero-metric-divider" />
          <div className="hero-metric-item">
            <span className="hero-metric-val">₹12.4 Lakh</span>
            <span className="hero-metric-lbl">Escrow Claims Settled</span>
          </div>
          <div className="hero-metric-divider" />
          <div className="hero-metric-item">
            <span className="hero-metric-val">Zero</span>
            <span className="hero-metric-lbl">Paperwork Dispute Redressal</span>
          </div>
        </div>
      </section>

      {/* How It Works (In 3 Simple Steps) */}
      <section className="steps-section">
        <div className="steps-header">
          <span className="steps-eyebrow">Fair & Objective Process</span>
          <h2 className="steps-section-title">
            How Redressal Works in 3 Simple Steps
          </h2>
          <p className="steps-section-desc">
            Eliminating subjective arguments between growers and buyers through cryptographic crate passporting
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
            <h3 className="step-title">Scan Crate or Pick Batch</h3>
            <p className="step-desc">
              Scan the physical QR tag on any crate to instantly link packing sensor baselines and transit logs.
            </p>
          </div>

          <div className="step-item">
            <div className="step-top-row">
              <div className="step-number step-number--2">02</div>
              <div className="step-icon-badge">
                <Camera size={18} />
              </div>
            </div>
            <h3 className="step-title">Capture Defect Evidence</h3>
            <p className="step-desc">
              Snap high-resolution photos of spoiled fruit or transit bruises. AI checks match sensor stress curves.
            </p>
          </div>

          <div className="step-item">
            <div className="step-top-row">
              <div className="step-number step-number--3">03</div>
              <div className="step-icon-badge">
                <Shield size={18} />
              </div>
            </div>
            <h3 className="step-title">Get Replacement or Discount</h3>
            <p className="step-desc">
              Buyer reviews verified telemetry proof and sends fresh crates or immediate credit note payouts.
            </p>
          </div>
        </div>
      </section>

      {/* AI Shelf-Life Accuracy CTA Banner */}
      <section className="rate-cta-banner">
        <div className="rate-cta-content">
          <div className="rate-cta-icon-box">
            <Award size={26} className="rate-award-icon" />
          </div>
          <div className="rate-cta-text-group">
            <div className="rate-cta-title-row">
              <h3 className="rate-cta-title">
                Train AI Shelf-Life Engine & Earn Rewards
              </h3>
              <span className="rate-cta-badge">
                🪙 Earn +50 Mandi Credits
              </span>
            </div>
            <p className="rate-cta-desc">
              Help train Navya's Sensirion-driven decay prediction model by rating whether our arrival estimate matched physical produce condition.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary rate-cta-btn"
          onClick={() => onOpenRateModal && onOpenRateModal()}
        >
          <span>Rate Accuracy Now</span>
          <ArrowRight size={15} />
        </button>
      </section>

      {/* Recent Quality Issues Workbench */}
      <section className="recent-issues-section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Active Discrepancy Stream</div>
            <h2 className="section-title">Recent Quality Claims & Audits</h2>
            <p className="section-desc">Click on any ticket to inspect sensor logs and bilateral settlement offers</p>
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

                  {/* Hardware Telemetry Preview Pill */}
                  <div className="dispute-sensor-pill">
                    <Activity size={12} className="dispute-sensor-icon" />
                    <span>Sensirion SHT40 Hardware Sealed • Transit Peak: 21.4°C</span>
                  </div>
                </div>
              </div>

              <div className="dispute-action-col">
                <button className="btn-secondary dispute-view-btn">
                  <span>Review Claim</span>
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
