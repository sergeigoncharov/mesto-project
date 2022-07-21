import { config } from "./utils.js";

//валидиурем ответы: если все загрузилось: парсим в json, если нет, то реджектим ошибку со статусом
const validateResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
};

//загружаем профиль с сервера
const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => validateResponse(res));
}

//запрос карточек с сервера
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => validateResponse(res));
}

//постим на сервер изменения профиля
const editProfile = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`
    })
  })
  .then(res => validateResponse(res));
};

//постим на сервер изменения аватара
const editAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${avatar}`
    })
  })
  .then(res => validateResponse(res));
}

//постим карточки на сервер
const postCardRequest = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
  .then(res => validateResponse(res));
}

//удаляем карточки с сервера
const deleteCardRequest = (cardId) => {
 return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => validateResponse(res));
};

//ставим лайк
const putLikeCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
})
  .then(res => validateResponse(res));
}

//удаляем лайк
const deleteLikeCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => validateResponse(res));
};

export { getCards, editProfile, validateResponse, postCardRequest, putLikeCardRequest, deleteLikeCardRequest, editAvatar, getProfile, deleteCardRequest }
