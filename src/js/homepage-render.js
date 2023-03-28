import { fetchPopularArticles, fetchQueryArticles } from './fetchArticles';
import { getNoFound } from './markup';
import { PagePagination, onPagination } from './pagination';
import { TemplateCards } from './markup';
import { WeatherBlock } from './fetch_weather';
import Notiflix, { Notify } from 'notiflix';
import { elements } from './categories/elements';

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
    resetMarkup();
    pageValue.pageReset(); //Сброс значения текущей страницы до 1
    if (!searchArticle) {
      getPopularArticles();
      return;
    }
    getQueryArticles(
      pageValue.page,
      searchArticle,
      dateConvert(elements.date.value)
    ); //Не забыть поменять "1" на переменную номера страницы
  } catch (error) {
    console.log(error);
  }
}

function dateConvert(inputDate) {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/; // regular expression for DD/MM/YYYY format
  if (!dateRegex.test(inputDate)) {
    return NaN;
  }
  const [day, month, year] = inputDate.split('/');
  const dateObj = new Date(`${month}/${day}/${year}`);
  const yyyy = dateObj.getFullYear().toString();
  const mm = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const dd = dateObj.getDate().toString().padStart(2, '0');
  const outputDate = yyyy + mm + dd;
  return outputDate;
}

const mediaQuantity = {
  mobile: 4,
  tablet: 8,
};

let quantity =
  window.innerWidth < 768 ? mediaQuantity.mobile : mediaQuantity.tablet;
window.addEventListener('resize', () => {
  quantity =
    window.innerWidth < 768 ? mediaQuantity.mobile : mediaQuantity.tablet;
});

//Популярный запрос
async function getPopularArticles() {
  try {
    const response = await fetchPopularArticles();
    onPagination();
    templateCards.checkTheData(response);
    templateCards.buildTemplate(0, quantity); //Рендер карточки
    Notiflix.Notify.success(
      `Hooray! We found ${response.data.num_results} articles.`
    );
    weatherViget.checkLocation(); //Вставка блока с погодой
  } catch (error) {
    console.log(error);
  }
}

//Поисковый запрос
async function getQueryArticles(page, searchArticle, date) {
  try {
    const response = await fetchQueryArticles(page, searchArticle, date);
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
    if (target.length === 0) {
      getNoFound(); //Рендер заглушки при ненайденом запросе
    }
    onPagination();
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
