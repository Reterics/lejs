import {ParserFunc, ParserRenderOptions} from "../types/parsers";
import {REGEXPS} from "../constants";
import renderVariable from "./variable";


const renderMap: ParserFunc = (string: string, data: object|null, options: ParserRenderOptions): string => {
    const config = REGEXPS.map;

    if (config.start_regexp) {
        const matches = string.match(config.start_regexp) || [];
        while (matches.length) {
            const starterTag = matches.pop();
            if (starterTag) {
                const lastIndex = string.lastIndexOf(starterTag);
                const startLength = config.start.length;

                const closingTag = (config.close_start || config.start) +
                        starterTag.substring(startLength),
                    closingPosition = string.indexOf(closingTag, lastIndex),
                    closingPositionEnd = closingPosition + closingTag.length;

                const name = starterTag.substring(startLength, starterTag.length - config.end.length);

                const start = string.substring(0, lastIndex);
                const end = string.substring(closingPositionEnd);

                if (data && name && data[name] && data[name] !== "" ) {
                    const content = string.substring(lastIndex + starterTag.length, closingPosition);

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
                    string = start + generated.join('') + end;
                } else if (options.defaultValue === 'empty' || options.defaultValue === 'default') {
                    // Remove the matched string from the XML content.
                    string = start + end;
                }
            }
        }
    }
    return string;
};

export default renderMap;