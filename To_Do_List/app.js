//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Create Todo Div with class todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li with class todo-item and add to todoDiv
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add to local storage
    saveLocalTodos(todoInput.value)
    // add Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML ='<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // add Delete Mark Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //Append to List in index.html
    todoList.appendChild(todoDiv);
    // clear todoInput.value
    todoInput.value = "";
}
//Delete function
function deleteCheck(e) {
    const item = e.target;
    //Delete todo
    if(item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
//Checkmark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if(todo.classList.contains('completed')) {
                        todo.style.display = "none";
                    } else {
                        todo.style.display = "flex";
                    }
                    break;
        }
    });
}

function saveLocalTodos(todo) {
    // Check if I already have things in there
    let todos;
    if(localStorage.getItem('todos')===null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos(){
        // Check if I already have things in there
        let todos;
        if(localStorage.getItem('todos')===null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        todos.forEach(function(todo) {
             //Create Todo Div with class todo
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            // Create li with class todo-item and add to todoDiv
            const newTodo = document.createElement('li');
            //take from the todo variable
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);
            // add Check Mark Button
            const completedButton = document.createElement('button');
            completedButton.innerHTML ='<i class = "fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);
            // add Delete Mark Button
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class = "fas fa-trash"></i>';
            deleteButton.classList.add("delete-btn");
            todoDiv.appendChild(deleteButton);
            //Append to List in index.html
            todoList.appendChild(todoDiv);
        });
}

function removeLocalTodos(todo) {
  // Check if I already have things in there
  let todos;
  if(localStorage.getItem('todos')===null) {
      todos = [];
  } else {
      todos = JSON.parse(localStorage.getItem('todos'));
  }
  const deletedItem = todo.children[0].innerText;
   todos.splice(todos.indexOf(deletedItem), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}