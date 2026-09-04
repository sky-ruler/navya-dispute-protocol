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
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--navya-forest-800)' }}>
          Report a Quality Problem
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Fill in 3 simple details so your dealer can review and fix the issue
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Select Batch */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
              Step 1: Which Produce Batch?
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => setIsQrModalOpen(true)}
              >
                <QrCode size={14} />
                Scan Crate QR
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px' }}
                onClick={() => setShowReportUploader(!showReportUploader)}
              >
                <UploadCloud size={14} />
                Upload Report
              </button>
            </div>
          </div>

          {/* Quick Click Batches */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '16px' }}>
            {SEED_BATCHES.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBatch(b)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1.5px solid ${selectedBatch?.id === b.id ? 'var(--navya-forest-800)' : 'var(--border-subtle)'}`,
                  background: selectedBatch?.id === b.id ? 'var(--navya-success-bg)' : 'var(--bg-surface-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '20px' }}>{b.emoji}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navya-forest-800)', marginTop: '4px' }}>
                  {b.crop}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  {b.id} • {b.quantityCrates} Crates
                </div>
              </div>
            ))}
          </div>

          {/* Optional Report Uploader drop-down */}
          {showReportUploader && (
            <div style={{ marginTop: '16px', padding: '16px', background: '#faf9f5', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
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
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12.5px',
              color: 'var(--navya-forest-800)',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#16a34a" />
                <span>
                  Selected: <strong>{selectedBatch.crop}</strong> ({selectedBatch.id})
                </span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {selectedBatch.certifiedGrade || 'Grade A'} Verified
                </span>
              </div>
              <span style={{ fontSize: '11.5px', color: '#166534', fontWeight: 600 }}>
                {selectedBatch.quantityCrates} Crates Available
              </span>
            </div>
          )}
        </div>

        {/* Step 2: What is the issue? */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '14px' }}>
            Step 2: What Went Wrong?
          </div>

          {/* Big Issue Selection Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {issueOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setIssueType(opt.id)}
                style={{
                  padding: '14px',
                  borderRadius: '8px',
                  border: `1.5px solid ${issueType === opt.id ? 'var(--navya-forest-800)' : 'var(--border-medium)'}`,
                  background: issueType === opt.id ? 'var(--navya-success-bg)' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{opt.emoji}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                    {opt.title}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {opt.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
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
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          marginBottom: '28px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navya-forest-800)', marginBottom: '14px' }}>
            Step 3: Add Photos of Damaged Produce
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
            <label className="btn-secondary" style={{ cursor: 'pointer', padding: '7px 14px', fontSize: '13px' }}>
              <Camera size={15} />
              Take or Upload Photo
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCustomPhotoUpload} />
            </label>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
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
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px' }}
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
