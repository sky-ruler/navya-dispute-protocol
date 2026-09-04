import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Printer, 
  ShieldCheck, 
  RefreshCw, 
  Star,
  MessageSquare,
  Building,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { TelemetryComparison } from '../components/filing/TelemetryComparison';
import { ActionModal } from '../components/redressal/ActionModal';
import { FeedbackModal } from '../components/redressal/FeedbackModal';
import { disputeService } from '../services/disputeService';

export const DisputeDetailsPage = ({ 
  disputeId, 
  onBack, 
  onDisputeUpdated,
  activeRole,
  onOpenRateModal
}) => {
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [activeImageZoom, setActiveImageZoom] = useState(null);

  const dispute = disputeService.getDisputeById(disputeId);
  const batch = dispute ? disputeService.getBatchById(dispute.batchId) : null;

  if (!dispute) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <AlertCircle size={48} color="var(--navya-danger)" style={{ margin: '0 auto 12px' }} />
        <h2>Ticket Not Found</h2>
        <button className="btn-secondary" onClick={onBack} style={{ marginTop: '16px' }}>
          Back to List
        </button>
      </div>
    );
  }

  const handleActionSubmit = (id, newStatus, actionData) => {
    disputeService.updateDisputeStatus(id, newStatus, actionData);
    onDisputeUpdated();
  };

  const handleFeedbackSubmit = (id, newStatus, actionData, feedbackData) => {
    disputeService.updateDisputeStatus(id, newStatus, actionData, feedbackData);
    onDisputeUpdated();
  };

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    disputeService.addDisputeMessage(dispute.id, {
      sender: activeRole === 'DEALER' ? 'Dealer' : 'Farmer',
      text: commentText.trim()
    });

    setCommentText('');
    onDisputeUpdated();
  };

  return (
    <div className="dispute-detail-container">
      {/* Top Header */}
      <div className="detail-top-header">
        <div className="detail-header-left">
          <button className="btn-secondary btn-sm" onClick={onBack}>
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
          <div className="detail-header-info">
            <div className="detail-header-title-row">
              <span style={{ fontSize: '22px' }}>{dispute.emoji}</span>
              <h1 className="detail-page-title">
                {dispute.defectTitle}
              </h1>
              <StatusBadge status={dispute.status} />
            </div>
            <div className="detail-header-subtitle">
              Ticket: <strong>{dispute.id}</strong> • Batch: <strong>{dispute.batchId}</strong> ({dispute.crop})
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="detail-header-actions">
          <button className="btn-secondary btn-sm" onClick={() => window.print()}>
            <Printer size={14} />
            <span className="btn-label-mobile-hide">Print Slip</span>
          </button>

          {batch && onOpenRateModal && (
            <button 
              className="btn-bronze btn-sm" 
              onClick={() => onOpenRateModal(batch)} 
              title="Rate AI prediction accuracy to earn verified discounts"
            >
              🧠 <span className="btn-label-mobile-hide">Rate Accuracy</span>
            </button>
          )}

          {/* Bilateral Action: Propose Solution (Dealer / Aggregator Role) */}
          {dispute.status !== 'RESOLVED' && activeRole === 'DEALER' && (
            <button className="btn-primary btn-sm" onClick={() => setIsActionModalOpen(true)}>
              <RefreshCw size={14} />
              <span>{dispute.proposedAction ? 'Edit Offer' : 'Offer Solution'}</span>
            </button>
          )}

          {/* Bilateral Action: Accept Solution & Finish (Farmer / Claimant Role) */}
          {dispute.proposedAction && dispute.status !== 'RESOLVED' && (
            activeRole === 'FARMER' ? (
              <button className="btn-bronze btn-sm" onClick={() => setIsFeedbackModalOpen(true)}>
                <Star size={14} />
                <span>Accept & Finish</span>
              </button>
            ) : (
              <span className="waiting-farmer-pill">
                ⏳ Offer Sent • Awaiting Farmer
              </span>
            )
          )}
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="split-detail-grid">
        {/* LEFT: Batch Origin, Sensor Check, & Photos */}
        <div className="detail-left-col">
          {/* Card 1: Batch Info */}
          <div className="detail-pane">
            <h3 className="pane-title">
              <Building size={16} />
              Batch Origin Details
            </h3>

            <div className="batch-origin-grid">
              <div>
                <span className="batch-origin-label">Farmer</span>
                <div className="batch-origin-value">
                  {batch?.farmer?.name || dispute.respondentName}
                </div>
                <div className="batch-origin-sub">{batch?.farmer?.region}</div>
              </div>

              <div>
                <span className="batch-origin-label">Dealer</span>
                <div className="batch-origin-value">
                  {batch?.dealer?.name || dispute.complainantName}
                </div>
                <div className="batch-origin-sub">{batch?.dealer?.hub}</div>
              </div>

              <div>
                <span className="batch-origin-label">Quality Grade at Farm</span>
                <div className="batch-origin-value" style={{ color: 'var(--navya-success)' }}>
                  {batch?.certifiedGrade || 'Grade A'} (Fresh)
                </div>
              </div>

              <div>
                <span className="batch-origin-label">Total Lot Size</span>
                <div className="batch-origin-value">
                  {batch?.quantityCrates || 100} Crates
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Simple Sensor Check */}
          <TelemetryComparison
            batch={batch || { initialTelemetry: { tvoc_ppb: 125, temp_c: 18, humidity_rh: 65 }, certifiedGrade: 'Grade A' }}
            comparisonData={dispute.telemetryComparison}
          />

          {/* Card 3: Photos */}
          <div className="detail-pane">
            <h3 className="pane-title">
              Produce Photos Attached ({dispute.evidenceImages?.length || 0})
            </h3>

            {dispute.evidenceImages && dispute.evidenceImages.length > 0 ? (
              <div className="evidence-grid">
                {dispute.evidenceImages.map((img, i) => (
                  <div 
                    key={i} 
                    className="evidence-thumb-box"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveImageZoom(img)}
                    title="Click to view full photo"
                  >
                    <img src={img} alt={`Photo ${i+1}`} className="evidence-thumb-img" />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                No photos attached.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Complaint, Solution, and Chat */}
        <div className="detail-right-col">
          {/* What Was Reported */}
          <div className="detail-pane">
            <div className="reported-by-label">
              Reported by {dispute.complainantName} ({dispute.filingDate})
            </div>

            <div className="reported-quote">
              "{dispute.description}"
            </div>

            <div className="reported-meta-row">
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Damaged Crates:</span>{' '}
                <strong>{dispute.affectedCrates} Crates</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Preferred Solution:</span>{' '}
                <strong>{dispute.requestedRemedy?.replace('_', ' ')}</strong>
              </div>
            </div>
          </div>

          {/* Dealer's Solution Box */}
          {dispute.proposedAction ? (
            <div className={`solution-box ${dispute.status === 'RESOLVED' ? 'resolved' : 'pending'}`}>
              <div className="solution-box-header">
                <div className="solution-box-title">
                  {dispute.status === 'RESOLVED' ? <ShieldCheck size={18} color="var(--navya-success)" /> : <Clock size={18} color="var(--navya-warning)" />}
                  {dispute.status === 'RESOLVED' ? 'Problem Solved & Agreed' : 'Solution Offered by Dealer'}
                </div>
                <span className="solution-box-time">{dispute.proposedAction.proposedAt}</span>
              </div>

              <div className="solution-box-note">
                {dispute.proposedAction.note}
              </div>

              {dispute.proposedAction.amountInr > 0 && (
                <div className="solution-amount-badge">
                  Discount Agreed: ₹{dispute.proposedAction.amountInr?.toLocaleString('en-IN')}
                </div>
              )}

              {dispute.feedback && (
                <div className="solution-feedback">
                  <div style={{ color: '#f59e0b', fontSize: '16px' }}>
                    {'★'.repeat(dispute.feedback.rating || 5)}
                  </div>
                  <div className="solution-feedback-text">
                    "{dispute.feedback.comment}"
                  </div>
                </div>
              )}

              {dispute.status !== 'RESOLVED' && (
                <div className="solution-actions-row">
                  {activeRole === 'FARMER' ? (
                    <>
                      <span className="solution-hint-text">
                        👉 Please review the terms above and accept to close this claim.
                      </span>
                      <button className="btn-bronze btn-sm" onClick={() => setIsFeedbackModalOpen(true)}>
                        <ThumbsUp size={14} />
                        Accept & Finish
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="solution-waiting-text">
                        ⏳ You offered this solution. The grower/farmer must review and accept it.
                      </span>
                      <button className="btn-secondary btn-sm" onClick={() => setIsActionModalOpen(true)}>
                        <RefreshCw size={13} />
                        Edit Offer
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="no-solution-placeholder">
              <div className="no-solution-title">
                {activeRole === 'DEALER' ? 'Action Required: Offer Solution' : 'Waiting for Dealer Reply'}
              </div>
              <div className="no-solution-desc">
                {activeRole === 'DEALER'
                  ? 'Audit the produce photos and Sensirion hardware logs, then offer replacement crates or a credit note discount.'
                  : `Your complaint is with the Mandi dealer (${batch?.dealer?.name || dispute.complainantName || 'Apex Hub'}). Switch to 🏢 Dealer Mode in the top navbar if you wish to simulate the dealer proposing terms.`}
              </div>
              {activeRole === 'DEALER' && (
                <button className="btn-primary" onClick={() => setIsActionModalOpen(true)}>
                  <RefreshCw size={14} />
                  Offer Solution Now
                </button>
              )}
            </div>
          )}

          {/* Simple Message Chat */}
          <div className="detail-pane">
            <h3 className="pane-title">
              <MessageSquare size={16} />
              Messages & Activity
            </h3>

            <div className="timeline-track">
              {dispute.timeline?.map((item, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-dot"></div>
                  <div className="timeline-node-time">{item.time}</div>
                  <div className="timeline-node-title">{item.actor}</div>
                  <div className="timeline-node-text">{item.action}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComment} className="comment-form">
              <input
                type="text"
                className="form-input"
                placeholder={`Type a note as ${activeRole === 'DEALER' ? 'Dealer' : 'Farmer'}...`}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn-primary comment-send-btn">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Image Zoom Lightbox */}
      {activeImageZoom && (
        <div className="modal-backdrop" onClick={() => setActiveImageZoom(null)}>
          <div className="lightbox-container">
            <img src={activeImageZoom} alt="Zoomed evidence" className="lightbox-img" />
            <button 
              className="evidence-remove-btn lightbox-close"
              onClick={() => setActiveImageZoom(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Action Modal */}
      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        dispute={dispute}
        onActionSubmit={handleActionSubmit}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        dispute={dispute}
        onFeedbackSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};
