"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var BasicCounterInterface = require("../build/contracts/BasicCounter.json");
/// BasicCounter app class
var BasicCounter = /** @class */ (function () {
    function BasicCounter(contractAddress, contractABI, jsonRpcProviderURL) {
        this._contrAddr = contractAddress;
        this._contrABI = contractABI;
        this._jsonRPCProviderURL = jsonRpcProviderURL;
    }
    /// init and return the address of the contract
    BasicCounter.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._provider = new ethers_1.ethers.providers.JsonRpcProvider(this._jsonRPCProviderURL); // create provider;
                        this._contrInstance = new ethers_1.ethers.Contract(this._contrAddr, this._contrABI, this._provider); // create contract
                        _a = this;
                        return [4 /*yield*/, this._provider.listAccounts()];
                    case 1:
                        _a._accounts = _b.sent();
                        this._signer = this._provider.getSigner(this._accounts[0] // set first account as initial account but can be changed
                        );
                        this._contrInstanceWithSigner = this._contrInstance.connect(this._signer); // connect signer
                        return [2 /*return*/, {
                                accounts: this._accounts,
                                address: this._contrInstance.address,
                                interface: this._contrInstance.interface
                            }];
                }
            });
        });
    };
    BasicCounter.prototype.increase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._contrInstanceWithSigner.increase().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, response.wait().then(function (receipt) {
                                    return ethers_1.BigNumber.from(receipt.logs[0].data).toNumber();
                                })];
                        });
                    }); })["catch"](function (err) {
                        console.error("Error occured: ", err);
                    })];
            });
        });
    };
    BasicCounter.prototype.decrease = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._contrInstanceWithSigner.decrease().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, response.wait().then(function (receipt) {
                                    return ethers_1.BigNumber.from(receipt.logs[0].data).toNumber();
                                })];
                        });
                    }); })["catch"](function (err) {
                        console.error("Error occured: ", err);
                    })];
            });
        });
    };
    BasicCounter.prototype.currentValue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._contrInstance.get().then(function (value) {
                        return value;
                    })["catch"](function (err) {
                        console.error("Error occured: ", err);
                    })];
            });
        });
    };
    BasicCounter.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this._contrInstanceWithSigner.reset().then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, response.wait().then(function (receipt) {
                                    return ethers_1.BigNumber.from(receipt.logs[0].data).toNumber();
                                })];
                        });
                    }); })["catch"](function (err) {
                        console.error("Error occured: ", err);
                    })];
            });
        });
    };
    return BasicCounter;
}());
/// Usage
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var counter, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    counter = new BasicCounter("0x60534366D999b234b5280a62D388def4b04EA3f9", // ganache
                    BasicCounterInterface.abi, "http://127.0.0.1:7545");
                    return [4 /*yield*/, counter.init()
                        // increase counter;
                    ]; // init
                case 1:
                    _c.sent(); // init
                    // increase counter;
                    _b = (_a = console).log;
                    return [4 /*yield*/, counter.decrease()];
                case 2:
                    // increase counter;
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
main();
