class TaskView {
    constructor() {
        this.taskModel = new TaskModel();
        this.active_pomodoro_button = false;
        this.timer_text;
        this.taskView = document.getElementById("tasks");
        this.input = document.querySelector('input[name="form-task"]');
        document
            .querySelector("form.add-task")
            .addEventListener("submit", this.addCodeTask.bind(this));
        document
            .querySelector("#tasks")
            .addEventListener("click", this.handleClick.bind(this));
        document
            .querySelector(".burger")
            .addEventListener("click", this.burgerIcon.bind(this));

        this.monthNames = [
            "styczeń",
            "luty",
            "marzec",
            "kwiecień",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpień",
            "wrzesień",
            "październik",
            "listopad",
            "grudzień"
        ];
        this.burger_icon1 = document.querySelector(".fas.fa-bars");
        this.burger_icon2 = document.querySelector(".fas.fa-times");
        this.aside = document.querySelector("aside");
        this.aside.addEventListener("click", this.pomodoroTimer.bind(this));

        this.render();
    }

    leadingZero(i) {
        return i < 10 ? "0" + i : i;
    }

    display_date(date) {
        const d = new Date(date);
        const date_string = `${this.leadingZero(d.getDate())} ${this.leadingZero(
      this.monthNames[d.getMonth()]
    )} ${d.getFullYear()}`;

        return date_string;
    }
    render() {
        const todoList = this.taskModel.getTasksCodeList();
        // let todoList = todoListTable.filter(element => element.is_Done === false && element.status === 'shedule');
        let counter = 0;
        let html = "";
        todoList.forEach((data, i) => {
            if (data.is_Done === false && data.status === "shedule") {
                html += `<div class="row_in_table" data-id="${i}"><div>${++counter}</div><div>${
          data.textTask
        } </div><div>${this.display_date(
          data.dateTask
        )}</div><button class="remove"</button><button class="mark_as_done"</button></div>`;
            }
        });
        html += `<div class="row_in_table" id="break">-  --- ----------ODROCZONE--------------</div>`;
        counter = 0;

        todoList.forEach((data, i) => {
            if (data.is_Done === false && data.status === "deferred") {
                html += `<div class="row_in_table" data-id="${i}"><div>${++counter}</div><div>${
          data.textTask
        } </div><div>${this.display_date(
          data.dateTask
        )} </div><button class="remove"</button><button class ="mark_as_done"</button><button class="change_status"</button></div>`;
            }
        });
        this.taskView.innerHTML = html;
    }
    addCodeTask(event) {
        event.preventDefault();

        // target[0] - becouse it is a first input
        let status = document.querySelector('input[name = "opcja"]:checked').value;
        this.taskModel.addTask(event.target[0].value, status);

        this.input.value = "";
        this.render();
    }
    handleClick(event) {
        const myElement = event.target;

        if (myElement.classList == "remove") {
            const id = event.target.parentElement.dataset.id;
            this.taskModel.removeTask(id);
            this.render();
        } else if (myElement.classList == "mark_as_done") {
            const id = event.target.parentElement.dataset.id;
            this.taskModel.markTask(id);
            this.render();
        } else if (myElement.classList == "change_status") {
            const id = event.target.parentElement.dataset.id;
            this.taskModel.changeStatus(id);
            this.render();
        }
    }
    burgerIcon() {
        this.burger_icon1.classList.toggle("off");
        this.burger_icon2.classList.toggle("off");
        this.aside.classList.toggle("off");
    }
    pomodoro_handler() {
        this.timer_text = document.querySelector(".pomodoro_span");
        const pomodoro_button = document.querySelector("button.active")
        pomodoro_button.addEventListener('click', () => this.handleClickPomodoroButton(pomodoro_button))
        this.pomodoroInterval()
    }

    handleClickPomodoroButton(pomodoro_button) {
        this.active_pomodoro_button = !this.active_pomodoro_button;
        if (this.active_pomodoro_button) {
            clearInterval(this.timer)
        } else {
            this.pomodoroInterval();
        }
        pomodoro_button.classList.toggle('pause')
    }

    pomodoroInterval() {

        const timer_text = this.timer_text;
        this.timer = setInterval(() => {
            if (this.taskModel.pomodoro <= 0) {
                clearInterval(this.timer)
            }

            let time_left = this.taskModel.pomodoro;
            let time_text = `${this.leadingZero(
        Math.floor(time_left / 60)
      )} : ${this.leadingZero(time_left % 60)}`;
            timer_text.innerHTML = time_text;

            this.taskModel.pomodoro--;
        }, 1000);
    }

    pomodoroTimer(event) {
        if (event.target.className === "pomodoro") {
            const pomodoro_box = document.querySelector("header");

            let div = document.createElement("div");
            let span = document.createElement("span");
            span.className = "pomodoro_span";
            let button = document.createElement("button");
            button.className = "active";
            div.appendChild(span);
            div.appendChild(button);
            div.className = "pomodoro_div";
            pomodoro_box.appendChild(div);

            this.pomodoro_handler();

        }
    }
}