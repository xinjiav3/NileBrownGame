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

    handleKeyDown(NULL) {
        return 0;
    }

    handleKeyUp(NULL) {
        return 0;
    }
}

export default NPC;