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

    const settings = {
        hasSeenOnboarding: true,
        targetCurrency: selectedCurrency
    };

    await chrome.storage.local.set(settings);

    document.querySelector('.container').innerHTML = `
        <div class="card">
            <h1>🎉 You're All Set!</h1>
            <p>Your default currency has been saved as <strong>${selectedCurrency}</strong>.</p>
            <p class="subtitle">This tab will close automatically. You can now use the extension on any webpage!</p>
        </div>
    `;
    setTimeout(() => window.close(), 3000);
});