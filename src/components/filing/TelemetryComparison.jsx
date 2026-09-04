import React from 'react';
import { Activity, Thermometer, Wind, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

export const TelemetryComparison = ({ batch, comparisonData }) => {
  if (!batch) return null;

  const farmTvoc = comparisonData?.farmGateTvoc || batch.initialTelemetry?.tvoc_ppb || 120;
  const arrivalTvoc = comparisonData?.arrivalReportedTvoc || Math.round(farmTvoc * 2.8);
  const normalDecayTvoc = comparisonData?.normalDecayTvoc || Math.round(farmTvoc * 1.5);
  const isAnomalous = arrivalTvoc > normalDecayTvoc * 1.3;

  return (
    <div className="telemetry-card">
      <div className="telemetry-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="var(--navya-forest-800)" />
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
            Sensor Telemetry & Decay Deviation Analysis
          </span>
        </div>
        <span style={{
          fontSize: '12px',
          fontWeight: 600,
          color: isAnomalous ? 'var(--navya-danger)' : 'var(--navya-success)',
          background: isAnomalous ? 'var(--navya-danger-bg)' : 'var(--navya-success-bg)',
          padding: '3px 10px',
          borderRadius: '12px',
          border: `1px solid ${isAnomalous ? 'var(--navya-danger-border)' : 'var(--navya-success-border)'}`
        }}>
          {isAnomalous ? '⚠️ Telemetry Anomaly Flagged' : '✅ Consistent with Natural Shelf-Life'}
        </span>
      </div>

      <div className="telemetry-grid">
        {/* Farm Gate Baseline */}
        <div className="telemetry-cell">
          <div className="telemetry-label">Farm Gate SGP30 Baseline</div>
          <div className="telemetry-val">{farmTvoc} <span style={{ fontSize: '12px', fontWeight: 500 }}>ppb TVOC</span></div>
          <div className="telemetry-delta normal">
            <ShieldCheck size={13} />
            Certified {batch.certifiedGrade || 'Grade A'} (Score: {batch.farmGateScore || 90}/100)
          </div>
        </div>

        {/* Expected Natural Biological Curve */}
        <div className="telemetry-cell">
          <div className="telemetry-label">Expected Biological Decay</div>
          <div className="telemetry-val">{normalDecayTvoc} <span style={{ fontSize: '12px', fontWeight: 500 }}>ppb TVOC</span></div>
          <div className="telemetry-delta" style={{ color: 'var(--text-muted)' }}>
            <Clock size={13} />
            Estimated for {batch.predictedShelfLifeDays || 7} days shelf-life
          </div>
        </div>

        {/* Arrival / Reported Level */}
        <div className="telemetry-cell" style={{ background: isAnomalous ? '#fff5f5' : '#f8f7f2', borderColor: isAnomalous ? '#fed7d7' : 'var(--border-subtle)' }}>
          <div className="telemetry-label" style={{ color: isAnomalous ? 'var(--navya-danger)' : 'var(--text-muted)' }}>
            Arrival Inspection Reading
          </div>
          <div className="telemetry-val" style={{ color: isAnomalous ? 'var(--navya-danger)' : 'var(--navya-forest-800)' }}>
            {arrivalTvoc} <span style={{ fontSize: '12px', fontWeight: 500 }}>ppb TVOC</span>
          </div>
          <div className={`telemetry-delta ${isAnomalous ? 'critical' : 'normal'}`}>
            <AlertTriangle size={13} />
            {isAnomalous ? `+${Math.round(((arrivalTvoc - normalDecayTvoc) / normalDecayTvoc) * 100)}% abnormal surge` : 'Within standard bounds'}
          </div>
        </div>

        {/* Environmental Baseline */}
        <div className="telemetry-cell">
          <div className="telemetry-label">SHT31 Ambient Baseline</div>
          <div className="telemetry-val">
            {batch.initialTelemetry?.temp_c || 18}°C / {batch.initialTelemetry?.humidity_rh || 65}% RH
          </div>
          <div className="telemetry-delta" style={{ color: 'var(--text-muted)' }}>
            <Thermometer size={13} />
            {comparisonData?.tempDelta || "Logistics cold-chain envelope"}
          </div>
        </div>
      </div>

      {/* AI Verdict Summary */}
      <div style={{
        marginTop: '16px',
        padding: '12px 16px',
        borderRadius: '8px',
        background: isAnomalous ? 'var(--navya-warning-bg)' : 'var(--bg-surface-subtle)',
        border: `1px solid ${isAnomalous ? 'var(--navya-warning-border)' : 'var(--border-subtle)'}`,
        fontSize: '13px',
        color: 'var(--text-body)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px'
      }}>
        <div style={{ color: isAnomalous ? 'var(--navya-warning)' : 'var(--navya-forest-800)', marginTop: '2px' }}>
          <Activity size={16} />
        </div>
        <div>
          <span style={{ fontWeight: 700, color: 'var(--navya-forest-800)' }}>Navya Sensor Assessment: </span>
          {comparisonData?.verdict || (isAnomalous 
            ? "Premature off-gassing detected. Volatile compounds exceed baseline threshold, validating the claim of accelerated rotting or temperature stress during transit."
            : "Off-gassing aligns with typical post-harvest dormancy. Batch indicates sound baseline integrity.")}
        </div>
      </div>
    </div>
  );
};
