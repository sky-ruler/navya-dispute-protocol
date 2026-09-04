import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  QrCode, 
  UploadCloud, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  Trash2, 
  ShieldCheck, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { QrScannerModal } from '../components/filing/QrScannerModal';
import { ReportUploader } from '../components/filing/ReportUploader';
import { TelemetryComparison } from '../components/filing/TelemetryComparison';
import { SEED_BATCHES, SAMPLE_DEFECT_PHOTOS } from '../services/mockData';
import { disputeService } from '../services/disputeService';

export const FileComplaintPage = ({ onDisputeCreated, activeRole }) => {
  // Filing tab: 'batch-id' | 'qr-scan' | 'upload-report'
  const [activeTab, setActiveTab] = useState('batch-id');

  // Selected Batch state
  const [batchSearchInput, setBatchSearchInput] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(SEED_BATCHES[0]);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Form Fields
  const [defectCategory, setDefectCategory] = useState('PREMATURE_DECAY');
  const [defectTitle, setDefectTitle] = useState('Premature Spoilage & Fungal Decay');
  const [description, setDescription] = useState(
    'Upon opening crates at destination dock, produce showed signs of accelerated rotting and fungal patches inconsistent with the certified Grade A farm-gate report.'
  );
  const [severity, setSeverity] = useState('MODERATE');
  const [affectedCrates, setAffectedCrates] = useState(25);
  const [affectedKg, setAffectedKg] = useState(500);
  const [estimatedDisputeAmountInr, setEstimatedDisputeAmountInr] = useState(12000);
  const [requestedRemedy, setRequestedRemedy] = useState('CREDIT_NOTE');
  const [evidenceImages, setEvidenceImages] = useState([
    SAMPLE_DEFECT_PHOTOS[0].url,
    SAMPLE_DEFECT_PHOTOS[1].url
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter batches for autocomplete
  const filteredBatches = SEED_BATCHES.filter(b => 
    b.id.toLowerCase().includes(batchSearchInput.toLowerCase()) ||
    b.crop.toLowerCase().includes(batchSearchInput.toLowerCase()) ||
    b.farmer.name.toLowerCase().includes(batchSearchInput.toLowerCase())
  );

  const handleSelectBatch = (batch) => {
    setSelectedBatch(batch);
    setBatchSearchInput(batch.id);
  };

  const handleBatchScanned = (scannedBatch) => {
    setSelectedBatch(scannedBatch);
    setBatchSearchInput(scannedBatch.id);
  };

  const handleReportParsed = (parsedBatch) => {
    setSelectedBatch(parsedBatch);
    setBatchSearchInput(parsedBatch.id);
  };

  const addSamplePhoto = (photoUrl) => {
    if (!evidenceImages.includes(photoUrl)) {
      setEvidenceImages([...evidenceImages, photoUrl]);
    }
  };

  const removePhoto = (index) => {
    setEvidenceImages(evidenceImages.filter((_, i) => i !== index));
  };

  const handleCustomPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEvidenceImages([...evidenceImages, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBatch) {
      alert("Please select or scan a valid produce batch first.");
      return;
    }

    setIsSubmitting(true);

    const disputePayload = {
      batchId: selectedBatch.id,
      crop: selectedBatch.crop,
      variety: selectedBatch.variety,
      complainantRole: activeRole,
      complainantName: activeRole === 'DEALER' 
        ? (selectedBatch.dealer?.name || "GreenRoots Mandi Aggregator") 
        : (selectedBatch.farmer?.name || "Kisan Producer Member"),
      defectCategory,
      defectTitle,
      description,
      severity,
      affectedCrates: Number(affectedCrates),
      affectedKg: Number(affectedKg),
      estimatedDisputeAmountInr: Number(estimatedDisputeAmountInr),
      requestedRemedy,
      evidenceImages,
      estimatedArrivalTvoc: defectCategory === 'CARBIDE_SUSPICION' ? 1950 : 420
    };

    setTimeout(() => {
      const newDispute = disputeService.createDispute(disputePayload);
      setIsSubmitting(false);
      onDisputeCreated(newDispute.id);
    }, 600);
  };

  return (
    <div className="file-complaint-container">
      {/* Page Title */}
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1 className="section-title" style={{ fontSize: '26px' }}>File a Quality Dispute or Claim</h1>
          <p className="section-desc">
            Submit a verifiable quality discrepancy backed by Navya produce telemetry
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Batch Identification Wizard Card */}
        <div className="wizard-card">
          <div className="wizard-tabs">
            <button
              type="button"
              className={`wizard-tab-btn ${activeTab === 'batch-id' ? 'active' : ''}`}
              onClick={() => setActiveTab('batch-id')}
            >
              <FileText size={16} />
              1. Enter Batch ID
            </button>
            <button
              type="button"
              className={`wizard-tab-btn ${activeTab === 'qr-scan' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('qr-scan');
                setIsQrModalOpen(true);
              }}
            >
              <QrCode size={16} />
              2. Scan QR Passport
            </button>
            <button
              type="button"
              className={`wizard-tab-btn ${activeTab === 'upload-report' ? 'active' : ''}`}
              onClick={() => setActiveTab('upload-report')}
            >
              <UploadCloud size={16} />
              3. Upload Navya Report
            </button>
          </div>

          <div className="wizard-body">
            {/* Tab 1: Batch ID Search & Autocomplete */}
            {activeTab === 'batch-id' && (
              <div>
                <div className="form-group">
                  <label className="form-label">
                    Batch ID or Tracking Token <span className="req">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Type or search Batch ID (e.g. NAV-2026-APL-409)..."
                      value={batchSearchInput}
                      onChange={(e) => setBatchSearchInput(e.target.value)}
                    />
                    <div style={{ position: 'absolute', right: '12px', top: '11px', color: 'var(--text-muted)' }}>
                      <Search size={18} />
                    </div>
                  </div>
                  <div className="form-help">
                    Quick suggestions from recent harvest dispatches:
                  </div>
                </div>

                {/* Autocomplete Quick Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  {SEED_BATCHES.map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => handleSelectBatch(b)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-full)',
                        border: `1px solid ${selectedBatch?.id === b.id ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                        background: selectedBatch?.id === b.id ? 'var(--navya-forest-800)' : '#ffffff',
                        color: selectedBatch?.id === b.id ? '#ffffff' : 'var(--navya-forest-800)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{b.emoji}</span>
                      <span>{b.id}</span>
                      <span style={{ opacity: 0.8, fontSize: '11px' }}>({b.crop})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: QR Scanner Helper */}
            {activeTab === 'qr-scan' && (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  color: 'var(--navya-forest-800)'
                }}>
                  <QrCode size={32} />
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '6px' }}>
                  Scan Crate Digital Produce Passport
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 16px' }}>
                  Use device optical scanner to decrypt batch cryptographic keys directly from the crate tag.
                </p>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setIsQrModalOpen(true)}
                >
                  <Camera size={16} />
                  Launch Scanner Viewfinder
                </button>
              </div>
            )}

            {/* Tab 3: Upload Report */}
            {activeTab === 'upload-report' && (
              <ReportUploader 
                onReportParsed={handleReportParsed}
                activeBatch={selectedBatch}
              />
            )}

            {/* Selected Batch Summary Banner */}
            {selectedBatch && (
              <div style={{
                marginTop: '20px',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--navya-success-bg)',
                border: '1px solid var(--navya-success-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ fontSize: '32px' }}>{selectedBatch.emoji}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--navya-forest-800)', fontSize: '15px' }}>
                        {selectedBatch.id}
                      </span>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, background: '#ffffff', color: 'var(--navya-success)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--navya-success-border)' }}>
                        {selectedBatch.certifiedGrade} (Score: {selectedBatch.farmGateScore})
                      </span>
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                      {selectedBatch.crop} • {selectedBatch.variety}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Farmer: {selectedBatch.farmer?.name} ({selectedBatch.farmer?.region}) • Last Checkpoint: {selectedBatch.lastCheckpoint}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={20} color="var(--navya-success)" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                    Baseline Verified
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Telemetry Comparison & Sensor Audit Card */}
        {selectedBatch && (
          <TelemetryComparison 
            batch={selectedBatch} 
            comparisonData={{
              farmGateTvoc: selectedBatch.initialTelemetry?.tvoc_ppb || 120,
              arrivalReportedTvoc: defectCategory === 'CARBIDE_SUSPICION' ? 1950 : 420,
              normalDecayTvoc: Math.round((selectedBatch.initialTelemetry?.tvoc_ppb || 120) * 1.5),
              tempDelta: "+3.2°C ambient shift",
              verdict: defectCategory === 'CARBIDE_SUSPICION'
                ? "Severe slope anomaly (dVOC/dt = 2.45). Chemical ripening signature matches acetylene off-gassing."
                : "Accelerated ripening detected (+65% over typical post-harvest curve). Validates early spoilage claim."
            }}
          />
        )}

        {/* Step 2: Defect Details & Evidence Card */}
        <div className="wizard-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>2. Defect Specification & Proof of Condition</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Defect Category */}
            <div className="form-group">
              <label className="form-label">Defect Category <span className="req">*</span></label>
              <select
                className="form-select"
                value={defectCategory}
                onChange={(e) => {
                  setDefectCategory(e.target.value);
                  if (e.target.value === 'CARBIDE_SUSPICION') {
                    setDefectTitle('Abnormal Acetylene Spike & Artificial Ripening');
                    setSeverity('CRITICAL');
                  } else if (e.target.value === 'TRANSIT_HEAT_ABUSE') {
                    setDefectTitle('Transit Temperature Abuse / Cold Chain Break');
                  } else {
                    setDefectTitle('Premature Spoilage & Fungal Decay');
                  }
                }}
              >
                <option value="PREMATURE_DECAY">🍄 Premature Spoilage / Fungal Breakdown</option>
                <option value="CARBIDE_SUSPICION">🧪 Calcium Carbide / Chemical Ripening Suspicion</option>
                <option value="TRANSIT_HEAT_ABUSE">🌡️ Transit Temperature Abuse / Reefer Breakdown</option>
                <option value="GRADE_MISMATCH">⚖️ Visual Grade Mismatch vs. Farm-Gate Certificate</option>
                <option value="QUANTITY_MISMATCH">📦 Crate Shortage / Weight Discrepancy</option>
              </select>
            </div>

            {/* Severity */}
            <div className="form-group">
              <label className="form-label">Severity Level <span className="req">*</span></label>
              <select
                className="form-select"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="MINOR">🌱 Minor (Salvageable / Cosmetic Flaw)</option>
                <option value="MODERATE">⚡ Moderate (Partial lot affected, fast decay)</option>
                <option value="CRITICAL">⚠️ Critical (Immediate total loss / health violation)</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Issue Summary / Title <span className="req">*</span></label>
            <input
              type="text"
              className="form-input"
              value={defectTitle}
              onChange={(e) => setDefectTitle(e.target.value)}
              placeholder="e.g. Moisture Condensation & Softening in Bottom Layers"
              required
            />
          </div>

          {/* Affected Volume */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Affected Crates</label>
              <input
                type="number"
                className="form-input"
                value={affectedCrates}
                onChange={(e) => {
                  setAffectedCrates(e.target.value);
                  setAffectedKg(Number(e.target.value) * 20);
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Est. Weight (kg)</label>
              <input
                type="number"
                className="form-input"
                value={affectedKg}
                onChange={(e) => setAffectedKg(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Dispute Value Claimed (₹)</label>
              <input
                type="number"
                className="form-input"
                value={estimatedDisputeAmountInr}
                onChange={(e) => setEstimatedDisputeAmountInr(e.target.value)}
              />
            </div>
          </div>

          {/* Remedy */}
          <div className="form-group">
            <label className="form-label">Requested Redressal Remedy <span className="req">*</span></label>
            <select
              className="form-select"
              value={requestedRemedy}
              onChange={(e) => setRequestedRemedy(e.target.value)}
            >
              <option value="CREDIT_NOTE">💰 Credit Note / Agreed Percentage Discount</option>
              <option value="REPLACEMENT_BATCH">🔄 Priority Replacement Batch (FEFO Reroute)</option>
              <option value="KIOSK_RESCAN">🔬 Mandatory Mandi Kiosk Re-Scan & Lab Audit</option>
              <option value="FULL_REFUND">🛡️ Full Batch Rejection & Escrow Refund</option>
            </select>
          </div>

          {/* Detailed Observations */}
          <div className="form-group">
            <label className="form-label">Detailed Description of Discrepancy <span className="req">*</span></label>
            <textarea
              className="form-textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe physical smell, surface discoloration, truck condition, or temperature recordings..."
              required
            />
          </div>

          {/* Photographic Proof */}
          <div className="form-group">
            <label className="form-label">Photographic Proof & Condition Evidence</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
              <label className="btn-secondary" style={{ cursor: 'pointer', padding: '7px 14px', fontSize: '13px' }}>
                <Camera size={15} />
                Upload Photo from Device
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCustomPhotoUpload} />
              </label>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                or pick sample damaged produce proof:
              </span>
            </div>

            {/* Quick Sample Photos */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              {SAMPLE_DEFECT_PHOTOS.map((sample, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => addSamplePhoto(sample.url)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-medium)',
                    background: evidenceImages.includes(sample.url) ? 'var(--navya-sage)' : '#ffffff',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: 'var(--navya-forest-800)',
                    cursor: 'pointer'
                  }}
                >
                  + Add {sample.name}
                </button>
              ))}
            </div>

            {/* Evidence Image Previews */}
            {evidenceImages.length > 0 && (
              <div className="evidence-grid">
                {evidenceImages.map((img, i) => (
                  <div key={i} className="evidence-thumb-box">
                    <img src={img} alt="Evidence" className="evidence-thumb-img" />
                    <button
                      type="button"
                      className="evidence-remove-btn"
                      onClick={() => removePhoto(i)}
                      title="Remove image"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '15px' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Generating Immutable Ticket...</span>
              ) : (
                <>
                  <span>Submit Quality Dispute Ticket</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* QR Scanner Modal */}
      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onBatchScanned={handleBatchScanned}
      />
    </div>
  );
};
