let darkMode = localStorage.getItem('darkMode');

export const refs = {
  switcher: document.querySelector('.toggle-mode__checkbox'),
  switchSlider: document.querySelector('.toggle-mode__slider'),
  body: document.querySelector('body'),
  footer: document.querySelector('.footer'),
  darkText: document.querySelector('.toggle-mode__dark'),
  lightText: document.querySelector('.toggle-mode__light'),
};

onStart();

export function onStart() {
  if (darkMode) {
    refs.switcher.checked = true;
    refs.footer.classList.add('darkmode-footer');
    console.log('onstart');
  }
}

refs.switcher.addEventListener('click', onSwitcherClick);
refs.switcher.addEventListener('click', enableAnimation, { once: true });

function makeDarkMode() {
  refs.body.classList.add('darkmode');
  refs.footer.classList.add('darkmode-footer');
  localStorage.setItem('darkMode', true);
  // console.log('makedarkmode')
  // refs.darkText.classList.add('switch-is-active');
}

export function enableAnimation() {
  //   refs.switchSlider.style.transition = '0.4s';
  refs.body.style.transition = '1s';
  console.log('animation');
}

function makeLightMode() {
  refs.body.classList.remove('darkmode');
  refs.footer.classList.remove('darkmode-footer');
  localStorage.removeItem('darkMode');
  // console.log('makelightmode')
  // refs.lightText.classList.add('switch-is-active');
}

export function onSwitcherClick() {
  darkMode = localStorage.getItem('darkMode');
  if (!darkMode) {
    makeDarkMode();
    return;
  }
  makeLightMode();
}
export function onInputSubmit(e) {
  try {
    e.preventDefault();

  } catch (error) {
    console.log(error);
  }
}
