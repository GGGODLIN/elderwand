import PaginationDTO from '../../../models/PaginationDTO';
import ProjectRepository from '../infra/ProjectRepository';
import ProjectDTO from '../models/ProjectDTO';

export class ProjectMaintainUCO {
    constructor(repository: ProjectRepository) {
        this.repository = repository;
    }

    private readonly repository: ProjectRepository;

    listProjects(): Promise<PaginationDTO<ProjectDTO>> {
        return this.repository.listProjects();
    }

    getProject(id: string): Promise<ProjectDTO> {
        return this.repository.getProject(id);
    }
}
