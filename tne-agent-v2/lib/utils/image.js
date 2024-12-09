"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBase64Image = exports.isBase64Jpg = exports.isBase64Png = void 0;
const isBase64Png = (text) => {
    return text.startsWith("iVBORw0KGgo");
};
exports.isBase64Png = isBase64Png;
const isBase64Jpg = (text) => {
    return text.startsWith("9g");
};
exports.isBase64Jpg = isBase64Jpg;
const isBase64Image = (text) => {
    return (0, exports.isBase64Png)(text) || (0, exports.isBase64Jpg)(text);
};
exports.isBase64Image = isBase64Image;
