import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './fetchArticles';
// import { formEl, bodyArticles, bodyContainerEl } from './selectors/homepage';
import { createPopularMarkup, createQueryMarkup, makeMarkup } from './markup';

export const formEl = document.querySelector('.search-form');
export const bodyContainerEl = document.querySelector('.js-body-container');
export const cardHeader = document.querySelectorAll('.markup-unit');
export const bodyArticles = bodyContainerEl.children.articles;

getPopularArticles(); //Запрос популярных новостей

export function onInputSubmit(e) {
  e.preventDefault();
  const searchArticle = e.currentTarget.elements.querySearch.value; //Значение Input
  resetMarkup();
  if (!searchArticle) {
    getPopularArticles();
    return;
  }
  getQueryArticles(1, searchArticle); //Не забыть поменять "1" на переменную номера страницы
} //Логика действий при взаимодействии с Input

async function getPopularArticles() {
  try {
    const response = await fetchPopularArticles();
    const target = response.data.results;
    console.log(target);
    createPopularMarkup(response); //Рендер карточки популярного запроса
  } catch (error) {
    console.log(error);
  }
} //Популярный запрос

async function getQueryArticles(page, searchArticle) {
  try {
    const response = await fetchQueryArticles(page, searchArticle);
    createQueryMarkup(response); //Рендер карточки поискового запроса
    const target = response.data.response.docs;
    console.log(target);
  } catch (error) {
    console.log(error);
  }
} //Поисковый запрос

function resetMarkup() {
  bodyArticles.innerHTML = '';
} //Сброс результата предыдущего запроса
