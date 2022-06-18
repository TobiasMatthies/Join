setURL('https://gruppe-208.developerakademie.net/Join2/smallest_backend_ever');

let storedTasks = [];



async function initTrash() {
    await includeHTML();
    await downloadFromServer();
    loadTasks();
    console.log(storedTasks);
    showTasksInTrash();
    setCurrentLink(4);
}

function showTasksInTrash() {
    document.getElementById('trash-container').innerHTML = '';
    for(i = 0; i < storedTasks.length; i++) {
        if(storedTasks[i]['status'] == 'trash')
        document.getElementById('trash-container').innerHTML += tasksInTrashHTML(i);
        setMarkerColor(i);
    }    
}

function tasksInTrashHTML(i) {
    return `
    <div class="task-container">
        <div  id="${i}" class="urgency-marker"></div>
        <p class="display"><b>Title:</b></p><p class="title-width margin-auto">${storedTasks[i]['title']}</p>
        <p class="display"><b>Category:</b><p class="category-width margin-auto">${storedTasks[i]['category']}</p>
        <p class="display"><b>Details:</b><p class="details-width margin-auto">${storedTasks[i]['description']}</p>
        <img title="Push the task to the backlog!" onclick="pushToBacklog(${i})" class="icons board" src="/img/backlog.svg">
        <img title="Delete the task forever!" onclick="deleteForEver(${i})" class="icons trash" src="/img/delete-forever.svg">
    </div>`;
}

function setMarkerColor(i) {
    let marker = document.getElementById(i);
    let task = storedTasks[i];

    if(marker && task['urgency'] == 'HIGH') {
        marker.style.backgroundColor = '#d70b04';
    }

    if(marker && task['urgency'] == 'MEDIUM') {
        marker.style.backgroundColor = '#cfd53d';
    }

    if(marker && task['urgency'] == 'LOW') {
        marker.style.backgroundColor = '#209c05';
    }
}

function pushToBacklog(i) {
    storedTasks[i]['status'] = 'backlog';
    setItem('tasks', storedTasks);
    showTasksInTrash();
}

function deleteForEver(i) {
    storedTasks.splice(i, 1);
    setItem('tasks', storedTasks);
    showTasksInTrash();
}

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


























function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        storedTasks = JSON.parse(savedTasks);
    } else {
        storedTasks = [];
    }
}

