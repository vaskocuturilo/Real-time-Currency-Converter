document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.reason-option');
    const form = document.getElementById('feedbackForm');
    const detailsInput = document.getElementById('detailsInput');

    const placeholderMap = {
        better_alternative: "Which extension or site did you switch to, and what made it better?",
        parsing_issues: "Which website, currency symbol, or format (e.g. 1000 zł) didn't parse correctly?",
        confusing_ui: "What part of the widget or extension was difficult to use?",
        missing_currency: "Which currency code or feature would you like us to add?",
        temporary_use: "Anything we could have offered to keep you around?",
        other: "Let us know what went wrong or how we could improve..."
    };

    options.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');

        option.addEventListener('click', () => {
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            radio.checked = true;

            if (placeholderMap[radio.value]) {
                detailsInput.placeholder = placeholderMap[radio.value];
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedReason = form.querySelector('input[name="reason"]:checked')?.value;
        const details = detailsInput.value.trim();
        const email = document.getElementById('emailInput').value.trim();

        const payload = {
            reason: selectedReason,
            details: details,
            email: email,
            submittedAt: new Date().toISOString()
        };

        console.log('Uninstall feedback submitted:', payload);

        const feedbackCard = document.getElementById('feedbackCard');
        feedbackCard.innerHTML = `
            <div class="success-state">
                <div class="success-icon">✅</div>
                <h1>Thank You for Your Feedback!</h1>
                <p>Your response has been recorded. We appreciate your time and wish you the best!</p>
            </div>
        `;
    });
});
