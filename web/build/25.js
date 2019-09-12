webpackJsonp([25],{

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrevisionsPageModule", function() { return PrevisionsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previsions__ = __webpack_require__(909);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PrevisionsPageModule = /** @class */ (function () {
    function PrevisionsPageModule() {
    }
    PrevisionsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__previsions__["a" /* PrevisionsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__previsions__["a" /* PrevisionsPage */]),
                __WEBPACK_IMPORTED_MODULE_3__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_4__directives_directives_module__["a" /* DirectivesModule */]
            ],
        })
    ], PrevisionsPageModule);
    return PrevisionsPageModule;
}());

//# sourceMappingURL=previsions.module.js.map

/***/ }),

/***/ 909:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrevisionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
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






var PrevisionsPage = /** @class */ (function () {
    function PrevisionsPage(navCtrl, modalCtrl, localisation, manager, loadingCtrl, notify, navParams) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.localisation = localisation;
        this.manager = manager;
        this.loadingCtrl = loadingCtrl;
        this.notify = notify;
        this.navParams = navParams;
        this.previsions = [];
        this.queryText = '';
        this.isOnline = this.localisation.isOnline();
    }
    PrevisionsPage.prototype.ionViewDidLoad = function () {
        this.refresh();
    };
    PrevisionsPage.prototype.refresh = function () {
        this.filtre = { type: '',
            user: '', secteur: '',
            ville: '',
            afterdate: __WEBPACK_IMPORTED_MODULE_4_moment__().startOf('month').format("YYYY-MM-DD"),
            beforedate: __WEBPACK_IMPORTED_MODULE_4_moment__().endOf('month').format("YYYY-MM-DD") };
        if (this.localisation.isOnline())
            return this.loadRemoteData();
        return this.loadData();
    };
    PrevisionsPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('prevision').then(function (data) {
            _this.previsions = data ? data : [];
            _this.loading = false;
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            _this.notify.onSuccess({ message: "PROBLEME ! Verifiez votre connexion internet" });
        });
    };
    ;
    PrevisionsPage.prototype.loadRemoteData = function () {
        var _this = this;
        /*let loader = this.loadingCtrl.create({
          content: "chargement...",
        });*/
        this.loading = true;
        this.manager.get('prevision', true, null, null, this.filtre, 1).then(function (data) {
            _this.previsions = data ? data : [];
            console.log(_this.previsions);
            _this.loading = false;
            // loader.dismiss(); 
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            // loader.dismiss();
            console.log(error);
            _this.notify.onSuccess({ message: "PROBLEME ! Verifiez votre connexion internet" });
        });
        //loader.present();
    };
    PrevisionsPage.prototype.openDetail = function (produit) {
        this.navCtrl.push('PrevisionDetailsPage', { produit: produit });
    };
    PrevisionsPage.prototype.openFilter = function () {
        var _this = this;
        var modal = this.modalCtrl.create('FiltreStatsPage', { filtre: this.filtre });
        modal.onDidDismiss(function (data) {
            if (!data)
                return;
            return _this.loadRemoteData();
        });
        modal.present();
    };
    PrevisionsPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.previsions.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    PrevisionsPage.prototype.filter = function (item, queryWords) {
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
    PrevisionsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-previsions',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\previsions\previsions.html"*/'\n\n<ion-header #head>\n\n  <ion-navbar hideBackButton="true">\n\n      <button menuToggle  ion-button icon-only showWhen="mobile">\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n      <ion-row no-padding>\n\n          <ion-col> <ion-title >Prévisions de livraisons</ion-title></ion-col>\n\n          <ion-col>\n\n            <ion-searchbar [hidden]="!previsions.length"  [(ngModel)]="queryText" (ionInput)="search()" placeholder="Recherchez un produit">\n\n            </ion-searchbar>         \n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-buttons end>\n\n            <button ion-button icon-left (click)="refresh()"> \n\n              <ion-icon name="refresh"></ion-icon><span showWhen="core">Actualiser</span> \n\n            </button> \n\n            <button ion-button icon-only (click)="openFilter()" [disabled]="!isOnline">\n\n                <ion-icon name="funnel"></ion-icon><span showWhen="core">Seletionnez</span> \n\n              </button>                \n\n          </ion-buttons>       \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding-top hide-header [header]="head">\n\n    <ion-card>\n\n          <ion-item text-wrap>\n\n              <strong *ngIf="filtre"><span *ngIf="filtre.afterdate"> Entre le {{filtre.afterdate|date:\'dd/MM/yyyy\'}}</span>\n\n                <span *ngIf="filtre.beforedate"> <span *ngIf="filtre.afterdate">et</span><span *ngIf="!filtre.afterdate">, Avant</span> le {{filtre.beforedate|date:\'dd/MM/yyyy\'}}</span></strong>\n\n              <p *ngIf="filtre">\n\n                  <span *ngIf="filtre.type">, {{filtre.type}}</span><span *ngIf="!filtre.type">Toutes catégories</span>\n\n                  <span *ngIf="filtre.ville">{{filtre.ville}}</span><span *ngIf="!filtre.ville">, toutes les villes</span>\n\n                 <span *ngIf="filtre.quartier">, {{filtre.quartier}}</span><span *ngIf="!filtre.quartier">, tous les quartiers</span>\n\n              </p>\n\n          </ion-item>\n\n      </ion-card>  \n\n    <ion-list *ngIf="previsions.length&&!loading">\n\n        <ion-item  *ngFor="let produit of previsions"  [hidden]="produit.hide" (click)="openDetail(produit)" text-wrap> \n\n            {{produit.nom}}<ion-badge  color="light"> {{produit.next_cmd_quantity}} {{produit.unite}}(s)</ion-badge>\n\n            <p>{{produit.description}}</p>\n\n            <p *ngIf="produit.next_cmd_date">{{produit.next_cmd_quantity}} {{produit.unite}}(s) à partir de \n\n              <ion-badge> {{produit.next_cmd_date|moment}} </ion-badge>\n\n              </p>      \n\n        </ion-item>  \n\n    </ion-list>\n\n    <ion-grid style="justify-content: center;height: 100%;" *ngIf="loading"> \n\n        <ion-row style="justify-content: center;height: 100%;" justify-content-center align-items-center>\n\n            <ion-spinner name="ios"></ion-spinner>\n\n        </ion-row>\n\n      </ion-grid> \n\n      <ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!previsions.length&&!loading">\n\n          <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n\n              <div text-center text-wrap  class="empty" padding>\n\n                Aucune prévision possible à partir des données connues.\n\n              </div>\n\n          </ion-row>\n\n        </ion-grid>        \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\previsions\previsions.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], PrevisionsPage);
    return PrevisionsPage;
}());

//# sourceMappingURL=previsions.js.map

/***/ })

});
//# sourceMappingURL=25.js.map