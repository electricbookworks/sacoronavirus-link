/*jslint browser */
/*globals window, sacoronavirusOptions */

// A script that adds a link to the official South African
// COVID-19 information website, as required by government regulation
function sacoronavirus() {
    'use strict';
    // Initialise our options object.
    var options = {};
    var defaults = {
        backgroundColor:'#fff',
        textColor:'#222',
        size:1,
        font:''
    };

    // If the host page includes options, use those.
    if (typeof sacoronavirusOptions === 'object') {
        options = sacoronavirusOptions;
        for(let k in defaults) {
            if (!options.hasOwnProperty(k)) {
                options[k] = defaults[k];
            }
        }
    } else {
        options = defaults;
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
    if (window.CSS.supports('--t-v',0)) {
        textColor = 'var(--text-color)';
        bgColor = 'var(--background-color)';
        size = 'var(--size)';
        font = 'var(--font)';
    }

    function prefix(i) {
        return `sacoronavirus-${i}`;
    }

    function setup() {
        var modalKey = prefix(`notification`);
        if (isHidden(modalKey)) return;

        var modal = document.getElementById(modalKey);
        if (!modal) {
            modal = document.createElement('div');
            modal.id = modalKey;
            modal.classList.add(prefix(`link`));
            modal.setAttribute('title', 'Up-to-date, official information on COVID-19');

            modal.innerHTML = `<span class="${prefix('icon')}">i</span>
    <a class="${prefix('link-text')}" href="https://sacoronavirus.co.za" target="_blank">sacoronavirus.co.za</a>
    <div class="${prefix('close')}">
    <svg viewBox="0 0 10 10"><g fill="none" stroke-linecap="round">
    <path d="M2 8L8 2M2 2L8 8"/></g></svg>
    </div>`;
            document.body.appendChild(modal);
        }
        var closeDiv = modal.querySelector(`.` + prefix('close'));
        if (!closeDiv) {
            console.log(`failed to find sacoronavirus-link close button`);
        } else {
            modal.addEventListener('transitionend', function() {
                modal.remove();
            });
            closeDiv.addEventListener('click', function(evt) {
                evt.preventDefault(); evt.stopPropagation();
                modal.classList.add('closing');
                storeHidden(modalKey);
            });
        }

        var cssElement = document.createElement('style');
        var css = 
`.${prefix('link')} {
--text-color: ${options.textColor};
--background-color: ${options.backgroundColor};
--font: ${options.font};
--size: ${options.size};
display: flex;
position: fixed;
bottom: 1.5em;
right: 0;
z-index: 9999;
align-items:center;
justify-content: space-between;
background-color: ${bgColor};
border-radius: 2em 0 0 2em;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
color: ${textColor};
font-family: ${font};
font-size: ${size};
height: 2.2em;
line-height: 1;
max-width: 80vw;
overflow: hidden;
min-width: 14em;
width: 14em;
transition: width 0.2s ease-in;
`;
        // If options.top is set, move modal
        if (options.top) {
            css += `bottom: auto; top: ${options.top};`;
        }
        css += `}
.${prefix('link')}.closing {
width:0;
min-width: 0;
}        
.${prefix('link-text')} {
color: inherit;
display: flex;
margin-right: auto;
}
a.${prefix('link-text')} {
color: ${textColor};
text-decoration: none;
border-width: 0;
}
a.${prefix('link-text')}:hover, a.${prefix('link-text')}:active {
color: ${textColor};
border-width: 0;
text-decoration: underline;
}
.${prefix('close')} {
align-items: flex-end;
cursor: pointer;
display: flex;
height: 1em;
width: 1.5em;
}
.${prefix('close')}>svg {
width: 1em;
}
.${prefix('close')}>svg>g {
stroke: ${textColor};
}
.${prefix('icon')} {
align-items: center;
border: 1px solid ${textColor};
border-radius: 20em;
display: flex;
justify-content: center;
margin-left: 0.6em;
margin-right: 0.4em;
min-width: 1.3em;
width: 1.3em;
height: 1.3em;
}`
       cssElement.innerHTML = css;

        if (!document.head.firstElementChild) {
            document.head.appendChild(cssElement);
        } else {
            document.head.insertBefore(cssElement, document.head.firstElementChild);
        }
    }

    // Check for sessionStorage support
    function storageSupport() {
        if (window.localStorage
                && Storage !== 'undefined') {
            return true;
        }
    }
    function isHidden(key) {
        if (!storageSupport()) return false;
        return sessionStorage.getItem(key);
    }
    function storeHidden(key) {
        if (storageSupport()) {
            sessionStorage.setItem(key, true);
        }
    }
    setup(); 
}

if (document.readyState !== 'loading') {
    sacoronavirus();
} else {
    document.addEventListener('DOMContentLoaded', sacoronavirus);
}

