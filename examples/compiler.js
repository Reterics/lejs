'use strict';

const lejs = require('..');

const fn = lejs.compile('{{example}}');
console.log(fn({example: 'This is an example text'}));