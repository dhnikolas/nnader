import HTTP from 'scripts/http';
import Storage from 'scripts/storage';

export default {
  endpoint: '/api/extensions/nadder/settings',

  save: async function (data) {
    return await HTTP.post(this.endpoint, data);
  },

  remove: async function(data){
    return await HTTP.delete(this.endpoint, data);
  },

  get: async function (params){
    return await HTTP.get(this.endpoint, params);
  },
  
  addNewSetting:async function (data) {
    let response = await this.save(data);
    if(response.data.items){
      await this.setToStorage(response.data.items);
      return await this.getFromStorage();
    } else {
      return false;
    }
  },
  getSettings:async function () {
    let settings = await this.getFromStorage();
    if(!settings.length){
      settings = await this.get();
      settings = settings.data.items;
      if(settings){
        this.setToStorage(settings);
      }
    }
    return settings;
  },

  removeSetting: async function (data) {
    let settings = await this.remove(data);
      await this.setToStorage(settings.data.items);
      return await this.getFromStorage();
  },

  setToStorage: async function (data) {
    await Storage.set({settings: data})
  },

  getFromStorage: async function () {
    let settings = await Storage.get(['settings']);
    return settings.settings ? settings.settings : [];
  }
}