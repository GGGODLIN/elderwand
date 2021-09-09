import path from 'path';

const ICON_STATIC_PATH = '/static/icons';
const IMAGE_STATIC_PATH = '/static/images';
const PHOTO_STATIC_PATH = '/static/photos';

const joinPaths = (target: string, value: string | string[]): string => {
    if (Array.isArray(value)) {
        if (!value.length) {
            return '';
        }

        if (value[value.length - 1].indexOf('http') >= 0) {
            return value[value.length - 1];
        }

        return path.join(target, ...(value as string[]));
    }

    if (!value) {
        return '';
    }

    if (value.indexOf('http') >= 0) {
        return value;
    }

    if (value.indexOf(target) >= 0) {
        return value;
    }

    return path.join(target, value);
};

interface Assets {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

class AssetsHelper {
    static generateIcon = (value: Assets): Assets => {
        const path = joinPaths(ICON_STATIC_PATH, value.path);

        return {
            ...value,
            path: path,
        };
    };

    static generateIconPath = (value: string | string[]): string => {
        return joinPaths(ICON_STATIC_PATH, value);
    };

    static generateImagePath = (value: string | string[]): string => {
        return joinPaths(IMAGE_STATIC_PATH, value);
    };

    static generatePhotoPath = (value: string | string[]): string => {
        return joinPaths(PHOTO_STATIC_PATH, value);
    };
}

export default AssetsHelper;
