export type TextNodeData = {
  id: string;
  title: string;
  value: string;
  update?: string;
};

export const textAgentDefaultValue: TextNodeData = {
  id: "",
  title: "Text",
  value: "",
};

export const initTextAgent = (id: string): TextNodeData => {
  const init = { ...textAgentDefaultValue };
  return {
    ...init,
    id,
  };
};

export const updateTextAgent = (id: string, title: string, value: string, update?: string): TextNodeData => {
  return {
    id,
    value,
    title,
    update,
  };
};
