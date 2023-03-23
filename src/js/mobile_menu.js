// (() => {
//   const mobileMenu = document.querySelector('.js-menu-container');
//   const openMenuBtn = document.querySelector('.js-open-menu');
//   const closeMenuBtn = document.querySelector('.js-close-menu');

//   const toggleMenu = () => {
//     const isMenuOpen =
//       openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
//     openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
//     mobileMenu.classList.toggle('is-open');

//     const scrollLockMethod = !isMenuOpen
//       ? 'disableBodyScroll'
//       : 'enableBodyScroll';
//     bodyScrollLock[scrollLockMethod](document.body);
//   };

//   openMenuBtn.addEventListener('click', toggleMenu);
//   closeMenuBtn.addEventListener('click', toggleMenu);

//   // Close the mobile menu on wider screens if the device orientation changes
//   window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
//     if (!e.matches) return;
//     mobileMenu.classList.remove('is-open');
//     openMenuBtn.setAttribute('aria-expanded', false);
//     bodyScrollLock.enableBodyScroll(document.body);
//   });
// })();

import {
  mobileMenuRef,
  openMenuBtnRef,
  closeMenuBtnRef,
  themeContainerRef,
  seachBtnRef,
} from './refs';

const bodyScrollLock = require('body-scroll-lock');
import debounce from 'lodash.debounce';

const toggleMenu = () => {
  const isMenuOpen =
    openMenuBtnRef.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtnRef.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenuRef.classList.toggle('open-menu');
  if (themeContainerRef.classList.contains('mobile')) {
    themeContainerRef.classList.remove('mobile');
  } else if (!themeContainerRef.classList.contains('mobile')) {
    const debouncedThemeContainerRef = debounce(() => {
      themeContainerRef.classList.add('mobile');
    }, 250);

    debouncedThemeContainerRef();
  }

  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';

  bodyScrollLock[scrollLockMethod](document.body);
};

openMenuBtnRef.addEventListener('click', toggleMenu);
closeMenuBtnRef.addEventListener('click', toggleMenu);

window.matchMedia('medium').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenuRef.classList.remove('open-menu');
  openMenuBtnRef.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
});

if (window.innerWidth < 768) {
  seachBtnRef.setAttribute('type', 'button');
}
