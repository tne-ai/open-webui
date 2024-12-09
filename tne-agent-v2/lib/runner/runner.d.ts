import "dotenv/config";
export declare const runExpertTest: (uid: string, expert: string, questions: string[], concurrency: number, writeLog: (index: number | null, result: string) => void) => Promise<void>;
