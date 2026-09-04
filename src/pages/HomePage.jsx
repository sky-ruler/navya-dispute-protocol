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
  HelpCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const HomePage = ({ 
  setCurrentView, 
  onSelectDispute, 
  disputes,
  onOpenRateModal,
  activeRole = 'DEALER'
}) => {
  const pendingCount = disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION').length;

  return (
    <div className="home-page-container">
      {/* Simple, Welcoming Banner */}
      <section className="hero-banner" style={{ marginBottom: '28px' }}>
        <div className="hero-banner-top" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div className="hero-pill">
            <Leaf size={14} />
            <span>Navya Agritech • Hardware-Backed Dispute Redressal</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: activeRole === 'FARMER' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.22)',
            border: `1px solid ${activeRole === 'FARMER' ? 'rgba(110, 231, 183, 0.4)' : 'rgba(252, 211, 77, 0.4)'}`,
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11.5px',
            fontWeight: 700,
            color: activeRole === 'FARMER' ? '#a7f3d0' : '#fde68a',
            flexWrap: 'wrap'
          }}>
            <span>{activeRole === 'FARMER' ? '👨‍🌾 Farmer View' : '🏢 Mandi Dealer View'}</span>
            <span className="hero-role-detail" style={{ opacity: 0.8, fontWeight: 500, color: '#f1f5f9' }}>
              {activeRole === 'FARMER'
                ? '• Connected as Ramesh Patil (Grower Member)'
                : '• Connected as Apex Retail Hub (Vashi APMC)'}
            </span>
          </div>
        </div>

        <h1 className="hero-title">
          {activeRole === 'FARMER'
            ? 'Protect Your Produce Value with Objective Telemetry'
            : 'Mandi Spoilage Audit & Fast Bilateral Redressal'}
        </h1>
        <p className="hero-subtitle">
          {activeRole === 'FARMER'
            ? 'Report transit heat abuse, rotting crates, or arbitrary payment cuts. Backed by Sensirion sensor checks, receive fresh replacement crates or fair price discounts directly from your buyer.'
            : 'Audit arriving consignments against farm-gate packing sensor baselines. Propose fair replacement crates or credit note deductions to resolve claims instantly and keep trade moving.'}
        </p>

        {/* Big 2 Core Actions */}
        <div className="hero-actions-grid">
          <div 
            onClick={() => setCurrentView('file-complaint')}
            className="hero-action-card hero-action-card--primary"
          >
            <div>
              <div className="hero-action-title">
                {activeRole === 'FARMER' ? '🌿 File Quality Claim' : '📦 Report Arriving Spoilage'}
              </div>
              <div className="hero-action-desc">
                {activeRole === 'FARMER'
                  ? 'Attach defect photos & request replacement crates'
                  : 'Report damaged delivery & propose invoice adjustment'}
              </div>
            </div>
            <div className="hero-action-icon">
              <PlusCircle size={20} />
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('inbox')}
            className="hero-action-card hero-action-card--ghost"
          >
            <div>
              <div className="hero-action-title" style={{ color: '#ffffff' }}>
                {activeRole === 'FARMER' ? '📋 My Filed Claims' : '📥 Arriving Spoilage Inbox'}
              </div>
              <div className="hero-action-desc" style={{ color: '#c2d5cd' }}>
                {activeRole === 'FARMER'
                  ? `${pendingCount} active claim(s) awaiting dealer solution`
                  : `${pendingCount} incoming claim(s) awaiting your settlement offer`}
              </div>
            </div>
            <div className="hero-action-icon hero-action-icon--ghost">
              <Inbox size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Super Simple 3 Steps */}
      <section className="steps-section">
        <h2 className="steps-section-title">
          How It Works (In 3 Simple Steps)
        </h2>

        <div className="steps-grid">
          <div className="step-item">
            <div className="step-number" style={{ background: 'var(--navya-success-bg)', color: 'var(--navya-forest-800)' }}>
              1
            </div>
            <div className="step-title">
              Scan Crate or Pick Batch
            </div>
            <div className="step-desc">
              Simply scan the QR code on your crate or pick the lot from the list.
            </div>
          </div>

          <div className="step-item">
            <div className="step-number" style={{ background: 'var(--navya-bronze-light)', color: 'var(--navya-bronze-dark)' }}>
              2
            </div>
            <div className="step-title">
              Take a Photo
            </div>
            <div className="step-desc">
              Show the damaged or spoiled fruits so the dealer clearly sees the issue.
            </div>
          </div>

          <div className="step-item">
            <div className="step-number" style={{ background: 'var(--navya-success-bg)', color: 'var(--navya-forest-800)' }}>
              3
            </div>
            <div className="step-title">
              Get Replacement or Discount
            </div>
            <div className="step-desc">
              Dealer reviews the sensor proof and sends fresh crates or a price discount.
            </div>
          </div>
        </div>
      </section>

      {/* Main Webpage Rating Pop-up Action Card */}
      <section className="rate-cta-banner">
        <div className="rate-cta-content">
          <div className="rate-cta-icon">
            ⭐
          </div>
          <div>
            <div className="rate-cta-title-row">
              <span className="rate-cta-title">
                Rate Produce Shelf-Life Accuracy
              </span>
              <span className="rate-cta-badge">
                Earn +50 Credits
              </span>
            </div>
            <div className="rate-cta-desc">
              Help train Navya's AI prediction model by rating whether our estimated shelf life matched your produce quality.
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-primary rate-cta-btn"
          onClick={() => onOpenRateModal && onOpenRateModal()}
        >
          <span>Rate Accuracy</span>
          <ArrowRight size={14} />
        </button>
      </section>

      {/* Recent Complaints */}
      <div className="section-header" style={{ marginBottom: '14px' }}>
        <div>
          <h2 className="section-title">Recent Quality Issues</h2>
          <p className="section-desc">Click on any ticket to see how it was resolved</p>
        </div>
        <button className="btn-secondary" onClick={() => setCurrentView('inbox')}>
          View All ({disputes.length})
        </button>
      </div>

      <div className="disputes-list">
        {disputes.map((d) => (
          <div 
            key={d.id} 
            className="dispute-item-card"
            onClick={() => onSelectDispute(d.id)}
          >
            <div className="dispute-main-col">
              <div className="crop-badge-avatar">
                {d.emoji}
              </div>
              <div className="dispute-meta-block">
                <div className="dispute-title-row">
                  <span className="dispute-id-code">{d.id}</span>
                  <span style={{ color: 'var(--text-subtle)' }}>•</span>
                  <span className="dispute-crop-name">{d.crop}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div className="dispute-defect-title">
                  {d.defectTitle}
                </div>
                <div className="dispute-meta-line">
                  {d.affectedCrates} Crates • Batch: {d.batchId} • {d.filingDate}
                </div>
              </div>
            </div>

            <div className="dispute-action-col">
              <button className="btn-secondary dispute-view-btn">
                View →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
