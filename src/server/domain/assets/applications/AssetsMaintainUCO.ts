import PaginationVM from '../../../../client/models/PaginationVM';
import AssetsRepository from '../infra/AssetsRepository';
import { IconDTO } from '../models/AssetsDTOs';

export default class AssetsMaintainUCO {
    private repository: AssetsRepository;

    constructor(repository: AssetsRepository) {
        this.repository = repository;
    }

    /**
     */
    listIcons(): Promise<PaginationVM<IconDTO>> {
        return this.repository.listIcons();
    }
}
