// Your JavaScript code goes here
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completeAllButton = document.getElementById("complete-all-button");
const clearButton = document.getElementById("clear-button");
const goodJobMessage = document.getElementById("good-job-message");
const remainingCountSpan = document.getElementById("remaining-count");
const completedCountSpan = document.getElementById("completed-count");
const todoApp = document.querySelector('.todo-app');
const makeListButton = document.getElementById("make-list-button");
let audio;

let remainingCount = 0;
let completedCount = 0;

makeListButton.addEventListener("click", function () {
  todoApp.style.display = 'block';
  showTask();
  hideMakeListButton();
  playMusic();
  updateCounters();
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
    remainingCount++;
    updateCounters();
    enableCompleteButton(); // Enable the complete button
    enableClearButton(); // Enable the clear button
  }
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
    enableClearButton(); // Enable the clear button
    checkCompleteAllButton(); // Moved here to update the "Complete All" button after individual task completion
  } else if (e.target.tagName === "SPAN") {
    const isTaskChecked = e.target.parentElement.classList.contains("checked");
    removeTask(e.target.parentElement, isTaskChecked);
    saveData();
    enableClearButton(); // Enable the clear button
    checkCompleteAllButton(); // Moved here to update the "Complete All" button after individual task completion
  }
});

completeAllButton.addEventListener("click", function () {
  completeAllTasks();
});

clearButton.addEventListener("click", function () {
  clearCompletedTasks();
});

function completeAllTasks() {
  const tasks = document.querySelectorAll("#list-container li");
  tasks.forEach(function (task) {
    task.classList.add("checked");
  });
  saveData();
  showGoodJobMessage();
  completedCount += remainingCount;
  remainingCount = 0;
  updateCounters();

  // Clear tasks from the UI after completing all
  listContainer.innerHTML = "";

  // Moved checkCompleteAllButton here to update the "Complete All" button after completing all tasks
  checkCompleteAllButton();
  enableClearButton(); // Enable the clear button
}

function removeTask(task, isTaskChecked) {
  task.remove();
  if (!isTaskChecked) {
    remainingCount--;
  } else {
    completedCount--;
  }
  updateCounters();
}

function clearCompletedTasks() {
  const completedItems = document.querySelectorAll("#list-container .checked");
  completedItems.forEach(function (completedItem) {
    removeTask(completedItem, true);
  });
  saveData();
  enableClearButton(); // Enable the clear button
  // Moved checkCompleteAllButton here to update the "Complete All" button after clearing completed tasks
  checkCompleteAllButton();
}

function enableClearButton() {
  const completedItems = document.querySelectorAll("#list-container .checked");
  clearButton.disabled = completedItems.length === 0;
}

function enableCompleteButton() {
  completeAllButton.style.display = "inline";
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
  completeAllButton.style.display = tasks.length === completedTasks.length || tasks.length === 0 ? "none" : "inline";
}

function updateCounters() {
  remainingCountSpan.textContent = remainingCount;
  completedCountSpan.textContent = completedCount;
}

function showGoodJobMessage() {
  goodJobMessage.style.display = "block";
  setTimeout(function () {
    hideGoodJobMessage();
  }, 1000);
}

function hideGoodJobMessage() {
  goodJobMessage.style.display = "none";
}

function hideMakeListButton() {
  makeListButton.style.display = "none";
  stopMusic();
}

function playMusic() {
  audio = new Audio("./hellokittysound.mp3");
  audio.loop = true;
  audio.play();
}

function stopMusic() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}
