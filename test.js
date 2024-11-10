//! неизменяемые величины
FILM_ITEM_REMOVE_BTN = `
			<svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
				<path opacity="0.3" d="M22.3575 3.74463L14.6021 11.5L22.3575 19.2554C22.7689 19.6667 23 20.2247 23 20.8064C23 21.3882 22.7689 21.9462 22.3575 22.3575C21.9462 22.7689 21.3882 23 20.8064 23C20.2247 23 19.6667 22.7689 19.2554 22.3575L11.5 14.6022L3.74463 22.3575C3.33326 22.7689 2.77532 23 2.19355 23C1.61179 23 1.05385 22.7689 0.642476 22.3575C0.231106 21.9462 7.3961e-07 21.3882 7.3961e-07 20.8064C7.3961e-07 20.2247 0.231106 19.6667 0.642476 19.2554L8.39785 11.5L0.642476 3.74463C0.231106 3.33326 0 2.77532 0 2.19355C0 1.61179 0.231106 1.05385 0.642476 0.642477C1.05385 0.231106 1.61178 7.3961e-07 2.19355 7.3961e-07C2.77532 7.3961e-07 3.33326 0.231106 3.74463 0.642477L11.5 8.39785L19.2554 0.642477C19.6667 0.231106 20.2247 0 20.8064 0C21.3882 0 21.9462 0.231106 22.3575 0.642477C22.7689 1.05385 23 1.61178 23 2.19355C23 2.77532 22.7689 3.33326 22.3575 3.74463Z" />
			</svg>
			`,
    FILM_STORAGE_KEY = 'film';

//! получаем контейнер из HTML
const containerNode = document.getElementById('js-container');

//! массив
let filmsArray = [];

//---------------------------------------------------------- Создание элементов -----------------------------------------
const createBox = className => {
    const div = document.createElement('div');
    div.classList.add(className);

    return div;
};
const createTitle = (tag, className, text) => {
    const title = document.createElement(tag);
    title.classList.add(className);
    title.textContent = text;

    return title;
};
const createParagraph = (className, text) => {
    const p = document.createElement('p');
    p.classList.add(className);
    p.textContent = text;

    return p;
};
const createForm = (className, classNameModification) => {
    const form = document.createElement('form');
    form.classList.add(className);
    form.classList.add(classNameModification);

    return form;
};
const createLabel = className => {
    const label = document.createElement('label');
    label.classList.add(className);

    return label;
};
const createInput = (className, placeholder, type) => {
    const input = document.createElement('input');
    input.classList.add(className);
    input.placeholder = placeholder;
    input.type = type;

    return input;
};
const createButton = (className, text, type = 'button') => {
    const button = document.createElement('button');
    button.classList.add(className);
    button.innerHTML = text;
    button.type = type;

    return button;
};
const createList = className => {
    const list = document.createElement('ul');
    list.classList.add(className);

    return list;
};

// ---------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------- Создания Item ---------------------------------------------------------
const createItem = (array, index) => {
    const item = document.createElement('li'),
        itemLabel = createLabel('films-app__item-label'),
        itemCheckbox = createInput('films-app__item-check', 'чекбокс', 'checkbox'),
        itemText = createParagraph('films-app__item-name', array.name),
        itemButton = createButton('films-app__item-button', FILM_ITEM_REMOVE_BTN);

    item.classList.add('films-app__item');

    const changeCheckboxHandler = () => {
        array.done = !array.done;
        toggleClassInFilmsItem(array.done, item, itemCheckbox);
        setFilmsToLocalStorage();
    };
    const removeItemHandler = () => {
        filmsArray.splice(index, 1);
        item.remove();
        setFilmsToLocalStorage();
        render(filmsArray);
    };

    itemCheckbox.addEventListener('click', changeCheckboxHandler);
    itemButton.addEventListener('click', removeItemHandler);

    itemLabel.append(itemCheckbox, itemText);
    item.append(itemLabel, itemButton);

    return { item, itemCheckbox };
};
// ----------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------- LocalStorage -------------------------------------------------------------
//! функция записи в localStorage
const setFilmsToLocalStorage = () => {
    const filmsString = JSON.stringify(filmsArray);
    localStorage.setItem(FILM_STORAGE_KEY, filmsString);
};

//! получаем массив из localStorage
const getFilmStorageString = localStorage.getItem(FILM_STORAGE_KEY);
const getFilmStorage = JSON.parse(getFilmStorageString);
//---------------------------------------------------------------------------------------------------------------------------------------------

//! функция инициализации приложения
const init = () => {
    //! отрисовка HTML-элементов
    appFormLabel.append(appFormInput);
    appForm.append(appFormLabel, appFormButton);
    appListBox.append(appForm, appList);
    appTitlesBox.append(appTitle, appSubtitle, appDesc);
    containerNode.append(appTitlesBox, appListBox);

    //! проверка на массив
    if (Array.isArray(getFilmStorage)) {
        filmsArray = getFilmStorage;
    }

    //! отрисовка данных
    render(filmsArray);
};
//! функция получения данных из поля ввода
const getFilmFromUser = () => {
    const newNameFilm = appFormInput.value;
    return newNameFilm;
};
//! функция добавления данных в массив
const trackFilm = newFilm => {
    const newFilmObj = {
        done: false,
        name: newFilm,
    };
    filmsArray.push(newFilmObj);
};
//! очистка поля ввода
const clearInput = () => {
    appFormInput.value = '';
};
const toggleClassInFilmsItem = (done, item, itemCheckbox) => {
    if (done === true) {
        item.classList.add('films-app__item_done');
        itemCheckbox.checked = true;
    } else {
        item.classList.remove('films-app__item_done');
        itemCheckbox.checked = false;
    }
};
//! функция перерисовки элементов в списке(рендер)
const render = filmsArray => {
    appList.innerHTML = '';
    if (filmsArray.length === 0) {
        const emptyItem = document.createElement('li');
        emptyItem.textContent =
            'Здесь пока нету ни одного фильма, добавьте же скорее...';
        appList.append(emptyItem);
    }
    filmsArray.forEach((film, index) => {
        const newFilmItem = createItem(film, index);
        toggleClassInFilmsItem(
            film.done,
            newFilmItem.item,
            newFilmItem.itemCheckbox
        );
        appList.append(newFilmItem.item);
    });
};


// ----------------------------------------------------------------- Обработчик кнопки -----------------------------------------------------------
//! функция обработчиков
const addFilmHandler = () => {
    if (!appFormInput.value) return;
    const newNameFilmFromUser = getFilmFromUser();
    trackFilm(newNameFilmFromUser);
    clearInput();
    setFilmsToLocalStorage();
    render(filmsArray);
};

init();

//! кнопка добавления
appFormButton.addEventListener('click', addFilmHandler);