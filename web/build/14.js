webpackJsonp([14],{

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassementPageModule", function() { return ClassementPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classement__ = __webpack_require__(810);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ClassementPageModule = /** @class */ (function () {
    function ClassementPageModule() {
    }
    ClassementPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__classement__["a" /* ClassementPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__classement__["a" /* ClassementPage */]),
            ],
        })
    ], ClassementPageModule);
    return ClassementPageModule;
}());

//# sourceMappingURL=classement.module.js.map

/***/ }),

/***/ 810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClassementPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_data_data__ = __webpack_require__(406);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClassementPage = /** @class */ (function () {
    function ClassementPage(navCtrl, events, dataService, navParams) {
        this.navCtrl = navCtrl;
        this.events = events;
        this.dataService = dataService;
        this.navParams = navParams;
    }
    ClassementPage.prototype.ionViewDidEnter = function () {
        this.dataService.loadEmployers();
    };
    ClassementPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-classement',template:/*ion-inline-start:"C:\Users\HP\workspace\pop-v1\src\pages\classement\classement.html"*/'<!--\n  Generated template for the ClassementPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header no-border no-shadow>\n  <ion-navbar>\n    <ion-title>Classement</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n<ion-list>\n    <ion-item-group *ngFor="let group of dataService.departements()">\n        <ion-item-divider color="light">{{group}}</ion-item-divider>\n        <ion-item  *ngFor="let employer of dataService.findByname(group)">\n            <h2>{{employer.name}}</h2>\n            <h3>{{employer.position}}</h3>\n            <ion-badge item-end *ngIf="employer.score" [color]="dataService.colorScore(employer.score)">{{employer.score}}</ion-badge>\n            </ion-item>\n      </ion-item-group>\n</ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\Users\HP\workspace\pop-v1\src\pages\classement\classement.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__providers_data_data__["a" /* DataProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ClassementPage);
    return ClassementPage;
}());

//# sourceMappingURL=classement.js.map

/***/ })

});
//# sourceMappingURL=14.js.map