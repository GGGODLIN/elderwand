import PaginationDTO from '../../../models/PaginationDTO';
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

    listUsers(): Promise<PaginationDTO<UserDTO>> {
        return this.repository.listUsers();
    }

    getUser(id: string): Promise<UserDTO> {
        return this.repository.getUser(id);
    }

    createUser(options: CreateUserOptions): Promise<UserDTO> {
        return this.repository.createUser(options);
    }

    editUser(id: string, options): Promise<UserDTO> {
        return this.repository.editUser(id, options);
    }

    editUserPwd(options): Promise<UserDTO> {
        return this.repository.editUserPwd(options);
    }
}
