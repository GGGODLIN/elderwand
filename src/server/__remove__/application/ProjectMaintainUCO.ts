import axios, { AxiosError } from 'axios';
// import { PaginationDTO } from '../../domain/shared/models/PaginationDTO';
// import { ServerEnvVar } from '../../config/ServerEnvVar';
//
// const ApiHost = `http://${ServerEnvVar.SkymapApiHost}`
//
// export interface CreateProjectVO {
//     cloud_code_id: number;
//     code: string;
//     expire_date: number;
//     name: string;
//     // owner_id: string; // TODO from login user
// }
//
// export interface GetProjectVO {
//     id?: string
//     code?: string
// }
//
// export interface QueryProjectVO {
//     limit: number;
//     offset: number;
// }
//
// export const CloudCode = {
//     BlackHole: 1,
//     AliLiving: 2,
//     Tencent: 3,
//     Huawai: 4,
//     AWS: 5,
//     Azure: 6,
//     GoogleCloud: 7,
//     Jinmao: 8,
// }
//
// export interface AssignUserVO {
//     projects: string[]
//     users: string[]
//     operator: string
// }
//
// class ProjectMaintainUCO {
//
//     async generateProjectCode(vo: any): Promise<{ code: string }> {
//
//         const url = `${ApiHost}/api/project/code/generate`;
//         const params = {}
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get<{ code: string }>(url, { params })
//                 .then((result) => {
//                     resolve(result.data)
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message)
//                 });
//         })
//     }
//
//     async create(vo: CreateProjectVO): Promise<ProjectDTO> {
//
//         const url = `${ApiHost}/api/projects`;
//         const body = {
//             ...vo,
//         }
//
//         console.log(body);
//         return new Promise(function (resolve, reject) {
//             axios
//                 .post<ProjectDTO>(url, body)
//                 .then((result) => {
//                     resolve(result.data)
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message)
//                 });
//         })
//     }
//
//     async get(vo: GetProjectVO): Promise<ProjectDTO> {
//
//         // TODO get project by code
//         const url = `${ApiHost}/api/projects/${vo.id}`;
//
//         const params = {}
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get<ProjectDTO>(url, { params })
//                 .then((result) => {
//                     resolve(result.data)
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message)
//                 });
//         })
//     }
//
//     async assignUserToProjectGroup(vo: AssignUserVO): Promise<any> {
//
//         const url = `${ApiHost}/api/project/group/user`;
//         const body = { ...vo }
//
//         console.log(body);
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .post<any>(url, body)
//                 .then((result) => {
//                     resolve(result.data)
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message)
//                 });
//         })
//     }
//
//     async query(vo: QueryProjectVO): Promise<PaginationDTO<ProjectDTO>> {
//
//         const url = `${ApiHost}/api/projects`;
//         const params = {
//             ...vo,
//         }
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get<PaginationDTO<ProjectDTO>>(url, { params })
//                 .then((result) => {
//                     resolve(result.data)
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.message)
//                 });
//         })
//     }
// }
//
// export default ProjectMaintainUCO
export {};
