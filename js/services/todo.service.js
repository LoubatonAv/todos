'use strict';

var gTodos;
_createTodos();

var gSortBy = 'ALPHABET';
var gFilterBy = 'ALL';

function getTodosForDisplay() {
  const todos = gTodos.filter(
    (todo) =>
      (todo.isDone && gFilterBy === 'DONE') ||
      (!todo.isDone && gFilterBy === 'ACTIVE') ||
      gFilterBy === 'ALL'
  );
  switch (gSortBy) {
    case 'ALPHABET':
      sortByAlphabet(todos);
      break;
    case 'IMPORTANCE':
      sortByImportance(todos);
      break;
    case 'CREATED':
      sortByCreated(todos);
      break;
  }
  return todos;
}

function getTotalCount() {
  if (gTodos.length === 0) {
    var elStats = document.querySelector('.todo-stat');
    elStats.innerText = 'No Todos left.';
  }
  return gTodos.length;
}
function getActiveCount() {
  const todos = gTodos.filter((todo) => !todo.isDone);
  return todos.length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function toggleTodo(todoId) {
  const todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function removeTodo(todoId) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId);
  confirm(`Are you sure you want to remove ${gTodos[idx].txt}?`);
  gTodos.splice(idx, 1);
  _saveTodosToStorage();
}

function addTodo(txt, importance) {
  const todo = _createTodo(txt, importance);
  gTodos.unshift(todo);
  _saveTodosToStorage();
}

// Those are "private" functions meant to be used ONLY by the service itself
function _createTodo(txt, importance) {
  const todo = {
    id: _makeId(),
    txt: txt,
    isDone: false,
    createdAt: getTime(),
    importance: importance,
  };
  return todo;
}

function _makeId(length = 5) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getTime() {
  var today = new Date();
  var time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return time;
}

function _saveTodosToStorage() {
  saveToStorage('todoDB', gTodos);
}

function _createTodos() {
  var todos = loadFromStorage('todoDB');
  if (!todos || todos.length === 0) {
    todos = [
      _createTodo('Learn JS', 3),
      _createTodo('Master CSS', 3),
      _createTodo('Study HTML', 3),
    ];
  }
  gTodos = todos;
  _saveTodosToStorage();
}

function sortByAlphabet(todos) {
  todos.sort(function (a, b) {
    if (a.txt < b.txt) {
      return -1;
    }
    if (a.txt > b.txt) {
      return 1;
    }
    return 0;
  });
  return gTodos;
}

function sortByImportance(todos) {
  todos.sort(function (a, b) {
    return a.importance - b.importance;
  });
  return gTodos;
}

function sortByCreated(todos) {
  todos.sort(function (a, b) {
    return a.createdAt.localeCompare(b.createdAt);
  });
  return gTodos;
}
