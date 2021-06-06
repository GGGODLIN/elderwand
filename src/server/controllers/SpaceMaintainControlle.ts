import { IRouterContext } from 'koa-router';
import PaginationVM from '../../client/models/PaginationVM';
import { ServerEnvVar } from '../config/ServerEnvVar';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import SpaceMaintainUCO from '../domain/space/applications/SpaceMaintainUCO';
import SpaceRepository from '../domain/space/infra/SpaceRepository';
import SpaceDTO from '../domain/space/models/SpaceDTO';
import SpaceVM from '../models/space/SpaceVM';

export default class SpaceMaintainController {
    static listSpaces = async (ctx: IRouterContext) => {
        const repository = new SpaceRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const query = {
            projectID: '',
            ...ctx.query,
        };

        await new SpaceMaintainUCO(repository)
            .listSpaces(query.projectID)
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
            projectID: '',
            ...ctx.query,
        };

        await new SpaceMaintainUCO(repository)
            .getSpace(params.id, query.projectID)
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
}

function convertToSpaceVMs(dtos: SpaceDTO[]): SpaceVM[] {
    return dtos.map((dto) => {
        return convertToSpaceVM(dto);
    });
}

function convertToSpaceVM(dto: SpaceDTO): SpaceVM {
    return {
        ...dto,
    } as SpaceVM;
}
