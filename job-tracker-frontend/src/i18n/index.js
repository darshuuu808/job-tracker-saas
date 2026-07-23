import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "../locales/en/translation.json";
import ta from "../locales/ta/translation.json";
import te from "../locales/te/translation.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({

        resources: {

            en: {
                translation: en
            },

            ta: {
                translation: ta
            },

            te: {
                translation: te
            }

        },

        fallbackLng: "en",

        supportedLngs: [
            "en",
            "ta",
            "te"
        ],

        interpolation: {
            escapeValue: false
        },

        detection: {

            order: [
                "localStorage",
                "navigator"
            ],

            caches: [
                "localStorage"
            ]

        }

    });

export default i18n;