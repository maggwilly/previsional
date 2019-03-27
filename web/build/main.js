webpackJsonp([7],{

/***/ 200:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 200;

/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/classement/classement.module": [
		799,
		14
	],
	"../pages/home/home.module": [
		800,
		13
	],
	"../pages/quiz/quiz.module": [
		801,
		9
	],
	"../pages/stats/stats.module": [
		803,
		12
	],
	"../pages/tabs/tabs.module": [
		804,
		11
	],
	"../pages/welcome/welcome.module": [
		805,
		10
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 245;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    apiKey: "AIzaSyBGKPxWrDdNqXBMxFm8nDPpDdeRzwgDDrg",
    authDomain: "guiness-pop.firebaseapp.com",
    databaseURL: "https://guiness-pop.firebaseio.com",
    projectId: "guiness-pop",
    storageBucket: "guiness-pop.appspot.com",
    messagingSenderId: "1054375458035"
};
//# sourceMappingURL=firebaseconfig.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DataProvider = /** @class */ (function () {
    function DataProvider(http, events) {
        this.http = http;
        this.events = events;
        this.employers = [];
        this.scores = [];
        this.fireemployes = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/employes');
        this.firequestions = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database().ref('/questions');
    }
    DataProvider.prototype.randomFive = function (data) {
        var questions = [];
        var list = data;
        for (var i = 0; i < 5; i++) {
            var j = Math.floor(Math.random() * (list.length - 1));
            questions.push(list[j]);
            list.splice(j, 1);
        }
        return questions;
    };
    DataProvider.prototype.load = function (lang) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            switch (lang) {
                case 'fr':
                    if (_this.qFr)
                        return resolve(_this.randomFive(_this.qFr));
                    return _this.firequestions.child(lang).once('value', function (snapshot) {
                        _this.qFr = [];
                        snapshot.forEach(function (child) {
                            var question = child.val();
                            question.id = child.key;
                            _this.qFr.push(question);
                        });
                        _this.events.publish('questions');
                        resolve(_this.randomFive(_this.qFr));
                    });
                default:
                    if (_this.qEn)
                        return resolve(_this.randomFive(_this.qEn));
                    return _this.firequestions.child(lang).once('value', function (snapshot) {
                        _this.qEn = [];
                        snapshot.forEach(function (child) {
                            var question = child.val();
                            question.id = child.key;
                            _this.qEn.push(question);
                        });
                        _this.events.publish('questions');
                        resolve(_this.randomFive(_this.qEn));
                    });
            }
        });
    };
    DataProvider.prototype.loadEmployers = function () {
        var _this = this;
        return this.fireemployes.on('value', function (snapshot) {
            _this.employers = [];
            snapshot.forEach(function (child) {
                var employer = child.val();
                employer.id = child.key;
                employer.score = employer.score ? employer.score : 0;
                _this.employers.push(employer);
            });
            _this.employers.sort(function (a, b) {
                return b.score - a.score;
            });
            _this.scores = [];
            _this.processData(_this.employers);
            _this.events.publish('employes');
        });
    };
    DataProvider.prototype.setScore = function (id, answers) {
        return this.fireemployes.child(id).update(answers);
    };
    DataProvider.prototype.setRating = function (id, lang, rate) {
        return this.firequestions.child(lang).child(id).child('rates').push({ value: rate });
    };
    DataProvider.prototype.colorScore = function (score, style) {
        if (style === void 0) { style = 1; }
        score = Number(score);
        switch (style) {
            case 1:
                if (score < 80)
                    return 'red';
                return 'success';
            default:
                if (score < 80)
                    return '#EB0606';
                return '#10dc60';
        }
    };
    DataProvider.prototype.departements = function () {
        return ['corporate', 'finance', 'general management', 'hr', 'legal', 'legal-HR-CR', 'Marketing', 'RTC', 'sales', 'supply', 'WACA', 'Guest'];
    };
    DataProvider.prototype.processData = function (list) {
        var _this = this;
        var departements = this.departements();
        this.scores = [];
        departements.forEach(function (departement) {
            var score = 0, nbre = 0;
            var group = _this.findByname(departement);
            group.forEach(function (item) {
                if (item.score)
                    nbre++;
                score += Number(item.score);
            });
            score = Math.floor(nbre > 0 ? score / nbre : score);
            _this.scores.push(score);
        });
    };
    DataProvider.prototype.findByname = function (name) {
        var group = this.employers.filter(function (employer) {
            employer.score = employer.score ? employer.score : 0;
            return employer.department.toUpperCase() == name.toUpperCase();
        });
        group.sort(function (a, b) {
            return b.score - a.score;
        });
        return group;
    };
    DataProvider.prototype.nbParticipants = function () {
        var nbParticipant = this.employers.filter(function (employe) { return employe.score && employe.score > 0; });
        return nbParticipant.length;
    };
    DataProvider.prototype.meilleurParticipant = function () {
        var nbParticipant = this.employers.filter(function (employe) { return employe.score && employe.score > 0; });
        return nbParticipant.length ? nbParticipant[0] : null;
    };
    DataProvider.prototype.questionDifFr = function () {
        var diff = this.qFr.sort(function (a, b) {
            var arate = 0, brate = 0;
            if (!a.rates || !b.rates)
                return a.amswered && b.amswered;
            a.rates.forEach(function (rate) {
                arate += Number(rate.value);
            });
            arate = arate / a.rates.length;
            b.rates.forEach(function (rate) {
                brate += Number(rate.value);
            });
            brate = brate / b.rates.length;
            return arate - brate;
        });
        this.questionDifFr = diff[0];
    };
    DataProvider.prototype.questionDifEn = function () {
        var diff = this.qFr.sort(function (a, b) {
            var arate = 0, brate = 0;
            if (!a.rates || !b.rates)
                return a.amswered && b.amswered;
            a.rates.forEach(function (rate) {
                arate += Number(rate.value);
            });
            arate = arate / a.rates.length;
            b.rates.forEach(function (rate) {
                brate += Number(rate.value);
            });
            brate = brate / b.rates.length;
            return arate - brate;
        });
        this.questionDifEn = diff[0];
    };
    DataProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* Events */]) === "function" && _b || Object])
    ], DataProvider);
    return DataProvider;
    var _a, _b;
}());

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNotify; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Component } from '@angular/core';

