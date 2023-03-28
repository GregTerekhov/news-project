import { pageValue, getQueryArticles, resetMarkup } from './homepage-render';

export class PagePagination {
  constructor() {
    this.pageReset();
  }

  pageReset() {
    this.page = 1;
    this.word = '';
    this.totalHits = null;
  }

  increasePageValue() {
    this.page += 1;
  }

  decreasePageValue() {
    this.page -= 1;
  }
}

const paginationRef = document.querySelector('.pagination');
function createPagination() {
  paginationRef.innerHTML = ` <ul class="page-container">
  <button class="prev-page" disabled>
    <svg class="prev-icon">
      <use href="./images/pagination/symbol-defs.svg#icon-arrow-left"></use>
    </svg>
    Prev

  </button>
  <div class= "pagination-buttons" id="pagination"></div>
  <button class="next-page"> Next
    <svg class="next-icon">
      <use href="./images/pagination/symbol-defs.svg#icon-arrow-left"></use>
    </svg>
  </button>
</ul>`;
}
createPagination();

const pg = document.getElementById('pagination');
const btnNextPg = document.querySelector('button.next-page');
const btnPrevPg = document.querySelector('button.prev-page');
export const valuePage = {
  curPage: 1,
  numLinksTwoSide: 1,
  totalPages: 20,
};

setTimeout(() => {
  pagination();
}, 0);

pg.addEventListener('click', async e => {
  const ele = e.target;

  if (ele.dataset.page) {
    const pageNumber = parseInt(e.target.dataset.page, 10);

    valuePage.curPage = pageNumber;
    pagination(valuePage);

    resetMarkup();
    if (pageValue.word.length) {
      const totalHits = await getQueryArticles(
        valuePage.curPage,
        pageValue.word
      );
      valuePage.totalPages = Math.round(totalHits / 10); // appromimate data, need correction!!!!
    }

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
      if (numberTruncateLeft > 3 && numberTruncateRight < totalPages - 3 + 1) {
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

document.querySelector('.pagination').addEventListener('click', function (e) {
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
