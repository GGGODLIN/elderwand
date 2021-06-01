import PaginationDTO from '../../../models/PaginationVM';
import SpaceRepository from '../../space/infra/SpaceRepository';
import SpaceDTO from '../models/SpaceDTO';

export default class SpaceMaintainUCO {
    private repository: SpaceRepository;

    constructor(repository: SpaceRepository) {
        this.repository = repository;
    }

    /**
     * @param pid Project ID or Code
     */
    listSpaces(pid: string): Promise<PaginationDTO<SpaceDTO>> {
        return this.repository.listSpaces(pid);
    }

    /**
     * @param id Space ID or DvID
     * @param pid ProjectID
     */
    getSpace(id: string, pid: string): Promise<SpaceDTO> {
        return this.repository.getSpace(id, pid);
    }
}
