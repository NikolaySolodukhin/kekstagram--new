import showPictures from './show-pictures';
import sortPictures from './sort-pictures';

function onload(data) {
  let pictures = [];
  pictures = data.slice();
  showPictures(pictures);
  sortPictures(pictures);
}

export default onload;
