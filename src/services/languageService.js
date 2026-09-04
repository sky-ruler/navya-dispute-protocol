// Multi-lingual Language Service for Navya Dispute & Redressal Protocol
// Supports 10 Indian regional languages + English with Google Translate integration

export const SUPPORTED_LANGUAGES = [
  { code: 'en', native: 'English', english: 'English', region: 'Universal', flag: '🌐' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', region: 'North & Central India', flag: '🇮🇳' },
  { code: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia', region: 'Odisha', flag: '🌾' },
  { code: 'mr', native: 'मराठी', english: 'Marathi', region: 'Maharashtra', flag: '🚜' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', region: 'Punjab & Haryana', flag: '🌱' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', region: 'Gujarat', flag: '🥭' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', region: 'West Bengal', flag: '🌿' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', region: 'Andhra & Telangana', flag: '🍅' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', region: 'Tamil Nadu', flag: '🍃' },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', region: 'Karnataka', flag: '🌾' }
];

export const TOP_LANGUAGES = ['en', 'hi', 'or', 'mr', 'pa'];

let listeners = [];

export const languageService = {
  getCurrentLanguage() {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
    return match ? match[1] : (localStorage.getItem('navya_lang') || 'en');
  },

  getCurrentLanguageObj() {
    const code = this.getCurrentLanguage();
    return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
  },

  setLanguage(code) {
    localStorage.setItem('navya_lang', code);
    
    // Set cookies for Google Translate across root and hostname
    const cookieVal = code === 'en' ? '/en/en' : `/en/${code}`;
    document.cookie = `googtrans=${cookieVal}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=.${window.location.hostname}; path=/`;
    document.cookie = `googtrans=${cookieVal}; domain=${window.location.hostname}; path=/`;

    // Notify all active React components
    listeners.forEach(fn => fn(code));

    // Dispatch to Google Translate dropdown if loaded in DOM
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback reload if Google Translate iframe hasn't initialized
      window.location.reload();
    }
  },

  subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(fn => fn !== listener);
    };
  }
};
