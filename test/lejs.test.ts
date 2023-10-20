'use strict';
import {describe, expect, it} from '@jest/globals';
import * as lejs from '..';
import * as fs from "fs";

describe('compiler', function () {
    it('should compile hello world', function () {
        const compiler = lejs.compile('Hello {{world}}', undefined);
        expect(compiler({
            world: 'World'
        })).toBe('Hello World');
    });

    it('should compile hello world from file', function () {
        const rendered = lejs.renderFile(__dirname + '/files/hello.lejs', {
            world: 'World'
        }, undefined);
        expect(rendered).toBe('Hello World');
    })
});

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
        }, undefined);
        const expectedOutput = fs.readFileSync(__dirname + '/files/simplified_output.xml').toString();
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
        }, undefined);
        const expectedOutput = fs.readFileSync(__dirname + '/files/simplified_negative_output.xml')
            .toString();
        expect(rendered).toBe(expectedOutput);
    })
    // node ./dist/bin/cli.js ./test/files/ifstack.txt -i "test=2&test2=1&test3"
    it('should parse IF statements if they stacked inside each other', function () {
        const rendered = lejs.renderFile(__dirname + '/files/ifstack.txt', {
            test: '002',
            test2: '002',
            test3: false
        }, undefined);
        const expectedOutput = fs.readFileSync(__dirname + '/files/ifstack.txt.out')
            .toString();
        expect(rendered).toBe(expectedOutput);
    })
});

describe('Map parser', function () {
    it('should parse XML with map correctly', function () {
        const rendered = lejs.renderFile(__dirname + '/files/map.xml', {
            invoiceNumber: '001',
            invoiceLines: [
                {
                    productCodeCategory: "Category",
                    productCodeValue: "Value",
                },
                {
                    productCodeCategory: "Category2",
                    productCodeValue: "Value2",
                }
            ]
        }, undefined);
        const expectedOutput = fs.readFileSync(__dirname + '/files/map_output.xml').toString();
        expect(rendered).toBe(expectedOutput);
    })
    it('should parse XML with IF statement correctly, negative test', function () {
        const rendered = lejs.renderFile(__dirname + '/files/map.xml', {
            invoiceNumber: '002'
        }, undefined);
        const expectedOutput = fs.readFileSync(__dirname + '/files/map_negative_output.xml')
            .toString();
        expect(rendered).toBe(expectedOutput);
    })
});
