'use strict';

const lejs = require('..');

describe('compiler', function () {
    it('should compile hello world', function () {
        const compiler = lejs.compile('Hello {{world}}');
        expect(compiler({
            world: 'World'
        })).toBe('Hello World');
    })
})
describe('compiler', function () {
    it('should compile hello world', function () {
        const rendered = lejs.renderFile(__dirname + '/files/hello.lejs', {
            world: 'World'
        });
        expect(rendered).toBe('Hello World');
    })
})