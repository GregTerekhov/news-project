// Martyniuk Oleh
import { bodyArticles } from './homepage-render';

// const wheaterRef = document.querySelector('.weather');

// форматуємо дату під формат з макету
const today = new Date();
const days = today.toDateString().slice(0, 3);
const month = today.toDateString().slice(4).slice(0, 4);
const number = today.toDateString().slice(8).slice(0, 2);
const year = today.toDateString().slice(11);
const dateNow = `${number} ${month} ${year}`;

export class WeatherBlock {
  checkLocation() {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          this.locationSuccess,
          this.permissionDenied
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async locationSuccess(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=50fae40a64fcd40464e14d0d20ee5d02`;

    const getWeather = await fetch(URL);
    const weatherResponse = await getWeather.json();

    let greed = `
    <div class="weather" name="weather">
          <div class="weather-container">
          <div class="weather-information"><span class="temp rotate-center">${
            Math.round(weatherResponse.main.temp) - 273 + '&deg;'
          }</span>
          <div class="weather-city ">
            <span class="main">${weatherResponse.weather[0].main}</span>
          <span class="name-city">
          <span><svg class='svg rotate-center' width="18" height="18" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg%22%3E">
          <path d="M9.50001 0.6875C7.03936 0.690403 4.68032 1.66918 2.94038 3.40912C1.20044 5.14906 0.221663 7.5081 0.21876 9.96875C0.215813 11.9796 0.87265 13.9359 2.08851 15.5375C2.08851 15.5375 2.34163 15.8708 2.38298 15.9189L9.50001 24.3125L16.6204 15.9147C16.6575 15.8699 16.9115 15.5375 16.9115 15.5375L16.9124 15.535C18.1276 13.934 18.7841 11.9787 18.7813 9.96875C18.7784 7.5081 17.7996 5.14906 16.0596 3.40912C14.3197 1.66918 11.9607 0.690403 9.50001 0.6875ZM9.50001 13.3438C8.8325 13.3438 8.17998 13.1458 7.62496 12.775C7.06994 12.4041 6.63736 11.877 6.38192 11.2603C6.12647 10.6436 6.05963 9.96501 6.18986 9.31032C6.32008 8.65563 6.64152 8.05427 7.11352 7.58226C7.58553 7.11026 8.18689 6.78882 8.84158 6.6586C9.49627 6.52837 10.1749 6.59521 10.7916 6.85066C11.4083 7.1061 11.9354 7.53868 12.3062 8.0937C12.6771 8.64872 12.875 9.30124 12.875 9.96875C12.8739 10.8635 12.518 11.7213 11.8853 12.354C11.2526 12.9867 10.3948 13.3426 9.50001 13.3438Z" fill="white"/>
          </svg></span>
          ${weatherResponse.name}</span></div></div>
          <span class="weather-img rotate-center"><img  width= 128 height=128 src="https://openweathermap.org/img/wn/${
            weatherResponse.weather[0]['icon']
          }@2x.png"></span>
          <span class="day">${days}</span>
          <span class="date">${dateNow}</span>
        </div></div>`;

    if (!bodyArticles.firstChild || !bodyArticles.firstChild.nextSibling) {
      return;
    }
    if (window.matchMedia(`(min-width: 1280px)`).matches) {
      console.log(bodyArticles);
      bodyArticles.firstChild.nextSibling.insertAdjacentHTML('afterend', greed);
    } else if (window.matchMedia(`(min-width: 768px)`).matches) {
      bodyArticles.firstChild.insertAdjacentHTML('afterend', greed);
    } else {
      bodyArticles.firstChild.insertAdjacentHTML('beforebegin', greed);
    }
  }

  permissionDenied(error) {
    const plugSpace = `<div class="weather plug-space" name="weather">
    <h1 class="plug-space__header">What a pity, this could be your weather</h1>
    <svg class="plug-space__icon" width="150" height="150" viewBox="0 0 33 33"> 
      <path d="M14.563 0.063c-3.088 0.3-5.938 1.438-8.438 3.362-1.219 0.938-2.8 2.7-3.712 4.138-0.394 0.619-1.163 2.194-1.438 2.944-0.306 0.838-0.637 2.125-0.8 3.119-0.194 1.219-0.194 3.531 0 4.75 0.281 1.725 0.725 3.113 1.481 4.656 0.825 1.681 1.681 2.875 3.056 4.256 1.381 1.375 2.575 2.231 4.256 3.056 1.544 0.756 2.931 1.2 4.656 1.481 1.219 0.194 3.531 0.194 4.75 0 1.725-0.281 3.113-0.725 4.656-1.481 1.681-0.825 2.875-1.681 4.256-3.056 1.375-1.381 2.231-2.575 3.056-4.256 0.55-1.119 0.825-1.85 1.125-2.975 0.394-1.5 0.488-2.319 0.488-4.056s-0.094-2.556-0.488-4.056c-0.3-1.125-0.575-1.856-1.125-2.975-0.825-1.681-1.681-2.875-3.056-4.256-1.381-1.375-2.575-2.231-4.256-3.056-1.538-0.756-2.962-1.206-4.625-1.469-0.919-0.144-2.969-0.212-3.844-0.125zM17.5 1.813c2.962 0.35 5.556 1.475 7.794 3.388 4.938 4.219 6.375 11.338 3.475 17.137-1.8 3.6-4.994 6.256-8.85 7.375-2.488 0.719-5.35 0.719-7.838 0-3.888-1.125-7.063-3.788-8.863-7.431-0.962-1.938-1.381-3.631-1.45-5.819-0.038-1.281 0.025-2.15 0.238-3.225 1.194-6.006 6.106-10.594 12.213-11.394 0.762-0.1 2.562-0.119 3.281-0.031z"></path>
      <path d="M20.769 10.919c-0.144 0.050-0.406 0.219-0.575 0.369-0.919 0.831-0.675 2.294 0.481 2.819 0.613 0.287 1.394 0.137 1.887-0.356 0.313-0.313 0.456-0.65 0.488-1.137 0.019-0.344 0-0.475-0.131-0.75-0.381-0.838-1.306-1.244-2.15-0.944z"></path>
      <path d="M9.85 11.475c-0.519 0.125-1.069 0.438-1.481 0.838-0.588 0.575-0.594 0.531 0.238 1.044l0.719 0.444 0.25-0.25c0.363-0.363 0.731-0.506 1.269-0.475 0.512 0.031 0.825 0.162 1.137 0.488l0.219 0.238 0.694-0.425c0.387-0.238 0.706-0.456 0.719-0.494 0.012-0.031-0.15-0.238-0.356-0.463-0.425-0.45-1-0.794-1.606-0.95-0.45-0.113-1.306-0.113-1.8 0.006z"></path>
      <path d="M9.031 17.456l-0.813 0.188-0.006 0.381c-0.012 0.456-0.137 0.762-0.444 1.106-0.313 0.344-0.644 0.5-1.169 0.55l-0.438 0.038-0.175 0.806c-0.1 0.444-0.169 0.819-0.15 0.831 0.013 0.012 0.219 0.044 0.463 0.063 0.494 0.038 1.081-0.050 1.5-0.231l0.269-0.119 0.825 0.831c0.619 0.619 1.006 0.95 1.544 1.306 4.056 2.688 9.169 2.181 12.594-1.238 0.625-0.619 1.281-1.425 1.281-1.569 0-0.044-0.788-0.581-1.344-0.913-0.050-0.031-0.163 0.087-0.319 0.313-0.331 0.481-1.331 1.475-1.869 1.856-0.625 0.438-1.65 0.944-2.344 1.156-0.975 0.3-1.706 0.394-2.713 0.356-1.644-0.063-2.95-0.481-4.35-1.413-0.519-0.344-1.625-1.369-1.838-1.706-0.106-0.163-0.106-0.181 0.081-0.563 0.1-0.219 0.219-0.538 0.256-0.706 0.081-0.356 0.094-1.306 0.019-1.425-0.037-0.063-0.213-0.044-0.863 0.1z"></path>
    </svg>
      </div>`;

    if (error.code === error.PERMISSION_DENIED) {
      console.log('you denied me :-(');
    }

    if (!bodyArticles.firstChild || !bodyArticles.firstChild.nextSibling) {
      return;
    }
    if (window.matchMedia(`(min-width: 1280px)`).matches) {
      console.log(bodyArticles);
      bodyArticles.firstChild.nextSibling.insertAdjacentHTML(
        'afterend',
        plugSpace
      );
    } else if (window.matchMedia(`(min-width: 768px)`).matches) {
      bodyArticles.firstChild.insertAdjacentHTML('afterend', plugSpace);
    } else {
      bodyArticles.firstChild.insertAdjacentHTML('beforebegin', plugSpace);
    }
  }
}
