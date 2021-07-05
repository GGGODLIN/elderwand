import { IRouterContext } from 'koa-router';
import PaginationVM from '../../client/models/PaginationVM';
import ServerEnvVar from '../config/ServerEnvVar';
import DeviceMaintainUCO from '../domain/device/applications/DeviceMaintainUCO';
import DeviceRepository from '../domain/device/infra/DeviceRepository';
import DeviceDTO from '../domain/device/models/DeviceDTO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import SpaceMaintainUCO from '../domain/space/applications/SpaceMaintainUCO';
import SpaceRepository from '../domain/space/infra/SpaceRepository';
import SpaceDTO from '../domain/space/models/SpaceDTO';
import SpaceVM, { DeviceVM } from '../models/space/SpaceVM';
import { groupBy } from '../utils/FunctionUtil';

export default class SpaceMaintainController {
    static listSpaces = async (ctx: IRouterContext) => {
        const repository = new SpaceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new SpaceMaintainUCO(repository)
            .listSpaces(query.projectId)
            .then((res: PaginationDTO<SpaceDTO>) => {
                const vm = {
                    ...res,
                    results: convertToSpaceVMs(res.results),
                } as PaginationVM<SpaceVM>;

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

    static getSpace = async (ctx: IRouterContext) => {
        const repository = new SpaceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        await new SpaceMaintainUCO(repository)
            .getSpace(params.id, query.projectId)
            .then((res: SpaceDTO) => {
                const vm = convertToSpaceVM(res);

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

    static getSpaceTopology = async (ctx: IRouterContext) => {
        const ctor = {
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        };

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectId: '',
            ...ctx.query,
        };

        const spaces: SpaceVM[] = (await new SpaceMaintainUCO(
            new SpaceRepository(ctor)
        )
            .listSpaces(query.projectId)
            .then((res: PaginationDTO<SpaceDTO>) => {
                return res.results;
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            })) as SpaceVM[];

        // const devices
        const devices: DeviceDTO[] = (await new DeviceMaintainUCO(
            new DeviceRepository(ctor)
        )
            .listDevices(query.projectId)
            .then((res: PaginationDTO<DeviceDTO>) => {
                return res.results;
            })
            .catch((err) => {
                if (err.isAxiosError) {
                    ctx.status = err.response.status;
                    ctx.body = err.response.data;
                    return;
                }
                throw err;
            })) as DeviceDTO[];

        const deviceBySpaceGroup: { [key: string]: DeviceDTO[] } =
            groupBy('spaceId')(devices);

        const root = spaces.find((item) => item.id == params.id);

        const vms: SpaceVM[] = [];

        let vm = convertToSpaceVM(root);

        vm = {
            ...vm,
            devices: convertToDeviceVMs(deviceBySpaceGroup[vm.id]),
        };

        vms.push(vm);

        function pushLeaves(dtos: SpaceDTO[]) {
            if (!dtos.length) {
                return;
            }

            for (const dto of dtos) {
                let vm = convertToSpaceVM(dto);
                const devices = deviceBySpaceGroup[dto.id];

                vm = {
                    ...vm,
                    devices: convertToDeviceVMs(devices),
                };

                vms.push(vm);
            }

            for (const dto of dtos) {
                const filtered = spaces.filter((item) => {
                    if (item.parentId == dto.id) {
                        return item;
                    }
                });

                pushLeaves(filtered);
            }
        }

        const filtered = spaces.filter((item) => {
            if (root.id == item.parentId) {
                return item;
            }
        });

        pushLeaves(filtered);

        const links = vms.map((item) => {
            const target = !item.parentId ? query.projectId : item.parentId;

            return {
                source: item.id,
                target: item.parentId,
            };
        });

        const topology = {
            nodes: vms,
            links: links,
        };
        ctx.status = 200;
        ctx.body = topology;
    };
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
    return {
        ...dto,
    } as DeviceVM;
}
