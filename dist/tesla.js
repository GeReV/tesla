(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tesla"] = factory();
	else
		root["tesla"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _domready = __webpack_require__(1);

	var _domready2 = _interopRequireDefault(_domready);

	var _jsTesla = __webpack_require__(2);

	var _jsTesla2 = _interopRequireDefault(_jsTesla);

	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);

	(0, _domready2['default'])(function () {
	  var canvas = document.createElement('canvas');

	  canvas.id = 'canvas';

	  document.body.appendChild(canvas);

	  var tesla = new _jsTesla2['default'](canvas);

	  console.log(tesla);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {

	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()

	}('domready', function () {

	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })

	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }

	});


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _lightningJs = __webpack_require__(3);

	var _lightningJs2 = _interopRequireDefault(_lightningJs);

	var _particle_systemJs = __webpack_require__(9);

	var _particle_systemJs2 = _interopRequireDefault(_particle_systemJs);

	var _hit_particleJs = __webpack_require__(10);

	var _hit_particleJs2 = _interopRequireDefault(_hit_particleJs);

	var TAO = Math.PI * 2;

	var Tesla = (function () {
	  function Tesla(canvas) {
	    _classCallCheck(this, Tesla);

	    this.lastTime = 0;

	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');

	    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
	    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
	    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);

	    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
	    this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
	    this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this), false);

	    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
	    this.resizeCanvas();

	    this.particles = new _particle_systemJs2['default'](_hit_particleJs2['default'], 1000);

	    this.loop();
	  }

	  _createClass(Tesla, [{
	    key: 'loop',
	    value: function loop() {
	      var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	      window.requestAnimationFrame(this.loop.bind(this));

	      this.render(time - this.lastTime);

	      this.lastTime = time;
	    }
	  }, {
	    key: 'render',
	    value: function render(dt) {
	      var canvas = this.canvas,
	          ctx = this.ctx;

	      this.clear(ctx, canvas);

	      if (this.mousedown) {
	        this.renderLightning(ctx);

	        this.renderHit();
	      }

	      ctx.save();
	      ctx.globalCompositeOperation = 'screen';

	      this.particles.update(dt);
	      this.particles.render(ctx);

	      ctx.restore();

	      this.renderBall(ctx, canvas);
	    }
	  }, {
	    key: 'renderLightning',
	    value: function renderLightning(ctx) {
	      var canvas = this.canvas;

	      var lightning = new _lightningJs2['default'](canvas.width / 2, canvas.height / 2, this.mouseX, this.mouseY);

	      lightning.render(ctx);
	    }
	  }, {
	    key: 'renderHit',
	    value: function renderHit() {
	      var particle = this.particles.getParticle();

	      var x = this.mouseX + (Math.random() - 0.5) * 10,
	          y = this.mouseY + (Math.random() - 0.5) * 10;

	      particle.setPosition(x, y);
	      particle.setRadius(10 + Math.random() * 5);
	    }
	  }, {
	    key: 'renderBall',
	    value: function renderBall(ctx, canvas) {
	      ctx.save();

	      ctx.fillStyle = '#fff';

	      ctx.beginPath();
	      ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, TAO);
	      ctx.closePath();

	      ctx.fill();

	      ctx.restore();
	    }
	  }, {
	    key: 'clear',
	    value: function clear(ctx, canvas) {
	      ctx.clearRect(0, 0, canvas.width, canvas.height);
	    }
	  }, {
	    key: 'resizeCanvas',
	    value: function resizeCanvas() {
	      this.canvas.width = window.innerWidth;
	      this.canvas.height = window.innerHeight;
	    }
	  }, {
	    key: 'handleMouseDown',
	    value: function handleMouseDown(e) {
	      this.mousedown = !!(e.buttons & 1);

	      this.setMousePosition(e);
	    }
	  }, {
	    key: 'handleMouseUp',
	    value: function handleMouseUp(e) {
	      this.mousedown = !!(e.buttons & 1);
	    }
	  }, {
	    key: 'handleMouseMove',
	    value: function handleMouseMove(e) {
	      this.setMousePosition(e);
	    }
	  }, {
	    key: 'handleTouchStart',
	    value: function handleTouchStart(e) {
	      this.mousedown = !!e.changedTouches.length;
	    }
	  }, {
	    key: 'handleTouchEnd',
	    value: function handleTouchEnd(e) {
	      this.mousedown = e.changedTouches.length === 0;
	    }
	  }, {
	    key: 'handleTouchMove',
	    value: function handleTouchMove(e) {
	      // TODO: Handle multi-touch.
	      this.setMousePosition(e.changedTouches[0]);
	    }
	  }, {
	    key: 'setMousePosition',
	    value: function setMousePosition(e) {
	      this.mouseX = e.pageX;
	      this.mouseY = e.pageY;
	    }
	  }]);

	  return Tesla;
	})();

	exports['default'] = Tesla;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _extend = __webpack_require__(4);

	var _extend2 = _interopRequireDefault(_extend);

	var _lerp = __webpack_require__(5);

	var _lerp2 = _interopRequireDefault(_lerp);

	var _d3Color = __webpack_require__(6);

	var _vectorJs = __webpack_require__(7);

	var _vectorJs2 = _interopRequireDefault(_vectorJs);

	var _lineJs = __webpack_require__(8);

	var _lineJs2 = _interopRequireDefault(_lineJs);

	var TAO = Math.PI * 2;

	var defaults = {
	  minSegmentLength: 10,
	  distanceFalloff: 0.4,
	  angleConstraint: TAO * 0.4,
	  lineStartSize: 1.4,
	  lineEndSize: 0.8,
	  lineStartColor: '#fbf2ff',
	  lineEndColor: '#dea1ea',
	  lineStartOpacity: 1,
	  lineEndOpacity: 0.2,
	  glowColor: '#d471e8',
	  glowBlur: 5,
	  hitRadius: 10,
	  forkProbability: 0.02,
	  forkLength: 150
	};

	var Lightning = (function () {
	  function Lightning(x1, y1, x2, y2, options) {
	    _classCallCheck(this, Lightning);

	    this.options = (0, _extend2['default'])({}, defaults, options || {});

	    var distance = Math.random() * this.options.hitRadius,
	        direction = Math.random() * TAO;

	    x2 += Math.cos(direction) * distance;
	    y2 += Math.sin(direction) * distance;

	    var line = new _lineJs2['default'](x1, y1, x2, y2);

	    this.points = [line.point1, line.point2];

	    this.points = this.subdivide(this.points, line);

	    this.colorFn = (0, _d3Color.interpolateLab)(this.options.lineStartColor, this.options.lineEndColor);
	    this.sizeFn = _lerp2['default'].bind(this, this.options.lineStartSize, this.options.lineEndSize);
	    this.opacityFn = _lerp2['default'].bind(this, this.options.lineStartOpacity, this.options.lineEndOpacity);

	    this.forks = this.createForks();
	  }

	  _createClass(Lightning, [{
	    key: 'render',
	    value: function render(ctx) {
	      var _this = this;

	      ctx.save();
	      ctx.beginPath();

	      ctx.moveTo(this.points[0].x, this.points[0].y);

	      ctx.shadowBlur = this.options.glowBlur;
	      ctx.shadowColor = this.options.glowColor;

	      var pointCount = this.points.length;

	      this.points.slice(1).forEach(function (p, i) {
	        var t = i / pointCount;

	        ctx.globalAlpha = _this.opacityFn(t);
	        ctx.lineWidth = _this.sizeFn(t);
	        ctx.strokeStyle = _this.colorFn(t);

	        ctx.lineTo(p.x, p.y);

	        ctx.stroke();

	        ctx.beginPath();

	        ctx.moveTo(p.x, p.y);
	      });

	      ctx.restore();

	      this.forks.forEach(function (l) {
	        return l.render(ctx);
	      });
	    }
	  }, {
	    key: 'subdivide',
	    value: function subdivide(points, line) {
	      var lineLength = line.length();

	      if (lineLength < this.options.minSegmentLength) {
	        return points;
	      }

	      var center = line.center();

	      var direction = line.direction() + (Math.random() - 0.5) * this.options.angleConstraint,
	          distance = lineLength * (0.1 + Math.random() * 0.9) * this.options.distanceFalloff;

	      var offset = new _vectorJs2['default'](Math.cos(direction) * distance, Math.sin(direction) * distance);

	      points = [points[0], center.add(offset), points[1]];

	      var half1 = this.subdivide(points.slice(0, 2), new _lineJs2['default'](points[0].x, points[0].y, points[1].x, points[1].y));
	      var half2 = this.subdivide(points.slice(1, 3), new _lineJs2['default'](points[1].x, points[1].y, points[2].x, points[2].y));

	      return half1.concat(half2.slice(1)); // half2's first point is the same as half1'x last point, we don't want that duplication.
	    }
	  }, {
	    key: 'createForks',
	    value: function createForks() {
	      var _this2 = this;

	      var forks = [];

	      if (this.options.forkProbability === null) {
	        return forks;
	      }

	      this.points.slice(1).forEach(function (p, i) {
	        if (Math.random() > _this2.options.forkProbability) {
	          return;
	        }

	        var t = i / _this2.points.length;

	        var currentDirection = _this2.points[i] // i already points to the previous point, no need to subtract.
	        .subtract(p).direction();

	        var distance = _this2.options.forkLength * 0.2 + Math.random() * _this2.options.forkLength * 0.8,
	            direction = currentDirection + (Math.random() - 0.5) * _this2.options.angleConstraint;

	        var x2 = p.x + Math.cos(direction) * distance,
	            y2 = p.y + Math.sin(direction) * distance;

	        forks.push(new Lightning(p.x, p.y, x2, y2, {
	          lineStartSize: _this2.sizeFn(t),
	          lineStartColor: _this2.colorFn(t),
	          lineStartOpacity: _this2.opacityFn(t),
	          lineEndSize: 0,
	          glowBlur: _this2.options.glowBlur * 0.8,
	          forkProbability: null
	        }));
	      });

	      return forks;
	    }
	  }]);

	  return Lightning;
	})();

	exports['default'] = Lightning;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ },
