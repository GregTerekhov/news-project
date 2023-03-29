import './js/home-favourites-read';

const READ_KEY = 'HAVE_READ'; // ключ для массива прочитанных новостей в Локальном Хранилище
const READ_URL_KEY = 'READ_URL'; // ключ для массива URL прочитанных новостей в Локальном Хранилище
const FAVORITES_KEY = 'FAVORITES'; // ключ для массива новостей Фавориты в Локальном Хранилище

const favouriteGallery = document.querySelector('.js-articles-favourites');

favouriteGallery.addEventListener('click', onRemoveFromFavorites); // вешаем слушатель событий на галерею новостей

onOpenFavorites(FAVORITES_KEY); // запуск функции для рендера страницы

//=============== Функция при открытии страныцы "Фавориты" ==================================
function onOpenFavorites(key) {
  const dataFromLocaleStorage = onGetLocaleStorageData(key); // получаем данные из избранных в Локальном Хранилище

  if (!dataFromLocaleStorage || dataFromLocaleStorage.length === 0) {
    // проверка на null или пустой массив
    alert(
      'Добавьте страницу заглушку пожалуйста. Файл favourite.js, 19-строка'
    );
    return;
  }

  onCreateMurkup(dataFromLocaleStorage);
}

//============= Функция-обработчик удаления из Фаворитов ==============================
function onRemoveFromFavorites(event) {
  if (!event.target.hasAttribute('data-info')) return;

  const card = event.target.closest('.markup-unit');

  const cardIDLink = event.target.dataset.id; // получаем ID карточки в виде линка на первоисточник

  const dataFromLocaleStorage = onGetLocaleStorageData(FAVORITES_KEY); // получаем массив из Локального хранилища

  if (!dataFromLocaleStorage) {
    // проверка на null из пустого Локального Хранилища
    console.log("News isn't in favorites");
    return;
  }

  const index = dataFromLocaleStorage.find((card, index) => {
    // получаем индекс нужной карточки
    if (card.link === cardIDLink) {
      return index;
    }
  });

  dataFromLocaleStorage.splice(index, 1); // удаляем карточку по индексу

  if (dataFromLocaleStorage.length === 0) {
    // проверяем пустой массив или нет
    localStorage.removeItem('FAVORITES');
    onRemoveElement(card);
    return;
  }

  onSetLocaleStorageData(FAVORITES_KEY, dataFromLocaleStorage); // сетаем в локальное хранилище модифицированный массив

  onRemoveElement(card);
}

//============= Функция для рендера страницы ===========================================
function onCreateMurkup(arrayOfObjects) {
  const favoritesMurkup = arrayOfObjects
    .map(newsObject => {
      // перебираем массив из Локального хранилища и создаем разметку для карточки
      const { title, category, date, link, description, imageURL } = newsObject;
      const favorite = JSON.stringify(newsObject);

      //Логика отображения прочитанных на странице Фавориты--------------------------------------
      let check = 'display: none;'; // стиль по умолчанию для плашки "Already read"
      const urlFromLocaleStorage = onGetLocaleStorageData(READ_URL_KEY); // получаем массив URL прочитанных новостей
      check = checkIfReadByUrl(urlFromLocaleStorage, link); //возвращает строку с разным свойством display
      if (!check) {
        // проверка на undefined
        check = 'display: none;';
      }
      //---------------------------------------------------------------------

      return `<li class="markup-unit markup-unit__read" name="card">
    <p class="markup-unit__section">${category}</p>
    <p class="markup-unit__already-read" style='${check}'>Already read
    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
    </svg>
    </p>
    <img 
        class="markup-unit__card-image" 
        src="${imageURL}" 
        alt="placeholder"
        />
    <button 
        class="markup-unit__add-favorite js-fbutton js-favorites" 
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
          Remove from favourites
      </p>
      <svg 
          data-favorite='${favorite}'  
          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" 
          width="15" 
          height="15" 
          viewBox="0 0 37 32"
          style="pointer-events: none;"
        >
        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
      </svg>
    </button>
    <h2 class="markup-unit__card-header" name="card_header">
        ${title}
    </h2>
    <p class="markup-unit__card-text" name="card_text">
        ${description}
    </p>
    <div class="markup-unit__card-footer">
        <p class="markup-unit__card-date">${date}</p>
      <a 
        class="markup-unit__read-more" 
        href="${link}" 
        name="read_more"
        data-favorite='${favorite}'
      >
          Read more
      </a>
    </div>
    </li>`;
    })
    .join(' ');

  return (favouriteGallery.innerHTML = favoritesMurkup);
}

//============= Функция удаления элементов из ДОМ ======================================
function onRemoveElement(element) {
  element.remove();
}

// Логика работы с "Прочитанными" на странице Фавориты --------------------------------------------------------------------

favouriteGallery.addEventListener('click', onReadMoreClick); // вешаем слушатель событий на контейнер с новостями

