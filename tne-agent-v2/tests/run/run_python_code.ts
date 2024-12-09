import test from "node:test";
import { fetchS3File } from "../../src/utils/s3";
import assert from "node:assert";

import { pythonCodeAgent } from "../../src/agents/python/python_code_agent";

const code = `
import os
import pandas as pd
from io import BytesIO
from tne.TNE import TNE

session = TNE("114520153332760575553", "bp-authoring-files-dev")
df = session.get_object("retail_highlight_shopping_list_no_periods.csv")

# Find the top selling product by sales
top_selling_product = df.loc[df['sales'].idxmax()]

# Convert the result to a DataFrame
result = pd.DataFrame([top_selling_product])

return result.to_json()
`;

test("test run code gen", async () => {
  const namedInputs = {
    code,
    uid: "114520153332760575553",
  };
  const res = await pythonCodeAgent({
    namedInputs,
    params: {},
    filterParams: {},
    inputs: [],
    debugInfo: {} as any,
  });
  console.log(res);
});
