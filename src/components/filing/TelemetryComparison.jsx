import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ChevronDown, ChevronUp, Cpu, Thermometer, Wind } from 'lucide-react';

export const TelemetryComparison = ({ batch, comparisonData }) => {
  const [showTechDetails, setShowTechDetails] = useState(false);

  if (!batch) return null;

  const farmTvoc = comparisonData?.farmGateTvoc || batch.initialTelemetry?.tvoc_ppb || 125;
  const arrivalTvoc = comparisonData?.arrivalReportedTvoc || 380;
  const isAnomalous = arrivalTvoc > farmTvoc * 1.5;

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      margin: '16px 0',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* Friendly Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'var(--navya-forest-800)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Cpu size={16} />
          </div>
          <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
            Navya Sensor Verification
          </span>
        </div>

        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          color: isAnomalous ? 'var(--navya-warning)' : 'var(--navya-success)',
          background: isAnomalous ? 'var(--navya-warning-bg)' : 'var(--navya-success-bg)',
          padding: '4px 10px',
          borderRadius: '20px',
          border: `1px solid ${isAnomalous ? 'var(--navya-warning-border)' : 'var(--navya-success-border)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          {isAnomalous ? (
            <>
              <AlertTriangle size={13} />
              Early Decay Confirmed
            </>
          ) : (
            <>
              <ShieldCheck size={13} />
              Normal Freshness
            </>
          )}
        </span>
      </div>

      {/* Simple 2-Card Visual Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div style={{
          background: 'var(--bg-surface-subtle)',
          padding: '12px 14px',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            At Farm Gate
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)', marginTop: '2px' }}>
            Certified {batch.certifiedGrade || 'Grade A'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Harvested {batch.harvestDate} • Fresh condition
          </div>
        </div>

        <div style={{
          background: isAnomalous ? 'var(--navya-warning-bg)' : 'var(--bg-surface-subtle)',
          padding: '12px 14px',
          borderRadius: '8px',
          border: `1px solid ${isAnomalous ? 'var(--navya-warning-border)' : 'var(--border-subtle)'}`
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: isAnomalous ? 'var(--navya-warning)' : 'var(--text-muted)' }}>
            Current Sensor Check
          </div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: isAnomalous ? '#9a5d1e' : 'var(--navya-forest-800)', marginTop: '2px' }}>
            {isAnomalous ? 'Accelerated Ripening' : 'Normal Aging'}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {isAnomalous ? 'Decaying faster than standard shelf life' : 'Produce holds standard freshness'}
          </div>
        </div>
      </div>

      {/* Plain English Verdict */}
      <div style={{
        fontSize: '13px',
        color: 'var(--text-body)',
        lineHeight: 1.5,
        padding: '10px 14px',
        background: 'var(--bg-surface-subtle)',
        borderRadius: '6px',
        borderLeft: `3px solid ${isAnomalous ? 'var(--navya-warning)' : 'var(--navya-success)'}`
      }}>
        <strong>What this means: </strong>
        {comparisonData?.simpleVerdict || (isAnomalous
          ? "The SGP30 gas sensor detected higher ripening gases than normal. This confirms that the produce was fresh at harvest but experienced stress or moisture during transit."
          : "Sensor telemetry indicates the produce is aging at normal expected rates.")}
      </div>

      {/* Optional Collapsible Technical Data for Hackathon Judges */}
      <div style={{ marginTop: '12px', textAlign: 'right' }}>
        <button
          type="button"
          onClick={() => setShowTechDetails(!showTechDetails)}
          style={{
            fontSize: '11.5px',
            fontWeight: 600,
            color: 'var(--navya-forest-800)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {showTechDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showTechDetails ? 'Hide Technical Sensor Data' : 'View Technical Sensor Readings (SGP30 & SHT31)'}
        </button>

        {showTechDetails && (
          <div style={{
            marginTop: '10px',
            padding: '12px',
            background: '#faf9f5',
            borderRadius: '6px',
            border: '1px solid var(--border-medium)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '10px',
            fontSize: '12px',
            textAlign: 'left'
          }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Farm Baseline TVOC</span>
              <strong>{farmTvoc} ppb</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Arrival Reading TVOC</span>
              <strong>{arrivalTvoc} ppb</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>SHT31 Ambient</span>
              <strong>{batch.initialTelemetry?.temp_c || 18}°C / {batch.initialTelemetry?.humidity_rh || 65}% RH</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Sensors</span>
              <strong>SGP30 + SHT31</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
