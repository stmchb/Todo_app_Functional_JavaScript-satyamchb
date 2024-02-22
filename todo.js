let todoList = [];

showTodosFromLocalstorage();

function addTodo() {
  let todoValue = document.querySelector('#input-box').value;
  let dateValue = document.querySelector('#date-input').value;
  let currentDate = new Date(dateValue).toLocaleDateString();

  if(todoValue==='' && dateValue===''){
    alert('please add todo and Date')
    return;
  }

  if (!todoValue && !dateValue) {
    alert('Please enter a todo and provide a date.');
    return;
  } else if (!todoValue) {
    alert('Please enter a todo.');
    return;
  } else if (!dateValue) {
    alert('Please provide a date.');
    return;
  }

  if (todoList.some(item => item.todo === todoValue)) {
    alert('Item is already in the todo list.');
    return;
  }
  todoList.push({
    todo: todoValue,
    date: currentDate
  });

  showItem();
  saveTodos();
}

function showItem() {
  let getElement = document.querySelector('#text-area');
  let newHtml = '';

  for (let i = 0; i < todoList.length; i++) {
    newHtml += `
      <div class="todo-item">
        <span>${todoList[i].todo}</span>
        <span>(${todoList[i].date})</span>
        <button id='del-button' onclick='deleteItem(${i})'>Delete item</button>
      </div>
      <hr>
    `;
  }
  getElement.innerHTML = newHtml;
}

function deleteItem(index) {
  todoList.splice(index, 1);
  showItem();
  saveTodos();
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

function showTodosFromLocalstorage() {
  let itemsInLocalStorage = JSON.parse(localStorage.getItem('todos')) || [];
  todoList = itemsInLocalStorage;
  showItem();
}
