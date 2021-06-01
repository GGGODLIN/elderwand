interface TestEnvironmentVariables {
    SkymapWebHost: string;
    SkymapApiHost: string;
    SkymapAdminAccount: string;
    SkymapAdminPassword: string;

    MigrationSourceMongodbUri: string;
    MigrationMongodbSake: string;
    MigrationMongodbThings: string;
    MigrationTargetProjectCode: string;

    NewTargetProjectCode: string;

    GatewayClientIP: string;
    GatewayConnectionID: string;
}

const TestEnvVar: TestEnvironmentVariables = {
    // Jest variable
    SkymapWebHost: process.env['SKYMAP_WEB_HOST'],
    SkymapApiHost: process.env['SKYMAP_API_HOST'],
    SkymapAdminAccount: process.env['SKYMAP_ADMIN_ACCOUNT'],
    SkymapAdminPassword: process.env['SKYMAP_ADMIN_PASSWORD'],

    MigrationSourceMongodbUri: process.env['MIGRATION_SOURCE_MONGODB_URI'],
    MigrationMongodbSake: process.env['MIGRATION_MONGODB_SAKE'],
    MigrationMongodbThings: process.env['MIGRATION_MONGODB_THINGS'],
    MigrationTargetProjectCode: process.env['MIGRATION_TARGET_PROJECT_CODE'],

    NewTargetProjectCode: process.env['NEW_TARGET_PROJECT_CODE'],

    GatewayClientIP: process.env['GATEWAY_CLIENT_IP'],
    GatewayConnectionID: process.env['GATEWAY_CONNECTION_ID'],
};

export default TestEnvVar;
