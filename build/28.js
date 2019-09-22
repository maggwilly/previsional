webpackJsonp([28],{

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PointventesPageModule", function() { return PointventesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pointventes__ = __webpack_require__(907);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PointventesPageModule = /** @class */ (function () {
    function PointventesPageModule() {
    }
    PointventesPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__pointventes__["a" /* PointventesPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__pointventes__["a" /* PointventesPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* DirectivesModule */]
            ],
        })
    ], PointventesPageModule);
    return PointventesPageModule;
}());

//# sourceMappingURL=pointventes.module.js.map

/***/ }),

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointventesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
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







var PointventesPage = /** @class */ (function () {
    function PointventesPage(navCtrl, manager, loadingCtrl, localisation, modalCtrl, events, notify, storage, navParams) {
        this.navCtrl = navCtrl;
        this.manager = manager;
        this.loadingCtrl = loadingCtrl;
        this.localisation = localisation;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.notify = notify;
        this.storage = storage;
        this.navParams = navParams;
        this.pointventes = [];
        this.queryText = '';
        this.loading = true;
        this.isOnline = this.localisation.isOnline();
        this.openAddPage = this.navParams.get('openAddPage');
        this.filtre = this.navParams.get('filtre');
        this.events.subscribe('loaded:pointvente:new', function () {
            /* if(!this.nbrecriteres)
             this.loadData();*/
        });
    }
    PointventesPage.prototype.ionViewDidLoad = function () {
        this.refresh();
    };
    PointventesPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('pointvente', this.localisation.isOnline()).then(function (data) {
            _this.pointventes = data ? data : [];
            _this.loading = false;
            _this.search();
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
    };
    PointventesPage.prototype.refresh = function () {
        if (!this.filtre)
            this.filtre = { type: '', user: '',
                secteur: '', ville: '',
                afterdate: __WEBPACK_IMPORTED_MODULE_5_moment__().startOf('year').format("YYYY-MM-DD"),
                beforedate: __WEBPACK_IMPORTED_MODULE_5_moment__().endOf('week').format("YYYY-MM-DD")
            };
        this.nbrecriteres = 0;
        this.queryText = '';
        if (this.openAddPage) {
            this.add();
            return this.loadData();
        }
        if (this.localisation.isOnline())
            return this.loadRemoteData();
        return this.loadData();
    };
    PointventesPage.prototype.loadRemoteData = function () {
        var _this = this;
        this.countCricteres(this.filtre);
        /*let loader = this.notify.loading({
          content: "chargement...",
        });*/
        this.loading = true;
        this.manager.get('pointvente', true, null, null, this.filtre, this.nbrecriteres).then(function (data) {
            _this.pointventes = data ? data : [];
            _this.loading = false;
            _this.search();
            // loader.dismiss();
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            // loader.dismiss();
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
        // loader.present();
    };
    PointventesPage.prototype.show = function (pointVente, slidingItem) {
        slidingItem.close();
        this.navCtrl.push('PointVenteDetailPage', { pointVente: pointVente });
    };
    PointventesPage.prototype.delete = function (pointVente, slidingItem) {
        var _this = this;
        slidingItem.close();
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
                        _this.manager.delete('pointvente', pointVente).then(function (data) {
                            if (data.ok) {
                                loader.dismiss().then(function () {
                                    _this.findRemove(data);
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
    PointventesPage.prototype.add = function (pointVente, slidingItem) {
        var _this = this;
        if (pointVente === void 0) { pointVente = {}; }
        this.openAddPage = false;
        if (slidingItem)
            slidingItem.close();
        var modal = this.modalCtrl.create('PointVentePage', { pointVente: pointVente });
        modal.onDidDismiss(function (data) {
            var index = -1;
            if (!data)
                return;
            if (data && data.deletedId || data.id) {
                index = _this.pointventes.findIndex(function (item) { return item.id == data.deletedId || item.id == data.id; });
                if (index > -1)
                    _this.pointventes.splice(index, 1);
                _this.pointventes.splice(0, 0, data);
            }
        });
        modal.present();
    };
    PointventesPage.prototype.openFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create('FiltrePointventePage', { filtre: this.filtre });
        modal.onDidDismiss(function (data) {
            if (!data)
                return;
            return _this.loadRemoteData();
        });
        modal.present();
    };
    PointventesPage.prototype.countCricteres = function (data) {
        var nbrecriteres = 0;
        Object.keys(data).forEach(function (key) {
            if (data[key])
                nbrecriteres++;
        });
        this.nbrecriteres = nbrecriteres;
    };
    PointventesPage.prototype.findRemove = function (data) {
        var index = this.pointventes.findIndex(function (item) { return item.id == data.deletedId; });
        if (index > -1)
            this.pointventes.splice(index, 1);
    };
    PointventesPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.pointventes.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    PointventesPage.prototype.filter = function (item, queryWords) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the session name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (item.nom.toLowerCase().indexOf(queryWord) > -1
                    || item.adresse.toLowerCase().indexOf(queryWord) > -1
                    || item.telephone.toLowerCase().indexOf(queryWord) > -1
                    || item.quartier.toLowerCase().indexOf(queryWord) > -1) {
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
    PointventesPage.prototype.openMap = function () {
        this.navCtrl.push('MapPage', { target: 'pointvente', points: this.pointventes, title: "Points de vente cr\u00E9\u00E9s", filtre: this.filtre });
    };
    PointventesPage.prototype.doScroll = function (env) {
    };
    PointventesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pointventes',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\pointventes\pointventes.html"*/'\n\n<ion-header  no-border no-shadow #head>\n\n  <ion-navbar hideBackButton="true">\n\n      <button menuToggle  ion-button icon-only showWhen="mobile">\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n    <ion-row no-padding>\n\n      <ion-col><ion-title>Mes clients</ion-title></ion-col>\n\n      <ion-col>\n\n        <ion-searchbar *ngIf="pointventes" [hidden]="!pointventes.length" [(ngModel)]="queryText" (ionInput)="search()" placeholder="Recherchez un nom">\n\n        </ion-searchbar>         \n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-buttons end>\n\n        <button ion-button="ion-button" icon-only (click)="refresh()" >\n\n            <ion-icon name="refresh"></ion-icon>\n\n        </button>\n\n        <button ion-button small outline (click)="add()" icon-left>\n\n            <ion-icon name="add" ></ion-icon>\n\n            Créer\n\n        </button>           \n\n    </ion-buttons>       \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding-top hide-header [header]="head">  \n\n      <ion-row justify-content-around>\n\n        <ion-col col-6 >\n\n         <button ion-button icon-left outline small (click)="openFilter()" [disabled]="!isOnline"><ion-icon name="funnel"  ></ion-icon> Critères  \n\n          <span *ngIf="nbrecriteres&&isOnline">  -  ({{nbrecriteres}})</span></button>\n\n        </ion-col>\n\n        <ion-col col-6 class="item-right">\n\n         <button float-right ion-button icon-left outline small (click)="openMap()" [disabled]="!pointventes.length"> <ion-icon name="map"></ion-icon>Carte</button>\n\n       </ion-col>   \n\n      </ion-row>\n\n    <ion-list *ngIf="pointventes&&pointventes.length&&!loading">\n\n        <ion-list-header>Liste des clients ({{pointventes.length }})</ion-list-header>\n\n        <ion-item-sliding *ngFor="let pointvente of pointventes"  [hidden]="pointvente.hide||!pointvente.nom" #slidingItem>\n\n        <ion-item #item (click)="show(pointvente,slidingItem)" text-wrap>\n\n            {{pointvente.nom}}  <strong *ngIf="pointvente.quartier">- {{pointvente.quartier}}</strong>\n\n            - ><span  *ngIf="pointvente.firstCommende">Engagé {{pointvente.firstCommende.date|moment}}             \n\n                <small *ngIf="!pointvente.firstCommende">Créé {{pointvente.date|moment}} </small>\n\n                <small *ngIf="!pointvente.firstCommende&&pointvente.user&&pointvente.user.nom"> par {{pointvente.user.nom}}</small>    \n\n            </span>\n\n            <p><a href="tel: {{pointvente.telephone}}">{{pointvente.telephone}}</a>\n\n              <span *ngIf="pointvente.ville">, {{pointvente.ville}}</span>\n\n              <span *ngIf="pointvente.type">{{pointvente.type}}</span>\n\n              <span *ngIf="pointvente.adresse">, {{pointvente.adresse}}</span>\n\n            </p>  \n\n\n\n        </ion-item>\n\n        <ion-item-options side="left">\n\n          <button ion-button color="danger" style="text-transform: none;" (click)="delete(pointvente,slidingItem)">\n\n            <ion-icon name="trash"></ion-icon> \n\n          </button>\n\n          <button ion-button color="primary" style="text-transform: none;" (click)="add(pointvente,slidingItem)">\n\n              <ion-icon name="create"></ion-icon> \n\n            </button>            \n\n      </ion-item-options>        \n\n     </ion-item-sliding> \n\n     <div padding>\n\n       <button ion-button block small clear (click)="refresh()" style="text-transform: none;">Afficher plus</button>   \n\n      </div>    \n\n    </ion-list>\n\n    <ion-grid style="justify-content: center; height: 100%;" *ngIf="loading">\n\n        <ion-row style="justify-content: center;height: 100%;" justify-content-center align-items-center>\n\n            <ion-spinner name="ios"></ion-spinner>\n\n        </ion-row>\n\n      </ion-grid>  \n\n        <ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!pointventes.length&&!loading">\n\n            <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n\n                <div text-center text-wrap  class="empty" padding>\n\n                  Aucun element a afficher.\n\n                </div>\n\n            </ion-row>\n\n          </ion-grid>    \n\n</ion-content>\n\n<ion-footer showWhen="core">\n\n    <ion-row><ion-col>{{pointventes.length}} lignes</ion-col><ion-col></ion-col><ion-col></ion-col></ion-row>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\pointventes\pointventes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], PointventesPage);
    return PointventesPage;
}());

//# sourceMappingURL=pointventes.js.map

/***/ })

});
//# sourceMappingURL=28.js.map