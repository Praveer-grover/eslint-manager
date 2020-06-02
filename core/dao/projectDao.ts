import { Project } from '../model/project';
import { ProjectReport } from '../model/projectReport';

class ProjectDao {

    private projects: { [id: string]: Project } = {};

    private projectReports: { [id: string]: ProjectReport[] } = {};

    public getAllSavedProjects(): Project[] {
        return [
        ];
    }

    public saveProject(project: Project): void {
        this.projects[project.id] = project;
    }

    public getProject(id: string): Project {
        throw "Not implemented yet";
    }

    public removeProject(id: string): void {
        throw "Not implemented yet";
    }

    public saveReport(projectReport: ProjectReport): void {
        if (!this.projectReports[projectReport.projectId]) {
            this.projectReports[projectReport.projectId] = [];
        }
        this.projectReports[projectReport.projectId].push(projectReport);
    }

    public getReports(projectId: string): ProjectReport[] {
        return this.projectReports[projectId];
    }

}

export const projectDao = new ProjectDao();