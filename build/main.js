webpackJsonp([39],{

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__manager_manager__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase_ngx__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__localisation_localisation__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserProvider = /** @class */ (function () {
    function UserProvider(manager, connectivityService, storage, app, firebase, events) {
        var _this = this;
        this.manager = manager;
        this.connectivityService = connectivityService;
        this.storage = storage;
        this.app = app;
        this.firebase = firebase;
        this.events = events;
        this.registrationid = window.localStorage.getItem('token_registration');
        this.authenticatedUser = new __WEBPACK_IMPORTED_MODULE_5_rxjs__["BehaviorSubject"](null);
        this.complete = null;
        this.events.subscribe('last:status', function (isConnected) {
            _this.unavailable();
        });
        this.resetObserver();
    }
    UserProvider.prototype.resetObserver = function () {
        var _this = this;
        this.complete = this.makeComplete();
        //this.user = null;
        console.log(this.manager.getUserId());
        if (!this.manager.getUserId() || "null" == this.manager.getUserId())
            return this.events.publish('auth', null);
        console.log(this.manager.getUserId());
        this.manager.show('token', this.manager.getUserId(), this.connectivityService.isOnline()).then(function (data) {
            if (!data)
                return _this.events.publish('auth', null);
            _this.user = data;
            _this.authenticatedUser.next(_this.user);
            _this.manager.show('user', _this.manager.getUserId(), _this.connectivityService.isOnline()).then(function (user) {
                if (!_this.user)
                    return _this.go(user);
                _this.user.parent = user.parent;
                _this.user.receiveRequests = user.receiveRequests;
                _this.manager.storeEntityLocally("user", _this.user);
                _this.amParent = _this.amIMyParent();
                _this.events.publish('user.login', {
                    user: _this.user
                });
            }, function (error) {
                _this.events.publish('error', error);
            });
        }, function (error) {
            _this.events.publish('error', error);
        });
    };
    UserProvider.prototype.getAuthenticatedUser = function () {
        return this.authenticatedUser;
    };
    UserProvider.prototype.go = function (user) {
        console.log(user);
        this.app.getRootNav().setRoot('SignupPage', {}, { animate: false });
    };
    UserProvider.prototype.request = function (requests) {
        this.app.getRootNav().setRoot('RequestsPage', { requests: requests }, { animate: false });
    };
    UserProvider.prototype.profile = function (user) {
        this.app.getRootNav().setRoot('ProfilePage', { user: user });
    };
    UserProvider.prototype.shoulpay = function (abonnement) {
        this.app.getRootNav().setRoot('ShoulPayPage', { abonnement: abonnement });
    };
    UserProvider.prototype.unavailable = function () {
        this.app.getRootNav().setRoot('UnavailablePage');
    };
    UserProvider.prototype.amIMyParent = function () {
        if (!this.user || !this.user.parent)
            return;
        return (this.user.id == this.user.parent.id);
    };
    UserProvider.prototype.makeComplete = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (self.user && self.user.parent) {
                resolve(self.user);
                return;
            }
            self.events.subscribe('user.login', function (data) {
                resolve(data.user);
            });
            self.events.subscribe('auth', function (pb) {
                resolve(pb);
            });
            self.events.subscribe('error', function (error) {
                reject(error);
            });
        });
    };
    ;
    UserProvider.prototype.getToken = function () {
        var _this = this;
        this.firebase.getToken().then(function (token) {
            _this.registrationid = token;
            window.localStorage.setItem('token_registration', token);
        });
        this.firebase.onTokenRefresh().subscribe(function (token) {
            _this.registrationid = token;
            window.localStorage.setItem('token_registration', token);
        });
        this.getAuthenticatedUser().subscribe(function (user) {
            if (user)
                _this.register(user);
        });
    };
    UserProvider.prototype.logout = function () {
        var _this = this;
        this.manager.removeUser().then(function () {
            _this.storage.clear();
            _this.authenticatedUser.next(null);
            _this.go(_this.user);
        });
    };
    UserProvider.prototype.onNotification = function () {
        var _this = this;
        this.firebase.onNotificationOpen().subscribe(function (data) {
            if (data.tap) {
                if (data.page) {
                    switch (data.page) {
                        case 'should_pay':
                            _this.app.getActiveNav().setRoot('ShouldPayPage');
                            break;
                        default:
                            _this.app.getActiveNav().setRoot('PointVenteDetailPage', { pointVente: data.pointVente });
                            break;
                    }
                }
            }
        });
    };
    UserProvider.prototype.register = function (user) {
        if (!user || !user.id || !user.parent || !this.registrationid)
            return;
        user.registration = this.registrationid;
        this.firebase.subscribe('user-' + user.parent.id);
        this.manager.put('user', user).then(function (data) {
        }, function (error) {
            //this.notify.onSuccess({message:"PROBLEME ! votre connexion internet est peut-être instable"})
        });
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_6__localisation_localisation__["a" /* LocalisationProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_firebase_ngx__["a" /* Firebase */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* Events */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 166;

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		824,
		38
	],
	"../pages/cartograph/cartograph.module": [
		825,
		5
	],
	"../pages/commende-create/commende-create.module": [
		826,
		1
	],
	"../pages/commendes-view/commendes-view.module": [
		827,
		37
	],
	"../pages/commendes/commendes.module": [
		828,
		36
	],
	"../pages/createligne/createligne.module": [
		829,
		35
	],
	"../pages/donnees/donnees.module": [
		830,
		34
	],
	"../pages/filtre-pointvente/filtre-pointvente.module": [
		831,
		33
	],
	"../pages/filtre-stats/filtre-stats.module": [
		832,
		32
	],
	"../pages/filtre-vente/filtre-vente.module": [
		833,
		31
	],
	"../pages/help/help.module": [
		834,
		30
	],
	"../pages/home/home.module": [
		835,
		0
	],
	"../pages/map/map.module": [
		836,
		4
	],
	"../pages/menu/menu.module": [
		837,
		29
	],
	"../pages/point-vente-detail/point-vente-detail.module": [
		838,
		7
	],
	"../pages/point-vente/point-vente.module": [
		839,
		28
	],
	"../pages/pointventes/pointventes.module": [
		840,
		27
	],
	"../pages/pop-over-menu/pop-over-menu.module": [
		841,
		26
	],
	"../pages/prevision-details/prevision-details.module": [
		842,
		25
	],
	"../pages/previsions/previsions.module": [
		843,
		24
	],
	"../pages/price-detail/price-detail.module": [
		844,
		23
	],
	"../pages/produit-detail/produit-detail.module": [
		845,
		22
	],
	"../pages/produit/produit.module": [
		846,
		21
	],
	"../pages/produits/produits.module": [
		847,
		20
	],
	"../pages/profile/profile.module": [
		848,
		19
	],
	"../pages/quartiers/quartiers.module": [
		849,
		3
	],
	"../pages/rapports/rapports.module": [
		850,
		18
	],
	"../pages/rendezvous/rendezvous.module": [
		851,
		17
	],
	"../pages/requests/requests.module": [
		852,
		16
	],
	"../pages/secteur/secteur.module": [
		853,
		15
	],
	"../pages/secteurs/secteurs.module": [
		854,
		14
	],
	"../pages/selectclient/selectclient.module": [
		857,
		13
	],
	"../pages/selectproduit/selectproduit.module": [
		855,
		12
	],
	"../pages/shoul-pay/shoul-pay.module": [
		856,
		11
	],
	"../pages/signup/signup.module": [
		858,
		6
	],
	"../pages/stats/stats.module": [
		859,
		2
	],
	"../pages/tabs/tabs.module": [
		860,
		10
	],
	"../pages/unavailable/unavailable.module": [
		861,
		9
	],
	"../pages/vendeurs/vendeurs.module": [
		862,
		8
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 211;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagerProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_IntervalObservable__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_IntervalObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_observable_IntervalObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_guid_typescript__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_guid_typescript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_guid_typescript__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ManagerProvider = /** @class */ (function () {
    function ManagerProvider(http, storage, events, platform) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.events = events;
        this.platform = platform;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        this.keys = [];
        this.isAscing = false;
        this.connected = true;
        this.headers.set('X-Auth-Token', this.getUserToken());
        this.storeUser({ id: this.getUserId(), apiKey: this.getUserToken() });
        this.storage.keys().then(function (keys) {
            _this.keys = keys;
        });
        this.listenEvents();
    }
    ManagerProvider.prototype.clearStorage = function () {
        this.storage.clear();
    };
    ManagerProvider.prototype.listenEvents = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].entityNames.forEach(function (entityName) {
            _this.events.subscribe("entity:" + entityName + ":change", function (data) {
                if (data && data.change)
                    _this.save(entityName, data, _this.connected).catch(function (error) { return console.log(error); });
            });
            _this.events.subscribe("entity:" + entityName + ":delete", function (data) {
                _this.delete(entityName, data, 'delete', true);
            });
        });
    };
    ManagerProvider.prototype.ascync = function () {
        var promises = [];
        promises.push(this.saveAscyncEntity());
        promises.push(this.deletAascyncEntity());
        promises.push(this.getAascyncEntity());
        return Promise.all(promises);
    };
    ManagerProvider.prototype.saveAscyncEntity = function () {
        var _this = this;
        var promises = [];
        __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].entityNames.map(function (entityName) {
            _this.storage.forEach(function (value, key, index) {
                if (key.match("^" + entityName + "+_(id|new)_(([a0-z9]-*)(?!.*[_]deleted$))*$")) {
                    if (value && value.change)
                        return promises.push(_this.save(entityName, value, _this.connected).catch(function (error) { return console.error(error); }));
                }
            });
        });
        return Promise.all(promises);
    };
    ManagerProvider.prototype.deletAascyncEntity = function () {
        var _this = this;
        var promises = [];
        __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].entityNames.map(function (entityName) {
            _this.storage.forEach(function (value, key, index) {
                if (key.match("^" + entityName + "+_(id|new)_[a0-z9]*_deleted$")) {
                    if (value && value.change)
                        return promises.push(_this.delete(entityName, value, 'delete', _this.connected).catch(function (error) { return console.error(error); }));
                }
            });
        });
        return Promise.all(promises);
    };
    ManagerProvider.prototype.getAascyncEntity = function () {
        var _this = this;
        var promises = [];
        __WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].entityNames.map(function (entityName) {
            promises.push(_this.get(entityName, true).catch(function (error) { return console.error(error); }));
        });
        return Promise.all(promises);
    };
    ManagerProvider.prototype.storeUser = function (user) {
        var _this = this;
        return this.storeEntityLocally('user', user).then(function () {
            window.localStorage.setItem('_user_id_', user.id);
            window.localStorage.setItem('_user_token', user.apiKey);
            _this.headers.set('X-Auth-Token', user.apiKey);
            return user;
        });
    };
    ManagerProvider.prototype.removeUser = function () {
        var _this = this;
        return this.storage.clear().then(function () {
            window.localStorage.clear();
            _this.headers.delete('X-Auth-Token');
        });
    };
    ManagerProvider.prototype.getUserToken = function () {
        return window.localStorage.getItem('_user_token');
    };
    ManagerProvider.prototype.getUserId = function () {
        return window.localStorage.getItem('_user_id_');
    };
    ManagerProvider.prototype.get = function (entityName, online, id, keyIndex, filter, nbrecritere) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        if (nbrecritere === void 0) { nbrecritere = 0; }
        if (online)
            return new Promise(function (resolve, reject) {
                var criteria = !nbrecritere ? "keys=" + _this.arrayKeys(entityName) : "keys=";
                Object.keys(filter).forEach(function (key) {
                    if (filter[key])
                        criteria = criteria + "&" + key + "=" + filter[key];
                });
                criteria = (id && keyIndex) ? criteria + "&" + keyIndex + "=" + id : criteria;
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + "/" + entityName + "/json?" + criteria, { headers: _this.headers })
                    .toPromise()
                    .then(function (response) {
                    return _this.storeEntityLocally(entityName, response.json()).then(function () {
                        if (nbrecritere)
                            return resolve(response.json());
                        _this.getEntitieLocally(entityName, id, keyIndex).then(function (entites) {
                            resolve(entites);
                        });
                    });
                }, function (error) {
                    console.log(error);
                    reject(error);
                });
            });
        return this.getEntitieLocally(entityName, id, keyIndex);
    };
    ManagerProvider.prototype.arrayKeys = function (entityName) {
        var keysString = '';
        var localkeys = this.keys.filter(function (key) { return key.match("^" + entityName + "+_(id|new)_(([a0-z9]-*)(?!.*[_]deleted$))*$"); });
        localkeys.forEach(function (key) {
            var keyparts = key.split('_', 3);
            keysString = keysString + "." + keyparts[2];
        });
        return keysString;
    };
    ManagerProvider.prototype.getText = function (prefix, suffix) {
        if (suffix === void 0) { suffix = ''; }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + '/' + prefix + suffix, { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.text(); });
    };
    ManagerProvider.prototype.show = function (entityName, entityid, online, filter) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        if (online)
            return new Promise(function (resolve, reject) {
                var criteria = '';
                Object.keys(filter).forEach(function (key) {
                    if (filter[key])
                        criteria = criteria + "&" + key + "=" + filter[key];
                });
                return _this.http.get(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + "/" + entityName + "/" + entityid + "/show/json?id=" + entityid + criteria, { headers: _this.headers })
                    .toPromise()
                    .then(function (response) {
                    var data = response.json();
                    data.change = undefined;
                    _this.storeEntityLocally(entityName, data).then(function (data) { resolve(data); });
                }, function (error) { reject(error); });
            });
        return this.getEntitieLocally(entityName, entityid);
    };
    ManagerProvider.prototype.storeEntityLocally = function (entityName, data, changes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!Array.isArray(data))
                return _this.storage.set(entityName + "_id_" + data.id, data).then(function () {
                    if (changes && _this.connected)
                        _this.events.publish("entity:" + entityName + ":change", data);
                    resolve(data);
                });
            var promises = [];
            data.forEach(function (element) {
                promises.push(_this.storeEntityLocally(entityName, element));
            });
            return Promise.all(promises).then(function () {
                _this.events.publish("loaded:" + entityName + ":new");
                resolve(data);
            });
        });
    };
    ManagerProvider.prototype.getEntitieLocally = function (entityName, id, keyIndex, start) {
        var _this = this;
        if (start === void 0) { start = 0; }
        if (id && !keyIndex)
            return this.storage.get(entityName + "_id_" + id);
        return new Promise(function (resolve, reject) {
            var entities = [];
            _this.storage.forEach(function (value, key, index) {
                if (key.match("^" + entityName + "+_(id|new)_(([a0-z9]-*)(?!.*[_]deleted$))*$")) {
                    if (keyIndex) {
                        if (value[keyIndex] == id || value[keyIndex] && (value[keyIndex].id == id))
                            entities.push(value);
                    }
                    else
                        entities.push(value);
                }
                resolve(entities);
            });
        });
    };
    ManagerProvider.prototype.post = function (entityName, entity, action, online) {
        var _this = this;
        if (action === void 0) { action = 'new'; }
        if (online)
            return new Promise(function (resolve, reject) {
                console.log(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + '/' + entityName + '/' + action + '/json');
                _this.http.post(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + '/' + entityName + '/' + action + '/json', JSON.stringify(entity), { headers: _this.headers })
                    .toPromise()
                    .then(function (response) {
                    _this.keys.push(entityName + "_id_" + entity.id);
                    return _this.storeEntityLocally(entityName, response.json()).then(function () { resolve(response.json()); });
                }, function (error) {
                    console.log(error);
                    reject(error);
                });
            });
        return this.storeEntityLocally(entityName, entity, true);
    };
    ManagerProvider.prototype.put = function (entityName, entity, online) {
        var _this = this;
        if (online)
            return new Promise(function (resolve, reject) {
                console.log(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + "/" + entityName + "/" + entity.id + "/edit/json");
                _this.http.put(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + "/" + entityName + "/" + entity.id + "/edit/json", JSON.stringify(entity), { headers: _this.headers })
                    .toPromise()
                    .then(function (response) {
                    return _this.storeEntityLocally(entityName, response.json()).then(function () { resolve(response.json()); });
                }, function (error) { return reject(error); });
            });
        return this.storeEntityLocally(entityName, entity, true);
    };
    ManagerProvider.prototype.save = function (entityName, entity, online) {
        if (!entity.change)
            return new Promise(function (resolve, reject) {
                resolve(entity);
            });
        if (entity.change && entity.stored && entity.id)
            return this.put(entityName, entity, online);
        console.log(JSON.stringify(entity));
        if (!entity.id)
            entity.id = __WEBPACK_IMPORTED_MODULE_8_guid_typescript__["Guid"].create().toString();
        return this.post(entityName, entity, 'new', online);
    };
    ManagerProvider.prototype.delete = function (entityName, entity, target, online) {
        var _this = this;
        if (target === void 0) { target = 'delete'; }
        if (online)
            return new Promise(function (resolve, reject) {
                _this.http.delete(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + "/" + entityName + "/" + entity.id + "/" + target + "/json?id=" + entity.id, { headers: _this.headers })
                    .toPromise()
                    .then(function (response) {
                    _this.storage.remove(entityName + "_id_" + entity.id + "_deleted");
                    return resolve(response.json());
                });
            });
        return new Promise(function (resolve, reject) {
            var promises = [];
            console.log(entity);
            promises.push(_this.storage.remove(entityName + "_id_" + entity.id));
            promises.push(_this.storage.set(entityName + "_id_" + entity.id + "_deleted", entity));
            return Promise.all(promises).then(function () {
                _this.events.publish("entity:" + entityName + ":delete", entity);
                resolve({ ok: true, deletedId: entity.id });
            });
        });
    };
    ManagerProvider.prototype.getObservable = function (entityName, entityid) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_7_rxjs_observable_IntervalObservable__["IntervalObservable"]
            .create(1000)
            .flatMap(function (i) { return _this.http.get(__WEBPACK_IMPORTED_MODULE_6__app_config__["a" /* Config */].server + '/' + entityName + '/' + entityid + '/show/json?id=' + entityid, { headers: _this.headers }); });
    };
    ManagerProvider.prototype.getQuartiers = function () {
        return this.http.get('assets/data/quartiers.json')
            .toPromise()
            .then(function (res) { return res.json(); });
    };
    ManagerProvider.prototype.readCookie = function (name) {
        var cookiename = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(cookiename) == 0)
                return c.substring(cookiename.length, c.length);
        }
        return null;
    };
    ManagerProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* Platform */]])
    ], ManagerProvider);
    return ManagerProvider;
}());

