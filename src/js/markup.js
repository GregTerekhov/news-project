import { bodyArticles } from './selectors';

export async function createPopularMarkup(unit) {
  try {
    let templateUnit = await unit.data.results
      .map(value => {
        let image;
        if (value.media.length !== 0) {
          image = value.media[0]['media-metadata'][2].url;
          console.log(image);
        } else {
          image = './src/images/card_placeholder.jpg';
        }
        return `<li class="markup-unit" name="card">
    <p class="markup-unit__section">${value.section}</p>
    <p class="markup-unit__already-read">Already read
    <svg width="15" height="15">
    <use href=".src/images/icons.svg#icon-read-check"></use>
    </svg>
    </p>
    <img class="markup-unit__card-image" src="${image}" alt="placeholder" />
    <button class="markup-unit__add-favorite" type="button" data-info>
    <p class="markup-unit__favorite-text">Add to favorite</p>
    <svg width="15" height="15">
    <use href="..scr/images/icons.svg#icon-favorite-heart"></use>
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
        console.log(value);
        return `<li class="markup-unit" name="card">
      <p class="markup-unit__section">${value.section_name}</p>
      <p class="markup-unit__already-read">Already read
      <svg width="15" height="15">
      <use href=".src/images/icons.svg#icon-read-check"></use>
      </svg>
      </p>
      <img class="markup-unit__card-image" src="${value.multimedia[0].url}" alt="placeholder" />
      <button class="markup-unit__add-favorite" type="button" data-info>
      <p class="markup-unit__favorite-text">Add to favorite</p>
      <svg width="15" height="15">
      <use href="..scr/images/icons.svg#icon-favorite-heart"></use>
      </svg>
      </button>
      <h1 class="markup-unit__card-header">${value.headline.main}</h1>
      <h2 class="markup-unit__card-text">${value.abstract}</h2>
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
