import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';
import DeviceDTO from '../models/DeviceDTO';
import DeviceTemplateDTO from '../models/DeviceTemplateDTO';
import {
    DevicePreviewDTO,
    DeviceTemplatePreviewDTO,
    ProjectPreviewDTO,
    SpacePreviewDTO,
} from '../models/MigrationPreviewDTOs';
import ProjectDTO from '../models/ProjectDTO';
import SpaceDTO from '../models/SpaceDTO';

export interface MigrationRepositoryCtor {
    host: string;
    dbname: string;
    conn: string;
    version: number;
}

export default class MigrationRepository {
    constructor(params: MigrationRepositoryCtor) {
        this.origin = params.host;
        this.query = { ...params };
    }

    private readonly origin: string;
    private readonly query: {
        dbname: string;
        conn: string;
        version: number;
    };

    async listProjects(): Promise<PaginationDTO<ProjectPreviewDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/migration/projects';
        const params = { ...this.query };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<ProjectPreviewDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<ProjectPreviewDTO> = {
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

    async listSpaces(code: string): Promise<PaginationDTO<SpacePreviewDTO>> {
        const baseURL = this.origin;
        const pathname = `/api/migration/projects/${code}/spaces`;
        const params = { ...this.query };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<SpacePreviewDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<SpacePreviewDTO> = {
                    offset: 0,
                    limit: 0,
                    total: res.data.length,
                    results: res.data,
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                throw err;
            });
    }

    async listDevices(code: string): Promise<PaginationDTO<DevicePreviewDTO>> {
        const baseURL = this.origin;
        const pathname = `/api/migration/projects/${code}/devices`;
        const params = { ...this.query };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<DevicePreviewDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<DevicePreviewDTO> = {
                    offset: 0,
                    limit: 0,
                    total: res.data.length,
                    results: res.data,
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                throw err;
            });
    }

    async listDeviceTemplates(): Promise<
        PaginationDTO<DeviceTemplatePreviewDTO>
    > {
        const baseURL = this.origin;
        const pathname = `/api/migration/device/templates`;
        const params = { ...this.query };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<DeviceTemplatePreviewDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<DeviceTemplatePreviewDTO> = {
                    offset: 0,
                    limit: 0,
                    total: res.data.length,
                    results: res.data,
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                throw err;
            });
    }

    async importProject(
        code: string,
        vo: { code: string }
    ): Promise<ProjectDTO> {
        const baseURL = this.origin;
        const pathname = `/api/migration/projects/${code}`;
        const params = { ...this.query };
        const body: {
            code: string;
        } = {
            code: '',
            ...vo,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<ProjectDTO>(pathname, body, { params: params })
            .then((res) => {
                return res.data;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                throw err;
            });
    }

    async importSpaces(
        code: string,
        vo: object
    ): Promise<PaginationDTO<SpaceDTO>> {
        const baseURL = this.origin;
        const pathname = `/api/migration/projects/${code}/spaces`;
        const params = { ...this.query };
        const body: {
            code: string;
        } = {
            code: '',
            ...vo,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<SpaceDTO[]>(pathname, body, { params: params })
            .then((res) => {
                const result: PaginationDTO<SpaceDTO> = {
                    offset: 0,
                    limit: 0,
                    total: res.data.length,
                    results: res.data,
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                throw err;
            });
    }

    async importDevices(
        code: string,
        vo: object
    ): Promise<PaginationDTO<DeviceDTO>> {
        const baseURL = this.origin;
        const pathname = `/api/migration/projects/${code}/devices`;
        const params = { ...this.query };
        const body: {
            code: string;
        } = {
            code: '',
            ...vo,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<DeviceDTO[]>(pathname, body, { params: params })
            .then((res) => {
                const result: PaginationDTO<DeviceDTO> = {
                    offset: 0,
                    limit: 0,
                    total: res.data.length,
                    results: res.data,
                };

                if (res.data) {
                    result.total = res.data.length;
                    result.results = res.data;
                }

                return result;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                throw err;
            });
    }

    async importDeviceTemplates() {
        const baseURL = this.origin;
        const pathname = `/api/migration/device/templates`;
        const params = { ...this.query };
        const body = {};

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<DeviceTemplateDTO[]>(pathname, body, { params: params })
            .then((res) => {
                const result: PaginationDTO<DeviceTemplateDTO> = {
                    offset: 0,
                    limit: 0,
                    total: res.data.length,
                    results: res.data,
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
