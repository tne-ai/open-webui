export declare const getRagRequest: (rag_db_name: string, user_input: string) => {
    thread_id: `${string}-${string}-${string}-${string}-${string}`;
    history: string[];
    new_record: {
        request_id: `${string}-${string}-${string}-${string}-${string}`;
        config: {
            embeddings_config: {
                db_host: string;
                db_port: number;
                db_name: string;
                db_username: string;
                db_password: string;
                model: string;
                api_key: string;
            };
            anns_input_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
            ann_evaluations_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
            ann_relevancies_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
            anns_summary_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
            prev_record_summary_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
            full_history_summary_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
            rag_output_llm_config: {
                model: string;
                api_key: string;
                stream: boolean;
            };
        };
        user_input: string;
    };
};
type SemanticOptions = {
    maxEmbeddings?: number;
    similarityThreshold?: number;
};
export declare const getSemanticRequest: (semantic_db_name: string, query_text: string, options?: SemanticOptions) => {
    request_id: `${string}-${string}-${string}-${string}-${string}`;
    embeddings_config: {
        db_host: string;
        db_port: number;
        db_name: string;
        db_username: string;
        db_password: string;
        model: string;
        api_key: string;
    };
    query_text: string;
    max_count: number;
    min_similarity: number;
};
export {};
