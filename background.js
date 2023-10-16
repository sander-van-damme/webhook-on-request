// Retrieves the JSON configuration file.
let config = chrome.storage.local.get('config')
  .then(result => JSON.parse(result.config))
  .catch(error => new Object);

// Calls webhook when a domain (FQDN) listed in the configuration file is requested.
async function handleRequest(requestDetails) {
  const hostname = new URL(requestDetails.url).hostname;
  config = await config;
  for (const [webhook, domains] of Object.entries(config)) {
    domains.forEach(async domain => {
      if (hostname.endsWith(domain)) {
        await fetch(webhook);
      }
    })
  }
}

// Workaround to mitigate webRequest listeners not being called after service worker stops.
// Refer to https://bugs.chromium.org/p/chromium/issues/detail?id=1024211
chrome.webNavigation.onBeforeNavigate.addListener(() => {
  chrome.webRequest.onCompleted.addListener(handleRequest, { urls: ["*://*/*"] });
});
