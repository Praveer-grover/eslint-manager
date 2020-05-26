import * as fs from 'fs';
import { projectDao } from '../dao/projectDao';
import { EslintIssueType } from '../eslintIssueType';
import { Project } from '../model/project';
import { ProjectReport } from '../model/projectReport';
import { eslintHandler } from './eslintHandler';


class EslintService {

    public runEslint(project: Project): void {
        if (!this.executeEslint(project)) {
            return;
        }

        const projectReport: ProjectReport = this.prepareReport(project);

        projectDao.saveReport(projectReport);

        console.log(projectReport);

    }

    private prepareReport(project: Project) {
        const jsonContent: string = fs.readFileSync(project.eslintConfig.jsonReportPath, {
            encoding: "utf-8"
        });

        const lastModifiedAt = this.getLastModifiedTime(project.eslintConfig.jsonReportPath);

        const projectReport: ProjectReport = {
            projectId: project.id,
            generatedAt: lastModifiedAt,
            issues: []
        };
        const eslintIssues: EslintIssueType[] = JSON.parse(jsonContent);
        projectReport.issues = eslintIssues.filter(entry => entry.messages.length > 0)
            .map((entry) => {
                return {
                    filePath: entry.filePath,
                    issues: entry.messages.map((msg) => {
                        return {
                            code: msg.ruleId,
                            description: msg.message,
                            severity: msg.severity,
                            link: "",
                            line: msg.line,
                            column: msg.column
                        };
                    })
                }
            })
        return projectReport;
    }

    private executeEslint(project: Project): boolean {
        // check if file exists
        const exists = fs.existsSync(project.eslintConfig.jsonReportPath);
        if (exists) {
            const oldTimestamp = this.getLastModifiedTime(project.eslintConfig.jsonReportPath);

            eslintHandler.runEslint(project.path, project.eslintConfig.executeCommand);

            const newTimestamp = this.getLastModifiedTime(project.eslintConfig.jsonReportPath);

            if (!(newTimestamp > oldTimestamp)) {
                // Log the error
                return false;
            }
        } else {
            eslintHandler.runEslint(project.path, project.eslintConfig.executeCommand);
            // if file was written then eslint was executed
            return fs.existsSync(project.eslintConfig.jsonReportPath);
        }

        return true;
    }

    private getLastModifiedTime(filePath: string): Date {
        const stats = fs.statSync(filePath);

        return stats.mtime;
    }
}

export const eslintService = new EslintService();