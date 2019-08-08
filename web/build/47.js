webpackJsonp([47],{

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommendeCreatePageModule", function() { return CommendeCreatePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commende_create__ = __webpack_require__(872);
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
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__commende_create__["a" /* CommendeCreatePage */]),
            ],
        })
    ], CommendeCreatePageModule);
    return CommendeCreatePageModule;
}());

//# sourceMappingURL=commende-create.module.js.map

/***/ }),

/***/ 864:
/***/ (function(module, exports) {

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommendeCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__home_home__);
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
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["HomePage"], {}, { animate: true, direction: 'forward' });
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], CommendeCreatePage);
    return CommendeCreatePage;
}());

//# sourceMappingURL=commende-create.js.map

/***/ })

});
//# sourceMappingURL=47.js.map