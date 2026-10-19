import { describe, test, expect } from 'vitest';
import { CURRENCY_MAP, CURRENCY_REGEX } from '../constants.js';
import { parseCurrencyMatch } from '../utils/parser.js';

describe('CURRENCY_MAP & Regex Coverage', () => {
    test('every currency symbol, name, and code in CURRENCY_MAP parses correctly', () => {
        const failures = [];

        for (const [token, expectedIso] of Object.entries(CURRENCY_MAP)) {
            // Test both leading ("TOKEN 100") and trailing ("100 TOKEN") formats
            const leadingText = `${token} 100`;
            const trailingText = `100 ${token}`;

            const parsedLeading = parseCurrencyMatch(leadingText);
            const parsedTrailing = parseCurrencyMatch(trailingText);

            const result = parsedLeading || parsedTrailing;

            if (!result) {
                failures.push(`Token "${token}" (Expected: ${expectedIso}) did not match CURRENCY_REGEX.`);
                continue;
            }

            // Resolve back to ISO code via CURRENCY_MAP lookup
            const matchedKey = Object.keys(CURRENCY_MAP).find(
                k => k.toLowerCase() === result.symbol.toLowerCase()
            );
            const resolvedIso = CURRENCY_MAP[matchedKey];

            if (resolvedIso !== expectedIso) {
                failures.push(`Token "${token}" resolved to ${resolvedIso}, but expected ${expectedIso}.`);
            }

            if (result.amount1 !== 100) {
                failures.push(`Token "${token}" parsed amount incorrectly: got ${result.amount1}, expected 100.`);
            }
        }

        if (failures.length > 0) {
            console.error('\nCurrency Mapping Failures:\n' + failures.join('\n'));
        }

        expect(failures).toHaveLength(0);
    });

    test('successfully ignores non-currency text and plain numbers', () => {
        expect(parseCurrencyMatch('hello world')).toBeNull();
        expect(parseCurrencyMatch('12345')).toBeNull();
        expect(parseCurrencyMatch('UNKNOWN_CURRENCY 500')).toBeNull();
    });
});
