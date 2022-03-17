import { IRouterContext } from 'koa-router';
import ServerEnvVar from '../config/ServerEnvVar';
import DeviceMaintainUCO from '../domain/device/applications/DeviceMaintainUCO';
import DeviceRepository from '../domain/device/infra/DeviceRepository';
import DeviceDTO from '../domain/device/models/DeviceDTO';
import {
    EditDeviceProfileOptions,
    EditDeviceProtocolsOptions,
    PlaceDeviceOptions,
} from '../domain/device/models/DeviceVOs';
import FunctionPointTypeDTO from '../domain/device/models/FunctionPointTypeDTO';
import DeviceTemplateDTO from '../domain/migration/models/DeviceTemplateDTO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import RequestBody from '../domain/shared/types/RequestBody';
import SpaceDTO from '../domain/space/models/SpaceDTO';
import DataAccessHelper from '../helpers/DataAccessHelper';
import DeviceDataRepositoryHelper, {
    ApiRepositoryCtor,
} from '../helpers/DeviceDataRepositoryHelper';
import DeviceVM from '../models/device/DeviceVM';
import FunctionPointTypeVM from '../models/device/FunctionPointTypeVM';
import DeviceTemplateVM from '../models/migration/DeviceTemplateVM';
import PaginationVM from '../models/PaginationVM';
import SpaceVM from '../models/space/SpaceVM';
import AuthUtil from '../utils/AuthUtil';

