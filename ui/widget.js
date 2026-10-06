// ui/widget.js

import { UNIQUE_CURRENCIES } from '../constants.js';
import { parseCurrencyMatch } from '../utils/parser.js';
import { currencyService } from '../services/currencyService.js';

export class Widget {
    constructor(initialCurrency, onCurrencyChange) {
        this.currentCurrency = initialCurrency;
        this.onCurrencyChange = onCurrencyChange;
        this.container = null;
        this.button = null;
        this.menu = null;
        this.searchInput = null;
        this.resultBox = null;
        this.listContainer = null;
        this.footer = null;
    }

    render() {
        if (document.getElementById('cc-widget-container')) return;

        this.container = document.createElement('div');
        this.container.id = 'cc-widget-container';
        Object.assign(this.container.style, {
            position: 'fixed', bottom: '20px', right: '20px',
            zIndex: '2147483647', fontFamily: 'system-ui, -apple-system, sans-serif'
        });

        this._createButton();
        this._createMenu();

        this.container.appendChild(this.menu);
        this.container.appendChild(this.button);
        document.body.appendChild(this.container);

        this._bindEvents();
    }

    _createButton() {
        this.button = document.createElement('button');
        this.button.id = 'cc-widget-btn';
        this.button.textContent = this.currentCurrency;
        Object.assign(this.button.style, {
            width: '50px', height: '50px', borderRadius: '50%',
            backgroundColor: '#0f172a', color: '#ffffff', border: '2px solid #38bdf8',
            fontWeight: 'bold', fontSize: '13px', cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        });
    }

    _createMenu() {
        this.menu = document.createElement('div');
        this.menu.id = 'cc-widget-menu';
        Object.assign(this.menu.style, {
            display: 'none', position: 'absolute', bottom: '60px', right: '0',
            width: '230px', maxHeight: '350px', backgroundColor: '#1e293b',
            borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            overflow: 'hidden', flexDirection: 'column', border: '1px solid #334155'
        });

        this.searchInput = document.createElement('input');
        this.searchInput.placeholder = 'Search or enter amount (e.g. 50-100 USD)';
        Object.assign(this.searchInput.style, {
            width: '100%', padding: '8px', boxSizing: 'border-box', border: 'none',
            borderBottom: '1px solid #334155', backgroundColor: '#0f172a',
            color: '#fff', fontSize: '12px', outline: 'none'
        });

        this.resultBox = document.createElement('div');
        this.resultBox.id = 'cc-conversion-result';
        Object.assign(this.resultBox.style, {
            display: 'none', padding: '10px 12px', backgroundColor: '#0284c7',
            color: '#ffffff', fontWeight: 'bold', fontSize: '13px',
            borderBottom: '1px solid #334155', wordBreak: 'break-word'
        });

        this.listContainer = document.createElement('div');
        Object.assign(this.listContainer.style, { overflowY: 'auto', maxHeight: '180px' });

        this.populateList();
        this._createFooter();

        this.menu.appendChild(this.searchInput);
        this.menu.appendChild(this.resultBox);
        this.menu.appendChild(this.listContainer);
        this.menu.appendChild(this.footer);
    }

    _createFooter() {
        this.footer = document.createElement('div');
        this.footer.id = 'cc-widget-footer';
        Object.assign(this.footer.style, {
            padding: '8px 10px',
            backgroundColor: '#0f172a',
            borderTop: '1px solid #334155',
            textAlign: 'center',
            fontSize: '11px',
            color: '#94a3b8'
        });

        const text = document.createTextNode('Have you found an issue? ');

        const link = document.createElement('a');
        link.href = 'https://example.com/feedback';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Click here.';
        Object.assign(link.style, {
            color: '#38bdf8',
            textDecoration: 'none',
            fontWeight: 'bold'
        });

        link.addEventListener('mouseenter', () => link.style.textDecoration = 'underline');
        link.addEventListener('mouseleave', () => link.style.textDecoration = 'none');

        this.footer.appendChild(text);
        this.footer.appendChild(link);
    }

    populateList(filter = '') {
        this.listContainer.innerHTML = '';
        UNIQUE_CURRENCIES
            .filter(c => c.toLowerCase().includes(filter.toLowerCase()))
            .forEach(code => {
                const item = document.createElement('div');
                item.textContent = code;
                Object.assign(item.style, {
                    padding: '8px 12px',
                    color: code === this.currentCurrency ? '#38bdf8' : '#fff',
                    fontWeight: code === this.currentCurrency ? 'bold' : 'normal',
                    cursor: 'pointer', fontSize: '13px'
                });
                item.addEventListener('mouseenter', () => item.style.backgroundColor = '#334155');
                item.addEventListener('mouseleave', () => item.style.backgroundColor = 'transparent');
                item.addEventListener('click', () => this.selectCurrency(code));
                this.listContainer.appendChild(item);
            });
    }

    async selectCurrency(code) {
        await currencyService.setTargetCurrency(code);
        this.currentCurrency = code;
        this.button.textContent = code;
        this.menu.style.display = 'none';
        this.searchInput.value = '';
        this.resultBox.style.display = 'none';
        this.populateList();
        if (this.onCurrencyChange) this.onCurrencyChange(code);
    }

    _bindEvents() {
        this.searchInput.addEventListener('input', async (e) => {
            const rawValue = e.target.value.trim();

            if (/\d/.test(rawValue)) {
                const parsed = parseCurrencyMatch(rawValue);
                if (parsed) {
                    const sourceCurrency = currencyService.resolveSourceCurrency(parsed.symbol);
                    if (sourceCurrency) {
                        const conversion = await currencyService.convert(parsed, this.currentCurrency);

                        if (conversion.status === 'SAME_CURRENCY') {
                            this.resultBox.textContent = `Already in ${this.currentCurrency}`;
                        } else if (conversion.status === 'SUCCESS') {
                            const originalLabel = parsed.isRange
                                ? `${parsed.amount1} - ${parsed.amount2} ${sourceCurrency}`
                                : `${parsed.amount1} ${sourceCurrency}`;

                            this.resultBox.textContent = `${originalLabel} ≈ ${conversion.result} ${this.currentCurrency}`;
                        } else {
                            this.resultBox.textContent = 'Offline';
                        }

                        this.resultBox.style.display = 'block';
                        this.populateList();
                        return;
                    }
                }
            }

            this.resultBox.style.display = 'none';
            this.populateList(rawValue);
        });

        this.button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = this.menu.style.display === 'flex';
            this.menu.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) this.searchInput.focus();
        });

        document.addEventListener('click', (e) => {
            if (this.container && !this.container.contains(e.target)) {
                this.menu.style.display = 'none';
            }
        });
    }
}
