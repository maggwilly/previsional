webpackJsonp([29],{

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointVentePageModule", function() { return PointVentePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__point_vente__ = __webpack_require__(906);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var PointVentePageModule = /** @class */ (function () {
    function PointVentePageModule() {
    }
    PointVentePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__point_vente__["a" /* PointVentePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__point_vente__["a" /* PointVentePage */]),
            ],
        })
    ], PointVentePageModule);
    return PointVentePageModule;
}());

//# sourceMappingURL=point-vente.module.js.map

/***/ }),

/***/ 906:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointVentePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PointVentePage = /** @class */ (function () {
    function PointVentePage(navCtrl, storage, navParams, viewCtrl, notify, modalCtrl, localisation, userService, manager, location) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.notify = notify;
        this.modalCtrl = modalCtrl;
        this.localisation = localisation;
        this.userService = userService;
        this.manager = manager;
        this.location = location;
        this.pointVente = {};
        this.secteurs = [];
        this.pointVente = this.navParams.get('pointVente') ? this.navParams.get('pointVente') : {};
        this.inset = this.navParams.get('inset');
        if (!this.pointVente.secteur)
            this.pointVente.secteur = this.userService.user.secteur;
        if (this.pointVente.secteur)
            this.pointVente.secteur = this.pointVente.secteur.id;
        if (!this.pointVente.date)
            this.pointVente.date = __WEBPACK_IMPORTED_MODULE_7_moment__().format("YYYY-MM-DD");
        //
    }
    PointVentePage.prototype.getCurrentPosition = function ($ev) {
        var _this = this;
        if (!this.pointVente.atnow)
            return;
        this.fetching = true;
        this.location.getCurrentPosition().then(function (resp) {
            _this.pointVente.lat = resp.coords.latitude;
            _this.pointVente.long = resp.coords.longitude;
            _this.fetching = false;
        }).catch(function (error) {
            _this.fetching = false;
            console.log(error);
        });
    };
    PointVentePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.manager.get('secteur').then(function (data) {
            _this.secteurs = data ? data : [];
            if (_this.pointVente.secteur && _this.pointVente.secteur.id)
                _this.pointVente.secteur = _this.pointVente.secteur.id;
        }, function (error) {
            _this.notify.onError({ message: " Verifiez votre connexion internet" });
        });
    };
    PointVentePage.prototype.select = function () {
        var _this = this;
        var modal = this.modalCtrl.create('QuartiersPage', { ville: this.pointVente.ville });
        modal.onDidDismiss(function (data) {
            _this.pointVente.quartier = data;
        });
        modal.present();
    };
    PointVentePage.prototype.isInvalid = function () {
        return (!this.pointVente.nom || !this.pointVente.adresse || !this.pointVente.telephone || (this.pointVente.atnow && (!this.pointVente.lat || !this.pointVente.long)));
    };
    PointVentePage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    PointVentePage.prototype.onSubmit = function () {
        var _this = this;
        this.pointVente.change = true;
        var self = this;
        var loader = this.notify.loading({
            content: "Enregistrement...",
        });
        this.manager.save('pointvente', this.pointVente, this.localisation.isOnline()).then(function (data) {
            loader.dismiss().then(function () {
                if (!data.error) {
                    self.dismiss(data);
                    return _this.notify.onSuccess({ message: "Enregistrement effectué" });
                }
                _this.notify.onError({ message: "Une erreur s'est produite" });
            });
        }, function (error) {
            loader.dismiss();
            _this.notify.onError({ message: "Un probleme est survenu" });
        });
        loader.present();
    };
    PointVentePage.prototype.deleteItem = function () {
        var _this = this;
        var self = this;
        this.notify.showAlert({
            title: "Suppression",
            message: "Voulez-vous supprimer cet element ?",
            buttons: [
                {
                    text: 'Annuler',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Supprimer',
                    handler: function (data) {
                        var loader = _this.notify.loading({
                            content: "Suppression...",
                        });
                        _this.manager.delete('pointvente', _this.pointVente).then(function (data) {
                            if (data.ok) {
                                loader.dismiss().then(function () {
                                    self.dismiss(data);
                                    _this.notify.onSuccess({ message: "Element supprime" });
                                });
                            }
                            else {
                                loader.dismiss();
                                _this.notify.onError({ message: "Cet element est lie a d'autres. Vous ne pouvez pas le supprimer" });
                            }
                        }, function (error) {
                            loader.dismiss();
                            _this.notify.onError({ message: "Un probleme est survenu" });
                        });
                        loader.present();
                    }
                }
            ]
        });
    };
    PointVentePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-point-vente',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\point-vente\point-vente.html"*/'<ion-header no-border no-shadow>\n\n\n\n    <ion-navbar>\n\n        <ion-title><span *ngIf="!pointVente.nom">Créer un client</span><span\n\n                *ngIf="pointVente.nom">{{pointVente.nom}}</span></ion-title>\n\n        <ion-buttons end>\n\n            <button ion-button (click)="dismiss()" icon-left>\n\n                <ion-icon name="md-close" color="danger" showwhen="android,windows,core"></ion-icon>\n\n                Fermer\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <form #form="ngForm" novalidate="novalidate">\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Nom du client</span> </ion-label>\n\n                <ion-input [(ngModel)]="pointVente.nom" name="nom" type="text" placeholder="" #nom="ngModel">\n\n                </ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary" floating>\n\n                    <span>Categorie</span>\n\n                </ion-label>\n\n                <ion-select [(ngModel)]="pointVente.type" name="type" #type="ngModel"> \n\n                    <ion-option value="Boutique">Boutique</ion-option>\n\n                    <ion-option value="Super-Marche">Super-Marché</ion-option>\n\n                    <ion-option value="Kiosque">Kiosque</ion-option>\n\n                    <ion-option value="Menage">Menage</ion-option>\n\n                    <ion-option value="Boulangerie">Boulangerie</ion-option>\n\n                    <ion-option value="Debit de boisson">Debit-de-boisson</ion-option>\n\n                    <ion-option value="Station-service">Station-service</ion-option>\n\n                    <ion-option value="Point de vente">Point de vente</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary" floating>\n\n                    <span>Numero de télephone</span>\n\n                </ion-label>\n\n                <ion-input [(ngModel)]="pointVente.telephone" name="telephone" type="tel" placeholder=""\n\n                    #telephone="ngModel"></ion-input>\n\n            </ion-item>\n\n            <ion-item *ngIf="!inset">\n\n                <ion-label color="primary" floating>\n\n                    <span>Ville</span>\n\n                </ion-label>\n\n                <ion-select [(ngModel)]="pointVente.ville" name="ville" #ville="ngModel">\n\n                    <ion-option value="Yaoundé">Yaoundé</ion-option>\n\n                    <ion-option value="Douala">Douala</ion-option>\n\n                    <ion-option value="Bafoussam">Bafoussam</ion-option>\n\n                    <ion-option value="Bertoua">Bertoua</ion-option>\n\n                    <ion-option value="Bamenda">Bamenda</ion-option>\n\n                    <ion-option value="Dschang">Dschang</ion-option>\n\n                    <ion-option value="Autre">Autre</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="secteurs&&secteurs.length&&!inset">\n\n                <ion-label color="primary" floating>\n\n                    <span>Zone</span>\n\n                </ion-label>\n\n                <ion-select [(ngModel)]="pointVente.secteur" name="secteur" #secteur="ngModel">\n\n                        <ion-option value="">Toute la ville</ion-option>\n\n                    <ion-option *ngFor="let secteur of secteurs" [value]="secteur.id">{{secteur.nom}}</ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item *ngIf="!inset" [hidden]="!pointVente.ville" (click)="select()">\n\n                <ion-label color="primary" floating>\n\n                    <span>Nom du quartier</span>\n\n                </ion-label>\n\n                <ion-input [(ngModel)]="pointVente.quartier" name="quartier" type="text" placeholder=""\n\n                    #quartier="ngModel"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                    <ion-label>J\'y suis maintenant</ion-label>\n\n                    <ion-toggle item-right (ionChange)="getCurrentPosition()" [(ngModel)]="pointVente.atnow" name="atnow" #atnow="ngModel" color="primary">\n\n                    </ion-toggle>\n\n            </ion-item>            \n\n            <button ion-item (click)="getCurrentPosition()" [hidden]="!pointVente.atnow">\n\n                <ion-icon name="pin" item-left></ion-icon>\n\n                <h2>Position géographique</h2>\n\n                <p  *ngIf="!fetching&&pointVente.long&&pointVente.lat">l\n\n                    atitude: {{pointVente.lat}}, longitude: {{pointVente.long}}</p>\n\n                <p  *ngIf="fetching">Localisation ...</p>\n\n                <p  *ngIf="!fetching&&(!pointVente.long||!pointVente.lat)" style="color: red; font-weight: bold;">\n\n                  Connectez-vous et cliquez  pour determiner la position.\n\n                </p>\n\n                </button>\n\n            <ion-item>\n\n                <ion-textarea rows="2" [(ngModel)]="pointVente.adresse"\n\n                    placeholder="Description du lieu par rapport à un endroit connu" name="adresse" #adresse="ngModel">\n\n                </ion-textarea>\n\n            </ion-item>\n\n        </ion-list>\n\n        <div padding="padding" >\n\n            <br>\n\n            <button  *ngIf="pointVente.id" ion-button outline block icon-right color="danger" (click)="deleteItem()">\n\n                <span>Désactiver ce point de vente\n\n                    <ion-icon name="close"></ion-icon>\n\n                </span>\n\n            </button>\n\n        </div>\n\n    </form>\n\n</ion-content>\n\n<ion-footer >\n\n    <button ion-button full icon-right [disabled]="isInvalid()" (click)="onSubmit()">\n\n            <span *ngIf="!pointVente.id">Creer un point de vente</span>\n\n            <span *ngIf="pointVente.id">Enregistrer les changements</span>\n\n            <ion-icon name="md-done-all"></ion-icon>\n\n        </button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\point-vente\point-vente.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */]])
    ], PointVentePage);
    return PointVentePage;
}());

//# sourceMappingURL=point-vente.js.map

/***/ })

});
//# sourceMappingURL=29.js.map