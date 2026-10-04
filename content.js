// content.js

import { parseCurrencyMatch } from './utils/parser.js';
import { currencyService } from './services/currencyService.js';
import { Tooltip } from './ui/tooltip.js';
import { Widget } from './ui/widget.js';

async function initApp() {
  const targetCurrency = await currencyService.getTargetCurrency();

  const widget = new Widget(targetCurrency, (newCurrency) => {
    Tooltip.remove();
  });
  widget.render();

  document.addEventListener('mousedown', (e) => {
    if (e.target.id !== Tooltip.ID && !e.target.closest('#cc-widget-container')) {
      Tooltip.remove();
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
      Tooltip.remove();
      return;
    }

    const parsed = parseCurrencyMatch(selectedText);
    if (!parsed) return;

    const sourceCurrency = currencyService.resolveSourceCurrency(parsed.symbol);
    if (!sourceCurrency) return;

    const activeTargetCurrency = await currencyService.getTargetCurrency();
    const range = selection.getRangeAt(0);

    const conversion = await currencyService.convert(parsed, activeTargetCurrency);

    if (conversion.status === 'SAME_CURRENCY') {
      Tooltip.show(range, `Already in ${activeTargetCurrency}`);
    } else if (conversion.status === 'SUCCESS') {
      Tooltip.show(range, `≈ ${conversion.result} ${activeTargetCurrency}`);
    } else {
      Tooltip.show(range, 'Offline (No cached rates)');
    }
  });
}

initApp();
