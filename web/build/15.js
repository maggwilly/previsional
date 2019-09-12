webpackJsonp([15],{

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecteursPageModule", function() { return SecteursPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__secteurs__ = __webpack_require__(921);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SecteursPageModule = /** @class */ (function () {
    function SecteursPageModule() {
    }
    SecteursPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__secteurs__["a" /* SecteursPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__secteurs__["a" /* SecteursPage */]),
            ],
        })
    ], SecteursPageModule);
    return SecteursPageModule;
}());

//# sourceMappingURL=secteurs.module.js.map

/***/ }),

/***/ 921:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SecteursPage; });
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






/**
 * Generated class for the SecteursPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SecteursPage = /** @class */ (function () {
    function SecteursPage(navCtrl, loadingCtrl, manager, modalCtrl, localisation, notify, events, viewCtrl, storage, navParams) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.manager = manager;
        this.modalCtrl = modalCtrl;
        this.localisation = localisation;
        this.notify = notify;
        this.events = events;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.navParams = navParams;
        this.secteurs = [];
        this.queryText = '';
        this.openAddPage = this.navParams.get('openAddPage');
        this.events.subscribe('loaded:secteur:new', function () {
            // this.loadData();
        });
    }
    SecteursPage.prototype.ionViewDidLoad = function () {
        if (this.openAddPage)
            this.add();
        this.loadData();
    };
    SecteursPage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    SecteursPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('secteur', this.localisation.isOnline()).then(function (data) {
            _this.secteurs = data ? data : [];
            _this.loading = false;
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            console.log(error);
            _this.loading = false;
            _this.notify.onError({ message: " Verifiez votre connexion internet" });
        });
    };
    SecteursPage.prototype.loadRemoteData = function () {
        var _this = this;
        var loader = this.notify.loading({
            content: "chargement...",
        });
        this.loading = true;
        this.manager.get('secteur', true).then(function (data) {
            _this.secteurs = data ? data : [];
            _this.loading = false;
            loader.dismiss();
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            loader.dismiss();
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
        loader.present();
    };
    SecteursPage.prototype.add = function (secteur) {
        var _this = this;
        if (secteur === void 0) { secteur = {}; }
        var modal = this.modalCtrl.create('SecteurPage', { secteur: secteur, inset: true }, { cssClass: 'inset-modal' });
        modal.onDidDismiss(function (data) {
            var index = -1;
            if (data && data.id) {
                index = _this.secteurs.findIndex(function (item) { return item.id == data.id; });
                _this.secteurs.splice(0, 0, data);
            }
            else if (data && data.deletedId) {
                index = _this.secteurs.findIndex(function (item) { return item.id == data.deletedId; });
                if (index > -1)
                    _this.secteurs.splice(index, 1);
            }
        });
        modal.present();
    };
    SecteursPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.secteurs.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    SecteursPage.prototype.filter = function (item, queryWords) {
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
    SecteursPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-secteurs',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\secteurs\secteurs.html"*/'<ion-header  no-border no-shadow>\n\n    <ion-navbar hideBackButton="true">\n\n        <button menuToggle  ion-button icon-only showwhen="mobile">\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>\n\n      <ion-row no-padding>\n\n          <ion-col>  <ion-title>Liste des zones</ion-title></ion-col>\n\n          <ion-col>\n\n            <ion-searchbar [hidden]="!secteurs.length"  [(ngModel)]="queryText" (ionInput)="search()" placeholder="Recherchez un produit">\n\n            </ion-searchbar>         \n\n          </ion-col>\n\n        </ion-row>       \n\n      <ion-buttons end>\n\n      <button ion-button="ion-button" icon-only (click)="loadRemoteData()" >\n\n          <ion-icon name="refresh"></ion-icon>\n\n      </button>\n\n      <button ion-button small outline (click)="add()" icon-left>\n\n          <ion-icon name="add" ></ion-icon>\n\n          Créer\n\n      </button>          \n\n  </ion-buttons>    \n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content padding-top>     \n\n      <ion-list *ngIf="secteurs.length">\n\n          <ion-list-header>Liste des zones ({{secteurs.length}} )</ion-list-header>\n\n          <ion-item  *ngFor="let secteur of secteurs" (click)="add(secteur)" [hidden]="secteur.hide" text-wrap>\n\n                <span *ngIf="secteur.ville">{{secteur.ville}} - </span> <strong>{{secteur.nom}}</strong>\n\n              <p>{{secteur.description}}</p>\n\n          </ion-item>\n\n      </ion-list>\n\n      <ion-grid style="justify-content: center;height: 100%;" *ngIf="!secteurs.length&&loading"> \n\n          <ion-row style="justify-content: center;height: 100%;" justify-content-center align-items-center>\n\n              <ion-spinner name="ios"></ion-spinner>\n\n          </ion-row>\n\n          \n\n        </ion-grid> \n\n        <ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!secteurs.length&&!loading">\n\n            <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n\n                <div text-center text-wrap  class="empty" padding>\n\n                  Aucune zone crée.\n\n                </div>\n\n            </ion-row>\n\n          </ion-grid>\n\n  </ion-content> \n\n           '/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\secteurs\secteurs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], SecteursPage);
    return SecteursPage;
}());

//# sourceMappingURL=secteurs.js.map

/***/ })

});
//# sourceMappingURL=15.js.map