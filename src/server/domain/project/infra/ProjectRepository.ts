import { AxiosError } from 'axios';
import AxiosFactory from '../../../helpers/AxiosFactory';
import ProjectDTO from '../../project/models/ProjectDTO';
import ErrorInfoDTO from '../../shared/models/ErrorInfoDTO';
import PaginationDTO from '../../shared/models/PaginationDTO';

export interface ProjectRepositoryCtor {
    host: string;
    platformID: number;
    version?: number;
}

export default class ProjectRepository {
    constructor(ctor: ProjectRepositoryCtor) {
        this.origin = ctor.host;
        this.platformID = ctor.platformID;
    }

    private readonly origin: string;
    private readonly platformID: number;

    async listProjects(): Promise<PaginationDTO<ProjectDTO>> {
        const baseURL = this.origin;
        const pathname = '/api/projects';
        const params = { pid: this.platformID };

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
        const params = { pid: this.platformID };

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
}
