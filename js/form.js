'use strict';

var uploadForm = document.forms['upload-select-image'];
var uploadFile = uploadForm['upload-file'];

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = uploadOverlay.querySelector('.upload-form-cancel');
var filterForm = uploadOverlay.querySelector('.upload-filter');

var buttonDec = filterForm.querySelector('.upload-resize-controls-button-dec');
var buttonInc = filterForm.querySelector('.upload-resize-controls-button-inc');
var resizeContValue = filterForm.querySelector('.upload-resize-controls-value');

var changeValueStep = 25;
resizeContValue.value = '100%';

var filterImage = uploadOverlay.querySelector('.filter-image-preview');

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('invisible');
  uploadForm.classList.add('invisible');
});

uploadFormCancel.addEventListener('click', function () {
  uploadOverlay.classList.add('invisible');
  uploadForm.classList.remove('invisible');
});

buttonDec.addEventListener('click', function () {
  if (resizeContValue.value !== '25%') {
    changeValue(-changeValueStep);
  }
});

buttonInc.addEventListener('click', function () {
  if (resizeContValue.value !== '100%') {
    changeValue(changeValueStep);
  }
});

function changeValue(resizeStep) {
  resizeContValue.value = (parseInt(resizeContValue.value, 10) + resizeStep) + '%';
  filterImage.style.transform = 'scale(' + parseInt(resizeContValue.value, 10) / 100 + ')';
}

var filterMap;

filterForm.addEventListener('change', function () {
  if (!filterMap) {

    filterMap = {
      'none': 'filter-none',
      'chrome': 'filter-chrome',
      'sepia': 'filter-sepia',
      'marvin': 'filter-marvin',
      'phobos': 'filter-phobos',
      'heat': 'filter-heat'
    };
  }
  var selectedFilter = [].filter.call(filterForm['upload-filter'], function (item) {
    return item.checked;
  })[0].value;

  filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
});
