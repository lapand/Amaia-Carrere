import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from './en/common.json';
import frCommon from './fr/common.json';
import eusCommon from './eus/common.json';

i18next
    .use(initReactI18next)
    .init({
        // debug: true,
        interpolation: { escapeValue: false },
        fallbackLng: 'fr',
        resources: {
            en: {
                common: enCommon,
            },
            fr: {
                common: frCommon,
            },
            eus: {
                common: eusCommon,
            },
        },
    });

export default i18next;