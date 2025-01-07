export const maria= {
  version: 0.5,
  nodes: {
    userPrompt: {
      value: "",
    },
    chatHistory: {
      value: []
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
    sec2_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec2-1_San Diego County_job_postings_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec2_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec2-2_San Diego County_unemp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec2_3: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec2-3_San Diego County_unemp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec2_4: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec2-4_San Diego_job_postings_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec2_5: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec2-5_San Diego_unemp_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec2_6: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec2-6_San Diego_unemp_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec3_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec3-1_San Diego County_edattain_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec3_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec3-2_San Diego County_skills_gap_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec3_3: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec3-3_San Diego_edattain_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec4_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec4-1_capital_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-1_San Diego County_home_price_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-2_San Diego County_home_price_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_3: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-3_San Diego County_household_inc_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_4: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-4_San Diego County_housing_starts_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_5: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-5_San Diego County_housing_starts_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_6: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-6_San Diego_home_price_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_7: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-7_San Diego_home_price_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_8: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-8_San Diego_household_inc_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_9: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-9_San Diego_housing_starts_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_10: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-10_San Diego_housing_starts_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_11: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-11_San Diego County_household_inc_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec5_12: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec5-12_San Diego_household_inc_peers_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec6_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec6-1_San Diego County_firms_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec6_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec6-2_San Diego County_firms_percap_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec6_3: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec6-3_San Diego County_firms_yoy_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec6_4: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec6-4_San Diego_firms_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec6_5: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec6-5_San Diego_firms_percap_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec6_6: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec6-6_San Diego_firms_yoy_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec7_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec7-1_San Diego County_pri_sec_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec7_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec7-2_San Diego_pri_sec_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec8_1: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec8-1_San Diego County_jobs_ind_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec8_2: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec8-2_San Diego County_mean_earn_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec8_3: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec8-3_San Diego_jobs_ind_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    sec8_4: {
      agent: "s3FileAgent",
      params: {
        fileName: "sec8-4_San Diego_mean_earn_data.csv",
        bucket: "bp-authoring-files",
        region: "us-west-2"
      },
      inputs: {},
    },
    summarizeDataToUser: {
      agent: "openAIAgent",
      params: {
        forWeb: true,
        apiKey: import.meta.env.VITE_OPEN_API_KEY,
        model: "gpt-4o",
        max_tokens: 4096,
        stream: true
      },
      isResult: true,
      inputs: {
        messages: ":chatHistory",
        prompt: ["[Answer: ", ":parsedResults", "]"],
        system: "You are given a user chat session and an answer to the latest user query computed from a workflow. Summarize the answer in a way that the user will feel that it is a natural response to their question; you are the front-end of this chat system. Don't make up any details; only summarize direct info that is given to you. If you are given tabular data, a markdown table is preferable.",
      }
    }
  },
};