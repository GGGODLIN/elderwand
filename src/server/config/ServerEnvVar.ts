import { version } from '../../../package.json';

enum NodeEnvEnum {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

interface EnvironmentVariables {
    NodeEnv: string
    CWD: string
    IsDev: boolean
    Version: string
    DomainName: string
    Host: string
    Port: number
    TokenKey: string
    JwtSecret: string
    SkymapApiHost: any;
}

export const ServerEnvVar: EnvironmentVariables = {
    IsDev: process.env.NODE_ENV != NodeEnvEnum.Production,
    NodeEnv: process.env.NODE_ENV,
    CWD: process.cwd(),
    DomainName: process.env["DOMAIN_NAME"] || "sample.com",
    Host: process.env["HOST"],
    Port: parseInt(process.env["PORT"], 10) || 3000,
    Version: version || "",
    // Version: process.env.VERSION || ""
    TokenKey: process.env["TOKEN_KEY"] || 'token',
    JwtSecret: process.env["JWT_SECRET"] || 'secret',
    SkymapApiHost: process.env["SKYMAP_API_HOST"] || "localhost"
}