//# sourceMappingURL=manager.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppNotify; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_localisation_localisation__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Component } from '@angular/core';


var AppNotify = /** @class */ (function () {
    function AppNotify(toastCtrl, alerttCtrl, loadingCtrl, localisation) {
        this.toastCtrl = toastCtrl;
        this.alerttCtrl = alerttCtrl;
        this.loadingCtrl = loadingCtrl;
        this.localisation = localisation;
        this.toastCtrl = toastCtrl;
    }
    AppNotify.prototype.onSuccess = function (toastOpts) {
        var succesToast = this.toastCtrl.create({
            message: toastOpts.message,
            duration: toastOpts.duration || 3000,
            position: toastOpts.position || 'bottom',
            showCloseButton: toastOpts.showCloseButton || true,
            cssClass: 'danger',
        });
        succesToast.present();
    };
    AppNotify.prototype.onError = function (toastOpts) {
        var errorToast = this.toastCtrl.create({
            message: !this.localisation.isOffline() ? toastOpts.message : "Verifiez votre connexion internet avant de poursuivre",
            duration: toastOpts.duration || 7000,
            position: toastOpts.position || 'bottom',
            showCloseButton: toastOpts.showCloseButton || true,
            cssClass: 'success',
        });
        errorToast.present();
    };
    AppNotify.prototype.showAlert = function (alertOptions) {
        var errorToast = this.alerttCtrl.create({
            message: !this.localisation.isOffline() ? alertOptions.message : "Verifiez votre connexion internet avant de poursuivre",
            title: alertOptions.title,
            subTitle: alertOptions.subTitle,
            buttons: alertOptions.buttons || ['Ok'],
            inputs: alertOptions.inputs || []
        });
        errorToast.present();
    };
    AppNotify.prototype.loading = function (loadingOptions) {
        return this.loadingCtrl.create(loadingOptions);
    };
    AppNotify = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_localisation_localisation__["a" /* LocalisationProvider */]])
    ], AppNotify);
    return AppNotify;
}());

