# Agents

## Agents converted from ReactFlow node.

- llm agent

  - inputs
    - quetion (string or base64 image string)
    - data source (files from s3)
  - model or engine
    - from slashgpt manifest
  - stream

    - non stream
      - have tool_code
    - stream
      - else

  - feature
    - not support function calling (tool_code)
    - post image gpt-4-vision-preview witu image_url

- text(query) agent

  - input
    - text

- file agent (s3FileAgent)

  - input
    - file name
  - feature
    - get file from S3

- python_code agent

  - input
    - previous node??
  - feature
    - run python code
  - run python agent

- code generate
  - input
    - previous node??
  - feature
    - generate python code using llm agent
    - run python_code agent
  - separate two agent
    - code generate called llm agent
    - call python_code

## Legacy agents (not support)

- legacy
  - python
  - csv
  - image
  - file

## Virtual Agent generated from the graph shape

- input agent

  - input
    - text from user prompt
  - condition
    - parent node of llm agent that has no input node

- data converter agent
  - T.B.D.

# common feature of agent

## output

- return streamin data
- condition
  - outputToCanvas is set false

## result

T.B.D.
