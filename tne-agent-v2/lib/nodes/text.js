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
const updateTextAgent = (id, title, value, update) => {
    return {
        id,
        value,
        title,
        update,
    };
};
exports.updateTextAgent = updateTextAgent;
