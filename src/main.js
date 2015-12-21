var SceneManager = require("./sceneManager.js");
var Input = require("./input.js");

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
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
