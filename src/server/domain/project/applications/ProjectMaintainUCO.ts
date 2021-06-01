import PaginationVM from '../../../../client/models/PaginationVM';
import ProjectRepository from '../infra/ProjectRepository';
import ProjectDTO from '../models/ProjectDTO';

export class ProjectMaintainUCO {
    constructor(repository: ProjectRepository) {
        this.repository = repository;
    }

    private readonly repository: ProjectRepository;

    listProjects(): Promise<PaginationVM<ProjectDTO>> {
        return this.repository.listProjects();
    }

    getProject(id: string): Promise<ProjectDTO> {
        return this.repository.getProject(id);
    }
}
