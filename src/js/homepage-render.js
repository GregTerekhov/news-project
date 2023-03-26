import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './fetchArticles';
import { createPopularMarkup, createQueryMarkup, getNoFound } from './markup';
import { PagePagination } from './pagination';
import { TemplateCards } from './markup';

export const formEl = document.querySelector('.search-form');
const bodyContainerEl = document.querySelector('.js-body-container');
export const bodyArticles = bodyContainerEl.children.articles;

const pageValue = new PagePagination();
const templateCards = new TemplateCards();

getPopularArticles(); //Запрос популярных новостей

//Логика действий при взаимодействии с Input
export function onInputSubmit(e) {
  try {
    e.preventDefault();
    const searchArticle = e.currentTarget.elements.querySearch.value; //Значение Input
    resetMarkup();
    pageValue.pageReset(); //Сброс значения текущей страницы до 1
    if (!searchArticle) {
      getPopularArticles();
      return;
    }
    getQueryArticles(pageValue.page, searchArticle); //Не забыть поменять "1" на переменную номера страницы
  } catch (error) {
    console.log(error);
  }
}

//Популярный запрос
async function getPopularArticles() {
  try {
    const response = await fetchPopularArticles();
    templateCards.checkTheData(response);
    templateCards.buildTemplate(); //Рендер карточки
    addWeatherBlock();
  } catch (error) {
    console.log(error);
  }
}

//Поисковый запрос
async function getQueryArticles(page, searchArticle) {
  try {
    const response = await fetchQueryArticles(page, searchArticle);
    templateCards.checkTheData(response);
    const target = response.data.response.docs;
    if (target.length === 0) {
      getNoFound(); //Рендер заглушки при ненайденом запросе
    }
    templateCards.buildTemplate(); //Рендер карточки
    addWeatherBlock();
  } catch (error) {
    console.log(error);
  }
}

//Сброс результата предыдущего запроса
function resetMarkup() {
  bodyArticles.innerHTML = '';
}

//Вставка блока с погодой
function addWeatherBlock() {
  if (!bodyArticles.firstChild || !bodyArticles.firstChild.nextSibling) {
    return;
  }
  bodyArticles.firstChild.nextSibling.insertAdjacentHTML(
    'afterend',
    `<div class="weather-placeholder"></div>`
  );
}
