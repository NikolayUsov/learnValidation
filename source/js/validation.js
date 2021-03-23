const registrationBtn =  document.querySelector('.registration__button');
const rigistrationContainer = document.querySelector('.registration__container');
const formTextFieldsets = document.querySelectorAll('.form__fieldset--text');
const form =document.querySelector('.form');
const inputPassword = document.querySelector('.form__input-password');
const passwordRulesList = document.querySelector('.form__pass-rule-list');

const RegxpPatterns = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
  NIKNAME: /^[a-z0-9_]{3,32}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,32}$/,
}

const PasswordRules = {
  SYMBOLS: /^[a-z0-9_]{6,32}$/,
  NUMBER: /^(?=.*[0-9])/,
  UPPERLETTER: /^(?=.*[A-Z])/,
}

const hideButton = (elem) => {
  elem.classList.add('visually-hidden')
}

const onRegistrationBtnClick = (evt) => {
  evt.preventDefault();
  hideButton(evt.target)
  rigistrationContainer.classList.remove('visually-hidden')
}

const setInvalid = (elem) => {
  elem.classList.add('invalid');
}

const setValid = (elem) => {
  elem.classList.remove('invalid');
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
        input.addEventListener('input', inputWrite);
        return
      } else {
        setValid(fieldset)
      }
    } else {
      setValid(fieldset);
      input.removeEventListener('input', inputWrite)
    }

  }

}

const onPasswordInput = (evt) => {
  for (let rule in PasswordRules) {
    PasswordRules[rule].test(evt.target.value) ?
      passwordRulesList.classList.add(`form__pass-rule-list--${rule.toLowerCase()}`) :
      passwordRulesList.classList.remove(`form__pass-rule-list--${rule.toLowerCase()}`);
  }
}

const onFormChange = () => {
  validateTextFieldset()
}

inputPassword.addEventListener('input', onPasswordInput)
form.addEventListener('change', onFormChange);
registrationBtn.addEventListener('click', onRegistrationBtnClick);
