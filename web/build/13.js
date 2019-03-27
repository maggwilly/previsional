webpackJsonp([13],{

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(811);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 811:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_notify__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_data_data__ = __webpack_require__(406);
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
    function HomePage(navCtrl, navNavParams, storage, events, dataService, appNotify, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navNavParams = navNavParams;
        this.storage = storage;
        this.events = events;
        this.dataService = dataService;
        this.appNotify = appNotify;
        this.viewCtrl = viewCtrl;
        this.employers = [];
        this.queryText = '';
        this.employers = this.dataService.employers;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.dataService.loadEmployers();
        this.events.subscribe('employes', function () {
            _this.employers = _this.dataService.employers;
        });
    };
    HomePage.prototype.startQuiz = function (employer) {
        if (employer.answers)
            return this.navCtrl.push('QuizPage', { employer: employer });
        this.navCtrl.push('WelcomePage', { employer: employer });
    };
    HomePage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.employers.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    HomePage.prototype.filter = function (item, queryWords) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (item.name.toLowerCase().indexOf(queryWord) > -1) {
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
    HomePage.prototype.openClassement = function () {
        this.navCtrl.push('ClassementPage');
    };
    HomePage.prototype.openStats = function () {
        this.navCtrl.push('StatsPage');
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\HP\workspace\pop-v1\src\pages\home\home.html"*/'<ion-header no-border no-shadow>\n    <ion-navbar>\n        <ion-title>Accueil</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="openClassement()"><ion-icon name="funnel"></ion-icon></button>\n            <button ion-button icon-only (click)="openStats()"><ion-icon name="pulse"></ion-icon></button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n<ion-content >\n    <ion-searchbar [hidden]="!employers||!employers.length" color="primary"\n    [(ngModel)]="queryText"\n    (ionInput)="search()"\n    placeholder="Recherchez un nom">\n    </ion-searchbar> \n    <ion-list [hidden]="!employers||!employers.length">\n    <ion-item  *ngFor="let employer of employers" (click)="startQuiz(employer)" [hidden]="employer.hide">\n    <h2>{{employer.name}}</h2>\n    <h3>{{employer.position}}, - <strong>{{employer.department}}</strong></h3>\n    <ion-badge item-end *ngIf="employer.score" [color]="dataService.colorScore(employer.score)">{{employer.score}}</ion-badge>\n    </ion-item>\n    </ion-list>\n    <ion-grid [hidden]="employers&&employers.length" style=" height: 100%;justify-content: center;">\n            <ion-row justify-content-center align-items-center>\n              <ion-spinner name="ios"></ion-spinner>\n            </ion-row>\n        </ion-grid>        \n</ion-content>\n'/*ion-inline-end:"C:\Users\HP\workspace\pop-v1\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* ViewController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=13.js.map