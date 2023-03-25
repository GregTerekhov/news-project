import { bodyArticles } from './homepage-render';
import { IMAGE_URL } from './fetchArticles';

export function getNoFound() {
  const noFound = `<div class="no-found">
  <h1 class="no-found__text">We haven’t found news from this category</h1>
  <div class="no-found__image"></div>
  </div>`;
  return bodyArticles.insertAdjacentHTML('beforeend', noFound);
}

//Оптимизация рендеринга карточек не завершена, и будет дорабатываться

export function createPopularMarkup(unit) {
  try {
    let templateUnit = unit.data.results
      .map(value => {
        let image = '/src/images/card_placeholder.png';
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
    <h1 class="markup-unit__card-header" name="card_header">${value.title}</h1>
    <h2 class="markup-unit__card-text" name="card_text">${value.abstract}</h2>
    <p class="markup-unit__card-date">${value.published_date}</p>
    <a class="markup-unit__read-more" href="${value.url} name="read_more">Read more</a>
    </li>`;
      })
      .join('');
    return bodyArticles.insertAdjacentHTML('beforeend', templateUnit);
  } catch (error) {
    console.log(error);
  }
}

export function createQueryMarkup(unit) {
  try {
    let templateUnit = unit.data.response.docs
      .map(value => {
        let image = '/src/images/card_placeholder.png';
        if (value.multimedia.length !== 0) {
          image = value.multimedia[0].legacy.xlarge;
        }
        // console.log(value);
        return `<li class="markup-unit" name="card">
      <p class="markup-unit__section">${value.section_name}</p>
      <p class="markup-unit__already-read">Already read
      <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
      </svg>
      </p>
      <img class="markup-unit__card-image" src="${IMAGE_URL}/${image}" alt="placeholder" />
      <button class="markup-unit__add-favorite" type="button" data-info>
      <p class="markup-unit__favorite-text">Add to favorite</p>
      <svg width="15" height="15">
      <use href="..scr/images/icons.svg#icon-favorite-heart"></use>
      </svg>
      </button>
      <h1 class="markup-unit__card-header">${value.headline.main}</h1>
      <h2 class="markup-unit__card-text js-card-description">${value.abstract}</h2>
      <p>${value.pub_date}</p>
      <a  href="${value.web_url}">Read more</a>
      </li>`;
      })
      .join('');

    return bodyArticles.insertAdjacentHTML('beforeend', templateUnit);
  } catch (error) {
    console.log(error);
  }
}

//Предпологаемый класс для универсальной карточки. Дорабатывается
// class MakeCards {
//   constructor(target) {
//     tag: target.section_name;
//     image: target.multimedia[0].url;
//     header: target.headline.main;
//     description: target.abstract;
//     date: target.pub_date;
//     url: target.web_url;
//   }

//   backCard(target) {
//     `TARGET.map(value => {return <p class="markup-unit__section">${tag}</p>
//   <img class="markup-unit__card-image" src="${image}" alt="placeholder" />
//   <h1 class="markup-unit__card-header">${header}</h1>
//   <h2 class="markup-unit__card-text">${description}</h2>
//   <p>${date}</p>
//   <a  href="${url}">Read more</a>})
//   .join("")
//   return bodyArticles.insertAdjacentHTML('beforeend', templateUnit);`;
//   }
// }
