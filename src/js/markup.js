import { bodyArticles } from './homepage-render';
import { IMAGE_URL } from './fetchArticles';
import * as url from '../images/card_placeholder.jpg';

export function getNoFound() {
  const noFound = `<div class="no-found">
  <h1 class="no-found__text">We haven’t found news from this category</h1>
  <div class="no-found__image"></div>
  </div>`;
  return bodyArticles.insertAdjacentHTML('beforeend', noFound);
}

class ImageConvertor {
  convertPopularImage(img) {
    let imagePop = url;
    if (img.length !== 0) {
      imagePop = img[0]['media-metadata'][2].url;
    }
    return imagePop;
  }

  convertQueryImage(img) {
    let imageQue = url;
    if (img.length !== 0) {
      imageQue = `${IMAGE_URL}/${img[0].legacy.xlarge}`;
    }
    return imageQue;
  }
}

const imageConvertor = new ImageConvertor();

class TextRestriction {
  clipTheText(string) {
    const size = Number(125);
    let text = string.description;
    let textCut = text;
    if (text.length > size) {
      textCut = text.split('').slice(0, size).join('') + '...';
    }
    return textCut;
  }

  clipTheHeader(string) {
    const size = Number(50);
    let header = string.header;
    let headerCut = header;
    if (header.length > size) {
      headerCut = header.split('').slice(0, size).join('') + '...';
    }
    return headerCut;
  }
}

const textRestriction = new TextRestriction();

export class TemplateCards {
  constructor() {
    this.value, this.container, this.newsNumber;
  }

  checkTheData(response) {
    if (response.data.hasOwnProperty('results')) {
      this.newsNumber = response.data.num_results;
      this.value = response.data.results;
      this.container = this.takePopularValue();
      return;
    } else {
      this.newsNumber = response.data.response.meta.offset;
      this.value = response.data.response.docs;
      this.container = this.takeQueryValue();
    }
  }

  takePopularValue() {
    let gatheringUnit = this.value.map(
      ({ section, published_date, url, title, abstract, media }) => {
        let unitCycle = {
          tag: section,
          date: published_date,
          path: url,
          header: title,
          description: abstract,
          image: imageConvertor.convertPopularImage(media),
        };

        return unitCycle;
      }
    );
    return gatheringUnit;
  }

  takeQueryValue() {
    let gatheringUnit = this.value.map(
      ({ section_name, pub_date, web_url, headline, abstract, multimedia }) => {
        let unitCycle = {
          tag: section_name,
          date: pub_date,
          path: web_url,
          header: headline.main,
          description: abstract,
          image: imageConvertor.convertQueryImage(multimedia),
        };
        return unitCycle;
      }
    );
    return gatheringUnit;
  }

  buildTemplate() {
    try {
      let valueReceiver = this.container
        .map(unload => {
          const toJson = {
            category: unload.tag,
            imageURL: unload.image,
            date: unload.date,
            link: unload.path,
            title: textRestriction.clipTheHeader(unload),
            description: textRestriction.clipTheText(unload),
          };

          const favorite = JSON.stringify(toJson);

          return `<li class="markup-unit markup-unit__read" name="card">
    <p class="markup-unit__section">${unload.tag}</p>
    <p class="markup-unit__already-read">Already read
    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
      <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
    </svg>
    </p>
    <img 
        class="markup-unit__card-image" 
        src="${unload.image}" 
        alt="placeholder"
        />
    <button 
        class="markup-unit__add-favorite" 
        type="button" 
        data-info
        data-favorite='${favorite}'
      >
      <p 
        class="markup-unit__favorite-text js-fbutton"
        data-favorite='${favorite}'
      >
          Add to favorite
      </p>
      <svg 
          data-favorite='${favorite}'  
          class="markup-unit__favorite-icon markup-unit__favorite-icon--active js-fbutton" 
          width="15" 
          height="15" 
          viewBox="0 0 37 32"
        >
        <path style="stroke: var(--color1, #4440f7)" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="4" stroke-width="2.2857" d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"></path>
      </svg>
    </button>
    <h2 class="markup-unit__card-header" name="card_header">
        ${textRestriction.clipTheHeader(unload)}
    </h2>
    <p class="markup-unit__card-text" name="card_text">
        ${textRestriction.clipTheText(unload)}
    </p>
    <div class="markup-unit__card-footer">
        <p class="markup-unit__card-date">${unload.date}</p>
      <a 
        class="markup-unit__read-more" 
        href="${unload.path} 
        name="read_more"
      >
          Read more
      </a>
    </div>
    </li>`;
        })
        .join('');
      return bodyArticles.insertAdjacentHTML('beforeend', valueReceiver);
    } catch (error) {
      console.log(error);
    }
  }
}
