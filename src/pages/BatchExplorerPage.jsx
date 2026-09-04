import React, { useState } from 'react';
import { Search, ShieldCheck, Activity, Thermometer, Wind, QrCode, PlusCircle, ArrowRight } from 'lucide-react';
import { SEED_BATCHES } from '../services/mockData';

export const BatchExplorerPage = ({ onSelectBatchForClaim }) => {
  const [search, setSearch] = useState('');

  const filtered = SEED_BATCHES.filter(b => 
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.crop.toLowerCase().includes(search.toLowerCase()) ||
    b.farmer.name.toLowerCase().includes(search.toLowerCase()) ||
    b.variety.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="batch-explorer-container">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '26px' }}>Navya Produce Batch Explorer</h1>
          <p className="section-desc">
            Cryptographically registered produce batches with immutable sensor baselines and checkpoints
          </p>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <input
            type="text"
            className="form-input"
            style={{ padding: '8px 12px 8px 34px', fontSize: '13px' }}
            placeholder="Search crop, batch ID, or farmer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: 'var(--text-muted)' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map((b) => (
          <div 
            key={b.id} 
            className="action-card"
            style={{ background: '#ffffff' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '28px' }}>{b.emoji}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
                    {b.id}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)' }}>
                    {b.crop} • {b.variety}
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: '11.5px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
                background: 'var(--navya-success-bg)',
                color: 'var(--navya-success)',
                border: '1px solid var(--navya-success-border)'
              }}>
                {b.certifiedGrade} ({b.farmGateScore}/100)
              </span>
            </div>

            <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.5 }}>
              <div><strong>Farmer:</strong> {b.farmer.name} ({b.farmer.fpo})</div>
              <div><strong>Location:</strong> {b.farmer.region}</div>
              <div><strong>Volume:</strong> {b.quantityCrates} Crates ({b.quantityKg} kg)</div>
              <div><strong>Harvested:</strong> {b.harvestDate}</div>
              <div><strong>Last Checkpoint:</strong> {b.lastCheckpoint}</div>
            </div>

            {/* Sensor Telemetry Box */}
            <div style={{
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '12px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '11.5px',
              marginBottom: '16px'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>SGP30 TVOC</span>
                <strong style={{ color: 'var(--navya-forest-800)' }}>{b.initialTelemetry.tvoc_ppb} ppb</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>eCO₂ Reading</span>
                <strong style={{ color: 'var(--navya-forest-800)' }}>{b.initialTelemetry.eco2_ppm} ppm</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>SHT31 Ambient</span>
                <strong style={{ color: 'var(--navya-forest-800)' }}>{b.initialTelemetry.temp_c}°C / {b.initialTelemetry.humidity_rh}% RH</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>Est. Shelf Life</span>
                <strong style={{ color: 'var(--navya-forest-800)' }}>{b.predictedShelfLifeDays} Days</strong>
              </div>
            </div>

            <button 
              className="btn-secondary" 
              style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
              onClick={() => onSelectBatchForClaim(b)}
            >
              <PlusCircle size={14} />
              File Quality Claim on this Batch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
