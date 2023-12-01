import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import resources from './locales/resources.js';

let localLang = sessionStorage.getItem('lang');
const browserLang = navigator.language;

if (!localLang) {
  localLang = browserLang === 'zh-CN' ? 'zh-CN' : 'en-US';
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localLang, 
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
