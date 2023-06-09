const mark = document.querySelector(`.lift-buttons`);
const bodyContainerEl = document.querySelector('.js-body-container');

mark.addEventListener('click', onUnClick);
document.addEventListener('scroll', onUnScrooll);

const topButton = mark.firstElementChild;
const backButton = mark.firstElementChild.nextElementSibling;
const bottomButton = mark.lastElementChild;

mark.firstElementChild.setAttribute('disabled', true);
mark.firstElementChild.nextElementSibling.setAttribute('disabled', true);

function onUnScrooll() {
  let silk = window.pageYOffset;
  let forest = 0;
  const currency = window.scrollY;

  if (silk !== 0 || silk > 100) {
    topButton.removeAttribute('disabled');
    topButton.classList.remove('button-lock');
  } else {
    topButton.setAttribute('disabled', true);
  }

  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    forest = window.scrollY;
    bottomButton.setAttribute('disabled', true);
    bottomButton.classList.add('button-lock');
  } else if (forest !== currency) {
    bottomButton.removeAttribute('disabled');
    bottomButton.classList.remove('button-lock');
  }
}

let ladyBug = 0;

function onUnClick(e) {
  if (e.target.nodeName === 'DIV') {
    return;
  }

  const { top: upButtonEl } =
    bodyContainerEl.children.articles.getBoundingClientRect();

  if (e.target.classList.contains('up-button')) {
    ladyBug = window.scrollY;
    window.scrollBy({
      top: -(upButtonEl * upButtonEl),
      behavior: 'smooth',
    });
    backButton.removeAttribute('disabled');
    backButton.classList.add('rot-down');
    backButton.classList.remove('button-lock');
  } else if (e.target.classList.contains('down-button')) {
    ladyBug = window.scrollY;
    window.scrollBy({
      top: upButtonEl * upButtonEl,
      behavior: `smooth`,
    });
    backButton.removeAttribute('disabled');
    backButton.classList.add('rot-up');
    backButton.classList.remove('button-lock');
  } else {
    rotate();
  }
}

function rotate() {
  backButton.setAttribute('disabled', true);
  backButton.classList.add('button-lock');

  if (
    backButton.classList.contains(`rot-down`) ||
    backButton.classList.contains(`rot-up`)
  ) {
    backButton.classList.remove(`rot-down`);
    backButton.classList.remove(`rot-up`);
  }
  window.scrollTo({
    top: window.scrollY * 0 + ladyBug,
    behavior: `smooth`,
  });
}