//# sourceMappingURL=app-notify.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DirectivesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lastcommende_lastcommende__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lastrendevous_lastrendevous__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__hide_header_hide_header__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__total_total__ = __webpack_require__(803);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var DirectivesModule = /** @class */ (function () {
    function DirectivesModule() {
    }
    DirectivesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__lastcommende_lastcommende__["a" /* LastcommendeDirective */],
                __WEBPACK_IMPORTED_MODULE_2__lastrendevous_lastrendevous__["a" /* LastrendevousDirective */],
                __WEBPACK_IMPORTED_MODULE_3__hide_header_hide_header__["a" /* HideHeaderDirective */],
                __WEBPACK_IMPORTED_MODULE_4__total_total__["a" /* TotalDirective */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__lastcommende_lastcommende__["a" /* LastcommendeDirective */],
                __WEBPACK_IMPORTED_MODULE_2__lastrendevous_lastrendevous__["a" /* LastrendevousDirective */],
                __WEBPACK_IMPORTED_MODULE_3__hide_header_hide_header__["a" /* HideHeaderDirective */],
                __WEBPACK_IMPORTED_MODULE_4__total_total__["a" /* TotalDirective */]]
        })
    ], DirectivesModule);
    return DirectivesModule;
}());

//# sourceMappingURL=directives.module.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moment_moment__ = __webpack_require__(804);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__moment_moment__["a" /* MomentPipe */]],
            imports: [],
            exports: [__WEBPACK_IMPORTED_MODULE_1__moment_moment__["a" /* MomentPipe */]]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = /** @class */ (function () {
    function Config() {
    }
    // url of the chat server
    // for local development it will be something like http://192.168.0.214:9000/
    Config.server = "https://api-provisional.herokuapp.com"; //"http://localhost:8000" //'
    Config.entityNames = ['secteur', 'pointvente', 'produit', 'rendezvous', 'commende'];
    Config.googleApiKey = "AIzaSyBNIN0oMzHoNgEZz1utnM_8ut6KFjwieoo";
    Config.HomePage = 'HomePage'; //
    return Config;
}());

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(492);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_notify__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(822);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_manager_manager__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_user_user__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_firebase_ngx__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_geofence__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_diagnostic__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_location_accuracy__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_localisation_localisation__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pipes_pipes_module__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__directives_directives_module__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_google_maps__ = __webpack_require__(823);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {
                    tabsHideOnSubPages: true
                }, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cartograph/cartograph.module#CartographPageModule', name: 'CartographPage', segment: 'cartograph', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/commende-create/commende-create.module#CommendeCreatePageModule', name: 'CommendeCreatePage', segment: 'commende-create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/commendes-view/commendes-view.module#CommendesViewPageModule', name: 'CommendesViewPage', segment: 'commendes-view', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/commendes/commendes.module#CommendesPageModule', name: 'CommendesPage', segment: 'commendes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/createligne/createligne.module#CreatelignePageModule', name: 'CreatelignePage', segment: 'createligne', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/donnees/donnees.module#DonneesPageModule', name: 'DonneesPage', segment: 'donnees', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/filtre-pointvente/filtre-pointvente.module#FiltrePointventePageModule', name: 'FiltrePointventePage', segment: 'filtre-pointvente', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/filtre-stats/filtre-stats.module#FiltreStatsPageModule', name: 'FiltreStatsPage', segment: 'filtre-stats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/filtre-vente/filtre-vente.module#FiltreVentePageModule', name: 'FiltreVentePage', segment: 'filtre-vente', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/help/help.module#HelpPageModule', name: 'HelpPage', segment: 'help', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/point-vente-detail/point-vente-detail.module#PointVenteDetailPageModule', name: 'PointVenteDetailPage', segment: 'point-vente-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/point-vente/point-vente.module#PointVentePageModule', name: 'PointVentePage', segment: 'point-vente', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pointventes/pointventes.module#PointventesPageModule', name: 'PointventesPage', segment: 'pointventes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pop-over-menu/pop-over-menu.module#PopOverMenuPageModule', name: 'PopOverMenuPage', segment: 'pop-over-menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/prevision-details/prevision-details.module#PrevisionDetailsPageModule', name: 'PrevisionDetailsPage', segment: 'prevision-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/previsions/previsions.module#PrevisionsPageModule', name: 'PrevisionsPage', segment: 'previsions', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/price-detail/price-detail.module#PriceDetailPageModule', name: 'PriceDetailPage', segment: 'price-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/produit-detail/produit-detail.module#ProduitDetailPageModule', name: 'ProduitDetailPage', segment: 'produit-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/produit/produit.module#ProduitPageModule', name: 'ProduitPage', segment: 'produit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/produits/produits.module#ProduitsPageModule', name: 'ProduitsPage', segment: 'produits', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/quartiers/quartiers.module#QuartiersPageModule', name: 'QuartiersPage', segment: 'quartiers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rapports/rapports.module#RapportsPageModule', name: 'RapportsPage', segment: 'rapports', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/rendezvous/rendezvous.module#RendezvousPageModule', name: 'RendezvousPage', segment: 'rendezvous', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/requests/requests.module#RequestsPageModule', name: 'RequestsPage', segment: 'requests', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/secteur/secteur.module#SecteurPageModule', name: 'SecteurPage', segment: 'secteur', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/secteurs/secteurs.module#SecteursPageModule', name: 'SecteursPage', segment: 'secteurs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/selectproduit/selectproduit.module#SelectproduitPageModule', name: 'SelectproduitPage', segment: 'selectproduit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/shoul-pay/shoul-pay.module#ShoulPayPageModule', name: 'ShoulPayPage', segment: 'shoul-pay', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/selectclient/selectclient.module#SelectclientPageModule', name: 'SelectclientPage', segment: 'selectclient', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/stats/stats.module#StatsPageModule', name: 'StatsPage', segment: 'stats', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/unavailable/unavailable.module#UnavailablePageModule', name: 'UnavailablePage', segment: 'unavailable', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/vendeurs/vendeurs.module#VendeursPageModule', name: 'VendeursPage', segment: 'vendeurs', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_18__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_19__directives_directives_module__["a" /* DirectivesModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_geofence__["a" /* Geofence */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_google_maps__["a" /* GoogleMaps */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__providers_manager_manager__["a" /* ManagerProvider */],
                __WEBPACK_IMPORTED_MODULE_5__app_notify__["a" /* AppNotify */],
                __WEBPACK_IMPORTED_MODULE_16__providers_localisation_localisation__["a" /* LocalisationProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_user_user__["a" /* UserProvider */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_firebase_ngx__["a" /* Firebase */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 522:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 222,
	"./af.js": 222,
	"./ar": 223,
	"./ar-dz": 224,
	"./ar-dz.js": 224,
	"./ar-kw": 225,
	"./ar-kw.js": 225,
	"./ar-ly": 226,
	"./ar-ly.js": 226,
	"./ar-ma": 227,
	"./ar-ma.js": 227,
	"./ar-sa": 228,
	"./ar-sa.js": 228,
	"./ar-tn": 229,
	"./ar-tn.js": 229,
	"./ar.js": 223,
	"./az": 230,
	"./az.js": 230,
	"./be": 231,
	"./be.js": 231,
	"./bg": 232,
	"./bg.js": 232,
	"./bm": 233,
	"./bm.js": 233,
	"./bn": 234,
	"./bn.js": 234,
	"./bo": 235,
	"./bo.js": 235,
	"./br": 236,
	"./br.js": 236,
	"./bs": 237,
	"./bs.js": 237,
	"./ca": 238,
	"./ca.js": 238,
	"./cs": 239,
	"./cs.js": 239,
	"./cv": 240,
	"./cv.js": 240,
	"./cy": 241,
	"./cy.js": 241,
	"./da": 242,
	"./da.js": 242,
	"./de": 243,
	"./de-at": 244,
	"./de-at.js": 244,
	"./de-ch": 245,
	"./de-ch.js": 245,
	"./de.js": 243,
	"./dv": 246,
	"./dv.js": 246,
	"./el": 247,
	"./el.js": 247,
	"./en-SG": 248,
	"./en-SG.js": 248,
	"./en-au": 249,
	"./en-au.js": 249,
	"./en-ca": 250,
	"./en-ca.js": 250,
	"./en-gb": 251,
	"./en-gb.js": 251,
	"./en-ie": 252,
	"./en-ie.js": 252,
	"./en-il": 253,
	"./en-il.js": 253,
	"./en-nz": 254,
	"./en-nz.js": 254,
	"./eo": 255,
	"./eo.js": 255,
	"./es": 256,
	"./es-do": 257,
	"./es-do.js": 257,
	"./es-us": 258,
	"./es-us.js": 258,
	"./es.js": 256,
	"./et": 259,
	"./et.js": 259,
	"./eu": 260,
	"./eu.js": 260,
	"./fa": 261,
	"./fa.js": 261,
	"./fi": 262,
	"./fi.js": 262,
	"./fo": 263,
	"./fo.js": 263,
	"./fr": 264,
	"./fr-ca": 265,
	"./fr-ca.js": 265,
	"./fr-ch": 266,
	"./fr-ch.js": 266,
	"./fr.js": 264,
	"./fy": 267,
	"./fy.js": 267,
	"./ga": 268,
	"./ga.js": 268,
	"./gd": 269,
	"./gd.js": 269,
	"./gl": 270,
	"./gl.js": 270,
	"./gom-latn": 271,
	"./gom-latn.js": 271,
	"./gu": 272,
	"./gu.js": 272,
	"./he": 273,
	"./he.js": 273,
	"./hi": 274,
	"./hi.js": 274,
	"./hr": 275,
	"./hr.js": 275,
	"./hu": 276,
	"./hu.js": 276,
	"./hy-am": 277,
	"./hy-am.js": 277,
	"./id": 278,
	"./id.js": 278,
	"./is": 279,
	"./is.js": 279,
	"./it": 280,
	"./it-ch": 281,
	"./it-ch.js": 281,
	"./it.js": 280,
	"./ja": 282,
	"./ja.js": 282,
	"./jv": 283,
	"./jv.js": 283,
	"./ka": 284,
	"./ka.js": 284,
	"./kk": 285,
	"./kk.js": 285,
	"./km": 286,
	"./km.js": 286,
	"./kn": 287,
	"./kn.js": 287,
	"./ko": 288,
	"./ko.js": 288,
	"./ku": 289,
	"./ku.js": 289,
	"./ky": 290,
	"./ky.js": 290,
	"./lb": 291,
	"./lb.js": 291,
	"./lo": 292,
	"./lo.js": 292,
	"./lt": 293,
	"./lt.js": 293,
	"./lv": 294,
	"./lv.js": 294,
	"./me": 295,
	"./me.js": 295,
	"./mi": 296,
	"./mi.js": 296,
	"./mk": 297,
	"./mk.js": 297,
	"./ml": 298,
	"./ml.js": 298,
	"./mn": 299,
	"./mn.js": 299,
	"./mr": 300,
	"./mr.js": 300,
	"./ms": 301,
	"./ms-my": 302,
	"./ms-my.js": 302,
	"./ms.js": 301,
	"./mt": 303,
	"./mt.js": 303,
	"./my": 304,
	"./my.js": 304,
	"./nb": 305,
	"./nb.js": 305,
	"./ne": 306,
	"./ne.js": 306,
	"./nl": 307,
	"./nl-be": 308,
	"./nl-be.js": 308,
	"./nl.js": 307,
	"./nn": 309,
	"./nn.js": 309,
	"./pa-in": 310,
	"./pa-in.js": 310,
	"./pl": 311,
	"./pl.js": 311,
	"./pt": 312,
	"./pt-br": 313,
	"./pt-br.js": 313,
	"./pt.js": 312,
	"./ro": 314,
	"./ro.js": 314,
	"./ru": 315,
	"./ru.js": 315,
	"./sd": 316,
	"./sd.js": 316,
	"./se": 317,
	"./se.js": 317,
	"./si": 318,
	"./si.js": 318,
	"./sk": 319,
	"./sk.js": 319,
	"./sl": 320,
	"./sl.js": 320,
	"./sq": 321,
	"./sq.js": 321,
	"./sr": 322,
	"./sr-cyrl": 323,
	"./sr-cyrl.js": 323,
	"./sr.js": 322,
	"./ss": 324,
	"./ss.js": 324,
	"./sv": 325,
	"./sv.js": 325,
	"./sw": 326,
	"./sw.js": 326,
	"./ta": 327,
	"./ta.js": 327,
	"./te": 328,
	"./te.js": 328,
	"./tet": 329,
	"./tet.js": 329,
	"./tg": 330,
	"./tg.js": 330,
	"./th": 331,
	"./th.js": 331,
	"./tl-ph": 332,
	"./tl-ph.js": 332,
	"./tlh": 333,
	"./tlh.js": 333,
	"./tr": 334,
	"./tr.js": 334,
	"./tzl": 335,
	"./tzl.js": 335,
	"./tzm": 336,
	"./tzm-latn": 337,
	"./tzm-latn.js": 337,
	"./tzm.js": 336,
	"./ug-cn": 338,
	"./ug-cn.js": 338,
	"./uk": 339,
	"./uk.js": 339,
	"./ur": 340,
	"./ur.js": 340,
	"./uz": 341,
	"./uz-latn": 342,
	"./uz-latn.js": 342,
	"./uz.js": 341,
	"./vi": 343,
	"./vi.js": 343,
	"./x-pseudo": 344,
	"./x-pseudo.js": 344,
	"./yo": 345,
	"./yo.js": 345,
	"./zh-cn": 346,
	"./zh-cn.js": 346,
	"./zh-hk": 347,
	"./zh-hk.js": 347,
	"./zh-tw": 348,
	"./zh-tw.js": 348
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 522;

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalisationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LocalisationProvider = /** @class */ (function () {
    function LocalisationProvider(platform, network, events, diagnostic, geo, locationAccuracy) {
        this.platform = platform;
        this.network = network;
        this.events = events;
        this.diagnostic = diagnostic;
        this.geo = geo;
        this.locationAccuracy = locationAccuracy;
        this.lastConnect = true;
        this.nbError = 0;
    }
    LocalisationProvider.prototype.getCurrentPosition = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(_this.platform.platforms());
            if (_this.platform.is('core') || _this.platform.is('mobileweb')) {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        resolve(position);
                    }, function (error) {
                        reject({ message: "Un problème est survenu durant la géolocalisation par le navigateur. Celà est peut-être lié à votre connexion internet.", source: error });
                    });
                }
                else
                    reject({ message: "Mettez à jour le navigateur pour accéder à la géolocalisation." });
            }
            else {
                _this.diagnostic.isLocationEnabled().then(function (enabled) {
                    var HIGH_ACCURACY = 'high_accuracy';
                    if (enabled) {
                        _this.diagnostic.getLocationMode().then(function (locationMode) {
                            if (locationMode === HIGH_ACCURACY) {
                                _this.geo.getCurrentPosition({ timeout: 30000, maximumAge: 0, enableHighAccuracy: true }).then(function (pos) {
                                    resolve(pos);
                                }, function (error) {
                                    reject({ message: "Un problème est survenu durant la géolocalisation. Verifier que l'application a accès à votre localisation. Celà est peut aussi être lié à votre connexion internet.", source: error });
                                });
                            }
                            else {
                                _this.askForHighAccuracy().then(function (available) {
                                    resolve(available);
                                }, function (error) {
                                    ;
                                    reject(error);
                                });
                            }
                        });
                    }
                    else {
                        _this.locationAccuracy.canRequest().then(function (canRequest) {
                            if (canRequest) {
                                _this.locationAccuracy.request(1).then(function (result) {
                                    if (result) {
                                        _this.getCurrentPosition().then(function (result) { return resolve(result); }, function (error) { return reject(error); });
                                    }
                                }, function (error) {
                                    console.log(JSON.stringify(error));
                                    reject({ message: "Erreur lors de la requête de permission.", source: error });
                                });
                            }
                            else {
                                reject({ message: "Impossible de rechercher la position." });
                            }
                        });
                    }
                }, function (error) {
                    console.log(JSON.stringify(error));
                    reject({ message: "Erreur de plugin ou de droits." });
                });
            }
        });
    };
    LocalisationProvider.prototype.askForHighAccuracy = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.locationAccuracy
                .request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () {
                _this.geo.getCurrentPosition({ timeout: 30000, maximumAge: 0, enableHighAccuracy: true }).then(function (position) {
                    resolve(position);
                }, function (error) { return reject({ message: "Un problème est survenu durant la géolocalisation. Verifier que l'application a accès à votre localisation. Celà est peut aussi être lié à votre connexion internet.", source: error }); });
            }, function (error) { return reject({ message: "Erreur lors de la requête de permission.", source: error }); });
        });
    };
    LocalisationProvider.prototype.isOnline = function () {
        if (this.onDevice && this.network.Connection) {
            return this.network.Connection !== Connection.NONE;
        }
        else {
            return navigator.onLine && this.lastConnect;
        }
    };
    LocalisationProvider.prototype.isOffline = function () {
        if (this.onDevice && this.network.Connection) {
            return this.network.Connection === Connection.NONE;
        }
        else {
            return !navigator.onLine;
        }
    };
    LocalisationProvider.prototype.onConnect = function (isOnLine) {
        if (!isOnLine && this.lastConnect) {
            this.nbError++;
        }
        else {
            if (isOnLine) {
                this.nbError = 0;
                this.lastConnect = isOnLine;
            }
        }
        if (this.nbError > 5 && this.lastConnect) {
            this.lastConnect = false;
            this.events.publish('last:status', isOnLine);
        }
    };
    LocalisationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_location_accuracy__["a" /* LocationAccuracy */]])
    ], LocalisationProvider);
    return LocalisationProvider;
}());

