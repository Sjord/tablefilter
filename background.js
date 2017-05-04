chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                // When a page contains a <table> tag...
                new chrome.declarativeContent.PageStateMatcher({
                    css: ["table"]
                })
            ],
            // ... show the page action.
            actions: [new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({"file": "tablefilter.js"});
});
