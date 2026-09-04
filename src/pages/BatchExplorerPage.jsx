import React, { useState } from 'react';
import { Search, ShieldCheck, Activity, Thermometer, Wind, QrCode, PlusCircle, ArrowRight } from 'lucide-react';
import { SEED_BATCHES } from '../services/mockData';

export const BatchExplorerPage = ({ onSelectBatchForClaim, onOpenRateModal }) => {
  const [search, setSearch] = useState('');

  const filtered = SEED_BATCHES.filter(b => 
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.crop.toLowerCase().includes(search.toLowerCase()) ||
    b.farmer.name.toLowerCase().includes(search.toLowerCase()) ||
    b.variety.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="batch-explorer-container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Produce Batch Explorer</h1>
          <p className="section-desc">
            Consignment lots registered with dispatch sensor checks and transit checkpoints
          </p>
        </div>

        <div className="batch-search-wrap">
          <input
            type="text"
            className="form-input batch-search-input"
            placeholder="Search crop, batch ID, or farmer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={15} className="batch-search-icon" />
        </div>
      </div>

      <div className="batches-grid">
        {filtered.map((b) => (
          <div 
            key={b.id} 
            className="action-card batch-card"
          >
            <div className="batch-card-header">
              <div className="batch-card-identity">
                <span className="batch-card-emoji">{b.emoji}</span>
                <div>
                  <div className="batch-card-id">
                    {b.id}
                  </div>
                  <div className="batch-card-crop">
                    {b.crop} • {b.variety}
                  </div>
                </div>
              </div>

              <span className="batch-card-grade">
                {b.certifiedGrade} ({b.farmGateScore}/100)
              </span>
            </div>

            <div className="batch-card-details">
              <div><strong>Farmer:</strong> {b.farmer.name} ({b.farmer.fpo})</div>
              <div><strong>Location:</strong> {b.farmer.region}</div>
              <div><strong>Volume:</strong> {b.quantityCrates} Crates ({b.quantityKg} kg)</div>
              <div><strong>Harvested:</strong> {b.harvestDate}</div>
              <div><strong>Last Checkpoint:</strong> {b.lastCheckpoint}</div>
            </div>

            {/* Hardware Sensor Telemetry Box */}
            <div className="batch-telemetry-box">
              <div className="batch-telemetry-header">
                <span className="batch-telemetry-scanner-label">
                  📡 Navya Mobile Scanner v2.1
                </span>
                <span className="batch-telemetry-hw-label">
                  Sensor Readings
                </span>
              </div>

              <div className="batch-telemetry-grid">
                <div>
                  <span className="batch-telemetry-metric">TVOC Gas</span>
                  <strong className="batch-telemetry-value">{b.initialTelemetry.tvoc_ppb} ppb</strong>
                </div>
                <div>
                  <span className="batch-telemetry-metric">eCO₂ Respiration</span>
                  <strong className="batch-telemetry-value">{b.initialTelemetry.eco2_ppm} ppm</strong>
                </div>
                <div>
                  <span className="batch-telemetry-metric">Temperature</span>
                  <strong className="batch-telemetry-value">{b.initialTelemetry.temp_c}°C / {b.initialTelemetry.humidity_rh}% RH</strong>
                </div>
                <div>
                  <span className="batch-telemetry-metric">Sensor Est. Shelf Life</span>
                  <strong className="batch-telemetry-value">{b.predictedShelfLifeDays} Days</strong>
                </div>
              </div>
            </div>

            <div className="batch-card-actions">
              <button 
                className="btn-secondary batch-card-btn"
                onClick={() => onSelectBatchForClaim(b)}
              >
                <PlusCircle size={13} />
                Report Issue
              </button>
              <button 
                className="btn-bronze batch-card-btn"
                onClick={() => onOpenRateModal && onOpenRateModal(b)}
                title="Rate AI prediction accuracy to earn verified discounts"
              >
                🧠 Rate Accuracy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