//# sourceMappingURL=localisation.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LastcommendeDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_manager_manager__ = __webpack_require__(45);
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
 * Generated class for the LastcommendeDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var LastcommendeDirective = /** @class */ (function () {
    function LastcommendeDirective(manager) {
        this.manager = manager;
    }
    LastcommendeDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.pointvente || !this.pointvente.lastCommende)
            return;
        console.log('Hello LastcommendeDirective Directive');
        this.pointvente.lastCommende.loading = true;
        this.manager.show('commende', this.pointvente.lastCommende.id).then(function (data) {
            if (data)
                _this.pointvente.lastCommende = data;
            console.log(data);
        });
    };
    LastcommendeDirective.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], LastcommendeDirective.prototype, "pointvente", void 0);
    LastcommendeDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[lastcommende]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_manager_manager__["a" /* ManagerProvider */]])
    ], LastcommendeDirective);
    return LastcommendeDirective;
}());

//# sourceMappingURL=lastcommende.js.map

/***/ }),

/***/ 801:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LastrendevousDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_manager_manager__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_localisation_localisation__ = __webpack_require__(65);
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
 * Generated class for the LastrendevousDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var LastrendevousDirective = /** @class */ (function () {
    function LastrendevousDirective(manager, connectivityService) {
        this.manager = manager;
        this.connectivityService = connectivityService;
    }
    LastrendevousDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.pointvente || !this.pointvente.rendezvous)
            return;
        this.pointvente.rendezvous.loading = true;
        this.manager.show('rendezvous', this.pointvente.id, this.connectivityService.isOnline()).then(function (data) {
            if (data)
                _this.pointvente.rendezvous = data;
        }, function (error) {
            _this.pointvente.rendezvous.loading = true;
        });
    };
    LastrendevousDirective.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], LastrendevousDirective.prototype, "pointvente", void 0);
    LastrendevousDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[lastrendevous]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_manager_manager__["a" /* ManagerProvider */], __WEBPACK_IMPORTED_MODULE_2__providers_localisation_localisation__["a" /* LocalisationProvider */]])
    ], LastrendevousDirective);
    return LastrendevousDirective;
}());

