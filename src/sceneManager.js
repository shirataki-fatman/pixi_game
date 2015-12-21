var Scene = require("./scenes.js");

var SceneManager = {
    _scenes: {
        main: Scene.Main
    },
    init(stage) {
        this._stage = stage;
    },
    start(sceneName) {
        console.log(this._stage);
        this.currentScene = new this._scenes[sceneName](this._stage);
    },
    update() {
        this.currentScene.update();
    }
};

module.exports = SceneManager;
