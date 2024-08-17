const array = [];

function todoList() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInput = document.querySelector('.js-date-input');
    const DueDate = dateInput.value;

    const timeInput = document.querySelector('.js-time-input');
    const DueTime = timeInput.value;

    if (name === '' || DueDate === '' || DueTime === '') {
        alert('Please enter a name, due date, and time.');
        return;
    }

    array.push({ name, DueDate, DueTime });
    inputElement.value = ''; // Clear input fields
    dateInput.value = '';
    timeInput.value = '';

    printing();
}

function printing() {
    let print = '';
    for (let i = 0; i < array.length; i++) {
        const todoObject = array[i];
        const { name, DueDate, DueTime } = todoObject;
        const HTML = `
            <div class="todo-item">
                <div>${name}</div>
                <div>${DueDate}</div>
                <div>${DueTime}</div>
                <button class="delete" onclick="
                    array.splice(${i},1);
                    printing();
                ">Delete</button>
            </div>`;
        print += HTML;
    }
    document.querySelector('.js-print').innerHTML = print;
}

function handleKey(event) {
    if (event.key === 'Enter') {
        todoList();
    }
}

// Dark Mode Toggle
const toggleSwitch = document.getElementById('darkModeToggle');
toggleSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(array));
}

// Load tasks from local storage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
      array = JSON.parse(savedTasks);
      printing();
  }
}

// Call loadTasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Save tasks whenever the list changes
function printing() {
  let print = '';
  for (let i = 0; i < array.length; i++) {
      const todoObject = array[i];
      const { name, DueDate, DueTime } = todoObject;
      const HTML = `
          <div class="todo-item">
              <div>${name}</div>
              <div>${DueDate}</div>
              <div>${DueTime}</div>
              <button class="delete" onclick="
                  array.splice(${i},1);
                  printing();
                  saveTasks();
              ">Delete</button>
          </div>`;
      print += HTML;
  }
  document.querySelector('.js-print').innerHTML = print;
}
