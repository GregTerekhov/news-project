import './themeSwitcher';
import { refs } from './refs';
import { openModal } from './authentication/modal';

export function toggleMenu() {
  document.body.classList.toggle('_lock');
  refs.iconMenuBurgerEl.classList.toggle('_active');
  refs.menuMobileEl.classList.toggle('_active');
  refs.authenticationMobileBtn.classList.toggle('js-modal-mobile-menu');

  window.matchMedia('(max-width: 767px)').addEventListener('change', e => {
    if (
      e.matches &&
      !refs.iconMenuBurgerEl.classList.contains('_active') &&
      !refs.menuMobileEl.classList.contains('_active')
    )
      return;

    document.body.classList.remove('_lock');
    refs.iconMenuBurgerEl.classList.remove('_active');
    refs.menuMobileEl.classList.remove('_active');
    refs.authenticationMobileBtn.classList.remove('js-modal-mobile-menu');
  });
}
refs.iconMenuBurgerEl.addEventListener('click', toggleMenu);
