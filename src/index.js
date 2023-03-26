import './js/mobile_menu';

import './js/calendar/index';
import './js/categories/init';
import './js/pagination.js';

import './js/homepage-render';
import './js/fetch_weather';

import { formEl } from './js/homepage-render';
import { onInputSubmit } from './js/homepage-render';

formEl.addEventListener('submit', onInputSubmit);
