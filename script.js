class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        this.renderTasks();
    }
    
    addTask(taskText) {
        const task = {
            text: taskText,
            done: false
        };
        this.tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.simulateSave().then(() => {
            this.renderTasks();
        });
    }
    
    toggleTask(index) {
        this.tasks[index].done = !this.tasks[index].done;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
    }
    
    simulateSave() {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("Task saved!");
                resolve();
            }, 1000);
        });
    }
    
    renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";
        this.tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.className = `task ${task.done ? "done" : ""}`;
            taskDiv.textContent = task.text;
            taskDiv.addEventListener("click", () => this.toggleTask(index));
            
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(this.tasks));
                this.renderTasks();
            });
            taskDiv.appendChild(deleteBtn);
            taskList.appendChild(taskDiv);
        });
    }
}

const taskManager = new TaskManager();

document.getElementById("addTask").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        taskManager.addTask(taskText);
        taskInput.value = "";
    }
});