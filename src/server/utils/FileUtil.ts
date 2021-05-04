import fs from 'fs';
import path from 'path';

class FileUtil {

    static isExist = (path: string): Promise<boolean> => {

        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stat) => {
                if (err != null) {
                    // console.log(err);
                    return resolve(false)
                }
                return resolve(true)
            })
        })
    }

    static createFile = async (full: string, content: string): Promise<boolean> => {

        const parsed = path.parse(full)

        const exist = await FileUtil.isExist(parsed.dir)

        if (!exist) {

            await new Promise<boolean>((resolve, reject) => {
                fs.mkdir(parsed.dir, { recursive: true }, (err, path) => {
                    if (err != null) {
                        console.log(err);
                        return resolve(false);
                    }
                    return resolve(true);
                });
            })
        }

        return new Promise<boolean>((resolve, reject) => {

            fs.unlink(full, (err) => {
                fs.writeFile(full, content, (err) => {
                    if (err != null) {
                        console.log(err);
                        return resolve(false);
                    }
                    return resolve(true);
                });
            })
        })

    }

    static removeFile = async (full: string): Promise<boolean> => {

        const parsed = path.parse(full)

        const dir_exist = await FileUtil.isExist(parsed.dir)

        return new Promise((resolve, reject) => {
            if (!dir_exist) {
                return resolve(true)
            }

            fs.unlink(full, (err) => {
                if (err != null) {
                    console.log(err);
                    return resolve(false)
                }
                return resolve(true)
            })
        });

    }
}

export default FileUtil;