//# sourceMappingURL=lastrendevous.js.map

/***/ }),

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HideHeaderDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
var HideHeaderDirective = /** @class */ (function () {
    function HideHeaderDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    HideHeaderDirective.prototype.ngOnInit = function () {
        this.headerHeight = this.header.clientHeight;
        this.renderer.setElementStyle(this.header, 'webkitTransition', 'top 700ms');
        this.scrollContent = this.elementRef.nativeElement.getElementsByClassName('scroll-content')[0];
        this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 700ms');
    };
    HideHeaderDirective.prototype.onContentScroll = function (event) {
        if (event.scrollTop > this.headerHeight) {
            this.renderer.setElementStyle(this.header, 'top', (this.headerHeight > 56) ? '-' + (this.headerHeight + 25) + 'px' : '-' + this.headerHeight + 'px');
            this.renderer.setElementStyle(this.scrollContent, 'margin-top', '-25px');
        }
        else {
            this.renderer.setElementStyle(this.header, 'top', '0px');
            this.renderer.setElementStyle(this.scrollContent, 'margin-top', (this.headerHeight > 56) ? (this.headerHeight + 25) + 'px' : this.headerHeight + 'px');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])("header"),
        __metadata("design:type", HTMLElement)
    ], HideHeaderDirective.prototype, "header", void 0);
    HideHeaderDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[hide-header]',
            host: { '(ionScroll)': 'onContentScroll($event)' }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
    ], HideHeaderDirective);
    return HideHeaderDirective;
}());

