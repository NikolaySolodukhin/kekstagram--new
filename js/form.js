'use strict';

window.form = (function () {
  var uploadForm = document.forms['upload-select-image'];
  var uploadFile = uploadForm['upload-file'];

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadFromBtn = uploadForm.querySelector('.upload-file');

  uploadFromBtn.focus();

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


  uploadFile.addEventListener('change', function () {
    showUploadElement();
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
