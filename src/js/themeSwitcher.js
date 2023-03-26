let darkMode = localStorage.getItem('darkMode');

const refs = {
    switcher: document.querySelector('.switch__input'),
    switchSlider: document.querySelector('.switch__slider'),
    body: document.querySelector('body'),
    footer: document.querySelector('.footer')
}

onStart ();

export function onStart () {
    if (darkMode) {
        refs.switcher.checked = true;
        refs.footer.classList.add('darkmode-footer')
    }
}

refs.switcher.addEventListener('click', onSwitcherClick)
refs.switcher.addEventListener('click', enableAnimation, {once: true})

function makeDarkMode () {
    refs.body.classList.add('darkmode');
    refs.footer.classList.add('darkmode-footer');
    localStorage.setItem('darkMode', true)
}

export function enableAnimation () {
    refs.switchSlider.style.setProperty('--switch-transition', '0.4s')
    refs.body.style.setProperty('--switch-transition', '0.4s')
}

function makeLightMode () {
    refs.body.classList.remove('darkmode');
    refs.footer.classList.remove('darkmode-footer');
    localStorage.removeItem('darkMode');

}

export function onSwitcherClick () {
    darkMode = localStorage.getItem('darkMode');
    if (!darkMode) {
        makeDarkMode();
        return
    }
    makeLightMode()
}