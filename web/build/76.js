webpackJsonp([76],{

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommendesPageModule", function() { return CommendesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commendes__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CommendesPageModule = /** @class */ (function () {
    function CommendesPageModule() {
    }
    CommendesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__commendes__["a" /* CommendesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__commendes__["a" /* CommendesPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */]
            ],
        })
    ], CommendesPageModule);
    return CommendesPageModule;
}());

//# sourceMappingURL=commendes.module.js.map

/***/ }),

/***/ 874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommendesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CommendesPage = /** @class */ (function () {
    function CommendesPage(navCtrl, navParams, manager, app, events, localisation, modalCtrl, loadingCtrl, notify, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.manager = manager;
        this.app = app;
        this.events = events;
        this.localisation = localisation;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.storage = storage;
        this.commendes = [];
        this.queryText = '';
        this.isOnline = this.localisation.isOnline();
        this.today = __WEBPACK_IMPORTED_MODULE_6_moment__().format("YYYY-MM-DD");
        this.openAddPage = this.navParams.get('openAddPage');
        this.events.subscribe('commende.added', function (data) {
            if (data)
                _this.commendes.push(data);
        });
        this.events.subscribe('commende.updated', function (data) {
            var index = _this.commendes.findIndex(function (item) { return item.id == data.id; });
            if (index > -1) {
                _this.commendes.splice(index, 1);
                _this.commendes.push(data);
            }
        });
        this.events.subscribe('loaded:commande:new', function () {
            if (!_this.nbrecriteres)
                _this.loadData();
        });
    }
    CommendesPage.prototype.ionViewDidLoad = function () {
        this.refresh();
    };
    CommendesPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('commende', this.localisation.isOnline()).then(function (data) {
            _this.loading = false;
            _this.commendes = data ? data : [];
            _this.search();
        }, function (error) {
            _this.notify.onSuccess({ message: "Verifiez votre connexion internet" });
        });
    };
    CommendesPage.prototype.refresh = function () {
        this.filtre = { type: '',
            user: '', secteur: '',
            ville: '',
            afterdate: __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('month').format("YYYY-MM-DD"),
            beforedate: __WEBPACK_IMPORTED_MODULE_6_moment__().endOf('week').format("YYYY-MM-DD")
        };
        this.nbrecriteres = 0;
        this.queryText = '';
        console.log('this.openAddPage', this.openAddPage);
        if (this.openAddPage) {
            this.add();
            return this.loadData();
        }
        console.log('this.openAddPage', this.openAddPage);
        if (this.localisation.isOnline())
            return this.loadRemoteData();
        return this.loadData();
    };
    CommendesPage.prototype.loadRemoteData = function () {
        var _this = this;
        this.countCricteres(this.filtre);
        var loader = this.loadingCtrl.create({
            content: "chargement...",
        });
        this.loading = true;
        this.manager.get('commende', true, null, null, this.filtre, this.nbrecriteres).then(function (data) {
            _this.commendes = data ? data : [];
            _this.loading = false;
            _this.search();
            loader.dismiss();
        }, function (error) {
            _this.notify.onSuccess({ message: " Verifiez votre connexion internet" });
            loader.dismiss();
        });
        loader.present();
    };
    CommendesPage.prototype.confirm = function (commende, slidingItem) {
        var _this = this;
        slidingItem.close();
        if (!commende)
            return;
        this.notify.showAlert({
            title: 'Supression de rapport',
            message: 'Voulez-vous supprimer cet element ?',
            buttons: [
                {
                    text: 'Non',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Supprimer',
                    handler: function () {
                        slidingItem.close();
                        var loader = _this.notify.loading({ content: 'suppression ...' });
                        _this.manager.delete('commende', commende).then(function (data) {
                            if (data.ok) {
                                commende.deleted = true;
                                loader.dismiss();
                            }
                            else if (data.error) {
                                loader.dismiss();
                                _this.notify.onError({ message: "Cet element est lie a d'autres." });
                            }
                        }, function (error) {
                            _this.notify.onSuccess({ message: "Verifiez votre connexion internet" });
                            loader.dismiss();
                        });
                        loader.present();
                    }
                }
            ]
        });
    };
    CommendesPage.prototype.openFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create('FiltreVentePage', { filtre: this.filtre });
        modal.onDidDismiss(function (data) {
            if (!data)
                return;
            return _this.loadRemoteData();
        });
        modal.present();
    };
    CommendesPage.prototype.countCricteres = function (data) {
        var nbrecriteres = 0;
        Object.keys(data).forEach(function (key) {
            if (data[key])
                nbrecriteres++;
        });
        this.nbrecriteres = nbrecriteres;
    };
    CommendesPage.prototype.openCart = function (commende) {
        this.navCtrl.push('CommendesViewPage', { commende: commende });
    };
    CommendesPage.prototype.getPointVente = function (commende) {
        return commende.pointVenteItem ? commende.pointVenteItem : commende.pointVente;
    };
    CommendesPage.prototype.add = function () {
        var _this = this;
        this.openAddPage = false;
        var commende = { lignes: [], date: new Date() };
        var modal = this.modalCtrl.create('SelectclientPage');
        modal.onDidDismiss(function (data) {
            if (!data)
                return; // this.app.getRootNav().pop();
            commende.pointVente = data;
            _this.navCtrl.push('CommendesViewPage', { commende: commende });
        });
        modal.present();
    };
    CommendesPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.commendes.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    CommendesPage.prototype.filter = function (item, queryWords) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (item.pointVente.nom.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            matchesQueryText = true;
        }
        item.hide = !(matchesQueryText);
    };
    CommendesPage.prototype.openMap = function () {
        var points = [];
        this.commendes.forEach(function (commende) {
            if (commende.pointVente.lat && commende.pointVente.long) {
                points.push({ pos: { lat: commende.pointVente.lat, long: commende.pointVente.long },
                    nom: commende.pointVente.nom,
                    addresse: commende.pointVente.adresse,
                    type: commende.pointVente.type,
                    telephone: commende.pointVente.telephone,
                    quartier: commende.pointVente.quartier,
                    visited: commende,
                });
            }
        });
        this.navCtrl.push('MapPage', { points: points, title: "Livraisons effectu\u00E9es", filtre: this.filtre });
    };
    CommendesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-commendes',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\commendes\commendes.html"*/'<ion-header no-border >\n  <ion-navbar>\n      <button menuToggle  ion-button icon-only showWhen="mobile">\n          <ion-icon name="menu"></ion-icon>\n        </button>    \n      <ion-row no-padding>\n          <ion-col> <ion-title >Historique des visites et livraisons</ion-title></ion-col>\n          <ion-col>\n            <ion-searchbar [hidden]="!commendes.length"  [(ngModel)]="queryText" (ionInput)="search()" placeholder="Recherchez un nom">\n            </ion-searchbar>         \n          </ion-col>\n        </ion-row>    \n    <ion-buttons end>\n      <button ion-button icon-only (click)="refresh()">\n        <ion-icon name="refresh"></ion-icon>\n      </button>\n      <button ion-button icon-left outline (click)="add()">\n        <ion-icon name="add"></ion-icon>\n        Créer\n      </button>\n    </ion-buttons>    \n  </ion-navbar>\n</ion-header>\n<ion-content padding-top>\n <ion-row justify-content-around>\n   <ion-col col-6 >\n    <button ion-button icon-left outline small (click)="openFilter()" [disabled]="!isOnline"><ion-icon name="funnel"></ion-icon> \n      Critères <span *ngIf="nbrecriteres&&isOnline">  -  ({{nbrecriteres}})</span>\n    </button>\n   </ion-col>\n   <ion-col col-6 class="item-right">\n    <button float-right ion-button icon-left outline small (click)="openMap()" [disabled]="!commendes.length"> <ion-icon name="map" ></ion-icon>Carte</button>\n  </ion-col>   \n </ion-row>\n<ion-list *ngIf="commendes.length">\n  <ion-item-sliding  *ngFor="let commende of commendes"  #slidingItem [hidden]="commende.deleted||commende.hide">\n  <ion-item (click)="openCart(commende)" text-wrap>\n    <div *ngIf="commende.pointVente&&commende.id">\n    <strong>{{commende.pointVente.nom |uppercase}}</strong> -  {{commende.date|date:\'dd/MM/yyyy\' }}\n    <p><span>{{commende.pointVente.type}}</span><span *ngIf="commende.pointVente.ville">,{{commende.pointVente.ville}}</span><span *ngIf="commende.pointVente.quartier">,{{commende.pointVente.quartier}}</span><span>{{commende.pointVente.adresse}}</span></p>\n    <p>Effectué  {{commende.date|moment:\'fromnow\'}} <span *ngIf="commende.user&&commende.user.nom"> par {{commende.user.nom}}</span></p>\n  </div>\n  </ion-item>\n  <ion-item-options side="right" [hidden]="commende.terminated">    \n      <button ion-button color="danger" (click)="confirm(commende,slidingItem)">\n        <ion-icon name="trash"></ion-icon> supprimer\n      </button>          \n  </ion-item-options>        \n </ion-item-sliding> \n <div padding>\n  <button ion-button block small clear (click)="refresh()" style="text-transform: none;">Afficher plus</button>   \n </div>  \n</ion-list> \n<ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!commendes.length&&!loading">\n    <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n        <div text-center text-wrap  class="empty" padding>\n          Aucun element correspondant aux critères.\n        </div>\n    </ion-row>\n  </ion-grid>  \n<ion-fab right bottom>\n  <button ion-fab color="primary" (click)="add()"><ion-icon name="add" ></ion-icon></button>\n</ion-fab>\n</ion-content>\n<!--<ion-footer >\n    <ion-row><ion-col>{{commendes.length}} lignes</ion-col><ion-col></ion-col><ion-col></ion-col></ion-row>\n  </ion-footer>-->'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\commendes\commendes.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _k || Object])
    ], CommendesPage);
    return CommendesPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=commendes.js.map

/***/ })

});
//# sourceMappingURL=76.js.map