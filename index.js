const PRINT_FILM = 'Введите фильм';

const inputNode = document.getElementById('movieInput');
const addBtnNode = document.getElementById('addBtn');
const moviesList = document.getElementById('moviesList');
const cleanBtnNode = document.getElementById('cleanBtn');

const list = [];

// 1. Добавить стили для зачеркивания
// 1. Добавлять класс с зачеркиванием
// 2. Добавить кнопку для обработки удаления
// 3. Серая подлложка остается не изменной, а филмы могут скроллиться

const renderMovie = () => {
    let postHTML = '';

    list.forEach((movie) => {
        postHTML += `
        <li id="movieItem" class="items__item ">
            <label id="check" class="check">
                <input type="checkbox" class="check__box">
                ${movie}
            </label>
            <button id="cleanBtn" class="items__item-btn">
                <img src="./img/delete.png" alt="delete" class="">
             </button>
        </li>
        `
    })
    moviesList.innerHTML = postHTML;
}

const valueFromUser = () => inputNode.value;

const cleanValueFromUser = () => inputNode.value = '';

const addButtonHandler = () => {
    const currentValue = valueFromUser();

    if (!currentValue) {
        alert(PRINT_FILM)
        return;
    }

    list.push(currentValue);

    cleanValueFromUser();
    renderMovie()
}

const cleanButtonHandler = () => {
    list.forEach((movie) => {
        postHTML = '';
    })
}


addBtnNode.addEventListener('click', addButtonHandler);
cleanBtnNode.addEventListener('click', cleanButtonHandler);