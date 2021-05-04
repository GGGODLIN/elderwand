import StringUtil from '../StringUtil';

describe('String Util Test', () => {

    test('first letter should be upper case', (): void => {

        const target = "test world 1234!";

        const expected = "TestWorld1234!"

        const actual = StringUtil.toUpperCaseFirstLetter(target);

        expect(actual).toEqual(expected);
    });

});
