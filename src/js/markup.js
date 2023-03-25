import { bodyArticles } from './homepage-render';
import { IMAGE_URL } from './fetchArticles';

export function getNoFound() {
  const noFound = `<div class="no-found">
  <h1 class="no-found__text">We haven’t found news from this category</h1>
  <div class="no-found__image"></div>
  </div>`;
  return bodyArticles.insertAdjacentHTML('beforeend', noFound);
}

class ImageConvertor {
  convertPopularImage(img) {
    let imagePop = '/src/images/card_placeholder.jpg';
    if (img.media.length !== 0) {
      imagePop = img.media[0]['media-metadata'][2].url;
    }
    return imagePop;
  }

  convertQueryImage(img) {
    let imageQue = '/src/images/card_placeholder.png';
    if (img.multimedia.length !== 0) {
      imageQue = img.multimedia[0].legacy.xlarge;
    }
    return imageQue;
  }
}

const imageConv = new ImageConvertor();

export class TemplateCards {
  constructor(ae) {
    value: '';
    tag: '';
    image: '';
    header: '';
    description: '';
    date: '';
    path: '';
    Obj: '';
  }

  checkTheData(response) {
    if (response.data.hasOwnProperty('results')) {
      this.value = response.data.results;
      this.Obj = this.unMapValue();
      return;
    } else {
      this.value = response.data.response.docs;
      this.Obj = this.unMapUnValue();
    }
  }

  unMapValue() {
    let unMapValue = this.value.map(({ section, published_date, url }) => {
      this.tag = section;
      this.date = published_date;
      this.path = url;
      let dataVal = {
        tag: this.tag,
        date: this.date,
        path: this.path,
      };
      return dataVal;
    });
    return unMapValue;
  }

  unMapUnValue() {
    let unMapValue = this.value.map(({ section_name, pub_date, web_url }) => {
      this.tag = section_name;
      this.date = pub_date;
      this.path = web_url;
      let dataUnVal = {
        tag: this.tag,
        date: this.date,
        path: this.path,
      };
      return dataUnVal;
    });
    return unMapValue;
  }

  buildTemplate() {
    try {
      let valueTaker = this.Obj.map(kuf => {
        return `<li class="markup-unit markup-unit__read" name="card">
    <p class="markup-unit__section">${kuf.tag}</p>
    <p class="markup-unit__already-read">Already read
    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
    <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
    </svg>
    </p>
    <img class="markup-unit__card-image" src="#" alt="placeholder"/>
    <button class="markup-unit__add-favorite" type="button" data-info>
    <p class="markup-unit__favorite-text">Add to favorite</p>
    <svg class="markup-unit__favorite-icon markup-unit__favorite-icon--active" width="15" height="15" viewBox="0 0 37 32">
    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
    </svg>
    </button>
    <h1 class="markup-unit__card-header" name="card_header">Header</h1>
    <h2 class="markup-unit__card-text" name="card_text">Text</h2>
    <p class="markup-unit__card-date">${kuf.date}</p>
    <a class="markup-unit__read-more" href="${kuf.path} name="read_more">Read more</a>
    </li>`;
      }).join('');
      console.log(valueTaker);
      return bodyArticles.insertAdjacentHTML('beforeend', valueTaker);
    } catch (error) {
      console.log(error);
    }
  }
}

//Оптимизация рендеринга карточек не завершена, и будет дорабатываться

export function createPopularMarkup(unit) {
  try {
    let templateUnit = unit.data.results
      .map(value => {
        return `<li class="markup-unit markup-unit__read" name="card">
    <p class="markup-unit__section">${value.section}</p>
    <p class="markup-unit__already-read">Already read
    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
    <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
    </svg>
    </p>
    <img class="markup-unit__card-image" src="${imageConv.convertPopularImage(
      value
    )}" alt="placeholder"/>
    <button class="markup-unit__add-favorite" type="button" data-info>
    <p class="markup-unit__favorite-text">Add to favorite</p>
    <svg class="markup-unit__favorite-icon markup-unit__favorite-icon--active" width="15" height="15" viewBox="0 0 37 32">
    <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
    </svg>
    </button>
    <h1 class="markup-unit__card-header" name="card_header">${descripHeader(
      value
    )}</h1>
    <h2 class="markup-unit__card-text" name="card_text">${descripText(
      value
    )}</h2>
    <p class="markup-unit__card-date">${value.published_date}</p>
    <a class="markup-unit__read-more" href="${
      value.url
    } name="read_more">Read more</a>
    </li>`;
      })
      .join('');
    return bodyArticles.insertAdjacentHTML('beforeend', templateUnit);
  } catch (error) {
    console.log(error);
  }
}

function descripText(string) {
  const size = Number(125);
  let text = string.abstract;
  let textCut = text;
  if (text.length > size) {
    textCut = text.split('').slice(0, size).join('') + '...';
  }
  return textCut;
}

function descripHeader(string) {
  const size = Number(40);
  let header = string.title;
  let headerCut = header;
  if (header.length > size) {
    headerCut = header.split('').slice(0, size).join('') + '...';
  }
  return headerCut;
}

export function createQueryMarkup(unit) {
  try {
    let templateUnit = unit.data.response.docs
      .map(value => {
        // let imageG = '/src/images/card_placeholder.png';
        // if (value.multimedia.length !== 0) {
        //   imageG = value.multimedia[0].legacy.xlarge;
        // }
        // console.log(value);
        return `<li class="markup-unit" name="card">
      <p class="markup-unit__section">${value.section_name}</p>
      <p class="markup-unit__already-read">Already read
      <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
      </svg>
      </p>
      <img class="markup-unit__card-image" src="${IMAGE_URL}/${imageConv.convertQueryImage(
          value
        )}" alt="placeholder" />
      <button class="markup-unit__add-favorite" type="button" data-info>
      <p class="markup-unit__favorite-text">Add to favorite</p>
      <svg width="15" height="15">
      <use href="..scr/images/icons.svg#icon-favorite-heart"></use>
      </svg>
      </button>
      <h1 class="markup-unit__card-header">${value.headline.main}</h1>
      <h2 class="markup-unit__card-text js-card-description">${
        value.abstract
      }</h2>
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
