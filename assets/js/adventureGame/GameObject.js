import GameEnv from './GameEnv.js';

/**
 * The GameObject class serves as a base class for all game objects.
 * It mimics an interface by defining abstract methods that must be implemented
 * by any subclass. This ensures that all game objects have a consistent interface
 * and can be managed uniformly within the game loop.
 * 
 * @class GameObject
 * @method draw - Draws the object on the canvas. Must be implemented by subclasses.
 * @method update - Updates the object's state. Must be implemented by subclasses.
 * @method resize - Resizes the object based on the canvas size. Must be implemented by subclasses.
 * @method destroy - Removes the object from the game environment. Must be implemented by subclasses.
 */
class GameObject {
    /**
     * Constructor for the GameObject class.
     * Throws an error if an attempt is made to instantiate this class directly,
     * as it is intended to be used as a base class.
     */
    constructor() {
        if (new.target === GameObject) {
            throw new TypeError("Cannot construct GameObject instances directly");
        }
    }

    /**
     * Draws the object on the canvas.
     * This method must be implemented by subclasses.
     * @abstract
     */
    draw() {
        throw new Error("Method 'draw()' must be implemented.");
    }

    /**
     * Updates the object's state.
     * This method must be implemented by subclasses.
     * @abstract
     */
    update() {
        throw new Error("Method 'update()' must be implemented.");
    }

    /**
     * Resizes the object based on the canvas size.
     * This method must be implemented by subclasses.
     * @abstract
     */
    resize() {
        throw new Error("Method 'resize()' must be implemented.");
    }

    /**
     * Removes the object from the game environment.
     * This method must be implemented by subclasses.
     * @abstract
     */
    destroy() {
        throw new Error("Method 'destroy()' must be implemented.");
    }

    /**
     * Watch for these collision events 
     */
    handleCollisionStart() {
        throw new Error("Method 'handleCollisionStart()' must be implemented.");
    }

    /**
     * Take these collision actions 
     */
    handleCollisionAction(objectID) {
        throw new Error("Method 'handleCollisionAction()' must be implemented.");
    }

    /** Collision checks
     * uses Player isCollision to detect hit
     * calls collisionAction on hit
     */
    collisionChecks() {
        for (var gameObj of GameEnv.gameObjects){
            if (gameObj.canvas && this != gameObj) {
                this.isCollision(gameObj);
                if (this.collisionData.hit){
                    this.collisionAction();
                }
            }
        }
    }

    /** Collision detection method
     * usage: if (object.isCollision(platform)) { // action }
     */
    isCollision(other) {
        // Bounding rectangles from Canvas
        const thisRect = this.canvas.getBoundingClientRect();
        const otherRect = other.canvas.getBoundingClientRect();

        // Calculate hitbox constants for this object
        const thisWidthReduction = thisRect.width * (this.hitbox?.widthPercentage || 0.0);
        const thisHeightReduction = thisRect.height * (this.hitbox?.heightPercentage || 0.0);

        // Calculate hitbox constants for other object
        const otherWidthReduction = otherRect.width * (other.hitbox?.widthPercentage || 0.0);
        const otherHeightReduction = otherRect.height * (other.hitbox?.heightPercentage || 0.0);

        // Build hitbox by subtracting reductions from the left, right, and top
        const thisLeft = thisRect.left + thisWidthReduction;
        const thisTop = thisRect.top + thisHeightReduction;
        const thisRight = thisRect.right - thisWidthReduction;
        const thisBottom = thisRect.bottom;

        const otherLeft = otherRect.left + otherWidthReduction;
        const otherTop = otherRect.top + otherHeightReduction;
        const otherRight = otherRect.right - otherWidthReduction;
        const otherBottom = otherRect.bottom;

        // Determine hit and touch points of hit
        const hit = (
            thisLeft < otherRight &&
            thisRight > otherLeft &&
            thisTop < otherBottom &&
            thisBottom > otherTop
        );

        const touchPoints = {
            this: {
                id: this.canvas.id,
                top: thisBottom > otherTop && thisTop < otherTop,
                bottom: thisTop < otherBottom && thisBottom > otherBottom,
                left: thisRight > otherLeft && thisLeft < otherLeft,
                right: thisLeft < otherRight && thisRight > otherRight,
            },
            other: {
                id: other.canvas.id,
                top: otherBottom > thisTop && otherTop < thisTop,
                bottom: otherTop < thisBottom && otherBottom > thisBottom,
                left: otherRight > thisLeft && otherLeft < thisLeft,
                right: otherLeft < thisRight && otherRight > thisRight,
            },
        };

        this.collisionData = { hit, touchPoints };

    }

    /**
     * Collision action handler for the Player.
     * @override
     */
    collisionAction() {
        this.handleCollisionStart();
        this.handleCollisionEnd();
        this.setActiveCollision();
        this.handleReaction();
    }
    

    /**
     * Update the collisions array when player is touching the object being watched
     * @param {*} objectID 
     */
    handleCollisionEvent(objectID) {
        // check if player is touching the "collisionType" object
        if (this.collisionData.touchPoints.other.id === objectID) {
            // check if the collision type is not already in the collisions array
            if (!this.state.collisionEvents.includes(objectID)) {
                // add the collisionType to the collisions array, making it the current collision
                this.state.collisionEvents.push(objectID);
                this.handleCollisionAction(objectID) 
            }
        }
    }

    /**
     * Tears down Player collision events
     */
    handleCollisionEnd() {
        if (this.state.collisionEvents.includes(this.state.collision) && this.collisionData.touchPoints.other.id !== this.state.collision ) {
            // filter out the collision from the array, or in other words, remove the collision
            this.state.collisionEvents = this.state.collisionEvents.filter(collision => collision !== this.state.collision);
        }
    }
    
    /**
     * Sets collision state from most recent collision in collisions array
     */
    setActiveCollision() {
        // check array for any remaining collisions
        if (this.state.collisionEvents.length > 0) {
            // the array contains collisions, set the the last collision in the array
            this.state.collision = this.state.collisionEvents[this.state.collisionEvents.length - 1];
        } else {
            // the array is empty, set to empty (default state)
            this.state.collision = "";
        }
    }
    
    /**
     * gameloop: Handles Player reaction / state updates to the collision
     */
    // Assuming you have some kind of input handling system

    handleReaction() {
        // handle player reaction based on collision type
        if (this.state.collision) {
            const touchPoints = this.collisionData.touchPoints.this;

            // Reset movement to allow all directions initially
            this.state.movement = { up: true, down: true, left: true, right: true };

            if (touchPoints.top) {
                this.state.movement.down = false;
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                }
            }

            if (touchPoints.bottom) {
                this.state.movement.up = false;
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                }
            }

            if (touchPoints.right) {
                this.state.movement.left = false;
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                }
            }

            if (touchPoints.left) {
                this.state.movement.right = false;
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                }
            }
        }
        
    }
    
}

export default GameObject;