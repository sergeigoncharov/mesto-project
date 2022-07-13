//функции работы модальных окон

import { submitAddCardForm } from "./card.js";
import { cohort, editProfile } from "./requests.js";

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

function openPopupAction (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener("keyup", closePopupEscAction);
  document.addEventListener("mousedown", closePopupOverlayAction);
};

//элементы которые отображаются ошибки валидации для попапа редактирования профиля
const inputProfileJobDescription = document.querySelector('#popup_input_edit_profile_job-description')
const inputProfileName = document.querySelector('#popup_input_edit_profile_username')
const errorInputProfileJobDescription = document.querySelector('#popup_input_edit_profile_job-description-error')
const errorInputProfileName = document.querySelector('#popup_input_edit_profile_username-error')

//элементы которые отображаются ошибки валидации для попапа создания карточки
const inputPlaceName = document.querySelector('#popup_input_add_place_name')
const inputPlaceLink = document.querySelector('#popup_input_add_place_link')
const errorinputPlaceName = document.querySelector('#popup_input_add_place_name-error')
const errorInputPlaceLink = document.querySelector('#popup_input_add_place_link-error')


function closePopupAction (popup) {
  popup.classList.remove('popup_opened');
  //сбрасываем форму добавлен карточки
  formAddPlaceElement.reset();
  //выключаем кнопку сабмита
  submitButtonAddCard.classList.add('popup__form-button_disabled');
  submitButtonAddCard.setAttribute('disabled', true);

  //очищаем поля и классы ошибок для попапа редактирования профиля
  errorInputProfileJobDescription.textContent = '';
  errorInputProfileJobDescription.setAttribute('hidden', true)
  inputProfileJobDescription.classList.remove('popup__form-input_error');
  errorInputProfileName.textContent = '';
  errorInputProfileName.setAttribute('hidden', true)
  inputProfileName.classList.remove('popup__form-input_error');

  //очищаем поля и классы ошибок для попапа создания нового места
  errorinputPlaceName.textContent = '';
  errorinputPlaceName.setAttribute('hidden', true)
  inputPlaceName.classList.remove('popup__form-input_error');
  errorInputPlaceLink.textContent = '';
  errorInputPlaceLink.setAttribute('hidden', true)
  inputPlaceLink.classList.remove('popup__form-input_error');

  document.removeEventListener("keyup", closePopupEscAction);
  document.removeEventListener("mousedown", closePopupOverlayAction);
};


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

//переменная кнопки для попапа добавления карточки места
const popupAddCard = document.querySelector('#add-place');

//открываем окно добавления места
const openAddPlaceButton = document.querySelector('.profile__info-add-button');
openAddPlaceButton.addEventListener('click', function () {
  openPopupAction(popupAddCard)
});

//закрываем окно добавления места
const closeAddPlaceButton = document.querySelector('#add-place-close');
closeAddPlaceButton.addEventListener('click', function () {
  closePopupAction(popupAddCard)
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