// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners

loadEventListeners();

// Load Event Listeners Func

// QUESTION
// (Should const be used here?)
// ANSWER
// I think this way is an alternative to what Brad used:
// function loadEventListeners() {...}
// ANSWER 2: Nevermind, the way I had it might need to be defined before it is called? it caused an error.

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);
  // QUESTION
  // Should 'const? + addTask = ' be added? Should there be 'type: ' before 'submit'?

  // CORRECTION
  // from: document.addEventListener('submit', taskInput);
  // to:
  form.addEventListener("submit", addTask);
  // CORRECTION: had document.querySelector('collection-item').addEventListener(...)
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
}

// Insert Local Tasks Function
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (Task) {
    const li = document.createElement("li");

    li.className = "collection-item";

    li.appendChild(document.createTextNode(Task));

    const link = document.createElement("a");

    link.className = "delete-item secondary-content";

    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault;
  // CORRECTION: added .value. I confused the element itself (taskInput) with its value property.
  if (taskInput.value === "") {
    alert("Please enter a task.");
    return;
  }

  const li = document.createElement("li");

  // CORRECTION: was 'li.className("collection-item");' I confused properties and methods
  li.className = "collection-item"; // <-- Property
  li.appendChild(document.createTextNode(taskInput.value)); // <-- Method

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  // CORRECTION: was 'link.innerHtml' must capitolize HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  //******************************** STORE IN LS
  storeInLocalStorage(taskInput.value);

  taskInput.value = "";
}

function storeInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (storedTask, index) {
    if (task.textContent === storedTask) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
  // taskList.innerHTML = ""; WORKED
  while (taskList.firstChild) {
    removeTaskFromLocalStorage(taskList.firstChild);
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  const filterInput = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(filterInput) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
