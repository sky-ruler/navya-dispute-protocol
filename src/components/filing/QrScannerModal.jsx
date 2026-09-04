import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Camera, Upload, X, CheckCircle2, Sparkles, RefreshCw, Radio } from 'lucide-react';
import { SEED_BATCHES } from '../../services/mockData';

export const QrScannerModal = ({ isOpen, onClose, onBatchScanned }) => {
  const [scanning, setScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState(null);
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setScannedResult(null);
      setCameraError(null);
    } else {
      stopCamera();
    }
  }, [isOpen]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setUseLiveCamera(true);
      } else {
        setCameraError("Camera access not supported on this browser.");
      }
    } catch (err) {
      setCameraError("Camera permission not granted or device unavailable. Using simulation.");
      setUseLiveCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setUseLiveCamera(false);
  };

  if (!isOpen) return null;

  const handleScanBatch = (batchId) => {
    setScanning(false);
    stopCamera();
    const found = SEED_BATCHES.find(b => b.id === batchId) || SEED_BATCHES[0];
    setScannedResult(found);
    setTimeout(() => {
      onBatchScanned(found);
      onClose();
    }, 1000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Pick matched batch or default to first seed batch
      handleScanBatch(SEED_BATCHES[0].id);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="rate-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        {/* Top Gradient Ribbon */}
        <div className="rate-modal-top-accent" />

        {/* Modal Header */}
        <div className="rate-modal-header">
          <div className="rate-header-left">
            <div className="rate-header-icon-box" style={{ background: 'linear-gradient(135deg, var(--navya-forest-800) 0%, #004d38 100%)' }}>
              <QrCode size={20} />
            </div>
            <div>
              <div className="rate-header-tag">
                <Sparkles size={11} />
                Produce Passport Scanner
              </div>
              <div className="rate-header-title">Scan Crate QR Label</div>
              <div className="rate-header-subtitle">
                Verify physical crate lot code & import certified telemetry
              </div>
            </div>
          </div>
          <button className="rate-close-btn" onClick={onClose} title="Close dialog">
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="rate-modal-body" style={{ gap: '14px' }}>
          {/* Scanner Viewfinder Box */}
          <div className="qr-scanner-box" style={{ padding: '20px 16px', background: '#0a1612', color: '#fff', border: '1.5px solid #1b382b' }}>
            {scanning ? (
              <>
                <div className="scanner-viewfinder" style={{ width: '200px', height: '200px', position: 'relative', marginBottom: '14px' }}>
                  {useLiveCamera ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <QrCode size={80} color="rgba(255, 255, 255, 0.25)" />
                    </div>
                  )}
                  <div className="scan-laser-line"></div>
                  <div className="viewfinder-corners"></div>
                </div>

                <div style={{ fontSize: '13px', fontWeight: 700, color: '#ecfdf5', marginBottom: '2px' }}>
                  {useLiveCamera ? 'Camera Active: Align Crate QR' : 'Position Crate QR Code in Viewfinder'}
                </div>
                <div style={{ fontSize: '11.5px', color: '#a7f3d0' }}>
                  Scanning for Navya SHA-256 cryptographic lot passport...
                </div>

                {/* Camera Toggle Button */}
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  {!useLiveCamera ? (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={startCamera}
                      style={{ fontSize: '11.5px', padding: '5px 12px', gap: '5px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      <Camera size={13} />
                      <span>Start Device Camera</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={stopCamera}
                      style={{ fontSize: '11.5px', padding: '5px 12px', gap: '5px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}
                    >
                      <X size={13} />
                      <span>Stop Camera</span>
                    </button>
                  )}
                </div>

                {cameraError && (
                  <div style={{ marginTop: '6px', fontSize: '11px', color: '#fca5a5' }}>
                    {cameraError}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: '16px 0', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#ecfdf5' }}>
                  Crate Passport Verified!
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#fcd34d', fontWeight: 700, marginTop: '2px' }}>
                  {scannedResult?.id}
                </div>
                <div style={{ fontSize: '12px', color: '#d1fae5', marginTop: '2px' }}>
                  {scannedResult?.crop} ({scannedResult?.variety}) • {scannedResult?.certifiedGrade} (Score: {scannedResult?.farmGateScore}/100)
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  Applying to complaint form...
                </div>
              </div>
            )}
          </div>

          {/* Quick Simulation: Tap any real crate */}
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Instant Demo: Tap a Crate Tag to Scan
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {SEED_BATCHES.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleScanBatch(b.id)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '8px',
                    padding: '8px 6px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    textAlign: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Simulate scanning QR code for ${b.crop} (${b.id})`}
                >
                  <span style={{ fontSize: '20px' }}>{b.emoji}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--navya-forest-800)' }}>
                    {b.crop}
                  </span>
                  <span style={{ fontSize: '9.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {b.id.split('-').slice(-2).join('-')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Option */}
          <div style={{ textAlign: 'center' }}>
            <label style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--navya-forest-800)',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)'
            }}>
              <Upload size={13} />
              <span>Or Upload QR Label photo from device</span>
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="rate-modal-footer">
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Official Mandi Crate Tag Standard (ISO/IEC 18004)
          </div>
          <button type="button" className="btn-secondary" onClick={onClose} style={{ padding: '7px 16px', fontSize: '12.5px' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
