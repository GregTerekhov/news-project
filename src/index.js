import './js/refs';
import './js/themeSwitcher';
import './js/authentication/modal';
import './js/mobile_menu';
import './js/categories/init';
import './js/calendar/index';
import './js/homepage-render';
import './js/pagination';
import './js/fetch_weather';
import './js/vertical_buttons';
import './js/home-favourites-read';

import { formEl } from './js/homepage-render';
import { onInputSubmit } from './js/homepage-render';

// window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
//   formEl.removeEventListener('submit');
//   return;
// });

formEl.addEventListener('submit', onInputSubmit);
