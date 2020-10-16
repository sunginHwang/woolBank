import Color from 'color';

export const haxToRGB = (haxColor) => {
  return Color(haxColor).toString();
};
