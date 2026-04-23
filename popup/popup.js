document.addEventListener('DOMContentLoaded', function() {
    if (typeof initYoutubeUtilsPopup === 'function') {
        initYoutubeUtilsPopup();
    } else {
        console.error('youtube-utils.js could not initialize the popup');
    }
});


function updatePopupState(enabled, currentState, toggle) {
    currentState.textContent = enabled ? 'ON' : 'OFF';
    toggle.value = enabled ? 'Disable Ad Blocker' : 'Enable Ad Blocker';
}