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
  onOpenRateModal 
}) => {
  const pendingCount = disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION').length;

  return (
    <div className="home-page-container">
      {/* Simple, Welcoming Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #003d2c 0%, #00261b 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px 32px',
        color: '#ffffff',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.12)',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--navya-lime-tint)',
          marginBottom: '14px'
        }}>
          <Leaf size={14} />
          <span>Navya Agritech • Produce Quality Redressal</span>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1.25, color: '#ffffff', marginBottom: '10px' }}>
          Received Damaged or Spoiled Produce?
        </h1>
        <p style={{ fontSize: '15px', color: '#c2d5cd', maxWidth: '640px', lineHeight: 1.5, marginBottom: '24px' }}>
          Report quality issues directly to your dealer or farmer. Backed by Navya sensor checks, both parties see the truth so problems get solved fairly and quickly.
        </p>

        {/* Big 2 Core Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div 
            onClick={() => setCurrentView('file-complaint')}
            style={{
              background: '#ffffff',
              color: 'var(--navya-forest-800)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800 }}>
                🌿 Report a Problem
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Upload photos & get replacement or discount
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navya-forest-800)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <PlusCircle size={20} />
            </div>
          </div>

          <div 
            onClick={() => setCurrentView('inbox')}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease'
            }}
          >
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>
                📋 View My Complaints
              </div>
              <div style={{ fontSize: '12.5px', color: '#c2d5cd', marginTop: '2px' }}>
                {pendingCount} complaint(s) waiting for response
              </div>
            </div>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Inbox size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* AI Reinforcement Learning Feedback Card */}
      <section style={{
        background: 'linear-gradient(135deg, #fef9ee 0%, #edf8f2 100%)',
        border: '1px solid #fed7aa',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--navya-forest-800)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            flexShrink: 0
          }}>
            🧠
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                Help Train Navya AI & Earn Scan Credits
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, background: '#f59e0b', color: '#fff', padding: '2px 8px', borderRadius: '12px' }}>
                Up to 50 Pts (₹25)
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px', maxWidth: '560px' }}>
              Rate the accuracy of our shelf-life predictions. Once verified by our team, earned points can be redeemed as instant discounts on the main Navya website!
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-bronze"
          onClick={() => onOpenRateModal && onOpenRateModal()}
          style={{ padding: '9px 18px', fontSize: '13px', flexShrink: 0 }}
        >
          Rate Accuracy
        </button>
      </section>

      {/* Super Simple 3 Steps */}
      <section style={{
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 24px',
        marginBottom: '28px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)', marginBottom: '18px', textAlign: 'center' }}>
          How It Works (In 3 Simple Steps)
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--navya-success-bg)',
              color: 'var(--navya-forest-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontWeight: 800,
              fontSize: '16px'
            }}>
              1
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
              Scan Crate or Pick Batch
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Simply scan the QR code on your crate or pick the lot from the list.
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--navya-bronze-light)',
              color: 'var(--navya-bronze-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontWeight: 800,
              fontSize: '16px'
            }}>
              2
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
              Take a Photo
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Show the damaged or spoiled fruits so the dealer clearly sees the issue.
            </div>
          </div>

          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--navya-success-bg)',
              color: 'var(--navya-forest-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 10px',
              fontWeight: 800,
              fontSize: '16px'
            }}>
              3
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
              Get Replacement or Discount
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
              Dealer reviews the sensor proof and sends fresh crates or a price discount.
            </div>
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <div className="section-header" style={{ marginBottom: '14px' }}>
        <div>
          <h2 className="section-title" style={{ fontSize: '20px' }}>Recent Quality Issues</h2>
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
            style={{ padding: '16px 20px' }}
          >
            <div className="dispute-main-col">
              <div className="crop-badge-avatar" style={{ width: '42px', height: '42px', fontSize: '20px' }}>
                {d.emoji}
              </div>
              <div className="dispute-meta-block">
                <div className="dispute-title-row" style={{ gap: '8px' }}>
                  <span className="dispute-id-code">{d.id}</span>
                  <span style={{ color: 'var(--text-subtle)' }}>•</span>
                  <span className="dispute-crop-name">{d.crop}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-body)', fontWeight: 600, marginTop: '2px' }}>
                  {d.defectTitle}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {d.affectedCrates} Crates • Batch: {d.batchId} • {d.filingDate}
                </div>
              </div>
            </div>

            <div className="dispute-action-col">
              <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
                View →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
