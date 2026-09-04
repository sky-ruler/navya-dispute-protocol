import React, { useState } from 'react';
import { 
  FileText, 
  QrCode, 
  UploadCloud, 
  CheckCircle2, 
  Camera, 
  Trash2, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { QrScannerModal } from '../components/filing/QrScannerModal';
import { ReportUploader } from '../components/filing/ReportUploader';
import { SEED_BATCHES, SAMPLE_DEFECT_PHOTOS } from '../services/mockData';
import { disputeService } from '../services/disputeService';

export const FileComplaintPage = ({ onDisputeCreated, activeRole }) => {
  const [selectedBatch, setSelectedBatch] = useState(SEED_BATCHES[0]);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [showReportUploader, setShowReportUploader] = useState(false);

  // Simple, intuitive issue categories
  const [issueType, setIssueType] = useState('PREMATURE_DECAY');
  const [damagedCrates, setDamagedCrates] = useState(15);
  const [notes, setNotes] = useState('About 15 crates at the bottom arrived soft with early moisture damage.');
  const [remedyChoice, setRemedyChoice] = useState('REPLACEMENT'); // 'REPLACEMENT' | 'DISCOUNT' | 'CHECK'
  const [evidenceImages, setEvidenceImages] = useState([
    SAMPLE_DEFECT_PHOTOS[0].url
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueOptions = [
    {
      id: 'PREMATURE_DECAY',
      title: 'Spoiled / Rotting Early',
      desc: 'Fruits are soft, leaking, or show fungal moisture patches',
      emoji: '🍄'
    },
    {
      id: 'CARBIDE_SUSPICION',
      title: 'Chemical / Carbide Smell',
      desc: 'Unnatural yellow skin but hard raw pulp inside with odor',
      emoji: '🧪'
    },
    {
      id: 'TRANSIT_HEAT_ABUSE',
      title: 'Overheated in Transport',
      desc: 'Truck cooling failed or sat in direct sunlight',
      emoji: '🌡️'
    },
    {
      id: 'CRATE_DAMAGE',
      title: 'Crushed Crates / Damage',
      desc: 'Rough transit caused physical bruising or breakage',
      emoji: '📦'
    }
  ];

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

  const addSamplePhoto = (url) => {
    if (!evidenceImages.includes(url)) {
      setEvidenceImages([...evidenceImages, url]);
    }
  };

  const removePhoto = (index) => {
    setEvidenceImages(evidenceImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBatch) return;

    setIsSubmitting(true);

    const matchedIssue = issueOptions.find(i => i.id === issueType);

    const disputePayload = {
      batchId: selectedBatch.id,
      crop: selectedBatch.crop,
      variety: selectedBatch.variety,
      complainantRole: activeRole,
      complainantName: activeRole === 'DEALER' 
        ? (selectedBatch.dealer?.name || "Local Mandi Dealer") 
        : (selectedBatch.farmer?.name || "Grower Member"),
      defectCategory: issueType,
      defectTitle: matchedIssue?.title || "Produce Quality Issue",
      description: notes || "Produce arrived in substandard condition.",
      severity: issueType === 'CARBIDE_SUSPICION' ? 'CRITICAL' : 'MODERATE',
      affectedCrates: Number(damagedCrates) || 10,
      affectedKg: (Number(damagedCrates) || 10) * 20,
      estimatedDisputeAmountInr: remedyChoice === 'DISCOUNT' ? 1200 : 0,
      requestedRemedy: remedyChoice === 'DISCOUNT' ? 'CREDIT_NOTE' : 'REPLACEMENT_BATCH',
      evidenceImages,
      estimatedArrivalTvoc: issueType === 'CARBIDE_SUSPICION' ? 1650 : 380
    };

    setTimeout(() => {
      const newDispute = disputeService.createDispute(disputePayload);
      setIsSubmitting(false);
      onDisputeCreated(newDispute.id);
    }, 500);
  };

  return (
    <div className="file-complaint-container">
      {/* Page Title */}
      <div className="page-header-block">
        <h1 className="page-main-title">
          Report a Quality Problem
        </h1>
        <p className="page-main-desc">
          Fill in 3 simple details so your dealer can review and fix the issue
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Batch */}
        <div className="form-card">
          <div className="form-card-header">
            <div className="form-card-title">
              Step 1: Which Produce Batch?
            </div>
            <div className="form-card-actions">
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => setIsQrModalOpen(true)}
              >
                <QrCode size={14} />
                <span className="btn-label-mobile-hide">Scan Crate</span> QR
              </button>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => setShowReportUploader(!showReportUploader)}
              >
                <UploadCloud size={14} />
                <span className="btn-label-mobile-hide">Upload</span> Report
              </button>
            </div>
          </div>

          {/* Quick Click Batches */}
          <div className="batch-select-grid">
            {SEED_BATCHES.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBatch(b)}
                className={`batch-select-card ${selectedBatch?.id === b.id ? 'selected' : ''}`}
              >
                <div style={{ fontSize: '20px' }}>{b.emoji}</div>
                <div className="batch-select-name">
                  {b.crop}
                </div>
                <div className="batch-select-meta">
                  {b.id} • {b.quantityCrates} Crates
                </div>
              </div>
            ))}
          </div>

          {/* Optional Report Uploader drop-down */}
          {showReportUploader && (
            <div className="report-uploader-wrap">
              <ReportUploader
                onReportParsed={(parsed) => {
                  setSelectedBatch(parsed);
                  setShowReportUploader(false);
                }}
                activeBatch={selectedBatch}
              />
            </div>
          )}

          {/* Simple Selected Batch Badge */}
          {selectedBatch && (
            <div className="selected-batch-badge">
              <div className="selected-batch-info">
                <CheckCircle2 size={16} color="#16a34a" />
                <span>
                  Selected: <strong>{selectedBatch.crop}</strong> ({selectedBatch.id})
                </span>
                <span className="grade-pill">
                  {selectedBatch.certifiedGrade || 'Grade A'} Verified
                </span>
              </div>
              <span className="selected-batch-count">
                {selectedBatch.quantityCrates} Crates Available
              </span>
            </div>
          )}
        </div>

        {/* Step 2: What is the issue? */}
        <div className="form-card">
          <div className="form-card-title" style={{ marginBottom: '14px' }}>
            Step 2: What Went Wrong?
          </div>

          {/* Big Issue Selection Cards */}
          <div className="issue-select-grid">
            {issueOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setIssueType(opt.id)}
                className={`issue-select-card ${issueType === opt.id ? 'selected' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{opt.emoji}</span>
                  <span className="issue-select-title">
                    {opt.title}
                  </span>
                </div>
                <div className="issue-select-desc">
                  {opt.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="form-two-col">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">How Many Crates Are Affected?</label>
              <input
                type="number"
                className="form-input"
                value={damagedCrates}
                onChange={(e) => setDamagedCrates(e.target.value)}
                min="1"
                max={selectedBatch?.quantityCrates || 200}
                required
              />
              <div className="form-help">Total batch volume is {selectedBatch?.quantityCrates || 100} crates</div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">What Solution Would You Prefer?</label>
              <select
                className="form-select"
                value={remedyChoice}
                onChange={(e) => setRemedyChoice(e.target.value)}
              >
                <option value="REPLACEMENT">🔄 Send Replacement Fresh Crates</option>
                <option value="DISCOUNT">🏷️ Small Price Discount on this lot</option>
                <option value="CHECK">🔬 Mandi Kiosk Re-Inspection</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Add a Short Note for the Dealer</label>
            <textarea
              className="form-textarea"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Please check the bottom crates, top ones were fine..."
            />
          </div>
        </div>

        {/* Step 3: Photos & Submit */}
        <div className="form-card">
          <div className="form-card-title" style={{ marginBottom: '14px' }}>
            Step 3: Add Photos of Damaged Produce
          </div>

          <div className="photo-actions-row">
            <label className="btn-secondary photo-upload-btn">
              <Camera size={15} />
              Take or Upload Photo
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCustomPhotoUpload} />
            </label>
            <span className="photo-hint-text">
              or click to add test photo:
            </span>
            {SAMPLE_DEFECT_PHOTOS.slice(0, 2).map((s, idx) => (
              <button
                key={idx}
                type="button"
                className="sample-pill-btn"
                onClick={() => addSamplePhoto(s.url)}
              >
                + {s.name}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          {evidenceImages.length > 0 && (
            <div className="evidence-grid" style={{ marginBottom: '16px' }}>
              {evidenceImages.map((img, i) => (
                <div key={i} className="evidence-thumb-box">
                  <img src={img} alt="Evidence" className="evidence-thumb-img" />
                  <button
                    type="button"
                    className="evidence-remove-btn"
                    onClick={() => removePhoto(i)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary submit-claim-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>Sending Report to Dealer...</span>
            ) : (
              <>
                <span>Submit Complaint to Dealer</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </form>

      {/* QR Modal */}
      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onBatchScanned={(scanned) => {
          setSelectedBatch(scanned);
        }}
      />
    </div>
  );
};
