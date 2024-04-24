const inputBox=document.getElementById('input-box');
const listContainer=document.getElementById('listContainer');

function addTask(){
    if(inputBox.value===""){
        alert("Please Write Something!")
    }
    else{
        let li=document.createElement('li')
        li.innerHTML=inputBox.value;
        listContainer.appendChild(li)
        inputBox.value='';
        let span=document.createElement('span');
        span.innerHTML="\&#10005\;"
        li.appendChild(span);
        li.classList.add('add')
        saveTodo();
    }
}


listContainer.addEventListener('click',(e)=>{
    e.target.parentElement.classList.remove('add')
    if(e.target.tagName==='LI'){
        e.target.classList.toggle('checked')
        saveTodo();
    }
    else if(e.target.tagName=='SPAN'){
        e.target.parentElement.classList.add('delete');
        setTimeout(()=>{
            e.target.parentElement.remove()
            saveTodo();
        },350)
    }
})

function saveTodo(){
    localStorage.setItem('task',listContainer.innerHTML)
}

function showTodo(){
    listContainer.innerHTML=localStorage.getItem('task');
}

showTodo();