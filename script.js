let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
  render();
}

const deleteAllTasks = () => {
  allTasks = [];
  sortAllTasks = [];
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
  return
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
}

render = () => {
  let sortAllTasks = allTasks

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
    const isCheck = task.isCheck
    const taskText = task.text
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'tasks';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCheck;
    container.appendChild(checkbox);
    checkbox.onchange = () => {
      editCheckbox(index);
    }

    const text = document.createElement('p');
    text.id = `text-${index}`
    text.innerText = taskText;
    text.className = isCheck ? 'text-tasks, done-text' : 'text-tasks';
    container.appendChild(text);

    const buttonEdit = document.createElement('button');
    buttonEdit.id = `btn-edit-${index}`
    const imageEdit = document.createElement('img');
    imageEdit.src = 'img/Edit.svg';
    imageEdit.alt = '';
    buttonEdit.appendChild(imageEdit);
    container.appendChild(buttonEdit);
    buttonEdit.onclick = () => {
      editTask(index, task)
    }

    const buttonDelete = document.createElement('button');
    buttonDelete.id = `btn-delete-${index}`
    const imageDelete = document.createElement('img');
    imageDelete.src = 'img/Delete.svg';
    imageDelete.alt = ''
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
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const editTask = (index, task) => { //функция редактировать
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  const container = document.getElementById(`task-${index}`)
  input.value = task.text

  const text = document.getElementById(`text-${index}`)
  container.replaceChild(input, text)
  
  const saveEdit = document.getElementById(`btn-edit-${index }`)
  const buttonCancel = document.getElementById(`btn-delete-${index}`)

  saveEdit.onclick = () => {
    endEditing(input.value, task);
  };

  buttonCancel.onclick = () => { 
    render()
  }
}

const deleteTask = (index) => { 
  allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const endEditing = (input, task) => {
  if (checkEmptyString(input)) {
    task.text = input;
    console.log(task, input)
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
    return;
  }
  showError('Вы ничего не ввели');
  return;
};
