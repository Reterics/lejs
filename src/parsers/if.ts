import {REGEXPS} from "../constants";
import {ParserFunc, ParserRenderOptions} from "../types/parsers";

const renderIfStatement: ParserFunc = (string: string, data: object|null, options: ParserRenderOptions): string => {
    const config = REGEXPS.if;
    if (config.start_regexp) {
        const matches = string.match(config.start_regexp) || [];
        while (matches.length) {
            const starterTag = matches.pop();
            if (starterTag) {
                const lastIndex = string.lastIndexOf(starterTag);
                const isNegated = starterTag.startsWith(config.start + '!');
                const startLength = isNegated ? config.start.length + 1 :
                    config.start.length

                const closingTag = (config.close_start || config.start) +
                    starterTag.substring(startLength),
                    closingPosition = string.indexOf(closingTag, lastIndex),
                    closingPositionEnd = closingPosition + closingTag.length;

                const name = starterTag.substring(startLength, starterTag.length - config.end.length);

                const start = string.substring(0, lastIndex);
                const end = string.substring(closingPositionEnd);

                if (data && name &&
                    (!isNegated && data[name] && data[name] !== "" || isNegated && (!data[name] ||
                        data[name] === 'false'))
                ) {
                    const content = string.substring(lastIndex + starterTag.length, closingPosition);

                    string = start + content + end;
                } else if (options.defaultValue === 'empty' || options.defaultValue === 'default') {
                    // Remove the matched string from the XML content.
                    string = start + end;
                }
            }
        }
    }

    return string;
}

export default renderIfStatement;