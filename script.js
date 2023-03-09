let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

  error.innerText = message;
}

const checkEmptyString = (string) => { 
  return string.trim() !== '';
}

const addTask = () => { 
  const input = document.getElementById('add-task');

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

const render = () => {

  const content = document.getElementById('content-page');

  if (!content) {
    return;
  };

  while (content.firstChild) {
    content.removeChild(content.firstChild);
  };

   const sortAllTasks = allTasks.sort((a, b) => {

    if (a.isCheck > b.isCheck) {
      return 1;
    }

    if (a.isCheck < b.isCheck) {
      return -1;
    }

    return 0;
  })

  sortAllTasks.forEach((task, index) => {
    const {text: taskText, isCheck: isCheck} = task
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

const editTask = (index, task) => { 
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-input';
  input.id = `input-${index}`
  const container = document.getElementById(`task-${index}`)
  input.value = task.text
  const saveValue = task.text

  const text = document.getElementById(`text-${index}`)
  container.replaceChild(input, text)
  
  const buttonEdit = document.getElementById(`btn-edit-${index }`)
  const buttonCancel = document.getElementById(`btn-delete-${index}`)

  buttonEdit.onclick = () => {
    saveEdit(input.value, index);
  };

  buttonCancel.onclick = () => { 
    cancelEdit(index, saveValue, task)
  }
}

const deleteTask = (index) => { 
  allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const saveEdit = (input, index) => {

  if (!checkEmptyString(input)) {
    showError('Вы ничего не ввели');
    return;
  }
  allTasks[index].text = input;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
};

const cancelEdit = (index, saveValue, task) => {
  const container = document.getElementById(`task-${index}`)
  const text = document.createElement('p')
  text.className = 'text-tasks'
  text.id = `text-${index}`
  text.innerText = saveValue;
  const input = document.getElementById(`input-${index}`)
  container.replaceChild(text, input)
  const buttonDelete = document.getElementById(`btn-delete-${index}`)
  const buttonEdit = document.getElementById(`btn-edit-${index }`)
  buttonDelete.onclick = () => {
    deleteTask(index);
  }

  buttonEdit.onclick = () => {
    editTask(index, task)
  }

}