import { profileName, profileJob, profileAvatar, avatarSubmitButton, submitButtonAddCard, profileInfoSubmitButton } from "./modal.js";
import { createPlacesItemElement, placesItemWrapper } from "./card.js";

const cohortId = 'plus-cohort-12';
const placesRenderError = document.querySelector('#places-load-error');


//валидиурем ответы: если все загрузилось: парсим в json, если нет, то реджектим ошибку со статусом
const validateResponse = function (res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(res.status);
}

//отрисовываем ошибку на странице если всё плохо
function renderCardError(err) {
  placesRenderError.removeAttribute('hidden')
  placesRenderError.textContent = err;
}

//показываем Сохранить... пока грузятся данные
function renderLoading(isLoading, button) {
  if(isLoading) {
    button.textContent = 'Сохранить...'
  } else {
    button.textContent = 'Сохранить'
  }
}

let profileId = "";

//загружаем профиль с сервера
const getProfile = function (cohortId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a'
    }
  })
}

//записываем айдишник профиля в переменную profileId
Promise.all([getProfile(cohortId)])
.then(res => Promise.all([res[0].json()]))
.then (([data]) => {
  profileId = data._id;
})

console.log(profileId)

//рисуем только на своей карточке кнопку удаления
// const renderDeleteButtonCard = function (cohortId, id) {
//   getProfile(cohortId)
//   .then((res) => validateResponse(res))
//   .then ((data) => {
//     const trashButton = document.querySelector('#trash-button')
//     if (id !== data._id) {
//     trashButton.remove()
//   } else {
//     trashButton.classList.add('.places__item-button_enable')
//   }
//   })
// }

//рисует профиль на странице
const renderProfile = function (cohortId) {
  getProfile(cohortId)
  .then((res) => validateResponse(res))

  .then((data) => {
    renderProfileDesctiprion(data.name, data.about, data.avatar);
  })

  .catch((err) => {
    renderProfileDesctiprionError(`Ошибка: ${err}`);
  })
}



//выводить результат в верстке, если данные пришли и всё хорошо
function renderProfileDesctiprion(name, about, avatarLink) {
  profileName.textContent = name;
  profileJob.textContent = about;
  profileAvatar.src = avatarLink;
  profileAvatar.alt = name;
}

//рисуем ошибку прям в верстке, если с данными беда
function renderProfileDesctiprionError(err) {
  profileName.textContent = err;
  profileJob.textContent = err;
}


//запрос карточек с сервера
const getCards = function (cohortId) {
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a'
    }
  })
}


//на будущее: не победил собрать в одной функции сравнение айдишников карточки и профиля
//вместо неё использу renderDeleteButtonCard
// let promise = [getCards(cohortId), getProfile(cohortId)]
// Promise.all(promise)
// .then(res => Promise.all([res[0].json(),res[1].json()]))
// .then (([result1, result2]) => {
//   result1.forEach((data) => {
//     data.owner._id
//   })
//    console.log(result2._id)
//    console.log(result1.data.owner._id)
// })

//отрисовываем карточки на странице
const renderCards = function (cohortId) {
  getCards(cohortId)
  .then((res) => validateResponse(res))

  .then((data) => {
    data.forEach((data) => {
      const result = createPlacesItemElement(data.name, data.link, data.likes.length, data._id, data.owner._id);
      placesItemWrapper.append(result);
      // renderDeleteButtonCard(cohortId, data.owner._id)
    });
  })

  .catch((err) => {
    renderCardError(`Ошибка загрузки: ${err}`)
  })
}


//постим на сервер изменения профиля
const editProfile = function (cohortId, name, job) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`
    })
  })
  .then((res) => validateResponse(res))
  .finally(() => {
    renderLoading(false, profileInfoSubmitButton)
  })

}

//постим на сервер изменения аватара
const editAvatar = function (cohortId, avatar) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${avatar}`,
    })
  })
  .then((res) => validateResponse(res))
  .finally(() => {
    renderLoading(false, avatarSubmitButton)
  })
}

//постим карточки на сервер
const postCardRequest = function (cohortId, name, link) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards`, {
    method: 'POST',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
  .then((res) => validateResponse(res))
  .finally(() => {
    renderLoading(false, submitButtonAddCard)
  })
}

const deleteCardRequest = function (cohortId, cardId) {
 fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    }
  })
    .then((res) => validateResponse(res))

    .catch((err) => {
      renderCardError(`Ошибка загрузки: ${err}`)
    })
};


const putLikeCardRequest = function (cohortId, cardId) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    }
})
  .then((res) => validateResponse(res))

  .then((data) => {
    data.likes.length
  })

  .catch((err) => {
    renderCardError(`Ошибка загрузки: ${err}`)
  })
};

const deleteLikeCardRequest = function (cohortId, cardId) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    }})

    .then((res) => validateResponse(res))

    .then((data) => {
      data.likes.length

    })

    .catch((err) => {
      renderCardError(`Ошибка загрузки: ${err}`)
    })
};

renderCards(cohortId)
renderProfile(cohortId)

export { editProfile, cohortId, validateResponse, postCardRequest, putLikeCardRequest, deleteLikeCardRequest, editAvatar, renderLoading, getProfile, deleteCardRequest }
