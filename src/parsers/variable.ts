import {REGEXPS} from "../constants";
import {ParserFunc} from "../types/parsers";


const renderVariable: ParserFunc = (string: string, data: object|null): string => {
    const config = REGEXPS.variable;
    return string.replaceAll(config.regexp, (substr) => {
        const variable = substr.substring(config.start.length, substr.length - config.end.length);
        if (data && data.hasOwnProperty(variable)) {
            return data[variable];
        }
        return "";
    });
}
export default renderVariable;
