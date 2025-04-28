const taskForm = document.getElementById('taskForm');
const taskManager = document.getElementById('taskmanager');

let tasks = [];
let taskId = 0;

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const taskName = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('priority').value;
  const isImportant = document.getElementById('important').checked;
  
  // Only get the date part (YYYY-MM-DD format)
  const today = new Date();
  const dateAdded = today.toISOString().split('T')[0];

  if (taskName === "") {
    alert("Task name cannot be empty!");
    return;
  }

  const task = {
    id: taskId++,
    name: taskName,
    priority: priority,
    isImportant: isImportant,
    isCompleted: false,
    date: dateAdded
  };

  tasks.push(task);
  logTasks();
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  taskManager.innerHTML = "";

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');

    if (task.isImportant) taskDiv.classList.add('important');
    if (task.isCompleted) taskDiv.classList.add('completed');

    // Task Info
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('task-info');

    const nameSpan = document.createElement('span');
    nameSpan.textContent = task.name;

    const metaSpan = document.createElement('span');
    metaSpan.classList.add('task-meta');
    metaSpan.textContent = `Priority: ${task.priority} | ${task.date}`;

    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(metaSpan);

    // Actions
    const btnDiv = document.createElement('div');

    // Done Checkbox
    const doneLabel = document.createElement('label');
    const doneCheckbox = document.createElement('input');
    doneCheckbox.type = "checkbox";
    doneCheckbox.checked = task.isCompleted;
    doneCheckbox.addEventListener('change', () => {
      task.isCompleted = doneCheckbox.checked;
      logTasks();
      renderTasks();
    });

    doneLabel.appendChild(doneCheckbox);
    doneLabel.appendChild(document.createTextNode(task.isCompleted ? " Undo" : " Done"));

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      logTasks();
      renderTasks();
    });

    btnDiv.appendChild(doneLabel);
    btnDiv.appendChild(deleteBtn);

    taskDiv.appendChild(infoDiv);
    taskDiv.appendChild(btnDiv);

    taskManager.appendChild(taskDiv);
  });
}

function logTasks() {
  console.log(JSON.stringify(tasks, null, 2));
}
