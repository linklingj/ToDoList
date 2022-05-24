window.addEventListener('load', ()=> {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    const filter = document.querySelector("#filter-todo");
    getTodos();
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        if (!task) {
            alert("입력창 비어있음");
            return;
        }

        saveLocalTodos(input.value);

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");
        task_el.appendChild(task_content_el);

        const task_checkbox_el = document.createElement("button");
        task_checkbox_el.classList.add("checkbox");
        task_checkbox_el.innerHTML = '<ion-icon name="square-outline"></ion-icon>';
        task_content_el.appendChild(task_checkbox_el);

        const task_input_el = document.createElement("input");
        task_input_el.type = "text";
        task_input_el.classList.add("text");
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", true);
        task_content_el.appendChild(task_input_el);

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "수정";
        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "삭제";

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);
        task_content_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        input.value = "";
        updateShow();

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText == "수정") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "저장";
            } else {
                task_input_el.setAttribute("readonly", true);
                task_edit_el.innerText = "수정";
            }
        })

        task_delete_el.addEventListener('click', () => {
            task_el.classList.add("fall");
            task_el.addEventListener('transitionend', () => {
                if (list_el.contains(task_el)) {
                    list_el.removeChild(task_el);
                }
            });
        })

        task_checkbox_el.addEventListener('click', () => {
            task_el.classList.toggle("completed");
            if (task_el.classList.contains("completed")) {
                task_checkbox_el.innerHTML = '<ion-icon name="checkbox-outline"></ion-icon>';
            } else {
                task_checkbox_el.innerHTML = '<ion-icon name="square-outline"></ion-icon>';
            }
            updateShow();
        })

    })

    filter.addEventListener('click', () => {
        updateShow();
    });

    function updateShow() {
        const todos = list_el.childNodes;
        todos.forEach(function(todo) {
            switch (filter.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "none";
                    } else {
                        todo.style.display = "flex";
                    }
                    break;
            }
        });
    }

    function saveLocalTodos(todo) {
        let todos;
        if (localStorage.getItem('todos') == null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getTodos() {
        let todos;
        if (localStorage.getItem('todos') == null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo) {
            const task_el = document.createElement("div");
            task_el.classList.add("task");
            const task_content_el = document.createElement("div");
            task_content_el.classList.add("content");
            task_el.appendChild(task_content_el);
    
            const task_checkbox_el = document.createElement("button");
            task_checkbox_el.classList.add("checkbox");
            task_checkbox_el.innerHTML = '<ion-icon name="square-outline"></ion-icon>';
            task_content_el.appendChild(task_checkbox_el);
    
            const task_input_el = document.createElement("input");
            task_input_el.type = "text";
            task_input_el.classList.add("text");
            task_input_el.value = todo;
            task_input_el.setAttribute("readonly", true);
            task_content_el.appendChild(task_input_el);
    
            const task_action_el = document.createElement("div");
            task_action_el.classList.add("actions");
    
            const task_edit_el = document.createElement("button");
            task_edit_el.classList.add("edit");
            task_edit_el.innerHTML = "수정";
            const task_delete_el = document.createElement("button");
            task_delete_el.classList.add("delete");
            task_delete_el.innerHTML = "삭제";
    
            task_action_el.appendChild(task_edit_el);
            task_action_el.appendChild(task_delete_el);
            task_content_el.appendChild(task_action_el);
    
            list_el.appendChild(task_el);
        })
    }
})
