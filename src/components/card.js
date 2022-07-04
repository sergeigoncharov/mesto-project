//функции для работы с карточками

import { initialCards } from "./initial-cards.js";
import { popupActionOpen, popupActionClose, popupZoomImage, popupAddCard } from "./modal.js";

//переменные для изображения и описания в попапе картинки карточки
const popupImage = document.querySelector('.popup__img');
const popupImageDescription = document.querySelector('.popup__description')

//находим родителя карточки
const placesItemWrapper = document.querySelector('.places__wrapper');

//переменные с именем и ссылкой для добавления карточки
const popupNamePlaceValue = document.querySelector('#popup_input_add_place_name');
const popupLinkPlaceValue = document.querySelector('#popup_input_add_place_link');

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

//функция, которая добавляет карточку на страницу
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

//перебираем массив и передаем из него имя и ссылку в заготовку карточки
//после чего добавляем карточку
initialCards.forEach((card) => {
  const result = createPlacesItemElement(card.name, card.link);
  placesItemWrapper.append(result);
});

export {submitAddCardForm, createPlacesItemElement, placesItemWrapper}

// //вешаем слушатель на весь блок и при натажии на лайк проставляем его
// songsContainer.addEventListener('click', function (evt) {
//   if (evt.target.classList.contains('song__like')) {
//     evt.target.classList.toggle('song__like_active');
//   };
// });
