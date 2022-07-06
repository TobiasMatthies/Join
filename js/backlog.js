setURL('https://gruppe-208.developerakademie.net/Join2/smallest_backend_ever');

let storedTasks = [];




async function initBacklog() {
    await includeHTML();
    await downloadFromServer();
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
        <p class="display"><b>Title:</b></p><p class="title-width margin-auto">${storedTasks[i]['title']}</p>
        <p class="display"><b>Category:</b></p><p class="category-width margin-auto">${storedTasks[i]['category']}</p>
        <p class="display"><b>Details:</b></p><p class="details-width margin-auto">${storedTasks[i]['description']}</p>
        <img title="Pin the task to the board!" onclick="pinToBoard(${i})" class="icons board" src="/img/board.svg">
        <img title="Put the task in the trash!" onclick="pushToTrash(${i})" class="icons trash" src="/img/trash.svg">
    </div>`;
}

function setMarkerColor(i) {
    let marker = document.getElementById(i);
    let task = storedTasks[i];

    if(marker && task['urgency'] == 'HIGH') {
        marker.style.backgroundColor = '#d70b04';
    } else

    if(marker && task['urgency'] == 'MEDIUM') {
        marker.style.backgroundColor = '#cfd53d';
    } else

    if(marker && task['urgency'] == 'LOW') {
        marker.style.backgroundColor = '#209c05';
    } else {
        if(marker) {
        marker.style.backgroundColor = '#8ca887';
        }
    }
}

function pinToBoard(i) {
    showAlert('board');
    storedTasks[i]['status'] = 'board';
    setItem('tasks', storedTasks);
    showTasksInBacklog();
}

function pushToTrash(i) {
    showAlert('trash');
    storedTasks[i]['status'] = 'trash';
    setItem('tasks', storedTasks);
    showTasksInBacklog();
}

function showAlert(section) {
    document.getElementById(`alert-${section}`).classList.remove('opacity-zero');
    setTimeout(
        function blendOut() {
        document.getElementById(`alert-${section}`).classList.add('opacity-zero');
        }
    , 1000);
}

function setItem(key, value) {
    backend.setItem(key, JSON.stringify(value));
}

function loadTasks() {
    let savedTasks = backend.getItem('tasks');

    if (savedTasks) {
        storedTasks = JSON.parse(savedTasks);
    } else {
        backend.setItem('tasks', '[]');
        storedTasks = [];
    }
}

