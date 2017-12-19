/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block
 */
class Block {
    constructor(...args) {
        this._eventsListening = [];
        this._childBlocks = {};

        if (typeof args[0] === 'string') {
            let tagName = args[0];
            let classes = args[1] || [];
            let attrs = args[2] || {};

            this._element = document.createElement(tagName);
            classes.forEach(className => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
        } else if (args[0] instanceof Node) {
            this._element = args[0];
        }
        this.template = null;
    }

    setText(text) {
        this._element.textContent = text;
        return this;
    }

    appendChildBlock(blockName, block) {
        this._element.appendChild(block._element);
        this._childBlocks[blockName] = block;
        return this;
    }

    removeAllChildren() {
        for (let blockName in this._childBlocks) {
            this._element.removeChild(this._childBlocks[blockName]._element);
            delete this._childBlocks[blockName];
        }
    }

    on(event, callback) {
        console.log('on inside');
        if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            console.log('on works');

            this._eventsListening.push(event);
        }
    }

    hasAttribute(attribute) {
        return this._element.hasAttribute(attribute);
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    getAttribute(attribute) {
        return +this._element.getAttribute(attribute);
    }

    removeAttribute(attribute) {
        this._element.removeAttribute(attribute);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Block);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {class Utils {
  static resize(gl) {
    let displayWidth = window.screen.availWidth;
    let displayHeight = window.screen.availHeight;
    if (gl.canvas.width !== displayWidth || gl.canvas.height !== displayHeight) {
      gl.canvas.width = displayWidth;
      gl.canvas.height = displayHeight;
    }
    gl.viewport(0, 0, window.screen.availWidth, window.screen.availHeight);
  }

  static madeRectangle(x0, y0, width, height) {
    return [x0, y0, width, y0, x0, height, x0, height, width, y0, width, height];
  }

  static translationOnMap(i, j) {
    return [global.mapShiftX + j * (1.2 / 16), global.mapShiftY - i * (1.2 / 16) * 16 / 9];
  }

  static translationForUnits(unit) {
    return [global.mapShiftX - 0.08 + unit.xpos * (1.2 / 16), global.mapShiftY - unit.ypos * (1.2 / 16) * 16 / 9 + 1.2 / 12 * 16 / 9];
  }

  static transOnLowbar(i) {
    return [-0.95, 0.65 - i * 0.17];
  }

  static transOnLowbarHealth(i) {
    return [-0.95, 0.65 - i * 0.17 - 0.14];
  }

  static transActiveCircle(i) {
    return [-0.95 - 0.03, 0.65 - i * 0.17 - 0.05];
  }

  static transActionPoint(i) {
    return [-0.95 + 0.085, 0.65 - i * 0.17 - 0.032];
  }

  static transForHealthbar(unit) {
    return [global.mapShiftX + 0.003 + unit.xpos * (1.2 / 16), global.mapShiftY - unit.ypos * (1.2 / 16) * 16 / 9 + 1.2 / 17 * 16 / 9];
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__views_main__ = __webpack_require__(9);


class Router {

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);

        return this;
    }

    navigate() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
        };

        document.body.addEventListener('click', event => {

            if (event.target.tagName.toLowerCase() === 'li') {
                event.preventDefault();
                const element = event.target;
                const pathname = element.getAttribute('value');

                if (pathname !== null) {
                    console.log('secondwork');
                    this.go(pathname);
                }
            }
        });
        this.go(window.location.pathname);
    }

    go(path) {
        const view = this.routes.get(path);
        if (!view) {
            document.body.innerHTML = '<h class="notfound"> We didnot do such page )';
            return;
        }

        if (window.innerHeight > window.innerWidth && (typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1)) {
            alert('It is game only for laptop view');
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }

        view.creation();
        if (path === '/login') {

            Object(__WEBPACK_IMPORTED_MODULE_0__views_main__["signin"])(view);
        } else if (path === '/signup') {
            Object(__WEBPACK_IMPORTED_MODULE_0__views_main__["signup"])(view);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = Router;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Константы для проверки размеров полей
 */
const MAX_LOGIN_LENGTH = 30;
const MIN_LOGIN_LENGTH = 3;

const MAX_PASSWORD_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 4;

/**
 * Класс для валидации полей
 * методы возвращают true если валидация прошла или строку с текстом ошибки
 * @class Validate
 */
class Validate {

    static userError() {
        let form;
        const div = document.createElement('div');
        if (document.querySelector('form.login') === null && document.getElementsByTagName('p').length === 0) {
            form = document.querySelector('form.registration');
            div.className = "message-error";
            div.innerHTML = "<p> Sorry,user is already exist </p> ";
            form.appendChild(div);
        } else if (document.querySelector('form.registration') === null && document.getElementsByTagName('p').length === 0) {
            form = document.querySelector('form.login');
            div.className = "message-error";
            div.innerHTML = "<p> Sorry,user is not found </p> ";
            form.appendChild(div);
        }
    }
    static formError(formName) {
        let form = document.querySelector(formName);
        let div = document.createElement('div');
        div.className = "message-error";
        div.innerHTML = "<p> Hey,not valid data input :) </p> ";
        if (form.getElementsByTagName('p').length === 0) {
            form.appendChild(div);
        }
    }

    static validateLogin(login) {
        if (login.length < MIN_LOGIN_LENGTH || login.length > MAX_LOGIN_LENGTH || !isNaN(login)) {
            return;
        }
        return true;
    }

    static validateEmail(email) {
        if (!email.match(/@/)) {
            return;
        }
        return true;
    }

    static validatePassword(password) {
        if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            return;
        }
        return true;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Validate);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(27);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(45);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./forms.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./forms.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

class Mediator {
    constructor() {
        if (Mediator.__instance) {
            return Mediator.__instance;
        }

        this.channels = new Map();

        Mediator.__instance = this;
    }

    subscribe(name, func) {

        if (!this.channels.get(name)) {
            this.channels.set(name, []);
        }
        this.channels.get(name).push(func);
        return this;
    }

    publish(name, payload = null) {
        if (!this.channels.get(name)) {
            console.log('dont-work');
            return;
        }
        this.channels.get(name).forEach(func => {
            console.log('work');
            func(payload);
        });
    }

    unsubscribe(name, f) {
        if (!this.channels.get(name)) {
            return;
        }
        this.channels.get(name).splice(this.channels.get(name).indexOf(f), 1);
        return;
    }

}
/* harmony export (immutable) */ __webpack_exports__["default"] = Mediator;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signup", function() { return signup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "signin", function() { return signin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_autheficate_registrationAuth__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_autheficate_loginAuth__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__servises_user_service__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_mediator__ = __webpack_require__(8);









const userService = new __WEBPACK_IMPORTED_MODULE_4__servises_user_service__["a" /* default */]();

const application = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */](document.getElementById('application'));

const wrapper = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['wrapper']);

const images = "logo";
application.appendChildBlock("logo", new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('img', [images]));

const logo = document.querySelector('img.logo');
logo.setAttribute('src', '../images/logo2.png');

application.appendChildBlock('application', wrapper);
wrapper.appendChildBlock('menu', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['menu']));

function signin(login) {
    login.onSubmit(formdata => {
        const authValidation = Object(__WEBPACK_IMPORTED_MODULE_2__blocks_autheficate_loginAuth__["a" /* default */])(formdata[0], formdata[1]);
        console.log(formdata[0], formdata[1]);
        if (authValidation === false) {
            return;
        }
        userService.login(formdata[0], formdata[1]).then(() => new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/game')).then(() => {
            let logout = document.querySelector('a.back');
            logout.addEventListener('click', function () {
                document.querySelector('div.choose').remove();
                userService.logout();
                new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
            });
        }).then(() => new __WEBPACK_IMPORTED_MODULE_5__modules_mediator__["default"]().publish('VIEW_LOAD'));
    });
}

function signup(registration) {
    registration.onSubmit(formdata => {
        const authValidation = Object(__WEBPACK_IMPORTED_MODULE_1__blocks_autheficate_registrationAuth__["a" /* default */])(formdata[0], formdata[1], formdata[2], formdata[3]);
        if (authValidation === false) {
            return;
        }
        userService.signup(formdata[0], formdata[1], formdata[2]).then(() => new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/game')).then(() => {
            let logout = document.querySelector('a.back');
            logout.addEventListener('click', function () {
                console.log('back_work');
                document.querySelector('div.choose').remove();
                userService.logout();
                new __WEBPACK_IMPORTED_MODULE_3__modules_router__["default"]().go('/');
            });
        }).then(() => new __WEBPACK_IMPORTED_MODULE_5__modules_mediator__["default"]().publish('VIEW_LOAD'));
    });
}



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_forms_validation__ = __webpack_require__(4);


const baseUrl = `${window.location.protocol}//${window.location.host}`;

/**
 * Класс, предоставляющий методы для выполнения HTTP-запросов
 * @class Http
 */
class Http {
    /**
     * Выполняет GET-запрос с использованием fetch (по возможности) или XMLHttpRequest
     * @param {string} address - "ручка"
     * @return {Promise}
     */
    static Get(address) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            return this._FetchGet(url);
        }
        return this._GetXMLHttpRequest(url);
    }

    static Delete(address) {
        return fetch(address, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include'
        }).then(response => {
            if (response.status >= 400) {
                throw response;
            }
            return response.json();
            //  return response
        });
    }
    /**
     * Выполняет POST-запрос с использованием fetch (по возможности) или XMLHttpRequest
     * @param {string} address - "ручка"
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static Post(address, body) {
        const url = (Http.BaseUrl || baseUrl) + address;
        if (typeof window.fetch !== 'undefined') {
            console.log("function post work");
            console.log(this._FetchPost(body, url));
            return this._FetchPost(body, url);
        }
        return false;
    }

    /**
     * Выполняет GET-запрос по указанному адресу с использованием XMLHttpRequest
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _GetXMLHttpRequest(url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.withCredentials = true;

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {
                    // alert(xhr.responseText);
                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send();
        });
    }

    /**
     * Выполняет POST-запрос по указанному адресу с использованием XMLHttpRequest
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _PostXMLHttpRequest(body, url) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.withCredentials = true;
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (+xhr.status >= 400) {

                    reject(xhr);
                    return;
                }

                const response = JSON.parse(xhr.responseText);
                resolve(response);
            };

            xhr.send(JSON.stringify(body));
        });
    }

    /**
     * Выполняет GET-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @return {Promise}
     */
    static _FetchGet(url) {
        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        }).then(function (response) {
            let json = response.json();
            if (response.status >= 400) {
                return json.then(response => {
                    throw response;
                });
            }
            return json;
        });
    }

    /**
     * Выполняет POST-запрос по указанному адресу с использованием fetch
     * @param {string} url - адрес запроса
     * @param {*} body - тело запроса (объект)
     * @return {Promise}
     */
    static _FetchPost(body, url) {
        console.log(JSON.stringify(body));
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json'
            }
        }).then(function (response) {
            console.log("fetch post work\n");
            console.log(response.status);
            if (response.status === 200) {
                return;
            } else if (response.status >= 400) {
                __WEBPACK_IMPORTED_MODULE_0__blocks_forms_validation__["a" /* default */].userError();
                let json = response.json();
                return json.then(response => {
                    throw response;
                });
            }
        });
    }

}

Http.BaseUrl = null;

/* harmony default export */ __webpack_exports__["default"] = (Http);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InitiativeLine__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Unit__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pathfinding__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Background__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GameManager__ = __webpack_require__(38);






