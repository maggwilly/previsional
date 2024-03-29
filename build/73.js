webpackJsonp([73],{

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiltreVentePageModule", function() { return FiltreVentePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtre_vente__ = __webpack_require__(899);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FiltreVentePageModule = /** @class */ (function () {
    function FiltreVentePageModule() {
    }
    FiltreVentePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__filtre_vente__["a" /* FiltreVentePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__filtre_vente__["a" /* FiltreVentePage */]),
            ],
        })
    ], FiltreVentePageModule);
    return FiltreVentePageModule;
}());

//# sourceMappingURL=filtre-vente.module.js.map

/***/ }),

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltreVentePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FiltreVentePage = /** @class */ (function () {
    function FiltreVentePage(navCtrl, manager, viewCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.manager = manager;
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.filtre = { visitedBy: "" };
        this.users = [];
        this.secteurs = [];
        this.filtre = navParams.get('filtre') ? navParams.get('filtre') : { visitedBy: "" };
    }
    FiltreVentePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.manager.get('user').then(function (data) {
            _this.users = data ? data : [];
        }, function (error) {
        });
        this.manager.get('secteur').then(function (data) {
            _this.secteurs = data ? data : [];
        }, function (error) {
            console.log(error);
        });
    };
    FiltreVentePage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    FiltreVentePage.prototype.onSubmit = function () {
        this.viewCtrl.dismiss(this.filtre);
    };
    FiltreVentePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-filtre-vente',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\filtre-vente\filtre-vente.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Critères de recherche</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="dismiss()" icon-left>\n\n                <ion-icon name="md-close" color="danger" showwhen="android,windows,core"></ion-icon>\n\n                Fermer\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n        <ion-item>\n\n                <ion-label>Livraison ou visite terminées</ion-label>\n\n                <ion-toggle item-right  [(ngModel)]="filtre.terminated" name="terminated" #terminated="ngModel" color="primary">\n\n                </ion-toggle>\n\n            </ion-item>    \n\n    <ion-item>\n\n        <ion-label color="primary" >\n\n            <span>Dans la ville de </span>\n\n        </ion-label>\n\n        <ion-select [(ngModel)]="filtre.ville" name="ville" #ville="ngModel">\n\n            <ion-option value="">Toutes les villes</ion-option>\n\n            <ion-option value="Yaoundé">Yaoundé</ion-option>\n\n            <ion-option value="Douala">Douala</ion-option>\n\n            <ion-option value="Bafoussam">Bafoussam</ion-option>\n\n            <ion-option value="Bertoua">Bertoua</ion-option>\n\n            <ion-option value="Bamenda">Bamenda</ion-option>\n\n            <ion-option value="Dschang">Dschang</ion-option>\n\n            <ion-option value="Autre">Autre</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n    <!--<ion-item *ngIf="secteurs&&secteurs.length">\n\n        <ion-label color="primary" >\n\n            <span>Situés dans la zone de </span>\n\n        </ion-label>\n\n        <ion-select [(ngModel)]="filtre.secteur" name="secteur" #secteur="ngModel">\n\n            <ion-option  value="">Toutes les zones</ion-option>\n\n            <ion-option *ngFor="let secteur of secteurs" [value]="secteur.id">{{secteur.nom}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>-->\n\n    <ion-item-divider>Date de la livraison ou visite</ion-item-divider>\n\n        <ion-row>\n\n                <ion-col>\n\n                    <ion-item>\n\n                        <ion-label color="primary" floating><span>Livré ou visité après le  </span></ion-label>\n\n                        <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                            cancelText="Annuler" name="afterdate" [(ngModel)]="filtre.afterdate" #date="ngModel"></ion-datetime>\n\n                    </ion-item>\n\n                </ion-col>\n\n                <ion-col>\n\n                    <ion-item>\n\n                        <ion-label color="primary" floating><span>Livré ou visité avant le </span></ion-label>\n\n                        <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                            cancelText="Annuler" name="beforedate" [(ngModel)]="filtre.beforedate" #date="ngModel">\n\n                        </ion-datetime>\n\n                    </ion-item>\n\n                </ion-col>\n\n            </ion-row>            \n\n    <ion-item *ngIf="users&&users.length">\n\n        <ion-label color="primary" >\n\n            <span>Livré ou visité par</span>\n\n        </ion-label>\n\n        <ion-select [(ngModel)]="filtre.visitedBy" name="visitedBy" #user="ngModel">\n\n            <ion-option  value="">Tout le monde</ion-option>\n\n            <ion-option *ngFor="let user of users" [value]="user.id">{{user.nom}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n</ion-content>\n\n<ion-footer>\n\n    <button ion-button full (click)="onSubmit()">Appliquer les critères\n\n    </button>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\filtre-vente\filtre-vente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], FiltreVentePage);
    return FiltreVentePage;
}());

//# sourceMappingURL=filtre-vente.js.map

/***/ })

});
//# sourceMappingURL=73.js.map