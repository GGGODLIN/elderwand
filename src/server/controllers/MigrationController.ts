import { AxiosError } from 'axios';
import { Context } from 'koa';
import { IRouterContext } from 'koa-router';
import ServerEnvVar from '../config/ServerEnvVar';
import MigrationUCO from '../domain/migration/applications/MigrationUCO';
import MigrationRepository, {
    MigrationRepositoryCtor,
} from '../domain/migration/infra/MigrationRepository';
import DeviceDTO from '../domain/migration/models/DeviceDTO';
import DeviceTemplateDTO from '../domain/migration/models/DeviceTemplateDTO';
import {
    DevicePreviewDTO,
    DeviceTemplatePreviewDTO,
    ProjectPreviewDTO,
    SpacePreviewDTO,
} from '../domain/migration/models/MigrationPreviewDTO';
import {
    GetSourceProjectVO,
    ImportDevicesVO,
    ImportDeviceTemplatesVO,
    ImportProjectVO,
    ImportSpacesVO,
    ImportSpaceTemplatesVO,
    ListSourceDevicesVO,
    ListSourceDeviceTemplatesVO,
    ListSourceProjectsVO,
    ListSourceSpacesVO,
    ListSourceVO,
} from '../domain/migration/models/MigrationVOs';
import ProjectDTO from '../domain/migration/models/ProjectDTO';
import SpaceDTO from '../domain/migration/models/SpaceDTO';
import SpaceTemplateDTO from '../domain/migration/models/SpaceTemplateDTO';
import ErrorInfoDTO from '../domain/shared/models/ErrorInfoDTO';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import DeviceTemplateVM from '../models/migration/DeviceTemplateVM';
import DeviceVM from '../models/migration/DeviceVM';
import {
    DevicePreviewVM,
    DeviceTemplatePreviewVM,
    ProjectPreviewVM,
    SpacePreviewVM,
} from '../models/migration/PreviewVM';
import ProjectVM from '../models/migration/ProjectVM';
import SpaceVM from '../models/migration/SpaceVM';
import PaginationVM from '../models/PaginationVM';
import { SpaceTemplateVM } from '../models/space/SpaceVM';

export default class MigrationController {
    static listSourceProjects = async (ctx: Context) => {
        const query: ListSourceProjectsVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const ctor: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...query,
        };

        // to do valid vo and params

        const repository = new MigrationRepository(ctor);

