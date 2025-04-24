let tasks = [];

document.getElementById('addTask').addEventListener('click', function () {
  const name = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const isImportant = document.getElementById('isImportant').checked;

  if (!name) {
    alert('Please enter a task name.');
    return;
  }

  const task = {
    id: Date.now(),
    name,
    priority,
    isImportant,
    isCompleted: false,
    date: new Date().toLocaleDateString()
  };

  tasks.push(task);
  displayTasks();
  console.log(JSON.stringify(tasks));
  document.getElementById('taskName').value = '';
  document.getElementById('isImportant').checked = false;
});

function displayTasks() {
  const taskDiv = document.getElementById('taskmanager');
  taskDiv.innerHTML = '';

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task';
    if (task.isImportant) div.classList.add('important');
    if (task.isCompleted) div.classList.add('completed');

    div.innerHTML = `
      <strong>${task.name}</strong> <br>
      Priority: ${task.priority} <br>
      Date Added: ${task.date} <br>
      <button onclick="toggleComplete(${task.id})">Toggle Complete</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskDiv.appendChild(div);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  task.isCompleted = !task.isCompleted;
  displayTasks();
  console.log(JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  displayTasks();
  console.log(JSON.stringify(tasks));
}
