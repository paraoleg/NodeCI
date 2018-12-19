const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach( async () => {
    await page.close();
});

test('Logo has a correct name', async () => {
    const text = await page.getContentsOf('a.brand-logo');
    expect(text).toEqual('Blogster')
});

test('Clicking login redirect to OAuth', async () => {
    await page.waitFor('.right a');
    await page.click('.right a');
    const url = await page.url();

    expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
    await page.login();
    
    const text = await page.getContentsOf('a[href="/auth/logout"]');
    expect(text).toEqual('Logout');
});



