const submitForm = document.querySelector('.add');
const addButton = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
const list = document.querySelectorAll('.todos li'); 

let listLenght = list.lenght;

const generateItems = (todo) => {
  
    const html =  `<li>
                    ${todo}
                    <i class="far fa-trash-alt delete"></i>
                  </li>`
todoList.innerHTML += html;
};

function addItems(evt) {
  evt.preventDefault();
  const todo = submitForm.add.value.trim();
  if (todo.length) {
    listLenght = listLenght + 1;
    generateItems(todo);
    submitForm.reset();
  }
}

addButton.addEventListener('click', addItems);
submitForm.addEventListener('submit', addItems);

function deleteTodos(evt) {
  if (evt.target.classList.contains('delete')) {
    evt.target.parentElement.remove();
  }
}

todoList.addEventListener('click', deleteTodos);