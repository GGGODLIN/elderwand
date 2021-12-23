import { IRouterContext } from 'koa-router';
import ServerEnvVar from '../config/ServerEnvVar';
import AssetsMaintainUCO from '../domain/assets/applications/AssetsMaintainUCO';
import AssetsRepository from '../domain/assets/infra/AssetsRepository';
import { IconDTO } from '../domain/assets/models/AssetDTO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import RequestBody from '../domain/shared/types/RequestBody';
import { IconVM } from '../models/assets/AssetVM';
import PaginationVM from '../models/PaginationVM';
import AuthUtil from '../utils/AuthUtil';

export default class AssetsMaintainController {
    static listIcons = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new AssetsRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
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
                } as PaginationVM<IconVM>;

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

    static getCloudCodes = async (ctx) => {
        const token = AuthUtil.getToken(ctx);
        const repository = new AssetsRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
            token: token
        });

        await new AssetsMaintainUCO(repository)
            .getCloudCodes()
            .then((res) => {

                ctx.status = 200;
                ctx.body = { ...res };

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

function convertToIconVMs(dtos: IconDTO[]): IconVM[] {
    if (!dtos) {
        return [];
    }

    return dtos.map((dto) => {
        return convertToIconVM(dto);
    });
}

function convertToIconVM(dto: IconDTO): IconVM {
    return {
        ...dto,
    };
}
