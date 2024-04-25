const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("listContainer");

const taskArray = JSON.parse(localStorage.getItem("taskArray")) || [];
showAllTask();
function addTask() {
  if (inputBox.value === "") {
    alert("Please Write Something!");
  } else {
    let li = document.createElement("li");

    const taskObj = {
      id: taskArray.length + 1,
      task: inputBox.value,
      isCompleted: false,
    };
    li.setAttribute("id", taskObj.id);
    taskArray.push(taskObj);
    li.innerHTML = taskObj.task;
    console.log(taskArray);
    listContainer.appendChild(li);
    inputBox.value = "";
    let span = document.createElement("span");
    span.innerHTML = "&#10005;";
    li.appendChild(span);
    li.classList.add("add");
    saveTask();
  }
}


function showAllTask() {
  listContainer.innerHTML = "";
  taskArray.forEach((task) => {
    let li = document.createElement("li");
    li.setAttribute("id", task.id);
    li.innerHTML = task.task;
    if (task.isCompleted) {
      li.classList.add("checked");
    }
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "&#10005;";
    li.appendChild(span);
    li.classList.add("add");
  });
}

function showCompletedTask() {
    listContainer.innerHTML = "";
    taskArray.forEach((task) => {
        if (task.isCompleted) {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.innerHTML = task.task;
        li.classList.add("checked");
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&#10005;";
        li.appendChild(span);
        li.classList.add("add");
        }
    });
    
}

function showIncompleteTask() {
    listContainer.innerHTML = "";
    taskArray.forEach((task) => {
        if (!task.isCompleted) {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);
        li.innerHTML = task.task;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "&#10005;";
        li.appendChild(span);
        li.classList.add("add");
        }
    });

}
function saveTask() {
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
}

listContainer.addEventListener("click", (e) => {
    e.target.parentElement.classList.remove("add");
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      taskArray.forEach((task) => {
        if (task.id == e.target.id) {
          task.isCompleted = !task.isCompleted;
        }
      });

      saveTask();
      console.log(taskArray);
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.classList.add("delete");
      setTimeout(() => {
        e.target.parentElement.remove();
      }, 350);
      taskArray.forEach((task, index) => {
        if (task.id == e.target.parentElement.id) {
          taskArray.splice(index, 1);
        }
      });
      saveTask();
    }
  });


const status = document.querySelectorAll("#status h3");

console.log(status);
status.forEach((s) => {
  s.addEventListener("click", (e) => {
    let current = document.querySelector(".active");
    current.classList.remove("active");
    e.target.classList.add("active");
    if(e.target.id === "all"){
      showAllTask();
    }else if(e.target.id === "compTask"){
        showCompletedTask();
    }
    else{
        showIncompleteTask();
    }
  });
});
