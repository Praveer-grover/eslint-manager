import { EslintConfig } from "./eslintConfig";

export interface Project {
    id: string;
    name: string;
    path: string;
    eslintConfig: EslintConfig;
    groupingTag: string;
}
