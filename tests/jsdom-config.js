/**
 *  Create by appleex on 2022/4/15 6:25 下午.
 */
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><body></body>', {
    url: 'http://localhost/',
    referrer: 'https://example.com/',
    contentType: 'text/html',
    userAgent: 'Mellblomenator/9000',
    includeNodeLocations: true,
    storageQuota: 10000000,
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
