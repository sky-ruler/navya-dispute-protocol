// =========================================================
// NAVYA AI REINFORCEMENT LEARNING & REWARDS SERVICE
// Captures user ground-truth ratings on shelf life to train AI models
// =========================================================

const STORAGE_KEY_POINTS = 'navya_reward_points_v1';
const STORAGE_KEY_RL_LOGS = 'navya_rl_feedback_logs_v1';

export const rewardService = {
  getPoints() {
    const stored = localStorage.getItem(STORAGE_KEY_POINTS);
    return stored ? parseInt(stored, 10) : 150; // Starting baseline credit: 150 pts = ₹75
  },

  getCreditsInr() {
    // 2 Points = ₹1 Mandi Scan / Testing Credit
    return Math.floor(this.getPoints() / 2);
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
    const pointsAwarded = 50; // +50 pts = ₹25 reward per batch rated
    const newPoints = currentPoints + pointsAwarded;
    localStorage.setItem(STORAGE_KEY_POINTS, newPoints.toString());

    const logs = this.getFeedbackLogs();
    const newLog = {
      id: `RL-${Date.now().toString().slice(-6)}`,
      batchId: data.batchId || "NAV-BATCH",
      crop: data.crop || "Fresh Produce",
      predictedShelfLifeDays: data.predictedShelfLifeDays || 7,
      actualOutcome: data.actualOutcome || "ACCURATE", // SPOILED_EARLY | ACCURATE | LASTED_LONGER
      accuracyRating: data.accuracyRating || 4, // 1 to 5 stars
      userNote: data.userNote || "Confirmed arrival condition.",
      pointsAwarded,
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
      pointsAwarded,
      newTotalPoints: newPoints,
      newCreditsInr: Math.floor(newPoints / 2),
      log: newLog
    };
  }
};
