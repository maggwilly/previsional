webpackJsonp([26],{

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrevisionDetailsPageModule", function() { return PrevisionDetailsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__prevision_details__ = __webpack_require__(908);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PrevisionDetailsPageModule = /** @class */ (function () {
    function PrevisionDetailsPageModule() {
    }
    PrevisionDetailsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__prevision_details__["a" /* PrevisionDetailsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__prevision_details__["a" /* PrevisionDetailsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* DirectivesModule */]
            ],
        })
    ], PrevisionDetailsPageModule);
    return PrevisionDetailsPageModule;
}());

//# sourceMappingURL=prevision-details.module.js.map

/***/ }),

/***/ 908:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrevisionDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
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
 * Generated class for the PrevisionDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PrevisionDetailsPage = /** @class */ (function () {
    function PrevisionDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.produit = {};
        this.produit = this.navParams.get('produit');
    }
    PrevisionDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PrevisionDetailsPage');
    };
    PrevisionDetailsPage.prototype.show = function (pointVente) {
        this.navCtrl.push('PointVenteDetailPage', { pointVente: pointVente });
    };
    PrevisionDetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-prevision-details',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\prevision-details\prevision-details.html"*/'\n\n<ion-header #head>\n\n  <ion-navbar>\n\n    <ion-title>Prévision - {{produit.nom}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding-top hide-header [header]="head">\n\n<ion-card>\n\n    <ion-item  text-wrap> \n\n        {{produit.nom}}<ion-badge  color="light"> {{produit.next_cmd_quantity}} {{produit.unite}}(s)</ion-badge>\n\n        <p>{{produit.description}}</p>\n\n        <p *ngIf="produit.next_cmd_date">{{produit.next_cmd_quantity}} à partir de \n\n          <ion-badge color="orange"> {{produit.next_cmd_date|moment}} </ion-badge>\n\n          </p>      \n\n    </ion-item>  \n\n</ion-card>\n\n<ion-list *ngIf="produit.next_cmd_clients&&produit.next_cmd_clients.length">\n\n<ion-item *ngFor="let detail of produit.next_cmd_clients"  text-wrap>\n\n    {{detail.pointVente.nom}} \n\n    <ion-badge *ngIf="detail.quantity" color="light" >\n\n        <span> {{detail.quantity}} {{produit.unite}}(s)</span>\n\n      </ion-badge> \n\n    <ion-badge *ngIf="detail.dateat"  >\n\n    <span> {{detail.dateat |moment}}</span>\n\n  </ion-badge>    \n\n\n\n    <p><strong *ngIf="detail.pointVente.quartier">- {{detail.pointVente.quartier}}</strong>\n\n      <a href="tel: {{detail.pointVente.telephone}}">{{detail.pointVente.telephone}}</a>\n\n      <span *ngIf="detail.pointVente.ville">, {{detail.pointVente.ville}}</span>\n\n      <span *ngIf="detail.pointVente.type">{{detail.pointVente.type}}</span>\n\n      <span *ngIf="detail.pointVente.adresse">, {{detail.pointVente.adresse}}</span>\n\n    </p>\n\n    <p></p>   \n\n</ion-item>\n\n</ion-list>  \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\prevision-details\prevision-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], PrevisionDetailsPage);
    return PrevisionDetailsPage;
}());

//# sourceMappingURL=prevision-details.js.map

/***/ })

});
//# sourceMappingURL=26.js.map