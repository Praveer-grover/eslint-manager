import { Observable, ReplaySubject, Subject } from 'rxjs';
import { projectDao } from '../dao/projectDao';
import { EslintConfig } from '../model/eslintConfig';
import { Project } from '../model/project';
import { ProjectReport } from '../model/projectReport';


class ProjectService {

    private projectSubj: ReplaySubject<Project[]>;

    private projectsStore: Project[] = [];

    private latestReportSubject: { [projectId: string]: Subject<ProjectReport> } = {}

    constructor() {
        this.projectSubj = new ReplaySubject();
        // Initialize all the projects into store and send it onto the subject once
    }

    public addProject(name: string, path: string, executeCommand: string, jsonReportPath: string): void {

        const project: Project = {
            id: this.createIdFromName(name),
            name,
            path,
            eslintConfig: null
        };

        const eslintConfig: EslintConfig = {
            configurationFilePath: "./.eslintrc.json",
            executeCommand,
            jsonReportPath
        }

        project.eslintConfig = eslintConfig;

        projectDao.saveProject(project);

        this.projectsStore.push(project);

        this.projectSubj.next([].concat(this.projectsStore));
    }

    public getProjects(): Observable<Project[]> {
        return this.projectSubj.asObservable();
    }

    public saveProjectReport(report: ProjectReport): void {
        projectDao.saveReport(report);

        if (!this.latestReportSubject[report.projectId]) {
            this.latestReportSubject[report.projectId] = new Subject();
        }


        this.latestReportSubject[report.projectId].next(report);
    }

    public getLatestReport(projectId: string): Observable<ProjectReport> {
        if (!this.latestReportSubject[projectId]) {
            this.latestReportSubject[projectId] = new Subject();
        }
        return this.latestReportSubject[projectId].asObservable();
    }

    public getReportsForProject(projectId: string): ProjectReport[] {
        return projectDao.getReports(projectId);
    }

    private createIdFromName(name: string): string {
        return name.trim().replace(" ", "");
    }
}

export const projectService = new ProjectService();