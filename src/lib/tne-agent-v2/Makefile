.PHONY: test-analyze-aggregate
test-analyze-aggregate:
	S3_AGENT_BUCKET=bp-authoring-files-dev 												\
	S3_AGENT_REGION=us-west-2 													\
	PYTHON_RUNNER_SERVER=http://0.0.0.0:8080 											\
	OPENAI_API_KEY=sk-proj-9mZnxUJD5iDTUMiutG5vT3BlbkFJvRe9I6pZbt6AyKn36lWv 							\
	GROQ_API_KEY=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								\
	GOOGLE_GENAI_API_KEY=AIzaSyBxaAqDsEgXt0Hr3KorVqZW5AE1oZRYodQ									\
	ANTHROPIC_API_KEY=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 	\
	AWS_PROFILE=lucas-sts node 													\
	--test 																\
	--require 															\
	ts-node/register 														\
	./tests/run/run_analyze_aggregate.ts

.PHONY: test-iterative-analysis
test-iterative-analysis:
	S3_AGENT_BUCKET=bp-authoring-files-dev 												\
	S3_AGENT_REGION=us-west-2 													\
	PYTHON_RUNNER_SERVER=http://0.0.0.0:8080 											\
	OPENAI_API_KEY=sk-proj-9mZnxUJD5iDTUMiutG5vT3BlbkFJvRe9I6pZbt6AyKn36lWv 							\
	GROQ_API_KEY=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								\
	GOOGLE_GENAI_API_KEY=AIzaSyBxaAqDsEgXt0Hr3KorVqZW5AE1oZRYodQ									\
	ANTHROPIC_API_KEY=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 	\
	AWS_PROFILE=lucas-sts node 													\
	--test 																\
	--require 															\
	ts-node/register 														\
	./tests/run/run_iterative_analysis.ts

.PHONY: test-weather
test-weather:
	S3_AGENT_BUCKET=bp-authoring-files-dev 						\
	S3_AGENT_REGION=us-west-2 							\
	PYTHON_RUNNER_SERVER=http://0.0.0.0:8080 					\
	OPENAI_API_KEY=sk-proj-9mZnxUJD5iDTUMiutG5vT3BlbkFJvRe9I6pZbt6AyKn36lWv 	\
	AWS_PROFILE=lucas-sts node 							\
	--test 										\
	--require 									\
	ts-node/register 								\
	./tests/run/run_weather.ts
