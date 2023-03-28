import { fetchPopularArticles, fetchQueryArticles } from './fetchArticles';
import { getNoFound } from './markup';
import { PagePagination } from './pagination';
import { TemplateCards } from './markup';
import { WeatherBlock } from './fetch_weather';
import Notiflix from 'notiflix';

export const formEl = document.querySelector('.search-form');
const bodyContainerEl = document.querySelector('.js-body-container');
export const bodyArticles = bodyContainerEl.children.articles;

export const pageValue = new PagePagination();
export const templateCards = new TemplateCards();
export const weatherViget = new WeatherBlock();

getPopularArticles(1); //Запрос популярных новостей

//Логика действий при взаимодействии с Input
export async function onInputSubmit(e) {
  try {
    e.preventDefault();
    pageValue.pageReset();
    pageValue.word = e.currentTarget.elements.querySearch.value; //Значение Input
    resetMarkup();
    //Сброс значения текущей страницы до 1
    if (!pageValue.word) {
      pageValue.totalHits = await getPopularArticles(1);
      return;
    }

    pageValue.totalHits = await getQueryArticles(
      pageValue.page,
      pageValue.word
    ); //Не забыть поменять "1" на переменную номера страницы
  } catch (error) {
    console.log(error);
  }
}

//Популярный запрос
export async function getPopularArticles(page) {
  try {
    const response = await fetchPopularArticles();
    const totalHits = response.data?.num_results;
    templateCards.checkTheData(response);
    templateCards.buildTemplate(); //Рендер карточки
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.num_results} articles.`
    );
    weatherViget.checkLocation(); //Вставка блока с погодой
    return totalHits;
  } catch (error) {
    console.log(error);
  }
}

//Поисковый запрос
export async function getQueryArticles(page, searchArticle) {
  try {
    const response = await fetchQueryArticles(page, searchArticle);
    templateCards.checkTheData(response);

    const target = response.data.response.docs;
    const totalHits = response.data?.response?.meta?.hits;
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

    return totalHits;
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
