import showPictures from './show-pictures';
import sortPictures from './sort-pictures';
import Gallery from './show-gallery';

function onload(data) {
  const pictures = [...data];
  showPictures(pictures);
  sortPictures(pictures);
  Gallery.setPictures(pictures);
}

export default onload;
