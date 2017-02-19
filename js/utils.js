'use strict';

window.utils = (function () {

  var KEY_CODE = {
    'ESCAPE': 27,
    'ENTER': 13
  };

  var SCALE = {
    'DEFAULT': 100,
    'STEP': 25
  };

  return {

    isEnterPressed: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE.ENTER;
    },

    isEscapePressed: function (evt) {
      return evt.keyCode && evt.keyCode === KEY_CODE.ESCAPE;
    },

    isClicked: function (evt) {
      return evt.type === 'click';
    },

    getScaleStep: function () {
      return SCALE.STEP;
    },

    getScaleDefault: function () {
      return SCALE.DEFAULT;
    },
  };
})();
