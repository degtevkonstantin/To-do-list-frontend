let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let sortAllTasks = allTasks

window.onload = () => {
  render();
}

const deleteAllTasks = () => {
  allTasks = [];
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const showError = (message) => {
  const error = document.getElementById('error');
  if (!error){
    return
  }
  error.innerText = message
}

const checkEmptyString = (string) => { // проверка на пустую строку
  return string.trim() !== '';
}

const addTask = () => { // функция добавление таска
  const input = document.getElementById('add-task')

  if (!input) {
    return;
  }

  if (!checkEmptyString(input.value)) {
    showError('Вы ничего не ввели');
    return;
  }
  allTasks.push({
    text: input.value,
    isCheck: false
  });
  input.value = '';
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
  return;
}

render = () => {
  const content = document.getElementById('content-page');
  if (!content) {
    return;
  };

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };


   sortAllTasks.sort((a, b) => {
    if (a.isCheck > b.isCheck) {
      return 1;
    }
    if (a.isCheck < b.isCheck) {
      return -1;
    }
    return 0;
  })

  

  sortAllTasks.forEach((task, index) => {
    const { text: taskText, isCheck: IsCheck } = task;
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'tasks';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = IsCheck;
    container.appendChild(checkbox);
    checkbox.onchange = () => {
      editCheckbox(index);
    }

    const text = document.createElement('p');
    text.innerText = taskText;
    text.className = IsCheck ? 'text-tasks, done-text' : 'text-tasks';
    container.appendChild(text);

    const imageEdit = document.createElement('img');
    const buttonEdit = document.createElement('button');
    imageEdit.src = 'img/Edit.svg';
    imageEdit.alt = '';
    buttonEdit.appendChild(imageEdit);
    container.appendChild(buttonEdit);
    buttonEdit.onclick = () => {
      editTask(container.id, task)
    }

    const imageDelete = document.createElement('img');
    const buttonDelete = document.createElement('button');
    imageDelete.src = 'img/Delete.svg';
    imageDelete.alt = ''
    buttonDelete.id = 'id-delete';
    buttonDelete.appendChild(imageDelete);
    container.appendChild(buttonDelete);
    content.appendChild(container);

    buttonDelete.onclick = () => {
      deleteTask(index);
    }
  })
  showError('');
}

const editCheckbox = (index) => {
  console.log(allTasks)
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const editTask = (id, task) => { //функция редактировать
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  container = document.getElementById(id)
  input.value = task.text
  
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(input)

  const saveEdit = document.createElement('button'); 
  saveEdit.type = 'button';
  const imageEdit = document.createElement('img')
  imageEdit.src = 'img/Edit.svg'
  saveEdit.appendChild(imageEdit);
  container.appendChild(saveEdit);

  saveEdit.onclick = () => {
    finishEdit(input, task)
  };

  const buttonCancel = document.createElement('button'); 
  const imageDelete = document.createElement('img')
  imageDelete.src = 'img/Delete.svg'
  buttonCancel.appendChild(imageDelete);
  container.appendChild(buttonCancel);

  buttonCancel.onclick = () => { 
    render()
  }
}

const deleteTask = (index) => { 
  array = allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const finishEdit = (inp, task) => {
  if (checkEmptyString(inp.value)) {
    task.text = inp.value;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
    return;
  }
  showError('Вы ничего не ввели');
  return;
};
