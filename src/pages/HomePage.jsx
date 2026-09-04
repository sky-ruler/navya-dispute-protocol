import React from 'react';
import { 
  FileText, 
  QrCode, 
  UploadCloud, 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Sparkles,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export const HomePage = ({ setCurrentView, onSelectDispute, disputes, activeRole }) => {
  const pendingCount = disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION').length;
  const resolvedCount = disputes.filter(d => d.status === 'RESOLVED').length;

  return (
    <div className="home-page-container">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Sparkles size={13} />
          <span>Navya Agritech Protocol • SIH 2026</span>
        </div>
        <h1 className="hero-title">
          Verifiable Post-Harvest Produce Dispute & Redressal Protocol
        </h1>
        <p className="hero-subtitle">
          Eliminating arbitrary quality deductions and mistrust between farmers, aggregators, and dealers. 
          Resolve spoilage and transit damage claims with objective SGP30 gas telemetry and environmental audit trails.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button className="btn-primary" onClick={() => setCurrentView('file-complaint')}>
            <UploadCloud size={16} />
            File a Quality Claim
          </button>
          <button 
            className="btn-secondary" 
            style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
            onClick={() => setCurrentView('inbox')}
          >
            <Inbox size={16} />
            Open Claims Inbox ({pendingCount} Actionable)
          </button>
        </div>

        <div className="hero-stats-row">
          <div className="stat-item">
            <span className="stat-val">98.4%</span>
            <span className="stat-label">Bilateral Resolution Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">&lt; 3.5 hrs</span>
            <span className="stat-label">Avg. Claim Settlement Time</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">₹4,80,000+</span>
            <span className="stat-label">Farmer Value Protected</span>
          </div>
          <div className="stat-item">
            <span className="stat-val">100%</span>
            <span className="stat-label">Sensor-Audited Claims</span>
          </div>
        </div>
      </section>

      {/* 3 Input Modalities Highlight */}
      <div className="section-header">
        <div>
          <h2 className="section-title">How Would You Like to File Your Claim?</h2>
          <p className="section-desc">Choose from three fast, verifiable methods to identify your produce batch</p>
        </div>
      </div>

      <div className="action-cards-grid">
        <div className="action-card" onClick={() => setCurrentView('file-complaint')}>
          <div className="card-icon-box green">
            <FileText size={24} />
          </div>
          <h3 className="card-title">1. Enter Batch ID</h3>
          <p className="card-text">
            Type or search any registered Navya Batch ID (e.g. <code>NAV-2026-APL-409</code>) to instantly pull farm-gate quality scores, harvest date, and baseline TVOC.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
            Start with Batch ID <ArrowRight size={14} />
          </div>
        </div>

        <div className="action-card" onClick={() => setCurrentView('file-complaint')}>
          <div className="card-icon-box bronze">
            <QrCode size={24} />
          </div>
          <h3 className="card-title">2. Scan Produce QR Passport</h3>
          <p className="card-text">
            Use your phone or webcam to scan the cryptographic QR code affixed to any produce crate or upload a QR snapshot to load telemetry in seconds.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--navya-bronze-dark)' }}>
            Scan Crate Passport <ArrowRight size={14} />
          </div>
        </div>

        <div className="action-card" onClick={() => setCurrentView('file-complaint')}>
          <div className="card-icon-box blue">
            <UploadCloud size={24} />
          </div>
          <h3 className="card-title">3. Upload Navya Batch Report</h3>
          <p className="card-text">
            Drag & drop your official inspection JSON certificate or cold-chain export. Our parser automatically auto-fills all sensor benchmarks.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--navya-info)' }}>
            Upload Report Document <ArrowRight size={14} />
          </div>
        </div>
      </div>

      {/* 3 Step Redressal Flow */}
      <section style={{ 
        background: '#ffffff', 
        border: '1px solid var(--border-subtle)', 
        borderRadius: 'var(--radius-lg)', 
        padding: '32px',
        marginBottom: '36px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--navya-bronze-dark)' }}>
            Objective Truth Protocol
          </span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navya-forest-800)', marginTop: '4px' }}>
            Simple, Transparent Farmer-Dealer Redressal
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
            A fair dispute mechanism designed to end subjective mandi rejections through verifiable data.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navya-forest-800)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '15px',
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '4px' }}>
                Farmer or Dealer Files Claim
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                If produce arrives damaged, spoiled, or chemically adulterated, upload photo proof and specify the defect category.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navya-bronze)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '15px',
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '4px' }}>
                Objective Telemetry Check
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Navya compares arrival condition against farm-gate SGP30 gas baselines and SHT31 temperature logs to identify root cause.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '14px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navya-forest-400)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '15px',
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '4px' }}>
                One-Click Action & Feedback
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Dealer reviews claim, authorizes credit notes or replacement batches, and both parties record bilateral feedback.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Disputes Feed */}
      <div className="section-header">
        <div>
          <h2 className="section-title">Recent Dispute & Feedback Tickets</h2>
          <p className="section-desc">Active resolution tickets across APMC mandis and logistics hubs</p>
        </div>
        <button className="btn-secondary" onClick={() => setCurrentView('inbox')}>
          View All ({disputes.length})
        </button>
      </div>

      <div className="disputes-list">
        {disputes.slice(0, 3).map((d) => (
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
                  <span className="dispute-crop-name">{d.crop} ({d.variety})</span>
                  <StatusBadge status={d.status} />
                </div>
                <div className="dispute-desc-snippet">
                  {d.defectTitle}: {d.description}
                </div>
                <div className="dispute-tags-row">
                  <span>Batch: <strong>{d.batchId}</strong></span>
                  <span>•</span>
                  <span>{d.affectedCrates} Crates ({d.affectedKg} kg)</span>
                  <span>•</span>
                  <span>Filed: {d.filingDate}</span>
                </div>
              </div>
            </div>

            <div className="dispute-action-col">
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                ₹{d.estimatedDisputeAmountInr?.toLocaleString('en-IN')}
              </span>
              <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                Review Ticket →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