/*export default */
class DemoGameModule {
    constructor() {
        this.gameManager = new __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */]();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 5;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.players = [];
        this.enemies = [];
        this.initiativeLine = new __WEBPACK_IMPORTED_MODULE_0__InitiativeLine__["a" /* default */]();
        this.activeUnit = null;
        this.timer = 600000000;
        this.intervalId = 0;
        this.interval = 100;
    }

    gameStart() {
        this.gamePrepare();
        this.startGameLoop();
    }

    gamePreRender() {
        let numberSchene = 0;
        let back = new __WEBPACK_IMPORTED_MODULE_3__Background__["a" /* default */](numberSchene);
        back.render();
        this.gameManager.startGameRendering(this.gameStart.bind(this));
    }

    gamePrepare() {
        this.players = this.generatePlayers();
        this.enemies = this.generateEnemies();
        this.initiativeLine.PushEveryone(this.players, this.enemies);
        this.setPlayersPositions(this.players);
        this.setEnemiesPositions(this.enemies);
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('Everyone on positions: ');
        //отрисовка персонажей

        for (let i = 0; i < this.PARTYSIZE + this.ENEMIESSIZE; i++) {
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(this.enemies);
            this.gameManager.unitManager.addUnit(this.initiativeLine.queue[i]);
        }

        this.activeUnit = this.initiativeLine.CurrentUnit();
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(this.activeUnit.name + ' - let\'s start with you!');
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
    }

    gameLoop() {
        if (!this.isPartyDead() && !this.isEnemiesDead()) {
            this.timer -= this.interval;
            let sec = Math.ceil(this.timer / 1000);
            if (sec < 10) {
                sec = '0' + sec;
            }
            document.getElementById('time').innerHTML = 'Skip';
            //где-то здесь есть работа с АИ
            //отрисовка скилов для каждого персонажа, информация для dropdown и позиций
            if (global.actionDeque.length > 0) {
                __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('action begin', 'green');
                this.activeUnit.actionPoint--;
                let action = global.actionDeque.shift();
                if (action.isMovement() && !action.target.isOccupied()) {
                    this.makeMove(action);
                    // } else if (action.isPrepareAbility()) {
                    //     this.makePrepareAbility(action);
                } else if (action.isAbility()) {
                    __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('this is ability: ' + action.ability.name);
                    if (action.ability.damage[1] < 0) {
                        this.makeHill(action);
                    } else if (action.ability.damage[1] > 0) {
                        this.makeDamage(action);
                    }
                } else if (action.isSkip()) {
                    this.skipAction();
                }

                if (this.activeUnit.actionPoint === 1) {
                    this.sendPossibleMoves();
                }
            }

            if (this.activeUnit.actionPoint === 0 || Math.ceil(this.timer / 1000) === 0 || this.activeUnit.isDead()) {
                this.skipAction();
            }
        } else {
            if (this.isPartyDead()) {
                this.loseGame();
            }

            if (this.isEnemiesDead()) {
                this.winGame();
            }
        }
    }

    // makePrepareAbility(action) {
    //     if (action.ability.typeOfArea === "circle") {
    //     }
    // }

    makeMove(action) {
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(action.sender.getInhabitant().name + ' make move from [' + action.sender.xpos + ',' + action.sender.ypos + ']' + ' to [' + action.target.xpos + ',' + action.target.ypos + ']');
        let toMove = action.sender.getInhabitant();
        let pathfinding = new __WEBPACK_IMPORTED_MODULE_2__Pathfinding__["a" /* default */](action.sender, global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        let currentTile = action.target;
        while (allMoves.get(currentTile) !== null) {
            path.push(currentTile);
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('current tile - [' + currentTile.xpos + ']' + '[' + currentTile.ypos + ']');
            currentTile = allMoves.get(currentTile);
        }
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(path);
        this.gameManager.animtaionManager.movingTo(action.sender, path);
        action.sender.unoccupy();
        action.target.occupy(toMove);
        this.activeUnit.xpos = action.target.xpos;
        this.activeUnit.ypos = action.target.ypos;
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('check on unoccupy: ' + action.sender.isOccupied());
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('check on occupy: ' + action.target.isOccupied());
    }

    makeHill(action) {
        let healedAllies = [];
        //AOE HILL
        if (action.ability.typeOfArea === 'circle') {
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('THIS IS AOE HILL');
            for (let i = action.target.xpos - action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for (let j = action.target.ypos - action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    if (i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('WTF is ' + i + ' ' + j);
                        if (global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().type === action.sender.getInhabitant().type) {
                            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('this is AOE hill on someone: ' + i + ' ' + j);
                            healedAllies.push(global.tiledMap[i][j].getInhabitant());
                            action.sender.getInhabitant().useHealSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('health end: ' + global.tiledMap[i][j].getInhabitant().healthpoint);
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useHealSkill(action.target.getInhabitant(), action.ability);
            healedAllies.push(action.target.getInhabitant());
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('health end: ' + action.target.getInhabitant().healthpoint);
        }
        this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, healedAllies);
    }

    makeDamage(action) {
        let woundedEnemies = [];
        let deadEnemies = [];
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(action.sender.getInhabitant().name + ' make damage');
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('this is damage: ' + action.ability.name);
        // GameManager.log("health begin: " + action.target.getInhabitant().healthpoint);

        //AOE DAMAGE
        if (action.ability.typeOfArea === 'circle') {
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('THIS IS AOE DAMAGE');
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('target on ' + action.target.xpos + ' ' + action.target.ypos);
            for (let i = action.target.xpos - action.ability.area; i <= action.target.xpos + action.ability.area; i++) {
                for (let j = action.target.ypos - action.ability.area; j <= action.target.ypos + action.ability.area; j++) {
                    __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log("i: " + i + " j: " + j);
                    if (i >= 0 && j >= 0 && i < this.WIDTH && j < this.HEIGHT) {
                        if (global.tiledMap[i][j].isOccupied() && global.tiledMap[i][j].getInhabitant().deadMark === false) {
                            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(global.tiledMap[i][j].getInhabitant().name + " IS WOUNDED");
                            action.sender.getInhabitant().useDamageSkill(global.tiledMap[i][j].getInhabitant(), action.ability);
                            if (global.tiledMap[i][j].getInhabitant().isDead()) {
                                deadEnemies.push(global.tiledMap[i][j].getInhabitant());
                                global.tiledMap[i][j].getInhabitant().deadMark = true;
                            } else {
                                woundedEnemies.push(global.tiledMap[i][j].getInhabitant());
                            }
                            //GameManager.log("health end: " + action.target.getInhabitant().healthpoint);
                        }
                    }
                }
            }
        } else {
            action.sender.getInhabitant().useDamageSkill(action.target.getInhabitant(), action.ability);
            if (action.target.getInhabitant().isDead()) {
                deadEnemies.push(action.target.getInhabitant());
            } else {
                woundedEnemies.push(action.target.getInhabitant());
            }
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('health end: ' + action.target.getInhabitant().healthpoint);
        }

        if (deadEnemies.length > 0) {
            // GameManager.log(action.target.getInhabitant().name + " IS DEAD");

            this.gameManager.unitManager.unitAttackAndKill(action.ability.name, action.sender, action.target, deadEnemies, woundedEnemies);
            for (let i = 0; i < deadEnemies.length; i++) {
                this.initiativeLine.RemoveUnit(deadEnemies[i]);
            } //graph.deleteFromLowBar(action.target.getInhabitant().barIndex);
        } else {
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('SOMEONE GET WOUNDED: ', woundedEnemies);
            this.gameManager.unitManager.unitAttack(action.ability.name, action.sender, action.target, woundedEnemies);
        }
    }

    loseGame() {
        setTimeout(function () {
            this.stopGameLoop();
            document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
            document.getElementById('lose').removeAttribute('hidden');
        }.bind(this), 1500);
        //createoverlaylose
    }

    winGame() {
        setTimeout(function () {
            this.stopGameLoop();
            document.getElementsByClassName('container')[0].setAttribute('class', 'blur container');
            document.getElementById('win').removeAttribute('hidden');
        }.bind(this), 1500);
        //createoverlaywin
    }

    generatePlayers() {
        let newPlayers = [];
        let Roderick = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Roderick.makeWarrior('Roderick');
        let Gendalf = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Gendalf.makeMage('Gendalf');
        let Garreth = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Garreth.makeThief('Garreth');
        let Ethelstan = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
        Ethelstan.makePriest('Ethelstan');

        newPlayers.push(Roderick);
        newPlayers.push(Gendalf);
        newPlayers.push(Garreth);
        newPlayers.push(Ethelstan);

        return newPlayers;
    }

    generateEnemies() {
        let newEnemies = [];
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(i);
            let Skeleton = new __WEBPACK_IMPORTED_MODULE_1__Unit__["a" /* default */]();
            let texture;
            if (i % 2 === 0) {
                texture = 'skeleton1';
            } else {
                texture = 'skeleton2';
            }
            Skeleton.makeSkeleton(texture);
            newEnemies.push(Skeleton);
        }
        return newEnemies;
    }

    setPlayersPositions(players) {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3); //первые три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            players[i].xpos = randCol;
            players[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(players[i]);
        }
    }

    setEnemiesPositions(enemies) {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            let randRow;
            let randCol;
            while (true) {
                randRow = Math.floor(Math.random() * this.HEIGHT);
                randCol = Math.floor(Math.random() * 3) + this.WIDTH - 3; //последние три столбца поля
                if (global.tiledMap[randCol][randRow].isWall === this.NOTWALL && !global.tiledMap[randCol][randRow].isOccupied()) {
                    break;
                }
            }
            enemies[i].xpos = randCol;
            enemies[i].ypos = randRow;
            global.tiledMap[randCol][randRow].occupy(enemies[i]);
        }
    }

    isPartyDead() {
        for (let i = 0; i < this.PARTYSIZE; i++) {
            if (!this.players[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    isEnemiesDead() {
        for (let i = 0; i < this.ENEMIESSIZE; i++) {
            if (!this.enemies[i].isDead()) {
                return false;
            }
        }
        return true;
    }

    startGameLoop() {
        this.intervalId = setInterval(() => this.gameLoop(), this.interval);
    }

    stopGameLoop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    skipAction() {
        this.timer = 60000000;
        this.beginTurn();
    }

    sendPossibleMoves() {
        let pathfinding = new __WEBPACK_IMPORTED_MODULE_2__Pathfinding__["a" /* default */](global.tiledMap[this.activeUnit.xpos][this.activeUnit.ypos], global.tiledMap);
        let allMoves = pathfinding.possibleMoves();
        let path = [];
        for (let key of allMoves.keys()) {
            path.push(key);
        }
        path.shift();
        this.gameManager.unitManager.setCurrentSkill(0, path);
    }

    beginTurn() {
        this.activeUnit = this.initiativeLine.NextUnit();
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log('This turn: ');
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(this.initiativeLine.ShowEveryoneInLine());
        __WEBPACK_IMPORTED_MODULE_4__GameManager__["a" /* default */].log(this.activeUnit.name + ' = now your move! Cause initiative:' + this.activeUnit.initiative);
        this.activeUnit.actionPoint = 2;
        this.gameManager.unitManager.activeUnit(this.activeUnit);
        this.sendPossibleMoves();
        //изменяем LowerBar
        //изменяем activeEntity
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DemoGameModule;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Skill {
    constructor() {
        this.name = 'name';
        this.description = 'description';
        this.typeOfArea = 'point'; //point, circle
        this.area = 1;
        this.damage = [0, 0];
        this.cooldown = 0;
    }

    createSkill(name, description, typeOfArea, area, damage, cooldown) {
        this.name = name;
        this.description = description;
        this.typeOfArea = typeOfArea;
        this.area = area;
        this.damage = damage;
        this.cooldown = cooldown;
    }

    getDesciption() {
        if (this.damage[1] >= 0) {
            return this.name + '\nDam: ' + this.damage[0] + '-' + this.damage[1] + ' Type: ' + this.typeOfArea + ' with area: ' + this.area + '\n' + ' Cooldown: ' + this.cooldown + '\n' + this.description;
        }

        return name + '\nHeal: ' + Math.abs(this.damage[0]) + '-' + Math.abs(this.damage[1]) + ' Type: ' + this.typeOfArea + ' with area: ' + this.area + '\n' + ' Cooldown: ' + this.cooldown + '\n' + this.description;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Skill;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Shaders__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Program__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sprite__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__global_js__ = __webpack_require__(36);





class GraphicEngine {
  constructor(idCanvas, loop) {
    this.sprites = [];
    this.loop = loop;
    this.gl = document.getElementById(idCanvas).getContext("webgl");
    if (!this.gl) {
      alert('Error in initializate ' + idCanvas + ': Беда, брат! Твой браузер не поддерживает WebGl, но ты держись :D');
      return;
    }
    this.programForSprite = new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this.gl, __WEBPACK_IMPORTED_MODULE_0__Shaders__["c" /* vertexShader */], __WEBPACK_IMPORTED_MODULE_0__Shaders__["a" /* fragmentShader */]).create();
    this.programForColorObj = new __WEBPACK_IMPORTED_MODULE_1__Program__["a" /* default */](this.gl, __WEBPACK_IMPORTED_MODULE_0__Shaders__["d" /* vertexShader1 */], __WEBPACK_IMPORTED_MODULE_0__Shaders__["b" /* fragmentShader1 */]).create();
    // this.time = performance.now() + 1;
  }

  addSprite(translation, texture, vertexs, blend, texCoord) {
    let attributes = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_position', vertexs), new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_texcoord', texCoord ? texCoord : __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].madeRectangle(0, 0, 1, 1))];
    let uniforms = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_translation', translation)];
    let sprite = new __WEBPACK_IMPORTED_MODULE_3__Sprite__["b" /* Sprite */](this.gl, this.programForSprite, attributes, uniforms, blend, texture);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  addColorSprite(translation, vertexs, color, blend) {
    let attributes = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["a" /* Attribute */]('a_position', vertexs)];
    let uniforms = [new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_translation', translation), new __WEBPACK_IMPORTED_MODULE_3__Sprite__["c" /* Uniform */]('u_color', color)];
    let sprite = new __WEBPACK_IMPORTED_MODULE_3__Sprite__["b" /* Sprite */](this.gl, this.programForColorObj, attributes, uniforms, blend);
    this.sprites.push(sprite);
    return this.sprites.length - 1;
  }

  render(now) {
    // now *= 0.001;
    // let deltaTime = now - this.time;
    // this.time = now;
    // if (deltaTime != 0) {
    //   document.getElementById('fps').innerHTML = (1 / deltaTime).toFixed(0);
    //   document.getElementById('fps').style.color = 'white';
    // }

    __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].resize(this.gl);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    let lastProgram;
    this.sprites.forEach(sprite => {
      if (lastProgram === undefined) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      } else if (lastProgram !== sprite.program) {
        this.gl.useProgram(sprite.program);
        lastProgram = sprite.program;
      }
      sprite.render();
    });

    if (this.loop) {
      requestAnimationFrame(this.render.bind(this));
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GraphicEngine;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tile {
	constructor() {
		this.xpos = null;
		this.ypos = null;
		this.unitOnTile = null;
		this.isWall = null;
	}

	getInhabitant() {
		return this.unitOnTile;
	}

	occupy(unit) {
		this.unitOnTile = unit;
	}

	unoccupy() {
		this.unitOnTile = null;
	}

	isOccupied() {
		return this.unitOnTile !== null;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Tile;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Loader {
  constructor(paths, gl) {
    this.gl = gl;
    this.paths = paths;
    this.images = [];
  }

  loadImage(url, callback, i) {
    let image = new Image();
    image.src = url;
    image.onload = callback.bind(this, image, i);
    return image;
  }

  load(callback1, callback2) {
    let imagesToLoad = this.paths.length;
    let onImageLoad = function (image, i) {
      imagesToLoad--;
      let tex = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
      this.images[i] = tex;
      if (imagesToLoad === 0) {
        callback1(this.images);
        if (callback2) {
          callback2();
        }
      }
    }.bind(this);
    for (let i = 0; i < imagesToLoad; i++) {
      let image = this.loadImage(this.paths[i], onImageLoad, i);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Loader;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Skill_js__ = __webpack_require__(12);


class Action {
    constructor() {
        this.target = new __WEBPACK_IMPORTED_MODULE_0__Tile_js__["a" /* default */]();
        this.sender = new __WEBPACK_IMPORTED_MODULE_0__Tile_js__["a" /* default */]();
        this.ability = new __WEBPACK_IMPORTED_MODULE_1__Skill_js__["a" /* default */]();
        this.toPrepare = false;
    }

    isMovement() {
        // console.log(this.target + " - target and this.ability - " + this.ability);
        return this.target !== null && this.ability === null;
    }

    isSkip() {
        return this.target === null && this.ability === null;
    }

    isAbility() {
        return this.ability !== null;
    }

    isPrepareAbility() {
        return this.ability !== null && this.toPrepare === true;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Action;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Модуль, реализующий общее поведение для каждого блока
 * @module Block
 */
class Generator {
    constructor(...args) {
        this._eventsListening = [];
        this._childBlocks = {};

        if (typeof args[0] === 'string') {
            let tagName = args[0];
            let classes = args[1] || [];
            let attrs = args[2] || {};

            this._element = document.createElement(tagName);
            classes.forEach(className => {
                this._element.classList.add(className);
            });
            for (let name in attrs) {
                this._element.setAttribute(name, attrs[name]);
            }
        } else if (args[0] instanceof Node) {
            this._element = args[0];
        }
    }

    setText(text) {
        this._element.textContent = text;
        return this;
    }

    appendChildBlock(blockName, block) {
        this._element.appendChild(block._element);
        this._childBlocks[blockName] = block;
        return this;
    }

    removeAllChildren() {
        for (let blockName in this._childBlocks) {
            this._element.removeChild(this._childBlocks[blockName]._element);
            delete this._childBlocks[blockName];
        }
    }

    on(event, callback) {
        if (this._eventsListening.indexOf(event) === -1) {
            this._element.addEventListener(event, callback);
            this._eventsListening.push(event);
        }
    }

    hasAttribute(attribute) {
        return this._element.hasAttribute(attribute);
    }

    setAttribute(attribute, value) {
        this._element.setAttribute(attribute, value);
    }

    getAttribute(attribute) {
        return +this._element.getAttribute(attribute);
    }

    removeAttribute(attribute) {
        this._element.removeAttribute(attribute);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Generator);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forms_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__forms_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__forms_scss__);



class Input extends __WEBPACK_IMPORTED_MODULE_0__block_block__["a" /* default */] {
    constructor(type = 'text', classes = [], attrs = {}) {
        attrs['type'] = type;
        super('input', classes, attrs);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_mainpage_mainpage__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_login_login__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_signup_registration__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_info_info__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_singleplay_web__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_registration_module_charlist__ = __webpack_require__(52);








//import Game from './views/multiplayer/game';


function requireAll(r) {
    r.keys().forEach(r);
}
__webpack_require__(9);
__webpack_require__(56);

requireAll(__webpack_require__(61));
requireAll(__webpack_require__(63));
requireAll(__webpack_require__(64));
requireAll(__webpack_require__(65));

const login = new __WEBPACK_IMPORTED_MODULE_2__views_login_login__["a" /* default */]();
const mainMenu = new __WEBPACK_IMPORTED_MODULE_1__views_mainpage_mainpage__["a" /* default */]();
const signup = new __WEBPACK_IMPORTED_MODULE_3__views_signup_registration__["a" /* default */]();
const info = new __WEBPACK_IMPORTED_MODULE_4__views_info_info__["a" /* default */]();
//const game = new Game();
const single = new __WEBPACK_IMPORTED_MODULE_5__views_singleplay_web__["a" /* default */]();
const choose = new __WEBPACK_IMPORTED_MODULE_6__views_multiplayer_registration_module_charlist__["a" /* default */]();

/*
navigator.serviceWorker.register("/service_worker.js", { scope: "/" })
    .then((registration) => {
        console.log('ServiceWorker registration', registration);
    })
    .catch((error) => {
        throw new Error(`ServiceWorker error: ${error}`);
    });
*/
const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router__["default"]();
router.register('/', mainMenu).register('/login', login).register('/signup', signup).register('/info', info)
// .register('/multiplayer', game)
.register('/singleplay', single).register('/game', choose).navigate();

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_validation__ = __webpack_require__(4);


/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let RegistrationValidate = (login, email, password, password_confirm) => {

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateLogin(login)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration');
        return false;
    }
    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateEmail(email)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password_confirm)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.registration');
        return false;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (RegistrationValidate);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forms_validation__ = __webpack_require__(4);


/**
 * @function AuthValidate
 * @return {string || null} возвращает null если ошибок нет
 */
let LoginValidate = (login, password) => {
    console.log('valide works');
    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validateLogin(login)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.login');
        return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].validatePassword(password)) {
        __WEBPACK_IMPORTED_MODULE_0__forms_validation__["a" /* default */].formError('form.login');
        return false;
    }
};

/* harmony default export */ __webpack_exports__["a"] = (LoginValidate);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_validation__ = __webpack_require__(4);



/**
 * Сервис для работы с пользователями
 * @class UserService
 */
class UserService {
    constructor() {
        /**
         * Закомментить для обращения к серверу node.js
         */
        __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].BaseUrl = 'https://kvvartet2017.herokuapp.com';
    }

    /**
     * Регистрирует нового пользователя
     * @param {string} email
     * @param {string} password
     * @param {string} username
     * @return {Promise}
     */
    signup(username, email, password) {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signup', { username, email, password });
    }

    /**
     * Авторизация пользователя
     * @param {string} username
     * @param {string} password
     * @return {Promise}
     */
    login(username, password) {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/signin', { username, password });
    }

    /**
     * Проверяет, авторизован ли пользователь
     * @return {boolean}
     */
    isLoggedIn() {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Post('/currentUser');
    }

    /**
     * Выход пользователя
     * @return {Promise}
     */
    logout() {
        return __WEBPACK_IMPORTED_MODULE_0__modules_http__["default"].Delete('/signout', {});
    }

    /**
     * Загружает данные о текущем пользователе
     * @return {Promise}
     */
    /*getData() {
        return Http.Post('/session')
            .then(userdata => {
                return userdata;
            });
    }*/

}

/* harmony default export */ __webpack_exports__["a"] = (UserService);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_page_scss__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_page_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__main_page_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mainStyle__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__singleplay_DemoGameModule__ = __webpack_require__(11);


//import mk from '../../index.html'

const imageWall = "wall";
const wrape = document.querySelector('div.menu');
//import {mainPage} from '../main'

const buttons = [{
    name: 'First',
    text: 'New Game',
    value: '/login'

}, {
    name: 'Second',
    text: 'Singleplayer',
    value: '/singleplay'

}, {
    name: 'Third',
    text: 'Registration',
    value: '/signup'
}, {
    name: 'Four',
    text: 'Information',
    value: '/info'

}];
/* unused harmony export buttons */


const blockClass = 'button';

class MainPage extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('ul', ['name'], {});
    }

    creation() {
        if (document.querySelector('div.wrapper') === null) {
            let game = new __WEBPACK_IMPORTED_MODULE_3__singleplay_DemoGameModule__["a" /* default */]();
            game.gameManager.engine.loop = false;
            document.getElementById('application').remove();
            let wr = document.createElement('div');
            document.getElementById('application').appendChild(wr);
            wr.setAttribute('class', 'wrapper');
        }
        const wrape = document.querySelector('div.menu');
        if (document.querySelector('div.menu') === null) {
            let banner = document.createElement("div");
            document.querySelector('div.wrapper').appendChild(banner);
            banner.setAttribute('class', 'menu');
            document.querySelector('div.menu').appendChild(this._element);
        } else {
            if (document.querySelector('div.menu').childNodes[0] !== undefined) {
                document.querySelector('div.menu').removeChild(document.querySelector('div.menu').childNodes[0]);
                console.log('remove');
            }
            wrape.appendChild(this._element);
        }

        buttons.forEach(button => {
            let newButtons = new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', [blockClass + button.name]);
            this.appendChildBlock('a', newButtons);
            let but = document.querySelector('a.' + blockClass + button.name);
            but.innerHTML = `<li>${button.text}</li>`;
            but.querySelector('li').setAttribute('value', button.value);
        });
    }
}
/* unused harmony export MainPage */

/* harmony default export */ __webpack_exports__["a"] = (MainPage);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./main-page.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./main-page.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, "@viewport {\n  width: 640px;\n  height: 440px;\n  zoom: 2;\n  user-zoom: fixed; }\n\n.menu ul, form {\n  margin-right: auto;\n  margin-left: auto;\n  padding-top: 100px;\n  padding-left: 0;\n  width: 200px;\n  list-style-type: none; }\n\n.menu form {\n  width: 350px; }\n\n.menu li {\n  font-size: 1.5em;\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  border: 2px solid;\n  padding: 20px;\n  text-align: center;\n  margin-bottom: 15px;\n  cursor: pointer; }\n\n.menu li:hover {\n  color: white; }\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
const createStylesheet = styles => {
    return styles.reduce((stylesheet, current) => {

        const properties = Object.entries(current.styles).map(prop => prop[0] + ':' + prop[1] + ';');
        stylesheet += `${current.selector}{${properties.join('')}}\n`;
        return stylesheet;
    }, '');
};

const buttonLogin = {
    selector: '.buttonFirst',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'

    }
};

const changeTheme = {
    selector: '.buttonChange-theme',
    styles: {
        'border-radius': '120px',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'

    }
};
const loginForm = {
    selector: '.login-form',
    styles: {
        'border-radius': '45px',
        'text-shadow': '-1px 0 #BDD9BF, 0 1px #BDD9BF, 1px 0 #BDD9BF, 0 -1px #BDD9BF'
    }
};

const buttonSingle = {
    selector: '.buttonSecond',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'
    }
};

const buttonSignup = {
    selector: '.buttonThird',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'
    }
};

const buttonInfo = {
    selector: '.buttonFour',
    styles: {
        'background-color': '#402641',
        'text-shadow': '0 0 3px #FF0000, 0 0 5px #0000FF'
    }
};

const fieldsForms = {
    selector: '.field',
    styles: {
        'border-radius': '120px',
        'border-bottom-color': 'blue'
    }
};

const appendStylesheet = stylesheet => {
    let styleTag = document.getElementById('theme-styles');
    styleTag.innerHTML = stylesheet;
};

const registrationForm = {
    selector: '.registration-form',
    styles: {
        'border-radius': '120px',
        'border-bottom-color': 'blue'
    }
};

const text = {
    selector: '.textBlock',
    styles: {
        'border-radius': '40px',
        'border-bottom-color': 'blue'
    }
};

let hasTheme = false;
let styles = createStylesheet([buttonLogin, buttonInfo, buttonSignup, buttonSingle, changeTheme, loginForm, fieldsForms, registrationForm, text]);
function ChangeTheme() {
    let stylesheet = hasTheme ? '' : styles;
    appendStylesheet(stylesheet);
    hasTheme = !hasTheme;
}

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class InitiativeLine {
	constructor() {
		this.queue = [];
	}

	ShowEveryoneInLine() {
		let resultString = "";
		for (let i = 0; i < this.queue.length; i++) {
			resultString += i;
			resultString += ": ";
			resultString += this.queue[i].name;
			resultString += "[";
			resultString += this.queue[i].xpos;
			resultString += ",";
			resultString += this.queue[i].ypos;
			resultString += "]";
			resultString += "  ";
		}
		return resultString;
	}

	NextUnit() {
		let unit = this.queue.shift();
		this.queue.push(unit);
		this.SynchronizeLineId();
		return this.CurrentUnit();
	}

	SynchronizeLineId() {
		for (let i = 0; i < this.queue.length; i++) {
			this.queue[i].lineId = i;
		}
	}

	CurrentUnit() {
		return this.queue[0];
	}

	RemoveUnit(unit) {
		this.queue.splice(unit.lineId, 1);
	}

	PushEveryone(allies, enemies) {

		for (let i = 0; i < allies.length; i++) {
			this.queue.push(allies[i]);
		}

		for (let i = 0; i < enemies.length; i++) {
			this.queue.push(enemies[i]);
		}
		this.queue.sort(InitiativeLine.compareUnitsByInitiative);
		this.SynchronizeLineId();
	}

	static compareUnitsByInitiative(unit1, unit2) {
		if (unit1.initiative < unit2.initiative) {
			return 1;
		}
		if (unit1.initiative > unit2.initiative) {
			return -1;
		}
	}

}
/* harmony export (immutable) */ __webpack_exports__["a"] = InitiativeLine;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Skill__ = __webpack_require__(12);

class Unit {
    constructor() {
        this.name = 'noname';
        this.class = 'noname';
        this.xpos = 0;
        this.ypos = 0;
        this.healthpoint = [0, 0];
        this.armor = 0;
        this.damage = [0, 0];
        this.initiative = 0;
        this.criticalRate = 0.05;
        this.dodgeRate = 0.05;
        this.blockRate = 0.05;
        this.speed = 4;
        this.skills = [new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]()];
        this.type = 'enemy'; //enemy player
        this.actionPoint = 2;
        this.lineId = 0;
        this.shooter = false;
        this.skills[0].createSkill('Move', 'Move to this position', 'point', 1, [0, 0], 0);
        this.deadMark = false;
    }

    makeWarrior(name) {
        this.name = name;
        this.class = 'warrior';
        this.healthpoint = [150, 150];
        this.armor = 20;
        this.damage = [35, 40];
        this.initiative = 10;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage in close combat', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Shield Strike', 'Smash enemy with a shield, knocking him down for 1 turn', 'point', 1, this.damage, 2);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Heavy blow', 'Attack your enemy with double damage', 'point', 1, [this.damage[0] * 2, this.damage[1] * 2], 3);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
    }

    makeMage(name) {
        this.name = name;
        this.class = 'mage';
        this.healthpoint = [100, 100];
        this.armor = 10;
        this.damage = [30, 40];
        this.initiative = 11;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage on distance', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Thunderbolt', 'An electrical jolt deals air damage to target character, knocking him down for 1 turn', 'point', 1, this.damage, 2);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Fire ball', 'Hurl a fiery sphere that will explode', 'circle', 2, this.damage, 2);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
        this.shooter = true;
    }

    makeThief(name) {
        this.name = name;
        this.class = 'thief';
        this.healthpoint = [125, 125];
        this.armor = 15;
        this.damage = [40, 60];
        this.initiative = 12;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage in close combat', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Sawtooth knife', 'Attack enemy with guaranteed critical hit', 'point', 1, [this.damage[0] * 2, this.damage[1] * 2], 3);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Blade flurry', 'Attack enemies around and deals 100% damage', 'circle', 1, this.damage, 2);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
    }

    makePriest(name) {
        this.name = name;
        this.class = 'priest';
        this.healthpoint = [100, 100];
        this.armor = 10;
        this.damage = [-20, -30];
        this.initiative = 11;
        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Heal', 'Heal with healing power on distance', 'point', 1, this.damage, 0);
        let firstSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        firstSkill.createSkill('Massive Heal', 'Heal all your units in area with 100% healing power', 'circle', 1, this.damage, 3);
        let secondSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        secondSkill.createSkill('Holly wrath', 'Deal 200% healing power to cursed creatures', 'point', 1, [this.damage[0] * -2, this.damage[1] * -2], 2);
        this.skills.push(attackSkill, firstSkill, secondSkill);
        this.type = 'player';
        this.shooter = true;
    }

    makeSkeleton(textureName) {
        this.name = 'Skeleton';
        this.class = textureName;
        this.healthpoint = [150, 150];
        this.armor = 5;
        this.damage = [35, 40];
        this.initiative = 10;

        let attackSkill = new __WEBPACK_IMPORTED_MODULE_0__Skill__["a" /* default */]();
        attackSkill.createSkill('Attack', 'Deals damage', 'point', 1, this.damage, 0);
        this.skills.push(attackSkill);
    }

    isDead() {
        if (this.healthpoint[0] <= 0) {
            return true;
        }
    }

    useDamageSkill(unit, skill) {

        let currentSkillDamage = Math.floor(Math.random() * (skill.damage[1] - skill.damage[0])) + skill.damage[0];

        if (Math.random() < this.criticalRate) {
            currentSkillDamage *= 2;
        }

        if (Math.random() < unit.dodgeRate) {
            currentSkillDamage = 0;
        } else if (Math.random() < unit.blockRate) {
            currentSkillDamage *= 0.3;
        }
        console.log('Current Damage: ' + Math.floor(currentSkillDamage * ((100 - unit.armor) / 100)));

        unit.healthpoint[0] -= Math.floor(currentSkillDamage * ((100 - unit.armor) / 100));
    }

    useHealSkill(unit, skill) {
        unit.healthpoint[0] += Math.floor(Math.abs(Math.random() * (skill.damage[1] - skill.damage[0])) + Math.abs(skill.damage[0]));
        if (unit.healthpoint[0] > unit.healthpoint[1]) {
            unit.healthpoint[0] = unit.healthpoint[1];
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Unit;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Pathfinding {
    constructor(start, tiledMap) {
        this.distance = new Map();
        this.WIDTH = 16;
        this.HEIGHT = 12;
        this.PARTYSIZE = 4;
        this.ENEMIESSIZE = 2;
        this.kek = 3;
        this.NOTWALL = 0;
        this.WALL = 1;
        this.tiledMap = tiledMap;
        this.path = new Map();
        this.sender = start.getInhabitant();
        this.frontier = [];
        this.frontier.push(start);
        this.path.set(start, null);
        this.distance.set(start, 0);
    }

    possibleMoves() {
        while (this.frontier.length > 0) {
            let current = this.frontier.shift();
            if (this.distance.get(current) === this.sender.speed) {
                break;
            }
            let currentNeighbors = this.tileNeighbors(current);
            for (let i = 0; i < currentNeighbors.length; i++) {
                if (!this.distance.has(currentNeighbors[i])) {
                    this.frontier.push(currentNeighbors[i]);
                    this.path.set(currentNeighbors[i], current);
                    this.distance.set(currentNeighbors[i], 1 + this.distance.get(current));
                }
            }
        }
        return this.path;
    }

    tileNeighbors(current) {
        let neighbors = [];
        if (current.xpos + 1 < this.WIDTH && this.tiledMap[current.xpos + 1][current.ypos].isWall === this.NOTWALL && !this.tiledMap[current.xpos + 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos + 1][current.ypos]);
        }

        if (current.ypos + 1 < this.HEIGHT && this.tiledMap[current.xpos][current.ypos + 1].isWall === this.NOTWALL && !this.tiledMap[current.xpos][current.ypos + 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos + 1]);
        }

        if (current.xpos - 1 >= 0 && this.tiledMap[current.xpos - 1][current.ypos].isWall === this.NOTWALL && !this.tiledMap[current.xpos - 1][current.ypos].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos - 1][current.ypos]);
        }

        if (current.ypos - 1 >= 0 && this.tiledMap[current.xpos][current.ypos - 1].isWall === this.NOTWALL && !this.tiledMap[current.xpos][current.ypos - 1].isOccupied()) {
            neighbors.push(this.tiledMap[current.xpos][current.ypos - 1]);
        }

        return neighbors;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pathfinding;


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loader__ = __webpack_require__(15);




class Background {
    constructor(numberSchene) {
        this.ratio = 16 / 9;
        this.engine = new __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__["a" /* default */]('background', false);
        this.schene = numberSchene;
    }

    static randomInteger() {
        var rand = Math.random() * 4;
        rand = Math.floor(rand);
        return rand;
    }

    InitMapAndSprites() {
        this.engine.addSprite([0, 0], this.textures[4], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(-1, 1, 1, -1));
        let coord = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 - 0.015, -(1.2 / 16 - 0.015) * this.ratio);
        global.tiledMap.forEach(function (item, j) {
            item.forEach(function (value, i) {
                if (value.isWall) {
                    let trans = __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(i, j);
                    this.engine.addSprite([trans[0] + 0.0075, trans[1] - 0.0075], this.textures[Background.randomInteger()], coord, true);
                }
            }.bind(this));
        }.bind(this));
        for (let i = global.mapShiftX; i <= 1.2 + global.mapShiftX; i += 1.2 / 16) {
            this.engine.addColorSprite([i, 0.65], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.001, -1.6), [1, 1, 1, 1]);
        }
        for (let i = -0.95; i <= 0.65; i += 1.2 / 16 * global.ratio) {
            this.engine.addColorSprite([global.mapShiftX, i], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2, -0.0018), [1, 1, 1, 1]);
        }
        this.engine.addSprite([-0.6, 0.995], this.textures[5], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.1875, -0.13), true);
        this.engine.addSprite([0.68, 0.97], this.textures[6], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.07, -0.07 * global.ratio));
        this.engine.addSprite([0.78, 0.97], this.textures[7], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.07, -0.07 * global.ratio));
        this.engine.addSprite([0.88, 0.97], this.textures[8], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.07, -0.07 * global.ratio));
    }

    render() {
        let loader;
        switch (this.schene) {
            case 0:
                loader = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/textures/wall0.png', '/views/singleplay/textures/wall1.png', '/views/singleplay/textures/wall2.png', '/views/singleplay/textures/wall3.png', '/views/singleplay/textures/back1.png', '/views/singleplay/textures/timer.png', '/views/singleplay/icons/talk.png', '/views/singleplay/icons/bag.png', '/views/singleplay/icons/settings.png'], this.engine.gl);
                break;
        }
        loader.load(this.onLoad.bind(this));
    }
    onLoad(textures) {
        this.textures = textures;
        this.InitMapAndSprites();
        this.engine.render();
        window.addEventListener('resize', function () {
            this.engine.render(performance.now());
        }.bind(this));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return vertexShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fragmentShader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return vertexShader1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return fragmentShader1; });
