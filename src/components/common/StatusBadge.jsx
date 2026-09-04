import React from 'react';

export const StatusBadge = ({ status }) => {
  const normalized = status ? status.toUpperCase() : 'PENDING_REVIEW';

  switch (normalized) {
    case 'PENDING_REVIEW':
      return (
        <span className="status-badge pending">
          <span className="status-dot"></span>
          Pending Review
        </span>
      );
    case 'UNDER_INVESTIGATION':
      return (
        <span className="status-badge investigating">
          <span className="status-dot"></span>
          Under Investigation
        </span>
      );
    case 'ACTION_PROPOSED':
      return (
        <span className="status-badge action-proposed">
          <span className="status-dot"></span>
          Action Proposed
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="status-badge resolved">
          <span className="status-dot"></span>
          Resolved & Closed
        </span>
      );
    case 'REJECTED':
    case 'CONTESTED':
      return (
        <span className="status-badge rejected">
          <span className="status-dot"></span>
          Contested / Rejected
        </span>
      );
    default:
      return (
        <span className="status-badge pending">
          <span className="status-dot"></span>
          {status}
        </span>
      );
  }
};

export const SeverityBadge = ({ severity }) => {
  const norm = severity ? severity.toUpperCase() : 'MODERATE';
  
  if (norm === 'CRITICAL' || norm === 'HIGH') {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        fontWeight: 700,
        color: '#d9383a',
        backgroundColor: '#fdf2f2',
        border: '1px solid #f8b4b4',
        padding: '2px 8px',
        borderRadius: '4px'
      }}>
        ⚠️ Severe / Critical
      </span>
    );
  }
  if (norm === 'MODERATE' || norm === 'MEDIUM') {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        fontWeight: 700,
        color: '#e38e16',
        backgroundColor: '#fef8ee',
        border: '1px solid #f9deb3',
        padding: '2px 8px',
        borderRadius: '4px'
      }}>
        ⚡ Moderate Defect
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '11px',
      fontWeight: 700,
      color: '#168a5a',
      backgroundColor: '#edf8f2',
      border: '1px solid #b8e2cb',
      padding: '2px 8px',
      borderRadius: '4px'
    }}>
      🌱 Minor Cosmetic
    </span>
  );
};
