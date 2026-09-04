import React, { useState, useEffect } from 'react';
import { Globe, ChevronDown, Activity, Sparkles, Check } from 'lucide-react';
import { TOP_LANGUAGES, SUPPORTED_LANGUAGES, languageService } from '../../services/languageService';

export const TopUtilityBar = ({ onOpenLanguageModal }) => {
  const [currentLang, setCurrentLang] = useState(languageService.getCurrentLanguage());

  useEffect(() => {
    return languageService.subscribe((lang) => {
      setCurrentLang(lang);
    });
  }, []);

  const activeLangObj = languageService.getCurrentLanguageObj();

  const handleQuickSelect = (code) => {
    languageService.setLanguage(code);
  };

  return (
    <div className="top-utility-bar notranslate" translate="no">
      <div className="top-utility-inner notranslate" translate="no">
        {/* Left: Prototype Status Badge */}
        <div className="telemetry-status-strip notranslate" translate="no">
          <span className="live-pulse-dot" />
          <span className="telemetry-status-text">
            <strong>Navya Protocol</strong> • Post-Harvest Redressal Prototype
          </span>
        </div>

        {/* Right: Highly Visible, Prominent Multilingual Language Switcher */}
        <div className="top-multilingual-strip notranslate" translate="no">
          <div className="multilingual-label-group notranslate" translate="no">
            <Globe size={14} className="globe-icon notranslate" />
            <span className="multilingual-label notranslate" translate="no">
              भाषा / Language:
            </span>
          </div>

          {/* Quick-Switch Direct Language Chips */}
          <div className="quick-lang-chips notranslate" translate="no">
            {TOP_LANGUAGES.map((code) => {
              const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
              if (!lang) return null;
              const isActive = currentLang === code;

              return (
                <button
                  key={code}
                  type="button"
                  className={`quick-lang-chip notranslate ${isActive ? 'active' : ''}`}
                  translate="no"
                  onClick={() => handleQuickSelect(code)}
                  title={`Switch to ${lang.english} (${lang.native})`}
                >
                  <span className="chip-native notranslate">{lang.native}</span>
                  {isActive && <Check size={11} strokeWidth={3} className="chip-check notranslate" />}
                </button>
              );
            })}

            {/* View All Languages Button */}
            <button
              type="button"
              className="quick-lang-more-btn notranslate"
              translate="no"
              onClick={onOpenLanguageModal}
              title="View all 10 supported regional Indian languages"
            >
              <span className="notranslate">+ All Languages</span>
              <ChevronDown size={12} className="notranslate" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
