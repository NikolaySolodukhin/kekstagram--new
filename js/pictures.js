'use strict';

window.pictures = (function () {

  var PICTURE_LOAD_URL = '../data/data.json';
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
    pictures.forEach(function (pictureData) {
      window.utils.renderMiniPictures(window.utils.getNodeFromData(pictureData));
    });
  };

  window.load(PICTURE_LOAD_URL, onLoad);

})();
