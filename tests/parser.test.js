// tests/parser.test.js

import { parseCurrencyMatch } from '../utils/parser.js';

describe('parseCurrencyMatch', () => {
    describe('Single Values', () => {
        test('parses single value with leading symbol', () => {
            expect(parseCurrencyMatch('$100')).toEqual({
                isRange: false,
                symbol: '$',
                amount1: 100
            });
        });

        test('parses single value with trailing currency code', () => {
            expect(parseCurrencyMatch('250.50 EUR')).toEqual({
                isRange: false,
                symbol: 'EUR',
                amount1: 250.5
            });
        });

        test('parses single value with trailing currency symbol', () => {
            expect(parseCurrencyMatch('1200 zł')).toEqual({
                isRange: false,
                symbol: 'zł',
                amount1: 1200
            });
        });
    });

    describe('Leading Currency Symbol Ranges', () => {
        test('parses range with symbol on both numbers ($100 - $200)', () => {
            expect(parseCurrencyMatch('$100 - $200')).toEqual({
                isRange: true,
                symbol: '$',
                amount1: 100,
                amount2: 200
            });
        });

        test('parses range with symbol only on first number ($100 - 200)', () => {
            expect(parseCurrencyMatch('$100 - 200')).toEqual({
                isRange: true,
                symbol: '$',
                amount1: 100,
                amount2: 200
            });
        });

        test('handles en-dash and em-dash separators (€50–€100)', () => {
            expect(parseCurrencyMatch('€50–€100')).toEqual({
                isRange: true,
                symbol: '€',
                amount1: 50,
                amount2: 100
            });
        });

        test('handles "to" word separator (£15 to £30)', () => {
            expect(parseCurrencyMatch('£15 to £30')).toEqual({
                isRange: true,
                symbol: '£',
                amount1: 15,
                amount2: 30
            });
        });
    });

    describe('Trailing Currency Code/Symbol Ranges', () => {
        test('parses range with code on end only (100 - 200 USD)', () => {
            expect(parseCurrencyMatch('100 - 200 USD')).toEqual({
                isRange: true,
                symbol: 'USD',
                amount1: 100,
                amount2: 200
            });
        });

        test('parses range with code on both numbers (100 USD - 200 USD)', () => {
            expect(parseCurrencyMatch('100 USD - 200 USD')).toEqual({
                isRange: true,
                symbol: 'USD',
                amount1: 100,
                amount2: 200
            });
        });

        test('parses trailing symbol with no spaces (100$ - 200$)', () => {
            expect(parseCurrencyMatch('100$ - 200$')).toEqual({
                isRange: true,
                symbol: '$',
                amount1: 100,
                amount2: 200
            });
        });
    });

    describe('Number Formatting and Decimals', () => {
        test('parses formatted numbers with commas ($1,000.00 - $2,500.50)', () => {
            expect(parseCurrencyMatch('$1,000.00 - $2,500.50')).toEqual({
                isRange: true,
                symbol: '$',
                amount1: 1000,
                amount2: 2500.5
            });
        });

        test('parses European comma decimal formatting (10,50 - 20,00 EUR)', () => {
            expect(parseCurrencyMatch('10,50 - 20,00 EUR')).toEqual({
                isRange: true,
                symbol: 'EUR',
                amount1: 10.5,
                amount2: 20
            });
        });
    });

    describe('Invalid and Non-Matching Inputs', () => {
        test('returns null for plain text with no currency', () => {
            expect(parseCurrencyMatch('Hello world 100 - 200')).toBeNull();
        });

        test('returns null for empty string', () => {
            expect(parseCurrencyMatch('')).toBeNull();
        });

        test('returns null for unrecognized currency code', () => {
            expect(parseCurrencyMatch('100 - 200 XYZ')).toBeNull();
        });
    });
});