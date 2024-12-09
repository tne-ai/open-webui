"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPythonCodeForNode = exports.extractPythonCode = void 0;
const extractPythonCode = (code) => {
    // const regex_pattern = "```";
    const m = code.match(/```python([\s\S]*)```/m);
    if (m) {
        return addReturnIfNeed(m[1].trim());
    }
    const m2 = code.match(/```([\s\S]*)```/m);
    if (!m2) {
        // Error?
        return addReturnIfNeed(code);
    }
    const newCode = m2[1].trim();
    return addReturnIfNeed(newCode);
    /*
      # FIXME(lucas): this is stupid
      if (
        "[" in formatted_res
        and "import" not in formatted_res
        and "Announcement" not in formatted_res
        and "json" not in formatted_res
       ):
         formatted_res = formatted_res.strip("[]").split(",")
         formatted_res = [i.strip() for i in formatted_res]
      return formatted_res
    */
};
exports.extractPythonCode = extractPythonCode;
const addReturnIfNeed = (code) => {
    const hasMain = !!code.match('if __name__ == "__main__"');
    if (!code.match(/return result/)) {
        if (hasMain) {
            return code + "\n    return result";
        }
        return code + "\nreturn result";
    }
    return code;
};
const extractPythonCodeForNode = (code) => {
    return code.replace(/UID = "\d+"/, "").replace(/BUCKET = "\S+"/, "");
    // UID = "114520153332760575553"
    // BUCKET = "your_bucket_name"
};
exports.extractPythonCodeForNode = extractPythonCodeForNode;
