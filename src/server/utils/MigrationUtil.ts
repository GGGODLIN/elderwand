import StringUtil from './StringUtil';
import { Brand, Brands } from './fixture/Brand';
import { Device, ThingsSchema } from './fixture/ThingsSchema';
import { DeviceCategories, DeviceCategory } from './fixture/DeviceCategory';
import { DeviceType, DeviceTypes } from './fixture/DeviceType';
import { getIconTypeName, Icons } from './fixture/Icons';
import { Images } from './fixture/Images';

export default class MigrationUtil {

    static getIconFiles(): string[] {
        const items = Icons.map((icon) => {
            const file_name = icon.replace(/\.\w+[\w]$/, "");
            let name = getIconTypeName(icon);

            if (name == "") {
                name = file_name;
            }

            return `${icon}\t ${name}`
        });

        return items
    }

    static getIconFilesMapToGolang(): string {

        const text = Icons.map((icon) => {
            const file_name = icon.replace(/\.\w+[\w]$/, "");
            let name = getIconTypeName(icon);

            if (name == "") {
                name = file_name;
            }

            return `    "${icon}": "${name}"`
        }).join(",\n") + ",";

        const content = `package icons\n\nvar IconsMap = map[string]string{\n${text}\n}`

        return content;
    }

    static getIconFilesMapToCVS(): string {

        const text = Icons.map((icon) => {
            const name = icon.replace(/\.\w+[\w]$/, "");
            let value = getIconTypeName(icon);

            if (value == "") {
                value = name;
            }

            return `${name},${value}`
        }).join("\n");

        return text
    }

    static getImageFilesMapToGolang(): string {

        const text = Images.map((filename) => {
            const name = filename.replace(/\.\w+[\w]$/, "");

            return `    "${filename}": "${name}"`
        }).join(",\n") + ",";

        const content = `package default_variables\n\nvar ImagesMap = map[string]string{\n${text}\n}`

        return content;
    }

    static getDeviceCategoryMapToGolang(): string {

        const text = DeviceCategories.map((item: DeviceCategory) => {

            const name = StringUtil.toUpperCaseFirstLetter(item.en)

            const tpl = `
    "${item.value}": {
        ID: "${item.value}",
        Value: "${name}",
        Name: "${item.en}",
    }`;
            return tpl
        }) + ",";

        const content = `package default_variables

type DeviceCategory struct{
    ID    string
    Value string
    Name  string
}

var DeviceCategoryMap = map[string]DeviceCategory{${text}\n}`;

        return content;
    }

    static getDeviceTypeMapToGolang(): string {

        const text = DeviceTypes.map((item: DeviceType) => {

            const name = StringUtil.toUpperCaseFirstLetter(item.en)

            const tpl = `
    ${item.value}: {
        ID: ${item.value},
        Value: "${name}",
        Name: "${item.en}",
        Category: "${item.category}",
    }`;
            return tpl
        }) + ",";

        const content = `package default_variables

type DeviceType struct{
    ID    uint
    Value string
    Name  string
    Category string
}

var DeviceTypeMap = map[int]DeviceType{${text}\n}`;

        return content;
    }

    // static getDeviceModelMapToGolang(): string {
    //     return ""
    // }

    /**
     * @returns string
     * @summary map key is brand of origin field
     */
    static getBrandMapToGolang(): string {

        const brands_map = {};

        for (const brand of Brands) {
            brands_map[brand.Name_en_US] = brand
        };

        const items = Object.keys(brands_map).map((key) => brands_map[key]);

        const text = items.map((item: Brand) => {

            const name = StringUtil.toPascalCase(item.Name_en_US)

            const tpl = `
    "${item.brand}": {
        ID: "${name}",
        Value: "${name}",
        Name: "${item.Name_en_US}",
    }`;
            return tpl
        }) + ",";

        const content = `package default_variables

type Brand struct{
    ID    string
    Value string
    Name  string
}

var BrandMap = map[string]Brand{${text}\n}`;

        return content;
    }
}

// const list
function getDeviceModelList(): { id: string, name: string }[] {
    const devices = getDeviceList();

    let model_map = {}

    for (const device of devices) {

        if (model_map[device.model]) {
            continue
        }

        const name = device.dispName.replace(device.model, "").replace("/", "");
        model_map[device.model] = { id: device.model, name: name }
    }

    const list = Object.keys(model_map).map((key) => {
        return model_map[key];
    });

    return list;
}

function getDeviceList(): Device[] {

    let list = [];

    for (const item of ThingsSchema) {
        if (item["deviceList"]) {
            list = item["deviceList"];
            break;
        }
    }
    return list
}
