import { COUNTRY_TO_CURRENCY, LANG_TO_CURRENCY } from '../constants.js';

export function detectDefaultCurrency() {
    try {
        const locale = navigator.language || (navigator.languages && navigator.languages[0]) || '';
        const parts = locale.split('-');

        if (parts.length > 1) {
            const country = parts[parts.length - 1].toUpperCase();
            if (COUNTRY_TO_CURRENCY[country]) {
                return COUNTRY_TO_CURRENCY[country];
            }
        }

        const primaryLang = parts[0].toLowerCase();
        if (LANG_TO_CURRENCY[primaryLang]) {
            return LANG_TO_CURRENCY[primaryLang];
        }
    } catch (err) {
        console.error('Failed to detect default currency from locale:', err);
    }
    return 'USD';
}
