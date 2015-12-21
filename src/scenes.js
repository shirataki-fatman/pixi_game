var Entity = require("./entity.js");
var Input = require("./input.js");

const SCENE_INIT = 0;
const SCENE_MAIN = 1;
const SCENE_END  = 2;

const TAG_UNSET = "tagUnset";

class Scene {
    constructor(stage) {
        this.state = SCENE_INIT;
        this.container = new PIXI.Container();
        this.entities = {};
        this._next = null;
        this.isEnd = false;
        this.stage = stage;

        stage.addChild(this.container);
    }
    update() {
        switch(this.state) {
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
    addEntity(entity, tagName) {
        tagName = tagName || TAG_UNSET;
        if (!this.entities[tagName]) {
            this.entities[tagName] = [];
        }
        this.entities[tagName].push(entity);

        this.container.addChild(entity.drawer);
    }
    getContainer() {
        return this.container;
    }
    getNextSceneName() {
        return this._next;
    }
    _init() {
        this.state = SCENE_MAIN;
    }
    _main() {
        for (var tag in this.entities) {
            for (var i in this.entities[tag]) {
                this.entities[tag][i].update();
            }
        }
    }
    _end() {
        this.isEnd = true;

        for (var tag in this.entities) {
            for (var i in this.entities[tag]) {
                this.container.removeChild(this.entities[tag][i].drawer);
            }
        }

        this.stage.removeChild(this.container);
    }
}

class TitleScene extends Scene {
    constructor(stage) {
        super(stage);
    }
    _init() {
        var text = new PIXI.Text('This is a Title Scene', {font : '24px Arial', fill : 0x1010ff, align : 'center'});
        var textEntity = new Entity.Base(text, 320, 240);
        this.addEntity(textEntity);

        super._init();
    }
    _main() {
        super._main();

        var keyBuffer = Input.getBuffer();
        console.log(keyBuffer);

        if (keyBuffer[13] && keyBuffer[13] === 1) {
            this._next = "main";
            this.state = SCENE_END;
        }
    }
}

class MainScene extends Scene {
    constructor(stage) {
        super(stage);
    }
    _init() {
        var text = new PIXI.Text('This is a Main Scene', {font : '24px Arial', fill : 0xff1010, align : 'center'});
        var textEntity = new Entity.Player(text, 320, 240);
        this.addEntity(textEntity);

        super._init();
    }
    _main() {
        super._main();
    }
}

module.exports = {
    Title: TitleScene,
    Main: MainScene
};
