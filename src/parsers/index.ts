import {ParserOptions, ParserFunc} from "../types/parsers";
import renderVariable from "./variable";

class Parser {
    private parsers: ParserFunc[]
    private cache: boolean;
    constructor(options: ParserOptions|undefined) {
        this.parsers = [
            renderVariable
        ];
        this.cache = !!(options && options.cache); // TODO: ROADMAP
    }

    render(string: string, data: (object | null)) {
        return this.parsers.reduce((str, parser) => {
            return parser(str, data);
        }, string);
    }
}

export default Parser;