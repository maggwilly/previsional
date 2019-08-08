webpackJsonp([13],{

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectproduitPageModule", function() { return SelectproduitPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectproduit__ = __webpack_require__(904);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SelectproduitPageModule = /** @class */ (function () {
    function SelectproduitPageModule() {
    }
    SelectproduitPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__selectproduit__["a" /* SelectproduitPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__selectproduit__["a" /* SelectproduitPage */]),
            ],
        })
    ], SelectproduitPageModule);
    return SelectproduitPageModule;
}());

//# sourceMappingURL=selectproduit.module.js.map

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectproduitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SelectproduitPage = /** @class */ (function () {
    function SelectproduitPage(navCtrl, alertCtrl, navParams, modalCtrl, viewCtrl, localisation, events, manager, loadingCtrl, notify, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.localisation = localisation;
        this.events = events;
        this.manager = manager;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.storage = storage;
        this.produits = [];
        this.queryText = '';
        this.loading = false;
        this.events.subscribe('loaded:produit:new', function () {
            //this.loadData();
        });
    }
    SelectproduitPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    SelectproduitPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('produit', this.localisation.isOnline()).then(function (data) {
            _this.produits = data ? data : [];
            _this.loading = false;
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            _this.loading = false;
            _this.notify.onError({ message: " Verifiez votre connexion internet" });
        });
    };
    SelectproduitPage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    SelectproduitPage.prototype.loadRemoteData = function () {
        var _this = this;
        var loader = this.notify.loading({
            content: "chargement...",
        });
        this.manager.get('produit', this.localisation.isOnline()).then(function (data) {
            _this.produits = data ? data : [];
            loader.dismiss();
        }, function (error) {
            loader.dismiss();
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
        loader.present();
    };
    SelectproduitPage.prototype.select = function (produit) {
        this.viewCtrl.dismiss(produit);
    };
    SelectproduitPage.prototype.add = function (produit) {
        var _this = this;
        if (produit === void 0) { produit = {}; }
        var modal = this.modalCtrl.create('ProduitPage', { produit: produit, inset: true }, { cssClass: 'inset-modal' });
        modal.onDidDismiss(function (data) {
            var index = -1;
            if (!data)
                return;
            if (data.deletedId || data.id) {
                index = _this.produits.findIndex(function (item) { return item.id == data.deletedId || item.id == data.id; });
                if (index > -1)
                    _this.produits.splice(index, 1);
                _this.produits.splice(0, 0, data);
                _this.select(data);
            }
        });
        modal.present();
    };
    SelectproduitPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.produits.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    SelectproduitPage.prototype.filter = function (item, queryWords) {
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
    SelectproduitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-selectproduit',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\selectproduit\selectproduit.html"*/'<ion-header  no-border no-shadow>\n    <ion-navbar>\n        <ion-buttons start>\n            <button ion-button  icon-only  (click)="dismiss()" icon-left>\n                <ion-icon name="ios-close" color="danger"></ion-icon>\n            </button>           \n        </ion-buttons> \n        <ion-row no-padding>\n                <ion-col> <ion-title >Les produits</ion-title></ion-col>\n                <ion-col>\n                        <ion-searchbar [hidden]="!produits.length" [(ngModel)]="queryText" (ionInput)="search()" placeholder="Recherchez un produit">\n                            </ion-searchbar>           \n                </ion-col>\n              </ion-row>               \n      <ion-buttons end>\n      <button ion-button small outline (click)="add()" icon-left>\n          <ion-icon name="add" ></ion-icon>\n          Créer\n      </button>           \n  </ion-buttons>    \n    </ion-navbar>\n  </ion-header>\n  <ion-content>\n        <ion-card>\n                <ion-card-header text-wrap>Selectionnez un produit pour l\'ajouter à la vente</ion-card-header>\n        </ion-card>    \n      <ion-list *ngIf="produits&&produits.length">\n          <ion-item  *ngFor="let produit of produits" (click)="select(produit)" [hidden]="produit.hide">\n              {{produit.nom}}\n              <p>{{produit.description}}</p>\n              <ion-note item-right>{{produit.cout}}</ion-note>\n          </ion-item>\n      </ion-list>\n      <ion-grid style="justify-content: center; height: 100%;" *ngIf="loading"> \n            <ion-row style="justify-content: center;height: 100%;" justify-content-center align-items-center>\n                <ion-spinner name="ios"></ion-spinner>\n            </ion-row>\n          </ion-grid>  \n            <ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!produits.length&&!loading">\n                <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n                    <div text-center text-wrap  class="empty" padding>\n                      Aucun element a afficher.\n                    </div>\n                </ion-row>\n              </ion-grid>  \n  </ion-content>\n  <ion-footer >\n        <ion-row><ion-col>{{produits.length}} lignes</ion-col><ion-col></ion-col><ion-col></ion-col></ion-row>\n      </ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\selectproduit\selectproduit.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], SelectproduitPage);
    return SelectproduitPage;
}());

//# sourceMappingURL=selectproduit.js.map

/***/ })

});
//# sourceMappingURL=13.js.map