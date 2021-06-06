// import compose from 'koa-compose';
// import Router from 'koa-router';
// import UserMaintainUCO from './application/UserMaintainUCO';
// import { AuthUserRepository } from 'g13-web-shared/server/user/repositories';
// import { AuthUtil } from 'g13-web-shared/server/user';
// import { LoginVO, UserDTO } from 'g13-web-shared/server/user/models';
// import { ParameterizedContext } from 'koa';
// import { ServerEnvVar } from '../config/ServerEnvVar';
//
// export class AuthApiController {
//     static login(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             // @ts-ignore
//             const body: LoginVO = ctx.request.body;
//
//             const vo: LoginVO = {
//                 username: body.username,
//                 password: body.password,
//             };
//
//             await new UserMaintainUCO()
//                 .login(vo)
//                 .then((res) => {
//                     const user: UserDTO = res;
//
//                     const data = {
//                         id: user.id,
//                         username: user.username,
//                     };
//
//                     const token = AuthUtil.sign(
//                         data,
//                         ServerEnvVar.JwtSecret,
//                         ServerEnvVar.AuthTokenTTL
//                     );
//
//                     AuthUserRepository.login(token, ServerEnvVar.JwtSecret);
//                     // AuthUserRepository.display()
//
//                     ctx.response.set(
//                         AuthUtil.AuthHeader,
//                         AuthUtil.newBearer(token)
//                     );
//                     ctx.body = res;
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     ctx.status = 400;
//                     ctx.body = err;
//                 });
//         };
//     }
//
//     static logout(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             // let token = ctx.request.token;
//             let token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);
//
//             ctx.state = 200;
//             ctx.cookies.set(ServerEnvVar.TokenKey, '', { maxAge: -1 });
//
//             if (typeof token == 'undefined') {
//                 ctx.body = {};
//                 return;
//             }
//
//             const verify = AuthUserRepository.verify(
//                 token,
//                 ServerEnvVar.JwtSecret
//             );
//
//             if (verify) {
//                 AuthUserRepository.logout(token, ServerEnvVar.JwtSecret);
//             }
//
//             ctx.state = 200;
//             ctx.body = {};
//         };
//     }
//
//     static register(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             // let token = ctx.request.token;
//             // let token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey)
//             // console.log(ctx.request["body"]);
//
//             const vo = { ...ctx.request['body'] };
//
//             await new UserMaintainUCO()
//                 .register(vo)
//                 .then((res) => {
//                     const user: UserDTO = res;
//
//                     const data = {
//                         id: user.id,
//                         username: user.username,
//                     };
//
//                     const token = AuthUtil.sign(data, ServerEnvVar.JwtSecret);
//
//                     AuthUserRepository.login(token, ServerEnvVar.JwtSecret);
//                     // AuthUserRepository.display()
//
//                     ctx.response.set(
//                         AuthUtil.AuthHeader,
//                         AuthUtil.newBearer(token)
//                     );
//                     ctx.body = res;
//                 })
//                 .catch((err) => {
//                     console.log(err);
//                     ctx.status = 400;
//                     ctx.body = err;
//                 });
//         };
//     }
// }

export {};
