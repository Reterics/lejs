'use strict';

const lejs = require('..');
const {readFileSync} = require("fs");

describe('compiler', function () {
    it('should compile hello world', function () {
        const compiler = lejs.compile('Hello {{world}}');
        expect(compiler({
            world: 'World'
        })).toBe('Hello World');
    });

    it('should compile hello world from file', function () {
        const rendered = lejs.renderFile(__dirname + '/files/hello.lejs', {
            world: 'World'
        });
        expect(rendered).toBe('Hello World');
    })
})
describe('if parser', function () {
    it('should parse XML with IF statement correctly', function () {
        const rendered = lejs.renderFile(__dirname + '/files/simplified.xml', {
            invoiceNumber: '001',
            invoiceIssueDate: '2023-10-14',
            customerVatStatus: 'DOMESTIC',
            customerTaxNumber: '56666666-1-40',
            customerTaxpayerId: '56666666',
            customerVatCode: '1',
            customerCountyCode: '40',
        });
        const expectedOutput = readFileSync(__dirname + '/files/simplified_output.xml').toString();
        expect(rendered).toBe(expectedOutput);
    })
    it('should parse XML with IF statement correctly, negative test', function () {
        const rendered = lejs.renderFile(__dirname + '/files/simplified.xml', {
            invoiceNumber: '001',
            invoiceIssueDate: '2023-10-14',
            customerVatStatus: 'DOMESTIC',
            customerTaxNumber: null,
            customerTaxpayerId: '56666666',
            customerVatCode: '1',
            customerCountyCode: '40',
        });
        const expectedOutput = readFileSync(__dirname + '/files/simplified_negative_output.xml')
            .toString();
        expect(rendered).toBe(expectedOutput);
    })
})