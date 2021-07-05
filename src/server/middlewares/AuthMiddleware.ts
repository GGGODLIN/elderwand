import ServerEnvVar from '../config/ServerEnvVar';
import AuthUtil from '../utils/AuthUtil';

function matchesPath(url: URL, opts: { path: any }) {
    const paths =
        !opts.path || Array.isArray(opts.path) ? opts.path : [opts.path];

    if (paths) {
        return paths.some(function (path: string | RegExp) {
            return (
                (typeof path === 'string' && path === url.pathname) ||
                (path instanceof RegExp && !!path.exec(url.pathname))
            );
        });
    }

    return false;
}

export default class AuthorizeMiddleware {
    static getAuthorizeRouterHandler = (
        key: string,
        secret: string,
        whitelist: RegExp[] | string[]
    ) => {
        return async (ctx, next) => {
            const token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);

            const verify = AuthUtil.verify(token, secret);

            if (verify) {
                // console.log("Auth Verify");
                return next();
            }

            const skip = matchesPath(ctx.request.URL, { path: whitelist });

            if (skip) {
                // console.log("Auth SKIP");
                return next();
            }

            // console.log("Auth Middleware unauthorized");
            ctx.status = 401;
            ctx.cookies.set(key, '', { maxAge: -1 });

            if (!ctx.state.isApi) {
                ctx.redirect('/login');
            }

            return;
        };
    };
}
