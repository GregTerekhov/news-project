import Notiflix from 'notiflix';
import { refs } from '../refs';
import '../themeSwitcher';

// if (refs.authenticationMobileBtn.classList.contains('.js-modal-mobile-menu')) {
//   refs.authenticationMobileBtn.addEventListener('click', () => {
//     if (
//       refs.iconMenuBurgerEl.classList.contains('_active') &&
//       refs.menuMobileEl.classList.contains('_active')
//     ) {
//       refs.iconMenuBurgerEl.classList.remove('_active');
//       refs.menuMobileEl.classList.remove('_active');
//     }
//     openModal();
//   });
// }

// відкриття модального вікна
export function openModal() {
  refs.modal.classList.add('in');
  refs.body.classList.add('_lock');
}
// закриття модального вікна
function closeModal() {
  refs.modal.classList.remove('in');
  refs.body.classList.remove('_lock');
}
// слухачі подій кліків для закриття вікна
refs.modalBackdrop.addEventListener('click', closeModal);
refs.modalCloseButton.addEventListener('click', closeModal);

// переключення між вкладками регістрації та входа
refs.modalTabs.forEach((tab, index) => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const currentTab = document.querySelector(
      '.authentication-modal__tabslink[aria-expanded="true"]'
    );
    currentTab.setAttribute('aria-expanded', false);
    tab.setAttribute('aria-expanded', true);
    const currentContent = document.querySelector(
      '.authentication-modal__tab-pane.active'
    );
    currentContent.classList.remove('active');
    refs.modalContents[index].classList.add('active');
  });
});
// зміна активного стану елементів-табів li
refs.navItems.forEach(navItem => {
  navItem.addEventListener('click', function () {
    const activeNavItem = document.querySelector('.js-tabs.active');
    if (activeNavItem) {
      activeNavItem.classList.remove('active');
    }

    this.classList.add('active');
  });
});
// валідація
function validateFields() {
  let isValid = true;
  refs.inputFields.forEach(function (field) {
    if (!field.checkValidity()) {
      isValid = false;
    }
  });
  return isValid;
}

// refs.inputFields.forEach(function (field) {
//   field.addEventListener('input', function () {
//     if (validateFields()) {
//       refs.buttonLogin.removeAttribute('disabled');
//       refs.buttonRegister.removeAttribute('disabled');
//     } else {
//       refs.buttonLogin.setAttribute('disabled', true);
//       refs.buttonRegister.setAttribute('disabled', true);
//     }
//   });
// });
// submit по кнопці login
refs.buttonLogin.addEventListener('submit', event => {
  event.preventDefault();
  Notiflix.Notify.success("You're with us again");
  closeModal();
});
// submit по кнопці register
refs.buttonRegister.addEventListener('submit', event => {
  event.preventDefault();
  Notiflix.Notify.success('Congratulations to the new member!');
  closeModal();
});

// закриття модального вікна по клавиші Escape
document.addEventListener('keydown', e => {
  if (e.code === 'Escape' && refs.modal.classList.contains('in')) {
    closeModal();
  }
});

// слухач подій для відкриття модального вікна по кнопках SignIn/SignUp на сайті
refs.authenticationButtons.forEach(button => {
  button.addEventListener('click', openModal);
});
