let assignment = null;
let currentQueue = [];

document.getElementById('addQueue').addEventListener('click', addToQueue);
document.getElementById('removeQueue').addEventListener('click', removeFromQueue);
document.getElementById('beginTimer').addEventListener('click', startTimer);
document.getElementById('resetQueue').addEventListener('click', resetQueue);

let timerInterval;

const URL = "http://localhost:8082" + "/api/assignments/"
console.log(URL)

async function fetchQueue() {
    const response = await fetch(URL + `getQueue/${assignment}`);
    if (response.ok) {
        const data = await response.json();
        updateQueueDisplay(data);
    }
}

async function addToQueue() {
    const person = ["John Mortensen"];
    await fetch(URL + `addQueue/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    });
    fetchQueue();
}

async function removeFromQueue() {
    const person = ["John Mortensen"];
    await fetch(URL + `removeQueue/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    });
    fetchQueue();
}

function startTimer() {
    console.log("Timer Started")
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
    await fetch(URL + `doneQueue/${assignment}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firstPerson)
    });
    fetchQueue();
}

async function resetQueue() {
    await fetch(URL + `resetQueue/${assignment}`, {
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
    console.log(URL + 'debug')
    const response = await fetch(URL + 'debug');
    if (response.ok) {
        const assignments = await response.json();
        const dropdown = document.getElementById('assignmentDropdown');
        dropdown.innerHTML = assignments.map(assignment =>
            `<option value="${assignment.id}">${assignment.name}</option>`
        ).join('');
    }
}

// need to wait for function to only fetch from certain period
async function fetchPeople() {
    const response = await fetch('http://localhost:8085/api/people');
    if (response.ok) {
        const people = await response.json();
        return people.map(person => person.name);
    }
    return [];
}

async function initializeQueue() {
    const assignmentId = document.getElementById('assignmentDropdown').value;
    // const peopleList = await fetchPeople();

    peopleList = ["John Mortensen", "Student 1", "Student 2"]

    await fetch(URL + `initQueue/${assignmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(peopleList)
    });
    assignment = assignmentId;
    fetchQueue();
}

fetchAssignments();
fetchQueue();