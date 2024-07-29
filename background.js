chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ currentAccount: null });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'popup.html' });
});