export function markupHelper(newsArray) {
  const newsListMarkup = newsArray
    .map(unload => {
      const toJson = {
        category: unload.category,
        imageURL: unload.imageURL,
        date: unload.date,
        link: unload.link,
        title: unload.title,
        description: unload.description,
      };
      let buttonText;
      const favorite = JSON.stringify(toJson);

      buttonText = 'Remove from Favorites';
      //   map return
      const result = `<li class="markup-unit markup-unit__read favorites" name="card">
    <p class="markup-unit__section">${unload.category}</p>
    <p class="markup-unit__already-read">Already read
    <svg class="markup-unit__icon-check" width="18" height="18" viewBox="0 0 37 32">
    <path stroke="#00DD73" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="4" stroke-width="2.2857" d="M28.779 6.389c-0.288 0.009-0.546 0.131-0.732 0.323l-16.313 16.313-6.713-6.713c-0.195-0.209-0.473-0.339-0.78-0.339-0.589 0-1.067 0.478-1.067 1.067 0 0.308 0.13 0.585 0.339 0.78l0.001 0.001 7.467 7.467c0.193 0.193 0.459 0.312 0.754 0.312s0.561-0.119 0.754-0.312v0l17.067-17.067c0.199-0.194 0.323-0.465 0.323-0.765 0-0.589-0.478-1.067-1.067-1.067-0.011 0-0.022 0-0.033 0l0.002-0z"></path>
    </svg>
    </p>
    <div class="markup-unit__image-wrapper">
    <img
    class="markup-unit__card-image"
    src="${unload.imageURL}"
    alt="placeholder"
    />
    </div>
  
    <button
      class="markup-unit__add-favorite js-fbutton"
      type="button"
      data-info
      data-favorite='${favorite}'
      data-id='${unload.link}'
    >
    <p
      class="markup-unit__favorite-text js-fbutton"
      data-favorite='${favorite}'
      style="pointer-events: none;"
    >
        ${buttonText}
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
    <a class="markup-unit__global-link"
    href="${unload.link}"
    name="read_more"
    data-favorite='${favorite}'
    >
    <div class="markup-unit__details">
    <div class="markup-unit__subdetails">
      <h2 class="markup-unit__card-header" name="card_header">
        ${unload.title}
      </h2>
      <p class="markup-unit__card-text" name="card_text">
      ${unload.description}
      </p>
      <div class="markup-unit__card-footer">
        <p class="markup-unit__card-date">${unload.date}</p>
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
      return result;
    })
    .join('');

  return `<ul class="articles articles-background" name="articles">
             ${newsListMarkup}
          </ul>`;
}
