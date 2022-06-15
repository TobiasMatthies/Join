

let dropDownStatus = [false, false];
let ids = ['categories', 'urgency_list'];
let tasks = [];


/**
 * 
 * initializing the page
 */
async function initAddATask() {
    await includeHTML();
    loadTasks();
    getCurrentDate();
    setCurrentLink(3);
}


/**
 * 
 * loading the saved tasks
 */
function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    } else {
        tasks = [];
    }
}


/**
 * 
 * settting an item in local storage
 * @param {string} key 
 * @param {object} value 
 */
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


/**
 * 
 * creating a new task
 * -getting the values;
 * -checking the values;
 * -if values are valid pushing the task
 * -showing succes;
 * -else showing the warning;
 */
function createTask() {
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let urgency = document.getElementById('urgency').value;
    let image = document.getElementById('selected_image').src;

    if (title.length > 0 && category.length > 0 && urgency.length > 0) {
        tasks.push(taskTemplate(title, category, description, date, urgency, image));
        console.log(tasks);
        setItem('tasks', tasks);
        showInfo('succes');
        resetValues();
    } else {
        showInfo('warning');
    }
}


/**
 * 
 * template for each task
 * @param {string} title 
 * @param {string} category 
 * @param {string} description 
 * @param {string} date 
 * @param {string} urgency 
 * @param {string} image 
 * @returns 
 */
function taskTemplate(title, category, description, date, urgency, image) {
    return {
        'title': title,
        'category': category,
        'description': description,
        'date': date,
        'urgency': urgency,
        'image': image,
        'status': 'backlog',
        'boardStatus': 'ToDo',
        'id': ''    
    }
}


/**
 * 
 * resetting all the values and closing all options
 */
function resetValues() {
    document.getElementById('title').value = '';
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('urgency').value = '';

    getCurrentDate();
    closeOptions();
}


/**
 * 
 * showing an info snackbar for 4 seconds and hiding it again
 * @param {string} id 
 */
function showInfo(id) {
    document.getElementById(id).classList.remove('d-none');

    setTimeout(() => {
        document.getElementById(id).classList.add('d-none');
    }, 4000);
}


/**
 * 
 * setting the selected value for the input field in question
 * @param {string} id 
 * @param {string} selectedValue 
 */
function setValue(id, selectedValue) {
    document.getElementById(id).value = selectedValue;
}


/**
 * 
 * getting the full current date and setting it as the value of the date input
 */
function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('date').value = today;
}


/**
 * 
 * showing the element with the id given in the parameter:
 * @param {string} id 
 */
function show(id) {
    document.getElementById(id).classList.remove('d-none')
}


/**
 * 
 * hiding the element with the id given in the parameter:
 * @param {string} id 
 */
function hide(id) {
    document.getElementById(id).classList.add('d-none')
}


/**
 * 
 * -swap the status of the element in "dropDownMenus" at position "i"
 * -if the element is hidden, it gets shown; else it gets hidden
 * @param {number} i
 * @param {string} id
 */
function setStatus(i, id) {
    if (dropDownStatus[i]) {
        dropDownStatus[i] = false;
        hide(id);
    } else {
        dropDownStatus[i] = true;
        show(id);
        event.stopPropagation();
    }
}


/**
 * 
 * iterating through the array "dropdownStatus". If menu is opened (== true) it gets closed
 */
function closeOptions() {
    for (let i = 0; i < dropDownStatus.length; i++) {
        let id = ids[i];

        if (dropDownStatus[i]) {
            document.getElementById(id).classList.add('d-none');
            dropDownStatus[i] = false;

        }
    }
}


/**
 * 
 * displaying the selected image
 * @param {*} input 
 */
function readURL(input) {
    if (input.files && input.files[0]) {

        let reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector("#selected_image").setAttribute("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}