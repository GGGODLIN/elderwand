import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import RequestToken from '../domain/shared/types/RequestToken';

export interface JwtDTO<T> {
    data: T;
    iat?: number;
    exp?: number;
}

interface AuthDTO {
    id: string;
    username: string;
}

export interface AuthJwtDTO extends JwtDTO<AuthDTO> {}

export default class AuthUtil {
    static AuthHeader = 'authorization';

    static newBearer(token: string): string {
        return `Bearer ${token}`;
    }

    static parseBearer(bearer: string): string {
        try {
            if (bearer.indexOf('Bearer') >= 0) {
                return bearer.slice(7);
            }
            return bearer;
        } catch {
            return '';
        }
    }

    static getToken(
        ctx: Context & RequestToken,
        key: string = 'token'
    ): string | undefined {
        let token = ctx.request.token;

        if (!!token) {
            return token;
        }

        if (!ctx.state.isApi) {
            token = ctx.cookies.get(key);
        }

        return token;
    }

    /**
     * @param  {any} payload
     * @param  {string} secret
     * @param  {number|string} ttl Eg: 60, "2 days", "10h", "7d", default '1h'
     */
    static sign(payload: any, secret: string, ttl: number | string = '1h') {
        let token = jwt.sign(
            {
                data: payload,
            },
            secret,
            { expiresIn: ttl }
        );

        return token;
    }

    static verify(token: string, secret: string): boolean {
        return !!AuthUtil.decode(token, secret);
    }

    static decode(token: string, secret: string): AuthJwtDTO {
        if (token == '' || typeof token == 'undefined') {
            return undefined;
        }

        try {
            const decoded = jwt.verify(token, secret) as AuthJwtDTO;

            return decoded;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}
