export default {
  initListener: function (fn) {
    window.addEventListener('paste', fn);
  },

  getTextFromEvent: function (e) {
    let textHTML = e.clipboardData.getData('text/html');
    let textPlain = e.clipboardData.getData('text/plain');
    e.preventDefault();
    return {html: textHTML, plain: textPlain};
  },

  executeCopy: function () {
    return new Promise(function (resolve, reject) {
      chrome.tabs.executeScript( {
        code: "document.execCommand('copy');"
      }, function(selection) {
      });
      setTimeout(function () {
        document.execCommand("paste");
        resolve(true);
      }, 1000);
    });
  },

  getSelection: async function () {
    return new Promise(function (resovle, rejected) {
      chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
      }, function(selection) {
        resovle(selection[0]);
      });
    });
  }


}