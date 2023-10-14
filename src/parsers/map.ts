import {ParserFunc, ParserRenderOptions} from "../types/parsers";
import {REGEXPS} from "../constants";
import renderVariable from "./variable";


const renderMap: ParserFunc = (string: string, data: object|null, options: ParserRenderOptions): string => {
    const config = REGEXPS.map;
    const matches = string.match(config.regexp);

    if (matches && matches.length > 0) {
        for (let match of matches) {
            if (match) {
                const localMatches = match.match(/{>(\w*)}}/);
                const name = localMatches && localMatches[1] ? localMatches[1] : null;

                if (name && data && data[name]) {
                    const content = match.replaceAll(`${config.start}${name}${config.end}`, '')
                        .replaceAll(`${config.close_start}${name}${config.end}`, '');
                    let generated: string[] = [];

                    if (Array.isArray(data[name])) {
                        generated = data[name].reduce((array, variable) => {
                            if (variable.index === undefined) {
                                variable.index = array.length;
                            }
                            array.push(renderVariable(content, variable, {
                                config: REGEXPS.map_variable,
                                defaultValue: 'default'
                            }));
                            return array;
                        }, []);
                    } else if (typeof data[name] === "object") {
                        for (const key in data[name]) {
                            if (data[name].hasOwnProperty(key)) {
                                const variable = data[name][key];
                                if (variable.index === undefined) {
                                    variable.index = key;
                                }
                                generated.push(renderVariable(content, variable, {
                                    config: REGEXPS.map_variable,
                                    defaultValue: 'default'
                                }));
                            }
                        }
                    }
                    string = string.replace(match, generated.join(''));
                } else if (options.defaultValue === 'empty' || options.defaultValue === 'default') {
                    // Remove the matched string from the XML content.
                    string = string.replace(match, '');
                }
            }
        }
    }
    return string;
};

export default renderMap;