import {PixelRatio} from 'react-native';
import {device} from './config';
export const widthBaseScale = device.width / device.designWidth;
export const heightBaseScale = device.height / device.designHeight;

export const width = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * widthBaseScale));
};

export const getFontSize = (size: number) => {
  return size * heightBaseScale;
};

export const height = (size: number) => {
  return Math.round(PixelRatio.roundToNearestPixel(size * heightBaseScale));
};
