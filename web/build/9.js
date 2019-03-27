webpackJsonp([9],{

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuizPageModule", function() { return QuizPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quiz__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_svg_round_progressbar__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_svg_round_progressbar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular_svg_round_progressbar__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var QuizPageModule = /** @class */ (function () {
    function QuizPageModule() {
    }
    QuizPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__quiz__["a" /* QuizPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__quiz__["a" /* QuizPage */]),
                __WEBPACK_IMPORTED_MODULE_3_angular_svg_round_progressbar__["RoundProgressModule"]
            ],
        })
    ], QuizPageModule);
    return QuizPageModule;
}());

//# sourceMappingURL=quiz.module.js.map

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(43);
var DEGREE_IN_RADIANS = Math.PI / 180;
var RoundProgressService = /** @class */ (function () {
    function RoundProgressService(document) {
        this.supportsSvg = !!(document &&
            document.createElementNS &&
            document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
        this._base = document && document.head.querySelector('base');
        this._hasPerf = typeof window !== 'undefined' &&
            window.performance &&
            window.performance.now &&
            typeof window.performance.now() === 'number';
    }
    /**
     * Resolves a SVG color against the page's `base` tag.
     */
    /**
       * Resolves a SVG color against the page's `base` tag.
       */
    RoundProgressService.prototype.resolveColor = /**
       * Resolves a SVG color against the page's `base` tag.
       */
    function (color) {
        if (this._base && this._base.href) {
            var hashIndex = color.indexOf('#');
            if (hashIndex > -1 && color.indexOf('url') > -1) {
                return color.slice(0, hashIndex) + location.href + color.slice(hashIndex);
            }
        }
        return color;
    };
    /**
     * Generates a timestamp.
     */
    /**
       * Generates a timestamp.
       */
    RoundProgressService.prototype.getTimestamp = /**
       * Generates a timestamp.
       */
    function () {
        return this._hasPerf ? window.performance.now() : Date.now();
    };
    /**
     * Generates the value for an SVG arc.
     * @param current       Current value.
     * @param total         Maximum value.
     * @param pathRadius    Radius of the SVG path.
     * @param elementRadius Radius of the SVG container.
     * @param isSemicircle  Whether the element should be a semicircle.
     */
    /**
       * Generates the value for an SVG arc.
       * @param current       Current value.
       * @param total         Maximum value.
       * @param pathRadius    Radius of the SVG path.
       * @param elementRadius Radius of the SVG container.
       * @param isSemicircle  Whether the element should be a semicircle.
       */
    RoundProgressService.prototype.getArc = /**
       * Generates the value for an SVG arc.
       * @param current       Current value.
       * @param total         Maximum value.
       * @param pathRadius    Radius of the SVG path.
       * @param elementRadius Radius of the SVG container.
       * @param isSemicircle  Whether the element should be a semicircle.
       */
    function (current, total, pathRadius, elementRadius, isSemicircle) {
        if (isSemicircle === void 0) { isSemicircle = false; }
        var value = Math.max(0, Math.min(current || 0, total));
        var maxAngle = isSemicircle ? 180 : 359.9999;
        var percentage = total === 0 ? maxAngle : (value / total) * maxAngle;
        var start = this._polarToCartesian(elementRadius, pathRadius, percentage);
        var end = this._polarToCartesian(elementRadius, pathRadius, 0);
        var arcSweep = (percentage <= 180 ? 0 : 1);
        return "M " + start + " A " + pathRadius + " " + pathRadius + " 0 " + arcSweep + " 0 " + end;
    };
    ;
    /**
     * Converts polar cooradinates to Cartesian.
     * @param elementRadius  Radius of the wrapper element.
     * @param pathRadius     Radius of the path being described.
     * @param angleInDegrees Degree to be converted.
     */
    /**
       * Converts polar cooradinates to Cartesian.
       * @param elementRadius  Radius of the wrapper element.
       * @param pathRadius     Radius of the path being described.
       * @param angleInDegrees Degree to be converted.
       */
    RoundProgressService.prototype._polarToCartesian = /**
       * Converts polar cooradinates to Cartesian.
       * @param elementRadius  Radius of the wrapper element.
       * @param pathRadius     Radius of the path being described.
       * @param angleInDegrees Degree to be converted.
       */
    function (elementRadius, pathRadius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;
        var x = elementRadius + (pathRadius * Math.cos(angleInRadians));
        var y = elementRadius + (pathRadius * Math.sin(angleInRadians));
        return x + ' ' + y;
    };
    RoundProgressService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RoundProgressService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
    ]; };
    return RoundProgressService;
}());
exports.RoundProgressService = RoundProgressService;
;
//# sourceMappingURL=round-progress.service.js.map

