//функции работы модальных окон

import { submitAddCardForm } from "./card.js";
import { cohort, editProfile, editAvatar } from "./api.js";
import { config, resetError } from "./validate.js"

//находим аватар
const profileAvatar = document.querySelector('.profile__avatar');

//кнопка сабмита в добавлении карточки
const submitButtonAddCard = document.querySelector('#add_place_button');

//находим форму попапа добавления карточки
const formAddPlaceElement = document.querySelector('#popup_form_add_place');

//находим имя профиля на странице и поле с именем в попапе
const profileName = document.querySelector('.profile__info-username');
const profileNameEdit = document.querySelector('#popup_input_edit_profile_username');

//находим занятие на странице и поле с занятием в попапе
const profileJob = document.querySelector('.profile__info-job-description');
const profileJobEdit = document.querySelector('#popup_input_edit_profile_job-description');

//переменная для попапа редактирования профиля
const popupEditProfile = document.querySelector('#edit-profile');

//переменная для работы с аватаром
const popupEditAvatar = document.querySelector('#edit-avatar');
const avatarEditPosition = document.querySelector('.profile__avatar-img');
const avatarEditButton = document.querySelector('#profile__info-avatar');

function openPopupAction (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener("keyup", closePopupEscAction);
  document.addEventListener("mousedown", closePopupOverlayAction);
};


function closePopupAction (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keyup", closePopupEscAction);
  document.removeEventListener("mousedown", closePopupOverlayAction);
};

//слушатель при наведении мыши на аватар
avatarEditPosition.addEventListener("mouseenter", function () {
  avatarEditButton.removeAttribute('hidden')
});

//слушатель, когда мышка не на аватаре
avatarEditPosition.addEventListener("mouseleave", function () {
  avatarEditButton.setAttribute('hidden', true)
});

//октрываем окно редактирования аватара
avatarEditPosition.addEventListener('click', function () {
  openPopupAction(popupEditAvatar)
});

//закрываем окно редактирования аватара
const avatarCloseButton = document.querySelector('#edit-avatar-close');
avatarCloseButton.addEventListener('click', function () {
  closePopupAction(popupEditAvatar)
});

//октрываем окно редактирования профиля
const openProfileEditButton = document.querySelector('.profile__info-edit-button');
openProfileEditButton.addEventListener('click', function () {
  fillInFormInputs();
  openPopupAction(popupEditProfile)
});

//закрываем окно редактирования профиля
const closeProfileEditButton = document.querySelector('#edit-profile-close');
closeProfileEditButton.addEventListener('click', function () {
  closePopupAction(popupEditProfile)
  resetError(popupEditProfile, config)
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

  //отправляем запрос PATCH на обновление данных на сервере
  editProfile(cohort, profileNameEdit.value, profileJobEdit.value)

  //закрываем попап
  closePopupAction(popupEditProfile);
};

//обновляем аватар
function submitEditAvatar (evt) {
  const editAvatarImg = document.querySelector('#popup_input_edit_avatar')
  //сбрасываем браузерные настройки отправки формы
  evt.preventDefault();
  avatarEditPosition.src = editAvatarImg.value;

  //отправляем запрос PATCH на обновление данных на сервере
  editAvatar(cohort, editAvatarImg.value)

  //закрываем попап
  closePopupAction(popupEditAvatar);
};

//переменная кнопки для попапа добавления карточки места
const popupAddCard = document.querySelector('#add-place');

//сбрасываем форму добавлен карточки
function resetFormAddPlace () {
  formAddPlaceElement.reset();
  //выключаем кнопку сабмита
  submitButtonAddCard.classList.add('popup__form-button_disabled');
  submitButtonAddCard.setAttribute('disabled', true);
}

//открываем окно добавления места
const openAddPlaceButton = document.querySelector('.profile__info-add-button');
openAddPlaceButton.addEventListener('click', function () {
  openPopupAction(popupAddCard)
  resetFormAddPlace();
});

//закрываем окно добавления места
const closeAddPlaceButton = document.querySelector('#add-place-close');
closeAddPlaceButton.addEventListener('click', function () {
  closePopupAction(popupAddCard)
  resetError(formAddPlaceElement, config)
});


//переменная для смены активности попапа картинки
const popupZoomImage = document.querySelector('#open-place')

//находим форму попапа редактирования профиля
const formEditProfileElement = document.querySelector('#popup_form_edit_profile');

//сохраняем попап редактирования профиля
formEditProfileElement.addEventListener('submit', submitEditProfileForm);

//находим форму попапа редактирования аватара
const formEditAvatar = document.querySelector('#popup_form_edit_avatar');

//сохраняем попап редактирования аватара
formEditAvatar.addEventListener('submit', submitEditAvatar);


//закрываем попап с картинкой
const closeImgPlaceButton = document.querySelector('#open-place-close');
closeImgPlaceButton.addEventListener('click', function () {
  closePopupAction(popupZoomImage)
});

//функция с закрытие попап по клавише Esc
function closePopupEscAction(evt) {
  if (evt.key === 'Escape') {
    const popupOpenedClass = document.querySelector('.popup_opened');

    closePopupAction(popupOpenedClass);
  }
};

//функция с закрытие попап по нажатии на оверлей
function closePopupOverlayAction(evt) {
  if (evt.target.classList.contains('popup_opened')) {

    closePopupAction(evt.target)
  }
};



//сохраняем попап добавления карточки
formAddPlaceElement.addEventListener('submit', submitAddCardForm);


export { openPopupAction, closePopupAction, popupZoomImage, popupAddCard, profileName, profileJob, profileAvatar, profileNameEdit, profileJobEdit, formAddPlaceElement }
