const CURRENCY_MAP = {
    '$': 'USD', '€': 'EUR', '£': 'GBP', '¥': 'JPY', '₹': 'INR', '₽': 'RUB',
    '֏': 'AMD', 'zł': 'PLN', 'ZŁ': 'PLN', '₸': 'KZT', '₴': 'UAH', '₾': 'GEL',
    '฿': 'THB', '₪': 'ILS', '₩': 'KRW', '₫': 'VND', '₦': 'NGN', '₱': 'PHP',
    '₲': 'PYG', '₡': 'CRC', '₺': 'TRY', '₭': 'LAK', '₮': 'MNT', '៛': 'KHR',
    'руб': 'RUB', 'руб.': 'RUB', 'грн': 'UAH', 'дин.': 'RSD', 'дин': 'RSD',
    'din': 'RSD', 'DIN': 'RSD', 'динар': 'RSD', 'лв': 'BGN',
    'lei': 'RON', 'Ft': 'HUF', 'Kč': 'CZK', 'Rp': 'IDR', 'RM': 'MYR',
    'R$': 'BRL', 'C$': 'CAD', 'A$': 'AUD', 'HK$': 'HKD', 'NT$': 'TWD',
    'NZ$': 'NZD', 'RD$': 'DOP', 'S$': 'SGD',

    'AED': 'AED', 'AFN': 'AFN', 'ALL': 'ALL', 'AMD': 'AMD', 'ANG': 'ANG', 'AOA': 'AOA',
    'ARS': 'ARS', 'AUD': 'AUD', 'AWG': 'AWG', 'AZN': 'AZN', 'BAM': 'BAM', 'BBD': 'BBD',
    'BDT': 'BDT', 'BGN': 'BGN', 'BHD': 'BHD', 'BIF': 'BIF', 'BMD': 'BMD', 'BND': 'BND',
    'BOB': 'BOB', 'BRL': 'BRL', 'BSD': 'BSD', 'BTN': 'BTN', 'BWP': 'BWP', 'BYN': 'BYN',
    'BZD': 'BZD', 'CAD': 'CAD', 'CDF': 'CDF', 'CHF': 'CHF', 'CLP': 'CLP', 'CNY': 'CNY',
    'COP': 'COP', 'CRC': 'CRC', 'CUP': 'CUP', 'CVE': 'CVE', 'CZK': 'CZK', 'DJF': 'DJF',
    'DKK': 'DKK', 'DOP': 'DOP', 'DZD': 'DZD', 'EGP': 'EGP', 'ERN': 'ERN', 'ETB': 'ETB',
    'EUR': 'EUR', 'FJD': 'FJD', 'FKP': 'FKP', 'GBP': 'GBP', 'GEL': 'GEL', 'GHS': 'GHS',
    'GIP': 'GIP', 'GMD': 'GMD', 'GNF': 'GNF', 'GTQ': 'GTQ', 'GYD': 'GYD', 'HKD': 'HKD',
    'HNL': 'HNL', 'HTG': 'HTG', 'HUF': 'HUF', 'IDR': 'IDR', 'ILS': 'ILS', 'INR': 'INR',
    'IQD': 'IQD', 'IRR': 'IRR', 'ISK': 'ISK', 'JMD': 'JMD', 'JOD': 'JOD', 'JPY': 'JPY',
    'KES': 'KES', 'KGS': 'KGS', 'KHR': 'KHR', 'KMF': 'KMF', 'KPW': 'KPW', 'KRW': 'KRW',
    'KWD': 'KWD', 'KYD': 'KYD', 'KZT': 'KZT', 'LAK': 'LAK', 'LBP': 'LBP', 'LKR': 'LKR',
    'LRD': 'LRD', 'LSL': 'LSL', 'LYD': 'LYD', 'MAD': 'MAD', 'MDL': 'MDL', 'MGA': 'MGA',
    'MKD': 'MKD', 'MMK': 'MMK', 'MNT': 'MNT', 'MOP': 'MOP', 'MRU': 'MRU', 'MUR': 'MUR',
    'MVR': 'MVR', 'MWK': 'MWK', 'MXN': 'MXN', 'MYR': 'MYR', 'MZN': 'MZN', 'NAD': 'NAD',
    'NGN': 'NGN', 'NIO': 'NIO', 'NOK': 'NOK', 'NPR': 'NPR', 'NZD': 'NZD', 'OMR': 'OMR',
    'PAB': 'PAB', 'PEN': 'PEN', 'PGK': 'PGK', 'PHP': 'PHP', 'PKR': 'PKR', 'PLN': 'PLN',
    'PYG': 'PYG', 'QAR': 'QAR', 'RON': 'RON', 'RSD': 'RSD', 'RUB': 'RUB', 'RWF': 'RWF',
    'SAR': 'SAR', 'SBD': 'SBD', 'SCR': 'SCR', 'SDG': 'SDG', 'SEK': 'SEK', 'SGD': 'SGD',
    'SLE': 'SLE', 'SOS': 'SOS', 'SRD': 'SRD', 'SSP': 'SSP', 'STN': 'STN', 'SYP': 'SYP',
    'SZL': 'SZL', 'THB': 'THB', 'TJS': 'TJS', 'TMT': 'TMT', 'TND': 'TND', 'TOP': 'TOP',
    'TRY': 'TRY', 'TTD': 'TTD', 'TWD': 'TWD', 'TZS': 'TZS', 'UAH': 'UAH', 'UGX': 'UGX',
    'USD': 'USD', 'UYU': 'UYU', 'UZS': 'UZS', 'VES': 'VES', 'VND': 'VND', 'VUV': 'VUV',
    'WST': 'WST', 'XAF': 'XAF', 'XCD': 'XCD', 'XOF': 'XOF', 'XPF': 'XPF', 'YER': 'YER',
    'ZAR': 'ZAR', 'ZMW': 'ZMW', 'ZWG': 'ZWG'
};

