import Npc from "./Npc.js";

// Array of GitHub command questions
const quiz = "GitHub Command Quiz";
const questions = [
    "Which command is used to clone a repository?\n1. git clone\n2. git fork\n3. git copy\n4. git download",
    "Which command is used to add changes to the staging area?\n1. git add\n2. git stage\n3. git commit\n4. git push",
    "Which command is used to commit changes?\n1. git commit\n2. git add\n3. git save\n4. git push",
    "Which command is used to push changes to a remote repository?\n1. git push\n2. git upload\n3. git send\n4. git commit",
    "Which command is used to pull changes from a remote repository?\n1. git pull\n2. git fetch\n3. git receive\n4. git update",
    "Which command is used to check the status of the working directory and staging area?\n1. git status\n2. git check\n3. git info\n4. git log",
    "Which command is used to create a new branch?\n1. git branch\n2. git create-branch\n3. git new-branch\n4. git checkout",
    "Which command is used to switch to a different branch?\n1. git checkout\n2. git switch\n3. git change-branch\n4. git branch",
    "Which command is used to merge branches?\n1. git merge\n2. git combine\n3. git join\n4. git integrate",
    "Which command is used to view the commit history?\n1. git log\n2. git history\n3. git commits\n4. git show"
];

class NpcOctocat extends Npc {
    constructor(data = null) {
        super(data, quiz, questions);
    }

}

export default NpcOctocat;
