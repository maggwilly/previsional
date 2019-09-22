webpackJsonp([1],{

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommendeCreatePageModule", function() { return CommendeCreatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commende_create__ = __webpack_require__(892);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CommendeCreatePageModule = /** @class */ (function () {
    function CommendeCreatePageModule() {
    }
    CommendeCreatePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__commende_create__["a" /* CommendeCreatePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__commende_create__["a" /* CommendeCreatePage */]),
            ],
        })
    ], CommendeCreatePageModule);
    return CommendeCreatePageModule;
}());

//# sourceMappingURL=commende-create.module.js.map

/***/ }),

/***/ 865:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};


/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * split-string <https://github.com/jonschlinkert/split-string>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var extend = __webpack_require__(868);

module.exports = function(str, options, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  if (typeof options === 'function') {
    fn = options;
    options = null;
  }

  // allow separator to be defined as a string
  if (typeof options === 'string') {
    options = { sep: options };
  }

  var opts = extend({sep: '.'}, options);
  var quotes = opts.quotes || ['"', "'", '`'];
  var brackets;

  if (opts.brackets === true) {
    brackets = {
      '<': '>',
      '(': ')',
      '[': ']',
      '{': '}'
    };
  } else if (opts.brackets) {
    brackets = opts.brackets;
  }

  var tokens = [];
  var stack = [];
  var arr = [''];
  var sep = opts.sep;
  var len = str.length;
  var idx = -1;
  var closeIdx;

  function expected() {
    if (brackets && stack.length) {
      return brackets[stack[stack.length - 1]];
    }
  }

  while (++idx < len) {
    var ch = str[idx];
    var next = str[idx + 1];
    var tok = { val: ch, idx: idx, arr: arr, str: str };
    tokens.push(tok);

    if (ch === '\\') {
      tok.val = keepEscaping(opts, str, idx) === true ? (ch + next) : next;
      tok.escaped = true;
      if (typeof fn === 'function') {
        fn(tok);
      }
      arr[arr.length - 1] += tok.val;
      idx++;
      continue;
    }

    if (brackets && brackets[ch]) {
      stack.push(ch);
      var e = expected();
      var i = idx + 1;

      if (str.indexOf(e, i + 1) !== -1) {
        while (stack.length && i < len) {
          var s = str[++i];
          if (s === '\\') {
            s++;
            continue;
          }

          if (quotes.indexOf(s) !== -1) {
            i = getClosingQuote(str, s, i + 1);
            continue;
          }

          e = expected();
          if (stack.length && str.indexOf(e, i + 1) === -1) {
            break;
          }

          if (brackets[s]) {
            stack.push(s);
            continue;
          }

          if (e === s) {
            stack.pop();
          }
        }
      }

      closeIdx = i;
      if (closeIdx === -1) {
        arr[arr.length - 1] += ch;
        continue;
      }

      ch = str.slice(idx, closeIdx + 1);
      tok.val = ch;
      tok.idx = idx = closeIdx;
    }

    if (quotes.indexOf(ch) !== -1) {
      closeIdx = getClosingQuote(str, ch, idx + 1);
      if (closeIdx === -1) {
        arr[arr.length - 1] += ch;
        continue;
      }

      if (keepQuotes(ch, opts) === true) {
        ch = str.slice(idx, closeIdx + 1);
      } else {
        ch = str.slice(idx + 1, closeIdx);
      }

      tok.val = ch;
      tok.idx = idx = closeIdx;
    }

    if (typeof fn === 'function') {
      fn(tok, tokens);
      ch = tok.val;
      idx = tok.idx;
    }

    if (tok.val === sep && tok.split !== false) {
      arr.push('');
      continue;
    }

    arr[arr.length - 1] += tok.val;
  }

  return arr;
};

function getClosingQuote(str, ch, i, brackets) {
  var idx = str.indexOf(ch, i);
  if (str.charAt(idx - 1) === '\\') {
    return getClosingQuote(str, ch, idx + 1);
  }
  return idx;
}

