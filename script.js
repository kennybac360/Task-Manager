let tasks = [];

const form = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskPriority = document.getElementById("taskPriority");
const taskImportant = document.getElementById("taskImportant");
const taskContainer = document.getElementById("taskmanager");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = taskNameInput.value.trim();
  const priority = taskPriority.value;
  const isImportant = taskImportant.checked;

  if (!name) return;

  const task = {
    id: Date.now(),
    name,
    priority,
    isImportant,
    isCompleted: false,
    date: new Date().toLocaleString()
  };

  tasks.push(task);
  console.log(JSON.stringify(tasks));
  renderTasks();
  form.reset();
});

function renderTasks() {
  taskContainer.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    if (task.isImportant) taskDiv.classList.add("important");
    if (task.isCompleted) taskDiv.classList.add("completed");

    taskDiv.innerHTML = `
      <p><strong>${task.name}</strong> [${task.priority}]<br>
      Added: ${task.date}</p>
      <button onclick="toggleComplete(${task.id})">Toggle Complete</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskContainer.appendChild(taskDiv);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.isCompleted = !task.isCompleted;
  console.log(JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  console.log(JSON.stringify(tasks));
  renderTasks();
}
