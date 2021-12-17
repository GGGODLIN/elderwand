import { Context } from 'koa';
import PaginationVM from '..//models/PaginationVM';
import ServerEnvVar from '../config/ServerEnvVar';
import { ProjectMaintainUCO } from '../domain/project/applications/ProjectMaintainUCO';
import ProjectRepository from '../domain/project/infra/ProjectRepository';
import ProjectDTO from '../domain/project/models/ProjectDTO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import ProjectVM from '../models/project/ProjectVM';

export default class ProjectMaintainController {
    static listProjects = async (ctx: Context) => {
        const repository = new ProjectRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        await new ProjectMaintainUCO(repository)
            .listProjects()
            .then((res: PaginationDTO<ProjectDTO>) => {
                const vm = {
                    ...res,
                    results: convertToProjectVMs(res.results),
                } as PaginationVM<ProjectVM>;

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static getProject = async (ctx) => {
        const repository = new ProjectRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const params: {
            pid: string;
        } = {
            pid: '',
            ...ctx.params,
        };

        await new ProjectMaintainUCO(repository)
            .getProject(params.pid)
            .then((res: ProjectDTO) => {
                const vm = convertToProjectVM(res);

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static createProject = async (ctx) => {
        const repository = new ProjectRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const body = {
            ...ctx.request.body,
        };

        await new ProjectMaintainUCO(repository)
            .createProject(body)
            .then((res: ProjectDTO) => {
                const vm = convertToProjectVM(res);

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static updateProject = async (ctx) => {
        const repository = new ProjectRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const params: {
            pid: string;
        } = {
            pid: '',
            ...ctx.params,
        };

        const body = {
            ...ctx.request.body,
        };

        await new ProjectMaintainUCO(repository)
            .updateProject(params.pid, body)
            .then((res: ProjectDTO) => {
                const vm = convertToProjectVM(res);

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };
}

function convertToProjectVMs(dtos: ProjectDTO[]): ProjectVM[] {
    return dtos.map((dto) => {
        return convertToProjectVM(dto);
    });
}

function convertToProjectVM(dto: ProjectDTO): ProjectVM {
    return {
        ...dto,
    } as ProjectVM;
}
