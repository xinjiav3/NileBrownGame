import {javaURI} from '{{site.baseurl}}/assets/js/api/config.js';

let assignment = null;
let currentQueue = [];

document.getElementById('addQueue').addEventListener('click', addToQueue);
document.getElementById('removeQueue').addEventListener('click', removeFromQueue);
document.getElementById('beginTimer').addEventListener('click', startTimer);
document.getElementById('resetQueue').addEventListener('click', resetQueue);

let timerInterval;

async function fetchQueue() {
    const response = await fetch(`${javaURI}/api/assignments/getQueue/${assignment}`);
    if (response.ok) {
        const data = await response.json();
        updateQueueDisplay(data);
        updateBeginTimerButton();
    }
}

async function addToQueue() {
    const person = ["John Mortensen"];
    await fetch(`${javaURI}/api/assignments/addQueue/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    });
    fetchQueue();
}

async function removeFromQueue() {
    const person = ["John Mortensen"];
    await fetch(`${javaURI}/api/assignments/removeQueue/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    });
    fetchQueue();
}

function startTimer() {
    let time = 10;
    timerInterval = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timerDisplay').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        time--;
        if (time < 0) {
            clearInterval(timerInterval);
            moveToDoneQueue();
        }
    }, 1000);
}

async function moveToDoneQueue() {
    const firstPerson = [currentQueue[0]];
    await fetch(`${javaURI}/api/assignments/doneQueue/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firstPerson)
    });
    fetchQueue();
}

async function resetQueue() {
    await fetch(`${javaURI}/api/assignments/resetQueue/${assignment}`, {
        method: 'PUT'
    });
    fetchQueue();
}

function updateQueueDisplay(queue) {
    currentQueue = queue.queue;

    const notGoneList = document.getElementById('notGoneList');
    const queueList = document.getElementById('queueList');
    const doneList = document.getElementById('doneList');

    notGoneList.innerHTML = queue.haventGone.map(person => `<div class="card">${person}</div>`).join('');
    queueList.innerHTML = queue.queue.map(person => `<div class="card">${person}</div>`).join('');
    doneList.innerHTML = queue.done.map(person => `<div class="card">${person}</div>`).join('');
}

document.getElementById('initializeQueue').addEventListener('click', initializeQueue);

async function fetchAssignments() {
    const response = await fetch(`${javaURI}/api/assignments/getAssignments`);
    if (response.ok) {
        const assignments = await response.json();
        const dropdown = document.getElementById('assignmentDropdown');
        dropdown.innerHTML = assignments.map(assignment =>
            `<option value="${assignment.assignmentId}">${assignment.name}</option>`
        ).join('');
    }
}

async function fetchPeople() {
    const response = await fetch(`${javaURI}/api/people`);
    if (response.ok) {
        const people = await response.json();
        return people.map(person => person.name);
    }
    return [];
}

async function initializeQueue() {
    const assignmentId = document.getElementById('assignmentDropdown').value;
    const peopleList = await fetchPeople();

    await fetch(`${javaURI}/api/assignments/initQueue/${assignmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(peopleList)
    });
    assignment = assignmentId;
    fetchQueue();
}

function updateBeginTimerButton() {
    const beginTimerButton = document.getElementById('beginTimer');
    // Check if the current user is at the front of the queue
    if (currentQueue[0] === currentUser) {
        beginTimerButton.classList.remove('disabled-hover');
        beginTimerButton.disabled = false;
    } else {
        beginTimerButton.classList.add('disabled-hover');
        beginTimerButton.disabled = true;
    }
}

fetchAssignments();
fetchQueue();