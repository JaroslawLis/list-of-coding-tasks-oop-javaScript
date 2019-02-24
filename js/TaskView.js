class TaskView {
    constructor() {

        this.taskModel = new TaskModel();
        this.taskView = document.getElementById('tasks');
        this.input = document.querySelector('input[name="form-task"]');
        document.querySelector('form.add-task').addEventListener('submit', this.addCodeTask.bind(this));
        document.querySelector('#tasks').addEventListener('click', this.handleClick.bind(this));
        this.render();
    }

    leadingZero(i) {
        return (i < 10) ? '0' + i : i;
    }
    display_date(date) {
        const d = new Date(date);
        const date_string = `${this.leadingZero(d.getDate())}-${this.leadingZero(d.getMonth())}-${d.getFullYear()}`;

        // console.log(date_string);
        return date_string;

    }
    render() {
        const todoList = this.taskModel.getTasksCodeList();
        let html = '';
        todoList.forEach((data, i) => {
            //new Date(data.dateTask).toDateString()
            if (!data.is_Done) {
                html += `<div class="row_in_table" data-id="${i}"><div>${(i + 1)}</div><div>${data.textTask} </div><div>${this.display_date(data.dateTask)
               }</div><button class="remove"</button><button class="mark_as_done"</button></div>`;
            }
        });
        this.taskView.innerHTML = html;

    }
    addCodeTask() {
        event.preventDefault();
        this.taskModel.addTask(event.target[0].value);
        this.input.value = '';
        this.render();

    }
    handleClick() {

        const myElement = event.target;

        if (myElement.classList == 'remove') {
            const id = event.target.parentElement.dataset.id;
            this.taskModel.removeTask(id);
            this.render();
        } else if (myElement.classList == 'mark_as_done') {
            const id = event.target.parentElement.dataset.id;
            this.taskModel.markTask(id);
            this.render();
        }
    }
}