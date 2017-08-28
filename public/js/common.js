/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NBAplayers = function () {
    function NBAplayers() {
        _classCallCheck(this, NBAplayers);

        this.socket = undefined;
        this.bindEvents();
        this.onLoad();
    }

    _createClass(NBAplayers, [{
        key: 'bindEvents',
        value: function bindEvents() {
            var _this = this;

            $(document).keypress(function (e) {
                if (e.which == 13) {
                    _this.playerSearch(e);
                }
            });
        }
    }, {
        key: 'onLoad',
        value: function onLoad() {
            var _this2 = this;

            this.wsocket();

            this.socket.onmessage = function (message) {
                var data = $.parseJSON(message.data);
                _this2[data.action](data.data);
            };
        }

        /**
         * WebSockets
         */

    }, {
        key: 'wsocket',
        value: function wsocket() {
            this.socket = new WebSocket('ws://localhost:8080');
            this.socket.onopen = function () {
                console.log('WebSocket Open');
            };
        }

        /**
         * Search for a Player
         * @param e
         */

    }, {
        key: 'playerSearch',
        value: function playerSearch(e) {
            e.preventDefault();
            var searchVal = $('[name="playerSearch"]').val();
            // Search IF Typed more than 2 letters
            if (searchVal.length > 2) {
                this.socket.send(JSON.stringify({ action: 'findPlayer', value: searchVal }));
            }
        }

        /**
         * Get Player Data
         * @param data
         */

    }, {
        key: 'findPlayer',
        value: function findPlayer(data) {
            $('.playerName, .playerInfo, .playerStats').empty();
            if (data) {
                $('.playerName').html('<h2>' + data.fullName + '</h2>');
                this.getPlayerInfo({
                    PlayerID: data.playerId,
                    SeasonType: "Regular Season",
                    LeagueID: "00"
                });

                this.getPlayerProfile({ PlayerID: data.playerId });
            } else {
                $('.playerName').html('<h2>Player Not Found</h2>');
            }
        }

        /**
         * WS Get Player Basic Info
         * @param params
         */

    }, {
        key: 'getPlayerInfo',
        value: function getPlayerInfo(params) {
            this.socket.send(JSON.stringify({ action: 'playerInfo', value: params }));
        }

        /**
         * WS Get Player Profile Data
         * @param params
         */

    }, {
        key: 'getPlayerProfile',
        value: function getPlayerProfile(params) {
            this.socket.send(JSON.stringify({ action: 'playerProfile', value: params }));
        }

        /**
         * Parse Player Info
         * @param data
         */

    }, {
        key: 'playerInfo',
        value: function playerInfo(data) {
            var info = data.commonPlayerInfo[0];
            var html = '<blockquote>\n                <p>Team: ' + info.teamName + '</p>\n                <p>' + info.position + '</p>\n                <p>' + info.weight + '/' + info.height + '</p>\n                <p>Exp: ' + info.seasonExp + ' years</p>\n                <p>From: ' + info.country + '</p>\n            </blockquote>';

            $('.playerInfo').html(html);
        }

        /**
         * Parse Player Statistics
         * @param data
         */

    }, {
        key: 'playerProfile',
        value: function playerProfile(data) {
            var html = '<table class="statsTable">\n                        <thead>\n                            <tr>\n                                <th>season</th>\n                                <th>team</th>\n                                <th>ast</th>\n                                <th>blk</th>\n                                <th>dreb</th>\n                                <th>fG3A</th>\n                                <th>fG3M</th>\n                                <th>fg3Pct</th>\n                                <th>fgPct</th>\n                                <th>fga</th>\n                                <th>fgm</th>\n                                <th>ftPct</th>\n                                <th>fta</th>\n                                <th>ftm</th>\n                                <th>gp</th>\n                                <th>gs</th>\n                                <th>min</th>\n                                <th>oreb</th>\n                                <th>pf</th>\n                                <th>pts</th>\n                                <th>reb</th>\n                            </tr>\n                        </thead>\n                        <tbody>';
            var regularSeason = data.seasonTotalsRegularSeason;
            if (regularSeason) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = regularSeason.reverse()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;

                        html += '<tr>\n                            <td>' + item.seasonId + '</td>\n                            <td>' + item.teamAbbreviation + '</td>\n                            <td>' + item.ast + '</td>\n                            <td>' + item.blk + '</td>\n                            <td>' + item.dreb + '</td>\n                            <td>' + item.fG3A + '</td>\n                            <td>' + item.fG3M + '</td>\n                            <td>' + item.fg3Pct + '</td>\n                            <td>' + item.fgPct + '</td>\n                            <td>' + item.fga + '</td>\n                            <td>' + item.fgm + '</td>\n                            <td>' + item.ftPct + '</td>\n                            <td>' + item.fta + '</td>\n                            <td>' + item.ftm + '</td>\n                            <td>' + item.gp + '</td>\n                            <td>' + item.gs + '</td>\n                            <td>' + item.min + '</td>\n                            <td>' + item.oreb + '</td>\n                            <td>' + item.pf + '</td>\n                            <td>' + item.pts + '</td>\n                            <td>' + item.reb + '</td>\n                        </tr>';
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            html += '</body>\n                </table>';

            $('.playerStats').html(html);
        }
    }]);

    return NBAplayers;
}();

$(document).ready(function () {
    new NBAplayers();
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);