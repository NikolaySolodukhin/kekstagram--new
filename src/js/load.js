'use strict';

function load(url, onLoad) {
  /**

  /**
   * *Делает XMLHttp запрос к серверу и отдает данные в onload
   * @param {string} url
   * @param {function} onLoad
   */
  fetch(url)
    .then(res => res.json())
    .then(data => {
      onLoad(data);
    });
}

export default load;
