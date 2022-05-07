//находим имя профиля на странице и поле с именем в попапе
const profileName = document.querySelector('.profile__info-username');
const profileNameEdit = document.querySelector('#popup_input_edit_profile_username');

//находим занятие на странице и поле с занятием в попапе
const profileJob = document.querySelector('.profile__info-job-description');
const profileJobEdit = document.querySelector('#popup_input_edit_profile_job-description');

//функция, которая показывает или убирает класс popup_opened для попапа редактирования профиля
const popupActionEditProfile = function () {
  const popupToggle = document.querySelector('#edit-profile');
  popupToggle.classList.toggle('popup_opened');
};

//функция, которая показывает или убирает класс popup_opened для попапа добавления места
const popupActionAddPlace = function () {
  const popupToggle = document.querySelector('#add-place');
  popupToggle.classList.toggle('popup_opened');
};

//функция, которая в попап вставляет имя и занятие со страницы
const postNameAndJobInPopup = function() {
  // проверяем, что попап открыт
  const checkPopupOpen = document.querySelector('.popup_opened');
  if (checkPopupOpen !== true) {
    // trim убирает пробелы при переносе значения в поле
    profileNameEdit.value = profileName.textContent.trim();
    profileJobEdit.value = profileJob.textContent.trim();
  } else {
      console.log('попап закрыт');
    };
};

//функция, которая из попапа вставляет имя и занятие на страницу
function formEditProfleSubmit (evt) {
  //сбрасываем браузерные настройки отправки формы
  evt.preventDefault();
  profileName.textContent = profileNameEdit.value;
  profileJob.textContent = profileJobEdit.value;

  //закрываем попап
  popupActionEditProfile();
};

//октрываем окно редактирования профиля
const openProfileEditButton = document.querySelector('.profile__info-edit-button');
openProfileEditButton.addEventListener('click', popupActionEditProfile);

//открываем окно добавления места
const openAddPlaceButton = document.querySelector('.profile__info-add-button');
openAddPlaceButton.addEventListener('click', popupActionAddPlace);

//вызываем функцию, которая в попап вставляет имя и занятие со страницы
openProfileEditButton.addEventListener('click', postNameAndJobInPopup);

//закрываем окно редактирования профиля
const closeProfileEditButton = document.querySelector('#edit-profile-close');
closeProfileEditButton.addEventListener('click', popupActionEditProfile);

//закрываем окно добавления места
const closeAddPlaceButton = document.querySelector('#add-place-close');
closeAddPlaceButton.addEventListener('click', popupActionAddPlace);

//находим форму попапа редактирования профиля
const formEditProfileElement = document.querySelector('#popup_form_edit_profile');

//сохраняем попап редактирования профиля
formEditProfileElement.addEventListener('submit', formEditProfleSubmit);

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//функция, которая принимает на входи title и img и вставляет в заготовку карточки
const createPlacesItemElement = function(title, img) {
  //находим tamplate карточки
  const placesItemTemplate = document.querySelector('#places__item').content;
  //находим родителя карточки
  const placesItemWrapper = document.querySelector('.places__wrapper');
  //находим карточку и клонируем
  const elementPlacesItem = placesItemTemplate.querySelector('.places__item').cloneNode(true);

  elementPlacesItem.querySelector('.places__item-title').textContent = title;
  elementPlacesItem.querySelector('.places__item-img').src = img;

  //слушаем кнопку с лайком и если на неё клацнули меняем состояние лайка
  elementPlacesItem.querySelector('.places__item-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('places__item-button_enable');
  });

  //слушаем кнопку с корзинкой и если на неё клацнули удалем карточку
  elementPlacesItem.querySelector('.places__trash-button').addEventListener('click', function(evt) {
    evt.target.closest('.places__item').remove();
  });

  //слушаем картинку на странице и если на неё клацнули, то открывем попап
  elementPlacesItem.querySelector('.places__item-img').addEventListener('click', function() {
    const popupImgage = document.querySelector('.popup__img');
    const popupImageDescription = document.querySelector('.popup__description')
    popupImgage.src = img;
    popupImgage.alt = title;
    popupImageDescription.textContent = title;
    popupActionOpenImgPlace(createPlacesItemElement);
  });

  //добавляем карточку на страницу
  placesItemWrapper.prepend(elementPlacesItem);
};

//перебираем массив и передаем из него имя и ссылку в заготовку карточки
initialCards.forEach((card) => {
  createPlacesItemElement(card.name, card.link);
});

//функция которая меняет активность попапа с картинкой
const popupActionOpenImgPlace = function () {
  const popupToggle = document.querySelector('#open-place');
  popupToggle.classList.toggle('popup_opened');
};

//закрываем попап с картинкой
const closeImgPlaceButton = document.querySelector('#open-place-close');
closeImgPlaceButton.addEventListener('click', popupActionOpenImgPlace);


//функция, которая добавляет место на страницу
function formAddPlaceSubmit (evt) {
  const namePlace = document.querySelector('#popup_input_add_place_name').value;
  const linkPlace = document.querySelector('#popup_input_add_place_link').value;
  //сбрасываем браузерные настройки отправки формы
  evt.preventDefault();
  //вызываем функцию добавления карточки на страницу
  createPlacesItemElement (namePlace, linkPlace);
  //закрываем попап
  popupActionAddPlace();
};

//находим форму попапа добавления места
const formAddPlaceElement = document.querySelector('#popup_form_add_place');

//сохраняем попап добавления места
formAddPlaceElement.addEventListener('submit', formAddPlaceSubmit);
