chrome.runtime.onInstalled.addListener(async (details) => {
    chrome.runtime.setUninstallURL("https://example.com/feedback");

    if (details.reason === "install") {
        await chrome.storage.local.set({
            defaultTime: 25,
            flashThreshold: 10,
            blurIntensity: 35,
            focusActive: false
        });
        chrome.tabs.create({
            url: "pages/welcome.html"
        });
    }
});