// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globals = exports.elements = void 0;
var elements = {
  bodyElement: document.body,
  topNavbar: document.querySelector('.top-navbar'),
  navigationItems: document.querySelector('.nav-items'),
  darkModeCheckbox: document.getElementById('dark-mode-checkbox'),
  menuButton: document.querySelector('.hamburger-menu-button'),
  menuOptions: document.querySelector('.menu-options'),
  typeWriterElement: document.querySelector(".type-writer"),
  typeWriterCursorElement: document.querySelector(".type-writer-cursor"),
  ageContainer: document.querySelector('.age-container'),
  showMoreProjectsButton: document.querySelector('.show-more-projects'),
  hiddenProjects: document.querySelector('.hidden-projects'),
  breifcaseIcon: document.querySelector('.designation-time .fa-briefcase'),
  contactForm: document.querySelector('.contact-form'),
  contactFormSubmitButton: document.querySelector('.contact-form button'),
  locationDetails: document.querySelector('.location-details'),
  emailDetails: document.querySelector('.email-details'),
  callDetails: document.querySelector('.call-details')
};
exports.elements = elements;
var globals = {
  dateOfBirth: new Date('10 Sep 1997'),
  emailAddress: 'shubham.tiwari1097@gmail.com',
  phoneNumber: '+918827868494',
  locationURL: 'https://www.google.com/maps/place/Hyderabad'
};
exports.globals = globals;
},{}],"js/custom-typewriter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TypeWriter = function TypeWriter(_typeWriterEl, _words) {
  var _this = this;

  var _typeSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;

  var _deleteSpeed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 75;

  var _delay = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 3000;

  _classCallCheck(this, TypeWriter);

  _defineProperty(this, "type", function () {
    var typeWriterEl = _this.typeWriterEl,
        words = _this.words,
        typeSpeed = _this.typeSpeed,
        delay = _this.delay,
        currentWordIndex = _this.currentWordIndex;
    var currentWord = words[currentWordIndex];
    var timer = setInterval(function () {
      _this.text += currentWord[_this.currentLetterIndex];
      typeWriterEl.textContent = _this.text;

      if (_this.currentLetterIndex >= currentWord.length - 1) {
        clearInterval(timer);
        setTimeout(function () {
          _this.delete();
        }, delay);
      } else {
        _this.currentLetterIndex++;
      }
    }, typeSpeed);
  });

  _defineProperty(this, "delete", function () {
    var typeWriterEl = _this.typeWriterEl,
        deleteSpeed = _this.deleteSpeed;
    var timer = setInterval(function () {
      _this.text = _this.text.slice(0, _this.text.length - 1);
      typeWriterEl.textContent = _this.text;

      if (_this.currentLetterIndex <= 0) {
        if (_this.currentWordIndex >= _this.words.length - 1) {
          _this.currentWordIndex = 0;
        } else {
          _this.currentWordIndex++;
        }

        clearInterval(timer);

        _this.type();
      } else {
        _this.currentLetterIndex--;
      }
    }, deleteSpeed);
  });

  this.typeWriterEl = _typeWriterEl;
  this.words = _words;
  this.typeSpeed = _typeSpeed;
  this.deleteSpeed = _deleteSpeed;
  this.delay = _delay;
  this.currentWordIndex = 0;
  this.currentLetterIndex = 0;
  this.text = "";
  this.type();
};

