import {
  fetchQuery,
  fetchPopular,
  fetchCategory,
  fetchCategories,
} from './fetchArticles';

const NY_URL = 'https://www.nytimes.com/';

class NytimesAPI {
  constructor() {
    this.reset();
  }

  reset() {
    this._searchType = null;
    this._currentCategory = null;
    this._word = null;
    this._popular = null;
    this._num_results = 0;
  }

  // функція для використання Пагінації, повертає масив даних для подальшої заливки новин
  getNextDataFromServer(pageNumber) {
    if (this._currentCategory) {
      return fetchNewsListFromCategorie(this._currentCategory, pageNumber);
    } else if (this._word) {
      return searchNews(this._currentWord, pageNumber);
    } else return popularNews(pageNumber);
  }

  async fetchAPI(suffix, params = {}) {
    try {
      const res = await axiosInstance.get(suffix, {
        params,
      });
      return res.data;
    } catch (error) {
      throw new Error(`API Error in fetch: ${error.message}`);
    }
  }

  // Отримує список категорій новин
  async categoriesList() {
    const { data } = await fetchCategories();
    return data.results;
  }

  // Отримує популярні новини
  async popularNews({ pageNumber, limit }) {
    if (pageNumber === 1) limit--;
    if (!this._popular) {
      let imageUrl = '';
      const { data } = await fetchPopular();
      const { results, num_results } = data;
      this._num_results = num_results;
      this._popular = results.map(article => {
        if (article.media.length > 0)
          imageUrl = this.selectByFormat(article.media[0]['media-metadata']);

        return {
          title: article.title,
          date: article.published_date,
          abstract: article.abstract,
          url: article.url,
          section: article.section,
          imageUrl,
        };
      });
    }
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;
    return this._popular.slice(startIndex, endIndex);
  }

  // Вибирає картинку з набору мультимедіа за форматом
  selectByFormat(metadataArray) {
    if (!metadataArray) {
      return null;
    }
    const image = metadataArray.find(
      media => media.format === 'mediumThreeByTwo440'
    );
    return image ? image.url : null;
  }

  // Отримує список новин з обраної категорії
  async fetchNewsListFromCategorie({ category, pageNumber, limit }) {
    if (pageNumber === 1) limit--;
    try {
      const { data } = await fetchCategory({
        category,
        pageNumber,
        limit,
      });
      const { results, num_results } = data;

      this._currentCategory = category;
      this._num_results = num_results;

      return results.map(article => {
        return {
          title: article.title,
          date: article.published_date,
          abstract: article.abstract,
          section: article.section,
          url: article.url,
          imageUrl: this.selectByFormat(article.multimedia),
        };
      });
    } catch (error) {
      console.error(`Error fetching news list from category: ${error.message}`);
      return [];
    }
  }

  // Отримує список новин по пошуковому запросу
  async searchNews({ word, pageNumber, limit }) {
    if (pageNumber === 1) limit--;
    const { data } = await fetchQuery({ word, pageNumber });
    const { docs, meta } = data.response;
    this._num_results = meta.hits;
    this._word = word;
    const result = docs.map(article => {
      const imageXlarge = article.multimedia.find(
        media => media.subtype === 'xlarge'
      );
      const imageUrl = imageXlarge ? NY_URL + imageXlarge.url : null;
      return {
        title: article.headline.main,
        date: article.pub_date,
        abstract: article.abstract,
        url: article.url,
        section: article.section_name,
        imageUrl,
      };
    });
    return result.slice(0, limit);
  }

  async fetchLikePopularArticles(category, pageNumber, limit) {
    try {
      const { data } = await fetchCategory({
        category,
        pageNumber,
        limit,
      });
      const { results, num_results } = data;

      this._currentCategory = category;
      this._num_results = num_results;
      const out = results.map(article => {
        return {
          title: article.title,
          date: article.published_date.slice(0, 10),
          abstract: article.abstract,
          section: article.section,
          url: article.url,
          imageUrl: this.selectByFormat(article.multimedia),
        };
      });
      return {
        data: {
          results: out,
        },
      };
    } catch (error) {
      console.error(`Error fetching news list from category: ${error.message}`);
      return [];
    }
  }

  get numResults() {
    return this._num_results;
  }
}

export { NytimesAPI };
