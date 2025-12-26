import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en } from './locales/en/index';

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'countryBasedDetector',
  lookup() {
    return 'en';
  },
  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  }
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en }
    },
    detection: {
      order: ['countryBasedDetector', 'localStorage', 'navigator'],
      caches: ['localStorage']
    },
    fallbackLng: 'en',
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;