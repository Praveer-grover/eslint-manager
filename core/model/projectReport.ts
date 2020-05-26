import { EslintIssue } from './eslintIssue';

export interface ProjectReport {
    projectId: string;
    issues: { filePath: string, issues: EslintIssue[] }[];
    generatedAt: Date;
}
