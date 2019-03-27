webpackJsonp([3],{

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatsPageModule", function() { return StatsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stats__ = __webpack_require__(815);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var StatsPageModule = /** @class */ (function () {
    function StatsPageModule() {
    }
    StatsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__stats__["a" /* StatsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__stats__["a" /* StatsPage */]),
            ],
        })
    ], StatsPageModule);
    return StatsPageModule;
}());

//# sourceMappingURL=stats.module.js.map

/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsPage; });
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


/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StatsPage = /** @class */ (function () {
    function StatsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    StatsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StatsPage');
    };
    StatsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-stats',template:/*ion-inline-start:"C:\Users\HP\workspace\pop-v1\src\pages\stats\stats.html"*/'<ion-header no-border no-shadow>\n    <ion-navbar>\n      <ion-title>Statistiques</ion-title>\n    </ion-navbar>\n  </ion-header>\n  <ion-content >\n      <ion-card>\n          <ion-card-header>\n            Classements\n          </ion-card-header>\n          <ion-card-content>\n            <canvas #barCanvas></canvas>\n          </ion-card-content>\n        </ion-card>\n        <ion-card>\n        <ion-card-header>\n              Details\n            </ion-card-header>\n            <ion-card-content>\n           <ion-item wrap-text>\n             Nombre de participants\n             <p>Personnes ayant participé</p>\n             <ion-badge item-end color="light">{{dataService.nbParticipants()}}</ion-badge>\n           </ion-item>\n           <ion-item wrap-text *ngIf="dataService.meilleurParticipant()">\n              Meilleur Participant - <ion-badge  color="light">{{dataService.meilleurParticipant().department}}</ion-badge>\n              <p>{{dataService.meilleurParticipant().name}}</p>\n              <ion-badge item-end color="primary">{{dataService.meilleurParticipant().score}}%</ion-badge>\n            </ion-item>         \n            </ion-card-content>\n          </ion-card>             \n  </ion-content> \n'/*ion-inline-end:"C:\Users\HP\workspace\pop-v1\src\pages\stats\stats.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], StatsPage);
    return StatsPage;
}());

//# sourceMappingURL=stats.js.map

/***/ })

});
//# sourceMappingURL=3.js.map