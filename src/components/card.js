//функции для работы с карточками

import { openPopupAction, closePopupAction, popupZoomImage, popupAddCard, formAddPlaceElement, submitButtonAddCard } from "./modal.js";
import { getProfile, cohortId, postCardRequest, putLikeCardRequest, deleteLikeCardRequest, renderLoading, deleteCardRequest } from "./api.js"

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

  function renderDeleteButtonCard (cohortId, cardId) {
      getProfile(cohortId)
      .then((res) => validateResponse(res))
      .then ((data) => {
        if (cardId !== data._id) {
        trashButton.remove()
      } else {
        trashButton.classList.add('.places__item-button_enable')
      }
      })
    }

//функция, которая принимает на входи title и img и вставляет в заготовку карточки
const createPlacesItemElement = function(title, img, likes, cardId, ownerId) {

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

  const likeButton = elementPlacesItem.querySelector('.places__item-button')
  //слушаем кнопку с лайком и если на неё клацнули меняем состояние лайка

  likeButton.addEventListener('click', function(evt) {
    evt.target.classList.toggle('places__item-button_enable');
    if (elementPlacesItem.querySelector('.places__item-button_enable')) {
      putLikeCardRequest(cohortId, cardId)
      console.log(cardId)
      elementPlaceLike.textContent = likes;
    }
       else {
        deleteLikeCardRequest(cohortId, cardId)
        elementPlaceLike.textContent = likes;
      }
  })

  const trashButton = elementPlacesItem.querySelector('.places__trash-button')



  renderDeleteButtonCard(cohortId, cardId)

  //слушаем кнопку с корзинкой и если на неё клацнули удалем карточку
  trashButton.addEventListener('click', function(evt) {
    deleteCardRequest(cohortId, cardId)
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




//функция, которая добавляет карточку на страницу
function submitAddCardForm () {
  const namePlace = popupNamePlaceValue.value;
  const linkPlace = popupLinkPlaceValue.value;
  //сбрасываем браузерные настройки отправки формы
  // evt.preventDefault();
  renderLoading(true, submitButtonAddCard)
  //вызываем функцию добавления карточки на страницу
  const addNewCard = createPlacesItemElement(namePlace, linkPlace);
  placesItemWrapper.prepend(addNewCard);
  postCardRequest (cohortId, namePlace, linkPlace);
  formAddPlaceElement.reset();
  //закрываем попап
  closePopupAction(popupAddCard);
};


export {submitAddCardForm, createPlacesItemElement, placesItemWrapper}
