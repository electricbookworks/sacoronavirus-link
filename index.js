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
 
    // Split fonts if it's a comma-delimited list of fonts
    var fonts = options.font.split(',');
    for (var i=0; i<fonts.length; i++) {
        fonts[i] = '"' + fonts[i].trim() + '"';
    }
    options.font =  fonts.join(',') + ',-apple-system,BlinkMacSystemFont,"Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;';

    var textColor = options.textColor;
    var bgColor = options.backgroundColor;
    var size = options.size;
    var font = options.font;

    options.size = (parseFloat(options.size)*0.8) + "rem";
    if (window.CSS.supports('--fake-var',0)) {
        textColor = 'var(--text-color)';
        bgColor = 'var(--background-color)';
        size = 'var(--size)';
        font = 'var(--font)';
    }

    function addNotification(callback) {
        // Create modal div
        var modal = document.createElement('div');
        modal.id = 'sacoronavirus-notification';
        modal.classList.add('sacoronavirus-link');
        modal.setAttribute('title', 'Up-to-date, official information on COVID-19');

        // Add icon
        var icon = document.createElement('span');
        icon.classList.add('sacoronavirus-icon');
        icon.innerHTML = 'i';
        modal.appendChild(icon);

        // Add text
        var link = document.createElement('a');
        link.classList.add('sacoronavirus-link-text');
        link.href = 'https://sacoronavirus.co.za';
        link.innerText = 'sacoronavirus.co.za';
        link.setAttribute('target', '_blank');

        modal.appendChild(link);

        var css = document.createElement('style');
        var modalCss = 
        '.sacoronavirus-link { ' + 
            '--text-color: ' + options.textColor + ';' +
            '--background-color: ' + options.backgroundColor + ';' +
            '--font: ' + options.font + ';' +
            '--size: ' + options.size + ';' +

            // Position
            'display: none;' +
            'position: fixed;' +
            'bottom: 1.5em;' +
            'right: 0;' +
            'z-index: 99999;' +

            // Appearance
            'align-items: center;' +
            'background-color: ' + bgColor + ';' +
            'border-radius: 2em 0 0 2em;' +
            'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);' +
            'color: ' + textColor + ';' +
            'font-family: ' + font + ';' +
            'font-size: ' + size + ';' +
            'height: 2.2em;' +
            'justify-content: space-between;' +
            'line-height: 1;' +
            'max-width: 80vw;' +
            'overflow: hidden;' +
            'min-width: 14em;' +
            'width: 14em;' +

            // Transition
            'transition-property: width;' +
            'transition-duration: 0.2s;';
        // If options.top is set, move modal
        if (options.top) {
            modalCss += "bottom: auto;" +
                "top: " + options.top +";";
        }
        modalCss += '}';
        var linkCss = 
            '.sacoronavirus-link-text {' +
                'color: inherit;' +
                'display: flex;' +
                'margin-right: auto;' + // clever flex-box trick
            '}';
        var labelCss = '.sacoronavirus-close {' +
                'align-items: flex-end;' +
                'cursor: pointer;' +
                'display: flex;' +
                'height: 1em;' +
                'width: 1.5em;' + // make clickable area wider
                '}' +
                '.sacoronavirus-close>svg {'+
                '  width: 1em;' +
                '  height: 0.8em;' + // helps to centre cross in tab
                '}' +
                '.sacoronavirus-close>svg>g {' +
                '  stroke: ' + textColor + ';' +
                '}';
        var iconCss = 
            '.sacoronavirus-icon {' +
                'align-items: center;' +
                'border: 1px solid ' + textColor + ';' +
                'border-radius: 1.3em;' +
                'display: flex;' +
                'justify-content: center;' +
                'margin-left: 0.6em;' +
                'margin-right: 0.4em;' +
                'min-width: 1.3em;' +
                'width: 1.3em;' +
                'height: 1.3em;' +
            '}';
            
        css.innerText = modalCss + iconCss + linkCss + labelCss;

        if (!document.head.firstElementChild) {
            document.head.appendChild(css);
        } else {
            document.head.insertBefore(css, document.head.firstElementChild);
        }
        document.body.appendChild(modal);

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
        label.classList.add('sacoronavirus-close')
        label.setAttribute('for', notification.id + '--close');
        label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" ' +
            ' viewBox="0 0 10 10"><g fill="none" ' +
            ' stroke-linecap="round">' +
            '<path d="M.5.5l6.58 6.57M7.07.5L.5 7.07"/></g></svg>';
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
