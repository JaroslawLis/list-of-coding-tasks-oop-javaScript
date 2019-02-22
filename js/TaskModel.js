class TaskModel {
    constructor() {
        this.tasksCodeList = JSON.parse(localStorage.getItem('savedCodeTasks')) || [];
    }
    writeTask(tasksCodeList) {
        localStorage.setItem('savedCodeTasks', JSON.stringify(tasksCodeList));
    }
    addTask(textTask) {
        //console.log(e);

        // const textTask = document.querySelector('input[name="form-task"]').value;
        // const dateTask = document.querySelector('input[name="form-date"]').value;
        const dateTask = Date.now();
        const myTask = {
            textTask,
            dateTask
        }
        console.log(myTask);
        this.tasksCodeList.push(myTask);
        //console.log(this.tasksCodeList);
        this.writeTask(this.tasksCodeList);
        console.log(this);
        // showTasks();
        view.render();

        console.log(this);
    }
    getTasksCodeList() {
        return this.tasksCodeList;
    }
    removeTask(id) {
        this.tasksCodeList.splice(id, 1);
        this.writeTask(this.tasksCodeList);
    }



}