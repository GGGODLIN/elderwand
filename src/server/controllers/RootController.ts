import { Context } from 'koa';
import DataAccessHelper from '../helpers/DataAccessHelper';

export default class RootController {
    static getServiceInfo = async (ctx: Context) => {
        const vm = DataAccessHelper.getServiceInfo(ctx);

        ctx.status = 200;
        ctx.body = vm;
    };
}
