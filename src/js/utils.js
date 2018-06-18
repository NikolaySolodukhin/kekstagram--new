'use strict';

import Gallery from './show-gallery';
import initialSaturated from './initialize-saturate';

class Utils {
  constructor() {
    this.KEY_CODE = {
      ENTER: 13,
      ESCAPE: 27,
    };

    this.SCALE = {
      DEFAULT: 100,
      STEP: 25,
    };

    this.NUMBER_OF_NEW_IMAGES = 10;
    this.picturesContainer = document.querySelector('.pictures');
    this.filterLevelBox = document.querySelector('.upload-filter__level');
    this.pictureFragmentContainer = document.createDocumentFragment();
  }

  isEnterPressed(evt) {
    return evt.keyCode && evt.keyCode === this.KEY_CODE.ENTER;
  }

  isClicked(evt) {
    return evt.type === 'click';
  }

  isEscapePressed(evt) {
    return evt.keyCode && evt.keyCode === this.KEY_CODE.ESCAPE;
  }

  isClickedOrIsEnterPressed(evt) {
    return this.isEnterPressed(evt) || this.isClicked(evt);
  }

  getContainer() {
    return this.picturesContainer;
  }

  clearContainer() {
    return (this.getContainer().innerHTML = '');
  }

  // возвращает массив из NUMBER_OF_NEW_IMAGES элементов, содержащий случайные неповторяющиеся индексы элементов принятой на вход структуры данных
  getRandomIndexes(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomIndexes = [randomIndex];
    for (let i = 0; i < this.NUMBER_OF_NEW_IMAGES - 1; i++) {
      while (randomIndexes.indexOf(randomIndex) !== -1) {
        randomIndex = Math.floor(Math.random() * arr.length);
      }
      randomIndexes.push(randomIndex);
    }

    return randomIndexes;
  }

  pushPucturesInFragment(element) {
    return this.pictureFragmentContainer.appendChild(element);
  }
  // помещает элемент в контейнер
  renderMiniPictures() {
    return this.getContainer().appendChild(this.pictureFragmentContainer);
  }

  // получаем ноду из элемента массива с данными, вешаем обработчики
  getNodeFromData(pictureData) {
    const template = document.getElementById('picture-template');
    const templateContainer =
      'content' in template ? template.content : template;
    const picture = templateContainer.querySelector('.picture').cloneNode(true);
    picture.tabindex = '0';
    const pictureImg = picture.querySelector('.picture__img');

    picture.querySelector('.picture__likes').innerHTML = pictureData.likes;
    picture.querySelector('.picture__comments').innerHTML =
      pictureData.comments;
    pictureImg.src = require(`../assets/${pictureData.url}`);
    pictureImg.alt = 'Photo from gallery';

    // функция-обработчик: передаем в showGallery элемент из структуры данных для отрисовки и ссылку на ноду, куда надо вернуть фокус при закрытии превью на большом экране
    const setMiniImageHandler = evt => {
      if (this.isEnterPressed(evt) || this.isClicked(evt)) {
        evt.preventDefault();
        Gallery.show(pictureData, picture);
        Gallery.setFocusOncloseButton();
      }
    };

    picture.addEventListener('click', setMiniImageHandler);
    picture.addEventListener('keydown', setMiniImageHandler);
    return picture;
  }

  // функция-обработчик: показывает ползунок в случае если выбран фильтр
  switchFilterDisplay(value) {
    this.filterLevelBox.style.display = value !== 'none' ? 'block' : 'none';
    initialSaturated.init();
  }

  // функция-обработчик: изменяет значение CSS фильтров в соотвествии изменения ползунка
  onValueChanged(filterName, currentFilterAmount) {
    const picture = document.querySelector('.filter-image-preview');
    const DEFAULT_VALUE = 0.75;
    const NORMALIZE_VALUE = currentFilterAmount / DEFAULT_VALUE;
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
        picture.style.filter = 'invert(' + NORMALIZE_VALUE * 100 + '%' + ')';
        break;
      case 'filter-phobos':
        picture.style.filter =
          'contrast(' +
          NORMALIZE_VALUE * 2 +
          ')' +
          'saturate(' +
          NORMALIZE_VALUE * 5 +
          ')' +
          'hue-rotate(' +
          NORMALIZE_VALUE * -180 +
          'deg)';
        break;
      case 'filter-heat':
        picture.style.filter =
          'contrast(' +
          NORMALIZE_VALUE * 1.1 +
          ')' +
          'brightness(' +
          NORMALIZE_VALUE * 1.3 +
          ')' +
          'saturate(' +
          NORMALIZE_VALUE * 2.4 +
          ')' +
          'sepia(' +
          NORMALIZE_VALUE * 0.4 +
          ')';
        break;
      default:
        picture.style.filter = '';
        break;
    }
  }
}

export default new Utils();