//# sourceMappingURL=hide-header.js.map

/***/ }),

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TotalDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_manager_manager__ = __webpack_require__(45);
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
 * Generated class for the TotalDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
var TotalDirective = /** @class */ (function () {
    function TotalDirective(manager) {
        this.manager = manager;
    }
    TotalDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.commende || !this.commende.lignes || !this.commende.lignes.length)
            return;
        this.commende.total = 0;
        this.commende.lignes.forEach(function (ligne) {
            console.log(ligne);
            if (ligne.quantite && ligne.pu)
                _this.commende.total += ligne.quantite * ligne.pu;
        });
    };
    TotalDirective.prototype.ngOnChanges = function () {
        this.ngOnInit();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TotalDirective.prototype, "commende", void 0);
    TotalDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[total]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_manager_manager__["a" /* ManagerProvider */]])
    ], TotalDirective);
    return TotalDirective;
}());

//# sourceMappingURL=total.js.map

/***/ }),

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MomentPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var MomentPipe = /** @class */ (function () {
    function MomentPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    MomentPipe.prototype.transform = function (date, method) {
        if (!method)
            return this.fromNow(date);
        return __WEBPACK_IMPORTED_MODULE_1_moment__(date).fromNow();
    };
    MomentPipe.prototype.fromNow = function (date) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(date).calendar();
    };
    MomentPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'moment',
        })
    ], MomentPipe);
    return MomentPipe;
}());

