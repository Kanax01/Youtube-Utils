const adSelectors = [
    '#player-ads',
    '.ytp-ad-module',
    '.ytp-ad-player-overlay',
    '.ytp-ad-overlay-slot',
    '.ytp-ad-preview-overlay',
    '.video-ads',
    '.ad-interrupting',
    '.ytp-ad-text',
    '.ytp-ad-player-overlay-instream-info',
    '.ytp-ad-player-overlay-close-button'
];

const skipButtonSelectors = [
    '.ytp-ad-skip-button',
    '.ytp-ad-button',
    '.ytp-ad-overlay-close-button',
    '.ytp-ad-preview-overlay-close-button'
];

let adBlockEnabled = false;
let observer = null;

function removeAdElements() {
    adSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => el.remove());
    });
}

function clickSkipButtons() {
    skipButtonSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(button => button.click());
    });
}

function removeAdClasses() {
    const adClassTargets = [
        'ad-showing',
        'ad-interrupting',
        'ad-created',
        'ad-showing-video'
    ];

    adClassTargets.forEach(className => {
        document.querySelectorAll(`.${className}`).forEach(el => el.classList.remove(className));
    });
}

function blockYouTubeAds() {
    if (!adBlockEnabled) {
        return;
    }

    removeAdElements();
    clickSkipButtons();
    removeAdClasses();
}

function startObserver() {
    if (observer) {
        return;
    }

    observer = new MutationObserver(() => {
        blockYouTubeAds();
    });

    observer.observe(document.documentElement || document.body, {
        childList: true,
        subtree: true
    });
}

function stopObserver() {
    if (!observer) {
        return;
    }

    observer.disconnect();
    observer = null;
}

function enableAdBlocker() {
    adBlockEnabled = true;
    blockYouTubeAds();
    startObserver();
}

function disableAdBlocker() {
    adBlockEnabled = false;
    stopObserver();
}

function initAdBlocker() {
    chrome.storage.local.get({ adBlockEnabled: false }, function(data) {
        if (data.adBlockEnabled) {
            enableAdBlocker();
        }
    });

    chrome.storage.onChanged.addListener(function(changes, area) {
        if (area !== 'local' || !changes.adBlockEnabled) {
            return;
        }

        if (changes.adBlockEnabled.newValue) {
            enableAdBlocker();
        } else {
            disableAdBlocker();
        }
    });

    window.addEventListener('yt-navigate-finish', blockYouTubeAds);
    document.addEventListener('spfdone', blockYouTubeAds);
}

initAdBlocker();