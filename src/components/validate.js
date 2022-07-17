//функциональность валидации форм

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__form-button',
  inactiveButtonClass: 'popup__form-button_disabled',
  inputErrorClass: 'popup__form-input_error',
  errorClass: 'popup__error-span',
  formFieldsetSelector: '.popup__form-items',
}


//очищаем ошибки при закрытии попапов
function resetError(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  // очищаем ошибки валидации
  inputList.forEach(inputElement => hideInputError(formElement, inputElement, config));
}

//функция, которая добавляет ошибку, стиль ошибки и сообещение об ошибке
const showInputError = (formElement, inputElement, errorMessage, config) => {
  //Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  //показываем dom-элемент ошибки в попапе
  errorElement.removeAttribute('hidden')
};

//функция, которая убирает ошибку, стиль ошибки и сообещение об ошибке
const hideInputError = (formElement, inputElement, config) => {
  //Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  // Очистим ошибку
  errorElement.textContent = '';
  //скрываем dom-элемент ошибки в попапе
  errorElement.setAttribute('hidden', true)
};

//функция, которая проверяет, что поля в форме прошли валидацию
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {

    // showInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    // Передадим сообщение об ошибке третьим аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {

    // hideInputError получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  }
};

//функция проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

//функция отключает и включает кнопку сабмита
//Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false
//На их основе toggleButtonState меняет состояние кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement, config) => {

  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  //кнопка заблокирована с самого начала
  toggleButtonState(inputList, buttonElement, config);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем checkInputValidity,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, config);

      //сверять состояние кнопки при каждом изменении полей формы
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

function enableValidation(config) {
  const formElement = document.querySelectorAll(config.formSelector);
  formElement.forEach(formElement => {
      setEventListeners(formElement, config)

      formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

  })
}


enableValidation(config);

export { config, resetError }
