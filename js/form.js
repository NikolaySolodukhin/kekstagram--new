'use strict';

window.form = (function () {
  // переменные
  var uploadForm = document.forms['upload-select-image'];
  var uploadFile = uploadForm['upload-file'];

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadFromBtn = uploadForm.querySelector('.upload-file');

  // Ставим фокус при открытии страницы на кнопку загрузки изображения
  uploadFromBtn.focus();

  var FileType = {
    'GIF': '',
    'JPEG': '',
    'PNG': '',
    'SVG+XML': ''
  };

  /**
   * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
   * из ключей FileType.
   * @type {RegExp}
   */
  var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');

  window.filterImage = uploadOverlay.querySelector('.filter-image-preview');

  var activeElement;

  var showUploadElement = function () {
    uploadOverlay.classList.remove('invisible');
    uploadForm.classList.add('invisible');
  };

  var closeUploadElement = function (callback, evt) {
    uploadOverlay.classList.add('invisible');
    uploadForm.classList.remove('invisible');
    if (typeof callback === 'function' && window.utils.isEnterPressed(evt)) {
      callback();
    }
  };

  uploadFromBtn.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      activeElement = document.activeElement;
      activeElement.click();
    }
  });


  uploadFile.addEventListener('change', function (evt) {

    // Проверка типа загружаемого файла, тип должен быть изображением
    // одного из форматов: JPEG, PNG, GIF или SVG.
    if (fileRegExp.test(evt.target.files[0].type)) {
      showUploadElement();
    }
  });

  uploadFormCancel.addEventListener('click', function () {
    closeUploadElement();
  });

  uploadFormCancel.addEventListener('keydown', function (evt) {
    function callback() {
      if (activeElement) {
        activeElement.focus();
        activeElement = null;
      }
    }
    closeUploadElement(callback, evt);
  });

  return {
    setScale: function (scaleVal, resizeInitialValue) {
      window.filterImage.style.transform = 'scale(' + parseInt(scaleVal, 10) / resizeInitialValue + ')';
      window.filterImage.style.transition = 'all .4s cubic-bezier(.65, .05, .36, 1)';
    }
  };
})();

window.initializeFilters();
window.createScale(document.querySelector('.upload-resize-controls-value'), window.utils.getScaleStep(), window.utils.getScaleDefault(), window.form.setScale);