const COUNTRY_TO_CURRENCY = {
    'PL': 'PLN', 'KZ': 'KZT', 'UA': 'UAH', 'RU': 'RUB', 'US': 'USD',
    'GB': 'GBP', 'JP': 'JPY', 'IN': 'INR', 'GE': 'GEL', 'TH': 'THB',
    'IL': 'ILS', 'KR': 'KRW', 'VN': 'VND', 'NG': 'NGN', 'PH': 'PHP',
    'PY': 'PYG', 'CR': 'CRC', 'TR': 'TRY', 'LA': 'LAK', 'MN': 'MNT',
    'KH': 'KHR', 'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN',
    'RS': 'RSD', 'MY': 'MYR', 'ID': 'IDR', 'BR': 'BRL', 'CA': 'CAD',
    'AU': 'AUD', 'HK': 'HKD', 'TW': 'TWD', 'NZ': 'NZD', 'SG': 'SGD',
    'AE': 'AED', 'CN': 'CNY', 'CH': 'CHF', 'SE': 'SEK', 'NO': 'NOK',
    'DK': 'DKK', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR',
    'NL': 'EUR', 'BE': 'EUR', 'AT': 'EUR', 'PT': 'EUR', 'FI': 'EUR',
    'GR': 'EUR', 'IE': 'EUR', 'SK': 'EUR', 'SI': 'EUR', 'LT': 'EUR',
    'LV': 'EUR', 'EE': 'EUR', 'CY': 'EUR', 'MT': 'EUR', 'HR': 'EUR'
};

const LANG_TO_CURRENCY = {
    'pl': 'PLN', 'kk': 'KZT', 'uk': 'UAH', 'ru': 'RUB', 'ja': 'JPY',
    'de': 'EUR', 'fr': 'EUR', 'es': 'EUR', 'it': 'EUR', 'ko': 'KRW',
    'zh': 'CNY', 'th': 'THB', 'ka': 'GEL', 'hy': 'AMD', 'vi': 'VND',
    'cs': 'CZK', 'hu': 'HUF', 'ro': 'RON', 'tr': 'TRY', 'el': 'EUR',
    'sr': 'RSD'
};

const CACHE_TTL_MS = 3600 * 1000;
const API_URL = 'https://api.frankfurter.dev/v2/rates';

function detectDefaultCurrency() {
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
        console.error('Failed to detect currency from browser locale:', err);
    }
    return 'USD';
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const sortedKeys = Object.keys(CURRENCY_MAP).sort((a, b) => b.length - a.length);
const symbolsPattern = sortedKeys.map(escapeRegExp).join('|');
const currencyRegex = new RegExp(`(?:(${symbolsPattern})\\s*([\\d\\s.,]+)|([\\d\\s.,]+)\\s*(${symbolsPattern}))`, 'i');
const UNIQUE_CURRENCIES = [...new Set(Object.values(CURRENCY_MAP))].sort();