export default class DeviceMaintainController {
    // /api/devices?projectId={projectId}
    static listDevices = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .listDevices(query.projectId)
            .then((res: PaginationDTO<DeviceDTO>) => {
                const vm = {
                    ...res,
                    results: convertToDeviceVMs(res.results),
                } as PaginationVM<DeviceVM>;

                ctx.status = 200;
                ctx.body = vm;
                console.log('listDevices', JSON.stringify(vm))
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

    // /api/devices/:id?projectId={projectId}
    static getDevice = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .getDevice(params.id, query.projectId)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/device/topology/resource?projectId={projectId}
    static getDeviceTopologyResource = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .getDeviceTopologyResource(params.id, query.projectId)
            .then((res) => {
                // console.log(res);
                const vm = {
                    spaces: {
                        ...res.spaces,
                        results: convertToSpaceVMs(res.spaces.results),
                    },
                    devices: {
                        ...res.spaces,
                        results: convertToDeviceVMs(res.devices.results),
                    },
                };

                ctx.status = 200;
                ctx.body = vm;
                console.log('getDeviceTopologyResource', JSON.stringify(vm))
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

    // /api/devices?projectId={projectId}
    static placeDevice = async (
        ctx
    ) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            // id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        const body = {
            ...ctx.request.body,
        };

        await new DeviceMaintainUCO(repository)
            .placeDevice(query.projectId, body)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

                ctx.status = 201;
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

    // /api/devices/:id?projectId={projectId}
    static editDeviceProfile = async (
        ctx
    ) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        const body: EditDeviceProfileOptions = {
            ...ctx.request.body,
        };

        await new DeviceMaintainUCO(repository)
            .editDeviceProfile(params.id, query.projectId, body)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/devices/:id?projectId={projectId}
    static editDeviceProtocols = async (
        ctx
    ) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        const body: EditDeviceProtocolsOptions = {
            ...ctx.request.body,
        };

        await new DeviceMaintainUCO(repository)
            .editDeviceProtocols(params.id, query.projectId, body)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/devices/:id/parent?projectId={projectId}
    static unlinkParentDevice = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        // const body = {
        //     ...ctx.request.body,
        // };

        await new DeviceMaintainUCO(repository)
            .unlinkParentDevice(params.id, query.projectId)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/devices/:id?projectId={projectId}
    static removeDevice = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        // const body = {
        //     ...ctx.request.body,
        // };

        await new DeviceMaintainUCO(repository)
            .removeDevice(params.id, query.projectId)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/devices/:id/gateway?projectId={projectId}
    static bindGateway = async (
        ctx
    ) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        const body = {
            cid: '',
            ...ctx.request.body,
        };

        await new DeviceMaintainUCO(repository)
            .bindGatewayConnection(params.id, query.projectId, body.cid)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/devices/:id/gateway?projectId={projectId}
    static unbindGateway = async (
        ctx
    ) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .unbindGatewayConnection(params.id, query.projectId)
            .then((res: DeviceDTO) => {
                const vm = convertToDeviceVM(res);

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

    // /api/devices/:id/repository?projectId={projectId}
    static getRepository = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const ctor: ApiRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        };

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        // target device
        const device = await DeviceDataRepositoryHelper.getDevice(
            ctor,
            params.id,
            query.projectId
        );

        // project
        const project = await DeviceDataRepositoryHelper.getProject(
            ctor,
            query.projectId
        );

        // spaces
        const spaces = await DeviceDataRepositoryHelper.getSpaces(
            ctor,
            device.spaceId,
            query.projectId
        );

        // devices
        const devices = await DeviceDataRepositoryHelper.getDevices(
            ctor,
            device,
            query.projectId
        );

        const info = DataAccessHelper.getServiceInfo(ctx);

        const vm = {
            rt: ['bh.r.zoneExchange'],
            project: project,
            spaces: spaces,
            device: device,
            devices: devices,
            info: info,
        };

        ctx.status = 200;
        ctx.body = vm;

        return;
    };

    // /api/device/templates
    static listDeviceTemplates = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .listDeviceTemplates()
            .then((res: PaginationDTO<DeviceTemplateDTO>) => {
                const vm = {
                    ...res,
                    results: convertToDeviceTemplateVMs(res.results),
                } as PaginationVM<DeviceTemplateVM>;

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

    // /api/device/function-point/topology
    static listDeviceFunctionPointTopology = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        const query = {
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .listDeviceFunctionPointsTopology()
            .then((res: PaginationDTO<FunctionPointTypeDTO>) => {
                const vm = {
                    ...res,
                    results: convertToFunctionPointTypeVMs(res.results),
                } as PaginationVM<FunctionPointTypeVM>;

                ctx.body = vm;
                ctx.status = 200;

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

function convertToFunctionPointTypeVMs(
    dtos: FunctionPointTypeDTO[]
): FunctionPointTypeVM[] {
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToFunctionPointTypeVM(dto);
    });
}

function convertToFunctionPointTypeVM(
    dto: FunctionPointTypeDTO
): FunctionPointTypeVM {
    return {
        ...dto,
    } as FunctionPointTypeVM;
}

interface BindGatewayBody {
    cid: string; // gateway connection id
}

function convertToSpaceVMs(dtos: SpaceDTO[]): SpaceVM[] {
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToSpaceVM(dto);
    });
}

function convertToSpaceVM(dto: SpaceDTO): SpaceVM {
    return {
        ...dto,
    } as SpaceVM;
}

function convertToDeviceVMs(dtos: DeviceDTO[]): DeviceVM[] {
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToDeviceVM(dto);
    });
}

function convertToDeviceVM(dto: DeviceDTO): DeviceVM {
    const attrs = [];

    // for rewrite 2.0 older data
    for (const item of dto.attrs) {
        let attr = JSON.parse(JSON.stringify(item));

        if (!item['suffix'] && !!item['suffixes']) {
            attr.suffix = (item as any).suffixes;
        }

        delete attr.suffixes;
        delete attr.susffixes_zh_CN;
        delete attr.Name_zh_CN;
        delete attr.appHidden;

        attrs.push(attr);
    }

    return {
        ...dto,
        attrs: attrs,
    } as DeviceVM;
}

function convertToDeviceTemplateVMs(
    dtos: DeviceTemplateDTO[]
): DeviceTemplateVM[] {
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToDeviceTemplateVM(dto);
    });
}

function convertToDeviceTemplateVM(dto: DeviceTemplateDTO): DeviceTemplateVM {
    return {
        ...dto,
    } as DeviceTemplateVM;
}
