export function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseAmount(rawStr) {
    let cleaned = rawStr.replace(/[\s\u00A0]/g, '');
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

    return parseFloat(cleaned);
}
