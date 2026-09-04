// =========================================================
// NAVYA DISPUTE SERVICE
// Handles dispute lifecycle, LocalStorage persistence, and batch telemetry lookup
// =========================================================

import { SEED_BATCHES, SEED_DISPUTES } from './mockData';

const STORAGE_KEY_DISPUTES = 'navya_disputes_v1';
const STORAGE_KEY_BATCHES = 'navya_batches_v1';

export const disputeService = {
  // Initialize storage if empty
  init() {
    if (!localStorage.getItem(STORAGE_KEY_BATCHES)) {
      localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(SEED_BATCHES));
    }
    if (!localStorage.getItem(STORAGE_KEY_DISPUTES)) {
      localStorage.setItem(STORAGE_KEY_DISPUTES, JSON.stringify(SEED_DISPUTES));
    }
  },

  getAllBatches() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_BATCHES)) || SEED_BATCHES;
    } catch {
      return SEED_BATCHES;
    }
  },

  getBatchById(batchId) {
    if (!batchId) return null;
    const cleanId = batchId.trim().toUpperCase();
    const batches = this.getAllBatches();
    return batches.find(b => b.id.toUpperCase() === cleanId) || null;
  },

  getDisputes() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_DISPUTES)) || SEED_DISPUTES;
    } catch {
      return SEED_DISPUTES;
    }
  },

  getDisputeById(id) {
    if (!id) return null;
    const disputes = this.getDisputes();
    return disputes.find(d => d.id.toUpperCase() === id.toUpperCase()) || null;
  },

  createDispute(data) {
    this.init();
    const disputes = this.getDisputes();
    const batch = this.getBatchById(data.batchId);

    const newId = `DISP-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    }) + " IST";

    // Compute expected normal decay TVOC vs reported TVOC
    const farmTvoc = batch?.initialTelemetry?.tvoc_ppb || 120;
    const arrivalTvoc = data.estimatedArrivalTvoc || farmTvoc * 2.5;
    const normalExpectedTvoc = farmTvoc * 1.5;

    const newDispute = {
      id: newId,
      batchId: data.batchId ? data.batchId.toUpperCase() : "NAV-CUSTOM-001",
      crop: batch?.crop || data.crop || "Fresh Produce",
      variety: batch?.variety || data.variety || "Standard Lot",
      emoji: batch?.emoji || "📦",
      complainantRole: data.complainantRole || "DEALER",
      complainantName: data.complainantName || "Verified Stakeholder",
      respondentName: batch ? (data.complainantRole === "DEALER" ? batch.farmer.name + ` (${batch.farmer.fpo})` : batch.dealer.name) : "Navya Producer Cluster",
      filingDate: nowStr,
      defectCategory: data.defectCategory || "PREMATURE_DECAY",
      defectTitle: data.defectTitle || "Produce Quality Mismatch",
      description: data.description || "No description provided.",
      severity: data.severity || "MODERATE",
      affectedCrates: Number(data.affectedCrates) || 10,
      affectedKg: Number(data.affectedKg) || 200,
      estimatedDisputeAmountInr: Number(data.estimatedDisputeAmountInr) || 5000,
      requestedRemedy: data.requestedRemedy || "CREDIT_NOTE",
      evidenceImages: data.evidenceImages || [],
      status: "PENDING_REVIEW",
      telemetryComparison: {
        farmGateTvoc: farmTvoc,
        arrivalReportedTvoc: Math.round(arrivalTvoc),
        normalDecayTvoc: Math.round(normalExpectedTvoc),
        tempDelta: "+2.8°C excursion during haul",
        verdict: "Anomaly detected: Arrival TVOC exceeds typical biological decay curve by +65%."
      },
      timeline: [
        {
          time: nowStr,
          actor: data.complainantName || "Complainant",
          action: `Filed Quality Dispute #${newId} with ${data.evidenceImages?.length || 0} supporting proofs.`
        },
        {
          time: nowStr,
          actor: "Navya Automated Telemetry Matcher",
          action: "Ingested farm-gate baseline and created verifiable dispute token."
        }
      ],
      proposedAction: null,
      feedback: null
    };

    disputes.unshift(newDispute);
    localStorage.setItem(STORAGE_KEY_DISPUTES, JSON.stringify(disputes));
    return newDispute;
  },

  updateDisputeStatus(id, newStatus, actionData = null, feedbackData = null) {
    this.init();
    const disputes = this.getDisputes();
    const index = disputes.findIndex(d => d.id.toUpperCase() === id.toUpperCase());
    if (index === -1) return null;

    const dispute = { ...disputes[index] };
    const nowStr = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    }) + " IST";

    dispute.status = newStatus;

    if (actionData) {
      dispute.proposedAction = {
        ...actionData,
        proposedAt: nowStr
      };
      dispute.timeline.push({
        time: nowStr,
        actor: actionData.proposedBy || "Reviewer",
        action: `Action applied: ${actionData.type.replace('_', ' ')} (${actionData.note || 'Confirmed'})`
      });
    }

    if (feedbackData) {
      dispute.feedback = feedbackData;
      dispute.timeline.push({
        time: nowStr,
        actor: "Mutual Redressal Protocol",
        action: `Bilateral feedback recorded: Rating ${feedbackData.rating || 5}/5 stars.`
      });
    }

    disputes[index] = dispute;
    localStorage.setItem(STORAGE_KEY_DISPUTES, JSON.stringify(disputes));
    return dispute;
  },

  addDisputeMessage(id, message) {
    this.init();
    const disputes = this.getDisputes();
    const index = disputes.findIndex(d => d.id.toUpperCase() === id.toUpperCase());
    if (index === -1) return null;

    const dispute = { ...disputes[index] };
    const nowStr = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    }) + " IST";

    if (!dispute.timeline) dispute.timeline = [];
    dispute.timeline.push({
      time: nowStr,
      actor: message.sender || "Participant",
      action: message.text
    });

    disputes[index] = dispute;
    localStorage.setItem(STORAGE_KEY_DISPUTES, JSON.stringify(disputes));
    return dispute;
  },

  resetToDemo() {
    localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(SEED_BATCHES));
    localStorage.setItem(STORAGE_KEY_DISPUTES, JSON.stringify(SEED_DISPUTES));
    return { success: true };
  }
};
