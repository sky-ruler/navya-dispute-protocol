import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';
import { parseNavyaReportFile, SAMPLE_NAVYA_REPORTS } from '../../services/reportParser';
import { SEED_BATCHES } from '../../services/mockData';

export const ReportUploader = ({ onReportParsed, activeBatch }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setUploadedFileName(file.name);

    try {
      const result = await parseNavyaReportFile(file);
      const matchedBatch = SEED_BATCHES.find(b => b.id.toUpperCase() === result.batchId.toUpperCase()) || {
        id: result.batchId,
        crop: result.crop,
        variety: result.variety,
        emoji: "📦",
        farmer: { name: result.farmerName, fpo: "Regional FPO", region: "India" },
        dealer: { name: "Central APMC Hub" },
        quantityCrates: 100,
        quantityKg: 2000,
        harvestDate: result.harvestDate,
        certifiedGrade: result.certifiedGrade,
        farmGateScore: result.farmGateScore,
        predictedShelfLifeDays: 8,
        initialTelemetry: result.telemetry || { tvoc_ppb: 150, eco2_ppm: 460, temp_c: 18.0, humidity_rh: 65.0 }
      };

      onReportParsed(matchedBatch);
    } catch (err) {
      setError(err.message || "Failed to parse Navya report");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = (sample) => {
    setLoading(true);
    setError(null);
    setUploadedFileName(sample.label.replace('📄 ', ''));

    setTimeout(() => {
      const matched = SEED_BATCHES.find(b => b.id === sample.batchId) || SEED_BATCHES[0];
      onReportParsed(matched);
      setLoading(false);
    }, 400);
  };

  return (
    <div>
      {/* Drag & drop upload box */}
      <label className="dropzone-box" style={{ display: 'block' }}>
        <input
          type="file"
          accept=".json,.txt,.pdf,.csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: 'rgba(0, 61, 44, 0.08)',
          color: 'var(--navya-forest-800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px'
        }}>
          <UploadCloud size={28} />
        </div>

        <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '4px' }}>
          {uploadedFileName ? `Loaded: ${uploadedFileName}` : "Upload Navya Produce Report"}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto' }}>
          Drag & drop your official batch JSON certificate, inspection summary, or sensor export
        </div>

        {loading && (
          <div style={{ marginTop: '12px', fontSize: '13px', color: 'var(--navya-bronze-dark)', fontWeight: 600 }}>
            Parsing sensor telemetry & batch identifiers...
          </div>
        )}

        {error && (
          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--navya-danger)', fontSize: '12.5px' }}>
            <AlertCircle size={15} />
            {error}
          </div>
        )}
      </label>

      {/* 1-Click Sample Reports */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Or select a sample generated Navya Report:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {SAMPLE_NAVYA_REPORTS.map((s) => (
            <div
              key={s.id}
              onClick={() => handleSelectSample(s)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                background: activeBatch?.id === s.batchId ? 'var(--navya-success-bg)' : '#ffffff',
                border: `1px solid ${activeBatch?.id === s.batchId ? 'var(--navya-success-border)' : 'var(--border-subtle)'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileCheck size={18} color="var(--navya-forest-800)" />
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--navya-forest-800)' }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {s.details}
                  </div>
                </div>
              </div>
              <span className="btn-secondary" style={{ padding: '4px 10px', fontSize: '11.5px' }}>
                Load Report
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
