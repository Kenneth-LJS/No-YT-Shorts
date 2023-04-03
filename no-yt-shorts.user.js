// ==UserScript==
// @name         No YT Shorts
// @version      1.0
// @description  Redirects from YouTube shorts to the full-length video
// @author       You
// @match        *://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (window.top !== window.self) {
        // Running in iframe
        return;
    }

    const url = (() => {
        // Detect URL change
        const url = new EventTarget();

        let lastUrl = undefined;
        setInterval(() => {
            const curUrl = window.location.href;
            if (curUrl === lastUrl) {
                return;
            }
            lastUrl = curUrl;
            url.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        url: curUrl,
                    },
                })
            );
        }, 1000);

        return url;
    })();

    url.addEventListener('change', (e) => {
        const url = new URL(e.detail.url);
        const pathMatch = url.pathname.match(/\/shorts\/([^\/]+)/);
        if (!pathMatch) {
            return;
        }
        const videoId = pathMatch[1];
        const redirectUrl = `${url.protocol}//www.youtube.com/watch?v=${videoId}`;
        window.location.assign(redirectUrl);
    });
})();
