chrome.action.onClicked.addListener(async (tab) => {
  const settings = await getSettings();
  if (settings.enabled && settings.replacements.length > 0) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: runReplacer,
      args: [settings.replacements]
    });
  } else {
    console.log("Text replacement is disabled or no replacements defined.");
  }
});

async function getSettings() {
  return new Promise(resolve => {
    chrome.storage.sync.get(["enabled", "replacements"], result => {
      resolve(result);
    });
  });
}

function runReplacer(replacements) {

  function showBanner(message) {
    const banner = document.createElement('div');
    banner.style.position = 'fixed';
    banner.style.top = '0';
    banner.style.left = '0';
    banner.style.width = '100%';
    banner.style.backgroundColor = '#4CAF50';
    banner.style.color = 'white';
    banner.style.textAlign = 'center';
    banner.style.padding = '10px';
    banner.style.fontSize = '16px';
    banner.style.zIndex = '9999';
    banner.innerText = message;

    document.body.appendChild(banner);

    setTimeout(() => {
      banner.style.display = 'none';
    }, 3000);
  }

  let replacedCount = 0;

  replacements.forEach(replacement => {
    const regex = new RegExp(replacement.from, 'g');

    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
      let src = img.getAttribute('src');
      if (src && src.includes(replacement.from)) {
        const updatedSrc = src.replace(regex, replacement.to);
        img.setAttribute('src', updatedSrc);

        const parentLink = img.closest('a');
        if (parentLink) {
          parentLink.setAttribute('href', updatedSrc);
        }

        replacedCount++;
      }
    });
  });

  if (replacedCount > 0) {
    showBanner(`Replacements applied: ${replacedCount} image URLs updated.`);
  }
}