async function getRates() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['cachedRates', 'lastFetch'], async (storage) => {
            let rates = storage.cachedRates;
            const now = Date.now();

            if (!rates || !storage.lastFetch || (now - storage.lastFetch > CACHE_TTL_MS)) {
                try {
                    const response = await fetch(API_URL);
                    const data = await response.json();

                    rates = data.reduce((acc, item) => {
                        acc[item.quote] = item.rate;
                        return acc;
                    }, {});

                    chrome.storage.local.set({ cachedRates: rates, lastFetch: now });
                } catch (err) {
                    console.error('Failed to fetch Frankfurter rates:', err);
                    return resolve(null);
                }
            }
            resolve(rates);
        });
    });
}

function renderWidget(currentCurrency) {
    if (document.getElementById('cc-widget-container')) return;

    const container = document.createElement('div');
    container.id = 'cc-widget-container';
    Object.assign(container.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '2147483647',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    });

    const button = document.createElement('button');
    button.id = 'cc-widget-btn';
    button.textContent = currentCurrency;
    Object.assign(button.style, {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: '#0f172a',
        color: '#ffffff',
        border: '2px solid #38bdf8',
        fontWeight: 'bold',
        fontSize: '13px',
        cursor: 'pointer',
        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });

    const menu = document.createElement('div');
    menu.id = 'cc-widget-menu';
    Object.assign(menu.style, {
        display: 'none',
        position: 'absolute',
        bottom: '60px',
        right: '0',
        width: '210px',
        maxHeight: '300px',
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        overflow: 'hidden',
        flexDirection: 'column',
        border: '1px solid #334155'
    });

    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Search or enter amount (e.g. 50 USD)';
    Object.assign(searchInput.style, {
        width: '100%',
        padding: '8px',
        boxSizing: 'border-box',
        border: 'none',
        borderBottom: '1px solid #334155',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontSize: '12px',
        outline: 'none'
    });

    const resultBox = document.createElement('div');
    resultBox.id = 'cc-conversion-result';
    Object.assign(resultBox.style, {
        display: 'none',
        padding: '10px 12px',
        backgroundColor: '#0284c7',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '13px',
        borderBottom: '1px solid #334155',
        wordBreak: 'break-word'
    });

    const listContainer = document.createElement('div');
    Object.assign(listContainer.style, {
        overflowY: 'auto',
        maxHeight: '200px'
    });

    function populateList(filter = '') {
        listContainer.innerHTML = '';
        UNIQUE_CURRENCIES
            .filter(c => c.toLowerCase().includes(filter.toLowerCase()))
            .forEach(code => {
                const item = document.createElement('div');
                item.textContent = code;
                Object.assign(item.style, {
                    padding: '8px 12px',
                    color: code === currentCurrency ? '#38bdf8' : '#fff',
                    fontWeight: code === currentCurrency ? 'bold' : 'normal',
                    cursor: 'pointer',
                    fontSize: '13px'
                });
                item.addEventListener('mouseenter', () => item.style.backgroundColor = '#334155');
                item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
                item.addEventListener('click', () => {
                    chrome.storage.local.set({ targetCurrency: code }, () => {
                        button.textContent = code;
                        currentCurrency = code;
                        menu.style.display = 'none';
                        searchInput.value = '';
                        resultBox.style.display = 'none';
                        populateList();
                    });
                });
                listContainer.appendChild(item);
            });
    }

    // Handle Dual Mode Input: Calculation when numbers exist, search when letters only
    searchInput.addEventListener('input', async (e) => {
        const rawValue = e.target.value.trim();

        // Check if input contains digits
        if (/\d/.test(rawValue)) {
            const match = rawValue.match(currencyRegex);
            if (match) {
                const matchedSymbol = match[1] || match[4];
                const rawAmount = match[2] || match[3];

                const baseKey = Object.keys(CURRENCY_MAP).find(
                    key => key.toLowerCase() === matchedSymbol.toLowerCase()
                );

                const sourceCurrency = CURRENCY_MAP[baseKey];
                const amount = parseAmount(rawAmount);

                if (!isNaN(amount) && sourceCurrency) {
                    if (sourceCurrency === currentCurrency) {
                        resultBox.textContent = `Already in ${currentCurrency}`;
                        resultBox.style.display = 'block';
                        populateList();
                        return;
                    }

                    const rates = await getRates();
                    if (rates && rates[sourceCurrency] && rates[currentCurrency]) {
                        const converted = (amount * (rates[currentCurrency] / rates[sourceCurrency])).toFixed(2);
                        resultBox.textContent = `${amount} ${sourceCurrency} ≈ ${converted} ${currentCurrency}`;
                        resultBox.style.display = 'block';
                        populateList();
                        return;
                    }
                }
            }
        }

        // Default: Letters-only Search Mode
        resultBox.style.display = 'none';
        populateList(rawValue);
    });

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = menu.style.display === 'flex';
        menu.style.display = isVisible ? 'none' : 'flex';
        if (!isVisible) searchInput.focus();
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) menu.style.display = 'none';
    });

    populateList();
    menu.appendChild(searchInput);
    menu.appendChild(resultBox);
    menu.appendChild(listContainer);
    container.appendChild(menu);
    container.appendChild(button);
    document.body.appendChild(container);
}

