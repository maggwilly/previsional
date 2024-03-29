webpackJsonp([33],{

/***/ 831:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FiltrePointventePageModule", function() { return FiltrePointventePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filtre_pointvente__ = __webpack_require__(896);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var FiltrePointventePageModule = /** @class */ (function () {
    function FiltrePointventePageModule() {
    }
    FiltrePointventePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__filtre_pointvente__["a" /* FiltrePointventePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__filtre_pointvente__["a" /* FiltrePointventePage */]),
            ],
        })
    ], FiltrePointventePageModule);
    return FiltrePointventePageModule;
}());

//# sourceMappingURL=filtre-pointvente.module.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltrePointventePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__ = __webpack_require__(45);
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
 * Generated class for the FiltrePointventePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FiltrePointventePage = /** @class */ (function () {
    function FiltrePointventePage(navCtrl, modalCtrl, viewCtrl, manager, navParams) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.manager = manager;
        this.navParams = navParams;
        this.filtre = { user: "" };
        this.secteurs = [];
        this.users = [];
        this.filtre = navParams.get('filtre') ? navParams.get('filtre') : { user: "" };
    }
    FiltrePointventePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.manager.get('secteur').then(function (data) {
            _this.secteurs = data ? data : [];
        }, function (error) {
            console.log(error);
        });
        this.manager.get('user').then(function (data) {
            _this.users = data ? data : [];
        }, function (error) {
        });
    };
    FiltrePointventePage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    FiltrePointventePage.prototype.onSubmit = function () {
        this.viewCtrl.dismiss(this.filtre);
    };
    FiltrePointventePage.prototype.select = function () {
        var _this = this;
        var modal = this.modalCtrl.create('QuartiersPage', { ville: this.filtre.ville });
        modal.onDidDismiss(function (data) {
            _this.filtre.quartier = data;
        });
        modal.present();
    };
    FiltrePointventePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-filtre-pointvente',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\filtre-pointvente\filtre-pointvente.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>Critères de recherche</ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="dismiss()" icon-left>\n\n                <ion-icon name="md-close" color="danger" showwhen="android,windows,core"></ion-icon>\n\n                Fermer\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n        <ion-item>\n\n                <ion-label color="primary" floating>\n\n                    <span>Categorie</span>\n\n                </ion-label>\n\n                <ion-select [(ngModel)]="filtre.type" name="type" #type="ngModel"> \n\n                    <ion-option value="Boutique">Boutique</ion-option>\n\n                    <ion-option value="Super-Marche">Super-Marché</ion-option>\n\n                    <ion-option value="Kiosque">Kiosque</ion-option>\n\n                    <ion-option value="Menage">Menage</ion-option>\n\n                    <ion-option value="Boulangerie">Boulangerie</ion-option>\n\n                    <ion-option value="Debit de boisson">Debit-de-boisson</ion-option>\n\n                    <ion-option value="Station-service">Station-service</ion-option>\n\n                    <ion-option value="Point de vente">Point de vente</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n    <ion-item>\n\n        \n\n        <ion-label color="primary">\n\n            <span>Dans la ville de </span>\n\n        </ion-label>\n\n        <ion-select [(ngModel)]="filtre.ville" name="ville" #ville="ngModel">\n\n            <ion-option value="">Toutes les villes</ion-option>\n\n            <ion-option value="Yaoundé">Yaoundé</ion-option>\n\n            <ion-option value="Douala">Douala</ion-option>\n\n            <ion-option value="Bafoussam">Bafoussam</ion-option>\n\n            <ion-option value="Bertoua">Bertoua</ion-option>\n\n            <ion-option value="Bamenda">Bamenda</ion-option>\n\n            <ion-option value="Dschang">Dschang</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n    <ion-item *ngIf="secteurs&&secteurs.length">\n\n        <ion-label color="primary">\n\n            <span>Situés dans la zone de </span>\n\n        </ion-label>\n\n        <ion-select [(ngModel)]="filtre.secteur" name="secteur" #secteur="ngModel">\n\n            <ion-option value="">Toutes les zones</ion-option>\n\n            <ion-option *ngFor="let secteur of secteurs" [value]="secteur.id">{{secteur.nom}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n    <ion-item [hidden]="!filtre.ville" (click)="select()">\n\n        <ion-label color="primary">\n\n            <span>Quartier</span>\n\n        </ion-label>\n\n        <ion-input [(ngModel)]="filtre.quartier" name="quartier" type="text" placeholder="" #quartier="ngModel">\n\n        </ion-input>\n\n    </ion-item>\n\n    <ion-item-divider> Prospectés </ion-item-divider>\n\n    <ion-row>\n\n        <ion-col>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Prospectés  après le </span></ion-label>\n\n                <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                    cancelText="Annuler" name="afterdate" [(ngModel)]="filtre.afterdate" #date="ngModel" placeholder="Date"></ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n        <ion-col>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Prospectés  avant le </span></ion-label>\n\n                <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé" placeholder="Date"\n\n                    cancelText="Annuler" name="beforedate" [(ngModel)]="filtre.beforedate" #date="ngModel">\n\n                </ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n    </ion-row>\n\n    <ion-item-divider>Livré ou visité</ion-item-divider>\n\n    <ion-row>\n\n        <ion-col>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Livrés ou visité après le </span></ion-label>\n\n                <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                    cancelText="Annuler" name="aftervisitedate" [(ngModel)]="filtre.aftervisitedate"\n\n                    #aftervisitedate="ngModel"></ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n        <ion-col>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Livrés ou visité avant le </span></ion-label>\n\n                <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                    cancelText="Annuler" name="beforevisitedate" [(ngModel)]="filtre.beforevisitedate"\n\n                    #beforevisitedate="ngModel"></ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n    </ion-row>\n\n    <ion-item-divider>Prochaine livraison prévue</ion-item-divider>\n\n    <ion-row>\n\n        <ion-col>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Prochaine livraison après le </span></ion-label>\n\n                <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                    cancelText="Annuler" name="afterrendevousdate" [(ngModel)]="filtre.afterrendevousdate"\n\n                    #afterrendevousdate="ngModel"></ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n        <ion-col>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Prochaine livraison  avant le </span></ion-label>\n\n                <ion-datetime displayFormat="DD/MM/YYYY" pickerFormat="D MMM  YYYY" min="2019" doneText="Terminé"\n\n                    cancelText="Annuler" name="beforrendezvousdate" [(ngModel)]="filtre.beforrendezvousdate"\n\n                    #beforrendezvousdate="ngModel"></ion-datetime>\n\n            </ion-item>\n\n        </ion-col>\n\n    </ion-row>    \n\n    <ion-item *ngIf="users&&users.length">\n\n        <ion-label color="primary">\n\n            <span>Prospecté par</span>\n\n        </ion-label>\n\n        <ion-select [(ngModel)]="filtre.user" name="user" #user="ngModel">\n\n            <ion-option value="">Tout le monde</ion-option>\n\n            <ion-option *ngFor="let user of users" [value]="user.id">{{user.nom}}</ion-option>\n\n        </ion-select>\n\n    </ion-item>\n\n</ion-content>\n\n<ion-footer>\n\n    <button ion-button full (click)="onSubmit()">Appliquer les critères\n\n    </button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\filtre-pointvente\filtre-pointvente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], FiltrePointventePage);
    return FiltrePointventePage;
}());

//# sourceMappingURL=filtre-pointvente.js.map

/***/ })

});
//# sourceMappingURL=33.js.map