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

    function addNotification(callback) {

        // Create modal div
        var modal = document.createElement('div');
        modal.id = 'sacoronavirus-notification';
        modal.classList.add('sacoronavirus-link');
        document.body.appendChild(modal);

        // Position and style modal div
        modal.setAttribute('style',

                // Position
                'display: none;' +
                'position: fixed;' +
                'bottom: 1rem;' +
                'right: 0;' +
                'z-index: 1000;' +

                // Appearance
                'align-items: center;' +
                'background-color: ' + options.backgroundColor + ';' +
                'border-radius: 2em 0 0 2em;' +
                'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);' +
                'color: ' + options.textColor + ';' +
                'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;' +
                'font-size: 0.7rem;' +
                'height: 2rem;' +
                'max-width: 80vw;' +
                'padding-left: 0.4rem;' +
                'width: 10rem;' +
                '');

        // Add icon
        var icon = document.createElement('span');
        icon.innerHTML = 'i';
        icon.setAttribute('style',
                'align-items: center;' +
                'border: 1px solid ' + options.textColor + ';' +
                'border-radius: 1.3rem;' +
                'display: flex;' +
                'font-size: 0.9rem;' +
                'justify-content: center;' +
                'margin-right: 0.25em;' +
                'width: 1.3rem;' +
                'height: 1.3rem;' +
                '');
        modal.appendChild(icon);

        // Add text
        var link = document.createElement('a');
        link.href = 'https://sacoronavirus.co.za';
        link.innerText = 'sacoronavirus.co.za';
        link.setAttribute('target', '_blank');
        link.setAttribute('style',
                'color: inherit;' +
                'line-height: 1.9rem;' +
                'display: flex;' +
                'align-self: baseline;' +
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

        // Create a label for the checkbox
        var label = document.createElement('label');
        label.setAttribute('for', notification.id + '--close');
        label.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.58 7.57"> <g fill="none" stroke="' + options.textColor + '" stroke-linecap="round"> <path d="M.5.5l6.58 6.57M7.07.5L.5 7.07"/> </g> </svg>';
        label.setAttribute('style',
                'cursor: pointer;' +
                'display: flex;' +
                'height: 0.5rem;' +
                'width: 0.5rem;' +
                'position: absolute;' +
                'right: 0.5rem;' +
                '');
        closeButton.insertAdjacentElement('afterend', label);

        // Listen for clicks on checkbox
        closeButton.addEventListener('change', function () {
            var checkbox = event.target;
            if (checkbox.checked) {
                notification.style.display = 'none';
                storeHiddenStatus(notification);
            }
        });
    }

    // To let users close the modal, make all notifications hideable
    function showHideNotification() {

        var notifications = document.querySelectorAll('[id*="sacoronavirus-notification"]');
        notifications.forEach(function (notification) {
            if (hiddenStatus(notification) !== 'hidden') {
                notification.style.display = 'flex';
                notification.classList.remove('sacoronavirus-notification-hidden');
                notification.classList.add('sacoronavirus-notification-visible');
                enableHidingNotification(notification);
            }
        });
    }

    if (document.getElementById('sacoronavirus-notification')) {
        showHideNotification();
    } else {
        addNotification(showHideNotification);
    }
}

// Run our main function after the window loads.
window.onload = sacoronavirus;
