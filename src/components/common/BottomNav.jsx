import React from 'react';
import { Home, PlusCircle, Inbox, Search } from 'lucide-react';

export const BottomNav = ({ currentView, setCurrentView, pendingCount = 0 }) => {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button
        type="button"
        className={`mobile-bottom-nav-item ${currentView === 'home' ? 'active' : ''}`}
        onClick={() => {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="bottom-nav-icon-wrap">
          <Home size={20} strokeWidth={currentView === 'home' ? 2.5 : 1.8} />
        </div>
        <span className="bottom-nav-label">Overview</span>
      </button>

      <button
        type="button"
        className={`mobile-bottom-nav-item mobile-bottom-nav-item--cta ${currentView === 'file-complaint' ? 'active' : ''}`}
        onClick={() => {
          setCurrentView('file-complaint');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="bottom-nav-cta-bubble">
          <PlusCircle size={22} strokeWidth={2.4} />
        </div>
        <span className="bottom-nav-label">Report Issue</span>
      </button>

      <button
        type="button"
        className={`mobile-bottom-nav-item ${currentView === 'inbox' || currentView === 'dispute-detail' ? 'active' : ''}`}
        onClick={() => {
          setCurrentView('inbox');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="bottom-nav-icon-wrap">
          <Inbox size={20} strokeWidth={currentView === 'inbox' || currentView === 'dispute-detail' ? 2.5 : 1.8} />
          {pendingCount > 0 && (
            <span className="bottom-nav-badge">{pendingCount}</span>
          )}
        </div>
        <span className="bottom-nav-label">Claims</span>
      </button>

      <button
        type="button"
        className={`mobile-bottom-nav-item ${currentView === 'batches' ? 'active' : ''}`}
        onClick={() => {
          setCurrentView('batches');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <div className="bottom-nav-icon-wrap">
          <Search size={20} strokeWidth={currentView === 'batches' ? 2.5 : 1.8} />
        </div>
        <span className="bottom-nav-label">Batches</span>
      </button>
    </nav>
  );
};
