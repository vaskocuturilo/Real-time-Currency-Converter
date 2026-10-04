// utils/parser.js

import { CURRENCY_REGEX } from '../constants.js';

export function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseAmount(rawStr) {
    let cleaned = rawStr.trim();

    let multiplier = 1;
    const scaleMatch = cleaned.match(/([kKmMbB])$/);
    if (scaleMatch) {
        const suffix = scaleMatch[1].toLowerCase();
        if (suffix === 'k') multiplier = 1_000;
        else if (suffix === 'm') multiplier = 1_000_000;
        else if (suffix === 'b') multiplier = 1_000_000_000;

        cleaned = cleaned.slice(0, -1).trim();
    }

    cleaned = cleaned.replace(/[\s\u00A0]/g, '');
    cleaned = cleaned.replace(/^[.,]+|[.,]+$/g, '');

    if (!cleaned) return NaN;

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

    const parsedVal = parseFloat(cleaned);
    return isNaN(parsedVal) ? NaN : parsedVal * multiplier;
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
