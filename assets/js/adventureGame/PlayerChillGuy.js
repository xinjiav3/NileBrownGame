import Player1 from './Player1.js';

class PlayerChillGuy extends Player1 {
    constructor(data = null) {
        super(data);
    }

    /**
     * gameLoop: Watch for Player collision events 
     */
    handleCollisionStart() {
        this.handleCollisionEvent("Octocat");
        this.handleCollisionEvent("Tux");
    }

    handleCollisionAction(objectID) {
        switch (objectID) {
            case "Octocat":
                alert("Hi I am Octocat! I am the GitHub code code code collaboration mascot");
                break;
            case "Tux":
                alert("Hi I am Tux, the Linux mascot.  I am very happy to spend some shell time with you!"); 
                break;
        }
    }
    
}

export default PlayerChillGuy;