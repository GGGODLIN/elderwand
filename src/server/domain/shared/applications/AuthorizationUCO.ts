import UserDTO from '../../user/models/UserDTO';
import AuthRepository from '../infra/AuthRepository';

export default class AuthorizationUCO {
    private repository: AuthRepository;

    constructor(repository: AuthRepository) {
        this.repository = repository;
    }

    login(username: string, password: string): Promise<UserDTO> {
        return this.repository.login(username, password);
    }
}
