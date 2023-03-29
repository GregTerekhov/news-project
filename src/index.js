import './js/refs';
import './js/mobile_menu';
import './js/categories/init';
import './js/calendar/index';
import './js/homepage-render';
import './js/pagination.js';
import './js/fetch_weather';
import './js/vertical_buttons';
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
