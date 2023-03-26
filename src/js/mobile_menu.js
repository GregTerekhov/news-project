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
    mobileMenuRef.classList.remove('is-open');
    // mobileMenuRef.classList.remove('open-menu');
    openMenuBtn.setAttribute('aria-expanded', false);
  });
})();