let vertexShader = `attribute vec2 a_position;
attribute vec2 a_texcoord;
uniform vec2 u_translation;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_texcoord = a_texcoord;
}`;
let fragmentShader = `precision mediump float;
uniform sampler2D u_texture;
varying vec2 v_texcoord;
void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
}`;
let vertexShader1 = `attribute vec2 a_position;
uniform vec2 u_translation;
uniform vec4 u_color;
varying vec4 v_color;
void main() {
  gl_Position = vec4(a_position + u_translation, 0, 1);
  v_color = u_color;
}`;
let fragmentShader1 = `precision mediump float;
varying vec4 v_color;
void main() { 
  gl_FragColor = v_color;
}`;



/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Program {
  constructor(gl, vertexShader, fragmentShader) {
    this.gl = gl;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
  }

  createShader(type, source) {
    let shader = this.gl.createShader(type); // создание шейдера
    this.gl.shaderSource(shader, source); // устанавливаем шейдеру его программный код
    this.gl.compileShader(shader); // компилируем шейдер
    let success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success) {
      // если компиляция прошла успешно - возвращаем шейдер
      return shader;
    }
    console.log(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  create() {
    let program = this.gl.createProgram();
    this.gl.attachShader(program, this.createShader(this.gl.VERTEX_SHADER, this.vertexShader));
    this.gl.attachShader(program, this.createShader(this.gl.FRAGMENT_SHADER, this.fragmentShader));
    this.gl.linkProgram(program);
    let success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      return program;
    }
    console.log(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Program;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Sprite; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Attribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Uniform; });
class Sprite {
  constructor(gl, program, attributes, uniforms, blend, texture) {
    this.gl = gl;
    this.program = program;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.texture = texture;
    this.blend = blend;
    this.setAttributes();
    this.setUniforms();
    this.needRender = true;
  }

  getLocUnif(uniform) {
    return this.gl.getUniformLocation(this.program, uniform.name);
  }

  setUniforms() {
    this.uniforms.forEach(function (item) {
      item.location = this.getLocUnif(item);
    }.bind(this));
  }

  getLocAttr(attr) {
    return this.gl.getAttribLocation(this.program, attr.name);
  }

  setAttributes(valueAttributes) {
    this.attributes.forEach(function (item) {
      item.location = this.getLocAttr(item);
      item.buffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(item.data), this.gl.STATIC_DRAW);
    }.bind(this));
  }

  setVertexs(vertexs) {
    this.attributes[0].data = vertexs;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[0].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[0].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTexCoord(coord) {
    this.attributes[1].data = coord;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.attributes[1].buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.attributes[1].data), this.gl.STATIC_DRAW);
    this.needRender = true;
  }

  setTrans(translation) {
    this.uniforms[0].value = translation;
    this.needRender = true;
  }

  getTrans() {
    return this.uniforms[0].value;
  }

  setTexture(texture) {
    this.texture = texture;
    this.needRender = true;
  }

  render() {
    this.attributes.forEach(function (item) {
      this.gl.enableVertexAttribArray(item.location);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
      this.gl.vertexAttribPointer(item.location, 2, this.gl.FLOAT, false, 0, 0);
    }.bind(this));

    this.uniforms.forEach(function (item) {
      if (item.value.length == 2) {
        this.gl.uniform2fv(item.location, item.value);
      } else if (item.value.length == 4) {
        this.gl.uniform4fv(item.location, item.value);
      }
    }.bind(this));

    if (this.texture) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    if (this.blend) {
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    } else {
      this.gl.disable(this.gl.BLEND);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.attributes[0].data.length / 2);
    this.needRender = false;
  }
}

