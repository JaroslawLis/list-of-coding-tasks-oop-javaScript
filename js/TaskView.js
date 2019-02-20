class TaskView {
    constructor() {
        //this.model = model;
        this.taskModel = new TaskModel();
        this.taskView = document.getElementById('tasks');
        document.querySelector('form.add-task').addEventListener('submit', this.addCodeTask.bind(this));
        this.render();
    }

    render() {
        const todoList = this.taskModel.getTasksCodeList();
        let html = '';
        todoList.forEach((data, i) => {


            html += `<div class="row_in_table"><div>${(i + 1)}</div><div>${data.textTask} </div><div>${data.dateTask}</div><div><button class="remove">usuń</button></div></div>`;
        });
        this.taskView.innerHTML = html;
        //console.log(todolist);
    }
    addCodeTask() {
        event.preventDefault();
        this.taskModel.addTask(event.target[0].value);
        // console.log(this);
    }
}