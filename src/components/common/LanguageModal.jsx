import React, { useState, useEffect } from 'react';
import { Globe, Check, X, Search, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES, languageService } from '../../services/languageService';

export const LanguageModal = ({ isOpen, onClose }) => {
  const [currentLang, setCurrentLang] = useState(languageService.getCurrentLanguage());
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    return languageService.subscribe((lang) => {
      setCurrentLang(lang);
    });
  }, []);

  if (!isOpen) return null;

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(l => 
    l.native.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (code) => {
    languageService.setLanguage(code);
    if (onClose) onClose();
  };

  return (
    <div className="language-modal-backdrop notranslate" translate="no" onClick={onClose}>
      <div 
        className="language-modal-content notranslate" 
        translate="no" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="language-modal-header notranslate" translate="no">
          <div className="language-modal-title-group notranslate" translate="no">
            <div className="language-modal-icon-badge notranslate" translate="no">
              <Globe size={20} />
            </div>
            <div>
              <h2 className="language-modal-title notranslate" translate="no">
                Choose Language / भाषा चुनें / ଭାଷା ବାଛନ୍ତୁ
              </h2>
              <p className="language-modal-subtitle notranslate" translate="no">
                Select your preferred regional language for all produce quality claims & sensor audits
              </p>
            </div>
          </div>
          <button 
            type="button" 
            className="language-modal-close-btn notranslate" 
            translate="no" 
            onClick={onClose}
            aria-label="Close language selector"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="language-modal-search-box notranslate" translate="no">
          <Search size={16} className="language-search-icon notranslate" />
          <input
            type="text"
            className="language-search-input notranslate"
            translate="no"
            placeholder="Search language / भाषा खोजें / ଭାଷା ଖୋଜନ୍ତୁ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {searchTerm && (
            <button 
              type="button" 
              className="language-search-clear notranslate"
              translate="no"
              onClick={() => setSearchTerm('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Language Grid */}
        <div className="language-modal-grid notranslate" translate="no">
          {filteredLanguages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={`language-card-item notranslate ${isSelected ? 'active' : ''}`}
                translate="no"
                onClick={() => handleSelect(lang.code)}
              >
                <div className="language-card-content notranslate" translate="no">
                  <span className="language-card-flag notranslate">{lang.flag}</span>
                  <div className="language-card-text notranslate" translate="no">
                    <span className="language-card-native notranslate" translate="no">{lang.native}</span>
                    <span className="language-card-meta notranslate" translate="no">
                      {lang.english} • {lang.region}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="language-card-check-badge notranslate" translate="no">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="language-modal-footer notranslate" translate="no">
          <Sparkles size={14} className="language-footer-sparkle notranslate" />
          <span className="notranslate" translate="no">
            Instant multi-lingual translation across telemetry passports, dispute tickets, and mandi settlement notes
          </span>
        </div>
      </div>
    </div>
  );
};
