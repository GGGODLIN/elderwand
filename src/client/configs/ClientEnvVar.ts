interface EnvironmentVariables {
    IsDev: boolean;
    Version: string;
    DomainName: string;
    Host: string;
    TokenKey: string;
}

export const ClientEnvVar: EnvironmentVariables = {
    IsDev: process.env.NODE_ENV !== 'production',
    Version: process.env['VERSION'] || '0.0.0',
    DomainName: process.env['DOMAIN_NAME'] || 'sample.com',
    Host: process.env['HOST'] || 'localhost',
    TokenKey: process.env['TOKEN_KEY'] || 'token',
};

interface DevEnvironmentVariables {
    MigrationSourceMongoUri: string;
    // SkymapApiHost: string;
}

export const DevEnvVar: DevEnvironmentVariables = {
    MigrationSourceMongoUri: process.env['MIGRATION_SOURCE_MONGODB_URI'] || '',
    // SkymapApiHost: process.env['SKYMAP_API_HOST'] || '',
};
