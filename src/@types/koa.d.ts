import { BaseRequest, ParameterizedContext } from 'koa';

declare module "koa" {
    export interface Request extends BaseRequest {
        body?: any;
    }
}
