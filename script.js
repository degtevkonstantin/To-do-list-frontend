let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

window.onload = () => {
  render();
}

const allTasksDelete = () => { // функция удаления всех тасков
  allTasks = [];
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const showError = (message) => {
  error = document.getElementById('error');
  error.innerText = message
}

const checkEmptyLine = (string) => { // проверка на пустую строку
  return string.trim() !== ''
}

const addTask = () => { // функция добавление таска
  if (document.getElementById('add-task') === null) {
    showError('Отсутсвует блок')
    return;
  }

  const input = document.getElementById('add-task')
  if (checkEmptyLine(input.value)) {
    allTasks.push({
      text: input.value,
      isCheck: false
    });
    input.value = '';
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
    return;
  }

  showError('Вы ничего не ввели');
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

  allTasks.sort((a, b) => {
    if (a.isCheck > b.isCheck) {
      return 1;
    }
    if (a.isCheck < b.isCheck) {
      return -1;
    }
    return 0;
  })

  allTasks.forEach((element, index) => {
    const { text: elementText, isCheck: elementIsCheck } = element;
    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'tasks';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = elementIsCheck;
    container.appendChild(checkbox);
    checkbox.onchange = () => {
      checkboxSwap(element);
    }

    const text = document.createElement('p');
    text.innerText = elementText;
    text.className = elementIsCheck ? 'text-tasks, done-text' : 'text-tasks';
    container.appendChild(text);

    const imageEdit = document.createElement('img');
    const buttonEdit = document.createElement('button');
    imageEdit.src = 'img/Edit.svg';
    imageEdit.alt = '';
    buttonEdit.appendChild(imageEdit);
    container.appendChild(buttonEdit);
    buttonEdit.onclick = () => {
      fuctionEdit(container, text, checkbox, imageEdit, imageDelete, buttonDel, buttonEdit, elementText, element)
    }

    const imageDelete = document.createElement('img');
    const buttonDel = document.createElement('button');
    imageDelete.src = 'img/Delete.svg';
    imageDelete.alt = ''
    buttonDel.id = 'id-delete';
    buttonDel.appendChild(imageDelete);
    container.appendChild(buttonDel);
    content.appendChild(container);

    buttonDel.onclick = () => {
      clickDelete(index);
    }
  })
  document.getElementById('error').textContent = ''
}

const checkboxSwap = (element) => {
  element.isCheck = !element.isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}


const fuctionEdit = (container, text, checkbox, imageEdit, imageDelete, buttonDel, buttonEdit, elementText, element) => { //функция редактировать
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'edit-input';
  inp.id = 'idInp';

  container.removeChild(text);
  container.removeChild(buttonEdit);
  container.removeChild(buttonDel);
  container.removeChild(checkbox);
  container.appendChild(inp);

  const editReturn = document.createElement('button'); 
  editReturn.type = 'button';
  editReturn.appendChild(imageEdit);
  container.appendChild(editReturn);

  editReturn.onclick = () => {
    clickEFinishEdit(inp, element)
  };

  const buttonCancel = document.createElement('button'); 
  inp.value = elementText;
  buttonCancel.appendChild(imageDelete);
  container.appendChild(buttonCancel);

  buttonCancel.onclick = () => { 
    clickCancel(elementText)
  }
}

const clickDelete = (index) => { 
  array = allTasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

const clickEFinishEdit = (inp, element) => {
  if (checkEmptyLine(inp.value)) {
    element.text = inp.value;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    render();
    return;
  }
  showError('Вы ничего не ввели');
  return;
};

const clickCancel = (elementText) => {
  elementText = elementText;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}