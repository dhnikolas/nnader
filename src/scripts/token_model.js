import Config from 'scripts/config';
import axios from 'axios';
import Storage from 'scripts/storage';

export default {
  endpoint: Config.main_url + '/oauth/token',

  isAuth: async function () {
    let data = await this.getFromStorage();
    return data.access_token ? data : false;
  },

  getFromStorage: function () {
    return Storage.get(['access_token', 'refresh_token', 'username']);
  },

  setToStorage: async function (accessToken, refreshToken, username) {
    let tokens = {
      access_token: accessToken,
      refresh_token: refreshToken
    };
    if(username){
      tokens.username = username
    }
    return await Storage.set(tokens);
  },

  removeFromStorage: function () {
    Storage.remove(['access_token', 'refresh_token', 'username', 'settings']);
  },

  requestToken: function (login, password) {
    let data = {
      username: login,
      password: password,
      grant_type: 'password',
    };
    return this.request(data);
  },

  refreshToken: async function () {
    await this.getFromStorage().then(async data => {
      let request_params = {
        grant_type: 'refresh_token',
        refresh_token: data.refresh_token,
      };

      await this.request(request_params).then(async response => {
        await this.setToStorage(response.data.access_token, response.data.refresh_token);
        console.log('Token refreshing');
        return true;
      }).catch(error => {
        console.log(error);
        return false;
      });
    }).catch(function () {
      console.log('Refresh token not exist');
      return false;
    });
  },

  create: async function (login, password) {
    let response = await this.requestToken(login, password);
    if(response.data.access_token && response.data.refresh_token){
      console.log('Auth success!');
      await this.setToStorage(response.data.access_token, response.data.refresh_token, login);
      return response.data;
    } else {
      return false;
    }
  },
  
  request:function (params) {
    params.client_id = Config.client.id;
    params.client_secret = Config.client.secret;
    params.scope = Config.scope;
    return axios.post(this.endpoint, params);
  }
}