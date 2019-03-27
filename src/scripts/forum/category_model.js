import HTTP from 'scripts/http';
export default {
  endpoint: '/api/categories',

  get: async function (params) {
    let response = await HTTP.get(this.endpoint, params);
    return response.data.items ? response.data.items : [];
  }
}