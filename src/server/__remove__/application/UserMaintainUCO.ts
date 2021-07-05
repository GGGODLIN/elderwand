// import axios, { AxiosError, AxiosResponse } from 'axios';
// import {
//     InviteUserDTO,
//     InviteUserVO,
//     LoginVO,
//     RegisterVO,
//     UserDTO,
// } from 'g13-web-shared/server/user/models';
// import { PlatformEnum } from 'g13-web-shared/server/enums';
// import { QueryUserVO } from 'g13-web-shared/server/user/models/QueryUserVO';
// import ServerEnvVar from '../../config/ServerEnvVar';
// import { PaginationDTO } from '../../domain/shared/models/PaginationDTO';
//
// const ApiHost = `http://${ServerEnvVar.SkymapApiHost}`;
//
// class UserMaintainUCO {
//     async getUser(uid: string): Promise<UserDTO> {
//         const url = `${ApiHost}/api/users/${uid}`;
//         const params = {
//             pid: PlatformEnum.ElderWand,
//         };
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get<UserDTO>(url, { params })
//                 .then((result) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message);
//                 });
//         });
//     }
//
//     async login(vo: LoginVO): Promise<UserDTO> {
//         const url = `${ApiHost}/api/login`;
//
//         const body = {
//             username: vo.username,
//             password: vo.password,
//             platform_id: PlatformEnum.ElderWand,
//         };
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .post<UserDTO>(url, body)
//                 .then((result) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message);
//                 });
//         });
//     }
//
//     async inviteUser(vo: InviteUserVO): Promise<InviteUserDTO> {
//         const url = `${ApiHost}/api/invite/user`;
//
//         const body = {
//             email: vo.email,
//             role_id: vo.role_id,
//             projectId: vo.projectId,
//             operator_id: vo.operator_id,
//             platform_id: PlatformEnum.ElderWand,
//         };
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .post<InviteUserDTO>(url, body)
//                 .then((result) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.response.data);
//                 });
//         });
//     }
//
//     async getInvitingUser(token: string): Promise<UserDTO> {
//         const url = `${ApiHost}/api/invite/user`;
//
//         const params = {
//             token: token,
//         };
//         console.log(token);
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get(url, { params: params })
//                 .then((result: AxiosResponse<UserDTO>) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.response.data);
//                 });
//         });
//     }
//
//     async register(vo: RegisterVO): Promise<UserDTO> {
//         const url = `${ApiHost}/api/register`;
//
//         const body = {
//             id: vo.id,
//             account_id: vo.account_id,
//
//             username: vo.username,
//             password: vo.password,
//
//             email: vo.email,
//             display_name: vo.display_name,
//             tel: vo.tel,
//             address: vo.address,
//
//             platform_id: PlatformEnum.ElderWand,
//         };
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .post<UserDTO>(url, body)
//                 .then((result) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError<{ message: string }>) => {
//                     reject(err.response.data);
//                 });
//         });
//     }
//
//     async listUser(vo: { platform_id: number }): Promise<UserDTO[]> {
//         const url = `${ApiHost}/api/users`;
//
//         const params = {
//             pid: vo.platform_id,
//         };
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get(url, { params })
//                 .then((result: AxiosResponse<UserDTO[]>) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.response.data);
//                 });
//         });
//     }
//
//     async queryUsers(vo: QueryUserVO): Promise<PaginationDTO<UserDTO>> {
//         const url = `${ApiHost}/api/users`;
//         const params = {
//             ...vo,
//             pid: PlatformEnum.ElderWand,
//         };
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get<PaginationDTO<UserDTO>>(url, { params })
//                 .then((result) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message);
//                 });
//         });
//     }
// }
//
// export default UserMaintainUCO;
export {};
