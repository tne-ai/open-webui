import test from "node:test";
import assert from "node:assert";
import { s3FileDummyAgentGenerator } from "../../src/agents/s3/s3_file_dummy_agent";

test("test s3", async () => {
  const s3FileAgent = s3FileDummyAgentGenerator(__dirname + "/../data/files/");

  // s3test.jpg  s3test.png  test.txt
  const textData = await s3FileAgent({ params: { fileName: "test.txt" }, inputs: [], namedInputs: {}, debugInfo: {} as any, filterParams: {} });
  assert.deepStrictEqual(textData, {
    fileName: "test.txt",
    dataType: "text",
    text: "Hello\n",
  });
  const jpgData = await s3FileAgent({ params: { fileName: "s3test.jpg" }, inputs: [], namedInputs: {}, debugInfo: {} as any, filterParams: {} });
  assert.equal(jpgData?.dataType, "image");
  if (jpgData && jpgData.dataType && jpgData.dataType === "image") {
    assert(jpgData.imageData?.startsWith("data:image/jpeg;base64,/9j/4QDKRXhpZgAATU0AKgAAAAgABgESAAMAAAABAAEAAAEa"));
  }
  const pngData = await s3FileAgent({ params: { fileName: "s3test.png" }, inputs: [], namedInputs: {}, debugInfo: {} as any, filterParams: {} });
  assert.equal(pngData?.dataType, "image");
  if (pngData && pngData.dataType && pngData.dataType === "image") {
    assert.equal(pngData?.dataType, "image");
    assert(
      pngData?.imageData?.startsWith(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADGCAIAAABZ4XIvAAABdWlDQ1BrQ0dDb2xvclNwYWNlRGlzcGxheVAzAAAokXWQvUvDUBTFT6tS0DqIDh0cMolD1NIK"
      )
    );
  }
});
