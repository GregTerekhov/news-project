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
