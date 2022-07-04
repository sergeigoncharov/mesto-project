//функции работы модальных окон

import { submitAddCardForm } from "./card.js";

const profileAvatar = document.querySelector('.profile__avatar');

//находим имя профиля на странице и поле с именем в попапе
const profileName = document.querySelector('.profile__info-username');
const profileNameEdit = document.querySelector('#popup_input_edit_profile_username');

//находим занятие на странице и поле с занятием в попапе
const profileJob = document.querySelector('.profile__info-job-description');
const profileJobEdit = document.querySelector('#popup_input_edit_profile_job-description');

//переменная для попапа редактирования профиля
const popupEditProfile = document.querySelector('#edit-profile');

function popupActionOpen (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener("keyup", popupCloseEsc);
  document.addEventListener("mousedown", popupCloseOverlay);
};

function popupActionClose (popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener("keyup", popupCloseEsc);
  document.removeEventListener("mousedown", popupCloseOverlay);
};


//октрываем окно редактирования профиля
const openProfileEditButton = document.querySelector('.profile__info-edit-button');
openProfileEditButton.addEventListener('click', function () {
  fillInFormInputs();
  popupActionOpen(popupEditProfile)
});

//закрываем окно редактирования профиля
const closeProfileEditButton = document.querySelector('#edit-profile-close');
closeProfileEditButton.addEventListener('click', function () {
  popupActionClose(popupEditProfile)
});

//функция, которая в попап вставляет имя и занятие со страницы
const fillInFormInputs = function() {
  profileNameEdit.value = profileName.textContent.trim();
  profileJobEdit.value = profileJob.textContent.trim();
};

//функция, которая из попапа вставляет имя и занятие на страницу
function submitEditProfileForm (evt) {
  //сбрасываем браузерные настройки отправки формы
  evt.preventDefault();
  profileName.textContent = profileNameEdit.value;
  profileJob.textContent = profileJobEdit.value;

  //закрываем попап
  popupActionClose(popupEditProfile);
};

//переменная кнопки для попапа добавления карточки места
const popupAddCard = document.querySelector('#add-place');

//открываем окно добавления места
const openAddPlaceButton = document.querySelector('.profile__info-add-button');
openAddPlaceButton.addEventListener('click', function () {
  popupActionOpen(popupAddCard)
});

//закрываем окно добавления места
const closeAddPlaceButton = document.querySelector('#add-place-close');
closeAddPlaceButton.addEventListener('click', function () {
  popupActionClose(popupAddCard)
});


//переменная для смены активности попапа картинки
const popupZoomImage = document.querySelector('#open-place')

//находим форму попапа редактирования профиля
const formEditProfileElement = document.querySelector('#popup_form_edit_profile');

//сохраняем попап редактирования профиля
formEditProfileElement.addEventListener('submit', submitEditProfileForm);

//закрываем попап с картинкой
const closeImgPlaceButton = document.querySelector('#open-place-close');
closeImgPlaceButton.addEventListener('click', function () {
  popupActionClose(popupZoomImage)
});

//функция с закрытие попап по клавише Esc
function popupCloseEsc(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    popupActionClose(openPopup);
  }
};

//функция с закрытие попап по нажатии на оверлей
function popupCloseOverlay(evt) {
  if (evt.target.classList.contains('popup_opened')) {
    popupActionClose(evt.target)
  }
}

//закрываем попап с картинкой места
// popupAddCard.addEventListener('keydown', keyHandler);

//находим форму попапа добавления карточки
const formAddPlaceElement = document.querySelector('#popup_form_add_place');

//сохраняем попап добавления карточки
formAddPlaceElement.addEventListener('submit', submitAddCardForm);

export {popupActionOpen, popupActionClose, popupZoomImage, popupAddCard, profileName, profileJob, profileAvatar}
