// ui/widget.js

import { UNIQUE_CURRENCIES } from '../constants.js';
import { parseCurrencyMatch } from '../utils/parser.js';
import { currencyService } from '../services/currencyService.js';

export class Widget {
    constructor(initialCurrency, onCurrencyChange, onHide) {
        this.currentCurrency = initialCurrency;
        this.onCurrencyChange = onCurrencyChange;
        this.onHide = onHide;
        this.container = null;
        this.button = null;
        this.menu = null;
        this.searchInput = null;
        this.resultBox = null;
        this.listContainer = null;
        this.settingsView = null;
        this.footer = null;
        this.isSettingsOpen = false;
    }

    render(savedPosition = null) {
        if (document.getElementById('cc-widget-container')) return;

        this.container = document.createElement('div');
        this.container.id = 'cc-widget-container';

        const containerStyle = {
            position: 'fixed',
            zIndex: '2147483647',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        };

        if (savedPosition && savedPosition.top && savedPosition.left) {
            containerStyle.top = savedPosition.top;
            containerStyle.left = savedPosition.left;
        } else {
            containerStyle.bottom = '20px';
            containerStyle.right = '20px';
        }

        Object.assign(this.container.style, containerStyle);

        this._createButton();
        this._createMenu();

        this.container.appendChild(this.menu);
        this.container.appendChild(this.button);
        document.body.appendChild(this.container);

        this._bindEvents();
        this._listenToStorageChanges();
    }

    _createButton() {
        this.button = document.createElement('button');
        this.button.id = 'cc-widget-btn';
        this.button.textContent = this.currentCurrency;
        Object.assign(this.button.style, {
            width: '50px', height: '50px', borderRadius: '50%',
            backgroundColor: '#0f172a', color: '#ffffff', border: '2px solid #38bdf8',
            fontWeight: 'bold', fontSize: '13px', cursor: 'grab',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', userSelect: 'none'
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
        this._createSettingsView();
        this._createFooter();

        this.menu.appendChild(this.searchInput);
        this.menu.appendChild(this.resultBox);
        this.menu.appendChild(this.listContainer);
        this.menu.appendChild(this.settingsView);
        this.menu.appendChild(this.footer);
    }

    _createSettingsView() {
        this.settingsView = document.createElement('div');
        this.settingsView.id = 'cc-widget-settings';
        Object.assign(this.settingsView.style, {
            display: 'none', padding: '12px', backgroundColor: '#1e293b',
            flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto'
        });

        const title = document.createElement('div');
        title.textContent = 'Extension Settings';
        Object.assign(title.style, {
            fontSize: '12px', fontWeight: 'bold', color: '#38bdf8', marginBottom: '4px'
        });
        this.settingsView.appendChild(title);

        const hideBtn = document.createElement('button');
        hideBtn.textContent = '👁️‍🗨️ Hide on this tab';
        Object.assign(hideBtn.style, {
            width: '100%', padding: '8px 10px', backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px',
            fontSize: '12px', fontWeight: '600', cursor: 'pointer', textAlign: 'left',
            transition: 'background 0.2s'
        });
        hideBtn.addEventListener('mouseenter', () => hideBtn.style.backgroundColor = 'rgba(239, 68, 68, 0.25)');
        hideBtn.addEventListener('mouseleave', () => hideBtn.style.backgroundColor = 'rgba(239, 68, 68, 0.15)');

        hideBtn.addEventListener('click', () => {
            if (this.container) {
                this.container.remove();
            }
            if (this.onHide) {
                this.onHide();
            }
        });

        this.settingsView.appendChild(hideBtn);
    }

    _createFooter() {
        this.footer = document.createElement('div');
        this.footer.id = 'cc-widget-footer';
        Object.assign(this.footer.style, {
            padding: '8px 10px',
            backgroundColor: '#0f172a',
            borderTop: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#94a3b8'
        });

        const leftContainer = document.createElement('span');
        const text = document.createTextNode('Have you found an issue? ');
        const link = document.createElement('a');
        link.href = 'https://example.com/report';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Make an issue report';
        Object.assign(link.style, {
            color: '#38bdf8',
            textDecoration: 'none',
            fontWeight: 'bold'
        });
        link.addEventListener('mouseenter', () => link.style.textDecoration = 'underline');
        link.addEventListener('mouseleave', () => link.style.textDecoration = 'none');

        leftContainer.appendChild(text);
        leftContainer.appendChild(link);

        const gearBtn = document.createElement('button');
        gearBtn.textContent = '⚙️';
        gearBtn.title = 'Settings & Options';
        Object.assign(gearBtn.style, {
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '2px 4px',
            borderRadius: '4px',
            transition: 'background 0.2s'
        });
        gearBtn.addEventListener('mouseenter', () => gearBtn.style.backgroundColor = '#334155');
        gearBtn.addEventListener('mouseleave', () => gearBtn.style.backgroundColor = 'transparent');

        gearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isSettingsOpen = !this.isSettingsOpen;
            if (this.isSettingsOpen) {
                this.listContainer.style.display = 'none';
                this.searchInput.style.display = 'none';
                this.resultBox.style.display = 'none';
                this.settingsView.style.display = 'flex';
                gearBtn.textContent = '↩️';
                gearBtn.title = 'Back to Converter';
            } else {
                this.settingsView.style.display = 'none';
                this.searchInput.style.display = 'block';
                this.listContainer.style.display = 'block';
                gearBtn.textContent = '⚙️';
                gearBtn.title = 'Settings & Options';
            }
        });

        this.footer.appendChild(leftContainer);
        this.footer.appendChild(gearBtn);
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
        this.isSettingsOpen = false;
        this.settingsView.style.display = 'none';
        this.searchInput.style.display = 'block';
        this.listContainer.style.display = 'block';
        this.populateList();
        if (this.onCurrencyChange) this.onCurrencyChange(code);
    }

