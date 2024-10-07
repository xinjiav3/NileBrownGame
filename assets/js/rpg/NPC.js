import Player from "./Player.js";

class NPC extends Player {
    constructor(data = null) {
        super(data);
    }

    update() {
        super.update();
    }

    resize() {
        super.resize();
    }

    handleKeyDown({ keyCode }) {
        // Handle if player is nearby
        switch (keyCode) {
            case 32: // space key
                console.log("NPC HELLO");
                break;
        }
    }

    handleKeyUp(NULL) {
        // no action
    }
}

export default NPC;