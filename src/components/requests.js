import { profileName, profileJob, profileAvatar } from "./modal.js";
import { createPlacesItemElement, placesItemWrapper } from "./card.js";

const cohort = 'plus-cohort-12';

function setProfileDesctiprion (cohort) {
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

function renderProfileDesctiprionError(err) {
  profileName.textContent = err;
  profileJob.textContent = err;
  profileAvatar.alt = name;
  // error.textContent = '';
}


// function initialCard (cohort) {
//   fetch(`https://nomoreparties.co/v1/${cohort}/cards`, {
//     headers: {
//       authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a'
//     }
//   })

//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//       return Promise.reject(res.status);
//   })

//   .then((data) => {
//     data.forEach((data) => {
//       const result = createPlacesItemElement(card.name, card.link);
//       placesItemWrapper.append(result);
//     });
//   })

//   .catch((err) => {
//     renderProfileDesctiprionError(err)
//   })

// }

// function renderProfileDesctiprion(name, about, avatarLink) {
//   profileName.textContent = name;
//   profileJob.textContent = about;
//   profileAvatar.src = avatarLink;
//   profileAvatar.alt = name;
//   // error.textContent = '';
// }

// initialCard(cohort)
setProfileDesctiprion(cohort)


// fetch('https://mesto.nomoreparties.co/v1/plus-cohort-12/cards', {
//   headers: {
//     authorization: 'd8fbbcc2-3bb7-48f3-924d-a13fe0bb203a'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });


// const form = document.forms.search;
// const content = document.querySelector('.content');
// const result = document.querySelector('.content__result');
// const error = document.querySelector('.content__error');
// const spinner = document.querySelector('.spinner');

// //функция принимает на вход два параметра: entity и entityId, и генерирует fetch-запрос
// //и возвращает промис — результат работы этого запроса
// function search(entity, entityId) {
//   return fetch(`https://swapi.nomoreparties.co/${entity}/${entityId}/`);
// }

// //функция, которая добавляет класс с прелоадером или убирает, если isLoadiing = false
// function renderLoading(isLoading) {
//   if(isLoading) {
//     spinner.classList.add('spinner_visible');
//     content.classList.add('content_hidden');
//   } else {
//     spinner.classList.remove('spinner_visible');
//     content.classList.remove('content_hidden');
//   }
// }

// //выводить результат, если данные пришли и всё хорошо
// function renderResult(text) {
//   result.textContent = text;
//   error.textContent = '';
// }

// //выводить ошибку, если что-то пошло не так
// function renderError(err) {
//   error.textContent = err;
//   result.textContent = '';
// }

// //обработчик события нажатия на кнопку Submit
// //отправляет запрос на сервер при нажатии на кнопку
// form.addEventListener('submit', function submit(e) {
//   e.preventDefault();
//   //показываем прелоадер пока выполняется поиск
//   renderLoading(true);
//   //вызваем функцию search с двумя аргументами: значениями полей entity и entityId
//   search(form.elements.entity.value, form.elements.entityId.value)
//     .then((res) => {
    //   //Если res.ok — true, следующий обработчик then получит объект ответа на вход
    //   if (res.ok) {
    //     return res.json();
    //   }
    //   //если с ответом что-то не так, промис отклонится с кодом статуса ответа
    //   return Promise.reject(res.status);
    // })
//     .then((res) => {
//       //если всё ГУД вызываем функцию renderResult и подставляем поле имя из объекта в текст класса result
//       renderResult(res.name);
//     })
    // .catch((err) => {
    //   //если всё плохо вызываем функцию renderError и подставляем в текст класса result ошибку с кодом
    //   renderError(`Ошибка: ${err}`);
//     })
//   .finally(() => {
//     //после обработки скрываем прелоадер
//     renderLoading(false);
//   })
// });
