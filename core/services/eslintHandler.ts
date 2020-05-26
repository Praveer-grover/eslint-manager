import * as childProcess from 'child_process';

class EslintHandler {

    public runEslint(projectPath: string, executeCommand: string): void {
        try {
            childProcess.execSync(executeCommand, {
                cwd: projectPath,
            });
        } catch (err) {
            // Log the errors
        }
    }
}

export const eslintHandler = new EslintHandler();