import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import DeviceDTO from '../../device/models/DeviceDTO';

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
     * @param projectID Project ID
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
}
