import path from 'path';
import FileUtil from '../FileUtil';
import knxDataFormat, { DptDescriptionMap } from '../fixture/KNXDataFormat';
import MigrationUtil from '../MigrationUtil';

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

    test('get 2.0 space templates to go file', async () => {
        const text = MigrationUtil.getSpaceTemplateMapToGolang();

        const full = path.join(file_path, 'space_templates.go');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get KNX function list', async () => {
        const functions = knxDataFormat.fun2dps.map((func) => {
            return {
                funId: func.funId,
                dpts: func.dpts,
                unit: func.valueStyle.unit,
            } as {
                funId: string;
                dpts: string[];
                unit?: string;
            };
        });

        console.log(functions);
    });

    test('get KNX DPT list', async () => {
        const map = DptDescriptionMap;

        const dpts = knxDataFormat.dptInfo.map((dpt) => {
            type ValueKey = 'value';
            type ValueType = 'boolean';

            return {
                dpt: dpt.dpt,
                name: dpt.name,
                createdRT: dpt.createdRT || [],
                rt: dpt.rt,
                valueKey: dpt.valueKey,
                valueType: dpt.valueType,
                desc: DptDescriptionMap[dpt.desc_zh_CN]?.en || '',
            } as {
                dpt: string;
                name: string;
                createdRT?: string;
                rt?: string[];
                valueKey?: ValueKey;
                valueType?: ValueType;
                // desc_zh_CN: string;
                desc: string;
            };
        });

        console.log(dpts);

        // const descs = dpts.filter((dpt) => !!dpt.desc).map((dpt) => dpt.desc);
        // console.log(descs.join('\r\n'));
    });

    test('get KNX FlagRule Map to ts file', async () => {
        const text = MigrationUtil.getKNXFlagMapToJson();

        const full = path.join(file_path, 'KNX_flag_rules.json');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });

    test('get KNX FlagRule Map to ts file', async () => {
        const text = MigrationUtil.getKNXFlagMapToTypeScript();

        const full = path.join(file_path, 'KNXFlagRules.ts');

        const actual = await FileUtil.createFile(full, text);

        expect(actual).toBeTruthy();
    });
});
