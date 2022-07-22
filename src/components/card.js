//функции для работы с карточками

import { openPopupAction, closePopupAction, popupZoomImage, popupAddCard, formAddPlaceElement, submitButtonAddCard } from "./modal.js";
import { postCardRequest, putLikeCardRequest, deleteLikeCardRequest, deleteCardRequest } from "./api.js"
import { profileId, renderLoading } from "./index.js"

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

//отрисовываем ошибку на странице если всё плохо
function renderCardError(err) {
  const cardRenderError = document.querySelector('#places-load-error');
  cardRenderError.removeAttribute('hidden')
  cardRenderError.textContent = err;
}

//функция, которая принимает на входи title и img и вставляет в заготовку карточки
const createPlacesItemElement = function(title, img, likes, cardId, ownerId) {

  //находим карточку и клонируем
  const elementPlacesItem = placesItemTemplate.querySelector('.places__item').cloneNode(true);
  const elementPlaceItemTitle = elementPlacesItem.querySelector('.places__item-title');
  const elementPlaceItemImg = elementPlacesItem.querySelector('.places__item-img');

  const trashButton = elementPlacesItem.querySelector('.places__trash-button')
  const likeButton = elementPlacesItem.querySelector('.places__item-button')

  //находим класс с циферкой для лайка
  const elementPlaceLike = elementPlacesItem.querySelector('.places__item-like-number');

  elementPlaceItemTitle.textContent = title;
  elementPlaceItemImg.src = img;
  elementPlaceItemImg.alt = title;
  elementPlaceLike.textContent = likes.length;

  //удаляем корзинку если карточка не наша, если наша
  if (ownerId !== profileId) {
    trashButton.remove()

    } else {
      trashButton.classList.add('.places__item-button_enable')
  }

  // отображаем лайк, если раньше его ставили
  for(let i=0; i < likes.length; i++){
    if(likes[i]._id === profileId){
      likeButton.classList.add('places__item-button_enable');
    }}

  //слушаем кнопку с лайком и если на неё клацнули меняем сердечко
  likeButton.addEventListener('click', () => switchedLike(elementPlacesItem, likeButton, elementPlaceLike, cardId))

  //слушаем кнопку с корзинкой и если на неё клацнули удалем карточку
  trashButton.addEventListener('click', () => deleteCard(elementPlacesItem, cardId))

  //слушаем картинку карточки и если на неё клацнули, то открывем большу картинку
  elementPlaceItemImg.addEventListener('click', () => openImageCard(img, title));

  return elementPlacesItem;

};

//открываем картинку карточки
const openImageCard = function(img, title) {
  popupImage.src = img;
  popupImage.alt = title;
  popupImageDescription.textContent = title;
  openPopupAction(popupZoomImage);
}

//удаляем карточку
const deleteCard = function (elementPlacesItem, cardId){
  deleteCardRequest(cardId)
  .then(() => {
    elementPlacesItem.remove();
  })
  .catch((err) => {
    renderCardError(`Ошибка загрузки: ${err}`)
  })
}


//меняем состояние лайка
const switchedLike = function(elementPlacesItem, likeButton, elementPlaceLike, cardId){
  if (!elementPlacesItem.querySelector('.places__item-button_enable')) {
    putLikeCardRequest(cardId)
    .then((res) => {
      likeButton.classList.add('places__item-button_enable');
      elementPlaceLike.textContent = res.likes.length;
    })
    .catch((err) => {
      renderCardError(`Ошибка загрузки: ${err}`)
    })

  }
     else {
      deleteLikeCardRequest(cardId)
      .then((res) => {
        likeButton.classList.remove('places__item-button_enable')
        elementPlaceLike.textContent = res.likes.length;
      })
      .catch((err) => {
        renderCardError(`Ошибка загрузки: ${err}`)
      })
    }
}

//функция, которая добавляет карточку на страницу
function submitAddCardForm () {
  const namePlace = popupNamePlaceValue.value;
  const linkPlace = popupLinkPlaceValue.value;

  renderLoading(true, submitButtonAddCard)

  postCardRequest (namePlace, linkPlace)
  .then((data) => {
    const result = createPlacesItemElement(data.name, data.link, data.likes.length, data._id, data.owner._id);
    placesItemWrapper.prepend(result);
    //закрываем попап
    closePopupAction(popupAddCard);
  })

  .finally(() => {
    //заканчиваем рендер загрузки
    renderLoading(false, submitButtonAddCard)
  })

  formAddPlaceElement.reset();
};


export {submitAddCardForm, createPlacesItemElement, placesItemWrapper}
