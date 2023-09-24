
const tasklist = document.querySelector(" #container ul");
const addbtn = document.querySelector(" .fa.fa-plus");
const input = document.querySelector("input");
const bin = document.querySelectorAll(" .ul");
const clear = document.querySelector(" .footer");

 loadeventlistener();

 function loadeventlistener(){

    document.addEventListener("DOMContentLoaded" , gettask);

    addbtn.addEventListener("click", add);

    bin.forEach(function (item) {
    item.addEventListener("click", deleted);
    });

    clear.addEventListener("click" , clearing);
 }

/*************************************************** */

function gettask(){
     let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach( function (task){
         const li = document.createElement("li");
        const span = document.createElement("span");
        const i = document.createElement("i");

        i.className = "fas fa-times text-danger mr-auto delete-item";
        span.appendChild(i);
        li.appendChild(span);
        li.appendChild(document.createTextNode(task));
        tasklist.appendChild(li);
    });
}

/*************************************************** */

function add(e) {
    const taskText = input.value;
    if (taskText === '') {
        alert("Enter a task, please!");
    } else {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const i = document.createElement("i");

        i.className = "fas fa-times text-danger mr-auto delete-item";
        span.appendChild(i);
        li.appendChild(span);
        li.appendChild(document.createTextNode(taskText));
        tasklist.appendChild(li);

        addlocalstrage(taskText);

        input.value = '';
        e.PreventDefault();
    }
}

function addlocalstrage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

/**************************************** */

function deleted(e) {
    if (e.target.classList.contains("delete-item")) {
        if (confirm("Are you sure ??")) {
            e.target.parentElement.parentElement.remove();
            deletelocalstorage(e.target.parentElement.parentElement);
        }
    }
}

function deletelocalstorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task , index){
        if(taskItem.textContent === task){
            tasks.splice(index , 1);
        }
    });
    localStorage.setItem('tasks' , JSON.stringify(tasks));
}

/*************************************** */

function clearing(){
    tasklist.innerHTML = "";
    clearlocalstorage();
}

function clearlocalstorage() {
    localStorage.clear();
}
