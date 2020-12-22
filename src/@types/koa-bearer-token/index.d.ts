import * as Koa from "koa";

declare module "koa" {
  export interface Request extends Koa.BaseRequest {
    token?: string;
  }
}

declare module 'koa-bearer-token' {
  declare function KoaBearerToken(option?: any): any
}

export default KoaBearerToken;
