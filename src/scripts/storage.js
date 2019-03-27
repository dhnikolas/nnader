export default {

  get: function (keys) {
    return new Promise(function (resolve, rejected) {
      chrome.storage.sync.get(keys, function (data) {
        if (!chrome.runtime.lastError) {
          console.log('Getting '+ keys.join() +' from storage... ');
          resolve(data);
        } else {
          rejected(chrome.runtime.lastError);
        }
      });
    });
  },

  set: function (data) {
    return new Promise(function (resolve, rejected) {
      chrome.storage.sync.set(data, function () {
        if (!chrome.runtime.lastError) {
          console.log('Set to storage');
          resolve(true);
        } else {
          console.log(chrome.runtime.lastError)
          rejected(false);
        }
      });
    });
  },

  remove: function (keys) {
    return new Promise(function (resolve, rejected) {
      chrome.storage.sync.remove(keys, function () {
        if (!chrome.runtime.lastError) {
          console.log('Remove ' + keys.join() + ' from storage');
          resolve(true);
        } else {
          console.log(chrome.runtime.lastError)
          rejected(false);
        }
      });
    });
  }
}