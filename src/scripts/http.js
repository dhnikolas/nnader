import axios from 'axios';
import Token from 'scripts/token_model';
import Config from 'scripts/config';
import LoaderController from 'scripts/loader_controller';

export default {
  /**
   *
   * @param method http метод
   * @param url -
   * @param params параметры
   * @param data - post data
   * @param withoutRefresh - Делать запрос без смены токена в случае если текущий просрочен
   * @returns {Promise<*>}
   */
  request: async function (method, url, params, data, withoutRefresh) {
    LoaderController.loadStart();
    let token = await Token.getFromStorage();
    let requestParams = {
      method: method,
      url: Config.main_url + url,
      data: data,
      params: params,
      headers: {
        'Authorization': 'Bearer ' + token.access_token
      }
    };
    if(token.access_token){
      try{
        let result = await axios(requestParams);
        LoaderController.loadStop();
        return result;
      } catch (error){
        if(error.response.status === 401 && !withoutRefresh){
          return await this.refreshTokenAndTryAgain({method: method, url: url, params: params});
        }
        LoaderController.loadStop();
        throw 'HTTP: ' + error.response.status + ' Msg: ' + error.response.data
      }

    } else {
      LoaderController.loadStop();
      throw 'HTTP: Access token not exist';
    }
  },

  get: async function (url, params) {
    return await this.request('get', url, params);
  },

  post: async function (url, data) {
    return await this.request('post', url, {}, data);
  },

  delete: async function (url, params) {
    return await this.request('delete', url, params);
  },

  patch: async function (url, data) {
    return await this.request('patch', url, {}, data);
  },

  refreshTokenAndTryAgain: async function (savedParams) {
    await Token.refreshToken();
    return await this.request(savedParams.method, savedParams.url, savedParams.params, true)
  }

}