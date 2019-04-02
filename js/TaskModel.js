class TaskModel {
    constructor() {
        this.tasksCodeList = JSON.parse(localStorage.getItem('savedCodeTasks')) || [];
        this.pomodoro = 1500;
        this.timer;
    }
    writeTask(tasksCodeList) {
        localStorage.setItem('savedCodeTasks', JSON.stringify(tasksCodeList));
    }
    addTask(textTask, status) {

        const dateTask = Date.now();
        const is_Done = false;
        const myTask = {
            textTask,
            dateTask,
            is_Done,
            status

        }

        this.tasksCodeList.push(myTask);
        this.writeTask(this.tasksCodeList);

    }
    getTasksCodeList() {
        return this.tasksCodeList;
    }
    removeTask(id) {
        this.tasksCodeList.splice(id, 1);
        this.writeTask(this.tasksCodeList);
    }
    markTask(id) {
        this.tasksCodeList[id].is_Done = true;
        this.writeTask(this.tasksCodeList);
    }
    changeStatus(id) {
        this.tasksCodeList[id].status = 'shedule';
        this.writeTask(this.tasksCodeList);
    }


}