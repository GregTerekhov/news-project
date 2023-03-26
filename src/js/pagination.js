import { createPopularMarkup } from './markup.js';
import { getPopularArticles, resetMarkup } from './homepage-render';
import { fetchPopularArticles } from './fetchArticles';

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
  totalPages: 30,
  data: null,
  amountShowCards: 8,
};
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

setTimeout(async () => {
  const response = await fetchPopularArticles();
  valuePage.data = response.data.results;
  valuePage.totalPages = Math.ceil(
    response.data.num_results / valuePage.amountShowCards
  );
  if (valuePage.data) {
    30,
      createPopularMarkup(
        valuePage.data.slice(
          valuePage.amountShowCards * valuePage.curPage -
            valuePage.amountShowCards,
          valuePage.amountShowCards * valuePage.curPage
        )
      );
  }
  pagination();
}, 0);

// setTimeout(() => {
//   pagination();
// }, 0);

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
