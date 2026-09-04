import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Award, 
  BrainCircuit, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Send,
  Calendar,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { rewardService } from '../../services/rewardService';

const QUICK_STORAGE_TAGS = [
  '❄️ Cold Storage (2–4°C)',
  '🌡️ Ambient Mandi (26°C)',
  '📦 Dry Corrugated Crates',
  '🚚 Transit Shock Delay',
  '💧 High Moisture Setting'
];

export const RatePredictionModal = ({ isOpen, onClose, batch, onRewardEarned }) => {
  if (!isOpen || !batch) return null;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rewardResult, setRewardResult] = useState(null);

  const predictedDays = batch.predictedShelfLifeDays || 7;
  const displayRating = hoverRating || rating;

  const ratingTiers = {
    1: { label: 'Critical Decay', desc: 'Produce spoiled far earlier than predicted (< 4 days)', tier: 'tier-low' },
    2: { label: 'Below Expectation', desc: 'Quality degraded faster than estimate (~6–8 days)', tier: 'tier-low' },
    3: { label: 'Acceptable Precision', desc: 'Held up close to estimate with minor deviation (~10 days)', tier: 'tier-mid' },
    4: { label: 'Accurate Prediction', desc: 'Produce held up well as predicted (~12 days)', tier: 'tier-high' },
    5: { label: 'Spot-On Precision', desc: 'Shelf life matched prediction and telemetry perfectly (12+ days)', tier: 'tier-high' }
  };

  const handleTagToggle = (tag) => {
    let nextTags;
    if (selectedTags.includes(tag)) {
      nextTags = selectedTags.filter(t => t !== tag);
    } else {
      nextTags = [...selectedTags, tag];
    }
    setSelectedTags(nextTags);

    // Sync into note
    const baseText = note.replace(/\[Tags:.*?\]/g, '').trim();
    if (nextTags.length > 0) {
      setNote(`${baseText} [Tags: ${nextTags.join(', ')}]`.trim());
    } else {
      setNote(baseText);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = rewardService.submitPredictionFeedback({
      batchId: batch.id,
      crop: batch.crop,
      predictedShelfLifeDays: predictedDays,
      accuracyRating: rating,
      userNote: note || ratingTiers[rating].desc
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
    setHoverRating(0);
    setSelectedTags([]);
    onClose();
  };

  const activeTierInfo = ratingTiers[displayRating] || ratingTiers[5];

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="rate-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Top Gradient Ribbon */}
        <div className="rate-modal-top-accent" />

        {/* Modal Header */}
        <div className="rate-modal-header">
          <div className="rate-header-left">
            <div className="rate-header-icon-box">
              <BrainCircuit size={22} strokeWidth={2.4} />
            </div>
            <div>
              <div className="rate-header-tag">
                <Sparkles size={12} />
                Reinforcement Learning Loop
              </div>
              <div className="rate-header-title">Rate Shelf-Life Precision</div>
              <div className="rate-header-subtitle">
                Validate Navya's AI prediction against actual harvest decay
              </div>
            </div>
          </div>
          <button className="rate-close-btn" onClick={handleClose} title="Close dialog">
            <X size={16} />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="rate-modal-body">
              {/* Produce Batch Passport Card */}
              <div className="rate-batch-card">
                <div className="rate-batch-info-left">
                  <span className="rate-crop-avatar">{batch.emoji}</span>
                  <div>
                    <div className="rate-batch-title">
                      {batch.crop} <span className="rate-batch-code">{batch.id}</span>
                    </div>
                    <div className="rate-batch-sub">
                      Certified: <strong style={{ color: 'var(--navya-success)' }}>{batch.certifiedGrade || 'Grade A Fresh'}</strong> • {batch.variety || 'Standard Lot'}
                    </div>
                  </div>
                </div>

                <div className="rate-predicted-pill">
                  <div className="rate-predicted-label">AI PREDICTED SHELF LIFE</div>
                  <div className="rate-predicted-value">{predictedDays} Days</div>
                </div>
              </div>

              {/* Star Rating Section */}
              <div className="rate-star-section">
                <div className="rate-star-prompt">
                  How accurate was Navya's {predictedDays}-day shelf life estimate?
                </div>

                <div className="rate-stars-row" onMouseLeave={() => setHoverRating(0)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="rate-star-btn"
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setRating(star)}
                      title={`${star} Star${star > 1 ? 's' : ''}`}
                    >
                      <Star
                        className="rate-star-icon"
                        fill={displayRating >= star ? '#f59e0b' : 'none'}
                        stroke={displayRating >= star ? '#d97706' : '#cbd5e1'}
                        strokeWidth={1.75}
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <div className={`rate-feedback-pill ${activeTierInfo.tier}`}>
                    <span>★ {displayRating}.0 — {activeTierInfo.label}:</span>
                    <span style={{ fontWeight: 500, opacity: 0.9 }}>{activeTierInfo.desc}</span>
                  </div>
                </div>
              </div>

              {/* Quick Storage Context Tags */}
              <div>
                <label className="form-label" style={{ fontSize: '12.5px', marginBottom: '6px' }}>
                  Storage Environment & Arrival Notes (Optional):
                </label>
                <div className="rate-quick-tags-row">
                  {QUICK_STORAGE_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        className={`rate-quick-tag ${isSelected ? 'active' : ''}`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>

                <textarea
                  className="rate-textarea"
                  rows={2}
                  placeholder="e.g. Crate arrived fresh; produce lasted 2 days longer under shade / or early decay in bottom layer..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Rewards & Verification Notice */}
              <div className="rate-policy-card">
                <div className="rate-policy-coin">🪙</div>
                <div style={{ flex: 1 }}>
                  <div className="rate-policy-title">
                    <span>Earn Up to +50 Verified Points (₹25 Value)</span>
                  </div>
                  <div className="rate-policy-text">
                    Ratings are verified by Navya's agronomy team & telemetry validation pipeline before credits are issued to ensure clean ML training data.
                  </div>
                  <div className="rate-policy-highlight">
                    <CheckCircle2 size={13} color="var(--navya-success)" />
                    Redeemable as instant discounts on the main Navya platform for produce scans and lot certificates.
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="rate-modal-footer">
              <div className="rate-footer-shield">
                <ShieldCheck size={16} color="var(--navya-forest-700)" />
                <span>Verified Feedback Protocol</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" className="btn-secondary" onClick={handleClose} style={{ fontSize: '13px', padding: '9px 16px' }}>
                  Cancel
                </button>
                <button type="submit" className="rate-submit-btn">
                  <span>Submit for Review</span>
                  <Send size={14} />
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="rate-confirm-container">
            <div className="rate-confirm-icon-box">
              <CheckCircle2 size={34} strokeWidth={2.4} />
            </div>

            <div className="rate-confirm-title">Rating Logged for Verification! ⏳</div>
            <div className="rate-confirm-desc">
              Your feedback for <strong>{batch.crop} ({batch.id})</strong> is queued for Navya's reinforcement learning model. Our quality team will cross-reference sensor telemetry.
            </div>

            <div className="rate-confirm-badge-row">
              <Award size={18} color="#b45309" />
              <span>Potential Reward: +50 Points (₹25 Credit) Once Verified</span>
            </div>

            <div className="rate-confirm-redemption-card">
              <div style={{ fontSize: '18px' }}>🎁</div>
              <div>
                <strong style={{ color: 'var(--navya-forest-800)', display: 'block', marginBottom: '2px' }}>
                  Redeemable on Main Navya Website
                </strong>
                Once reviewed, verified credits are deposited directly into your account and can be applied as discounts during produce scanning, lot certification, and digital passport issuance.
              </div>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handleClose}
              style={{ padding: '10px 28px', fontSize: '13.5px' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