class Attribute {
  constructor(name, data) {
    this.name = name;
    this.data = data;
  }
}

class Uniform {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DungeonMapMaker__ = __webpack_require__(37);


global.actionDeque = [];
global.tiledMap = new __WEBPACK_IMPORTED_MODULE_0__DungeonMapMaker__["a" /* default */]().dungeonMapMaker(Math.random() * 10 + 25);
global.mapShiftX = -0.7;
global.mapShiftY = 0.65;
global.ratio = 16 / 9;
global.countLines = 0;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WIDTH */
/* unused harmony export HEIGHT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tile__ = __webpack_require__(14);



let WIDTH = 16;
let HEIGHT = 12;
//console.log(WIDTH);
class DungeonMapMaker {
    constructor() {
        this.UP = 0;
        this.LEFT = 1;
        this.DOWN = 2;
        this.RIGHT = 3;
        this.counter = WIDTH * HEIGHT;
    }

    isDirectionValid(curX, curY, direction) {

        switch (direction) {
            case this.UP:
                return curY - 1 >= 0;
            case this.DOWN:
                return curY + 1 < HEIGHT;
            case this.LEFT:
                return curX - 1 >= 0;
            case this.RIGHT:
                return curX + 1 < WIDTH;
            default:
                break;
        }
    }

    dungeonMapMaker(tileWalls) {
        let map = [];
        for (let i = 0; i < WIDTH; i++) {
            map[i] = [];
            for (let j = 0; j < HEIGHT; j++) {
                let newTile = new __WEBPACK_IMPORTED_MODULE_0__Tile__["a" /* default */]();
                newTile.xpos = i;
                newTile.ypos = j;
                newTile.isWall = 1;
                map[i][j] = newTile;
            }
        }

        let randY = Math.floor(Math.random() * HEIGHT);
        let randX = Math.floor(Math.random() * WIDTH);
        let pointer = [randX, randY];
        console.log(HEIGHT + ' ' + WIDTH);
        console.log(randY + ' ' + randX);
        map[randX][randY].isWall = 0;
        this.counter--;
        let direction;
        while (this.counter > tileWalls) {
            do {
                direction = Math.floor(Math.random() * 4);
            } while (!this.isDirectionValid(pointer[0], pointer[1], direction));

            switch (direction) {
                case this.UP:
                    pointer[1] = pointer[1] - 1;
                    break;
                case this.DOWN:
                    pointer[1] = pointer[1] + 1;
                    break;
                case this.LEFT:
                    pointer[0] = pointer[0] - 1;
                    break;
                case this.RIGHT:
                    pointer[0] = pointer[0] + 1;
                    break;
            }

            if (map[pointer[0]][pointer[1]].isWall === 1) {
                map[pointer[0]][pointer[1]].isWall = 0;
                this.counter--;
            }
        }

        return map;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DungeonMapMaker;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SpriteManager__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Loader__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AnimationManager__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__UnitManager__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Animation__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Action__ = __webpack_require__(16);









