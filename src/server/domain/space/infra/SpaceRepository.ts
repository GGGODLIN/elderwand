import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import SpaceDTO from '../../space/models/SpaceDTO';

export interface SpaceRepositoryCtor {
    host: string;
    platformID: number;
    version?: number;
}

export default class SpaceRepository {
    constructor(ctor: SpaceRepositoryCtor) {
        this.origin = ctor.host;
        this.platformID = ctor.platformID;
    }

    private readonly origin: string;
    private readonly platformID: number;

    /**
     * @param projectID Project ID
     */
    async listSpaces(projectID: string): Promise<PaginationDTO<SpaceDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/spaces';
        const params = {
            platformID: this.platformID,
            projectID: projectID,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<SpaceDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<SpaceDTO> = {
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

    /**
     * @param id space ID
     * @param pid project ID
     */
    async getSpace(id: string, pid: string): Promise<SpaceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/spaces/${id}`;
        const params = {
            platformID: this.platformID,
            projectID: pid,
        };

        console.log(pathname);
        console.log(params);

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<SpaceDTO>(pathname, { params: params })
            .then((res) => {
                const dto: SpaceDTO = res.data;

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
