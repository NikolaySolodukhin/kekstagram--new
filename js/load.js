'use strict';

window.load = (function () {

  var errorHandler = function (err) {
    document.body.insertAdjacentHTML('afterBegin', '<span>Their destroying our city!</span>');
  };

/**
 * *Делает XMLHttp запрос к серверу и отдает данные в onload
 * @param {string} url
 * @param {function} onLoad
 */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 50000;
    xhr.open('GET', url);

    xhr.addEventListener('error', errorHandler);
    xhr.addEventListener('timeout', errorHandler);

    xhr.addEventListener('load', function (evt) {

      if (evt.target.status >= 400) {
        errorHandler('Failed to load data. Server returned status: ' + evt.target.status);
      } else if (evt.target.status >= 200) {
        onLoad(JSON.parse(evt.target.response));
      }
    });

    xhr.send();
  };
})();
