import './js/mobile_menu';
import './js/categories/init';
import './js/calendar/index';
import './js/categories/myPagination'; //current version for testing!
import './js/pagination.js';
import './js/homepage-render';
import './js/fetch_weather';

import { formEl } from './js/homepage-render';
import { onInputSubmit } from './js/homepage-render';
import {
  onSwitcherClick,
  onStart,
  enableAnimation,
  refs,
} from './js/themeSwitcher';

formEl.addEventListener('submit', onInputSubmit);
