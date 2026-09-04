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
          <h1 className="section-title">Quality Complaints & Replies</h1>
          <p className="section-desc">
            Review reported produce issues and reply with a replacement or discount
          </p>
        </div>
        <div className="dashboard-header-actions">
          <button className="btn-secondary btn-sm" onClick={handleResetDemo}>
            <RotateCcw size={13} />
            Reset Demo
          </button>
          <button className="btn-primary" onClick={() => setCurrentView('file-complaint')}>
            <PlusCircle size={15} />
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      {/* 3 Simple Realistic Stats */}
      <div className="dealer-stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">
            Total Complaints
          </div>
          <div className="stat-card-value">
            {disputes.length}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">
            Waiting for Reply
          </div>
          <div className="stat-card-value" style={{ color: 'var(--navya-warning)' }}>
            {waitingCount}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label">
            Solved & Agreed
          </div>
          <div className="stat-card-value" style={{ color: 'var(--navya-success)' }}>
            {resolvedCount}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="filter-bar">
        <div className="filter-tabs-row">
          {[
            { key: 'ALL', label: 'All' },
            { key: 'PENDING_REVIEW', label: 'Waiting' },
            { key: 'ACTION_PROPOSED', label: 'Offered' },
            { key: 'RESOLVED', label: 'Solved' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`filter-tab-btn ${filterStatus === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="filter-search-wrap">
          <input
            type="text"
            className="form-input filter-search-input"
            placeholder="Search crop or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={14} className="filter-search-icon" />
        </div>
      </div>

      {/* List */}
      <div className="disputes-list">
        {filtered.map((d) => (
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
                  <span className="dispute-crop-name">{d.crop}</span>
                  <StatusBadge status={d.status} />
                </div>
                <div className="dispute-defect-title">
                  {d.defectTitle}
                </div>
                <div className="dispute-meta-line">
                  {d.affectedCrates} Crates Affected • Batch: <strong>{d.batchId}</strong> • {d.filingDate}
                </div>
              </div>
            </div>

            <div className="dispute-action-col">
              <button className="btn-secondary dispute-view-btn">
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
