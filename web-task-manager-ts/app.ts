class Task {
  constructor(public text: string, public time: Date) {}
}

class TaskManager {
  private tasks: Task[] = [];
  private totalTime: number = 0;

  constructor(private taskListElement: HTMLUListElement, private inputElement: HTMLInputElement, private timeElement: HTMLDivElement) {
    this.inputElement.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  addTask() {
    const taskText = this.inputElement.value.trim();
    const currentTime = new Date();

    if (taskText !== '') {
      const newTask = new Task(taskText, currentTime);
      this.tasks.push(newTask);
      this.totalTime += 1; // Увеличиваем время выполнения на 1 минуту для каждой задачи.
      this.renderTasks();
      this.renderTotalTime();
      this.inputElement.value = ''; // Очищаем текстовое поле
    }
  }

  renderTasks() {
    this.taskListElement.innerHTML = '';
    this.tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = `${task.text} - ${task.time.toLocaleTimeString()}`;
      this.taskListElement.appendChild(li);
    });
  }

  renderTotalTime() {
    this.timeElement.textContent = `Total Time: ${this.totalTime} minutes`;
  }
}

const taskList = document.getElementById('task-list') as HTMLUListElement;
const taskInput = document.getElementById('task-input') as HTMLInputElement;
const totalTimeElement = document.getElementById('total-time') as HTMLDivElement;

const taskManager = new TaskManager(taskList, taskInput, totalTimeElement);

function addTask() {
  taskManager.addTask();
}

document.addEventListener('DOMContentLoaded', () => {
  taskManager.renderTasks();
  taskManager.renderTotalTime();
});
