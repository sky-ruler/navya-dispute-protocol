import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Download, 
  Printer, 
  ShieldCheck, 
  DollarSign, 
  RefreshCw, 
  Star,
  MessageSquare,
  Activity,
  FileCheck,
  Building,
  User,
  Clock,
  Sparkles
} from 'lucide-react';
import { StatusBadge, SeverityBadge } from '../components/common/StatusBadge';
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
          Back to Inbox
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
      sender: activeRole === 'DEALER' ? 'Dealer Representative' : 'Farmer / FPO Grower',
      text: commentText.trim()
    });

    setCommentText('');
    onDisputeUpdated();
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="dispute-detail-container">
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="btn-secondary" onClick={onBack} style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            Inbox
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>{dispute.emoji}</span>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navya-forest-800)', fontFamily: 'var(--font-heading)' }}>
                {dispute.id}
              </h1>
              <StatusBadge status={dispute.status} />
              <SeverityBadge severity={dispute.severity} />
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Batch: <strong style={{ fontFamily: 'var(--font-mono)' }}>{dispute.batchId}</strong> • {dispute.crop} ({dispute.variety}) • Filed: {dispute.filingDate}
            </div>
          </div>
        </div>

        {/* Header Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-secondary" onClick={handlePrintCertificate}>
            <Printer size={15} />
            Print Redressal Slip
          </button>
          
          {dispute.status !== 'RESOLVED' && (
            <button className="btn-primary" onClick={() => setIsActionModalOpen(true)}>
              <DollarSign size={15} />
              Propose Resolution
            </button>
          )}

          {dispute.proposedAction && dispute.status !== 'RESOLVED' && (
            <button className="btn-bronze" onClick={() => setIsFeedbackModalOpen(true)}>
              <Star size={15} />
              Accept & Close Ticket
            </button>
          )}
        </div>
      </div>

      {/* Main Split-Screen Layout */}
      <div className="split-detail-grid">
        {/* LEFT COLUMN: Origin Baseline & Sensor Telemetry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card 1: Batch Origin Identity */}
          <div className="detail-pane">
            <h3 className="pane-title">
              <Building size={17} />
              Produce Batch & Checkpoint Registry
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Farmer / FPO</span>
                <strong style={{ color: 'var(--navya-forest-800)' }}>
                  {batch?.farmer?.name || dispute.respondentName}
                </strong>
                <div style={{ fontSize: '11.5px', color: 'var(--text-subtle)' }}>{batch?.farmer?.region}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Dealer / Aggregator</span>
                <strong style={{ color: 'var(--navya-forest-800)' }}>
                  {batch?.dealer?.name || dispute.complainantName}
                </strong>
                <div style={{ fontSize: '11.5px', color: 'var(--text-subtle)' }}>{batch?.dealer?.hub}</div>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Certified Grade</span>
                <span style={{ fontWeight: 700, color: 'var(--navya-success)' }}>
                  {batch?.certifiedGrade || 'Grade A'} (Score: {batch?.farmGateScore || 92}/100)
                </span>
              </div>

              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '11px', textTransform: 'uppercase' }}>Harvest & Dwell Time</span>
                <span style={{ fontWeight: 600 }}>
                  {batch?.harvestDate || '2026-09-01'} (3 days transit)
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Telemetry Comparison */}
          <TelemetryComparison
            batch={batch || { initialTelemetry: { tvoc_ppb: dispute.telemetryComparison.farmGateTvoc, temp_c: 18, humidity_rh: 65 }, certifiedGrade: 'Grade A', predictedShelfLifeDays: 8 }}
            comparisonData={dispute.telemetryComparison}
          />

          {/* Card 3: Photo Evidence Gallery */}
          <div className="detail-pane">
            <h3 className="pane-title">
              <FileCheck size={17} />
              Photographic Proof of Condition ({dispute.evidenceImages?.length || 0})
            </h3>

            {dispute.evidenceImages && dispute.evidenceImages.length > 0 ? (
              <div className="evidence-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}>
                {dispute.evidenceImages.map((img, i) => (
                  <div 
                    key={i} 
                    className="evidence-thumb-box"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setActiveImageZoom(img)}
                    title="Click to view high-res evidence"
                  >
                    <img src={img} alt={`Evidence ${i+1}`} className="evidence-thumb-img" />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '12px 0' }}>
                No images attached to this claim.
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Claim Details, Redressal Actions & Negotiation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Card 1: Complainant's Claim Statement */}
          <div className="detail-pane">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--navya-bronze-dark)', letterSpacing: '0.04em' }}>
                  Complainant Grievance Statement
                </span>
                <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)', marginTop: '2px' }}>
                  {dispute.defectTitle}
                </h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Claimed Loss</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                  ₹{dispute.estimatedDisputeAmountInr?.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-body)', lineHeight: 1.6, background: 'var(--bg-surface-subtle)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
              "{dispute.description}"
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ padding: '8px 12px', background: 'var(--bg-surface-subtle)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Affected Produce:</span>{' '}
                <strong>{dispute.affectedCrates} Crates ({dispute.affectedKg} kg)</strong>
              </div>
              <div style={{ padding: '8px 12px', background: 'var(--bg-surface-subtle)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Requested Remedy:</span>{' '}
                <strong>{dispute.requestedRemedy?.replace('_', ' ')}</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Proposed Redressal Action / Resolved Banner */}
          {dispute.proposedAction ? (
            <div style={{
              background: dispute.status === 'RESOLVED' ? 'var(--navya-success-bg)' : '#fff8ed',
              border: `1.5px solid ${dispute.status === 'RESOLVED' ? 'var(--navya-success-border)' : '#fed7aa'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {dispute.status === 'RESOLVED' ? (
                    <ShieldCheck size={20} color="var(--navya-success)" />
                  ) : (
                    <Clock size={20} color="var(--navya-warning)" />
                  )}
                  <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                    {dispute.status === 'RESOLVED' ? 'Officially Resolved & Settled' : 'Proposed Redressal Settlement'}
                  </span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>
                  {dispute.proposedAction.proposedAt}
                </span>
              </div>

              <div style={{ fontSize: '14px', color: 'var(--text-body)', marginBottom: '14px', lineHeight: 1.5 }}>
                {dispute.proposedAction.note}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '12px 16px', background: '#ffffff', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)' }}>
                {dispute.proposedAction.amountInr && (
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Credit Authorized</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                      ₹{dispute.proposedAction.amountInr?.toLocaleString('en-IN')}
                    </div>
                  </div>
                )}
                {dispute.proposedAction.discountPercent && (
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Invoice Discount</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navya-bronze-dark)' }}>
                      {dispute.proposedAction.discountPercent}%
                    </div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Action Type</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                    {dispute.proposedAction.type?.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {/* Bilateral Feedback Display if Resolved */}
              {dispute.feedback && (
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <div style={{ color: '#f59e0b', fontSize: '16px' }}>
                      {'★'.repeat(dispute.feedback.rating || 5)}
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                      Bilateral Mutual Trust Score: {dispute.feedback.rating || 5}/5
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                    "{dispute.feedback.comment}"
                  </div>
                </div>
              )}

              {/* Accept button if action proposed but not yet closed */}
              {dispute.status !== 'RESOLVED' && (
                <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button 
                    className="btn-bronze" 
                    onClick={() => setIsFeedbackModalOpen(true)}
                    style={{ padding: '9px 18px' }}
                  >
                    <Star size={15} />
                    Accept Settlement & Close Ticket
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              textAlign: 'center'
            }}>
              <Clock size={36} color="var(--navya-warning)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                Awaiting Dealer / Aggregator Redressal
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '360px', margin: '4px auto 16px' }}>
                Review the sensor telemetry delta on the left and propose a fair credit note, replacement batch, or re-scan.
              </div>
              <button className="btn-primary" onClick={() => setIsActionModalOpen(true)}>
                <DollarSign size={15} />
                Propose Redressal Action Now
              </button>
            </div>
          )}

          {/* Card 3: Bilateral Discussion Thread */}
          <div className="detail-pane">
            <h3 className="pane-title">
              <MessageSquare size={17} />
              Farmer-Dealer Negotiation Thread
            </h3>

            {/* Conversation Timeline */}
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

            {/* Send note form */}
            <form onSubmit={handleSendComment} style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="form-input"
                placeholder={`Post note as ${activeRole === 'DEALER' ? 'Dealer' : 'Farmer'}...`}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0 18px', flexShrink: 0 }}>
                <Send size={15} />
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Image Zoom Lightbox */}
      {activeImageZoom && (
        <div className="modal-backdrop" onClick={() => setActiveImageZoom(null)}>
          <div style={{ maxWidth: '800px', width: '90%', position: 'relative' }}>
            <img src={activeImageZoom} alt="Zoomed evidence" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }} />
            <button 
              className="evidence-remove-btn" 
              onClick={() => setActiveImageZoom(null)}
              style={{ position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px' }}
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