var AppNotify = /** @class */ (function () {
    function AppNotify(toastCtrl, alerttCtrl, loadingCtrl) {
        this.toastCtrl = toastCtrl;
        this.alerttCtrl = alerttCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
    }
    AppNotify.prototype.onSuccess = function (toastOpts) {
        var succesToast = this.toastCtrl.create({
            message: toastOpts.message,
            duration: toastOpts.duration || 3000,
            position: toastOpts.position || 'bottom',
            showCloseButton: toastOpts.showCloseButton || true,
            cssClass: 'danger',
        });
        succesToast.present();
    };
    AppNotify.prototype.onError = function (toastOpts) {
        var errorToast = this.toastCtrl.create({
            message: toastOpts.message,
            duration: toastOpts.duration || 7000,
            position: toastOpts.position || 'bottom',
            showCloseButton: toastOpts.showCloseButton || true,
            cssClass: 'success',
        });
        errorToast.present();
    };
    AppNotify.prototype.showAlert = function (alertOptions) {
        var errorToast = this.alerttCtrl.create({
            message: alertOptions.message,
            title: alertOptions.title,
            subTitle: alertOptions.subTitle,
            buttons: alertOptions.buttons || ['Ok'],
            inputs: alertOptions.inputs || []
        });
        errorToast.present();
    };
    AppNotify.prototype.loading = function (loadingOptions) {
        return this.loadingCtrl.create(loadingOptions);
    };
    AppNotify = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], AppNotify);
    return AppNotify;
}());

//# sourceMappingURL=app-notify.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(414);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 414:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_notify__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_data_data__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__firebaseconfig__ = __webpack_require__(307);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_12__firebaseconfig__["a" /* firebaseConfig */]),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["AngularFireDatabaseModule"],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/classement/classement.module#ClassementPageModule', name: 'ClassementPage', segment: 'classement', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/quiz/quiz.module#QuizPageModule', name: 'QuizPage', segment: 'quiz', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/scores/scores.module#ScoresPageModule', name: 'ScoresPage', segment: 'scores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stats/stats.module#StatsPageModule', name: 'StatsPage', segment: 'stats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                ,
                __WEBPACK_IMPORTED_MODULE_5__app_notify__["a" /* AppNotify */],
                __WEBPACK_IMPORTED_MODULE_9__providers_data_data__["a" /* DataProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__firebaseconfig__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    // rootPage: any ='HomePage';
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = 'TabsPage';
        __WEBPACK_IMPORTED_MODULE_5_firebase_app___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_4__firebaseconfig__["a" /* firebaseConfig */]);
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\HP\workspace\pop-v1\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\HP\workspace\pop-v1\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[409]);
//# sourceMappingURL=main.js.map