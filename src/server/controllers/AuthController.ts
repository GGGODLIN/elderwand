import { IRouterContext } from 'koa-router';
import ServerEnvVar from '../config/ServerEnvVar';
import AuthorizationUCO from '../domain/shared/applications/AuthorizationUCO';
import { Platform } from '../domain/shared/enums/Enums';
import AuthRepository from '../domain/shared/infra/AuthRepository';
import RequestBody from '../domain/shared/types/RequestBody';
import UserDTO from '../domain/user/models/UserDTO';
import AuthUtil from '../utils/AuthUtil';

export default class AuthController {
    static login = async (ctx: IRouterContext & RequestBody) => {
        const repository = new AuthRepository({
            host: ServerEnvVar.SkymapApiHost,
            platformId: Platform.ElderWand,
        });

        const {
            username,
            password,
        }: {
            username: string;
            password: string;
        } = {
            username: '',
            password: '',
            ...ctx.request.body,
        };

        await new AuthorizationUCO(repository)
            .login(username, password)
            .then((res: UserDTO) => {
                const user = res;

                const data = {
                    id: user.id,
                    username: user.account.username,
                };

                const token = AuthUtil.sign(
                    data,
                    ServerEnvVar.JwtSecret,
                    ServerEnvVar.AuthTokenTTL
                );

                ctx.response.set(
                    AuthUtil.AuthHeader,
                    AuthUtil.newBearer(token)
                );
                ctx.status = 200;
                ctx.body = data;

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
    //
    // static logout = async (ctx: IRouterContext & RequestToken) => {
    //     console.log('=== logout ===');
    //
    //     let token = ctx.request.token;
    //
    //     console.log({ token });
    //     console.log(token);
    //
    //     ctx.status = 200;
    //     ctx.cookies.set(ServerEnvVar.TokenKey, '', { maxAge: -1 });
    //
    //     if (!ctx.state.isApi) {
    //         ctx.redirect('/login');
    //     }
    // };
}
