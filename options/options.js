// Saves configuration to chrome.storage
const saveOptions = () => {
  const config = document.getElementById('config').value;
  chrome.storage.local.set({ 'config': config });
  // Reload the extension
  chrome.runtime.reload();
};

// Restores configuration from chrome.storage.
const restoreOptions = () => {
  chrome.storage.local.get('config').then((result) => {
    document.getElementById('config').value = result.config;
  })
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
