const input = document.getElementById("input")
const addbtn = document.getElementById("addbtn")
const ul = document.getElementById("todolist")
let saveLocalTodo = (val) => {
  // let todos = [];
  todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos.push(val)
  // console.log(todos);
  localStorage.setItem("todo", JSON.stringify(todos))
}

let getLocalTodo = () => {
  let todos = JSON.parse(localStorage.getItem("todo")) || [];
  // todos.push(val)
  // console.log(todos);
  // localStorage.setItem("todo", JSON.stringify(todos))
  todos.forEach(val => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");

    const span = document.createElement("span");

    const edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.classList.add("btn", "editbtn");

    const del = document.createElement("button");
    del.innerText = "Delete";
    del.classList.add("btn", "delbtn");


    span.textContent = val;

    del.addEventListener("click", () => {
      let text = val;
      deleteLocalTodo(text);
      li.remove();
    })

    edit.addEventListener("click", () => {
      const oldText = span.textContent;
      const newText = prompt("Edit your todo", span.textContent);
      if (newText !== null && newText.trim() !== "") {
        span.textContent = newText;
        editLocalTodo(oldText, newText);
      }
    });
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        span.style.textDecoration = "line-through";
      } else {
        span.style.textDecoration = "none";
      }
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(edit);
    li.appendChild(del);
    ul.appendChild(li);
    input.value = "";

  });
}

//we can use this using function
let deleteLocalTodo = (text) => {
  let delval = text;
  todos = JSON.parse(localStorage.getItem("todo")) || [];
  todos = todos.filter((todo => todo !== delval));
  localStorage.setItem("todo", JSON.stringify(todos));
}

let editLocalTodo = (oldText, newText) => {

  let todos = JSON.parse(localStorage.getItem("todo")) || [];

  todos = todos.map(todo => {
    if (todo === oldText) {
      return newText;
    } else {
      return todo;
    }
  });

  localStorage.setItem("todo", JSON.stringify(todos));
}


const addTodo = () => {
  if (input.value.trim() === "") return;
  const val = input.value;

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  const span = document.createElement("span");


  const edit = document.createElement("button");
  edit.innerText = "Edit";
  edit.classList.add("btn", "editbtn");

  const del = document.createElement("button");
  del.innerText = "Delete";
  del.classList.add("btn", "delbtn");


  span.textContent = val;

  del.addEventListener("click", () => {
    let text = val;
    deleteLocalTodo(text);
    li.remove();
  })

  edit.addEventListener("click", () => {
    const oldText = span.textContent;
    const newText = prompt("Edit your todo", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText;
      editLocalTodo(oldText, newText);
    }
  });

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
    }
  });
  saveLocalTodo(val);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(edit);
  li.appendChild(del);
  ul.appendChild(li);
  input.value = "";

}
addbtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    addbtn.click();
  }
})

document.addEventListener("DOMContentLoaded", getLocalTodo);






