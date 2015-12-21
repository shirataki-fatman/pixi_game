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

	"use strict";

	var SceneManager = __webpack_require__(1);
	var Input = __webpack_require__(4);

	(function () {
	    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	    window.requestAnimationFrame = requestAnimationFrame;
	})();

	var stage = new PIXI.Stage(0x000000);
	var renderer = PIXI.autoDetectRenderer(640, 480);

	document.body.appendChild(renderer.view);
	Input.init(renderer.view);

	SceneManager.init(stage);
	SceneManager.start("main");
	requestAnimationFrame(mainLoop);

	function mainLoop(timestamp) {
	    requestAnimationFrame(mainLoop);

	    SceneManager.update();

	    renderer.render(stage);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Scene = __webpack_require__(2);

	var SceneManager = {
	    _scenes: {
	        main: Scene.Main
	    },
	    init: function init(stage) {
	        this._stage = stage;
	    },
	    start: function start(sceneName) {
	        console.log(this._stage);
	        this.currentScene = new this._scenes[sceneName](this._stage);
	    },
	    update: function update() {
	        this.currentScene.update();
	    }
	};

	module.exports = SceneManager;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Entity = __webpack_require__(3);

	var SCENE_INIT = 0;
	var SCENE_MAIN = 1;
	var SCENE_END = 2;

	var TAG_UNSET = "tagUnset";

	var Scene = (function () {
	    function Scene(stage) {
	        _classCallCheck(this, Scene);

	        this.state = SCENE_INIT;
	        this.container = new PIXI.Container();
	        this.entities = {};

	        stage.addChild(this.container);
	    }

	    _createClass(Scene, [{
	        key: "update",
	        value: function update() {
	            switch (this.state) {
	                case SCENE_INIT:
	                    this._init();
	                    break;
	                case SCENE_MAIN:
	                    this._main();
	                    break;
	                case SCENE_END:
	                    this._end();
	                    break;
	            }
	        }
	    }, {
	        key: "addEntity",
	        value: function addEntity(entity, tagName) {
	            tagName = tagName || TAG_UNSET;
	            if (!this.entities[tagName]) {
	                this.entities[tagName] = [];
	            }
	            this.entities[tagName].push(entity);

	            this.container.addChild(entity.drawer);
	        }
	    }, {
	        key: "getContainer",
	        value: function getContainer() {
	            return this.container;
	        }
	    }, {
	        key: "_init",
	        value: function _init() {
	            this.state = SCENE_MAIN;
	        }
	    }, {
	        key: "_main",
	        value: function _main() {
	            for (var tag in this.entities) {
	                for (var i in this.entities[tag]) {
	                    this.entities[tag][i].update();
	                }
	            }
	        }
	    }, {
	        key: "_end",
	        value: function _end() {}
	    }]);

	    return Scene;
	})();

	var MainScene = (function (_Scene) {
	    _inherits(MainScene, _Scene);

	    function MainScene(stage) {
	        _classCallCheck(this, MainScene);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(MainScene).call(this, stage));
	    }

	    _createClass(MainScene, [{
	        key: "_init",
	        value: function _init() {
	            var text = new PIXI.Text('This is a Main Scene', { font: '24px Arial', fill: 0xff1010, align: 'center' });
	            var textEntity = new Entity.Player(text, 320, 240);

	            this.addEntity(textEntity);

	            _get(Object.getPrototypeOf(MainScene.prototype), "_init", this).call(this);
	        }
	    }, {
	        key: "_main",
	        value: function _main() {
	            _get(Object.getPrototypeOf(MainScene.prototype), "_main", this).call(this);
	        }
	    }]);

	    return MainScene;
	})(Scene);

	module.exports = {
	    Main: MainScene
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Input = __webpack_require__(4);

	var Entity = (function () {
	    function Entity(drawer, x, y) {
	        _classCallCheck(this, Entity);

	        this.drawer = drawer;
	        this.drawer.anchor.x = 0.5;
	        this.drawer.anchor.y = 0.5;
	        this.drawer.position.x = x;
	        this.drawer.position.y = y;
	    }

	    _createClass(Entity, [{
	        key: "update",
	        value: function update() {
	            if (this.drawer.update) {
	                this.drawer.update();
	            }
	        }
	    }]);

	    return Entity;
	})();

	var OperatableEntity = (function (_Entity) {
	    _inherits(OperatableEntity, _Entity);

	    function OperatableEntity(drawer, x, y) {
	        _classCallCheck(this, OperatableEntity);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(OperatableEntity).call(this, drawer, x, y));
	    }

	    _createClass(OperatableEntity, [{
	        key: "update",
	        value: function update() {
	            this.move(Input.getBuffer());
	            _get(Object.getPrototypeOf(OperatableEntity.prototype), "update", this).call(this);
	        }
	    }, {
	        key: "move",
	        value: function move(keyBuffer) {}
	    }]);

	    return OperatableEntity;
	})(Entity);

	var PlayerEntity = (function (_OperatableEntity) {
	    _inherits(PlayerEntity, _OperatableEntity);

	    function PlayerEntity(drawer, x, y) {
	        _classCallCheck(this, PlayerEntity);

	        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerEntity).call(this, drawer, x, y));

	        _this2.vx = 0;
	        _this2.vy = 0;
	        return _this2;
	    }

	    _createClass(PlayerEntity, [{
	        key: "move",
	        value: function move(keyBuffer) {
	            if (keyBuffer[Input.Button.UP] && keyBuffer[Input.Button.UP] === 1) {
	                this.vy = -1;
	            } else if (keyBuffer[Input.Button.DOWN] && keyBuffer[Input.Button.DOWN] === 1) {
	                this.vy = 1;
	            } else {
	                this.vy = 0;
	            }

	            if (keyBuffer[Input.Button.LEFT] && keyBuffer[Input.Button.LEFT] === 1) {
	                this.vx = -1;
	            } else if (keyBuffer[Input.Button.RIGHT] && keyBuffer[Input.Button.RIGHT] === 1) {
	                this.vx = 1;
	            } else {
	                this.vx = 0;
	            }

	            this.drawer.position.x += this.vx;
	            this.drawer.position.y += this.vy;
	        }
	    }]);

	    return PlayerEntity;
	})(OperatableEntity);

	module.exports = {
	    Base: Entity,
	    Operatable: OperatableEntity,
	    Player: PlayerEntity
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var Input = {
	    Button: {
	        LEFT: 37,
	        UP: 38,
	        RIGHT: 39,
	        DOWN: 40
	    },
	    inputKeyBuffer: [],
	    init: function init(target) {
	        var that = this;
	        document.addEventListener("keydown", function (e) {
	            that.inputKeyBuffer[e.keyCode] = 1;
	        });
	        document.addEventListener("keyup", function (e) {
	            that.inputKeyBuffer[e.keyCode] = 0;
	        });
	    },
	    getBuffer: function getBuffer() {
	        return this.inputKeyBuffer;
	    }
	};

	module.exports = Input;

/***/ }
/******/ ]);