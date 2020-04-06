/*jslint browser */
/*globals window, sacoronavirusOptions */

// A script that adds a link to the official South African
// COVID-19 information website, as required by government regulation

function sacoronavirus() {
    'use strict';

    // Initialise our options object.
    var options = {};

    // If the host page includes options, use those.
    if (typeof sacoronavirusOptions === 'object') {
        options = sacoronavirusOptions;
    }

    // Check for each option here, and add default if not found.
    if (!options.backgroundColor) {
        options.backgroundColor = '#fff';
    }
    if (!options.textColor) {
        options.textColor = '#222';
    }
    if (!options.size) {
        options.size = '1';
    }
    if (!options.font) {
        options.font = '';
    }

    function addNotification(callback) {

        // Create modal div
        var modal = document.createElement('div');
        modal.id = 'sacoronavirus-notification';
        modal.classList.add('sacoronavirus-link');
        modal.setAttribute('title', 'Up-to-date, official information on COVID-19');
        document.body.appendChild(modal);

        // Split fonts if it's a comma-delimited list of fonts
        var fonts = options.font.split(',');
        for (var i=0; i<fonts.length; i++) {
            fonts[i] = '"' + fonts[i].trim() + '"';
        }
        fonts = fonts.join(',')

        // Position and style modal div
        modal.setAttribute('style',

                // Position
                'display: none;' +
                'position: fixed;' +
                'bottom: 1.5em;' +
                'right: 0;' +
                'z-index: 99999;' +

                // Appearance
                'align-items: center;' +
                'background-color: ' + options.backgroundColor + ';' +
                'border-radius: 2em 0 0 2em;' +
                'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);' +
                'color: ' + options.textColor + ';' +
                'font-family: ' + fonts + ', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;' +
                'font-size: ' + options.size * 0.8 + 'rem;' +
                'height: 2.2em;' +
                'justify-content: space-between;' +
                'line-height: 1;' +
                'max-width: 80vw;' +
                'overflow: hidden;' +
                'min-width: 14em;' +
                'width: 14em;' +

                // Transition
                'transition-property: width;' +
                'transition-duration: 0.2s;' +
                '');

        // If options.top is set, move modal
        if (options.top) {
            modal.style.bottom = 'auto';
            modal.style.top = options.top;
        }

        // Add icon
        var icon = document.createElement('span');
        icon.innerHTML = 'i';
        icon.setAttribute('style',
                'align-items: center;' +
                'border: 1px solid ' + options.textColor + ';' +
                'border-radius: 1.3em;' +
                'display: flex;' +
                'justify-content: center;' +
                'margin-left: 0.6em;' +
                'margin-right: 0.4em;' +
                'min-width: 1.3em;' +
                'width: 1.3em;' +
                'height: 1.3em;' +
                '');
        modal.appendChild(icon);

        // Add text
        var link = document.createElement('a');
        link.href = 'https://sacoronavirus.co.za';
        link.innerText = 'sacoronavirus.co.za';
        link.setAttribute('target', '_blank');
        link.setAttribute('style',
                'color: inherit;' +
                'display: flex;' +
                'margin-right: auto;' + // clever flex-box trick
                '');
        modal.appendChild(link);

        callback();
    }

    // Check for sessionStorage support
    function storageSupport() {
        if (window.localStorage
                && Storage !== 'undefined') {
            return true;
        }
    }

    // Get a notification's hidden status
    function hiddenStatus(notification) {
        if (storageSupport() === true) {
            var status = sessionStorage.getItem(notification.id);
            return status;
        }
    }

    // Save a notification's hidden status
    function storeHiddenStatus(notification) {
        if (storageSupport() === true) {
            sessionStorage.setItem(notification.id, 'hidden');
        }
    }

    // Add a hide button and listen for hiding clicks
    function enableHidingNotification(notification) {

        // Hide if already hidden in this session
        if (hiddenStatus(notification) === 'hidden') {
            notification.style.display = 'none';
            notification.classList.add('sacoronavirus-notification-hidden');
            notification.classList.remove('sacoronavirus-notification-visible');
        }

        // Create a close button
        var closeButton = document.createElement('input');
        closeButton.type = 'checkbox';
        closeButton.name = notification.id + '--close';
        closeButton.id = notification.id + '--close';
        closeButton.classList.add('sacoronavirus-notification-close');
        closeButton.setAttribute('style',
                'display: none;');
        notification.appendChild(closeButton);

        // Create a label for the checkbox, the visible 'close button' x
        var label = document.createElement('label');
        label.setAttribute('for', notification.id + '--close');
        label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="' + 10 * options.size + '" width="' + 10 * options.size + '" viewBox="0 0 10 10"> <g fill="none" stroke="' + options.textColor + '" stroke-linecap="round"> <path d="M.5.5l6.58 6.57M7.07.5L.5 7.07"/> </g> </svg>';
        label.setAttribute('style',
                'align-items: flex-end;' +
                'cursor: pointer;' +
                'display: flex;' +
                'height: 1em;' +
                'width: 1.5em;' + // make clickable area wider
                '');
        closeButton.insertAdjacentElement('afterend', label);

        // Listen for clicks on checkbox
        closeButton.addEventListener('change', function () {
            var checkbox = event.target;
            if (checkbox.checked) {
                notification.classList.remove('sacoronavirus-notification-visible');
                notification.classList.add('sacoronavirus-notification-hidden');
                notification.style.minWidth = '0';
                notification.style.width = '0';
                storeHiddenStatus(notification);
            }
        });
    }

    // To let users close the modal, make notification hideable
    function showHideNotification() {

        var notification = document.getElementById('sacoronavirus-notification');
        if (hiddenStatus(notification) !== 'hidden') {
            notification.style.display = 'flex';
            notification.classList.remove('sacoronavirus-notification-hidden');
            notification.classList.add('sacoronavirus-notification-visible');
            enableHidingNotification(notification);
        }
    }

    if (document.getElementById('sacoronavirus-notification')) {
        showHideNotification();
    } else {
        addNotification(showHideNotification);
    }
}

if (document.readyState !== 'loading') {
    sacoronavirus();
} else {
    document.addEventListener('DOMContentLoaded', sacoronavirus);
}
