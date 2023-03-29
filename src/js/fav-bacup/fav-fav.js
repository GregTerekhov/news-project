import { markupHelper } from './fav-markup';
import { getFromStorage, removeFromStorage } from './storage';

const favoritesEl = document.querySelector('.js-articles-favourites');

const favoriteNews = getFromStorage();
const parcedArray = favoriteNews.map(element => makeParseJson(element));
const markup = markupHelper(parcedArray);
favoritesEl.insertAdjacentHTML('beforeend', markup);

favoritesEl.addEventListener('click', onFavoritesRemove);

function onFavoritesRemove(e) {
  console.log('onFavoritesRemove');
  console.log(e.target);
  if (e.target.nodeName === 'BUTTON') {
    if (e.target.innerText.includes('Remove from Favorites')) {
      removeFromStorage(e.target.dataset.favorite);
      const li = e.target.closest('li');
      li.remove();
    }
  }
}

function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}
