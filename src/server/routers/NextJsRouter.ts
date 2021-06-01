export default class NextJsRouter {
    static getPageRouter = (handle) => {
        return async (ctx, next) => {
            await next();

            if (ctx.state.isApi) {
                return;
            }

            await handle(ctx.req, ctx.res);
            ctx.response = false;
        };
    };
}
