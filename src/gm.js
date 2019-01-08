import _gm from 'gm';
import thenify from 'thenify';

function gm(imagePath) {
  const instance = _gm.subClass({ imageMagick: true })(imagePath);
  instance.write = thenify(instance.write);
  instance.toBuffer = thenify(instance.toBuffer);
  return instance;
}

export default gm;