/***/ }),

/***/ 807:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
exports.ROUND_PROGRESS_DEFAULTS = new core_1.InjectionToken('ROUND_PROGRESS_DEFAULTS');
exports.ROUND_PROGRESS_DEFAULTS_PROVIDER = {
    provide: exports.ROUND_PROGRESS_DEFAULTS,
    useValue: {
        radius: 125,
        animation: 'easeOutCubic',
        animationDelay: null,
        duration: 500,
        stroke: 15,
        color: '#45CCCE',
        background: '#EAEAEA',
        responsive: false,
        clockwise: true,
        semicircle: false,
        rounded: false
    }
};
//# sourceMappingURL=round-progress.config.js.map

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var RoundProgressEase = /** @class */ (function () {
    function RoundProgressEase() {
    }
    // t: current time (or position) of the neonate. This can be seconds or frames, steps,
    // seconds, ms, whatever – as long as the unit is the same as is used for the total time.
    // b: beginning value of the property.
    // c: change between the beginning and destination value of the property.
    // d: total time of the neonate.
    // t: current time (or position) of the neonate. This can be seconds or frames, steps,
    // seconds, ms, whatever – as long as the unit is the same as is used for the total time.
    // b: beginning value of the property.
    // c: change between the beginning and destination value of the property.
    // d: total time of the neonate.
    RoundProgressEase.prototype.linearEase = 
    // t: current time (or position) of the neonate. This can be seconds or frames, steps,
    // seconds, ms, whatever – as long as the unit is the same as is used for the total time.
    // b: beginning value of the property.
    // c: change between the beginning and destination value of the property.
    // d: total time of the neonate.
    function (t, b, c, d) {
        return c * t / d + b;
    };
    ;
    RoundProgressEase.prototype.easeInQuad = function (t, b, c, d) {
        return c * (t /= d) * t + b;
    };
    ;
    RoundProgressEase.prototype.easeOutQuad = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutQuad = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t + b;
        }
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInCubic = function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
    };
    ;
    RoundProgressEase.prototype.easeOutCubic = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutCubic = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };
    ;
    RoundProgressEase.prototype.easeInQuart = function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    };
    ;
    RoundProgressEase.prototype.easeOutQuart = function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutQuart = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t + b;
        }
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    };
    ;
    RoundProgressEase.prototype.easeInQuint = function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    };
    ;
    RoundProgressEase.prototype.easeOutQuint = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutQuint = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return c / 2 * t * t * t * t * t + b;
        }
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    };
    ;
    RoundProgressEase.prototype.easeInSine = function (t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    };
    ;
    RoundProgressEase.prototype.easeOutSine = function (t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutSine = function (t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInExpo = function (t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    };
    ;
    RoundProgressEase.prototype.easeOutExpo = function (t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutExpo = function (t, b, c, d) {
        if (t == 0) {
            return b;
        }
        ;
        if (t == d) {
            return b + c;
        }
        if ((t /= d / 2) < 1) {
            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    };
    ;
    RoundProgressEase.prototype.easeInCirc = function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeOutCirc = function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutCirc = function (t, b, c, d) {
        if ((t /= d / 2) < 1) {
            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        }
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = d * 0.3;
        var a = c;
        if (t == 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return -(a * Math.pow(2, 10 * (t--)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    };
    ;
    RoundProgressEase.prototype.easeOutElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = d * 0.3;
        var a = c;
        if (t == 0) {
            return b;
        }
        if ((t /= d) == 1) {
            return b + c;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutElastic = function (t, b, c, d) {
        var s = 1.70158;
        var p = d * (0.3 * 1.5);
        var a = c;
        if (t == 0) {
            return b;
        }
        if ((t /= d / 2) == 2) {
            return b + c;
        }
        if (a < Math.abs(c)) {
            a = c;
            s = p / 4;
        }
        else {
            s = p / (2 * Math.PI) * Math.asin(c / a);
        }
        if (t < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        }
        return a * Math.pow(2, -10 * (t -= 1)) *
            Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
    };
    ;
    RoundProgressEase.prototype.easeInBack = function (t, b, c, d, s) {
        if (s === void 0) { s = 1.70158; }
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    };
    ;
    RoundProgressEase.prototype.easeOutBack = function (t, b, c, d, s) {
        if (s === void 0) { s = 1.70158; }
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutBack = function (t, b, c, d, s) {
        if (s === void 0) { s = 1.70158; }
        if ((t /= d / 2) < 1) {
            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        }
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    };
    ;
    RoundProgressEase.prototype.easeInBounce = function (t, b, c, d) {
        return c - this.easeOutBounce(d - t, 0, c, d) + b;
    };
    ;
    RoundProgressEase.prototype.easeOutBounce = function (t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        }
        else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        }
        else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    };
    ;
    RoundProgressEase.prototype.easeInOutBounce = function (t, b, c, d) {
        if (t < d / 2) {
            return this.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
        }
        return this.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    };
    ;
    RoundProgressEase.decorators = [
        { type: core_1.Injectable },
    ];
    return RoundProgressEase;
}());
exports.RoundProgressEase = RoundProgressEase;
/**
 * TERMS OF USE - EASING EQUATIONS
 * Open source under the BSD License.

 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions
 * and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions
 * and the following disclaimer in the documentation and/or other materials provided with the
 * distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse or promote
 * products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
//# sourceMappingURL=round-progress.ease.js.map

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var round_progress_service_1 = __webpack_require__(806);
var round_progress_config_1 = __webpack_require__(807);
var round_progress_ease_1 = __webpack_require__(808);
var RoundProgressComponent = /** @class */ (function () {
    function RoundProgressComponent(_service, _easing, _defaults, _ngZone, _renderer) {
        this._service = _service;
        this._easing = _easing;
        this._defaults = _defaults;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        this._lastAnimationId = 0;
        this.radius = this._defaults.radius;
        this.animation = this._defaults.animation;
        this.animationDelay = this._defaults.animationDelay;
        this.duration = this._defaults.duration;
        this.stroke = this._defaults.stroke;
        this.color = this._defaults.color;
        this.background = this._defaults.background;
        this.responsive = this._defaults.responsive;
        this.clockwise = this._defaults.clockwise;
        this.semicircle = this._defaults.semicircle;
        this.rounded = this._defaults.rounded;
        this.onRender = new core_1.EventEmitter();
    }
    /** Animates a change in the current value. */
    /** Animates a change in the current value. */
    RoundProgressComponent.prototype._animateChange = /** Animates a change in the current value. */
    function (from, to) {
        var _this = this;
        if (typeof from !== 'number') {
            from = 0;
        }
        to = this._clamp(to);
        from = this._clamp(from);
        var self = this;
        var changeInValue = to - from;
        var duration = self.duration;
        // Avoid firing change detection for each of the animation frames.
        self._ngZone.runOutsideAngular(function () {
            var start = function () {
                var startTime = self._service.getTimestamp();
                var id = ++self._lastAnimationId;
                requestAnimationFrame(function animation() {
                    var currentTime = Math.min(self._service.getTimestamp() - startTime, duration);
                    var value = self._easing[self.animation](currentTime, from, changeInValue, duration);
                    self._setPath(value);
                    self.onRender.emit(value);
                    if (id === self._lastAnimationId && currentTime < duration) {
                        requestAnimationFrame(animation);
                    }
                });
            };
            if (_this.animationDelay > 0) {
                setTimeout(start, _this.animationDelay);
            }
            else {
                start();
            }
        });
    };
    /** Sets the path dimensions. */
    /** Sets the path dimensions. */
    RoundProgressComponent.prototype._setPath = /** Sets the path dimensions. */
    function (value) {
        if (this._path) {
            this._renderer.setElementAttribute(this._path.nativeElement, 'd', this._service.getArc(value, this.max, this.radius - this.stroke / 2, this.radius, this.semicircle));
        }
    };
    /** Clamps a value between the maximum and 0. */
    /** Clamps a value between the maximum and 0. */
    RoundProgressComponent.prototype._clamp = /** Clamps a value between the maximum and 0. */
    function (value) {
        return Math.max(0, Math.min(value || 0, this.max));
    };
    /** Determines the SVG transforms for the <path> node. */
    /** Determines the SVG transforms for the <path> node. */
    RoundProgressComponent.prototype.getPathTransform = /** Determines the SVG transforms for the <path> node. */
    function () {
        var diameter = this._diameter;
        if (this.semicircle) {
            return this.clockwise ?
                "translate(0, " + diameter + ") rotate(-90)" :
                "translate(" + (diameter + ',' + diameter) + ") rotate(90) scale(-1, 1)";
        }
        else if (!this.clockwise) {
            return "scale(-1, 1) translate(-" + diameter + " 0)";
        }
    };
    /** Resolves a color through the service. */
    /** Resolves a color through the service. */
    RoundProgressComponent.prototype.resolveColor = /** Resolves a color through the service. */
    function (color) {
        return this._service.resolveColor(color);
    };
    /** Change detection callback. */
    /** Change detection callback. */
    RoundProgressComponent.prototype.ngOnChanges = /** Change detection callback. */
    function (changes) {
        if (changes.current) {
            this._animateChange(changes.current.previousValue, changes.current.currentValue);
        }
        else {
            this._setPath(this.current);
        }
    };
    Object.defineProperty(RoundProgressComponent.prototype, "_diameter", {
        /** Diameter of the circle. */
        get: /** Diameter of the circle. */
        function () {
            return this.radius * 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundProgressComponent.prototype, "_elementHeight", {
        /** The CSS height of the wrapper element. */
        get: /** The CSS height of the wrapper element. */
        function () {
            if (!this.responsive) {
                return (this.semicircle ? this.radius : this._diameter) + 'px';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundProgressComponent.prototype, "_viewBox", {
        /** Viewbox for the SVG element. */
        get: /** Viewbox for the SVG element. */
        function () {
            var diameter = this._diameter;
            return "0 0 " + diameter + " " + (this.semicircle ? this.radius : diameter);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundProgressComponent.prototype, "_paddingBottom", {
        /** Bottom padding for the wrapper element. */
        get: /** Bottom padding for the wrapper element. */
        function () {
            if (this.responsive) {
                return this.semicircle ? '50%' : '100%';
            }
        },
        enumerable: true,
        configurable: true
    });
    RoundProgressComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'round-progress',
                    template: "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" [attr.viewBox]=\"_viewBox\">\n      <circle\n        fill=\"none\"\n        [attr.cx]=\"radius\"\n        [attr.cy]=\"radius\"\n        [attr.r]=\"radius - stroke / 2\"\n        [style.stroke]=\"resolveColor(background)\"\n        [style.stroke-width]=\"stroke\"/>\n\n      <path\n        #path\n        fill=\"none\"\n        [style.stroke-width]=\"stroke\"\n        [style.stroke]=\"resolveColor(color)\"\n        [style.stroke-linecap]=\"rounded ? 'round' : ''\"\n        [attr.transform]=\"getPathTransform()\"/>\n    </svg>\n  ",
                    host: {
                        'role': 'progressbar',
                        '[attr.aria-valuemin]': 'current',
                        '[attr.aria-valuemax]': 'max',
                        '[style.width]': "responsive ? '' : _diameter + 'px'",
                        '[style.height]': '_elementHeight',
                        '[style.padding-bottom]': '_paddingBottom',
                        '[class.responsive]': 'responsive'
                    },
                    styles: [
                        ":host {\n      display: block;\n      position: relative;\n      overflow: hidden;\n    }",
                        ":host.responsive {\n      width: 100%;\n      padding-bottom: 100%;\n    }",
                        ":host.responsive > svg {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      top: 0;\n      left: 0;\n    }"
                    ]
                },] },
    ];
    /** @nocollapse */
    RoundProgressComponent.ctorParameters = function () { return [
        { type: round_progress_service_1.RoundProgressService, },
        { type: round_progress_ease_1.RoundProgressEase, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [round_progress_config_1.ROUND_PROGRESS_DEFAULTS,] },] },
        { type: core_1.NgZone, },
        { type: core_1.Renderer, },
    ]; };
    RoundProgressComponent.propDecorators = {
        "_path": [{ type: core_1.ViewChild, args: ['path',] },],
        "current": [{ type: core_1.Input },],
        "max": [{ type: core_1.Input },],
        "radius": [{ type: core_1.Input },],
        "animation": [{ type: core_1.Input },],
        "animationDelay": [{ type: core_1.Input },],
        "duration": [{ type: core_1.Input },],
        "stroke": [{ type: core_1.Input },],
        "color": [{ type: core_1.Input },],
        "background": [{ type: core_1.Input },],
        "responsive": [{ type: core_1.Input },],
        "clockwise": [{ type: core_1.Input },],
        "semicircle": [{ type: core_1.Input },],
        "rounded": [{ type: core_1.Input },],
        "onRender": [{ type: core_1.Output },],
    };
    return RoundProgressComponent;
}());
exports.RoundProgressComponent = RoundProgressComponent;
//# sourceMappingURL=round-progress.component.js.map

/***/ }),

/***/ 812:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_notify__ = __webpack_require__(407);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuizPage = /** @class */ (function () {
    function QuizPage(navCtrl, navParams, notify, dataService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.notify = notify;
        this.dataService = dataService;
        this.time = 0;
        this.maxTime = 0;
        this.displayTime = 100;
        this.hasAnswered = false;
        // score: number = 0;
        this.max = 100;
        this.questions = [];
        this.activeIndex = 0;
        this.lang = this.navParams.get('lang');
        this.employer = this.navParams.get('employer');
        this.questions = this.employer.answers;
        this.hasAnswered = (this.employer.answers && this.employer.answers.length);
        //this.score=this.employer.score?this.employer.score:0
    }
    QuizPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.questions && this.questions.length)
            return;
        //this.score=0;
        this.slides.lockSwipes(true);
        this.dataService.load(this.lang).then(function (data) {
            _this.questions = data;
            setTimeout(function () {
                _this.ionSlideDidChange();
            }, 1000);
        });
    };
    QuizPage.prototype.formatTime = function () {
        return this.time / 1000;
    };
    QuizPage.prototype.end = function () {
        this.navCtrl.setRoot('HomePage');
    };
    QuizPage.prototype.nextSlide = function () {
        if (this.timer)
            clearInterval(this.timer);
        if (this.hasAnswered) {
            this.slides.slideNext();
            return;
        }
        var question = this.questions[this.activeIndex];
        if (question) {
            this.rating(question);
            question.amswered = true;
            //this.score += question.rate;
            if (question.answers.length)
                this.dataService.setRating(question.id, this.lang, (question.rate * 100 / question.answers.length).toFixed(0));
        }
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
    };
    QuizPage.prototype.rating = function (question) {
        var base = question.answers ? question.answers.length : -1;
        var score = base, amswared = false;
        question.answers.forEach(function (amswer) {
            if (amswer.selected)
                amswared = true;
            if ((amswer.correct && !amswer.selected) || (!amswer.correct && amswer.selected))
                score--;
        });
        if (!amswared)
            score = 0;
        question.rate = base > 0 ? score * 100 / base : 0;
    };
    QuizPage.prototype.ionSlideDidChange = function () {
        var _this = this;
        if (this.slides.isEnd()) {
            if (this.hasAnswered)
                return;
            var loading_1 = this.notify.loading({ content: 'Scoring...' });
            this.dataService.setScore(this.employer.id, { lang: this.lang, score: this.humaniseScore(), answers: this.questions }).then(function () {
                _this.hasAnswered = true;
                loading_1.dismiss();
            });
            loading_1.present();
            return;
        }
        if (this.hasAnswered)
            return;
        console.log("start");
        this.activeIndex = this.slides.getActiveIndex() ? this.slides.getActiveIndex() : 0;
        var question = this.questions[this.activeIndex];
        this.time = question.answers ? question.answers.length * 15000 + 10000 : 5000 + 10000;
        this.maxTime = this.time;
        this.counter();
    };
    QuizPage.prototype.counter = function () {
        var _this = this;
        if (this.hasAnswered)
            return;
        setTimeout(function () {
            _this.timer = setInterval(function () {
                if (_this.time != 0) {
                    _this.time -= 1000;
                    _this.displayTime = (_this.time * 100 / _this.maxTime).toFixed(0);
                }
                else {
                    _this.nextSlide();
                }
            }, 1000);
        }, 1000);
    };
    QuizPage.prototype.humaniseScore = function () {
        var score = 0;
        if (!this.questions || !this.questions.length)
            return '0';
        this.questions.forEach(function (question) {
            score += Number(question.rate);
        });
        var lenth = this.questions.length ? this.questions.length : -1;
        return Number(score / lenth).toFixed(0);
    };
    QuizPage.prototype.randomizeAnswers = function (rawAnswers) {
        for (var i = rawAnswers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = rawAnswers[i];
            rawAnswers[i] = rawAnswers[j];
            rawAnswers[j] = temp;
        }
        return rawAnswers;
    };
    QuizPage.prototype.restartQuiz = function () {
        this.hasAnswered = true;
        this.slides.lockSwipes(false);
        this.slides.slideTo(1, 1000);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
    ], QuizPage.prototype, "slides", void 0);
    QuizPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-quiz',template:/*ion-inline-start:"C:\Users\HP\workspace\pop-v1\src\pages\quiz\quiz.html"*/'<ion-header no-border no-shadow>\n        <ion-navbar [hideBackButton]="!hasAnswered" >\n          <ion-title>\n              <span *ngIf="!slides.isEnd()">Question {{activeIndex+1}}</span>\n            <span *ngIf="slides.isEnd()">Votre Score</span>\n        </ion-title>\n        </ion-navbar>\n   <div class="progess-bar" *ngIf="!slides.isEnd()" [hidden]="hasAnswered">\n       <div class="progression" [style.width.%]="displayTime">\n\n       </div>\n    </div>\n </ion-header>\n <ion-content >\n    <ion-slides #slides (ionSlideDidChange)="ionSlideDidChange()">\n        <ion-slide *ngFor="let question of questions; let i = index;">\n            <ion-card class="question-text">\n              <ion-card-content >\n                 {{question.flashCardFront}}\n              </ion-card-content>\n            </ion-card>\n\n            <h3 class="hint">{{question.flashCardFlipped}}</h3>\n            <ion-list no-lines radio-group inset>\n                <ion-item *ngFor="let answer of question.answers; let i = index;" text-wrap>\n                    <ion-label *ngIf="hasAnswered" [ngClass]="{\'wrong\':  !answer.correct, \'correct\': answer.correct}">\n                            {{i+1}}. {{answer.answer}}\n                    </ion-label>\n                    <ion-label *ngIf="!hasAnswered">\n                        {{i+1}}. {{answer.answer}}\n                    </ion-label>\n                    <ion-icon name="checkmark-circle" item-left *ngIf="answer.selected&&question.amswered"></ion-icon>\n                    <ion-icon name="radio-button-off" item-left *ngIf="!answer.selected&&question.amswered"></ion-icon>\n                    <ion-checkbox  [hidden]="question.amswered||hasAnswered" [(ngModel)]="answer.selected" color="dark" (ionChange)="rating(question)" ></ion-checkbox>\n                </ion-item>\n            </ion-list>\n      \n        </ion-slide>\n        <ion-slide>\n                <div class="progress-wrapper" [hidden]="!hasAnswered" padding>\n                        <div class="progress">\n                                {{humaniseScore()}} %\n                        </div>  \n                        <ion-grid style="height: 100%">\n                                <ion-row justify-content-center align-items-center style="height: 100%">\n                                        <round-progress [current]="humaniseScore()" [max]="max" [color]="dataService.colorScore(humaniseScore(),2)" [background]="\'#eaeaea\'" [animation]="\'easeInOutQuart\'"></round-progress>\n                                </ion-row>\n                              </ion-grid>                          \n                   </div>\n            <div padding [hidden]="!hasAnswered">\n            <button  (click)="restartQuiz()" ion-button block color="primary">Revoir mon parcours</button>\n                <br>\n            <button  (click)="end()" ion-button block color="danger">Terminer</button>\n        </div>\n        </ion-slide>\n    </ion-slides>\n    <ion-fab center bottom *ngIf="!slides.isEnd()">\n            <button ion-fab color="primary" (click)="nextSlide()">\n                <ion-icon *ngIf="(time>15000)" name="ios-arrow-dropright"></ion-icon>\n                <span *ngIf="(time<=15000)">{{formatTime()}}s</span>\n            </button> \n    </ion-fab>  \n</ion-content>\n'/*ion-inline-end:"C:\Users\HP\workspace\pop-v1\src\pages\quiz\quiz.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */]])
    ], QuizPage);
    return QuizPage;
}());

//# sourceMappingURL=quiz.js.map

/***/ }),

/***/ 813:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(56);
var round_progress_component_1 = __webpack_require__(809);
var round_progress_service_1 = __webpack_require__(806);
var round_progress_ease_1 = __webpack_require__(808);
var round_progress_config_1 = __webpack_require__(807);
var RoundProgressModule = /** @class */ (function () {
    function RoundProgressModule() {
    }
    RoundProgressModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    declarations: [round_progress_component_1.RoundProgressComponent],
                    exports: [round_progress_component_1.RoundProgressComponent],
                    providers: [round_progress_service_1.RoundProgressService, round_progress_ease_1.RoundProgressEase, round_progress_config_1.ROUND_PROGRESS_DEFAULTS_PROVIDER]
                },] },
    ];
    return RoundProgressModule;
}());
exports.RoundProgressModule = RoundProgressModule;
;
__export(__webpack_require__(809));
__export(__webpack_require__(806));
__export(__webpack_require__(808));
__export(__webpack_require__(807));
//# sourceMappingURL=index.js.map

/***/ })

});
//# sourceMappingURL=9.js.map