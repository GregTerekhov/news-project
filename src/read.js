import { onGetLocaleStorageData } from './js/refs';
import { getNoFound } from './js/refs';
import './js/mobile_menu';
import {
  onSwitcherClick,
  onStart,
  enableAnimation,
  refs,
  onInputSubmit,
} from './js/themeSwitcher';
export const formEl = document.querySelector('.toggle-mode');
formEl.addEventListener('submit', onInputSubmit);
const READ_KEY = 'HAVE_READ'; // ключ для массива прочитанных новостей в Локальном Хранилище
const READ_URL_KEY = 'READ_URL'; // ключ для массива URL прочитанных новостей в Локальном Хранилище
const FAVORITES_KEY = 'FAVORITES';
let favorites = [];

const accordionRef = document.querySelector('.js-haveread'); // получаем ссылку на секцию аккордиона
const accordionListRef = document.querySelector('.accordion-list'); // получаем ссылку на панель с новостями

accordionListRef.addEventListener('click', onFavoriteClick); // делегируем слушание на секцию аккордиона

onOpenFavorites(READ_KEY);

//====== Функция-обработчик нажатия на кнопку Фавориты ==================
function onFavoriteClick(event) {
  if (!event.target.hasAttribute('data-info')) return; // проверка туда ли тырнули

  const parsedCardData = makeParseJson(event.target.dataset.favorite); // получаем объект данных с карточки которая находится на странице
  const dataFromLocaleStorage = onGetLocaleStorageData(FAVORITES_KEY); // получаем массив объектов из Локального Хранилища

  if (event.target.classList.contains('js-favorites')) {
    // проверка условия содержит ли кнопка класс-метку что новость уже добавлена в избранное

    event.target.textContent = 'Add to favorites'; // изменение текстового контента кнопки

    event.target.classList.remove('js-favorites'); // убираем класс-метку что карточка добавлена в избранное

    if (!dataFromLocaleStorage) {
      // проверка на null из пустого Локального Хранилища

      return;
    }

    const index = dataFromLocaleStorage.find((card, index) => {
      // получаем индекс нужной карточки
      if (card.link === parsedCardData.link) {
        return index;
      }
    });

    dataFromLocaleStorage.splice(index, 1); // удаляем карточку по индексу

    if (dataFromLocaleStorage.length === 0) {
      // проверяем пустой массив или нет
      localStorage.removeItem('FAVORITES');
      return;
    }

    onSetLocaleStorageData(FAVORITES_KEY, dataFromLocaleStorage); // сетаем в локальное хранилище модифицированный массив

    return;
  }
  //В противном случае==========//
  event.target.textContent = 'Remove from favorites'; // изменение текстового контента кнопки

  event.target.classList.add('js-favorites'); // добавляем класс-метку что карточка добавлена в избранное

  if (dataFromLocaleStorage) {
    // проверка на возврат null из пустого массива
    const findPresenceResult = dataFromLocaleStorage.some(
      card => card.link === parsedCardData.link
    ); // получаем булевое значение есть ли новость в избранном

    if (findPresenceResult) {
      // делаем условие новости на присутствие в Локальном Хранилище в избранном

      return;
    }

    favorites = [...dataFromLocaleStorage]; // распыляем в массив "Фавориты" данные из массива полученные из Локального хранилища
  }

  favorites.push(parsedCardData); // добавляем объект с данными карточки новости в массив "Фавориты"

  onSetLocaleStorageData(FAVORITES_KEY, favorites); // сетаем в локальное хранилище

  favorites = []; // очищаем массив "Фавориты"
}

//=============== Функция при открытии страныцы "Прочитанные" ==================================
function onOpenFavorites(key) {
  const dataFromLocaleStorage = onGetLocaleStorageData(key); // получаем данные из избранных в Локальном Хранилище

  if (!dataFromLocaleStorage || dataFromLocaleStorage.length === 0) {
    // проверка на null или пустой массив
    getNoFound(accordionRef);
    return;
  }

  onCreateReadMurkup(dataFromLocaleStorage);
}

