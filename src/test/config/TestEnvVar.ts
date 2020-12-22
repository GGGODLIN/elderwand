

interface TestEnvironmentVariables {
    SkymapWebHost: string
    SkymapApiHost: string
    SkymapAdminAccount: string
    SkymapAdminPassword: string
}

const TestEnvVar: TestEnvironmentVariables = {
    // Jest variable
    SkymapWebHost: process.env["SKYMAP_WEB_HOST"],
    SkymapApiHost: process.env["SKYMAP_API_HOST"],
    SkymapAdminAccount: process.env["SKYMAP_ADMIN_ACCOUNT"],
    SkymapAdminPassword: process.env["SKYMAP_ADMIN_PASSWORD"]
};

export default TestEnvVar
