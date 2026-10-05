// utils/parser.js

import { CURRENCY_REGEX } from '../constants.js';

export function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SUFFIX_MULTIPLIERS = {
    'k': 1e3, 'к': 1e3,
    'm': 1e6, 'м': 1e6,
    'b': 1e9, 'б': 1e9
};

export function parseAmount(rawStr) {
    if (!rawStr) return NaN;

    // 1. Extract trailing suffix (Latin or Cyrillic)
    const suffixMatch = rawStr.match(/([kKmMbBкКмМбБ])\s*$/u);
    const suffix = suffixMatch ? suffixMatch[1].toLowerCase() : null;
    const multiplier = suffix ? SUFFIX_MULTIPLIERS[suffix] : 1;

    // 2. Clean out suffixes, spaces, and non-breaking spaces
    let cleaned = rawStr.replace(/[kKmMbBкКмМбБ\s\u00A0]/gu, '');
    cleaned = cleaned.replace(/^[.,]+|[.,]+$/g, '');

    if (!cleaned) return NaN;

    // 3. Handle decimal and thousand separators
    const hasDot = cleaned.includes('.');
    const hasComma = cleaned.includes(',');

    if (hasDot && hasComma) {
        const lastDot = cleaned.lastIndexOf('.');
        const lastComma = cleaned.lastIndexOf(',');
        cleaned = lastDot > lastComma
            ? cleaned.replace(/,/g, '')
            : cleaned.replace(/\./g, '').replace(',', '.');
    } else if (hasDot && /^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
        cleaned = cleaned.replace(/\./g, '');
    } else if (hasComma) {
        cleaned = /^\d{1,3}(,\d{3})+$/.test(cleaned)
            ? cleaned.replace(/,/g, '')
            : cleaned.replace(',', '.');
    }

    const numericValue = parseFloat(cleaned);
    return isNaN(numericValue) ? NaN : numericValue * multiplier;
}

export function parseCurrencyMatch(text) {
    const match = text.match(CURRENCY_REGEX);
    if (!match) return null;

    // Group 1, 2, 3: Leading Range ($46k - $80.5k or $46k - 80.5k)
    if (match[1] && match[2] && match[3]) {
        const symbol = match[1];
        const amt1 = parseAmount(match[2]);
        const amt2 = parseAmount(match[3]);
        if (!isNaN(amt1) && !isNaN(amt2)) {
            return { isRange: true, symbol, amount1: amt1, amount2: amt2 };
        }
    }

    if (match[4] && match[5] && match[6]) {
        const symbol = match[6];
        const amt1 = parseAmount(match[4]);
        const amt2 = parseAmount(match[5]);
        if (!isNaN(amt1) && !isNaN(amt2)) {
            return { isRange: true, symbol, amount1: amt1, amount2: amt2 };
        }
    }

    if (match[7] && match[8]) {
        const symbol = match[7];
        const amt = parseAmount(match[8]);
        if (!isNaN(amt)) {
            return { isRange: false, symbol, amount1: amt };
        }
    }

    if (match[9] && match[10]) {
        const symbol = match[10];
        const amt = parseAmount(match[9]);
        if (!isNaN(amt)) {
            return { isRange: false, symbol, amount1: amt };
        }
    }

    return null;
}
