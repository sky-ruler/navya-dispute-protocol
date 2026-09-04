import React from 'react';
import { Leaf, Shield, Award, HelpCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="navya-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '6px',
            background: 'var(--navya-forest-800)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Leaf size={14} />
          </div>
          <span>Navya Agritech Protocol • Smart India Hackathon</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '12.5px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
            <Shield size={14} color="var(--navya-forest-800)" />
            Verifiable SGP30/SHT31 Sensor Audit
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
            <Award size={14} color="var(--navya-bronze)" />
            Bilateral Trust & Escrow Guarantee
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
            <HelpCircle size={14} />
            Mandi Dispute Helpline: 1800-NAVYA-AGRI
          </span>
        </div>

        <div style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
          © 2026 Navya Ecosystem. Built for farm-to-fork integrity.
        </div>
      </div>
    </footer>
  );
};
