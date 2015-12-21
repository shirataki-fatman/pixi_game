var Scene = require("./scenes.js");

var SceneManager = {
    _scenes: {
        title: Scene.Title,
        main: Scene.Main,
    },
    init(stage) {
        this._stage = stage;
    },
    start(sceneName) {
        this.currentScene = new this._scenes[sceneName](this._stage);
    },
    update() {
        this.currentScene.update();
        if (this.currentScene.isEnd) {
            var nextSceneName = this.currentScene.getNextSceneName();
            this.start(nextSceneName);
        }
    }
};

module.exports = SceneManager;
