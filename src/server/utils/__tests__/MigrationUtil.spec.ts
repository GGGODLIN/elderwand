import FileUtil from '../FileUtil';
import MigrationUtil from '../MigrationUtil';
import path from 'path';

describe('Migration Util Test', () => {
    const file_path = `${process.cwd()}/.temp/test/migration`;

    test('get 2.0 brand list to go file', async () => {
        const text = MigrationUtil.getBrandMapToGolang();

        const full = path.join(file_path, 'brands.go');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get 2.0 icons list to text file', async () => {
        const items = MigrationUtil.getIconFiles();

        const text = items.join('\n');

        const full = path.join(file_path, 'icons.txt');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get 2.0 icons list to go file', async () => {
        const text = MigrationUtil.getIconFilesMapToGolang();

        const full = path.join(file_path, 'icons.go');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get 2.0 icons list to cvs file.', async () => {
        const text = MigrationUtil.getIconFilesMapToCVS();

        const full = path.join(file_path, 'icons.txt');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get 2.0 images list to go file', async () => {
        const text = MigrationUtil.getImageFilesMapToGolang();

        const full = path.join(file_path, 'images.go');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get 2.0 device category list to go file', async () => {
        const text = MigrationUtil.getDeviceCategoryMapToGolang();

        const full = path.join(file_path, 'device_categories.go');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });
    test('get 2.0 device type list to go file', async () => {
        const text = MigrationUtil.getDeviceTypeMapToGolang();

        const full = path.join(file_path, 'device_types.go');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get 2.0 device model list to go file', async () => {
        // const text = MigrationUtil.getDeviceModelMapToGolang()
        // const full = path.join(file_path, "device_models.go");
        // const actual = await FileUtil.createFile(full, text);
        // expect(actual).toBeTruthy();
        // ThingsSchema
    });
});
