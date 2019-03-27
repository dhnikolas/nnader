import HTTP from 'scripts/http';
import Categories from 'scripts/forum/category_model';

export default {
  get: async function (params) {
    let response = await HTTP.get('/api/discussions', params);
    console.log(response);
    return response.data.items ? response.data.items : [];
  }
}