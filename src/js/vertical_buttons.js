import { bodyArticles } from './homepage-render';

const mark = document.querySelector(`.lift-buttons`);

mark.addEventListener('click', onUnClick);
document.addEventListener('scroll', onUnScrooll);

mark.firstElementChild.setAttribute('disabled', true);
mark.firstElementChild.nextElementSibling.setAttribute('disabled', true);

function onUnScrooll() {
  let silk = window.pageYOffset;
  let forest = 0;
  const currency = window.scrollY;

  if (silk !== 0 || silk > 100) {
    mark.firstElementChild.removeAttribute('disabled');
  } else {
    mark.firstElementChild.setAttribute('disabled', true);
  }

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    forest = window.scrollY;
    mark.lastElementChild.setAttribute('disabled', true);
  } else if (forest !== currency) {
    mark.lastElementChild.removeAttribute('disabled');
  }
}

let ladyBug = 0;

function onUnClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const { top: upButtonEl } = bodyArticles.getBoundingClientRect();

  if (e.target.classList.contains('up-button')) {
    ladyBug = window.scrollY;
    window.scrollBy({
      top: -(upButtonEl * upButtonEl),
      behavior: `smooth`,
    });
    mark.firstElementChild.nextElementSibling.removeAttribute('disabled');
  } else if (e.target.classList.contains('down-button')) {
    ladyBug = window.scrollY;
    window.scrollBy({
      top: upButtonEl * upButtonEl,
      behavior: `smooth`,
    });
    mark.firstElementChild.nextElementSibling.removeAttribute('disabled');
  } else {
    rotate();
  }
}

function rotate() {
  mark.firstElementChild.nextElementSibling.setAttribute('disabled', true);

  window.scrollTo({
    top: window.scrollY * 0 + ladyBug,
    behavior: `smooth`,
  });
}
