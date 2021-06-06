import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationCN from '../../../public/static/locales/cn/common.json';
import translationEN from '../../../public/static/locales/en/common.json';
import translationZH from '../../../public/static/locales/zh/common.json';

i18n.use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: translationEN,
            },
            cn: {
                translation: translationCN,
            },
            zh: {
                translation: translationZH,
            },
        },
        lng: 'cn',
        fallbackLng: 'en',
        // debug: isDev,
        interpolation: {
            escapeValue: false,
        },
    })
    .then((res) => {});

export default i18n;
