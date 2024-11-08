const inputNode = document.getElementById('movieInput')
const addBtnNode = document.getElementById('addBtn');
const moviesList = document.getElementById('moviesList')

const movieList = [];

// 1. считывать значения с input
// 2. Проверять на пустое значение
// 2. записывать в массив
// 3. render фильм
// 2. обрабатывать клик на нажатие кнопки
//

const renderMovie = () => {
    moviesList.innerText = '';

    movieList.forEach((movie) => {
        const movieItem = document.createElement('li');
        movieItem.innerText = `${movie}`
        movieItem.className = 'items__item'

        moviesList.appendChild(movieItem);
    })
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