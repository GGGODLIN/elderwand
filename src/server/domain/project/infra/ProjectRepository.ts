import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ProjectDTO from '../../project/models/ProjectDTO';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';

export interface ProjectRepositoryCtor {
    host: string;
    platformId: number;
    version?: number;
}

export default class ProjectRepository {
    constructor(ctor: ProjectRepositoryCtor) {
        this.origin = ctor.host;
        this.platformId = ctor.platformId;
    }

    private readonly origin: string;
    private readonly platformId: number;

    async listProjects(): Promise<PaginationDTO<ProjectDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/projects';
        const params = { pid: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<ProjectDTO[]>(pathname, { params: params })
            .then((res) => {
                const result: PaginationDTO<ProjectDTO> = {
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

    async getProject(code: string) {
        const baseURL = this.origin;
        const pathname = `/api/projects/${code}`;
        const params = { pid: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .get<ProjectDTO>(pathname, { params: params })
            .then((res) => {
                const dto: ProjectDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async createProject(options) {
        const baseURL = this.origin;
        const pathname = `/api/projects`;
        const body = {
            ...options,
            platformId: this.platformId
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .post<ProjectDTO>(pathname, body)
            .then((res) => {
                const dto: ProjectDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                throw err;
            });
    }

    async updateProject(id, options) {
        const baseURL = this.origin;
        const pathname = `/api/projects/${id}`;
        const body = {
            ...options,
        };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .patch<ProjectDTO>(pathname, body)
            .then((res) => {
                const dto: ProjectDTO = res.data;

                return dto;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    // console.log('isAxiosError from repository');
                }
                console.log('updateProjectErr', err)
                throw err;
            });
    }

    async removeProject(code: string) {
        const baseURL = this.origin;
        const pathname = `/api/projects/${code}`;
        const params = { pid: this.platformId };

        const axios = new AxiosFactory({ baseURL: baseURL }).getInstance();

        return await axios
            .delete<ProjectDTO>(pathname)
            .then((res) => {
                const dto: ProjectDTO = res.data;

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
