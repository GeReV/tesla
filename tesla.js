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

	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);

	(0, _domready2['default'])(function () {
	  var canvas = document.createElement('canvas');

	  canvas.id = 'canvas';

	  document.body.appendChild(canvas);

	  var tesla = new _jsTesla2['default'](canvas);
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

	var _lineJs = __webpack_require__(3);

	var _lineJs2 = _interopRequireDefault(_lineJs);

	var _lightningJs = __webpack_require__(5);

	var _lightningJs2 = _interopRequireDefault(_lightningJs);

	var TAO = Math.PI * 2;

	var randomRadius = 40;

	var Tesla = (function () {
	  function Tesla(canvas) {
	    _classCallCheck(this, Tesla);

	    this.canvas = canvas;
	    this.ctx = canvas.getContext('2d');

	    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
	    this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
	    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);

	    window.addEventListener('resize', this.resizeCanvas.bind(this), false);
	    this.resizeCanvas();

	    window.requestAnimationFrame(this.render.bind(this));
	  }

	  _createClass(Tesla, [{
	    key: 'render',
	    value: function render() {
	      var canvas = this.canvas,
	          ctx = this.ctx;

	      window.requestAnimationFrame(this.render.bind(this));

	      this.clear(ctx, canvas);

	      this.renderBall(ctx, canvas);

	      if (!this.mousedown) {
	        return;
	      }

	      ctx.save();

	      ctx.strokeStyle = '#fff';

	      var direction = Math.random() * TAO,
	          distance = Math.random() * randomRadius;

	      var lightning = new _lightningJs2['default'](canvas.width / 2, canvas.height / 2, Math.cos(direction) * distance + this.mouseX, Math.sin(direction) * distance + this.mouseY);

	      lightning.render(ctx);

	      ctx.restore();
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

	var _vectorJs = __webpack_require__(4);

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
/* 4 */
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

	      if (length == 0) {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _vectorJs = __webpack_require__(4);

	var _vectorJs2 = _interopRequireDefault(_vectorJs);

	var _lineJs = __webpack_require__(3);

	var _lineJs2 = _interopRequireDefault(_lineJs);

	var TAO = Math.PI * 2;

	var MIN_LENGTH = 5;

	var DISTANCE_FALLOFF = 0.4;
	var ANGLE_CONSTRAINT = TAO * 0.4;

	var Lightning = (function () {
	  function Lightning(x1, y1, x2, y2) {
	    _classCallCheck(this, Lightning);

	    var line = new _lineJs2['default'](x1, y1, x2, y2);

	    this.points = [line.point1, line.point2];

	    this.points = this.subdivide(this.points, line);
	  }

	  _createClass(Lightning, [{
	    key: 'render',
	    value: function render(ctx) {
	      ctx.save();
	      ctx.beginPath();

	      ctx.moveTo(this.points[0].x, this.points[0].y);

	      this.points.slice(1).forEach(function (p) {
	        ctx.lineTo(p.x, p.y);
	      });

	      ctx.stroke();

	      ctx.restore();
	    }
	  }, {
	    key: 'subdivide',
	    value: function subdivide(points, line) {
	      if (line.length() < MIN_LENGTH) {
	        return points;
	      }

	      var center = line.center();

	      var direction = line.direction() + (Math.random() - 0.5) * ANGLE_CONSTRAINT,
	          distance = line.length() * (Math.random() * DISTANCE_FALLOFF);

	      var offset = new _vectorJs2['default'](Math.cos(direction) * distance, Math.sin(direction) * distance);

	      points = [points[0], center.add(offset), points[1]];

	      var half1 = this.subdivide(points.slice(0, 2), new _lineJs2['default'](points[0].x, points[0].y, points[1].x, points[1].y));
	      var half2 = this.subdivide(points.slice(1, 3), new _lineJs2['default'](points[1].x, points[1].y, points[2].x, points[2].y));

	      return half1.concat(half2);
	    }
	  }]);

	  return Lightning;
	})();

	exports['default'] = Lightning;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css/normalize.css"

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "css/main.css"

/***/ }
/******/ ])
});
;