function keepQuotes(ch, opts) {
  if (opts.keepDoubleQuotes === true && ch === '"') return true;
  if (opts.keepSingleQuotes === true && ch === "'") return true;
  return opts.keepQuotes;
}

function keepEscaping(opts, str, idx) {
  if (typeof opts.keepEscaping === 'function') {
    return opts.keepEscaping(str, idx);
  }
  return opts.keepEscaping === true || str[idx + 1] === '\\';
}


/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isExtendable = __webpack_require__(865);
var assignSymbols = __webpack_require__(873);

module.exports = Object.assign || function(obj/*, objects*/) {
  if (obj === null || typeof obj === 'undefined') {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  if (!isObject(obj)) {
    obj = {};
  }
  for (var i = 1; i < arguments.length; i++) {
    var val = arguments[i];
    if (isString(val)) {
      val = toObject(val);
    }
    if (isObject(val)) {
      assign(obj, val);
      assignSymbols(obj, val);
    }
  }
  return obj;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

function isString(val) {
  return (val && typeof val === 'string');
}

function toObject(str) {
  var obj = {};
  for (var i in str) {
    obj[i] = str[i];
  }
  return obj;
}

function isObject(val) {
  return (val && typeof val === 'object') || isExtendable(val);
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isEnum(obj, key) {
  return Object.prototype.propertyIsEnumerable.call(obj, key);
}


/***/ }),

/***/ 869:
/***/ (function(module, exports) {

/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function(obj, prop, a, b, c) {
  if (!isObject(obj) || !prop) {
    return obj;
  }

  prop = toString(prop);

  // allowing for multiple properties to be passed as
  // a string or array, but much faster (3-4x) than doing
  // `[].slice.call(arguments)`
  if (a) prop += '.' + toString(a);
  if (b) prop += '.' + toString(b);
  if (c) prop += '.' + toString(c);

  if (prop in obj) {
    return obj[prop];
  }

  var segs = prop.split('.');
  var len = segs.length;
  var i = -1;

  while (obj && (++i < len)) {
    var key = segs[i];
    while (key[key.length - 1] === '\\') {
      key = key.slice(0, -1) + '.' + segs[++i];
    }
    obj = obj[key];
  }
  return obj;
};

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function toString(val) {
  if (!val) return '';
  if (Array.isArray(val)) {
    return val.join('.');
  }
  return val;
}


/***/ }),

/***/ 871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_group_array__ = __webpack_require__(872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_group_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_group_array__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, modalCtrl, events, manager, localisation, userService, popoverCtrl, notify, loadingCtrl, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.manager = manager;
        this.localisation = localisation;
        this.userService = userService;
        this.popoverCtrl = popoverCtrl;
        this.notify = notify;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.rendezvous = [];
        this.queryText = '';
        this.loading = true;
        this.groups = [];
        this.isOnline = this.localisation.isOnline();
        this.events.subscribe('loaded:pointvente:new', function () {
            /*if(!this.nbrecriteres)
               this.loadData();*/
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.userService.getAuthenticatedUser().subscribe(function (user) {
            if (user)
                _this.refresh();
        });
    };
    HomePage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('pointvente', this.localisation.isOnline()).then(function (data) {
            _this.rendezvous = data ? data : [];
            var groups = __WEBPACK_IMPORTED_MODULE_8_group_array__(data ? data : [], 'secteur.nom');
            _this.groups = Object.keys(groups).map(function (key) { return ({ secteur: key, poinventes: groups[key] }); });
            _this.search();
            _this.loading = false;
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            _this.notify.onSuccess({ message: "Probleme de connexion" });
        });
    };
    HomePage.prototype.loadRemoteData = function () {
        var _this = this;
        this.countCricteres(this.filtre);
        this.loading = true;
        //let loader = this.loadingCtrl.create({ content: "chargement..."});    
        this.manager.get('pointvente', true, null, null, this.filtre, this.nbrecriteres).then(function (data) {
            _this.rendezvous = data ? data : [];
            var groups = __WEBPACK_IMPORTED_MODULE_8_group_array__(data ? data : [], 'secteur.nom');
            _this.groups = Object.keys(groups).map(function (key) { return ({ secteur: key, poinventes: groups[key] }); });
            _this.search();
            _this.loading = false;
            // loader.dismiss();    
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function () {
            _this.localisation.onConnect(false);
            // loader.dismiss(); 
            _this.notify.onSuccess({ message: "Probleme de connexion" });
        });
        // loader.present();
    };
    HomePage.prototype.sort = function (arr) {
        if (arr.length <= 1)
            return arr;
        this.rendezvous.sort(function (a, b) {
            if ((!a.rendezvous || !a.rendezvous) || (a.rendezvous && !a.rendezvous.dateat || a.rendezvous && !a.rendezvous.dateat))
                return -1;
            return -1;
        });
    };
    HomePage.prototype.refresh = function () {
        if (!this.filtre)
            this.filtre = { type: '', user: '',
                secteur: '', ville: '',
                afterdate: __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('year').format("YYYY-MM-DD"),
                //aftervisitedate:moment().startOf('month').format("YYYY-MM-DD"),
                afterrendevousdate: __WEBPACK_IMPORTED_MODULE_7_moment__().startOf('year').format("YYYY-MM-DD"),
                beforedate: __WEBPACK_IMPORTED_MODULE_7_moment__().format("YYYY-MM-DD"),
                beforevisitedate: __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('week').format("YYYY-MM-DD"),
                beforrendezvousdate: __WEBPACK_IMPORTED_MODULE_7_moment__().endOf('month').format("YYYY-MM-DD")
            };
        this.nbrecriteres = 0;
        this.queryText = '';
        if (this.localisation.isOnline())
            return this.loadRemoteData();
        this.loadData();
    };
    HomePage.prototype.openFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create('FiltrePointventePage', { filtre: this.filtre });
        modal.onDidDismiss(function (data) {
            if (!data)
                return;
            _this.countCricteres(_this.filtre);
            return _this.loadRemoteData();
        });
        modal.present();
    };
    HomePage.prototype.doScroll = function (env) {
    };
    HomePage.prototype.countCricteres = function (data) {
        var nbrecriteres = 0;
        Object.keys(data).forEach(function (key) {
            if (data[key])
                nbrecriteres++;
        });
        this.nbrecriteres = nbrecriteres;
    };
    HomePage.prototype.show = function (pointVente) {
        this.navCtrl.push('PointVenteDetailPage', { pointVente: pointVente });
    };
    HomePage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.rendezvous.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    HomePage.prototype.filter = function (item, queryWords) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (item.nom.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            matchesQueryText = true;
        }
        item.hide = !(matchesQueryText);
    };
    HomePage.prototype.presentPopover = function (ev) {
        var popover = this.popoverCtrl.create('PopOverMenuPage', { navCtrl: this.navCtrl });
        popover.present({
            ev: ev
        });
    };
    HomePage.prototype.openMap = function () {
        this.navCtrl.push('MapPage', { target: 'rendezvous', points: this.rendezvous, title: "Aper\u00E7u des r\u00E9alit\u00E9s", filtre: this.filtre });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\home\home.html"*/'<ion-header #head>\n\n  <ion-navbar hideBackButton="true">\n\n    <button menuToggle ion-button icon-only showWhen="mobile">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-row no-padding>\n\n      <ion-col>\n\n        <ion-title>Prévisions de passages</ion-title>\n\n      </ion-col>\n\n      <ion-col>\n\n        <ion-searchbar *ngIf="rendezvous" [hidden]="!rendezvous.length" [(ngModel)]="queryText" (ionInput)="search()"\n\n          placeholder="Recherchez un nom">\n\n        </ion-searchbar>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="refresh()">\n\n        <ion-icon name="refresh"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding-top hide-header [header]="head">\n\n  <ion-row justify-content-around>\n\n    <ion-col col-6>\n\n      <button ion-button icon-left outline small (click)="openFilter()" [disabled]="!isOnline">\n\n        <ion-icon name="funnel"></ion-icon>\n\n        Critères\n\n        <span *ngIf="nbrecriteres&&isOnline"> - ({{nbrecriteres}})</span>\n\n      </button>\n\n    </ion-col>\n\n    <ion-col col-6 class="item-right">\n\n      <button float-right ion-button icon-left outline small (click)="openMap()" [disabled]="!rendezvous.length">\n\n        <ion-icon name="map"></ion-icon>Carte\n\n      </button>\n\n    </ion-col>\n\n  </ion-row>\n\n  <ion-list *ngIf="groups.length&&!loading">\n\n    <ion-item-group *ngFor="let group of groups" [hidden]="!group.poinventes">\n\n      <ion-item-divider color="light">{{group.secteur}} ({{group.poinventes.length}})</ion-item-divider>\n\n      <ion-item #item *ngFor="let pointvente of group.poinventes" (click)="show(pointvente)"\n\n        [hidden]="pointvente.hide||!pointvente.nom" text-wrap>\n\n        {{pointvente.nom}} <strong *ngIf="pointvente.quartier"><span> - {{pointvente.quartier}}</span></strong>\n\n        <ion-badge *ngIf="pointvente.rendezvous&&pointvente.rendezvous.dateat"\n\n          [ngClass]="{\'passed\': pointvente.rendezvous.passdays<0, \'today\':pointvente.rendezvous.passdays==0 , \'future\':pointvente.rendezvous.passdays>0}">\n\n          <span> {{pointvente.rendezvous.dateat |moment}}</span>\n\n        </ion-badge>\n\n        <p><a href="tel: {{pointvente.telephone}}">{{pointvente.telephone}}</a><span *ngIf="pointvente.ville">,\n\n            {{pointvente.ville}}</span>\n\n          <span *ngIf="pointvente.type">, {{pointvente.type}}</span><span *ngIf="pointvente.adresse">,\n\n            {{pointvente.adresse}}</span>\n\n          - <small *ngIf="pointvente.firstCommende">Engagé {{pointvente.firstCommende.date|moment:\'fromnow\'}}</small>\n\n          <small *ngIf="!pointvente.firstCommende">Prospecté {{pointvente.date|moment:\'fromnow\'}}</small>\n\n        </p>\n\n        <p *ngIf="pointvente.rendezvous&&pointvente.rendezvous.dateat">\n\n          <span\n\n            [ngClass]="{\'passed\': pointvente.rendezvous.passdays<0, \'today\':pointvente.rendezvous.passdays==0 , \'future\':pointvente.rendezvous.passdays>0}">\n\n            Livraison prévue pour {{pointvente.rendezvous.dateat |moment}}</span>\n\n          <ion-icon *ngIf="pointvente.rendezvous.persist" name="md-checkmark-circle"></ion-icon>\n\n        </p>\n\n        <p *ngIf="pointvente.rendezvous&&!pointvente.rendezvous.dateat">\n\n          <span *ngIf="pointvente.rendezvous.produitnonvendu&&pointvente.lastCommende"> Dernier livraison\n\n            {{pointvente.lastCommende.date |moment}}, <span class="danger">{{pointvente.rendezvous.produitnonvendu}} non\n\n              livré(s)</span> </span>\n\n          <span *ngIf="!pointvente.rendezvous.produitnonvendu&&pointvente.lastCommende"> Dernier passage\n\n            {{pointvente.lastCommende.date |moment}} </span>\n\n          <span class="danger" *ngIf="!pointvente.lastCommende">Pas encore engagé</span>\n\n        </p>\n\n      </ion-item>\n\n    </ion-item-group>\n\n    <div padding>\n\n      <button ion-button block small clear (click)="refresh()" style="text-transform: none;">Afficher plus</button>\n\n    </div>\n\n  </ion-list>\n\n  <ion-grid padding style="height: 100%;justify-content: center" *ngIf="!groups.length&&loading">\n\n    <ion-row style="justify-content: center;" justify-content-center align-items-center>    \n\n  <ion-spinner color="royal" name="ios"></ion-spinner>\n\n </ion-row>    \n\n </ion-grid>   \n\n  <ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!groups.length&&!loading">\n\n    <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n\n      <div text-center text-wrap class="empty" padding>\n\n        Aucun element correspondant aux critères.\n\n      </div>\n\n    </ion-row>\n\n  </ion-grid>\n\n</ion-content>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 872:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const split = __webpack_require__(867);
const flatten = __webpack_require__(874);
const union = __webpack_require__(875);
const forOwn = __webpack_require__(881);
const typeOf = __webpack_require__(883);
const get = __webpack_require__(869);

function groupFn(arr, props) {
  if (arr == null) {
    return [];
  }

  if (!Array.isArray(arr)) {
    throw new TypeError('group-array expects an array.');
  }

  if (arguments.length === 1) {
    return arr;
  }

  let args = flatten([].slice.call(arguments, 1));
  let groups = groupBy(arr, args[0]);

  for (let i = 1; i < args.length; i++) {
    toGroup(groups, args[i]);
  }
  return groups;
}

function groupBy(arr, prop, key) {
  let groups = {};

  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    let val;

    // allow a function to modify the object
    // and/or return a val to use
    if (typeof prop === 'function') {
      val = prop.call(groups, obj, key);
    } else {
      val = get(obj, prop);
    }

    switch (typeOf(val)) {
      case 'undefined':
        break;
      case 'string':
      case 'number':
      case 'boolean':
        union(groups, escape(String(val)), obj);
        break;
      case 'object':
      case 'array':
        eachValue(groups, obj, val);
        break;
      case 'function':
        throw new Error('invalid argument type: ' + key);
    }
  }
  return groups;
}

function eachValue(groups, obj, val) {
  if (Array.isArray(val)) {
    val.forEach(key => {
      union(groups, escape(key), obj);
    });
  } else {
    forOwn(val, (v, key) => {
      union(groups, escape(key), obj);
    });
  }
}

function toGroup(groups, prop) {
  forOwn(groups, (val, key) => {
    if (!Array.isArray(val)) {
      groups[key] = toGroup(val, prop, key);
    } else {
      groups[key] = groupBy(val, prop, key);
    }
  });
  return groups;
}

function escape(str) {
  var opts = {
    strict: false,
    keepEscaping: true,
    keepDoubleQuotes: true,
    keepSingleQuotes: true
  };

  try {
    return split(str, opts).join('\\.');
  } catch (err) {
    return str;
  }
}

/**
 * Expose `groupArray`
 */

module.exports = groupFn;


/***/ }),

