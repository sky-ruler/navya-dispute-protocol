import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  PlusCircle, 
  RotateCcw, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { disputeService } from '../services/disputeService';

export const DealerDashboardPage = ({ 
  disputes, 
  onSelectDispute, 
  onRefreshDisputes, 
  setCurrentView
}) => {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = disputes.filter(d => {
    const matchesStatus = filterStatus === 'ALL' ? true : d.status === filterStatus;
    const matchesSearch = 
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.defectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const waitingCount = disputes.filter(d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION').length;
  const resolvedCount = disputes.filter(d => d.status === 'RESOLVED').length;

  const handleResetDemo = () => {
    if (confirm("Reset all tickets to initial test examples?")) {
      disputeService.resetToDemo();
      onRefreshDisputes();
    }
  };

  return (
    <div className="dealer-dashboard-container">
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '20px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '24px' }}>Quality Complaints & Replies</h1>
          <p className="section-desc">
            Review reported produce issues and reply with a replacement or discount
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={handleResetDemo} style={{ fontSize: '12px' }}>
            <RotateCcw size={13} />
            Reset Demo
          </button>
          <button className="btn-primary" onClick={() => setCurrentView('file-complaint')}>
            <PlusCircle size={15} />
            Report Issue
          </button>
        </div>
      </div>

      {/* 3 Simple Realistic Stats (No fake giant money numbers!) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '22px' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Total Complaints
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navya-forest-800)', marginTop: '2px' }}>
            {disputes.length}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Waiting for Reply
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navya-warning)', marginTop: '2px' }}>
            {waitingCount}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Solved & Agreed
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navya-success)', marginTop: '2px' }}>
            {resolvedCount}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={{
        background: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { key: 'ALL', label: 'All' },
            { key: 'PENDING_REVIEW', label: 'Waiting for Reply' },
            { key: 'ACTION_PROPOSED', label: 'Solution Offered' },
            { key: 'RESOLVED', label: 'Solved' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '12px',
                fontWeight: 600,
                border: `1px solid ${filterStatus === tab.key ? 'var(--navya-forest-800)' : 'transparent'}`,
                background: filterStatus === tab.key ? 'var(--navya-forest-800)' : 'var(--bg-surface-subtle)',
                color: filterStatus === tab.key ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '240px' }}>
          <input
            type="text"
            className="form-input"
            style={{ padding: '6px 10px 6px 30px', fontSize: '12.5px' }}
            placeholder="Search crop or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: 'var(--text-muted)' }} />
        </div>
      </div>

      {/* List */}
      <div className="disputes-list">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="dispute-item-card"
            onClick={() => onSelectDispute(d.id)}
            style={{ padding: '16px 20px' }}
          >
            <div className="dispute-main-col">
              <div className="crop-badge-avatar" style={{ width: '42px', height: '42px', fontSize: '20px' }}>
                {d.emoji}
              </div>
              <div className="dispute-meta-block">
                <div className="dispute-title-row" style={{ gap: '8px' }}>
                  <span className="dispute-id-code">{d.id}</span>
                  <span style={{ color: 'var(--text-subtle)' }}>•</span>
                  <span className="dispute-crop-name">{d.crop}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--text-body)', fontWeight: 600, marginTop: '2px' }}>
                  {d.defectTitle}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {d.affectedCrates} Crates Affected • Batch: <strong>{d.batchId}</strong> • {d.filingDate}
                </div>
              </div>
            </div>

            <div className="dispute-action-col">
              <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>View & Reply</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
