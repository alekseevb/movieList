const inputNode = document.getElementById('movieInput')
const addBtnNode = document.getElementById('addBtn');
const moviesList = document.getElementById('moviesList')

const movieList = [];

// 1. Добавить стили для зачеркивания
// 1. Добавлять класс с зачеркиванием
// 2. Добавить кнопку для обработки удаления


const renderMovie = () => {
    let postHTML = '';

    movieList.forEach((movie) => {
        postHTML += `
        <li id="movieItem" class="items__item ">
            <label id="check" class="check">
                <input type="checkbox" class="check__box">
                ${movie}
            </label>
            <button class="items__item-btn">
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
        alert('Введите фильм')
        return;
    }

    movieList.push(currentValue);

    cleanValueFromUser();
    renderMovie()
}


addBtnNode.addEventListener('click', addButtonHandler)