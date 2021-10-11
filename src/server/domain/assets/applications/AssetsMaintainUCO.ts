import PaginationDTO from '../../../models/PaginationDTO';
import AssetsRepository from '../infra/AssetsRepository';
import { IconDTO } from '../models/AssetDTO';

export default class AssetsMaintainUCO {
    private repository: AssetsRepository;

    constructor(repository: AssetsRepository) {
        this.repository = repository;
    }

    /**
     */
    listIcons(): Promise<PaginationDTO<IconDTO>> {
        return this.repository.listIcons();
    }
}
