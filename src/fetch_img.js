import axios from 'axios';
export class PixabayAPI {
    #API_KEY = '34769662-caad36a1f3170139f3332b200';  
    #BASE_URL = 'https://pixabay.com/api/';

    query = null;
    page = 1;
    count = 40;

    baseSearchParameters = {
        per_page: this.count,
        key: this.#API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch:'true',
    };

    async fetchPhoto () {

        const searchParameters = new URLSearchParams({
            q: this.query,
            page: this.page,
            ...this.baseSearchParameters,
        });

        try {
            return await axios.get(`${this.#BASE_URL}/?${searchParameters}`);
        }
        
        catch (error) {
            throw new Error(error.message);
        }
    };
}

