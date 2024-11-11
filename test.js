// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')


form.addEventListener('submit', addTask)
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)

// Функции
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    //Добавляем задачу на страницу
    taskList.insertAdjacentHTML('beforeend', taskHTML);

    //Очищаем поле ввода
    taskInput.value = '';
    taskInput.focus();

    //Проверка. Если в списке больше 1-го элемента
    if (taskList.children.length > 1) {
        emptyList.classList.add('none')
    }
}

function deleteTask(event) {

    // Проверяем, что клик был НЕ по кнопке "удалить задачу"
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li')
    parentNode.remove()

    // Проверка. Если в списке задач 1-ин элемент, показываем блок "Список дел пуст" 
    if (taskList.children.length === 1) {
        emptyList.classList.remove('none')
    }

}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

}
