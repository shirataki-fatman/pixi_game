var Scene = require("./scenes.js");

var SceneManager = {
    _scenes: {
        main: Scene.Main
    },
    init(stage) {
        this._stage = stage;
    },
    start(sceneName) {
        this.currentScene = new this._scenes[sceneName](this._stage);
    },
    update() {
        this.currentScene.update();
    }
};

module.exports = SceneManager;
