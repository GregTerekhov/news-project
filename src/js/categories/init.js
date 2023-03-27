import { NytimesAPI } from '../nytimesAPI';
import { elements } from './elements';

import { articlesMarkup } from './markupCat';
import { buttonsMarkup, dropdownMarkup } from './markupCat';

import {
  templateCards,
  resetMarkup,
  pageValue,
  addWeatherBlock,
} from '../homepage-render';

const MIN_LARGE_SCREEN_WIDTH = 1280;
const MIN_MEDIUM_SCREEN_WIDTH = 768;

const nytimesAPI = new NytimesAPI();
// limit зберігає кількість новин в залежності від ширини екрану
export let limit = 0;
let categoriesButtonQty = 0;

init();

async function init() {
  processScreenSize();
  const categoriesList = await nytimesAPI.categoriesList();
  makeCategoryButtonsAndDropdown(categoriesList);
}

async function makeCatagoryRequestAndMarkup(category) {
  const pageNumber = 1;
  const newsCatagory = await nytimesAPI.fetchNewsListFromCategorie({
    category,
    pageNumber,
    limit,
  });
  elements.articles.innerHTML = articlesMarkup(newsCatagory);
}

export function makeCategoryButtonsAndDropdown(categories) {
  elements.categories.insertAdjacentHTML(
    'beforeend',
    buttonsMarkup(categories.slice(0, categoriesButtonQty))
  );
  elements.categories.insertAdjacentHTML(
    'beforeend',
    dropdownMarkup(categories.slice(categoriesButtonQty))
  );
  initDropdown();
  elements.categories.addEventListener('click', onCategoriesClick);
}

async function onCategoriesClick(e) {
  const category = e.target.dataset?.category;
  if (!category) return;
  if (e.target.nodeName === 'BUTTON') {
    document.querySelector('.dropdown__filter-selected').textContent = 'Other';
  }
  // await makeCatagoryRequestAndMarkup(category);
  resetMarkup();
  pageValue.pageReset();
  getPopularArticlesBeta(category);
}

function processScreenSize() {
  if (window.matchMedia(`(min-width: ${MIN_LARGE_SCREEN_WIDTH}px)`).matches) {
    limit = 9;
    categoriesButtonQty = 6;
  } else if (
    window.matchMedia(`(min-width: ${MIN_MEDIUM_SCREEN_WIDTH}px)`).matches
  ) {
    limit = 8;
    categoriesButtonQty = 4;
  } else {
    limit = 5;
    categoriesButtonQty = 0;
  }
}

function initDropdown() {
  // Change option selected
  const label = document.querySelector('.dropdown__filter-selected');
  if (!categoriesButtonQty) label.textContent = 'Categories';
  const options = Array.from(
    document.querySelectorAll('.dropdown__select-option')
  );

  options.forEach(option => {
    option.addEventListener('click', () => {
      label.textContent = option.textContent;
    });
  });

  // Close dropdown onclick outside
  document.addEventListener('click', e => {
    const toggle = document.querySelector('.dropdown__switch');
    const element = e.target;

    if (element == toggle) return;
    const isDropdownChild = element.closest('.dropdown__filter');
    if (!isDropdownChild) {
      toggle.checked = false;
    }
  });
}

// Популярный запрос
async function getPopularArticlesBeta(category) {
  console.log(
    '🚀 ~ file: init.js:109 ~ getPopularArticlesBeta ~ getPopularArticlesBeta:'
  );
  try {
    const response = await nytimesAPI.fetchLikePopularArticles(
      category,
      pageValue.page,
      limit
    );

    templateCards.checkTheDataBeta(response);
    templateCards.buildTemplate(); //Рендер карточки
    addWeatherBlock();
  } catch (error) {
    console.log(error);
  }
}
