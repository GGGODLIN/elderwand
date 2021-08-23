import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import DeviceDTO from '../../device/models/DeviceDTO';
import { PlaceDeviceOptions } from '../../device/models/DeviceVOs';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import SpaceDTO, { SpaceTemplateDTO } from '../../space/models/SpaceDTO';
import { AddSpaceOptions, EditSpaceOptions } from '../models/SpaceVOs';

export interface SpaceRepositoryCtor {
    host: string;
    platformId: number;
    version?: number;
}

export default class SpaceRepository {
    constructor(ctor: SpaceRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
    }

    private readonly origin: string;
    private readonly platformId: number;

    /**
     * @param projectId Project ID
     */
    async listSpaces(projectId: string): Promise<PaginationDTO<SpaceDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/spaces';
        const params = {
            platformId: this.platformId,
            projectId: projectId,
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
            platformId: this.platformId,
            projectId: pid,
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

    /**
     * @param projectId Project ID
     */
    async listSpaceTemplates(): Promise<PaginationDTO<SpaceTemplateDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/space/templates';
        const params = {
            platformId: this.platformId,
            // projectId: projectId,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<SpaceTemplateDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<SpaceTemplateDTO> = {
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
     * @param pid project ID
     * @param options create device options
     */
    async addSpace(pid: string, options: AddSpaceOptions): Promise<SpaceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/spaces`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const body = {
            ...options,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<SpaceDTO>(pathname, body, { params: params })
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

    /**
     * @param sid Space ID
     * @param pid project ID
     * @param options create device options
     */
    async editSpace(sid: string, pid: string, options: EditSpaceOptions) {
        const baseURL = this.origin;
        const pathname = `/api/spaces/${sid}`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const body = {
            ...options,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .put<SpaceDTO>(pathname, body, { params: params })
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

    /**
     * @param sid Space ID
     * @param pid Project ID
     */
    async removeSpace(sid: string, pid: string): Promise<SpaceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/spaces/${sid}`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .delete<SpaceDTO>(pathname, { params: params })
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
