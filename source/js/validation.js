const registrationBtn =  document.querySelector('.registration__button');
const rigistrationContainer = document.querySelector('.registration__container');

const hideButton = (elem) => {
  elem.classList.add('visually-hidden')
}

const onRegistrationBtnClick = (evt) => {
  evt.preventDefault();
  hideButton(evt.target)
  rigistrationContainer.classList.remove('visually-hidden')
}

registrationBtn.addEventListener('click', onRegistrationBtnClick)
