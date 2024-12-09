import test from "node:test";
import assert from "node:assert";

import { fileName2fileType } from "../../src/utils/s3";

test("test fileName2fileType image", async () => {
  const imageRes = fileName2fileType("aaa.jpg");
  assert.equal(imageRes, "image");

  const imageRes2 = fileName2fileType("aaa.png");
  assert.equal(imageRes2, "image");

  const imageRes3 = fileName2fileType("aaa.jpeg");
  assert.equal(imageRes3, "image");

  const imageRes4 = fileName2fileType("aaa.bbb.ccc.jpeg");
  assert.equal(imageRes4, "image");

  const imageRes5 = fileName2fileType("text.jpeg");
  assert.equal(imageRes5, "image");
});

test("test fileName2fileType text", async () => {
  const textRes = fileName2fileType("aaa.txt");
  assert.equal(textRes, "text");

  const textRes2 = fileName2fileType("aaa.md");
  assert.equal(textRes2, "text");

  const textRes3 = fileName2fileType("aaa.out");
  assert.equal(textRes3, "text");
});

test("test fileName2fileType json", async () => {
  const jsonRes = fileName2fileType("aaa.json");
  assert.equal(jsonRes, "json");
});

test("test fileName2fileType yaml", async () => {
  const yamlRes = fileName2fileType("aaa.yaml");
  assert.equal(yamlRes, "yaml");

  const yamlRes2 = fileName2fileType("aaa.yml");
  assert.equal(yamlRes2, "yaml");
});
