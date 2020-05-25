import { Observable, ReplaySubject } from 'rxjs';
import { projectDao } from '../dao/projectDao';
import { EslintConfig } from '../model/eslintConfig';
import { Project } from '../model/project';


class ProjectService {

    private projectSubj: ReplaySubject<Project[]>;

    private projectsStore: Project[] = [];

    constructor() {
        this.projectSubj = new ReplaySubject();
    }

    public addProject(name: string, path: string, eslintCommand: string): void {

        const project: Project = {
            id: this.createIdFromName(name),
            name,
            path,
            eslintConfig: null
        };

        const eslintConfig: EslintConfig = {
            configurationFilePath: "./.eslintrc.json",
            executeCommand: eslintCommand
        }

        project.eslintConfig = eslintConfig;

        projectDao.saveProject(project);

        this.projectsStore.push(project);

        this.projectSubj.next([].concat(this.projectsStore));
    }

    public getProjects(): Observable<Project[]> {
        return this.projectSubj.asObservable();
    }

    private createIdFromName(name: string): string {
        return name.trim().replace(" ", "");
    }
}

export const projectService = new ProjectService();