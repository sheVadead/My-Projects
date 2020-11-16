/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameRules.js":
/*!**************************!*\
  !*** ./src/gameRules.js ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.js */ "./src/render.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var timerId;
var min = 0;
var sec = 0;
var draggingCell;
var dragBlock;

var GameRules = /*#__PURE__*/function (_Render) {
  _inherits(GameRules, _Render);

  var _super = _createSuper(GameRules);

  function GameRules() {
    var _this;

    _classCallCheck(this, GameRules);

    _this = _super.call(this);
    _this.targetDragBlock;
    return _this;
  }

  _createClass(GameRules, [{
    key: "audioHandler",
    value: function audioHandler() {
      if (this.isVolume) {
        var audio = document.querySelector('#click-sound');
        audio.currentTime = 0;
        audio.play();
      }
    }
  }, {
    key: "dragStart",
    value: function dragStart(e) {
      this.targetDragBlock = e.target;
      var target = e.target.closest('[data-num]');
      var emptyTarget = document.querySelector("[data-num=\"".concat(this.rows * this.columns, "\"]"));

      if (target === emptyTarget) {
        return;
      }

      var field = document.querySelector('.field');
      var draggingIndex = Array.from(field.childNodes).indexOf(e.target);
      draggingCell = this.blocksCoord[draggingIndex];
      dragBlock = e.target.closest('[data-num]');
      e.dataTransfer.setData('block', e.target.id);
      target.classList.add('invisible');
      e.dataTransfer.setData('block', target);
    }
  }, {
    key: "dragFinish",
    value: function dragFinish(e) {
      var target = e.target.closest('[data-num]');
      target.classList.remove('invisible');
    }
  }, {
    key: "moveHandler",
    value: function moveHandler(e, indexOfNodes) {
      var _this2 = this;

      var moveCount = document.querySelector('.move-count');
      var empty = document.querySelector("[data-num=\"".concat(this.rows * this.columns, "\"]"));
      var target = e.target.closest('[data-num]');
      if (target === null) return;
      this.audioHandler();
      var targetElem = this.blocksCoord[indexOfNodes];
      var leftDiv = Math.abs(parseFloat(this.empty.left) - parseFloat(target.style.left));
      var topDiv = Math.abs(parseFloat(this.empty.top) - parseFloat(target.style.top));

      if (topDiv + leftDiv > this.blockSize) {
        return;
      }

      if (topDiv + leftDiv == this.blockSize) {
        moveCount.textContent = ++moveCount.textContent;
      }

      var emptyLeft = empty.style.left;
      var emptyTop = empty.style.top;
      var emptyCell = this.blocksCoord[this.emptyBlock];
      empty.style.left = targetElem.elem.style.left;
      empty.style.top = targetElem.elem.style.top;
      targetElem.elem.style.top = emptyTop;
      targetElem.elem.style.left = emptyLeft;
      targetElem.left = parseFloat(emptyLeft) / this.blockSize;
      targetElem.top = parseFloat(emptyTop) / this.blockSize;
      this.empty.left = empty.style.left;
      this.empty.top = empty.style.top;
      emptyCell.top = parseFloat(this.empty.top) / this.blockSize;
      emptyCell.left = parseFloat(this.empty.left) / this.blockSize;
      var isFinished = this.blocksCoord.every(function (item) {
        return item.value == item.top * _this2.rows + item.left;
      });

      if (isFinished) {
        this.winHandler();
      }
    }
  }, {
    key: "dragDrop",
    value: function dragDrop(e, indexOfNodes, indexOfblockNode) {
      var _this3 = this;

      var moveCount = document.querySelector('.move-count');
      var target = e.target;
      var targetElem = this.blocksCoord[indexOfNodes];
      var blockElem = this.blocksCoord[indexOfblockNode];
      var emptyLeft = targetElem.elem.style.left;
      var emptyTop = targetElem.elem.style.top;
      var leftDiv = Math.abs(parseFloat(this.empty.left) - parseFloat(dragBlock.style.left));
      var topDiv = Math.abs(parseFloat(this.empty.top) - parseFloat(dragBlock.style.top));

      if (topDiv + leftDiv > this.blockSize) {
        return;
      }

      target.style.top = draggingCell.elem.style.top;
      target.style.left = draggingCell.elem.style.left;
      draggingCell.elem.style.top = emptyTop;
      draggingCell.elem.style.left = emptyLeft;
      var empty = document.querySelector("[data-num=\"".concat(this.rows * this.columns, "\"]"));
      blockElem.left = parseFloat(emptyLeft) / this.blockSize;
      blockElem.top = parseFloat(emptyTop) / this.blockSize;
      this.empty.left = empty.style.left;
      this.empty.top = empty.style.top;
      var isFinished = this.blocksCoord.every(function (item) {
        return item.value == item.top * _this3.rows + item.left;
      });

      if (topDiv + leftDiv == this.blockSize) {
        moveCount.textContent = ++this.counter;
      }

      if (isFinished) {
        this.winHandler();
      }
    }
  }, {
    key: "blocksListenerHandler",
    value: function blocksListenerHandler() {
      var _this4 = this;

      var field = document.querySelector('.field');
      field.addEventListener('dragstart', function (e) {
        _this4.dragStart(e);
      });
      field.addEventListener('click', function (event) {
        var indexOfNodes = Array.from(field.childNodes).indexOf(event.target);

        _this4.moveHandler(event, indexOfNodes);
      });
      field.addEventListener('dragend', this.dragFinish);
      field.addEventListener('drop', function (e) {
        var indexOfNodes = Array.from(field.childNodes).indexOf(e.target);
        var indexOfblockNode = Array.from(field.childNodes).indexOf(_this4.targetDragBlock);

        _this4.dragDrop(e, indexOfNodes, indexOfblockNode);
      });
    }
  }, {
    key: "swapBlocks",
    value: function swapBlocks(i1, i2) {
      var t = this.numbers[i1];
      this.numbers[i1] = this.numbers[i2];
      this.numbers[i2] = t;
    }
  }, {
    key: "checkSolvability",
    value: function checkSolvability(a) {
      var kDisorder = 0;

      for (var i = 1, len = a.length - 1; i < len; i++) {
        for (var j = i - 1; j >= 0; j--) {
          if (a[j] > a[i]) {
            kDisorder++;
          }
        }
      }

      return !(kDisorder % 2);
    }
  }, {
    key: "pauseHandler",
    value: function pauseHandler() {
      clearInterval(timerId);
    }
  }, {
    key: "saveGameHandler",
    value: function saveGameHandler() {
      var _this5 = this;

      // board: [...Array(15).keys()]
      var moveCount = document.querySelector('.move-count');
      var savedFieldObj = {
        board: {}
      };
      this.blocksCoord.forEach(function (item) {
        var savedCoord = item.top * _this5.rows + item.left;
        savedFieldObj.board["".concat(savedCoord)] = item.value;
      });
      savedFieldObj.min = min;
      savedFieldObj.sec = sec;
      savedFieldObj.moves = moveCount.textContent;
      savedFieldObj.block = this.blockSize;
      savedFieldObj.rows = this.rows;
      savedFieldObj.columns = this.columns;
      var gameArray = [];
      gameArray.push(savedFieldObj);
      localStorage.setItem('saveField', JSON.stringify(gameArray));
    }
  }, {
    key: "loadGame",
    value: function loadGame() {
      document.body.querySelector('.field').remove();
      document.body.querySelector('.header').remove();
      var testNew = new GameRules();
      var fieldObj = JSON.parse(localStorage.getItem('saveField'));
      testNew.numbers = Object.values(fieldObj[0].board).map(function (item) {
        return item = item + 1;
      });
      testNew.rows = fieldObj[0].rows;
      testNew.columns = fieldObj[0].columns;
      testNew.blockSize = fieldObj[0].block;
      testNew.getBlocks();
      testNew.isSolved();
      var field = document.querySelector('.field');
      var moves = document.querySelector('.move-count');
      var pause = document.querySelector('.pause-button');
      moves.textContent = fieldObj[0].moves;
      min = fieldObj[0].min;
      sec = fieldObj[0].sec;
      this.addTimer();
      field.querySelector('.overlay').remove();
      pause.removeAttribute('disabled');
    }
  }, {
    key: "resumeTimer",
    value: function resumeTimer() {
      var stopWatch = document.querySelector('.stop-watch');
      timerId = setInterval(function () {
        sec++;
        sec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;

        if (sec > 60) {
          sec = 0;
          min++;
        }

        stopWatch.textContent = "".concat(min, ": ").concat(sec);
      }, 1000);
    }
  }, {
    key: "newGameHandler",
    value: function newGameHandler() {
      this.pauseHandler();
      var testNew = new GameRules();
      document.body.querySelector('.field').remove();
      document.body.querySelector('.header').remove();
      testNew.init();
      var pause = document.querySelector('.pause-button');
      pause.removeAttribute('disabled');
      min = 0;
      sec = 0;
      var overlay = document.querySelector('.overlay');
      overlay.remove();
      this.addTimer();
    }
  }, {
    key: "isSolved",
    value: function isSolved() {
      var _this6 = this;

      var reload = document.querySelector('.reload');
      var newGamStart = document.querySelector('.new-game');
      newGamStart.addEventListener('click', function () {
        _this6.newGameHandler();
      });
      reload.addEventListener('click', function () {
        _this6.newGameHandler();
      });
    }
  }, {
    key: "addTimer",
    value: function addTimer() {
      var stopWatch = document.querySelector('.stop-watch');
      timerId = setInterval(function () {
        sec++;
        sec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;

        if (sec > 60) {
          sec = 0;
          min++;
        }

        stopWatch.textContent = "".concat(min, ": ").concat(sec);
      }, 1000);
    }
  }, {
    key: "winHandler",
    value: function winHandler() {
      this.pauseHandler();
      var field = document.querySelector('.field');
      var overlay = document.createElement('div');
      var moves = document.querySelector('.move-count');
      var win = document.createElement('span');
      var pressReload = document.createElement('span');
      pressReload.classList.add('win');
      var winTime = document.querySelector('.stop-watch');
      win.classList.add('win');
      win.textContent = "Congratulations! You win after ".concat(moves.textContent, " moves and ").concat(winTime.textContent);
      pressReload.textContent = 'Press reload button to start new game';
      overlay.classList.add('overlay');
      overlay.appendChild(win);
      overlay.appendChild(pressReload);
      field.appendChild(overlay);
    }
  }, {
    key: "automaticSolve",
    value: function automaticSolve() {}
  }, {
    key: "init",
    value: function init() {
      while (!this.checkSolvability(this.numbers)) {
        this.swapBlocks(0, 1);
      }

      _get(_getPrototypeOf(GameRules.prototype), "getBlocks", this).call(this);

      this.isSolved();
    }
  }]);

  return GameRules;
}(_render_js__WEBPACK_IMPORTED_MODULE_0__.default);

