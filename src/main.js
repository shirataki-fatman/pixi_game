var Scenes = require("./scenes.js");
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

requestAnimationFrame(mainLoop);

var scene = new Scenes.Main(stage);

function mainLoop(timestamp) {
    requestAnimationFrame(mainLoop);

    scene.update();

    renderer.render(stage);
}