        await new MigrationUCO({ repository })
            .listProjects()
            .then((res: PaginationDTO<ProjectPreviewDTO>) => {
                const dto = res;

                const vm = {
                    ...dto,
                    results: convertToProjectPreviewVMs(dto.results),
                } as PaginationVM<ProjectPreviewVM>;

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            });
    };

    // api/migration/projects/:code
    static getSourceProject = async (ctx: Context & IRouterContext) => {
        const vo: GetSourceProjectVO = {
            dbname: '',
            conn: '',
            version: 200,
            code: '',
            ...ctx.query,
            ...ctx.params,
        };

        if (vo.code == '') {
            throw new Error(`Project Code is required.`);
        }

        const ctor: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const repository = new MigrationRepository(ctor);
        const uco = new MigrationUCO({ repository });

        const project = (await uco
            .getProject(vo.code)
            .then((res: ProjectPreviewDTO) => {
                return res;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            })) as ProjectPreviewDTO;

        const spaces = (await uco
            .listSpaces(project.projectCode)
            .then((res: PaginationDTO<SpacePreviewDTO>) => {
                return res.results;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            })) as SpacePreviewDTO[];

        const devices = (await uco
            .listDevices(project.projectCode)
            .then((res: PaginationDTO<DevicePreviewDTO>) => {
                return res.results;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            })) as DevicePreviewDTO[];

        const vm = {
            ...convertToProjectPreviewVM(project),
            spaces: convertToSpacePreviewVMs(spaces),
            devices: convertToDevicePreviewVMs(devices),
        };

        ctx.status = 200;
        ctx.body = vm;
    };

    static listSourceSpaces = async (ctx: Context) => {
        const query: ListSourceSpacesVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const params: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...query,
        };

        const {
            code,
        }: {
            code: string;
        } = { ...ctx.params };

        // to do valid vo and params

        const repository = new MigrationRepository(params);

        await new MigrationUCO({ repository })
            .listSpaces(code)
            .then((res: PaginationDTO<SpacePreviewDTO>) => {
                const dto = res;

                const vm = {
                    ...dto,
                    results: convertToSpacePreviewVMs(dto.results),
                } as PaginationVM<SpacePreviewVM>;

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            });
    };

    static listSourceDevices = async (ctx: Context) => {
        const vo: ListSourceDevicesVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const params: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const {
            code,
        }: {
            code: string;
        } = { ...ctx.params };

        // to do valid vo and params

        const repository = new MigrationRepository(params);

        await new MigrationUCO({ repository })
            .listDevices(code)
            .then((res: PaginationDTO<DevicePreviewDTO>) => {
                const dto = res;

                const vm = {
                    ...dto,
                    results: convertToDevicePreviewVMs(dto.results),
                } as PaginationVM<DevicePreviewDTO>;

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            });
    };

    static listSourceDeviceTemplates = async (ctx: Context) => {
        const vo: ListSourceDeviceTemplatesVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const params: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        // to do valid vo and params

        const repository = new MigrationRepository(params);

        await new MigrationUCO({ repository })
            .listDeviceTemplates()
            .then((res: PaginationDTO<DeviceTemplatePreviewDTO>) => {
                const dto = res;

                const vm = {
                    ...dto,
                    results: convertToDeviceTemplatePreviewVMs(dto.results),
                } as PaginationVM<DeviceTemplatePreviewVM>;

                ctx.status = 200;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }

                throw err;
            });
    };

    static importProject = async (
        ctx: Context & {
            request: {
                body: object;
            };
        }
    ) => {
        ctx.request.socket.setTimeout(10 * 60 * 1000);

        const params = {
            code: '',
            ...ctx.params,
        };

        const query: ListSourceVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const body = { code: '', ...ctx.request.body };

        const vo: ImportProjectVO = {
            dbname: query.dbname,
            conn: query.conn,
            version: query.version,
            code: params.code,
        };
        // to do valid vo

        const ctor: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const repository = new MigrationRepository(ctor);

        await new MigrationUCO({ repository })
            .importProject(params.code, body)
            .then((res: ProjectDTO) => {
                const vm = convertToProjectVM(res);

                ctx.status = 201;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static importSpaces = async (
        ctx: Context & {
            request: {
                body: object;
            };
        }
    ) => {
        ctx.request.socket.setTimeout(10 * 60 * 1000);

        const params = {
            code: '',
            ...ctx.params,
        };

        const query: ListSourceVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const body = { code: '', ...ctx.request.body };

        const vo: ImportSpacesVO = {
            dbname: query.dbname,
            conn: query.conn,
            version: query.version,
            code: params.code,
        };
        // to do valid vo

        const ctor: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const repository = new MigrationRepository(ctor);

        await new MigrationUCO({ repository })
            .importSpaces(params.code, body)
            .then((res: PaginationDTO<SpaceDTO>) => {
                const vm = {
                    ...res,
                    results: convertToSpaceVMs(res.results),
                } as PaginationVM<SpaceVM>;

                ctx.status = 201;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static importSpaceTemplates = async (ctx: Context) => {
        ctx.request.socket.setTimeout(10 * 60 * 1000);

        const vo: ImportSpaceTemplatesVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const params: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const repository = new MigrationRepository(params);

        await new MigrationUCO({ repository })
            .importSpaceTemplates()
            .then((res: PaginationDTO<SpaceTemplateDTO>) => {
                const vm = {
                    ...res,
                    results: convertToSpaceTemplateVMs(res.results),
                } as PaginationVM<SpaceTemplateVM>;

                ctx.status = 201;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static importDevices = async (
        ctx: Context & {
            request: {
                body: object;
            };
        }
    ) => {
        ctx.request.socket.setTimeout(10 * 60 * 1000);

        const params = {
            code: '',
            ...ctx.params,
        };

        const query: ListSourceVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };
        const body = { code: '', ...ctx.request.body };

        const vo: ImportDevicesVO = {
            dbname: query.dbname,
            conn: query.conn,
            version: query.version,
            code: params.code,
        };
        // to do valid vo

        const ctor: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const repository = new MigrationRepository(ctor);

        await new MigrationUCO({ repository })
            .importDevices(params.code, body)
            .then((res: PaginationDTO<DeviceDTO>) => {
                const vm = {
                    ...res,
                    results: convertToDeviceVMs(res.results),
                } as PaginationVM<DeviceVM>;

                ctx.status = 201;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };

    static importDeviceTemplates = async (ctx: Context) => {
        ctx.request.socket.setTimeout(10 * 60 * 1000);

        const vo: ImportDeviceTemplatesVO = {
            dbname: '',
            conn: '',
            version: 200,
            ...ctx.query,
        };

        const params: MigrationRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            ...vo,
        };

        const repository = new MigrationRepository(params);

        await new MigrationUCO({ repository })
            .importDeviceTemplates()
            .then((res: PaginationDTO<DeviceTemplateDTO>) => {
                const vm = {
                    ...res,
                    results: convertToDeviceTemplateVMs(res.results),
                } as PaginationVM<DeviceTemplateVM>;

                ctx.status = 201;
                ctx.body = vm;

                return;
            })
            .catch((err: AxiosError<ErrorInfoDTO>) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            });
    };
}

function convertToProjectPreviewVMs(dtos: ProjectPreviewDTO[]) {
    return dtos.map((dto) => {
        return convertToProjectPreviewVM(dto);
    });
}

function convertToProjectPreviewVM(dto: ProjectPreviewDTO): ProjectPreviewVM {
    return {
        ...dto,
    } as ProjectPreviewVM;
}

function convertToSpacePreviewVMs(dtos: SpacePreviewDTO[]) {
    return dtos.map((dto) => {
        return convertToSpacePreviewVM(dto);
    });
}

function convertToSpacePreviewVM(dto: SpacePreviewDTO): SpacePreviewVM {
    return {
        ...dto,
    } as SpacePreviewVM;
}

function convertToDevicePreviewVMs(dtos: DevicePreviewDTO[]) {
    return dtos.map((dto) => {
        return convertToDevicePreviewVM(dto);
    });
}

function convertToDevicePreviewVM(dto: DevicePreviewDTO): DevicePreviewVM {
    return {
        ...dto,
    } as DevicePreviewVM;
}

function convertToDeviceTemplatePreviewVMs(dtos: DeviceTemplatePreviewDTO[]) {
    return dtos.map((dto) => {
        return convertToDeviceTemplatePreviewVM(dto);
    });
}

function convertToDeviceTemplatePreviewVM(
    dto: DeviceTemplatePreviewDTO
): DeviceTemplatePreviewVM {
    return {
        ...dto,
    } as DeviceTemplatePreviewVM;
}

function convertToProjectVM(dto: ProjectDTO): ProjectVM {
    return {
        ...dto,
    } as ProjectVM;
}

function convertToSpaceVMs(dtos: SpaceDTO[]) {
    return dtos.map((dto) => {
        return convertToSpaceVM(dto);
    });
}

function convertToSpaceVM(dto: SpaceDTO): SpaceVM {
    return {
        ...dto,
    } as SpaceVM;
}

function convertToSpaceTemplateVMs(
    dtos: SpaceTemplateDTO[]
): SpaceTemplateVM[] {
    return dtos.map((dto) => {
        return convertToSpaceTemplateVM(dto);
    });
}

function convertToSpaceTemplateVM(dto: SpaceTemplateDTO): SpaceTemplateVM {
    return {
        ...dto,
    } as SpaceTemplateVM;
}

function convertToDeviceVMs(dtos: DeviceDTO[]) {
    return dtos.map((dto) => {
        return convertToDeviceVM(dto);
    });
}

function convertToDeviceVM(dto: DeviceDTO): DeviceVM {
    return {
        ...dto,
    } as DeviceVM;
}

function convertToDeviceTemplateVMs(dtos: DeviceTemplateDTO[]) {
    return dtos.map((dto) => {
        return convertToDeviceTemplateVM(dto);
    });
}

function convertToDeviceTemplateVM(dto: DeviceTemplateDTO): DeviceTemplateVM {
    return {
        ...dto,
    } as DeviceTemplateVM;
}
