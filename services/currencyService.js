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

    async convert(amount, sourceCurrency, targetCurrency) {
        if (sourceCurrency === targetCurrency) {
            return { status: 'SAME_CURRENCY' };
        }

        const rates = await this.getRates();
        if (rates && rates[sourceCurrency] && rates[targetCurrency]) {
            const converted = (amount * (rates[targetCurrency] / rates[sourceCurrency])).toFixed(2);
            return { status: 'SUCCESS', result: converted };
        }

        return { status: 'OFFLINE' };
    }
}

export const currencyService = new CurrencyService();
