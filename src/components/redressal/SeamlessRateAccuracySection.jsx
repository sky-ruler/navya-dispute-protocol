import React, { useState } from 'react';
import { 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Award, 
  BrainCircuit, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Send,
  RotateCcw
} from 'lucide-react';
import { SEED_BATCHES } from '../../services/mockData';
import { rewardService } from '../../services/rewardService';

const QUICK_STORAGE_TAGS = [
  '❄️ Cold Storage (2–4°C)',
  '🌡️ Ambient Mandi (26°C)',
  '📦 Dry Corrugated Crates',
  '🚚 Transit Shock Delay'
];

export const SeamlessRateAccuracySection = ({ onRewardEarned }) => {
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [note, setNote] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBatch, setSubmittedBatch] = useState(null);

  const activeBatch = SEED_BATCHES[selectedBatchIndex] || SEED_BATCHES[0];
  const predictedDays = activeBatch.predictedShelfLifeDays || 7;
  const displayRating = hoverRating || rating;

  const ratingTiers = {
    1: { label: 'Critical Decay', desc: 'Produce spoiled far earlier than predicted (< 4 days)', tier: 'tier-low' },
    2: { label: 'Below Expectation', desc: 'Quality degraded faster than estimate (~6–8 days)', tier: 'tier-low' },
    3: { label: 'Acceptable Precision', desc: 'Held up close to estimate with minor variance (~10 days)', tier: 'tier-mid' },
    4: { label: 'Accurate Prediction', desc: 'Produce held up well as predicted (~12 days)', tier: 'tier-high' },
    5: { label: 'Spot-On Precision', desc: 'Shelf life matched prediction and telemetry perfectly (12+ days)', tier: 'tier-high' }
  };

  const activeTier = ratingTiers[displayRating] || ratingTiers[5];

  const handleTagToggle = (tag) => {
    let nextTags;
    if (selectedTags.includes(tag)) {
      nextTags = selectedTags.filter(t => t !== tag);
    } else {
      nextTags = [...selectedTags, tag];
    }
    setSelectedTags(nextTags);

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
      batchId: activeBatch.id,
      crop: activeBatch.crop,
      predictedShelfLifeDays: predictedDays,
      accuracyRating: rating,
      userNote: note || activeTier.desc
    });

    setSubmittedBatch(activeBatch);
    setIsSubmitted(true);
    if (onRewardEarned) {
      onRewardEarned(result);
    }
  };

  const handleResetForAnother = () => {
    setIsSubmitted(false);
    setNote('');
    setSelectedTags([]);
    setRating(5);
    setHoverRating(0);
    setSelectedBatchIndex((prev) => (prev + 1) % SEED_BATCHES.length);
  };

  return (
    <section id="rate-prediction-section" className="seamless-rate-card">
      {/* Top Header Row */}
      <div className="seamless-rate-top-bar">
        <div>
          <div className="seamless-rate-tag">
            <BrainCircuit size={13} />
            Reinforcement Learning Telemetry
          </div>
          <h2 className="seamless-rate-title">Rate Produce Shelf-Life Accuracy</h2>
          <p className="seamless-rate-desc">
            Help train Navya's decay regression AI model by reporting actual crate longevity. 
            Once verified by our quality pipeline, earned points are redeemable for discounts on the main Navya platform.
          </p>
        </div>

        <div className="seamless-reward-pill">
          <span>🪙</span>
          <span>Earn Up to +50 Pts (₹25 Value)</span>
        </div>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          {/* Batch Selector Tabs */}
          <div className="seamless-batch-tabs">
            {SEED_BATCHES.map((b, idx) => {
              const isSelected = idx === selectedBatchIndex;
              return (
                <button
                  type="button"
                  key={b.id}
                  className={`seamless-batch-tab ${isSelected ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedBatchIndex(idx);
                    setNote('');
                    setSelectedTags([]);
                  }}
                >
                  <span>{b.emoji}</span>
                  <span>{b.crop}</span>
                  <span className="seamless-tab-badge">{b.predictedShelfLifeDays}d est</span>
                </button>
              );
            })}
          </div>

          {/* Active Produce Lot Telemetry Strip */}
          <div className="seamless-batch-strip">
            <div className="seamless-batch-strip-left">
              <span className="seamless-strip-avatar">{activeBatch.emoji}</span>
              <div>
                <div className="seamless-strip-name">
                  {activeBatch.crop} • {activeBatch.variety}
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--navya-forest-800)' }}>
                    {activeBatch.id}
                  </span>
                </div>
                <div className="seamless-strip-meta">
                  Farm Gate: <strong style={{ color: 'var(--navya-success)' }}>{activeBatch.certifiedGrade || 'Grade A Fresh'}</strong> • {activeBatch.farmer?.region || 'Himachal Pradesh'}
                </div>
              </div>
            </div>

            <div className="seamless-predicted-block">
              <div className="seamless-predicted-label">AI PREDICTED SHELF LIFE</div>
              <div className="seamless-predicted-num">{predictedDays} Days</div>
            </div>
          </div>

          {/* Precision Star Rating */}
          <div className="seamless-rating-box">
            <div className="seamless-rating-prompt">
              How accurate was Navya's {predictedDays}-day shelf life estimate?
            </div>

            <div className="seamless-stars-row" onMouseLeave={() => setHoverRating(0)}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="seamless-star-btn"
                  onMouseEnter={() => setHoverRating(star)}
                  onClick={() => setRating(star)}
                  title={`${star} Star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    size={32}
                    fill={displayRating >= star ? '#f59e0b' : 'none'}
                    stroke={displayRating >= star ? '#d97706' : '#cbd5e1'}
                    strokeWidth={1.8}
                  />
                </button>
              ))}
            </div>

            <div className={`seamless-feedback-chip ${activeTier.tier}`}>
              <span>★ {displayRating}.0 — {activeTier.label}:</span>
              <span style={{ fontWeight: 500, opacity: 0.9 }}>{activeTier.desc}</span>
            </div>
          </div>

          {/* Quick Storage Context Tags */}
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--navya-forest-800)', marginBottom: '6px' }}>
              Storage Environment Context (Optional Quick-Select):
            </div>
            <div className="seamless-tags-row">
              {QUICK_STORAGE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    className={`seamless-tag-chip ${isSelected ? 'active' : ''}`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Textarea */}
          <textarea
            className="seamless-textarea"
            rows={2}
            placeholder="e.g. Produce arrived crisp; lasted 2 extra days under cold store shade / or early decay in bottom crates..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {/* Bottom Action & Verification Policy Bar */}
          <div className="seamless-bottom-row">
            <div className="seamless-policy-notice">
              <ShieldCheck size={16} color="var(--navya-forest-800)" style={{ flexShrink: 0 }} />
              <span>
                <strong>Verification Policy:</strong> Ratings are verified against sensor telemetry. 
                Earned points can be redeemed as instant discounts on the main Navya website.
              </span>
            </div>

            <button type="submit" className="seamless-submit-btn">
              <span>Submit for Telemetry Review</span>
              <Send size={14} />
            </button>
          </div>
        </form>
      ) : (
        /* In-Place Seamless Confirmation State */
        <div style={{
          background: 'var(--bg-surface-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '28px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: '#ecfdf5',
            border: '1.5px solid #a7f3d0',
            color: 'var(--navya-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <CheckCircle2 size={30} />
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)', marginBottom: '4px' }}>
            Rating Logged for Verification! ⏳
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 16px', lineHeight: 1.5 }}>
            Thank you! Your observation for <strong>{submittedBatch?.crop} ({submittedBatch?.id})</strong> has been logged. 
            Once verified against sensor telemetry, up to <strong>+50 Points (₹25 Credit)</strong> will be deposited to your wallet.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#fffbeb',
            border: '1px solid #fde68a',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#92400e',
            marginBottom: '18px'
          }}>
            <Award size={16} color="#d97706" />
            <span>Redeemable for Discounts on Main Navya Platform</span>
          </div>

          <div>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetForAnother}
              style={{ fontSize: '13px', padding: '8px 18px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RotateCcw size={14} />
              Rate Another Produce Lot
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
