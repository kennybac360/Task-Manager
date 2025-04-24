// Task array
let tasks = [];

// DOM elements
const form = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const taskImportant = document.getElementById("taskImportant");
const taskContainer = document.getElementById("taskmanager");

// Handle form submit
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the page from refreshing

  const name = taskNameInput.value.trim();
  const priority = taskPriority.value;
  const isImportant = taskImportant.checked;

  if (!name) return; // Prevent adding empty tasks

  const task = {
    id: Date.now(),
    name,
    priority,
    isImportant,
    isCompleted: false,
    date: new Date().toLocaleString(),
  };

  tasks.push(task);
  console.log(JSON.stringify(tasks)); // Log task list

  renderTasks();
  form.reset(); // Clear the form
});

// Render tasks
function renderTasks() {
  taskContainer.innerHTML = ""; // Clear old tasks

  tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    // Apply styles
    if (task.isImportant) {
      taskDiv.style.color = "red";
    }

    if (task.isCompleted) {
      taskDiv.style.textDecoration = "line-through";
    }

    taskDiv.innerHTML = `
      <p><strong>${task.name}</strong> [${task.priority}] - Added: ${task.date}</p>
      <button onclick="toggleComplete(${task.id})">Toggle Complete</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskContainer.appendChild(taskDiv);
  });
}

// Toggle complete
function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  task.isCompleted = !task.isCompleted;
  console.log(JSON.stringify(tasks));
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  console.log(JSON.stringify(tasks));
  renderTasks();
}
