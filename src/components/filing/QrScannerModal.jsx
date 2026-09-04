import React, { useState, useEffect } from 'react';
import { QrCode, Camera, Upload, X, CheckCircle2, Sparkles } from 'lucide-react';
import { SEED_BATCHES } from '../../services/mockData';

export const QrScannerModal = ({ isOpen, onClose, onBatchScanned }) => {
  const [scanning, setScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setScannedResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const simulateScan = (batchId) => {
    setScanning(false);
    const found = SEED_BATCHES.find(b => b.id === batchId) || SEED_BATCHES[0];
    setScannedResult(found);
    setTimeout(() => {
      onBatchScanned(found);
      onClose();
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate reading QR code from image file
      simulateScan(SEED_BATCHES[0].id);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--navya-forest-800)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <QrCode size={18} />
            </div>
            <div>
              <div className="modal-title">Scan Digital Produce Passport</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Point camera at crate QR tag or choose a sample passport
              </div>
            </div>
          </div>
          <button className="evidence-remove-btn" onClick={onClose} style={{ position: 'static' }}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="qr-scanner-box">
            {scanning ? (
              <>
                <div className="scanner-viewfinder">
                  <div className="scan-laser-line"></div>
                  <div className="viewfinder-corners"></div>
                  <QrCode size={90} color="rgba(255, 255, 255, 0.2)" />
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--navya-forest-800)', marginBottom: '4px' }}>
                  Align QR Code inside Viewfinder
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', maxWidth: '300px' }}>
                  Scanning for official Navya cryptographic batch token...
                </div>
              </>
            ) : (
              <div style={{ padding: '24px 0', display: 'flex', flex_direction: 'column', alignItems: 'center', textAlign: 'center' }}>
                <CheckCircle2 size={56} color="var(--navya-success)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                  Passport Verified!
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--navya-bronze-dark)', fontWeight: 700, marginTop: '4px' }}>
                  {scannedResult?.id}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {scannedResult?.crop} ({scannedResult?.variety}) • {scannedResult?.certifiedGrade}
                </div>
              </div>
            )}
          </div>

          {/* Quick Simulation Options */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Instant Demo: Tap to simulate scanned crate
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {SEED_BATCHES.slice(0, 3).map((b) => (
                <button
                  key={b.id}
                  className="btn-secondary"
                  style={{
                    padding: '8px 10px',
                    fontSize: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    textAlign: 'center'
                  }}
                  onClick={() => simulateScan(b.id)}
                >
                  <span style={{ fontSize: '18px' }}>{b.emoji}</span>
                  <span style={{ fontWeight: 700, color: 'var(--navya-forest-800)' }}>{b.crop}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-subtle)' }}>{b.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Upload QR Image file alternative */}
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12.5px',
              color: 'var(--navya-forest-800)',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '6px',
              background: 'var(--bg-surface-subtle)'
            }}>
              <Upload size={14} />
              Upload QR Code image from device
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
