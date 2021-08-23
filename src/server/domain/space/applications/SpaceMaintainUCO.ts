import PaginationDTO from '../../../models/PaginationVM';
import SpaceRepository from '../../space/infra/SpaceRepository';
import SpaceDTO, { SpaceTemplateDTO } from '../models/SpaceDTO';
import { AddSpaceOptions, EditSpaceOptions } from '../models/SpaceVOs';

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
     * @param sid Space ID or DvID
     * @param pid ProjectID
     */
    getSpace(sid: string, pid: string): Promise<SpaceDTO> {
        return this.repository.getSpace(sid, pid);
    }

    /**
     * @param pid ProjectID
     * @param options Place Device Options
     */
    addSpace(pid: string, options: AddSpaceOptions): Promise<SpaceDTO> {
        return this.repository.addSpace(pid, options);
    }

    /**
     * @param sid Space ID
     * @param pid ProjectID
     * @param options Place Device Options
     */
    editSpace(
        sid: string,
        pid: string,
        options: EditSpaceOptions
    ): Promise<SpaceDTO> {
        return this.repository.editSpace(sid, pid, options);
    }

    /**
     * @param sid Space ID
     * @param pid Project ID
     */
    removeSpace(sid: string, pid: string): Promise<SpaceDTO> {
        return this.repository.removeSpace(sid, pid);
    }

    /**
     */
    listSpaceTemplates(): Promise<PaginationDTO<SpaceTemplateDTO>> {
        return this.repository.listSpaceTemplates();
    }
}
