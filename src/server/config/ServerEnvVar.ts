import DotEnvUtil from '../utils/DotEnvUtil';
import { version } from '../../../package.json';

enum NodeEnvEnum {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

interface EnvironmentVariables {
    NodeEnv: string;
    CWD: string;
    IsDev: boolean;
    Version: string;
    DomainName: string;
    Host: string;

    Port: number;
    TokenKey: string;
    JwtSecret: string;
    AuthTokenTTL: string;

    SkymapApiHost: string;
    I18nGoogleSheetID: string;
}

let env_file: { [name: string]: string };

function GetServerEnvVar(): EnvironmentVariables {
    if (!env_file) {
        const result = DotEnvUtil.loadDotEnvFile();
        env_file = result.result;
    }

    const env = {
        IsDev: process.env.NODE_ENV != NodeEnvEnum.Production,
        NodeEnv: process.env.NODE_ENV,
        CWD: process.cwd(),

        PlatformID: 3,
        DomainName: (() => process.env['DOMAIN_NAME'] || 'sample.com')(),
        Host: (() => process.env['HOST'])(),
        Port: (() => parseInt(process.env['PORT'], 10) || 3000)(),
        Version: version || '',

        TokenKey: (() => process.env['TOKEN_KEY'] || 'token')(),
        JwtSecret: (() => process.env['JWT_SECRET'] || 'secret')(),
        AuthTokenTTL: (() => process.env['AUTH_TOKEN_TTL'] || '1h')(),

        SkymapApiHost: (() => process.env['SKYMAP_API_HOST'] || 'localhost')(),

        I18nGoogleSheetID: (() => process.env['I18N_GOOGLE_SHEET_ID'] || '')(),
    };

    return env;
}

let ServerEnvVar: EnvironmentVariables = GetServerEnvVar();

export default ServerEnvVar;
