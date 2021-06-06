interface ConnectionParams {
    conn: string;
    dbname: string;
    version: string;
}

export default class DataMigrationUtil {
    static getConnectionParams = (): ConnectionParams => {
        const conn = (
            document.querySelector('form #conn-string') as HTMLInputElement
        )?.value;

        const version = (
            document.querySelector('select[name="version"]') as HTMLInputElement
        )?.value;

        const dbname = (
            document.querySelector('form #dbname') as HTMLInputElement
        )?.value;

        return {
            conn,
            dbname,
            version,
        };
    };
}
