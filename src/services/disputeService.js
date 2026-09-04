// =========================================================
// NAVYA DISPUTE SERVICE — SIMPLIFIED
// Handles complaint tracking, local storage, and simple sensor matching
// =========================================================

import { SEED_BATCHES, SEED_DISPUTES } from './mockData';

const STORAGE_KEY_DISPUTES = 'navya_disputes_v2';
const STORAGE_KEY_BATCHES = 'navya_batches_v2';

export const disputeService = {
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
    const nowStr = "Just now";

    const farmTvoc = batch?.initialTelemetry?.tvoc_ppb || 120;
    const arrivalTvoc = data.estimatedArrivalTvoc || farmTvoc * 2.2;
    const normalExpectedTvoc = farmTvoc * 1.4;

    const newDispute = {
      id: newId,
      batchId: data.batchId ? data.batchId.toUpperCase() : "NAV-CUSTOM-01",
      crop: batch?.crop || data.crop || "Fresh Produce",
      variety: batch?.variety || data.variety || "Standard Lot",
      emoji: batch?.emoji || "📦",
      complainantRole: data.complainantRole || "DEALER",
      complainantName: data.complainantName || "Verified User",
      respondentName: batch ? (data.complainantRole === "DEALER" ? batch.farmer.name : batch.dealer.name) : "Mandi Partner",
      filingDate: nowStr,
      defectCategory: data.defectCategory || "PREMATURE_DECAY",
      defectTitle: data.defectTitle || "Produce Quality Issue",
      description: data.description || "Produce condition does not match farm-gate inspection.",
      severity: data.severity || "MODERATE",
      affectedCrates: Number(data.affectedCrates) || 10,
      affectedKg: Number(data.affectedKg) || 200,
      estimatedDisputeAmountInr: Number(data.estimatedDisputeAmountInr) || 1000,
      requestedRemedy: data.requestedRemedy || "REPLACEMENT_BATCH",
      evidenceImages: data.evidenceImages || [],
      status: "PENDING_REVIEW",
      telemetryComparison: {
        farmGateTvoc: farmTvoc,
        arrivalReportedTvoc: Math.round(arrivalTvoc),
        normalDecayTvoc: Math.round(normalExpectedTvoc),
        simpleStatus: "EARLY_DECAY",
        simpleVerdict: "Sensor check confirms higher ripening gases than normal. Validates early spoilage or transit heat."
      },
      timeline: [
        {
          time: nowStr,
          actor: data.complainantName || "Complainant",
          action: `Reported issue #${newId} with ${data.evidenceImages?.length || 0} photos.`
        },
        {
          time: nowStr,
          actor: "Navya Sensor Check",
          action: "Verified against farm-gate sensor baseline."
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
    const nowStr = "Just now";

    dispute.status = newStatus;

    if (actionData) {
      dispute.proposedAction = {
        ...actionData,
        proposedAt: nowStr
      };
      dispute.timeline.push({
        time: nowStr,
        actor: actionData.proposedBy || "Reviewer",
        action: `Solution offered: ${actionData.note || actionData.type.replace('_', ' ')}`
      });
    }

    if (feedbackData) {
      dispute.feedback = feedbackData;
      dispute.timeline.push({
        time: nowStr,
        actor: "Resolution",
        action: `Both parties agreed. Rating: ${feedbackData.rating || 5} Stars.`
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
    if (!dispute.timeline) dispute.timeline = [];
    dispute.timeline.push({
      time: "Just now",
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
