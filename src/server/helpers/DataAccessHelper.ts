import { Context } from 'koa';
import ServiceInfoVM from '../models/ServiceInfoVM';

export default class DataAccessHelper {
    static getServiceInfo(ctx: Context): ServiceInfoVM {
        return {
            name: 'ElderWand Service',
            version: '2021.1.0',
            from: ctx.request.ip,
            time: Date.now(),
            userAgent: ctx.headers['user-agent'] || null,
        };
    }
}
