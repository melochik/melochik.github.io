let message = document.querySelector(".message");
let todo = document.querySelector(".todo");
let button = document.querySelector(".btn");

let todoList = [];

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  messages();
}

let add = function () {
  let newTodo = {
    todo: message.value,
    checked: false,
    important: false,
  };

  todoList.push(newTodo);

  messages();

  localStorage.setItem("todo", JSON.stringify(todoList));
};

button.addEventListener("click", add);

function messages() {
  let displayMessage = "";
  todoList.forEach(function (item, i) {
    displayMessage += `
    <li>
    <input type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
    <label for="item_${i}" class="${item.important ? "important" : ""}">${
      item.todo
    }</label>
    </li>
    `;
    todo.innerHTML = displayMessage;
  });
}

todo.addEventListener("change", function (event) {
  let valueInp = todo.querySelector(
    "[for=" + event.target.getAttribute("id") + "]"
  ).innerHTML;
  console.log(valueInp);
  todoList.forEach(function (item) {
    if (item.todo == valueInp) {
      item.checked = !item.checked;

      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

todo.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  todoList.forEach(function (item, i) {
    if (item.todo === event.target.innerHTML) {
      if (event.metaKey || event.cntrlKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
    }

    messages();
    localStorage.setItem("todo", JSON.stringify(todoList));
  });
});