class GameManager {
    constructor() {
        this.ratio = 16 / 9;
        this.engine = new __WEBPACK_IMPORTED_MODULE_0__GraphicEngine__["a" /* default */]('canvas', true);
        this.spriteManager = new __WEBPACK_IMPORTED_MODULE_1__SpriteManager__["a" /* default */](this.engine);
        this.state = { state: false };
        this.tiles = [];
        this.fullScreen = false;
        this.lastI = -1;
        this.lastJ = -1;
    }

    startGameRendering(callback) {
        console.log('work rendering uints');
        let loaderTextures = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/textures/moveTile.png', '/views/singleplay/textures/activeTile.png', '/views/singleplay/textures/select.png', '/views/singleplay/icons/fullscreen.png', '/views/singleplay/textures/actionBack.png', '/views/singleplay/icons/circle.png', '/views/singleplay/icons/radio2.png', '/views/singleplay/icons/radio1.png', '/views/singleplay/icons/dead.png', '/views/singleplay/textures/greenTile.png', '/views/singleplay/textures/redTile.png'], this.engine.gl);
        let loaderAnimations = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/animations/fireball.png', '/views/singleplay/animations/Fire 5.png', '/views/singleplay/animations/thunderbolt.png', '/views/singleplay/animations/healing.png', '/views/singleplay/animations/blade_flurry.png', '/views/singleplay/animations/attack.png', '/views/singleplay/animations/holly_wrath.png', '/views/singleplay/animations/activeTile.png'], this.engine.gl);
        let loaderConditions = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/conditions/WarriorAngry.png', '/views/singleplay/conditions/WarriorAttack.png', '/views/singleplay/conditions/WarriorDead.png', '/views/singleplay/conditions/MageAngry.png', '/views/singleplay/conditions/MageAttack.png', '/views/singleplay/conditions/MageDead.png', '/views/singleplay/conditions/ThiefAngry.png', '/views/singleplay/conditions/ThiefAttack.png', '/views/singleplay/conditions/ThiefDead.png', '/views/singleplay/conditions/PriestAngry.png', '/views/singleplay/conditions/PriestAttack.png', '/views/singleplay/conditions/PriestDead.png', '/views/singleplay/conditions/Skeleton1Angry.png', '/views/singleplay/conditions/Skeleton1Attack.png', '/views/singleplay/conditions/Skeleton1Dead.png', '/views/singleplay/conditions/Skeleton2Angry.png', '/views/singleplay/conditions/Skeleton2Attack.png', '/views/singleplay/conditions/Skeleton2Dead.png'], this.engine.gl);
        let loaderEntities = new __WEBPACK_IMPORTED_MODULE_2__Loader__["a" /* default */](['/views/singleplay/entity/warrior_portrait.png', '/views/singleplay/entity/mage_portrait.png', '/views/singleplay/entity/thief_portrait.png', '/views/singleplay/entity/priest_portrait.png', '/views/singleplay/entity/skeleton1_portrait.png', '/views/singleplay/entity/skeleton2_portrait.png', '/views/singleplay/entity/warrior.png', '/views/singleplay/entity/mage.png', '/views/singleplay/entity/thief.png', '/views/singleplay/entity/priest.png', '/views/singleplay/entity/skeleton1.png', '/views/singleplay/entity/skeleton2.png'], this.engine.gl);
        loaderTextures.load(textures => {
            loaderAnimations.load(animations => {
                loaderConditions.load(conditions => {
                    loaderEntities.load(entities => {
                        this.textures = textures;
                        this.initGui();
                        this.initEvents();
                        let animation = new __WEBPACK_IMPORTED_MODULE_6__Animation__["a" /* default */](this);
                        this.animtaionManager = new __WEBPACK_IMPORTED_MODULE_4__AnimationManager__["a" /* default */](animation, this.spriteManager, this.activeTile, this.actionPoint, this.state, animations, this.textures[7]);
                        this.unitManager = new __WEBPACK_IMPORTED_MODULE_5__UnitManager__["a" /* default */](animation, this.animtaionManager, this.spriteManager, this.activeTile, this.actionPoint, this.state, entities, textures, conditions);
                        this.engine.render();
                    }, callback);
                });
            });
        });
    }

