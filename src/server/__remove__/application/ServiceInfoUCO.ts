// import axios, { AxiosError, AxiosResponse } from 'axios';
// import { InfoDTO } from '../../domain/info/InfoDTO';
// import { ServerEnvVar } from '../../config/ServerEnvVar';
//
// const ApiHost = `http://${ServerEnvVar.SkymapApiHost}`;
//
// export class ServiceInfoUCO {
//     async GetInfo(): Promise<InfoDTO> {
//         const url = `${ApiHost}/api/info`;
//
//         return new Promise(function (resolve, reject) {
//             axios
//                 .get(url)
//                 .then((result: AxiosResponse<InfoDTO>) => {
//                     resolve(result.data);
//                 })
//                 .catch((err: AxiosError) => {
//                     reject(err.response.data);
//                 });
//         });
//     }
// }
export {};
