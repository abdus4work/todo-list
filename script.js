const addTodo = document.getElementById("todo");
const addTodoButton = document.getElementById("add-btn");
const emptyView=document.getElementById("empty");
const todoList = document.getElementById("todo-list");
const clearCompletedButton=document.querySelector("#clearBtn button");
const clearCompletedButtonDiv=document.querySelector("#clearBtn");

clearCompletedButtonDiv.style.display="none";

addTodoButton.addEventListener("click", createTodo);
addTodo.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        createTodo();
        e.preventDefault();
    }
})

function createTodo() {
  const todoText = addTodo.value.trim();
  if (todoText === "") {
    alert("Please enter a todo");
    addTodo.focus();
    return;
  }
    emptyView.style.display="none";
  const div = document.createElement("div");
  div.classList.add("todo");
  const checkedButton = document.createElement("img");
  checkedButton.src = "assets/circle.png";
  const todoTextElement = document.createElement("p");
  todoTextElement.innerText = todoText;
  const deleteButton = document.createElement("img");
  deleteButton.src = "assets/delete.png";

  div.appendChild(checkedButton);
  div.appendChild(todoTextElement);
  div.appendChild(deleteButton);
  addTodo.value = "";
  todoList.appendChild(div);
  clearCompletedButtonDiv.style.display="flex";
  [checkedButton, todoTextElement].forEach((element) => {
    element.addEventListener("click",()=>toggleTodoCompleted(div,checkedButton));
  });

  deleteButton.addEventListener("click", (e) => {
    if(todoList.children.length===2){
      emptyView.style.display="block";
      clearCompletedButtonDiv.style.display="none";
    }
    div.remove();
  });
}

function toggleTodoCompleted(div, checkedButton) {
  const currentChekedButtonSrc = checkedButton.getAttribute("src");
  const newSrc =
    currentChekedButtonSrc === "assets/circle.png"
      ? "assets/Vector.png"
      : "assets/circle.png";
  checkedButton.setAttribute("src", newSrc);
  div.classList.toggle("completed");
}

clearCompletedButton.addEventListener("click",clearCompletedTodos);

function clearCompletedTodos(){
    const completedTodos= getCompletedTodos();
    completedTodos.forEach((todo)=>todo.remove());
    if(todoList.children.length===1){
      emptyView.style.display="block";
      clearCompletedButtonDiv.style.display="none";
    }
}

function getCompletedTodos(){
    const completedTodos=document.querySelectorAll(".completed");
    return completedTodos;
}