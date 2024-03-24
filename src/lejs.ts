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
'use strict';
import * as fs from 'fs'
import * as path from 'path'
import Parser from "./parsers";


export function render (string: string, data, options: object|undefined) {
    const parser = new Parser({cache: false});
    return parser.render(string, data);
}

export function renderFile (file: string, data: object|undefined, options: object|undefined) {
    let content;
    try {
        if (fs.existsSync(file)) {
            content = fs.readFileSync(file).toString();
        } else if (fs.existsSync(path.resolve(__dirname, file))) {
            content = fs.readFileSync(path.resolve(__dirname, file)).toString();
        } else if (fs.existsSync(path.resolve(process.cwd(), file))) {
            content = fs.readFileSync(path.resolve(process.cwd(), file)).toString();
        }
    }catch (e) {
        console.error(e);
    }
    return render(content, data, options);
}

export function compile (string: string, options: object|undefined) {
    return (data) => {
        return render (string, data, options);
    };
}


export const version = typeof process !== 'undefined' && process.env.npm_package_version
    ? process.env.npm_package_version : '1.0.0';
