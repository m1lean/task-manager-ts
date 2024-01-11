var Task = /** @class */ (function () {
    function Task(text, time) {
        this.text = text;
        this.time = time;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager(taskListElement, inputElement, timeElement) {
        this.taskListElement = taskListElement;
        this.inputElement = inputElement;
        this.timeElement = timeElement;
        this.tasks = [];
        this.totalTime = 0;
        this.inputElement.addEventListener('keypress', this.handleKeyPress.bind(this));
    }
    TaskManager.prototype.handleKeyPress = function (event) {
        if (event.key === 'Enter') {
            this.addTask();
        }
    };
    TaskManager.prototype.addTask = function () {
        var taskText = this.inputElement.value.trim();
        var currentTime = new Date();
        if (taskText !== '') {
            var newTask = new Task(taskText, currentTime);
            this.tasks.push(newTask);
            this.totalTime += 1; // Увеличиваем время выполнения на 1 минуту для каждой задачи.
            this.renderTasks();
            this.renderTotalTime();
            this.inputElement.value = ''; // Очищаем текстовое поле
        }
    };
    TaskManager.prototype.renderTasks = function () {
        var _this = this;
        this.taskListElement.innerHTML = '';
        this.tasks.forEach(function (task) {
            var li = document.createElement('li');
            li.textContent = "".concat(task.text, " - ").concat(task.time.toLocaleTimeString());
            _this.taskListElement.appendChild(li);
        });
    };
    TaskManager.prototype.renderTotalTime = function () {
        this.timeElement.textContent = "Total Time: ".concat(this.totalTime, " minutes");
    };
    return TaskManager;
}());
var taskList = document.getElementById('task-list');
var taskInput = document.getElementById('task-input');
var totalTimeElement = document.getElementById('total-time');
var taskManager = new TaskManager(taskList, taskInput, totalTimeElement);
function addTask() {
    taskManager.addTask();
}
document.addEventListener('DOMContentLoaded', function () {
    taskManager.renderTasks();
    taskManager.renderTotalTime();
});
