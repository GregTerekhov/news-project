import { fetchPopularArticles, fetchQueryArticles } from './fetchArticles';
import { getNoFound } from './markup';
import { PagePagination } from './pagination';
import { TemplateCards } from './markup';
import { WeatherBlock } from './fetch_weather';
import Notiflix, { Notify } from 'notiflix';

export const formEl = document.querySelector('.search-form');
const bodyContainerEl = document.querySelector('.js-body-container');
export const bodyArticles = bodyContainerEl.children.articles;

export const pageValue = new PagePagination();
export const templateCards = new TemplateCards();
export const weatherViget = new WeatherBlock();

getPopularArticles(); //Запрос популярных новостей

//Логика действий при взаимодействии с Input
export function onInputSubmit(e) {
  try {
    e.preventDefault();
    const searchArticle = e.currentTarget.elements.querySearch.value; //Значение Input
    console.log(
      '🚀 ~ file: homepage-render.js:23 ~ onInputSubmit ~ searchArticle:',
      searchArticle
    );
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
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.num_results} articles.`
    );
    weatherViget.checkLocation(); //Вставка блока с погодой
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
      Notiflix.Notify.failure(
        `Sorry, there are no articles matching your search query. Please try again.`
      );
      return;
    }
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.response.meta.offset} articles.`
    );
    templateCards.buildTemplate(); //Рендер карточки
    weatherViget.checkLocation(); //Вставка блока с погодой
  } catch (error) {
    console.log(error);
  }
}

//Сброс результата предыдущего запроса
export function resetMarkup() {
  bodyArticles.innerHTML = '';
}

const mark = document.querySelector(`.up-button`);
mark.addEventListener('click', onUnClick);

function onUnClick(e) {
  const { height: upButtonEl } = bodyArticles.getBoundingClientRect();

  window.scrollBy({
    top: -(upButtonEl * upButtonEl),
    behavior: `smooth`,
  });
}
