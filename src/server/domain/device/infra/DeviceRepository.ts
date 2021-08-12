import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import DeviceTemplateDTO from '../../migration/models/DeviceTemplateDTO';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import DeviceDTO from '../../device/models/DeviceDTO';
import SpaceDTO from '../../space/models/SpaceDTO';
import { EditDeviceOptions, PlaceDeviceOptions } from '../models/DeviceVOs';

export interface DeviceRepositoryCtor {
    host: string;
    platformId: number;
    version?: number;
}

export default class DeviceRepository {
    constructor(ctor: DeviceRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
    }

    private readonly origin: string;
    private readonly platformId: number;

    /**
     * @param projectId Project ID
     */
    async listDevices(projectId: string): Promise<PaginationDTO<DeviceDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/devices';
        const params = {
            platformId: this.platformId,
            projectId: projectId,
        };

        console.log(params);

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<DeviceDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<DeviceDTO> = {
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
     * @param projectId Project ID
     */
    async listSpaces(projectId: string): Promise<PaginationDTO<SpaceDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/spaces';
        const params = {
            platformId: this.platformId,
            projectId: projectId,
        };

        console.log(params);

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
     * @param id device ID or DeID
     * @param pid project ID
     */
    async getDevice(id: string, pid: string): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<DeviceDTO>(pathname, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;

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
     * @param pid project ID
     * @param options create device options
     */
    async placeDevice(
        pid: string,
        options: PlaceDeviceOptions
    ): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const body = {
            ...options,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<DeviceDTO>(pathname, body, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;
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
     * @param id device ID or DeID
     * @param pid project ID
     * @param options Edit Device Options
     */
    async editDevice(
        id: string,
        pid: string,
        options: EditDeviceOptions
    ): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };
        const data = {
            ...options,
        };
        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .put<DeviceDTO>(pathname, data, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;
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
     * @param id device ID or DeID
     * @param pid project ID
     */
    async unlinkParentDevice(id: string, pid: string): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}/parent`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .delete<DeviceDTO>(pathname, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;

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
     * @param id device ID or DeID
     * @param pid project ID
     */
    async removeDevice(id: string, pid: string): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .delete<DeviceDTO>(pathname, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;

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
     * @param id device ID or DeID
     * @param pid project ID
     * @param cid Gateway Connection ID
     */
    async bindGatewayConnection(
        id: string,
        pid: string,
        cid: string
    ): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}/gateway`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const body = {
            cid: cid,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .put<DeviceDTO>(pathname, body, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;

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
     * @param id device ID or DeID
     * @param pid project ID
     */
    async unbindGatewayConnection(id: string, pid: string): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}/gateway`;
        const params = {
            platformId: this.platformId,
            projectId: pid,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .delete<DeviceDTO>(pathname, { params: params })
            .then((res) => {
                const dto: DeviceDTO = res.data;
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
     *
     */
    async listDeviceTemplates(): Promise<PaginationDTO<DeviceTemplateDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/device/templates';
        const params = {
            platformId: this.platformId,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<DeviceTemplateDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<DeviceTemplateDTO> = {
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
