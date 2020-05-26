
export interface EslintIssueType {
    filePath: string;
    messages: EslintIssueMessageType[],
    errorCount: number;
    warningCount: number;
    fixableErrorCount: number;
    source: string;
    usedDeprecatedRules: string[];
}

export interface EslintIssueMessageType {
    ruleId: string;
    severity: number;
    message: string;
    line: number;
    column: number;
    nodeType: string;
    messageId: string;
    endLine: number;
    endColumn: number;
}