var _default = TypeWriter;
exports.default = _default;
},{}],"js/index.js":[function(require,module,exports) {
"use strict";

var _utils = require("./utils");

var _customTypewriter = _interopRequireDefault(require("./custom-typewriter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Global State
var state = {
  showProjects: false
};
/**
 * Execute on load
 */

window.onload = function (event) {
  // Update age
  var dob = _utils.globals.dateOfBirth;
  var age = new Date(Date.now() - dob.getTime()).getFullYear() - 1970;
  _utils.elements.ageContainer.textContent = age; // get and set theme

  var theme = localStorage.getItem('theme');

  if (theme === 'dark') {
    _utils.elements.darkModeCheckbox.setAttribute('checked', true);

    changeTheme(true);
  } else {
    _utils.elements.darkModeCheckbox.removeAttribute('checked');

    changeTheme(false);
  }
};
/**
 * Executes when document loads 
 */


var onDOMLoad = function onDOMLoad(event) {
  var typeWriterEl = _utils.elements.typeWriterElement;
  var words = JSON.parse(typeWriterEl.dataset.words);
  var typeSpeed = Number(typeWriterEl.dataset.typeSpeed);
  var deleteSpeed = Number(typeWriterEl.dataset.deleteSpeed);
  var delay = Number(typeWriterEl.dataset.delay);
  new _customTypewriter.default(typeWriterEl, words, typeSpeed, deleteSpeed, delay);
};

document.addEventListener("DOMContentLoaded", onDOMLoad);
/**
 * Handle document click
 */

var handleDocumentClick = function handleDocumentClick(event) {
  // close menu dropdown
  if (!_utils.elements.navigationItems.contains(event.target)) {
    _utils.elements.menuOptions.classList.add('no-display');

    _utils.elements.menuButton.classList.remove('primary-text');
  }

  if (event.target.classList.value.includes('menu-option')) {
    _utils.elements.menuOptions.classList.add('no-display');

    _utils.elements.menuButton.classList.remove('primary-text');
  }
};

document.addEventListener('click', handleDocumentClick);
/**
 * Handle dark mode toggle button
 */

var handleThemeChange = function handleThemeChange(event) {
  var isDarkModeOn = event.target.checked;
  changeTheme(isDarkModeOn);
  localStorage.setItem('theme', isDarkModeOn ? 'dark' : 'light');
};

var changeTheme = function changeTheme(isDarkModeOn) {
  if (isDarkModeOn) {
    // body theme
    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.bodyElement.classList.add(cl);
    }); // top navbar theme

    ['bg-light', 'dark-text'].forEach(function (cl) {
      return _utils.elements.topNavbar.classList.remove(cl);
    });
    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.topNavbar.classList.add(cl);
    }); // menu options theme

    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.menuOptions.classList.remove(cl);
    });
    ['bg-light', 'dark-text'].forEach(function (cl) {
      return _utils.elements.menuOptions.classList.add(cl);
    }); // type-writer cursor theme

    _utils.elements.typeWriterCursorElement.classList.remove('blinking-light');

    _utils.elements.typeWriterCursorElement.classList.add('blinking-dark'); // breifcase-icon theme


    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.breifcaseIcon.classList.remove(cl);
    });
    ['bg-light', 'dark-text'].forEach(function (cl) {
      return _utils.elements.breifcaseIcon.classList.add(cl);
    });
  } else {
    // body theme
    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.bodyElement.classList.remove(cl);
    }); // top navbar theme

    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.topNavbar.classList.remove(cl);
    });
    ['bg-light', 'dark-text'].forEach(function (cl) {
      return _utils.elements.topNavbar.classList.add(cl);
    }); // menu options theme

    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.menuOptions.classList.add(cl);
    });
    ['bg-light', 'dark-text'].forEach(function (cl) {
      return _utils.elements.menuOptions.classList.remove(cl);
    }); // type-writer cursor theme

    _utils.elements.typeWriterCursorElement.classList.remove('blinking-dark');

    _utils.elements.typeWriterCursorElement.classList.add('blinking-light'); // breifcase-icon theme


    ['bg-light', 'dark-text'].forEach(function (cl) {
      return _utils.elements.breifcaseIcon.classList.remove(cl);
    });
    ['bg-dark', 'light-text'].forEach(function (cl) {
      return _utils.elements.breifcaseIcon.classList.add(cl);
    });
  }
};

_utils.elements.darkModeCheckbox.addEventListener('change', handleThemeChange);
/**
 * Handle hamburger menu toggle button
 */


var handleMenuToggle = function handleMenuToggle(event) {
  _utils.elements.menuOptions.classList.toggle('no-display');

  _utils.elements.menuButton.classList.toggle('primary-text');
};

_utils.elements.menuButton.addEventListener('click', handleMenuToggle);
/**
 * Show more projects
 */


var showMoreProjects = function showMoreProjects(event) {
  if (!state.showProjects) {
    _utils.elements.showMoreProjectsButton.innerHTML = "SHOW LESS &nbsp; <i class=\"fas fa-angle-up\"></i>";
  } else {
    _utils.elements.showMoreProjectsButton.innerHTML = "SHOW MORE &nbsp; <i class=\"fas fa-angle-down\"></i>";
  }

  _utils.elements.hiddenProjects.classList.toggle('no-display');

  _utils.elements.hiddenProjects.classList.toggle('animated');

  state.showProjects = !state.showProjects;
};

_utils.elements.showMoreProjectsButton.addEventListener('click', showMoreProjects);
/**
 * Handle Form Submission
 */


var handleFormSubmit = function handleFormSubmit(event) {
  return event.preventDefault();
};

_utils.elements.contactForm.addEventListener('submit', handleFormSubmit);
/**
 * Locate
 */


var locate = function locate() {
  var locationURL = _utils.globals.locationURL;
  window.open(locationURL, '_blank');
};

_utils.elements.locationDetails.addEventListener('click', locate);
/**
 * Email
 */


var sendEmail = function sendEmail() {
  var emailAddress = _utils.globals.emailAddress;
  window.open("mailto: ".concat(emailAddress));
};

_utils.elements.emailDetails.addEventListener('click', sendEmail);
/**
 * Call
 */


var makeACall = function makeACall() {
  var phoneNumber = _utils.globals.phoneNumber;
  window.open("tel: ".concat(phoneNumber), '_self');
};

_utils.elements.callDetails.addEventListener('click', makeACall);
},{"./utils":"js/utils.js","./custom-typewriter":"js/custom-typewriter.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60120" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map