//============== Функция обработчик по клику на ссылку ReadMore ==============================================
function onReadMoreClick(event) {
  //   event.preventDefault();
  if (!event.target.classList.contains('markup-unit__read-more')) return; // проверяем туда ли тырнули

  const clickDate = receiveDate(); // получаем дату клика в виде 20/02/2023
  const parsedCardData = makeParseJson(event.target.dataset.favorite); // получаем объект данных с карточки которая находится на странице
  const urlFromLocaleStorage = onGetLocaleStorageData(READ_URL_KEY); // получаем из локального хранилища массив URL прочитанных новстей
  const dataFromLocaleStorage = onGetLocaleStorageData(READ_KEY); // получаем массив объектов прочитанных новостей из Локального Хранилища

  //------ Логика для массива ссылок прочитаных новостей
  addHaveReadLink(urlFromLocaleStorage, parsedCardData.link, READ_URL_KEY);

  //------ Логика для массива объектов с датой и новостями
  addHaveReadNews(dataFromLocaleStorage, parsedCardData, clickDate, READ_KEY);
}

//========== Функция получения даты в формате 20/02/2021
function receiveDate() {
  const date = new Date();
  const day = addLeadingZero(date.getDate());
  const month = addLeadingZero(date.getMonth() + 1);
  const year = addLeadingZero(date.getFullYear());
  return `${day}/${month}/${year}`;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//========== Функция добавления ссылок на новости в отдельный массив в Locale Storage ============
function addHaveReadLink(array, link, key) {
  if (array) {
    // если вернулся массив ссылок
    const urlPresenceResult = array.some(item => item === link); // ищем есть ли совпадение с link результат

    if (!urlPresenceResult) {
      // если нету такого URL в массиве прочитанных новостей
      array.push(link); //добавляем в массив URL из локального хранилища URL текущей новости
      onSetLocaleStorageData(key, array); // сетаем в хранилище обновленный массив URL прочитанных новостей
    }

    return;
  }

  onSetLocaleStorageData(key, [link]); // если массива нет, создаем массив и помещаем туда url прочитанной новости и сетаем в Хранилище
}

//========== Функция добавления объекта прочитанных новостей согласно дате просмотра =============
function addHaveReadNews(newsArr, cardObj, date, key) {
  if (newsArr) {
    // если возвращается массив дат с новостями из Локального Хранилища

    const resultsArr = [];

    newsArr.forEach(object => {
      // перебираем все объекты прочитанных новостей с датами из Локального Хранилища
      const { newsArray } = object;

      const isPresent = newsArray.some(news => news.link === cardObj.link); // проверяем есть ли новость в коллекции
      resultsArr.push(isPresent);
    });

    const isNewsPresent = resultsArr.some(result => result); // проверка присутствия новости

    if (!isNewsPresent) {
      // Если новость не присутствует в прочитанных
      const datePresence = newsArr.some(item => item.whenRead === date); // проверяем есть ли сегодняшняя дата в массиве прочитанных

      if (datePresence) {
        // если дата уже присутствует в массиве
        const arrWithNewObject = newsArr.map(item => {
          // создаем новый массив перебирая массив из Локального Хранилища
          const { whenRead, newsArray } = item;
          if (whenRead === date) {
            //когда совпадение по дате
            newsArray.push(cardObj); // пушим в массив новостей объект с карточки
            return { whenRead, newsArray };
          }
        });
        console.log(arrWithNewObject);
        onSetLocaleStorageData(key, arrWithNewObject); // сетаем модифицированный массив в локальное хранилище
        return;
      }

      const whenHaveReadObject = {
        // создаем новый объект с датой когда новость прочитана и массивом прочитанных на эту дату
        whenRead: date,
        newsArray: [cardObj],
      };

      newsArr.push(whenHaveReadObject); // пушим объект с новостью и датой в существующий массив из Локального Хранилища

      onSetLocaleStorageData(key, newsArr); // сетаем новый массив в локальное хранилище
    }

    return;
  }

  const haveReadArray = []; // создаем массив который будем сетать в Локальное хранилище
  const whenHaveReadObject = {
    // создаем новый объект с датой когда новость прочитана и массивом прочитанных на эту дату
    whenRead: date,
    newsArray: [cardObj],
  };

  haveReadArray.push(whenHaveReadObject); // пушим в новый массив объект с датой и массивом прочитанных новостей

  onSetLocaleStorageData(key, haveReadArray); // сетаем массив с прочитанными новостями и датой в Локальное Хранилище
}
//-----------------------------------------------------------------------------------------------------------------------------------

//==================== Сервис Функции ===========================================
function onGetLocaleStorageData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)); // получаем массив объектов из Локального Хранилища
  } catch (error) {
    console.log(error);
  }
}

function makeParseJson(stringData) {
  try {
    return JSON.parse(stringData);
  } catch (error) {
    console.log(error);
  }
}

function onSetLocaleStorageData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

function checkIfReadByUrl(array, newsLink) {
  if (!array || array.length === 0) {
    // проверка на null или пустой массив
    return;
  }
  const compareResult = array.some(item => item === newsLink);
  if (compareResult) {
    return 'display: flex;';
  } else {
    return 'display: none;';
  }
}
