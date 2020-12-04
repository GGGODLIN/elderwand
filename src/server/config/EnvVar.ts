
enum NodeEnvEnum {
    Production = 'production',
    Development = 'development',
    Test = 'test',
}

enum EnvEnum {
    DomainName = "DOMAIN_NAME",
    Host = "HOST",
    Port = "PORT",
    Version = "VERSION"
}

interface EnvironmentVariables {
    CWD: string
    NodeEnv: string
    IsDev: boolean
    Version: string
    DomainName: string
    Host: string
    Port: number
}

export const EnvVar: EnvironmentVariables = {
    IsDev: process.env.NODE_ENV != NodeEnvEnum.Production,
    NodeEnv: process.env.NODE_ENV,
    CWD: process.cwd(),
    DomainName: process.env[EnvEnum.DomainName] || "sample.com",
    Host: process.env[EnvEnum.Host],
    Port: parseInt(process.env[EnvEnum.Port], 10) || 3000,
    Version: process.env[EnvEnum.Version] || ''
}
