import PaginationVM from '../../../../client/models/PaginationVM';
import UserRepository from '../infra/UserRepository';
import UserDTO from '../models/UserDTO';

export default class UserMaintainUCO {
    private repository: UserRepository;

    constructor(repository: UserRepository) {
        this.repository = repository;
    }

    listUsers(): Promise<PaginationVM<UserDTO>> {
        return this.repository.listUsers();
    }

    getUser(id: string): Promise<UserDTO> {
        return this.repository.getUser(id);
    }
}
