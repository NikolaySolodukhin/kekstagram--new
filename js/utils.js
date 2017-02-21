'use strict';

window.utils = (function () {

  var KEY_CODE = {
    'ENTER': 13,
    'ESCAPE': 27
  };

  var SCALE = {
    'DEFAULT': 100,
    'STEP': 25
  };

  var NUMBER_OF_NEW_IMAGES = 10;
  var picturesContainer = document.querySelector('.pictures');

  return {

    isEnterPressed: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE.ENTER;
    },

    isClicked: function (evt) {
      return evt.type === 'click';
    },

    isEscapePressed: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE.ESCAPE;
    },

    getScaleStep: function () {
      return SCALE.STEP;
    },

    getScaleDefault: function () {
      return SCALE.DEFAULT;
    },

    getContainer: function () {
      return picturesContainer;
    },

    clearContainer: function () {
      this.getContainer().innerHTML = '';
    },

    getRandomIndexes: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      var randomIndexes = [randomIndex];
      for (var i = 0; i < NUMBER_OF_NEW_IMAGES - 1; i++) {

        while (randomIndexes.indexOf(randomIndex) !== -1) {
          randomIndex = Math.floor(Math.random() * arr.length);
        }
        randomIndexes.push(randomIndex);
      }

      return randomIndexes;
    },

    renderMiniPictures: function (element) {
      this.getContainer().appendChild(element);
    },


// получаем ноду из элемента массива с данными, вешаем обработчики
    getNodeFromData: function (pictureData) {
      var template = document.getElementById('picture-template');
      var templateContainer = 'content' in template ? template.content : template;
      var picture = templateContainer.querySelector('.picture').cloneNode(true);
      picture.tabindex = '0';
      var pictureImg = picture.querySelector('img');

      picture.querySelector('.picture-likes').innerHTML = pictureData.likes;
      picture.querySelector('.picture-comments').innerHTML = pictureData.comments.length;
      pictureImg.src = pictureData.url;
      pictureImg.alt = 'Photo from gallery';

      // функция-обработчик: передаем в showGallery элемент из структуры данных для отрисовки и ссылку на ноду, куда надо вернуть фокус при закрытии превью на большом экране
      var setMiniImageHandler = function (evt) {

        if (window.utils.isEnterPressed(evt) || window.utils.isClicked(evt)) {
          evt.preventDefault();
          window.showGallery(pictureData, picture);
        }

      };

      picture.addEventListener('click', setMiniImageHandler);
      picture.addEventListener('keydown', setMiniImageHandler);
      return picture;
    },
  };
})();