/***/ 873:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function(receiver, objects) {
  if (receiver === null || typeof receiver === 'undefined') {
    throw new TypeError('expected first argument to be an object.');
  }

  if (typeof objects === 'undefined' || typeof Symbol === 'undefined') {
    return receiver;
  }

  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return receiver;
  }

  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var target = Object(receiver);
  var len = arguments.length, i = 0;

  while (++i < len) {
    var provider = Object(arguments[i]);
    var names = Object.getOwnPropertySymbols(provider);

    for (var j = 0; j < names.length; j++) {
      var key = names[j];

      if (isEnumerable.call(provider, key)) {
        target[key] = provider[key];
      }
    }
  }
  return target;
};


/***/ }),

/***/ 874:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function (arr) {
  return flat(arr, []);
};

function flat(arr, res) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    Array.isArray(cur) ? flat(cur, res) : res.push(cur);
  }
  return res;
}


/***/ }),

/***/ 875:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(865);
var union = __webpack_require__(876);
var get = __webpack_require__(869);
var set = __webpack_require__(877);

module.exports = function unionValue(obj, prop, value) {
  if (!isObject(obj)) {
    throw new TypeError('union-value expects the first argument to be an object.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('union-value expects `prop` to be a string.');
  }

  var arr = arrayify(get(obj, prop));
  set(obj, prop, union(arr, arrayify(value)));
  return obj;
};

function arrayify(val) {
  if (val === null || typeof val === 'undefined') {
    return [];
  }
  if (Array.isArray(val)) {
    return val;
  }
  return [val];
}


/***/ }),