var testNew2 = new GameRules();
testNew2.init();

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Render = /*#__PURE__*/function () {
  function Render() {
    _classCallCheck(this, Render);

    this.fieldOptions = [3, 4, 5, 6, 7, 8];
    this.rows = localStorage.getItem('fieldSize') || 4;
    this.columns = localStorage.getItem('fieldSize') || 4;
    this.blockSize = Math.floor(450 / this.rows);
    this.empty = {
      value: 16,
      left: 0,
      top: 0
    };
    this.blocksCoord = [];
    this.numbers = _toConsumableArray(Array(this.rows * this.columns).keys()).map(function (item) {
      return item = item + 1;
    }).sort(function () {
      return Math.random() - 0.5;
    });
    this.counter = 0;
    this.min = 0;
    this.sec = 0;
    this.emptyBlock = 0;
    this.isPause = false;
    this.sortedArray = [];
    this.isVolume = false;
    this.suffleIndex = [];
  }

  _createClass(Render, [{
    key: "getField",
    value: function getField() {
      var _this = this;

      var createIconHTML = function createIconHTML(icon_name) {
        return "<i class=\"material-icons\">".concat(icon_name, "</i>");
      };

      var field = document.createElement('div');
      var header = document.createElement('header');
      var time = document.createElement('div');
      var moves = document.createElement('div');
      var moveCount = document.createElement('span');
      var overlay = document.createElement('div');
      var newGame = document.createElement('button');
      var chooseFieldSize = document.createElement('select');
      var pauseGame = document.createElement('button');
      var stopWatch = document.createElement('span');
      var volumeUp = document.createElement('div');
      var audioClick = document.createElement('audio');
      var reload = document.createElement('div');
      var saveGame = document.createElement('button');
      var loadGame = document.createElement('button');
      var saveChange = document.createElement('span');
      saveChange.classList.add('save-change');
      saveChange.textContent = 'Field size saved. Press "NEW GAME" button.';
      reload.classList.add('reload');
      reload.innerHTML = createIconHTML('autorenew');
      saveGame.classList.add('save-game');
      saveGame.textContent = 'Save game';
      loadGame.classList.add('load-game');
      loadGame.textContent = 'Load Game';
      loadGame.addEventListener('click', function () {
        _this.loadGame();
      });
      saveGame.addEventListener('click', function () {
        saveGame.textContent = 'Game saved';
        setTimeout(function () {
          saveGame.textContent = 'Save Game';
        }, 1000);

        _this.saveGameHandler();
      });
      audioClick.setAttribute('id', 'click-sound');
      audioClick.setAttribute('src', "./audio/b17af522a99b72f12e392e38f1b08e7e.MP3");
      volumeUp.classList.add('volume-up');
      volumeUp.innerHTML = createIconHTML("volume_off");
      volumeUp.addEventListener('click', function () {
        _this.isVolume = !_this.isVolume;

        if (_this.isVolume) {
          volumeUp.innerHTML = '';
          volumeUp.innerHTML = createIconHTML("volume_up");
        } else {
          volumeUp.innerHTML = createIconHTML("volume_off");
        }
      });
      stopWatch.classList.add('stop-watch');
      stopWatch.textContent = '0: 00';
      chooseFieldSize.classList.add('choose-size');
      chooseFieldSize.addEventListener('change', function () {
        chooseFieldSize.childNodes.forEach(function (item) {
          if (item.selected === true) {
            localStorage.setItem('fieldSize', item.value);
          }
        });
        overlay.appendChild(saveChange);
        setTimeout(function () {
          overlay.querySelector('.save-change').remove();
        }, 1000);
      });
      this.fieldOptions.forEach(function (item) {
        var selectItem = document.createElement('option');
        selectItem.textContent = "".concat(item, "x").concat(item);
        selectItem.value = item;

        if (item == localStorage.getItem('fieldSize')) {
          selectItem.setAttribute('selected', true);
        }

        chooseFieldSize.appendChild(selectItem);
      });
      newGame.classList.add('new-game');
      newGame.textContent = 'New Game';
      time.classList.add('time');
      time.appendChild(stopWatch);
      moveCount.textContent = 0;
      moveCount.classList.add('move-count');
      moves.classList.add('moves');
      moves.textContent = "Moves: ";
      moves.appendChild(moveCount);
      header.appendChild(moves);
      header.appendChild(time);
      header.appendChild(pauseGame);
      header.appendChild(volumeUp);
      header.appendChild(reload);
      header.classList.add('header');
      field.classList.add('field');
      overlay.classList.add('overlay');
      overlay.appendChild(newGame);
      overlay.appendChild(saveGame);
      overlay.appendChild(loadGame);
      overlay.appendChild(chooseFieldSize);
      field.appendChild(overlay);
      pauseGame.textContent = 'PAUSE';
      pauseGame.classList.add('pause-button');
      pauseGame.setAttribute('disabled', 'true');
      pauseGame.addEventListener('click', function () {
        _this.isPause = !_this.isPause;

        if (_this.isPause) {
          pauseGame.textContent = 'RESUME';
          field.appendChild(overlay);

          _this.pauseHandler();
        } else {
          _this.resumeTimer();

          pauseGame.textContent = 'PAUSE';
          overlay.remove();
        }
      });
      document.body.appendChild(audioClick);
      document.body.appendChild(header);
      document.body.appendChild(field);
      return field;
    }
  }, {
    key: "getBlocks",
    value: function getBlocks() {
      var _this2 = this;

      var newField = this.getField();
      this.checkSolvability(this.numbers);
      this.numbers.forEach(function (item) {
        var block = document.createElement('div');
        block.classList.add('field__item');
        block.setAttribute('data-num', item);
        block.setAttribute('draggable', true);
        block.textContent = item + 1 - 1;
        block.style.width = "".concat(_this2.blockSize, "px");
        block.style.height = "".concat(_this2.blockSize, "px");
        block.style.backgroundImage = 'url("./img/327e3224e20da2aa30c94d226bb2556e.jpg")';

        _this2.sortedArray.push(block);
      });
      this.sortedArray.forEach(function (item, index) {
        _this2.suffleIndex.push(item.textContent);

        _this2.blocksPosition(item, index);

        newField.appendChild(item);
      });
      this.blocksListenerHandler();
    }
  }, {
    key: "shuffle",
    value: function shuffle(a) {
      var j, x, i;

      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }

      return a;
    }
  }, {
    key: "blocksPosition",
    value: function blocksPosition(block, index) {
      var left = index % this.rows;
      var top = (index - left) / this.rows;
      var backLeft = block.innerHTML % this.rows;
      var backgroundLeft = "-".concat(backLeft * this.blockSize, "px");
      var backTop = (block.innerHTML - backLeft) / this.rows;
      var backgrounTop = "-".concat(backTop * this.blockSize, "px");
      block.style.backgroundRepeat = 'no-repeat';
      block.style.backgroundPosition = " ".concat(backgroundLeft, "  ").concat(backgrounTop, " ");
      this.blocksCoord.push({
        value: block.innerHTML - 1,
        left: left,
        top: top,
        elem: block
      });
      var blockAmount = this.rows * this.columns;

      if (parseInt(block.innerHTML) === blockAmount) {
        block.ondragstart = function () {
          return false;
        };

        block.addEventListener('dragover', function (e) {
          e.preventDefault();
        });
        this.emptyBlock = index;
        block.textContent = '';
        block.style.background = 'none';
        this.empty.left = "".concat(left * this.blockSize, "px");
        this.empty.top = "".concat(top * this.blockSize, "px");
      }

      block.style.left = "".concat(left * this.blockSize, "px");
      block.style.top = "".concat(top * this.blockSize, "px");
    }
  }, {
    key: "init",
    value: function init() {}
  }]);

  return Render;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Render);

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/render.js");
/******/ 	__webpack_require__("./src/gameRules.js");
/******/ 	__webpack_require__("./src/style.scss");
/******/ })()
;
//# sourceMappingURL=script.js.map