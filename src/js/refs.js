export const refs = {
  READ_URL_KEY: 'READ_URL', // ключ для массива URL прочитанных новостей в Локальном Хранилище
  FAVORITES_KEY: 'FAVORITES', // ключ для массива новостей Фавориты в Локальном Хранилище
  bodyContainerEl: document.querySelector('.js-body-container'),
  switcher: document.querySelectorAll('.toggle-mode__checkbox'),
  switchSlider: document.querySelectorAll('.toggle-mode__slider'),
  body: document.querySelector('body'),
  footer: document.querySelector('.footer'),
  darkText: document.querySelectorAll('.toggle-mode__dark'),
  lightText: document.querySelectorAll('.toggle-mode__light'),
  articles: document.querySelector('.articles'),
  categories: document.querySelector('.categories'),
  date: document.querySelector('#input-picker'),
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