import I18nUtil from '../I18nUtil';

describe('I18n Util Test', () => {
    // TODO google sheet json share url has problem.
    test.skip('icons convert to new model from old version source code.', async () => {
        const root = process.cwd();

        const locale = `${root}/.temp/locale`;

        const filename = 'IconName';

        const actual = await I18nUtil.generateIconsLocaleFiles(
            locale,
            filename
        );

        expect(actual).toBeTruthy();
    });
});
