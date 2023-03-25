import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './fetchArticles';
import { createPopularMarkup, createQueryMarkup, getNoFound } from './markup';
import { PagePagination } from './pagination';

export const formEl = document.querySelector('.search-form');
const bodyContainerEl = document.querySelector('.js-body-container');
export const bodyArticles = bodyContainerEl.children.articles;
const pageValue = new PagePagination();

getPopularArticles(); //Запрос популярных новостей

//Логика действий при взаимодействии с Input
export function onInputSubmit(e) {
  e.preventDefault();
  const searchArticle = e.currentTarget.elements.querySearch.value; //Значение Input
  resetMarkup();
  pageValue.pageReset(); //Сброс значения текущей страницы до 1
  if (!searchArticle) {
    getPopularArticles();
    return;
  }
  getQueryArticles(pageValue.page, searchArticle); //Не забыть поменять "1" на переменную номера страницы
}

//Популярный запрос
async function getPopularArticles() {
  try {
    const response = await fetchPopularArticles();
    console.log(response);
    createPopularMarkup(response); //Рендер карточки популярного запроса
  } catch (error) {
    console.log(error);
  }
}

//Поисковый запрос
async function getQueryArticles(page, searchArticle) {
  try {
    const response = await fetchQueryArticles(page, searchArticle);
    const target = response.data.response.docs;
    console.log(response);
    if (target.length === 0) {
      getNoFound(); //Рендер заглушки при ненайденом запросе
    }
    createQueryMarkup(response); //Рендер карточки поискового запроса\
    console.log(target);
  } catch (error) {
    console.log(error);
  }
}

//Сброс результата предыдущего запроса
function resetMarkup() {
  bodyArticles.innerHTML = '';
}
