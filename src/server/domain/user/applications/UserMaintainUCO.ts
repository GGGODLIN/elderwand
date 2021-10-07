import PaginationVM from '../../../../client/models/PaginationVM';
import UserRepository from '../infra/UserRepository';
import UserDTO from '../models/UserDTO';
import {
    CreateUserOptions
} from '../models/UserVOs';

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

    createUser(options: CreateUserOptions): Promise<UserDTO> {
        return this.repository.createUser(options);
    }
}
