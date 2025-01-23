import Npc from "./Npc.js";

// Array of Linux command questions
const quiz = "Linux Command Quiz";
const questions = [
    "Which command is used to create a new directory?\n1. mkdir\n2. rmdir\n3. touch\n4. rm",
    "Which command is used to change the current directory?\n1. cd\n2. ls\n3. pwd\n4. mv",
    "Which command lists the contents of a directory?\n1. ls\n2. cd\n3. mkdir\n4. rm",
    "Which command is used to remove a file?\n1. rm\n2. rmdir\n3. del\n4. erase",
    "Which command is used to display the current directory path?\n1. pwd\n2. path\n3. cd\n4. dir",
    "Which command is used to run a script?\n1. ./script.sh\n2. run script.sh\n3. exec script.sh\n4. start script.sh",
    "Which command is used to copy files?\n1. cp\n2. mv\n3. copy\n4. duplicate",
    "Which command is used to move or rename files?\n1. mv\n2. cp\n3. move\n4. rename",
    "Which command is used to display the contents of a file?\n1. cat\n2. show\n3. display\n4. view",
    "Which command is used to create an empty file?\n1. touch\n2. create\n3. new\n4. mkfile"
];
class NpcTux extends Npc {
    constructor(data = null) {
        super(data, quiz, questions);
    }

}

export default NpcTux;
