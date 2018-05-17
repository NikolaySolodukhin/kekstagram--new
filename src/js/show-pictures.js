import Utils from './utils';

function showPictures(pictures) {
  pictures.forEach(pictureData => {
    Utils.pushPucturesInFragment(Utils.getNodeFromData(pictureData));
  });

  Utils.renderMiniPictures();
}

export default showPictures;
