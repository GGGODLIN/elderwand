import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import { IconDTO } from '../models/AssetDTO';

export interface AssetsRepositoryCtor {
    host: string;
    platformId: number;
    version?: number;
    token?: string;
}

export default class AssetsRepository {
    constructor(ctor: AssetsRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
        this.token = ctor.token;
    }

    private readonly origin: string;
    private readonly platformId: number;
    private readonly token: string;

    /**
     */
    async listIcons(): Promise<PaginationDTO<IconDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/assets/icons';
        const params = {
            platformId: this.platformId,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<IconDTO[]>(pathname, { params: params, headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                let result: PaginationDTO<IconDTO> = {
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

    async getCloudCodes() {
        const baseURL = this.origin;
        const pathname = '/api/clouds';

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get(pathname, { headers: { Authorization: `Bearer ${this.token}` } })
            .then((res) => {
                let result = {
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
}
