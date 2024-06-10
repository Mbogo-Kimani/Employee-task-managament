import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../public/locales/en/translation.json';
import zhTranslation from '../../public/locales/zh/translation.json';

const resources = {
  en: { translation: enTranslation },
  zh: { translation: zhTranslation },
};

i18n
  //   .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: localStorage.getItem('language'),
    resources,
  });

export const changeLanguage = language => {
  i18n.changeLanguage(language);
};

export default i18n;
