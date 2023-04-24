import { refs } from './refs';

let darkMode = localStorage.getItem('darkMode');

onStart();

export function onStart() {
  if (darkMode) {
    for (let i = 0; i < refs.switcher.length; i += 1) {
      refs.switcher[i].checked = true;
    }
    refs.footer.classList.add('darkmode-footer');
  }
}

for (let i = 0; i < refs.switcher.length; i += 1) {
  refs.switcher[i].addEventListener('click', onSwitcherClick);
  refs.switcher[i].addEventListener('click', enableAnimation, { once: true });
}

function makeDarkMode() {
  if (refs.switcher[0].checked !== true) {
    refs.switcher[0].checked = true;
  } else if (refs.switcher[1].checked !== true) {
    refs.switcher[1].checked = true;
  }
  refs.body.classList.add('darkmode');
  refs.footer.classList.add('darkmode-footer');
  localStorage.setItem('darkMode', true);
}

export function enableAnimation() {
  refs.body.style.transition = '1s';
  refs.footer.style.transition = '1s';
  refs.modalContent.style.transition = '1s';
}

function makeLightMode() {
  if (refs.switcher[0].checked !== false) {
    refs.switcher[0].checked = false;
  } else if (refs.switcher[1].checked !== false) {
    refs.switcher[1].checked = false;
  }
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

if (window.innerWidth < 768) {
  const elementToMove = document.getElementById('interactive');
  const newParent = document.getElementById('location-for-interactive');
  const clonedElement = elementToMove.cloneNode(true);
  elementToMove.parentNode.removeChild(elementToMove);
  newParent.appendChild(clonedElement);
}
// export function onInputSubmit(e) {
//   try {
//     e.preventDefault();
//   } catch (error) {
//     console.log(error);
//   }
// }
