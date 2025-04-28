let tasks = [];
let id = 0;

// Function to add task
function addTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById('taskname');
  const priorityInput = document.getElementById('priority');
  const importantInput = document.getElementById('important');

  if (taskInput.value.trim() === '') return;

  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;

  const task = {
    id: id++,
    name: taskInput.value,
    priority: priorityInput.value,
    isImportant: importantInput.checked,
    isCompleted: false,
    date: formattedDate
  };

  tasks.push(task);
  displayTasks();

  taskInput.value = '';
  priorityInput.value = 'High';
  importantInput.checked = false;
}

// Function to display tasks
function displayTasks() {
  const taskManager = document.getElementById('taskmanager');
  taskManager.innerHTML = '';

  tasks.forEach(task => {
    const taskHTML = `
      <div class="task ${task.isImportant ? 'important' : ''} ${task.isCompleted ? 'completed' : ''}">
        <span>${task.name}</span>
        <span>Priority: ${task.priority}</span>
        <span>${task.date}</span>
        <div class="actions">
          <label>
            <input type="checkbox" onchange="toggleComplete(${task.id})" ${task.isCompleted ? 'checked' : ''}>
            ${task.isCompleted ? 'Undo' : 'Done'}
          </label>
          <button onclick="deleteTask(${task.id})">Delete</button>
        </div>
      </div>
    `;
    taskManager.innerHTML += taskHTML;
  });
}

// Function to toggle task completion
function toggleComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.isCompleted = !task.isCompleted;
    displayTasks();
  }
}

// Function to delete task
function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  displayTasks();
}

// Attach event listener
document.getElementById('taskform').addEventListener('submit', addTask);
