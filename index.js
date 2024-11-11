const PRINT_FILM = 'Введите фильм';

const inputNode = document.getElementById('movieInput');
const addBtnNode = document.getElementById('addBtn');
const emptyList = document.getElementById('emptyList')
const moviesList = document.getElementById('moviesList');
const cleanBtnNode = document.getElementById('cleanBtn');

const addMovieHandler = () => {

    // Получаем значение от пользователя
    const movieFromUser = inputNode.value;

    const movieHtml = `
    <li id="movieItem" class="items__item">
            <label id="check" class="check">
                <input type="checkbox" data-action="done" class="check__box">
                ${movieFromUser}
            </label>
            <button data-action="delete" id="cleanBtn" class="items__item-btn">
                <img src="./img/delete.png" alt="delete" class="">
             </button>
        </li>
    `
    moviesList.insertAdjacentHTML('beforeend', movieHtml);

    // Очищаем поле ввода и возвращаем фокус на поле ввода
    inputNode.value = '';
    inputNode.focus();

    // Проверка. Убирает первый элемент li с текстом "Добавь свой первый фильм"
    if (moviesList.children.length > 1) {
        emptyList.classList.add('items-hello')
    }

}

const deleteMovieHandler = (event) => {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('li');
        parentNode.remove()

    }
    // Проверка. Убирает первый элемент li с текстом "Добавь свой первый фильм"
    if (moviesList.children.length === 1) {
        emptyList.classList.remove('items-hello')
    }
}

const doneMovieHandler = (event) => {
    if (event.target.dataset.action === 'done') {
        const parent = event.target.closest('li');
        parent.classList.toggle('item-done')

    }
}

addBtnNode.addEventListener('click', addMovieHandler);
moviesList.addEventListener('click', deleteMovieHandler);
moviesList.addEventListener('click', doneMovieHandler);
