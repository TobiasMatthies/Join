let currentDraggedElement;

let tasks = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'ToDo'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'Testing'
}, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'InProgress'
}];


async function initBoard() {
    await includeHTML();
    setCurrentLink(1);
    updateHTML();
}


function updateHTML() {
    filter('ToDo');
    filter('InProgress');
    filter('Testing');
    filter('Done');
}


function filter(category) {
    let allTasksWithCategory = tasks.filter(t => t['category'] == category);

    document.getElementById(category).innerHTML = '';

    for (let i = 0; i < allTasksWithCategory.length; i++) {
        let task = allTasksWithCategory[i];

        document.getElementById(category).innerHTML += generateTodoHTML(task);
    }
}


function generateTodoHTML(todo) {
    return /*html*/`<div draggable="true" ondragstart="startDragging(${todo['id']})" class="todo">${todo['title']}</div>`;
}


function startDragging(id) {
   currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveToBox(category) {
    tasks[currentDraggedElement]['category'] = category;
    updateHTML();
}


function addHoverEffect(id) {
    document.getElementById(id).classList.add('hover');
}


function removeHoverEffect(id) {
    document.getElementById(id).classList.remove('hover');
}