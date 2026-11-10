import { UNIQUE_CURRENCIES } from '../constants.js';
import { detectDefaultCurrency } from '../utils/locale.js';

document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById('currencySelect');

    UNIQUE_CURRENCIES.forEach(code => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = code;
        selectElement.appendChild(option);
    });

    const defaultCurrency = detectDefaultCurrency();
    if (defaultCurrency && UNIQUE_CURRENCIES.includes(defaultCurrency)) {
        selectElement.value = defaultCurrency;
    }
});

document.getElementById('saveBtn').addEventListener('click', async () => {
    const selectedCurrency = document.getElementById('currencySelect').value;

    await chrome.storage.local.set({
        hasSeenOnboarding: true,
        targetCurrency: selectedCurrency
    });

    chrome.tabs.create({ url: chrome.runtime.getURL('../pages/start.html') });

    const mainCard = document.getElementById('mainCard');
    mainCard.innerHTML = `
        <div class="success-state">
            <div class="success-icon">🎉</div>
            <h1>You're All Set!</h1>
            <p style="margin-top: 12px; color: #94a3b8;">
                Your default currency is set to <span class="currency-pill">${selectedCurrency}</span>.
            </p>
            <p style="margin-top: 24px; font-size: 13px; color: #64748b;">
                This onboarding tab will close automatically in a moment...
            </p>
        </div>
    `;

    setTimeout(() => window.close(), 5500);
});
