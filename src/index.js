import './js/fetch weather';
import './js/pagination.js';
import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './js/fetchArticles';
import { formEl } from './js/homepage-render';
import { onInputSubmit } from './js/homepage-render';

formEl.addEventListener('submit', onInputSubmit);
