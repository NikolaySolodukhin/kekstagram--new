'use strict';

window.pictures = (function () {

  var PICTURE_LOAD_URL = 'https://intensive-javascript-server-myophkugvq.now.sh/kekstagram/data';
  var picturesContainer = document.querySelector('.pictures');
  var pictures = [];
  var filters = document.querySelector('.filters');

  var onLoad = function (data) {
    pictures = data.slice();
    showPictures(pictures);
    filters.classList.remove('hidden');
  };

  var showPictures = function () {
    var picturesContainerAll = document.createDocumentFragment();
    pictures.forEach(function (pictureData, i) {
      picturesContainerAll.appendChild(createPicture(pictureData, i));
    });
    picturesContainer.appendChild(picturesContainerAll);
  };

  function createPicture(pictureData, indexData) {
    var template = document.getElementById('picture-template');
    var templateContainer = 'content' in template ? template.content : template;

    var picture = templateContainer.querySelector('.picture').cloneNode(true);
    picture.tabindex = '0';
    var pictureImg = picture.querySelector('img');

    picture.querySelector('.picture-likes').innerHTML = pictureData.likes;
    picture.querySelector('.picture-comments').innerHTML = pictureData.comments.length;
    pictureImg.src = pictureData.url;
    pictureImg.alt = 'Photo from gallery';

    picture.addEventListener('click', function (evt) {
      setMiniImageHandler(evt, indexData, picture);
    });

    picture.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        setMiniImageHandler(evt, indexData, picture);
      }
    });

    return picture;
  }

  var setMiniImageHandler = function (evt, indexData, picture) {
    evt.preventDefault();
    window.showGallery(pictures[indexData], picture);
  };

  window.load(PICTURE_LOAD_URL, onLoad);

})();
