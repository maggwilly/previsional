webpackJsonp([14],{

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectclientPageModule", function() { return SelectclientPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectclient__ = __webpack_require__(923);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SelectclientPageModule = /** @class */ (function () {
    function SelectclientPageModule() {
    }
    SelectclientPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__selectclient__["a" /* SelectclientPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__selectclient__["a" /* SelectclientPage */]),
            ],
        })
    ], SelectclientPageModule);
    return SelectclientPageModule;
}());

//# sourceMappingURL=selectclient.module.js.map

/***/ }),

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectclientPage; });
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
 * Generated class for the PointventesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SelectclientPage = /** @class */ (function () {
    function SelectclientPage(navCtrl, manager, viewCtrl, events, localisation, modalCtrl, notify, storage, navParams) {
        this.navCtrl = navCtrl;
        this.manager = manager;
        this.viewCtrl = viewCtrl;
        this.events = events;
        this.localisation = localisation;
        this.modalCtrl = modalCtrl;
        this.notify = notify;
        this.storage = storage;
        this.navParams = navParams;
        this.pointventes = [];
        this.queryText = '';
        this.loading = false;
        this.events.subscribe('loaded:pointvente:new', function () {
            //this.loadData();
        });
    }
    SelectclientPage.prototype.ionViewDidLoad = function () {
        this.loadData();
    };
    SelectclientPage.prototype.dismiss = function (data) {
        this.viewCtrl.dismiss(data);
    };
    SelectclientPage.prototype.loadData = function () {
        var _this = this;
        this.loading = true;
        this.manager.get('pointvente', this.localisation.isOnline()).then(function (data) {
            _this.pointventes = data ? data : [];
            _this.loading = false;
            _this.localisation.onConnect(_this.localisation.isOnline());
        }, function (error) {
            _this.localisation.onConnect(false);
            _this.loading = false;
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
    };
    SelectclientPage.prototype.add = function (pointVente) {
        var _this = this;
        if (pointVente === void 0) { pointVente = {}; }
        var self = this;
        var modal = this.modalCtrl.create('PointVentePage', { pointVente: pointVente, inset: true }, { cssClass: 'inset-modal' });
        modal.onDidDismiss(function (data) {
            var index = -1;
            if (!data)
                return;
            if (data && data.deletedId || data.id) {
                index = _this.pointventes.findIndex(function (item) { return item.id == data.deletedId || item.id == data.id; });
                if (index > -1)
                    _this.pointventes.splice(index, 1);
                _this.pointventes.splice(0, 0, data);
                self.dismiss(data);
            }
        });
        modal.present();
        //  this.navCtrl.push('PointVentePage',{pointVente:pointVente})
    };
    SelectclientPage.prototype.findRemove = function (data) {
        var index = this.pointventes.findIndex(function (item) { return item.id == data.deletedId; });
        if (index > -1)
            this.pointventes.splice(index, 1);
    };
    SelectclientPage.prototype.search = function () {
        var _this = this;
        var queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
        this.pointventes.forEach(function (item) {
            item.hide = true;
            _this.filter(item, queryWords);
        });
    };
    SelectclientPage.prototype.filter = function (item, queryWords) {
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
    SelectclientPage.prototype.doScroll = function (env) {
    };
    SelectclientPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-selectclient',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\selectclient\selectclient.html"*/'<ion-header no-border no-shadow>\n\n    <ion-navbar>\n\n        <ion-buttons start>\n\n            <button ion-button icon-only  (click)="dismiss()" icon-left>\n\n                <ion-icon name="ios-close" color="danger"></ion-icon>\n\n            </button>\n\n        </ion-buttons>\n\n        <ion-row no-padding>\n\n                <ion-col><ion-title>Mes clients</ion-title></ion-col>\n\n                <ion-col>\n\n                <ion-searchbar *ngIf="pointventes" [hidden]="!pointventes.length" [(ngModel)]="queryText" (ionInput)="search()"\n\n                        placeholder="Recherchez un nom">\n\n                </ion-searchbar>       \n\n                </ion-col>\n\n              </ion-row>        \n\n        <ion-buttons end>\n\n            <button ion-button outline (click)="add()" icon-left>\n\n                <ion-icon name="md-add"></ion-icon>\n\n                Créer\n\n            </button>\n\n        </ion-buttons>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n        <ion-card>\n\n                <ion-card-header text-wrap>Selectionnez un point de vente pour enrégistrer une vente</ion-card-header>\n\n        </ion-card>    \n\n    <ion-list *ngIf="pointventes&&pointventes.length">\n\n        <ion-item #item *ngFor="let pointvente of pointventes" [hidden]="pointvente.hide" (click)="dismiss(pointvente)">\n\n            {{pointvente.nom}}\n\n            <p><span>{{pointvente.telephone}}</span><span *ngIf="pointvente.ville">, {{pointvente.ville}}</span><span\n\n                    *ngIf="pointvente.quartier">, {{pointvente.quartier}}</span></p>\n\n        </ion-item>\n\n        <div padding>\n\n            <button ion-button block small clear (click)="doScroll()" style="text-transform: none;">Afficher\n\n                plus</button>\n\n        </div> \n\n    </ion-list>\n\n    <ion-grid style="justify-content: center; height: 100%;" *ngIf="loading">\n\n            <ion-row style="justify-content: center;height: 100%;" justify-content-center align-items-center>\n\n                <ion-spinner name="ios"></ion-spinner>\n\n            </ion-row>\n\n          </ion-grid>  \n\n            <ion-grid style="height: 80%;justify-content: center;position:absolute;top:20%" *ngIf="!pointventes.length&&!loading">\n\n                <ion-row style="height: 100%;justify-content: center;" justify-content-center align-items-center>\n\n                    <div text-center text-wrap  class="empty" padding>\n\n                      Aucun element a afficher.\n\n                    </div>\n\n                </ion-row>\n\n              </ion-grid> \n\n</ion-content>\n\n<ion-footer >\n\n        <ion-row><ion-col>{{pointventes.length}} lignes</ion-col><ion-col></ion-col><ion-col></ion-col></ion-row>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\selectclient\selectclient.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]])
    ], SelectclientPage);
    return SelectclientPage;
}());

//# sourceMappingURL=selectclient.js.map

/***/ })

});
//# sourceMappingURL=14.js.map