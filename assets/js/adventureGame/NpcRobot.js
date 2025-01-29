import Npc from "./Npc.js";

// Array of Linux command questions
const quiz = "Jupyter Notebook Command Quiz";
const questions = [
    "Which shortcut is used to run a cell in Jupyter Notebook?\n1. Shift + Enter\n2. Ctrl + Enter\n3. Alt + Enter\n4. Tab + Enter",
    "Which shortcut adds a new cell above the current cell?\n1. A\n2. B\n3. C\n4. D",
    "Which shortcut adds a new cell below the current cell?\n1. B\n2. A\n3. C\n4. D",
    "Which shortcut changes a cell to Markdown format?\n1. M\n2. Y\n3. R\n4. K",
    "Which shortcut changes a cell to Code format?\n1. Y\n2. M\n3. C\n4. D",
    "Which shortcut deletes the current cell?\n1. D, D\n2. X\n3. Del\n4. Ctrl + D",
    "Which shortcut saves the current notebook?\n1. Ctrl + S\n2. Alt + S\n3. Shift + S\n4. Tab + S",
    "Which shortcut restarts the kernel?\n1. 0, 0\n2. R, R\n3. K, K\n4. Shift + R",
    "Which shortcut interrupts the kernel?\n1. I, I\n2. Ctrl + C\n3. Shift + I\n4. Alt + I",
    "Which shortcut toggles line numbers in a cell?\n1. L\n2. N\n3. T\n4. G"
];
class NpcRobot extends Npc {
    constructor(data = null) {
        super(data, quiz, questions);
    }

}

export default NpcRobot;
