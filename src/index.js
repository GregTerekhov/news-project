import './js/mobile_menu';
import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './js/fetchArticles';
import './js/calendar/index';
import './js/fetch weather';
import './js/categories/init';
import './js/pagination.js';
import {
  fetchPopularArticles,
  fetchQueryArticles,
  fetchCategoryArticles,
} from './js/fetchArticles';
import { formEl } from './js/homepage-render';
import { onInputSubmit } from './js/homepage-render';
import {onSwitcherClick, onStart, enableAnimation, refs} from './js/themeSwitcher';

formEl.addEventListener('submit', onInputSubmit);
