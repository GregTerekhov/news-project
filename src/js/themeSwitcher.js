let darkMode = localStorage.getItem('darkMode');

export const refs = {
  switcher: document.querySelectorAll('.toggle-mode__checkbox'),
  switchSlider: document.querySelectorAll('.toggle-mode__slider'),
  body: document.querySelector('body'),
  footer: document.querySelector('.footer'),
  darkText: document.querySelectorAll('.toggle-mode__dark'),
  lightText: document.querySelectorAll('.toggle-mode__light'),
};

onStart();

export function onStart() {
  if (darkMode) {
    for (let i = 0 ; i < refs.switcher.length; i += 1) {
      refs.switcher[i].checked = true;
    }
    refs.footer.classList.add('darkmode-footer');
  }
}

for (let i = 0 ; i < refs.switcher.length; i += 1) {
  refs.switcher[i].addEventListener('click' , onSwitcherClick);
  refs.switcher[i].addEventListener('click' , enableAnimation, { once: true });
}


function makeDarkMode() {
  if (refs.switcher[0].checked !== true) {refs.switcher[0].checked = true} 
  else if (refs.switcher[1].checked !== true) {refs.switcher[1].checked = true};

  refs.body.classList.add('darkmode');
  refs.footer.classList.add('darkmode-footer');
  localStorage.setItem('darkMode', true);
}

export function enableAnimation() {
  refs.body.style.transition = '1s';
  console.log('animation');
}

function makeLightMode() {
  if (refs.switcher[0].checked !== false) {refs.switcher[0].checked = false} 
  else if (refs.switcher[1].checked !== false) {refs.switcher[1].checked = false};
  refs.body.classList.remove('darkmode');
  refs.footer.classList.remove('darkmode-footer');
  localStorage.removeItem('darkMode');
}

export function onSwitcherClick() {
  darkMode = localStorage.getItem('darkMode');
  if (!darkMode) {
    makeDarkMode();
    return;
  }
  makeLightMode();
}
