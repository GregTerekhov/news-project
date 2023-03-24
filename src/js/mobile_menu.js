// const iconMenu = document.querySelector('.menu__icon');
// const menuBody = document.querySelector('.menu__body');

// if (iconMenu) {
//   iconMenu.addEventListener('click', function () {
//     document.body.classList.toggle('_lock');
//     iconMenu.classList.toggle('_active');
//     menuBody.classList.toggle('_active');
//   });
// }

// function onMenuClick(e) {
//   e.preventDefault();

//   if (iconMenu.classList.contains('_active')) {
//     document.body.classList.remove('_lock');
//     iconMenu.classList.remove('_active');
//     menuBody.classList.remove('_active');
//   }
// }

// ////////////////////////////////
// const bodyScrollLock = require('body-scroll-lock');
// const disableBodyScroll = bodyScrollLock.disableBodyScroll;
// const enableBodyScroll = bodyScrollLock.enableBodyScroll;

(() => {
  const mobileMenuRef = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const themeContainerRef = document.querySelector('.toggle-mode');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenuRef.classList.toggle('is-open');
    document.body.classList.toggle('_lock');
    if (themeContainerRef.classList.contains('mobile')) {
      themeContainerRef.classList.remove('mobile');
    } else if (!themeContainerRef.classList.contains('mobile')) {
      themeContainerRef.classList.add('mobile');
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the mobile menu on wider screens if the device orientation changes
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    document.body.classList.remove('_lock');
    mobileMenu.classList.remove('is-open');
    mobileMenu.classList.remove('open-menu');
    openMenuBtn.setAttribute('aria-expanded', false);
  });
})();

///////////////////////////////////////////

// import {
//   mobileMenuRef,
//   openMenuBtnRef,
//   closeMenuBtnRef,
//   themeContainerRef,
//   seachBtnRef,
// } from './refs';

// const toggleMenu = () => {
//   const isMenuOpen =
//     openMenuBtnRef.getAttribute('aria-expanded') === 'true' || false;
//   openMenuBtnRef.setAttribute('aria-expanded', !isMenuOpen);
//   mobileMenuRef.classList.toggle('open-menu');
//   if (themeContainerRef.classList.contains('mobile')) {
//     themeContainerRef.classList.remove('mobile');
//   } else if (!themeContainerRef.classList.contains('mobile')) {
//     themeContainerRef.classList.add('mobile');
//   }

//   const scrollLockMethod = !isMenuOpen
//     ? 'disableBodyScroll'
//     : 'enableBodyScroll';
// };

// openMenuBtnRef.addEventListener('click', toggleMenu);
// closeMenuBtnRef.addEventListener('click', toggleMenu);

// window.matchMedia('medium').addEventListener('change', e => {
//   if (!e.matches) return;
//   mobileMenuRef.classList.remove('open-menu');
//   openMenuBtnRef.setAttribute('aria-expanded', false);
// });

// if (window.innerWidth < 768) {
//   seachBtnRef.setAttribute('type', 'button');
// }
