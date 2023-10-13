'use strict';
/**
 * Lionel Embedded JavaScript Templates (LeJS)
 * Copyright (C) 2023 Attila Reterics
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @package    Reterics/lejs
 * @author     Attila Reterics
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL
 * @copyright  (C) 2023 Attila Reterics, attila@reterics.com
 */

const lejs = require('..');
const args = process.argv.slice(2);
const fs = require('fs');
const usage = fs.readFileSync(`${__dirname}/../usage.txt`).toString();

function printUsage() {
    console.log(usage);
}

function parseArgs() {
    const options = {
        output: undefined,
        dataFile: undefined,
        dataInput: undefined,
    };
    let templateFile = null;

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];

        switch (arg) {
            case '-o':
            case '--output-file':
                options.output = args[i + 1];
                i++; // Skip the next argument (output file path)
                break;
            case '-f':
            case '--data-file':
                options.dataFile = args[i + 1];
                i++; // Skip the next argument (data file path)
                break;
            case '-i':
            case '--data-input':
                options.dataInput = args[i + 1];
                i++; // Skip the next argument (data input string)
                break;
            case '-h':
            case '--help':
                printUsage();
                process.exit(0);
                break;
            case '-v':
            case '--version':
                console.log('LeJS version: ' + lejs.version);
                process.exit(0);
                break;
            default:
                if (!templateFile) {
                    templateFile = arg;
                }
                break;
        }
    }

    if (!templateFile) {
        console.error('Error: template file is required.');
        printUsage();
        process.exit(1);
    }

    return { templateFile, options };
}

function main() {
    const { templateFile, options } = parseArgs();

    let data = {};

    if (options.dataFile) {
        const dataFileContent = fs.readFileSync(options.dataFile, 'utf8');
        data = JSON.parse(dataFileContent);
    } else if (options.dataInput) {
        const queryString = decodeURI(options.dataInput);
        const keyValuePairs = queryString.split('&');
        keyValuePairs.forEach((pair) => {
            const [key, value] = pair.split('=');
            data[key] = decodeURIComponent(value);
        });
    }

    try {
        const templateContent = fs.readFileSync(templateFile, 'utf8');
        const rendered = lejs.render(templateContent, data);

        if (options.output) {
            fs.writeFileSync(options.output, rendered, 'utf8');
        } else {
            console.log(rendered);
        }
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();