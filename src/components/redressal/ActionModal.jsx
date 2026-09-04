import React, { useState } from 'react';
import { X, CheckCircle, RefreshCw, FileCheck, Tag, AlertOctagon, Sparkles } from 'lucide-react';

export const ActionModal = ({ isOpen, onClose, dispute, onActionSubmit }) => {
  if (!isOpen || !dispute) return null;

  const [actionType, setActionType] = useState('REPLACEMENT_BATCH');
  const [discountAmount, setDiscountAmount] = useState(1200);
  const [note, setNote] = useState('Agreed to replace damaged crates from tomorrow morning dispatch lot.');

  const handleSubmit = (e) => {
    e.preventDefault();
    let newStatus = 'ACTION_PROPOSED';
    if (actionType === 'REJECT_CLAIM') newStatus = 'REJECTED';

    const actionData = {
      type: actionType,
      amountInr: actionType === 'CREDIT_NOTE' ? Number(discountAmount) : 0,
      note: note || (actionType === 'REPLACEMENT_BATCH' ? "Will send replacement fresh crates" : `Offered ₹${discountAmount} discount`),
      proposedBy: "Dealer / Aggregator"
    };

    onActionSubmit(dispute.id, newStatus, actionData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="rate-modal-dialog" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '540px' }}
      >
        <div className="rate-modal-top-accent" />

        {/* Modal Header */}
        <div className="rate-modal-header">
          <div className="rate-header-left">
            <div className="rate-header-icon-box" style={{ background: 'linear-gradient(135deg, var(--navya-forest-800) 0%, #004d38 100%)' }}>
              <RefreshCw size={20} />
            </div>
            <div>
              <div className="rate-header-tag">
                <Sparkles size={11} />
                Bilateral Resolution Offer
              </div>
              <div className="rate-header-title">Offer a Solution</div>
              <div className="rate-header-subtitle">
                Ticket #{dispute.id} • {dispute.crop} ({dispute.affectedCrates} crates affected)
              </div>
            </div>
          </div>
          <button className="rate-close-btn" onClick={onClose} title="Close dialog">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {/* Modal Body */}
          <div className="rate-modal-body" style={{ gap: '14px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 700, marginBottom: '8px', display: 'block' }}>
                Select How You Want to Solve This:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                <div
                  onClick={() => {
                    setActionType('REPLACEMENT_BATCH');
                    setNote('Agreed to send replacement fresh crates from next delivery.');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1.5px solid ${actionType === 'REPLACEMENT_BATCH' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                    background: actionType === 'REPLACEMENT_BATCH' ? 'var(--navya-success-bg)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--navya-forest-800)' }}>
                    <RefreshCw size={14} />
                    Send Replacement
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                    Replace the {dispute.affectedCrates} damaged crates
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActionType('CREDIT_NOTE');
                    setNote(`Offered ₹${discountAmount} price discount for the spoiled produce.`);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1.5px solid ${actionType === 'CREDIT_NOTE' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                    background: actionType === 'CREDIT_NOTE' ? 'var(--navya-success-bg)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--navya-forest-800)' }}>
                    <Tag size={14} />
                    Price Discount
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                    Deduct reasonable amount from bill
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActionType('MANDATORY_RESCAN');
                    setNote('Requested a sensor re-scan at the local Mandi Kiosk.');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1.5px solid ${actionType === 'MANDATORY_RESCAN' ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                    background: actionType === 'MANDATORY_RESCAN' ? 'var(--navya-success-bg)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--navya-forest-800)' }}>
                    <FileCheck size={14} />
                    Kiosk Re-Check
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                    Test at nearest mandi sensor kiosk
                  </div>
                </div>

                <div
                  onClick={() => {
                    setActionType('REJECT_CLAIM');
                    setNote('Photos or sensor data show normal condition. Cannot accept deduction.');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1.5px solid ${actionType === 'REJECT_CLAIM' ? 'var(--navya-danger)' : 'var(--border-medium)'}`,
                    background: actionType === 'REJECT_CLAIM' ? 'var(--navya-danger-bg)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '13px', color: 'var(--navya-danger)' }}>
                    <AlertOctagon size={14} />
                    Decline Claim
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.4 }}>
                    Decline with explanation
                  </div>
                </div>
              </div>
            </div>

            {actionType === 'CREDIT_NOTE' && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Discount Amount (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(e.target.value)}
                  placeholder="e.g. 1000"
                  required
                />
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontWeight: 600 }}>Message / Note to Counterparty</label>
              <textarea
                className="form-textarea"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Explain the solution details..."
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="rate-modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} style={{ fontSize: '13px' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ fontSize: '13px' }}>
              <CheckCircle size={15} />
              Confirm & Send Solution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
