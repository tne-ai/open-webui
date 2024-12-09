export const expectPythonCodeData = {
  version: 0.5,
  nodes: {
    "7zjI_el3t2Si2Kz_oZcBh": {
      agent: "pythonCodeAgent",
      params: {
        code: 'from tne.TNE import TNE\nimport numpy as np\nimport pandas as pd \n\nUID = "113131128239301637682"\n\nif __name__ == "__main__":\n    session = TNE(UID)\n    test_input = PROCESS_INPUT\n    result = test_input.to_string()\n',
      },
      inputs: {
        data: [":ML4MsNXENIh751lQRliov"],
      },
      isResult: true,
      passThrough: { nodeType: "pythonCode", nodeId: "7zjI_el3t2Si2Kz_oZcBh", nodeTitle: "Python 2" },
    },
    VUoU0QHw0SkHYX0cEbQAn: {
      agent: "openAIAgent",
      params: {
        model: "gpt-4o",
        max_tokens: 500,
        temperature: 0,
        mergeableSystem:
          "You are a text summarization agent. If the user provides any instructions you must follow them, otherwise summarize any text that is provided to you.\n",
        stream: true,
      },
      inputs: { prompt: [":7zjI_el3t2Si2Kz_oZcBh.data"] },
      passThrough: { nodeType: "openAI", nodeId: "VUoU0QHw0SkHYX0cEbQAn", nodeTitle: "Summarizer" },
      isResult: true,
    },
    ML4MsNXENIh751lQRliov: {
      agent: "pythonCodeAgent",
      params: {
        code: 'from tne.TNE import TNE\nimport numpy as np\nimport pandas as pd \n\nUID = "113131128239301637682"\n\nif __name__ == "__main__":\n    session = TNE(UID)\n    df = session.get_object(\'Margins.csv\').head()\n    arr = np.array([1,2,3])\n    print("HELLO WORLD")\n    result = df\n',
      },
      inputs: {},
      isResult: true,
      passThrough: { nodeType: "pythonCode", nodeId: "ML4MsNXENIh751lQRliov", nodeTitle: "Python 1" },
    },
  },
};
