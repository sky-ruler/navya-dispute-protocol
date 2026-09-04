import React, { useState } from 'react';
import { X, Star, ThumbsUp, ShieldCheck, Sparkles } from 'lucide-react';

export const FeedbackModal = ({ isOpen, onClose, dispute, onFeedbackSubmit }) => {
  if (!isOpen || !dispute) return null;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = {
      rating,
      comment: comment || "Resolution accepted. Telemetry record verified and settlement credited successfully.",
      submittedAt: new Date().toISOString()
    };

    onFeedbackSubmit(dispute.id, 'RESOLVED', null, feedbackData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="rate-modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '500px' }}
      >
        <div className="rate-modal-top-accent" />

        {/* Modal Header */}
        <div className="rate-modal-header">
          <div className="rate-header-left">
            <div 
              className="rate-header-icon-box" 
              style={{ background: 'linear-gradient(135deg, var(--navya-bronze) 0%, #a2653e 100%)' }}
            >
              <Star size={20} />
            </div>
            <div>
              <div className="rate-header-tag" style={{ color: 'var(--navya-bronze-dark)' }}>
                <Sparkles size={11} />
                Bilateral Verification
              </div>
              <div className="rate-header-title">Close Ticket & Feedback</div>
              <div className="rate-header-subtitle">
                Rating for Ticket #{dispute.id} • {dispute.crop}
              </div>
            </div>
          </div>
          <button className="rate-close-btn" onClick={onClose} title="Close dialog">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Modal Body */}
          <div className="rate-modal-body" style={{ gap: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navya-forest-800)', marginTop: '4px' }}>
              How satisfied are you with the resolution process?
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '-8px' }}>
              Your bilateral rating directly calibrates the Navya Mandi Trust Score.
            </div>

            {/* Interactive Stars */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '6px 0' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '32px',
                    lineHeight: 1,
                    padding: '2px',
                    color: (hoverRating || rating) >= star ? '#f59e0b' : '#d1d5db',
                    transition: 'transform 0.15s ease',
                    transform: (hoverRating || rating) >= star ? 'scale(1.2)' : 'scale(1)'
                  }}
                  aria-label={`${star} star`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="form-group" style={{ textAlign: 'left', marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Feedback Remarks / Settlement Notes</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share feedback on counterparty speed, communication, and settlement fairness..."
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '10px',
              background: 'var(--navya-success-bg)',
              border: '1px solid var(--navya-success-border)',
              fontSize: '12px',
              color: 'var(--navya-forest-800)',
              textAlign: 'left',
              lineHeight: 1.45
            }}>
              <ShieldCheck size={18} color="var(--navya-success)" style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>
                By submitting, both parties agree to mark Ticket #{dispute.id} as <strong>Officially Resolved</strong>. This resolution will be recorded in the system.
              </span>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="rate-modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '13px' }}>
              Cancel
            </button>
            <button type="submit" className="btn-bronze" style={{ fontSize: '13px' }}>
              <ThumbsUp size={15} />
              Submit Bilateral Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
