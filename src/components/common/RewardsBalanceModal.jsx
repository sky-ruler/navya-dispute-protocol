import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Coins, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Copy, 
  Check,
  ShieldCheck,
  Gift
} from 'lucide-react';
import { rewardService } from '../../services/rewardService';

export const RewardsBalanceModal = ({ isOpen, onClose, userPoints = 150 }) => {
  if (!isOpen) return null;

  const [isRedeemed, setIsRedeemed] = useState(false);
  const [copied, setCopied] = useState(false);

  const pendingPoints = rewardService.getPendingPoints();
  const logs = rewardService.getFeedbackLogs();
  const inrValue = Math.floor(userPoints / 2);
  const voucherCode = `NAVYA-MANDI-${inrValue > 0 ? inrValue : 'REWARD'}`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(voucherCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleRedeemClick = () => {
    setIsRedeemed(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="rate-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        {/* Top Gold Ribbon */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 50%, var(--navya-forest-800) 100%)', flexShrink: 0 }} />

        {/* Header */}
        <div className="rate-modal-header">
          <div className="rate-header-left">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)',
              border: '1.5px solid #f59e0b',
              color: '#92400e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              flexShrink: 0
            }}>
              🪙
            </div>
            <div>
              <div className="rate-header-tag" style={{ color: '#b45309' }}>
                <Sparkles size={11} />
                Navya Mandi Credits & Rewards
              </div>
              <div className="rate-header-title">Account Balance</div>
              <div className="rate-header-subtitle">
                Reward credits earned from verified produce redressals
              </div>
            </div>
          </div>
          <button className="rate-close-btn" onClick={onClose} title="Close dialog">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="rate-modal-body" style={{ gap: '14px' }}>
          {/* Main Balance Display Card */}
          <div style={{
            background: 'linear-gradient(135deg, #003d2c 0%, #00261b 100%)',
            borderRadius: 'var(--radius-md)',
            padding: '18px 20px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)',
            flexShrink: 0
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#a7d7c5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Available Verified Balance
              </div>
              <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1.1 }}>
                {userPoints} <span style={{ fontSize: '16px', fontWeight: 600, color: '#fcd34d' }}>Points</span>
              </div>
              <div style={{ fontSize: '12.5px', color: '#dcefdc', marginTop: '3px', fontWeight: 500 }}>
                ≈ ₹{inrValue} Mandi Scan Discount Credit
              </div>
            </div>

            {pendingPoints > 0 && (
              <div style={{
                background: 'rgba(252, 211, 77, 0.15)',
                border: '1px solid rgba(252, 211, 77, 0.35)',
                borderRadius: '10px',
                padding: '8px 12px',
                textAlign: 'right',
                flexShrink: 0
              }}>
                <div style={{ fontSize: '9.5px', color: '#fef3c7', textTransform: 'uppercase', fontWeight: 700 }}>
                  Under Review
                </div>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#fcd34d', marginTop: '1px' }}>
                  +{pendingPoints} pts
                </div>
                <div style={{ fontSize: '10px', color: '#e5e7eb' }}>
                  Pending telemetry
                </div>
              </div>
            )}
          </div>

          {/* Dedicated Redeem Now Section */}
          <div style={{
            background: '#ffffff',
            border: isRedeemed ? '1.5px solid #10b981' : '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 18px',
            boxShadow: '0 2px 8px rgba(0, 38, 27, 0.04)',
            flexShrink: 0
          }}>
            {!isRedeemed ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Gift size={16} color="var(--navya-forest-700)" />
                  <span style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                    Redeem Credits on Main Navya Platform
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.45, margin: '0 0 12px 0' }}>
                  Convert your available {userPoints} points into an instant ₹{inrValue} discount voucher applicable towards digital lot passports, chemical testing, or sensor scans at any partner APMC mandi.
                </p>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleRedeemClick}
                  disabled={userPoints <= 0}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '10px 16px',
                    fontSize: '13px',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                    boxShadow: '0 3px 10px rgba(217, 119, 6, 0.22)'
                  }}
                >
                  <Gift size={15} />
                  <span>Redeem Now (₹{inrValue} Voucher)</span>
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 700, fontSize: '12.5px' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Instant Discount Voucher Active</span>
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    background: '#ecfdf5',
                    color: '#065f46',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    border: '1px solid #a7f3d0'
                  }}>
                    Value: ₹{inrValue} OFF
                  </span>
                </div>

                {/* Voucher Code Box */}
                <div style={{
                  background: '#f8fafc',
                  border: '1.5px dashed #059669',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                      Voucher Code
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 800, color: '#065f46', letterSpacing: '0.05em' }}>
                      {voucherCode}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCopyCode}
                    style={{ padding: '6px 12px', fontSize: '11.5px', gap: '5px' }}
                  >
                    {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  Use this promo code at checkout on the main Navya website (<strong>navya.agritech</strong>) to deduct ₹{inrValue} from your next produce scan invoice.
                </div>
              </div>
            )}
          </div>

          {/* Recent Rewards Activity */}
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Recent Rewards Activity
            </div>

            {logs.length === 0 ? (
              <div style={{
                padding: '14px',
                textAlign: 'center',
                background: 'var(--bg-surface-subtle)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)'
              }}>
                No ratings submitted yet. Verified produce reviews earn up to +50 points.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
                {logs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11.5px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                        {log.crop} ({log.batchId})
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '10.5px' }}>
                        {log.timestamp} • Rated {log.accuracyRating} Stars
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '10.5px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: '12px',
                        background: log.status === 'PENDING_VERIFICATION' ? '#fffbeb' : 'var(--navya-success-bg)',
                        color: log.status === 'PENDING_VERIFICATION' ? '#92400e' : 'var(--navya-success)',
                        border: `1px solid ${log.status === 'PENDING_VERIFICATION' ? '#fde68a' : 'var(--navya-success-border)'}`
                      }}>
                        {log.status === 'PENDING_VERIFICATION' ? '⏳ Under Review' : '✅ Verified (+50)'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="rate-modal-footer">
          <div className="rate-footer-shield">
            <ShieldCheck size={15} color="var(--navya-forest-700)" />
            <span>Verified Redressal Wallet</span>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '12.5px', padding: '7px 18px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
