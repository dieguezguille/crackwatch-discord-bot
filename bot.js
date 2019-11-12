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
var _this = this;
var nodeFetch = require('node-fetch');
var auth = require('./auth.json');
var discord = require('discord.js');
var client = new discord.Client();
client.login(auth.token);
client.on('ready', function () {
    console.log("Logged in as " + client.user.tag + "!");
});
var prefix = 'cw';
var searchString;
client.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!msg.content.startsWith("" + prefix)) return [3 /*break*/, 2];
                // inform user
                msg.channel.send('Loading games, please wait...');
                // make search string
                searchString = msg.content.replace(prefix, "").trim();
                return [4 /*yield*/, IsCracked(searchString)];
            case 1:
                result = _a.sent();
                msg.channel.send(result);
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
function IsCracked(searchString) {
    return __awaiter(this, void 0, void 0, function () {
        var found, emptyList, page, url, games, _i, games_1, game;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    found = false;
                    emptyList = false;
                    page = 0;
                    _a.label = 1;
                case 1:
                    if (!(!found || emptyList)) return [3 /*break*/, 3];
                    url = "https://api.crackwatch.com/api/games?page=" + page + "&sort_by=crack_date&is_cracked=true";
                    console.log(url);
                    return [4 /*yield*/, GetCrackedGames(url)];
                case 2:
                    games = _a.sent();
                    // check if game cracked
                    if (games.length > 0) {
                        emptyList = false;
                        for (_i = 0, games_1 = games; _i < games_1.length; _i++) {
                            game = games_1[_i];
                            if (game.title.toLowerCase().includes(searchString.toLowerCase())) {
                                found = true;
                                return [2 /*return*/, game.title + " is Cracked!"];
                            }
                        }
                        page++;
                    }
                    else {
                        emptyList = true;
                        return [2 /*return*/, "No games found."];
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function GetCrackedGames(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, nodeFetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
