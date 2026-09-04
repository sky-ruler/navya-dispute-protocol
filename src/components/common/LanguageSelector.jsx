import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check, ChevronDown, X, Sparkles } from 'lucide-react';

const SUPPORTED_LANGUAGES = [
  { code: 'en', native: 'English', english: 'English', region: 'Universal' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', region: 'North & Central India' },
  { code: 'mr', native: 'मराठी', english: 'Marathi', region: 'Maharashtra' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', region: 'Punjab & Haryana' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', region: 'Gujarat' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', region: 'West Bengal' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', region: 'Andhra & Telangana' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', region: 'Tamil Nadu' },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', region: 'Karnataka' }
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    // Read from cookie or localStorage
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
    return match ? match[1] : (localStorage.getItem('navya_lang') || 'en');
  });

  const modalRef = useRef(null);

  // Initialize hidden Google Translate engine
  useEffect(() => {
    const initEngine = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        try {
          const el = document.getElementById('google_translate_hidden_holder');
          if (el && !el.hasChildNodes()) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr,pa,gu,bn,te,ta,kn',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              },
              'google_translate_hidden_holder'
            );
          }
        } catch (e) {
          // Engine ready
        }
      }
    };

    initEngine();
    const timer = setTimeout(initEngine, 800);
    return () => clearTimeout(timer);
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const selectLanguage = (code) => {
    setCurrentLang(code);
    localStorage.setItem('navya_lang', code);
    setIsOpen(false);

    // Set Google Translate Cookie (for path / and domain)
    const cookieVal = code === 'en' ? '/en/en' : `/en/${code}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=.${window.location.hostname}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/`;

    // Trigger on Google hidden combo if available
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    } else {
      // Reload page to apply clean translation seamlessly
      window.location.reload();
    }
  };

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="native-lang-module" ref={modalRef} style={{ position: 'relative' }}>
      {/* Hidden container for Google's required DOM element */}
      <div id="google_translate_hidden_holder" style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}></div>

      {/* Obvious, High-Visibility Native Language Trigger Button */}
      <button
        type="button"
        className="native-lang-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Change language / भाषा चुनें"
      >
        <div className="lang-icon-bubble">
          <Globe size={15} />
        </div>
        <div className="lang-trigger-text">
          <span className="lang-native-label">{activeLangObj.native}</span>
          <span className="lang-code-tag">{activeLangObj.english}</span>
        </div>
        <ChevronDown size={14} className={`lang-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {/* Super-Friendly Native Modal / Popover Dropdown */}
      {isOpen && (
        <div className="native-lang-dropdown">
          <div className="lang-dropdown-header">
            <div>
              <div className="lang-dropdown-title">Choose Language / भाषा चुनें</div>
              <div className="lang-dropdown-subtitle">Select your preferred regional language</div>
            </div>
            <button
              type="button"
              className="lang-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={15} />
            </button>
          </div>

          <div className="lang-options-grid">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <div
                  key={lang.code}
                  className={`lang-option-card ${isSelected ? 'active' : ''}`}
                  onClick={() => selectLanguage(lang.code)}
                >
                  <div className="lang-card-left">
                    <div className="lang-card-native">{lang.native}</div>
                    <div className="lang-card-english">{lang.english} • <span style={{ color: 'var(--text-subtle)' }}>{lang.region}</span></div>
                  </div>
                  {isSelected && (
                    <div className="lang-card-check">
                      <Check size={16} strokeWidth={2.8} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lang-dropdown-footer">
            <Sparkles size={13} color="var(--navya-bronze-dark)" />
            <span>Instant translation across all produce passports & redressal tools</span>
          </div>
        </div>
      )}
    </div>
  );
};
