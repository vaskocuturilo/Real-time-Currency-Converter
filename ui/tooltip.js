export class Tooltip {
    static ID = 'currency-converter-tooltip';

    static remove() {
        const existing = document.getElementById(Tooltip.ID);
        if (existing) existing.remove();
    }

    static show(range, text) {
        Tooltip.remove();

        const rect = range.getBoundingClientRect();
        const tooltip = document.createElement('div');
        tooltip.id = Tooltip.ID;
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
}
