import { profileName, profileJob, profileAvatar } from "./modal.js";
import { createPlacesItemElement, placesItemWrapper, renderDeleteButtonCard } from "./card.js";

const cohort = 'plus-cohort-12';
const placesRenderError = document.querySelector('#places-load-error');

//загружаем профиль с сервера
const getProfile = function (cohort) {
  fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a'
    }
  })

  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(res.status);
  })

  .then((data) => {
    renderProfileDesctiprion(data.name, data.about, data.avatar);
  })

  .catch((err) => {
    renderProfileDesctiprionError(`Ошибка: ${err}`);
  })

}

//выводить результат, если данные пришли и всё хорошо
function renderProfileDesctiprion(name, about, avatarLink) {
  profileName.textContent = name;
  profileJob.textContent = about;
  profileAvatar.src = avatarLink;
  profileAvatar.alt = name;
  // error.textContent = '';
}

//рисуем ошибку, если с данными беда
function renderProfileDesctiprionError(err) {
  profileName.textContent = err;
  profileJob.textContent = err;
  profileAvatar.alt = name;
  // error.textContent = '';
}



//загружаем карточки с сервера
const getCards = function (cohort) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a'
    }
  })

  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(res.status);
  })

  .then((data) => {
    return data.forEach((data) => {
      const result = createPlacesItemElement(data.name, data.link, data.likes.length);
      placesItemWrapper.append(result);
      renderDeleteButtonCard(data.owner._id)
    });
  })

  .catch((err) => {
    renderCardError(`Ошибка загрузки: ${err}`)
  })

}

// console.log(initialCard)

//отрисовываем ошибку если всё плохо
function renderCardError(err) {
  placesRenderError.removeAttribute('hidden')
  placesRenderError.textContent = err;
}

//постим на сервер изменения профиля
const editProfile = function (cohort, name, job) {
  fetch(`https://nomoreparties.co/v1/${cohort}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      about: `${job}`
    })
  });
}

//постим на сервер изменения аватара
const editAvatar = function (cohort, avatar) {
  fetch(`https://nomoreparties.co/v1/${cohort}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: `${avatar}`,
    })
  });
}

//постим карточки на сервер
const postCardRequest = function (cohort, name, link) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
    method: 'POST',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  });
}

const deleteCardRequest = function (cohort, id) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    }
})};

const putLikeCardRequest = function (cohort, id) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    }
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(res.status);
  })

  .then((data) => {
    data.likes.length
  })

  .catch((err) => {
    renderCardError(`Ошибка загрузки: ${err}`)
  })
};

const deleteLikeCardRequest = function (cohort, id) {
  fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a',
      'Content-Type': 'application/json'
    }})

    .then((res) => {
      if (res.ok) {
        return res.json();
      }
        return Promise.reject(res.status);

    })

    .then((data) => {
      data.likes.length

    })

    .catch((err) => {
      renderCardError(`Ошибка загрузки: ${err}`)
    })
};

// const userAndCardId = [setProfileDesctiprion, initialCard]
// Promise.all(userAndCardId)
//   .then((data) => {
//     console.log(data);
//   })


// await putLikeCardRequest(cohort, '62cbf1c5bdb1f00a9f09a5b2')
// await deleteLikeCardRequest(cohort, '62cbf1c5bdb1f00a9f09a5b2')

getCards(cohort)
getProfile(cohort)

export { editProfile, cohort, postCardRequest, putLikeCardRequest, deleteLikeCardRequest, editAvatar }
