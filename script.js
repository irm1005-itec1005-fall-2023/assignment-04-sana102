const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something fatty!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    inputBox.value = "";
    saveData();
  }
}

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    // Call removeTask function when the span (delete button) is clicked
    removeTask(e.target.parentElement);
    saveData();
  }
});

// Add this function to remove a specific task
function removeTask(task) {
  task.remove();
}

// Add this function to clear all completed tasks
function clearCompletedTasks() {
  const completedItems = document.querySelectorAll("#list-container .checked");
  completedItems.forEach(function (completedItem) {
    removeTask(completedItem);
  });
  saveData();
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
}

showTask();
