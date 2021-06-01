import { IRouterContext } from 'koa-router';
import PaginationVM from '../../client/models/PaginationVM';
import { ServerEnvVar } from '../config/ServerEnvVar';
import DeviceMaintainUCO from '../domain/device/applications/DeviceMaintainUCO';
import DeviceRepository from '../domain/device/infra/DeviceRepository';
import DeviceDTO from '../domain/device/models/DeviceDTO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import RequestBody from '../domain/shared/types/RequestBody';
import DataAccessHelper from '../helpers/DataAccessHelper';
import DeviceDataRepositoryHelper, {
    ApiRepositoryCtor,
} from '../helpers/DeviceDataRepositoryHelper';
import DeviceVM from '../models/device/DeviceVM';

export default class DeviceMaintainController {
    // /api/devices?projectID={projectID}
    static listDevices = async (ctx: IRouterContext) => {
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        });

        const query = {
            projectID: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .listDevices(query.projectID)
            .then((res: PaginationDTO<DeviceDTO>) => {
                const vm = {
                    ...res,
                    results: convertToDeviceVMs(res.results),
                } as PaginationVM<DeviceVM>;

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

    // /api/devices/:id?projectID={projectID}
    static getDevice = async (ctx: IRouterContext) => {
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectID: '',
            ...ctx.query,
        };

        await new DeviceMaintainUCO(repository)
            .getDevice(params.id, query.projectID)
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

    // /api/devices/:id/gateway?projectID={projectID}
    static bindGateway = async (
        ctx: IRouterContext & RequestBody<BindGatewayBody>
    ) => {
        const repository = new DeviceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        });

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectID: '',
            ...ctx.query,
        };

        const body = {
            cid: '',
            ...ctx.request.body,
        };

        await new DeviceMaintainUCO(repository)
            .bindGatewayConnection(params.id, query.projectID, body.cid)
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

    // /api/devices/:id/repository?projectID={projectID}
    static getRepository = async (ctx: IRouterContext) => {
        const ctor: ApiRepositoryCtor = {
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        };

        const params = {
            id: '',
            ...ctx.params,
        };

        const query = {
            projectID: '',
            ...ctx.query,
        };

        // target device
        const device = await DeviceDataRepositoryHelper.getDevice(
            ctor,
            params.id,
            query.projectID
        );

        // project
        const project = await DeviceDataRepositoryHelper.getProject(
            ctor,
            query.projectID
        );

        // spaces
        const spaces = await DeviceDataRepositoryHelper.getSpaces(
            ctor,
            device.spaceID,
            query.projectID
        );

        // devices
        const devices = await DeviceDataRepositoryHelper.getDevices(
            ctor,
            device,
            query.projectID
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
}

interface BindGatewayBody {
    cid: string; // gateway connection id
}

function convertToDeviceVMs(dtos: DeviceDTO[]): DeviceVM[] {
    return dtos.map((dto) => {
        return convertToDeviceVM(dto);
    });
}

function convertToDeviceVM(dto: DeviceDTO): DeviceVM {
    return {
        ...dto,
    } as DeviceVM;
}
