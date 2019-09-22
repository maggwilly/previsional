webpackJsonp([38],{

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommendesViewPageModule", function() { return CommendesViewPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__commendes_view__ = __webpack_require__(893);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__ = __webpack_require__(484);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var CommendesViewPageModule = /** @class */ (function () {
    function CommendesViewPageModule() {
    }
    CommendesViewPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__commendes_view__["a" /* CommendesViewPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__commendes_view__["a" /* CommendesViewPage */]),
                __WEBPACK_IMPORTED_MODULE_3__directives_directives_module__["a" /* DirectivesModule */]
            ],
        })
    ], CommendesViewPageModule);
    return CommendesViewPageModule;
}());

//# sourceMappingURL=commendes-view.module.js.map

/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommendesViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(88);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CommendesViewPage = /** @class */ (function () {
    function CommendesViewPage(navCtrl, manager, userService, modalCtrl, localisation, events, notify, app, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.manager = manager;
        this.userService = userService;
        this.modalCtrl = modalCtrl;
        this.localisation = localisation;
        this.events = events;
        this.notify = notify;
        this.app = app;
        this.navParams = navParams;
        this.storage = storage;
        this.commende = { lignes: [], total: 0 };
        this.activeItemSliding = null;
        this.editing = false;
        this.edited = false;
        this.pointVente = {};
        this.submitted = true;
        if (navParams.get('commende')) {
            this.commende = navParams.get('commende');
            this.storage.set('displayed', this.commende);
        }
        else {
            this.storage.get('displayed').then(function (displayed) {
                _this.commende = displayed;
                if (!_this.commende.date)
                    _this.commende.date = __WEBPACK_IMPORTED_MODULE_5_moment__().format("YYYY-MM-DD HH:mm");
                _this.pointVente = _this.commende.pointVente;
            });
            return;
        }
        if (!this.commende.date)
            this.commende.date = __WEBPACK_IMPORTED_MODULE_5_moment__().format("YYYY-MM-DD HH:mm");
        this.pointVente = this.commende.pointVente;
    }
    CommendesViewPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (!this.commende.id) {
            this.edited = true;
            return;
        }
        this.manager.show('commende', this.commende.id, this.localisation.isOnline()).then(function (data) {
            _this.commende = data;
            _this.edited = false;
            _this.submitted = false;
        }, function (error) {
            console.log(error);
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
    };
    CommendesViewPage.prototype.canEdit = function () {
        return this.commende.terminated && this.userService.amIMyParent() || !this.commende.terminated;
    };
    CommendesViewPage.prototype.deleteItem = function (list, index) {
        if (!this.canEdit())
            return;
        list.splice(index, 1);
        this.edited = true;
        this.editing = false;
    };
    CommendesViewPage.prototype.delete = function () {
        var _this = this;
        if (!this.canEdit())
            return;
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
                        _this.manager.delete('commende', _this.commende).then(function (data) {
                            if (data.ok) {
                                loader.dismiss().then(function () {
                                    _this.commende.deleted = true;
                                    _this.pointVente.lastCommende = null;
                                    _this.manager.storeEntityLocally('pointvente', null);
                                    _this.events.publish('commende.added', null);
                                    _this.app.getActiveNav().pop();
                                    _this.notify.onSuccess({ message: "Element supprime" });
                                });
                            }
                            else {
                                loader.dismiss();
                                _this.notify.onError({ message: "Cet element est lié a d'autres. Vous ne pouvez pas le supprimer" });
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
    CommendesViewPage.prototype.toggleEditing = function () {
        this.editing = !this.editing;
        this.closeOption();
    };
    CommendesViewPage.prototype.terminate = function () {
        var _this = this;
        this.commende.terminated = true;
        this.commende.change = true;
        var loader = this.notify.loading({ content: 'Enregistrement ...' });
        this.manager.save('commende', this.commende).then(function (data) {
            loader.dismiss().then(function () {
                if (!data.error) {
                    _this.edited = false;
                    _this.commende.terminated = true;
                    _this.events.publish('commende.update', data);
                    return _this.notify.onSuccess({ message: "Enregistrement effectué" });
                }
                _this.commende.terminated = false;
                _this.notify.onError({ message: "Une erreur s'est produite" });
            });
        }, function (error) {
            _this.commende.terminated = false;
            loader.dismiss();
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
        loader.present();
    };
    CommendesViewPage.prototype.save = function () {
        var _this = this;
        this.commende.change = true;
        var loader = this.notify.loading({ content: 'Enregistrement ...' });
        this.manager.save('commende', this.commende).then(function (data) {
            loader.dismiss().then(function () {
                if (!data.error) {
                    _this.edited = false;
                    _this.pointVente.lastCommende = {
                        id: _this.commende.id,
                        date: _this.commende.date
                    };
                    // this.manager.storeEntityLocally('pointvente', this.pointVente)
                    _this.events.publish('commende.added', data);
                    return _this.notify.onSuccess({ message: "Enregistrement effectué" });
                }
                _this.notify.onError({ message: "Une erreur s'est produite " });
            });
        }, function (error) {
            loader.dismiss();
            _this.notify.onError({ message: "Verifiez votre connexion internet" });
        });
        loader.present();
    };
    CommendesViewPage.prototype.addItem = function () {
        var _this = this;
        var modal = this.modalCtrl.create('SelectproduitPage');
        modal.onDidDismiss(function (data) {
            if (!data)
                return;
            var modal = _this.modalCtrl.create('CreatelignePage', { produit: data }, { cssClass: 'inset-modal' });
            modal.onDidDismiss(function (data) {
                if (!data)
                    return;
                _this.edited = true;
                var index = _this.commende.lignes.findIndex(function (item) { return item.produit == data.produit; });
                if (index > 0)
                    _this.commende.lignes.splice(index, 1);
                _this.commende.lignes.push(data);
                if (!_this.commende.total)
                    _this.commende.total = 0;
                _this.commende.total += Number(data.pu * data.quantite);
            });
            modal.present();
        });
        modal.present();
    };
    CommendesViewPage.prototype.openOption = function (itemSlide, item, event) {
        event.stopPropagation(); // here if you want item to be tappable
        if (this.activeItemSliding) {
            this.closeOption();
        }
        this.activeItemSliding = itemSlide;
        var swipeAmount = 100; // set your required swipe amount
        itemSlide.startSliding(swipeAmount);
        itemSlide.moveSliding(swipeAmount);
        itemSlide.setElementClass('active-slide', true);
        itemSlide.setElementClass('active-options-right', true);
        item.setElementStyle('transition', null);
        item.setElementStyle('transform', 'translate3d(-' + swipeAmount + 'px, 0px, 0px)');
    };
    CommendesViewPage.prototype.closeOption = function () {
        if (this.activeItemSliding) {
            this.activeItemSliding.close();
            this.activeItemSliding = null;
        }
    };
    CommendesViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-commendes-view',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\commendes-view\commendes-view.html"*/'<ion-header>\n\n  <ion-navbar>\n\n      <ion-title >\n\n         <span *ngIf="!commende.numFacture">Enregistrer une vente </span>\n\n         <span *ngIf="commende.numFacture">Vente - #{{commende.numFacture}}</span>\n\n        </ion-title>\n\n      <ion-buttons   end  *ngIf="commende.lignes&&commende.lignes.length" [hidden]="commende.terminated">\n\n        <button ion-button [hidden]="editing" small outline  icon-left (click)="toggleEditing()">\n\n          <ion-icon name="trash" color="danger"></ion-icon>\n\n          Modifier\n\n      </button>  \n\n        <button ion-button [hidden]="!editing" small outline  icon-left (click)="toggleEditing()" >\n\n            <ion-icon name="close" color="primary" ></ion-icon>\n\n            Annuler\n\n        </button>    \n\n    </ion-buttons>    \n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-card *ngIf="pointVente">\n\n        <ion-card-header>{{pointVente.nom}}</ion-card-header>\n\n        <ion-card-content>\n\n          <ion-grid>\n\n          <ion-row><ion-col><strong>Ref-#{{commende.numFacture}}</strong></ion-col>\n\n            <ion-col *ngIf="commende.date" text-right>{{commende.date|date:\'dd/MM/yyyy\' }}</ion-col></ion-row>\n\n          <ion-row *ngIf="commende.user"><ion-col>{{commende.user.nom}}</ion-col></ion-row>\n\n         </ion-grid>\n\n        </ion-card-content>\n\n      </ion-card>\n\n        <ion-grid padding style="height: 80%;justify-content: center" [hidden]="!submitted||commende.lignes">\n\n         <ion-row style="justify-content: center;" justify-content-center align-items-center>    \n\n       <ion-spinner color="royal" name="ios"></ion-spinner>\n\n      </ion-row>    \n\n      </ion-grid>  \n\n      <ion-card *ngIf="commende.lignes" total [commende]="commende">\n\n          <ion-row><ion-col>{{commende.lignes.length}} articles</ion-col><ion-col text-right>Total: {{commende.total}} FCFA</ion-col></ion-row>\n\n        </ion-card> \n\n        <ion-list-header no-lines no-border *ngIf="commende.lignes" [hidden]="commende.terminated">\n\n            Cliquer pour ajouter un produit\n\n            <button item-end ion-button large icon-only clear (click)="addItem()">\n\n              <ion-icon color="primary" name="add-circle"></ion-icon>\n\n            </button>\n\n        </ion-list-header>               \n\n      <ion-card *ngIf="commende.lignes">\n\n          <ion-row class="line header" no-padding><ion-col col-4>Designation</ion-col><ion-col col-2>Qte</ion-col><ion-col col-2>P.U</ion-col><ion-col col-2 text-right>Total</ion-col></ion-row>\n\n          <ion-item-sliding #slidingItem *ngFor="let ligne of commende.lignes; let i = index;">\n\n              <ion-item #item text-wrap>                \n\n                  <ion-icon [hidden]="!editing" item-start color="danger" name="remove-circle" (click)="openOption(slidingItem, item, $event)"></ion-icon>\n\n                  <ion-row class="line" no-padding>\n\n                    <ion-col col-4 text-wrap>{{ligne.produit.nom}}</ion-col>\n\n                    <ion-col col-2>{{ligne.quantite}}</ion-col>\n\n                    <ion-col col-2>{{ligne.produit.cout}}</ion-col>\n\n                    <ion-col col-2 text-right>{{(ligne.produit.cout*ligne.quantite)}}</ion-col>\n\n                  </ion-row>                                  \n\n           </ion-item>\n\n           <ion-item-options icon-start (ionSwipe)="deleteItem(commende.lignes, i)" [hidden]="!canEdit()">\n\n              <button color="danger" (click)="deleteItem(commende.lignes, i)" ion-button icon-left expandable>\n\n                <ion-icon name="trash"></ion-icon>\n\n              </button>\n\n      </ion-item-options>       \n\n        </ion-item-sliding>\n\n        </ion-card>\n\n  </ion-list> \n\n</ion-content>\n\n<ion-footer [hidden]="!canEdit()">\n\n    <button *ngIf="!commende.id" [hidden]="!edited||!(commende.lignes&&commende.lignes.length)" ion-button large full (click)="save()" icon-left >\n\n      <ion-icon name="save"  ></ion-icon>\n\n       Enregistrer \n\n  </button> \n\n<ion-row *ngIf="commende.id">\n\n  <ion-col>\n\n      <button  ion-button outline  (click)="delete()" color="danger" icon-left >\n\n          <ion-icon name="save"  ></ion-icon>\n\n           Annuler \n\n      </button>    \n\n  </ion-col>\n\n  <ion-col >\n\n      <button  [hidden]="!edited||(!(commende.lignes&&commende.lignes.length)&&!commende.id)" ion-button  block (click)="save()" icon-left >\n\n          <ion-icon name="save"  ></ion-icon>\n\n           Enregistrer \n\n      </button>   \n\n    <button [hidden]="edited||commende.terminated"  ion-button block  (click)="terminate()" icon-left color="secondary" >\n\n      <ion-icon name="done-all"  ></ion-icon>\n\n      Terminer \n\n  </button> \n\n  </ion-col>\n\n</ion-row>   \n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\commendes-view\commendes-view.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_manager_manager__["a" /* ManagerProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ModalController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__providers_localisation_localisation__["a" /* LocalisationProvider */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_3__app_app_notify__["a" /* AppNotify */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_app_notify__["a" /* AppNotify */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]) === "function" && _k || Object])
    ], CommendesViewPage);
    return CommendesViewPage;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
}());

//# sourceMappingURL=commendes-view.js.map

/***/ })

});
//# sourceMappingURL=38.js.map