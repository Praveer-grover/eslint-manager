import { Component, Input } from '@angular/core';
import { EslintIssue } from '../../../../core/model/eslintIssue';



@Component({
    selector: 'app-issues-list',
    templateUrl: './issues-list.component.html',
    styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent {

    public customClass = "accordion-header-black";

    @Input()
    public issues: { filePath: string, issues: EslintIssue[], errorsCount: number, warningsCount: number }[];
    constructor() {

    }

}
