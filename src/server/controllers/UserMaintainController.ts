import { Context } from 'koa';
import PaginationVM from '../../client/models/PaginationVM';
import { ServerEnvVar } from '../config/ServerEnvVar';
import UserMaintainUCO from '../domain/user/applications/UserMaintainUCO';
import { Platform } from '../domain/shared/enums/Enums';
import PaginationDTO from '../domain/shared/models/PaginationDTO';
import UserRepository from '../domain/user/infra/UserRepository';
import UserDTO from '../domain/user/models/UserDTO';
import UserVM from '../models/user/UserVM';

export default class UserMaintainController {
    static listUsers = async (ctx: Context) => {
        const repository = new UserRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        });

        await new UserMaintainUCO(repository)
            .listUsers()
            .then((res: PaginationDTO<UserDTO>) => {
                const vm = {
                    ...res,
                    results: convertToUserVMs(res.results),
                } as PaginationVM<UserVM>;

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

    static getUser = async (ctx) => {
        const repository = new UserRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformID: Platform.ElderWand,
        });

        const params: {
            uid: string;
        } = {
            uid: '',
            ...ctx.params,
        };

        await new UserMaintainUCO(repository)
            .getUser(params.uid)
            .then((res: UserDTO) => {
                const vm = convertToUserVM(res);

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

    static createUser = async (ctx) => {
        // TODO
    };
}

function convertToUserVMs(dtos: UserDTO[]): UserVM[] {
    return dtos.map((dto) => {
        return convertToUserVM(dto);
    });
}

function convertToUserVM(dto: UserDTO): UserVM {
    return {
        ...dto,
    } as UserVM;
}
