import './js/mobile_menu';
import './js/categories/init';
import './js/calendar/index';
import './js/pagination.js';
import './js/homepage-render';
import './js/fetch_weather';
import './js/home-favourites-read';

import { formEl } from './js/homepage-render';
import { onInputSubmit } from './js/homepage-render';
import {
  onSwitcherClick,
  onStart,
  enableAnimation,
  refs,
} from './js/themeSwitcher';

formEl.addEventListener('submit', onInputSubmit);
