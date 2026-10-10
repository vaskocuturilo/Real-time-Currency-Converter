import { escapeRegExp } from './utils/parser.js';

export const CACHE_TTL_MS = 3600 * 1000;
export const API_URL = 'https://api.frankfurter.dev/v2/rates';

export const CURRENCY_MAP = {
    '$': 'USD', 'доллар': 'USD', '€': 'EUR', 'евро': 'EUR', '£': 'GBP', 'фунт': 'GBP', '円': 'JPY', '₹': 'INR', '₽': 'RUB',
    '֏': 'AMD', 'драм': 'AMD', 'zł': 'PLN', 'ZŁ': 'PLN', '₸': 'KZT', 'тенге': 'KZT', 'тг': 'KZT', '₴': 'UAH', '₾': 'GEL', 'лари': 'GEL', '₼': 'AZN', 'ман': 'AZN',
    '฿': 'THB', 'bat': 'THB', 'бат': 'THB', '₪': 'ILS', '₩': 'KRW', '₫': 'VND', '₦': 'NGN', '₱': 'PHP', '⃀': 'KGS', 'сом': 'KGS',
    '₲': 'PYG', '₡': 'CRC', '₺': 'TRY', 'лир': 'TRY', '₭': 'LAK', '₮': 'MNT', 'тугрик': 'MNT', 'тугриков': 'MNT', '៛': 'KHR',
    'руб': 'RUB', 'руб.': 'RUB', 'р.': 'RUB', 'р': 'RUB', 'грн': 'UAH', 'дин.': 'RSD', 'дин': 'RSD', '¥': 'CNY', 'юан': 'CNY',
    'din': 'RSD', 'DIN': 'RSD', 'динар': 'RSD', 'РСД': 'RSD', 'лв': 'BGN', 'Dh': 'MAD', 'Dh': 'MAD', '.د.م': 'MAD', 'с': 'TJS',
    'lei': 'RON', 'Ft': 'HUF', 'Kč': 'CZK', 'крон': 'CZK', 'Rp': 'IDR', 'RM': 'MYR', 'сомони': 'TJS', '⃃': 'AED', 'дирхам': 'AED', 'UAE': 'AED',
    'R$': 'BRL', 'C$': 'CAD', 'A$': 'AUD', 'HK$': 'HKD', 'NT$': 'TWD', 'Dirham': 'AED', 'UAE Dirham': 'AED', 'дрх': 'AED',
    'NZ$': 'NZD', 'RD$': 'DOP', 'S$': 'SGD', '₫': 'VND', 'донг': 'VND', '₩': 'KRW', 'вон': 'KRW', 'won': 'KRW', 'Ft': 'HUF',
    'RM': 'MYR', 'ринггит': 'MYR', 'ringgit': 'MYR', '₪': 'ILS', 'шек': 'ILS', 'shekel': 'ILS', 'sheqel': 'ILS',
    'forint': 'HUF', 'форинт': 'HUF', '₨': 'LKR', 'රු': 'LKR', '௹': 'LKR', 'Sri Lanka Rupee': 'LKR', 'рупий': 'LKR',
    'C$': 'CAD', 'канадский доллар': 'CAD', 'Canadian Dollar': 'CAD', 'A$': 'AUD', 'Australian Dollar': 'AUD',
    'австралийский доллар': 'AUD', 'MX$': 'MXN', 'песо': 'MXN', 'Mexican peso': 'MXN', 'LE': 'EGP', 'Egyptian Pound': 'EGP',
    'египетский фунт': 'EGP', 'so‘m': 'UZS', 'сўм': 'UZS', 'сум': 'UZS', 'R': 'ZAR', 'рэнд': 'ZAR', 'ранд': 'ZAR',
    '⃂': 'MVR', 'руфия': 'MVR', 'мальдивская руфия': 'MVR', 'rufiyaa': 'MVR', 'L': 'ALL', 'лек': 'ALL', 'lek': 'ALL',
    'Arg$': 'ARS', 'Argentine Peso': 'ARS', 'Аргентинское песо': 'ARS', 'индонезийская рупия': 'IDR', 'лей': 'MDL', 'leu': 'MDL',
    'S$': 'SGD',

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

export const COUNTRY_TO_CURRENCY = {
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

export const LANG_TO_CURRENCY = {
    'pl': 'PLN', 'kk': 'KZT', 'uk': 'UAH', 'ru': 'RUB', 'ja': 'JPY',
    'de': 'EUR', 'fr': 'EUR', 'es': 'EUR', 'it': 'EUR', 'ko': 'KRW',
    'zh': 'CNY', 'th': 'THB', 'ka': 'GEL', 'hy': 'AMD', 'vi': 'VND',
    'cs': 'CZK', 'hu': 'HUF', 'ro': 'RON', 'tr': 'TRY', 'el': 'EUR',
    'sr': 'RSD'
};

const sortedKeys = Object.keys(CURRENCY_MAP).sort((a, b) => b.length - a.length);
const symbolsPattern = sortedKeys.map(escapeRegExp).join('|');

const numPattern = String.raw`\d+(?:[\s.,]\d+)*\s*(?:млн|mln|[kKmMbBкКмМбБ])?`;

const rangePrefix = String.raw`(?:(?:od|from|от)\s+)?`;
const rangeSep = String.raw`(?:\s*[-–—]\s*|\s+\b(?:do|to|до)\b\s*)`;

const leadingRange = String.raw`(?:${rangePrefix}(${symbolsPattern})\s*(${numPattern})${rangeSep}(?:${symbolsPattern}\s*)?(${numPattern}))`;

const trailingRange = String.raw`(?:${rangePrefix}(${numPattern})\s*(?:${symbolsPattern}\s*)?${rangeSep}(${numPattern})\s*(${symbolsPattern}))`;

const leadingSingle = String.raw`(?:(${symbolsPattern})\s*(${numPattern}))`;
const trailingSingle = String.raw`(?:(${numPattern})\s*(${symbolsPattern}))`;

export const CURRENCY_REGEX = new RegExp(
    `${leadingRange}|${trailingRange}|${leadingSingle}|${trailingSingle}`,
    'iu'
);

export const UNIQUE_CURRENCIES = [...new Set(Object.values(CURRENCY_MAP))].sort();