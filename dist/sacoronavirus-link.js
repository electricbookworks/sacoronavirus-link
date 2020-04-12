"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*jslint browser */

/*globals window, sacoronavirusOptions */
// A script that adds a link to the official South African
// COVID-19 information website, as required by government regulation
function sacoronavirus() {
  'use strict'; // Initialise our options object.

  var options = {};
  var defaults = {
    backgroundColor: '#fff',
    textColor: '#222',
    size: 1,
    font: ''
  }; // If the host page includes options, use those.

  if ((typeof sacoronavirusOptions === "undefined" ? "undefined" : _typeof(sacoronavirusOptions)) === 'object') {
    options = sacoronavirusOptions;

    for (var k in defaults) {
      if (!options.hasOwnProperty(k)) {
        options[k] = defaults[k];
      }
    }
  } else {
    options = defaults;
  } // Split fonts if it's a comma-delimited list of fonts


  var fonts = options.font.split(',');

  for (var i = 0; i < fonts.length; i++) {
    fonts[i] = '"' + fonts[i].trim() + '"';
  }

  options.font = fonts.join(',') + ',-apple-system,BlinkMacSystemFont,"Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;';
  var textColor = options.textColor;
  var bgColor = options.backgroundColor;
  var size = options.size;
  var font = options.font;
  options.size = parseFloat(options.size) * 0.8 + "rem";

  if (window.CSS.supports('--t-v', 0)) {
    textColor = 'var(--text-color)';
    bgColor = 'var(--background-color)';
    size = 'var(--size)';
    font = 'var(--font)';
  }

  function prefix(i) {
    return "sacoronavirus-".concat(i);
  }

  function setup() {
    var modalKey = prefix("notification");
    if (isHidden(modalKey)) return;
    var modal = document.getElementById(modalKey);

    if (!modal) {
      modal = document.createElement('div');
      modal.id = modalKey;
      modal.classList.add(prefix("link"));
      modal.setAttribute('title', 'Up-to-date, official information on COVID-19');
      modal.innerHTML = "<span class=\"".concat(prefix('icon'), "\">i</span>\n    <a class=\"").concat(prefix('link-text'), "\" href=\"https://sacoronavirus.co.za\" target=\"_blank\">sacoronavirus.co.za</a>\n    <div class=\"").concat(prefix('close'), "\">\n    <svg viewBox=\"0 0 10 10\"><g fill=\"none\" stroke-linecap=\"round\">\n    <path d=\"M2 8L8 2M2 2L8 8\"/></g></svg>\n    </div>");
      document.body.appendChild(modal);
    }

    var closeDiv = modal.querySelector("." + prefix('close'));

    if (!closeDiv) {
      console.log("failed to find sacoronavirus-link close button");
    } else {
      modal.addEventListener('transitionend', function () {
        modal.remove();
      });
      closeDiv.addEventListener('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        modal.classList.add('closing');
        storeHidden(modalKey);
      });
    }

    var cssElement = document.createElement('style');
    var css = ".".concat(prefix('link'), " {\n--text-color: ").concat(options.textColor, ";\n--background-color: ").concat(options.backgroundColor, ";\n--font: ").concat(options.font, ";\n--size: ").concat(options.size, ";\ndisplay: flex;\nposition: fixed;\nbottom: 1.5em;\nright: 0;\nz-index: 9999;\nalign-items:center;\njustify-content: space-between;\nbackground-color: ").concat(bgColor, ";\nborder-radius: 2em 0 0 2em;\nbox-shadow: 0 0 10px rgba(0, 0, 0, 0.3);\ncolor: ").concat(textColor, ";\nfont-family: ").concat(font, ";\nfont-size: ").concat(size, ";\nheight: 2.2em;\nline-height: 1;\nmax-width: 80vw;\noverflow: hidden;\nmin-width: 14em;\nwidth: 14em;\ntransition: width 0.2s ease-in;\n"); // If options.top is set, move modal

    if (options.top) {
      css += "bottom: auto; top: ".concat(options.top, ";");
    }

    css += "}\n.".concat(prefix('link'), ".closing {\nwidth:0;\nmin-width: 0;\n}        \n.").concat(prefix('link-text'), " {\ncolor: inherit;\ndisplay: flex;\nmargin-right: auto;\n}\na.").concat(prefix('link-text'), " {\ncolor: ").concat(textColor, ";\ntext-decoration: none;\nborder-width: 0;\n}\na.").concat(prefix('link-text'), ":hover, a.").concat(prefix('link-text'), ":active {\ncolor: ").concat(textColor, ";\nborder-width: 0;\ntext-decoration: underline;\n}\n.").concat(prefix('close'), " {\nalign-items: flex-end;\ncursor: pointer;\ndisplay: flex;\nheight: 1em;\nwidth: 1.5em;\n}\n.").concat(prefix('close'), ">svg {\nwidth: 1em;\n}\n.").concat(prefix('close'), ">svg>g {\nstroke: ").concat(textColor, ";\n}\n.").concat(prefix('icon'), " {\nalign-items: center;\nborder: 1px solid ").concat(textColor, ";\nborder-radius: 20em;\ndisplay: flex;\njustify-content: center;\nmargin-left: 0.6em;\nmargin-right: 0.4em;\nmin-width: 1.3em;\nwidth: 1.3em;\nheight: 1.3em;\n}");
    cssElement.innerHTML = css;

    if (!document.head.firstElementChild) {
      document.head.appendChild(cssElement);
    } else {
      document.head.insertBefore(cssElement, document.head.firstElementChild);
    }
  } // Check for sessionStorage support


  function storageSupport() {
    if (window.localStorage && Storage !== 'undefined') {
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