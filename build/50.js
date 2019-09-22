webpackJsonp([50],{

/***/ 863:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendeursPageModule", function() { return VendeursPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vendeurs__ = __webpack_require__(936);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var VendeursPageModule = /** @class */ (function () {
    function VendeursPageModule() {
    }
    VendeursPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__vendeurs__["a" /* VendeursPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__vendeurs__["a" /* VendeursPage */]),
            ],
        })
    ], VendeursPageModule);
    return VendeursPageModule;
}());

//# sourceMappingURL=vendeurs.module.js.map

/***/ }),

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendeursPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var VendeursPage = /** @class */ (function () {
    function VendeursPage(navCtrl, loadingCtrl, manager, localisation, userService, notify, storage, navParams) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.manager = manager;
        this.localisation = localisation;
        this.userService = userService;
        this.notify = notify;
        this.storage = storage;
        this.navParams = navParams;
        this.vendeurs = [];
        this.requesteds = [];
        this.queryText = '';
        this.loading = false;
    }
    VendeursPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    VendeursPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('vendeur', this.localisation.isOnline()).then(function (data) {
            _this.vendeurs = data ? data : [];
            _this.loading = false;
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            _this.notify.onError({ message: " Verifiez votre connexion internet" });
        });
    };
    VendeursPage.prototype.loadRemoteData = function () {
        var _this = this;
        var loader = this.notify.loading({
            content: "chargement...",
        });
        this.loading = true;
        this.manager.get('vendeur', true).then(function (data) {
            _this.vendeurs = data ? data : [];
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
    VendeursPage.prototype.add = function () {
        var _this = this;
        var self = this;
        this.notify.showAlert({
            subTitle: "Nouveau vendeur",
            message: 'Ajouter un membre a votre equipe de vente',
            inputs: [
                {
                    name: 'nom',
                    type: 'text',
                    placeholder: 'Saisir le nom',
                    value: ''
                },
                {
                    name: 'username',
                    type: 'tel',
                    placeholder: 'Numero de telephone',
                    value: ''
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
                    text: 'Inviter',
                    handler: function (data) {
                        if (!data.username || data.username == self.userService.user.username)
                            return;
                        var loader = _this.notify.loading({
                            content: "Invitation...",
                        });
                        self.manager.save('request', data, _this.localisation.isOnline()).then(function (req) {
                            loader.dismiss().then(function () {
                                if (!req.id)
                                    return;
                                _this.requesteds.splice(0, 0, req);
                                _this.notify.onSuccess({ message: "Demande envoyee !" });
                            });
                        }, function (error) {
                            loader.dismiss();
                            _this.notify.onError({ message: "Verifiez votre connexion internet" });
                        });
                        loader.present();
                    }
                }
            ]
        });
    };
    VendeursPage.prototype.deleteRequest = function (requested) {
        var _this = this;
        var loader = this.notify.loading({
            content: "Suppression...",
        });
        this.manager.delete('request', requested, 'delete', this.localisation.isOnline()).then(function (data) {
            if (data.ok) {
                loader.dismiss().then(function () {
                    var index = _this.requesteds.findIndex(function (item) { return item.id == data.deletedId; });
                    if (index > -1)
                        _this.requesteds.splice(index, 1);
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
    };
    VendeursPage.prototype.deleteUser = function (user) {
        var _this = this;
        this.notify.showAlert({
            title: "Suppression",
            message: "Voulez-vous supprimer ce vendeur de votre equipe ?",
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
                        _this.manager.delete('user', user, 'delete', true).then(function (data) {
                            if (data.ok) {
                                loader.dismiss().then(function () {
                                    var index = _this.vendeurs.findIndex(function (item) { return item.id == data.deletedId; });
                                    _this.vendeurs.splice(index, 1);
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
    VendeursPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.vendeurs.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    VendeursPage.prototype.filter = function (item, queryWords) {
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
    VendeursPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-vendeurs',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\vendeurs\vendeurs.html"*/'<ion-header no-border no-shadow>\n\n    <ion-navbar hideBackButton="true">\n\n        <button menuToggle  ion-button icon-only showWhen="mobile">\n\n            <ion-icon name="menu"></ion-icon>\n\n          </button>  \n\n      <ion-title>Les vendeurs</ion-title>\n\n      <ion-buttons end>\n\n      <button ion-button="ion-button" icon-only (click)="loadRemoteData()" >\n\n          <ion-icon name="refresh"></ion-icon>\n\n      </button>\n\n      <button ion-button small outline (click)="add()" icon-left>\n\n            <ion-icon name="add" ></ion-icon>\n\n            Créer\n\n        </button>           \n\n  </ion-buttons>    \n\n    </ion-navbar>\n\n  </ion-header>\n\n  <ion-content>\n\n    <!--  <ion-searchbar [hidden]="!vendeurs.length" [(ngModel)]="queryText" (ionInput)="search()" placeholder="Recherchez un nom">\n\n        </ion-searchbar>  -->   \n\n      <ion-list *ngIf="(vendeurs.length)">\n\n          <div *ngIf="vendeurs.length">\n\n         <ion-item-divider  color="light">Mon equipe de vente ({{vendeurs.length}} membres)</ion-item-divider> \n\n          <ion-item  *ngFor="let vendeur of vendeurs"  [hidden]="vendeur.hide||vendeur.id==userService.user">\n\n                <span *ngIf="vendeur.id!=userService.user">{{vendeur.nom}}</span> \n\n              <p *ngIf="vendeur.id!=userService.user">{{vendeur.phone}}</p>          \n\n               <button  ion-button outline color="danger" (click)="deleteUser(vendeur)" only-icon small item-right color="danger">\n\n                    <span>\n\n                        <ion-icon  name="close"></ion-icon>\n\n                    </span>\n\n               </button>  \n\n          </ion-item>\n\n          </div>\n\n          <div *ngIf="requesteds.length">\n\n          <ion-item-divider  color="light">Demandes envoyees ({{requesteds.length}})</ion-item-divider> \n\n          <ion-item  *ngFor="let requested of requesteds"  [hidden]="requested.hide">\n\n                 {{requested.user.nom}}\n\n              <p>{{requested.user.phone}}</p>\n\n              <button  ion-button clear color="danger" small item-right (click)="deleteRequest(requested)" color="danger">\n\n                    <span>Annuler\n\n                        <ion-icon  name="close"></ion-icon>\n\n                    </span>\n\n               </button>              \n\n          </ion-item> \n\n          </div>       \n\n      </ion-list>\n\n      <ion-grid style="justify-content: center;height: 100%;" *ngIf="(!vendeurs.length&&!requesteds.length)||loading">\n\n          <ion-row style="justify-content: center;height: 100%;" justify-content-center align-items-center>\n\n              <ion-spinner name="ios"></ion-spinner>\n\n          </ion-row>\n\n        </ion-grid>       \n\n  </ion-content>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\vendeurs\vendeurs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_5__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], VendeursPage);
    return VendeursPage;
}());

//# sourceMappingURL=vendeurs.js.map

/***/ })

});
//# sourceMappingURL=50.js.map