export const isBase64Png = (text: string) => {
  return text.startsWith("iVBORw0KGgo");
};
export const isBase64Jpg = (text: string) => {
  return text.startsWith("9g");
};
export const isBase64Image = (text: string) => {
  return isBase64Png(text) || isBase64Jpg(text);
};