    _listenToStorageChanges() {
        chrome.storage.onChanged.addListener((changes, areaName) => {
            if (areaName === 'local' && changes.targetCurrency) {
                const newCurrency = changes.targetCurrency.newValue;
                if (newCurrency && newCurrency !== this.currentCurrency) {
                    this.currentCurrency = newCurrency;
                    this.button.textContent = newCurrency;
                    this.menu.style.display = 'none';
                    this.searchInput.value = '';
                    this.resultBox.style.display = 'none';
                    this.isSettingsOpen = false;
                    this.settingsView.style.display = 'none';
                    this.searchInput.style.display = 'block';
                    this.listContainer.style.display = 'block';
                    this.populateList();
                }
            }
        });
    }

    _bindEvents() {
        let isDragging = false;
        let startX, startY;
        let initialX, initialY;

        this.button.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Left click only
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;

            const rect = this.container.getBoundingClientRect();
            initialX = rect.left;
            initialY = rect.top;

            this.container.style.bottom = 'auto';
            this.container.style.right = 'auto';
            this.container.style.top = `${initialY}px`;
            this.container.style.left = `${initialX}px`;
            this.button.style.cursor = 'grabbing';

            const onMouseMove = (moveEvent) => {
                const dx = moveEvent.clientX - startX;
                const dy = moveEvent.clientY - startY;

                if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                    isDragging = true;
                    this.menu.style.display = 'none';
                    this.isSettingsOpen = false;
                }

                if (isDragging) {
                    const newLeft = initialX + dx;
                    const newTop = initialY + dy;

                    const maxX = window.innerWidth - this.container.offsetWidth;
                    const maxY = window.innerHeight - this.container.offsetHeight;

                    this.container.style.left = `${Math.max(0, Math.min(newLeft, maxX))}px`;
                    this.container.style.top = `${Math.max(0, Math.min(newTop, maxY))}px`;
                }
            };

            const onMouseUp = () => {
                this.button.style.cursor = 'grab';
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);

                if (isDragging) {
                    chrome.storage.local.set({
                        widgetPosition: {
                            top: this.container.style.top,
                            left: this.container.style.left
                        }
                    });
                }
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });

        this.button.addEventListener('click', (e) => {
            if (isDragging) {
                e.stopImmediatePropagation();
                return;
            }
            e.stopPropagation();
            const isVisible = this.menu.style.display === 'flex';
            this.menu.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                this.searchInput.focus();
            } else {
                this.isSettingsOpen = false;
                this.settingsView.style.display = 'none';
                this.searchInput.style.display = 'block';
                this.listContainer.style.display = 'block';
            }
        });

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

        document.addEventListener('click', (e) => {
            if (this.container && !this.container.contains(e.target)) {
                this.menu.style.display = 'none';
                this.isSettingsOpen = false;
                this.settingsView.style.display = 'none';
                this.searchInput.style.display = 'block';
                this.listContainer.style.display = 'block';
            }
        });
    }
}
