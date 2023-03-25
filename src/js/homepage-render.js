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
  e.preventDefault();
  const searchArticle = e.currentTarget.elements.querySearch.value; //Значение Input
  resetMarkup();
  pageValue.pageReset(); //Сброс значения текущей страницы до 1
  if (!searchArticle) {
    templateCards.buildTemplate();
    // getPopularArticles();
    return;
  }
  getQueryArticles(pageValue.page, searchArticle); //Не забыть поменять "1" на переменную номера страницы
}

//Популярный запрос
async function getPopularArticles() {
  try {
    const response = await fetchPopularArticles();
    templateCards.checkTheData(response);
    // console.log(templateCards.buildTemplate());
    createPopularMarkup(response); //Рендер карточки популярного запроса
    bodyArticles.firstChild.nextSibling.insertAdjacentHTML(
      'afterend',
      `<div class="weather-placeholder"></div>`
    );
  } catch (error) {
    console.log(error);
  }
}

//Поисковый запрос
async function getQueryArticles(page, searchArticle) {
  try {
    const response = await fetchQueryArticles(page, searchArticle);
    templateCards.checkTheData(response);
    // console.log(templateCards.buildTemplate());
    const target = response.data.response.docs;
    if (target.length === 0) {
      getNoFound(); //Рендер заглушки при ненайденом запросе
    }
    createQueryMarkup(response); //Рендер карточки поискового запроса\
  } catch (error) {
    console.log(error);
  }
}

//Сброс результата предыдущего запроса
function resetMarkup() {
  bodyArticles.innerHTML = '';
}
