import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import DeviceDTO from '../../device/models/DeviceDTO';

export interface DeviceRepositoryCtor {
    host: string;
    platformID: number;
    version?: number;
}

export default class DeviceRepository {
    constructor(ctor: DeviceRepositoryCtor) {
        this.origin = ctor.host;
        this.platformID = ctor.platformID;
    }

    private readonly origin: string;
    private readonly platformID: number;

    /**
     * @param projectID Project ID
     */
    async listDevices(projectID: string): Promise<PaginationDTO<DeviceDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/devices';
        const params = {
            platformID: this.platformID,
            projectID: projectID,
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
            platformID: this.platformID,
            projectID: pid,
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
            platformID: this.platformID,
            projectID: pid,
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
