import { Context } from 'koa';
import PaginationVM from '../../client/models/PaginationVM';
import ServerEnvVar from '../config/ServerEnvVar';
import GatewayConnectionMaintainUCO from '../domain/gateway/applications/GatewayConnectionMaintainUCO';
import GatewayConnectionRepository from '../domain/gateway/infra/GatewayConnectionRepository';
import GatewayConnectionDTO from '../domain/gateway/models/GatewayConnectionDTO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import GatewayConnectionVM from '../models/gateway/GatewayConnectionVM';

export default class GatewayMaintainController {
    static listGatewayConnections = async (ctx: Context) => {
        const repository = new GatewayConnectionRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const query = {
            clientIP: '',
            ...ctx.query,
        };

        let ip = query.clientIP || ctx.request.ip;

        console.log({ ip });

        await new GatewayConnectionMaintainUCO(repository)
            .listGatewayConnections(ip)
            .then((res: PaginationDTO<GatewayConnectionDTO>) => {
                const vm = {
                    ...res,
                    results: convertToGatewayConnectionVMs(res.results),
                } as PaginationVM<GatewayConnectionVM>;

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

    static connect = async (
        ctx: Context & {
            request: {
                body: GatewayConnectJVO;
            };
        }
    ) => {
        const repository = new GatewayConnectionRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const vo = {
            ...ctx.request.body,
        };

        await new GatewayConnectionMaintainUCO(repository)
            .connect(vo)
            .then((res: GatewayConnectionDTO) => {
                const vm = convertToGatewayConnectionVM(res);

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

interface GatewayConnectJVO {
    id?: string;
    publicIP: string;
    traceIP: string;
    networkCards: NetworkCard[];
    swInfos: object;
}

interface NetworkCard {
    enable: boolean;
    ip: string;
    name: string;
    network: string;
    mac: string;
}

function convertToGatewayConnectionVMs(
    dtos: Array<GatewayConnectionDTO>
): GatewayConnectionVM[] {
    return dtos.map((dto) => {
        return convertToGatewayConnectionVM(dto);
    });
}

function convertToGatewayConnectionVM(
    dto: GatewayConnectionDTO
): GatewayConnectionVM {
    return {
        ...dto,
    } as GatewayConnectionVM;
}
