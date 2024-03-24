import {REGEXPS} from "../constants";
import {ParserConstant, ParserFunc, ParserRenderOptions} from "../types/parsers";


const renderVariable: ParserFunc = (string: string, data?: object|null, options?: ParserRenderOptions): string => {
    const config:ParserConstant = options && options.config ? options.config : REGEXPS.variable;
    return string.replaceAll(config.regexp, (substr) => {
        const variable = substr.substring(config.start.length, substr.length - config.end.length);
        if (data && data.hasOwnProperty(variable)) {
            switch (typeof data[variable]) {
                case "function":
                    return data[variable]();
                case "undefined":
                    return "";
                case "object":
                    return JSON.stringify(data[variable]);
            }
            return data[variable];
        }
        if (options && options.defaultValue === 'keep') {
            return string;
        }
        return "";
    });
}
export default renderVariable;
