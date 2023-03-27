export class PagePagination {
  constructor() {
    this.page = 1;
  }

  pageReset() {
    this.page = 1;
  }

  increasePageValue() {
    this.page += 1;
  }

  decreasePageValue() {
    this.page -= 1;
  }
  // добавила
  pageSet(number) {
    this.page = number;
  }
}
import {
  pageValue,
  templateCards,
  bodyArticles,
  weatherViget,
} from './homepage-render';

// import { createPopularMarkup } from './markup.js';
import { getPopularArticles, resetMarkup } from './homepage-render';
import { fetchPopularArticles } from './fetchArticles';

export function onPagination({ data: { results, num_results } }) {
  const paginationRef = document.querySelector('.pagination');
  function createPagination() {
    paginationRef.innerHTML = ` <ul class="page-container">
  <button class="prev-page" disabled> <  Prev
  </button>
  <div class= "pagination-buttons" id="pagination"></div>
  <button class="next-page"> Next  >    
  </button>
</ul>`;
  }
  createPagination();

  const pg = document.getElementById('pagination');
  const btnNextPg = document.querySelector('button.next-page');
  const btnPrevPg = document.querySelector('button.prev-page');
  const valuePage = {
    curPage: 1,
    numLinksTwoSide: 1,
    totalPages: 1,
    data: null,
    amountShowCards: 8,
  };
  setTimeout(() => {
    valuePage.totalPages = templateCards.newsNumber;
    valuePage.data = templateCards.value;
    console.log(valuePage);
  }, 0);
  function handleWindowSizeChange() {
    if (window.innerWidth < 768) {
      valuePage.numLinksTwoSide = 0;
      valuePage.amountShowCards = 4;
    } else {
      valuePage.numLinksTwoSide = 1;
      valuePage.amountShowCards = 8;
    }
    pagination();
  }
  window.addEventListener('resize', handleWindowSizeChange);

  function createPopularMarkup(unit) {
    try {
      let templateUnit = unit
        .map(value => {
          let image = '../images/card_placeholder.png';
          if (value.media.length !== 0) {
            image = value.media[0]['media-metadata'][2].url;
          }
          return `<li class="markup-unit markup-unit__read" name="card">
      <p class="markup-unit__section">${value.section}</p>
      <p class="markup-unit__already-read">Already read
      <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
      </svg>
      </p>
      <img class="markup-unit__card-image" src="${image}" alt="placeholder"/>
      <button class="markup-unit__add-favorite" type="button" data-info>
      <p class="markup-unit__favorite-text">Add to favorite</p>
      <svg class="markup-unit__favorite-icon markup-unit__favorite-icon--active" width="15" height="15" viewBox="0 0 37 32">
      <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
      </svg>
      </button>
      <h2 class="markup-unit__card-header" name="card_header">${value.title}</h2>
      <p class="markup-unit__card-text" name="card_text">${value.abstract}</p>
      <div class="markup-unit__card-info">
      <p class="markup-unit__card-date">${value.published_date}</p>
      <a class="markup-unit__read-more" href="${value.url} name="read_more">Read more</a>
      </div>
      </li>`;
        })
        .join('');
      return bodyArticles.insertAdjacentHTML('beforeend', templateUnit);
    } catch (error) {
      console.log(error);
    }
  }

  setTimeout(async () => {
    const response = await fetchPopularArticles();
    valuePage.data = response.data.results;
    valuePage.totalPages = Math.ceil(
      response.data.num_results / valuePage.amountShowCards
    );
    if (valuePage.data) {
      // 30,
      // templateCards.checkTheData(response);
      // templateCards.buildTemplate(); //Рендер карточки
      // createPopularMarkup(
      //   valuePage.data.slice(
      //     valuePage.amountShowCards * valuePage.curPage -
      //       valuePage.amountShowCards,
      //     valuePage.amountShowCards * valuePage.curPage
      //   )
      // );
    }
    pagination();
  }, 0);

  setTimeout(() => {
    pagination();
  }, 0);

  pg.addEventListener('click', e => {
    const ele = e.target;

    if (ele.dataset.page) {
      const pageNumber = parseInt(e.target.dataset.page, 30);

      valuePage.curPage = pageNumber;
      // pagination(valuePage);
      resetMarkup();
      if (valuePage.data) {
        createPopularMarkup(
          valuePage.data.slice(
            valuePage.amountShowCards * valuePage.curPage -
              valuePage.amountShowCards,
            valuePage.amountShowCards * valuePage.curPage + 1
          )
        );
        weatherViget.checkLocation();
      }
      pagination();
      console.log(valuePage);
      handleButtonLeft();
      handleButtonRight();
    }
  });

  // DYNAMIC PAGINATION
  function pagination() {
    const { totalPages, curPage, numLinksTwoSide: delta } = valuePage;

    const range = delta + 4; // use for handle visible number of links left side

    let render = '';
    let renderTwoSide = '';
    let dot = `<li class="pg-item"><a class="pg-link">...</a></li>`;
    let countTruncate = 0; // use for ellipsis - truncate left side or right side

    // use for truncate two side
    const numberTruncateLeft = curPage - delta;
    const numberTruncateRight = curPage + delta;

    let active = '';
    for (let pos = 1; pos <= totalPages; pos++) {
      active = pos === curPage ? 'active' : '';

      // truncate
      if (totalPages >= 2 * range - 1) {
        if (
          numberTruncateLeft > 3 &&
          numberTruncateRight < totalPages - 3 + 1
        ) {
          // truncate 2 side
          if (pos >= numberTruncateLeft && pos <= numberTruncateRight) {
            renderTwoSide += renderPage(pos, active);
          }
        } else {
          // truncate left side or right side
          if (
            (curPage < range && pos <= range) ||
            (curPage > totalPages - range && pos >= totalPages - range + 1) ||
            pos === totalPages ||
            pos === 1
          ) {
            render += renderPage(pos, active);
          } else {
            countTruncate++;
            if (countTruncate === 1) render += dot;
          }
        }
      } else {
        // not truncate
        render += renderPage(pos, active);
      }
    }

    if (renderTwoSide) {
      renderTwoSide =
        renderPage(1) + dot + renderTwoSide + dot + renderPage(totalPages);
      pg.innerHTML = renderTwoSide;
    } else {
      pg.innerHTML = render;
    }
  }

  function renderPage(index, active = '') {
    return ` <li class="pg-item ${active}" data-page="${index}">
        <a class="pg-link" href="#">${index}</a>
    </li>`;
  }

  document
    .querySelector('.page-container')
    .addEventListener('click', function (e) {
      handleButton(e.target);
    });

  function handleButton(element) {
    if (element.classList.contains('first-page')) {
      valuePage.curPage = 1;
    } else if (element.classList.contains('last-page')) {
      valuePage.curPage = 10;
    } else if (element.classList.contains('prev-page')) {
      valuePage.curPage--;
      handleButtonLeft();
      btnNextPg.disabled = false;
    } else if (element.classList.contains('next-page')) {
      valuePage.curPage++;
      handleButtonRight();
      btnPrevPg.disabled = false;
    }
    pagination();
  }
  function handleButtonLeft() {
    if (valuePage.curPage === 1) {
      btnPrevPg.disabled = true;
    } else {
      btnPrevPg.disabled = false;
    }
  }
  function handleButtonRight() {
    if (valuePage.curPage === valuePage.totalPages) {
      console.log(valuePage.curPage);
      btnNextPg.disabled = true;
    } else {
      btnNextPg.disabled = false;
    }
  }
}
