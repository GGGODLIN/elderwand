import * as Dotenv from 'dotenv';

export default class TestUtil {
    static loadDotEnv() {
        const name = '.env.test';

        const file_path = `${process.cwd()}/${name}`;

        const output = Dotenv.config({ path: file_path });

        console.log(output);

        return output.parsed;
    }
}