chrome.storage.local.get(['targetCurrency'], (res) => {
    let activeCurrency = res.targetCurrency;

    if (!activeCurrency) {
        activeCurrency = detectDefaultCurrency();
        chrome.storage.local.set({ targetCurrency: activeCurrency });
    }

    renderWidget(activeCurrency);
});

function parseAmount(rawStr) {
    let cleaned = rawStr.replace(/[\s\u00A0]/g, '');
    cleaned = cleaned.replace(/^[.,]+|[.,]+$/g, '');

    if (!cleaned) return NaN;

    const hasDot = cleaned.includes('.');
    const hasComma = cleaned.includes(',');

    if (hasDot && hasComma) {
        const lastDot = cleaned.lastIndexOf('.');
        const lastComma = cleaned.lastIndexOf(',');
        if (lastDot > lastComma) {
            cleaned = cleaned.replace(/,/g, '');
        } else {
            cleaned = cleaned.replace(/\./g, '').replace(',', '.');
        }
    } else if (hasDot && /^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
        cleaned = cleaned.replace(/\./g, '');
    } else if (hasComma) {
        if (/^\d{1,3}(,\d{3})+$/.test(cleaned)) {
            cleaned = cleaned.replace(/,/g, '');
        } else {
            cleaned = cleaned.replace(',', '.');
        }
    }

    return parseFloat(cleaned);
}

function removeTooltip() {
    const existing = document.getElementById('currency-converter-tooltip');
    if (existing) existing.remove();
}

function showTooltip(range, text) {
    removeTooltip();

    const rect = range.getBoundingClientRect();
    const tooltip = document.createElement('div');
    tooltip.id = 'currency-converter-tooltip';
    tooltip.textContent = text;

    Object.assign(tooltip.style, {
        position: 'absolute',
        backgroundColor: '#1e293b',
        color: '#ffffff',
        padding: '6px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)',
        zIndex: '2147483647',
        pointerEvents: 'none',
        whiteSpace: 'nowrap'
    });

    document.body.appendChild(tooltip);

    const tooltipRect = tooltip.getBoundingClientRect();
    const top = rect.top + window.scrollY - tooltipRect.height - 8;
    const left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);

    tooltip.style.top = `${Math.max(0, top)}px`;
    tooltip.style.left = `${Math.max(0, left)}px`;
}

document.addEventListener('mousedown', (e) => {
    if (e.target.id !== 'currency-converter-tooltip' && !e.target.closest('#cc-widget-container')) {
        removeTooltip();
    }
});

document.addEventListener('mouseup', async (e) => {
    if (e.target.closest('#cc-widget-container')) return;

    const selection = window.getSelection();
    const selectedText = selection.toString()
        .replace(/[\r\n\t\u00A0]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (!selectedText) {
        removeTooltip();
        return;
    }

    const match = selectedText.match(currencyRegex);
    if (!match) return;

    const matchedSymbol = match[1] || match[4];
    const rawAmount = match[2] || match[3];

    const baseKey = Object.keys(CURRENCY_MAP).find(
        key => key.toLowerCase() === matchedSymbol.toLowerCase()
    );

    const sourceCurrency = CURRENCY_MAP[baseKey];
    const amount = parseAmount(rawAmount);

    if (isNaN(amount) || !sourceCurrency) return;

    const range = selection.getRangeAt(0);

    chrome.storage.local.get(['targetCurrency'], async (storage) => {
        const targetCurrency = storage.targetCurrency || detectDefaultCurrency();

        if (sourceCurrency === targetCurrency) {
            showTooltip(range, `Already in ${targetCurrency}`);
            return;
        }

        const rates = await getRates();
        if (rates && rates[sourceCurrency] && rates[targetCurrency]) {
            const converted = (amount * (rates[targetCurrency] / rates[sourceCurrency])).toFixed(2);
            showTooltip(range, `≈ ${converted} ${targetCurrency}`);
        }
    });
});
