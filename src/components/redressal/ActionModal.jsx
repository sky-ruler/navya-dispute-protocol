import React, { useState } from 'react';
import { X, CheckCircle, RefreshCw, AlertOctagon, FileCheck, DollarSign } from 'lucide-react';

export const ActionModal = ({ isOpen, onClose, dispute, onActionSubmit }) => {
  if (!isOpen || !dispute) return null;

  const [actionType, setActionType] = useState('CREDIT_NOTE');
  const [amountInr, setAmountInr] = useState(dispute.estimatedDisputeAmountInr || 10000);
  const [discountPercent, setDiscountPercent] = useState(25);
  const [replacementBatchId, setReplacementBatchId] = useState('NAV-2026-REPL-01');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let newStatus = 'ACTION_PROPOSED';
    if (actionType === 'REJECT_CLAIM') newStatus = 'REJECTED';
    if (actionType === 'FULL_PAYOUT' || actionType === 'CREDIT_NOTE') newStatus = 'ACTION_PROPOSED';

    const actionData = {
      type: actionType,
      amountInr: Number(amountInr),
      discountPercent: Number(discountPercent),
      replacementBatchId,
      note: note || `Authorized ${actionType.replace('_', ' ')} based on verified sensor discrepancy.`,
      proposedBy: "Dealer / Reviewer Panel"
    };

    onActionSubmit(dispute.id, newStatus, actionData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <div>
            <div className="modal-title">Take Redressal Action</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Ticket {dispute.id} • Batch: {dispute.batchId} ({dispute.crop})
            </div>
          </div>
          <button className="evidence-remove-btn" onClick={onClose} style={{ position: 'static' }}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Action Type Selector */}
            <div className="form-group">
              <label className="form-label">Select Resolution Protocol <span className="req">*</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div
                  onClick={() => setActionType('CREDIT_NOTE')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${actionType === 'CREDIT_NOTE' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                    background: actionType === 'CREDIT_NOTE' ? 'var(--navya-success-bg)' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--navya-forest-800)' }}>
                    <DollarSign size={15} />
                    Credit Note / Discount
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Issue partial financial credit for damaged lot
                  </div>
                </div>

                <div
                  onClick={() => setActionType('REPLACEMENT_BATCH')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${actionType === 'REPLACEMENT_BATCH' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                    background: actionType === 'REPLACEMENT_BATCH' ? 'var(--navya-success-bg)' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--navya-forest-800)' }}>
                    <RefreshCw size={15} />
                    Dispatch Replacement
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Send fresh certified crates with FEFO priority
                  </div>
                </div>

                <div
                  onClick={() => setActionType('MANDATORY_RESCAN')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${actionType === 'MANDATORY_RESCAN' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                    background: actionType === 'MANDATORY_RESCAN' ? 'var(--navya-success-bg)' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--navya-forest-800)' }}>
                    <FileCheck size={15} />
                    Order Kiosk Re-Scan
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Request mandi kiosk sensor re-verification
                  </div>
                </div>

                <div
                  onClick={() => setActionType('REJECT_CLAIM')}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: `1.5px solid ${actionType === 'REJECT_CLAIM' ? 'var(--navya-danger)' : 'var(--border-medium)'}`,
                    background: actionType === 'REJECT_CLAIM' ? 'var(--navya-danger-bg)' : '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13.5px', color: 'var(--navya-danger)' }}>
                    <AlertOctagon size={15} />
                    Contest / Reject Claim
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Reject claim with telemetry contradiction proof
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic fields based on action type */}
            {actionType === 'CREDIT_NOTE' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">Compensation Amount (₹)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={amountInr}
                    onChange={(e) => setAmountInr(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Discount Percentage (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                  />
                </div>
              </div>
            )}

            {actionType === 'REPLACEMENT_BATCH' && (
              <div className="form-group">
                <label className="form-label">Replacement Batch Token / ID</label>
                <input
                  type="text"
                  className="form-input"
                  value={replacementBatchId}
                  onChange={(e) => setReplacementBatchId(e.target.value)}
                  placeholder="e.g. NAV-2026-REPL-01"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Formal Redressal Statement / Feedback Note <span className="req">*</span></label>
              <textarea
                className="form-textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Specify agreed terms, insurance coverage, or reasons for resolution..."
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={actionType === 'REJECT_CLAIM' ? 'btn-danger' : 'btn-primary'}>
              <CheckCircle size={15} />
              Confirm & Execute Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
