import StringUtil from '../StringUtil';

describe('String Util Test', () => {
    test('first letter should be upper case', (): void => {
        const target = 'test world 1234!';

        const expected = 'TestWorld1234!';

        const actual = StringUtil.toUpperCaseFirstLetter(target);

        expect(actual).toEqual(expected);
    });

    test('letter should be kebab case', (): void => {
        const target = 'Test World 1234!';

        const expected = 'test-world-1234!';

        const actual = StringUtil.toKebabCase(target);

        expect(actual).toEqual(expected);

        console.log({ target, actual, expected });
    });

    test('split text should be text with splitter', (): void => {
        const target = 'TestWorld1234!';

        const expected = 'Test World 1234!';

        const pattern = /[A-Z]|\d+/g;
        const splitter = ' ';

        const actual = StringUtil.split(target, pattern, splitter);

        expect(actual).toEqual(expected);

        console.log({ target, actual, expected });
    });
});
