let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");

addBtn.addEventListener("click", addTask);

function addTask() {
  const title = document.getElementById("task-title").value.trim();
  const desc = document.getElementById("task-desc").value.trim();

  if (!title) {
    alert("Please enter a task title!");
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    desc,
    completed: false,
  };

  tasks.push(newTask);
  saveAndRender();
  clearInputs();
}

function clearInputs() {
  document.getElementById("task-title").value = "";
  document.getElementById("task-desc").value = "";
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    taskList.innerHTML = `<p style="text-align:center;color:#777;">No tasks yet.</p>`;
    return;
  }

  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");

    div.innerHTML = `
      <div class="details">
        <div class="title">${task.title}</div>
        <div class="desc">${task.desc}</div>
      </div>
      <div class="actions">
        <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    div.querySelector(".complete-btn").addEventListener("click", () => toggleComplete(task.id));
    div.querySelector(".edit-btn").addEventListener("click", () => editTask(task.id));
    div.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(div);
  });
}

function toggleComplete(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveAndRender();
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  const newTitle = prompt("Edit Task Title:", task.title);
  const newDesc = prompt("Edit Task Description:", task.desc);

  if (newTitle !== null) task.title = newTitle;
  if (newDesc !== null) task.desc = newDesc;

  saveAndRender();
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((t) => t.id !== id);
    saveAndRender();
  }
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Initial load
renderTasks();
