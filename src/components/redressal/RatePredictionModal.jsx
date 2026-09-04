import React, { useState } from 'react';
import { X, Sparkles, Star, CheckCircle, Award, BrainCircuit, ArrowRight } from 'lucide-react';
import { rewardService } from '../../services/rewardService';

export const RatePredictionModal = ({ isOpen, onClose, batch, onRewardEarned }) => {
  if (!isOpen || !batch) return null;

  const [actualOutcome, setActualOutcome] = useState('ACCURATE'); // SPOILED_EARLY | ACCURATE | LASTED_LONGER
  const [rating, setRating] = useState(4);
  const [note, setNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rewardResult, setRewardResult] = useState(null);

  const predictedDays = batch.predictedShelfLifeDays || 7;

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = rewardService.submitPredictionFeedback({
      batchId: batch.id,
      crop: batch.crop,
      predictedShelfLifeDays: predictedDays,
      actualOutcome,
      accuracyRating: rating,
      userNote: note || `Actual outcome: ${actualOutcome.replace('_', ' ')}`
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
                Help train Navya AI & earn +50 Points (₹25 Mandi Credit)
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

              {/* Question 1: How did it actually hold up? */}
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '13px' }}>
                  How did the produce actually hold up in real life?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  <div
                    onClick={() => setActualOutcome('SPOILED_EARLY')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: `1.5px solid ${actualOutcome === 'SPOILED_EARLY' ? 'var(--navya-warning)' : 'var(--border-medium)'}`,
                      background: actualOutcome === 'SPOILED_EARLY' ? 'var(--navya-warning-bg)' : '#ffffff',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>⚡</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--navya-forest-800)', marginTop: '2px' }}>
                      Spoiled Sooner
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>&lt; {predictedDays} days</div>
                  </div>

                  <div
                    onClick={() => setActualOutcome('ACCURATE')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: `1.5px solid ${actualOutcome === 'ACCURATE' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                      background: actualOutcome === 'ACCURATE' ? 'var(--navya-success-bg)' : '#ffffff',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>✅</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--navya-forest-800)', marginTop: '2px' }}>
                      Matched (~{predictedDays}d)
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Accurate AI</div>
                  </div>

                  <div
                    onClick={() => setActualOutcome('LASTED_LONGER')}
                    style={{
                      padding: '10px 8px',
                      borderRadius: '8px',
                      border: `1.5px solid ${actualOutcome === 'LASTED_LONGER' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                      background: actualOutcome === 'LASTED_LONGER' ? 'var(--navya-success-bg)' : '#ffffff',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontSize: '18px' }}>🌟</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--navya-forest-800)', marginTop: '2px' }}>
                      Lasted Longer
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>&gt; {predictedDays} days</div>
                  </div>
                </div>
              </div>

              {/* Question 2: Accuracy Stars */}
              <div className="form-group" style={{ textAlign: 'center', margin: '18px 0' }}>
                <label className="form-label" style={{ fontSize: '13px', marginBottom: '6px' }}>
                  Rate Prediction Accuracy (1–5 Stars)
                </label>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      style={{
                        fontSize: '26px',
                        color: rating >= star ? '#f59e0b' : '#d1d5db',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease',
                        transform: rating >= star ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Note */}
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Optional feedback for the ML training model:</label>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                  placeholder="e.g. Apples stayed fresh 2 days longer in cold storage..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: 'var(--navya-bronze-dark)' }}>
                <Award size={16} />
                Reward: +50 Pts (₹25 Credit)
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" className="btn-secondary" onClick={handleClose} style={{ fontSize: '13px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ fontSize: '13px' }}>
                  Submit Rating
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
              background: 'var(--navya-success-bg)',
              color: 'var(--navya-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CheckCircle size={32} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)', marginBottom: '6px' }}>
              Thank You! Ground-Truth Logged 🎉
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '340px', margin: '0 auto 18px' }}>
              Your feedback is queued for Navya's reinforcement learning decay regression model.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#fef3c7',
              border: '1px solid #fcd34d',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 800,
              color: '#92400e',
              marginBottom: '24px'
            }}>
              <Award size={18} />
              +50 Points Earned! Total: {rewardResult?.newTotalPoints} pts (₹{rewardResult?.newCreditsInr} Credit)
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
