const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completeAllButton = document.getElementById("complete-all-button");
const goodJobMessage = document.getElementById("good-job-message");
const todoApp = document.querySelector('.todo-app');
const makeListButton = document.getElementById("make-list-button");

makeListButton.addEventListener("click", function () {
  todoApp.style.display = 'block';
  showTask();
  hideMakeListButton();
});

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    inputBox.value = "";
    saveData();
    checkCompleteAllButton();
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    checkCompleteAllButton();
  } else if (e.target.tagName === "SPAN") {
    removeTask(e.target.parentElement);
    saveData();
    checkCompleteAllButton();
  }
});

completeAllButton.addEventListener("click", function () {
  completeAllTasks();
});

function removeTask(task) {
  task.remove();
}

function clearCompletedTasks() {
  const completedItems = document.querySelectorAll("#list-container .checked");
  completedItems.forEach(function (completedItem) {
    removeTask(completedItem);
  });
  saveData();
  checkCompleteAllButton();
}

function completeAllTasks() {
  const tasks = document.querySelectorAll("#list-container li");
  tasks.forEach(function (task) {
    task.classList.add("checked");
  });
  saveData();
  checkCompleteAllButton();
  showGoodJobMessage();
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  checkCompleteAllButton();
}

function checkCompleteAllButton() {
  const tasks = document.querySelectorAll("#list-container li");
  const completedTasks = document.querySelectorAll("#list-container .checked");
  completeAllButton.style.display = tasks.length === completedTasks.length ? "none" : "inline";
}

function showGoodJobMessage() {
  goodJobMessage.style.display = "block";
  setTimeout(function () {
    hideGoodJobMessage();
  }, 1000); // Hide the message after 5 seconds
}

function hideGoodJobMessage() {
  goodJobMessage.style.display = "none";
}

function hideMakeListButton() {
  makeListButton.style.display = "none";
}
