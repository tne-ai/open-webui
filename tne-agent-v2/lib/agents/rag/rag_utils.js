"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSemanticRequest = exports.getRagRequest = void 0;
const crypto_1 = require("crypto");
// settings
const RAG_DB_HOST = process.env.RAG_DB_HOST ?? "postgresql-ebp.cfwmuvh4blso.us-west-2.rds.amazonaws.com";
const api_key = process.env.OPENAI_API_KEY ?? "EMPTY_KEY";
const embeddings_db_pass = process.env.EMBEDDINGS_DB_PASSWORD ?? "EMPTY_PASSWORD";
const getRagRequest = (rag_db_name, user_input) => {
    const config = __get_rag_config(rag_db_name);
    const history = [];
    const request_id = (0, crypto_1.randomUUID)();
    const thread_id = (0, crypto_1.randomUUID)();
    const request = {
        thread_id,
        history,
        new_record: {
            request_id,
            config,
            user_input,
        },
    };
    return request;
};
exports.getRagRequest = getRagRequest;
const __get_embeddings_config = (rag_db_name) => {
    return {
        db_host: RAG_DB_HOST,
        db_port: 5432,
        db_name: rag_db_name,
        db_username: "postgres",
        db_password: embeddings_db_pass,
        model: "text-embedding-ada-002",
        api_key: api_key,
    };
};
const __get_rag_config = (rag_db_name) => {
    const embeddings_config = __get_embeddings_config(rag_db_name);
    const shared_llm_config = {
        model: "gpt-4-0125-preview",
        api_key: api_key || "dummy_api_key",
        stream: true,
    };
    return {
        embeddings_config,
        anns_input_llm_config: shared_llm_config,
        ann_evaluations_llm_config: shared_llm_config,
        ann_relevancies_llm_config: shared_llm_config,
        anns_summary_llm_config: shared_llm_config,
        prev_record_summary_llm_config: shared_llm_config,
        full_history_summary_llm_config: shared_llm_config,
        rag_output_llm_config: shared_llm_config,
    };
};
const getSemanticRequest = (semantic_db_name, query_text, options = {}) => {
    const request_id = (0, crypto_1.randomUUID)();
    return {
        request_id,
        embeddings_config: __get_embeddings_config(semantic_db_name),
        query_text,
        max_count: options.maxEmbeddings ?? 10,
        min_similarity: options.similarityThreshold ?? 0.8,
    };
};
exports.getSemanticRequest = getSemanticRequest;