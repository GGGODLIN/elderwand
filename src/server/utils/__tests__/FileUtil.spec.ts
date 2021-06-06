import FileUtil from '../FileUtil';

describe('Test FileUtil', () => {
    test('path should be exist.', async () => {
        const root = process.cwd();
        const full = `${root}/.temp/`;

        const actual = await FileUtil.isExist(full);

        expect(actual).toBeTruthy();
    });

    test('path should be exist.', async () => {
        const root = process.cwd();
        const full = `${root}/.temp/not-exist`;

        const actual = await FileUtil.isExist(full);

        expect(actual).toBeFalsy();
    });

    test('creating should be successful.', async () => {
        const root = process.cwd();
        const name = 'file.json';
        const full = `${root}/.temp/unittest/${name}`;

        const actual = await FileUtil.createFile(full, `test-${Date.now()}`);

        expect(actual).toBeTruthy();
    });

    test('remove file should be successful.', async () => {
        const root = process.cwd();
        const name = 'file.json';
        const full = `${root}/.temp/${name}`;

        const result = await FileUtil.createFile(full, `test-${Date.now()}`);

        if (result) {
            const actual = await FileUtil.removeFile(full);
            expect(actual).toBeTruthy();
        }
    });
});
