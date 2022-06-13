let storedTasks = [];


async function initBacklog() {
    await includeHTML();
    loadTasks();
    console.log(storedTasks);
    showTasksInBacklog();
    setCurrentLink(2);
}

function showTasksInBacklog() {
    document.getElementById('backlog-container').innerHTML = '';
    for(i = 0; i < storedTasks.length; i++) {
        if(storedTasks[i]['status'] == 'backlog')
        document.getElementById('backlog-container').innerHTML += tasksInBacklogHTML(i);
        setMarkerColor(i);
    }
    
}

function tasksInBacklogHTML(i) {
    return `
    <div class="task-container">
        <div  id="${i}" class="urgency-marker"></div>
        <p class="title-width margin-auto">${storedTasks[i]['title']}</p>
        <p class="category-width margin-auto">${storedTasks[i]['category']}</p>
        <p class="details-width margin-auto">${storedTasks[i]['description']}</p>
        <img onclick="pinToBoard(${i})" class="icons board" src="/img/board.svg">
        <img onclick="pushToTrash(${i})" class="icons trash" src="/img/trash.svg">
    </div>`;
}

function setMarkerColor(i) {
    let marker = document.getElementById(i);
    let task = storedTasks[i];

    if(marker && task['urgency'] == 'HIGH') {
        marker.style.backgroundColor = 'red';
    }

    if(marker && task['urgency'] == 'MEDIUM') {
        marker.style.backgroundColor = 'yellow';
    }

    if(marker && task['urgency'] == 'LOW') {
        marker.style.backgroundColor = 'green';
    }
}

function pinToBoard(i) {
    storedTasks[i]['status'] = 'board';
    showTasksInBacklog();
}

function pushToTrash(i) {
    storedTasks[i]['status'] = 'trash';
    showTasksInBacklog();
}


























function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        storedTasks = JSON.parse(savedTasks);
    }
}

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

