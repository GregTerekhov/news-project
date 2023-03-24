import './js/fetch weather';
import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './js/fetchArticles';
import {
  formEl,
  bodyArticles,
  bodyContainerEl,
  headerContent,
} from './js/selectors';
import { createPopularMarkup, createQueryMarkup } from './js/markup';

formEl.addEventListener('submit', onInputSubmit);

function onInputSubmit(e) {
  e.preventDefault();
  const searchArticle = e.currentTarget.elements.querySearch.value;
  resetMarkup();
  removeBackgroundImage();
  if (!searchArticle) {
    getPopularArticles();
    return;
  }
  getQueryArticles(1, searchArticle); //Не забыть поменять "1" на переменную номера страницы
}

async function getPopularArticles() {
  try {
    const response = await fetchPopularArticles();
    createPopularMarkup(response);
  } catch (error) {
    console.log(error);
  }
}

async function getQueryArticles(page, searchArticle) {
  try {
    const response = await fetchQueryArticles(page, searchArticle);
    createQueryMarkup(response);
  } catch (error) {
    console.log(error);
  }
}

function resetMarkup() {
  bodyArticles.innerHTML = '';
}

function removeBackgroundImage() {
  bodyArticles.classList.remove('articles-background');
}
