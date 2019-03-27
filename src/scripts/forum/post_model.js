import HTTP from 'scripts/http';

export default {
  endpoint: '/api/posts',

  save: async function (data) {
    let response = await HTTP.post(this.endpoint, data);
    return response.status === 200;
  }
}