//# sourceMappingURL=moment.js.map

/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_manager_manager__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geofence__ = __webpack_require__(482);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, geofence, events, manager, userService) {
        var _this = this;
        this.geofence = geofence;
        this.events = events;
        this.manager = manager;
        this.userService = userService;
        this.rootPage = 'MenuPage';
        this.setMomentConfig();
        platform.ready().then(function () {
            console.log(platform.platforms());
            if (platform.is('cordova') && platform.is('android')) {
                _this.userService.getToken();
                _this.userService.onNotification();
                _this.geofence.initialize().then(function () { return _this.addGeofence(); }, function (err) { return console.log(err); });
                _this.geofence.onTransitionReceived().subscribe(function (data) {
                    console.log(data); /// sent t the server
                });
            }
            _this.events.subscribe('app:connection:change', function (status) {
                if (status == 'connected') {
                    _this.manager.connected = true;
                    _this.manager.isAscing = true;
                    _this.manager.ascync().then(function () {
                        _this.manager.isAscing = false;
                    });
                }
            });
            /* this.userService.getAuthenticatedUser().subscribe(user => {
               if (user)
                 this.events.publish('app:connection:change', 'connected');
             })
             */
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.addGeofence = function () {
        var _this = this;
        this.userService.getAuthenticatedUser().subscribe(function (user) {
            if (user && user.secteur) {
                var fence = {
                    id: user.secteur.id,
                    latitude: user.secteur.lat,
                    longitude: user.secteur.long,
                    radius: user.secteur.radius,
                    transitionType: 3,
                    notification: {
                        id: 1,
                        title: 'Changement de zone',
                        text: 'Vous venez de changer de zone.',
                        openAppOnClick: true //open app when notification is tapped
                    }
                };
                _this.geofence.addOrUpdate(fence).then(function () { return console.log('Geofence added'); }, function (err) { return console.log('Geofence failed to add'); });
            }
        });
    };
    MyApp.prototype.setMomentConfig = function () {
        __WEBPACK_IMPORTED_MODULE_5_moment__["locale"]('fr', {
            months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
            monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
            monthsParseExact: true,
            weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
            weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
            weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
            weekdaysParseExact: true,
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY HH:mm',
                LLLL: 'dddd D MMMM YYYY HH:mm'
            },
            calendar: {
                sameDay: '[Aujourd’hui]',
                nextDay: '[Demain]',
                nextWeek: 'dddd [prochain]',
                lastDay: '[Hier]',
                lastWeek: 'dddd [dernier]',
                sameElse: '[le] LL'
            },
            relativeTime: {
                future: 'dans %s',
                past: 'il y a %s',
                s: 'quelques secondes',
                m: 'une minute',
                mm: '%d minutes',
                h: 'une heure',
                hh: '%d heures',
                d: 'un jour',
                dd: '%d jours',
                M: 'un mois',
                MM: '%d mois',
                y: 'un an',
                yy: '%d ans'
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Users\HP\workspace\provisional-mobile\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\HP\workspace\provisional-mobile\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geofence__["a" /* Geofence */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__providers_manager_manager__["a" /* ManagerProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[487]);
//# sourceMappingURL=main.js.map