import { EslintIssue } from './eslintIssue';

export interface ProjectReport {
    projectId: string;
    issues: EslintIssue[];
    generatedAt: Date;
}
