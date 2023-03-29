import { addToStorage, removeFromStorage, addToStorageRead } from './storage';

const articlesEl = document.querySelector('.articles');
articlesEl.addEventListener('click', onArticlesClick);

function onArticlesClick(e) {
  // e.preventDefault();
  const liElem = e.target.closest('li');
  const aEl = e.target.closest('a');
  if (e.target.nodeName === 'BUTTON') {
    if (e.target.innerText.includes('Remove from Favorites')) {
      removeFromStorage(e.target.dataset.favorite);
      e.target.querySelector('.js-fbutton').innerText = 'Add to Favorite';
      liElem.classList.remove('favorites');
    } else {
      liElem.classList.add('favorites');
      e.target.querySelector('.js-fbutton').innerText = 'Remove from Favorites';
      addToStorage(e.target.dataset.favorite);
    }
  } else if (aEl?.dataset?.favorite) {
    e.preventDefault();
    addToStorageRead(aEl.dataset.favorite);
  }
}
