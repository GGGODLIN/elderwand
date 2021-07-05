import FileUtil from './FileUtil';
import GoogleSheetUtil from './GoogleSheetUtil';
import path from 'path';
import StringUtil from './StringUtil';
import ServerEnvVar from '../config/ServerEnvVar';

const exportTranslateFile = async (
    locale_folder: string,
    lang: string,
    name: string,
    text: string
) => {
    const position = `${lang}/${name}.json`;

    const full = path.join(locale_folder, position);

    return await FileUtil.createFile(full, text);
};

export default class I18nUtil {
    /**
     * @param  {string} out output locale folder
     * @returns Promise<boolean>
     */
    static async generateIconsLocaleFiles(
        output: string,
        filename: string
    ): Promise<boolean> {
        const key = ServerEnvVar.I18nGoogleSheetID;

        const json = await GoogleSheetUtil.getＳpreadsheet(key);

        if (!json) {
            console.log('Get GoogleSheet Error');
            return false;
        }

        let results = {};

        if (json.feed.title.$t != 'Icon') {
            return new Promise((resolve, reject) => {
                console.error('Sheet name is not Icon');
                return resolve(false);
            });
        }

        json.feed.entry.forEach((cursor) => {
            const cell = cursor['gs$cell'];

            // const title = cursor.content.$t;
            const content = cursor.content.$t;

            if (!results[cell.row]) {
                results[cell.row] = {};
            }

            results[cell.row][cell.col] = {
                content: content,
            };
        });

        // console.log(results);

        const col_len = Object.keys(results[1]).length;
        const row_len = Object.keys(results).length - 1;

        const titles = [];
        const table = {};

        for (let col = 1; col <= col_len; col++) {
            const title = results[1][col].content;

            titles.push(title);

            for (let row = 0; row < row_len; row++) {
                // console.log(col, row);
                const value = results[row + 2][col].content;

                if (!table[row]) {
                    table[row] = {};
                }

                table[row][title] = value;
            }
        }

        // console.log({ titles, table });

        const outs = await Promise.all(
            titles
                .filter((title) => title != 'key')
                .map(async (title) => {
                    let model = {};

                    Object.keys(table).forEach((field) => {
                        let key: string =
                            table[field]['en'] || table[field]['key'];
                        key = StringUtil.toUpperCaseFirstLetter(key);

                        const value = table[field][title];

                        model[key] = value;
                    });

                    const text = JSON.stringify(model);

                    const out = await exportTranslateFile(
                        output,
                        title,
                        filename,
                        text
                    );

                    return out;
                })
        );

        const successful = outs.filter((out) => !out).length == 0;

        return successful;
    }
}
