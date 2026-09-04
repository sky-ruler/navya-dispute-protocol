import React, { useState } from 'react';
import { X, Star, MessageSquare, ThumbsUp, ShieldCheck } from 'lucide-react';

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
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--navya-bronze)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Star size={18} />
            </div>
            <div>
              <div className="modal-title">Close Ticket & Submit Feedback</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Bilateral rating for Ticket {dispute.id}
              </div>
            </div>
          </div>
          <button className="evidence-remove-btn" onClick={onClose} style={{ position: 'static' }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navya-forest-800)', marginBottom: '8px' }}>
              How satisfied are you with the resolution process?
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Your rating updates the Navya Ecosystem Bilateral Trust Score.
            </div>

            {/* Star selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    fontSize: '28px',
                    color: (hoverRating || rating) >= star ? '#f59e0b' : '#d1d5db',
                    transition: 'transform 0.15s ease',
                    transform: (hoverRating || rating) >= star ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Feedback Notes / Agreement Remarks</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your feedback regarding the counterparty's speed, communication, and settlement fairness..."
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'var(--navya-success-bg)',
              border: '1px solid var(--navya-success-border)',
              fontSize: '12px',
              color: 'var(--navya-forest-800)',
              textAlign: 'left'
            }}>
              <ShieldCheck size={16} color="var(--navya-success)" style={{ flexShrink: 0 }} />
              <span>
                By submitting, both parties consent to mark Ticket {dispute.id} as <strong>Officially Resolved</strong> with immutable proof on the Navya audit log.
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-bronze">
              <ThumbsUp size={15} />
              Submit Bilateral Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
