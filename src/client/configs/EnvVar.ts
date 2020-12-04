interface EnvironmentVariables {
    DomainName: string
    Host: string
}

enum EnvEnum {
    DomainName = "DOMAIN_NAME",
    Host = "HOST",
}

export const EnvVar: EnvironmentVariables = {
    DomainName: process.env[EnvEnum.DomainName] || "sample.com",
    Host: process.env[EnvEnum.Host] || "localhost",
}
