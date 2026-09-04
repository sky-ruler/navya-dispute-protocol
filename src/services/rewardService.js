// =========================================================
// NAVYA AI REINFORCEMENT LEARNING & REWARDS SERVICE
// Captures user ground-truth ratings on shelf life to train AI models
// =========================================================

const STORAGE_KEY_POINTS = 'navya_reward_points_v1';
const STORAGE_KEY_RL_LOGS = 'navya_rl_feedback_logs_v1';

export const rewardService = {
  getPoints() {
    const stored = localStorage.getItem(STORAGE_KEY_POINTS);
    return stored ? parseInt(stored, 10) : 150; // Current verified balance: 150 pts = ₹75
  },

  getCreditsInr() {
    // 2 Points = ₹1 Mandi Scan / Testing Credit
    return Math.floor(this.getPoints() / 2);
  },

  getPendingPoints() {
    const logs = this.getFeedbackLogs();
    return logs
      .filter(l => l.status === 'PENDING_VERIFICATION')
      .reduce((acc, curr) => acc + (curr.potentialPoints || 50), 0);
  },

  getFeedbackLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_RL_LOGS)) || [];
    } catch {
      return [];
    }
  },

  submitPredictionFeedback(data) {
    const currentPoints = this.getPoints();
    const potentialPoints = 50; // Up to 50 pts = ₹25 reward once verified

    const logs = this.getFeedbackLogs();
    const newLog = {
      id: `RL-${Date.now().toString().slice(-6)}`,
      batchId: data.batchId || "NAV-BATCH",
      crop: data.crop || "Fresh Produce",
      predictedShelfLifeDays: data.predictedShelfLifeDays || 7,
      accuracyRating: data.accuracyRating || 4, // 1 to 5 stars
      userNote: data.userNote || "Batch prediction rated by user.",
      status: 'PENDING_VERIFICATION', // Review by agronomy team & RL pipeline
      potentialPoints,
      timestamp: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    logs.unshift(newLog);
    localStorage.setItem(STORAGE_KEY_RL_LOGS, JSON.stringify(logs));

    return {
      success: true,
      status: 'PENDING_VERIFICATION',
      potentialPoints,
      currentPoints,
      currentCreditsInr: Math.floor(currentPoints / 2),
      log: newLog
    };
  }
};
