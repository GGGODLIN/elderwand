export default class RouterHandleMiddleware {
    static handleApiRouter = async (ctx, next) => {
        ctx.state.isApi = ctx.request.URL.pathname.indexOf('/api/') >= 0;

        if (ctx.state.isApi == false) {
            await next();
            return;
        }

        try {
            await next();

            ctx.status = ctx.response.status;

            switch (ctx.status) {
                case 404:
                    ctx.body = {
                        message: 'Not Found.',
                    };
                    break;

                case 200:
                    ctx.body = ctx.body || {
                        message: 'OK.',
                    };
                    break;

                default:
                    ctx.body = ctx.body || {};
                    break;
            }
        } catch (error) {
            ctx.status = error.statusCode || error.status || 500;
            ctx.body = {
                message: error.message,
            };
        }

        return;
    };
}
