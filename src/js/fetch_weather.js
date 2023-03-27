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
        navigator.geolocation.getCurrentPosition(this.locationSuccess);
      } else {
        console.log('Геолокація не підтримується вашим браузером');
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

          <img class="weather-img rotate-center"" src="https://openweathermap.org/img/wn/${
            weatherResponse.weather[0]['icon']
          }@2x.png">

          <div class="day">${days}</div>
          <span class="date">${dateNow}</span>
          <div class="wind">
          <span>
          <svg class="wind-svg" width="30" height="30" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M26.938 12c-1.656 0-3 1.344-3 3 0 0.353 0.073 0.685 0.184 1h-19.184c-0.552 0-1 0.448-1 1s0.448 1 1 1h22c1.656 0 3-1.344 3-3s-1.344-3-3-3zM4.938 14h12c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3c0 0.353 0.073 0.685 0.184 1h-9.184c-0.552 0-1 0.448-1 1s0.448 1 1 1zM20.938 20c-0.059 0-0.115 0.013-0.174 0.018-0.039-0.003-0.072-0.018-0.111-0.018h-15.428c-0.711 0-1.287 0.448-1.287 1s0.576 1 1.287 1h12.897c-0.111 0.315-0.184 0.648-0.184 1 0 1.656 1.344 3 3 3s3-1.344 3-3-1.344-3-3-3z" fill="white">
          </svg></span>
          ${weatherResponse.wind.speed} m/s</div></div>
        </div>`;

    if (!bodyArticles.firstChild || !bodyArticles.firstChild.nextSibling) {
      return;
    }
    if (window.matchMedia(`(min-width: 1280px)`).matches) {
      console.log(bodyArticles);
      bodyArticles.firstChild.nextSibling.insertAdjacentHTML('afterend', greed);
    } else if (window.matchMedia(`(min-width: 768px)`).matches) {
      bodyArticles.firstChild.insertAdjacentHTML('afterend', greed);
    } else {
      return;
    }
  }
}
