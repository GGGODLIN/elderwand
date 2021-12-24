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
    token?: string;
}

export default class UserRepository {
    constructor(ctor: UserRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
        this.token = ctor.token;
    }

    private readonly origin: string;
    private readonly platformId: number;
    private readonly token: string;

    async listUsers(): Promise<PaginationDTO<UserDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/users';
        const params = { platformId: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<UserDTO[]>(pathname, { params: params, headers: { Authorization: `Bearer ${this.token}` } })
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
                console.log('Error', err)
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async getUser(): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/me`;

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<UserDTO>(pathname, { headers: { Authorization: `Bearer ${this.token}` } })
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
        const body = {
            ...options,
        };
        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<UserDTO>(pathname, body, { params: params, headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                const dto: UserDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    console.log('isAxiosError from repository');
                }
                console.log('createUser ERR', err);
                throw err;
            });
    }

    async editUser(id: string, options): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/users/${id}`;
        const params = { platformId: this.platformId };
        const body = {
            ...options,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .patch<UserDTO>(pathname, body, { headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                const dto: UserDTO = res.data;
                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                console.log('editUserErr', err)
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async editUserPwd(options): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/password`;
        const body = {
            ...options,
            platformId: this.platformId
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .patch<UserDTO>(pathname, body, { headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                const dto: UserDTO = res.data;
                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                console.log('editUserPwdErr', err)
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async inviteUser(options): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/invitation/user`;
        const body = {
            ...options,
            platformId: this.platformId
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post(pathname, body, { headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                const dto = res.data;
                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                console.log('inviteUserErr', err)
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async verifyInvitationToken(options): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/invitation/user?token=${options}`;


        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();
        const loginData = await this.login('elderwand_admin', 'password')

        return await axios
            .get(pathname, { headers: { Authorization: `Bearer ${loginData?.token}` } })
            .then((res) => {
                const dto = res.data;
                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                console.log('verifyInvitationTokenErr', err)
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async login(username: string, password: string): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/login`;
        const params = { pid: this.platformId };

        const body = {
            username: username,
            password: password,
            platformId: this.platformId,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<UserDTO>(pathname, body, { params: params })
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

    async registerUser(options): Promise<UserDTO> {
        const baseURL = this.origin;
        const pathname = `/api/register`;
        const body = {
            ...options,
            platformId: this.platformId
        };


        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post(pathname, body)
            .then((res) => {
                const dto = res.data;
                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                console.log('registerUserErr', err)
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }
}
