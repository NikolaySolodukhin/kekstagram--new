'use strict';

window.showGallery = (function () {

   // переменные
  var gallery = document.querySelector('.gallery-overlay');
  var galleryPreview = gallery.querySelector('.gallery-overlay-preview');
  var galleryPreviewImage = galleryPreview.querySelector('.gallery-overlay-image');
  var galleryPreviewLikesCount = galleryPreview.querySelector('.likes-count');
  var galleryPreviewCommentsCount = galleryPreview.querySelector('.comments-count');
  var galleryCloseBtn = document.querySelector('.gallery-overlay-close');

  return function (currentElement, miniElement) {
    /**
     *
     * @param {Object} evt
     */
    var closeGallery = function (evt) {
      if (window.utils.isEnterPressed(evt) || window.utils.isClicked(evt) || window.utils.isEscapePressed(evt)) {
        evt.preventDefault();
        gallery.classList.add('invisible');
        galleryCloseBtn.removeEventListener('click', closeGallery);
        galleryCloseBtn.removeEventListener('keydown', closeGallery);
        window.removeEventListener('keydown', closeGalleryEscapeHandler);
        miniElement.focus();
      }
    };


        // показываем галерею, ставим фокус на кнопку закрытия
    gallery.classList.remove('invisible');
    galleryCloseBtn.focus();

        // рисуем превью
    galleryPreviewImage.src = currentElement.url;
    galleryPreviewLikesCount.innerHTML = currentElement.likes;
    galleryPreviewCommentsCount.innerHTML = currentElement.comments.length;

        // вешаем обработчики закрытия галереи
    galleryCloseBtn.addEventListener('click', function (evt) {
      closeGallery(evt);
    });

    galleryCloseBtn.addEventListener('keydown', function (evt) {
      closeGallery(evt);
    });

    window.addEventListener('keydown', function (evt) {
      closeGalleryEscapeHandler(evt);
    });

    var closeGalleryEscapeHandler = function (evt) {
      if (window.utils.isEscapePressed(evt)) {
        closeGallery(evt);
      }
    };

  };

})();
