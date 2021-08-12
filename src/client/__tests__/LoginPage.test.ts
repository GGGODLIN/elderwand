import { ClientFunction, Selector } from 'testcafe';
import TestUtil from '../../test/utils/TestUtil';

const config = TestUtil.loadDotEnv();

let host = config['ELDERWAND_WEB_HOST'];
const username = config['SKYMAP_ADMIN_ACCOUNT'];
const password = config['SKYMAP_ADMIN_PASSWORD'];

fixture('Login')
    .before(async (ctx) => {})
    .page(host);

test('login should be successful', async function (t) {
    const getLocation = ClientFunction(() => document.location.href.toString());
    const checkbox = Selector('[type="checkbox"][value="remember"]');

    await t
        .navigateTo(`/login`)
        .expect(getLocation())
        .contains('login', { timeout: 10000 })
        // .typeText('[name="username"]', username)
        // .typeText('[name="password"]', password)
        .click(checkbox)
        .expect(checkbox.checked)
        .ok()
        .click('[type="submit"]')
        .expect(getLocation())
        .notContains('login')
        .expect(getLocation())
        .contains('admin', { timeout: 10000 });
});

export {};