/***/ 876:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function union(init) {
  if (!Array.isArray(init)) {
    throw new TypeError('arr-union expects the first argument to be an array.');
  }

  var len = arguments.length;
  var i = 0;

  while (++i < len) {
    var arg = arguments[i];
    if (!arg) continue;

    if (!Array.isArray(arg)) {
      arg = [arg];
    }

    for (var j = 0; j < arg.length; j++) {
      var ele = arg[j];

      if (init.indexOf(ele) >= 0) {
        continue;
      }
      init.push(ele);
    }
  }
  return init;
};


/***/ }),

/***/ 877:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var split = __webpack_require__(867);
var extend = __webpack_require__(868);
var isPlainObject = __webpack_require__(878);
var isObject = __webpack_require__(865);

module.exports = function(obj, prop, val) {
  if (!isObject(obj)) {
    return obj;
  }

  if (Array.isArray(prop)) {
    prop = [].concat.apply([], prop).join('.');
  }

  if (typeof prop !== 'string') {
    return obj;
  }

  var keys = split(prop, {sep: '.', brackets: true});
  var len = keys.length;
  var idx = -1;
  var current = obj;

  while (++idx < len) {
    var key = keys[idx];
    if (idx !== len - 1) {
      if (!isObject(current[key])) {
        current[key] = {};
      }
      current = current[key];
      continue;
    }

    if (isPlainObject(current[key]) && isPlainObject(val)) {
      current[key] = extend({}, current[key], val);
    } else {
      current[key] = val;
    }
  }

  return obj;
};


