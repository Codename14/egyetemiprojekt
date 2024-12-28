document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const todoCount = document.getElementById('todo-count');
    let todos = [];

    // frissíteni a todok számát
    const updateTodoCount = () => {
        const incompleteCount = todos.filter((todo) => !todo.completed).length;
        todoCount.textContent = `Jelenleg ${incompleteCount} befejezetlen teendő van.`;
    };

    // html renderelni a todot
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.sort((a, b) => a.completed - b.completed);

        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            todoItem.innerHTML = `
                <span>${todo.text}</span>
                <div class="todo-buttons">
                    <button class="delete-btn btn btn-danger" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
                    <button class="complete-btn btn btn-primary" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg></button>
                </div>
            `;
            todoList.appendChild(todoItem);
        });
        updateTodoCount();
    };

    // új todo
    addBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text === '') {
            alert('A teendő szövege nem lehet üres!');
            return;
        }
        todos.push({ text, completed: false });
        todoInput.value = '';
        renderTodos();
    });

    todoList.addEventListener('click', (e) => {
        // Kiválasztjuk a gombot, függetlenül attól, hogy az SVG ikonra kattintottak-e
        const button = e.target.closest('.delete-btn, .complete-btn');
        if (!button) return; // Ha nem egy gombra kattintottunk, akkor ne csináljunk semmit

        const index = button.dataset.index;

        if (button.classList.contains('delete-btn')) {
            todos.splice(index, 1); //delete todo
        } else if (button.classList.contains('complete-btn')) {
            todos[index].completed = !todos[index].completed; // meg
        }

        renderTodos();
    });

    updateTodoCount();
});
