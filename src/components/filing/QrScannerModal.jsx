import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Camera, Upload, X, CheckCircle2, Sparkles, RefreshCw, Radio, Play, AlertCircle, Scan } from 'lucide-react';
import { SEED_BATCHES } from '../../services/mockData';

export const QrScannerModal = ({ isOpen, onClose, onBatchScanned }) => {
  const [scanning, setScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [feedMode, setFeedMode] = useState('simulated'); // 'camera' | 'simulated'
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  // When modal opens, try to initiate camera or fallback to animated simulation
  useEffect(() => {
    if (isOpen) {
      setScanning(true);
      setScannedResult(null);
      setCameraError(null);
      startCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Real device camera starter
  const startCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("WebRTC camera API not available in this browser.");
      }

      let stream = null;
      try {
        // Try environment camera (ideal for mobile / tablet crate scanning)
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
      } catch (e1) {
        // Fallback to any camera available (laptop webcam, USB cam)
        stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
      }

      if (stream) {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch (pErr) {
            console.warn("Video play error:", pErr);
          }
        }
        setCameraActive(true);
        setFeedMode('camera');
      }
    } catch (err) {
      console.warn("Camera access error:", err);
      setCameraError("Camera unavailable or permission not granted. Showing simulated Mandi Crate feed.");
      setCameraActive(false);
      setFeedMode('simulated');
    } finally {
      setCameraLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Canvas animated simulated feed when camera is in simulated mode
  useEffect(() => {
    if (feedMode !== 'simulated' || !scanning || !isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;
    let animId;

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Dark warehouse background
      ctx.fillStyle = '#0a1612';
      ctx.fillRect(0, 0, w, h);

      // Handheld camera movement simulation
      const dx = Math.sin(frame * 0.035) * 8;
      const dy = Math.cos(frame * 0.025) * 5;

      ctx.save();
      ctx.translate(w / 2 + dx, h / 2 + dy);

      // Crate wood card
      ctx.fillStyle = '#132a20';
      ctx.strokeStyle = '#224a38';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-100, -80, 200, 160, 12);
      ctx.fill();
      ctx.stroke();

      // QR label paper
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(-65, -65, 130, 110, 8);
      ctx.fill();

      // Draw QR pattern simulation
      ctx.fillStyle = '#0f172a';
      // Corner 1
      ctx.fillRect(-55, -55, 28, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-50, -50, 18, 18);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-45, -45, 8, 8);

      // Corner 2
      ctx.fillRect(27, -55, 28, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(32, -50, 18, 18);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(37, -45, 8, 8);

      // Corner 3
      ctx.fillRect(-55, 17, 28, 28);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-50, 22, 18, 18);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-45, 27, 8, 8);

      // Center barcode matrix
      ctx.fillStyle = '#0f172a';
      for (let i = -2; i <= 3; i++) {
        for (let j = -2; j <= 3; j++) {
          if ((i * 3 + j * 7 + frame) % 3 === 0) {
            ctx.fillRect(i * 8 - 2, j * 8 - 14, 6, 6);
          }
        }
      }

      // Crate Label Text
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = '#065f46';
      ctx.textAlign = 'center';
      ctx.fillText('NAVYA SMART PASSPORT', 0, 36);

      ctx.restore();

      // Camera HUD Overlays
      ctx.font = '10px monospace';
      ctx.fillStyle = '#34d399';
      ctx.textAlign = 'left';
      ctx.fillText(`● MANDI-CAM-01 [ACTIVE]`, 14, 22);

      ctx.textAlign = 'right';
      ctx.fillText(`${new Date().toLocaleTimeString()}`, w - 14, 22);

      // Center crosshair
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 24, h / 2);
      ctx.lineTo(w / 2 + 24, h / 2);
      ctx.moveTo(w / 2, h / 2 - 24);
      ctx.lineTo(w / 2, h / 2 + 24);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [feedMode, scanning, isOpen]);

  if (!isOpen) return null;

  const handleScanBatch = (batchId) => {
    setScanning(false);
    stopCamera();
    const found = SEED_BATCHES.find(b => b.id === batchId) || SEED_BATCHES[0];
    setScannedResult(found);
    setTimeout(() => {
      onBatchScanned(found);
      onClose();
    }, 1100);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
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
          {/* Feed Mode Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-surface-subtle)',
            padding: '6px 10px',
            borderRadius: '10px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  if (!cameraActive) startCamera();
                  else setFeedMode('camera');
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: feedMode === 'camera' ? '1px solid var(--navya-forest-800)' : '1px solid transparent',
                  background: feedMode === 'camera' ? 'var(--navya-forest-800)' : 'transparent',
                  color: feedMode === 'camera' ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Camera size={13} />
                <span>Live Camera</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeedMode('simulated');
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: feedMode === 'simulated' ? '1px solid var(--navya-forest-800)' : '1px solid transparent',
                  background: feedMode === 'simulated' ? 'var(--navya-forest-800)' : 'transparent',
                  color: feedMode === 'simulated' ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <Scan size={13} />
                <span>Simulated Feed</span>
              </button>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {feedMode === 'camera' ? (
                <span style={{ color: '#16a34a', fontWeight: 700 }}>● Camera Ready</span>
              ) : (
                <span style={{ color: '#0284c7', fontWeight: 700 }}>● 60 FPS Crate Cam</span>
              )}
            </div>
          </div>

          {/* Scanner Viewfinder Box */}
          <div className="qr-scanner-box" style={{ padding: '14px', background: '#07120e', color: '#fff', border: '1.5px solid #163628', borderRadius: '16px' }}>
            {scanning ? (
              <>
                <div
                  className="scanner-viewfinder"
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    height: '220px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    margin: '0 auto 12px auto',
                    background: '#040d0a'
                  }}
                >
                  {/* REAL WEBCAM VIDEO */}
                  <video
                    ref={(el) => {
                      videoRef.current = el;
                      if (el && streamRef.current && el.srcObject !== streamRef.current) {
                        el.srcObject = streamRef.current;
                        el.play().catch(e => console.warn(e));
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: feedMode === 'camera' ? 'block' : 'none'
                    }}
                  />

                  {/* ANIMATED SIMULATED CANVAS FEED */}
                  <canvas
                    ref={canvasRef}
                    width={360}
                    height={220}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: feedMode === 'simulated' ? 'block' : 'none'
                    }}
                  />

                  {/* Sweep Laser Line */}
                  <div className="scan-laser-line" style={{ zIndex: 10 }}></div>

                  {/* Corner Reticle Brackets */}
                  <div className="viewfinder-corners" style={{ zIndex: 10 }}></div>

                  {/* Floating Action / Scan Reticle */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      zIndex: 15
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleScanBatch(SEED_BATCHES[1].id)}
                      style={{
                        background: 'rgba(0, 61, 44, 0.85)',
                        border: '1px solid rgba(52, 211, 153, 0.4)',
                        color: '#ffffff',
                        backdropFilter: 'blur(8px)',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <Sparkles size={12} color="#34d399" />
                      <span>Tap to Capture & Scan</span>
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ecfdf5', marginBottom: '2px' }}>
                    {feedMode === 'camera' ? 'Align Physical Crate QR in Box' : 'Simulated Mandi Crate Tracking'}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#a7f3d0' }}>
                    Scanning for Navya SHA-256 cryptographic lot passport...
                  </div>
                </div>

                {cameraError && feedMode === 'camera' && (
                  <div style={{
                    marginTop: '8px',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    fontSize: '11px',
                    color: '#fca5a5',
                    textAlign: 'center'
                  }}>
                    {cameraError}
                  </div>
                )}
              </>
            ) : (
              <div style={{ padding: '24px 0', textAlign: 'center' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#ecfdf5' }}>
                  Crate Passport Verified!
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#fcd34d', fontWeight: 700, marginTop: '4px' }}>
                  {scannedResult?.id}
                </div>
                <div style={{ fontSize: '12.5px', color: '#d1fae5', marginTop: '4px' }}>
                  {scannedResult?.crop} ({scannedResult?.variety}) • {scannedResult?.certifiedGrade} (Score: {scannedResult?.farmGateScore}/100)
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                  Applying cryptographic passport to complaint form...
                </div>
              </div>
            )}
          </div>

          {/* Quick Simulation: Tap any real crate */}
          <div>
            <div style={{ fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', marginBottom: '8px' }}>
              1-Tap Crate Presets:
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
