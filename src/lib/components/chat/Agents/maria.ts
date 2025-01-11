export const maria= {
  version: 0.5,
  nodes: {
    chatHistory: {
      value: []
    },
    llmEngine: {
      value: "",
    },
    economicScanOverview: {
      agent: "s3FileAgent",
      params: {
        fileName: "Economic Scan Overview Sec 1.txt",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec1_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec1-1_San Diego County_grp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec1_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec1-2_San Diego County_per_capita_grp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec1_3: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec1-3_San Diego_grp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec1_4: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec1-4_San Diego_per_capita_grp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    llm: {
      agent: ":llmEngine",
      isResult: true,
      inputs: {
        messages: ":chatHistory",
        prompt: [":economicScanOverview.text", ":sec1_1.text", ":sec1_2.text", ":sec1_3.text", ":sec1_4.text"],
        system: ["You are an economics expert versed in the analysis of Gross Regional Product.\n", "Use the supplied text requirements and perform analysis based on the provided .CSV data files.\n", "check math\n", "step by step"],
      }
    }
  },
};