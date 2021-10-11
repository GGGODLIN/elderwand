import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import { DataPointTypeMap } from '../../../utils/fixture/DataPointTypes';
import { DataPointTypeSuffixMap } from '../../../utils/fixture/DataPointTypeSuffixes';
import { FunctionPointTypeMap } from '../../../utils/fixture/FunctionPointTypes';
import DeviceTemplateDTO from '../../migration/models/DeviceTemplateDTO';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import SpaceDTO from '../../space/models/SpaceDTO';
import DeviceDTO from '../models/DeviceDTO';
import {
    EditDeviceProfileOptions,
    EditDeviceProtocolsOptions,
    PlaceDeviceOptions,
} from '../models/DeviceVOs';
import FunctionPointTypeDTO from '../models/FunctionPointTypeDTO';

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
    async editDeviceProfile(
        id: string,
        pid: string,
        options: EditDeviceProfileOptions
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

    async editDeviceProtocols(
        id: string,
        pid: string,
        options: EditDeviceProtocolsOptions
    ): Promise<DeviceDTO> {
        const baseURL = this.origin;
        const pathname = `/api/devices/${id}/protocols`;
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
                let result: PaginationDTO<DeviceTemplateDTO> = {
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
     *
     */
    async listDeviceFunctionPointTopology(): Promise<
        PaginationDTO<FunctionPointTypeDTO>
    > {
        const dtos = [];

        for (const key of Object.keys(FunctionPointTypeMap)) {
            const fpt = FunctionPointTypeMap[key];

            const dto = {
                name: fpt.name,
                value: fpt.value,
                unit: fpt.unit,
                dpts: [],
            } as FunctionPointTypeDTO;

            for (const key of fpt.dpts) {
                const value = DataPointTypeMap[key];

                if (value) {
                    const dptSuffix = DataPointTypeSuffixMap[value.createdRT];

                    const ses = {
                        dpt: value.dpt,
                        name: value.name,
                        createdRT: value.createdRT,
                        rt: value.rt,
                        valueType: value.valueType,
                        valueKey: value.valueKey,
                        suffixes: !dptSuffix ? [] : dptSuffix.suffixes,
                    };

                    dto.dpts.push(ses);
                }
            }

            dtos.push(dto);
        }

        const result: PaginationDTO<FunctionPointTypeDTO> = {
            offset: 0,
            limit: 0,
            total: dtos.length,
            results: dtos,
        };

        return new Promise((resolve, reject) => {
            try {
                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }
}
