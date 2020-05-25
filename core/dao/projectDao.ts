import { Project } from '../model/project';

class ProjectDao {

    projects: { [id: string]: Project } = {};

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

}

export const projectDao = new ProjectDao();