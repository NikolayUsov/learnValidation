/* eslint-disable no-console */
const registrationBtn =  document.querySelector('.registration__button');
const rigistrationContainer = document.querySelector('.registration__container');
const formTextFieldsets = document.querySelectorAll('.form__fieldset--text');
const form =document.querySelector('.form');
const inputPassword = document.querySelector('.form__input-password');
const passwordRulesItems = document.querySelector('.form__pass-rule-list').children;
const passwordCompareInput = document.querySelector('.form__input-password-compare');
const buttonSubmit = document.querySelector('.form__button-submit');
const privacyCheckbox = document.querySelector('.form__checkbox-privacy');
const formFieldsets = form.querySelectorAll('fieldset');

const RegxpPatterns = {
  EMAIL: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  NIKNAME: /^[a-z0-9_]{3,32}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,32}$/,
}

const PasswordRules = {
  SYMBOLS: /^[a-zA-Z0-9_]{6,32}$/,
  NUMBER: /^(?=.*[0-9])/,
  UPPERLETTER: /^(?=.*[A-Z])(?=.*[a-z])/,
}


const hideButton = (elem) => {
  elem.classList.add('visually-hidden')
}

const onRegistrationBtnClick = (evt) => {
  evt.preventDefault();
  hideButton(evt.target)
  rigistrationContainer.classList.remove('visually-hidden')
}

const disabledSubbmitButton = () => {
  formFieldsets.forEach(elem => elem.classList.add('form__submit--disabled'))
}

const unDisabledSubmitButton = () => {
  const fieldsets = Array.from(formFieldsets);

  const isValid = fieldsets.some((elem) => elem.classList.contains('form__submit--disabled'));
  if (isValid) {
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.disabled = false;
  }
}

const setInvalid = (elem) => {
  elem.classList.add('invalid');
}

const setValid = (elem) => {
  elem.classList.remove('invalid');
}

const addDisabledClass = (elem) => {
  elem.classList.add('form__submit--disabled');
}

const removeDisabledClass = (elem) => {
  elem.classList.remove('form__submit--disabled');
}

const checkPattern = (input) => {
  const inputName = input.getAttribute('name');
  return RegxpPatterns[inputName.toUpperCase()].test(input.value)
}


const inputWrite = (evt) => {

  if (evt.target.value !== 0) {

    if (checkPattern(evt.target)) {
      setValid(evt.target.closest('.form__fieldset--text'));
    } else {
      setInvalid(evt.target.closest('.form__fieldset--text'));
    }
  }
}

const validateTextFieldset = () => {
  for (let i = 0; i < formTextFieldsets.length; i++) {
    const fieldset = formTextFieldsets[i]
    const input = fieldset.querySelector('input');

    if (input.value.length !== 0) {

      if (!checkPattern(input)) {
        setInvalid(fieldset);
        addDisabledClass(fieldset)
        input.addEventListener('input', inputWrite);

      } else {
        setValid(fieldset)
        removeDisabledClass(fieldset)
      }
    } else {
      setValid(fieldset);
      addDisabledClass(fieldset)
      input.removeEventListener('input', inputWrite)
    }

  }

}

const onPasswordInput = (evt) => {
  if (evt.target.value.length !== 0 ){
    for (let rule in PasswordRules) {
      if (PasswordRules[rule].test(evt.target.value)) {

        for (let item of passwordRulesItems) {
          if (item.dataset.pattern === rule.toLowerCase()) {
            item.classList.add('active')
            item.classList.add('valid')
          }
        }
      }

      else {
        for (let item of passwordRulesItems) {
          if (item.dataset.pattern === rule.toLowerCase()) {
            item.classList.remove('valid')
          }
        }
      }
    }
  }
  else {
    for (let item of passwordRulesItems) {
      item.classList.remove('active');
    }
  }

}

const onPasswordCompareChange = (evt) => {
  if (evt.target.value !== inputPassword.value) {
    setInvalid(evt.target.closest('.form__fieldset'))
    addDisabledClass(evt.target.closest('.form__fieldset'))
  } else {
    setValid(evt.target.closest('.form__fieldset'));
    removeDisabledClass(evt.target.closest('.form__fieldset'));
  }
}

const onFormChange = () => {
  validateTextFieldset();
  unDisabledSubmitButton();
  unDisabledSubmitButton();

}

const onPrivacyCheckboxChange = (evt) => {
  if (evt.target.checked) {
    setValid(evt.target.closest('.form__fieldset'));
    removeDisabledClass(evt.target.closest('.form__fieldset'));
  }
  else {
    setInvalid(evt.target.closest('.form__fieldset'));
    addDisabledClass(evt.target.closest('.form__fieldset'));
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(form);

  for (let key of formData.keys()) {
    console.log(`${key}: ${formData.get(key)}`);
  }
  form.reset();
  disabledSubbmitButton();
  unDisabledSubmitButton();
}

disabledSubbmitButton();
privacyCheckbox.addEventListener('change', onPrivacyCheckboxChange)
inputPassword.addEventListener('input', onPasswordInput)
form.addEventListener('change', onFormChange);
form.addEventListener('submit', onFormSubmit);
registrationBtn.addEventListener('click', onRegistrationBtnClick);
passwordCompareInput.addEventListener('change', onPasswordCompareChange)
