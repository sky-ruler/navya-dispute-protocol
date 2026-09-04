import React, { useState, useEffect } from 'react';
import './index.css';
import './assets/css/navya-feedback.css';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { FileComplaintPage } from './pages/FileComplaintPage';
import { DealerDashboardPage } from './pages/DealerDashboardPage';
import { DisputeDetailsPage } from './pages/DisputeDetailsPage';
import { BatchExplorerPage } from './pages/BatchExplorerPage';
import { disputeService } from './services/disputeService';

function App() {
  // Navigation: 'home' | 'file-complaint' | 'inbox' | 'dispute-detail' | 'batches'
  const [currentView, setCurrentView] = useState('home');
  const [selectedDisputeId, setSelectedDisputeId] = useState('DISP-8041');
  const [activeRole, setActiveRole] = useState('DEALER'); // 'FARMER' | 'DEALER'
  const [disputes, setDisputes] = useState([]);

  // Load disputes from service on mount
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

  return (
    <div className="navya-shell">
      {/* Universal Navya Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
      />

      {/* Main View Area */}
      <main className="main-content">
        {currentView === 'home' && (
          <HomePage
            setCurrentView={setCurrentView}
            onSelectDispute={handleSelectDispute}
            disputes={disputes}
            activeRole={activeRole}
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
          />
        )}

        {currentView === 'batches' && (
          <BatchExplorerPage
            onSelectBatchForClaim={handleSelectBatchForClaim}
          />
        )}
      </main>

      {/* Universal Navya Footer */}
      <Footer />
    </div>
  );
}

export default App;
