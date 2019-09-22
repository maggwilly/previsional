webpackJsonp([63],{

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProduitPageModule", function() { return ProduitPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__produit__ = __webpack_require__(913);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProduitPageModule = /** @class */ (function () {
    function ProduitPageModule() {
    }
    ProduitPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__produit__["a" /* ProduitPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__produit__["a" /* ProduitPage */]),
            ],
        })
    ], ProduitPageModule);
    return ProduitPageModule;
}());

//# sourceMappingURL=produit.module.js.map

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProduitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_manager_manager__ = __webpack_require__(47);
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
 * Generated class for the ProduitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProduitPage = /** @class */ (function () {
    function ProduitPage(navCtrl, storage, navParams, viewCtrl, notify, manager) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.notify = notify;
        this.manager = manager;
        this.produit = { enabled: true, unite: 'Unité' };
        this.produit = this.navParams.get('produit') ? this.navParams.get('produit') : this.produit;
        if (!this.inset)
            this.inset = this.navParams.get('inset');
    }
    ProduitPage.prototype.ionViewDidLoad = function () {
    };
    ProduitPage.prototype.isInvalid = function () {
        return (!this.produit.nom || !this.produit.cout);
    };
    ProduitPage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    ProduitPage.prototype.onSubmit = function () {
        var _this = this;
        this.produit.change = true;
        var self = this;
        var loader = this.notify.loading({
            content: "Enregistrement...",
        });
        this.manager.save('produit', this.produit).then(function (data) {
            loader.dismiss().then(function () {
                if (!data.error) {
                    self.dismiss(data);
                    return _this.notify.onSuccess({ message: "Enregistrement effectué" });
                }
                _this.notify.onError({ message: "Une erreur s'est produite et l'opération n'a pas put se terminer correctement" });
            });
        }, function (error) {
            loader.dismiss();
            _this.notify.onSuccess({ message: "Verifiez votre connexion internet" });
        });
        loader.present();
    };
    ProduitPage.prototype.deleteItem = function () {
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
                        _this.manager.delete('produit', _this.produit).then(function (data) {
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
    ProduitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-produit',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\produit\produit.html"*/'<ion-header no-border no-shadow >\n\n  <ion-navbar>\n\n        <ion-title><span *ngIf="!produit.nom">Créer un produit</span><span *ngIf="produit.nom">{{produit.nom}}</span></ion-title>\n\n        <ion-buttons end>\n\n                <button ion-button="ion-button" (click)="dismiss()" icon-left>\n\n                    <ion-icon name="md-close" color="danger" showwhen="android,windows,core"></ion-icon> \n\n                    Fermer\n\n                </button>\n\n            </ion-buttons>        \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content >\n\n        <ion-card>\n\n                <ion-card-header text-wrap>Créer ou modifier un article</ion-card-header>\n\n        </ion-card>     \n\n    <form #form="ngForm" novalidate="novalidate">\n\n        <ion-list>\n\n            <ion-item>\n\n                <ion-label color="primary" floating><span>Nom du produit </span> </ion-label>\n\n                <ion-input [(ngModel)]="produit.nom" name="nom" type="text" placeholder="" #nom="ngModel"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-label color="primary"><span>Prix de vente </span> </ion-label>\n\n                <ion-input [(ngModel)]="produit.cout" name="cout" type="number" placeholder="" #nom="ngModel"></ion-input>\n\n            </ion-item> \n\n            <ion-item>\n\n                    <ion-label color="primary" >\n\n                        <span>Unité de vente</span>\n\n                    </ion-label>\n\n                    <ion-select [(ngModel)]="produit.unite" name="unite" #type="ngModel"> \n\n                        <ion-option value="Unité">Unité</ion-option>\n\n                        <ion-option value="Colis">Colis</ion-option>\n\n                        <ion-option value="Carton">Carton</ion-option>\n\n                        <ion-option value="Bouteille">Bouteille</ion-option>\n\n                        <ion-option value="Palette">Palette</ion-option>\n\n                        <ion-option value="Pack">Pack</ion-option>\n\n                        <ion-option value="Paquet">Paquet</ion-option>\n\n                        <ion-option value="Litre">Litre</ion-option>\n\n                        <ion-option value="Kilograme">Kilograme</ion-option>\n\n                        <ion-option value="Pièce">Pièce</ion-option>\n\n                        <ion-option value="Boîte">Boîte</ion-option>\n\n                    </ion-select>\n\n                </ion-item>             \n\n            <ion-item>\n\n                    <ion-textarea rows="1" [(ngModel)]="produit.description" placeholder="Description du produit"\n\n                        name="description" #description="ngModel"></ion-textarea>\n\n            </ion-item> \n\n            <ion-item>\n\n                    <ion-label>Activer les prévision</ion-label>\n\n                    <ion-toggle item-right  [(ngModel)]="produit.control" name="control" #control="ngModel" color="secondary">\n\n                    </ion-toggle>\n\n            </ion-item>                                  \n\n        </ion-list>\n\n        <div padding="padding" >\n\n            <button  *ngIf="produit.id" ion-button outline block icon-right color="danger" (click)="deleteItem()">\n\n                    <span>Supprimer ce produit\n\n                        <ion-icon name="close"></ion-icon>\n\n                    </span>\n\n               </button>              \n\n        </div>\n\n    </form>\n\n</ion-content>\n\n<ion-footer >\n\n    <button  ion-button full icon-right [disabled]="isInvalid()" (click)="onSubmit()">\n\n            <span *ngIf="!produit.id">Créer un produit</span>\n\n            <span *ngIf="produit.id">Enregistrer les changements</span>\n\n            <ion-icon name="md-done-all"></ion-icon> \n\n    </button>\n\n  </ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\produit\produit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_4__providers_manager_manager__["a" /* ManagerProvider */]])
    ], ProduitPage);
    return ProduitPage;
}());

//# sourceMappingURL=produit.js.map

/***/ })

});
//# sourceMappingURL=63.js.map