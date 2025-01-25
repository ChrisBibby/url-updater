document.getElementById('settings-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const enabled = document.getElementById('enabled').checked;
  const fromText = document.getElementById('replace-from').value;
  const toText = document.getElementById('replace-to').value;

  const replacements = [
    { from: fromText, to: toText }
  ];

  chrome.storage.sync.set({ enabled, replacements }, function () {
    alert('Settings saved!');
  });
});

chrome.storage.sync.get(["enabled", "replacements"], function (result) {
  if (result.enabled !== undefined) {
    document.getElementById('enabled').checked = result.enabled;
  }
  if (result.replacements && result.replacements.length > 0) {
    document.getElementById('replace-from').value = result.replacements[0].from;
    document.getElementById('replace-to').value = result.replacements[0].to;
  }
});