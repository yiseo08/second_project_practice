let taskInput = document.getElementById('task-input');
//console.log('taskInput');
let addButton = document.getElementById('add-button');
//console.log('addButton');
let taskList = [];
let filterList = [];
let tabs = document.querySelectorAll('.task-tabs div');
console.log(tabs);
let mode = '';
for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function (event) {
        filter(event);
    })
}

addButton.addEventListener('click', addTask);
function addTask() {
    let taskValue = taskInput.value;
    let task = {
        id: randomIdGenerate(),
        taskContent: taskValue,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}
function render() {
    let list = [];
    if (mode == 'all') {
        list = taskList;
    } else if (mode == 'ongoing') {
        list == filterList;
    }
    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == true) {
            resultHTML += `<div class = "task">
            <div class = "task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class = "task">
            <span>${list[i].taskContent}</span>
            <div>
                <button onclick="toggleComplete('${list[i].id}')">Check</button>
                <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}
function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}
function deleteTask(id) {
    //console.log('삭제');
    for (let i = 0; i < taskList.length; i++) {
        if(taskList[i].id === id) {
            taskList.splice(i, 1)
            break;
        }
    }
    render();
    console.log(taskList);  
}
function filter (event) {
    mode = event.target.id;
    filterList = [];
    //console.log('check', event.target.id);
    if (mode == 'all') {
        render();
    }  else if (mode == 'ongoing') {
        for (let i =0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i])
            }
        }
    } 
    taskList = filterList;
    render();
    console.log(filterList);
}
function randomIdGenerate() {
    return Math.random().toString(36).substr(2, 16);
}
