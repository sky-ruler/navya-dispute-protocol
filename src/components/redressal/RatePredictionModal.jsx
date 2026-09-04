import React, { useState } from 'react';
import { X, Sparkles, Star, CheckCircle, Award, BrainCircuit, ShieldCheck, Clock, Info } from 'lucide-react';
import { rewardService } from '../../services/rewardService';

export const RatePredictionModal = ({ isOpen, onClose, batch, onRewardEarned }) => {
  if (!isOpen || !batch) return null;

  const [rating, setRating] = useState(5);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rewardResult, setRewardResult] = useState(null);

  const predictedDays = batch.predictedShelfLifeDays || 7;

  const ratingDescriptions = {
    1: '1 Star — Very Inaccurate (produce spoiled far earlier than predicted)',
    2: '2 Stars — Below Expectation (quality degraded faster than expected)',
    3: '3 Stars — Acceptable (close to estimate with minor deviation)',
    4: '4 Stars — Accurate (held up well as predicted)',
    5: '5 Stars — Highly Accurate (shelf-life matched prediction perfectly)'
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = rewardService.submitPredictionFeedback({
      batchId: batch.id,
      crop: batch.crop,
      predictedShelfLifeDays: predictedDays,
      accuracyRating: rating,
      userNote: note || ratingDescriptions[rating]
    });

    setRewardResult(result);
    setIsSubmitted(true);
    if (onRewardEarned) {
      onRewardEarned(result);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setRewardResult(null);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--navya-forest-800), var(--navya-forest-600))',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BrainCircuit size={18} />
            </div>
            <div>
              <div className="modal-title" style={{ fontSize: '16px' }}>Rate AI Shelf-Life Prediction</div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Help train Navya AI • Earn verified discount credits
              </div>
            </div>
          </div>
          <button className="evidence-remove-btn" onClick={handleClose} style={{ position: 'static' }}>
            <X size={15} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Batch Banner */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-surface-subtle)',
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{batch.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--navya-forest-800)', fontSize: '14px' }}>
                      {batch.crop} ({batch.id})
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Farm Gate Quality: <strong>{batch.certifiedGrade || 'Grade A'}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    AI Predicted Shelf Life
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                    {predictedDays} Days
                  </div>
                </div>
              </div>

              {/* Unified Star Rating (1-5) */}
              <div className="form-group" style={{ textAlign: 'center', margin: '14px 0 16px' }}>
                <label className="form-label" style={{ fontSize: '13.5px', marginBottom: '8px' }}>
                  How accurate was the {predictedDays}-day shelf life estimate?
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        fontSize: '30px',
                        color: rating >= star ? '#f59e0b' : '#d1d5db',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                        transform: rating >= star ? 'scale(1.12)' : 'scale(1)',
                        padding: '2px 4px'
                      }}
                      title={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <div style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: rating <= 2 ? 'var(--navya-danger)' : rating === 3 ? 'var(--navya-warning)' : 'var(--navya-success)',
                  minHeight: '20px'
                }}>
                  {ratingDescriptions[rating]}
                </div>
              </div>

              {/* Detailed Description / Observations */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ fontSize: '12.5px' }}>
                  Observations & Storage Notes (Optional):
                </label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  style={{ fontSize: '12.5px', padding: '8px 12px', resize: 'vertical' }}
                  placeholder="e.g. Crate arrived in good condition, lasted 2 extra days in cool shade / or decayed early due to transit heat..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Clear Verification & Redemption Notice */}
              <div style={{
                background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                border: '1px solid #fcd34d',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '12px',
                color: '#92400e',
                lineHeight: 1.45,
                display: 'flex',
                gap: '10px'
              }}>
                <Info size={16} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 800, color: '#78350f', marginBottom: '2px' }}>
                    Reward & Verification Policy
                  </div>
                  <div>
                    Our agronomy team & model verify submitted ratings against crate telemetry. Once verified, you will receive up to <strong>+50 points (₹25 credit)</strong>.
                  </div>
                  <div style={{ marginTop: '4px', color: '#b45309', fontWeight: 600 }}>
                    🎁 Verified points can be redeemed as discounts on the main Navya website for scan credits and digital passports.
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--navya-bronze-dark)' }}>
                <ShieldCheck size={16} />
                Subject to Verification
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" className="btn-secondary" onClick={handleClose} style={{ fontSize: '13px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '13px' }}>
                  Submit for Verification
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="modal-body" style={{ textAlign: 'center', padding: '36px 24px' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fef3c7',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Clock size={32} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)', marginBottom: '6px' }}>
              Rating Submitted for Verification! ⏳
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto 18px', lineHeight: 1.5 }}>
              Thank you! Your rating is queued for Navya's reinforcement learning model. Our team will verify the batch observations against sensor telemetry.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              padding: '10px 18px',
              borderRadius: '20px',
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#065f46',
              marginBottom: '16px'
            }}>
              <Award size={18} color="#059669" />
              Potential Reward: Up to +50 Points (₹25 Credit) Once Verified
            </div>

            <div style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              maxWidth: '360px',
              margin: '0 auto 24px',
              background: 'var(--bg-surface-subtle)',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              💡 <strong>Redemption Info:</strong> Verified points can be redeemed later as instant discounts on the main Navya website for produce scans and lot certificates.
            </div>

            <div>
              <button className="btn-primary" onClick={handleClose} style={{ margin: '0 auto', fontSize: '13px' }}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
