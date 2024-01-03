const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

const getTasks = async () => {
  var tasks = await fetch('http://localhost:3333/tasks');
  tasks = await tasks.json();
  return tasks
}

const addTask = async (event) => {
  event.preventDefault(); // Prevenir o comportamento padrão do computador.

  const task = {
    title: inputTask.value
  }

  await fetch('http://localhost:3333/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });

  loadTasks(task);
  inputTask.value = '';

}

const removeTask = async (id) => {

  try {
  
    await fetch(`http://localhost:3333/tasks/${id}`,{
      method: 'DELETE'
  })

} catch (error) {
  console.error(error);
}

  loadTasks();
}

const updateTask = async ({ id, title, status }) => {

  try {
    await fetch(`http://localhost:3333/tasks/${id}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, status })
  })
  } catch (error) {
    console.error(error);
  }

  loadTasks();

}

const formatDate = (dateUTC) => {
  const date = new Date(dateUTC).toLocaleDateString({
    dateStyle: 'long',
    timeStyle: 'long'
  });

  return date;
  
}

const createElement = (tag, innerText = '', innerHTML = '') => {
  const element = document.createElement(tag);

  if (innerText) {
    element.innerText = innerText;
  }

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}

const createSelect = (value) => {

  const options = `
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>`;

  const select = createElement('select', '', options);

  select.value = value;

  return select;
}

const createRow = (task) => {

  const { id, title, created_at, status } = task;
  console.log(status);

  const tr = createElement('tr');
  const tdTitle = createElement('td', title);
  const tdCreatedAt = createElement('td', formatDate(created_at));
  const tdStatus = createElement('td');
  const tdActions = createElement('td');

  const select = createSelect(status);
  select.addEventListener('change', ({ target }) => updateTask({ id, title, status: target.value }));

  const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
  const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

  const editForm = createElement('form');
  const editInput = createElement('input');

  editInput.value = title
  editForm.appendChild(editInput);
  
  editButton.classList.add('btn-action');
  deleteButton.classList.add('btn-action');

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    updateTask({ id, title: editInput.value, status })
  })

  deleteButton.addEventListener('click', () => removeTask(id))
  editButton.addEventListener('click', () => {
    tdTitle.innerText = '';
    tdTitle.appendChild(editForm);
  })

  tdStatus.appendChild(select)

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);
  
  return tr;

}

const loadTasks = async () => {
  const tasks = await getTasks();

  tbody.innerHTML = '';

  tasks.forEach((task) => {
    const tr = createRow(task);
    tbody.appendChild(tr);
  });
}

addForm.addEventListener('submit', addTask);

loadTasks();
