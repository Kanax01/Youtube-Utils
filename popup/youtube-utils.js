function toggleAdBlock(currentState, toggle) {
    const enabled = currentState.textContent === 'OFF';
    chrome.storage.local.set({ adBlockEnabled: enabled }, function() {
        updatePopupState(enabled, currentState, toggle);
    });
}

function initYoutubeUtilsPopup() {
    const toggle = document.getElementById('toggle-util');
    const currentState = document.getElementById('currentState');

    if (!toggle || !currentState) {
        console.error('popup elements missing');
        return;
    }

    toggle.addEventListener('click', function() {
        toggleAdBlock(currentState, toggle);
    });

    chrome.storage.local.get({ adBlockEnabled: false }, function(data) {
        updatePopupState(data.adBlockEnabled, currentState, toggle);
    });
}

function setYoutubeUtilsMessage(message) {
    if (window.console && window.console.log) {
        console.log('[YouTube Utils]', message);
    }
}
