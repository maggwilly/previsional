webpackJsonp([20],{

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile__ = __webpack_require__(915);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__profile__["a" /* ProfilePage */]),
            ],
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());

//# sourceMappingURL=profile.module.js.map

/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(153);
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
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, notify, userService, localisation, manager) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.notify = notify;
        this.userService = userService;
        this.localisation = localisation;
        this.manager = manager;
        this.user = {};
        this.user = this.navParams.get('user');
        if (!this.userService.amIMyParent())
            this.user.entreprise = this.user.parent.entreprise;
        this.user.pays = this.user.parent.pays;
        this.user.ville = this.user.parent.ville;
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.isInvalid = function () {
        if (this.userService.amIMyParent())
            return (!this.user.entreprise || !this.user.ville || !this.user.pays);
        else
            return (!this.user.nom);
    };
    ProfilePage.prototype.dismiss = function (skippecheck) {
        if (skippecheck === void 0) { skippecheck = true; }
        this.navCtrl.setRoot('MenuPage', { skippecheck: skippecheck }, { animate: true, direction: 'forward' });
    };
    ProfilePage.prototype.onSubmit = function () {
        var _this = this;
        this.manager.save('user', this.user, this.localisation.isOnline()).then(function (data) {
            _this.dismiss(false);
        }, function (error) {
            console.log(error);
            _this.notify.onSuccess({ message: "Verifiez votre connexion internet" });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-profile',template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\pages\profile\profile.html"*/'<!--\n\n  Generated template for the ProfilePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>     \n\n    <ion-title>Informations génerales</ion-title>\n\n    <ion-buttons end>\n\n            <button ion-button="ion-button" (click)="dismiss()" icon-left>\n\n                <ion-icon name="md-close" color="danger" showWhen="android,windows,core"></ion-icon> \n\n                Fermer\n\n            </button>\n\n        </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>  \n\n  <form #form="ngForm" novalidate="novalidate">\n\n    <ion-list *ngIf="user">\n\n        <ion-item>\n\n            <ion-label color="primary" floating><span>Entreprise </span> </ion-label>\n\n            <ion-input [(ngModel)]="user.entreprise" name="entreprise" type="text" placeholder="" #entreprise="ngModel" [disabled]="!userService.amParent"></ion-input>\n\n        </ion-item>     \n\n        <ion-item>\n\n            <ion-label color="primary" floating><span>Votre nom </span> </ion-label>\n\n            <ion-input [(ngModel)]="user.nom" name="nom" type="text" placeholder="" #nom="ngModel"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label color="primary" floating>\n\n                <span>Télephone</span>\n\n            </ion-label>\n\n            <ion-input [(ngModel)]="user.phone" name="phone" type="tel" placeholder="" #tel="ngModel" disabled="true"></ion-input>\n\n        </ion-item>\n\n        <ion-item>\n\n            <ion-label color="primary" floating><span>Pays </span> </ion-label>\n\n            <ion-input [(ngModel)]="user.pays" name="pays" type="text" placeholder=""  #pays="ngModel" [disabled]="!userService.amParent"></ion-input>\n\n        </ion-item>\n\n        <ion-item >\n\n            <ion-label color="primary" floating> \n\n                <span>Ville</span>\n\n            </ion-label>\n\n            <ion-select [(ngModel)]="user.ville" name="ville" #ville="ngModel" [disabled]="!userService.amParent">\n\n                    <ion-option value="Yaoundé">Yaoundé</ion-option>\n\n                    <ion-option value="Douala">Douala</ion-option>\n\n                    <ion-option value="Bafoussam">Bafoussam</ion-option>\n\n                    <ion-option value="Bertoua">Bertoua</ion-option>\n\n                    <ion-option value="Bamenda">Bamenda</ion-option>\n\n                    <ion-option value="Dschang">Dschang</ion-option>\n\n                    <ion-option value="Autre">Autre</ion-option>\n\n                </ion-select>\n\n            </ion-item>    \n\n                <ion-item>\n\n                    \n\n            <ion-textarea rows="2" [(ngModel)]="user.adresse" placeholder="Adresse" name="adresse" #adresse="ngModel"></ion-textarea>\n\n        </ion-item>\n\n    </ion-list>\n\n</form>\n\n</ion-content>\n\n<ion-footer>\n\n        <button ion-button full icon-right [disabled]="isInvalid()" (click)="onSubmit()">\n\n                <span>Enrégistrer les changements\n\n                    <ion-icon name="md-done-all"></ion-icon>\n\n                </span>\n\n            </button>\n\n    </ion-footer>'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\pages\profile\profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_notify__["a" /* AppNotify */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_manager_manager__["a" /* ManagerProvider */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ })

});
//# sourceMappingURL=20.js.map