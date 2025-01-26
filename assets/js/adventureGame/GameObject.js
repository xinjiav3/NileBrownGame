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

    
}

export default GameObject;