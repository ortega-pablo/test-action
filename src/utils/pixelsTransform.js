import {PixelRatio} from 'react-native';

export const convertPxToDp = px => {
  return PixelRatio.getPixelSizeForLayoutSize(px);
};