/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(879);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isArray = __webpack_require__(880);

module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && isArray(val) === false;
};


/***/ }),

/***/ 880:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-own <https://github.com/jonschlinkert/for-own>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var forIn = __webpack_require__(882);
var hasOwn = Object.prototype.hasOwnProperty;

module.exports = function forOwn(obj, fn, thisArg) {
  forIn(obj, function(val, key) {
    if (hasOwn.call(obj, key)) {
      return fn.call(thisArg, obj[key], key, obj);
    }
  });
};


/***/ }),

/***/ 882:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};


/***/ }),

/***/ 883:
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(884);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),

/***/ 884:
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommendeCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(871);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CommendeCreatePage = /** @class */ (function () {
    function CommendeCreatePage(navCtrl, alertCtrl, navParams, manager, loadingCtrl, notify, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.manager = manager;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.storage = storage;
        this.produits = [];
        this.commende = { lignes: [], typeInsident: 'Rien à signaler' };
        this.pointVente = {};
        this.queryText = '';
        this.pointVente = navParams.get('pointVente');
        this.commende.pointVenteItem = this.pointVente;
        this.commende.pointVente = this.pointVente.id;
        var datePipe = new __WEBPACK_IMPORTED_MODULE_5__angular_common__["d" /* DatePipe */]('en');
        this.commende.date = datePipe.transform(new Date(), 'yyyy-MM-dd');
    }
    CommendeCreatePage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    CommendeCreatePage.prototype.loadData = function () {
        var _this = this;
        this.storage.get('_produits').then(function (data) {
            _this.produits = data;
            _this.manager.get('produit').then(function (data) {
                _this.produits = data ? data : [];
                _this.storage.set('_produits', _this.produits);
            }, function (error) {
                _this.notify.onError({ message: "PROBLEME ! Verifiez votre connexion internet" });
            });
        });
    };
    CommendeCreatePage.prototype.save = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({});
        this.manager.post('commende', this.commende).then(function () {
            _this.notify.onSuccess({ message: "enregistrement effectué" });
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */], {}, { animate: true, direction: 'forward' });
            loader.dismiss();
        }, function (error) {
            console.log(error);
            loader.dismiss();
            _this.notify.onError({ message: "PROBLEME ! Verifiez votre connexion internet" });
        });
        loader.present();
    };
    CommendeCreatePage.prototype.getPointVente = function (commende) {
        return commende.pointVenteItem ? commende.pointVenteItem : commende.pointVente;
    };
    CommendeCreatePage.prototype.openCart = function () {
        this.navCtrl.push('CommendesViewPage', { commende: this.commende });
    };
    CommendeCreatePage.prototype.addInCart = function (produit) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'AJOUTER UN PRODUIT',
            inputs: [
                {
                    name: 'quantite',
                    type: 'number',
                    label: 'Quantité',
                    placeholder: 'quantité',
                    value: '1'
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Ajouter',
                    handler: function (data) {
                        if (data.quantite) {
                            _this.removeFromCart({ produit: produit.id });
                            _this.commende.lignes.push({ produit: produit.id, quantite: data.quantite, produitItem: produit });
                        }
                    }
                }
            ]
        });
        confirm.present();
    };
    CommendeCreatePage.prototype.TotalQuantity = function (commende) {
        var total = 0;
        commende.lignes.forEach(function (ligne) {
            total += Number(ligne.quantite);
        });
        return total;
    };
    CommendeCreatePage.prototype.removeFromCart = function (ligne) {
        var index = this.commende.lignes.findIndex(function (item) { return (item.produit == ligne.produit); });
        if (index > -1)
            this.commende.lignes.splice(index, 1);
    };
    CommendeCreatePage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.produits.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    CommendeCreatePage.prototype.filter = function (item, queryWords) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (item.nom.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            // if there are no query words then this session passes the query test
            matchesQueryText = true;
        }
        item.hide = !(matchesQueryText);
    };
    CommendeCreatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-commende-create',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\commende-create\commende-create.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title *ngIf="getPointVente(commende)">{{commende.date|date:\'dd/MM/yyyy\' }} - {{getPointVente(commende).nom}} </ion-title>\n        <ion-buttons end="end">\n            <button ion-button="ion-button" outline color="white" (click)="openCart()" >\n                <span>{{TotalQuantity(commende)}} \n                </span>\n            </button>\n            <button ion-button icon-only (click)="save()" *ngIf="commende.lignes.length">\n                <ion-icon name="done-all"></ion-icon>\n            </button>           \n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content  padding>\n        <ion-list> \n             <ion-item>\n                <ion-label color="primary" flotting><span>Date du rapport</span></ion-label>\n                <ion-datetime \n                   displayFormat="DD/MM/YYYY"\n                   pickerFormat="D MMM  YYYY" min="2019" max="2050"\n                   doneText="Terminé" cancelText="Annuler"\n                   name="date"\n                   [(ngModel)]="commende.date"\n                    #date="ngModel"></ion-datetime>\n              </ion-item>\n    </ion-list> \n<ion-list-header>Selectionnez un produit</ion-list-header>\n    <ion-list>\n        <ion-item  *ngFor="let produit of produits" (click)="addInCart(produit)" [hidden]="produit.hide">\n            {{produit.nom}}\n            <p>{{produit.description}}</p>\n            <ion-note item-right>{{produit.cout}} XAF</ion-note>\n        </ion-item>\n    </ion-list>\n    <ion-item>\n     <ion-label color="primary" floating>\n            <span>Insident à signaler</span>\n     </ion-label>\n     <ion-select [(ngModel)]="commende.typeInsident" name="typeInsident" #typeInsident="ngModel" required="required">\n                <ion-option value="Rien à signaler">Rien à signaler</ion-option>\n                <ion-option value="Insident portant sur le matériel">Insident portant sur le matériel</ion-option>\n                <ion-option value="Insident avec un souscripteur ou un prospect">Insident avec un souscripteur</ion-option>\n                <ion-option value="Insident de santé leger">Insident de santé leger</ion-option>\n                <ion-option value="Accident ayant occasionné des blessures ">Accident ayant occasionné des blessures</ion-option>\n                <ion-option value="Autre type d\'insident">Autre type d\'insident</ion-option>\n    </ion-select>\n    </ion-item>    \n    <ion-item *ngIf="commende.typeInsident!=\'Rien à signaler\'">\n        <ion-textarea rows="3" [(ngModel)]="commende.description" placeholder="Compte rendu descriptif"\n            name="description" #description="ngModel"></ion-textarea>\n    </ion-item>    \n</ion-content>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\commende-create\commende-create.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], CommendeCreatePage);
    return CommendeCreatePage;
}());

//# sourceMappingURL=commende-create.js.map

/***/ })

});
//# sourceMappingURL=1.js.map