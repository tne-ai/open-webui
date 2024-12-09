This directory contains tests that are not run on ci.
This file requires the aws profile and environment variables, and is used to run the actual application.
This mainly contains files that run graphai and agents that have external dependencies.

Execute it as follows.

```
AWS_PROFILE=PROFILE node --test --require ts-node/register ./tests/run/run_xxx.ts
```

For external dependencies such as s3, I create dummy agents such as s3_file_dummy_agent and make them refer to local files.
