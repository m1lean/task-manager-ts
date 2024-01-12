var Task = /** @class */ (function () {
    function Task(text, time) {
        this.text = text;
        this.time = time;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager(taskListContainer, inputElement, timeElement) {
        this.taskListContainer = taskListContainer;
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
            this.totalTime += 1;
            this.renderTasks();
            this.renderTotalTime();
            this.inputElement.value = '';
        }
    };
    TaskManager.prototype.renderTasks = function () {
        var _this = this;
        this.taskListContainer.innerHTML = '';
        this.tasks.forEach(function (task) {
            var li = document.createElement('li');
            li.textContent = "".concat(task.text, " - ").concat(_this.formatTime(task.time));
            _this.taskListContainer.appendChild(li);
        });
    };
    TaskManager.prototype.renderTotalTime = function () {
        this.timeElement.textContent = "Total Time: ".concat(this.totalTime, " minute").concat(this.totalTime !== 1 ? 's' : '');
    };
    TaskManager.prototype.formatTime = function (time) {
        try {
            return time.toLocaleTimeString();
        }
        catch (error) {
            console.error('Error formatting time:', error);
            return '';
        }
    };
    return TaskManager;
}());
var taskListContainer = document.getElementById('task-list');
var taskInput = document.getElementById('task-input');
var totalTimeElement = document.getElementById('total-time');
var taskManager = new TaskManager(taskListContainer, taskInput, totalTimeElement);
function addTask() {
    taskManager.addTask();
}
document.addEventListener('DOMContentLoaded', function () {
    taskManager.renderTasks();
    taskManager.renderTotalTime();
});