    initEvents() {
        document.addEventListener('mousemove', function (event) {
            let x = event.clientX / window.innerWidth;
            let y = event.clientY / window.innerHeight;
            let xMin = (1 + global.mapShiftX) / 2;
            let xMax = xMin + 0.6;
            let yMin = (1 - global.mapShiftY) / 2;
            let yMax = yMin + 0.8;
            this.tiles.forEach(function (tile) {
                this.spriteManager.deleteSprite(tile);
            }.bind(this));
            this.tiles = [];
            if (x >= xMin && x < xMax && y >= yMin && y < yMax && document.getElementById('win').hidden && document.getElementById('lose').hidden && !this.state.state) {
                let i = Math.floor((x - xMin) / 0.6 / (1 / 16));
                let j = Math.floor((y - yMin) / 0.8 / (1 / 12));
                if (i !== this.lastI && j !== this.lastJ && i < 16 && j < 12 && this.unitManager.massiveSkill) {
                    let halfArea = Math.floor(this.unitManager.activeSkill.area / 2) + 1;
                    let tiles = [];
                    for (let ii = i - halfArea; ii <= i + halfArea; ii++) {
                        for (let jj = j - halfArea; jj <= j + halfArea; jj++) {
                            if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
                                tiles.push(global.tiledMap[ii][jj]);
                            }
                        }
                    }
                    this.unitManager.drawActiveTiles(tiles);
                } else if (i < 16 && j < 12 && global.tiledMap[i][j].active) {
                    this.spriteManager.getSprite(this.activeElem).setTrans(__WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* default */].translationOnMap(j, i));
                } else {
                    this.spriteManager.getSprite(this.activeElem).setTrans([-2, -2]);
                }
            }
        }.bind(this));
        document.addEventListener('click', event => {
            let x = event.clientX / this.engine.gl.canvas.clientWidth;
            let y = event.clientY / this.engine.gl.canvas.clientHeight;
            if (x >= 0.95 && y >= 0.95) {
                console.log(event.clientX + ' ' + event.clientY);
                if (!this.fullScreen) {
                    document.documentElement.mozRequestFullScreen();
                    this.fullScreen = true;
                } else {
                    document.mozCancelFullScreen();
                    this.fullScreen = false;
                }
            }
            if (x >= 0.2 && x <= 0.3 && y <= 0.05) {
                let action = new __WEBPACK_IMPORTED_MODULE_7__Action__["a" /* default */]();
                action.sender = null;
                action.target = null;
                action.ability = null;
                global.actionDeque.push(action);
            }
        });
    }

    initGui() {
        this.activeTile = this.spriteManager.addSprite(-0.9, [-2, 3], this.textures[1], __WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true);
        this.activeElem = this.spriteManager.addSprite(-1, [-2, 3], this.textures[2], __WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * this.ratio), true);
        this.actionPoint = this.spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* default */].transActionPoint(0), this.textures[6], __WEBPACK_IMPORTED_MODULE_3__Utils__["a" /* default */].madeRectangle(0, 0, 0.023, -0.050 * global.ratio), true);
        document.body.style.height = '100vh';
        let skillBar = document.createElement('div');
        skillBar.style.position = 'absolute';
        skillBar.style.right = '32.5vw';
        skillBar.style.top = '0';
        skillBar.style.width = '35vw';
        skillBar.style.height = '7vh';
        skillBar.style.backgroundImage = 'url(\'/views/singleplay/textures/skill_bar.png\')';
        skillBar.style.backgroundSize = '100% 100%';
        skillBar.style.backgroundRepeat = 'no-repeat';
        document.getElementsByClassName('container')[0].appendChild(skillBar);

        let chat = document.createElement('div');
        chat.style.position = 'absolute';
        chat.style.color = 'white';
        chat.style.left = '76vw';
        chat.style.top = '18vh';
        chat.style.overflow = 'auto';
        chat.style.height = '80vh';
        global.chat = chat;
        document.body.appendChild(chat);
    }
    static log(text, color) {
        if (color === undefined) {
            chat.innerHTML += text + '<br>';
        } else {
            chat.innerHTML += '<span style=\'color:' + color + ';\'>' + text + '</span><br>';
        }
        chat.scrollTop = chat.scrollHeight;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameManager;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SpriteManager {
  constructor(engine) {
    this.indexes = [];
    this.count = 0;
    this.engine = engine;
  }

  setIndexAndOrder(spriteIndex, order) {
    this.engine.sprites[spriteIndex].index = this.count;
    this.engine.sprites[spriteIndex].order = order;
    this.indexes[this.count] = spriteIndex;
    return this.count++;
  }

  addSprite(order, translation, texture, vertexs, blend, texCoord) {
    let spriteIndex = this.engine.addSprite(translation, texture, vertexs, blend, texCoord);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  addColorSprite(order, translation, vertexs, color, blend) {
    let spriteIndex = this.engine.addColorSprite(translation, vertexs, color, blend);
    return this.setIndexAndOrder(spriteIndex, order);
  }

  getSprite(index) {
    return this.engine.sprites[this.indexes[index]];
  }

  deleteSprite(index) {
    delete this.engine.sprites[this.indexes[index]];
  }

  sortSprites() {
    this.engine.sprites.sort((a, b) => {
      if (a.order > b.order) return 1;
      return -1;
    });
    for (let i = 0; i < this.engine.sprites.length; i++) {
      if (this.engine.sprites[i] != undefined) {
        this.indexes[this.engine.sprites[i].index] = i;
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteManager;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);

class AnimationManager {
    constructor(Animation, spriteManager, activeTile, actionPoint, state, animations, texture) {
        this.Animation = Animation;
        this.state = state;
        this.spriteManager = spriteManager;
        this.texture = texture;
        this.activeTile = activeTile;
        this.actionPoint = actionPoint;
        this.animations = animations;
    }

    stateCheck(callback) {
        if (this.state.state) {
            setTimeout(function () {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.state = true;
    }

    movingTo(TileStart, path) {
        if (this.stateCheck(this.movingTo.bind(this, TileStart, path))) {
            return;
        }
        if (!TileStart.unitOnTile) {
            return;
        }
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.texture);
        let unit = TileStart.unitOnTile;
        for (let i = path.length - 1; i >= 0; i--) {
            if (i == path.length - 1) {
                this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(unit), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i]), 0.2, unit.entity.mapId);
                this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(unit), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
            } else {
                setTimeout(function () {
                    this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i + 1]), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(path[i]), 0.2, unit.entity.mapId);
                    this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i + 1]), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(path[i]), 0.2, unit.entity.healthbarId);
                }.bind(this), 200 * (path.length - 1 - i));
            }
        }
        let transActiveTile = this.spriteManager.getSprite(this.activeTile).getTrans();
        setTimeout(function () {
            if (transActiveTile == this.spriteManager.getSprite(this.activeTile).getTrans()) {
                this.spriteManager.getSprite(this.activeTile).setTrans(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(unit.ypos, unit.xpos));
            }
            this.state.state = false;
        }.bind(this), 200 * path.length);
    }

    thunderbolt(TileStart, TileDest) {
        let DestT = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(TileDest.unitOnTile);
        let thunderboltId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileDest.ypos, TileDest.xpos), this.animations[2], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, 1.2 - DestT[1]), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 2));
        this.Animation.FrameAnimation(thunderboltId, 0.5, 8, 5, 2, true);
    }

    fireball(TileStart, TileDest) {
        let timeA = Math.sqrt(Math.pow(TileStart.xpos - TileDest.xpos, 2) + Math.pow(TileStart.ypos - TileDest.ypos, 2)) / 6;
        let fireballId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileStart.ypos, TileDest.xpos), this.animations[0], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 0.06, -0.06 * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 6, -1 / 6));
        this.Animation.FrameAnimation(fireballId, timeA, 32, 6, 6, true);
        this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(TileStart), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(TileDest.ypos, TileDest.xpos), timeA, fireballId);
        setTimeout(function () {
            for (let ii = TileDest.xpos - 2; ii < TileDest.xpos + 3; ii++) {
                for (let jj = TileDest.ypos - 2; jj < TileDest.ypos + 3; jj++) {
                    if (ii >= 0 && ii < 16 && jj >= 0 && jj < 12) {
                        this.Animation.FrameAnimation(this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(jj, ii), this.animations[1], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 16, -(1 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 4)), 1.2, 20, 5, 4, true);
                    }
                }
            }
        }.bind(this), timeA * 1000);
    }

    healing(units) {
        units.forEach(function (unit) {
            let healId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(unit.ypos - 1, unit.xpos - 1), this.animations[3], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 3.6 / 16, -(3.6 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 5));
            this.Animation.FrameAnimation(healId, 1, 25, 5, 5, true);
        }.bind(this));
    }

    blade_flurry(target) {
        let blade_flurryId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(target.ypos - 2, target.xpos - 2), this.animations[4], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 6 / 16, -(6 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 4));
        this.Animation.FrameAnimation(blade_flurryId, 1, 20, 5, 4, true);
    }

    attack(target) {
        let attackId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(target.ypos - 0.9, target.xpos - 0.7), this.animations[5], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 2.8 / 16, -(2.8 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 5, -1 / 2));
        this.Animation.FrameAnimation(attackId, 0.5, 10, 5, 2, true);
    }

    holly_wrath(sender, target) {
        let timeA = Math.sqrt(Math.pow(sender.xpos - target.xpos, 2) + Math.pow(sender.ypos - target.ypos, 2)) / 6;
        let holly_wrathId = this.spriteManager.addSprite(12, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(sender.ypos - 1, sender.xpos - 1), this.animations[6], __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 3.6 / 16, -(3.6 / 16) * 16 / 9), true, __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(0, 0, 1 / 6, -1 / 6));
        this.Animation.FrameAnimation(holly_wrathId, timeA, 21, 5, 5, true);
        this.Animation.MoveAnimation(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationForUnits(sender), __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].translationOnMap(target.ypos - 1, target.xpos - 1), timeA, holly_wrathId);
    }

    animationActiveTile(unit) {
        let trans = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].transForHealthbar(unit);
        this.spriteManager.getSprite(this.activetile).setTrans([trans[0] - 0.02, trans[1] - 0.01]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AnimationManager;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Entity__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Action__ = __webpack_require__(16);




class UnitManager {
    constructor(Animation, animationManager, spriteManager, activeTile, actionPoint, state, entities, textures, conditions) {
        this.Animation = Animation;
        this.units = [];
        this.spriteManager = spriteManager;
        this.animationManager = animationManager;
        this.entities = entities;
        this.textures = textures;
        this.conditions = conditions;
        this.firstActiveUnit = true;
        this.massiveSkill = false;
        this.activeTile = activeTile;
        this.circle = spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transActiveCircle(0), this.textures[5], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.015, -0.015 * global.ratio), true);
        this.actionPoint = actionPoint;
        this.activeIndex = 0;
        this.possibleMoves = [];
        this.state = state;
        this.indexUnit = {
            warrior: 0,
            mage: 1,
            thief: 2,
            priest: 3,
            skeleton1: 4,
            skeleton2: 5
        };
        this.skillbar = [];
    }

    stateCheck(callback) {
        console.log(this.state);
        if (this.state.state) {
            setTimeout(function () {
                requestAnimationFrame(callback);
            }, 50);
            return true;
        }
        this.state.state = true;
    }

    timeAndRunSkill(nameSkill, sender, target, runAnimation, wounded) {
        let timeA = Math.sqrt(Math.pow(sender.xpos - target.xpos, 2) + Math.pow(sender.ypos - target.ypos, 2)) / 6;
        switch (nameSkill) {
            case 'Fire ball':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.fireball(sender, target);
                    }.bind(this), 500);
                }
                return timeA * 1000;
            case 'Thunderbolt':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.thunderbolt(sender, target);
                    }.bind(this), 500);
                }
                return 500;

            case 'Massive Heal':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.healing(wounded);
                    }.bind(this), 500);
                }
                return 1000;
            case 'Blade flurry':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.blade_flurry(target);
                    }.bind(this), 500);
                }
                return 1000;
            case 'Attack':case 'Sawtooth knife':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.attack(target);
                    }.bind(this), 500);
                }
                return 500;
            case 'Holly wrath':
                if (runAnimation) {
                    setTimeout(function () {
                        this.animationManager.holly_wrath(sender, target);
                    }.bind(this), 500);
                }
                return timeA * 1000;
        }
        return 500;
    }

    updateHealth(wounded) {
        wounded.forEach(function (item) {
            if (item.healthpoint[0] > 0) {
                this.spriteManager.getSprite(item.entity.lowbarHealthId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 * (item.healthpoint[0] / item.healthpoint[1]) - 0.006, -0.015));
            } else {
                this.spriteManager.getSprite(item.entity.lowbarHealthId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
                this.spriteManager.getSprite(item.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
            }
        }.bind(this));
    }

    addUnit(unit) {
        unit.entity = new __WEBPACK_IMPORTED_MODULE_0__Entity__["a" /* default */]();
        unit.entity.lowbarId = this.spriteManager.addSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbar(this.units.length), this.entities[this.indexUnit[unit.class]], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.075, -0.075 * global.ratio), true);
        unit.entity.mapId = this.spriteManager.addSprite(unit.ypos, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationForUnits(unit), this.entities[6 + this.indexUnit[unit.class]], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 9 * 1.7, -(1.2 / 9) * 1.7 * global.ratio), true);
        unit.entity.lowbarHealthId = this.spriteManager.addColorSprite(0, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transOnLowbarHealth(this.units.length), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0.075, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        unit.entity.healthbarId = this.spriteManager.addColorSprite(unit.ypos, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transForHealthbar(unit), __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16 - 0.006, -0.015), [250 / 255, 44 / 255, 31 / 255, 1.0]);
        this.units.push(unit);
    }

    updateSkillbar(name, sender, target) {}

    static neighbors(sender, target) {
        console.log("sender" + sender + " target" + target + " neighvoors?");
        if (target.xpos + 1 === sender.xpos && target.ypos === sender.ypos) {
            return true;
        }

        if (target.xpos - 1 === sender.xpos && target.ypos === sender.ypos) {
            return true;
        }

        if (target.ypos + 1 === sender.ypos && target.xpos === sender.xpos) {
            return true;
        }

        if (target.ypos - 1 === sender.ypos && target.xpos === sender.xpos) {
            return true;
        }

        return false;
    }

    activeUnit(unit) {
        if (this.firstActiveUnit) {
            this.firstActiveUnit = false;
        } else {
            // this.changeActiveUnit(unit);
        }
        this.currentUnit = unit;
        this.massiveSkill = false;
        let skills = document.getElementsByClassName('skill');
        for (let i = skills.length - 1; i >= 0; i--) {
            skills[i].remove();
        }
        let activeSkillImg = document.getElementById('activeSkill');
        if (!activeSkillImg) {
            activeSkillImg = document.createElement('img');
            activeSkillImg.id = 'activeSkill';
            activeSkillImg.style.position = 'absolute';
            activeSkillImg.style.top = '0';
            activeSkillImg.style.left = 32.5 + 'vw';
            activeSkillImg.style.width = '3.7vw';
            activeSkillImg.style.height = 3.7 * global.ratio + 'vh';
            activeSkillImg.src = '/views/singleplay/textures/activeTile.png';
            this.activeSkill = unit.skills[0];
            document.getElementsByClassName('container')[0].appendChild(activeSkillImg);
        } else {
            this.activeSkill = unit.skills[0];
            activeSkillImg.style.left = 32.5 + 'vw';
        }
        unit.skills.forEach(function (skill, i) {
            console.log(skill.name);
            let skillImg = document.createElement('img');
            skillImg.title = skill.getDesciption();
            skillImg.className = 'skill';
            skillImg.style.position = 'absolute';
            skillImg.style.top = '1.1vh';
            skillImg.style.left = i * 3.5 + 0.45 + 32.5 + 'vw';
            skillImg.style.width = '2.6vw';
            skillImg.style.height = 2.6 * global.ratio + 'vh';
            skillImg.src = '/views/singleplay/icons/' + skill.name + '.png';
            document.getElementsByClassName('container')[0].appendChild(skillImg);
        }.bind(this));
        // this.animationManager.animationActiveTile(unit);
        while (this.units[this.activeIndex % this.units.length].isDead()) {
            this.activeIndex++;
        }
        this.spriteManager.getSprite(this.circle).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transActiveCircle(this.activeIndex % this.units.length));
        this.spriteManager.getSprite(this.actionPoint).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].transActionPoint(this.activeIndex++ % this.units.length));
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.textures[6]);
        this.spriteManager.getSprite(this.activeTile).setTrans(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(unit.ypos, unit.xpos));
        document.onmousedown = function (event) {
            let x = event.clientX / window.innerWidth;
            let y = event.clientY / window.innerHeight;
            let xMin = (1 + global.mapShiftX) / 2;
            let xMax = xMin + 0.6;
            let yMin = (1 - global.mapShiftY) / 2;
            let yMax = yMin + 0.8;
            console.log('STATE: ' + this.state.state);
            if (event.which === 1 && x >= xMin && x < xMax && y >= yMin && y < yMax && document.getElementById('win').hidden && document.getElementById('lose').hidden && !this.state.state) {
                let i = Math.floor((x - xMin) / 0.6 / (1 / 16));
                let j = Math.floor((y - yMin) / 0.8 / (1 / 12));
                if (global.tiledMap[i][j].active || this.massiveSkill) {
                    let action = new __WEBPACK_IMPORTED_MODULE_2__Action__["a" /* default */]();
                    action.sender = global.tiledMap[unit.xpos][unit.ypos];
                    action.target = global.tiledMap[i][j];
                    action.ability = this.activeSkill.name === 'Move' ? null : this.activeSkill;
                    global.actionDeque.push(action);
                    if (this.massiveSkill) {
                        this.deleteLastActiveTiles();
                    }
                }
            } else if (event.which === 1 && x >= 0.33 && x <= 0.675 && y >= 0 && y <= 0.07) {
                let i = Math.floor((x - 0.33) / (0.35 / 10));
                this.setCurrentSkill(i);
            }
            return false;
        }.bind(this);
    }

    setCurrentSkill(i, path) {
        if (this.stateCheck(this.setCurrentSkill.bind(this, i, path))) {
            return;
        }
        this.state.state = false;
        if (path) {
            this.path = path;
        }
        if (i >= this.currentUnit.skills.length) {
            return;
        }
        if (i === 0) {
            this.drawActiveTiles(this.path);
            this.massiveSkill = false;
        } else if (this.currentUnit.skills[i].typeOfArea === 'circle') {
            this.possibleMoves.forEach(function (move) {
                global.tiledMap[move.xpos][move.ypos].active = false;
                this.spriteManager.deleteSprite(move.id);
            }.bind(this));
            this.massiveSkill = true;
        } else {
            this.massiveSkill = false;
            let tiles = this.getActiveTiles(global.tiledMap[this.currentUnit.xpos][this.currentUnit.ypos], this.currentUnit.skills[i]);
            this.drawActiveTiles(tiles);
        }
        this.activeSkill = this.currentUnit.skills[i];
        let activeSkill = document.getElementById('activeSkill');
        activeSkill.style.left = 32.5 + 35 / 10 * i + 'vw';
    }

    getActiveTiles(x, y) {
        let result = [];
        this.units.forEach(unit => {
            if (y.damage[0] > 0) {
                if (unit.type !== x.unitOnTile.type && !unit.isDead()) {
                    if (this.currentUnit.shooter || Math.abs(this.currentUnit.xpos - unit.xpos) <= 1 && Math.abs(this.currentUnit.ypos - unit.ypos) <= 1) {
                        result.push(global.tiledMap[unit.xpos][unit.ypos]);
                    }
                }
            } else {
                if (unit.type === x.unitOnTile.type && !unit.isDead()) {
                    if (this.currentUnit.shooter || Math.abs(this.currentUnit.xpos - unit.xpos) <= 1 && Math.abs(this.currentUnit.ypos - unit.ypos) <= 1) {
                        result.push(global.tiledMap[unit.xpos][unit.ypos]);
                    }
                }
            }
        });
        return result;
    }

    deleteLastActiveTiles() {
        this.possibleMoves.forEach(function (move) {
            global.tiledMap[move.xpos][move.ypos].active = false;
            this.spriteManager.deleteSprite(move.id);
        }.bind(this));
        this.possibleMoves = [];
    }

    drawActiveTiles(tiles) {
        this.deleteLastActiveTiles();
        tiles.forEach(function (tile) {
            this.possibleMoves.push({
                id: this.spriteManager.addSprite(-2, __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].translationOnMap(tile.ypos, tile.xpos), tile.unitOnTile && !tile.unitOnTile.isDead() ? tile.unitOnTile.type === this.currentUnit.type ? this.textures[9] : this.textures[10] : this.textures[0], __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 1.2 / 16, -(1.2 / 16) * global.ratio), true),
                xpos: tile.xpos,
                ypos: tile.ypos
            });
            global.tiledMap[tile.xpos][tile.ypos].active = true;
        }.bind(this));
        this.units.forEach(unit => {
            this.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
            this.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        });
        this.spriteManager.sortSprites();
    }

    unitAttack(nameSkill, sender, target, wounded) {
        this.state.state = true;
        this.spriteManager.getSprite(this.actionPoint).setTexture(this.textures[7]);
        this.updateSkillbar(nameSkill, sender, target);
        let index = this.indexUnit[sender.unitOnTile.class];
        this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[3 * index]);
        let timer = this.timeAndRunSkill(nameSkill, sender, target, true, wounded);
        setTimeout(function (nameSkill, sender, target) {
            this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.conditions[1 + 3 * index]);
            setTimeout(function (sender, target) {
                // gameManager.spriteManager.getSprite(target.unitOnTile.entity.mapId).setTexture(images[92]);
                if (sender.unitOnTile.healthpoint[0] > 0) {
                    this.spriteManager.getSprite(sender.unitOnTile.entity.mapId).setTexture(this.entities[6 + index]);
                }
                this.updateHealth(wounded);
                this.state.state = false;
            }.bind(this, sender, target), timer + 100);
        }.bind(this, nameSkill, sender, target), 500);
    }

    unitAttackAndKill(nameSkill, sender, target, DeadUnits, wounded) {
        this.unitAttack(nameSkill, sender, target, wounded);
        let timer = this.timeAndRunSkill(nameSkill, sender, target);
        setTimeout(() => {
            // this.removeUnitsInInitiativeLine(DeadUnits);
            DeadUnits.forEach(unit => {
                this.spriteManager.getSprite(unit.entity.lowbarId).setTexture(this.textures[8]);
                this.spriteManager.getSprite(unit.entity.mapId).setTexture(this.conditions[2 + 3 * this.indexUnit[unit.class]]);
                this.spriteManager.getSprite(unit.entity.lowbarHealthId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
                this.spriteManager.getSprite(unit.entity.healthbarId).setVertexs(__WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].madeRectangle(0, 0, 0, 0));
            });
        }, timer + 800);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnitManager;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor() {
    this.mapId = 0;
    this.healthbarId = 0;
    this.lowbarId = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);

class Animation {
  constructor(gameManager) {
    this.gameManager = gameManager;
  }
  static deltaTrans(start, deltaT, deltaTime, timeA) {
    return [start[0] + deltaT[0] * (deltaTime / timeA), start[1] + deltaT[1] * (deltaTime / timeA)];
  }

  MoveAnimation(start, dest, timeA, id) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        this.gameManager.unitManager.units.forEach(function (unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
      } else {
        this.gameManager.spriteManager.getSprite(id).setTrans(Animation.deltaTrans(start, deltaT, deltaTime, timeA));
        this.gameManager.unitManager.units.forEach(function (unit) {
          this.gameManager.spriteManager.getSprite(unit.entity.mapId).order = unit.ypos;
          this.gameManager.spriteManager.getSprite(unit.entity.healthbarId).order = unit.ypos;
        }.bind(this));
        this.gameManager.spriteManager.sortSprites();
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  MoveHtmlAnimation(element, start, dest, time) {
    let currentTime = performance.now() * 0.001;
    let deltaT = [dest[0] - start[0], dest[1] - start[1]];
    requestAnimationFrame(Moving.bind(this));
    function Moving(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= time) {
        element.style.right = dest[0] + 'vw';
        element.style.top = dest[1] + 'vh';
      } else {
        let dT = Animation.deltaTrans(start, deltaT, deltaTime, time);
        element.style.right = dT[0] + 'vw';
        element.style.top = dT[1] + 'vh';
        requestAnimationFrame(Moving.bind(this));
      }
    }
  }

  FrameAnimation(id, timeA, countFrames, colls, rows, deleteInEnd) {
    let currentTime = performance.now() * 0.001;
    requestAnimationFrame(FrameAnim.bind(this));
    function FrameAnim(now) {
      now *= 0.001;
      let deltaTime = now - currentTime;
      if (deltaTime >= timeA) {
        if (deleteInEnd) {
          this.gameManager.spriteManager.deleteSprite(id);
        }
      } else {
        let frame = Math.floor(deltaTime % timeA / timeA * countFrames);
        this.gameManager.spriteManager.getSprite(id).setTexCoord(__WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].madeRectangle(frame % colls / colls, Math.floor(frame / colls) / rows, (frame % colls + 1) / colls, (Math.floor(frame / colls) + 1) / rows));
        requestAnimationFrame(FrameAnim.bind(this));
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Animation;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(3);





const fieldPrototypes = [{
    type: 'text',
    attributes: {
        name: 'username',
        placeholder: 'username'
    }
}, {
    type: 'password',
    attributes: {
        name: 'password',
        placeholder: 'password'
    }
}, {
    type: 'submit',
    attributes: {
        value: 'COMPLEATE'
    }
}];

class Login extends __WEBPACK_IMPORTED_MODULE_0__blocks_block_block__["a" /* default */] {
    constructor() {
        super('form', ['login']);
        fieldPrototypes.forEach(fieldPrototype => {
            this.appendChildBlock(fieldPrototype.attributes.name, new __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__["a" /* default */](fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
    }

    creation() {

        const wrappe = document.querySelector('div.menu');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0]);
        }
        wrappe.appendChild(this._element);
    }

    onSubmit(callback) {

        this.on('submit', event => {

            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }

            callback(formdata);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Login);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".menu form {\n  width: 350px; }\n\n.menu input {\n  font-family: fantasy;\n  outline: 0;\n  background: #291b1f;\n  width: 100%;\n  margin: 0 0 15px;\n  padding: 15px;\n  box-sizing: border-box;\n  border: 2px solid #c58818;\n  font-size: 14px;\n  color: white; }\n\n.menu input:hover {\n  border-radius: 10px;\n  border: 2px solid white; }\n\n.message-error {\n  margin-left: 10px;\n  color: red;\n  font-size: 25px;\n  font-family: fantasy; }\n", ""]);

// exports


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__blocks_forms_forms_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_router__ = __webpack_require__(3);





const fieldPrototypes = [{
    type: 'text',
    attributes: {
        name: 'username',
        placeholder: 'username'
    }
}, {
    type: 'text',
    attributes: {
        name: 'email',
        placeholder: 'email'
    }
}, {
    type: 'password',
    attributes: {
        name: 'password',
        placeholder: 'password'
    }
}, {
    type: 'password',
    attributes: {
        name: 'passwordConfirm',
        placeholder: 'repeat passoword'
    }
}, {
    type: 'submit',
    attributes: {
        value: 'COMPLEATE'
        //formmethod:'post'

    }
}];

class Registration extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('form', ['registration']);

        fieldPrototypes.forEach(fieldPrototype => {
            this.appendChildBlock(fieldPrototype.attributes.name, new __WEBPACK_IMPORTED_MODULE_1__blocks_forms_input__["a" /* default */](fieldPrototype.type, ['field'], fieldPrototype.attributes));
        });
    }

    creation() {

        const wrappe = document.querySelector('div.menu');
        if (wrappe.childNodes[0] !== undefined) {
            wrappe.removeChild(wrappe.childNodes[0]);
        }
        wrappe.appendChild(this._element);
    }

    onSubmit(callback) {
        this.on('submit', event => {
            event.preventDefault();
            const formdata = {};
            const elements = this._element.elements;
            for (let name in elements) {
                formdata[name] = elements[name].value;
            }
            callback(formdata);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Registration);

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info_scss__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__info_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__info_scss__);



const buttonBack = "buttonBack";
const authors = [{
    name: "Kirill",
    link: "https://github.com/KCherkasov"
}, {
    name: "Veniamin",
    link: "https://github.com/WorldVirus"
}, {
    name: "Vlad",
    link: "https://github.com/torrentino555"
}, {
    name: "Artur",
    link: "https://github.com/zonder129"
}];
class Info extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('ul', ['info'], {});
    }

    creation() {
        const wrape = document.querySelector('div.menu');

        if (document.querySelector('div.menu').childNodes[0] !== undefined) {
            document.querySelector('div.menu').removeChild(document.querySelector('div.menu').childNodes[0]);
        }
        wrape.appendChild(this._element);

        authors.forEach(i => {
            this.appendChildBlock('li', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('li', [i.name]));
            let but = document.querySelector('li.' + i.name);
            but.innerHTML = `<a>${i.name}</a>`;
            but.querySelector('a').setAttribute('href', i.link);
        });
    }

}
/* harmony default export */ __webpack_exports__["a"] = (Info);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(49);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./info.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".menu .info a {\n  text-decoration: none;\n  color: white; }\n\n.menu .info li:hover {\n  border-radius: 8px; }\n\n.menu .info li {\n  margin-bottom: 20px;\n  padding: 10px;\n  border-radius: 0; }\n", ""]);

// exports


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DemoGameModule__ = __webpack_require__(11);



class SinglePlay extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super();

        this.template = __webpack_require__(51);
    }

    creation() {
        document.getElementById('application').innerHTML = this.template;
        // document.querySelector('div.wrapper').innerHTML = this.template;
        let game = new __WEBPACK_IMPORTED_MODULE_1__DemoGameModule__["a" /* default */]();

        game.gamePreRender();
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = SinglePlay;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Document</title>\n  <link rel=\"stylesheet\" href=\"/views/singleplay/style.css\">\n</head>\n\n<body>\n  <div class=\"container\">\n    <canvas id=\"background\"></canvas>\n    <canvas id=\"canvas\"></canvas>\n    <div style=\"position: relative;\">\n      <span style=\"position:absolute; left:20.8vw; top:2vh;font-size:1.5vw;color: white\" id=\"time\"></span>\n    </div>\n  </div>\n  <img hidden id=\"win\" style=\"position:absolute;width: 100vw; height: 100vh;\" src=\"/views/singleplay/textures/win.png\">\n  <img hidden id=\"lose\" style=\"position:absolute;width: 100vw; height: 100vh;\" src=\"/views/singleplay/textures/lose.png\">\n  </img>\n</body>\n\n</html>\n";

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_scss__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__module_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__module_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__transport_transport__ = __webpack_require__(55);





const enity = [{
    src: '../../../images/warrior.png'
}, {
    src: '../../../images/priest.png'
}, {
    src: '../../../images/mage.png'
}, {
    src: '../../../images/thief.png'
}];
let secondCounter = 0;
let counter = 0;
let globalCounter = 3;
const name = [`warrior`, `priest`, `mage`, `thief`];
const button = [`Single Play`, `MultiPlayer`];
const classes = [`single`, `multi`];
let index = 0;
let i = 0;
const wrape = document.querySelector('div.wrapper');
class Choose extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor() {
        super('div', ['choose'], {});
        this.createChildren();
        return this;
    }

    createChildren() {
        this.appendChildBlock('img', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('img', ['person']));
    }
    choose() {
        this.appendChildBlock('choose', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['choose_left']));
        wrape.appendChild(this._element);

        this.appendChildBlock('choose', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['choose_right']));
        wrape.appendChild(this._element);
        let enityName = document.getElementsByTagName('li');
        enityName[i].style.color = "white";
        document.querySelector('a.choose_right').addEventListener('click', () => {
            if (index !== globalCounter) {
                ++i;
                if (i !== 0) {
                    enityName[i - 1].style.color = "#c58818";
                }
                ++index;
                enityName[i].style.color = "white";
                document.querySelector('img.person').setAttribute('src', enity[index].src);
            }
        });

        document.querySelector('a.choose_left').addEventListener('click', () => {
            if (index !== 0) {
                --i;
                if (i !== 3) {
                    enityName[i + 1].style.color = "#c58818";
                }
                --index;
                enityName[i].style.color = "white";
                document.querySelector('img.person').setAttribute('src', enity[index].src);
            }
        });
    }

    leftbar() {
        this.appendChildBlock('left_bar', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('div', ['left_bar']));
        wrape.appendChild(this._element);
        let list = document.createElement("ul");
        document.querySelector('div.left_bar').appendChild(list);

        for (let i = 0; i !== 4; ++i) {
            let list = document.createElement("li");
            document.querySelector('ul').appendChild(list);
        }
        let enityName = document.getElementsByTagName('li');

        for (let i = 0; i !== 4; ++i) {
            enityName[i].innerHTML = name[i];
        }

        this.appendChildBlock('new_character', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['new_character']).setText('CREATE'));
        wrape.appendChild(this._element);

        document.querySelector('a.new_character').addEventListener('click', () => {
            if (globalCounter < 3) {
                ++index;
                let list = document.createElement("li");
                document.querySelector('ul').appendChild(list);
                let enityName = document.getElementsByTagName('li');
                enityName[i].innerHTML = name[i];
                ++globalCounter;
            }
        });

        this.appendChildBlock('new_character', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['delete']).setText('DELETE'));
        wrape.appendChild(this._element);

        document.querySelector('a.delete').addEventListener('click', () => {
            if (globalCounter !== 0) {
                let enityName = document.getElementsByTagName('li');
                document.querySelector('ul').removeChild(enityName[i]);
                if (index === 0) {
                    if (counter !== 3) {
                        ++counter;
                        document.querySelector('img.person').setAttribute('src', enity[index + counter].src);
                        enityName[i].style.color = "white";
                    }
                    --globalCounter;
                } else {
                    ++secondCounter;
                    --index;
                    --i;
                    document.querySelector('img.person').setAttribute('src', enity[index].src);
                    console.log(index);
                    enityName[i].style.color = "white";
                    --globalCounter;
                }
            }
        });
    }
    footbarCreate() {
        this.appendChildBlock('footbar', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['enter']).setText('ENTER'));
        wrape.appendChild(this._element);
        document.querySelector('a.enter').addEventListener('click', () => {
            document.querySelector('div.choose').remove();
            let variant = wrape.appendChild(document.createElement("div"));
            variant.setAttribute('class', 'variant');

            for (let i = 0; i < 2; ++i) {
                variant.appendChild(document.createElement("a"));
            }
            let buttons = document.getElementsByTagName('a');

            for (let i = 0; i < 2; ++i) {
                buttons[i].setAttribute('class', classes[i]);
                buttons[i].innerHTML = button[i];
            }
        });

        this.appendChildBlock('footbar', new __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */]('a', ['back']).setText('BACK'));
        wrape.appendChild(this._element);
    }
    creation() {
        if (document.querySelector('div.menu') !== null) {
            document.querySelector('div.menu').remove();
        }

        wrape.appendChild(this._element);
        this.footbarCreate();
        this.leftbar();
        this.choose();
        let value = document.querySelector('img.person');
        value.setAttribute('src', enity[0].src);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Choose;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(54);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./module.scss", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/sass-loader/lib/loader.js!./module.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".person {\n  top: 30%;\n  left: 32%;\n  font-size: 120%;\n  position: absolute; }\n\n.single {\n  display: inline-block;\n  /*   width: 150px;\n     height: 60px;*/\n  font-size: 2.5em;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 45%;\n  left: 45%;\n  padding: 6px; }\n\n.single:hover {\n  color: white;\n  cursor: pointer; }\n\n.multi {\n  display: inline-block;\n  /*   width: 150px;\n     height: 60px;*/\n  font-size: 2.5em;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 65%;\n  left: 45%;\n  padding: 6px; }\n\n.multi:hover {\n  color: white;\n  cursor: pointer; }\n\n.enter {\n  display: inline-block;\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 90%;\n  left: 44%;\n  font-size: 150%; }\n\n.enter:hover {\n  color: white;\n  cursor: pointer; }\n\n.enter:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.back {\n  display: inline-block;\n  width: 10vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 90%;\n  right: 6%;\n  font-size: 150%; }\n\n.back:hover {\n  color: white;\n  cursor: pointer; }\n\n.back:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.choose_left {\n  display: inline-block;\n  outline: none;\n  border: 3px black;\n  border-radius: 100px;\n  transition: 0.2s;\n  background-size: cover;\n  font-family: fantasy;\n  position: absolute;\n  padding: 20px;\n  background-image: url(" + __webpack_require__(19) + ");\n  top: 77%;\n  left: 42%;\n  font-size: 150%;\n  cursor: pointer; }\n\n.choose_left:hover {\n  background: green; }\n\n.choose_right {\n  display: inline-block;\n  outline: none;\n  border: 3px black;\n  border-radius: 100px;\n  transition: 0.2s;\n  background-size: cover;\n  font-family: fantasy;\n  position: absolute;\n  padding: 20px;\n  background-image: url(" + __webpack_require__(19) + ");\n  top: 77%;\n  left: 53%;\n  font-size: 150%;\n  cursor: pointer;\n  transform: rotate(180deg); }\n\n.choose_right:hover {\n  background: green; }\n\n.left_bar {\n  width: 20vw;\n  height: 50vh;\n  background: #382c2f;\n  margin: -215px 0 0 -125px;\n  position: absolute;\n  top: 60%;\n  left: 15%;\n  padding: 10px;\n  border: solid 3px #5b2d0c;\n  color: #c58818;\n  font-family: fantasy;\n  font-size: 150%;\n  background-size: cover; }\n\n.new_character {\n  display: inline-block;\n  width: 12vw;\n  height: 6vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 90%;\n  left: 10%;\n  font-size: 150%; }\n\n.new_character:hover {\n  color: white;\n  cursor: pointer; }\n\n.new_character:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n.delete {\n  display: inline-block;\n  width: 11vw;\n  height: 5vh;\n  line-height: 50px;\n  text-align: center;\n  text-decoration: none;\n  text-shadow: 0 1px rgba(154, 33, 33, 0.2), 0 -1px rgba(82, 11, 11, 0.8);\n  border-radius: 17px;\n  background: #731509 radial-gradient(150% 100% at 50% 5px, rgba(255, 255, 255, 0.2), transparent);\n  box-shadow: inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, rgba(0, 0, 0, 0.8) 0 2px 5px -1px;\n  color: #c58818;\n  /* user-select: none; */\n  position: absolute;\n  border: 2px solid;\n  top: 75%;\n  left: 10%;\n  font-size: 120%; }\n\n.delete:hover {\n  color: white;\n  cursor: pointer; }\n\n.delete:active {\n  padding-bottom: 1px;\n  box-shadow: inset black 0 1px 3px, inset rgba(0, 0, 0, 0.6) 0 -2px 5px, inset rgba(252, 255, 255, 0.7) 0 2px 5px, 0 1px rgba(255, 255, 255, 0.08);\n  color: #80cfd6; }\n\n@media screen and (min-width: 960px) and (max-width: 1280px) and (orientation: landscape) {\n  .delete {\n    width: 12vw;\n    height: 7vh;\n    top: 91%;\n    left: 8%; }\n  .person {\n    top: 20%;\n    left: 25%; }\n  .enter {\n    top: 115%;\n    left: 43%;\n    font-size: 138%; }\n  .choose_right {\n    top: 99%; }\n  .choose_left {\n    top: 99%; }\n  .back {\n    width: 11vw;\n    height: 7vh;\n    top: 114%;\n    right: 6%; }\n  .left_bar {\n    top: 84%; }\n  .new_character {\n    top: 112%;\n    left: 6%; } }\n\n@media (min-width: 481px) and (max-width: 767px) and (orientation: landscape) {\n  .person {\n    width: 33vw; }\n  .choose_left {\n    padding: 16px;\n    top: 88%; }\n  .choose_right {\n    padding: 16px;\n    top: 88%; }\n  .enter {\n    top: 119%;\n    left: 40%;\n    font-size: 129%;\n    line-height: 44px;\n    width: 19vw;\n    height: 11vh; }\n  .back {\n    top: 119%;\n    font-size: 129%;\n    line-height: 44px;\n    width: 19vw;\n    height: 11vh; }\n  .new_character {\n    top: 119%;\n    font-size: 106%;\n    line-height: 44px;\n    width: 19vw;\n    height: 11vh; }\n  .left_bar {\n    font-size: 95%;\n    width: 20vw;\n    height: 50vh;\n    top: 110%;\n    left: 26%; }\n  .delete {\n    width: 12vw;\n    height: 7vh;\n    line-height: 30px;\n    top: 89%;\n    left: 10%;\n    font-size: 90%; } }\n\n@media (min-width: 481px) and (max-width: 767px) and (orientation: landscape) {\n  .single {\n    font-size: 1.5em;\n    left: 40%; }\n  .multi {\n    font-size: 1.5em;\n    top: 73%;\n    left: 40%; } }\n", ""]);

// exports


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_mediator__ = __webpack_require__(8);




class Transport {
    constructor() {
        if (Transport.__instance) {
            return Transport.__instance;
        }
        Transport.__instance = this;
        this.connected = false;
        this.count = 0;

        this.mediator = new __WEBPACK_IMPORTED_MODULE_0__modules_mediator__["default"]();
        this.url = "wss:https://kvvartet2017.herokuapp.com/game";
        this.ws = new WebSocket(this.url);
        this.open();
    }

    open() {
        this.ws.onopen = function (event) {
            this.connected = true;
            this.ws.onmessage = function (event) {
                this.handleMessage(event).bind(this);
            };

            this.interval = setInterval((() => {
                this.send("UPDATE");
            }).bind(this), 5000);

            this.ws.onclose = function () {
                this.connected = false;
                clearInterval(this.interval);
                this.handleClosing();
            }.bind(this);
        };
    }

    send(type, payload) {
        if (!this.connected) {
            console.log('websockets_dont_work_');
            setTimeout(() => {
                if (this.count > 20) {
                    return;
                }
                this.count++;
                this.send(type, payload);
            }, 1000);
        } else {
            console.log('websockets_work_');
            this.ws.send(JSON.stringify({ class: type, content: payload }));
        }
    }

    handleMessage(jsonMessage) {
        this.mediator.publish(jsonMessage.class, jsonMessage);
    }

    close() {
        this.ws.close();
    }

}
/* unused harmony export default */


/***/ }),
/* 56 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTFCN0Y1NEUyMjczMTFFMUFCRDRFQUNEMjAzMjJFMkQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTFCN0Y1NEYyMjczMTFFMUFCRDRFQUNEMjAzMjJFMkQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMUI3RjU0QzIyNzMxMUUxQUJENEVBQ0QyMDMyMkUyRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMUI3RjU0RDIyNzMxMUUxQUJENEVBQ0QyMDMyMkUyRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prq/JMMAAAvPSURBVHja7N19bxTX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"

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./banner-8fbe7a02e185423efad976b0be95524b.png";

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./forms/backup.css": 62
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 61;

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./forms/forms.scss": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 63;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./http.js": 10,
	"./mediator.js": 8,
	"./router.js": 3
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 64;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./banner.png": 60,
	"./logo2.png": 66,
	"./mage.png": 67,
	"./priest.png": 68,
	"./snowflake.png": 57,
	"./snowflake2.png": 59,
	"./snowflake3.png": 58,
	"./thief.png": 69,
	"./warrior.png": 70
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 65;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./logo2-3cf843d080ef7f43169fc926bd2e4895.png";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./mage-c458dd5d04052ebc27883fbfecf7db54.png";

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./priest-87d5d9da08d4f88271884f821fd9c79f.png";

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./thief-44dd92f7e16a9964c45341046cc9cacc.png";

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "./warrior-39d7246a94bd3c09959c9649a740eed9.png";

/***/ })
/******/ ]);