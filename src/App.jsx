import React, { useState, useEffect } from 'react';
import './index.css';
import './assets/css/navya-feedback.css';

import { TopUtilityBar } from './components/common/TopUtilityBar';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { LanguageModal } from './components/common/LanguageModal';
import { HomePage } from './pages/HomePage';
import { FileComplaintPage } from './pages/FileComplaintPage';
import { DealerDashboardPage } from './pages/DealerDashboardPage';
import { DisputeDetailsPage } from './pages/DisputeDetailsPage';
import { BatchExplorerPage } from './pages/BatchExplorerPage';
import { RatePredictionModal } from './components/redressal/RatePredictionModal';
import { RewardsBalanceModal } from './components/common/RewardsBalanceModal';
import { disputeService } from './services/disputeService';
import { rewardService } from './services/rewardService';
import { SEED_BATCHES } from './services/mockData';

function App() {
  // Navigation: 'home' | 'file-complaint' | 'inbox' | 'dispute-detail' | 'batches'
  const [currentView, setCurrentView] = useState('home');
  const [selectedDisputeId, setSelectedDisputeId] = useState('DISP-8041');
  const [activeRole, setActiveRole] = useState('DEALER'); // 'FARMER' | 'DEALER'
  const [disputes, setDisputes] = useState([]);
  
  // Reinforcement Learning & Rewards State
  const [userPoints, setUserPoints] = useState(rewardService.getPoints());
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [batchToRate, setBatchToRate] = useState(SEED_BATCHES[0]);

  // Load disputes on mount
  useEffect(() => {
    disputeService.init();
    setDisputes(disputeService.getDisputes());
  }, []);

  const refreshDisputes = () => {
    setDisputes(disputeService.getDisputes());
  };

  const handleSelectDispute = (id) => {
    setSelectedDisputeId(id);
    setCurrentView('dispute-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDisputeCreated = (id) => {
    refreshDisputes();
    setSelectedDisputeId(id);
    setCurrentView('dispute-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDisputeUpdated = () => {
    refreshDisputes();
  };

  const handleSelectBatchForClaim = (batch) => {
    setCurrentView('file-complaint');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRateModal = (batch = null) => {
    setBatchToRate(batch || SEED_BATCHES[0]);
    setIsRateModalOpen(true);
  };

  const handleRewardEarned = (result) => {
    setUserPoints(result.newTotalPoints);
  };

  const pendingDisputesCount = disputes.filter(
    d => d.status === 'PENDING_REVIEW' || d.status === 'UNDER_INVESTIGATION'
  ).length;

  return (
    <div className="navya-shell">
      {/* 1. Global Multilingual & Telemetry Ribbon */}
      <TopUtilityBar 
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)} 
      />

      {/* 2. Universal Navya Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        userPoints={userPoints}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
      />

      {/* 3. Main View Area */}
      <main className="main-content">
        {currentView === 'home' && (
          <HomePage
            setCurrentView={setCurrentView}
            onSelectDispute={handleSelectDispute}
            disputes={disputes}
            activeRole={activeRole}
            userPoints={userPoints}
            onOpenRateModal={handleOpenRateModal}
            onOpenLanguageModal={() => setIsLanguageModalOpen(true)}
          />
        )}

        {currentView === 'file-complaint' && (
          <FileComplaintPage
            onDisputeCreated={handleDisputeCreated}
            activeRole={activeRole}
          />
        )}

        {currentView === 'inbox' && (
          <DealerDashboardPage
            disputes={disputes}
            onSelectDispute={handleSelectDispute}
            onRefreshDisputes={refreshDisputes}
            setCurrentView={setCurrentView}
            activeRole={activeRole}
          />
        )}

        {currentView === 'dispute-detail' && (
          <DisputeDetailsPage
            disputeId={selectedDisputeId}
            onBack={() => setCurrentView('inbox')}
            onDisputeUpdated={handleDisputeUpdated}
            activeRole={activeRole}
            onOpenRateModal={handleOpenRateModal}
          />
        )}

        {currentView === 'batches' && (
          <BatchExplorerPage
            onSelectBatchForClaim={handleSelectBatchForClaim}
            onOpenRateModal={handleOpenRateModal}
          />
        )}
      </main>

      {/* 4. Universal Navya Footer */}
      <Footer />

      {/* 5. Modern Floating Mobile Bottom Navigation Dock */}
      <BottomNav
        currentView={currentView}
        setCurrentView={setCurrentView}
        pendingCount={pendingDisputesCount}
      />

      {/* 6. Comprehensive Indian Languages Modal */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />

      {/* 7. Mandi Rewards & Balance Breakdown Modal */}
      <RewardsBalanceModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        userPoints={userPoints}
      />

      {/* 8. AI Reinforcement Learning Ground-Truth Rating Modal */}
      <RatePredictionModal
        isOpen={isRateModalOpen}
        onClose={() => setIsRateModalOpen(false)}
        batch={batchToRate}
        onRewardEarned={handleRewardEarned}
      />
    </div>
  );
}

export default App;
