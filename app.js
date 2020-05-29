// selectors

const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-button'),
    todoList = document.querySelector('.todo-list'),
    todoFilter = document.querySelector('.todo-filter');

// EventListeners

todoButton.addEventListener('click', AddTodo);
todoFilter.addEventListener('click', FilterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function AddTodo(event) {
    event.preventDefault()

    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo')

    //create li
    const todoLi = document.createElement('li')
    todoLi.classList.add('todo-item');
    todoLi.innerText = todoInput.value
    todoDiv.appendChild(todoLi);
    saveLocalTodos(todoInput.value)

    //checked button
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add('check-btn');
    todoDiv.appendChild(checkBtn);


    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn)


    todoList.appendChild(todoDiv)
    todoInput.value = '';


    //delete item

    deleteBtn.addEventListener('click', deleteCheck);

    function deleteCheck(e) {
        const item = e.target
        if (item.classList[0] === 'delete-btn') {
            const todo = item.parentElement;
            todo.classList.add('fall');
            removeFromLocal(todo);
            todo.addEventListener('transitionend', () => {
                todo.remove();
               
            })
        }
    }

    // check item  

    checkBtn.addEventListener('click', completeCheck);

    function completeCheck(e) {
        const item = e.target
        if (item.classList[0] === 'check-btn') {
            const todo = item.parentElement
            todo.classList.toggle('completed')
        }
    }

}


function FilterTodo(e) {
    const todos = todoList.childNodes
    console.log(todos)
    todos.forEach((todo) => {
        console.log(todo)
        switch (e.target.value) {
            case 'all':
                todo.style.display = "flex";
                break;

            case 'completed':
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                };
                break;

            case 'uncompleted':
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
        }
    })
}

function saveLocalTodos(todo) {
    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {

    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach((todo) => {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo')

        //create li
        const todoLi = document.createElement('li')
        todoLi.classList.add('todo-item');
        todoLi.innerText = todo;
        todoDiv.appendChild(todoLi);

        //checked button
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList.add('check-btn');
        todoDiv.appendChild(checkBtn);


        //delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn)


        todoList.appendChild(todoDiv)

        deleteBtn.addEventListener('click', deleteCheck);

        function deleteCheck(e) {
            const item = e.target
            if (item.classList[0] === 'delete-btn') {
                const todo = item.parentElement;
                todo.classList.add('fall');
                removeFromLocal(todo)
                todo.addEventListener('transitionend', () => {
                    todo.remove();
                })
            }
        }

        // check item  

        checkBtn.addEventListener('click', completeCheck);

        function completeCheck(e) {
            const item = e.target
            if (item.classList[0] === 'check-btn') {
                const todo = item.parentElement
                todo.classList.toggle('completed')
            }
        }


    })

}



function removeFromLocal(todo) {

    let todos
    if (localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex, todo.children[0])
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
