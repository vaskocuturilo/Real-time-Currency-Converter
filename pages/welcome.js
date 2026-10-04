document.getElementById('saveBtn').addEventListener('click', async () => {
    const settings = {
        hasSeenOnboarding: true
    };

    await chrome.storage.local.set(settings);

    document.querySelector('.container').innerHTML = "<h1>Welcome to the Real Time Currency Converter</h1><p>This tab will close automaticaly. Click the extension icon to start work.</p>";
    setTimeout(() => window.close(), 3000);
});