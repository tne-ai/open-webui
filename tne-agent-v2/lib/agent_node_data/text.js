"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTextAgent = exports.initTextAgent = exports.textAgentDefaultValue = void 0;
exports.textAgentDefaultValue = {
  id: "",
  title: "Text",
  value: "",
};
const initTextAgent = (id) => {
  const init = { ...exports.textAgentDefaultValue };
  return {
    ...init,
    id,
  };
};
exports.initTextAgent = initTextAgent;
const updateTextAgent = (id, title, input) => {
  return {
    id,
    value: input,
    title,
  };
};
exports.updateTextAgent = updateTextAgent;
