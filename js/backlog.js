let storedTasks = [];


async function initBacklog() {
    await includeHTML();
    loadTasks();
    console.log(storedTasks);
    showTasksInBacklog();
    setCurrentLink(2);
}

function showTasksInBacklog() {
    for(i = 0; i < storedTasks.length; i++) {
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
    </div>`;
}

function setMarkerColor(i) {
    let marker = document.getElementById(i);
    let task = storedTasks[i];

    if(task['urgency'] == 'HIGH') {
        marker.style.backgroundColor = 'red';
    }

    if(task['urgency'] == 'MEDIUM') {
        marker.style.backgroundColor = 'yellow';
    }

    if(task['urgency'] == 'LOW') {
        marker.style.backgroundColor = 'green';
    }
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

