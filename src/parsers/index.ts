import {ParserOptions, ParserFunc} from "../types/parsers";
import renderVariable from "./variable";
import renderIfStatement from "./if";

class Parser {
    private parsers: ParserFunc[]
    private cache: boolean;
    constructor(options: ParserOptions|undefined) {
        this.parsers = [
            renderVariable,
            renderIfStatement
        ];
        this.cache = !!(options && options.cache); // TODO: ROADMAP
    }

    render(string: string, data: (object | null)) {
        return this.parsers.reduce((str, parser) => {
            return parser(str, data, { defaultValue: 'default' });
        }, string);
    }
}

export default Parser;