export const refs = {
  READ_URL_KEY: 'READ_URL', // ключ для массива URL прочитанных новостей в Локальном Хранилище
  READ_KEY: 'HAVE_READ', // ключ для массива прочитанных новостей в Локальном Хранилище
  FAVORITES_KEY: 'FAVORITES', // ключ для массива новостей Фавориты в Локальном Хранилище
  bodyContainerEl: document.querySelector('.js-body-container'),
  switcher: document.querySelectorAll('.toggle-mode__checkbox'),
  switchSlider: document.querySelectorAll('.toggle-mode__slider'),
  body: document.querySelector('body'),
  footer: document.querySelector('.footer'), // футер
  darkText: document.querySelectorAll('.toggle-mode__dark'), // текст темного режиму відображення
  lightText: document.querySelectorAll('.toggle-mode__light'), // текст світлого режиму відображення
  favouriteGallery: document.querySelector('.js-articles-favourites'),
  newsGallery: document.querySelector('.articles'),
  categories: document.querySelector('.categories'),
  date: document.querySelector('#input-picker'),
  iconMenuBurgerEl: document.querySelector('.header__burger'), // кнопка відкриття/закриття мобільного меню
  menuMobileEl: document.querySelector('.menu'), //  меню
  mobileMenuContainerEl: document.querySelector('.menu__mobile-container'), // контейнер мобільного меню
  themeContainerEl: document.querySelector('.toggle-mode'), // контейнер перемикача режимів
  paginationRef: document.querySelector('.pagination'), // контейнер для пагінації
  authenticationButtons: document.querySelectorAll(
    '.authentication-button__link'
  ), // кнопки відкриття модального вікна реєстрації
  authenticationMobileBtn: document.querySelector('.authentication-button'), // визначення кнопки модального вікна всередині мобільного меню
  modal: document.querySelector('.authentication-modal'), // модалка
  modalContent: document.querySelector('.authentication-modal__content'), // модальне вікно реєстрації юзера
  modalBackdrop: document.querySelector('.authentication-modal__backdrop'), // backdrop модального вікна
  modalCloseButton: document.querySelector('.authentication-modal__close'), // кнопка закриття модального вікна
  modalTabs: document.querySelectorAll('.authentication-modal__tabslink'), // посилання у вкладках модального вікна
  navItems: document.querySelectorAll('.js-tabs'), // вкладки модального вікна
  modalContents: document.querySelectorAll('.authentication-modal__tab-pane'), // панелі контенту вкладок модального вікна
  buttonLogin: document.querySelector('.js-login'), // кнопка submit для входа у аккаунт
  buttonRegister: document.querySelector('.js-register'), // кнопка submit реєстрації нового юзера
  inputFields: document.querySelectorAll('input[data-validation]'), // поля input, які мають проходити валідацію
  accordionRef: document.querySelector('.js-haveread'), // получаем ссылку на секцию аккордиона
  accordionListRef: document.querySelector('.accordion-list'), // получаем ссылку на панель с новостями
};

export function onGetLocaleStorageData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)); // получаем массив объектов из Локального Хранилища
  } catch (error) {
    console.log(error);
  }
}
export function getNoFound(element) {
  const noFound = `<div class="no-found">
  <h1 class="no-found__text">We haven't found news from this category</h1>
  <div class="no-found__image"></div>
  </div>`;
  return (element.innerHTML = noFound);
}
