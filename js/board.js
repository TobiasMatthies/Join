setURL('https://gruppe-208.developerakademie.net/Join2/smallest_backend_ever');
let currentDraggedElement;

let tasks = [];

let openedTask;


/**
 * 
 * initializing the board
 */
async function initBoard() {
    await includeHTML();
    await downloadFromServer();
    setCurrentLink(1);
    await getTasks();

    if (tasks) {
        addId();
        saveTasks();
        updateHTML();
    }
}


/**
 * 
 * updating the board
 */
function updateHTML() {
    document.getElementById('ToDo').innerHTML = '';
    document.getElementById('InProgress').innerHTML = '';
    document.getElementById('Testing').innerHTML = '';
    document.getElementById('Done').innerHTML = '';

    tasks.forEach((task) => {
        if (task.status == 'board') {
            document.getElementById(task['boardStatus']).innerHTML += generateTaskHTML(task);
        }
    });

    /*let allTasksWithCategory = tasks.filter(t => t['boardStatus'] == category);

    document.getElementById(category).innerHTML = '';

    for (let i = 0; i < allTasksWithCategory.length; i++) {
        let task = allTasksWithCategory[i];

        document.getElementById(category).innerHTML += generateTaskHTML(task);
    }*/
}


/**
 * 
 * getting all tasks with the status "board"
 */
function getTasks() {
    let tasksAsString = backend.getItem('tasks');
    if(tasksAsString) {
        tasks = JSON.parse(tasksAsString);
    } else {
        backend.setItem('tasks', '[]');
        tasks = [];
    }

}


/**
 * 
 * adding an id to ever task
 */
function addId() {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i]['id'] = i;
    }
}

/**
 * 
 * task html template
 * @param {object} task 
 * @returns 
 */
function generateTaskHTML(task) {
    let id = task['id'];

    return /*html*/`
    <div draggable="true" ondragstart="startDragging(${id})" class="todo" id="task${id}">
        <span id="task_heading${id}">${task['title']}</span>
        <img onclick="showMore(${id})" src="../img/showMore.svg" class="show_more" id="show_more${id}">

        <div class="fullscreen_infos d-none" id="fullscreen_info${id}">
          <div class="fullscreen_row" id="urgency${id}">
            <span>Urgency:</span>
            <span>${task['urgency']}</span>
          </div>

          <div class="fullscreen_row" id="category${id}">
            <span>Category:</span>
            <span>${task['category']}</span>
          </div>

          <div class="fullscreen_row" id="due${id}">
            <span>Due:</span>
            <span>${task['date']}</span>
          </div>

          <div class="fullscreen_row" id="description${id}">
            <span>Description:</span>
            <p>${task['description']}</p>
          </div>
        </div>
    </div>`;
}


/**
 * 
 * defining the current dragged element
 * @param {string} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveToBox(category) {
    tasks[currentDraggedElement]['boardStatus'] = category;
    saveTasks();
    updateHTML();
}


function addHoverEffect(id) {
    document.getElementById(id).classList.add('hover');
}


function removeHoverEffect(id) {
    document.getElementById(id).classList.remove('hover');
}


function saveTasks() {
    backend.setItem('tasks', JSON.stringify(tasks));
}


function showMore(id) {
    if (openedTask == undefined) {
        openedTask = id;
        document.getElementById('fullscreen_background').classList.remove('d-none');
        document.getElementById('task' + id).classList.add('fullscreen');
        document.getElementById('task_heading' + id).classList.add('fullscreen_heading');
        document.getElementById('fullscreen_info' + id).classList.remove('d-none');
        document.getElementById('show_more' + id).src = '../img/close.svg';
    } else {
        leaveFullscreen();
    }
}


function leaveFullscreen() {
    document.getElementById('task' + openedTask).classList.remove('fullscreen');
    document.getElementById('task_heading' + openedTask).classList.remove('fullscreen_heading');
    document.getElementById('fullscreen_background').classList.add('d-none');
    document.getElementById('fullscreen_info' + openedTask).classList.add('d-none');
    document.getElementById('show_more' + openedTask).src = '../img/showMore.svg';
    openedTask = undefined;
}