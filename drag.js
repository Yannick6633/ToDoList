let btn = document.querySelector('.add-todo');
let remove = document.querySelector('.draggable');
let dragSrcEl;
let tasks = [];

function dragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragEnter(e) {
    this.classList.add('over');
}

function dragLeave(e) {
    e.stopPropagation();
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}

function dragEnd(e) {
    let listItems = document.querySelectorAll('.draggable');
    [].forEach.call(listItems, function(item) {
        item.classList.remove('over');
    });
    this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragenter', dragEnter, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
}

let listItems = document.querySelectorAll('.draggable');
[].forEach.call(listItems, function(item) {
    addEventsDragAndDrop(item);
});

function addNewItem() {
    let newItem = document.getElementById('newTask').nodeValue;
    if (newItem) {
        tasks.push(newItem);
        localStorage.setItem('tasks', JSON.stringify(tasks))
        list();
    }
}

function list() {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks) {
        tasks.forEach(task => {
            document.querySelector('.input').value = '';
            let li = document.createElement('li');
            let attr = document.createAttribute('draggable');
            let ul = document.querySelector('ul');
            li.className = 'draggable';
            attr.value = 'true';
            li.setAttributeNode(attr);
            li.appendChild(document.createTextNode(task));
            ul.appendChild(li);
            addEventsDragAndDrop(li);
        })
    }
}

btn.addEventListener('click', addNewItem);
list();
