import dotenv from 'dotenv';

export default class DotEnvUtil {
    static loadDotEnvFile(): {
        filePath: string;
        result?: {
            [name: string]: string;
        };
        error?: any;
    } {
        const dotenv_path = process.env.NODE_ENV
            ? `./.env.${process.env.NODE_ENV}`
            : `./.env`;

        const config = dotenv.config({ path: dotenv_path });

        if (config.error != null) {
            return {
                filePath: dotenv_path,
                error: config.error,
            };
        }

        const env = config.parsed;

        for (const k in env) {
            process.env[k] = env[k];
        }

        console.log(`=== Load ${dotenv_path} ===`);
        console.log(
            JSON.stringify(
                {
                    PATH: env.filePath,
                    ...env,
                },
                undefined,
                2
            )
        );

        return {
            filePath: dotenv_path,
            result: { ...env },
        };
    }
}
