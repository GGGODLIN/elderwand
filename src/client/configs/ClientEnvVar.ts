interface EnvironmentVariables {
    IsDev: boolean;
    Version: string
    DomainName: string
    Host: string
}

export const ClientEnvVar: EnvironmentVariables = {
    IsDev: process.env.NODE_ENV !== "production",
    Version: process.env["VERSION"] || '0.0.0',
    DomainName: process.env["DOMAIN_NAME"] || "sample.com",
    Host: process.env["HOST"] || "localhost",
}