/* 5 */
/***/ function(module, exports) {

	function lerp(v0, v1, t) {
	    return v0*(1-t)+v1*t
	}
	module.exports = lerp

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	if (typeof Map === "undefined") {
	  Map = function() { this.clear(); };
	  Map.prototype = {
	    set: function(k, v) { this._[k] = v; return this; },
	    get: function(k) { return this._[k]; },
	    has: function(k) { return k in this._; },
	    delete: function(k) { return k in this._ && delete this._[k]; },
	    clear: function() { this._ = Object.create(null); },
	    get size() { var n = 0; for (var k in this._) ++n; return n; },
	    forEach: function(c) { for (var k in this._) c(this._[k], k, this); }
	  };
	} else (function() {
	  var m = new Map;
	  if (m.set(0, 0) !== m) {
	    m = m.set;
	    Map.prototype.set = function() { m.apply(this, arguments); return this; };
	  }
	})();

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  factory((global.color = {}));
	}(this, function (exports) { 'use strict';

	  function deltaHue(h1, h0) {
	    var delta = h1 - h0;
	    return delta > 180 || delta < -180
	        ? delta - 360 * Math.round(delta / 360)
	        : delta;
	  }

	  function Color() {}

	  var reHex3 = /^#([0-9a-f]{3})$/;
	  var reHex6 = /^#([0-9a-f]{6})$/;
	  var reRgbInteger = /^rgb\(\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*,\s*([-+]?\d+)\s*\)$/;
	  var reRgbPercent = /^rgb\(\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;
	  var reHslPercent = /^hsl\(\s*([-+]?\d+(?:\.\d+)?)\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*,\s*([-+]?\d+(?:\.\d+)?)%\s*\)$/;

	  color.prototype = Color.prototype = {
	    displayable: function() {
	      return this.rgb().displayable();
	    },
	    toString: function() {
	      return this.rgb() + "";
	    }
	  };

	  function color(format) {
	    var m;
	    format = (format + "").trim().toLowerCase();
	    return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf))) // #f00
	        : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
	        : (m = reRgbInteger.exec(format)) ? rgb(m[1], m[2], m[3]) // rgb(255,0,0)
	        : (m = reRgbPercent.exec(format)) ? rgb(m[1] * 2.55, m[2] * 2.55, m[3] * 2.55) // rgb(100%,0%,0%)
	        : (m = reHslPercent.exec(format)) ? hsl(m[1], m[2] * .01, m[3] * .01) // hsl(120,50%,50%)
	        : named.has(format) ? rgbn(named.get(format))
	        : null;
	  }

	  function rgbn(n) {
	    return rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff);
	  }

	  var named = (new Map)
	      .set("aliceblue", 0xf0f8ff)
	      .set("antiquewhite", 0xfaebd7)
	      .set("aqua", 0x00ffff)
	      .set("aquamarine", 0x7fffd4)
	      .set("azure", 0xf0ffff)
	      .set("beige", 0xf5f5dc)
	      .set("bisque", 0xffe4c4)
	      .set("black", 0x000000)
	      .set("blanchedalmond", 0xffebcd)
	      .set("blue", 0x0000ff)
	      .set("blueviolet", 0x8a2be2)
	      .set("brown", 0xa52a2a)
	      .set("burlywood", 0xdeb887)
	      .set("cadetblue", 0x5f9ea0)
	      .set("chartreuse", 0x7fff00)
	      .set("chocolate", 0xd2691e)
	      .set("coral", 0xff7f50)
	      .set("cornflowerblue", 0x6495ed)
	      .set("cornsilk", 0xfff8dc)
	      .set("crimson", 0xdc143c)
	      .set("cyan", 0x00ffff)
	      .set("darkblue", 0x00008b)
	      .set("darkcyan", 0x008b8b)
	      .set("darkgoldenrod", 0xb8860b)
	      .set("darkgray", 0xa9a9a9)
	      .set("darkgreen", 0x006400)
	      .set("darkgrey", 0xa9a9a9)
	      .set("darkkhaki", 0xbdb76b)
	      .set("darkmagenta", 0x8b008b)
	      .set("darkolivegreen", 0x556b2f)
	      .set("darkorange", 0xff8c00)
	      .set("darkorchid", 0x9932cc)
	      .set("darkred", 0x8b0000)
	      .set("darksalmon", 0xe9967a)
	      .set("darkseagreen", 0x8fbc8f)
	      .set("darkslateblue", 0x483d8b)
	      .set("darkslategray", 0x2f4f4f)
	      .set("darkslategrey", 0x2f4f4f)
	      .set("darkturquoise", 0x00ced1)
	      .set("darkviolet", 0x9400d3)
	      .set("deeppink", 0xff1493)
	      .set("deepskyblue", 0x00bfff)
	      .set("dimgray", 0x696969)
	      .set("dimgrey", 0x696969)
	      .set("dodgerblue", 0x1e90ff)
	      .set("firebrick", 0xb22222)
	      .set("floralwhite", 0xfffaf0)
	      .set("forestgreen", 0x228b22)
	      .set("fuchsia", 0xff00ff)
	      .set("gainsboro", 0xdcdcdc)
	      .set("ghostwhite", 0xf8f8ff)
	      .set("gold", 0xffd700)
	      .set("goldenrod", 0xdaa520)
	      .set("gray", 0x808080)
	      .set("green", 0x008000)
	      .set("greenyellow", 0xadff2f)
	      .set("grey", 0x808080)
	      .set("honeydew", 0xf0fff0)
	      .set("hotpink", 0xff69b4)
	      .set("indianred", 0xcd5c5c)
	      .set("indigo", 0x4b0082)
	      .set("ivory", 0xfffff0)
	      .set("khaki", 0xf0e68c)
	      .set("lavender", 0xe6e6fa)
	      .set("lavenderblush", 0xfff0f5)
	      .set("lawngreen", 0x7cfc00)
	      .set("lemonchiffon", 0xfffacd)
	      .set("lightblue", 0xadd8e6)
	      .set("lightcoral", 0xf08080)
	      .set("lightcyan", 0xe0ffff)
	      .set("lightgoldenrodyellow", 0xfafad2)
	      .set("lightgray", 0xd3d3d3)
	      .set("lightgreen", 0x90ee90)
	      .set("lightgrey", 0xd3d3d3)
	      .set("lightpink", 0xffb6c1)
	      .set("lightsalmon", 0xffa07a)
	      .set("lightseagreen", 0x20b2aa)
	      .set("lightskyblue", 0x87cefa)
	      .set("lightslategray", 0x778899)
	      .set("lightslategrey", 0x778899)
	      .set("lightsteelblue", 0xb0c4de)
	      .set("lightyellow", 0xffffe0)
	      .set("lime", 0x00ff00)
	      .set("limegreen", 0x32cd32)
	      .set("linen", 0xfaf0e6)
	      .set("magenta", 0xff00ff)
	      .set("maroon", 0x800000)
	      .set("mediumaquamarine", 0x66cdaa)
	      .set("mediumblue", 0x0000cd)
	      .set("mediumorchid", 0xba55d3)
	      .set("mediumpurple", 0x9370db)
	      .set("mediumseagreen", 0x3cb371)
	      .set("mediumslateblue", 0x7b68ee)
	      .set("mediumspringgreen", 0x00fa9a)
	      .set("mediumturquoise", 0x48d1cc)
	      .set("mediumvioletred", 0xc71585)
	      .set("midnightblue", 0x191970)
	      .set("mintcream", 0xf5fffa)
	      .set("mistyrose", 0xffe4e1)
	      .set("moccasin", 0xffe4b5)
	      .set("navajowhite", 0xffdead)
	      .set("navy", 0x000080)
	      .set("oldlace", 0xfdf5e6)
	      .set("olive", 0x808000)
	      .set("olivedrab", 0x6b8e23)
	      .set("orange", 0xffa500)
	      .set("orangered", 0xff4500)
	      .set("orchid", 0xda70d6)
	      .set("palegoldenrod", 0xeee8aa)
	      .set("palegreen", 0x98fb98)
	      .set("paleturquoise", 0xafeeee)
	      .set("palevioletred", 0xdb7093)
	      .set("papayawhip", 0xffefd5)
	      .set("peachpuff", 0xffdab9)
	      .set("peru", 0xcd853f)
	      .set("pink", 0xffc0cb)
	      .set("plum", 0xdda0dd)
	      .set("powderblue", 0xb0e0e6)
	      .set("purple", 0x800080)
	      .set("rebeccapurple", 0x663399)
	      .set("red", 0xff0000)
	      .set("rosybrown", 0xbc8f8f)
	      .set("royalblue", 0x4169e1)
	      .set("saddlebrown", 0x8b4513)
	      .set("salmon", 0xfa8072)
	      .set("sandybrown", 0xf4a460)
	      .set("seagreen", 0x2e8b57)
	      .set("seashell", 0xfff5ee)
	      .set("sienna", 0xa0522d)
	      .set("silver", 0xc0c0c0)
	      .set("skyblue", 0x87ceeb)
	      .set("slateblue", 0x6a5acd)
	      .set("slategray", 0x708090)
	      .set("slategrey", 0x708090)
	      .set("snow", 0xfffafa)
	      .set("springgreen", 0x00ff7f)
	      .set("steelblue", 0x4682b4)
	      .set("tan", 0xd2b48c)
	      .set("teal", 0x008080)
	      .set("thistle", 0xd8bfd8)
	      .set("tomato", 0xff6347)
	      .set("turquoise", 0x40e0d0)
	      .set("violet", 0xee82ee)
	      .set("wheat", 0xf5deb3)
	      .set("white", 0xffffff)
	      .set("whitesmoke", 0xf5f5f5)
	      .set("yellow", 0xffff00)
	      .set("yellowgreen", 0x9acd32);

	  var darker = .7;
	  var brighter = 1 / darker;

	  function rgb(r, g, b) {
	    if (arguments.length === 1) {
	      if (!(r instanceof Color)) r = color(r);
	      if (r) {
	        r = r.rgb();
	        b = r.b;
	        g = r.g;
	        r = r.r;
	      } else {
	        r = g = b = NaN;
	      }
	    }
	    return new Rgb(r, g, b);
	  }

	  function Rgb(r, g, b) {
	    this.r = +r;
	    this.g = +g;
	    this.b = +b;
	  }

	  var _prototype = rgb.prototype = Rgb.prototype = new Color;

	  _prototype.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k);
	  };

	  _prototype.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Rgb(this.r * k, this.g * k, this.b * k);
	  };

	  _prototype.rgb = function() {
	    return this;
	  };

	  _prototype.displayable = function() {
	    return (0 <= this.r && this.r <= 255)
	        && (0 <= this.g && this.g <= 255)
	        && (0 <= this.b && this.b <= 255);
	  };

	  _prototype.toString = function() {
	    return format(this.r, this.g, this.b);
	  };

	  function format(r, g, b) {
	    return "#"
	        + (isNaN(r) ? "00" : (r = Math.round(r)) < 16 ? "0" + Math.max(0, r).toString(16) : Math.min(255, r).toString(16))
	        + (isNaN(g) ? "00" : (g = Math.round(g)) < 16 ? "0" + Math.max(0, g).toString(16) : Math.min(255, g).toString(16))
	        + (isNaN(b) ? "00" : (b = Math.round(b)) < 16 ? "0" + Math.max(0, b).toString(16) : Math.min(255, b).toString(16));
	  }

	  function hsl(h, s, l) {
	    if (arguments.length === 1) {
	      if (h instanceof Hsl) {
	        l = h.l;
	        s = h.s;
	        h = h.h;
	      } else {
	        if (!(h instanceof Color)) h = color(h);
	        if (h) {
	          if (h instanceof Hsl) return h;
	          h = h.rgb();
	          var r = h.r / 255,
	              g = h.g / 255,
	              b = h.b / 255,
	              min = Math.min(r, g, b),
	              max = Math.max(r, g, b),
	              range = max - min;
	          l = (max + min) / 2;
	          if (range) {
	            s = l < .5 ? range / (max + min) : range / (2 - max - min);
	            if (r === max) h = (g - b) / range + (g < b) * 6;
	            else if (g === max) h = (b - r) / range + 2;
	            else h = (r - g) / range + 4;
	            h *= 60;
	          } else {
	            h = NaN;
	            s = l > 0 && l < 1 ? 0 : h;
	          }
	        } else {
	          h = s = l = NaN;
	        }
	      }
	    }
	    return new Hsl(h, s, l);
	  }

	  function Hsl(h, s, l) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	  }

	  var __prototype = hsl.prototype = Hsl.prototype = new Color;

	  __prototype.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Hsl(this.h, this.s, this.l * k);
	  };

	  __prototype.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Hsl(this.h, this.s, this.l * k);
	  };

	  __prototype.rgb = function() {
	    var h = this.h % 360 + (this.h < 0) * 360,
	        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
	        l = this.l,
	        m2 = l + (l < .5 ? l : 1 - l) * s,
	        m1 = 2 * l - m2;
	    return new Rgb(
	      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
	      hsl2rgb(h, m1, m2),
	      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2)
	    );
	  };

	  __prototype.displayable = function() {
	    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
	        && (0 <= this.l && this.l <= 1);
	  };

	  /* From FvD 13.37, CSS Color Module Level 3 */
	  function hsl2rgb(h, m1, m2) {
	    return (h < 60 ? m1 + (m2 - m1) * h / 60
	        : h < 180 ? m2
	        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
	        : m1) * 255;
	  }

	  var Kn = 18;

	  var Xn = 0.950470;
	  var Yn = 1;
	  var Zn = 1.088830;
	  var t0 = 4 / 29;
	  var t1 = 6 / 29;
	  var t2 = 3 * t1 * t1;
	  var t3 = t1 * t1 * t1;

	  function lab(l, a, b) {
	    if (arguments.length === 1) {
	      if (l instanceof Lab) {
	        b = l.b;
	        a = l.a;
	        l = l.l;
	      } else if (l instanceof Hcl) {
	        var h = l.h * deg2rad;
	        b = Math.sin(h) * l.c;
	        a = Math.cos(h) * l.c;
	        l = l.l;
	      } else {
	        if (!(l instanceof Rgb)) l = rgb(l);
	        var r = rgb2xyz(l.r),
	            g = rgb2xyz(l.g),
	            b = rgb2xyz(l.b),
	            x = xyz2lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / Xn),
	            y = xyz2lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / Yn),
	            z = xyz2lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / Zn);
	        b = 200 * (y - z);
	        a = 500 * (x - y);
	        l = 116 * y - 16;
	      }
	    }
	    return new Lab(l, a, b);
	  }

	  function Lab(l, a, b) {
	    this.l = +l;
	    this.a = +a;
	    this.b = +b;
	  }

	  var ___prototype = lab.prototype = Lab.prototype = new Color;

	  ___prototype.brighter = function(k) {
	    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b);
	  };

	  ___prototype.darker = function(k) {
	    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b);
	  };

	  ___prototype.rgb = function() {
	    var y = (this.l + 16) / 116,
	        x = isNaN(this.a) ? y : y + this.a / 500,
	        z = isNaN(this.b) ? y : y - this.b / 200;
	    y = Yn * lab2xyz(y);
	    x = Xn * lab2xyz(x);
	    z = Zn * lab2xyz(z);
	    return new Rgb(
	      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
	      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
	      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z)
	    );
	  };

	  function xyz2lab(t) {
	    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
	  }

	  function lab2xyz(t) {
	    return t > t1 ? t * t * t : t2 * (t - t0);
	  }

	  function xyz2rgb(x) {
	    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
	  }

	  function rgb2xyz(x) {
	    return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
	  }

	  var deg2rad = Math.PI / 180;
	  var rad2deg = 180 / Math.PI;

	  function hcl(h, c, l) {
	    if (arguments.length === 1) {
	      if (h instanceof Hcl) {
	        l = h.l;
	        c = h.c;
	        h = h.h;
	      } else {
	        if (!(h instanceof Lab)) h = lab(h);
	        l = h.l;
	        c = Math.sqrt(h.a * h.a + h.b * h.b);
	        h = Math.atan2(h.b, h.a) * rad2deg;
	        if (h < 0) h += 360;
	      }
	    }
	    return new Hcl(h, c, l);
	  }

	  function Hcl(h, c, l) {
	    this.h = +h;
	    this.c = +c;
	    this.l = +l;
	  }

	  var ____prototype = hcl.prototype = Hcl.prototype = new Color;

	  ____prototype.brighter = function(k) {
	    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k));
	  };

	  ____prototype.darker = function(k) {
	    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k));
	  };

	  ____prototype.rgb = function() {
	    return lab(this).rgb();
	  };

	  var A = -0.14861;
	  var B = +1.78277;
	  var C = -0.29227;
	  var D = -0.90649;
	  var E = +1.97294;
	  var ED = E * D;
	  var EB = E * B;
	  var BC_DA = B * C - D * A;

	  function cubehelix(h, s, l) {
	    if (arguments.length === 1) {
	      if (h instanceof Cubehelix) {
	        l = h.l;
	        s = h.s;
	        h = h.h;
	      } else {
	        if (!(h instanceof Rgb)) h = rgb(h);
	        var r = h.r / 255, g = h.g / 255, b = h.b / 255;
	        l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB);
	        var bl = b - l, k = (E * (g - l) - C * bl) / D;
	        s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)); // NaN if l=0 or l=1
	        h = s ? Math.atan2(k, bl) * rad2deg - 120 : NaN;
	        if (h < 0) h += 360;
	      }
	    }
	    return new Cubehelix(h, s, l);
	  }

	  function Cubehelix(h, s, l) {
	    this.h = +h;
	    this.s = +s;
	    this.l = +l;
	  }

	  var prototype = cubehelix.prototype = Cubehelix.prototype = new Color;

	  prototype.brighter = function(k) {
	    k = k == null ? brighter : Math.pow(brighter, k);
	    return new Cubehelix(this.h, this.s, this.l * k);
	  };

	  prototype.darker = function(k) {
	    k = k == null ? darker : Math.pow(darker, k);
	    return new Cubehelix(this.h, this.s, this.l * k);
	  };

	  prototype.rgb = function() {
	    var h = isNaN(this.h) ? 0 : (this.h + 120) * deg2rad,
	        l = +this.l,
	        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
	        cosh = Math.cos(h),
	        sinh = Math.sin(h);
	    return new Rgb(
	      255 * (l + a * (A * cosh + B * sinh)),
	      255 * (l + a * (C * cosh + D * sinh)),
	      255 * (l + a * (E * cosh))
	    );
	  };

	  function interpolateCubehelixGamma(gamma) {
	    return function(a, b) {
	      a = cubehelix(a);
	      b = cubehelix(b);
	      var ah = isNaN(a.h) ? b.h : a.h,
	          as = isNaN(a.s) ? b.s : a.s,
	          al = a.l,
	          bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
	          bs = isNaN(b.s) ? 0 : b.s - as,
	          bl = b.l - al;
	      return function(t) {
	        a.h = ah + bh * t;
	        a.s = as + bs * t;
	        a.l = al + bl * Math.pow(t, gamma);
	        return a + "";
	      };
	    };
	  }

	  function interpolateCubehelixGammaLong(gamma) {
	    return function(a, b) {
	      a = cubehelix(a);
	      b = cubehelix(b);
	      var ah = isNaN(a.h) ? b.h : a.h,
	          as = isNaN(a.s) ? b.s : a.s,
	          al = a.l,
	          bh = isNaN(b.h) ? 0 : b.h - ah,
	          bs = isNaN(b.s) ? 0 : b.s - as,
	          bl = b.l - al;
	      return function(t) {
	        a.h = ah + bh * t;
	        a.s = as + bs * t;
	        a.l = al + bl * Math.pow(t, gamma);
	        return a + "";
	      };
	    };
	  }

	  function interpolateHclLong(a, b) {
	    a = hcl(a);
	    b = hcl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        ac = isNaN(a.c) ? b.c : a.c,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : b.h - ah,
	        bc = isNaN(b.c) ? 0 : b.c - ac,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.c = ac + bc * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  }

	  function interpolateHcl(a, b) {
	    a = hcl(a);
	    b = hcl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        ac = isNaN(a.c) ? b.c : a.c,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
	        bc = isNaN(b.c) ? 0 : b.c - ac,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.c = ac + bc * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  }

	  function interpolateLab(a, b) {
	    a = lab(a);
	    b = lab(b);
	    var al = a.l,
	        aa = a.a,
	        ab = a.b,
	        bl = b.l - al,
	        ba = b.a - aa,
	        bb = b.b - ab;
	    return function(t) {
	      a.l = al + bl * t;
	      a.a = aa + ba * t;
	      a.b = ab + bb * t;
	      return a + "";
	    };
	  }

	  function interpolateHslLong(a, b) {
	    a = hsl(a);
	    b = hsl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        as = isNaN(a.s) ? b.s : a.s,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : b.h - ah,
	        bs = isNaN(b.s) ? 0 : b.s - as,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.s = as + bs * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  }

	  function interpolateHsl(a, b) {
	    a = hsl(a);
	    b = hsl(b);
	    var ah = isNaN(a.h) ? b.h : a.h,
	        as = isNaN(a.s) ? b.s : a.s,
	        al = a.l,
	        bh = isNaN(b.h) ? 0 : deltaHue(b.h, ah),
	        bs = isNaN(b.s) ? 0 : b.s - as,
	        bl = b.l - al;
	    return function(t) {
	      a.h = ah + bh * t;
	      a.s = as + bs * t;
	      a.l = al + bl * t;
	      return a + "";
	    };
	  }

	  function interpolateRgb(a, b) {
	    a = rgb(a);
	    b = rgb(b);
	    var ar = a.r,
	        ag = a.g,
	        ab = a.b,
	        br = b.r - ar,
	        bg = b.g - ag,
	        bb = b.b - ab;
	    return function(t) {
	      return format(Math.round(ar + br * t), Math.round(ag + bg * t), Math.round(ab + bb * t));
	    };
	  }

	  exports.interpolateCubehelix = interpolateCubehelixGamma(1);
	  exports.interpolateCubehelixLong = interpolateCubehelixGammaLong(1);

	  exports.color = color;
	  exports.rgb = rgb;
	  exports.hsl = hsl;
	  exports.lab = lab;
	  exports.hcl = hcl;
	  exports.cubehelix = cubehelix;
	  exports.interpolateRgb = interpolateRgb;
	  exports.interpolateHsl = interpolateHsl;
	  exports.interpolateHslLong = interpolateHslLong;
	  exports.interpolateLab = interpolateLab;
	  exports.interpolateHcl = interpolateHcl;
	  exports.interpolateHclLong = interpolateHclLong;
	  exports.interpolateCubehelixGamma = interpolateCubehelixGamma;
	  exports.interpolateCubehelixGammaLong = interpolateCubehelixGammaLong;

	}));

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector = (function () {
	  _createClass(Vector, null, [{
	    key: "zero",
	    value: function zero() {
	      return new Vector(0, 0);
	    }
	  }]);

	  function Vector(x, y) {
	    _classCallCheck(this, Vector);

	    this.x = +x;
	    this.y = +y;
	  }

	  _createClass(Vector, [{
	    key: "length",
	    value: function length() {
	      return Math.sqrt(this.x * this.x + this.y * this.y);
	    }
	  }, {
	    key: "direction",
	    value: function direction() {
	      if (this.x === 0) {
	        if (this.y > 0) {
	          return TAO * 0.25;
	        } else if (this.y < 0) {
	          return TAO * 0.75;
	        }
	      }

	      return Math.atan(this.y / this.x);
	    }
	  }, {
	    key: "normalize",
	    value: function normalize() {
	      var length = this.length();

	      if (length === 0) {
	        return Vector.zero();
	      }

	      return new Vector(this.x / length, this.y / length);
	    }
	  }, {
	    key: "add",
	    value: function add(other) {
	      return new Vector(this.x + other.x, this.y + other.y);
	    }
	  }, {
	    key: "subtract",
	    value: function subtract(other) {
	      return this.add(other.flip());
	    }
	  }, {
	    key: "multiply",
	    value: function multiply(other) {
	      other = +other;

	      return new Vector(this.x * other, this.y * other);
	    }
	  }, {
	    key: "dot",
	    value: function dot(other) {
	      return this.x * other.x + this.y * other.y;
	    }
	  }, {
	    key: "flip",
	    value: function flip() {
	      return this.multiply(-1);
	    }
	  }]);

	  return Vector;
	})();

	exports["default"] = Vector;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _vectorJs = __webpack_require__(7);

	var _vectorJs2 = _interopRequireDefault(_vectorJs);

	var Line = (function () {
	  function Line(x1, y1, x2, y2) {
	    _classCallCheck(this, Line);

	    this.point1 = new _vectorJs2['default'](x1, y1);
	    this.point2 = new _vectorJs2['default'](x2, y2);
	  }

	  _createClass(Line, [{
	    key: 'asVector',
	    value: function asVector() {
	      return this.point2.subtract(this.point1);
	    }
	  }, {
	    key: 'center',
	    value: function center() {
	      return this.asVector().multiply(0.5).add(this.point1);
	    }
	  }, {
	    key: 'length',
	    value: function length() {
	      return this.asVector().length();
	    }
	  }, {
	    key: 'direction',
	    value: function direction() {
	      return this.asVector().direction();
	    }
	  }]);

	  return Line;
	})();

	exports['default'] = Line;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ParticleSystem = (function () {
	  function ParticleSystem(clazz) {
	    var lifespan = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	    _classCallCheck(this, ParticleSystem);

	    this.ParticleClass = clazz;

	    this.particles = [];
	    this.deadPool = [];

	    this.particleLifespan = lifespan;
	  }

	  _createClass(ParticleSystem, [{
	    key: "getParticle",
	    value: function getParticle() {
	      var particle = this.deadPool.length ? this.deadPool.shift() : new this.ParticleClass(0, 0, this.particleLifespan);

	      particle.reset();

	      this.particles.push(particle);

	      return particle;
	    }
	  }, {
	    key: "update",
	    value: function update(dt) {
	      this.particles.forEach(function (p) {
	        return p.update(dt);
	      });

	      while (this.particles.length && this.particles[0].isDead()) {
	        var deadParticle = this.particles.shift();

	        this.deadPool.push(deadParticle);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render(ctx) {
	      this.particles.forEach(function (p) {
	        return p.render(ctx);
	      });
	    }
	  }]);

	  return ParticleSystem;
	})();

	exports["default"] = ParticleSystem;
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _particleJs = __webpack_require__(11);

	var _particleJs2 = _interopRequireDefault(_particleJs);

	var radius = 15;

	var HitParticle = (function (_Particle) {
	  _inherits(HitParticle, _Particle);

	  function HitParticle(x, y, lifespan) {
	    _classCallCheck(this, HitParticle);

	    _get(Object.getPrototypeOf(HitParticle.prototype), 'constructor', this).call(this, x, y, lifespan);

	    this.setRadius(radius);
	  }

	  _createClass(HitParticle, [{
	    key: 'render',
	    value: function render(ctx) {
	      if (this.isDead()) {
	        return;
	      }

	      var gradient = ctx.createRadialGradient(this.position.x, this.position.y, this.radius, this.position.x, this.position.y, 0);

	      gradient.addColorStop(0, 'transparent');
	      gradient.addColorStop(1, '#bbbaff');

	      ctx.save();

	      ctx.globalAlpha = (this.lifespan - this.age) / this.lifespan;

	      ctx.fillStyle = gradient;
	      ctx.fillRect(this.position.x - this.radius, this.position.y - this.radius, this.position.x + this.radius, this.position.y + this.radius);

	      ctx.restore();
	    }
	  }, {
	    key: 'setRadius',
	    value: function setRadius(r) {
	      this.radius = r;
	    }
	  }]);

	  return HitParticle;
	})(_particleJs2['default']);

	exports['default'] = HitParticle;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _vectorJs = __webpack_require__(7);

	var _vectorJs2 = _interopRequireDefault(_vectorJs);

	var TAO = Math.PI * 2;

	var Particle = (function () {
	  function Particle() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var lifespan = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	    _classCallCheck(this, Particle);

	    this.position = new _vectorJs2['default'](x, y);

	    this.lifespan = lifespan;

	    this.reset();
	  }

	  _createClass(Particle, [{
	    key: 'reset',
	    value: function reset() {
	      this.age = 0;
	    }
	  }, {
	    key: 'update',
	    value: function update(dt) {
	      this.age += dt;
	    }
	  }, {
	    key: 'render',
	    value: function render(ctx) {
	      if (this.isDead()) {
	        return;
	      }

	      ctx.save();

	      ctx.fillStyle = '#fff';

	      ctx.beginPath();
	      ctx.arc(this.position.x, this.position.y, 1, 0, TAO);
	      ctx.closePath();

	      ctx.fill();

	      ctx.restore();
	    }
	  }, {
	    key: 'isDead',
	    value: function isDead() {
	      return typeof this.lifespan === 'number' && this.age >= this.lifespan;
	    }
	  }, {
	    key: 'setPosition',
	    value: function setPosition(x, y) {
	      this.position.x = x;
	      this.position.y = y;
	    }
	  }]);

	  return Particle;
	})();

	exports['default'] = Particle;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css/normalize.css"

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css/main.css"

/***/ }
/******/ ])
});
;