import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import UserDTO from '../../user/models/UserDTO';
import ErrorInfoDTO from '../models/ErrorInfoDTO';

export interface AuthRepositoryCtor {
    host: string;
    platformId: number;
    version?: number;
}

export default class AuthRepository {
    constructor(ctor: AuthRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
    }

    private readonly origin: string;
    private readonly platformId: number;

    // login
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
}
