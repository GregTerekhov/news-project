import { elements } from '../categories/elements';
import { addToStorage, removeFromStorage } from './storage';

elements.articles.addEventListener('click', onArticlesClick);

function onArticlesClick(e) {
  if (e.target.nodeName === 'BUTTON') {
    const li = e.target.closest('li');
    if (e.target.innerText.includes('Remove from Favorites')) {
      removeFromStorage(e.target.dataset.favorite);
      e.target.querySelector('.js-fbutton').innerText = 'Add to Favorite';
      li.classList.remove('favorites');
    } else {
      li.classList.add('favorites');
      e.target.querySelector('.js-fbutton').innerText = 'Remove from Favorites';
      addToStorage(e.target.dataset.favorite);
    }
  }
}
