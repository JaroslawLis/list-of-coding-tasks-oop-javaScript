class TaskView {
    constructor() {
        //this.model = model;
        this.taskModel = new TaskModel();
        this.taskView = document.getElementById('tasks');
        document.querySelector('form.add-task').addEventListener('submit', this.addCodeTask.bind(this));
        document.querySelector('#tasks').addEventListener('click', this.handleClick.bind(this));
        this.render();
    }

    render() {
        const todoList = this.taskModel.getTasksCodeList();
        let html = '';
        todoList.forEach((data, i) => {


            html += `<div class="row_in_table" data-id="${i}"><div>${(i + 1)}</div><div>${data.textTask} </div><div>${
               new Date(data.dateTask).toDateString()}</div><button class="remove"</button><button class="mark_as_done"</button></div>`;
        });
        this.taskView.innerHTML = html;
        //console.log(todolist);
    }
    addCodeTask() {
        event.preventDefault();
        this.taskModel.addTask(event.target[0].value);
        // console.log(this);
    }
    handleClick() {
        // console.dir(this);
        const myElement = event.target;
        //console.log(myElement.classList);
        if (myElement.classList == 'remove') {
            const id = event.target.parentElement.dataset.id;
            this.taskModel.removeTask(id);
            this.render();
        }
    }
}