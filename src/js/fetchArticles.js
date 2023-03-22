import axios from "axios";

const BASE_URL = 'https://api.nytimes.com/svc';
const API_KEY = 'uGHJWsajhmnJg2AMcnCD9YXkamMpVOHo';

export const fetchPopularArticles = async () => {
        try {

          const response = await axios.get(`${BASE_URL}/mostpopular/v2/viewed/1.json?`, 
          { params: {
                'api-key': API_KEY,
            }
          });
    
        return response;
        } catch (error) {console.log(error)}
      }

export const fetchQueryArticles = async (PAGE_VALUE, searchTerm) => {
        try {
          const response = await axios.get(`${BASE_URL}/search/v2/articlesearch.json`,
          { params: {
                'api-key': API_KEY,
                'page': PAGE_VALUE,
                'q': searchTerm,
                'sort': 'relevance',
            }
          });
        return response;
        } catch (error) {console.log(error)}
      }

export const fetchCategoryArticles = async (PAGE_VALUE, sectionName) => {
        try {

          const response = await axios.get(`${BASE_URL}/news/v3/content/all/${sectionName}.json`, 
          { params: {
                'api-key': API_KEY,
                'limit': 40,
                'offset': PAGE_VALUE,
            }
          });
    
        return response;
        } catch (error) {console.log(error)}
      }
