// import { PlatformEnum } from 'g13-web-shared/server/enums';
// import { AuthUtil } from 'g13-web-shared/server/user';
// import { InviteUserVO } from 'g13-web-shared/server/user/models';
// import { ParameterizedContext } from 'koa';
// import ServerEnvVar from '../config/ServerEnvVar';
//
// export class UserApiController {
//     static getUserByToken(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             const token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);
//             const jwt = AuthUtil.decode(token, ServerEnvVar.JwtSecret);
//             const uid = jwt.data.id;
//             //
//             // await new UserMaintainUCO()
//             //     .getUser(uid)
//             //     .then((result) => {
//             //         // console.log(result)
//             //         ctx.status = 200;
//             //         ctx.body = result;
//             //     })
//             //     .catch((err) => {
//             //         ctx.status = 400;
//             //         ctx.body = err;
//             //     });
//         };
//     }
//
//     static queryUsers(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             const vo = {
//                 limit: 0,
//                 offset: 0,
//                 pid: PlatformEnum.ElderWand,
//                 ...ctx.query,
//             };
//
//             // await new UserMaintainUCO()
//             //     .queryUsers(vo)
//             //     .then((result) => {
//             //         // console.log(result)
//             //         ctx.status = 200;
//             //         ctx.body = result;
//             //     })
//             //     .catch((err) => {
//             //         ctx.status = 400;
//             //         ctx.body = err;
//             //     });
//         };
//     }
//
//     static inviteUser(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             const token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);
//             const jwt = AuthUtil.decode(token, ServerEnvVar.JwtSecret);
//             const uid = jwt.data.id;
//             const body = ctx.request['body'];
//             // console.log(body);
//             const vo: InviteUserVO = {
//                 ...body,
//                 projectId: uid,
//                 operator_id: uid,
//             };
//
//             // await new UserMaintainUCO()
//             //     .inviteUser(vo)
//             //     .then((result) => {
//             //         // console.log(result)
//             //         ctx.status = 200;
//             //         ctx.body = result;
//             //     })
//             //     .catch((err) => {
//             //         ctx.status = 400;
//             //         ctx.body = err;
//             //     });
//         };
//     }
//
//     static getInvitingUser(): compose.Middleware<
//         ParameterizedContext<any, Router.IRouterParamContext<any, {}>>
//     > {
//         return async (ctx) => {
//             const { token } = ctx.request.query;
//
//             console.log(token);
//
//             // await new UserMaintainUCO()
//             //     .getInvitingUser(token as string)
//             //     .then((result) => {
//             //         ctx.status = 200;
//             //         ctx.body = result;
//             //     })
//             //     .catch((err) => {
//             //         console.log(err);
//             //         ctx.status = 400;
//             //         ctx.body = err;
//             //     });
//         };
//     }
// }

export {};
