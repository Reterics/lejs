import {REGEXPS} from "../constants";
import {ParserFunc, ParserRenderOptions} from "../types/parsers";

const renderIfStatement: ParserFunc = (string: string, data: object|null, options: ParserRenderOptions): string => {
    const config = REGEXPS.if;
    const matches = string.match(config.regexp);
    if (matches && matches.length > 0) {
        for (const match of matches) {
            if (match) {
                const localMatches = match.match(/{#(\w*)}}/);
                const name = localMatches && localMatches[1] ? localMatches[1] : null;

                if (data && name && data[name] && data[name] !== "") {
                    const values = match
                        .replaceAll(`${config.start}${name}${config.end}`, '')
                        .replaceAll(`${config.close_start}${name}${config.end}`, '');
                    string = string.replace(match, values);
                } else if (options.defaultValue === 'empty' || options.defaultValue === 'default') {
                    // Remove the matched string from the XML content.
                    string = string.replace(match, '');
                }
            }
        }
    }
    return string;
}

export default renderIfStatement;