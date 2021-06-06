export function groupBy(key: string | number): Function {
    return function group(array: any[]) {
        if (!Array.isArray(array)) {
            // array = [];
            return {};
        }

        return array.reduce((acc, obj) => {
            const property = obj[key];
            acc[property] = acc[property] || [];
            acc[property].push(obj);
            return acc;
        }, {});
    };
}
