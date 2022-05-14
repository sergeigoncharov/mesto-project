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
};

function popupActionClose (popup) {
  popup.classList.remove('popup_opened');
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

//переменные с именем и ссылкой для добавления карточки
const popupNamePlaceValue = document.querySelector('#popup_input_add_place_name');
const popupLinkPlaceValue = document.querySelector('#popup_input_add_place_link');

//функция, которая добавляет место на страницу
function submitAddCardForm (evt) {
  const namePlace = popupNamePlaceValue.value;
  const linkPlace = popupLinkPlaceValue.value;
  //сбрасываем браузерные настройки отправки формы
  evt.preventDefault();
  //вызываем функцию добавления карточки на страницу
  const addNewCard = createPlacesItemElement(namePlace, linkPlace);
  placesItemWrapper.prepend(addNewCard);
  //закрываем попап
  popupActionClose(popupAddCard);
};

//переменная для смены активности попапа картинки
const popupZoomImage = document.querySelector('#open-place')

//находим форму попапа редактирования профиля
const formEditProfileElement = document.querySelector('#popup_form_edit_profile');

//сохраняем попап редактирования профиля
formEditProfileElement.addEventListener('submit', submitEditProfileForm);

//находим родителя карточки
const placesItemWrapper = document.querySelector('.places__wrapper');

//переменные для изображения и описания в попапе картинки карточки
const popupImage = document.querySelector('.popup__img');
const popupImageDescription = document.querySelector('.popup__description')

//функция, которая принимает на входи title и img и вставляет в заготовку карточки
const createPlacesItemElement = function(title, img) {
  //находим tamplate карточки
  const placesItemTemplate = document.querySelector('#places__item').content;

  //находим карточку и клонируем
  const elementPlacesItem = placesItemTemplate.querySelector('.places__item').cloneNode(true);
  const elementPlaceItemTitle = elementPlacesItem.querySelector('.places__item-title');
  const elementPlaceItemImg = elementPlacesItem.querySelector('.places__item-img');

  elementPlaceItemTitle.textContent = title;
  elementPlaceItemImg.src = img;
  elementPlaceItemImg.alt = title;

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
    popupImage.src = img;
    popupImage.alt = title;
    popupImageDescription.textContent = title;
    popupActionOpen(popupZoomImage);
  });

  return elementPlacesItem;

};

//перебираем массив и передаем из него имя и ссылку в заготовку карточки
//после чего добавляем карточку
initialCards.forEach((card) => {
  const result = createPlacesItemElement(card.name, card.link);
  placesItemWrapper.append(result);
});

//закрываем попап с картинкой
const closeImgPlaceButton = document.querySelector('#open-place-close');
closeImgPlaceButton.addEventListener('click', function () {
  popupActionClose(popupZoomImage)
});

//находим форму попапа добавления места
const formAddPlaceElement = document.querySelector('#popup_form_add_place');

//сохраняем попап добавления места
formAddPlaceElement.addEventListener('submit', submitAddCardForm);
