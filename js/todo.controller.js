'use strict';

function onInit() {
  renderTodos();
}

function renderTodos() {
  const todos = getTodosForDisplay();

  const strHTMLs = todos.map((todo) => {
    const className = todo.isDone ? 'done' : '';
    const importance = todo.importance ? todo.importance : '3';

    const strHTML = `<li class="${className}" onclick="onToggleTodo(this, '${todo.id}')">
            <span>${todo.txt}</span>
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
            created at ${todo.createdAt}
            Importance ${importance}
         </li>`;

    return strHTML;
  });
  document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
  document.querySelector('.todo-total-count').innerText = getTotalCount();
  document.querySelector('.todo-active-count').innerText = getActiveCount();
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  console.log('Removing..', todoId);
  removeTodo(todoId);
  renderTodos();
}

function onToggleTodo(elTodo, todoId) {
  console.log('Toggling..', todoId);
  toggleTodo(todoId);
  // elTodo.classList.toggle('done') // but also need to re-render stat
  renderTodos();
}

function onAddTodo() {
  const elInput = document.querySelector('input');
  const elImportance = document.querySelector('.importance');
  if (elInput.value) {
    addTodo(elInput.value, elImportance.value);
    elInput.value = '';
    elImportance.value = '';
    renderTodos();
  }
}

function onSetFilter(filterBy) {
  console.log('Filtering By', filterBy);
  setFilter(filterBy);
  renderTodos();
}

function onSortFilter(sortBy) {
  console.log('Sorting By', sortBy);
  setSort(sortBy);
  renderTodos();
}
