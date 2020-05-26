import * as childProcess from 'child_process';
import { Project } from "../model/project";
import { ProjectReport } from "../model/projectReport";
import * as fs from 'fs';

class EslintHandler {

    public runEslint(project: Project): ProjectReport {
        childProcess.execSync(project.eslintConfig.executeCommand, {
            cwd: project.path
        });

        const jsonContent: string = fs.readFileSync(project.path + "./" + "reportName.json", {
            encoding: "utf-8"
        });

        const jsonObj = JSON.parse(jsonContent);
        console.log(jsonObj);
        return null;
    }
}

export const eslintHandler = new EslintHandler();