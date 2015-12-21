var Input = require("./input.js");

class Entity {
    constructor(drawer, x, y) {
        this.drawer = drawer;
        this.drawer.anchor.x = 0.5;
        this.drawer.anchor.y = 0.5;
        this.drawer.position.x = x;
        this.drawer.position.y = y;
    }
    update() {
        if (this.drawer.update) {
            this.drawer.update();
        }
    }
}

class OperatableEntity extends Entity {
    constructor(drawer, x, y) {
        super(drawer, x, y);
    }
    update() {
        this.move(Input.getBuffer());
        super.update();
    }
    move(keyBuffer) {
    }
}

class PlayerEntity extends OperatableEntity {
    constructor(drawer, x, y) {
        super(drawer, x, y);
        this.vx = 0;
        this.vy = 0;
    }
    move(keyBuffer) {
        if (keyBuffer[Input.Button.UP] && keyBuffer[Input.Button.UP] === 1) {
            this.vy = -1;
        }
        else if (keyBuffer[Input.Button.DOWN] && keyBuffer[Input.Button.DOWN] === 1) {
            this.vy = 1;
        }
        else {
            this.vy = 0;
        }

        if (keyBuffer[Input.Button.LEFT] && keyBuffer[Input.Button.LEFT] === 1) {
            this.vx = -1;
        }
        else if (keyBuffer[Input.Button.RIGHT] && keyBuffer[Input.Button.RIGHT] === 1) {
            this.vx = 1;
        }
        else {
            this.vx = 0;
        }

        this.drawer.position.x += this.vx;
        this.drawer.position.y += this.vy;
    }
}

module.exports = {
    Base: Entity,
    Operatable: OperatableEntity,
    Player: PlayerEntity,
};
