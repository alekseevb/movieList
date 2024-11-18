const PRINT_FILM = 'Введите фильм';

const inputNode = document.getElementById('movieInput');
const addBtnNode = document.getElementById('addBtn');
const emptyList = document.getElementById('emptyList')
const moviesList = document.getElementById('moviesList');
const cleanBtnNode = document.getElementById('cleanBtn');

let movies = [];

if (localStorage.getItem('movie')) {
    movies = JSON.parse(localStorage.getItem('movie'));
    console.log(movies);
    movies.forEach(movie => renderMovie(movie));
}

checkEmptyList();

const addMovieHandler = () => {

    // Получаем значение от пользователя
    const movieFromUser = inputNode.value;

    const newMovie = {
        id: Date.now(),
        text: movieFromUser,
        done: false,
    }

    movies.push(newMovie);

    savetoLocalStorage()

    console.log(movies);

    renderMovie(newMovie);

    // Очищаем поле ввода и возвращаем фокус на поле ввода
    inputNode.value = '';
    inputNode.focus();
    checkEmptyList()
}

const deleteMovieHandler = (event) => {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('li');
        //определяем id задачи
        const id = Number(parentNode.id)

        //находим индекс задачи в массиве
        const index = movies.findIndex((movie) => movie.id === id);

        //удаляем задачу из массива с фильмами
        movies.splice(index, 1)

        savetoLocalStorage()

        parentNode.remove()

    }
    checkEmptyList()
}

const doneMovieHandler = (event) => {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('li');
        const id = Number(parentNode.id);

        const movie = movies.find((movie) => movie.id === id);
        movie.done = !movie.done;
        parentNode.classList.toggle('item-done')

        savetoLocalStorage()
    }

}

function checkEmptyList() {
    if (movies.length === 0) {
        const emptyListHTML = `<li id="emptyList">Добавь свой первый фильм</li>`;
        moviesList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (movies.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function savetoLocalStorage() {
    localStorage.setItem('movie', JSON.stringify(movies))
}

function renderMovie(movie) {
    //формируем css класс
    const cssclass = movie.done ? 'items__item item-done' : 'items__item';

    const movieHtml = `
<li id="${movie.id}" class="${cssclass}">
        <label id="check" class="check">
            <input type="checkbox" data-action="done" class="check__box">
            ${movie.text}
        </label>
        <button data-action="delete" id="cleanBtn" class="items__item-btn">
            <img src="./img/delete.png" alt="delete" class="">
         </button>
    </li>
`
    moviesList.insertAdjacentHTML('beforeend', movieHtml);
}


addBtnNode.addEventListener('click', addMovieHandler);
moviesList.addEventListener('click', deleteMovieHandler);
moviesList.addEventListener('click', doneMovieHandler);
