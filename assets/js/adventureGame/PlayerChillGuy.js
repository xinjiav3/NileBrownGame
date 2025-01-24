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
        if (objectID === "Octocat") {
            alert("Hi I am Octocat! I am the friendly GitHub mascot.  Code, Code, Code!");
        } else if (objectID === "Tux") {
            alert("Hi I am Tux, the Linux mascot.  I am very happy to spend some shell time with you!"); 
        }
        // Empty method to be overridden by subclasses if needed
    }
    
}

export default PlayerChillGuy;