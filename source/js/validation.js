const registrationBtn =  document.querySelector('.registration__button');
const rigistrationContainer = document.querySelector('.registration__container');
const formTextFieldsets = document.querySelectorAll('.form__fieldset--text');
const form =document.querySelector('.form');
const emailInput = document.querySelector('.form__input--email')

const RegxpPatterns = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
  NIKNAME: /^[a-z0-9_]{3,32}$/,
  PASSWORD: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,12}$/,
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

const validateTextFieldset = () => {
  for (let i = 0; i < formTextFieldsets.length; i++) {
    const fieldset = formTextFieldsets[i]
    const input = fieldset.querySelector('input');


    if (input.value.length !== 0) {

      if (!checkPattern(input)) {
        setInvalid(fieldset)

        return
      } else {
        setValid(fieldset)
      }
    } else {
      setValid(fieldset);
    }

  }

}

const onFormChange = () => {
  validateTextFieldset()
}

const onEmailInput = (evt) => {
  if (checkPattern(evt)) {
    setValid(evt.closest('.form__fieldset--text'));
  }
}

emailInput.addEventListener('input', onEmailInput)
form.addEventListener('change', onFormChange);
registrationBtn.addEventListener('click', onRegistrationBtnClick);
