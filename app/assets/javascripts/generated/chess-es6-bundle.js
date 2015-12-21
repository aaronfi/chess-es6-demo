/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	window.Chess = __webpack_require__(1);

	// TODO consider user of objectAssign npm module / polyfill
	//
	// polyfill, from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
	// non-ES6 browsers won't have Object.assign defined
	if (!Object.assign) {
	  Object.defineProperty(Object, 'assign', {
	    enumerable: false,
	    configurable: true,
	    writable: true,
	    value: function value(target) {
	      'use strict';
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert first argument to object');
	      }

	      var to = Object(target);
	      for (var i = 1; i < arguments.length; i++) {
	        var nextSource = arguments[i];
	        if (nextSource === undefined || nextSource === null) {
	          continue;
	        }
	        nextSource = Object(nextSource);

	        var keysArray = Object.keys(Object(nextSource));
	        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	          var nextKey = keysArray[nextIndex];
	          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	          if (desc !== undefined && desc.enumerable) {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	      return to;
	    }
	  });
	}

	// Array.from polyfill
	/*! https://mths.be/array-from v0.2.0 by @mathias */
	if (!Array.from) {
	  (function () {
	    'use strict';
	    var defineProperty = (function () {
	      // IE 8 only supports `Object.defineProperty` on DOM elements.
	      try {
	        var object = {};
	        var $defineProperty = Object.defineProperty;
	        var result = $defineProperty(object, object, object) && $defineProperty;
	      } catch (error) {}
	      return result || function put(object, key, descriptor) {
	        object[key] = descriptor.value;
	      };
	    })();
	    var toStr = Object.prototype.toString;
	    var isCallable = function isCallable(fn) {
	      // In a perfect world, the `typeof` check would be sufficient. However,
	      // in Chrome 1–12, `typeof /x/ == 'object'`, and in IE 6–8
	      // `typeof alert == 'object'` and similar for other host objects.
	      return typeof fn == 'function' || toStr.call(fn) == '[object Function]';
	    };
	    var toInteger = function toInteger(value) {
	      var number = Number(value);
	      if (isNaN(number)) {
	        return 0;
	      }
	      if (number == 0 || !isFinite(number)) {
	        return number;
	      }
	      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
	    };
	    var maxSafeInteger = Math.pow(2, 53) - 1;
	    var toLength = function toLength(value) {
	      var len = toInteger(value);
	      return Math.min(Math.max(len, 0), maxSafeInteger);
	    };
	    var from = function from(arrayLike) {
	      var C = this;
	      if (arrayLike == null) {
	        throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
	      }
	      var items = Object(arrayLike);
	      var mapping = arguments.length > 1;

	      var mapFn, T;
	      if (arguments.length > 1) {
	        mapFn = arguments[1];
	        if (!isCallable(mapFn)) {
	          throw new TypeError('When provided, the second argument to `Array.from` must be a function');
	        }
	        if (arguments.length > 2) {
	          T = arguments[2];
	        }
	      }

	      var len = toLength(items.length);
	      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
	      var k = 0;
	      var kValue, mappedValue;
	      while (k < len) {
	        kValue = items[k];
	        if (mapFn) {
	          mappedValue = typeof T == 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
	        } else {
	          mappedValue = kValue;
	        }
	        defineProperty(A, k, {
	          'value': mappedValue,
	          'configurable': true,
	          'enumerable': true,
	          'writable': true
	        });
	        ++k;
	      }
	      A.length = len;
	      return A;
	    };
	    defineProperty(Array, 'from', {
	      'value': from,
	      'configurable': true,
	      'writable': true
	    });
	  })();
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var BoardVariation = __webpack_require__(2);
	var Color = __webpack_require__(3);
	var Fen = __webpack_require__(5);
	var Flags = __webpack_require__(6);
	var Game = __webpack_require__(11);
	var Move = __webpack_require__(7);
	var PieceType = __webpack_require__(8);

	var Chess = (function () {
	    function Chess() /* string */ // TODO(aaron) think about also having a constructor that takes in PGN ?
	    {
	        var fen = arguments.length <= 0 || arguments[0] === undefined ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' : arguments[0];

	        _classCallCheck(this, Chess);

	        var game = new Game(fen);
	        this.games = [game];

	        this.currentGame = game;
	        this.currentGameNum = 0;

	        this.lastTimerSnapshot = -1;
	        this.replayLog = [];
	    }

	    _createClass(Chess, [{
	        key: 'toString',
	        value: function toString() {
	            return this.games.length + ' game' + (this.games.length > 1 ? 's' : '') + ' loaded.  Game #' + (this.currentGameNum + 1) + ' selected:\n\n' + this.currentGame.toString();
	        }
	    }, {
	        key: 'addGame',
	        value: function addGame() {
	            var game = arguments.length <= 0 || arguments[0] === undefined ? new Game() : arguments[0];

	            this.games.push(game);
	        }
	    }, {
	        key: 'selectGame',
	        value: function selectGame(i) {
	            if (i < 0 || i >= this.games.length) {
	                return false;
	            }

	            this.currentGame = this.games[i];
	            this.currentGameNum = i;

	            return true;
	        }
	    }, {
	        key: 'toPgn',
	        value: function toPgn() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            options = Object.assign({}, {
	                maxWidth: 0,
	                newlineChar: '\n',
	                showMoveCursor: false,
	                showHeaders: true
	            }, options);

	            return this.currentGame.toPgn(options);
	        }
	    }, {
	        key: 'loadPgn',
	        value: function loadPgn(pgnText) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            options = Object.assign({}, {
	                newlineChar: '\r?\n'
	            }, options);

	            // reduce all newlines into \n for simplified parsing
	            pgnText = pgnText.replace(new RegExp(options.newlineChar.replace(/\\/g, '\\'), 'g'), '\n');

	            var pairs = this._parsePgnGames(pgnText);

	            for (var i = 0; i < pairs.length; i++) {
	                var game = this._parsePgnGame(pairs[i].headerText, pairs[i].gameText);
	                if (!game) {
	                    return false;
	                }
	                this.addGame(game);
	            }

	            this.selectGame(this.games.length - 1); // select the game we just loaded...

	            return true;
	        }

	        // sanitizes our raw input PGN text, dividing it up by each unique game entry it contains
	    }, {
	        key: '_parsePgnGames',
	        value: function _parsePgnGames(pgnText) {
	            var results = [];

	            var headMatch = undefined,
	                prevHead = undefined,
	                newHead = undefined,
	                startNew = undefined,
	                afterNew = undefined,
	                lastOpen = undefined,
	                checkedGame = "",
	                numberOfGames = 0,
	                validHead = undefined;
	            var headerBlockRegex = /\s*(\[\s*\w+\s*"[^"]*"\s*\]\s*)+/;

	            // fix common mistakes in PGN text
	            pgnText = pgnText.replace(/[\u00A0\u180E\u2000-\u200A\u202F\u205F\u3000]/g, " "); // some spaces to plain space
	            pgnText = pgnText.replace(/\u00BD/g, "1/2"); // "half fraction" to "1/2"
	            pgnText = pgnText.replace(/[\u2010-\u2015]/g, "-"); // "hyphens" to "-"
	            pgnText = pgnText.replace(/\u2024/g, "."); // "one dot leader" to "."
	            pgnText = pgnText.replace(/[\u2025-\u2026]/g, "..."); // "two dot leader" and "ellipsis" to "..."
	            pgnText = pgnText.replace(/\\"/g, "'"); // fix [Opening "Queen\"s Gambit"]

	            // escape html entities
	            pgnText = pgnText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

	            // PGN standard: ignore lines starting with %
	            pgnText = pgnText.replace(/(^|\n)%.*(\n|$)/g, "\n");

	            if (headerBlockRegex.exec(pgnText)) {
	                while (headMatch = headerBlockRegex.exec(pgnText)) {
	                    newHead = headMatch[0];
	                    startNew = pgnText.indexOf(newHead);
	                    afterNew = startNew + newHead.length;
	                    if (prevHead) {
	                        checkedGame += pgnText.slice(0, startNew);
	                        validHead = (lastOpen = checkedGame.lastIndexOf("{")) < 0 || checkedGame.lastIndexOf("}") > lastOpen;
	                        if (validHead) {
	                            results.push({
	                                headerText: prevHead,
	                                gameText: checkedGame
	                            });
	                            checkedGame = "";
	                        } else {
	                            checkedGame += newHead;
	                        }
	                    } else {
	                        validHead = true;
	                    }
	                    if (validHead) {
	                        prevHead = newHead;
	                    }
	                    pgnText = pgnText.slice(afterNew);
	                }
	            } else {
	                results.push({
	                    headerText: "",
	                    gameText: pgnText
	                });
	            }

	            if (prevHead) {
	                checkedGame += pgnText;
	                results.push({
	                    headerText: prevHead,
	                    gameText: checkedGame
	                });
	            }

	            return results;
	        }

	        //
	        // behold, an actual PGN parser and lexer, with full support for variations.
	        //

	    }, {
	        key: '_parsePgnGame',
	        value: function _parsePgnGame(pgnHeaderText, pgnGameText) {
	            var POSSIBLE_RESULTS = ['1-0', '0-1', '1/2-1/2', '*']; // TODO:  this is a constant, put it somewhere better...?

	            function _openNewVariation(game, isContinuation) {
	                var parentLastMoveIndex = game.currentVariation.moveHistory.length - 1;

	                var innerVariation = BoardVariation.createFromParentVariation(game.currentVariation, { isContinuation: isContinuation });

	                game.boardVariations.push(innerVariation);

	                // take the variation we just started, and append it to the list of child variations that start from its "parent" move.
	                game.currentVariation.moveHistory[parentLastMoveIndex].childVariations.push(innerVariation);

	                game.currentVariation = innerVariation;
	            }

	            function _closeCurrentVariation(game) {
	                game.currentVariation = game.currentVariation.parentVariation;
	            }

	            // parse pgn's header text
	            var key = undefined,
	                value = undefined,
	                headers = pgnHeaderText.split('\n');

	            var fen = Fen.DEFAULT_POSITION_FULL;
	            var pairs = [];
	            for (var i = 0; i < headers.length; i++) {
	                var header = headers[i].trim();

	                key = header.replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1');
	                value = header.replace(/^\[[A-Za-z]+\s"(.*)"\]$/, '$1');

	                if (key.length > 0) {
	                    pairs.push(key);
	                    pairs.push(value);

	                    if (key.toUpperCase() === 'FEN') {
	                        fen = value;
	                    }
	                }
	            }

	            var game = new Game(fen, pairs);

	            // parse pgn's chess text
	            var prevMove = undefined,
	                start = undefined,
	                end = undefined,
	                comment = undefined,
	                ss = pgnGameText;

	            for (start = 0; start < ss.length; start++) {
	                switch (ss.charAt(start)) {
	                    case ' ':
	                    case '\b':
	                    case '\f':
	                    case '\n':
	                    case '\r':
	                    case '\t':
	                        break;

	                    case ';':
	                        // TODO:  add support for "rest of line" comment.  http://www6.chessclub.com/help/PGN-spec
	                        break;

	                    case '{':
	                        end = start;
	                        while (ss.charAt(end) != '}') {
	                            end++;
	                        }

	                        comment = ss.substring(start, end + 1); // TODO need to properly sanitize this input.

	                        if (game.currentVariation.intraMoveAnnotationSlots[game.currentVariation.selectedMoveHistoryIndex + 1]) {
	                            game.currentVariation.intraMoveAnnotationSlots[game.currentVariation.selectedMoveHistoryIndex + 1].push(comment);
	                        } else {
	                            game.currentVariation.intraMoveAnnotationSlots[game.currentVariation.selectedMoveHistoryIndex + 1] = [comment];
	                        }

	                        if (prevMove) {
	                            prevMove.metadata.comment = comment; // assign all comment blocks to their preceding move
	                            // TODO this logic is broken;  there could be multiple comments;  need to push onto a .comments array;
	                            // TODO figure out the interplay between metadata.comment and intraMoveAnnotationSlots;
	                            // you should probably just have metadata link to the given slots?  instead of duplicating?
	                        }

	                        start = end;
	                        break;

	                    case '(':
	                        var isContinuation = false;
	                        if (ss.charAt(start + 1) === '*') {
	                            isContinuation = true;
	                            start++;
	                        }
	                        _openNewVariation(game, isContinuation);
	                        break;

	                    case ')':
	                        _closeCurrentVariation(game);
	                        break;

	                    case '$':
	                        // http://en.wikipedia.org/wiki/Numeric_Annotation_Glyphs
	                        end = start + 1;
	                        while (ss.charAt(end) != ' ') {
	                            end++;
	                        }

	                        var glyph = ss.substring(start, end); // TODO need to properly sanitize this input.

	                        if (game.currentVariation.intraMoveAnnotationSlots[game.currentVariation.selectedMoveHistoryIndex + 1]) {
	                            game.currentVariation.intraMoveAnnotationSlots[game.currentVariation.selectedMoveHistoryIndex + 1].push(glyph);
	                        } else {
	                            game.currentVariation.intraMoveAnnotationSlots[game.currentVariation.selectedMoveHistoryIndex + 1] = [glyph];
	                        }

	                        start = end;
	                        break;

	                    default:
	                        var sanText = undefined;

	                        for (var i = 0; i < POSSIBLE_RESULTS.length; i++) {
	                            if (ss.indexOf(POSSIBLE_RESULTS[i], start) == start) {
	                                if (game.currentVariation === game.currentVariation[0]) {
	                                    end = ss.length;
	                                } else {
	                                    end = start + POSSIBLE_RESULTS[i].length;
	                                }
	                                start = end;
	                                break;
	                            }
	                        }
	                        if (start == ss.length) {
	                            break;
	                        }

	                        var needle = game.currentVariation.moveNumber.toString();

	                        if (ss.indexOf(needle, start) == start) {
	                            start += needle.length;
	                            while (' .\n\r'.indexOf(ss.charAt(start)) != -1) {
	                                start++;
	                            }
	                        }

	                        if (ss.substr(start, 2) === Move.WILDCARD_MOVE) {
	                            var someMove = Move.createWildcardMove(game.currentVariation);
	                            prevMove = game.makeMove(someMove);
	                            end = start + 2;
	                        } else if (ss.substr(start, 8) === "&lt;&gt;") {
	                            var someMove = Move.createWildcardMove(game.currentVariation);
	                            prevMove = game.makeMove(someMove);
	                            end = start + 8;
	                        } else {
	                            if ((end = start + ss.substr(start).search(/[\s${;!?()]/)) < start) {
	                                end = ss.length;
	                            }

	                            sanText = ss.substring(start, end);
	                            prevMove = game.makeMoveFromSan(sanText);
	                        }

	                        if (!prevMove) {
	                            throw new Error('error when trying to apply the parsed PGN move "' + sanText + '"');
	                        }

	                        comment = null;

	                        if (ss.charAt(end) === ' ') {
	                            start = end;
	                        } else {
	                            start = end - 1;
	                        }

	                        break;
	                }
	            }

	            if (game.currentVariation !== game.boardVariations[0]) {
	                // error: parse_pgn ended with one or more dangling variations that weren't closed off
	                while (game.currentVariation !== game.boardVariations[0]) {
	                    _closeCurrentVariation(game);
	                }
	            }

	            return game;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            var game = new Game();
	            this.currentGameNum = 0;
	            this.currentGame = game;

	            this.games[this.currentGameNum] = game;
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            var game = new Game(Fen.DEFAULT_POSITION_FULL);
	            this.currentGameNum = 0;
	            this.currentGame = game;

	            this.games[this.currentGameNum] = game;
	        }
	    }, {
	        key: 'whoseTurn',
	        value: function whoseTurn() {
	            return this.currentGame.currentVariation.turn;
	        }

	        // --------------------------------------
	        // pass-through API methods, alphabetized
	        // --------------------------------------

	    }, {
	        key: 'ascendFromCurrentContinuation',
	        value: function ascendFromCurrentContinuation() {
	            return this.currentGame.ascendFromCurrentContinuation();
	        }
	    }, {
	        key: 'ascendFromCurrentVariation',
	        value: function ascendFromCurrentVariation() {
	            return this.currentGame.ascendFromCurrentVariation();
	        }
	    }, {
	        key: 'createContinuationFromSan',
	        value: function createContinuationFromSan(san /* string, e.g. "Rxa7" or "e8=Q#" */) {
	            return this.currentGame.createContinuationFromSan(san);
	        }
	    }, {
	        key: 'createVariationFromSan',
	        value: function createVariationFromSan(san /* string, e.g. "Rxa7" or "e8=Q#" */) {
	            return this.currentGame.createVariationFromSan(san);
	        }
	    }, {
	        key: 'descendIntoContinuation',
	        value: function descendIntoContinuation(i) {
	            return this.currentGame.descendIntoContinuation(i);
	        }
	    }, {
	        key: 'descendIntoVariation',
	        value: function descendIntoVariation(i) {
	            return this.currentGame.descendIntoVariation(i);
	        }
	    }, {
	        key: 'get',
	        value: function get(square /* string, e.g. 'a1' */) {
	            return this.currentGame.get(square);
	        }
	    }, {
	        key: 'header',
	        value: function header() {
	            return this.currentGame.header;
	        }
	    }, {
	        key: 'history',
	        value: function history() {
	            return this.currentGame.history();
	        }
	    }, {
	        key: 'isCheck',
	        value: function isCheck() {
	            return this.currentGame.isCheck();
	        }
	    }, {
	        key: 'isCheckmate',
	        value: function isCheckmate() {
	            return this.currentGame.isCheckmate();
	        }
	    }, {
	        key: 'isDraw',
	        value: function isDraw() {
	            return this.currentGame.isDraw();
	        }
	    }, {
	        key: 'isGameOver',
	        value: function isGameOver() {
	            return this.currentGame.isGameOver();
	        }
	    }, {
	        key: 'isInsufficientMaterial',
	        value: function isInsufficientMaterial() {
	            return this.currentGame.isInsufficientMaterial();
	        }
	    }, {
	        key: 'isStalemate',
	        value: function isStalemate() {
	            return this.currentGame.isStalemate();
	        }
	    }, {
	        key: 'isThreefoldRepetition',
	        value: function isThreefoldRepetition() {
	            return this.currentGame.isThreefoldRepetition();
	        }
	    }, {
	        key: 'loadFen',
	        value: function loadFen(fen) {
	            return this.currentGame.loadFen(fen);
	        }
	    }, {
	        key: 'makeMove',
	        value: function makeMove(move /* Move.js object */) {
	            return this.currentGame.makeMove(move);
	        }
	    }, {
	        key: 'makeMoveFromSan',
	        value: function makeMoveFromSan(san /* string, e.g. "Rxa7" or "e8=Q#" */) {
	            return this.currentGame.makeMoveFromSan(san);
	        }
	    }, {
	        key: 'makeMoveFromAlgebraic',
	        value: function makeMoveFromAlgebraic(from, /* e.g. 'a4', 'b3' */
	        to /* e.g. 'a4', 'b3' */
	        ) {
	            var promotionPieceType = arguments.length <= 2 || arguments[2] === undefined ? PieceType.QUEEN : arguments[2];

	            return this.currentGame.makeMoveFromAlgebraic(from, to, promotionPieceType);
	        }
	    }, {
	        key: 'moves',
	        value: function moves() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                onlyAlgebraicSquares: false,
	                onlyDestinationSquares: false,
	                onlyForSquare: undefined
	            } : arguments[0];

	            return this.currentGame.moves(options);
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            return this.currentGame.next();
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            return this.currentGame.prev();
	        }
	    }, {
	        key: 'put',
	        value: function put(piece, /* Piece, e.g. Piece.WHITE_ROOK */square /* string, e.g. 'h8' */) {
	            var success = this.currentGame.put(piece, square);
	            if (success) {
	                this.currentGame._updateSetup();
	            }
	            return success;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(square /* string, e.g. 'a1' */) {
	            return this.currentGame.remove(square);
	        }
	    }, {
	        key: 'rewindToBeginning',
	        value: function rewindToBeginning() {
	            return this.currentGame.rewindToBeginning();
	        }
	    }, {
	        key: 'selectMove',
	        value: function selectMove(i) {
	            return this.currentGame._selectMove(i, { shouldLog: true });
	        }
	    }, {
	        key: 'toFen',
	        value: function toFen() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                omitExtras: false
	            } : arguments[0];

	            return this.currentGame.currentVariation.toFen(options);
	        }
	    }, {
	        key: 'validateFen',
	        value: function validateFen(fen) {
	            return Fen.validate(fen);
	        }
	    }]);

	    return Chess;
	})();

	;

	module.exports = Chess;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Color = __webpack_require__(3);
	var EventLog = __webpack_require__(4);
	var Fen = __webpack_require__(5);
	var Flags = __webpack_require__(6);
	var Move = __webpack_require__(7);
	var MoveContext = __webpack_require__(10);
	var Piece = __webpack_require__(9);
	var PieceType = __webpack_require__(8);

	var BoardVariation = (function () {
	    function BoardVariation(eventLog) {
	        var _castlingEligibility, _kings;

	        _classCallCheck(this, BoardVariation);

	        this.id = BoardVariation.id++;

	        this.parentVariation = null;
	        this.parentLastMoveIndex = null;
	        this.turn = Color.WHITE;
	        this.enPassantSquare = -1; // the 0x88 index of the current en passant capture square, if any
	        this.moveNumber = 1; // logical move number
	        this.plyCount = 0; // physical move number
	        this.halfMoves = 0; // halfMoves != plyCount, but the number of ply since last capture or pawn advancement

	        this.board = Array.apply(null, new Array(128)).map(function () {
	            return Piece.NONE;
	        }); // an array of Pieces, just { color, type }.  Blank squares are left as Piece.NONE.
	        // Conceptually, this array is 128 elements long, per the 0x88 system.

	        this.castlingEligibility = (_castlingEligibility = {}, _defineProperty(_castlingEligibility, Color.WHITE, Flags.KSIDE_CASTLE & Flags.QSIDE_CASTLE), _defineProperty(_castlingEligibility, Color.BLACK, Flags.KSIDE_CASTLE & Flags.QSIDE_CASTLE), _castlingEligibility);
	        this.kings = (_kings = {}, _defineProperty(_kings, Color.WHITE, -1), _defineProperty(_kings, Color.BLACK, -1), _kings);

	        // the 0x88 index of the black King's current location
	        this.moveHistory = []; // array of MoveContext objects...
	        this.selectedMoveHistoryIndex = -1;

	        this.positionCount = new Map(); // a mapping from FEN positional string to frequency count;  used in isThreefoldRepetition()

	        this.intraMoveAnnotationSlots = []; // an array of arrays, used for storing PGN comments and PGN Glyphs

	        this.eventLog = eventLog; // EventLog for tracking all player interactions at the Game.js level

	        this.isContinuation = false;
	    }

	    // copy constructor

	    _createClass(BoardVariation, [{
	        key: 'loadFen',
	        value: function loadFen(fen /* string */) {
	            if (!Fen.validate(fen).isValid) {
	                return false;
	            }

	            this.id = BoardVariation.id++; // loading from fen should (probably) force a new variation ID
	            this.board = Array.apply(null, new Array(128)).map(function () {
	                return Piece.NONE;
	            });

	            var tokens = fen.split(/\s+/);
	            var position = tokens[0];
	            var square = 0;

	            for (var i = 0; i < position.length; i++) {
	                var symbol = position.charAt(i);

	                if (symbol === '/') {
	                    square += 8;
	                } else if ('0123456789'.indexOf(symbol) !== -1) {
	                    square += parseInt(symbol, 10);
	                } else {
	                    this.put(Piece.forSymbol(symbol), BoardVariation._algebraic(square));
	                    square++;
	                }
	            }

	            this.turn = tokens[1];

	            if (tokens[2].indexOf('K') > -1) {
	                this.castlingEligibility[Color.WHITE] |= Flags.KSIDE_CASTLE;
	            }
	            if (tokens[2].indexOf('Q') > -1) {
	                this.castlingEligibility[Color.WHITE] |= Flags.QSIDE_CASTLE;
	            }
	            if (tokens[2].indexOf('k') > -1) {
	                this.castlingEligibility[Color.BLACK] |= Flags.KSIDE_CASTLE;
	            }
	            if (tokens[2].indexOf('q') > -1) {
	                this.castlingEligibility[Color.BLACK] |= Flags.QSIDE_CASTLE;
	            }

	            this.enPassantSquare = tokens[3] === '-' ? -1 : Move.SQUARES[tokens[3]];
	            this.halfMoves = parseInt(tokens[4], 10);
	            this.moveNumber = parseInt(tokens[5], 10);

	            this.positionCount.set(this.toFen({ omitExtras: true }), 1);

	            return true;
	        }
	    }, {
	        key: 'inspect',
	        value: function inspect() {
	            // for more succinct console.log() output
	            return this.toString();
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var s = '   +------------------------+' + (this.turn === Color.BLACK ? '  <-- ' + this.plyCount : '') + '\n';
	            for (var i = Move.SQUARES.a8; i <= Move.SQUARES.h1; i++) {
	                // display the rank
	                if (BoardVariation._file(i) === 0) {
	                    s += ' ' + '87654321'[BoardVariation._rank(i)] + ' |';
	                }

	                s += ' ' + this.board[i] + ' ';

	                if (i + 1 & 0x88) {
	                    s += '|\n';
	                    i += 8;
	                }
	            }
	            s += '   +------------------------+' + (this.turn === Color.WHITE ? '  <-- ' + this.plyCount : '') + '\n';
	            s += '     a  b  c  d  e  f  g  h\n';

	            return s;
	        }
	    }, {
	        key: 'toFen',
	        value: function toFen() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                omitExtras: false
	            } : arguments[0];

	            var empty = 0;
	            var fen = '';

	            for (var i = Move.SQUARES.a8; i <= Move.SQUARES.h1; i++) {
	                if (this.board[i] === Piece.NONE) {
	                    empty++;
	                } else {
	                    if (empty > 0) {
	                        fen += empty;
	                        empty = 0;
	                    }
	                    fen += this.board[i];
	                }

	                if (i + 1 & 0x88) {
	                    if (empty > 0) {
	                        fen += empty;
	                    }

	                    if (i !== Move.SQUARES.h1) {
	                        fen += '/';
	                    }

	                    empty = 0;
	                    i += 8;
	                }
	            }

	            if (options.omitExtras) {
	                return fen;
	            }

	            var castlingFlags = '';
	            if (this.castlingEligibility[Color.WHITE] & Flags.KSIDE_CASTLE) {
	                castlingFlags += 'K';
	            }
	            if (this.castlingEligibility[Color.WHITE] & Flags.QSIDE_CASTLE) {
	                castlingFlags += 'Q';
	            }
	            if (this.castlingEligibility[Color.BLACK] & Flags.KSIDE_CASTLE) {
	                castlingFlags += 'k';
	            }
	            if (this.castlingEligibility[Color.BLACK] & Flags.QSIDE_CASTLE) {
	                castlingFlags += 'q';
	            }

	            // do we have an empty castling flag?
	            castlingFlags = castlingFlags || '-';
	            var epFlags = this.enPassantSquare === -1 ? '-' : BoardVariation._algebraic(this.enPassantSquare);

	            return [fen, this.turn, castlingFlags, epFlags, this.halfMoves, this.moveNumber].join(' ');
	        }
	    }, {
	        key: 'put',
	        value: function put(piece, /* Piece, e.g. Piece.WHITE_ROOK */square /* string, e.g. 'h8' */) {
	            // no event logging;  this method is user facing, but is not involved with puzzle interaction

	            if (!(piece in Piece.LOOKUP && square in Move.SQUARES)) {
	                return false;
	            }

	            var sq = Move.SQUARES[square];

	            // don't let the user place more than one king
	            if (piece.type == PieceType.KING && !(this.kings[piece.color] === -1 || this.kings[piece.color] === sq)) {
	                return false;
	            }

	            this.board[sq] = piece;

	            if (piece.type === PieceType.KING) {
	                this.kings[piece.color] = sq;
	            }

	            return true;
	        }
	    }, {
	        key: 'get',
	        value: function get(square /* string, e.g. 'a1' */) {
	            if (!square in Move.SQUARES) {
	                return false;
	            }

	            return this.board[Move.SQUARES[square]];
	        }
	    }, {
	        key: 'remove',
	        value: function remove(square /* string, e.g. 'a1' */) {
	            // no event logging;  this method is user facing, but is not involved with puzzle interaction

	            if (!square in Move.SQUARES) {
	                return false;
	            }

	            var piece = this.get(square);
	            this.board[Move.SQUARES[square]] = Piece.NONE;

	            if (piece.type === PieceType.KING) {
	                this.kings[piece.color] = -1;
	            }

	            return piece;
	        }
	    }, {
	        key: 'moves',
	        value: function moves() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                onlyAlgebraicSquares: false,
	                onlyDestinationSquares: false,
	                onlyForSquare: undefined
	            } : arguments[0];

	            // no event logging;  this method is user facing, but is not involved with puzzle interaction

	            var moves = undefined;
	            if (options.onlyAlgebraicSquares) {
	                moves = this._generateMoves({ calculateSan: false }).map(function (move) {
	                    return move.algebraic;
	                });

	                if (options.onlyForSquare) {
	                    moves = moves.filter(function (move) {
	                        return move.substring(0, 2) === options.onlyForSquare;
	                    });
	                }

	                if (options.onlyDestinationSquares) {
	                    moves = moves.map(function (move) {
	                        return move.substring(3, 5);
	                    });
	                }
	            } else {
	                moves = this._generateMoves({ calculateSan: true }).map(function (move) {
	                    return move.san;
	                });
	            }

	            return moves;
	        }
	    }, {
	        key: '_applyMove',
	        value: function _applyMove(move /* Move object from move.js */) {
	            var us = this.turn;
	            var them = us === Color.WHITE ? Color.BLACK : Color.WHITE;

	            this.board[move.to] = this.board[move.from];
	            this.board[move.from] = Piece.NONE;

	            // if ep capture, remove the captured pawn
	            if (move.flags & Flags.EP_CAPTURE) {
	                if (this.turn === Color.BLACK) {
	                    this.board[move.to - 16] = Piece.NONE;
	                } else {
	                    this.board[move.to + 16] = Piece.NONE;
	                }
	            }

	            // if pawn promotion, replace with new piece
	            if (move.flags & Flags.PROMOTION) {
	                this.board[move.to] = move.promotionPiece;
	            }

	            // if we moved the king
	            if (move.movedPiece.type === PieceType.KING) {
	                this.kings[move.movedPiece.color] = move.to;
	                // if we castled, move the rook next to the king
	                if (move.flags & Flags.KSIDE_CASTLE) {
	                    var castlingTo = move.to - 1;
	                    var castlingFrom = move.to + 1;

	                    this.board[castlingTo] = this.board[castlingFrom];
	                    this.board[castlingFrom] = Piece.NONE;
	                } else if (move.flags & Flags.QSIDE_CASTLE) {
	                    var castlingTo = move.to + 1;
	                    var castlingFrom = move.to - 2;

	                    this.board[castlingTo] = this.board[castlingFrom];
	                    this.board[castlingFrom] = Piece.NONE;
	                }
	                // turn off castling
	                this.castlingEligibility[us] = 0;
	            }

	            // turn off castling if we move a rook
	            if (this.castlingEligibility[us]) {
	                if (us === Color.WHITE) {
	                    if (move.from === 112 /* a1 */ && this.castlingEligibility[us] & Flags.QSIDE_CASTLE) {
	                        this.castlingEligibility[us] ^= Flags.QSIDE_CASTLE;
	                    } else if (move.from === 119 /* a8 */ && this.castlingEligibility[us] & Flags.KSIDE_CASTLE) {
	                        this.castlingEligibility[us] ^= Flags.KSIDE_CASTLE;
	                    }
	                } else {
	                    if (move.from === 0 /* a8 */ && this.castlingEligibility[us] & Flags.QSIDE_CASTLE) {
	                        this.castlingEligibility[us] ^= Flags.QSIDE_CASTLE;
	                    } else if (move.from === 7 /* h8 */ && this.castlingEligibility[us] & Flags.KSIDE_CASTLE) {
	                        this.castlingEligibility[us] ^= Flags.KSIDE_CASTLE;
	                    }
	                }
	            }

	            // turn off castling if we capture a rook
	            if (this.castlingEligibility[them]) {
	                if (them === Color.WHITE) {
	                    if (move.from === 112 /* a1 */ && this.castlingEligibility[them] & Flags.QSIDE_CASTLE) {
	                        this.castlingEligibility[them] ^= Flags.QSIDE_CASTLE;
	                    } else if (move.from === 119 /* a8 */ && this.castlingEligibility[them] & Flags.KSIDE_CASTLE) {
	                        this.castlingEligibility[them] ^= Flags.KSIDE_CASTLE;
	                    }
	                } else {
	                    if (move.from === 0 /* a8 */ && this.castlingEligibility[them] & Flags.QSIDE_CASTLE) {
	                        this.castlingEligibility[them] ^= Flags.QSIDE_CASTLE;
	                    } else if (move.from === 7 /* h8 */ && this.castlingEligibility[them] & Flags.KSIDE_CASTLE) {
	                        this.castlingEligibility[them] ^= Flags.KSIDE_CASTLE;
	                    }
	                }
	            }

	            // if big pawn move, update the en passant square
	            if (move.flags & Flags.BIG_PAWN) {
	                if (this.turn === Color.BLACK) {
	                    this.enPassantSquare = move.to - 16;
	                } else {
	                    this.enPassantSquare = move.to + 16;
	                }
	            } else {
	                this.enPassantSquare = -1;
	            }

	            // reset the 100 half-move counter if a pawn is moved or a piece is captured
	            if (move.movedPiece.type === PieceType.PAWN) {
	                this.halfMoves = 0;
	            } else if (move.flags & (Flags.CAPTURE | Flags.EP_CAPTURE)) {
	                this.halfMoves = 0;
	            } else {
	                this.halfMoves++;
	            }
	            if (this.turn === Color.BLACK) {
	                this.moveNumber++;
	            }

	            this.plyCount = this.plyCount + 1;

	            this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE;
	        }

	        // TODO(6.27.15)   need to reinstrument all pair-wise calls to makeMove() <--> undoCurrentMove(),
	        // and possibly _applyMove() <--> _applyUndoMove() should you want to properly avoid fenCount calculations
	    }, {
	        key: 'undoCurrentMove',
	        value: function undoCurrentMove() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                updatePositionCount: true
	            } : arguments[0];

	            // no event logging;  this method is only used internally

	            if (this.selectedMoveHistoryIndex < 0) {
	                return false;
	            }

	            var oldMoveContext = this.moveHistory[this.selectedMoveHistoryIndex];

	            this.moveHistory.length = this.selectedMoveHistoryIndex; // we're undoing the currently selected move, so truncate and remove all moves ahead of us
	            this.selectedMoveHistoryIndex--;

	            var oldMove = this._applyUndoMove(oldMoveContext);

	            if (options.updatePositionCount) {
	                var key = this.toFen({ omitExtras: true });
	                this.positionCount.set(key, this.positionCount.get(key) - 1);

	                if (this.positionCount.get(key) === 0) {
	                    this.positionCount['delete'](key);
	                }
	            }

	            return oldMove;
	        }
	    }, {
	        key: '_applyUndoMove',
	        value: function _applyUndoMove(oldMoveContext) {
	            var _castlingEligibility2, _kings2;

	            var move = oldMoveContext.move;

	            this.castlingEligibility = (_castlingEligibility2 = {}, _defineProperty(_castlingEligibility2, Color.WHITE, oldMoveContext.castlingEligibility[Color.WHITE]), _defineProperty(_castlingEligibility2, Color.BLACK, oldMoveContext.castlingEligibility[Color.BLACK]), _castlingEligibility2);
	            this.kings = (_kings2 = {}, _defineProperty(_kings2, Color.WHITE, oldMoveContext.kings[Color.WHITE]), _defineProperty(_kings2, Color.BLACK, oldMoveContext.kings[Color.BLACK]), _kings2);

	            this.enPassantSquare = oldMoveContext.enPassantSquare;
	            this.halfMoves = oldMoveContext.halfMoves;
	            this.moveNumber = oldMoveContext.moveNumber;
	            this.plyCount = oldMoveContext.plyCount - 1;
	            this.timeTakenToMove = oldMoveContext.timeTakenToMove; // TODO need to change this to be metadata struct
	            this.turn = oldMoveContext.turn;

	            var us = this.turn;

	            this.board[move.from] = Piece.forSymbol(move.movedPiece); // to undo any promotions
	            this.board[move.to] = Piece.NONE;

	            if (move.flags & Flags.CAPTURE) {
	                this.board[move.to] = move.capturedPiece;
	            } else if (move.flags & Flags.EP_CAPTURE) {
	                var index = undefined;
	                if (us === Color.BLACK) {
	                    index = move.to - 16;
	                } else {
	                    index = move.to + 16;
	                }
	                this.board[index] = move.capturedPiece;
	            }

	            if (move.flags & (Flags.KSIDE_CASTLE | Flags.QSIDE_CASTLE)) {
	                var castling_to = undefined,
	                    castling_from = undefined;
	                if (move.flags & Flags.KSIDE_CASTLE) {
	                    castling_to = move.to + 1;
	                    castling_from = move.to - 1;
	                } else if (move.flags & Flags.QSIDE_CASTLE) {
	                    castling_to = move.to - 2;
	                    castling_from = move.to + 1;
	                }
	                this.board[castling_to] = this.board[castling_from];
	                this.board[castling_from] = Piece.NONE;
	            }

	            return move;
	        }
	    }, {
	        key: 'makeMoveFromSan',
	        value: function makeMoveFromSan(sanText, /* string, e.g. "Rxa7" or "e8=Q#" */
	        game /* Game object from game.js */
	        ) /* boolean */
	        {
	            var metadata = arguments.length <= 2 || arguments[2] === undefined ? { // TODO wrap up this move metadata object into its own class, for DRY purposes.  e.g. move_metadata.js
	                comment: null, /* string */
	                timeTakenToMove: null, /* int */
	                isPuzzleSolution: null } : arguments[2];

	            // event logging, always:  this method is user facing, and is involved with puzzle interaction

	            var move = Move.createFromSan(sanText, this);
	            if (move) {
	                this.eventLog.add('makeMoveFromSan(' + sanText + ', ...) --> ' + move.san);

	                return this.makeMove(move, game, metadata);
	            } else {
	                this.eventLog.add('makeMoveFromSan(' + sanText + ', ...) --> invalid move');

	                return false;
	            }
	        }
	    }, {
	        key: 'makeMoveFromAlgebraic',
	        value: function makeMoveFromAlgebraic(from, /* e.g. 'a4', 'b3' */
	        to, /* e.g. 'a4', 'b3' */
	        game /* Game object from game.js */
	        ) /* boolean */
	        {
	            var promotionPieceType = arguments.length <= 3 || arguments[3] === undefined ? PieceType.QUEEN : arguments[3];
	            var metadata = arguments.length <= 4 || arguments[4] === undefined ? { // TODO wrap up this move metadata object into its own class, for DRY purposes.  e.g. move_metadata.js
	                comment: null, /* string */
	                timeTakenToMove: null, /* int */
	                isPuzzleSolution: null } : arguments[4];

	            var move = Move.createFromAlgebraic(from, to, this, promotionPieceType);
	            if (move) {
	                this.eventLog.add('makeMoveFromAlgebraic(' + from + ', ' + to + ', ...) --> ' + move.san);

	                return this.makeMove(move, game, metadata);
	            } else {
	                this.eventLog.add('makeMoveFromAlgebraic(' + from + ', ' + to + ', ...) --> invalid move');

	                return false;
	            }
	        }
	    }, {
	        key: '_selectMove',
	        value: function _selectMove(i) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {
	                shouldLog: false
	            } : arguments[1];

	            if (options.shouldLog) {
	                this.eventLog.add('_selectMove(' + i);
	            }

	            if (this.selectedMoveHistoryIndex === i) {
	                return true; // already on requested move;  nothing to do.
	            }

	            if (i < -1 || i > this.moveHistory.length - 1) {
	                return false;
	            }

	            return this.replayToPlyNum(i + 1);
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                shouldLog: true
	            } : arguments[0];

	            if (options.shouldLog) {
	                this.eventLog.add('next()');
	            }

	            return this._selectMove(this.selectedMoveHistoryIndex + 1);
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                shouldLog: true
	            } : arguments[0];

	            if (options.shouldLog) {
	                this.eventLog.add('prev()');
	            }

	            return this._selectMove(this.selectedMoveHistoryIndex - 1);
	        }

	        // TODO -- makeMove vs makeMoveFromSan -- these two methods should be combined into one...

	        // TODO(6.27.15) consider a top-level API method for making a move, and an internal API method that does the same making of a move, but is only done
	        // for internal calculations, exploratory moves, etc -- i.e. not official moves, so official board state (puzzle timing;  position count;  etc) should not be updated.
	        // Is this even a good or viable idea??

	    }, {
	        key: 'makeMove',
	        value: function makeMove(move, /* Move object from move.js */
	        game) {
	            var metadata = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	            var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	            metadata = Object.assign({}, {
	                comment: null, /* string */
	                timeTakenToMove: null, /* int */
	                isPuzzleSolution: null /* boolean */
	            }, metadata);

	            options = Object.assign({}, {
	                updatePositionCount: true,
	                isUserMove: true
	            }, options);

	            // no event logging;  method is only used internally;  TODO verify this, after your attempted merger b/t makeMove and makeMoveFromSan

	            // TODO:  consider how to handle if made move is in fact a match of the isPuzzleSolution?
	            //
	            //// here's the original comment and code
	            ////
	            //// what's happening here;  i need to pass back whether or not the move just made was a "is_puzzle_solution" move
	            //// that exists in the loaded PGN;  however, this here move() method doesn't reference stored moves[], instead it
	            //// uses generate_moves()
	            //
	            //if (next.call(this, false)) {
	            //    pretty_move.is_puzzle_solution = this.current_game.current_variation.moves[this.current_game.current_variation.selected_move_index].is_puzzle_solution;
	            //    return pretty_move;
	            //} else {
	            //    return null;
	            //}

	            // TODO need to hide timeTakenToMove parameter;  should not be exposed to caller;
	            // instead perform internal calculation here;

	            // TODO add logic for updating the timeTakenToMove of an existing move....
	            // if it's an isPuzzleSolution === true move, and no previous timing value exists.... ?

	            if (options.isUserMove) {

	                // step 1:  check if the next move in our history, if any, matches the requested move
	                if (this.selectedMoveHistoryIndex + 1 !== this.moveHistory.length) {
	                    var nextMoveContext = this.moveHistory[this.selectedMoveHistoryIndex + 1];

	                    // if the requested move is identical to the next move that was already made in
	                    // our move history, then we simply advance our move cursor to that next move.
	                    if (nextMoveContext.move.san === move.san || move.isWildcard) {
	                        this.next({ shouldLog: options.isUserMove });
	                        return this.moveHistory[this.selectedMoveHistoryIndex];
	                    }

	                    // step 1-a:  otherwise, check if the next move has any variations whose first move matches
	                    // the requested move.  If found, then we simply advance our move cursor into that variation.
	                    //
	                    // TODO write an unit test for this
	                    //
	                    for (var i = 0; i < nextMoveContext.childVariations.length; i++) {
	                        if (!nextMoveContext.childVariations[i].isContinuation && ( // variations only
	                        nextMoveContext.childVariations[i].moveHistory[0].move.san === move.san || nextMoveContext.childVariations[i].moveHistory[0].move.isWildcard)) {
	                            // TODO need to pass back whether or not the move just made was a "isPuzzleSolution" move
	                            // that exists in the loaded PGN;  however, this here move() method doesn't reference stored moves[], instead it
	                            // uses generate_moves()
	                            if (game.descendIntoVariation(i)) {
	                                return game.currentVariation.moveHistory[0];
	                            } else {
	                                return false;
	                            }
	                        }
	                    }
	                }

	                // step 2:  otherwise, check if the current move in our history has a continuation whose first move matches
	                // the requested move.  If found, then we simply advance our move cursor into that continuation.
	                if (this.moveHistory[this.selectedMoveHistoryIndex] && this.moveHistory[this.selectedMoveHistoryIndex].childVariations.length > 0) {
	                    var childVariations = this.moveHistory[this.selectedMoveHistoryIndex].childVariations;

	                    for (var i = 0; i < childVariations.length; i++) {
	                        if (childVariations[i].isContinuation && ( // continuations only
	                        childVariations[i].moveHistory[0].move.san === move.san || childVariations[i].moveHistory[0].move.isWildcard)) {
	                            if (game.descendIntoContinuation(i)) {
	                                return game.currentVariation.moveHistory[0].move;
	                            } else {
	                                return false;
	                            }
	                        }
	                    }
	                }

	                // step 3:  otherwise, if the requested move is a new move *and* we're not at the head of our move branch,
	                // then let's automatically create a new variation on behalf of the user for the requested move
	                if (this.selectedMoveHistoryIndex + 1 !== this.moveHistory.length) {
	                    var currentMoveContext = this.moveHistory[this.selectedMoveHistoryIndex + 1];
	                    // TODO won't this auto-made variation also need its own variation-ID generation logic passed in?  same as code later on down
	                    var newChildVariation = BoardVariation.createFromParentVariation(this, { skipUndoingCurrentMove: true });

	                    currentMoveContext.childVariations.push(newChildVariation);
	                    newChildVariation.makeMove(move, game, metadata, options); // TODO re-use of options here is suspect

	                    game.currentVariation = newChildVariation; // the whole reason we needed to plumb the game object into this method

	                    return currentMoveContext;
	                }
	            }

	            // step 4:  otherwise, our move is a new move, and we're at the head of our move branch;
	            // *or* this is not a user-requested move, in which case we simply make the requested move
	            var moveContext = new MoveContext({
	                move: move,

	                castlingEligibility: this.castlingEligibility,
	                kings: this.kings,

	                turn: this.turn,
	                enPassantSquare: this.enPassantSquare,

	                moveNumber: this.moveNumber,
	                halfMoves: this.halfMoves,
	                plyCount: this.plyCount + 1,

	                metadata: metadata
	            });

	            // insert our new move into moveHistory[] after the current selectedMoveHistoryIndex;  There's offset-by-one logic here.
	            // Do NOT reverse the order of the two lines below, or you will cause all sorts of board state corruption
	            this.selectedMoveHistoryIndex++;
	            this.moveHistory.splice(this.selectedMoveHistoryIndex, 0, moveContext);

	            // generate an ID for this move, one that is unique across the entire game tree.
	            // format:  (({parent_variation's id}-)*)-{half_move_number}
	            //
	            // e.g.:  1. e4 {1} e5 {2} 2. d4 {3} d5 {4} (2... d6 {1-4} 3. c4 {1-5} (3. c3 {1-2-5}))
	            //
	            // TODO probably want to change this ID scheme from variation_ids to variation_index offset from child_variations;
	            // will make tree traversal significantly easier.  although... what about when a variation is deleted?  hmmm....

	            // TODO reinstate eventually
	            /*
	             var moveId = '0-';
	             var current = this;
	             while (current.parentVariation) {
	             moveId += current.id + '-';
	             current = current.parentVariation;
	             }
	             moveId += this.plyCount + this.selectedMoveHistoryIndex;
	              this.moveHistory[this.selectedMoveHistoryIndex].moveId = moveId;
	             */
	            // /TODO

	            this._applyMove(move);

	            if (options.updatePositionCount) {
	                var key = this.toFen({ omitExtras: true });

	                if (this.positionCount.has(key)) {
	                    this.positionCount.set(key, this.positionCount.get(key) + 1);
	                } else {
	                    this.positionCount.set(key, 1);
	                }
	            }

	            return moveContext;
	        }
	    }, {
	        key: 'replayToPlyNum',
	        value: function replayToPlyNum(n /* logical ply number, starting from 1 */) {
	            // no event logging;  this method is only used internally

	            n = n - 1; // translate from logical ply number to selectedMoveHistoryIndex number
	            if (n > this.selectedMoveHistoryIndex) {
	                this.selectedMoveHistoryIndex++;
	                for (; this.selectedMoveHistoryIndex <= n; this.selectedMoveHistoryIndex++) {
	                    var moveContext = this.moveHistory[this.selectedMoveHistoryIndex].move;

	                    this._applyMove(moveContext);
	                }
	                this.selectedMoveHistoryIndex--;
	            } else if (n < this.selectedMoveHistoryIndex) {
	                for (; n < this.selectedMoveHistoryIndex; this.selectedMoveHistoryIndex--) {
	                    var moveContext = this.moveHistory[this.selectedMoveHistoryIndex];

	                    this._applyUndoMove(moveContext);
	                }
	            }

	            return this.selectedMoveHistoryIndex > -1 && this.selectedMoveHistoryIndex < this.moveHistory.length ? this.moveHistory[this.selectedMoveHistoryIndex] : null;
	        }

	        // helper method, used only in generateMoves(...)
	    }, {
	        key: '_addMove',
	        value: function _addMove(from, to, flags, newMoves, calculateSan, them) {

	            var capturedPiece = flags === Flags.EP_CAPTURE ? this.board[to + (them === Color.BLACK ? 16 : -16)] : this.board[to];

	            var moveConstructorOptions = {
	                from: from,
	                to: to,
	                movedPiece: this.board[from],
	                capturedPiece: capturedPiece,
	                flags: flags,
	                boardVariation: calculateSan ? this : undefined
	            };

	            // if pawn promotion
	            if (this.board[from].type === PieceType.PAWN && (BoardVariation._rank(to) === 0 || BoardVariation._rank(to) === 7)) {
	                var promotionPieces = this.turn === Color.WHITE ? Piece.WHITE_PROMOTION_PIECES : Piece.BLACK_PROMOTION_PIECES;
	                promotionPieces.forEach(function (promotionPiece) {
	                    moveConstructorOptions.promotionPiece = promotionPiece;
	                    newMoves.push(new Move(moveConstructorOptions));
	                });
	            } else {
	                newMoves.push(new Move(moveConstructorOptions));
	            }
	        }
	    }, {
	        key: '_generateMoves',
	        value: function _generateMoves() {
	            var _secondRank,
	                _this = this;

	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            options = Object.assign({}, {
	                onlyForSquare: null, /* string, e.g. 'a1' */
	                calculateSan: false,
	                onlyLegalMoves: true
	            }, options);

	            var us = this.turn;
	            var them = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE;

	            var secondRank = (_secondRank = {}, _defineProperty(_secondRank, Color.BLACK, 1), _defineProperty(_secondRank, Color.WHITE, 6), _secondRank);

	            var newMoves = [];
	            var firstSquare = Move.SQUARES.a8;
	            var lastSquare = Move.SQUARES.h1;

	            // are we generating moves for a single square?
	            if (options.onlyForSquare) {
	                if (options.onlyForSquare in Move.SQUARES) {
	                    firstSquare = lastSquare = Move.SQUARES[options.onlyForSquare];
	                } else {
	                    return []; // invalid square
	                }
	            }

	            // TODO(aaron) what if instead of inspecting every square, you
	            // instead tracked in BoardVariation the location of all active non-blank pieces
	            // then you could just iterate over them here.  Do a perf test before and after.

	            for (var i = firstSquare; i <= lastSquare; i++) {
	                if (i & 0x88) {
	                    i += 7;continue;
	                } // did we run off the end of the board?

	                var piece = this.board[i];
	                if (piece === Piece.NONE || piece.color !== us) {
	                    continue;
	                }

	                var square = undefined;

	                if (piece.type === PieceType.PAWN) {
	                    // single square, non-capturing
	                    square = i + Move.PAWN_OFFSETS[us][0];
	                    if (this.board[square] === Piece.NONE) {
	                        this._addMove(i, square, Flags.NORMAL, newMoves, options.calculateSan);

	                        // double square
	                        square = i + Move.PAWN_OFFSETS[us][1];
	                        if (secondRank[us] === BoardVariation._rank(i) && this.board[square] === Piece.NONE) {
	                            this._addMove(i, square, Flags.BIG_PAWN, newMoves, options.calculateSan);
	                        }
	                    }

	                    // pawn captures
	                    for (var j = 2; j < 4; j++) {
	                        square = i + Move.PAWN_OFFSETS[us][j];
	                        if (square & 0x88) continue;

	                        if (this.board[square] !== Piece.NONE && this.board[square].color === them) {
	                            this._addMove(i, square, Flags.CAPTURE, newMoves, options.calculateSan);
	                        } else if (square === this.enPassantSquare) {
	                            this._addMove(i, this.enPassantSquare, Flags.EP_CAPTURE, newMoves, options.calculateSan, them);
	                        }
	                    }
	                } else {
	                    for (var j = 0, len = Move.PIECE_OFFSETS[piece.type].length; j < len; j++) {
	                        var offset = Move.PIECE_OFFSETS[piece.type][j];
	                        square = i;

	                        while (true) {
	                            square += offset;
	                            if (square & 0x88) break;

	                            if (this.board[square] === Piece.NONE) {
	                                this._addMove(i, square, Flags.NORMAL, newMoves, options.calculateSan);
	                            } else {
	                                if (this.board[square].color === us) break;
	                                this._addMove(i, square, Flags.CAPTURE, newMoves, options.calculateSan);
	                                break;
	                            }

	                            // break, if knight or king
	                            if (piece.type === PieceType.KNIGHT || piece.type === PieceType.KING) {
	                                break;
	                            }
	                        }
	                    }
	                }
	            }

	            // check for castling if: a) we're generating all moves, or b) we're doing single square move generation on the king's square
	            if (!options.onlyForSquare || lastSquare === this.kings[us]) {
	                // king-side castling
	                if (this.castlingEligibility[us] & Flags.KSIDE_CASTLE) {
	                    var castlingFrom = this.kings[us];
	                    var castlingTo = castlingFrom + 2;

	                    if (this.board[castlingFrom + 1] === Piece.NONE && this.board[castlingTo] === Piece.NONE && !this.isAttacked(them, this.kings[us]) && !this.isAttacked(them, castlingFrom + 1) && !this.isAttacked(them, castlingTo)) {
	                        this._addMove(this.kings[us], castlingTo, Flags.KSIDE_CASTLE, newMoves, options.calculateSan);
	                    }
	                }

	                // queen-side castling
	                if (this.castlingEligibility[us] & Flags.QSIDE_CASTLE) {
	                    var castlingFrom = this.kings[us];
	                    var castlingTo = castlingFrom - 2;

	                    if (this.board[castlingFrom - 1] === Piece.NONE && this.board[castlingFrom - 2] === Piece.NONE && this.board[castlingFrom - 3] === Piece.NONE && !this.isAttacked(them, this.kings[us]) && !this.isAttacked(them, castlingFrom - 1) && !this.isAttacked(them, castlingTo)) {
	                        this._addMove(this.kings[us], castlingTo, Flags.QSIDE_CASTLE, newMoves, options.calculateSan);
	                    }
	                }
	            }

	            // return all pseudo-legal moves (this includes moves that allow the king to be captured)
	            if (!options.onlyLegalMoves) {
	                return newMoves;
	            }

	            // filter out illegal moves
	            var legalMoves = [];

	            if (newMoves.length > 0) {
	                // TODO this futureMoves logic is duplicated in Move.toSan(move, boardVariation);
	                // might be good candidate for abstraction behind would-be-named MoveHistory object

	                // makeMove() below is destructive to all future moves ahead
	                // of our current move pointer, so we save a copy here
	                var futureMoves = this.moveHistory.slice(this.selectedMoveHistoryIndex + 1);

	                newMoves.forEach(function (newMove) {
	                    _this.makeMove(newMove, null, null, { updatePositionCount: false, isUserMove: false });
	                    if (!_this.isKingAttacked(us)) {
	                        legalMoves.push(newMove);
	                    }

	                    _this.undoCurrentMove({ updatePositionCount: false });
	                });

	                // restore our previously saved future moves
	                this.moveHistory = this.moveHistory.concat(futureMoves);
	            }

	            return legalMoves;
	        }

	        // this function is used to uniquely identify ambiguous moves
	    }, {
	        key: 'getDisambiguator',
	        value: function getDisambiguator(move /* Move object from move.js */) {
	            var moves = this._generateMoves();

	            var from = move.from;
	            var to = move.to;
	            var piece = move.movedPiece;

	            var ambiguities = 0;
	            var sameRank = 0;
	            var sameFile = 0;

	            for (var i = 0, len = moves.length; i < len; i++) {
	                var ambigFrom = moves[i].from;
	                var ambigTo = moves[i].to;
	                var ambigPiece = moves[i].movedPiece;

	                // if a move of the same piece type ends on the same to square, we'll
	                // need to add a disambiguator to the algebraic notation
	                if (piece === ambigPiece && from !== ambigFrom && to === ambigTo) {
	                    ambiguities++;

	                    if (BoardVariation._rank(from) === BoardVariation._rank(ambigFrom)) {
	                        sameRank++;
	                    }

	                    if (BoardVariation._file(from) === BoardVariation._file(ambigFrom)) {
	                        sameFile++;
	                    }
	                }
	            }
	            if (ambiguities > 0) {
	                // if there exists a similar moving piece on the same rank and file as
	                // the move in question, use the square as the disambiguator
	                if (sameRank > 0 && sameFile > 0) {
	                    return BoardVariation._algebraic(from);
	                }
	                // if the moving piece rests on the same file,
	                // use the rank symbol as the disambiguator
	                else if (sameFile > 0) {
	                        return BoardVariation._algebraic(from).charAt(1);
	                    }
	                    // else use the file symbol
	                    else {
	                            return BoardVariation._algebraic(from).charAt(0);
	                        }
	            }

	            return '';
	        }
	    }, {
	        key: 'isAttacked',
	        value: function isAttacked(color, square) {
	            for (var i = Move.SQUARES.a8; i <= Move.SQUARES.h1; i++) {
	                // did we run off the end f the board
	                if (i & 0x88) {
	                    i += 7;continue;
	                }

	                // if empty square or wrong color
	                if (this.board[i] === Piece.NONE) continue;
	                if (this.board[i].color !== color) continue;

	                var difference = i - square;
	                var index = difference + 119;

	                var piece = this.board[i];

	                if (Move.ATTACKS[index] & 1 << Move.SHIFTS[piece.type]) {
	                    if (piece.type === PieceType.PAWN) {
	                        if (difference > 0) {
	                            if (piece.color === Color.WHITE) return true;
	                        } else {
	                            if (piece.color === Color.BLACK) return true;
	                        }
	                        continue;
	                    }

	                    // if the piece is a knight or a king
	                    if (piece.type === PieceType.KNIGHT || piece.type === PieceType.KING) return true;

	                    var offset = Move.RAYS[index];
	                    var j = i + offset;

	                    var blocked = false;
	                    while (j !== square) {
	                        if (this.board[j] !== Piece.NONE) {
	                            blocked = true;
	                            break;
	                        }
	                        j += offset;
	                    }

	                    if (!blocked) return true;
	                }
	            }

	            return false;
	        }
	    }, {
	        key: 'isKingAttacked',
	        value: function isKingAttacked(color) {
	            return this.isAttacked(color === Color.WHITE ? Color.BLACK : Color.WHITE, this.kings[color]);
	        }
	    }, {
	        key: 'isCheck',
	        value: function isCheck() {
	            return this.isKingAttacked(this.turn);
	        }
	    }, {
	        key: 'isCheckmate',
	        value: function isCheckmate() {
	            return this.isCheck() && this._generateMoves().length === 0;
	        }
	    }, {
	        key: 'isStalemate',
	        value: function isStalemate() {
	            return !this.isCheck() && this._generateMoves().length === 0;
	        }
	    }, {
	        key: 'isDraw',
	        value: function isDraw() {
	            return this.halfMoves >= 100 || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
	        }
	    }, {
	        key: 'isInsufficientMaterial',
	        value: function isInsufficientMaterial() {
	            var pieceCount = {};
	            var totalPieceCount = 0;

	            var bishops = [];
	            var squareColor = 0;

	            for (var i = Move.SQUARES.a8; i <= Move.SQUARES.h1; i++) {
	                squareColor = (squareColor + 1) % 2;
	                if (i & 0x88) {
	                    i += 7;continue;
	                }

	                var piece = this.board[i];
	                if (piece.type !== PieceType.NONE) {
	                    pieceCount[piece.type] = piece.type in pieceCount ? pieceCount[piece.type] + 1 : 1;
	                    if (piece.type === PieceType.BISHOP) {
	                        bishops.push(squareColor);
	                    }
	                    totalPieceCount++;
	                }
	            }

	            // k vs. k
	            if (totalPieceCount === 2) {
	                return true;
	            }

	            // k vs. kn ... or ... k vs. kb
	            else if (totalPieceCount === 3 && (pieceCount[PieceType.BISHOP] === 1 || pieceCount[PieceType.KNIGHT] === 1)) {
	                    return true;
	                }

	                // kb vs. kb where any number of bishops are all on the same color
	                else if (totalPieceCount === pieceCount[PieceType.BISHOP] + 2) {
	                        var len = bishops.length;
	                        var sum = 0;
	                        for (var i = 0; i < len; i++) {
	                            sum += bishops[i];
	                        }
	                        if (sum === 0 || sum === len) {
	                            return true;
	                        }
	                    }

	            return false;
	        }
	    }, {
	        key: 'isThreefoldRepetition',
	        value: function isThreefoldRepetition() {
	            return Array.from(this.positionCount.values()).some(function (count) {
	                return count >= 3;
	            });
	        }
	    }, {
	        key: 'isGameOver',
	        value: function isGameOver() {
	            return this.halfMoves >= 100 || this.isCheckmate() || this.isStalemate() || this.isInsufficientMaterial() || this.isThreefoldRepetition();
	        }
	    }], [{
	        key: 'copyFrom',
	        value: function copyFrom(other /* BoardVariation object */) {
	            var _copy$castlingEligibility, _copy$kings;

	            var copy = Object.create(BoardVariation.prototype);

	            // Yes, copying things in Javascript is not straightforward.  http://stackoverflow.com/questions/14443357/primitive-types-reference-types-in-javascript

	            copy.id = BoardVariation.id++;
	            copy.parentVariation = other.parentVariation; // yes this should remain a pointer;  shouldn't be a full clone
	            copy.parentLastMoveIndex = other.parentLastMoveIndex;
	            copy.turn = other.turn;
	            copy.enPassantSquare = other.enPassantSquare;

	            copy.moveNumber = other.moveNumber;
	            copy.plyCount = other.plyCount;
	            copy.halfMoves = other.halfMoves;

	            copy.board = other.board.slice(0); // http://stackoverflow.com/questions/15722433/javascript-copy-array-to-new-array
	            copy.castlingEligibility = (_copy$castlingEligibility = {}, _defineProperty(_copy$castlingEligibility, Color.WHITE, other.castlingEligibility[Color.WHITE]), _defineProperty(_copy$castlingEligibility, Color.BLACK, other.castlingEligibility[Color.BLACK]), _copy$castlingEligibility);
	            copy.kings = (_copy$kings = {}, _defineProperty(_copy$kings, Color.WHITE, other.kings[Color.WHITE]), _defineProperty(_copy$kings, Color.BLACK, other.kings[Color.BLACK]), _copy$kings);
	            copy.moveHistory = other.moveHistory.slice(0);
	            copy.selectedMoveHistoryIndex = other.selectedMoveHistoryIndex;

	            copy.positionCount = new Map(other.positionCount);

	            copy.intraMoveAnnotationSlots = other.intraMoveAnnotationSlots.slice(0);

	            copy.eventLog = other.eventLog;

	            return copy;
	        }

	        // branching constructor:  we're forking our game tree by building a new BoardVariation from the given BoardVariation
	    }, {
	        key: 'createFromParentVariation',
	        value: function createFromParentVariation(parent /* BoardVariation object */) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            options = Object.assign({}, {
	                isContinuation: false,
	                resetIdCounter: false,
	                skipUndoingCurrentMove: false
	            }, options);

	            var copy = BoardVariation.copyFrom(parent);

	            // if this is a PGN variations, then undo the previous move, by definition
	            if (!options.skipUndoingCurrentMove && !options.isContinuation) {
	                copy.undoCurrentMove();
	            }

	            if (options.resetIdCounter) {
	                BoardVariation.id = 0;
	            }

	            copy.id = BoardVariation.id++;
	            copy.parentLastMoveIndex = parent.selectedMoveHistoryIndex;
	            copy.parentVariation = parent;
	            copy.isContinuation = options.isContinuation;

	            // clear out the existing history
	            copy.moveHistory = [];
	            copy.selectedMoveHistoryIndex = -1;
	            copy.intraMoveAnnotationSlots = [];

	            return copy;
	        }
	    }, {
	        key: 'createFromFen',
	        value: function createFromFen(fen /* string */) /* EventLog.js object */{
	            var eventLog = arguments.length <= 1 || arguments[1] === undefined ? new EventLog() : arguments[1];

	            var variation = new BoardVariation(eventLog);
	            if (variation.loadFen(fen)) {
	                return variation;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: '_file',
	        value: function _file(i) {
	            return i & 15;
	        }
	    }, {
	        key: '_rank',
	        value: function _rank(i) {
	            return i >> 4;
	        }
	    }, {
	        key: '_algebraic',
	        value: function _algebraic(i) {
	            var f = BoardVariation._file(i);
	            var r = BoardVariation._rank(i);
	            return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
	        }
	    }]);

	    return BoardVariation;
	})();

	;

	BoardVariation.id = 0;

	module.exports = BoardVariation;
	// castling eligibility flags
	// the 0x88 index of the white King's current location
	// integer, the new value of our selectedMoveHistoryIndex
	/* Game object from game.js */

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	// NOTE: tried having a Color class, with a corresponding ColorType class, and utility methods
	// on the Color class such as swap(), isWhite(), isBlack(), etc.  Similar to the Piece and PieceType
	// classes.  But doing so caused a performance hit (added ~1 sec to the Dirty PGN test)

	// NOTE: also tried having Color.WHITE = true, and Color.BLACK = false, so as to simplify
	// color comparisons to e.g. "if (this.turn)" instead of "if (this.turn === Color.WHITE)", and
	// also simplify color swapping to "us = !them" instead of "us = them === Color.WHITE ? Color.Black : Color.WHITE").
	// But doing caused a performance hit (added ~300 ms to the Dirty PGN test)

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Color = function Color() {
	  _classCallCheck(this, Color);
	};

	Color.WHITE = 'w';
	Color.BLACK = 'b';
	Color.NONE = '~';

	module.exports = Color;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EventLog = (function () {
	    function EventLog() {
	        _classCallCheck(this, EventLog);

	        this._events = [];
	        this._lastTimerSnapshot = Date.now();

	        this._events.push({
	            timer: this._lastTimerSnapshot,
	            delta: null,
	            event: 'Event Log initialized.'
	        });
	    }

	    _createClass(EventLog, [{
	        key: 'add',
	        value: function add(event) {
	            var delta = this._updateEventTimer();

	            this._events.push({
	                timer: this._lastTimerSnapshot,
	                delta: delta,
	                event: event
	            });
	        }
	    }, {
	        key: '_updateEventTimer',
	        value: function _updateEventTimer() {
	            var prev = this._lastTimerSnapshot;
	            this._lastTimerSnapshot = Date.now();
	            return this._lastTimerSnapshot - prev;
	        }
	    }]);

	    return EventLog;
	})();

	;

	module.exports = EventLog;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Fen = (function () {
	    function Fen() {
	        _classCallCheck(this, Fen);
	    }

	    _createClass(Fen, null, [{
	        key: 'validate',
	        value: function validate(fen /* string */) {
	            // 1st criterion: 6 space-separated fields?
	            var tokens = fen.split(/\s+/);
	            if (tokens.length !== 6) {
	                return { isValid: false, errorCode: 1, errorMessage: Fen.ERRORS[1] };
	            }

	            // 2nd criterion: move number field is a integer value > 0?
	            if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
	                return { isValid: false, errorCode: 2, errorMessage: Fen.ERRORS[2] };
	            }

	            // 3rd criterion: half move counter is an integer >= 0?
	            if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
	                return { isValid: false, errorCode: 3, errorMessage: Fen.ERRORS[3] };
	            }

	            // 4th criterion: 4th field is a valid e.p.-string?
	            if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
	                return { isValid: false, errorCode: 4, errorMessage: Fen.ERRORS[4] };
	            }

	            // 5th criterion: 3th field is a valid castle-string?
	            if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
	                return { isValid: false, errorCode: 5, errorMessage: Fen.ERRORS[5] };
	            }

	            // 6th criterion: 2nd field is "w" (white) or "b" (black)?
	            if (!/^(w|b)$/.test(tokens[1])) {
	                return { isValid: false, errorCode: 6, errorMessage: Fen.ERRORS[6] };
	            }

	            // 7th criterion: 1st field contains 8 rows?
	            var rows = tokens[0].split('/');
	            if (rows.length !== 8) {
	                return { isValid: false, errorCode: 7, errorMessage: Fen.ERRORS[7] };
	            }

	            // 8th criterion: every row is valid?
	            for (var i = 0; i < rows.length; i++) {
	                // check for right sum of fields AND not two numbers in succession
	                var sumFields = 0;
	                var previousWasNumber = false;

	                for (var k = 0; k < rows[i].length; k++) {
	                    if (!isNaN(rows[i][k])) {
	                        if (previousWasNumber) {
	                            return { isValid: false, errorCode: 8, errorMessage: Fen.ERRORS[8] };
	                        }
	                        sumFields += parseInt(rows[i][k], 10);
	                        previousWasNumber = true;
	                    } else {
	                        if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
	                            return { isValid: false, errorCode: 9, errorMessage: Fen.ERRORS[9] };
	                        }
	                        sumFields += 1;
	                        previousWasNumber = false;
	                    }
	                }
	                if (sumFields !== 8) {
	                    return { isValid: false, errorCode: 10, errorMessage: Fen.ERRORS[10] };
	                }
	            }

	            // everything is okay!
	            return { isValid: true, errorCode: 0, error: Fen.ERRORS[0] };
	        }
	    }]);

	    return Fen;
	})();

	;

	Fen.ERRORS = {
	    0: 'No errors.',
	    1: 'FEN string must contain six space-delimited fields.',
	    2: '6th field (move number) must be a positive integer.',
	    3: '5th field (half move counter) must be a non-negative integer.',
	    4: '4th field (en-passant square) is invalid.',
	    5: '3rd field (castling availability) is invalid.',
	    6: '2nd field (side to move) is invalid.',
	    7: '1st field (piece positions) does not contain 8 \'/\'-delimited rows.',
	    8: '1st field (piece positions) is invalid [consecutive numbers].',
	    9: '1st field (piece positions) is invalid [invalid piece].',
	    10: '1st field (piece positions) is invalid [row too large].'
	};

	Fen.DEFAULT_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
	Fen.DEFAULT_POSITION_FULL = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

	module.exports = Fen;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _Flags$DISPLAY;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Flags = function Flags() {
	    _classCallCheck(this, Flags);
	};

	;

	Flags.NORMAL = 1;
	Flags.CAPTURE = 2;
	Flags.BIG_PAWN = 4; // a pawn moving two spaces
	Flags.EP_CAPTURE = 8;
	Flags.PROMOTION = 16;
	Flags.KSIDE_CASTLE = 32;
	Flags.QSIDE_CASTLE = 64;
	Flags.DISPLAY = (_Flags$DISPLAY = {}, _defineProperty(_Flags$DISPLAY, Flags.NORMAL, 'n'), _defineProperty(_Flags$DISPLAY, Flags.CAPTURE, 'c'), _defineProperty(_Flags$DISPLAY, Flags.BIG_PAWN, 'b'), _defineProperty(_Flags$DISPLAY, Flags.EP_CAPTURE, 'e'), _defineProperty(_Flags$DISPLAY, Flags.PROMOTION, 'p'), _defineProperty(_Flags$DISPLAY, Flags.KSIDE_CASTLE, 'k'), _defineProperty(_Flags$DISPLAY, Flags.QSIDE_CASTLE, 'q'), _Flags$DISPLAY);

	module.exports = Flags;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Move$PAWN_OFFSETS, _Move$PIECE_OFFSETS, _Move$SHIFTS;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Color = __webpack_require__(3);
	var PieceType = __webpack_require__(8);
	var Piece = __webpack_require__(9);
	var Flags = __webpack_require__(6);

	// TODO 8.17.15 I'm thinking it might make more sense to just add MoveContext and also MoveMetadata
	// as member hash variables of this here class

	var Move = (function () {

	    // default constructor
	    //
	    // every Move object is meant to be full-fledged enough to be usable in all places for all needs.

	    function Move(options) {
	        _classCallCheck(this, Move);

	        var
	        // required
	        from = // int            -- bitwise flags describing annotative state about this move;  defaults to Flags.NORMAL

	        // BoardVariation -- if passed in, then caller is asking us to calculate the given move's SAN notation, e.g. "Rx7#"
	        options.from;
	        var // int            -- the 0x88 index for the departure square of this move
	        to = options.to;
	        var // int            -- the 0x88 index for the destination square of this move 
	        movedPiece = options.movedPiece;
	        var // Piece          -- the piece being moved

	        // optional      
	        capturedPiece = options.capturedPiece;
	        var // Piece          -- the piece, if any, at the destination square
	        promotionPiece = options.promotionPiece;
	        var // Piece          -- the piece being promoted to.
	        flags = options.flags;
	        var boardVariation = options.boardVariation;

	        if (!Move.isValidIndex(from) || !Move.isValidIndex(to)) {
	            throw new Error('illegal 0x88 index passed into new Move(): (from, to) = ' + from + ', ' + to);
	        }

	        if (!flags) {
	            flags = Flags.NORMAL;
	        }

	        if (promotionPiece) {
	            flags |= Flags.PROMOTION;
	        }

	        if (!capturedPiece && flags === Flags.EP_CAPTURE) {
	            capturedPiece = movedPiece.color === Color.WHITE ? Piece.BLACK_PAWN : Piece.WHITE_PAWN;
	        }

	        this.from = from;
	        this.to = to;
	        this.movedPiece = movedPiece;
	        this.capturedPiece = capturedPiece;
	        this.flags = flags;
	        this.promotionPiece = promotionPiece;
	        this.isWildcard = false;

	        this.algebraic = Move.SQUARES_LOOKUP[this.from] + "-" + Move.SQUARES_LOOKUP[this.to]; // e.g. "d2-d4", "h7-h8"

	        this.san = boardVariation ? Move.toSan(this, boardVariation) : undefined;
	    }

	    // copy constructor

	    _createClass(Move, [{
	        key: 'toString',
	        value: function toString() {
	            return this.san;
	        }
	    }], [{
	        key: 'copyFrom',
	        value: function copyFrom(other /* Move object */) {
	            var copy = Object.create(Move.prototype);

	            copy.from = other.from; // int
	            copy.to = other.to; // int
	            copy.movedPiece = other.movedPiece; // Piece, which is a frozen object, so it's safe to reuse
	            copy.capturedPiece = other.capturedPiece; // Piece, which is a frozen object, so it's safe to reuse
	            copy.flags = other.flags; // int
	            copy.san = other.san; // string
	            copy.promotionPiece = other.promotionPiece; // Piece, which is a frozen object, so it's safe to reuse
	            copy.isWildcard = other.isWildcard; // boolean

	            copy.algebraic = other.algebraic; // debugging move text, e.g. "Ke7-e8"

	            return copy;
	        }

	        // SAN constructor
	    }, {
	        key: 'createFromSan',
	        value: function createFromSan(sanText, /* string, e.g. "Rxa7" or "e8=Q#" */boardVariation /* BoardVariation object */) {
	            if (!sanText) {
	                return false;
	            }

	            sanText = sanText.trim().replace(/[+#?!=]+$/, '');
	            var moves = boardVariation._generateMoves({ calculateSan: true });

	            if (sanText === Move.WILDCARD_MOVE) {
	                return Move.createWildcardMove(boardVariation);
	            } else {
	                for (var i = 0, len = moves.length; i < len; i++) {
	                    // prefix match, so as to ignore move decorations, e.g. "Nf3+?!"
	                    if (moves[i].san.indexOf(sanText) === 0) {
	                        return moves[i];
	                    }
	                }
	            }

	            return false;
	        }
	    }, {
	        key: 'createFromAlgebraic',
	        value: function createFromAlgebraic(from, /* e.g. 'a4', 'b3' */
	        to, /* e.g. 'a4', 'b3' */
	        boardVariation /* BoardVariation object */
	        ) {
	            var promotionPieceType = arguments.length <= 3 || arguments[3] === undefined ? PieceType.QUEEN : arguments[3];

	            if (!from || !to) {
	                return false;
	            }

	            var indexFrom = Move.SQUARES[from];
	            var indexTo = Move.SQUARES[to];

	            var moves = boardVariation._generateMoves({ calculateSan: true });
	            for (var i = 0, len = moves.length; i < len; i++) {
	                // prefix match, so as to ignore move decorations, e.g. "Nf3+?!"
	                if (moves[i].from === indexFrom && moves[i].to === indexTo && (!moves[i].promotionPiece || moves[i].promotionPiece.type === promotionPieceType)) {
	                    return moves[i];
	                }
	            }

	            return false;
	        }

	        // Wildcard Move constructor
	    }, {
	        key: 'createWildcardMove',
	        value: function createWildcardMove(boardVariation /* BoardVariation object */) {
	            var moves = boardVariation._generateMoves();
	            if (moves.length == 0) {
	                return null;
	            } else {
	                // the move doesn't matter, so we just pick the first legal move we found
	                var move = moves[0];
	                move.isWildcard = true;
	                return move;
	            }
	        }
	    }, {
	        key: 'isValidIndex',
	        value: function isValidIndex(i /* an 0x88 board index value */) {
	            return 0 <= i && i <= 7 || 16 <= i && i <= 23 || 32 <= i && i <= 39 || 48 <= i && i <= 55 || 64 <= i && i <= 71 || 80 <= i && i <= 87 || 96 <= i && i <= 103 || 112 <= i && i <= 119;
	        }

	        // convert an already created Move object from its 0x88 coordinates to Standard Algebraic Notation (SAN)
	    }, {
	        key: 'toSan',
	        value: function toSan(move, /* Move object */
	        boardVariation /* BoardVariation object */
	        ) {
	            if (move.isWildcard) {
	                return Move.WILDCARD_MOVE;
	            }

	            var output = '';

	            if (move.flags & Flags.KSIDE_CASTLE) {
	                output = 'O-O';
	            } else if (move.flags & Flags.QSIDE_CASTLE) {
	                output = 'O-O-O';
	            } else {
	                var disambiguator = boardVariation.getDisambiguator(move);

	                if (move.movedPiece.type !== PieceType.PAWN) {
	                    output += move.movedPiece.type.toUpperCase() + disambiguator;
	                }

	                if (move.flags & (Flags.CAPTURE | Flags.EP_CAPTURE)) {
	                    if (move.movedPiece.type === PieceType.PAWN) {
	                        output += Move._algebraic(move.from)[0];
	                    }
	                    output += 'x';
	                }

	                output += Move._algebraic(move.to);

	                if (move.flags & Flags.PROMOTION) {
	                    output += '=' + move.promotionPiece.type.toUpperCase();
	                }
	            }

	            // TODO this futureMoves logic is duplicated in BoardVariation._generateMoves();
	            // might be good candidate for abstraction behind would-be-named MoveHistory object

	            // makeMove() below is destructive to all future moves ahead
	            // of our current move pointer, so we save a copy here
	            var futureMoves = boardVariation.moveHistory.slice(boardVariation.selectedMoveHistoryIndex + 1);

	            boardVariation.makeMove(move, null, {}, { updatePositionCount: false, isUserMove: false });
	            if (boardVariation.isCheck()) {
	                if (boardVariation.isCheckmate()) {
	                    output += '#';
	                } else {
	                    output += '+';
	                }
	            }

	            boardVariation.undoCurrentMove({ updatePositionCount: false });

	            // restore our previously saved future moves
	            boardVariation.moveHistory = boardVariation.moveHistory.concat(futureMoves);

	            return output;
	        }

	        // TODO:  duplicated code from BoardVariation.js
	    }, {
	        key: '_algebraic',
	        value: function _algebraic(i) {
	            var f = i & 15;
	            var r = i >> 4;
	            return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1);
	        }
	    }]);

	    return Move;
	})();

	;

	// https://chessprogramming.wikispaces.com/0x88
	// Note:  The values we use are flipped from the documented convention.
	//
	//             (octal)                              (decimal)
	//
	//    | a  b  c  d  e  f  g  h           | a   b   c   d   e   f   g   h
	//  ----------------------------       ------------------------------------
	//  8 | 00 01 02 03 04 05 06 07        8 | 0   1   2   3   4   5   6   7
	//  7 | 10 11 12 13 14 15 16 17        7 | 16  17  18  19  20  21  22  23
	//  6 | 20 21 22 23 24 25 26 27        6 | 32  33  34  35  36  37  38  39
	//  5 | 30 31 32 33 34 35 36 37        5 | 48  49  50  51  52  53  54  55
	//  4 | 40 41 42 43 44 45 46 47   ==   4 | 64  65  66  67  68  69  70  71
	//  3 | 50 51 52 53 54 55 56 57        3 | 80  81  82  83  84  85  86  87
	//  2 | 60 61 62 63 64 65 66 67        2 | 96  97  98  99  100 101 102 103
	//  1 | 70 71 72 73 74 75 76 77        1 | 112 113 114 115 116 117 118 119
	//
	Move.SQUARES = {
	    a8: 0, b8: 1, c8: 2, d8: 3, e8: 4, f8: 5, g8: 6, h8: 7,
	    a7: 16, b7: 17, c7: 18, d7: 19, e7: 20, f7: 21, g7: 22, h7: 23,
	    a6: 32, b6: 33, c6: 34, d6: 35, e6: 36, f6: 37, g6: 38, h6: 39,
	    a5: 48, b5: 49, c5: 50, d5: 51, e5: 52, f5: 53, g5: 54, h5: 55,
	    a4: 64, b4: 65, c4: 66, d4: 67, e4: 68, f4: 69, g4: 70, h4: 71,
	    a3: 80, b3: 81, c3: 82, d3: 83, e3: 84, f3: 85, g3: 86, h3: 87,
	    a2: 96, b2: 97, c2: 98, d2: 99, e2: 100, f2: 101, g2: 102, h2: 103,
	    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
	};

	Move.SQUARES_LOOKUP = {
	    0: 'a8', 1: 'b8', 2: 'c8', 3: 'd8', 4: 'e8', 5: 'f8', 6: 'g8', 7: 'h8',
	    16: 'a7', 17: 'b7', 18: 'c7', 19: 'd7', 20: 'e7', 21: 'f7', 22: 'g7', 23: 'h7',
	    32: 'a6', 33: 'b6', 34: 'c6', 35: 'd6', 36: 'e6', 37: 'f6', 38: 'g6', 39: 'h6',
	    48: 'a5', 49: 'b5', 50: 'c5', 51: 'd5', 52: 'e5', 53: 'f5', 54: 'g5', 55: 'h5',
	    64: 'a4', 65: 'b4', 66: 'c4', 67: 'd4', 68: 'e4', 69: 'f4', 70: 'g4', 71: 'h4',
	    80: 'a3', 81: 'b3', 82: 'c3', 83: 'd3', 84: 'e3', 85: 'f3', 86: 'g3', 87: 'h3',
	    96: 'a2', 97: 'b2', 98: 'c2', 99: 'd2', 100: 'e2', 101: 'f2', 102: 'g2', 103: 'h2',
	    112: 'a1', 113: 'b1', 114: 'c1', 115: 'd1', 116: 'e1', 117: 'f1', 118: 'g1', 119: 'h1'
	};

	Move.PAWN_OFFSETS = (_Move$PAWN_OFFSETS = {}, _defineProperty(_Move$PAWN_OFFSETS, Color.WHITE, [-16, -32, -17, -15]), _defineProperty(_Move$PAWN_OFFSETS, Color.BLACK, [16, 32, 17, 15]), _Move$PAWN_OFFSETS);

	Move.PIECE_OFFSETS = (_Move$PIECE_OFFSETS = {}, _defineProperty(_Move$PIECE_OFFSETS, PieceType.KNIGHT, [-18, -33, -31, -14, 18, 33, 31, 14]), _defineProperty(_Move$PIECE_OFFSETS, PieceType.BISHOP, [-17, -15, 17, 15]), _defineProperty(_Move$PIECE_OFFSETS, PieceType.ROOK, [-16, 1, 16, -1]), _defineProperty(_Move$PIECE_OFFSETS, PieceType.QUEEN, [-17, -16, -15, 1, 17, 16, 15, -1]), _defineProperty(_Move$PIECE_OFFSETS, PieceType.KING, [-17, -16, -15, 1, 17, 16, 15, -1]), _Move$PIECE_OFFSETS);

	// Move.{ATTACKS,RAYS,SHIFTS} are only used by BoardVariation.isAttacked(color, square)
	Move.ATTACKS = [20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0];
	Move.RAYS = [17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0, -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17, 0];
	Move.SHIFTS = (_Move$SHIFTS = {}, _defineProperty(_Move$SHIFTS, PieceType.PAWN, 0), _defineProperty(_Move$SHIFTS, PieceType.KNIGHT, 1), _defineProperty(_Move$SHIFTS, PieceType.BISHOP, 2), _defineProperty(_Move$SHIFTS, PieceType.ROOK, 3), _defineProperty(_Move$SHIFTS, PieceType.QUEEN, 4), _defineProperty(_Move$SHIFTS, PieceType.KING, 5), _Move$SHIFTS);

	// technically, this is a NULL move, but I'm slightly deviating from the PGN standard
	// (http://www.enpassant.dk/chess/palview/manual/pgn.htm), because I'm treating a NULL
	// move as essentially a wildcard move:  "any move will do, so just pick the first legal
	// move you find".
	//
	Move.WILDCARD_MOVE = '--';

	module.exports = Move;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PieceType = function PieceType() {
	  _classCallCheck(this, PieceType);
	};

	;

	PieceType.NONE = '.';
	PieceType.PAWN = 'p';
	PieceType.KNIGHT = 'n';
	PieceType.BISHOP = 'b';
	PieceType.ROOK = 'r';
	PieceType.QUEEN = 'q';
	PieceType.KING = 'k';

	module.exports = PieceType;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Piece$LOOKUP;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Color = __webpack_require__(3);
	var PieceType = __webpack_require__(8);

	var Piece = (function () {
	    function Piece(options) {
	        _classCallCheck(this, Piece);

	        this.type = options.type; // PieceType -- the type of piece, e.g. PAWN, KNIGHT, ROOK
	        this.color = options.color; // Color     -- WHITE or BLACK

	        this.symbol = this.color === Color.WHITE ? this.type.toUpperCase() : this.type;

	        Object.freeze(this); // immutability == sanity safeguard
	    }

	    _createClass(Piece, [{
	        key: 'toString',
	        value: function toString() {
	            return this.symbol;
	        }

	        // for more succinct console.log() output
	    }, {
	        key: 'inspect',
	        value: function inspect() {
	            return this.toString();
	        }
	    }], [{
	        key: 'forSymbol',
	        value: function forSymbol(symbol) {
	            return Piece.LOOKUP[symbol];
	        }
	    }]);

	    return Piece;
	})();

	;

	// set up our pool of reusable pieces;  http://en.wikipedia.org/wiki/Flyweight_pattern
	Piece.WHITE_PAWN = new Piece({ color: Color.WHITE, type: PieceType.PAWN });
	Piece.WHITE_KNIGHT = new Piece({ color: Color.WHITE, type: PieceType.KNIGHT });
	Piece.WHITE_BISHOP = new Piece({ color: Color.WHITE, type: PieceType.BISHOP });
	Piece.WHITE_ROOK = new Piece({ color: Color.WHITE, type: PieceType.ROOK });
	Piece.WHITE_QUEEN = new Piece({ color: Color.WHITE, type: PieceType.QUEEN });
	Piece.WHITE_KING = new Piece({ color: Color.WHITE, type: PieceType.KING });
	Piece.BLACK_PAWN = new Piece({ color: Color.BLACK, type: PieceType.PAWN });
	Piece.BLACK_KNIGHT = new Piece({ color: Color.BLACK, type: PieceType.KNIGHT });
	Piece.BLACK_BISHOP = new Piece({ color: Color.BLACK, type: PieceType.BISHOP });
	Piece.BLACK_ROOK = new Piece({ color: Color.BLACK, type: PieceType.ROOK });
	Piece.BLACK_QUEEN = new Piece({ color: Color.BLACK, type: PieceType.QUEEN });
	Piece.BLACK_KING = new Piece({ color: Color.BLACK, type: PieceType.KING });
	Piece.NONE = new Piece({ color: Color.NONE, type: PieceType.NONE });
	Piece.LOOKUP = (_Piece$LOOKUP = {}, _defineProperty(_Piece$LOOKUP, Piece.WHITE_PAWN, Piece.WHITE_PAWN), _defineProperty(_Piece$LOOKUP, Piece.WHITE_KNIGHT, Piece.WHITE_KNIGHT), _defineProperty(_Piece$LOOKUP, Piece.WHITE_BISHOP, Piece.WHITE_BISHOP), _defineProperty(_Piece$LOOKUP, Piece.WHITE_ROOK, Piece.WHITE_ROOK), _defineProperty(_Piece$LOOKUP, Piece.WHITE_QUEEN, Piece.WHITE_QUEEN), _defineProperty(_Piece$LOOKUP, Piece.WHITE_KING, Piece.WHITE_KING), _defineProperty(_Piece$LOOKUP, Piece.BLACK_PAWN, Piece.BLACK_PAWN), _defineProperty(_Piece$LOOKUP, Piece.BLACK_KNIGHT, Piece.BLACK_KNIGHT), _defineProperty(_Piece$LOOKUP, Piece.BLACK_BISHOP, Piece.BLACK_BISHOP), _defineProperty(_Piece$LOOKUP, Piece.BLACK_ROOK, Piece.BLACK_ROOK), _defineProperty(_Piece$LOOKUP, Piece.BLACK_QUEEN, Piece.BLACK_QUEEN), _defineProperty(_Piece$LOOKUP, Piece.BLACK_KING, Piece.BLACK_KING), _defineProperty(_Piece$LOOKUP, Piece.NONE, Piece.NONE), _Piece$LOOKUP);

	// TODO(aaron, 2015.11.17) consider relaxing this to include enemy pieces, in order to support that edge-case "promote to an enemy piece for a mate-in-1" puzzle from Sherlock Holmes Chess Mysteries book
	Piece.WHITE_PROMOTION_PIECES = [Piece.WHITE_QUEEN, Piece.WHITE_ROOK, Piece.WHITE_BISHOP, Piece.WHITE_KNIGHT];
	Piece.BLACK_PROMOTION_PIECES = [Piece.BLACK_QUEEN, Piece.BLACK_ROOK, Piece.BLACK_BISHOP, Piece.BLACK_KNIGHT];

	module.exports = Piece;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Color = __webpack_require__(3);

	var MoveContext = (function () {

	    // default constructor

	    function MoveContext(options) {
	        var _castlingEligibility, _kings;

	        _classCallCheck(this, MoveContext);

	        this.move = options.move; // Move object from move.js

	        this.castlingEligibility = (_castlingEligibility = {}, _defineProperty(_castlingEligibility, Color.WHITE, options.castlingEligibility[Color.WHITE]), _defineProperty(_castlingEligibility, Color.BLACK, options.castlingEligibility[Color.BLACK]), _castlingEligibility);
	        this.kings = (_kings = {}, _defineProperty(_kings, Color.WHITE, options.kings[Color.WHITE]), _defineProperty(_kings, Color.BLACK, options.kings[Color.BLACK]), _kings);

	        this.turn = options.turn;
	        this.enPassantSquare = options.enPassantSquare;

	        this.moveNumber = options.moveNumber;
	        this.halfMoves = options.halfMoves;
	        this.plyCount = options.plyCount;

	        this.metadata = options.metadata;

	        // TODO these original members are now, or should be!, in this.metadata
	        // this.timeTakenToMove = options.timeTakenToMove;
	        // this.comment = options.comment;
	        // this.isPuzzleSolution = options.isPuzzleSolution;

	        this.childVariations = [];
	    }

	    _createClass(MoveContext, [{
	        key: 'toString',
	        value: function toString() {
	            return this.move.algebraic;
	        }

	        // for more succinct console.log() output
	    }, {
	        key: 'inspect',
	        value: function inspect() {
	            return this.toString();
	        }
	    }]);

	    return MoveContext;
	})();

	;

	module.exports = MoveContext;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var BoardVariation = __webpack_require__(2);
	var Color = __webpack_require__(3);
	var EventLog = __webpack_require__(4);
	var Fen = __webpack_require__(5);
	var Flags = __webpack_require__(6);
	var LinkedHashMap = __webpack_require__(12);
	var Move = __webpack_require__(7);
	var PieceType = __webpack_require__(8);

	var Game = (function () {
	    function Game() {
	        var fen = arguments.length <= 0 || arguments[0] === undefined ? Fen.DEFAULT_POSITION_FULL : arguments[0];
	        var pgnHeaderPairs = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	        _classCallCheck(this, Game);

	        // EventLog for tracking all player interactions
	        this.eventLog = new EventLog();

	        // a chess's PGN header applies to all of its variations
	        this.header = new LinkedHashMap(pgnHeaderPairs);

	        // our board state information will always reside within the context of a given line of play, i.e. variation
	        if (fen) {
	            this.currentVariation = BoardVariation.createFromFen(fen, this.eventLog);

	            if (fen !== Fen.DEFAULT_POSITION_FULL) {
	                this.header.set('SetUp', '1');
	                this.header.set('FEN', fen);
	            }
	        } else {
	            this.currentVariation = new BoardVariation(this.eventLog);
	        }

	        // to store any continuations/variations
	        this.boardVariations = [this.currentVariation];
	    }

	    _createClass(Game, [{
	        key: 'toString',
	        value: function toString() {
	            var pgn = this.toPgn({
	                maxWidth: 0,
	                newlineChar: '\n',
	                showMoveCursor: true,
	                showHeaders: false
	            });

	            var lineSize = Math.max(80, Math.floor(pgn.length / 4));

	            var pgnLines = [];
	            for (var i = 0; i < pgn.length;) {
	                var start = i;
	                i += lineSize;
	                while (pgn.charAt(i) != ' ' && i < pgn.length) {
	                    i++;
	                }
	                pgnLines.push(pgn.substring(start, i));
	            }

	            var result = '';

	            var asciiLines = this.currentVariation.toString().split("\n");
	            var tallies = ' : (variations: ' + this.boardVariations.length + ', move history length: ' + this.currentVariation.moveHistory.length + ', selected index: ' + this.currentVariation.selectedMoveHistoryIndex + ')';
	            for (var i = 0; i < asciiLines.length; i++) {
	                result += asciiLines[i];

	                if (this.currentVariation.turn === Color.WHITE) {
	                    if (i == 9) result += tallies;
	                } else {
	                    if (i == 0) result += tallies;
	                }

	                if (i >= 2 && pgnLines.length > i - 2) result += '  ' + pgnLines[i - 2];
	                if (i == 7) result += '  ' + this.currentVariation.toFen();
	                result += '\n';
	            }
	            return result;
	        }
	    }, {
	        key: 'loadFen',
	        value: function loadFen(fen) {
	            var variation = BoardVariation.createFromFen(fen);
	            if (variation) {
	                this.currentVariation = variation;
	                this._updateSetup();
	                this.boardVariations = [variation];
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'makeMove',
	        value: function makeMove(move) {
	            var metadata = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            metadata = Object.assign({}, {
	                comment: null, /* string */
	                timeTakenToMove: null, /* int */
	                isPuzzleSolution: null /* boolean */
	            }, metadata);

	            return this.currentVariation.makeMove(move, this, metadata);
	        }
	    }, {
	        key: 'makeMoveFromSan',
	        value: function makeMoveFromSan(san) {
	            var metadata = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            metadata = Object.assign({}, {
	                comment: null, /* string */
	                timeTakenToMove: null, /* int */
	                isPuzzleSolution: null /* boolean */
	            }, metadata);

	            return this.currentVariation.makeMoveFromSan(san, this, metadata);
	        }
	    }, {
	        key: 'makeMoveFromAlgebraic',
	        value: function makeMoveFromAlgebraic(from, /* e.g. 'a4', 'b3' */
	        to /* e.g. 'a4', 'b3' */
	        ) {
	            var promotionPieceType = arguments.length <= 2 || arguments[2] === undefined ? PieceType.QUEEN : arguments[2];
	            var metadata = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	            metadata = Object.assign({}, {
	                comment: null, /* string */
	                timeTakenToMove: null, /* int */
	                isPuzzleSolution: null /* boolean */
	            }, metadata);

	            return this.currentVariation.makeMoveFromAlgebraic(from, to, this, promotionPieceType, metadata);
	        }
	    }, {
	        key: 'toPgn',
	        value: function toPgn() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            options = Object.assign({}, {
	                maxWidth: 0,
	                newlineChar: '\n',
	                showMoveCursor: false,
	                showHeaders: true
	            }, options);

	            var result = [];

	            // add the PGN header information
	            if (options.showHeaders) {
	                for (var i = 0; i < this.header.length(); i++) {
	                    result.push('[' + this.header.getKeyAtPosition(i) + ' "' + this.header.getValueAtPosition(i) + '"]' + options.newlineChar);
	                }
	                if (this.header.length() > 0) {
	                    result.push(options.newlineChar);
	                }
	            }

	            var outermostVariation = this.boardVariations[0];
	            var moves = processVariation(outermostVariation, 1, this.currentVariation);

	            function processVariation(variation, pgnMoveNum, currentVariation) {
	                var moves = [];
	                var variationMoveString = '';
	                var justStartedVariation = false;
	                var justFinishedVariation = false;

	                // initial leading annotation slot
	                if (variation.intraMoveAnnotationSlots[0]) {
	                    moves = moves.concat(variation.intraMoveAnnotationSlots[0]);
	                }

	                for (var i = 0; i < variation.moveHistory.length; i++) {

	                    //
	                    // #1: process move
	                    //

	                    var moveContext = variation.moveHistory[i];

	                    justStartedVariation = i == 0;

	                    // if the position started with black to move, start PGN with 1. ...
	                    if (justStartedVariation && moveContext.move.movedPiece.color === Color.BLACK) {
	                        moves.push(pgnMoveNum + '...');
	                        pgnMoveNum++;
	                    } else if ((justStartedVariation || justFinishedVariation) && moveContext.move.movedPiece.color === Color.BLACK && !variation.isContinuation) {
	                        moves.push(pgnMoveNum - 1 + '...');
	                    } else if (moveContext.move.movedPiece.color === Color.WHITE) {
	                        moves.push(pgnMoveNum + '.');
	                        pgnMoveNum++;
	                    }

	                    moves.push(moveContext.move.isWildcard ? Move.WILDCARD_MOVE : moveContext.move.san);

	                    if (options.showMoveCursor) {
	                        var isCurrentlySelectedMove = variation === currentVariation && i === currentVariation.selectedMoveHistoryIndex;
	                        if (isCurrentlySelectedMove) {
	                            moves.push(' ^');
	                        }
	                    }

	                    //
	                    // #2: process annotations
	                    //

	                    if (variation.intraMoveAnnotationSlots[i + 1]) {
	                        moves = moves.concat(variation.intraMoveAnnotationSlots[i + 1]);
	                    }

	                    //
	                    // #3: process variations
	                    //

	                    justFinishedVariation = false;
	                    if (variation.moveHistory[i].childVariations.length > 0) {

	                        if (variation.intraMoveAnnotationSlots[i + 1]) {
	                            moves.concat(variation.intraMoveAnnotationSlots[i + 1]);
	                        }

	                        for (var j = 0; j < variation.moveHistory[i].childVariations.length; j++) {
	                            var childVariation = variation.moveHistory[i].childVariations[j];

	                            var variationMoves = processVariation(childVariation, pgnMoveNum - (childVariation.isContinuation ? 0 : 1), currentVariation);

	                            if (variationMoves.length == 0) {
	                                // an empty variation
	                                moves.push("()");
	                            } else {
	                                for (var k = 0; k < variationMoves.length; k++) {
	                                    variationMoveString = variationMoves[k];

	                                    if (k == 0) {
	                                        variationMoveString = '(' + (childVariation.isContinuation ? '* ' : '') + variationMoveString;
	                                    }
	                                    if (k == variationMoves.length - 1) {
	                                        variationMoveString = variationMoveString + ')';
	                                    }

	                                    moves.push(variationMoveString);
	                                }
	                            }

	                            justFinishedVariation = true;
	                        }
	                    }
	                }

	                return moves;
	            }

	            // is there a result?
	            var resultHeader = this.header.get('Result');
	            if (resultHeader) {
	                moves.push(resultHeader);
	            }

	            // history should be back to what is was before we started generating PGN, so join together moves
	            if (options.maxWidth === 0) {
	                return result.join('') + moves.join(' ');
	            }

	            // wrap the PGN output at maxWidth -- TODO, revisit whether you want to linewrap inside a move, e.g. for "1. e4" --> "1.\ne4"
	            var currentWidth = 0;
	            for (var i = 0; i < moves.length; i++) {
	                // if the current move will push past maxWidth
	                if (currentWidth + moves[i].length > options.maxWidth && i !== 0) {

	                    // don't end the line with whitespace
	                    if (result[result.length - 1] === ' ') {
	                        result.pop();
	                    }

	                    result.push(options.newlineChar);
	                    currentWidth = 0;
	                } else if (i !== 0) {
	                    result.push(' ');
	                    currentWidth++;
	                }
	                result.push(moves[i]);
	                currentWidth += moves[i].length;
	            }

	            return result.join('');
	        }
	    }, {
	        key: 'createContinuationFromSan',
	        value: function createContinuationFromSan(san /* string, e.g. "Rxa7" or "e8=Q#" */) {
	            this.eventLog.add('createContinuationFromSan(' + san + ')');

	            return this.createVariationFromSan(san, true, { shouldLog: false });
	        }
	    }, {
	        key: 'createVariationFromSan',
	        value: function createVariationFromSan(san, /* string, e.g. "Rxa7" or "e8=Q#" */isContinuation) {
	            var options = arguments.length <= 2 || arguments[2] === undefined ? {
	                shouldLog: true
	            } : arguments[2];

	            if (options.shouldLog) {
	                this.eventLog.add('createVariationFromSan(' + san + ', ' + isContinuation + ')');
	            }

	            if (san === null) {
	                return false;
	            }

	            if (isContinuation) {
	                if (this.currentVariation.selectedMoveHistoryIndex + 1 < this.currentVariation.moveHistory.length) {
	                    var _move = this.currentVariation.moveHistory[this.currentVariation.selectedMoveHistoryIndex + 1].move;
	                    if (_move.san === san) {
	                        return false; // Continuation not created.  New move already exists as the next move in the current move sequence.
	                    } else if (san === Move.WILDCARD_MOVE) {
	                            return false; // Continuation not created.  New wildcard move already exists as the next move in the current move sequence.
	                        }
	                }
	            } else {
	                    var _move2 = this.currentVariation.moveHistory[this.currentVariation.selectedMoveHistoryIndex].move;
	                    if (_move2.san === san) {
	                        return false; // Variation not created.  New move already exists as the next move in the current move sequence.
	                    } else if (san === Move.WILDCARD_MOVE) {
	                            return false; // Continuation not created.  New wildcard move already exists as the next move in the current move sequence.
	                        }
	                }

	            var innerVariation = BoardVariation.createFromParentVariation(this.currentVariation, { isContinuation: isContinuation });
	            this.boardVariations.push(innerVariation);

	            // take the variation we just started, and append it to the list of variations that start from its "parent" move.
	            this.currentVariation.moveHistory[this.currentVariation.selectedMoveHistoryIndex].childVariations.push(innerVariation);

	            // down we go, into our new variation
	            this.currentVariation = innerVariation;

	            var move = Move.createFromSan(san, this.currentVariation);

	            if (!move) {
	                // requested move isn't possible, so undo our attempt at creating a variation
	                this.currentVariation = this.currentVariation.parentVariation;
	                this.currentVariation.moveHistory[this.currentVariation.selectedMoveHistoryIndex].childVariations.pop();
	                this.boardVariations.pop();

	                return false;
	            }

	            this.currentVariation.makeMove(move, this);

	            return true;
	        }
	    }, {
	        key: 'history',
	        value: function history() {
	            var moveHistory = [];
	            var tempVariation = this.currentVariation;

	            for (var i = tempVariation.selectedMoveHistoryIndex; i >= 0; i--) {
	                moveHistory.push(tempVariation.moveHistory[i].move.isWildcard ? Move.WILDCARD_MOVE : tempVariation.moveHistory[i].move.san);
	            }

	            var parentLastMoveIndex = tempVariation.parentLastMoveIndex;
	            var isContinuation = tempVariation.isContinuation;
	            tempVariation = tempVariation.parentVariation;

	            while (tempVariation != null) {
	                var i = parentLastMoveIndex;
	                if (!isContinuation) {
	                    i--;
	                }

	                for (; i >= 0; i--) {
	                    moveHistory.push(tempVariation.moveHistory[i].isWildcard ? Move.WILDCARD_MOVE : tempVariation.moveHistory[i].move.san);
	                }

	                parentLastMoveIndex = tempVariation.parentLastMoveIndex;
	                isContinuation = tempVariation.isContinuation;
	                tempVariation = tempVariation.parentVariation;
	            }

	            return moveHistory.reverse();
	        }

	        // ---------------
	        // navigation APIs
	        // ---------------

	    }, {
	        key: 'ascendFromCurrentContinuation',
	        value: function ascendFromCurrentContinuation() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                shouldLog: true
	            } : arguments[0];

	            if (options.shouldLog) {
	                this.eventLog.add('ascendFromCurrentContinuation()');
	            }

	            if (this.currentVariation.parentVariation === null) {
	                // already at the topmost level;  nothing to do.
	                return false;
	            }

	            // this method differs from ascendFromCurrentVariation only here in this "- 1" offset
	            var selectedMoveIndex = this.currentVariation.parentLastMoveIndex - 1;
	            this.currentVariation = this.currentVariation.parentVariation;
	            this.currentVariation.selectedMoveIndex = selectedMoveIndex;

	            return this._selectMove(selectedMoveIndex);
	        }
	    }, {
	        key: 'ascendFromCurrentVariation',
	        value: function ascendFromCurrentVariation() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                shouldLog: true
	            } : arguments[0];

	            if (options.shouldLog) {
	                this.eventLog.add('ascendFromCurrentVariation()');
	            }

	            if (this.currentVariation.parentVariation === null) {
	                // already at the topmost level;  nothing to do.
	                return false;
	            }

	            var selectedMoveIndex = this.currentVariation.parentLastMoveIndex;
	            this.currentVariation = this.currentVariation.parentVariation;
	            this.currentVariation.selectedMoveIndex = selectedMoveIndex;

	            return true;
	        }
	    }, {
	        key: 'next',
	        value: function next() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                shouldLog: true
	            } : arguments[0];

	            return this.currentVariation.next(options);
	        }
	    }, {
	        key: 'prev',
	        value: function prev() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                shouldLog: true
	            } : arguments[0];

	            if (options.shouldLog) {
	                this.eventLog.add('prev()');
	            }

	            if (this.currentVariation.selectedMoveHistoryIndex === 0 && this.currentVariation.parentVariation) {
	                if (this.ascendFromCurrentContinuation({ shouldLog: false })) {
	                    return true;
	                } else {
	                    return false;
	                }
	            } else {
	                return this._selectMove(this.currentVariation.selectedMoveHistoryIndex - 1);
	            }
	        }
	    }, {
	        key: 'rewindToBeginning',
	        value: function rewindToBeginning() {
	            this.eventLog.add('rewindToBeginning()');
	            while (this.prev({ shouldLog: false })) {}
	        }
	    }, {
	        key: 'replayToPlyNum',
	        value: function replayToPlyNum(n /* logical ply number, starting from 1 */) {
	            return this.currentVariation.replayToPlyNum(n); // TODO broken method logic;  game-level replay should unwind through multiple childVariations;
	            // think:  path from leaf to n ancestors up the tree
	        }
	    }, {
	        key: '_updateSetup',
	        value: function _updateSetup() {
	            if (this.currentVariation.moveHistory.length > 0) return;

	            var fen = this.currentVariation.toFen();

	            if (fen !== Fen.DEFAULT_POSITION) {
	                this.header.set('SetUp', '1');
	                this.header.set('FEN', fen);
	            } else {
	                this.header.remove('SetUp');
	                this.header.remove('FEN');
	            }
	        }
	    }, {
	        key: 'header',
	        value: function header() {
	            return this.header;
	        }
	    }, {
	        key: 'descendIntoContinuation',
	        value: function descendIntoContinuation() /* defaults to the first variation */{
	            var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	            this.eventLog.add('descendIntoContinuation()');

	            if (this.currentVariation.moveHistory.length <= 0) {
	                return false;
	            }

	            var currentMoveContext = this.currentVariation.moveHistory[this.currentVariation.selectedMoveHistoryIndex];
	            if (currentMoveContext.childVariations.length <= 0) {
	                return false;
	            }
	            if (i < 0 || i > currentMoveContext.childVariations.length - 1) {
	                return false;
	            }
	            if (!currentMoveContext.childVariations[i].isContinuation) {
	                return false;
	            }

	            this.currentVariation = currentMoveContext.childVariations[i];
	            this.currentVariation.selectedMoveHistoryIndex = 0;

	            return this._selectMove(0);
	        }
	    }, {
	        key: 'descendIntoVariation',
	        value: function descendIntoVariation() /* defaults to the first variation */{
	            var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

	            this.eventLog.add('descendIntoVariation()');

	            if (this.currentVariation.moveHistory.length <= 0) {
	                return false;
	            }

	            var currentMoveContext = this.currentVariation.moveHistory[this.currentVariation.selectedMoveHistoryIndex];
	            if (currentMoveContext.childVariations.length <= 0) {
	                return false;
	            }
	            if (i < 0 || i > currentMoveContext.childVariations.length - 1) {
	                return false;
	            }
	            if (currentMoveContext.childVariations[i].isContinuation) {
	                return false;
	            }

	            this.currentVariation = currentMoveContext.childVariations[i];
	            this.currentVariation.selectedMoveHistoryIndex = 0;

	            return this._selectMove(0);
	        }

	        // --------------------------------------
	        // pass-through API methods, alphabetized
	        // --------------------------------------

	    }, {
	        key: '_selectMove',
	        value: function _selectMove(i) {
	            var options = arguments.length <= 1 || arguments[1] === undefined ? {
	                shouldLog: false
	            } : arguments[1];

	            return this.currentVariation._selectMove(i, options);
	        }
	    }, {
	        key: 'get',
	        value: function get(square /* string, e.g. 'a1' */) {
	            return this.currentVariation.get(square);
	        }
	    }, {
	        key: 'isCheck',
	        value: function isCheck() {
	            return this.currentVariation.isCheck();
	        }
	    }, {
	        key: 'isCheckmate',
	        value: function isCheckmate() {
	            return this.currentVariation.isCheckmate();
	        }
	    }, {
	        key: 'isDraw',
	        value: function isDraw() {
	            return this.currentVariation.isDraw();
	        }
	    }, {
	        key: 'isGameOver',
	        value: function isGameOver() {
	            return this.currentVariation.isGameOver();
	        }
	    }, {
	        key: 'isInsufficientMaterial',
	        value: function isInsufficientMaterial() {
	            return this.currentVariation.isInsufficientMaterial();
	        }
	    }, {
	        key: 'isStalemate',
	        value: function isStalemate() {
	            return this.currentVariation.isStalemate();
	        }
	    }, {
	        key: 'isThreefoldRepetition',
	        value: function isThreefoldRepetition() {
	            return this.currentVariation.isThreefoldRepetition();
	        }
	    }, {
	        key: 'moves',
	        value: function moves() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {
	                onlyAlgebraicSquares: false,
	                onlyDestinationSquares: false,
	                onlyForSquare: undefined
	            } : arguments[0];

	            return this.currentVariation.moves(options);
	        }
	    }, {
	        key: 'put',
	        value: function put(piece, /* Piece, e.g. Piece.WHITE_ROOK */square /* string, e.g. 'h8' */) {
	            return this.currentVariation.put(piece, square);
	        }
	    }, {
	        key: 'remove',
	        value: function remove(square /* string, e.g. 'a1' */) {
	            var piece = this.currentVariation.remove(square);
	            this._updateSetup();

	            return piece;
	        }
	    }, {
	        key: 'toFen',
	        value: function toFen() {
	            return this.currentVariation.toFen();
	        }
	    }]);

	    return Game;
	})();

	;

	module.exports = Game;
	/* string, e.g. 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' */
	/* Move object from move.js */
	/* string, e.g. "Rxa7" or "e8=Q#" */

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	// a lightweight map class that preserves key insertion order;
	// needed for parsing and reconstructing PGN headers

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var LinkedHashMap = (function () {
	    function LinkedHashMap() {
	        var pairs = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

	        _classCallCheck(this, LinkedHashMap);

	        this._map = {};
	        this._keys = [];

	        this.addAll(pairs);
	    }

	    _createClass(LinkedHashMap, [{
	        key: 'addAll',
	        value: function addAll(pairs) {
	            for (var i = 0; i < pairs.length; i += 2) {
	                this.set(pairs[i], pairs[i + 1]);
	            }
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this._map = {};
	            this._keys = [];
	        }
	    }, {
	        key: 'get',
	        value: function get(k) {
	            return this._map[k];
	        }
	    }, {
	        key: 'getKeyAtPosition',
	        value: function getKeyAtPosition(i) {
	            return this._keys[i];
	        }
	    }, {
	        key: 'getValueAtPosition',
	        value: function getValueAtPosition(i) {
	            return this._map[this._keys[i]];
	        }
	    }, {
	        key: 'length',
	        value: function length() {
	            return this._keys.length;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(k) {
	            if (k in this._map) {
	                var i = this._keys.indexOf(k);
	                this._keys.splice(i, 1);
	                delete this._map[k];
	            }
	        }
	    }, {
	        key: 'set',
	        value: function set(k, v) {
	            if (!(k in this._map)) {
	                this._keys.push(k);
	            }
	            this._map[k] = v;
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            var _this = this;

	            return '{ ' + this._keys.map(function (key) {
	                return key + ': ' + _this._map[key];
	            }).join(', ') + ' }';
	        }
	    }]);

	    return LinkedHashMap;
	})();

	;

	module.exports = LinkedHashMap;

/***/ }
/******/ ]);