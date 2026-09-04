import React, { useEffect } from 'react';
import { Languages, Globe } from 'lucide-react';

export const LanguageSelector = () => {
  useEffect(() => {
    // If google script loaded after component mount, call init
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      try {
        const el = document.getElementById('google_translate_element');
        if (el && !el.hasChildNodes()) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,hi,mr,pa,gu,bn,te,ta,kn',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            'google_translate_element'
          );
        }
      } catch (e) {
        // Already initialized
      }
    }
  }, []);

  const handleQuickLang = (langCode) => {
    // Set Google Translate Cookie
    document.cookie = `googtrans=/en/${langCode}; path=/`;
    document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/`;
    
    // Trigger on combo if available
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="language-selector-container">
      <div className="google-translate-wrapper" title="Translate website into regional Indian languages">
        <Languages size={15} color="var(--navya-forest-800)" style={{ flexShrink: 0 }} />
        <div id="google_translate_element"></div>
      </div>

      {/* Quick Access Language Badges for Farmers */}
      <div className="quick-lang-pills">
        <button
          type="button"
          className="quick-lang-btn"
          onClick={() => handleQuickLang('en')}
          title="Switch to English"
        >
          English
        </button>
        <button
          type="button"
          className="quick-lang-btn"
          onClick={() => handleQuickLang('hi')}
          title="हिंदी में अनुवाद करें"
        >
          हिन्दी
        </button>
        <button
          type="button"
          className="quick-lang-btn"
          onClick={() => handleQuickLang('mr')}
          title="मराठीत भाषांतर करा"
        >
          मराठी
        </button>
      </div>
    </div>
  );
};
