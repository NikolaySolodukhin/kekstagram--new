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
  var filterLevelBox = document.querySelector('.upload-filter-level');

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
// возвращает массив из NUMBER_OF_NEW_IMAGES элементов, содержащий случайные неповторяющиеся индексы элементов принятой на вход структуры данных
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

 // помещает элемент в контейнер
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

// функция-обработчик: показывает ползунок в случае если выбран фильтр
    switchFilterDisplay: function (value) {
      filterLevelBox.style.display = value !== 'none' ? 'block' : 'none';
    },

// функция-обработчик: изменяет значение CSS фильтров в соотвествии изменения ползунка
    onValueChanged: function (filterName, currentFilterAmount) {
      var picture = document.querySelector('.filter-image-preview');
      var DEFAULT_VALUE = 0.75;
      var NORMALIZE_VALUE = currentFilterAmount / DEFAULT_VALUE;
      switch (filterName) {
        case 'filter-none':
          picture.style.filter = '';
          break;
        case 'filter-chrome':
          picture.style.filter = 'grayscale(' + NORMALIZE_VALUE + ')';
          break;
        case 'filter-sepia':
          picture.style.filter = 'sepia(' + NORMALIZE_VALUE + ')';
          break;
        case 'filter-marvin':
          picture.style.filter = 'invert(' + (NORMALIZE_VALUE) * 100 + '%' + ')';
          break;
        case 'filter-phobos':
          picture.style.filter = 'contrast(' + NORMALIZE_VALUE * 2 + ')' + 'saturate(' + NORMALIZE_VALUE * 5 + ')' + 'hue-rotate(' + (NORMALIZE_VALUE * -180) + 'deg)';
          break;
        case 'filter-heat':
          picture.style.filter = 'contrast(' + NORMALIZE_VALUE * 1.1 + ')' + 'brightness(' + NORMALIZE_VALUE * 1.3 + ')' + 'saturate(' + (NORMALIZE_VALUE * 2.4) + ')' + 'sepia(' + NORMALIZE_VALUE * 0.4 + ')';
          break;
        default:
          picture.style.filter = '';
          break;
      }
    }
  };
})();
