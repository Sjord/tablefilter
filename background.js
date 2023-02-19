chrome.runtime.onInstalled.addListener(function(details) {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                // When a page contains a <table> tag...
                new chrome.declarativeContent.PageStateMatcher({
                    css: ["table"]
                })
            ],
            // ... show the page action.
            actions: [new chrome.declarativeContent.ShowAction() ]
        }]);
    });
});

chrome.action.onClicked.addListener(function (tab) {
    chrome.scripting.executeScript({
        files: ["tablefilter.js"],
        target: {tabId: tab.id},
    });
});
