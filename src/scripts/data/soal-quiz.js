import apiEndpont from '../global/api-endpoint';

class FetchDataSoalQuiz {
  static async fetchSoal(category) {
    const response = await fetch(apiEndpont.url(category));
    const result = await response.json();
    return result;
  }
}

export default FetchDataSoalQuiz;