//============== Функция рендера разметки ======================================
function onCreateReadMurkup(array) {
  array.forEach(date => {
    // перебираем массив с объектами со свойством даты и массивом новостей

    const firstMurkup = createFirstMurkup(date); // создаем разметку секции аккордеона с датой для новостей (разметка первого уровня)
    accordionListRef.insertAdjacentHTML('beforeend', firstMurkup); // рендерим эту разметку

    const accordionPanel = document.querySelector('.accordion-list_panel'); // получаем ссылку на новосозданный элемент

    accordionPanel.innerHTML = date.newsArray
      .map(newsObject => {
        // рендерим разметку непосредственно новостей (разметка второго внутреннего уровня)
        const { title, category, date, link, description, imageURL } =
          newsObject;
        const favorite = JSON.stringify(newsObject);

        //Логика проверки наличия новости в Фаворитах ------------------------------------------
        const fromFavorites = onGetLocaleStorageData(FAVORITES_KEY); // получаем массив из фаворитов из Локального Хранилища
        let configReadMarkup = checkFavouritesByUrl(fromFavorites, link); //по результату проверки возвращается объект настроек который используется для добавления динамических свойств в разметку
        if (!configReadMarkup) {
          // на случай undefined
          configReadMarkup = {
            class: 'zaglushka',
            addRemove: 'Add to favourites',
          };
        }
        //--------------------------------------------------------------------------------------
        return `<li class="markup-unit markup-unit__read" name="card">
    <p class="markup-unit__section">${category}</p>
    
    <img 
        class="markup-unit__card-image" 
        src="${imageURL}" 
        alt="placeholder"
        />
    <button 
        class="markup-unit__add-favorite js-fbutton ${configReadMarkup.class}" 
        type="button" 
        data-info
        data-favorite='${favorite}'
        data-id='${link}'
      >
      <p 
        class="markup-unit__favorite-text js-fbutton"
        data-favorite='${favorite}'
        style="pointer-events: none;"
      >
          ${configReadMarkup.addRemove}
      </p>
      <svg 
          data-favorite='${favorite}'  
          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" 
          width="15" 
          height="15" 
          viewBox="0 0 37 32"
          style="pointer-events: none;"
        >
        <path d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
      </svg>
    </button>
    <a class="markup-unit__global-link"
      href="${link}" 
      name="read_more"
      target="_blank"
      data-favorite='${favorite}'
    >
    <div class="markup-unit__details">
      <div class="markup-unit__subdetails">
       <h2 class="markup-unit__card-header" name="card_header">
        ${title}
    </h2>
    <p class="markup-unit__card-text" name="card_text">
        ${description}
    </p>
        <div class="markup-unit__card-footer">
          <p class="markup-unit__card-date">${date}</p>
          <p 
            class="markup-unit__read-more" 
          >
            Read more
          </p>
        </div>
      </div>
    </div>
  </a>
    </li>`;
      })
      .join(' ');
  });
}

function createFirstMurkup(obj) {
  return `<li class="accordion-list_item">
                <div class="accordion-title_wrapper">
                    <p class="accordion-list_title">
                        ${obj.whenRead}
                    </p>
                    <div class="accordion-arrow__wraper">
                        <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.7625 9L-3.18545e-07 7.28745L7.5 3.27835e-07L15 7.28745L13.2375 9L7.5 3.43725L1.7625 9Z" fill="#111321"/>
                        </svg>
                    </div>
                </div>
                <div class="accordion-list_panel"></div>
            </li>`;
}

// function onGetLocaleStorageData(key) {
//   try {
//     return JSON.parse(localStorage.getItem(key)); // получаем массив объектов из Локального Хранилища
//   } catch (error) {
//     console.log(error);
//   }
// }

//========== Функция парсинга данных из JSON файла =================================================
function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}

//========== Функкция Добавления Данных в Locale Storage ========================================
function onSetLocaleStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

function checkFavouritesByUrl(array, newsLink) {
  if (!array || array.length === 0) {
    // проверка на null или пустой массив
    return;
  }
  const compareResult = array.some(item => item.link === newsLink);
  if (compareResult) {
    return {
      class: 'js-favorites',
      addRemove: 'Remove from favorites',
    };
  } else {
    return {
      class: 'zaglushka',
      addRemove: 'Add to favourites',
    };
  }
}
