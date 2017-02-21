'use strict';

window.pictures = (function () {

  var PICTURE_LOAD_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var pictures = [];

  /**
   *
   * @param {object} data
   */
  var onLoad = function (data) {
    pictures = data.slice();
    showPictures(pictures);
    window.sortPictures(pictures);
  };

  var showPictures = function () {
    pictures.forEach(function (pictureData, i) {
      window.utils.renderMiniPictures(window.utils.getNodeFromData(pictureData));
    });
  };

  window.load(PICTURE_LOAD_URL, onLoad);

})();
