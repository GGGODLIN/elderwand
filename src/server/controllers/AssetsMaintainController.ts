import { IRouterContext } from 'koa-router';
import { Icon } from '../../client/domain/device/DeviceVMs';
import PaginationVM from '../../client/models/PaginationVM';
import ServerEnvVar from '../config/ServerEnvVar';
import AssetsMaintainUCO from '../domain/assets/applications/AssetsMaintainUCO';
import AssetsRepository from '../domain/assets/infra/AssetsRepository';
import { IconDTO } from '../domain/assets/models/AssetsDTOs';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import RequestBody from '../domain/shared/types/RequestBody';

export default class AssetsMaintainController {
    static listIcons = async (ctx: IRouterContext & RequestBody) => {
        const repository = new AssetsRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const query = {
            ...ctx.query,
        };

        await new AssetsMaintainUCO(repository)
            .listIcons()
            .then((res: PaginationDTO<IconDTO>) => {
                const vm = {
                    ...res,
                    results: convertToIconVMs(res.results),
                } as PaginationVM<IconDTO>;

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

function convertToIconVMs(dtos: IconDTO[]): Icon[] {
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToIconVM(dto);
    });
}

function convertToIconVM(dto: IconDTO): Icon {
    return {
        ...dto,
    };
}
