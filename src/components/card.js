//функции для работы с карточками

import { openPopupAction, closePopupAction, popupZoomImage, popupAddCard, formAddPlaceElement } from "./modal.js";
import { cohort, postCardRequest, putLikeCardRequest, deleteLikeCardRequest } from "./api.js"

//переменные для изображения и описания в попапе картинки карточки
const popupImage = document.querySelector('.popup__img');
const popupImageDescription = document.querySelector('.popup__description')

//находим tamplate карточки
const placesItemTemplate = document.querySelector('#places__item').content;

//находим родителя карточки
const placesItemWrapper = document.querySelector('.places__wrapper');

//переменные с именем и ссылкой для добавления карточки
const popupNamePlaceValue = document.querySelector('#popup_input_add_place_name');
const popupLinkPlaceValue = document.querySelector('#popup_input_add_place_link');


//функция, которая принимает на входи title и img и вставляет в заготовку карточки
const createPlacesItemElement = function(title, img, likes) {

  //находим карточку и клонируем
  const elementPlacesItem = placesItemTemplate.querySelector('.places__item').cloneNode(true);
  const elementPlaceItemTitle = elementPlacesItem.querySelector('.places__item-title');
  const elementPlaceItemImg = elementPlacesItem.querySelector('.places__item-img');

  //находим класс с циферкой для лайка
  const elementPlaceLike = elementPlacesItem.querySelector('.places__item-like-number');

  elementPlaceItemTitle.textContent = title;
  elementPlaceItemImg.src = img;
  elementPlaceItemImg.alt = title;
  elementPlaceLike.textContent = likes;

  //слушаем кнопку с лайком и если на неё клацнули меняем состояние лайка
  elementPlacesItem.querySelector('.places__item-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('places__item-button_enable');
    if (elementPlacesItem.querySelector('.places__item-button_enable')) {
      putLikeCardRequest(cohort, '62cbf1c5bdb1f00a9f09a5b2')
      elementPlaceLike.textContent = likes;
    }

       else {
        deleteLikeCardRequest(cohort, '62cbf1c5bdb1f00a9f09a5b2')
        elementPlaceLike.textContent = likes;
      }
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
    openPopupAction(popupZoomImage);
  });

  return elementPlacesItem;

};

const renderDeleteButtonCard = function (id) {
  const profileId ='61d01a9944878b71edfe84ba'
  const trashButton = document.querySelector('#trash-button')
  if (id !== profileId) {
    trashButton.remove()
  } else {
    trashButton.classList.add('.places__item-button_enable')
  }
}


//функция, которая добавляет карточку на страницу
function submitAddCardForm (evt) {
  const namePlace = popupNamePlaceValue.value;
  const linkPlace = popupLinkPlaceValue.value;
  //сбрасываем браузерные настройки отправки формы
  evt.preventDefault();
  //вызываем функцию добавления карточки на страницу
  const addNewCard = createPlacesItemElement(namePlace, linkPlace);
  placesItemWrapper.prepend(addNewCard);
  postCardRequest (cohort, namePlace, linkPlace);
  formAddPlaceElement.reset();
  //закрываем попап
  closePopupAction(popupAddCard);
};


export {submitAddCardForm, createPlacesItemElement, placesItemWrapper, renderDeleteButtonCard}
