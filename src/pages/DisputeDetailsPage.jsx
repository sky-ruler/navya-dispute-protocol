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
  activeRole 
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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" onClick={onBack} style={{ padding: '7px 12px', fontSize: '13px' }}>
            <ArrowLeft size={15} />
            Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '22px' }}>{dispute.emoji}</span>
              <h1 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                {dispute.defectTitle}
              </h1>
              <StatusBadge status={dispute.status} />
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
              Ticket: <strong>{dispute.id}</strong> • Batch: <strong>{dispute.batchId}</strong> ({dispute.crop})
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button className="btn-secondary" onClick={() => window.print()} style={{ fontSize: '12.5px' }}>
            <Printer size={14} />
            Print Slip
          </button>

          {dispute.status !== 'RESOLVED' && (
            <button className="btn-primary" onClick={() => setIsActionModalOpen(true)} style={{ fontSize: '13px' }}>
              <RefreshCw size={14} />
              Offer Solution
            </button>
          )}

          {dispute.proposedAction && dispute.status !== 'RESOLVED' && (
            <button className="btn-bronze" onClick={() => setIsFeedbackModalOpen(true)} style={{ fontSize: '13px' }}>
              <Star size={14} />
              Accept & Finish
            </button>
          )}
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="split-detail-grid">
        {/* LEFT: Batch Origin, Sensor Check, & Photos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card 1: Batch Info */}
          <div className="detail-pane">
            <h3 className="pane-title" style={{ fontSize: '15px' }}>
              <Building size={16} />
              Batch Origin Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Farmer</span>
                <div style={{ fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                  {batch?.farmer?.name || dispute.respondentName}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{batch?.farmer?.region}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Dealer</span>
                <div style={{ fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                  {batch?.dealer?.name || dispute.complainantName}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{batch?.dealer?.hub}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Quality Grade at Farm</span>
                <div style={{ fontWeight: 700, color: 'var(--navya-success)' }}>
                  {batch?.certifiedGrade || 'Grade A'} (Fresh)
                </div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>Total Lot Size</span>
                <div style={{ fontWeight: 700 }}>
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
            <h3 className="pane-title" style={{ fontSize: '15px' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* What Was Reported */}
          <div className="detail-pane">
            <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--navya-bronze-dark)' }}>
              Reported by {dispute.complainantName} ({dispute.filingDate})
            </div>

            <div style={{ fontSize: '14px', color: 'var(--text-body)', marginTop: '8px', lineHeight: 1.5, background: 'var(--bg-surface-subtle)', padding: '12px', borderRadius: '8px' }}>
              "{dispute.description}"
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '16px', fontSize: '13px' }}>
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
            <div style={{
              background: dispute.status === 'RESOLVED' ? 'var(--navya-success-bg)' : '#fff8ed',
              border: `1.5px solid ${dispute.status === 'RESOLVED' ? 'var(--navya-success-border)' : '#fed7aa'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                  {dispute.status === 'RESOLVED' ? <ShieldCheck size={18} color="var(--navya-success)" /> : <Clock size={18} color="var(--navya-warning)" />}
                  {dispute.status === 'RESOLVED' ? 'Problem Solved & Agreed' : 'Solution Offered by Dealer'}
                </div>
                <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{dispute.proposedAction.proposedAt}</span>
              </div>

              <div style={{ fontSize: '13.5px', color: 'var(--text-body)', marginBottom: '12px' }}>
                {dispute.proposedAction.note}
              </div>

              {dispute.proposedAction.amountInr > 0 && (
                <div style={{ display: 'inline-block', padding: '6px 12px', background: '#ffffff', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.08)', fontSize: '13px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                  Discount Agreed: ₹{dispute.proposedAction.amountInr?.toLocaleString('en-IN')}
                </div>
              )}

              {dispute.feedback && (
                <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ color: '#f59e0b', fontSize: '16px' }}>
                    {'★'.repeat(dispute.feedback.rating || 5)}
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                    "{dispute.feedback.comment}"
                  </div>
                </div>
              )}

              {dispute.status !== 'RESOLVED' && (
                <div style={{ marginTop: '14px', textAlign: 'right' }}>
                  <button className="btn-bronze" onClick={() => setIsFeedbackModalOpen(true)} style={{ fontSize: '13px', padding: '8px 16px' }}>
                    <ThumbsUp size={14} />
                    Accept Solution & Finish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px dashed var(--border-medium)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                Waiting for Dealer Reply
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '4px auto 12px', maxWidth: '320px' }}>
                Check the sensor verdict and photos, then offer replacement crates or a fair discount.
              </div>
              <button className="btn-primary" onClick={() => setIsActionModalOpen(true)} style={{ fontSize: '13px' }}>
                Offer Solution Now
              </button>
            </div>
          )}

          {/* Simple Message Chat */}
          <div className="detail-pane">
            <h3 className="pane-title" style={{ fontSize: '15px' }}>
              <MessageSquare size={16} />
              Messages & Activity
            </h3>

            <div className="timeline-track">
              {dispute.timeline?.map((item, idx) => (
                <div key={idx} className="timeline-node">
                  <div className="timeline-dot"></div>
                  <div className="timeline-node-time">{item.time}</div>
                  <div className="timeline-node-title" style={{ fontSize: '13px' }}>{item.actor}</div>
                  <div className="timeline-node-text" style={{ fontSize: '12px' }}>{item.action}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendComment} style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                style={{ padding: '8px 12px', fontSize: '13px' }}
                placeholder={`Type a note as ${activeRole === 'DEALER' ? 'Dealer' : 'Farmer'}...`}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 14px' }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Image Zoom Lightbox */}
      {activeImageZoom && (
        <div className="modal-backdrop" onClick={() => setActiveImageZoom(null)}>
          <div style={{ maxWidth: '700px', width: '90%', position: 'relative' }}>
            <img src={activeImageZoom} alt="Zoomed evidence" style={{ width: '100%', borderRadius: '10px' }} />
            <button 
              className="evidence-remove-btn" 
              onClick={() => setActiveImageZoom(null)}
              style={{ position: 'absolute', top: '10px', right: '10px' }}
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
