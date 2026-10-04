// services/currencyService.js

import { API_URL, CACHE_TTL_MS, CURRENCY_MAP } from '../constants.js';
import { detectDefaultCurrency } from '../utils/locale.js';

class CurrencyService {
    async getRates() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['cachedRates', 'lastFetch'], async (storage) => {
                let rates = storage.cachedRates;
                const now = Date.now();
                const isExpired = !rates || !storage.lastFetch || (now - storage.lastFetch > CACHE_TTL_MS);

                if (isExpired) {
                    try {
                        const response = await fetch(API_URL);
                        if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
                        const data = await response.json();

                        rates = data.reduce((acc, item) => {
                            acc[item.quote] = item.rate;
                            return acc;
                        }, {});

                        rates['EUR'] = 1;
                        chrome.storage.local.set({ cachedRates: rates, lastFetch: now });
                    } catch (err) {
                        console.warn('Network issue encountered. Falling back to cached rates:', err);
                    }
                }

                if (rates && !rates['EUR']) {
                    rates['EUR'] = 1;
                }

                resolve(rates || null);
            });
        });
    }

    async getTargetCurrency() {
        return new Promise((resolve) => {
            chrome.storage.local.get(['targetCurrency'], (res) => {
                let active = res.targetCurrency;
                if (!active) {
                    active = detectDefaultCurrency();
                    chrome.storage.local.set({ targetCurrency: active });
                }
                resolve(active);
            });
        });
    }

    setTargetCurrency(currencyCode) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ targetCurrency: currencyCode }, resolve);
        });
    }

    resolveSourceCurrency(symbolOrCode) {
        const baseKey = Object.keys(CURRENCY_MAP).find(
            key => key.toLowerCase() === symbolOrCode.toLowerCase()
        );
        return CURRENCY_MAP[baseKey] || null;
    }

    async convert(parsedData, targetCurrency) {
        let amount1, amount2, isRange, sourceCurrency;

        if (typeof parsedData === 'object' && parsedData.symbol) {
            sourceCurrency = this.resolveSourceCurrency(parsedData.symbol);
            isRange = parsedData.isRange;
            amount1 = parsedData.amount1;
            amount2 = parsedData.amount2;
        } else {
            // Backward compatibility fallback
            amount1 = arguments[0];
            sourceCurrency = arguments[1];
            targetCurrency = arguments[2];
            isRange = false;
        }

        if (!sourceCurrency) return { status: 'INVALID_CURRENCY' };

        if (sourceCurrency === targetCurrency) {
            return { status: 'SAME_CURRENCY' };
        }

        const rates = await this.getRates();
        if (rates && rates[sourceCurrency] && rates[targetCurrency]) {
            const multiplier = rates[targetCurrency] / rates[sourceCurrency];

            if (isRange) {
                const res1 = (amount1 * multiplier).toFixed(2);
                const res2 = (amount2 * multiplier).toFixed(2);
                return {
                    status: 'SUCCESS',
                    isRange: true,
                    result: `${res1} - ${res2}`
                };
            }

            const converted = (amount1 * multiplier).toFixed(2);
            return {
                status: 'SUCCESS',
                isRange: false,
                result: converted
            };
        }

        return { status: 'OFFLINE' };
    }
}

export const currencyService = new CurrencyService();
