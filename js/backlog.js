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
    }
    
}

function tasksInBacklogHTML() {
    return `
    <div class="task-container">
        <p class="title-width margin-auto">${storedTasks[i]['title']}</p>
        <p class="category-width margin-auto">${storedTasks[i]['category']}</p>
        <p class="details-width margin-auto">${storedTasks[i]['description']}</p>
    </div>`;
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

