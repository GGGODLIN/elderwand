import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import UserDTO from '../models/UserDTO';
import {
    CreateUserOptions
} from '../models/UserVOs';

export interface UserRepositoryCtor {
    host: string;
    platformId: number;
    version?: number;
}

export default class UserRepository {
    constructor(ctor: UserRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
    }

    private readonly origin: string;
    private readonly platformId: number;

    async listUsers(): Promise<PaginationDTO<UserDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/users';
        const params = { platformId: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<UserDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<UserDTO> = {
                    offset: 0,
                    limit: 0,
                    total: 0,
                    results: [],
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async getUser(id: string): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/users/${id}`;
        const params = { platformId: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<UserDTO>(pathname, { params: params })
            .then((res) => {
                const dto: UserDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async createUser(options: CreateUserOptions): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/users`;
        const params = { platformId: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<UserDTO>(pathname, { params: params })
            .then((res) => {
                const dto: UserDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }
}
