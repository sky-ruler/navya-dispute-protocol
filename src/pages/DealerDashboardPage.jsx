import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  DollarSign, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { StatusBadge, SeverityBadge } from '../components/common/StatusBadge';
import { disputeService } from '../services/disputeService';

export const DealerDashboardPage = ({ 
  disputes, 
  onSelectDispute, 
  onRefreshDisputes, 
  setCurrentView,
  activeRole 
}) => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = disputes.filter(d => {
    const matchesStatus = filterStatus === 'ALL' ? true : d.status === filterStatus;
    const matchesSearch = 
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.complainantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.defectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalValueInDispute = disputes.reduce((sum, d) => sum + (d.estimatedDisputeAmountInr || 0), 0);
  const pendingActionCount = disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION').length;
  const resolvedCount = disputes.filter(d => d.status === 'RESOLVED').length;

  const handleResetDemo = () => {
    if (confirm("Reset all tickets to original demo seed data?")) {
      disputeService.resetToDemo();
      onRefreshDisputes();
    }
  };

  return (
    <div className="dealer-dashboard-container">
      {/* Header & Metrics */}
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '26px' }}>Quality Claims & Inquiries Inbox</h1>
          <p className="section-desc">
            Review incoming produce discrepancies, examine sensor audit trails, and propose settlements
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleResetDemo} title="Restore initial seed state">
            <RotateCcw size={14} />
            Reset Demo Data
          </button>
          <button className="btn-primary" onClick={() => setCurrentView('file-complaint')}>
            <PlusCircle size={15} />
            File New Claim
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Active Inquiries
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navya-forest-800)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {disputes.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}>
            Total registered tickets
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Requires Action
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navya-warning)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {pendingActionCount}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}>
            Pending review or investigation
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Settled & Closed
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navya-success)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            {resolvedCount}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}>
            Bilateral feedback completed
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Value Under Redressal
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--navya-forest-800)', fontFamily: 'var(--font-heading)', marginTop: '4px' }}>
            ₹{totalValueInDispute.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-subtle)', marginTop: '2px' }}>
            Escrow / credit volume protected
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Status Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { key: 'ALL', label: 'All Tickets' },
            { key: 'PENDING_REVIEW', label: 'Pending Review' },
            { key: 'ACTION_PROPOSED', label: 'Action Proposed' },
            { key: 'RESOLVED', label: 'Resolved' },
            { key: 'UNDER_INVESTIGATION', label: 'Investigation' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                border: `1px solid ${filterStatus === tab.key ? 'var(--navya-forest-800)' : 'transparent'}`,
                background: filterStatus === tab.key ? 'var(--navya-forest-800)' : 'var(--bg-surface-subtle)',
                color: filterStatus === tab.key ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            className="form-input"
            style={{ padding: '7px 12px 7px 32px', fontSize: '13px' }}
            placeholder="Search by ticket, batch, or crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* Ticket List */}
      <div className="disputes-list">
        {filtered.length === 0 ? (
          <div style={{
            background: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            textAlign: 'center',
            color: 'var(--text-muted)'
          }}>
            <Inbox size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <div style={{ fontSize: '16px', fontWeight: 600 }}>No claims matching your filter</div>
            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              Switch filter tab or file a new quality claim
            </div>
          </div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="dispute-item-card"
              onClick={() => onSelectDispute(d.id)}
            >
              <div className="dispute-main-col">
                <div className="crop-badge-avatar">
                  {d.emoji}
                </div>
                <div className="dispute-meta-block">
                  <div className="dispute-title-row">
                    <span className="dispute-id-code">{d.id}</span>
                    <span style={{ color: 'var(--text-subtle)' }}>•</span>
                    <span className="dispute-crop-name">{d.crop} ({d.variety})</span>
                    <StatusBadge status={d.status} />
                    <SeverityBadge severity={d.severity} />
                  </div>

                  <div className="dispute-desc-snippet">
                    <strong>{d.defectTitle}:</strong> {d.description}
                  </div>

                  <div className="dispute-tags-row">
                    <span>Batch: <strong>{d.batchId}</strong></span>
                    <span>•</span>
                    <span>Volume: {d.affectedCrates} Crates ({d.affectedKg} kg)</span>
                    <span>•</span>
                    <span>Complainant: {d.complainantName}</span>
                    <span>•</span>
                    <span>Filed: {d.filingDate}</span>
                  </div>
                </div>
              </div>

              <div className="dispute-action-col">
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Claim Value
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                    ₹{d.estimatedDisputeAmountInr?.toLocaleString('en-IN')}
                  </div>
                </div>

                <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>Inspect & Act</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
