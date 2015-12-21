var Input = {
    Button: {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    },
    inputKeyBuffer: [],
    init(target) {
        var that = this;
        document.addEventListener("keydown", function(e) {
            that.inputKeyBuffer[e.keyCode] = 1;
        });
        document.addEventListener("keyup", function(e) {
            that.inputKeyBuffer[e.keyCode] = 0;
        });
    },
    getBuffer() {
        return this.inputKeyBuffer;
    }
};

module.exports = Input;
