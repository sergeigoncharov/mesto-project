//инициализацию JS-кода, добавление слушателей и другие важные участки

import * as style from '../pages/index.css'
import { profileName, profileJob, profileAvatar, avatarEditPosition } from "./modal.js";
import * as validate from './validate.js'
import { getProfile, getCards } from './api.js'
import { placesItemWrapper, createPlacesItemElement } from './card.js'


let profileId = ""

//показываем Сохранить... пока грузятся данные
function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранить...'
  } else {
    button.textContent = 'Сохранить'
  }
}

Promise.all([getProfile(), getCards()])
// тут деструктурируете ответ от сервера, чтобы было понятнее, что пришло
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    avatarEditPosition.src = userData.avatar;
    avatarEditPosition.alt = userData.name;
    profileId = userData._id
    renderCards(cards)
  })
  .catch(err => {
    renderProfileDesctiprionError(`Ошибка: ${err}`)
  });

//рисуем ошибку прям в верстке, если с данными беда
function renderProfileDesctiprionError(err) {
  profileName.textContent = err;
  profileJob.textContent = err;
}

//отрисовываем карточки на странице
function renderCards(cards) {
  cards.forEach((data) => {
    const result = createPlacesItemElement(data.name, data.link, data.likes, data._id, data.owner._id);
    placesItemWrapper.append(result);
  })
}

export { renderLoading, profileId }



