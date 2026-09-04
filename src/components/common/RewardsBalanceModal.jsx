import React from 'react';
import { 
  X, 
  Award, 
  Coins, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  BrainCircuit, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { rewardService } from '../../services/rewardService';

export const RewardsBalanceModal = ({ isOpen, onClose, userPoints = 150, onOpenRateModal }) => {
  if (!isOpen) return null;

  const pendingPoints = rewardService.getPendingPoints();
  const logs = rewardService.getFeedbackLogs();
  const inrValue = Math.floor(userPoints / 2);

  const handleStartRating = () => {
    onClose();
    if (onOpenRateModal) {
      onOpenRateModal();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="rate-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Top Gold Ribbon */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 50%, var(--navya-forest-800) 100%)' }} />

        {/* Header */}
        <div className="rate-modal-header">
          <div className="rate-header-left">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)',
              border: '1.5px solid #f59e0b',
              color: '#92400e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)',
              flexShrink: 0
            }}>
              🪙
            </div>
            <div>
              <div className="rate-header-tag" style={{ color: '#b45309' }}>
                <Sparkles size={12} />
                Navya Credits & Mandi Rewards
              </div>
              <div className="rate-header-title">Account Balance</div>
              <div className="rate-header-subtitle">
                Reward credits earned via AI reinforcement learning
              </div>
            </div>
          </div>
          <button className="rate-close-btn" onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>

        <div className="rate-modal-body" style={{ gap: '16px' }}>
          {/* Main Balance Display Card */}
          <div style={{
            background: 'linear-gradient(135deg, #003d2c 0%, #00261b 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '22px 24px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div>
              <div style={{ fontSize: '11.5px', color: '#a7d7c5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Available Verified Balance
              </div>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginTop: '2px', lineHeight: 1.1 }}>
                {userPoints} <span style={{ fontSize: '18px', fontWeight: 600, color: '#fcd34d' }}>Points</span>
              </div>
              <div style={{ fontSize: '13px', color: '#dcefdc', marginTop: '4px', fontWeight: 500 }}>
                ≈ ₹{inrValue} Mandi Scan Discount Credit
              </div>
            </div>

            {pendingPoints > 0 && (
              <div style={{
                background: 'rgba(252, 211, 77, 0.15)',
                border: '1px solid rgba(252, 211, 77, 0.35)',
                borderRadius: '12px',
                padding: '10px 14px',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '10px', color: '#fef3c7', textTransform: 'uppercase', fontWeight: 700 }}>
                  Under Review
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#fcd34d', marginTop: '1px' }}>
                  +{pendingPoints} pts
                </div>
                <div style={{ fontSize: '10.5px', color: '#e5e7eb' }}>
                  Pending telemetry check
                </div>
              </div>
            )}
          </div>

          {/* Redemption on Main Website Card */}
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 18px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'var(--navya-success-bg)',
              color: 'var(--navya-forest-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              flexShrink: 0
            }}>
              🎁
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--navya-forest-800)', marginBottom: '3px' }}>
                Redeem on Main Navya Platform
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                Points can be redeemed as instant rupee discounts on the main Navya website for produce scanning, rapid chemical testing, and digital lot passports.
              </p>
            </div>
          </div>

          {/* How to Earn More Card */}
          <div style={{
            background: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BrainCircuit size={20} color="var(--navya-forest-800)" />
              <div>
                <div style={{ fontSize: '13.5px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                  Earn Up to +50 Points per Batch
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Rate shelf-life accuracy on your produce to help train the AI model.
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handleStartRating}
              style={{ padding: '8px 14px', fontSize: '12.5px', flexShrink: 0 }}
            >
              Rate a Batch
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Recent Rewards Activity / Telemetry Logs */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Recent Rewards Activity
            </div>

            {logs.length === 0 ? (
              <div style={{
                padding: '16px',
                textAlign: 'center',
                background: 'var(--bg-surface-subtle)',
                borderRadius: '8px',
                fontSize: '12.5px',
                color: 'var(--text-muted)'
              }}>
                No batch ratings submitted yet. Rate your first produce batch to earn +50 points!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                {logs.slice(0, 4).map((log) => (
                  <div
                    key={log.id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '12px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                        {log.crop} ({log.batchId})
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
                        {log.timestamp} • Rated {log.accuracyRating} Stars
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: log.status === 'PENDING_VERIFICATION' ? '#fffbeb' : 'var(--navya-success-bg)',
                        color: log.status === 'PENDING_VERIFICATION' ? '#92400e' : 'var(--navya-success)',
                        border: `1px solid ${log.status === 'PENDING_VERIFICATION' ? '#fde68a' : 'var(--navya-success-border)'}`
                      }}>
                        {log.status === 'PENDING_VERIFICATION' ? '⏳ Under Review (+50)' : '✅ Verified (+50)'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rate-modal-footer">
          <div className="rate-footer-shield">
            <ShieldCheck size={16} color="var(--navya-forest-700)" />
            <span>Verified Redressal Wallet</span>
          </div>
          <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '13px', padding: '8px 18px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
