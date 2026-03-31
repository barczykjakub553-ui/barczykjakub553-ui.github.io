const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const newDeadlineInput = document.getElementById('new-deadline');

//wyszukiwanie - input
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  renderTasks(query);
})
//wczytamie zadan
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//renderowanie
function renderTasks(searchTerm = '') {
  todoList.innerHTML = ''; //clean on draw
  let filteredTasks = tasks;

  if (searchTerm) { //wyszukiwanie
    filteredTasks = tasks.filter(task =>
      task.text.toLowerCase().includes(searchTerm)
    );
  }

  filteredTasks.forEach((task, idx) => {
    const li = document.createElement('li');
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';

    // highlight
    if (searchTerm) {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      textSpan.innerHTML = task.text.replace(regex, '<span class="highlight">$1</span>');
    } else {
      textSpan.textContent = task.text;
    }

    li.appendChild(textSpan);

    if (task.deadline) {
      const deadlineSpan = document.createElement('span');
      deadlineSpan.className = 'deadline';
      deadlineSpan.textContent = 'Termin: ' + task.deadline.replace('T', ' ');
      li.appendChild(deadlineSpan);
    }

    //edit
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.onclick = () => {
      startEditTask(idx, task);
    };
    li.appendChild(editBtn);

    //delete
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '🗑️';
    delBtn.onclick = () => {
      // Usuwanie z oryginalnej tablicy
      const realIdx = tasks.indexOf(task);
      tasks.splice(realIdx, 1);
      saveTasks();
      renderTasks(searchInput.value.trim().toLowerCase());
    };
    li.appendChild(delBtn);

    todoList.appendChild(li);
  });
}
//zapisywanie
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function startEditTask(idx, task) {
  todoList.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    if (i === idx) {
      //txt
      li.classList.add('editing');
      const input = document.createElement('input');
      input.type = 'text';
      input.value = t.text;
      input.className = 'edit-input';

      //data
      const dateInput = document.createElement('input');
      dateInput.type = 'datetime-local';
      dateInput.value = t.deadline || '';
      dateInput.className = 'edit-date';

      //approve
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          finishEditTask(idx, input.value, dateInput.value);
        }
        if (e.key === 'Escape') {
          renderTasks(searchInput.value.trim().toLowerCase());
        }
      });
      dateInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          finishEditTask(idx, input.value, dateInput.value);
        }
        if (e.key === 'Escape') {
          renderTasks(searchInput.value.trim().toLowerCase());
        }
      });

      //appr2
      input.addEventListener('blur', () => {
        setTimeout(() => finishEditTask(idx, input.value, dateInput.value), 100);
      });
      dateInput.addEventListener('blur', () => {
        setTimeout(() => finishEditTask(idx, input.value, dateInput.value), 100);
      });

      li.appendChild(input);
      li.appendChild(dateInput);
    } else {
      //default
      const textSpan = document.createElement('span');
      textSpan.className = 'task-text';
      textSpan.textContent = t.text;
      li.appendChild(textSpan);

      if (t.deadline) {
        const deadlineSpan = document.createElement('span');
        deadlineSpan.className = 'deadline';
        deadlineSpan.textContent = 'Termin: ' + t.deadline.replace('T', ' ');
        li.appendChild(deadlineSpan);
      }

      //edit
      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.textContent = '✏️';
      editBtn.onclick = () => {
        startEditTask(i, t);
      };
      li.appendChild(editBtn);

      //delete
      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = '🗑️';
      delBtn.onclick = () => {
        tasks.splice(i, 1);
        saveTasks();
        renderTasks(searchInput.value.trim().toLowerCase());
      };
      li.appendChild(delBtn);
    }
    todoList.appendChild(li);
  });
}

function finishEditTask(idx, newText, newDeadline) {
  newText = newText.trim();
  //valid?
  if (newText.length < 3 || newText.length > 255) {
    alert('Zadanie musi mieć od 3 do 255 znaków.');
    renderTasks(searchInput.value.trim().toLowerCase());
    return;
  }
  if (newDeadline) {
    const now = new Date();
    const deadlineDate = new Date(newDeadline);
    if (deadlineDate < now) {
      alert('Termin musi być pusty lub w przyszłości.');
      renderTasks(searchInput.value.trim().toLowerCase());
      return;
    }
  }
  tasks[idx].text = newText;
  tasks[idx].deadline = newDeadline;
  saveTasks();
  renderTasks(searchInput.value.trim().toLowerCase());
}


//nowe zadanie
addBtn.addEventListener('click', () => {
  const text = newTaskInput.value.trim();
  const deadline = newDeadlineInput.value;

  // Prosta walidacja (do rozbudowy)
  if (text.length < 3 || text.length > 255) {
    alert('Zadanie musi mieć od 3 do 255 znaków.');
    return;
  }
  if (deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    if (deadlineDate < now) {
      alert('Bledna data.');
      return;
    }
  }

  tasks.push({ text, deadline });
  saveTasks();
  renderTasks();

  newTaskInput.value = '';
  newDeadlineInput.value = '';
});

renderTasks();
